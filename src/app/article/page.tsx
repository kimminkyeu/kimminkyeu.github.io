import {
  convertQueryToPosts,
  queryDatabaseByStatus,
} from '@/app/article/notionAPI';
import { IPost } from './type';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60; // 60 second revalidation

interface SinglePostCardProps {
  post: IPost;
}

function PostLink({ post }: SinglePostCardProps) {
  return (
    <div className=" mb-4 border border-blue-500 bg-slate-50">
      <Link href={`/article/${post.slug}`}>
        <h1>{post.title}</h1>
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
        <p>{post.id}</p>
      </Link>
    </div>
  );
}

export default async function ArticleList() {
  const query = await queryDatabaseByStatus('Done');
  const posts = await convertQueryToPosts(query);

  return (
    <div>
      {posts.map((v, i) => (
        <PostLink key={i} post={posts[i]} />
      ))}
    </div>
  );
}
