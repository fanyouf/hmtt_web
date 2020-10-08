import Vue from 'vue'
import App from './App.vue'
import router from './router/auth'
import store from './store'
import eventBus from '@/utils/eventBus'
// import Vant from 'vant'
// import { Lazyload } from 'vant'

import Vant, { Lazyload } from 'vant'

import 'vant/lib/index.css'

// 全局样式： 1. 统一设置  2.覆盖vant的样式（建议放在vant的后面引入）
import '@/styles/index.less'

// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible'
import { relativeTime } from '@/utils/dateTime.js'

Vue.use(Lazyload)
Vue.use(Vant)

Vue.config.productionTip = false

// 注册全局过滤器，对时间进行处理
Vue.filter('relativeTime', relativeTime)
// Vue.filter('relativeTime', function (val) {
//   //  原来是： '2018-09-29'
//   //  转成： 2年前

//   // 解决方案：
//   // 1. 自己写代码
//   // 2. day.js库

//   return val.substr(0, 10)
//   // return '相对' + val
// })

// 事件总线
Vue.prototype.$eventBus = eventBus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
