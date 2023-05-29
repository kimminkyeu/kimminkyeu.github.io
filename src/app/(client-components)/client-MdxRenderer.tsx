'use client';
import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote';
import {MDXProvider} from '@mdx-js/react';
import {MDXComponents} from 'mdx/types';
import Image from 'next/image';

/** ---------------------------------------------
 * @description MDX custom component for Image
 * @link https://nextjs.org/docs/pages/api-reference/components/image#priority
 * */
function ImageCustomComponent(props) {
  // https://fe-developers.kakaoent.com/2022/220714-next-image/
  return (
    <Image {...props} alt={'Image'} sizes="210px" width={320} height={320}/>
  );
}

interface ArticleMainProps {
  source: MDXRemoteProps;
}

// (1) https://github.com/hashicorp/next-mdx-remote
// (2) https://mdxjs.com/table-of-components/
// https://www.kevinpeters.net/remote-mdx-next-js
const customComponents = {
  img: (props) => <ImageCustomComponent {...props} />,
};

export default function MdxRenderer({source}: ArticleMainProps) {
  return (
    <div className="prose prose-neutral">
      <MDXRemote {...source} components={customComponents} lazy/>
    </div>
  );
}
