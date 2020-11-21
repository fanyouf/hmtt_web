<template>
  <div class="serach-result">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="$route.query.keyword+'的搜索结果'"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
     >
      <van-cell
        @click="$router.push('/article/' + article.art_id.toString())"
        v-for="article in list"
        :key="article.art_id.toString()"
        :title="article.title"
      />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      page: 1,
      loading: false,
      finished: false
    }
  },

  methods: {
    async onLoad () {
      console.log(this.$route.query.keyword)
      // 1. 发请求
      const res = await getSearchResult(this.$route.query.keyword, this.page)
      const arr = res.data.data.results
      // 2. 数据回来之后，填充到list中
      this.list.push(...arr)
      // 3. 手动结束加载状态
      this.loading = false
      // 4. 判断是否还有更多数据
      this.finished = !arr.length
      // 5. 页码+1
      this.page++
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
