import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/storage.js'
import { setUserInfo, getUserInfo } from '@/utils/storageUserInfo.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存token信息
    tokenInfo: getToken() || {}, // 从localstroage获取初值
    userInfo: getUserInfo() || {}
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
      setUserInfo(initUserInfo)
    },
    // 用来更新用户名
    mUpdateName (state, newName) {
      state.userInfo.name = newName
      setUserInfo(state.userInfo)
    },
    mUpdateBirthday (state, birthday) {
      state.userInfo.birthday = birthday
      setUserInfo(state.userInfo)
    },
    mUpdatePhoto (state, photo) {
      state.userInfo.photo = photo
      setUserInfo(state.userInfo)
    }
  },
  // getters就类似于computed，它的作用是基于state来产生新的数据项
  getters: {
    // state会自动传入
    isLogin (state) {
      // return state.tokenInfo.token ? true : false
      //  (!!变量 可以把变量值转成boolean)
      return !!state.tokenInfo.token
    }
  },
  actions: {
  },
  modules: {
  }
})
