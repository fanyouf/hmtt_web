import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'

// import Vant from 'vant'
// import { Lazyload } from 'vant'

import Vant, { Lazyload } from 'vant'

import 'vant/lib/index.css'

// 全局样式： 1. 统一设置  2.覆盖vant的样式（建议放在vant的后面引入）
import '@/styles/index.less'

// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible'

const d = dayjs('2019-09-09T00:31:12').add(1, 'year') // 处理
console.log(d)

Vue.use(Lazyload)
Vue.use(Vant)

Vue.config.productionTip = false

// 注册全局过滤器，对时间进行处理
Vue.filter('relativeTime', function (val) {
  //  原来是： '2018-09-29'
  //  转成： 2年前

  // 解决方案：
  // 1. 自己写代码
  // 2. day.js库

  return val.substr(0, 10)
  // return '相对' + val
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
