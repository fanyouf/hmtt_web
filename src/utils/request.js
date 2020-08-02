// 对axios进行二次封装
//    axios本身是一个独立的库，是对ajax的封装。为了方便在项目中使用，我们对它再次封装
// (1) 接口基地址
// (2) 请求，响应拦截器

import axios from 'axios'

// 在一个普通的.js文件（不是.vue组件）中，如何去获取vuex中的数据？
import store from '@/store/index.js'
// console.log('store', store)

const instance1 = axios.create({
  // 后端服务器1
  baseURL: 'http://ttapi.research.itcast.cn'
  // baseURL: 'http://api-toutiao-web.itheima.net'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// 添加请求拦截器 -- 所有的请求在发出去之前，都会到这里来
instance1.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 向本次请求中添加headers,设置token值
  // 从vuex中去获取token。
  const token = store.state.tokenInfo.token
  console.log('所有的请求在发出去之前，都会到这里来', store.state.tokenInfo, token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // Bearer空格token  这个格式是后端要求的
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

const instance2 = axios.create({
  // 后端服务器2
  baseURL: 'http://api-toutiao-web.itheima.net'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// const instance3 = axios.create({
//   // 后端服务器3
//   baseURL: 'http://api-toutiao-web.itheima.com'
//   // timeout: 1000,
//   // headers: {'X-Custom-Header': 'foobar'}
// })

export { instance1, instance2 }

// 默认导出intance1
export default instance1
