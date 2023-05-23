'use client';

import { IPost } from '@/app/api/type';
import { Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BlogTheme } from '@/app/theme';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

interface ArticleHeaderProps {
  className?: string;
  postInfo: IPost;
}

export default function ArticleHeader({
  className,
  postInfo,
}: ArticleHeaderProps) {
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
    <div className={`${className} mt-5`}>
      <ThemeProvider theme={BlogTheme}>
        <div>
          <h1 className=" mb-3 text-2xl leading-[1.5] sm:text-3xl sm:leading-[1.5] md:text-[35px] md:leading-[1.5]">
            {postInfo.title}
          </h1>
          <h5 className=" mb-5 mt-0 font-normal leading-normal text-neutral-400">
            {postInfo.description}
          </h5>
        </div>
        <div className=" ">
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography component="div" variant="caption">
              {postInfo.publishDate}
            </Typography>
            {renderTags(postInfo.tags)}
          </Stack>
        </div>
        <Divider className=" my-4" />
      </ThemeProvider>
    </div>
  );
}
