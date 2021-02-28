// 用来对axios进行二次封装

// 封装的目标： 让后边用起来更轻松
// 封装的内容：
// 1. 设置基地址
// 2. 请求拦截器
// 3. transformResponse:大数处理

import axios from 'axios'

// 用自己的配置，通过axios.create 创建一个实例
// instance上面具备的方法与axios的方法是一样的

const instance = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
})

const instance2 = axios.create({
  baseURL: 'https://some-domain2.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

// 按需导出
export { instance, instance2 }

// 默认导出
export default instance
