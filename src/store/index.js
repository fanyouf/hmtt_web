import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  // 保存公共数据
  state: {
    // tokenInfo的值是先从本地存储中取，取不到就用{}
    tokenInfo: getItem('tokenInfo') || {}
  },
  mutations: {
    // 设置mutation来更新tokenInfo
    mSetTokenInfo (state, tokenObj) {
      // 1. 保存到vuex
      state.tokenInfo = tokenObj

      // 2. 做持久化 -- 保存到localstorage
      setItem('tokenInfo', tokenObj)
    }
  },
  actions: {
  },
  modules: {
  }
})
