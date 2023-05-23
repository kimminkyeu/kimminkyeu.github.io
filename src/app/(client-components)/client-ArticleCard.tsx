'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import { IPost } from '@/app/api/type';
import { ThemeProvider } from '@mui/material/styles';
import { BlogTheme } from '@/app/theme';

interface ArticleCardProps {
  post: IPost;
}

export default function ArticleCard({ post }: ArticleCardProps) {

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
    <ThemeProvider theme={BlogTheme}>
      <Box
        sx={{
          borderBottom: 1,
          borderBottomColor: grey[300],
          paddingBottom: 2.5,
          paddingTop: 1,
        }}
      >
        <Link href={`/${post.pageId}`}>
          <Card
            className=" max-h-[60px] sm:max-h-[100px] md:max-h-[110px]"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: 0, // turn of shadow
              borderRadius: 0,
              marginBottom: 2,
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                paddingTop: 0,
                paddingRight: 5,
                paddingBottom: 1,
                paddingLeft: 0,
              }}
            >
              <div className=" mb-2">
                <Typography
                  className=" text-base font-semibold leading-6 sm:text-lg sm:leading-6 md:text-xl"
                  variant={'h5'}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.title}
                </Typography>
              </div>
              <div className=" hidden sm:block">
                <Typography
                  sx={{
                    //  3 line 이상일 경우 ...으로 생략!
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                  }}
                  fontWeight={'light'}
                  variant={'subtitle2'}
                  color={grey[500]}
                  component="div"
                >
                  {post.description}
                </Typography>
              </div>
            </CardContent>
            {post.coverImageUrl && (
              <CardMedia
                className=" w-24 sm:w-32 md:w-36"
                component="img"
                image={post.coverImageUrl}
                alt={'preview image'}
              />
            )}
          </Card>
        </Link>
        {/* Info --------------------------------------------------- */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography component="div" variant="caption">
            {post.publishDate}
          </Typography>
          {renderTags(post.tags)}
        </Stack>
        {/* Info --------------------------------------------------- */}
      </Box>
    </ThemeProvider>
  );
}
