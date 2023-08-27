/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.module.rules.push({
      test: /\.html$/,
      loader: 'html-loader',
    })

    return config
  },
}

module.exports = nextConfig
