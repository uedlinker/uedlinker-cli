const env = process.env.NODE_ENV

module.exports = {
  env,
  isDev: env === 'development',
  isPord: env === 'production',
  cwd: process.cwd(),
}
