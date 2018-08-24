import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Spin, Dropdown, Avatar, Menu, Icon } from 'antd'

// import styles from './account.less';

const MenuItem = Menu.Item
const MenuDivider = Menu.Divider

const menu = (
  <Menu>
    <MenuItem>
      <Link to="/account/center/articles">
        <Icon type="user" />个人中心
      </Link>
    </MenuItem>
    <MenuItem>
      <Link to="account/settings/base">
        <Icon type="setting" />设置
      </Link>
    </MenuItem>
    <MenuItem>
      <Link to="account/settings/base">
        <Icon type="close-circle" />触发报错
      </Link>
    </MenuItem>
    <MenuDivider />
    <MenuItem>
      <Link to="account/settings/base">
        <Icon type="logout" />退出登录
      </Link>
    </MenuItem>
  </Menu>
)

const Account = ({
  className, loading, avatar, name,
}) => (
  loading
    ? <Spin size="small" />
    : (
      <Dropdown overlay={menu}>
        <span className={`${className}`} >
          <Avatar src={avatar} />
          <span>{name}</span>
        </span>
      </Dropdown>
    )
)

Account.propTypes = {
  loading: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
}

Account.defaultProps = {
  className: '',
  loading: false,
  avatar: '',
  name: '',
}

export default Account
