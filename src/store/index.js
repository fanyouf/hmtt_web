import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
export default new Vuex.Store({
  // 公共数据: 相当于data
  state: {
    // tokenInfo的值是先从本地存储中取，取不到就用{}
    tokenInfo: getItem('tokeInfo') || {}
  },
  // 通过mutations对修改公共数据
  mutations: {
    mSetToken (state, tokenObj) {
      // 1. 修改vuex
      state.tokenInfo = tokenObj

      // 2. 持久化
      setItem('tokeInfo', tokenObj)
    }
  },
  // 就相当于计算属性
  // 自动传入state， 基于state中的数据产生新的数据项
  // 它就是一个函数，它会接收state 作为第一个参数
  getters: {
    isLogin (state) {
      if (state.tokenInfo.token) {
        return true
      } else {
        return false
      }
    }
  }
})
