import { convertQueryToPosts, queryDatabaseByStatus } from '@/app/article/notionAPI';

import {
  QueryDatabaseResponse, // Type
} from "@notionhq/client/build/src/api-endpoints";

export type PostResult = Extract<
    QueryDatabaseResponse["results"][number],
    { properties: Record<string, unknown> }
>;



export default async function SingleArticle() {
  const query = await queryDatabaseByStatus('Done');
  const posts = await convertQueryToPosts(query);

  return (
    <div>
      <h3>{JSON.stringify(posts)}</h3>
    </div>
  );
}
