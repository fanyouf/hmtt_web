<template>
  <div>
    <!-- nav-bar
      this.$router.push(路由地址) : 路由跳转
      this.$router.back() : 路由后退  ===== 页面中的后退按钮
    -->
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 1. 搜索区域 输入框
      @input="hInput_debounce"
      @input="hInput_throttle"
      @input="hInput_throttle_with_lodash"
    -->
    <van-search
      @input="hInput_debounce_with_lodash"
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

     v-if="suggestion.length"：如果有搜索建议
    -->
    <van-cell-group v-if="suggestion.length">
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
    <van-cell-group v-else>
      <van-cell title="历史记录"/>
      <van-cell
      v-for="(item,idx) in history"
      :key="idx"
      :title="item"
      @click="$router.push('/searchResult?keyword=' + item)"
      >
        <van-icon name="close" @click.stop="hDelHistory(idx)"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import _ from 'lodash'
import { setHistory, getHistory } from '@/utils/storageHistory.js'
import { getSuggetion } from '@/api/search.js'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      lastCallTimestamp: 0, // 上一次在哪个时间戳被调用了
      history: getHistory() || [], // 如果本地有，从本地取出来
      suggestion: [] // 系统给出的搜索建议
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
    // async hInput () {
    //   // 没有关键字
    //   if (!this.keyword) {
    //     this.suggestion = []
    //     return
    //   }
    //   const res = await getSuggetion(this.keyword)
    //   console.log(res)
    //   this.suggestion = res.data.data.options
    // },
    async f () {
      // 没有关键字
      if (!this.keyword) {
        this.suggestion = []
        return
      }
      const res = await getSuggetion(this.keyword)
      console.log(res)
      this.suggestion = res.data.data.options
    },
    hInput_debounce_with_lodash: _.debounce(function () {
      this.f()
    }, 0.3 * 1000),
    hInput_throttle_with_lodash: _.throttle(function () {
      this.f()
    }, 0.3 * 1000),
    hInput_throttle () {
      console.log('hInput_throttle.....')

      // 对f进行0.3秒节流处理。
      // 目标：如果0.3秒内没有再次调用它，则顺利执行这个函数，否则，再等0.3s。
      if (Date.now() - this.lastCallTimestamp >= 0.3 * 1000) {
        this.f()
        this.lastCallTimestamp = Date.now()
      } else {
        console.log('没有间隔0.3s,不能调用f()')
      }
    },

    // 只要用户在录入内容就会触发inpput，从而执行这个函数
    hInput_debounce () {
      // 对f进行0.3秒防抖处理。
      // 目标：如果0.3秒内没有再次调用它，则顺利执行这个函数，否则，再等0.3s。
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.f()
      }, 0.3 * 1000)
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
      if (this.keyword === '') {
        return
      }
      // 1. 添加一条历史
      this.addHistory(this.keyword)
      // 2. 跳转到搜索结果页
      this.$router.push('/searchResult?keyword=' + this.keyword)
      // this.$router.push({
      //   path: '/searchResult',
      //   query: {
      //     keyword: this.keyword,
      //     a: 1,
      //     b: 2
      //   }
      // })
    },
    //  情况2： 用户点击了搜索建议
    hClickSuggetion (idx) {
      // 1. 添加一条历史
      this.addHistory(this.suggestion[idx])
      // 2. 跳转到搜索结果页
      this.$router.push('/searchResult?keyword=' + this.suggestion[idx])
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
