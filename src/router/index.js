import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/index.vue')// Login
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../pages/layout/index.vue'), // Layout,
    children: [
      // path是'', 默认显示的子路由
      {
        // meta: 是路由对象的一个属性，是由vue提供的。
        path: '', component: () => import('../pages/home/index.vue')// Home, meta: { isKeepAlive: true }
      },
      {
        path: '/question', component: () => import('../pages/question/index.vue')// Question
      },
      {
        path: '/video', component: () => import('../pages/video/index.vue')// Video
      },
      {
        path: '/user', component: () => import('../pages/setting/index.vue')// Setting // /a/user
      }
      // {
      //   path: '/a/user', component: () => import('../pages/')// Setting // /user
      // }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../pages/search/index.vue')// Search
  },
  {
    path: '/search/result',
    name: 'SearchResult',
    component: () => import('../pages/search/result.vue')// SearchResult
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('../pages/article/index.vue')// Article
  },
  {
    path: '/user/profile',
    name: 'Profile',
    component: () => import('../pages/setting/profile.vue')// Profile
  },
  {
    path: '/user/chat',
    name: 'Chat',
    component: () => import('../pages/setting/chat.vue')// Chat
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../pages/')// () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
