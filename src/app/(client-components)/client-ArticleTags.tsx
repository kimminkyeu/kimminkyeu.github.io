'use client';

import {Stack} from '@mui/material';
import Chip from '@mui/material/Chip';
import {IPost, PropertyTag} from '../api/type';
import {IconButton} from '@mui/material';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import IosShareIcon from '@mui/icons-material/IosShare';
import ShareIcon from '@mui/icons-material/Share';
import {useRouter} from "next/navigation";
import {Tooltip} from '@mui/material';

import React from 'react';
import { getMuiColorByTagColor } from '@/utils/helper';

interface ArticleTagsProps {
  className?: string;
  post: IPost;
  setChoosedTags: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function ArticleTags({className, post, setChoosedTags}: ArticleTagsProps) {

  // const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const label = event.currentTarget.innerText;
    console.log('-----------------');
    console.log(label);
    console.log('-----------------');
    // const targetTagObject = post.tags.find((tag) => (tag.name === label));
    // setChoosedTags((prev) => {
    //   const new_set = new Set(prev); // copy Set
    //   // add with tag color.
    //   new_set.add(targetTagObject);
    //   return new_set;
    // })
  };  

  const renderTags = (tags: readonly PropertyTag[]) => {
    // TODO: apply color to tags
    return tags.map((tag, i) => (
      <Tooltip key={i} title={`view all ${tag.name} posts`} placement="top-start">
        <Chip
          key={i}
          onClick={handleClick}
          label={tag.name}
          size="small"
          variant="outlined"
          style={{
            // color: '#000',
            color: getMuiColorByTagColor(tag.color),
            borderColor: getMuiColorByTagColor(tag.color),
            // backgroundColor: getMuiColorByTagColor(tag.color),
            // fontSize: '0.8rem',
            fontWeight: 400,
            borderRadius: 4,
            // height: '1.3rem',
          }}
        />
      </Tooltip>
    ));
  };

  return (
    <div className={` ${className} flex justify-between`}>
      <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
        {renderTags(post.tags)}
        <p className=" text-xs text-neutral-500"> • {post.readingTime}</p>
      </Stack>
      {/*<Tooltip title="Share post" placement="top-start">*/}
      {/*<IconButton aria-label="share" size="small">*/}
      {/*  <ShareIcon sx={{width: '1.2rem', height: '1.2rem'}}/>*/}
      {/*</IconButton>*/}
      {/*</Tooltip>*/}
    </div>
  );
}
