const env = process.env.NODE_ENV || 'development'

module.exports = {
  env,
  isDev: env === 'development',
  isProd: env === 'production',
}
