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
van-tab具有类似于 懒加载的效果： 只有激活了当前的tab，才会去创建文章列表组件

      showMoreAction：监听显示更多操作
-->
        <article-list
          @showMoreAction="hShowMoreAction"
          :channel="channel">
        </article-list>
      </van-tab>
    </van-tabs>

    <!-- <弹层>
      更多操作组件
    </弹层> -->
    <van-popup v-model="isSHowMoreAction" :style="{ width: '80%' }">
      <more-action
      @dis-like="hDislike"></more-action>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
import { disLike } from '@/api/article.js'
import ArticleList from './aritcleList'
import MoreAction from './moreAction'
export default {
  name: 'Index',
  components: {
    ArticleList,
    MoreAction
  },
  data () {
    return {
      articleId: null, // 当前要操作的文章编号
      isSHowMoreAction: false, // 是否显示更多操作
      channels: [],
      active: 1
    }
  },
  created () {
    this.loadChannel()
  },
  methods: {
    // 响应子组件moreAction中的不感兴趣
    async hDislike () {
      console.log('hDislike')
      // 1. 传递当前的文章编号 调用接口
      const result = await disLike(this.articleId)
      console.log(result)
      // 2. 关闭弹层
      this.isSHowMoreAction = false
      // 3. 通知文章列表去删除这个文章
      // TODO: 明天做
    },
    // 响应子组件articleList中的关闭按钮
    hShowMoreAction (articleID) {
      // 1. 保存articleID
      this.articleId = articleID
      // 2. 弹层
      this.isSHowMoreAction = true
    },
    async loadChannel () {
      const result = await getChannels()
      console.log(result)
      this.channels = result.data.data.channels
    }
  }
}
</script>
