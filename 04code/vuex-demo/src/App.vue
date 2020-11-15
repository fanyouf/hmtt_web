<template>
  <div id="app">
    <h1>根组件</h1>
    <!-- <input @input="value => $store.state.num=value" -->
    <!-- <input type="text" v-model="$store.state.num"> -->
    <input type="text" :value="$store.state.num" @input="hInput">
    <add-item></add-item>
    <hr>
    <sub-item></sub-item>

    <!-- <h1>{{$store.state.person.name}} -- {{$store.state.person.nickname}}</h1> -->
  </div>
</template>

<script>
import AddItem from './components/AddItem.vue'
import SubItem from './components/SubItem.vue'

export default {
  name: 'app',
  data:function(){
    return {
      // num:1
    }
  },
  components: {
    AddItem,
    SubItem
  },
  created () {
    console.log(this.$store.state.person.nickname)
  },
  methods: {
    hInput (e) {
      console.log(e.target.value)
      this.$store.commit('numUpDate', e.target.value)
    }
  }
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