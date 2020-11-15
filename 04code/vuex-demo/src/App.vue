<template>
  <div id="app">
    <h1>根组件</h1>
    <input type="text" v-model="num">
    <add-item></add-item>
    <hr>
    <sub-item></sub-item>

    <h1>{{$store.state.person.name}}</h1>
  </div>
</template>

<script>
import AddItem from './components/AddItem.vue'
import SubItem from './components/SubItem.vue'

export default {
  name: 'app',
  data:function(){
    return {
      num:1
    }
  },
  components: {
    AddItem,
    SubItem
  },
}
</script>

<style>
#app {
  width: 300px;
  margin: 20px auto;
  border:1px solid #ccc;
  padding:4px;
}
</style>