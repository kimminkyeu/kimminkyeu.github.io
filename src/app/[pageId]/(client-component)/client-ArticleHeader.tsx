import { IPost } from '@/app/api/type';
import ArticleTags from '@/app/(client-components)/client-ArticleTags';

interface ArticleHeaderProps {
  className?: string;
  post: IPost;
}

export default function ArticleHeader({ className, post }: ArticleHeaderProps) {
  return (
    <div className={`${className} mt-5`}>
      <div>
        <h1 className=" mb-3 text-2xl leading-[1.5] sm:text-3xl sm:leading-[1.5] md:text-[35px] md:leading-[1.5]">
          {post.title}
        </h1>
      </div>
      <h5 className=" mb-5 mt-0 font-normal leading-normal text-neutral-500">
        {post.description}
      </h5>
      <div className=" mb-1 mt-5 border-b" />
      <ArticleTags post={post} />
      <div className=" mb-5 mt-1 border-b" />
    </div>
  );
}
