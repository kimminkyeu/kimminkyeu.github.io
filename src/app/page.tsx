import Notion from '@/app/api/notionAPI';
import ArticleCard from '@/app/(client-components)/client-ArticleCard';
import {IPost} from './api/type';
import {Config} from "@/config/config";
import TagList from './(client-components)/client-TagList';
import TagListSmall from './(client-components)/client-tagListAccordian';

export default async function Page() {
  const posts = await Notion.getPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  const tagMap = await Notion.getTagSetFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);

  const renderList = () => {
    return posts.map((post, i) => (
      <div className="mb-4" key={i}>
        <ArticleCard post={post}/>
      </div>
    ));
  };

  // mx-6 mt-5 flex flex-col max-w-2xl md:mx-auto
  return (
    // <div className=' mt-5 mx-6 flex flex-row justify-center md:mx-auto'>
    <div className='flex flex-row'>
      <div className="flex flex-col max-w-2xl">
        {/*Dummy Card for 기본 형태 유지 */}
        <div className='h-0 invisible'><ArticleCard/></div>
        {renderList()}
      </div>
      <div className='hidden lg:block mt-3 ml-20'>
        <TagList tagMap={tagMap}/>
      </div>
    </div>
  );
}
