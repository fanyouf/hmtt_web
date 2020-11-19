<template>
  <div>
    <h1>我是问答</h1>
    <son :a="a" :arr="arr"></son>
  </div>
</template>

<script>
import son from './son.vue'
export default {
  name: 'question',
  data () {
    return {
      a: 100,
      arr: [100]
    }
  },
  components: {
    son
  }
}
</script>

<style>

</style>
