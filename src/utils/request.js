// 对axios进行二次封装
//    axios本身是一个独立的库，是对ajax的封装。为了方便在项目中使用，我们对它再次封装
// (1) 接口基地址
// (2) 请求，响应拦截器

import axios from 'axios'

// 在一个普通的.js文件（不是.vue组件）中，如何去获取vuex中的数据？
import store from '@/store/index.js'
// console.log('store', store)

import JSONBig from 'json-bigint' // 引入大数字包

import router from '@/router/index.js'
const instance1 = axios.create({
  // 后端服务器1
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    // 由于后端返回的数据有出现大数问题（文章编号）,这里使用json-bigint处理一下
    // 优先使用JSONBig转一下
    // return JSONBig.parse(data)
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
})

// 添加一个响应拦截器 -- 所有的请求在发回来之后，都会到这里来
instance1.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function (error) {
  console.log('响应拦截器，拦截到了错误')
  if (error.response && error.response.status === 401) {
    // 2.遇到了401错误
    const refreshToken = store.state.tokenInfo.refresh_token
    if (refreshToken) {
      // 3. 用resfreshToken再发请求
      try {
        const result = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        })
        // 4. 成功获取新token
        console.log('用refresh_token取回来的新的token', result)
        const newToken = result.data.data.token
        // 5. 保存新token到vuex
        store.commit('mSetTokenInfo', {
          token: newToken,
          refresh_token: refreshToken
        })

        // 6. 重新发请求
        // error.表示401错误。error.config表示出这个错误时，所要发出的请求的配置
        return instance1(error.config) // 重新去发一次请求
      } catch {
        console.log('用refresh_token更新token失败, 只能去做一次登陆')
        // 路由跳转
        // currentRoute: 当前路由
        router.push('/login?backto=' + router.currentRoute.fullPath)
      }
    } else {
      // 回到登陆页
      console.log('没有refresh_token, 只能去做一次登陆')
      // 路由跳转
      // currentRoute: 当前路由
      router.push('/login?backto=' + router.currentRoute.fullPath)
    }
  }
  return Promise.reject(error);
})

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
