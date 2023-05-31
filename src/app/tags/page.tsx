import Notion from "@/app/api/notionAPI";
import {Config} from "@/config/config";

export default async function Page() {
  const tagSet = await Notion.getTagSetFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);
  const tags = Array.from(tagSet);
  return <div>tags</div>
}