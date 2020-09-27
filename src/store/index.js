import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
export default new Vuex.Store({
  // 公共数据
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
  }
})
