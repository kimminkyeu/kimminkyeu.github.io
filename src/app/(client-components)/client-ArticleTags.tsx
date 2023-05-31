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
import * as MuiColors from '@mui/material/colors';
import React from 'react';

interface ArticleTagsProps {
  className?: string;
  post: IPost;
}

export default function ArticleTags({className, post}: ArticleTagsProps) {
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const label = event.currentTarget.innerText;
    router.push(`/tags/${label}`);
  };

  const getMuiColorByTagColor = (tagColor: string) => {
    const COLOR_VALUE = 400;
    switch (tagColor) {
      case 'gray':
        return MuiColors.grey[COLOR_VALUE];
      case 'brown':
        return MuiColors.brown[COLOR_VALUE];
      case 'orange':
        return MuiColors.orange[COLOR_VALUE];
      case 'yellow':
        return MuiColors.yellow[COLOR_VALUE + 400];
      case 'green':
        return MuiColors.green[COLOR_VALUE];
      case 'blue':
        return MuiColors.blue[COLOR_VALUE];
      case 'purple':
        return MuiColors.purple[COLOR_VALUE - 100];
      case 'pink':
        return MuiColors.pink[COLOR_VALUE - 100];
      case 'red':
        return MuiColors.red[COLOR_VALUE - 100];
      default:
        return MuiColors.common[COLOR_VALUE];
    }
  }

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
