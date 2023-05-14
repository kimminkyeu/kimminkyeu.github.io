import { queryDatabaseByStatus } from '@/app/api/route';

/** ----------------------------------------------------------------------------
 * @title [ Incremental Static Regeneration (ISR) ]
 * -----------------------------------------------------------------------------
 * @description [ Next13 Route Segment Configuration ]
 * @link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
 * @link2 https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 * @link3 https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration
 *
 * Note: The edge runtime is currently not compatible with ISR, although you can
 * leverage stale-while-revalidate by setting the cache-control header manually.
 *
 */
export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // WARN: next의 기본 runtime은 edge인데, ISR에 적용되지 않음.

export default async function SingleArticle() {
  const query = await queryDatabaseByStatus('Done');
  return (
    <div>
      <h1>TEST</h1>
      <h3>{JSON.stringify(query)}</h3>
    </div>
  );
}
