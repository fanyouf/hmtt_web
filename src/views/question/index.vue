<template>
  <div>
    question/index.vue
    <son :arr="arr" :msg="msg"></son>
  </div>
</template>

<script>
import Son from './son.vue'
export default {
  name: 'parent',
  data () {
    return {
      arr: [1, 2, 3],
      msg: 'ok,vue'
    }
  },
  components: {
    Son
  }
}
</script>

<style>

</style>
