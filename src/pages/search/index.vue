<template>
  <div>
    <!-- nav-bar
      this.$router.push() : 路由跳转
      this.$router.back() : 路由后退  ===== 页面中的后退按钮
    -->
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 1. 搜索区域 输入框 -->
    <van-search
      v-model.trim="keyword"
      show-action
      placeholder="请输入搜索关键词"
      @input="hSearch"
    >
    <!-- #action  ==== slot="action" -->
      <!-- <template slot="action">
        <div>搜索</div>
      </template> -->
      <div slot="action">搜索</div>
    </van-search>

    <!-- 2. 搜索建议 -->
    <van-cell-group>
      <van-cell
        v-for="(suggest, idx) in cSuggestList"
        :key="idx"
        icon="search">
        <div v-html="suggest"></div>
      </van-cell>
      <!-- <van-cell title="单元格" icon="search"/>
      <van-cell title="单元格" icon="search"/> -->
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
import { getSuggestion } from '@/api/search'
export default {
  name: 'Search',
  data () {
    return {
      suggestList: [],
      keyword: '' // 搜索关键字
    }
  },
  computed: {
    cSuggestList () {
      // 对suggestList的内容进行字符串替换
      // (1) suggestList是数组，进行循环。
      // (2) 对其中的每一项，通过 keyword 匹配到替换的内容，用 string.replace(正则，函数)做替换
      const reg = new RegExp(this.keyword, 'gi')
      return this.suggestList.map(suggest => suggest.replace(reg, val => `<span style="color:red">${val}</span>`))
    }

    // cSuggestList () {
    //   // 对suggestList的内容进行字符串替换
    //   // (1) suggestList是数组，进行循环。
    //   // (2) 对其中的每一项，通过 keyword 匹配到替换的内容，用 string.replace(正则，函数)做替换
    //   const reg = new RegExp(this.keyword, 'gi')
    //   const result = this.suggestList.map(suggest => {
    //     return suggest.replace(reg, function (val) {
    //       return `<span style="color:red">${val}</span>`
    //     })
    //   })

    //   return result
    // }
  },
  methods: {
    async hSearch () {
      // 1. 如果内容不用空，则要发请求
      if (this.keyword === '') {
        this.suggestList = []
        return
      }
      // getSuggestion
      const result = await getSuggestion(this.keyword)
      this.suggestList = result.data.data.options
      console.log(this.keyword)
    }
  }
}
</script>
