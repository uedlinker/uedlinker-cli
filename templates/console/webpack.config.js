const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

const isProd = process.env.NODE_ENV === 'production'

module.exports = defaultConfig => {
  defaultConfig.resolve.alias = {
    ...defaultConfig.resolve.alias,
    Components: path.resolve(__dirname, 'src/components'),
    Pages: path.resolve(__dirname, 'src/pages'),
  }

  const scssRule = defaultConfig.module.rules.find(
    rule => rule.test instanceof RegExp && (rule.test.source === /\.scss$/.source)
  )

  scssRule.use = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: true,
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ]

  defaultConfig.module.rules.push({
    test: /\.less$/,
    use: [{
      loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    }, {
      loader: 'css-loader', // translates CSS into CommonJS
    }, {
      loader: 'less-loader', // compiles Less to CSS
      options: {
        modifyVars: {
          'primary-color': '#255CF1',
        },
        javascriptEnabled: true,
      },
    }],
  })

  return defaultConfig
}
