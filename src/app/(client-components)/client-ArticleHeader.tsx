import {IPost} from '@/app/api/type';
import ArticleTags from '@/app/(client-components)/client-ArticleTags';
import * as React from "react";

interface ArticleHeaderProps {
  className?: string;
  post?: IPost;
}

const DummyText = String('-').repeat(100);

export default function ArticleHeader({className, post}: ArticleHeaderProps) {
  return (
    <div className={`${className} mt-5`}>
      <div>
        <p className="text-neutral-500">
          {post ? post.publishDate : DummyText}
        </p>
        <h1 className=" my-3 text-2xl leading-[1.5] sm:text-3xl sm:leading-[1.5] md:text-[35px] md:leading-[1.5]">
          {post ? post.title : DummyText}
        </h1>
      </div>
      <h3 className=" mb-5 mt-0 font-normal leading-normal text-neutral-500">
        {post ? post.description : DummyText}
      </h3>
      <div className=" mb-3 mt-5 border-b"/>
      {post && <ArticleTags post={post}/>}
      <div className=" mb-5 mt-3 border-b"/>
    </div>
  );
}
