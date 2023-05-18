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
        {/* <h1>{post.title}</h1>
        <h3>{post.description}</h3>
        <p>{post.publishDate}</p>
        {post.tags.map((v, i) => (
          <div key={i}>{v}</div>
        ))}
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt="cover"
            width={100}
            height={100}
            // layout="fill"
            sizes="(max-width: 768px) 100vw,
        					       (max-width: 1200px) 50vw,
            					   33vw"
          />
        ) : (
          <div>no image</div>
        )}
        <p>{post.id}</p> */}
      </Link>
    </div>
  );
}

// test mui

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
