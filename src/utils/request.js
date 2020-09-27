// 对axios进行二次封装

// 1. 基地址
// 2. transformResponse: 对bigint处理
// 3. 请求拦截器：加token

import axios from 'axios'

// axios.defaults.baseURL = '' // 基地址
const instance1 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', // 后端小张同学写的
  timeout: 1000
  // headers: { 'X-Custom-Header': 'foobar' }
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
