
import Layout from "../components/layout";

// import { Client } from "@notionhq/client" // notion API
// const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default function Article(){
	return (
		<Layout>


			<div className="flex justify-center">

				<h1>작성 글 목록입니다.</h1>
				{/* <h2>{notion.databases.retrieve({database_id: process.env.NOTION_DATABASE_ID })}</h2> */}

			</div>

		</Layout>
	);
}
