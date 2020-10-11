// 导入路由对象， 补充beforeEach

import router from './index.js'
import store from '@/store/index.js'

// 如下页面需要权限才能访问
const pageList = ['/user', '/search/result']
// 路由守卫
// 当路由变化时，这个函数就会执行。
// localhost:8080/#/a   ---->  localhost:8080/#/b
router.beforeEach(function (to, from, next) {
  console.log('路由变化了', to, from, next)

  // to:   去到哪里？ /b
  // from: 从哪里来？ /a
  // next: 是一个函数，用来自定义路由的跳转
  //  (1) next() 表示放行，让路由从from进入到to
  //  (2) next(其它路由),表示不去to，而进入指定的路由

  // 如果你要去的页面是需要登陆才能访问的，则先去检查一下你是否登陆：
  if (pageList.includes(to.path)) {
    // 检查是否有token
    if (store.state.tokenInfo.token) {
      next()
    } else {
      //  - 没有登陆，转到登陆页
      // to.path 是不包含查询字符串
      next('/login?jumpto=' + to.fullPath)
    }
  } else {
    // 如果登陆了，就不能回到login
    // next()
    if (to.path === '/login') {
      if (store.state.tokenInfo.token) {
        router.push('/') // next('/')
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
