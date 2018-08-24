import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Layout, Tooltip } from 'antd'

import HeaderSearch from 'Components/HeaderSearch'
import NoticeIcon from 'Components/NoticeIcon'
import Account from './Account'

import styles from './header.scss'

const { Header } = Layout

const searchList = [
  '搜索提示一',
  '搜索提示二',
  '搜索提示三',
]

export default class ContentHeader extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    currentUser: PropTypes.shape({}),
  }

  static defaultProps = {
    collapsed: false,
    currentUser: {},
    onCollapse: () => {},
  }

  handleCollapse = () => this.props.onCollapse(!this.props.collapsed)

  handlePressEnter = (val) => {
    console.log('press enter: ', val); // eslint-disable-line
  }

  handleSearch = (val) => {
    console.log('search: ', val) // eslint-disable-line
  }

  render () {
    const { collapsed, currentUser } = this.props

    return (
      <Header className={styles.container}>
        <button
          className={`${styles.action} ${styles['menu-trigger']}`}
          onClick={this.handleCollapse}
        >
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </button>
        <div className={styles['action-bar']}>
          <HeaderSearch
            className={styles.action}
            placeholder="站内搜索"
            dataSource={searchList}
            onSearch={this.handleSearch}
            onPressEnter={this.handlePressEnter}
          />
          <Tooltip title="使用文档">
            <a
              className={`${styles.action} ${styles.document}`}
              target="_blank"
              href="https://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          <NoticeIcon
            className={styles.action}
            count={currentUser.noticeCount}
          />
          <Account
            className={styles.action}
            name={currentUser.name}
            avatar={currentUser.avatar}
          />
        </div>
      </Header>
    )
  }
}
