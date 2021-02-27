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
    books: [{name: 'js技术内幕', price: 100}]
  },
  // mutations(变化，异动): 用来提供修改数据的方法。 
  // 数据不能在组件内部直接修改，必须在组件内调用mutations来修改
  mutations: {
    // 每一项都是一个函数
    // 参数：你可以定义两个参数：
      // 第一个参数是必须的，表示当前的state，
      // 第二个参数是可选的，表示载荷(在执行函数时要传入的数据)
    // addBook (state, bookName) {
    //   console.log(state, bookName)
    //   state.books.push(bookName)
    // },
    addBook (state, {name, price}) {
      // console.log(state, bookObj)
      state.books.push({name, price})
      // state.books.push(bookObj)
    },
    addN(state, n) {
      state.num += n
    },
    add10 (state) {
      state.num +=10
    }
  },
  actions: {
  },
  modules: {
  }
})
