const renderer = require('next')

const dev = process.env.NODE_ENV !== 'production'
const ssr = renderer({ dev, dir: './client' })

module.exports = ssr
