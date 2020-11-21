const path = require('path')

module.exports = {
  webpack: (config) => {
    const resolve = {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    }

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...resolve.alias,
        },
      },
    }
  },
}
