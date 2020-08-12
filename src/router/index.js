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
import Profile from '@/views/user/profile' //

// 为了解决在路由导航守卫中，发生路由跳转时的错误异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

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
    redirect: '/home',
    children: [
      { path: '/home', component: Home }, // 默认显示的子路由
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
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: Profile
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

export default router
