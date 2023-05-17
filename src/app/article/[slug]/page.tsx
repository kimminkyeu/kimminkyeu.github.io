// https://github.com/NotionX/react-notion-x/blob/master/examples/full/pages/%5BpageId%5D.tsx

import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';
// My API
import { getBlockContent } from '../notionAPI';

// [some-title-{id}] 형식을 받아서 뒤의 id만 추출.
// input: no-title-28506c11550a40bdbac10f5ef50f1779
// output: 28506c11550a40bdbac10f5ef50f1779
const extractIdFromUrl = (url: string) => {
  const posOfId = url.lastIndexOf('-');
  const id = url.substring(posOfId + 1);
  return id;
};

interface PageProps {
  params: {
    slug: string;
  };
}

import { NotionPage } from '../notionPage';

export default async function Page({ params }: PageProps) {
  const pageId = extractIdFromUrl(params.slug);
  const recordMap = await getBlockContent(pageId);

  return (
    <>
      <NotionPage recordMap={recordMap} previewImagesEnabled />
    </>
  );
}
