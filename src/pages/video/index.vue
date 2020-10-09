<template>
  <div>
    <p>视频</p>
    <h1>vue是异步更新</h1>
    <div id="div1">
      <h3 v-for="i in n" :key="i">
        {{msg}}
      </h3>
    </div>
    <button @click="hClick">把n改成5</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      n: 3,
      msg: 'vue是异步更新'
    }
  },
  methods: {
    hClick () {
      // 这里改了数据，视图会更新
      // 但是，视图并不是随着数据的变化而立即更新
      //       视图变化的时机会滞后数据的变化 ----- 异步更新
      // 视图变化的时机: 这个组件在下一轮更新时，去更新。
      this.n = 5
      // 3 次h3
      // setTimeout(() => {
      //   console.log(document.getElementById('div1').innerHTML)
      // })
      this.$nextTick(() => {
        console.log(document.getElementById('div1').innerHTML)
      })

      // this.n = 10
      // // 3 次h3
      // console.log(document.getElementById('div1').innerHTML)
    }
  }
}
</script>

<style>

</style>
