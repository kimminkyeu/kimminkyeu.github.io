import Notion from '@/app/api/notionAPI';
import ArticleCard from '@/app/(client-components)/client-ArticleCard';
import {IPost} from './api/type';
import {Config} from "@/config/config";


export default async function Page() {
  const posts = await Notion.getEveryPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE, null, true);

  const renderList = () => {
    return posts.map((post, i) => (
      <div className="mb-4" key={i}>
        <ArticleCard post={post}/>
      </div>
    ));
  };

  return <div className="mt-5 flex flex-col">{renderList()}</div>;
}
