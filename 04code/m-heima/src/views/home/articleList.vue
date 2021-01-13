<template>
  <div class="scroll-wrapper" ref="refScroll" @scroll="hScroll">

<!--
  为了达到从文章详情页回到列表时，能还原它的滚动条的位置：
  1. 在组件内监听scroll，实时记录这个位置
  2. 再次回到本组件（从文章详情页回来），去恢复滚动条的位置

  如果这个组件被缓存了，则它会多个两个特殊的钩子函数
   activated() {}    激活
   deactivated () {} 失活
-->

    <!-- <h2>{{channel.name}} - {{channel.id}}</h2> -->
    <!-- @load="onLoad"： load事件的回调是onLoad函数 -->
    <!-- van-list自带上拉加载更多 的效果
      原理：
        1）数据项在list中
        2）在显示数据时，如果当前的数据不足一屏，它会 自动调用 onLoad去加载数据
           在onload是要通过ajax取回新数据
           - 1）把数据追加到list中（list的内容会越来越多）
           - 2）把loading手动设置为false
           - 3）判断是否所有的数据已经加载完成，如果是，则把finished设为true
        3) 如果手动向上拉，且finished不为true, 也会去调用onLoad -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="讨厌，人家被人看完了~~"
        @load="onLoad"
      >
        <!-- @click="$router.push('/article/' + article.art_id.toString())" -->
        <van-cell
        v-for="article in list"
        :key="article.art_id.toString()"
        :title="article.title"
        @click="$router.push({name: 'article', params:{id:article.art_id.toString(), a:100, b:200}})"

        >
          <div slot="label">
            <!-- 图片区域
            column-num： 用来等分几列，有几张图就有几列
            -->
            <van-grid
            :column-num="article.cover.images.length"
            v-if="article.cover.images.length"
            :border="false">
              <van-grid-item
                v-for="(url, idx) in article.cover.images"
                :key="idx">
                <van-image lazy-load :src="url"/>
              </van-grid-item>
            </van-grid>

            <!-- 文字区域 -->
            <div class="meta">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}评论</span>
              <span>{{article.pubdate | relativeTime}}</span>
              <!-- @click.stop：不会冒泡 -->
              <span @click.stop="hCloseBtn(article)" class="close" v-if="$store.state.tokenInfo.token">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>

    <!-- 更多操作-弹层 -->
    <van-popup v-model="isShowMoreAction" :style="{ width: '80%' }">
      <more-action
      ref="refMoreAction"
      @report="hReport"
      @uninterested="hUninterested"></more-action>
    </van-popup>
  </div>
</template>
<script>
import MoreAction from './moreAction.vue'
import { getArticles, dislike, report } from '@/api/article.js'
// 1. 上拉加载更多（放在底部，类似于分页）
// 2. 下拉刷新（获取最新内容，放在头部）
export default {
  components: {
    MoreAction
  },
  props: {
    channel: {
      type: Object
    }
  },
  data () {
    return {
      isShowMoreAction: false, // 是否显示弹层组件
      list: [],
      timestamp: Date.now(),
      refreshing: false, // 是否正在下拉刷新
      loading: false, // 是否正在加载
      finished: false // 是否完成全部的加载
    }
  },
  activated () {
    // console.log('激活.......')
    if (this.scrollTop) {
      this.$refs.refScroll.scrollTop = this.scrollTop
    }
  },
  deactivated () {
    // console.log('失活.......')
  },
  methods: {
    // 在当前的list中去删除这个articleId的文章
    removeArticle (articleId) {
      // 1. 找这个文章在list中的下标
      // findIndex:如果找到就返回下标，如果找不到，就返回-1
      const idx = this.list.findIndex(article => article.art_id.toString() === articleId)
      if (idx === -1) {
        // 找不到
        return
      }
      // 2. 删除它
      this.list.splice(idx, 1)
    },
    // 用户点击了不感兴趣
    async hUninterested () {
      try {
        // 1. 调用接口，传文章编号
        const res = await dislike(this.articleId)
        console.log(res)
        // 2. 关闭弹层
        this.isShowMoreAction = false
        // 3. 通知所有的文章列表去删除这个文章
        this.removeArticle(this.articleId)
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 用户举报文章
    async hReport (typeId) {
      try {
        // 1. 调用接口，传文章编号
        const res = await report(this.articleId, typeId)
        console.log(res)
        // 2. 关闭弹层
        this.isShowMoreAction = false
        // 3. 文章列表去删除这个文章
        this.removeArticle(this.articleId)

        this.$toast.success('举报成功')
      } catch (err) {
        this.$toast.fail('举报失败')
      }
    },
    // 用户点击了关闭按钮
    hCloseBtn (article) {
      this.isShowMoreAction = true
      this.articleId = article.art_id.toString()
    },
    async onLoad () {
      // 1) 发ajax取数据
      const rs = await getArticles(this.channel.id, this.timestamp)
      //  1. 列表数据
      const arr = rs.data.data.results // 本身是一个数组
      //  2. 时间戳
      this.timestamp = rs.data.data.pre_timestamp
      // 2) 把arr中的数据追加到list
      this.list.push(...arr)

      // 3) 手动把loading设置为false
      this.loading = false

      // 4) 判断是否加载完成
      if (arr.length === 0) {
        this.finished = true
      }
      // this.finished = arr.length ? false : true
    },
    async onRefresh () {
      // 重新发一次请求，取回最新的数据，把新数据添到list头部

      console.log('重新发一次请求，取回最新的数据，把新数据添到list头部')

      // 1) 发ajax取数据
      const rs = await getArticles(this.channel.id, Date.now())
      const arr = rs.data.data.results // 本身是一个数组

      // 2) 把arr中的数据添加到list的头部（前面）
      this.list.unshift(...arr)
      // 3) 刷新结束
      this.refreshing = false

      // 4). 提示
      this.$toast(`更新${arr.length}条数据`)
    },
    updateScrollTop () {
      console.log('滚动条.....', this.$refs.refScroll.scrollTop)
      // 记录位置
      this.scrollTop = this.$refs.refScroll.scrollTop
    },
    hScroll () {
      // 防抖: 开一个定时器，在指定时间内如果再次调用，就清空定时器
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.updateScrollTop()
      }, 50)
    }
  }
}
</script>

<style scoped lang='less'>
.meta {
  display:flex;
  span{
    margin-right: 10px;
  }
  .close{
    // 让它在最右边
    // 它的父级容器是flex的，给当前元素设置左外边距为auto，会让这个元素在父级容器
    // 的最右边
    margin-left:auto;
  }
}
</style>
