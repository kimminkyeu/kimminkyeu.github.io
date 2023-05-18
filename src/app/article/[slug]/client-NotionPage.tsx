'use client'; // client component
import * as React from 'react';
import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import Link from 'next/link';
import Image from 'next/image';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prism-themes/themes/prism-one-dark.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import('prismjs/components/prism-clike.js'),
      import('prismjs/components/prism-c.js'),
      import('prismjs/components/prism-cpp.js'),
      import('prismjs/components/prism-csharp.js'),
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-js-templates.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-makefile.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-python.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-wasm.js'),
      import('prismjs/components/prism-yaml.js'),
    ]);
    return m.Code;
  }),
);

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false,
  },
);
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  },
);

export const NotionPage = ({
  recordMap,
  rootPageId,
  rootDomain,
}: //   rootPageId
{
  recordMap: ExtendedRecordMap;
  previewImagesEnabled?: boolean;
  rootPageId?: string;
  rootDomain?: string;
}) => {
  if (!recordMap) {
    return null;
  }

  return (
    <NotionRenderer
      fullPage={true}
      darkMode={false}
      showCollectionViewDropdown={false}
      showTableOfContents={true}
      minTableOfContentsItems={3}
      previewImages={!!recordMap.preview_images}
      // ---------------------
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={rootPageId}
      components={{
        // NOTE (transitive-bullshit 3/12/2023): I'm disabling next/image for this repo for now because the amount of traffic started costing me hundreds of dollars a month in Vercel image optimization costs. I'll probably re-enable it in the future if I can find a better solution.
        nextImage: Image,
        nextLink: Link,
        Code,
        Collection, // disable Collection to hide extra info panel
        Equation,
        Pdf,
        Modal,
      }}
      // NOTE: custom images will only take effect if previewImages is true and
      // if the image has a valid preview image defined in recordMap.preview_images[src]
    />
  );
};
