// 对axios进行二次封装

// 1. 基地址
// 2. transformResponse: 对bigint处理
// 3. 请求拦截器：加token

import axios from 'axios'
import JSONBig from 'json-bigint'
// 在一个普通的.js文件（不是.vue组件）中，如何去获取vuex中的数据？
// 答：直接引入，获取其中的state即可
import store from '@/store/index.js'
console.log('store', store)
// axios.defaults.baseURL = '' // 基地址
const instance1 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', // 后端小张同学写的
  timeout: 5000,
  transformResponse: [function (data) {
    // 由于后端返回的数据有出现大数问题（文章编号）,这里使用json-bigint处理一下
    // 优先使用JSONBig转一下
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
  // headers: { 'X-Custom-Header': 'foobar' }
})

// 添加请求拦截器
instance1.interceptors.request.use(function (config) {
  // 在发送请求之前
  // 检查在vuex中是否有token信息，如果有，就加到header中
  const token = store.state.tokenInfo.token
  if (token) {
    // 加到header
    //    Bearer空格token  这个格式是后端要求的
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

const instance2 = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 后端老王同学写的
  timeout: 1000
  // headers: { 'X-Custom-Header': 'foobar' }
})

export {
  instance1, instance2
}
export default instance1
