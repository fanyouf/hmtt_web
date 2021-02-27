<template>
  <div id="app">
    <com-a></com-a>
    <com-d></com-d>
  </div>
</template>

<script>
import ComA from './components/ComA.vue'
import ComD from './components/ComD.vue'

export default {
  name: 'App',
  components: {
    ComA, ComD
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
