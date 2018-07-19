const Router = require('koa-router')

const helloWrold = require('../controllers/helloWorld')

const router = new Router()

router
  .get('/', helloWrold)

module.exports = router
