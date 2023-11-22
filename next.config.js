/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    }),
      config.module.rules.push({
        test: /\.html$/,
        loader: 'html-loader',
      })

    return config
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['familyfortunate.s3.ap-southeast-2.amazonaws.com'],
  },
}

module.exports = nextConfig
