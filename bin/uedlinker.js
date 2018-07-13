#! /usr/bin/env node

const commander = require('commander')
const packageJSON = require('../package')

commander
  .version(packageJSON.version)
  .parse(process.argv)

require('../libs')
