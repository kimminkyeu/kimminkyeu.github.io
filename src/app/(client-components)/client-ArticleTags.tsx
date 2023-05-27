'use client';

import {Stack} from '@mui/material';
import Chip from '@mui/material/Chip';
import {IPost, PropertyTag} from '../api/type';
import {IconButton} from '@mui/material';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import IosShareIcon from '@mui/icons-material/IosShare';
import ShareIcon from '@mui/icons-material/Share';
import {Tooltip} from '@mui/material';
import * as MuiColors from '@mui/material/colors';

interface ArticleTagsProps {
  className?: string;
  post: IPost;
}

export default function ArticleTags({className, post}: ArticleTagsProps) {
  const handleClick = () => {
    alert('you clicked chip');
  };

  const getMuiColorByTagColor = (tagColor: string) => {
    const COLOR_VALUE = 200;
    switch (tagColor) {
      case 'gray':
        return MuiColors.grey[COLOR_VALUE];
      case 'brown':
        return MuiColors.brown[COLOR_VALUE];
      case 'orange':
        return MuiColors.orange[COLOR_VALUE];
      case 'yellow':
        return MuiColors.yellow[COLOR_VALUE];
      case 'green':
        return MuiColors.green[COLOR_VALUE];
      case 'blue':
        return MuiColors.blue[COLOR_VALUE];
      case 'purple':
        return MuiColors.purple[COLOR_VALUE - 100];
      case 'pink':
        return MuiColors.pink[COLOR_VALUE];
      case 'red':
        return MuiColors.red[COLOR_VALUE];
      default:
        return MuiColors.common[COLOR_VALUE];
    }
  }

  const renderTags = (tags: readonly PropertyTag[]) => {
    // TODO: apply color to tag
    return tags.map((tag, i) => (
      <Chip
        key={i}
        onClick={handleClick}
        label={tag.name}
        size="small"
        variant="filled"
        style={{
          color: '#000',
          backgroundColor: getMuiColorByTagColor(tag.color),
          fontSize: '0.7rem',
          fontWeight: 300,
          borderRadius: 4,
          height: '19px',
        }}
      />
    ));
  };

  return (
    <div className={` ${className} flex justify-between`}>
      <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
        {renderTags(post.tags)}
        <p className=" text-xs text-neutral-500"> • {post.readingTime}</p>
      </Stack>
      <Tooltip title="Share post" placement="right-start">
        <IconButton aria-label="share" size="small">
          <ShareIcon sx={{width: '17px', height: '17px'}}/>
        </IconButton>
      </Tooltip>
    </div>
  );
}
