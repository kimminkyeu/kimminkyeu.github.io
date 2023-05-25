'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';

interface ArticleMainProps {
  source: MDXRemoteProps;
}

export default function ArticleMain_MDX({ source }: ArticleMainProps) {
  return (
    <div className="prose">
      <MDXRemote {...source} />
    </div>
  );
}
