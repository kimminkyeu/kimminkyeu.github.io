import Image from "next/image"
import { isPrivateIdentifier } from "typescript";

// 각  article에 대한 컴포넌트 입니다.
export default function ArticleItem({ key, data }) {

	const title = data.properties.Name.title[0].plain_text;
	const description = data.properties.Description.rich_text[0].plain_text;


	// data.cover.file 이 없으면 external에서 url가져오기 (next.config.js에 작성한 도메인)
	// 이때, cover가 null일 수 있음.
	const imgSrc = data.cover?.external?.url || data.cover?.file.url;

	console.log(imgSrc);
	// const imgSrc = data.cover.external.url;

	return (

		<div className="flex flex-col p-6 m-3 bg-slate-700" rounded-md> {/* <div> */}

			{/* 만약 imgSrc가 있다면 보여주고, 없다면 안보여주기 */}
			{imgSrc != null ?
			<Image // 노션 커버 이미지를 이용하였음
				src = {imgSrc}
				width = "100%"
				height = "60%"
				layout="responsive"
			/>
			: <h1>미리보기가 없습니다</h1>
			}

			<h1>{title}</h1>

			<h3>{description}</h3>

		</div>
	);
}
