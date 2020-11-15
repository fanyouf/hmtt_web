// 引入vuex
// 定义store

import Vue from 'vue'
import Vuex from 'vuex'
// 1. 以插件的格式把vuex挂载到Vue上
Vue.use(Vuex)

// 2. 创建Vuex.Store的实例
const store = new Vuex.Store({
  // 各种配置(类似于data,methods,computed....)
  // state就对应理解为组件中data
  // data中能写的数据类型，在state中照样写！
  state: {
    num: 1,
    msg: 'hello vuex',
    list: [1,2,3],
    person: {
      name: '张三',
      nickname: '法外狂徒'
    }
  },
  // 变异，变化
  mutations: {
    numUpDate(state, newNum) {
      state.num = newNum
    },
    numSub1 (state) {
      state.num--
    },
    numAdd1 (state) {
      state.num++
    },
    // 参数1：在这个函数被调用时，会自动传入当前state
    // 参数2：可选的，它表示在调用这个函数时，额外传入的参数
    // 函数名(形参参数1，形参参数2) {
    //   // 在函数体内部，去修改数据项
    // }
    // 更新
    updateMsg (state, newMsg) {
      state.msg = newMsg
    },
    // 清空
    resetMsg (state) {
      state.msg = ''
    },

    fabc (state) {
      console.log('mutations:fabc')
    },

    testMutation(state, a, b) {
      console.log('testMutation')
      console.log(state, a, b )
    }
  }

})

// 3. 导出store实例
export default store