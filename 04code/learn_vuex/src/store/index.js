import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    modBook: {
      state: { book: [] },
      mutations: {
        addBook(state) {},
        modBookPrice(state) {},
        setBook(state, {book}) {}
      }
    },
    modAddress: {
      state: { address: [] },
      mutations: {
        addAddress(state) {},
        delAddress(state) {}
      }
    }
  }
})
