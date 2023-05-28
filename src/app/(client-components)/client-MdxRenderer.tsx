'use client'
import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote';
import {MDXProvider} from "@mdx-js/react";
import {MDXComponents} from "mdx/types";
import Image from 'next/image';

/** ---------------------------------------------
 * @description MDX custom component for Youtube.
 * @param id */
function YouTubeComponent({id}: { id: string }) {
  return (
    <iframe
      width="100%"
      height="450"
      src={"https://www.youtube.com/embed/" + id}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}

/** ---------------------------------------------
 * @description MDX custom component for Image */
function ImageCustomComponent(props) {
  // https://fe-developers.kakaoent.com/2022/220714-next-image/
  return (
    <Image {...props} sizes="210px" width={210} height={210}/>
  );
}

interface ArticleMainProps {
  source: MDXRemoteProps;
}

// (1) https://github.com/hashicorp/next-mdx-remote
// (2) https://mdxjs.com/table-of-components/
// https://www.kevinpeters.net/remote-mdx-next-js
const customComponents = {
  // img: (props) => <ImageCustomComponent {...props} />,
  // YouTubeComponent
};

export default function MdxRenderer({source}: ArticleMainProps) {
  // console.log('------------------------------');
  // console.log(source.compiledSource);
  // console.log('------------------------------');
  return (
    <div className="prose prose-neutral">
      <MDXRemote {...source} components={customComponents}/>
      {/*<MDXRemote {...source} />*/}
    </div>
  );
}
