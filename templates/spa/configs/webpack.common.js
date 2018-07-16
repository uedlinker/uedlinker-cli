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

  module: {
    rules: [
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
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}
