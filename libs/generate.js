const fs = require('fs')
const ora = require('ora')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const fse = require('fs-extra')
const ignore = require('ignore')
const { spawn } = require('child_process')

const cwd = process.cwd()

module.exports = (templateName, dir) => {
  let destDir = cwd
  const spinner = ora()

  // 创建模板文件

  spinner.text = '正在创建模板文件'
  spinner.start()

  if (dir) {
    destDir = path.resolve(cwd, dir)

    if (fs.existsSync(destDir)) {
      spinner.stop()
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

  spinner.succeed('创建模板文件成功')

  // 安装依赖

  spinner.text = '正在安装依赖'
  spinner.start()

  const node = spawn('npm', ['install'], { cwd: destDir })
  const messages = []

  node.stderr.on('data', data => {
    messages.push(Buffer.from(data).toString())
  })

  node.on('exit', code => {
    if (code !== 0) spinner.fail('安装依赖失败')
    else spinner.succeed('安装依赖成功')

    if (messages.length) {
      console.log('\n')
      console.log(chalk.yellow('安装依赖时的警告或错误：\n'))
      console.log(messages.join(''))
    } else {
      console.log()
    }

    if (code === 0) {
      console.log(chalk.bold.green('创建成功！'))
      console.log()
      console.log('进入开发模式：')
      if (dir) console.log(`  $ cd ${dir}`)
      console.log('  $ npm run dev')
      console.log()
      console.log('更多命令请查看 package.json 文件中的 scripts 字段。')
      console.log()
    }
  })

  process.on('exit', () => {
    if (node) node.kill()
  })
}
