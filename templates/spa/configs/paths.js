const fs = require('fs')
const path = require('path')

const appPath = fs.realpathSync(process.cwd())
const staticPath = path.resolve(appPath, './static')
const entryPath = path.resolve(appPath, './src/index.jsx')
const templatePath = path.resolve(appPath, './src/index.html')

if (!fs.existsSync(entryPath)) {
  throw new Error(`找不到入口文件：${entryPath}，请新建此文件`)
}

if (!fs.existsSync(templatePath)) {
  throw new Error(`找不到模板文件：${templatePath}，请新建此文件`)
}

if (!fs.existsSync(staticPath)) {
  throw new Error(`找不到静态文件目录：${staticPath}，请新建此目录`)
}

module.exports = {
  appPath,
  entryPath,
  staticPath,
  templatePath,
  srcPath: path.resolve(appPath, './src'),
  outputPath: path.resolve(appPath, './dist'),
}
