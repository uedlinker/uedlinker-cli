import React from 'react'
import Loadable from 'react-loadable'

import Loading from 'Components/Loading/index'

const Main = Loadable({
  loader: () => import('Pages/Main'),
  loading: () => <Loading />,
})

const routes = {
  Main,
}
export default routes
