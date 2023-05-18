import { getPage } from '@/app/api/notionAPI';

// [some-title-{id}] 형식을 받아서 뒤의 id만 추출.
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

import { NotionPage } from '@/app/article/[slug]/client-NotionPage';

export default async function Page({ params }: PageProps) {
  const pageId = extractIdFromUrl(params.slug);
  const recordMap = await getPage(pageId);
  return (
    <>
      <NotionPage recordMap={recordMap} previewImagesEnabled />
    </>
  );
}
