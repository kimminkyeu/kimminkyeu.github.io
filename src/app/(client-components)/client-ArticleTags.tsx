'use client';

import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';
import { IPost } from '../api/type';
import IosShareIcon from '@mui/icons-material/IosShare';
import { IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { grey } from '@mui/material/colors';

interface ArticleTagsProps {
  className?: string;
  postInfo: IPost;
}

export default function ArticleTages({
  className,
  postInfo,
}: ArticleTagsProps) {
  const handleClick = () => {
    alert('you clicked chip');
  };

  const renderTags = (strs: readonly string[]) => {
    return strs.map((nameOfTag, i) => (
      <Chip
        key={i}
        onClick={handleClick}
        label={nameOfTag}
        size="small"
        variant="filled"
      />
    ));
  };

  return (
    <div className={` ${className} flex justify-between`}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography component="div" variant="caption">
          {postInfo.publishDate}
        </Typography>
        {renderTags(postInfo.tags)}
      </Stack>
      <IconButton aria-label="share" size="small">
        <BookmarkBorderIcon />
      </IconButton>
    </div>
  );
}
