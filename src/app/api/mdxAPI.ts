import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus'; // 코드 하이라이팅.
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from 'remark-toc'; // 목차 생성.

// ------------------------------------------
// [ MDX ]
// -- https://mraddict.one/blog/implement-markdown
// -- https://bepyan.github.io/blog/nextjs-blog/3-mdx-plugin
// -- https://nextjs.org/docs/pages/building-your-application/configuring/mdx
export async function serializeMdx(source: string) {
  return serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkToc, remarkGfm],
      rehypePlugins: [
        remarkGfm,
        rehypeSlug,
        rehypeCodeTitles,
        [rehypePrism, { showLineNumbers: true, ignoreMissing: true }],
        [rehypeAutolinkHeadings, { behavior: 'anchor' }],
      ],
      format: 'mdx',
    },
  });
}
// -------------------------------------------
