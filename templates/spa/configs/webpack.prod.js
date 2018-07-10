const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = require('./webpack.common')
const { isProd } = require('./env')
const { appPath } = require('./paths')

if (!isProd) {
  throw new Error('运行 webpack 生产环境的配置时，必须设置 NODE_ENV 的值为 production。')
}

module.exports = merge(common, {
  mode: 'production',
  bail: true,

  output: {
    filename: 'js/[chunkhash].js',
    chunkFilename: 'js/[chunkhash].js',
    // 这里可以配置 CDN 的地址
    // publicPath: 'https://domain.com/',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], { root: appPath }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BABEL_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].bundle.css',
      chunkFilename: '[name].[chunkhash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(appPath, './src/index.html'),
    }),
  ],
})
