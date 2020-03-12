import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message, Icon } from 'antd';

import request from '../../api/index'
import './login.less'
<<<<<<< HEAD
import logo from '../../assets/images/logo.png';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
=======
import logo from './images/logo.png'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
>>>>>>> f8f414d2f5c72d5afe6fbcf11ef605c8f1d55752

export default class Login extends Component {

  validatePwd = (rule, value) => {
    value = value.trim()
    if (!value) {
      return Promise.reject('请输入密码!');
    } else if (value.length<4) {
      return Promise.reject('密码不能小于4位!');
    } else if (value.length>12) {
      return Promise.reject('密码不能大于12位');
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('必须由英文、数字或下划线组成!');
    }
    return Promise.resolve();
  }

  render() {
    const user = memoryUtils.user
    if (user._id) {
      return <Redirect to='/'/>
    }

<<<<<<< HEAD
    const onFinish = (async(values) => {
      var action = 'userInfo';
      var type = "loginBackStatge";
      var params = {
        ...values, action, type
      };
      request('/api/' + params.action, {
        method: 'POST',
        data: params
      }).then(res => {
        console.log(res)
        if (res && res.userInfo && res.userInfo.loginSequence) {
            const user = res.userInfo
            storageUtils.saveUser(user)
            memoryUtils.user = user
            this.props.history.replace('/')
            message.success('登陆成功')
        }
      })
=======
    const onFinish = (async({username,password}) => {
      reqLogin(username,password)
      const result = await reqLogin(username,password)
      if (result.status === 0) {
        const user = result.data
        storageUtils.saveUser(user)
        memoryUtils.user = user
        message.success('登陆成功')
        this.props.history.replace('/')
      } else {
        message.error(result.msg)
      }
>>>>>>> f8f414d2f5c72d5afe6fbcf11ef605c8f1d55752
    }) 

    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="" />
          <h1>React项目：后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
        mail: '',
        password: ''
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="mail"
        rules={[
          {
            required: true,
            whitespace: true,
            message: '请输入用户名!'
          },
          {
            min: 4,
            message: '用户名不能小于4位!'
          }
        ]}
      >
        <Input prefix={<Icon type="user" className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            validator: this.validatePwd
          }
        ]}
      >
        <Input
          prefix={<Icon type="lock" className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登 陆
        </Button>
      </Form.Item>
    </Form>
        </div>
      </div>
    )
  }
}
