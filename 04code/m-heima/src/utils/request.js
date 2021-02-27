import axios from 'axios'
import store from '@/store/index.js'
import JSONBig from 'json-bigint'
import router from '../router/auth.js'
console.log('store', store)

// axios: transformResponse
const instance1 = axios.create({
  // 后端服务器1
  baseURL: 'http://ttapi.research.itcast.cn',
  // baseURL: 'http://api-toutiao-web.itheima.net',
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

// 另一台可以使用的测试服务器
const changeApiServer = (config) => {
  config.baseURL = 'http://toutiao-app.itheima.net'
  // config.baseURL = 'http://toutiao-app.itheima.net'
  // 删除url的app
  config.url = config.url.replace('/app', '')
  return config
}
// 添加请求拦截器
instance1.interceptors.request.use(function (config) {
  // config就是本次请求所使用的配置项
  // console.log('config', config)

  changeApiServer(config)

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

// 添加响应拦截器
instance1.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  // 如果发生了错误，判断是否是401
  console.dir(error)
  // 开始处理
  if (error.response.status === 401) {
    const refreshToken = store.state.tokenInfo.refresh_token
    if (refreshToken) {
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        })
        const newToken = res.data.data.token
        // 把新token保存到vuex
        console.log('5. 把新token保存到vuex')
        store.commit('mSetTokenInfo', {
          token: newToken, // 变化了
          refresh_token: refreshToken // 没有变化
        })
        // instance1重发请求，它会自动去vuex中带上最新的token(没过期的，新的)
        return instance1(error.config)
      } catch (err) {
        // 1. 清空token
        store.commit('mSetTokenInfo', {})
        // 2. 回去登陆
        router.push('/login?backto=' + router.currentRoute.fullPath)
        // 3. 返回错误信息
        return Promise.reject(new Error('请求新token失败'))
      }
    } else {
      // 1. 清空token
      store.commit('mSetTokenInfo', {})
      // 2. 回去登陆, 带上要返回的地址
      router.push('/login?backto=' + router.currentRoute.fullPath)
      // 3. 返回错误信息
      return Promise.reject(new Error('refresh_token不存在'))
    }
  }
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
