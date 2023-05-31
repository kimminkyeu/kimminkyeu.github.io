import Notion from '@/app/api/notionAPI';
import {Config} from "@/config/config";
import ArticleCard from "@/app/(client-components)/client-ArticleCard";

export async function generateStaticParams() {
  const tagSet = await Notion.getTagSetFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  return Array.from(tagSet).map((_tag) => ({
    tagName: _tag.name,
  }))
}

interface StaticParams {
  params: {
    tagName: string;
  };
}

export default async function Page({params}: StaticParams) {
  const posts = await Notion.getPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE, params.tagName);

  const renderList = () => {
    return posts.map((post, i) => (
      <div className="mb-4" key={i}>
        <ArticleCard post={post}/>
      </div>
    ));
  };

  return (
    <div className="mt-5 flex flex-col">
      <div>view by {params.tagName}</div>
      {renderList()}
    </div>
  );
}

