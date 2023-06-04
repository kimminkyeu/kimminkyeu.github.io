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
      <div className="prose prose-neutral">
        <p className="text-neutral-500 ">
          {post ? post.publishDate : DummyText}
        </p>
        <h1 className="my-3 leading-[1.5] text-2xl font-bold sm:text-3xl sm:leading-[1.5] sm:font-extrabold md:text-4xl md:leading-[1.5] md:font-black">
          {post ? post.title : DummyText}
        </h1>
      <h5 className=" mb-5 mt-0 leading-normal text-neutral-500">
        {post ? post.description : DummyText}
      </h5>
      </div>
      <div className=" mb-3 mt-5 border-b"/>
      {post && <ArticleTags post={post}/>}
      <div className=" mb-5 mt-3 border-b"/>
    </div>
  );
}
