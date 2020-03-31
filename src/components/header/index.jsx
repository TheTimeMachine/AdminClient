import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Modal, Button } from 'antd'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import {
    ExclamationCircleOutlined
} from '@ant-design/icons'

import './index.less'
import storageUtils from '../../utils/storageUtils';

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now())
    }
    //退出登录
    logout = () => {
        //显示确认提示
        Modal.confirm({
            title: '确认退出吗?',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                console.log('OK');
                //确定后，删除存储的用户信息
                //local中的
                storageUtils.removeUser()
                //内存中的
                memoryUtils.user = {}
                //跳转到登录页面
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        })

    }

    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key===path) {
                title = item.title
            } else if(item.children) {
                const cItem = item.children.find(cItem => cItem.key===path)
                if(cItem) {
                    title = cItem.title
                }
            }
        })

        return title
    }

    componentDidMount () {
        //启动循环定时器
        this.intervalId = setInterval(() => {
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000);
    }

    componentWillUnmount () {
        //清除定时器
        clearInterval(this.intervalId)
    }

    render() {

        const { currentTime } = this.state
        const user = memoryUtils.user
        //得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    欢迎，{user.mail} &nbsp;&nbsp;
                    <Button type="link" onClick={this.logout}>退出</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather" />
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
