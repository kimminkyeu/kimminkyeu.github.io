/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

let isLocalBuild =
  process.env.npm_lifecycle_script ===
  'NODE_ENV=development next build && next export'

// Q: 왜 외부 이미지는 아래처럼 해야 하는가?
// A: https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
const nextConfig = {
  // output: 'export',
  experimental: {
    // 서버에서 데이터를 re-fetch 하도록 하기 위함.
    // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
    serverActions: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's2.us-west-2.amazonaws.com',
        port: '',
        pathname: '/',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'notion.so',
        port: '',
        pathname: '/',
      },
    ],
  },
  swcMinify: true,
  ...withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  }),
  assetPrefix: isLocalBuild
    ? '/Users/ittae/GitHub/get6.github.io/out/'
    : undefined,
}

module.exports = nextConfig
