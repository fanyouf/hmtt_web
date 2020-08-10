import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login' // index.vue是可以省略的
import Layout from '@/views/layout' // index.vue是可以省略的

import Home from '@/views/home' // index.vue是可以省略的
import Video from '@/views/video' // index.vue是可以省略的
import Question from '@/views/question' // index.vue是可以省略的
import User from '@/views/user' // index.vue是可以省略的
import Search from '@/views/search' // index.vue是可以省略的
import Result from '@/views/search/result.vue' //
import Article from '@/views/article' //

import store from '@/store/index.js'
// console.log(store)
// console.log('store.state.tokeInfo.token', store.state.tokenInfo.token)
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      { path: '', component: Home }, // 默认显示的子路由
      { path: '/video', component: Video },
      { path: '/question', component: Question },
      { path: '/user', component: User }
    ]
  },
  // 搜索中心
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  // 搜索结果页
  {
    path: '/search/result',
    name: 'searchResult',
    component: Result
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

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
  // next()

  // 如果你要去的页面是需要登陆才能访问的，则先去检查一下你是否登陆：
  //  - 没有登陆，转到登陆页
  //  - 正常放行

  // fullPath: 包含了path及查询字符串的内容
  if (to.path === '/user') {
    // 检查是否登陆
    if (store.state.tokenInfo.token) {
      console.log('你有身份证，可以访问')
      next()
    } else {
      console.log('没有身份证，转到login')
      next('/login?backto=' + to.fullPath)
    }
  } else {
    next()
  }
})

export default router
