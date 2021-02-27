<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="hAdda">修改模块addA</button>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods : {
    hAdda () {
      this.$store.commit('addA')
    }
  },
  async created () {
    const res = await this.$store.dispatch('getBook', {a:1})
    console.log(res)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
