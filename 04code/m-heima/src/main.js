import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './router/auth.js'
import store from './store'
import './plugin/vant.js'
// import Vant, { Lazyload } from 'vant'
// import { Lazyload } from 'vant'
import 'vant/lib/index.css'
// 公共样式
import './styles/index.less'
// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible'

import { relativeTime } from '@/utils/datetime.js'

// Vue.use(Vant)
// Vue.use(Lazyload)
// 注册全局过滤器
Vue.filter('relativeTime', relativeTime)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// #app 是指public/index.html中的div的id

// 在main.js中添加如下代码  此代码是采用的 5+ Runtime中的plus对象
document.addEventListener('plusready', function () {
  var webview = window.plus.webview.currentWebview()
  window.plus.key.addEventListener('backbutton', function () {
    webview.canBack(function (e) {
      if (e.canBack) {
        webview.back()
      } else {
        // webview.close(); //hide,quit
        // plus.runtime.quit();
        // 首页返回键处理
        // 处理逻辑：1秒内，连续两次按返回键，则退出应用；
        var first = null
        window.plus.key.addEventListener('backbutton', function () {
          // 首次按键，提示‘再按一次退出应用’
          if (!first) {
            first = new Date().getTime()
            setTimeout(function () {
              first = null
            }, 1000)
          } else {
            if (new Date().getTime() - first < 1500) {
              window.plus.runtime.quit()
            }
          }
        }, false)
      }
    })
  })
})
