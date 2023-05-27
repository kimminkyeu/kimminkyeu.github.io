'use client'
import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote';
import {MDXProvider} from "@mdx-js/react";
import {MDXComponents} from "mdx/types";
import Image from 'next/image';


// (1) https://github.com/hashicorp/next-mdx-remote
// (2) https://mdxjs.com/table-of-components/
// https://www.kevinpeters.net/remote-mdx-next-js
// ---------------------------------------
// MDX Remote은 내분에서 MDXProvider를 사용한다.
// 위 링크를 잘 보면, 내부에서 특정 html 태그에 대한 컴포넌트를 직접 결정할 수 있다.
// 이걸 바탕으로, 동영상 링크 임베드 (iframe)도 넣을 수 있지 않을 까?

const components = {
  img: (props) => <ImageCustomComponent {...props} />,
};


// https://fe-developers.kakaoent.com/2022/220714-next-image/
export function ImageCustomComponent(props) {
  return (
    <Image {...props} sizes="210px" width={210} height={210}/>
  );
}

interface ArticleMainProps {
  source: MDXRemoteProps;
}

export default function MdxRenderer({source}: ArticleMainProps) {


  return (
    <div className="prose prose-neutral">
      {/*<MDXProvider components={components}>*/}
      {/*<MDXRemote {...source} components={components}/>*/}
      <MDXRemote {...source} />
      {/*</MDXProvider>*/}
    </div>
  );
}
