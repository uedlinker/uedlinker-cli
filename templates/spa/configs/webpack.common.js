const path = require('path')
const { appPath, entry, outputPath } = require('./paths')

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
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
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
