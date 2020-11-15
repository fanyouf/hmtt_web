import axios from 'axios'

const instance1 = axios.create({
  // 后端服务器1
  baseURL: 'http://ttapi.research.itcast.cn'
  // baseURL: 'http://api-toutiao-web.itheima.net'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

const instance2 = axios.create({
  // 后端服务器2
  baseURL: 'http://api-toutiao-web.itheima.net'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export { instance1, instance2 }

// 默认导出intance1
export default instance1
