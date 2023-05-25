import {Assert} from '@/utils/assert';
/**
 * @description [ Notion API doc ]
 * @link https://developers.notion.com/reference/post-database-query */
import {Client} from '@notionhq/client';
/**
 * @description [ Notion to Markdown ]
 * @link https://github.com/souvikinator/notion-to-md */
import {NotionToMarkdown} from 'notion-to-md';

/**
 * @description [ Types for notion API ]
 * @link https://www.alanjohn.dev/blog/Building-a-Developer-Portfolio-Creating-a-NextJS-blog-in-typescript-using-Notion-API */
import {DatabaseItem, IPost} from './type';
import type {QueryDatabaseResponse} from '@notionhq/client/build/src/api-endpoints';

/**
 * @description [ Converting mardown object to HTML ]
 * @link https://blog.hwahae.co.kr/all/tech/10960
 */
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import {reporter} from 'vfile-reporter';
import {read} from 'to-vfile';
import remarkPrism from 'remark-prism';
// https://unifiedjs.com/explore/package/rehype-prism-plus/
// https://github.com/mapbox/rehype-prism
import rehypePrism from '@mapbox/rehype-prism';
import remarkHtml from 'remark-html';
import rehypeSanitize from 'rehype-sanitize';
import {MdBlock} from 'notion-to-md/build/types';
import {NotionAPI} from 'notion-client';
import readingTime from "reading-time";

class NotionUnofficialClient {
  private _notion_unofficial = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_TOKEN_V2,
  });

  constructor() {
  }

  public async getPage(page_id: string) {
    return await this._notion_unofficial.getPage(page_id);
  }
}

class NotionAPI_Factory {
  private _notion: Client = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  private _n2m: NotionToMarkdown = new NotionToMarkdown({
    notionClient: this._notion,
  });
  public notion_unoffical = new NotionUnofficialClient();

  constructor() {
    // this._notion = new Client({ auth: process.env.NOTION_TOKEN });
    // this._n2m = new NotionToMarkdown({ notionClient: this._notion });
  }

  public async getPage(target_page_id: string) {
    const response = await this._notion.pages.retrieve({
      page_id: target_page_id,
    });
    return response;
  }

  // db 하위 페이지들의 id 리스트만 얻고 싶을 때
  public async getPageIdListFromDatabase(status?: string) {
    const query = await this._queryDatabaseByStatus(status);
    return query.results.map((v) => this._removeDash(v.id));
  }

  public async getPostsFromDatabase(status?: string) {
    const query = await this._queryDatabaseByStatus(status);
    const posts = await this._extractPostsFromDBQuery(query);
    return posts;
  }

  // https://github.com/souvikinator/notion-to-md
  public async getMarkDownString(target_page_id: string) {
    const mdBlocksBefore = await this._n2m.pageToMarkdown(target_page_id);
    const mdBlocksAfter = this.__fixCodeType_CPP(mdBlocksBefore);
    const mdString = this._n2m.toMarkdownString(mdBlocksAfter);
    return mdString.parent;
  }

  // https://blog.hwahae.co.kr/all/tech/10960
  // https://github.com/unifiedjs/unified (AST)
  // https://nextjs.org/docs/app/building-your-application/configuring/mdx#getting-started  --> 여기가 끝판왕!
  // https://css-tricks.com/syntax-highlighting-prism-on-a-next-js-site/
  /**
   * @deprecated */
  public async parseMarkdownToHTML(markdownData: any) {
    const file = await unified()
      .use(remarkParse) // Convert into markdown AST
      .use(remarkGfm) // Github flavored markdown
      .use(remarkBreaks) // Line break
      .use(remarkRehype) // Transform to HTML AST
      .use(rehypePrism) // Add code highlight via Prismjs
      .use(rehypeSanitize) // Sanitize HTML input
      .use(rehypeStringify) // Convert AST into serialized HTML
      .process(markdownData);
    return String(file);
  }

