import { TOKEN, DATABASE_ID } from "../config"

import Layout from "../components/layout";
import ArticleItem from "../components/articles/article-item";

// import { Client } from "@notionhq/client" // notion API
// const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default function Article({projects}){

	return (
    <Layout>
      {/* gap : 아티클 간의 간격 */}
      <div className="mb-10 flex min-h-screen flex-col items-center justify-center px-5 py-8">
		{/* TODO:  여기 제목이 들어갑니다. */}

        <div className="m-0 grid grid-cols-1 gap-8 py-10 w-full md:grid-cols-2">
          {projects.results.map((aProject) => (
            <ArticleItem key={aProject.id} data={aProject} />
          ))}
        </div>

      </div>
    </Layout>
  )
}

// 빌드 타임에 호출됩니다. notionAPI로 부터 데이터를 받아와서, props로 전달해줍니다.
export async function getStaticProps(context) {

	const options = {
		method: 'POST',
		headers: {
		  accept: 'application/json',
		  'Notion-Version': '2022-06-28',
		  'content-type': 'application/json',
		  authorization: `Bearer ${TOKEN}`
		},
		body: JSON.stringify({
			sorts: [
				{
					// 생성날짜 기준으로 내림차순 정렬.
					"property": "Created time",
					"direction": "descending"
				}
			],
			page_size: 100
		})
	  };

	// 우측 URL로 요청한 데이터가 다 받아질 때 까지 기다린다.
	const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, options)

	const projects = await res.json();

	// console.log(result);
	// const projectIds = projects.results.map((aProject) => (aProject.id))
	// const projectNames = projects.results.map((aProject) => (
		// aProject.properties.Name.title[0].plain_text
	// ))

	// console.log(`projectIds : ${projectIds}`);
	// console.log(`projectNames : ${projectNames}`);

	// getStaticProps에서 projectNames를 Return. 외부에서 사용 가능하게 함.
	return {
	  props: {projects}, // will be passed to the page component as props
	}
  }
