'use client';

import Notion from '@/app/api/notionAPI';
import ArticleCard from '@/app/(client-components)/client-ArticleCard';
import {Config} from "@/config/config";
import React from 'react';
import { PropertyTag } from './api/type';
import { Chip, Tooltip } from '@mui/material';
import { getMuiColorByTagColor } from '@/utils/helper';

// use client를 여기서 쓰고, 각 태그 클릭시 props를 넘겨주는 방식으로 해볼까?
// choosed tag는 map을 쓰까?
// 아니면 choosedTag는 set을 써볼끼?


export default async function Page() {
  const [choosedTags, setChoosedTags] = React.useState<Set<string>>(new Set<string>());
  const posts = await Notion.getPageDataFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);

  const renderList = () => {
    return posts.map((post, i) => (
      <div className="mb-4" key={i}>
        <ArticleCard post={post} setChoosedTags={setChoosedTags} />
      </div>
    ));
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('tag clicked!');
    // const label = event.currentTarget.innerText;
    // setChoosedTags((prev) => {
    //   const new_set = new Set(prev); // copy Set
    //   // add with tag color.
    //   new_set.add(targetTagObject);
    //   return new_set;
    // })
  };  

  // const renderChoosedTags = () => {
  //   return Array.from(choosedTags).map((tagName, i) => (
  //       // <Tooltip key={i} title={`view all ${tag.name} posts`} placement="top-start">
  //         <Chip
  //           key={i}
  //           onClick={handleClick}
  //           label={tagName}
  //           size="small"
  //           variant="outlined"
  //           style={{
  //             // color: '#000',
  //             // color: getMuiColorByTagColor(tag.color),
  //             // borderColor: getMuiColorByTagColor(tag.color),
  //             // backgroundColor: getMuiColorByTagColor(tag.color),
  //             // fontSize: '0.8rem',
  //             fontWeight: 400,
  //             borderRadius: 4,
  //             // height: '1.3rem',
  //           }}
  //         />
  //       // </Tooltip>
  //     ));
  // }

  return (
    <div className="mt-5 flex flex-col">
      <div>selected tags</div>
      {/* {renderChoosedTags()} */}
      {renderList()}
    </div>
  );
}
