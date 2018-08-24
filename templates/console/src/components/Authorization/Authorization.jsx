import React from 'react'
import PropTypes from 'prop-types'
import CheckPermissions from './CheckPermissions'

class Authorization extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    authority: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
      PropTypes.func,
      PropTypes.instanceOf(Promise),
    ]),
    noMatch: PropTypes.node,
  }

  static defaultProps = {
    children: null,
    authority: '',
    noMatch: null,
  }

  render () {
    const { children, authority, noMatch = null } = this.props
    const childrenRender = typeof children === 'undefined' ? null : children
    return CheckPermissions(authority, childrenRender, noMatch)
  }
}

export default Authorization
