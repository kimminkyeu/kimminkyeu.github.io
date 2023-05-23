/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export', // (Fully Static App)
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
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

module.exports = nextConfig;
