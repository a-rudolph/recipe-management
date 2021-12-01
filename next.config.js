const path = require('path')

module.exports = {
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

    console.log(options)

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
}
