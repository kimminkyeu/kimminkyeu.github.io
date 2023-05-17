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
  //* 방법 1 방식.
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
  });
  console.log('[DEV] next13 server is fetching data from notion...');
  return query;
}

export async function getBlockContent(block_id: string) {

}


// -------------------------------------------------
// Types for Notion API
//  - https://www.alanjohn.dev/blog/Building-a-Developer-Portfolio-Creating-a-NextJS-blog-in-typescript-using-Notion-API
import { DatabaseItem, IPost } from './type';
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const extractPosts = async (response: QueryDatabaseResponse) => {
  const databaseItems: DatabaseItem[] = response.results.map(
      (databaseItem) => databaseItem as DatabaseItem,
  );
  const posts: IPost[] = await Promise.all(
      databaseItems.map(async (postInDB: DatabaseItem) => {
          const last_edited_time = postInDB.last_edited_time;
          const title = postInDB.properties.Name.title[0]?.plain_text ?? 'No Title'
          const description = postInDB.properties.Description.rich_text[0]?.plain_text ?? 'No Description';
          const tags = (postInDB.properties.Tags.multi_select).map((v) => v.name); // extract tag name
          const coverImageUrl = getPageCoverUrl(postInDB.cover);
          const publishdate = postInDB.properties.PublishDate.date?.start;

          const post: IPost = {
              id: postInDB.id,
              title: title,
              description: description,
              coverImageUrl: coverImageUrl,
              tags: tags,
              publishDate: publishdate || last_edited_time, // if publishDate is not set, than set to default, which is "last edited time"
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
  if (type === "external") {
    Url = coverObj.external.url;
  } else if (type === "file") {
    Url = coverObj.file.url;
  }
  return Url;
}

export async function convertQueryToPosts(query: QueryDatabaseResponse) {
  const posts = await extractPosts(query);
  return posts;
}