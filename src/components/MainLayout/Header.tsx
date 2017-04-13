import * as React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import { Location } from 'history'

interface HeaderProps {
  location: Location
}

function Header({ location }: HeaderProps) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="/users">
        <Link to="/users"><Icon type="bars" />Users</Link>
      </Menu.Item>
      <Menu.Item key="/count">
        <Link to="/count"><Icon type="bars" />Count</Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
      </Menu.Item>
    </Menu>
  )
}

export default Header
