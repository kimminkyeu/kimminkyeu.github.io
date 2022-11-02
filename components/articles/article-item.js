/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   article-item.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: minkyeki <minkyeki@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/11/02 23:51:48 by minkyeki          #+#    #+#             */
/*   Updated: 2022/11/03 01:25:13 by minkyeki         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Image from "next/image"
import { getAllJSDocTags } from "typescript";

// 각  article에 대한 컴포넌트 입니다.
export default function ArticleItem({ key, data }) {

	const title = data.properties.Name.title[0].plain_text;
	const description = data.properties.Description.rich_text[0].plain_text;
	const imgSrc = data.cover?.external?.url || data.cover?.file.url;
	const tags = data.properties.Tags.multi_select;

/*
	 const start = data.properties.WorkPeriod.date.start;
	 const end = data.properties.WorkPeriod.date.end;
	const calculatedPeriod = (start, end) => {
		const startDateStringArray = start.split('-');
		const endDateStringArray = end.split('-');

		let startDate = new Date(startDateStringArray[0], startDateStringArray[1], startDateStringArray[2]);
		let endDate = new Date(endDateStringArray[0], endDateStringArray[1], endDateStringArray[2]);

		const diffInMs = Math.abs(endDate - startDate);
		const result = diffInMs / (1000 * 60 * 60 * 24);

		return (result);
	}
	*/

	return (

		<div className="article-card">


			{imgSrc != null ?
			<Image // 노션 커버 이미지를 이용하였음
				className="rounded-t-xl"
				src = {imgSrc}
				alt = "cover image"
				width = "100%"
				height = "30%"
				layout="responsive"
				objectFit="cover"
				quality={100}
			/>
			: <h1></h1>
			}

			<div className="p-4 flex flex-col">

				{/* (1) 제목 */}
				<h1 className="text-2xl font-bold">{title}</h1>

				{/* (2) 게시글의 설명란 */}
				<h3 className="mt-4 text-xl">
					{/* 작업기간 : {start} ~ {end} {calculatedPeriod(start, end)}일 */}
					{description}
				</h3>

				{/* (3) 게시글의 Tag 정보 */}
				<div className="flex items-start mt-2">
					{tags.map((aTag) => (
						<h1 className="px-2 py-1 mr-2 rounded-md bg-sky-200 w-30" key={aTag.id}>{aTag.name}</h1>
					))}
				</div>


			</div>


		</div>
	);
}
