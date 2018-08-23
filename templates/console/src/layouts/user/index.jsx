import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from 'Pages/login'
import Register from 'Pages/register'
import RegisterResult from 'Pages/registerResult'
import Header from './Header'
import Footer from './Footer'
import styles from './userLayout.scss'

const UserLayout = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.content} >
      <Switch>
        <Route path="/user/login" component={Login} />
        <Route path="/user/register" component={Register} />
        <Route path="/user/register-result" component={RegisterResult} />
        <Redirect exact from="/user" to="/user/login" />
      </Switch>
    </div>
    <Footer />
  </div>
)

export default UserLayout
