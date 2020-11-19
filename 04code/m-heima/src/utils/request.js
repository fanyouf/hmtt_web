import axios from 'axios'
import store from '@/store/index.js'
import JSONBig from 'json-bigint'
console.log('store', store)

// axios: transformResponse
const instance1 = axios.create({
  // 后端服务器1
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    // 由于后端返回的数据有出现大数问题（文章编号）,这里使用json-bigint处理一下
    // 优先使用JSONBig转一下
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
  // baseURL: 'http://api-toutiao-web.itheima.net'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// 添加请求拦截器
instance1.interceptors.request.use(function (config) {
  // config就是本次请求所使用的配置项
  console.log('config', config)
  // 取出vuex中的tokenInfo，检查是否有token，如果有就添加到config.headers中
  // this.$store.state
  const token = store.state.tokenInfo.token
  if (token) {
    // config.headers.abcd = 100
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
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
