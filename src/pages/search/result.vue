<template>
  <div class="serach-result">
    <!-- nav-bar
      this.$router.push() : 路由跳转
      this.$router.back() : 路由后退  ===== 页面中的后退按钮
    -->
    <van-nav-bar
      fixed
      :title="$route.query.keyword + '的搜索结果'"
      left-arrow
      @click-left="$router.back()"></van-nav-bar>
    <!-- 结果列表区 -->

    <div class="article-list">
      <!-- {{$route.query.keyword}} -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
        v-for="item in list"
        :key="item.art_id.toString()"
        :title="item.title"
        @click="$router.push('/article/'+ item.art_id.toString())"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      curPage: 1, // 请求的页码
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
      // 1. 发请求获取数据
      const result = await getSearch(this.$route.query.keyword, this.curPage)
      // 2. 把请求回来的数据追加到list中
      const arr = result.data.data.results
      this.list.push(...arr)
      // 3. 手动结束loading状态
      this.loading = false
      // 4. 判断是否全部加载完成
      if (arr.length === 0) {
        this.finished = true
      }
      // 5. 更新页码
      this.curPage++
    }
  }

}
</script>

<style lang="less" scoped>
.serach-result {
  height: 100%;
  overflow: auto;
  .article-list {
    margin-top: 39px;
  }
}
</style>
