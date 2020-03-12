import React, { Component } from 'react'
import './index.less'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd'

import menuList from '../../config/menuConfig'

const { SubMenu } = Menu
// 左侧导航组件
export default class LeftNav extends Component {
    // 根据指定menu数据生成<MenuItem>和<SubMenu>的数组
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
          <Link to={item.key}>
          </Link>
          <Icon type={item.icon} />
            <span>{item.title}</span>
          </Menu.Item>
                )
            }
            return (
                <SubMenu
            key="sub1"
            title={
              <span>
              <Icon type={item.icon} />
                <span>商品</span>
              </span>
            }
          ></SubMenu>
            )
        })
    }

    state = {
        collapsed: false,
      };

      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };

    render() {
        return (
            <div className="left-nav">
                <Link to="home" className="left-nav-link">
                <img src={logo} alt="" />
                <h1>硅谷后台</h1>
                </Link>

                <Menu
          defaultSelectedKeys={['/home']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
        {
            this.getMenuNodes(menuList)
        }
          {/* <Menu.Item key="/home">
          <Link to="/home">
          </Link>
            <PieChartOutlined />
            <span>首页</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <MailOutlined />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="5">品类管理</Menu.Item>
            <Menu.Item key="6">商品管理</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <AppstoreOutlined />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu> */}
        </Menu>
            </div>
        )
    }
}
