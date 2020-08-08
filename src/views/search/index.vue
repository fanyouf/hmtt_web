<template>
  <div>
    <!-- nav-bar
      this.$router.push() : 路由跳转
      this.$router.back() : 路由后退  ===== 页面中的后退按钮
    -->
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 1. 搜索区域 输入框
      https://youzan.github.io/vant/#/zh-CN/search
      input: 当输入内容变化时，它会触发

      clearable: 只在移动端生效
    -->
    <van-search
      v-model.trim="keyword"
      clearable
      show-action
      placeholder="请输入搜索关键词"
      @input="hGetSuggestion"
    >
    <!-- #action  ==== slot="action" -->
      <!-- <template slot="action">
        <div>搜索</div>
      </template> -->
      <div slot="action">搜索</div>
    </van-search>

    <!-- 2. 搜索建议 -->
    <van-cell-group>
      <van-cell v-for="(item,idx) in suggestion"
      :title="item"
      :key="idx"
      icon="search"></van-cell>
    </van-cell-group>

    <!-- 3. 历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录"/>

      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>

      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search.js'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '', // 搜索关键字
      suggestion: [] // 当前的搜索建议
    }
  },
  methods: {
    // 当用户输入内容变化时，就会执行
    async hGetSuggestion () {
      console.log(this.keyword)
      if (this.keyword === '') {
        this.suggestion = []
        return
      }
      // 1. 调用接口
      const result = await getSuggestion(this.keyword)
      // 2. 将获取的数据显示在建议区
      console.log(result)
      this.suggestion = result.data.data.options
    }
  }
}
</script>

<style>

</style>
