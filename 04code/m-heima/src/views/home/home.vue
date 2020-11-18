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
      <more-action></more-action>
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
export default {
  data () {
    return {
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
    hCloseBtnClick () {
      this.isShowMoreAction = true
    }
  }
}
</script>

<style>

</style>
