<template>
  <div class="index">
    <!-- 频道列表
    https://vant-contrib.gitee.io/vant/#/zh-CN/tab#biao-qian-lan-gun-dong
    -->

    <!-- // v-model用来获取当前是哪一个频道id。它与van-tab中的name属性一起工作  -->
    <van-tabs v-model="channelId">
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
        :name="channel.id">
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

    <!-- 频道列表 开关 通过定位 -->
    <div class="bar-btn" @click="showChannelEdit=true">
        <van-icon name="wap-nav"/>
    </div>

    <!-- 文章---更多操作
      https://vant-contrib.gitee.io/vant/#/zh-CN/popup
    -->
    <van-popup  v-model="showMoreAction" :style="{ width: '80%' }">
      <!--
        van-popup 在它没有弹出之前，moreAction组件不会创建
        @dislike="hDislike"： 处理不感兴趣
        @report="hReport": 处理举报
      -->
      <more-action
      @report="hReport"
      @dislike="hDislike"
      ref="refMoreAction"></more-action>
    </van-popup>

    <!-- https://vant-contrib.gitee.io/vant/#/zh-CN/action-sheet -->
    <van-action-sheet v-model="showChannelEdit" title="频道管理">
      <!-- 1. 父传子。把当前订阅频道传给 频道编辑组件 -->
      <channel-edit :channels="channels"></channel-edit>
    </van-action-sheet>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
// import { dislikeArticle, reportArticle } from '@/api/article.js'
import * as obj from '@/api/article.js'
import ArticleList from './articleList.vue'
import MoreAction from './moreAction.vue'
import ChannelEdit from './channelEdit.vue'
const { dislikeArticle, reportArticle } = obj
console.log(obj)
export default {
  name: 'Home',
  data () {
    return {
      channels: [], // 当前订阅的频道
      channelId: '', // 表示当前选择中频道的编号
      articleId: null, // 本次要操作的文章编号
      showChannelEdit: false, // 是否显示频道编辑弹层
      showMoreAction: false // 是否显示更多操作的弹层
    }
  },
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
  },
  created () {
    this.loadChannels()
  },
  methods: {
    delArticle () {
      const obj = {
        articleId: this.articleId, // 当前的文章编号
        channelId: this.channelId // 当前频道id
      }
      this.$eventBus.$emit('delArticle', obj)
    },
    async hReport (reportTypeId) {
      console.log('父组件收到举报的类型是', reportTypeId)
      // 1. 调用后端接口
      const result = await reportArticle(this.articleId, reportTypeId)
      console.log(result)
      // 2. 退出弹层
      this.showMoreAction = false
      // 3. 通知文章列表去删除那个被点击的文章
      this.delArticle()
    },
    async hDislike () {
      console.log('从子组件收到，不感兴趣！此时要操作的文章编号是', this.articleId)
      try {
        // 1. 调用后端接口
        const result = await dislikeArticle(this.articleId)
        console.log(result)
        // 2. 退出弹层
        this.showMoreAction = false
        // 3. 通知文章列表去删除那个被点击的文章
        this.delArticle()
        this.$toast.success('操作成功')
      } catch (e) {
        this.$toast.fail('操作失败')
      }
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

      // 1.确保moreAction组件中的isReport为false
      //    本质上就是：在父组件中去修改子组件中的数据项！
      //  思路：在父组件中获取子组件的引用，并直接去修改子组件中的数据
      console.log(this.$refs.refMoreAction)
      if (this.$refs.refMoreAction) {
        this.$refs.refMoreAction.isReport = false
        this.$refs.refMoreAction.abc()
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 频道管理的开关按钮
  .bar-btn {
    position: fixed;
    right: 5px;
    top: 57px;
    display: flex;
    align-items: center;
    background-color: #fff;
    opacity: 0.8;
    z-index:1;
    .van-icon-wap-nav{
      font-size: 20px;
    }
  }
</style>
