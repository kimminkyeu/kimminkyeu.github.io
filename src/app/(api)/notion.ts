import { Config } from '@/config/config';
import { Assert } from '@/utils/assert';

/**
 * @description [ Notion API doc ]
 * @link https://developers.notion.com/reference/post-database-query
 */
import { Client } from '@notionhq/client';
const notion = new Client({ auth: Config.NOTION_TOKEN });

/**
 * @param status
 *  (0) If status is undefined, query every data
 *  (1) Done
 *  (2) Not started
 *  (3) In progress
 * @returns database object
 */
export async function queryDatabaseByStatus(status?: string) {
  Assert.NonNullish(Config.NOTION_DATABASE_ID);
  //* 방법 1 방식.
  let filterArgs;
  if (status) {
    filterArgs = {
      property: 'Status',
      status: { equals: `${status}` }, // filter only edit done article.
    };
  }
  const query = await notion.databases.query({
    database_id: Config.NOTION_DATABASE_ID,
    filter: filterArgs,
  });

  //* 방법 2 방식.
  /*
  const URL = `https://api.notion.com/v1/databases/${Config.NOTION_DATABASE_ID}/query`
  const filter = {
    filter: {
      property: 'Status',
      status: {
        equals: `${status}`,
      },
    },
  }
  const res = await fetch(URL, {
    next: { revalidate: 10 }, // revalidate time, 10s
    method: 'POST',
    body: JSON.stringify(filter),
    headers: {
      'Notion-Version': `${Config.NOTION_VERSION}`,
      Authorization: `Bearer ${Config.NOTION_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    // handle next13 error...
  }
  const query = await res.json()
*/
  console.log('[DEV] next13 server is fetching data from notion...');
  return query;
}

export async function getBlockContent(block_id: string) {
  const page_size = 100;
  const URL = `https://api.notion.com/v1/blocks/${block_id}/children?page_size=${page_size}`;
  const res = await fetch(URL, {
    next: { revalidate: 10 }, // revalidate time, 10s
    method: 'POST',
    headers: {
      'Notion-Version': `${Config.NOTION_VERSION}`,
      Authorization: `Bearer ${Config.NOTION_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    // handle next13 error...
  }
  const query = await res.json();
  console.log(query);
  return query;
}
