<template>
  <div>
    B组件, 数据 {{$store.state.num}} <button @click="hAdd10">数据+10</button>
  </div>
</template>
<script>
export default {
  methods: {
    hAdd10 (){
      this.$store.commit('add10')
    }
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