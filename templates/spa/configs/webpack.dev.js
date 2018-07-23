const merge = require('webpack-merge')
const autoprefixer = require('autoprefixer')

const common = require('./webpack.common')
const { staticPath, srcPath } = require('./paths')

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
              'react-hot-loader/babel',
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer(),
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer(),
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
              name: 'public/images/[name].[ext]',
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
              name: 'public/fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },

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
    clientLogLevel: 'none',
  },
})
