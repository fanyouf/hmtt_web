<template>
  <div>
    A组件
    {{$store.state.books}}
    <com-b/>
    <com-c></com-c>
  </div>
</template>
<script>
// 引入组件
import ComB from './ComB.vue'
import ComC from './ComC.vue'
export default {
  components: {
    ComB, ComC
  },
  created () {
    console.log(this.$store.state.books)
  }
}
</script>
<style scoped>
div {
  padding:5px;
  border:1px solid #ccc;
  margin:3px;
}
</style>