import React, { Component } from 'react'
import './index.less'
import { Link, withRouter } from 'react-router-dom'

import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import { Menu } from 'antd'

const { SubMenu } = Menu
// 左侧导航组件
class LeftNav extends Component {

  //第一次render()之后执行一次
  //执行异步任务：发ajax请求，启动定时器
  componentDidMount () {

  }
  //第一次render()之前执行一次
  //为第一次render()做一些同步的准备工作
  componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  //根据指定menu数组生成<MenuItem>和<SubMenu>的数组
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.map(item => {
      if(!item.children) {
        return (<Menu.Item key={item.key}>
        <Link to={item.key}>
        </Link>
        {item.icon}
        <span>{item.title}</span>
      </Menu.Item>)
      }
      const cItem = item.children.find(cItem => cItem.key === path)
      if(cItem) {
        this.openKey = item.key
      }
      return (<SubMenu
        key={item.key}
        title={
          <span>
            {item.icon}
            <span>{item.title}</span>
          </span>
        }
      >
        {
          this.getMenuNodes(item.children)
        }
      </SubMenu>)
    })
  }

  render() {
  
    //得到当前请求的路由路径
    const selectKey = this.props.location.pathname;
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
          selectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
        {
          this.menuNodes
        }
        </Menu>
      </div>
    )
  }
}
//向外暴露 使用高阶组件withRouter()来包装非路由组件
//新组件向LeftNav传递3个特别属性：history/location/match
//结果：LeftNav可以操作路由相关语法了
export default withRouter(LeftNav)
