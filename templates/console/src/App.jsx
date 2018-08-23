import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import store from './store'
// import history from './utils/history'
import routes from './common/routes'

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={store.history} >
      <Switch>
        <Route path="/user" component={routes.UserLayout} />
        <Route render={() => <div>404</div>} />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default App
