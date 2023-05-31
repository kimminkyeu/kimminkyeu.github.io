import Notion from '@/app/api/notionAPI';
import {processMdx} from '../api/mdxAPI';
import ArticleHeader from '../(client-components)/client-ArticleHeader';
import MDXRenderer from '../(client-components)/client-MdxRenderer';
import {Metadata, ResolvingMetadata} from 'next';
import {Config} from "@/config/config";
import {Slug} from "@/app/api/type";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateMetadata(
  {params, searchParams}: Props,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const posts = await Notion.getEveryPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  const postInfo = posts.find((p) => {
    return (p.slug === params.slug);
  });
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const tagsOnlyString = postInfo.tags.map((tag) => tag.name);

  const metaData: Metadata = {
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
  const slugList = await Notion.getSlugListFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  return slugList.map((_slug) => ({
    slug: _slug,
  }));
}

interface StaticParams {
  params: {
    slug: Slug;
  };
}


export default async function Page({params}: StaticParams) {
  const posts = await Notion.getEveryPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE, null, true);
  const currentPost = posts.find((p) => p.slug === params.slug);
  console.log(currentPost);
  // const processed_mdx = await processMdx(currentPost.markdown);

  return (
    <div className=" container prose prose-neutral mx-auto">
      {/*<ArticleHeader post={currentPost}/>*/}
      <article>
        {/*<MDXRenderer source={processed_mdx.serializedMdx}/>*/}
      </article>
    </div>
  );
}
