<template>
  <div class="index">
    <van-tabs v-model="active">
      <!--1. tab -->
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
      <!--2. list -->
      <!-- 频道与文章列表是一一对应的。每个频道都需要有一个文章列表组件。
article-list写在了v-for中，则每次循环都会生成一个文章列表组件。
van-tab具有类似于 懒加载的效果： 只有激活了当前的tab，才会去创建文章列表组件 -->
        <article-list></article-list>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
import ArticleList from './aritcleList'
export default {
  name: 'Index',
  components: {
    ArticleList
  },
  data () {
    return {
      channels: [],
      active: 1
    }
  },
  created () {
    this.loadChannel()
  },
  methods: {
    async loadChannel () {
      const result = await getChannels()
      console.log(result)
      this.channels = result.data.data.channels
    }
  }
}
</script>
