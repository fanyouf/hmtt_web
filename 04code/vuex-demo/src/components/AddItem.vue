<template>
  <div class="box">
    <!-- <h1>{{$store.state.person.name}}</h1> -->
    <h2>子组件 add</h2>
    从vuex中获取的值:<label for="">{{$store.state.num}}</label>
    <br>
    <button @click="hAdd1">值+1</button>
    <!-- <button @click="hClick">把vuex中的msg改成abc</button> -->
  </div>
</template>
<style lang="css">
  .box{
    border:1px solid #ccc;
    width:200px;
    padding:5px;
    margin: 20px;
  }
</style>
<script>
import { mapMutations } from 'vuex'
// console.log(mapMutations)
const rs = mapMutations(['updateMsg'])
console.log(rs)
// rs是一个对象 
// { updateMsg: function (){} }
export default {
  name: 'AddItem',
  methods: {
    hAdd1 () {
      // this.$store.state.num++
      this.$store.commit('numAdd1')
    },
    ...mapMutations(['updateMsg', 'testMutation']),
    ...mapMutations({newFabc:'fabc'}),
    hClick () {
      console.log(this)

      // this.updateMsg就是在多个方法之间相互调用
      // this.updateMsg('abc')
      // this.testMutation({a:100, b:200})
      this.fabc()
    },
    fabc(){
      console.log('组件内部的fabc')
    },

    // updateMsg () {

    // }
    // 把mapMutations(['updateMsg'])的结果合并到
    // methods对象中，相当于给methods添加了一个方法
  }
}
</script>