'use client';
import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote';
import Image from 'next/image';

/** -------------------------------------------------
 * @description [ MDX custom component for Image ]
 * @link https://nextjs.org/docs/pages/api-reference/components/image#priority
 * @link https://fe-developers.kakaoent.com/2022/220714-next-image/
 * @link https://next-export-optimize-images.vercel.app/docs/comparison
 * */
export function ImageCustomComponent(props) {
  if (process.env.NODE_ENV === "development") { // on next dev, do not use custom optimizer
    // next-export-optimize-images
    return <Image style={{objectFit: 'cover'}} {...props} alt={'Image'} sizes="210px" width={400} height={320}/>
  } else {
    // defualt image loader
    return <Image style={{objectFit: 'cover'}} {...props} alt={'Image'} width={400} height={320} placeholder="blur"/>
  }
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
    <div className="max-w-none prose prose-neutral">
      <MDXRemote {...source} components={customComponents} lazy/>
    </div>
  );
}
