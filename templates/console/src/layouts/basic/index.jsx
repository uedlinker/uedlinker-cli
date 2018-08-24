import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { connect } from 'react-redux'

import menuData from 'Common/menu'
import Header from './Header'
import SiderMenu from './SiderMenu'

import styles from './basicLayout.scss'

const {
  Content, Footer,
} = Layout

class BasicLayout extends Component {
  static propTypes = {
    // getUserInfo: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({}),
  }

  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  componentDidMount () {
    // this.props.getUserInfo()
  }

  handleCollapse = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }))
  }

  render () {
    const { collapsed } = this.state
    const { currentUser } = this.props

    const mainStyle = { paddingLeft: collapsed ? 80 : 256 }

    return (
      <Layout className={styles.container}>
        <SiderMenu
          collapsed={collapsed}
          onCollapse={this.handleCollapse}
          width={256}
          data={menuData}
        />
        <Layout className={styles.main} style={mainStyle}>
          <Header
            collapsed={collapsed}
            currentUser={currentUser}
            onCollapse={this.handleCollapse}
          />
          <Content className={styles.content}>
            <div>
            ..
              <br />
          Really
              <br />...<br />...<br />...<br />
          long
              {/* <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br /> */}
          content
            </div>
          </Content>
          <Footer>
            footer
          </Footer>
        </Layout>

      </Layout>
    )
  }
}

export default connect(
  state => ({
    currentUser: state.user.currentUser,
  }),
  dispatch => ({
    getUserInfo: () => dispatch.user.getUserInfo(),
  })
)(BasicLayout)
