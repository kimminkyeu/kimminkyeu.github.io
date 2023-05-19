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

interface ArticleCardProps {
  title: string;
  description?: string;
  tags?: string[];
  image?: string;
  alt?: string;
}

export default function ArticleCard(props: ArticleCardProps) {
  const renderTags = (strs: readonly string[]) => {
    return strs.map((nameOfTag, i) => (
      <Chip key={i} label={nameOfTag} color="info" size="small" />
    ));
  };

  return (
    <CardActionArea>
      <Card
        sx={{
          display: 'flex',
          maxHeight: 200,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent
            sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}
          >
            <Typography component="div" variant="h5">
              {props.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {props.description}
            </Typography>
            <Stack direction="row" spacing={1}>
              {renderTags(props.tags)}
            </Stack>
          </CardContent>
        </Box>
        {props.image && (
          <CardMedia
            component="img"
            sx={{ height: 130, width: '30%' }}
            image={props.image}
            alt={props.alt}
          />
        )}
      </Card>
    </CardActionArea>
  );
}
