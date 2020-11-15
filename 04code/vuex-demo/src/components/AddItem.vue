<template>
  <div class="box">
    <h1>{{$store.state.person.name}}</h1>
    <h2>子组件 add</h2>
    从父组件中获取的值:<label for=""></label>
    <br>
    <button >值+1</button>
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
  name: 'AddItem'
}
</script>