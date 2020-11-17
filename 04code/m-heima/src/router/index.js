import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
    // component: function () {
    //   return import('../views/login/login.vue')
    // }
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../views/layout/layout.vue'),
    // 二级路由
    children: [
      {
        path: '', // 默认要装入的组件
        name: 'home',
        component: () => import('../views/home/home.vue')
      },
      {
        path: '/question',
        name: 'question',
        component: () => import('../views/question/question.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('../views/video/video.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('../views/setting/setting.vue')
      }
    ]
  },
  {
    path: '/page1',
    name: 'page1',
    component: () => import('../views/page1/page1.vue')
    // component: function () {
    //   return import('../views/login/login.vue')
    // }
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
