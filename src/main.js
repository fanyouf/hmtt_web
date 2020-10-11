import Vue from 'vue'
import App from './App.vue'
import router from './router/auth'
import store from './store'
import eventBus from '@/utils/eventBus'

// 按需引入vant组件
import './plugin/vant'

import 'vant/lib/index.css'

// 全局样式： 1. 统一设置  2.覆盖vant的样式（建议放在vant的后面引入）
import '@/styles/index.less'

// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible'
import { relativeTime } from '@/utils/dateTime.js'

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
