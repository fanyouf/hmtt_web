<template>
  <div id="app">
    <button @click="hAdd">books模块中的add</button>
    <button @click="hAdd1">address模块中的add</button>
    <p>{{$store.state.modBook.books}}</p>
    <p>一共有{{$store.state.modBook.books.length}}本书</p>
    <!-- <p>一共有{{$store.getters.numberOfBooks}}本书</p>
    <p>一共有{{$store.getters.numberOf60}}本书>60元</p>
     <p>一共有{{num}}本书</p>
    <p>一共有{{numberOf60}}本书>60元</p> -->
    <com-a></com-a>
    <com-d></com-d>
  </div>
</template>

<script>
import ComA from './components/ComA.vue'
import ComD from './components/ComD.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    ComA, ComD
  },
  methods: {
    hAdd1 () {
      this.$store.commit('modAddress/add')
    },
    hAdd () {
      this.$store.commit('modBook/add')
    },
    // 把this.$store.dspatch('getBooks')  <====> this.getBooks()
    ...mapActions(['getBooks'])
  },
  created () {
    // this.$store.dispatch('getBooks')
    this.getBooks({name: 'js'})
  },
  // 把getters映射成组件的计算属性
  computed: {
    ...mapGetters(['numberOf60']),
    // 换个名字
    ...mapGetters({num: 'numberOfBooks'})
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
