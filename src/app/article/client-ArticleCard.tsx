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

export default function ArticleCard_ClientComponent({
  post,
}: ArticleCardProps) {
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
      }}
    >
      <Link href={`/article/${post.pageId}`}>
        <CardActionArea disableRipple disableTouchRipple disabled>
          <Card
            sx={{
              display: 'flex',
              maxHeight: 100,
              justifyContent: 'space-between',
              boxShadow: 0, // turn of shadow
              borderRadius: 0,
            }}
          >
            <CardContent
              sx={{
                flex: '1 0 auto',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 0.5,
                paddingBottom: 0,
                paddingX: 0,
              }}
            >
              <Typography component="div" variant="h5">
                {post.title}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                {post.description}
              </Typography>
            </CardContent>
            {post.coverImageUrl && (
              <CardMedia
                component="img"
                sx={{ width: '30%' }}
                image={post.coverImageUrl}
                alt={'preview image'}
              />
            )}
          </Card>
        </CardActionArea>
      </Link>
      {/* Info --------------------------------------------------- */}
      <Stack
        direction="row"
        spacing={1}
        marginTop={'auto'}
        sx={{ alignItems: 'center' }}
      >
        <Typography component="div" variant="caption">
          {post.publishDate}
        </Typography>
        {renderTags(post.tags)}
      </Stack>
      {/* Info --------------------------------------------------- */}
    </Box>
  );
}
