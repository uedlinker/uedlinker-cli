const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const fse = require('fs-extra')
const ignore = require('ignore')

const cwd = process.cwd()

module.exports = (templateName, dir) => {
  let destDir = cwd

  if (dir) {
    destDir = path.resolve(cwd, dir)

    if (fs.existsSync(destDir)) {
      console.log(chalk.red(
        `当前目录下已经存在目录 ${dir}，` +
        `为了避免覆盖原来的文件，` +
        `请重新指定目标目录或删除 ${dir} 目录`
      ))
      process.exit(1)
    }

    fse.ensureDirSync(destDir)
  }

  const templateDir = path.resolve(__dirname, '../templates', `./${templateName}`)
  const gitignoreFilePath = path.resolve(templateDir, './gitignore')
  const gitignoreFileContent = fs.readFileSync(gitignoreFilePath).toString()

  let templateFilenames = glob.sync('**/*', {
    cwd: templateDir,
    dot: true,
    ignore: ['node_modules/**'],
  })
  templateFilenames = ignore().add(gitignoreFileContent).filter(templateFilenames)

  templateFilenames.forEach(filename => {
    const src = path.resolve(templateDir, filename)
    const dest = path.resolve(destDir, filename)
    fse.copySync(src, dest)
  })

  fs.renameSync(
    path.resolve(destDir, 'gitignore'),
    path.resolve(destDir, '.gitignore')
  )

  console.log(chalk.green('创建成功！'))
}
