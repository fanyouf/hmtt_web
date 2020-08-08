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
    <!-- <p v-text="str"></p>
    <p v-html="str"></p> -->
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
      <div slot="action" @click="hSearch">搜索</div>
    </van-search>

    <!-- 2. 搜索建议 -->
    <van-cell-group>
      <van-cell v-for="(item,idx) in cSuggestion"
      :key="idx"
      @click="hSearchSuggestion(idx)"
      icon="search">
        <div v-html="item"></div>
      </van-cell>
    </van-cell-group>

    <!-- 3. 历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录"/>

      <van-cell v-for="(item,idx) in history" :title="item" :key="idx">
        <van-icon name="close"></van-icon>
      </van-cell>

      <!-- <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell> -->
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search.js'
export default {
  name: 'Search',
  data () {
    return {
      // str: '<span style="color:red;">ab</span>',
      keyword: '', // 搜索关键字
      history: ['正则', 'javascript'], // 保存历史记录
      suggestion: [] // 当前的搜索建议
    }
  },
  computed: {
    // 用计算属性来去suggestion中保存内容做高亮
    cSuggestion () {
      const reg = new RegExp(this.keyword, 'gi')
      // 对suggestion中的每一项进行正则替换，得到具备高亮效果的字符串
      const arr = this.suggestion.map(str => {
        return str.replace(reg, function (s) {
          return `<span style="color:red;">${s}</span>`
        })
      })
      return arr
    }
  },
  methods: {
    // 用来向搜索记录中添加新项
    //
    addHistory (str) {
      this.history.push(str)
    },
    // 搜索的第1种方法：用户在搜索建议上点击了
    hSearchSuggestion (idx) {
      console.log(idx)
      // 1. 把当前的搜索建议 添加到搜索历史记录中去
      this.addHistory(this.suggestion[idx])
      // 2. todo 跳转到搜索结果页
    },
    // 搜索的第2种方法：用户在搜索按钮上点击了
    hSearch () {
      if (this.keyword === '') {
        return
      }
      // 1. 把当前的搜索内容 添加到搜索历史记录中去
      this.addHistory(this.keyword)
      // 2. todo 跳转到搜索结果页
    },
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
