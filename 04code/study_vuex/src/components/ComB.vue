<template>
  <div>
    B组件, 数据 {{$store.state.num}} <button @click="hAdd10">数据+10</button>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['addN']),
    // {'新名字': '在vuex中的mutations的名字'}
    ...mapMutations({'tianjia10': 'add10'}),
    hAdd10 (){
      // this.$store.commit('add10')
      this.tianjia10()
    }
  },
  created () {
    console.log('B', this)
    this.addN(11)
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