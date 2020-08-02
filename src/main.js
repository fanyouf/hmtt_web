import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 脚手架自动创建的vuex.store
import store from './store'
// 引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible'

import '@/styles/index.less'
// 全局导入，全部的vant可以直接使用
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
