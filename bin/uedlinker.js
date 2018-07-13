#! /usr/bin/env node

const commander = require('commander')
const packageJSON = require('../package')

commander
  .version(packageJSON.version)

commander
  .command('init [dir]')
  .description('初始化模板，如果不指定路径 [dir]，则在当前目录生成模板文件')
  .action(function (dir) {
    require('../libs/init')(dir)
  })

commander
  .parse(process.argv)
