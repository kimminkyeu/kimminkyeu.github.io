import Notion from '@/app/api/notionAPI';
// import Post from './client-MDX';

interface StaticParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams({ params }: StaticParams) {
  console.log(params.slug);
}

export default async function Page({ params }: PageProps) {
  const pageId = Notion.getPageIdFromUrl(params.slug);
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
}
