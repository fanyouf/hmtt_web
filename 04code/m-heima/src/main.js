import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
// import { Lazyload } from 'vant'
import 'vant/lib/index.css'
// 公共样式
import './styles/index.less'
// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible'

import { relativeTime } from '@/utils/datetime.js'

Vue.use(Vant)
Vue.use(Lazyload)
// 注册全局过滤器
Vue.filter('relativeTime', relativeTime)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// #app 是指public/index.html中的div的id
