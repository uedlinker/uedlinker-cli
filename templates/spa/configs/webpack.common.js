const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { appPath, entryPath, outputPath, templatePath } = require('./paths')

module.exports = {
  context: appPath,
  entry: entryPath,

  output: {
    path: outputPath,
    publicPath: '/',
  },

  resolve: {
    modules: [
      path.resolve(appPath, 'src'),
      path.resolve(appPath, 'node_modules'),
    ],
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

  plugins: [
    new webpack.DefinePlugin({
      'process.env.RUNTIME': JSON.stringify(process.env.RUNTIME),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: templatePath,
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
  },
}
