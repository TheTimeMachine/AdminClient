/*
封装的能发ajax请求的函数
 */
import axios from "axios"
import qs from "qs"
import {message} from "antd"

//添加请求拦截器
axios.interceptors.request.use(function (config) {
  const {method,data} = config
  if(method.toLowerCase()==='post'&&typeof data==='object') {
    config.data = qs.stringify(data)
  }
  return config;
});

//添加响应拦截器
//在请求返回之后且在我们指定的请求回调函数之前
axios.interceptors.response.use(function (response) {
  return response.data;
}, function(error) {
  //统一处理所有请求异常错误
  message.error('请求出错 ' + error.message)
  return new Promise(() => {})
});

export default axios