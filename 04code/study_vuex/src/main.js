import Vue from 'vue'
import App from './App.vue'

// 导入store/index.js中 new Vuex.Store()的对象
import store from './store' // 简写： store/index.js

// 在生产模式下，关掉提示（vue在某些代码异常时会有提示）
// 类似于上线之后，不要再用console.log()
Vue.config.productionTip = false

new Vue({
  // 把store挂载到Vue实例上。类似router
  // store 是一个非常 特殊 的配置项，用来承担vuex的功能
  store,  // 写全： store: store
  render: h => h(App)
  // render: function(h) {
  //   return h(App)
  // }
}).$mount('#app')

// (new Vue()).$mount('#app') :把vue对象挂载到一个id名为app的元素上
// 由于这个main.js中的代码最后会被webpack注入到public/index.html中，
// 所以这里的#app就是public/index.html中的div

// $mount: 是vue对象的一个方法，把vue实例的功能呈现在 id名为app的元素上 。

// render: 是一个配置项，它的作用是为用指定当前vue实例的渲染函数（说明vue对象里面有什么东西）
//         它的属性值是一个函数，这个函数返回 h(App)的结果，等价于是说
//         这个vue实例中装入了App这个组件