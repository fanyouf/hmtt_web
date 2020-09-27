import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 公共数据
  state: {
    tokenInfo: {}
  },
  // 通过mutations对修改公共数据
  mutations: {
    mSetToken (state, tokenObj) {
      state.tokenInfo = tokenObj
    }
  }
})
