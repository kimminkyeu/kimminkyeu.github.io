
import { Config } from '@/config/config';
import { Assert } from '@/utils/assert';
import { Client } from '@notionhq/client';

import dynamic from 'next/dynamic'
import { NotionRenderer } from 'react-notion-x'

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then((m) => m.Collection)
)

const notion = new Client({auth: Config.NOTION_TOKEN});

async function getArticleList() {
  Assert.NonNullish(Config.NOTION_DATABASE_ID);
  const res = await notion.databases.query({
    database_id: Config.NOTION_DATABASE_ID,
    filter: {
      "property": "Status",
      "status": {
        "equals": "Done"
      }
    }
  })
  return res;
}

export default async function ArticleList() {
  const list = await getArticleList();
  const listJson = JSON.stringify(list);

  return (
    <h1>listJson</h1>
  )
}
