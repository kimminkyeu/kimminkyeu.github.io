'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import {Stack} from '@mui/material';
import {grey} from '@mui/material/colors';
import Link from 'next/link';
import {IPost} from '@/app/api/type';
import {ThemeProvider} from '@mui/material/styles';
import {BlogTheme} from '@/app/theme';
import ArticleTages from './client-ArticleTags';
// import Image from 'next/image';
import {ImageCustomComponent} from "@/app/(client-components)/client-MdxRenderer";

interface ArticleCardProps {
  post: IPost;
}

export default function ArticleCard({post}: ArticleCardProps) {
  return (
    <ThemeProvider theme={BlogTheme}>
      <Box
        sx={{
          backgroundColor: 'white',
          borderBottom: 1,
          borderBottomColor: grey[300],
          paddingTop: 0.7,
        }}
      >
        <p className=" text-sm text-neutral-500">
          {post.publishDate}
        </p>
        <Link href={`/${post.pageId}`}>
          <Card
            className="max-h-[60px] sm:max-h-[100px] md:max-h-[100px]"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: 0, // turn of shadow
              borderRadius: 0,
              marginTop: 1.5,
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                flexDirection: 'column',
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 1,
                paddingLeft: 0,
              }}
            >
              <div className=" line-clamp-2 overflow-hidden text-ellipsis sm:line-clamp-4">
                <h5
                  className=" mb-1 text-base font-semibold leading-6 sm:text-lg sm:leading-6 md:text-xl md:font-bold ">
                  {post.title}
                </h5>
                <div className=" hidden sm:visible sm:block">
                  <p className=" text-sm font-light text-neutral-500 md:text-[15px]">
                    {post.description}
                  </p>
                </div>
              </div>
            </CardContent>
            {post.coverImageUrl && (
              <div className=" ml-6 flex w-20 sm:ml-11 sm:w-28">
                <ImageCustomComponent src={post.coverImageUrl}/>
                {/*<CardMedia*/}
                {/*  loading={'lazy'}*/}
                {/*  component="img"*/}
                {/*  image={post.coverImageUrl}*/}
                {/*  alt={'preview image'}*/}
                {/*/>*/}
              </div>
            )}
          </Card>
        </Link>
        <div className="mb-3 mt-4 md:mt-6">
          <ArticleTages post={post}/>
        </div>
      </Box>
    </ThemeProvider>
  );
}
