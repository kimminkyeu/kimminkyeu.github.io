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
import {
  DatabaseItem,
  IPost,
  PropertyValueSelect,
  PropertyValueMultiSelect,
  PropertyTag, NotionColor, ArticleStatus,
} from './type';
import type {
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

/**
 * @description [ Converting mardown object to HTML ]
 * @link https://blog.hwahae.co.kr/all/tech/10960
 */
import {MdBlock} from 'notion-to-md/build/types';
import readingTime from 'reading-time';
import parse from 'date-fns/parse';

class NotionAPI_Factory {
  private _notion: Client;
  private _n2m: NotionToMarkdown;

  constructor() {
    // Notion API
    this._notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });
    // Notion To Markdown Library
    this._n2m = new NotionToMarkdown({
      notionClient: this._notion,
    });

    /**
     * @description: caption의 경우, notion-to-md를 쓰면 정보가 나오지 않는다.
     * 따라서 직접 객체에서 caption을 뽑아오자.
     */

    const isYoutube = (fileUrl: string) => {
      return (
        fileUrl.includes('https://www.youtube.com/') ||
        fileUrl.includes('https://youtu.be/')
      );
    };

    const isNotionFileSystem = (fileUrl: string) => {
      return fileUrl.includes(
        'https://s3.us-west-2.amazonaws.com/secure.notion-static.com',
      );
    };

    interface NotionTextAnnotation {
      bold: boolean,
      italic: boolean,
      strikethrough: boolean,
      underline: boolean,
      code: boolean,
      color: NotionColor,
    }

    const __generateTextAnnotationStyle = (annotation: NotionTextAnnotation, text: string) => {
      (annotation.bold) && (text = `**${text}**`);
      (annotation.italic) && (text = `*${text}*`);
      (annotation.strikethrough) && (text = `~~${text.trim()/*공백제거*/}~~`);
      (annotation.underline) && (text = `<ins>${text}</ins>`);
      (annotation.code) && (text = `\`${text}\``);
      (annotation.color !== 'default') && (text = `<span style={\"color:${annotation.color}\"}></span>`);
      return text;
    }

    /** @description [ Convert Rich-text to markdown ] */
    const __generateTextJSX = (textBlocks?: readonly any[]) => {
      if (!textBlocks) return '';
      let textString = '';
      for (let block of textBlocks) {
        const text = block['plain_text'];
        const href = block['href'];
        const annotations = block['annotations'];
        if (href) {
          textString += __generateTextAnnotationStyle(annotations, `[${text}](${href})`);
        } else {
          textString += __generateTextAnnotationStyle(annotations, `${text}`);
        }
      }
      return textString;
    };

    /**
     * @description custom video block transformer
     * @why 비디오 플레이어를 html내에 삽입, 캡션 추가.
     */
    this._n2m.setCustomTransformer('video', async (block) => {
      const {video} = block as any;
      const fileType: string = video.type;
      let fileUrl = video[`${fileType}`]['url'];
      if (!fileUrl) {
        // no url
        return '';
      }
      // YOUTUBE ----------------------------
      // 이때 url 형식 = https://www.youtube.com/watch?v={비디오 아이디}
      // 여기서 videoId만 분리한 뒤 https://www.youtube.com/embed/{비디오 아이디} 로 바꿔야 iframe이 작동함.
      // 참고: https://stackoverflow.com/questions/25661182/embed-youtube-video-refused-to-display-in-a-frame-because-it-set-x-frame-opti
      if (isYoutube(fileUrl)) {
        if (fileUrl.includes('https://www.youtube.com/') /* YOUTUBE */) {
          // extract youtube video id
          const target = 'watch?v=';
          const videoId = fileUrl.substring(
            fileUrl.lastIndexOf(target) + target.length,
          );
          fileUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (fileUrl.includes('https://youtu.be/') /* YOUTUBE */) {
          // extract youtube video id
          const videoId = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
          fileUrl = `https://www.youtube.com/embed/${videoId}`;
        } else {
          Assert.MustBeTrue(false, '[DEV]: Error, strange youtube URL');
        }
        const caption = __generateTextJSX(video?.caption);

        return `
        <figure>
          <div style={{position: 'relative', overflow: 'hidden', width:'100%', paddingBottom: '56.25%'}} >
            <iframe style={{position: 'absolute', top:0, left:0}} width="100%" height="100%" src="${fileUrl}"></iframe>
          </div>
          <figcaption>${caption}</figcaption>
        </figure>
        `;
      }
      // NOTION DB file ----------------------------
      if (isNotionFileSystem(fileUrl)) {
        // Option: use VIDEO.js video renderer to enable embedded video
        // https://videojs.com/guides/react/
        // 그러나 나는 s3-AWS 비공개 자료 정책(하루동안 접근 가능) 때문에 삭제함.
        return ''; // show nothing.
      }
    });

    /**
     * @description custom image block transformer
     * @why 이미지 캡션 추가.
     *
     * - (!) 속도를 위해 이후 MDXRenderer에서 Next Image API를 사용해야 한다.
     *       따가서 image는 반드시 Markdown 형식대로 return할 것.
     */
    this._n2m.setCustomTransformer('image', async (block) => {
      const {image} = block as any;
      const fileType: string = image.type;
      let fileUrl: string = image[`${fileType}`]['url'];
      if (!fileUrl) {
        return '';
      } else {
        const caption = __generateTextJSX(image?.caption);

        // <figure style={{margin:0}}>
        return ` 
          ![image](${fileUrl} "title")
          <figure>
            <figcaption>${caption}</figcaption>
          </figure>
          `;
      }
    });

    /**
     * @description custom column-list block transformer
     * @link https://developers.notion.com/changelog/column-list-and-column-support
     */
    this._n2m.setCustomTransformer('column_list', async (block) => {
      const MAX_NOTION_COLUMN_LIST = 10; // 한칸에 최대 개수.
      const retrieveBlocks_recur = async (block_id: string) => {
        const block = await this.retrieveBlocksFromNotionPage(
          block_id,
          MAX_NOTION_COLUMN_LIST,
        );
        let markdown = '';
        for (let child of block.results) {
          if (!child['has_children']) {
            return `<div style={{flex:1, minWidth: '150px'}}>${await this._n2m.blockToMarkdown(
              child,
            )}</div>`;
          } else {
            markdown += await retrieveBlocks_recur(child.id);
          }
        }

        return markdown;
      };
      return `<div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                flexWrap: 'wrap', 
                gap: '1rem'
            }}>
            ${await retrieveBlocks_recur(block.id)}
        </div>`;
    });

    /**
     * @description custom GFM-checkout transformer
     */
    this._n2m.setCustomTransformer('to_do', async (block) => {
      const {to_do} = block as any;
      const textArray: Array<any> = to_do['rich_text'];
      const text = __generateTextJSX(textArray);
      const isDone: boolean = to_do['checked'];
      return isDone ? (`* [x] ~~${text.trim()/*공백제거*/}~~`) : (`* [ ] ${text}`)
      /*
      return (
        isDone ? (
          `<div style={{listStyleType: 'none'}}>
            <input disabled type="checkbox" checked />&nbsp;<span style={{textDecoration:'line-through'}}>${text}</span>
          </div>`
        ) : (
          `<div style={{listStyleType: 'none'}}>
            <input disabled type="checkbox" />&nbsp;<span>${text}</span>
          </div>`
        ))
       */
    })
  }


  public async retrieveBlocksFromNotionPage(
    page_id: string,
    block_size: number,
  ) {
    const res = await this._notion.blocks.children.list({
      block_id: page_id,
      page_size: block_size,
    });
    return res;
  }

  // db 하위 페이지들의 id 리스트만 얻고 싶을 때
  public async getPageIdListFromDatabase(status?: ArticleStatus) {
    const query = await this._queryDatabaseByStatus(status);
    return query.results.map((v) => this._removeDash(v.id));
  }

  public async getTagSetFromDatabase(status?: ArticleStatus) {
    const query = await this._queryDatabaseByStatus(status);
    const databaseItems: DatabaseItem[] = query.results.map(
      (databaseItem) => databaseItem as DatabaseItem,
    );
    const tagSet = new Set<PropertyTag>();
    databaseItems.forEach((postInDB: DatabaseItem) => {
      const _tags = this._extractTags(postInDB.properties.Tags);
      _tags.forEach((t) => tagSet.add(t));
    })
    return tagSet;
    // return query.results.map((v) => v);
  }

  public async getPageDataFromDatabase(status?: ArticleStatus, tagName?: string) {
    const query = await this._queryDatabaseByStatus(status, tagName);
    const pageData = await this._extractPageDataFromDBQuery(query);
    return pageData;
  }

  // https://github.com/souvikinator/notion-to-md
  public async getMarkDownString(target_page_id: string) {
    const mdBlocksBefore = await this._n2m.pageToMarkdown(target_page_id);
    const mdBlocksAfter = this.__fixCodeType_CPP(mdBlocksBefore);
    const mdString = this._n2m.toMarkdownString(mdBlocksAfter);
    return mdString.parent;
  }

  /**
   * @param status
   * @param tagName
   * @returns database object
   */

  // https://developers.notion.com/reference/post-database-query-filter
  private async _queryDatabaseByStatus(status?: ArticleStatus, tagName?: string) {
    let filterArgs = {
      and: [],
    };

    if (status) {
      const statusFilter = {
        property: 'Status',
        status: {equals: `${status}`}
      }
      filterArgs.and.push(statusFilter);
    }
    if (tagName) {
      const tagFilter = {
        property: 'Tags',
        multi_select: {contains: `${tagName}`}
      }
      filterArgs.and.push(tagFilter);
    }

    Assert.NonNullish(process.env.NOTION_DATABASE_ID);
    const query = await this._notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: filterArgs,
      sorts: [{property: 'Date', direction: 'descending'}],
      // https://developers.notion.com/reference/intro#pagination
      page_size: 10, // for pagination, max content size.
    });
    // console.log(JSON.stringify(query, null, 4));
    return query;
  }

  private _removeDash(str: string) {
    const result = str.replace(/[-]/g, ''); // remove dash
    return result;
  }

  // - 와 공백, / 등 url에 포함되면 안되는 기호 제거.
  private _slugify(str: string) {
    return str.replace(/^\s+|\s+$/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
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
      const utc_prev = Date.UTC(
        prev.getFullYear(),
        prev.getMonth(),
        prev.getDate(),
      );
      const utc_curr = Date.UTC(
        curr.getFullYear(),
        curr.getMonth(),
        curr.getDate(),
      );
      return Math.floor((utc_curr - utc_prev) / _MS_PER_DAY);
    };

    const publish_date = new Date(str);
    const today = new Date();
    const dateDiff = dateDiffInDays(publish_date, today);

    let dateFormatResult: string;
    if (dateDiff === 0) {
      dateFormatResult = 'today';
    } else if (dateDiff < 7) {
      dateFormatResult =
        `${dateDiff}` + (dateDiff === 1 ? ' day ago' : ' days ago');
    } else if (dateDiff < 10) {
      dateFormatResult = `${Math.floor(dateDiff / 7)} weeks ago`;
    } else {
      // if more than a month, show [ month | date ]
      const raw_date = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
      }).format(publish_date);
      dateFormatResult = raw_date.substring(
        raw_date.indexOf(',') + 2,
        raw_date.lastIndexOf(','),
      );
    }
    return dateFormatResult;
  }

  private _extractTags(_tags: PropertyValueMultiSelect | PropertyValueSelect) {
    if (_tags.type === 'multi_select') {
      return _tags.multi_select.map<PropertyTag>((tag) => ({
        name: tag.name,
        color: tag.color,
      }));
    } else if (_tags.type === 'select') {
      if (_tags.select?.name) {
        return Array<PropertyTag>({
          name: _tags.select.name,
          color: _tags.select.color,
        });
      }
      return null;
    } else {
      Assert.NonNullish(null, '[DEV] _extractTags(): Unsupported tags type.');
    }
  }

  // 만약 설명글이 없다면, 헤딩을 제외한 본문의 markdown 내용을 뽑아와서 설명글로 대체하기.
  private async _extractDescription(
    _postInDB: DatabaseItem,
    _markdown: string,
    _pageId: string,
  ) {
    const description =
      _postInDB.properties.Description.rich_text[0]?.plain_text;
    if (!description) {
      const blocks = await this.retrieveBlocksFromNotionPage(_pageId, 5);
      let paragraphs = '';
      blocks.results.map((block) => {
        if (block['type'] === 'paragraph') {
          const _data = block['paragraph']?.['rich_text'][0];
          if (_data && _data['text']) {
            const text: string = _data['text']['content'];
            paragraphs += text.replaceAll('\n', ' ') + ' ';
          }
        }
      });
      return paragraphs;
    }
    return description;
  }

  private async _extractPageDataFromDBQuery(response: QueryDatabaseResponse) {
    const databaseItems: DatabaseItem[] = response.results.map(
      (databaseItem) => databaseItem as DatabaseItem,
    );
    const posts: IPost[] = await Promise.all(
      databaseItems.map(async (postInDB: DatabaseItem) => {
        const _pageId = this._removeDash(postInDB.id);
        const _last_edited_date = this._extractDate(postInDB.last_edited_time);
        const _title =
          postInDB.properties.Name.title[0]?.plain_text ?? `No title`;
        const _tags = this._extractTags(postInDB.properties.Tags);
        const _coverImageUrl = this.getImageUrlFromCoverObject(postInDB.cover);
        const _publishdate = postInDB.properties.Date.date?.start;
        const _markdown = await this.getMarkDownString(_pageId);
        const _description = await this._extractDescription(
          postInDB,
          _markdown,
          _pageId,
        );

        const post: IPost = {
          pageId: _pageId,
          title: _title,
          description: _description,
          coverImageUrl: _coverImageUrl,
          tags: _tags,
          publishDate: this._changeDateFormat(
            _publishdate ?? _last_edited_date,
          ), // if publishDate is not set, than set to default, which is "last edited time"
          markdown: _markdown, // 본문 마크다운 데이터 (후속 처리 필요한 데이터)
          readingTime: readingTime(_markdown).text,
        };
        return post;
      }),
    );
    return posts;
  }

  // Notion API에서 Cover Image의 URL을 뽑아오기 위한 함수.
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
