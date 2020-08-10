import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from '@/utils/storage.js'
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
    },
    mClearTokenInfo (state) {
      // 1. 保存到vuex
      state.tokenInfo = {}
      // 2. 做持久化 -- 保存到localstorage
      removeItem('tokenInfo')
    }
  },
  // 它相当于计算属性
  // 基于state中的数据产生新的数据项
  getters: {
    // 是否登陆了
    isLogin (state) {
      if (state.tokenInfo.token) {
        return true
      } else {
        return false
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
