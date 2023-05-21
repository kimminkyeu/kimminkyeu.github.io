import Notion from '@/app/api/notionAPI';
import { NotionPage_ClientComponent } from './client-NotionPage';

export const revalidate = 3600; // revalidate every hour
export const fetchCache = 'force-cache';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const pageId = Notion.getPageIdFromUrl(params.slug);
  // const data = await Notion.notion_unoffical.getPage(pageId);
  const mdString = await Notion.getMarkDownString(pageId);
  const HtmlString = await Notion.parseMarkdownToHTML(mdString); // Raw String
  function createMarkup() {
    return { __html: HtmlString };
  }
  return (
    <div className="container p-5">
      <article
        // https://tailwindcss.com/docs/typography-plugin
        className="pros-neutral prose" // Tailwind Official Plugin
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
  // return <NotionPage_ClientComponent recordMap={data} />;
}
