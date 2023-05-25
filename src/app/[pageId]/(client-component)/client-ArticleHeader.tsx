import { IPost } from '@/app/api/type';
import ArticleTages from '@/app/(client-components)/client-ArticleTags';

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
      <div>
        <h1 className=" mb-3 text-2xl leading-[1.5] sm:text-3xl sm:leading-[1.5] md:text-[35px] md:leading-[1.5]">
          {postInfo.title}
        </h1>
      </div>
      <h5 className=" mb-5 mt-0 font-normal leading-normal text-neutral-400">
        {postInfo.description}
      </h5>
      <ArticleTages postInfo={postInfo} />
      <div className=" my-5 mt-3 border-b" />
    </div>
  );
}
