const fs = require('fs')
const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')
const ignore = require('ignore')

const cwd = process.cwd()

const init = function (dir) {
  let distDir = cwd

  // 如果在命令中传入了 dir 参数，则生成模板文件到这个目录
  if (dir) {
    distDir = path.resolve(cwd, dir)

    if (fs.existsSync(distDir)) {
      console.error(
        `当前目录下已经存在目录 ${dir}，` +
        `为了避免覆盖原来的文件，` +
        `请重新指定目标目录或删除 ${dir} 目录`
      )
      process.exit(1)
    }
  }

  const spaDir = path.resolve(__dirname, '../templates/spa')

  // 下面使用了 `gitignore` 而不是 `.gitignore`，
  // 因为在 npm 发包时，会自动忽略 `.gitignore` 文件
  const ignoreFilePath = path.resolve(spaDir, './gitignore')
  const ignoreFileContent = fs.readFileSync(ignoreFilePath).toString()

  // 获取要被复制的文件的路径数组
  let templateFilenames = glob.sync('**/*', {
    cwd: spaDir,
    dot: true,
    ignore: ['node_modules/**', 'dist/**'],
  })
  templateFilenames = ignore().add(ignoreFileContent).filter(templateFilenames)

  console.log('正在创建模板...')

  if (distDir !== cwd) {
    fse.ensureDirSync(distDir)
  }

  // 复制模板文件
  templateFilenames.forEach(filename => {
    const src = path.resolve(spaDir, filename)
    const dest = path.resolve(distDir, filename)
    fse.copySync(src, dest)
  })

  // 重命名 `gitignore` 为 `.gitignore`
  fs.renameSync(
    path.resolve(distDir, 'gitignore'),
    path.resolve(distDir, '.gitignore')
  )

  console.log(`创建完成`)
}

module.exports = init
