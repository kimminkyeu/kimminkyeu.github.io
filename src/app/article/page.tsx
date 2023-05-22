import Notion from '../api/notionAPI';
import ArticleCard_ClientComponent from './client-ArticleCard';

export default async function ArticleList() {
  const posts = await Notion.getPostsInfoFromDatabase('Done');

  const renderList = () => {
    return posts.map((post, i) => (
      <div className="mb-4" key={i}>
        <ArticleCard_ClientComponent post={post} />
      </div>
    ));
  };

  return (
    <div className=" container mx-auto flex flex-col md:flex-row">
      <div className=" p-5">{renderList()}</div>
    </div>
  );
}
