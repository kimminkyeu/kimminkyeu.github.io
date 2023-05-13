
// server action
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
// 'use server';

import { Config } from "@/config/config";
import { Assert } from "@/utils/assert";

// import { Client } from "@notionhq/client";
// const notion = new Client({auth: Config.NOTION_TOKEN});

// Notion API doc
// https://developers.notion.com/reference/post-database-query
export async function queryDatabase_withStatusDone() {

    Assert.NonNullish(Config.NOTION_DATABASE_ID);
    /*
    * 방법 1 방식.
    const query = await notion.databases.query({
        database_id: Config.NOTION_DATABASE_ID,
        filter: {
            property: 'Status',
            status: { equals: 'Done' }, // filter only edit done article.
        }
    });
    */

    //* 방법 2 방식.
    const URL = `https://api.notion.com/v1/databases/${Config.NOTION_DATABASE_ID}/query`
    const filter = {
        "filter": {
            "property": "Status",
            "status": {
                "equals": "Done"
            }
        }
    };
    const res = await fetch(URL, {
        next: { revalidate: 10 }, // revalidate time, 10s
        method: 'POST',
        body: JSON.stringify(filter),
        headers: {
            'Notion-Version': `${Config.NOTION_VERSION}`,
            'Authorization': `Bearer ${Config.NOTION_TOKEN}`,
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) {
        // handle next13 error...
    }
    const query = await res.json();
    console.log(query);
    return query;
}

export async function getBlockContent(block_id: string) {
    const page_size = 100;
    const URL = `https://api.notion.com/v1/blocks/${block_id}/children?page_size=${page_size}`
    const res = await fetch(URL, {
        next: { revalidate: 10 }, // revalidate time, 10s
        method: 'POST',
        headers: {
            'Notion-Version': `${Config.NOTION_VERSION}`,
            'Authorization': `Bearer ${Config.NOTION_TOKEN}`,
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) {
        // handle next13 error...
    }
    const query = await res.json();
    console.log(query);
    return query;
}