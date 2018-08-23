import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import store from './store'
import history from './utils/history'
import routes from './common/routes'

const App = () => (
  <Provider store={store}>
    <Router history={history} >
      <Switch>
        <Route path="/user" component={routes.UserLayout} />
        <Route render={() => <div>404</div>} />
      </Switch>
    </Router>
  </Provider>
)

export default App
