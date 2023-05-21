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

interface ArticleCardProps {
  title: string;
  description?: string;
  tags?: string[];
  image?: string;
  alt?: string;
}

export default function ArticleCard_ClientComponent(props: ArticleCardProps) {
  const renderTags = (strs: readonly string[]) => {
    return strs.map((nameOfTag, i) => (
      <Chip key={i} label={nameOfTag} size="small" variant="outlined" />
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
              {props.title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              {props.description}
            </Typography>
            <Stack direction="row" spacing={1} marginTop={'auto'}>
              {renderTags(props.tags)}
            </Stack>
          </CardContent>
          {props.image && (
            <CardMedia
              component="img"
              sx={{ width: '30%' }}
              image={props.image}
              alt={props.alt}
            />
          )}
        </Card>
      </CardActionArea>
    </Box>
  );
}
