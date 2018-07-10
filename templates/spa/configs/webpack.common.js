const path = require('path')
const { appPath, entry, srcPath, outputPath } = require('./paths')

module.exports = {
  context: appPath,
  entry,

  output: {
    path: outputPath,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        exclude: [/[/\\\\]node_modules[/\\\\]/],
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['env', 'stage-0', 'react', 'flow'],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(bmp|png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'public/images/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'public/fonts/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      assets: path.resolve(appPath, './src/assets'),
      components: path.resolve(appPath, './src/components'),
      configs: path.resolve(appPath, './src/configs'),
      libs: path.resolve(appPath, './src/libs'),
      models: path.resolve(appPath, './src/models'),
      store: path.resolve(appPath, './src/store'),
      styles: path.resolve(appPath, './src/styles'),
      utils: path.resolve(appPath, './src/utils'),
    },
  },
}
