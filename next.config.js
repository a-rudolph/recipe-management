const path = require('path')
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
  },
  webpack: (config, options) => {
    const resolve = {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
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
