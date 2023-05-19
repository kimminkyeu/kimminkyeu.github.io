import {
  convertQueryToPosts,
  queryDatabaseByStatus,
} from '@/app/api/notionAPI';
import { IPost } from '@/app/api/type';
import Image from 'next/image';
import Link from 'next/link';
import ArticleCard from './client-ArticleCard';

export const revalidate = 60; // 60 second revalidation

interface SinglePostCardProps {
  post: IPost;
}

// Top Down (share to all articles)
/*
export async function generateStaticParams() {
  const query = await queryDatabaseByStatus('Done');
  const posts = await convertQueryToPosts(query);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
*/

// Route Function (Link)
function ArticleLink({ post }: SinglePostCardProps) {
  return (
    <div className="mb-4 bg-slate-50">
      <Link href={`/article/${post.slug}`}>
        <ArticleCard
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
  const query = await queryDatabaseByStatus('Done');
  const posts = await convertQueryToPosts(query);

  return (
    <div className=" container mx-auto flex flex-col md:flex-row">
      <div className=" p-5">
        <div className=" bg-slate-100"> ---- article navigator ---- </div>
      </div>
      <div className=" flex-1 p-5">
        {posts.map((v, i) => (
          <ArticleLink key={i} post={posts[i]} />
        ))}
      </div>
      {/* <div className=" hidden container bg-slate-100"> */}
      {/* ----------Right Box---------- */}
      {/* </div> */}
    </div>
  );
}
