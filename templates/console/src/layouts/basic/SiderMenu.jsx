import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

import logo from 'Assets/uedlinker.png'
import Authorization from 'Components/Authorization'
import { convertUrlToArray } from 'Utils/url'
import { getOpenKeys, getFlatMenuKeys } from './_utils'

import styles from './siderMenu.scss'

const { Sider } = Layout
const { SubMenu, Item: MenuItem } = Menu
const { check } = Authorization

@withRouter
class SiderMenu extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    width: PropTypes.number,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    onCollapse: PropTypes.func,
  }

  static defaultProps = {
    collapsed: false,
    onCollapse: '',
    width: 200,
  }

  constructor (props) {
    super(props)
    this.menuKeys = getFlatMenuKeys(props.data)
    const { location: { pathname } } = props

    this.state = {
      openKeys: getOpenKeys(this.menuKeys, convertUrlToArray(pathname)),
    }
  }

  isMainMenu = key => this.props.data.some(item => key && (item.path === key))

  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1]
    const moreThanOne = openKeys.filter(key => this.isMainMenu(key)).length > 1

    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : openKeys,
    })
  }

  renderMenuItemTitle = (item) => {
    if (!item.icon) {
      return <span>{item.name}</span>
    }

    return (
      <Fragment>
        <Icon type={item.icon} />
        <span>{item.name}</span>
      </Fragment>
    )
  }

  renderMenuItemTitleWithLink = item => (
    <Link
      to={item.path}
      replace={item.path === this.props.location.pathname}
    >
      {this.renderMenuItemTitle(item)}
    </Link>
  )

  renderSubMenuOrMenuItem = (data) => {
    const { children } = data
    const hasValidChildren = Array.isArray(children) &&
      (children.some(child => child.name))

    if (hasValidChildren) {
      const menuItems = this.renderMenuItems(children)

      return (menuItems.length > 0) ? (
        <SubMenu
          key={data.path}
          title={this.renderMenuItemTitle(data)}
        >
          {menuItems}
        </SubMenu>
      ) : null
    }

    return (
      <MenuItem key={data.path}>
        {this.renderMenuItemTitleWithLink(data)}
      </MenuItem>
    )
  }

  renderMenuItems = (data) => {
    if (!data) {
      return []
    }

    return data
      .filter(item => item.name)
      .map((item) => {
        const itemDom = this.renderSubMenuOrMenuItem(item)
        return check(item.authority, itemDom)
      })
      .filter(item => item)
  };

  render () {
    const {
      collapsed, data, onCollapse, width, location: { pathname },
    } = this.props
    const { openKeys } = this.state

    return (
      <Sider
        collapsible
        collapsed={collapsed}
        className={styles.container}
        onCollapse={onCollapse}
        width={width}
        trigger={null}
      >
        <div className={styles.logo} >
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        <Menu
          className={styles.menu}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={this.handleOpenChange}
          selectedKeys={[pathname]}
          mode="inline"
          theme="dark"
        >
          {this.renderMenuItems(data)}
        </Menu>
      </Sider>
    )
  }
}

export default SiderMenu
