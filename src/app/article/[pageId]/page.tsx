import Notion from '@/app/api/notionAPI';
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
  const postInfo = posts.find((p) => p.pageId === params.pageId)
  const mdString = await Notion.getMarkDownString(params.pageId);
  const HtmlString = await Notion.parseMarkdownToHTML(mdString); // Raw String
  function createMarkup() {
    return { __html: HtmlString };
  }
  return (
    <div className="container p-5">
      <Header postInfo={postInfo}/>
      <article
        // https://tailwindcss.com/docs/typography-plugin
        className="pros-neutral prose" // Tailwind Official Plugin
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
}

function Header({postInfo}: {postInfo: IPost}) {
  return (
    <div className='border-2'>
    <div>title: {postInfo.title}</div>
    <div>date: {postInfo.publishDate}</div>
    </div>
  );
}
