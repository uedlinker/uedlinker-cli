const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

// 基准路由。当需要在域名下配置子目录时，可以使用这个配置。
// 它的取值应该保持开始和结尾都有斜线。
// 示例：basename = process.env.NODE_ENV === 'production' ? '/your-dir/' : '/'。
// 开发环境下请使用 '/' 值，否则热更新会失败。
const basename = '/'

module.exports = withImages(withSass({
  // Next.js 资源前缀，可以与 basename 不一样。
  // 一般情况下为 CDN 的链接地址。如果没有部署 CDN，就最好与 basename 保持一致。
  assetPrefix: basename,

  cssModules: true,
  useFileSystemPublicRoutes: false,

  // 公共运行时的配置（属于自定义配置）
  publicRuntimeConfig: {
    // 这里设置 basename 的值，在服务端和客服端都可以获取到（非常重要）。
    basename,
  },
}))
