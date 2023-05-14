import { Assert } from '@/utils/assert';

export namespace Config {
  export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
  export const NOTION_TOKEN = process.env.NOTION_TOKEN;
  export const BLOG_TITLE = process.env.BLOG_TITLE;
  export const BLOG_DESCRIPTION = process.env.BLOG_DESCRIPTION;
  export const NOTION_VERSION = process.env.NOTION_VERSION;
}
