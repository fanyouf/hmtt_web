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
        <article-list :channel="channel"
        @showMoreAction="hShowMoreAction"></article-list>
      </van-tab>
    </van-tabs>

    <!-- 文章---更多操作
      https://vant-contrib.gitee.io/vant/#/zh-CN/popup
    -->
    <van-popup  v-model="showMoreAction" :style="{ width: '80%' }">
      <!--
        @dislike="hDislike"： 处理不感兴趣 -->
      <more-action
      @dislike="hDislike"></more-action>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
import { dislikeArticle } from '@/api/article.js'
import ArticleList from './articleList.vue'
import MoreAction from './moreAction.vue'
export default {
  name: 'Home',
  data () {
    return {
      channels: [],
      articleId: null, // 本次要操作的文章编号
      showMoreAction: false // 是否显示更多操作的弹层
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
    async hDislike () {
      console.log('从子组件收到，不感兴趣！此时要操作的文章编号是', this.articleId)

      // 1. 调用后端接口
      const result = await dislikeArticle(this.articleId)
      console.log(result)
      // 2. 退出弹层
      this.showMoreAction = false
      // 3. 通知文章列表去删除那个被点击的文章
      const obj = {
        articleId: this.articleId, // 当前的文章编号
        channelId: -1 // 当前频道id
      }
      this.$eventBus.$emit('delArticle', obj)
    },
    async loadChannels () {
      const result = await getChannels()
      console.log(result)
      this.channels = result.data.data.channels
    },
    // 处理子组件articleLise中抛出的：关闭按钮
    hShowMoreAction (articleId) {
      console.log('收到从子组件中传递的文章编号', articleId)
      // 保存文章编号
      this.articleId = articleId
      // 显示弹层
      this.showMoreAction = true
    }
  }
}
</script>

<style>

</style>
