import Notion from '@/app/api/notionAPI';

export const revalidate = 60; // 60 second revalidation
interface StaticParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams({ params }: StaticParams) {
  console.log("[DEV] article/[slug] page generateStaticProps's parameter");
  console.log(params);
  console.log('--------------------------------------------');
  // here, call content of page.
  // But does this revalidate??
  // const pageId = Notion.getPageIdFromUrl(params.slug);
  // const mdString = await Notion.getMarkDownString(pageId);
  // const HtmlString = await Notion.parseMarkdownToHTML(mdString); // Raw String
}

export default async function Page({ params }: StaticParams) {
  // const pageId = Notion.getPageIdFromUrl(params.slug);
  // const mdString = await Notion.getMarkDownString(pageId);
  // const HtmlString = await Notion.parseMarkdownToHTML(mdString); // Raw String

  // function createMarkup() {
  // return { __html: HtmlString };
  // }

  return (
    <div className="container p-5">
      <article
        // https://tailwindcss.com/docs/typography-plugin
        className="pros-neutral prose" // Tailwind Official Plugin
        // dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
}
