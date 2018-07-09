const path = require('path')
const { appDir, entry, outputPath, publicPath } = require('./paths')

module.exports = {
  context: appDir,
  entry,

  output: {
    path: outputPath,
    publicPath,
  },

  module: {
    strictExportPresence: true,
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      assets: path.resolve(appDir, './src/assets'),
      components: path.resolve(appDir, './src/components'),
      configs: path.resolve(appDir, './src/configs'),
      libs: path.resolve(appDir, './src/libs'),
      models: path.resolve(appDir, './src/models'),
      store: path.resolve(appDir, './src/store'),
      styles: path.resolve(appDir, './src/styles'),
      utils: path.resolve(appDir, './src/utils'),
    },
  },
}
