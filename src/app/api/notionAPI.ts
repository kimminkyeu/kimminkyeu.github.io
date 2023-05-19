import { Assert } from '@/utils/assert';

/**
 * @description [ Notion API doc ]
 * @link https://developers.notion.com/reference/post-database-query
 */
import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_TOKEN });

/**
 * @param status
 *  (0) If status is undefined, query every data
 *  (1) Done
 *  (2) Not started
 *  (3) In progress
 * @returns database object
 */
export async function queryDatabaseByStatus(status?: string) {
  let filterArgs;
  if (status) {
    filterArgs = {
      property: 'Status',
      status: { equals: `${status}` }, // filter only edit done article.
    };
  }
  Assert.NonNullish(process.env.NOTION_DATABASE_ID);
  const query = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: filterArgs,
    sorts: [{ property: 'Date', direction: 'descending' }],
    page_size: 10, // for pagination, max content size.
    // https://developers.notion.com/reference/intro#pagination
  });
  console.log('[DEV] next13 server is fetching data from notion...');
  // console.log(query);
  return query;
}

// -------------------------------------------------
// Types for Notion API
//  - https://www.alanjohn.dev/blog/Building-a-Developer-Portfolio-Creating-a-NextJS-blog-in-typescript-using-Notion-API
import { DatabaseItem, IPost } from './type';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

const extractPosts = async (response: QueryDatabaseResponse) => {
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
      const title = postInDB.properties.Name.title[0]?.plain_text ?? `no-title`;
      const description =
        postInDB.properties.Description.rich_text[0]?.plain_text ??
        'No Description';
      const tags = postInDB.properties.Tags.multi_select.map((v) => v.name); // extract tag name
      const coverImageUrl = getPageCoverUrl(postInDB.cover);
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
};

const getPageCoverUrl = (coverObj?: any) => {
  if (!coverObj) return;
  let Url;
  const type = coverObj.type;
  if (type === 'external') {
    Url = coverObj.external.url;
  } else if (type === 'file') {
    Url = coverObj.file.url;
  }
  return Url;
};

export async function convertQueryToPosts(query: QueryDatabaseResponse) {
  const posts = await extractPosts(query);
  return posts;
}

//--------------------------------------------------------------
//    Unofficial Notino API
//--------------------------------------------------------------
// https://github.com/NotionX/react-notion-x#nextjs-examples
// https://github.com/splitbee/react-notion
// https://github.dev/transitive-bullshit/nextjs-notion-starter-kit
import { NotionAPI } from 'notion-client';
import { SearchParams, SearchResults } from 'notion-types';

export const notion_unofficial = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V0,
});

// [some-title-{id}] 형식을 받아서 뒤의 id만 추출.
export const extractIdFromUrl = (url: string) => {
  const posOfId = url.lastIndexOf('-');
  const id = url.substring(posOfId + 1);
  return id;
};

export async function getPage(block_id: string) {
  const recordMap = await notion_unofficial.getPage(block_id);
  console.log('[DEV] getting record map of', block_id);
  return recordMap;
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion_unofficial.search(params);
}

//--------------------------------------------------------------
//    Splitbee Notino API
//--------------------------------------------------------------
// https://github.com/splitbee/notion-api-worker
