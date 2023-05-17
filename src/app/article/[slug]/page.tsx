import { getBlockContent } from '../notionAPI';
import { GetStaticProps, GetStaticPropsContext, NextPageContext } from 'next';
// [some-title-{id}] 형식을 받아서 뒤의 id만 추출.
// input: no-title-28506c11550a40bdbac10f5ef50f1779
// output: 28506c11550a40bdbac10f5ef50f1779

const extractIdFromUrl = (url: string) => {
  const posOfId = url.lastIndexOf('-');
  const id = url.substring(posOfId + 1);
  return id;
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.

import { ExtendedRecordMap } from 'notion-types';

interface PageProps {
  params: { recordMap: ExtendedRecordMap };
}

export default function Page({ params }: PageProps) {
  // const pageId = extractIdFromUrl(params.slug);
  // let block = 't';
  // const block = await getBlockContent(pageId);
  return (
    <>
      {/* <div>{`My Post + ${pageId}`}</div> */}
      <div> --------------------- </div>
      {/* <div>{JSON.stringify(block)}</div> */}
    </>
  );
}
