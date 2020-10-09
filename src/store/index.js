import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
export default new Vuex.Store({
  // 公共数据: 相当于data
  state: {
    // tokenInfo的值是先从本地存储中取，取不到就用{}
    tokenInfo: getItem('tokeInfo') || {},
    userInfo: getItem('userInfo') || {}
  },
  // 通过mutations对修改公共数据
  mutations: {
    mUpdateName (state, newName) {
      state.userInfo.name = newName

      setItem('userInfo', state.userInfo)
    },
    mUpdateGender (state, newGender) {
      state.userInfo.gender = newGender

      setItem('userInfo', state.userInfo)
    },
    mUpdateBirthday (state, newBirthday) {
      state.userInfo.birthday = newBirthday

      setItem('userInfo', state.userInfo)
    },
    mUpdatePhoto (state, newPhoto) {
      state.userInfo.photo = newPhoto

      setItem('userInfo', state.userInfo)
    },
    mSetUserInfo (state, userInfo) {
      state.userInfo.birthday = userInfo.birthday
      state.userInfo.gender = userInfo.gender
      state.userInfo.id = userInfo.id.toString()
      state.userInfo.mobile = userInfo.mobile
      state.userInfo.name = userInfo.name
      state.userInfo.photo = userInfo.photo

      setItem('userInfo', state.userInfo)
    },
    mSetToken (state, tokenObj) {
      // 1. 修改vuex
      state.tokenInfo = tokenObj

      // 2. 持久化
      setItem('tokeInfo', tokenObj)
    },
    mClearTokenInfo (state) {
      // 1. 修改vuex
      state.tokenInfo = {}
      // 2. 持久化
      setItem('tokeInfo', state.tokenInfo)
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
