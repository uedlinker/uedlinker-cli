import React from 'react'
import Loadable from 'react-loadable'

import Loading from 'Components/Loading/index'

const UserLayout = Loadable({
  loader: () => import('../layouts/user/index'),
  loading: () => <Loading />,
})

const routes = {
  UserLayout,
}
export default routes
