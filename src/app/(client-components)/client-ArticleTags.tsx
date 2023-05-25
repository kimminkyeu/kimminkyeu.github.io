'use client';

import {Typography} from '@mui/material';
import {Stack} from '@mui/material';
import Chip from '@mui/material/Chip';
import {IPost} from '../api/type';
import {IconButton} from '@mui/material';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import IosShareIcon from '@mui/icons-material/IosShare';
import ShareIcon from '@mui/icons-material/Share';
import {Tooltip} from '@mui/material';

interface ArticleTagsProps {
  className?: string;
  post: IPost;
}

export default function ArticleTags({
                                      className,
                                      post,
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
      <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
        {renderTags(post.tags)}
        <p className='text-sm text-neutral-400 font-medium'> · {post.readingTime}</p>
        <p className='text-sm text-neutral-400 font-medium'> · {post.publishDate}</p>
      </Stack>
      <Tooltip title="Share post" placement="right-start">
        <IconButton aria-label="share" size="small">
          <ShareIcon/>
        </IconButton>
      </Tooltip>
    </div>
  );
}
