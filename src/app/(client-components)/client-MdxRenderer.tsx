'use client';
import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote';
import Image from 'next/image';

/** ---------------------------------------------
 * @description MDX custom component for Image
 * @link https://nextjs.org/docs/pages/api-reference/components/image#priority
 * */
function ImageCustomComponent(props) {
  // https://fe-developers.kakaoent.com/2022/220714-next-image/
  // https://next-export-optimize-images.vercel.app/docs/comparison
  return (
    // next-image-export-optimizer 가 next/image 컴포넌트의 기능을 덮어쓰고 있음.
    <Image {...props} alt={'Image'} sizes="210px" width={320} height={320} placeholder="blur"/>

    // defualt image loader
    // <Image {...props} alt={'Image'} sizes="210px" width={320} height={320}/>
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
