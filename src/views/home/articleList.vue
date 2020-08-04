<template>
  <div class="scroll-wrapper">
    文章列表组件  {{ Math.random() }}
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  created () {
    console.log(Date.now(), 'ArticleList .....')
  }
}
</script>

<style>

</style>
