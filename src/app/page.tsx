import Notion from '@/app/api/notionAPI';
import ArticleCard from '@/app/(client-components)/client-ArticleCard';
import {IPost} from './api/type';

interface ArticleListProps {
  posts: IPost[];
  className?: string;
}

function ArticleList({posts, className}: ArticleListProps) {
  const renderList = () => {
    return posts.map((post, i) => (
      <div className="mb-4" key={i}>
        <ArticleCard post={post}/>
      </div>
    ));
  };

  return <div className={className}>{renderList()}</div>;
}

export default async function Page() {
  const posts = await Notion.getPostsFromDatabase('Done');

  return <ArticleList posts={posts} className=" flex flex-col"/>;
}
