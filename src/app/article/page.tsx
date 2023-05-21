import Notion from '../api/notionAPI';
import { IPost } from '@/app/api/type';
import Link from 'next/link';
import ArticleCard_ClientComponent from './client-ArticleCard';

export const revalidate = 3600; // revalidate every hour

interface SinglePostCardProps {
  post: IPost;
}

// Route Function (Link)
function ArticleLink({ post }: SinglePostCardProps) {
  return (
    <div className="mb-4">
      <Link href={`/article/${post.slug}`}>
        <ArticleCard_ClientComponent
          title={post.title}
          description={post.description}
          image={post.coverImageUrl}
          tags={post.tags}
        />
      </Link>
    </div>
  );
}

export default async function ArticleList() {
  const query = await Notion.queryDatabaseByStatus('Done');
  const posts = await Notion.convertQueryToPosts(query);

  const renderList = () => {
    return posts.map((v, i) => <ArticleLink key={i} post={v} />);
  };

  return (
    <div className=" container mx-auto flex flex-col md:flex-row">
      <div className=" p-5">{renderList()}</div>
    </div>
  );
}
