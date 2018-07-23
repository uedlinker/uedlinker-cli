const cssnano = require('cssnano')
const merge = require('webpack-merge')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = require('./webpack.common')
const { appPath, srcPath, staticPath } = require('./paths')

module.exports = merge(common, {
  mode: 'production',
  bail: true,

  output: {
    filename: 'public/js/[name].[chunkhash].js',
    chunkFilename: 'public/js/[name].[chunkhash].js',
    // 这里可以配置 CDN 的地址
    // publicPath: 'https://domain.com/',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: srcPath,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        include: srcPath,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['env', 'stage-0', 'react'],
            plugins: [
              'transform-decorators-legacy',
              'syntax-dynamic-import',
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer(),
                cssnano(),
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer(),
                cssnano(),
              ],
            },
          },
          'sass-loader',
        ],
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

  plugins: [
    new CleanWebpackPlugin(['dist'], { root: appPath }),
    new CopyWebpackPlugin([
      { from: staticPath },
    ]),
    new MiniCssExtractPlugin({
      filename: 'public/css/[name].[chunkhash].css',
      chunkFilename: 'public/css/[name].[chunkhash].css',
    }),
    new ManifestPlugin(),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
})
