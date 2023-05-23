import Notion from '@/app/api/notionAPI';
import ArticleHeader from './(client-component)/client-ArticleHeader';
import { IPost } from '@/app/api/type';

export async function generateStaticParams() {
  const postsInfo = await Notion.getPostsInfoFromDatabase('Done');

  return postsInfo.map((post) => ({
    pageId: post.pageId,
  }));
}

interface StaticParams {
  params: {
    pageId: string;
  };
}

export default async function Page({ params }: StaticParams) {
  const posts = await Notion.getPostsInfoFromDatabase('Done');
  const postInfo = posts.find((p) => p.pageId === params.pageId);
  const mdString = await Notion.getMarkDownString(params.pageId);
  const HtmlString = await Notion.parseMarkdownToHTML(mdString); // Raw String
  function createMarkup() {
    return { __html: HtmlString };
  }
  // Tailwind Official Plugin (Prose)
  return (
    <div className=" container prose prose-neutral mx-auto p-5">
      <ArticleHeader postInfo={postInfo} />
      <article dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
}
