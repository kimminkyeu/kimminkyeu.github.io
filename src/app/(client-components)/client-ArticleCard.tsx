'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import { IPost } from '@/app/api/type';

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
    <Box
      sx={{
        borderBottom: 1,
        borderBottomColor: grey[300],
        paddingBottom: 2,
        paddingTop: 1,
      }}
    >
      <Link href={`/${post.pageId}`}>
        {/* <CardActionArea disableRipple disableTouchRipple disabled> */}
        <Card
          sx={{
            display: 'flex',
            maxHeight: 100,
            justifyContent: 'space-between',
            boxShadow: 0, // turn of shadow
            borderRadius: 0,
            marginBottom: 3,
          }}
        >
          <CardContent
            sx={{
              // flex: '1 0 auto',
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              paddingTop: 0.5,
              paddingRight: 5,
              paddingBottom: 0,
              paddingLeft: 0,
            }}
          >
            <Typography
              paddingBottom={0.5}
              component="h5"
              variant="h5"
              fontWeight={600}
            >
              {post.title}
            </Typography>
            <Typography
              sx={{
                //  3 line 이상일 경우 ...으로 생략!
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
              }}
              variant="subtitle2"
              color={grey[500]}
              component="div"
              fontWeight={200}
            >
              {post.description}
            </Typography>
          </CardContent>
          {post.coverImageUrl && (
            <CardMedia
              component="img"
              sx={{ maxWidth: '27%', minWidth: '25%' }}
              image={post.coverImageUrl}
              alt={'preview image'}
            />
          )}
        </Card>
        {/* </CardActionArea> */}
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
  );
}
