const Koa = require('koa')

const ssr = require('./ssr')
const router = require('./router')

const port = parseInt(process.env.PORT, 10) || 3000

ssr.prepare()
  .then(() => {
    const server = new Koa()

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
