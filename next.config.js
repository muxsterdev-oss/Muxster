/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose', // needed for Wagmi/Viem
  },
  output: 'export', // static HTML for GitHub Pages
  basePath: isProd ? '/Muxster' : '',
  images: { unoptimized: true },
};

module.exports = nextConfig;
