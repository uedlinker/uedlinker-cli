const inquirer = require('inquirer')
const generate = require('./generate')

inquirer.prompt([{
  name: 'templateName',
  type: 'list',
  message: '选择模板类型：',
  choices: [
    { name: '单页应用（SPA）', value: 'spa' },
    { name: '服务器端渲染（SSR）', value: 'ssr' },
  ],
}, {
  name: 'generateInCurrentDir',
  type: 'list',
  message: '是否在当前文件夹下生成模板文件',
  default: false,
  choices: [
    { name: '否，新建文件夹', value: false },
    { name: '是', value: true },
  ],
}, {
  name: 'dir',
  type: 'input',
  message: '请输入新的文件夹名称：',
  validate: value => {
    if (!value) return '文件夹名称不能为空！'
    return true
  },
  filter: value => {
    return value ? String(value).trim() : ''
  },
  when: answers => !answers.generateInCurrentDir,
}]).then(answers => {
  generate(answers.templateName, answers.dir)
})
