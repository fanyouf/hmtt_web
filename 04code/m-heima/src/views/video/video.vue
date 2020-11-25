<template>
  <div>
    <p>我是video</p>
    <p>演示异步更新</p>

    <div id="div">{{msg}}</div>
    <button @click="hAdd">把msg+1</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 1
    }
  },
  methods: {
    hAdd () {
      const dom = document.getElementById('div')
      console.log(dom.innerHTML) // 1
      this.msg += 1
      console.log(dom.innerHTML) // 1

      this.$nextTick(() => {
        console.log('nextTick', dom.innerHTML) // 2
      })

      // setTimeout(() => {
      //   console.log(dom.innerHTML) // 2
      // }, 0)
    }
  }
}
</script>

<style>

</style>
