import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover, Icon, Badge } from 'antd'
import classNames from 'classnames'

import styles from './noticeIcon.scss'

class NoticeIcon extends Component {
  static propTypes = {
    count: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    count: 0,
    className: '',
  }

  handleClick = () => {}

  render () {
    const { count, className } = this.props
    const noticeButtonClassName = classNames(className, styles.container)

    return (
      <Popover>
        <button onClick={this.handleClick} className={noticeButtonClassName}>
          <Badge count={count} className={styles.badge}>
            <Icon type="bell" className={styles.icon} />
          </Badge>
        </button>
      </Popover>
    )
  }
}

export default NoticeIcon
