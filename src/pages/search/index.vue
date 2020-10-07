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
      @input="jieliu"
      >
      <!-- #action ==== slot="action" -->
      <!-- <template slot="action">
        <div>搜索</div>
      </template> -->
      <div slot="action" @click="hSearch">搜索</div>
    </van-search>

    <!-- 2. 搜索建议 -->
    <van-cell-group v-if="keyword">
      <van-cell
        v-for="(suggest, idx) in cSuggestList"
        :key="idx"
        @click="hSearchSuggestion(idx)"
        icon="search">
        <div v-html="suggest"></div>
      </van-cell>
      <!-- <van-cell title="单元格" icon="search"/>
      <van-cell title="单元格" icon="search"/> -->
    </van-cell-group>

    <!-- 3. 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录"/>

      <van-cell
      v-for="(item,idx) in history"
      :key="idx"
      :title="item">
        <van-icon name="close" @click="hDeleteSearchHistory(idx)"></van-icon>
      </van-cell>

      <!-- <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell> -->
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { getItem, setItem } from '@/utils/storage'
const STORAGE_SEARCH = 'searchistory'
// const let
export default {
  name: 'Search',
  data () {
    return {
      history: getItem(STORAGE_SEARCH) || [], // 历史搜索记录 'javascript', 'css'
      suggestList: [],
      lastExeTime: 0, // 保存上一次执行的时间戳
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
    // 删除搜索记录
    hDeleteSearchHistory (idx) {
      this.history.splice(idx, 1)
      // 持久化
      setItem(STORAGE_SEARCH, this.history)
      // setItem('searchistory', this.history)
    },
    // 添加搜索记录的第1种方式：用户点击了搜索建议
    hSearchSuggestion (idx) {
      this.addHistroy(this.suggestList[idx])
    },
    // 添加搜索记录的第2种方式：用户点击了搜索按钮
    hSearch () {
      if (this.keyword === '') {
        return
      }
      this.addHistroy(this.keyword)
    },
    // 添加搜索记录
    // 1. 不能重复
    // 2. 后添加在前面
    addHistroy (item) {
      // (1) 在添加之前先查询一遍：是否已经有这一项
      //     找到了，就先删除
      const idx = this.history.findIndex(history => history === item)
      if (idx !== -1) {
        this.history.splice(idx, 1)
      }
      // (2) 添加在头部
      this.history.unshift(item)

      // 持久化
      setItem(STORAGE_SEARCH, this.history)
    },
    async hGetSuggestion () {
      // 1. 如果内容不用空，则要发请求
      if (this.keyword === '') {
        this.suggestList = []
        return
      }
      // getSuggestion
      const result = await getSuggestion(this.keyword)
      this.suggestList = result.data.data.options
      console.log(this.keyword)
    },
    jieliu () {
      //    思路：
      //      当这个函数被调用时，不是立即执行的时，而是检查本次执行距离上一次执行中间是否相隔10秒。
      //      如果相隔时间不足10s，则不执行；否则就执行
      // if (Date.now() - this.lastExeTime > 10 * 1000) {
      //   this.hGetSuggestion()
      //   this.lastExeTime = Date.now()
      // } else {
      //   console.log('上一次的调用是', this.lastExeTime, '现在还没有到下一次执行的时间...')
      // }

      if (this.timer) {
        return
      }
      this.timer = setTimeout(() => {
        this.timer = null
        this.hGetSuggestion()
      }, 50)
    },
    fandou () {
      // 对hGetSuggestion进行防抖处理
      // 如果以较高的频率来调用hGetSuggestion，则要降频
      // 10s内，如果重复调用，则重新开始计时

      // 第0s，执行fandou: this.timer是undefined, 开启定时器，10s后，执行目标函数
      // 第5s，再执行fandou， this.timer不为空，要清空定时器，重新开始计时
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.hGetSuggestion()
      }, 0.5 * 1000)
    }
  }
}
</script>