  /**
   * @param status
   *  (0) If status is undefined, query every data
   *  (1) Done
   *  (2) Not started
   *  (3) In progress
   * @returns database object
   */
  private async _queryDatabaseByStatus(status?: string) {
    let filterArgs;
    if (status) {
      filterArgs = {
        property: 'Status',
        status: {equals: `${status}`}, // filter only edit done article.
      };
    }
    Assert.NonNullish(process.env.NOTION_DATABASE_ID);
    const query = await this._notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: filterArgs,
      sorts: [{property: 'Date', direction: 'descending'}],
      page_size: 10, // for pagination, max content size.
      // https://developers.notion.com/reference/intro#pagination
    });
    return query;
  }

  // private _convertToSlug(str: string) {
  //   const slug = str
  //     .toLowerCase() // convert to lower case
  //     .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
  //     .replace(/\s+/g, '-') // collapse whitespace and replace by -
  //     .replace(/-+/g, '-'); // collapse dashes
  //   return slug;
  // }

  private _removeDash(str: string) {
    const result = str.replace(/[-]/g, ''); // remove dash
    return result;
  }

  private _extractDate(str: string) {
    const pos = str.indexOf('T');
    return str.substring(0, pos);
  }

  // 2023-05-12 --> Jan 12
  private _changeDateFormat(str: string) {
    // 만약 몇일 내라면 '몇일 전' 이라고 표기.
    // 만약 1달 이상이면 날짜를 표기.
    const dateDiffInDays = (prev: Date, curr: Date) => {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      const utc_prev = Date.UTC(prev.getFullYear(), prev.getMonth(), prev.getDate());
      const utc_curr = Date.UTC(curr.getFullYear(), curr.getMonth(), curr.getDate());
      return Math.floor((utc_curr - utc_prev) / _MS_PER_DAY);
    }

    const publish_date = new Date(str);
    const today = new Date();
    const dateDiff = dateDiffInDays(publish_date, today);

    let dateFormatResult: string;
    if (dateDiff === 0) {
      dateFormatResult = 'today';
    } else if (dateDiff < 7) {
      dateFormatResult = `${dateDiff} days ago`;
    } else if (dateDiff < 30) {
      dateFormatResult = `${Math.floor(dateDiff / 7)} weeks ago`;
    } else { // if more than a month, show [ month | date ]
      const raw_date = new Intl.DateTimeFormat('en-US', {dateStyle: 'full'}).format(publish_date);
      dateFormatResult = raw_date.substring(raw_date.indexOf(',') + 2, raw_date.lastIndexOf(','));
    }
    return (dateFormatResult);
  }

  private async _extractPostsFromDBQuery(response: QueryDatabaseResponse) {
    const databaseItems: DatabaseItem[] = response.results.map(
      (databaseItem) => databaseItem as DatabaseItem,
    );
    const posts: IPost[] = await Promise.all(
      databaseItems.map(async (postInDB: DatabaseItem) => {
        const _pageId = this._removeDash(postInDB.id);
        const _last_edited_date = this._extractDate(postInDB.last_edited_time);
        const _title =
          postInDB.properties.Name.title[0]?.plain_text ?? `no-title`;
        const _description =
          postInDB.properties.Description.rich_text[0]?.plain_text ??
          'No Description';
        const _tags = postInDB.properties.Tags.multi_select.map((v) => v.name); // extract tag name
        const _coverImageUrl = this.getImageUrlFromCoverObject(postInDB.cover);
        const _publishdate = postInDB.properties.Date.date?.start;
        const _markdown = await this.getMarkDownString(_pageId);

        const post: IPost = {
          pageId: _pageId,
          title: _title,
          description: _description,
          coverImageUrl: _coverImageUrl,
          tags: _tags,
          publishDate: this._changeDateFormat(_publishdate ?? _last_edited_date), // if publishDate is not set, than set to default, which is "last edited time"
          markdown: _markdown,
          readingTime: readingTime(_markdown).text,
        };
        return post;
      }),
    );
    return posts;
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
}

const NotionAPI_Instance = new NotionAPI_Factory();

export default NotionAPI_Instance;
