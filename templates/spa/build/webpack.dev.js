const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common')
const { isDev } = require('./env')
const { appDir, outputPath } = require('./paths')

if (!isDev) {
  throw new Error('运行 webpack 开发环境的配置时，必须设置 NODE_ENV 的值为 development。')
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',
    pathinfo: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
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

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BABEL_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(appDir, './src/index.html'),
    }),
  ],

  devServer: {
    contentBase: outputPath,
    historyApiFallback: {
      disableDotRule: true,
    },
    host: '0.0.0.0',
    clientLogLevel: 'none',
    open: true,
    openPage: '',
    overlay: true,
    port: 3000,
    publicPath: '/',
  },
})
