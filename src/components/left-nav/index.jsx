import React, { Component } from 'react'
import './index.less'
import { Link, withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu } from 'antd'
import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  UserSwitchOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu
// 左侧导航组件
class LeftNav extends Component {
  render() {

    //得到当前请求的路由路径
    let selectKey = this.props.location.pathname;
    if(selectKey === '/') {
      selectKey = '/home'
    }
    const menuItemArray = ['/category', '/product', '/charts/bar', '/charts/line', '/charts/pie'];
    const cItem = menuItemArray.find(cItem => cItem === selectKey);
    var openKey = '';
    if (cItem) {
      if (cItem.indexOf('/category') >= 0 || cItem.indexOf('/product') >= 0) {
        openKey = '/products';
      } else {
        openKey = '/charts';
      }
    }
    return (
      <div className="left-nav">
        <Link to="home" className="left-nav-link">
          <img src={logo} alt="" />
          <h1>硅谷后台</h1>
        </Link>

        <Menu
          defaultSelectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="/home">
            <Link to="/home">
            </Link>
            <HomeOutlined />
            <span>首页</span>
          </Menu.Item>
          <SubMenu
            key="/products"
            title={
              <span>
                <AppstoreOutlined />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category"><Link to="/category">
            </Link><BarsOutlined />品类管理</Menu.Item>
            <Menu.Item key="/product"><Link to="/product">
            </Link><ToolOutlined />商品管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="/user">
            <Link to="/user">
            </Link>
            <UserOutlined />
            <span>用户管理</span>
          </Menu.Item>
          <Menu.Item key="/role">
            <Link to="/role">
            </Link>
            <UserSwitchOutlined />
            <span>角色管理</span>
          </Menu.Item>
          <SubMenu
            key="/charts"
            title={
              <span>
                <AreaChartOutlined />
                <span>图形图表</span>
              </span>
            }
          >
            <Menu.Item key="/charts/bar"><Link to="/charts/bar">
            </Link><BarChartOutlined />柱形图</Menu.Item>
            <Menu.Item key="/charts/line"><Link to="/charts/line">
            </Link><LineChartOutlined />折线图</Menu.Item>
            <Menu.Item key="/charts/pie"><Link to="/charts/pie">
            </Link><PieChartOutlined />饼图</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
