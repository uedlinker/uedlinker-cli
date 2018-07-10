const fs = require('fs')
const path = require('path')

const appPath = fs.realpathSync(process.cwd())
const entry = path.resolve(appPath, './src/index.jsx')
const staticPath = path.resolve(appPath, './static')

if (!fs.existsSync(entry)) {
  throw new Error(`找不到入口文件：${entry}，请新建此文件`)
}

if (!fs.existsSync(staticPath)) {
  throw new Error(`找不到静态文件目录：${staticPath}，请新建此目录`)
}

module.exports = {
  appPath,
  entry,
  staticPath,
  srcPath: path.resolve(appPath, './src'),
  outputPath: path.resolve(appPath, './dist'),
}
