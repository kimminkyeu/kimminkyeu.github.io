/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');

const withExportImages = require('next-export-optimize-images');

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        remarkPlugins: [],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    },
});

const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    output: 'export', // (Fully Static App)
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        // unoptimized: true,
        // deviceSizes: [640, 960, 1280, 1600, 1920],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's2.us-west-2.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: '*notion.so',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    swcMinify: true,
};

module.exports = withPlugins(
    [
        withExportImages,
        withMDX,
    ],
    nextConfig
);
