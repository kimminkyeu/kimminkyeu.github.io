import { Assert } from '@/utils/assert'

export namespace Config {
  export const DATABASE_ID = process.env.NOTION_DATABASE_ID
  Assert.NonNullish(DATABASE_ID)
  export const TOKEN = process.env.NOTION_TOKEN
  Assert.NonNullish(TOKEN)
  export const BLOG_TITLE = process.env.BLOG_TITLE
  Assert.NonNullish(Assert.NonNullish)
  export const BLOG_DESCRIPTION = process.env.BLOG_DESCRIPTION
  Assert.NonNullish(BLOG_DESCRIPTION)
}
