<template>
  <div>
    收到从父组件中传入的数据是
    <p> a:{{a}}</p>
    <p> arr: {{arr}} </p>
    <button @click="a=1">修改a-失败</button>
    <button @click="arr=[100,1]">修改arr-失败</button>
    <button @click="arr.push(1)">修改arr-成功</button>
  </div>
</template>

<script>
export default {
  props: {
    a: {
      type: Number
    },
    arr: {
      type: Array
    }
  }
}
</script>

<style>

</style>
