const fs = require('fs')
const path = require('path')

const cwd = fs.realpathSync(process.cwd())
const entry = path.resolve(cwd, './src/index.jsx')

if (!fs.existsSync(entry)) {
  throw new Error(`找不到入口文件：${entry}`)
}

module.exports = {
  appDir: cwd,
  entry,
  outputPath: path.resolve(cwd, './dist'),
}
