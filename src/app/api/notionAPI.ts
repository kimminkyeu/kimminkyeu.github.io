import { Assert } from '@/utils/assert';
/**
 * @description [ Notion API doc ]
 * @link https://developers.notion.com/reference/post-database-query */
import { Client } from '@notionhq/client';
/**
 * @description [ Notion to Markdown ]
 * @link https://github.com/souvikinator/notion-to-md */
import { NotionToMarkdown } from 'notion-to-md';

/**
 * @description [ Types for notion API ]
 * @link https://www.alanjohn.dev/blog/Building-a-Developer-Portfolio-Creating-a-NextJS-blog-in-typescript-using-Notion-API */
import { DatabaseItem, IPost } from './type';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

/**
 * @description [ Converting mardown object to HTML ]
 * @link https://blog.hwahae.co.kr/all/tech/10960
 */
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { reporter } from 'vfile-reporter';
import { read } from 'to-vfile';
import remarkPrism from 'remark-prism';
// https://unifiedjs.com/explore/package/rehype-prism-plus/
// https://github.com/mapbox/rehype-prism
import rehypePrism from '@mapbox/rehype-prism';
import remarkHtml from 'remark-html';
import rehypeSanitize from 'rehype-sanitize';
import { MdBlock } from 'notion-to-md/build/types';

class NotionAPI_Factory {
  private _notion: Client = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  private _n2m: NotionToMarkdown = new NotionToMarkdown({
    notionClient: this._notion,
  });
  constructor() {
    // this._notion = new Client({ auth: process.env.NOTION_TOKEN });
    // this._n2m = new NotionToMarkdown({ notionClient: this._notion });
  }

  /**
   * @param status
   *  (0) If status is undefined, query every data
   *  (1) Done
   *  (2) Not started
   *  (3) In progress
   * @returns database object
   */
  public async queryDatabaseByStatus(status?: string) {
    let filterArgs;
    if (status) {
      filterArgs = {
        property: 'Status',
        status: { equals: `${status}` }, // filter only edit done article.
      };
    }
    Assert.NonNullish(process.env.NOTION_DATABASE_ID);
    const query = await this._notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: filterArgs,
      sorts: [{ property: 'Date', direction: 'descending' }],
      page_size: 10, // for pagination, max content size.
      // https://developers.notion.com/reference/intro#pagination
    });
    console.log('[DEV] next13 server is fetching data from notion...');
    return query;
  }
  public async extractPosts(response: QueryDatabaseResponse) {
    const databaseItems: DatabaseItem[] = response.results.map(
      (databaseItem) => databaseItem as DatabaseItem,
    );

    const convertToSlug = (str: string) => {
      const slug = str
        .toLowerCase() // convert to lower case
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
      return slug;
    };

    const removeDash = (str: string) => {
      const result = str.replace(/[-]/g, ''); // remove dash
      return result;
    };

    const extractDate = (str: string) => {
      const pos = str.indexOf('T');
      return str.substring(0, pos);
    };

    const posts: IPost[] = await Promise.all(
      databaseItems.map(async (postInDB: DatabaseItem) => {
        const id = removeDash(postInDB.id);
        const last_edited_date = extractDate(postInDB.last_edited_time);
        const title =
          postInDB.properties.Name.title[0]?.plain_text ?? `no-title`;
        const description =
          postInDB.properties.Description.rich_text[0]?.plain_text ??
          'No Description';
        const tags = postInDB.properties.Tags.multi_select.map((v) => v.name); // extract tag name
        const coverImageUrl = this.getImageUrlFromCoverObject(postInDB.cover);
        const publishdate = postInDB.properties.Date.date?.start;
        const slug = convertToSlug(title) + '-' + id; // for routing.

        const post: IPost = {
          id: id,
          title: title,
          description: description,
          coverImageUrl: coverImageUrl,
          tags: tags,
          publishDate: publishdate ?? last_edited_date, // if publishDate is not set, than set to default, which is "last edited time"
          slug: slug,
        };
        return post;
      }),
    );
    return posts;
  }

  // [some-title-{id}] 형식을 받아서 뒤의 id만 추출.
  public getPageIdFromUrl(url: string) {
    const posOfId = url.lastIndexOf('-');
    const id = url.substring(posOfId + 1);
    return id;
  }

  public getImageUrlFromCoverObject(coverObj?: any) {
    if (!coverObj) return;
    let Url;
    const type = coverObj.type;
    if (type === 'external') {
      Url = coverObj.external.url;
    } else if (type === 'file') {
      Url = coverObj.file.url;
    }
    return Url;
  }

  public async convertQueryToPosts(query: QueryDatabaseResponse) {
    const posts = await this.extractPosts(query);
    return posts;
  }

  // need to change c++ to cpp for markdown...
  private __fixCodeType_CPP(mdBlocks: MdBlock[]) {
    mdBlocks.forEach((v) => {
      if (v.type === 'code' && v.parent.lastIndexOf('c++', 5) != -1) {
        // if c++ exist
        v.parent = v.parent.replace('c++', 'cpp');
      }
    });
    return mdBlocks;
  }

  // https://github.com/souvikinator/notion-to-md
  public async getMarkDownString(target_page_id: string) {
    console.log('[DEV] next13 fetching notion page to md...');
    const mdBlocksBefore = await this._n2m.pageToMarkdown(target_page_id);
    const mdBlocksAfter = this.__fixCodeType_CPP(mdBlocksBefore);
    console.log(mdBlocksAfter);
    const mdString = this._n2m.toMarkdownString(mdBlocksAfter);
    console.log('[DEV] -------- done!');
    return mdString.parent;
  }

  // https://blog.hwahae.co.kr/all/tech/10960
  // https://github.com/unifiedjs/unified (AST)
  // https://nextjs.org/docs/app/building-your-application/configuring/mdx#getting-started  --> 여기가 끝판왕!
  // https://css-tricks.com/syntax-highlighting-prism-on-a-next-js-site/
  public async parseMarkdownToHTML(markdownData: any) {
    console.log('[DEV] next13 parsing md to html...');
    // console.log('[DEV] ----------------------------');
    // console.log(markdownData);
    // console.log('[DEV] ----------------------------');
    const file = await unified()
      .use(remarkParse) // Convert into markdown AST
      .use(remarkGfm) // Github flavored markdown
      .use(remarkBreaks) // Line break
      .use(remarkRehype) // Transform to HTML AST
      .use(rehypePrism) // Add code highlight via Prismjs
      .use(rehypeSanitize) // Sanitize HTML input
      .use(rehypeStringify) // Convert AST into serialized HTML
      .process(markdownData);
    console.log('[DEV] -------- done!');
    return String(file);
  }
}

export default new NotionAPI_Factory();

//--------------------------------------------------------------
//    Unofficial Notino API
//--------------------------------------------------------------
// https://github.com/NotionX/react-notion-x#nextjs-examples
// https://github.com/splitbee/react-notion
// https://github.dev/transitive-bullshit/nextjs-notion-starter-kit

//--------------------------------------------------------------
//    Splitbee Notion API
//--------------------------------------------------------------
// https://github.com/splitbee/notion-api-worker
