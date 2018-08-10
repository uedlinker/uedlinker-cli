import React from 'react'
import { render } from 'react-dom'

import App from './App'

const renderApp = Component => {
  render(
    <Component />,
    document.getElementById('root')
  )
}

renderApp(App)

// 开启 HMR
if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept(['./App'], () => {
    const App = require('./App').default
    renderApp(App)
  })
}

// 开启离线缓存
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}
