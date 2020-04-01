// 包含应用中所有请求接口的函数：接口函数
//函数的返回值都是promise对象
import ajax from "./ajax"
import { extend } from 'umi-request';
import { notification,message } from 'antd';
import jsonp from 'jsonp' //axios不能发jsonp请求

const BASE = ''

// //请求登陆
// export function reqLogin(username,password) {
//   return ajax({
//     method: 'POST',
//     url: '/api/userInfo',
//     data: {
//       username,
//       password,
//       type: 'loginBackStatge'
//     }
//   })
// }

// const name = 'admin'
// const pwd = 'admin'
// reqLogin(name,pwd).then(result => {
//   console.log('请求成功了',result)
// })

//发送jsonp请求得到天气信息
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {   //执行器函数：内部去执行异步任务，成功了调用resolve(),失败了不调用reject()，直接提示错误
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (error,data) => {
      if(!error && data.error === 0) { //成功的
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else { //失败的
        message.error('获取天气信息失败')
      }
    })
  })
  
}


//获取分类列表
// export const reqCategorys = () => ajax.get(BASE + '/manage/category/list')
// export const reqCategorys = () => ajax({
//   url: BASE + '/manage/category/list'
// })
export const reqCategorys = () => ajax(BASE + '/manage/category/list')
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

export const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
