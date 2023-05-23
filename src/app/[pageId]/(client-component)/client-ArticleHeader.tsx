'use client';

import { IPost } from '@/app/api/type';
import { Divider } from '@mui/material';

interface ArticleHeaderProps {
  className?: string;
  postInfo: IPost;
}

export default function ArticleHeader({
  className,
  postInfo,
}: ArticleHeaderProps) {
  return (
    <div className={`${className} mt-5`}>
      <h1 className=" mb-2 text-5xl">{postInfo.title}</h1>
      <h5 className=" mt-0 font-light text-neutral-400">
        {postInfo.description}
      </h5>
      <p className=" mb-2">{postInfo.publishDate}</p>
      <Divider />
    </div>
  );
}
