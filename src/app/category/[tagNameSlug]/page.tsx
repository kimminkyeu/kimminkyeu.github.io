import Notion from '@/app/api/notionAPI';
import {Config} from "@/config/config";
import ArticleCard from "@/app/(client-components)/client-ArticleCard";
import { slugifyTag, unslugifyTag } from '@/utils/helper';
import CategoryView from '@/app/(client-components)/client-Category';
import { PropertyTag } from '@/app/api/type';
import TagList from '@/app/(client-components)/client-TagList';
import TagListSmall from '@/app/(client-components)/client-tagListSmall';

export async function generateStaticParams() {
  const tagSet = await Notion.getTagSetFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  return Array.from(tagSet).map((_tag) => ({
    tagNameSlug: slugifyTag(_tag.name),
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
  const tagSet = await Notion.getTagSetFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  const selectedTag = {name: '', color: ''};
  for (const e of tagSet) {
    if (e.name === category) {
      selectedTag.name = e.name;
      selectedTag.color = e.color;
    }
  }
  const tagTypeCasted = selectedTag as PropertyTag;

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
        {/* <div className='block lg:hidden'>
          <TagListSmall tagSet={tagSet} />
        </div> */}
        <div className=' my-4'>
          <CategoryView selectedTag={tagTypeCasted} />
        </div> 
        {renderList()}
      </div>
      <div className='hidden lg:block'>
          <TagList tagSet={tagSet} />
      </div>
    </div>
  );
}

