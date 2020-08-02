import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 保存公共数据
  state: {
    tokenInfo: {}
  },
  mutations: {
    // 设置mutation来更新tokenInfo
    mSetTokenInfo (state, tokenObj) {
      state.tokenInfo = tokenObj
    }
  },
  actions: {
  },
  modules: {
  }
})
