<template>
  <div class="box">
    <h2>子组件 sub</h2>
    从vuex中获取的值:<label for="">{{$store.state.num}}</label>
    <br>
    <button @click="hSub1">-1</button>
    <!-- <button @click="hClick">把msg的值改成abc</button> -->
    <!-- <hr>
    从vuex中获取的数据{{msg}}
    <hr>
    {{c1}} - {{msg}} -->
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
// es6 按需导入
import { mapState, mapMutations } from 'vuex'
// console.log('mapState', mapState)
// mapState就是vuex中的一个函数
// mapState(['msg']): 调用这个函数，传入实参['msg']
// const rs = mapState(['msg'])
// // rs就是一个对象，结构是：
// // {
// //   msg: function (){}
// // }
// console.log('rs',rs)

export default {
  name: 'SubItem',
  // 把mapState([])的结果，就是一个对象 
  // 把这个对象展开，合并到computed这个对象中
  computed: {
    c1: function(){
      return "c1"
    },
    ...mapState(['msg'])
  },
  methods: {
    hSub1 () {
        //numSub1
      this.numSub1()
    },
    hClick () {
      // 用户点击，把msg设置成abc
      this.$store.commit("updateMsg", "abc")
      // this.$store.commit("resetMsg")
      // console.log(this.$store.state.msg)
      // this.$store.state.msg = "abc"
    },
    ...mapMutations(["numSub1"])
  }
}
</script>