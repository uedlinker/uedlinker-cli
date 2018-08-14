const url = require('url')
const Router = require('koa-router')

const ssr = require('../ssr')
const { addSlashes, stripBasename } = require('../utils/pathUtils')

const router = new Router()

// 从服务器渲染获取到的配置，basename 是 next.config.js 文件中配置的值。
const basename = ssr.renderOpts.runtimeConfig.basename || '/'

// 设置基准路由，下面所有的路由都有 basename 前缀。
router.prefix(addSlashes(basename))

router.get('/', async (ctx) => {
  // 下一行第三个参数与 /client/pages/ 的目录结构保持一致，且以 /client/pages/ 为根目录。
  await ssr.render(ctx.req, ctx.res, '/', ctx.query)
  ctx.respond = false
})

// 匹配其他路由。重写 URL（去除 basename），保证服务器渲染处理器能够正确处理文件。
router.get('*', async (ctx) => {
  const parsedUrl = url.parse(stripBasename(ctx.req.url, basename), true)
  await ssr.getRequestHandler()(ctx.req, ctx.res, parsedUrl)
  ctx.respond = false
})

module.exports = router
