<template>
  <div class="index">
    <van-tabs v-model="curIndex">
      <!--1. tab -->
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
      <!--2. list -->
      <!-- 频道与文章列表是一一对应的。每个频道都需要有一个文章列表组件。
article-list写在了v-for中，则每次循环都会生成一个文章列表组件。
van-tab具有类似于 懒加载的效果： 只有激活了当前的tab，才会去创建文章列表组件

      showMoreAction：监听显示更多操作
-->
        <article-list
          @showMoreAction="hShowMoreAction"
          :channel="channel">
        </article-list>
      </van-tab>
    </van-tabs>

    <!-- 频道列表 开关 通过定位 -->
    <div class="bar-btn" @click="isShowChannelEdit=true">
        <van-icon name="wap-nav"/>
    </div>
    <!-- 更多操作 弹层
      在弹层没有显示时，请问：moreAction被创建出来了吗？ 没有！
    </弹层> -->
    <van-popup v-model="isSHowMoreAction" :style="{ width: '80%' }">
      <more-action
      ref="refMoreAction"
      @report="hReport"
      @dis-like="hDislike"></more-action>
    </van-popup>

    <!-- 频道管理 弹层 -->
    <van-action-sheet v-model="isShowChannelEdit" title="频道管理">
      <!-- 1. 父传子。把当前订阅频道传给 频道编辑组件 -->
      <channel-edit
      @updateCurChannel="hUpdateCurChannel"
      :channels="channels"></channel-edit>
    </van-action-sheet>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
import { disLike, report } from '@/api/article.js'
import ArticleList from './aritcleList'
import ChannelEdit from './channelEdit'
import MoreAction from './moreAction'
export default {
  name: 'Index',
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
  },
  data () {
    return {
      articleId: null, // 当前要操作的文章编号
      isShowChannelEdit: false, // 是否显示频道管理面板
      isSHowMoreAction: false, // 是否显示更多操作
      channels: [], // 当前用户的频道列表
      curIndex: 0 // 表示当前选中频道的下标
    }
  },
  created () {
    this.loadChannel()
  },
  computed: {
    // 获取当前用户选中的频道的id
    cChannelId () {
      return this.channels[this.curIndex].id
    }
  },
  methods: {
    // 响应 频道管理子组件 用户点击了 某个我的频道
    hUpdateCurChannel (idx) {
      console.log('响应 频道管理子组件', idx)
      // 1. 切换 频道
      this.curIndex = idx
      // 2. 关闭弹层
      this.isShowChannelEdit = false
    },
    delArticle () {
      //    eventBus传参数
      this.$eventBus.$emit('delArticle',
        {
          articleId: this.articleId,
          channelId: this.cChannelId
        }
      )
    },
    // 响应子组件moreAction中的举报
    async hReport (typeId) {
      console.log('举报')
      // 1. 传递当前的文章编号 调用接口
      const result = await report(this.articleId, typeId)
      console.log(result)
      // 2. 关闭弹层
      this.isSHowMoreAction = false
      // 3. 通知文章列表去删除这个文章
      //    eventBus传参数
      this.delArticle()
    },
    // 响应子组件moreAction中的不感兴趣
    async hDislike () {
      console.log('hDislike')
      // 1. 传递当前的文章编号 调用接口
      const result = await disLike(this.articleId)
      console.log(result)
      // 2. 关闭弹层
      this.isSHowMoreAction = false
      // 3. 通知文章列表去删除这个文章
      this.delArticle()
    },
    // 响应子组件articleList中的关闭按钮
    hShowMoreAction (articleID) {
      // 1. 保存articleID
      this.articleId = articleID
      // 2. 弹层
      this.isSHowMoreAction = true

      // 3. 重置moreAction.vue中的isReport
      // this.$refs.refMoreAction 找到子组件
      // 在页面打开时，弹层并没有显示，此时，moreAction组件并没有创建出来
      if (this.$refs.refMoreAction) {
        this.$refs.refMoreAction.isReport = false
      }
      // console.log(this.$refs.refMoreAction)
    },
    async loadChannel () {
      const result = await getChannels()
      console.log(result)
      this.channels = result.data.data.channels
    }
  }
}
</script>
