import router from './index.js'

import store from '@/store/index.js'

// 下面的页面是需要权限才能访问的
const pageList = ['/setting', '/profile']

router.beforeEach(function (to, from, next) {
  console.log('这里发生了路由跳转', to, from)
  // 没有登陆
  if (!store.state.tokenInfo.token) {
    // if (!store.getters || !store.getters.isLogin) {
    // 要去的页面是敏感页面
    // to.path: 路由跳转时要去的目的
    if (pageList.includes(to.path)) {
      // to.fullPath 比 to.path多查询字符串

      // next('/login?backto=' + to.fullPath)
      // encodeURIComponent 对url中的特殊的字符进行转义
      next('/login?backto=' + encodeURIComponent(to.fullPath))
    } else {
      next()
    }
  } else {
    next()
  }
  // if (没有登陆 并且 访问敏感页面) {
  //   回去登陆
  // } else {
  //   正常放行
  // }
})

export default router
