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

      <!-- @input="hGetSuggestion" -->
      <!-- @input="hGetSuggestion_with_fang_dou" -->

    <van-search
      v-model.trim="keyword"
      clearable
      show-action
      placeholder="请输入搜索关键词"
      @input="hGetSuggestion_with_throttle"
    >
    <!-- #action  ==== slot="action" -->
      <!-- <template slot="action">
        <div>搜索</div>
      </template> -->
      <div slot="action" @click="hSearch">搜索</div>
    </van-search>

    <!-- 2. 搜索建议 -->
    <van-cell-group v-if="keyword">
      <!-- idx是当前元素在cSuggestion这个数组中的下标 -->
      <van-cell v-for="(item,idx) in cSuggestion"
      :key="idx"
      @click="hSearchSuggestion(idx)"
      icon="search">
        <div v-html="item" slot="default"></div>
      </van-cell>
    </van-cell-group>

    <!-- 3. 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录"/>

      <van-cell
      v-for="(item,idx) in history"
      :title="item"
      :key="idx"
      @click="$router.push('/search/result?keyword='+ item)"
      >
      <!-- @click.stop 为了阻止冒泡 -->
        <van-icon name="close" @click.stop="hDeleteHistory(idx)"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search.js'
import { setItem, getItem } from '@/utils/storage'
import _ from 'lodash'
// 定义一个常量，保存key
// 消除魔法字符串
const SEARCH_HISTORY_KEY = 'searchHistory'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '', // 搜索关键字
      // 初始化，先从本地存储中取值，取不到，则用[]
      history: getItem(SEARCH_HISTORY_KEY) || [], // 保存历史记录  ['正则', 'javascript']
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
    // 用户点击了 删除历史记录
    hDeleteHistory (idx) {
      this.history.splice(idx, 1)

      // 做持久化
      setItem(SEARCH_HISTORY_KEY, this.history)
    },
    // 用来向搜索记录中添加新项
    //   1. 不能有重复
    //   2. 后加的在前面
    addHistory (str) {
      // 如果在history中已经存在，则可以先删除
      // findIndex如果找到了符合条件的元素，则下标不会是-1
      const idx = this.history.findIndex(item => item === str)
      if (idx !== -1) {
        // 有重复项, 删除它
        this.history.splice(idx, 1)
      }
      // 在数组的头部去添加
      this.history.unshift(str)

      // 做持久化
      setItem(SEARCH_HISTORY_KEY, this.history)
    },
    // 搜索的第1种方法：用户在搜索建议上点击了
    hSearchSuggestion: function (idx) {
      console.log(idx)
      const keyword = this.suggestion[idx]
      // 1. 把当前的搜索建议 添加到搜索历史记录中去
      this.addHistory(keyword)
      // 2. 跳转到搜索结果页
      this.$router.push({
        path: '/search/result',
        query: {
          keyword
        }
      })
    },
    // 搜索的第2种方法：用户在搜索按钮上点击了
    hSearch: function () {
      if (this.keyword === '') {
        return
      }
      // 1. 把当前的搜索内容 添加到搜索历史记录中去
      this.addHistory(this.keyword)
      // 2. 跳转到搜索结果页
      this.$router.push({
        path: '/search/result',
        query: {
          keyword: this.keyword
        }
      })
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
    },
    hGetSuggestion_with_debounce: _.debounce(function () {
      console.log(this.keyword)
      this.hGetSuggestion()
    }, 500),
    hGetSuggestion_with_throttle: _.throttle(function () {
      console.log(this.keyword)
      this.hGetSuggestion()
    }, 500),

    // 当用户输入内容变化时，就会执行 --- 防抖处理
    // 防抖（10秒）: 目标就是降频。一件事如果执行的频率非常快，抖动：没有意义的， 不要让你抖...
    //    思路：
    //      当这个函数被调用时，不是立即执行的时，而是延迟 10 秒再执行.
    //      如果在10秒之内，再次调用这个函数，则从当前被调用的时间开始算，再延迟 10 秒(10秒内不能再次调用函数，
    //       一旦打断，就要重新计时)。
    //       如果10秒内没有再次调用这个函数，则10秒达了之后，执行代码。
    // 生活中： 等电梯
    // 游戏中： 英雄回城

    hGetSuggestion_with_fang_dou () {
      console.log('当前用户的输入', this.keyword)
      // 以防抖5s为例： (值越大，越不灵敏)
      // 用户第一次输入第一个字符，代码不会立即去执行（ajax不是立即发出去）
      // 再是等5s之后再发ajax.如果在这5s内，用户输入第二个字符，再向后再延迟5s.

      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.hGetSuggestion()
      }, 5 * 1000)
    },

    // 当用户输入内容变化时，就会执行 --- 节流处理
    // 节流（10秒）: 目标就是降频。一件事如果执行的频率非常快，节流就是把频率降至指定的值
    //    思路：
    //      当这个函数被调用时，不是立即执行的时，而是检查本次执行距离上一次执行中间是否相隔10秒。
    //      如果相隔时间不足10s，则不执行；否则就执行
    // 生活中： 你女朋友每小时都要你发定位；节流处理（5小时）：如果早上8点发了定位，则下一次发定位时
    //         时间是：下午1点。中间其它时间不发定位

    // 游戏中： 射击游戏，点一次鼠标发一颗子弹，你是否可能按下鼠标不放，就不间断发子弹？

    hGetSuggestion_with_jie_liu () {
      console.log('当前用户的输入', this.keyword, (new Date()).toLocaleTimeString())
      // 以节流3s为例： (值越大，越不灵敏)
      // 对于本次调用，检查本次执行距离上一次执行中间是否相隔5秒
      // 是：执行，否：不执行

      if (this.timer) {
        return
      }
      this.timer = setTimeout(() => {
        this.timer = null
        this.hGetSuggestion()
      }, 100) //  3 * 1000
    }
  }
}
</script>

<style>

</style>
