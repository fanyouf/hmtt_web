import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存token信息
    tokenInfo: getToken() || {}, // 从localstroage获取初值
    userInfo: {}
  },
  // 定义mutation来修改数据
  mutations: {
    mSetTokenInfo (state, initTokenInfo) {
      state.tokenInfo = initTokenInfo

      // 保存到本地localStorage
      setToken(initTokenInfo)
    },
    mUserInfo (state, initUserInfo) {
      state.userInfo = initUserInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
