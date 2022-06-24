const path = require('path')
const withLess = require('next-with-less')
const withPWA = require('next-pwa')

module.exports = withLess(
  withPWA({
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
    webpack: (config, options) => {
      const resolve = {
        alias: {
          '@components': path.resolve(__dirname, 'src/components'),
          '@constants': path.resolve(__dirname, 'src/constants'),
          '@hooks': path.resolve(__dirname, 'src/hooks'),
          '@pages': path.resolve(__dirname, 'pages'),
          '@styles': path.resolve(__dirname, 'src/styles'),
          '@layouts': path.resolve(__dirname, 'src/layouts'),
          '@utils': path.resolve(__dirname, 'src/utils'),
        },
      }

      return {
        ...config,
        plugins: [
          ...config.plugins,
          new options.webpack.DefinePlugin({
            IS_PRODUCTION: process.env.IS_PRODUCTION,
          }),
        ],
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            ...resolve.alias,
          },
        },
      }
    },
  })
)
