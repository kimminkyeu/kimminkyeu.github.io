import Notion from '@/app/api/notionAPI';
import ArticleCard from '@/app/(client-components)/client-ArticleCard';
import {IPost} from './api/type';
import {Config} from "@/config/config";
import TagList from './(client-components)/client-TagList';

export default async function Page() {
  const posts = await Notion.getPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  const tagSet = await Notion.getTagSetFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);

  const renderList = () => {
    return posts.map((post, i) => (
      <div className="mb-4" key={i}>
        <ArticleCard post={post}/>
      </div>
    ));
  };

  return (
    <div className=' mt-5 mx-6 flex flex-row justify-center md:mx-auto'>
      <div className='hidden lg:block'>
        <TagList tagSet={tagSet} />
      </div>
      <div className="lex flex-col max-w-2xl">
        {renderList()}
      </div>
    </div>
  );
}
