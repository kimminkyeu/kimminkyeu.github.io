"use client";
import ArticleCard from '@/app/(client-components)/client-ArticleCard';
import { IPost, PropertyTag } from '../api/type';
import React from 'react';
import { Chip, Stack } from '@mui/material';
import { getMuiColorByTagColor } from '@/utils/helper';


interface ChoosedTagProps {
  choosedTag: PropertyTag;
  setChoosedTag: React.Dispatch<React.SetStateAction<PropertyTag>>;
}

function ChoosedTag({choosedTag, setChoosedTag}: ChoosedTagProps) {

  const handleDelete = () => {
    setChoosedTag(null);
  }

  if (choosedTag) {
  return (
    <Chip
          label={choosedTag.name}
          size="small"
          variant="outlined"
          onDelete={handleDelete}
          style={{
            // color: '#000',
            color: getMuiColorByTagColor(choosedTag.color),
            borderColor: getMuiColorByTagColor(choosedTag.color),
            // backgroundColor: getMuiColorByTagColor(choosedTag.color),
            // fontSize: '0.8rem',
            fontWeight: 400,
            borderRadius: 4,
            // height: '1.3rem',
          }}
        />
  );
 } else {
  return <></>;
 }

}

interface ArticleListProps {
    posts: IPost[];
}

export default function ArticleList({posts}: ArticleListProps) { 
  const [choosedPosts, setChoosedPosts] = React.useState<IPost[]>(posts);
  const [choosedTag, setChoosedTag] = React.useState<PropertyTag | null>(null);

  React.useEffect(() => {
    if (choosedTag === null) {
      setChoosedPosts(posts); // 초기화.
    } else {
      // (1) tag가 사라지면, 초기화하기.
      setChoosedPosts((prev) => {
        const new_posts = prev.filter((post) => post.tags.includes(choosedTag));
        return new_posts;
      })
    }
   }, [choosedTag]);

  const renderList = () => {
    return choosedPosts.map((post, i) => (
      <div className="mb-4" key={i}>
        <ArticleCard post={post} setChoosedTag={setChoosedTag}/>
      </div>
    ));
  };

  return (
    <div>
      <div className="mt-5 flex flex-col md:flex-row">
          <div className='border-1'>
            <h3>Categories</h3>
            <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
              <ChoosedTag choosedTag={choosedTag} setChoosedTag={setChoosedTag} />
            </Stack>
          </div>
          <div className='flex-row'>
            {renderList()}
          </div>
      </div>
    </div>
  );
}
