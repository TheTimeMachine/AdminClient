import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { reqLogin } from '../../api'
import './login.less'
import logo from './images/logo.png'

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
    const user = JSON.parse(localStorage.getItem('user_key') || '{}')
    if (user._id) {
      return <Redirect to='/'/>
    }

    const onFinish = (async({username,password}) => {
      reqLogin(username,password)
      const result = await reqLogin(username,password)
      if (result.status === 0) {
        const user = result.data
        localStorage.setItem('user_key',JSON.stringify(user))
        message.success('登陆成功')
        this.props.history.replace('/')
      } else {
        message.error(result.msg)
      }
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
        username: '',
        password: ''
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            whitespace: true,
            message: '请输入用户名!'
          },
          {
            min: 4,
            message: '用户名不能小于4位!'
          },
          {
            max: 12,
            message: '用户名不能大于12位!'
          },
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: '用户名必须由英文、数字或下划线组成!'
          }
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
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
          prefix={<LockOutlined className="site-form-item-icon" />}
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
