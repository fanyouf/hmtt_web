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

    <!-- 频道列表 开关 通过定位 通过它打开频道管理的弹层 -->
    <div
     v-if="$store.getters.isLogin"
    class="bar-btn" @click="isShowChannelEdit=true">
        <van-icon name="wap-nav"/>
    </div>

    <!-- 频道管理的弹层 -->
    <!-- curIndex: 表示当前处于激活的tab的下标 -->
    <van-action-sheet v-model="isShowChannelEdit">
      <channel-edit
      :a="30"
      @fixed-cur-index="hFixedCurIndex"
      @update-cur-index="hUpdateCurIndex"
      :curIndex="active"
      :channels="channels"/>
    </van-action-sheet>
  </div>
</template>

<script>

// 如何去引用另一个组件？
// 1. 导入
import ArticleList from './articleList.vue'
import ChannelEdit from '@/views/home/channelEdit.vue'
// 2. 注册
// 3. 使用（在父组件中模板中）
import { getChannels } from '@/api/channel.js'
// import eventBus from '@/utils/eventBus.js'
export default {
  name: 'home',
  data () {
    return {
      isShowChannelEdit: false, // 是否显示频道管理弹层
      articleId: '', // 用来保存当前要处理的文章编号
      active: 2, // tabs中的选中项的下标
      channels: [] // 频道列表
    }
  },
  components: {
    ArticleList, ChannelEdit
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
    // 处理 频道管理 用户点击了 我的频道
    hUpdateCurIndex (curIdx) {
      console.log(curIdx)
      // 1. 关闭弹层
      this.isShowChannelEdit = false
      // 2. 更新当前激活的tab 的下标
      this.active = curIdx
    },
    // 用户在删除频道时，如果删除的是前边的频道，则下标要更新一下
    hFixedCurIndex (curIdx) {
      this.active = curIdx
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
