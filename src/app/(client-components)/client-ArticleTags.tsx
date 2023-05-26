'use client';

import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';
import { IPost, PropertyTag } from '../api/type';
import { IconButton } from '@mui/material';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import IosShareIcon from '@mui/icons-material/IosShare';
import ShareIcon from '@mui/icons-material/Share';
import { Tooltip } from '@mui/material';

interface ArticleTagsProps {
  className?: string;
  post: IPost;
}

export default function ArticleTags({ className, post }: ArticleTagsProps) {
  const handleClick = () => {
    alert('you clicked chip');
  };

  const renderTags = (tags: readonly PropertyTag[]) => {
    // TODO: apply color to tag
    return tags.map((tag, i) => (
      <Chip
        key={i}
        onClick={handleClick}
        label={tag.name}
        size="small"
        variant="filled"
      />
    ));
  };

  return (
    <div className={` ${className} flex justify-between`}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        {renderTags(post.tags)}
        <p className="text-sm font-medium text-neutral-400">
          {' '}
          · {post.readingTime}
        </p>
        <p className="text-sm font-medium text-neutral-400">
          {' '}
          · {post.publishDate}
        </p>
      </Stack>
      <Tooltip title="Share post" placement="right-start">
        <IconButton aria-label="share" size="small">
          <ShareIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
