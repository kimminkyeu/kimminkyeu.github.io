import Notion from '@/app/api/notionAPI';
import {processMdx} from '../api/mdxAPI';
import ArticleHeader from '../(client-components)/client-ArticleHeader';
import MDXRenderer from '../(client-components)/client-MdxRenderer';
import {Metadata, ResolvingMetadata} from 'next';
import {Config} from "@/config/config";
import {DiscussionEmbed} from "disqus-react";
import DisqusComments from "@/app/(client-components)/client-Comments";
import ArticleTags from "@/app/(client-components)/client-ArticleTags";
import * as React from "react";
import ArticleCard from "@/app/(client-components)/client-ArticleCard";

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
  const posts = await Notion.getPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  const postInfo = posts.find((p) => p.pageId === params.pageId);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const tagsOnlyString = postInfo?.tags?.map((tag) => tag.name);

  const metaData: Metadata = {
    metadataBase: new URL('https://kimminkyeu.github.io'),
    title: postInfo.title,
    description: postInfo.description,
    openGraph: {
      title: postInfo.title,
      description: postInfo.description,
      images: [postInfo.coverImageUrl ?? '', ...previousImages],
      tags: tagsOnlyString,
    },
  };
  return metaData;
}

export async function generateStaticParams() {
  const pageIdList = await Notion.getPageIdListFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
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
  const posts = await Notion.getPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  const currentPost = posts.find((p) => p.pageId === params.pageId);
  const processed_mdx = await processMdx(currentPost.markdown);

// mx-6 mt-5 flex flex-col max-w-2xl md:mx-auto
  return (
    <div className="max-w-none">
      <div className='max-w-3xl'>
        {/* 최대 넓이 설정을 위한 Dummy Header */}
        <div className='h-0 invisible'><ArticleHeader /></div>
        <ArticleHeader post={currentPost}/>
        <article className="prose prose-neutral">
          <MDXRenderer source={processed_mdx.serializedMdx}/>
        </article>
        {/*  Comments here */}
        <div className='mt-12 mb-6'>
          <ArticleTags post={currentPost} disableReadingTime tagSize={'medium'} />
        </div>
        <DisqusComments pageId={currentPost.pageId} pageTitle={currentPost.title} />
      </div>
    </div>
  );
}
