import {ArticleStatus} from "@/app/api/type";

export namespace Config {
  export const BLOG_TITLE = 'Minky Blog';
  export const BLOG_DESCRIPTION = '김민규 블로그';
// for notion api Status
  export const STATUS_PUBLISHED_ARTICLE: ArticleStatus = 'Publish';
  export const STATUS_ABOUT_ME: ArticleStatus = 'About me';
}
