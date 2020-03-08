// 包含应用中所有请求接口的函数：接口函数
import ajax from "./ajax"


//请求登陆
export function reqLogin(username,password) {
  return ajax({
    method: 'post',
    url: '/login',
    data: {
      username,
      password
    }
  })
}

// const name = 'admin'
// const pwd = 'admin'
// reqLogin(name,pwd).then(result => {
//   console.log('请求成功了',result)
// })