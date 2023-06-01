import Notion from '@/app/api/notionAPI';
import {Config} from "@/config/config";
import ArticleList from './(client-components)/client-ArticleList';

export default async function Page() {
  const posts = await Notion.getPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);

  return (
      <div className="">
        <ArticleList posts={posts}/>
      </div>
    );
}
