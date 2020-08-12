<template>
  <div style="padding-top:100px">
    <p></p><p></p><p></p>
    <p></p>
    <p></p>
    <p></p>
    <div id="div">
      {{val}}  -- {{val}}
    </div>
    <button @click="hClick">把1改成2</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: 1
    }
  },
  methods: {
    hClick () {
      const div = document.getElementById('div')
      this.val = 2
      // 修改了数据，由于vue是响应式的，你改了数据，对应的视图就需要去更新。

      // 在第24行执行完了一瞬间，你认为这个页面上的视图立刻更新了？
      // 答，不是的。它会过一会再去做更新的操作

      // vue的视图自动更新（数据变了，视图变）这个过程本身是异步的。
      // 称为异步更新。

      // 会过一会再去做更新的操作
      // 会去收集本轮数据变化之后需要更新的视图，放在一个队列中
      // 等本轮同步的代码全部执行完成之后，再去这个队列中去做依次更新的操作

      // 如果你希望能得到视图更新之后的结果：
      // (1) setTimeout()
      // (2) $nextTick(()=>{})

      // setTimeout(() => {
      //   console.log('setTimeout', div.innerHTML) //
      // }, 500)
      this.$nextTick(() => {
        console.log('nextTick', div.innerHTML)
      })

      // 获取并显示当前视图中的内容
      console.log(div.innerHTML) // 1
    }
  }
}
</script>

<style>

</style>
