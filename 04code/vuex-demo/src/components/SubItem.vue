<template>
  <div class="box">
    <h2>子组件 sub</h2>
    从父组件中获取的值:<label for=""></label>
    <br>
    <button >值-1</button>
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
export default {
  name: 'SubItem'
}
</script>