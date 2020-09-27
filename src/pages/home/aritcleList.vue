<template>
  <!-- scroll-wrapper 这个类名在全局样式中有设置 -->
  <div class="scroll-wrapper">
    channel.name的内容
    <p v-for="idx in 20" :key="idx">
      第{{idx}}条文章
    </p>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  created () {
    console.log('文章列表组件被创建了.....')
  }
}
</script>
