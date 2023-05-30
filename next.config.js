/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withExportImages = require('next-export-optimize-images');
const {RuntimeError} = require("next/dist/client/components/react-dev-overlay/internal/container/RuntimeError");

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

let pluginsArray;
let imageOptimizeOption;

if (process.env.NODE_ENV === "production") {
    // if Production, use (next-export-optimize-images)
    pluginsArray = [withMDX, withExportImages];
    imageOptimizeOption = {
        deviceSizes: [640, 960, 1280, 1600, 1920]
    }
} else if (process.env.NODE_ENV === "development") {
    imageOptimizeOption = {
        unoptimized: true,
    }
    pluginsArray = [withMDX];
} else {
    throw Error();
}

const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    output: 'export',
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        ...imageOptimizeOption,
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
    [...pluginsArray],
    nextConfig
);
