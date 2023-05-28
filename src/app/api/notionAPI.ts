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
  PropertyTag,
} from './type';
import type {QueryDatabaseResponse} from '@notionhq/client/build/src/api-endpoints';

/**
 * @description [ Converting mardown object to HTML ]
 * @link https://blog.hwahae.co.kr/all/tech/10960
 */
import {MdBlock} from 'notion-to-md/build/types';
import readingTime from 'reading-time';

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

    const isYoutube = (fileUrl: string) => {
      return (fileUrl.includes('https://www.youtube.com/') || fileUrl.includes('https://youtu.be/'))
    }

    const isNotionFileSystem = (fileUrl: string) => {
      return (fileUrl.includes('https://s3.us-west-2.amazonaws.com/secure.notion-static.com'))
    }

    this._n2m.setCustomTransformer("video", async (block) => {
      const {video} = block as any;
      const fileType: string = video.type;
      let fileUrl = video[`${fileType}`]['url'];

      if (!fileUrl) {
        // no url
        return "";
      }

      // YOUTUBE ----------------------------
      // 이때 url 형식 = https://www.youtube.com/watch?v={비디오 아이디}
      // 여기서 videoId만 분리한 뒤 https://www.youtube.com/embed/{비디오 아이디} 로 바꿔야 iframe이 작동함.
      // 참고: https://stackoverflow.com/questions/25661182/embed-youtube-video-refused-to-display-in-a-frame-because-it-set-x-frame-opti
      if (isYoutube(fileUrl)) {
        if (fileUrl.includes('https://www.youtube.com/') /* YOUTUBE */) {
          // extract youtube video id
          const target = 'watch?v=';
          const videoId = fileUrl.substring(fileUrl.lastIndexOf(target) + target.length);
          fileUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (fileUrl.includes('https://youtu.be/') /* YOUTUBE */) {
          // extract youtube video id
          const videoId = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
          fileUrl = `https://www.youtube.com/embed/${videoId}`;
        } else {
          Assert.MustBeTrue(false, '[DEV]: Error, strange youtube URL');
        }
        return (`
        <figure>
          <iframe src="${fileUrl}"></iframe>
          <figcaption>${await this._n2m.blockToMarkdown(video?.caption)}</figcaption>
        </figure>
        `);
      }

      // NOTION DB file ----------------------------
      if (isNotionFileSystem(fileUrl)) {
        // TODO: use VIDEO.js video renderer !
        // https://videojs.com/guides/react/
      }
    });

    // Set Custom Transformer for [Notion Block type: caption]
    // this._n2m.setCustomTransformer("image", async (block) => {
    //   const {embed} = block as any;
    //   if (!embed?.url) return "";
    //   return (`
    //     <figure>
    //       <iframe src="${embed?.url}"></iframe>
    //       <figcaption>${await this._n2m.blockToMarkdown(embed?.caption)}</figcaption>
    //     </figure>
    //     `);
    // });

    // Set Custom Transformer for [Notion Block type: embed]
    // this._n2m.setCustomTransformer("embed", async (block) => {
    //   const {embed} = block as any;
    //   if (!embed?.url) {
    //     console.log('[DEV] _n2m.setCustomTransformer: No url in notion embed block');
    //     return "";
    //   }
    //   return (`
    //     <figure>
    //       <iframe src="${embed?.url}"></iframe>
    //       <figcaption>${await this._n2m.blockToMarkdown(embed?.caption)}</figcaption>
    //     </figure>
    //     `);
    // });
    // Set Custom Transformer for [Notion Block type: video]
  }

  public async retrieveBlocksFromNotionPage(page_id: string, block_size: number) {
    const res = await this._notion.blocks.children.list({
      block_id: page_id,
      page_size: block_size,
    });
    return res;
  }

  // db 하위 페이지들의 id 리스트만 얻고 싶을 때
  public async getPageIdListFromDatabase(status?: string) {
    const query = await this._queryDatabaseByStatus(status);
    return query.results.map((v) => this._removeDash(v.id));
  }

  public async getPageDataFromDatabase(status?: string) {
    const query = await this._queryDatabaseByStatus(status);
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
      // https://developers.notion.com/reference/intro#pagination
      page_size: 10, // for pagination, max content size.
    });
    return query;
  }

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
      Assert.NonNullish(null, '[DEV] _extractTags(): Unsupported tag type.');
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
          const _data = (block['paragraph']?.['rich_text'][0]);
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
