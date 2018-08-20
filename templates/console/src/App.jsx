import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import store from './store'
import Main from './pages/Main'
import history from './utils/history'


const App = () => (
  <Provider store={store}>
    <Router history={history} >
      <Switch>
        <Route exact path="/" component={Main} />
        <Route render={() => <div>404</div>} />
      </Switch>
    </Router>
  </Provider>
)

export default App
