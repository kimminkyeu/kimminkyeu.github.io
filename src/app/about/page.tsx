// import Hero from './hero'
// return <Hero />
import MDXRenderer from "@/app/(client-components)/client-MdxRenderer";
import Notion from "@/app/api/notionAPI";
import {Config} from "@/config/config";
import {processMdx} from "@/app/api/mdxAPI";

export default async function AboutMe() {
  // get Post data (including markdown)
  const aboutMePage = (await Notion.getPageDataFromDatabase(Config.STATUS_ABOUT_ME))[0];
  // serialize markdown
  // console.log(aboutMePage.markdown);
  const processed_mdx = await processMdx(aboutMePage.markdown);
  // const testData = await Notion.retrieveBlocksFromNotionPage(aboutMePage.pageId, 10);

  // console.log('----------------------------------');
  // const test = await Notion.retrieveBlocksFromNotionPage(aboutMePage.pageId, 30);
  // console.log(JSON.stringify(test.results, null, 4));
  // console.log('----------------------------------');

  // console.log('markdown -----------------------------')
  // console.log(aboutMePage.markdown);
  // console.log('markdown -----------------------------')

  return (
    <article className="max-w-3xl">
      <MDXRenderer source={processed_mdx.serializedMdx}/>
    </article>
  );
}
