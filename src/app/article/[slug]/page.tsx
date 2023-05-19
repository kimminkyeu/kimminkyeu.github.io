import { getPage, extractIdFromUrl } from '@/app/api/notionAPI';

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
      <NotionPage recordMap={recordMap} previewImagesEnabled={false} />
    </>
  );
}
