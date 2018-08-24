import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import Authorization from './Authorization'

const AuthorizedRoute = ({ authority, redirectPath, ...rest }) => (
  <Authorization authority={authority} noMatch={<Redirect to={redirectPath} />} >
    <Route {...rest} />
  </Authorization>
)

AuthorizedRoute.propTypes = {
  authority: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.func,
    PropTypes.instanceOf(Promise),
  ]),
  redirectPath: PropTypes.string.isRequired,
}

AuthorizedRoute.defaultProps = {
  authority: '',
}

export default AuthorizedRoute
