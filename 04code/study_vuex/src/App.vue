<template>
  <div id="app">
    <p>一共有{{$store.state.books.length}}本书</p>
    <p>一共有{{$store.getters.numberOfBooks}}本书</p>
    <p>一共有{{$store.getters.numberOf60}}本书>60元</p>
     <p>一共有{{num}}本书</p>
    <p>一共有{{numberOf60}}本书>60元</p>
    <com-a></com-a>
    <com-d></com-d>
  </div>
</template>

<script>
import ComA from './components/ComA.vue'
import ComD from './components/ComD.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    ComA, ComD
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
