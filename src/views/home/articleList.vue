<template>
<!-- 它的目标：显示它对应的那个频道下的文章信息 -->
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="isLoadingNew" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        >
        <van-cell v-for="(item, idx) in list" :key="idx" :title="item.title">
          <div slot="label">
            <!-- 图片 当前文章有几张图 就用几个宫格 -->
            <van-grid :column-num="item.cover.images.length">
              <van-grid-item v-for="(img,idx) in item.cover.images" :key="idx">
                <van-image :src="img" lazy-load />
              </van-grid-item>
            </van-grid>
            <!-- 文字说明 -->
            <div class="meta">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <!-- 使用过滤器 -->
              <span>{{item.pubdate | relativeTime}}</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {
  name: 'ArticleList',
  // 从父组件中获取频道信息
  props: ['channel'],
  data () {
    return {
      list: [], // 数据,每一项就是一篇文章
      timestamp: null,
      isLoadingNew: false, // 是否是 下拉刷新中....
      loading: false, // 是否正在加载
      finished: false // 是否所有的数据全部加载完成
    }
  },
  methods: {
    // 下拉刷新
    async onRefresh () {
      // 1. 去取回最新的文章 .传入最新的时间戳
      const result = await getArticles(this.channel.id, Date.now())
      // 2. 把文章追加到 list 的 头部
      const arr = result.data.data.results;
      this.list.unshift(...arr)
      // this.list = [...arr, ...this.list]
      // this.list = arr.concat(this.list)
      // 3. 提示更新结果
      this.$toast.success('刷新成功' + arr.length + '条')
      // 4. 结束loading状态
      this.isLoadingNew = false
    },
    // List 组件通过loading和finished两个变量控制加载状态，
    // 当组件滚动到底部时，会触发load事件并将loading设置成true。
    // 此时可以发起异步操作并更新数据，数据更新完毕后，将loading设置成false即可。
    // 若数据已全部加载完毕，则直接将finished设置成true即可。

    // 1. 如果当前的内容不够一屏 ，它会自动去调用onLoad去加载数据
    // 2. 组件滚动到底部时，它会再次去触发onLoad

    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      if (!this.timestamp) {
        this.timestamp = Date.now()
      }
      // 1. 发请求
      const result = await getArticles(this.channel.id, this.timestamp)
      // 保存本次请求回来的数据中携带的时间戳，以便下传请求再传入
      this.timestamp = result.data.data.pre_timestamp

      const arr = result.data.data.results
      console.log(arr) // 这里有10条数据
      // 2. 把数据添加到list中去
      //   把10条数据追加到数据中去
      // this.list.push(...arr)
      this.list = this.list.concat(arr)

      // 3. 加载状态结束
      this.loading = false;
      // 4. 是否全部加载完成
      if (arr.length === 0) {
        this.finished = true;
      }
    }
  }
}
</script>

<style scoped lang='less'>
  .meta {
    span {
      margin-right: 10px;
    }
  }
</style>
