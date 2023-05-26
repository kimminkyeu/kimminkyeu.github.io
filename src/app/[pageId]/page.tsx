import Notion from '@/app/api/notionAPI';
import {processMdx} from '../api/mdxAPI';
import ArticleHeader from './(client-component)/client-ArticleHeader';
import ArticleMain_MDX from './(client-component)/client-ArticleMain';
import {Metadata, ResolvingMetadata} from 'next';

type Props = {
  params: { pageId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateMetadata(
  {params, searchParams}: Props,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const posts = await Notion.getPostsFromDatabase('Done');
  const postInfo = posts.find((p) => p.pageId === params.pageId);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const tagsOnlyString = postInfo.tags.map((tag) => tag.name);

  const metaData: Metadata = {
    title: postInfo.title,
    description: postInfo.description,
    openGraph: {
      title: postInfo.title,
      description: postInfo.description,
      images: [postInfo.coverImageUrl, ...previousImages],
      tags: tagsOnlyString,
    },
  };
  return metaData;
}

export async function generateStaticParams() {
  const pageIdList = await Notion.getPageIdListFromDatabase('Done');
  return pageIdList.map((_pageId) => ({
    pageId: _pageId,
  }));
}

interface StaticParams {
  params: {
    pageId: string;
  };
}

export default async function Page({params}: StaticParams) {
  const posts = await Notion.getPostsFromDatabase('Done');
  const currentPost = posts.find((p) => p.pageId === params.pageId);

  const processed_mdx = await processMdx(currentPost.markdown);
  return (
    <div className=" container prose prose-neutral mx-auto">
      <ArticleHeader post={currentPost}/>
      <article>
        <ArticleMain_MDX source={processed_mdx.serializedMdx}/>
      </article>
    </div>
  );
}
