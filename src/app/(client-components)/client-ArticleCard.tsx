'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import { IPost } from '@/app/api/type';
import { ThemeProvider } from '@mui/material/styles';
import { BlogTheme } from '@/app/theme';
import ArticleTages from './client-ArticleTags';

interface ArticleCardProps {
  post: IPost;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <ThemeProvider theme={BlogTheme}>
      <Box
        sx={{
          borderBottom: 1,
          borderBottomColor: grey[300],
          paddingBottom: 3.7,
          paddingTop: 0.7,
        }}
      >
        <Link href={`/${post.pageId}`}>
          <Card
            className=" max-h-[60px] sm:max-h-[100px] md:max-h-[100px]"
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
                flex: 1,
                flexDirection: 'column',
                paddingTop: 0,
                paddingRight: 8,
                paddingBottom: 1,
                paddingLeft: 0,
              }}
            >
              <div className=" line-clamp-2 overflow-hidden text-ellipsis sm:line-clamp-4">
                <h5 className=" mb-1 text-base font-semibold leading-6 sm:text-lg sm:leading-6 md:text-xl ">
                  {post.title}
                </h5>
                <div className=" hidden sm:visible sm:block">
                  <p className=" text-sm font-light text-neutral-400">
                    {post.description}
                  </p>
                </div>
              </div>
            </CardContent>
            {post.coverImageUrl && (
              <div className=" w-24 sm:w-32 md:w-36">
                <CardMedia
                  width={24}
                  component="img"
                  image={post.coverImageUrl}
                  alt={'preview image'}
                />
              </div>
            )}
          </Card>
        </Link>
        <ArticleTages post={post} />
      </Box>
    </ThemeProvider>
  );
}
