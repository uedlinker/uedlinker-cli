const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const generate = require('./generate')

console.log()
console.log(chalk.bold('快速生成项目开发模板（单页应用、服务器渲染）\n'))

inquirer.prompt([{
  name: 'templateName',
  type: 'list',
  message: '请选择需要生成的模板类型：',
  choices: [
    { name: '单页应用（SPA）', value: 'spa' },
    { name: '服务器端渲染（SSR）', value: 'ssr' },
  ],
}, {
  name: 'generateInCurrentDir',
  type: 'list',
  message: '是否在当前文件夹下生成模板文件：',
  default: false,
  choices: [
    { name: '否（新建文件夹）', value: false },
    { name: '是', value: true },
  ],
}, {
  name: 'dir',
  type: 'input',
  message: '请输入新文件夹的名称：',
  validate: value => {
    const cwd = process.cwd()
    if (!value) return '文件夹名称不能为空，请重新输入。'
    if (fs.existsSync(path.resolve(cwd, value))) return '此文件夹已经存在，请重新输入。'
    return true
  },
  filter: value => {
    return value ? String(value).trim() : ''
  },
  when: answers => !answers.generateInCurrentDir,
}]).then(answers => {
  console.log()
  generate(answers.templateName, answers.dir)
})
