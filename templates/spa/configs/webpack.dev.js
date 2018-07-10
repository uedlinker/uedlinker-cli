const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common')
const { isDev } = require('./env')
const { appPath, staticPath } = require('./paths')

if (!isDev) {
  throw new Error('运行 webpack 开发环境的配置时，必须设置 NODE_ENV 的值为 development。')
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  output: {
    filename: 'public/js/bundle.js',
    chunkFilename: 'public/js/[name].chunk.js',
    pathinfo: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BABEL_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(appPath, './src/index.html'),
    }),
  ],

  devServer: {
    compress: true,
    contentBase: staticPath,
    historyApiFallback: {
      disableDotRule: true,
    },
    host: '0.0.0.0',
    open: true,
    openPage: '',
    overlay: true,
    port: 3000,
    useLocalIp: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
})
