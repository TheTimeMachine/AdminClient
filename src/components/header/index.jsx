import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Modal } from 'antd'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import {
    ExclamationCircleOutlined
} from '@ant-design/icons'

import './index.less'
import storageUtils from '../../utils/storageUtils';
import LinkButton from '../link-button'

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '', //图片url
        weather: '' //天气文本
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
//获取天气信息显示
    getWeather = async () => {
        //发请求
       const {dayPictureUrl, weather} = await reqWeather('上海')
        //更新状态
        this.setState({
            dayPictureUrl,
            weather
        })
    }

    componentDidMount () {
        //启动循环定时器
        this.intervalId = setInterval(() => {
            //将currentTime更新为当前时间
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000);
        //发jsonp请求获取天气信息显示
        this.getWeather()
    }

    componentWillUnmount () {
        //清除定时器
        clearInterval(this.intervalId)
    }

    render() {

        const { currentTime, dayPictureUrl, weather } = this.state
        const user = memoryUtils.user
        //得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    欢迎，{user.mail} &nbsp;&nbsp;

                    {/*组件的标签作为标签的children属性传入*/}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
