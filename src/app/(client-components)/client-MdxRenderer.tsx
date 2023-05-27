'use client';

import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote';
import {MDXProvider} from "@mdx-js/react";
import {MDXComponents} from "mdx/types";

interface ArticleMainProps {
  source: MDXRemoteProps;
}

// (1) https://github.com/hashicorp/next-mdx-remote
// (2) https://mdxjs.com/table-of-components/
// ---------------------------------------
// MDX Remote은 내분에서 MDXProvider를 사용한다.
// 위 링크를 잘 보면, 내부에서 특정 html 태그에 대한 컴포넌트를 직접 결정할 수 있다.
// 이걸 바탕으로, 동영상 링크 임베드 (iframe)도 넣을 수 있지 않을 까?
export default function MdxRenderer({source}: ArticleMainProps) {
  return (
    <div className="prose prose-neutral">
      <MDXRemote {...source} />
    </div>
  );
}
