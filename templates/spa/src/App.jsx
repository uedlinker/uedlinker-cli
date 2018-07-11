import React, { Fragment } from 'react'
import loadable from 'react-loadable'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import './app.scss'
import Header from 'components/Header'
import Footer from 'components/Footer'

// 你应该自己编写一个加载页面的 Loading 组件。
// 参考：https://github.com/jamiebuilds/react-loadable#creating-a-great-loading-component。
const Loading = () => null

// 根据运行环境决定是否动态加载页面。
// 生产环境下，动态加载能够分离包，且按需加载，有利于页面的加载速度。
// 开发环境下，不动态加载，因为 react-hot-loader 对于动态加载的页面不生效。
const HelloUedlinker = process.env.NODE_ENV === 'production' ? loadable({
  loader: () => import(/* webpackChunkName: 'hello-uedlinker' */'./pages/HelloUedlinker'),
  loading: Loading,
}) : require('./pages/HelloUedlinker').default
const Todos = process.env.NODE_ENV === 'production' ? loadable({
  loader: () => import(/* webpackChunkName: 'todos' */'./pages/Todos'),
  loading: Loading,
}) : require('./pages/Todos').default
const GithubStars = process.env.NODE_ENV === 'production' ? loadable({
  loader: () => import(/* webpackChunkName: 'github-stars' */'./pages/GithubStars'),
  loading: Loading,
}) : require('./pages/GithubStars').default

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <div className='layout-wrapper'>
        <nav className='layout-sider'>
          <NavLink exact to='/'>Hello Uedlinker</NavLink>
          <NavLink to='/todos'>Todos</NavLink>
          <NavLink to='/github-stars'>Github Stars</NavLink>
        </nav>
        <main className='layout-content'>
          <Route path='/' exact component={HelloUedlinker} />
          <Route path='/todos' exact component={Todos} />
          <Route path='/github-stars' exact component={GithubStars} />
          <Footer />
        </main>
      </div>
    </Fragment>
  </Router>
)

export default App
