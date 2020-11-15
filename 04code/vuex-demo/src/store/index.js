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
  state: {
    msg: 'hello vuex',
    person: {
      name: '张三',
      nickname: '法外狂徒'
    }
  }
})

// 3. 导出store实例
export default store