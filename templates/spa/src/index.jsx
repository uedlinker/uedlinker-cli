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

// 这里没有使用 react-hot-loader 提供的 `hot` 接口，
// 使用这种看似复杂的结构，能够减小大约 2kb 的包的大小。
if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept(['./App'], () => {
    const App = require('./App').default
    renderApp(App)
  })
}
