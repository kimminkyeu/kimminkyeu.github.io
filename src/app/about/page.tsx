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
  const processed_mdx = await processMdx(aboutMePage.markdown);

  return (
    <div className=" container prose prose-neutral mx-auto">
      <article>
        <MDXRenderer source={processed_mdx.serializedMdx}/>
      </article>
    </div>
  );
}
