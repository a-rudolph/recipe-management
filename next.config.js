const withLess = require('next-with-less')
const withPWA = require('next-pwa')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  lessLoaderOptions: {},
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    customWorkerDir: 'serviceworker',
  },
  experimental: {
    styledComponents: true,
  },
  swcMinify: true,
}

module.exports = withLess(withPWA(nextConfig))
