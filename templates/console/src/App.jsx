import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Authorization from 'Components/Authorization'
import BasicLayout from 'Layouts/basic'
import store from './store'
import routes from './common/routes'

const { AuthorizedRoute } = Authorization

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={store.history} >
      <Switch>
        <Route path="/user" component={routes.UserLayout} />
        <AuthorizedRoute
          path="/"
          authority={['admin', 'user']}
          redirectPath="/user"
          component={BasicLayout}
        />
        <Route render={() => <div>404</div>} />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default App
