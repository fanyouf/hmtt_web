<template>
  <div>
    A组件
    {{$store.state.modBook.books}} --{{c1}}
    <hr>
    <button @click="hAddNewBook">添加一本书</button>
    {{books}}
    <hr>
    {{yourBooks}}
    <com-b/>
    <com-c></com-c>
  </div>
</template>
<script>
// 引入组件
import ComB from './ComB.vue'
import ComC from './ComC.vue'
// 用mapState把公共数据（vuex.store） 映射 到本组件内部的计算属性中

// 步骤
// 1. 导入辅助函数mapState，它是在vuex中定义的一个工具函数。
//  es6 按需导入 import { mapState } from 'vuex' 
import { mapState } from 'vuex'

// 2. mapState(['books'])
// const res = mapState(['books'])
// res的结果是一个对象： { books: function() {}}
// console.log('mapState', res)

export default {
  components: {
    ComB, ComC
  },
  methods: {
    hAddNewBook () {
      // 在组件内部要去调用mutations
      // 格式是： this.$store.commit('mutations的名字',要传递的数据)
      // this.$store.commit: 提交
      // this.$store.commit('addBook', '一本新书') 我们通知vuex，我这里提交了一个 变化
      //                   变化的名字是addBook，同时要附加 "一本新书" 这个数据
      // this.$store.commit({
      //   type: 'addBook',
      //   name: '精通js',
      //   price: 80
      // })
      this.$store.commit('addBook', { name: '精通js', price: 80})
    }
  },
  computed: {
    c1 () {
      return 'c1'
    },
    books () {
      return ['本地的计算属性与vuex.store.state中的名字是同名的']
    },
    // books: function() {}
    // ..res： 把res这个对象合并到computed对象中
    // ...res
    // ...mapState(['books'])
    ...mapState({yourBooks:'books'})
  },
  created () {
    console.log(this.yourBooks)
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