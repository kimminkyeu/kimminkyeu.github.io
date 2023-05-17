import { convertQueryToPosts, queryDatabaseByStatus } from '@/app/article/notionAPI';
import { IPost } from './type';


interface SinglePostCardProps {
  postData: IPost;
}

function PostCard({postData}: SinglePostCardProps) {
  return (
    <div className=' border border-blue-400'>
      <h1>{postData.title}</h1>
      <h3>{postData.description}</h3>
      <p>{postData.publishDate}</p>
      {postData.tags.map((v, i) => (<div>{v}</div>))}
      <p>{postData.coverImageUrl}</p>
    </div>
  )
}

export default async function SingleArticle() {
  const query = await queryDatabaseByStatus('Done');
  const posts = await convertQueryToPosts(query);

  return (
    <div>
      {posts.map((v, i) => (<PostCard postData={posts[i]}/>))}
    </div>
  );
}
