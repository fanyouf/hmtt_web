import Vue from 'vue'
import App from './App.vue'
import router from './router/auth.js'
// 脚手架自动创建的vuex.store
import store from './store'

// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible'
import 'vant/lib/index.css'

import '@/styles/index.less'

import { formatTime, relativeTime } from '@/utils/date-time.js'
// 导入事件总线
import EventBus from './utils/eventbus'

import './plugin/vant.js'
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

// 把事件总线挂在原型对象上
// 则在组件内部，可以直接通过this.$eventBus来访问这个事件总线对象
Vue.prototype.$eventBus = EventBus

Vue.config.productionTip = false

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
