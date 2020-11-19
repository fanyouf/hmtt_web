<template>
  <div class="index">
    <van-tabs v-model="active">
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name">
        <!-- van-tab 它具有懒加载的效果
          1. 虽然它用v-for循环产生，但是它的其中的内容只
          会在你点击当前标签时，才会渲染。（假设有14个频道，理论
          article-list会创建14个，但是，在实践中，只有你点击了
          某个频道时，它下面的article-list才会创建）
        -->

        <!-- 监听事件
          close-btn-click：有人点了关闭
         -->
          <article-list
          @close-btn-click="hCloseBtnClick"
          :channel="channel"></article-list>
      </van-tab>
    </van-tabs>

    <!-- 更多操作-弹层 -->
    <van-popup v-model="isShowMoreAction" :style="{ width: '80%' }">
      <more-action
      ref="refMoreAction"
      @report="hReport"
      @uninterested="hUninterested"></more-action>
    </van-popup>
  </div>
</template>

<script>

// 如何去引用另一个组件？
// 1. 导入
import ArticleList from './articleList.vue'
import MoreAction from './moreAction.vue'
// 2. 注册
// 3. 使用（在父组件中模板中）
import { getChannels } from '@/api/channel.js'
import { dislike, report } from '@/api/article.js'
import eventBus from '@/utils/eventBus.js'
export default {
  name: 'home',
  data () {
    return {
      articleId: '', // 用来保存当前要处理的文章编号
      isShowMoreAction: false, // 是否显示弹层组件
      active: 2, // tabs中的选中项的下标
      channels: [] // 频道列表
    }
  },
  components: {
    ArticleList, MoreAction
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 加载频道
    async loadChannels () {
      const rs = await getChannels()
      console.log(rs)
      this.channels = rs.data.data.channels
    },
    // 父组件收到了子组件中 有人点击关闭按钮 的事件
    // 1. 显示弹层
    // 2. 确保moreAction中的isReport是false
    // 3. 保存要处理的文章的编号
    hCloseBtnClick (articleId) {
      this.isShowMoreAction = true
      // console.log('收到从子组件中传过来的文章编号', articleId)
      // 2. 确保moreAction中的isReport是false
      // 如何在父组件中操作子组件中的数据？
      // console.log(this.$refs.refMoreAction)
      if (this.$refs.refMoreAction) {
        this.$refs.refMoreAction.isReport = false
      }
      this.articleId = articleId
    },
    // 用户点击了不感兴趣
    async hUninterested () {
      try {
        // 1. 调用接口，传文章编号
        const res = await dislike(this.articleId)
        console.log(res)
        // 2. 关闭弹层
        this.isShowMoreAction = false
        // 3. 通知所有的文章列表去删除这个文章
        eventBus.$emit('delete-article', this.articleId)

        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 用户举报文章
    async hReport (typeId) {
      try {
        // 1. 调用接口，传文章编号
        const res = await report(this.articleId, typeId)
        console.log(res)
        // 2. 关闭弹层
        this.isShowMoreAction = false
        // 3. 通知所有的文章列表去删除这个文章
        eventBus.$emit('delete-article', this.articleId)

        this.$toast.success('举报成功')
      } catch (err) {
        this.$toast.fail('举报失败')
      }
    }
  }
}
</script>

<style>

</style>
