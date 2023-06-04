'use client';

import {Stack} from '@mui/material';
import {IPost, PropertyTag} from '../api/type';
import {Tooltip} from '@mui/material';
import React from 'react';
import { slugifyTag } from '@/utils/helper';
import Link from "next/link";

interface ArticleTagsProps {
  className?: string;
  post: IPost;
  disableReadingTime?: boolean;
  tagSize?: 'small' | 'medium';
}

export default function ArticleTags({className, post, disableReadingTime, tagSize}: ArticleTagsProps) {
  const renderTags = (tags: readonly PropertyTag[]) => {
    // TODO: apply color to tags
    return tags.map((tag, i) => (
      <Tooltip key={i} title={`view all ${tag.name} posts`} placement="top-start">
        <Link className="hover:bg-neutral-200 px-2 py-[3px] text-[0.8rem] rounded-full font-normal text-neutral-900 bg-neutral-100" href={`/category/${slugifyTag(tag.name)}`}>
          {tag.name}
        </Link>
      </Tooltip>
    ));
  };

  return (
    <div className={` ${className} flex justify-between`}>
      <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
        {renderTags(post.tags)}
        {!disableReadingTime && <p className=" text-sm text-neutral-500"> • {post.readingTime}</p>}
      </Stack>
      {/*<Tooltip title="Share post" placement="top-start">*/}
      {/*<IconButton aria-label="share" size="small">*/}
      {/*  <ShareIcon sx={{width: '1.2rem', height: '1.2rem'}}/>*/}
      {/*</IconButton>*/}
      {/*</Tooltip>*/}
    </div>
  );
}
