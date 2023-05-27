import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus'; // 코드 하이라이팅.
import rehypeCodeTitles from 'rehype-code-titles'; // 코드 제목
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; // 헤딩 링크 생성
import rehypeKatex from 'rehype-katex'; // 수식
import rehypeSanitize from 'rehype-sanitize'; // sanitize html
import remarkToc from 'remark-toc'; // 목차 생성
import { MDXRemoteSerializeResult } from 'next-mdx-remote'; // 목차 생성.

// you have to load css manual
// import 'prismjs/themes/prism-coy.css'
// import '@/app/styles/intellij-prism.css';
// import 'prism-themes/themes/prism-one-dark.css'
import '@/app/styles/one-dark.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/components/';

// ------------------------------------------
// [ MDX ]
// -- https://mraddict.one/blog/implement-markdown
// -- https://bepyan.github.io/blog/nextjs-blog/3-mdx-plugin
// -- https://nextjs.org/docs/pages/building-your-application/configuring/mdx

interface processResult {
  serializedMdx: MDXRemoteSerializeResult; // 최종 처리된 mdx
  // frontMatter: {
  //   readingTime: ReadTimeResults;
  // }
}

export async function processMdx(source: string): Promise<processResult> {
  const _serializedMdx = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkBreaks, remarkToc, remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeSlug,
        rehypeKatex,
        rehypeSanitize,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
  });
  // const _wordCount = source.split(/\s+/gu).length;
  // const _readTime = readingTime(source);
  return {
    serializedMdx: _serializedMdx,
    // frontMatter: {
    //   readingTime: _readTime,
    // }
  };
}

// -------------------------------------------
