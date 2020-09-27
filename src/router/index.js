import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/login/index.vue'
import Layout from '@/pages/layout/index.vue'

import Home from '@/pages/home/index.vue'
import Video from '@/pages/video/index.vue'
import Question from '@/pages/question/index.vue'
import Setting from '@/pages/setting/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      // path是'', 默认显示的子路由
      {
        path: '', component: Home
      },
      {
        path: '/question', component: Question
      },
      {
        path: '/video', component: Video
      },
      {
        path: '/user', component: Setting
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
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
