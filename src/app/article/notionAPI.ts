import { Config } from '@/config/config';
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
  console.log(query);
  return query;
}

export async function getBlockContent(block_id: string) {

}


// -------------------------------------------------
// Types for Notion API
//  - https://www.alanjohn.dev/blog/Building-a-Developer-Portfolio-Creating-a-NextJS-blog-in-typescript-using-Notion-API
import { DatabaseItem, QueryDatabaseResponse, IPost } from './type';

const extractPosts = async (response: QueryDatabaseResponse): Promise<IPost[]> => {
  const databaseItems: DatabaseItem[] = response.results.map(
      (databaseItem) => databaseItem as DatabaseItem,
  );
  const posts: IPost[] = await Promise.all(
      databaseItems.map(async (postInDB: DatabaseItem) => {
          const title = postInDB.properties.Name.title[0].plain_text;
          const date = postInDB.properties.Date.last_edited_time;
          const description = postInDB.properties.Description.rich_text[0].plain_text;
          const url = getCanonicalURL(title);
          const link = postInDB.properties.Link.url || "";
          const tags = (postInDB.properties.Tags.multi_select).map((v) => v.name); // extract tag name
          // const cover = await getPageCover(postInDB.id);
          const publishdate = postInDB.properties.PublishDate.date?.start;

          const post: IPost = {
              id: postInDB.id,
              title: title,
              modifiedDate: date,
              description: description,
              url: url,
              link: link,
              // cover: cover,
              tags: tags,
              publishDate: publishdate || date,
          };
          return post;
      }),
  );
  return posts;
};

const getCanonicalURL = (title: string): string => {
  const cleaned = title.replace(/\W/gm, " ");
  const removedSpaces = cleaned
      .split(" ")
      .filter((str) => str)
      .join("-");
  return removedSpaces;
};

export async function convertQueryToPosts(query: QueryDatabaseResponse): Promise<IPost[]> {
  const posts = await extractPosts(query);
  console.log(posts);
  return posts;
}