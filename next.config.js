/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: isProd ? '/Muxster' : '',
  assetPrefix: isProd ? '/Muxster/' : ''
}

module.exports = nextConfig
