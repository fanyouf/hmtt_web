<template>
  <div class="serach-result">
    <!-- 导航栏 -->
    <van-nav-bar
      title="xxx 的搜索结果"
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
        v-for="item in list"
        :key="item.art_id"
        :title="item.title"
        @click="$router.push('/article/' + item.art_id.toString())"
      />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      page: 1, // 当前是第几页
      loading: false, // 正在加载
      finished: false // 是否所有的数据全部加载完成
    }
  },
  methods: {
    async onLoad () {
      // 1. 调用api, 获取数据
      const result = await getSearch(this.$route.query.keyword, this.page)
      console.log(result)
      const arr = result.data.data.results
      // 2. 把数据填充到list
      this.list.push(...arr)
      this.page++ // 页面自增

      // 3. 修改loading为false
      this.loading = false
      // 4. 判断是否加载完了所有的数据
      if (arr.length === 0) {
        this.finished = true
      }
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
