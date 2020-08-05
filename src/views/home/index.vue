<template>
  <div class="index">
    <!-- 频道列表
    https://vant-contrib.gitee.io/vant/#/zh-CN/tab#biao-qian-lan-gun-dong
    -->
    <van-tabs>
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id">
        <!-- 频道与文章列表是一一对应的。每个频道都需要有一个文章列表组件。
          article-list写在了v-for中，则每次循环都会生成一个文章列表组件。
          van-tab具有类似于 懒加载的效果： 只有激活了当前的tab，才会去创建文章列表组件
        -->

        <!-- 把当前的频道信息传给子组件 -->
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
      </van-tab>
    </van-tabs>

    <!-- 文章---更多操作
      https://vant-contrib.gitee.io/vant/#/zh-CN/popup
    -->
    <van-popup  v-model="showMoreAction" :style="{ width: '80%' }">
      <more-action></more-action>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
import ArticleList from './articleList.vue'
import MoreAction from './moreAction.vue'
export default {
  name: 'Home',
  data () {
    return {
      channels: [],
      showMoreAction: true // 是否显示更多操作的弹层
    }
  },
  components: {
    ArticleList,
    MoreAction
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const result = await getChannels()
      console.log(result)
      this.channels = result.data.data.channels
    }
  }
}
</script>

<style>

</style>
