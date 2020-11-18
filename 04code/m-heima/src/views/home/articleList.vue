<template>
  <div class="scroll-wrapper">
    <!-- <h2>{{channel.name}} - {{channel.id}}</h2> -->
    <!-- @load="onLoad"： load事件的回调是onLoad函数 -->
    <!-- van-list自带上拉加载更多 的效果
      原理：
        1）数据项在list中
        2）在显示数据时，如果当前的数据不足一屏，它会 自动调用 onLoad去加载数据
           在onload是要通过ajax取回新数据
           - 1）把数据追加到list中（list的内容会越来越多）
           - 2）把loading手动设置为false
           - 3）判断是否所有的数据已经加载完成，如果是，则把finished设为true
        3) 如果手动向上拉，且finished不为true, 也会去调用onLoad -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="讨厌，人家被人看完了~~"
        @load="onLoad"
      >
        <van-cell
        v-for="article in list"
        :key="article.art_id"
        :title="article.title">
          <div slot="label">
            <!-- 图片区域
            column-num： 用来等分几列，有几张图就有几列
            -->
            <van-grid
            :column-num="article.cover.images.length"
            v-if="article.cover.images.length">
              <van-grid-item
                v-for="url in article.cover.images"
                :key="url">
                <van-image lazy-load :src="url"/>
              </van-grid-item>
            </van-grid>

            <!-- 文字区域 -->
            <div class="meta">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}评论</span>
              <span>{{article.pubdate | relativeTime}}</span>
              <span @click="hCloseBtn" class="close" v-if="$store.state.tokenInfo.token">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
// 1. 上拉加载更多（放在底部，类似于分页）
// 2. 下拉刷新（获取最新内容，放在头部）
export default {
  props: {
    channel: {
      type: Object
    }
  },
  data () {
    return {
      list: [],
      timestamp: Date.now(),
      refreshing: false, // 是否正在下拉刷新
      loading: false, // 是否正在加载
      finished: false // 是否完成全部的加载
    }
  },
  methods: {
    // 用户点击了关闭按钮
    hCloseBtn () {
      this.$emit('close-btn-click')
    },
    async onLoad () {
      // 1) 发ajax取数据
      const rs = await getArticles(this.channel.id, this.timestamp)
      //  1. 列表数据
      const arr = rs.data.data.results // 本身是一个数组
      //  2. 时间戳
      this.timestamp = rs.data.data.pre_timestamp
      // 2) 把arr中的数据追加到list
      this.list.push(...arr)

      // 3) 手动把loading设置为false
      this.loading = false

      // 4) 判断是否加载完成
      if (arr.length === 0) {
        this.finished = true
      }
      // this.finished = arr.length ? false : true
    },
    async onRefresh () {
      // 重新发一次请求，取回最新的数据，把新数据添到list头部

      console.log('重新发一次请求，取回最新的数据，把新数据添到list头部')

      // 1) 发ajax取数据
      const rs = await getArticles(this.channel.id, Date.now())
      const arr = rs.data.data.results // 本身是一个数组

      // 2) 把arr中的数据添加到list的头部（前面）
      this.list.unshift(...arr)
      // 3) 刷新结束
      this.refreshing = false

      // 4). 提示
      this.$toast(`更新${arr.length}条数据`)
    }
  }
}
</script>

<style scoped lang='less'>
.meta {
  display:flex;
  span{
    margin-right: 10px;
  }
  .close{
    // 让它在最右边
    // 它的父级容器是flex的，给当前元素设置左外边距为auto，会让这个元素在父级容器
    // 的最右边
    margin-left:auto;
  }
}
</style>
