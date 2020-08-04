<template>
<!-- 它的目标：显示它对应的那个频道下的文章信息 -->
  <div class="scroll-wrapper">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, idx) in list" :key="idx" :title="item.title" />
    </van-list>
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
      loading: false, // 是否正在加载
      finished: false // 是否所有的数据全部加载完成
    };
  },
  methods: {
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

<style>

</style>
