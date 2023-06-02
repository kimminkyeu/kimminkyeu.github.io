import Notion from '@/app/api/notionAPI';
import {Config} from "@/config/config";
import ArticleCard from "@/app/(client-components)/client-ArticleCard";
import {slugifyTag, unslugifyTag} from '@/utils/helper';
import CategoryView from '@/app/(client-components)/client-Category';
import {PropertyTag} from '@/app/api/type';
import TagList from '@/app/(client-components)/client-TagList';

export async function generateStaticParams() {
  const tagMap = await Notion.getTagSetFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  return Array.from(tagMap).map(([_tag, count]) => ({
    tagNameSlug: slugifyTag(_tag),
  }))
}

interface StaticParams {
  params: {
    tagNameSlug: string;
  };
}

export default async function Page({params}: StaticParams) {
  const category = unslugifyTag(params.tagNameSlug);
  const posts = await Notion.getPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE, category);
  const tagMap = await Notion.getTagSetFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  const selectedTag = {name: '', count: 0};

  for (const [tag, count] of tagMap) {
    if (tag === category) {
      selectedTag.name = tag;
      selectedTag.count = count;
      // selectedTag.color = e.color;
    }
  }
  // console.log('DEV: ', selectedTag.name);
  // const tagTypeCasted = selectedTag as PropertyTag;

  const renderList = () => {
    return posts.map((post, i) => (
      <div className="mb-4" key={i}>
        <ArticleCard post={post}/>
      </div>
    ));
  };

  /* mx-6 flex flex-col max-w-2xl md:mx-auto */
  return (
    <div className='flex flex-row'>
      <div className="flex flex-col max-w-2xl">
        <div className=' mb-4'>
          <CategoryView selectedTag={selectedTag}/>
        </div>
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

