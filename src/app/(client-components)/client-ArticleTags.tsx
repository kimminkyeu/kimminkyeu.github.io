'use client';

import {Stack} from '@mui/material';
import Chip from '@mui/material/Chip';
import {IPost, PropertyTag} from '../api/type';
import {IconButton} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import {grey} from "@mui/material/colors";
import {useRouter} from "next/navigation";
import {Tooltip} from '@mui/material';
import React from 'react';
import { getMuiColorByTagColor, slugifyTag } from '@/utils/helper';

interface ArticleTagsProps {
  className?: string;
  post: IPost;
  disableReadingTime?: boolean;
  tagSize?: 'small' | 'medium';
}

export default function ArticleTags({className, post, disableReadingTime, tagSize}: ArticleTagsProps) {
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const label = event.currentTarget.innerText;
    const sluggedLabel = slugifyTag(label);
    // alert(sluggedLabel);
    router.push(`/category/${sluggedLabel}`);
  };

  

  const renderTags = (tags: readonly PropertyTag[]) => {
    // TODO: apply color to tags
    return tags.map((tag, i) => (
      <Tooltip key={i} title={`view all ${tag.name} posts`} placement="top-start">
        <Chip
          key={i}
          onClick={handleClick}
          label={tag.name}
          size={ tagSize ?? 'small'}
          variant="filled"
          style={{
            color: grey[700],
            // color: getMuiColorByTagColor(tag.color),
            // borderColor: getMuiColorByTagColor(tag.color),
            // backgroundColor: getMuiColorByTagColor(tag.color),
            fontSize: '0.8rem',
            fontWeight: 400,
            // borderRadius: 4,
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
        {!disableReadingTime && <p className=" text-sm text-neutral-600"> • {post.readingTime}</p>}
      </Stack>
      {/*<Tooltip title="Share post" placement="top-start">*/}
      {/*<IconButton aria-label="share" size="small">*/}
      {/*  <ShareIcon sx={{width: '1.2rem', height: '1.2rem'}}/>*/}
      {/*</IconButton>*/}
      {/*</Tooltip>*/}
    </div>
  );
}
