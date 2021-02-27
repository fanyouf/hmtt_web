// 1. 导入vue
import Vue from 'vue'
// 2. 导入 vuex --- 学习的重点
import Vuex from 'vuex'
console.log(Vuex)
// Vue.use 框架中提供的api，用来以vue插件的方式来使用Vuex
// 类似有：Vue.use(vueRouter)
// Vue.use(对象)， 对象中会有一个install方法
Vue.use(Vuex)

// export default: es6的默认导出。
// 这个被导出的对象在main.js中使用.

// new Vuex.Store: 实例化一个对象，构造器是Vuex.Store
export default new Vuex.Store({
  // state: 用来保存所有的公共数据
  state: {
    num: 100,
    books: ['js技术内幕','js手册']
  },
  mutations: {
    add10 (state) {
      state.num +=10
    }
  },
  actions: {
  },
  modules: {
  }
})
