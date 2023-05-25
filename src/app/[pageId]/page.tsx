import Notion from '@/app/api/notionAPI';
import { serializeMdx } from '../api/mdxAPI';
import ArticleHeader from './(client-component)/client-ArticleHeader';
import ArticleMain_MDX from './(client-component)/client-ArticleMain';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { pageId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const posts = await Notion.getPostsInfoFromDatabase('Done');
  const postInfo = posts.find((p) => p.pageId === params.pageId);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: postInfo.title,
    description: postInfo.description,
    openGraph: {
      title: postInfo.title,
      description: postInfo.description,
      images: [postInfo.coverImageUrl, ...previousImages],
      tags: [...postInfo.tags],
    },
  };
}

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

  // ---------------------  Without MDX  ------------------------------
  // const HtmlString = await Notion.parseMarkdownToHTML(mdString); // Raw String
  // function createMarkup() {
  //   return { __html: HtmlString };
  // }
  // // Tailwind Official Plugin (Prose)
  // return (
  //   <div className=" container prose prose-neutral mx-auto p-5">
  //     <ArticleHeader postInfo={postInfo} />
  //     <article dangerouslySetInnerHTML={createMarkup()} />
  //   </div>
  // );
  // -----------------------------------------------------------------

  const mdx = await serializeMdx(mdString);
  return (
    <div className=" container prose prose-neutral mx-auto p-5">
      <ArticleHeader postInfo={postInfo} />
      <article>
        <ArticleMain_MDX source={mdx} />
      </article>
    </div>
  );
}
