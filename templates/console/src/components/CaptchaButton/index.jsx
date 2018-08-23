import React from 'react'
import { Button } from 'antd'

import PropTypes from 'prop-types'

class CaptchaButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  handleClick = (e) => {
    e.preventDefault()

    let count = 59

    this.timer = setInterval(() => {
      count -= 1
      this.setState({ count })
      if (count <= 0) {
        clearInterval(this.timer)
      }
    }, 1000)

    this.setState({ count })

    this.props.onClick()
  }

  render () {
    const { count } = this.state
    return (
      <Button {...this.props} disabled={count} onClick={this.handleClick}>
        {count ? `${count}秒` : '获取验证码'}
      </Button>
    )
  }
}

export default CaptchaButton
