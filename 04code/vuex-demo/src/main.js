import Vue from 'vue'
import App from './App.vue'
// 在入口文件中引入store
import store from './store/index.js'
Vue.config.productionTip = false

// 挂载到vue的实例上
new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
