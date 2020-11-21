<template>
  <div>
    <!-- nav-bar
      this.$router.push(路由地址) : 路由跳转
      this.$router.back() : 路由后退  ===== 页面中的后退按钮
    -->
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 1. 搜索区域 输入框 -->
    <van-search
      @input="hInput"
      v-model.trim="keyword"
      show-action
      placeholder="请输入搜索关键词"
    >
    <!-- #action  ==== slot="action" -->
      <!-- <template slot="action">
        <div>搜索</div>
      </template> -->
      <div slot="action" @click="hSearch">搜索</div>
    </van-search>

    <!-- 2. 搜索建议
     根据你在上面输入的关键字，后端会返回建议
    -->
    <van-cell-group>
      <van-cell
        v-for="(item,idx) in cHightLight"
        :key="idx"
        icon="search"
        @click="hClickSuggetion(idx)"
      >
        <div v-html="item"></div>
      </van-cell>
    </van-cell-group>

    <!-- 3. 历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录"/>

      <van-cell
      v-for="(item,idx) in history"
      :key="idx"
      :title="item">
        <van-icon name="close" @click="hDelHistory(idx)"></van-icon>
      </van-cell>

      <!-- <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell> -->
    </van-cell-group>
  </div>
</template>

<script>
import { setHistory, getHistory } from '@/utils/storageHistory.js'
import { getSuggetion } from '@/api/search.js'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      history: getHistory() || [], // 如果本地有，从本地取出来
      suggestion: []
    }
  },
  computed: {
    // 根据keyword来把suggestion中的内容高亮
    cHightLight () {
      // g: 全局匹配
      // i: 忽略大小写（大写，小写都可以匹配）
      const reg = new RegExp(this.keyword, 'gi')
      return this.suggestion.map(item => {
        return item.replace(reg, function (val) {
          return `<span style="color:red">${val}</span>`
        })
      })
    }
  },
  methods: {
    async hInput () {
      // 没有关键字
      if (!this.keyword) {
        this.suggestion = []
        return
      }
      const res = await getSuggetion(this.keyword)
      console.log(res)
      this.suggestion = res.data.data.options
    },
    // 添加一条历史
    // 1. 不能有重复项
    // 2. 后加入要放在数组的最前面
    // 3. 持久化
    addHistory (str) {
      // (1) 找一下，是否有重复，如果有，就是删除
      const idx = this.history.findIndex(item => item === str)
      if (idx > -1) {
        this.history.splice(idx, 1)
      }
      // (2) 加在数组的前面
      this.history.unshift(str)

      // (3) 持久化
      setHistory(this.history)
    },
    // 情况1：用户点击了搜索
    hSearch () {
      // 1. 添加一条历史
      this.addHistory(this.keyword)
      // 2. 跳转到搜索结果页
    },
    //  情况2： 用户点击了搜索建议
    hClickSuggetion (idx) {
      // 1. 添加一条历史
      this.addHistory(this.suggestion[idx])
      // 2. 跳转到搜索结果页
    },
    // 用户点击了删除历史记录
    hDelHistory (idx) {
      this.history.splice(idx, 1)
      // 持久化
      setHistory(this.history)
    }
  }
}
</script>
