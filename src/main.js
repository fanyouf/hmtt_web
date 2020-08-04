import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 脚手架自动创建的vuex.store
import store from './store'
// 引入vant组件库
// 全局导入，全部的vant可以直接使用
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'

// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible'

import '@/styles/index.less'

import { formatTime, relativeTime } from '@/utils/date-time.js'

// 定义全局过滤器（这个过滤器需要在其它的组件中使用）
// Vue.filter('过滤器名', function(过滤前的值){
//   .....
//   return 过滤之后的值
// })
// Vue.filter('formatTime', formatTime)
Vue.filter('formatTime', function (val) {
  return formatTime(val)
})
Vue.filter('relativeTime', function (val) {
  return relativeTime(val)
})

Vue.use(Vant)
Vue.use(Lazyload)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
