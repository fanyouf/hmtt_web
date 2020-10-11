<template>
    <!--
      为了达到从文章详情页回到列表时，能还原它的滚动条的位置：
      1. 在组件内监听scroll，实时记录这个位置
      2. 再次回到本组件（从文章详情页回来），去恢复滚动条的位置

      如果这个组件被缓存（keep-alive）了，则它会多出两个特殊的钩子函数：
        activated () {}    激活
      deactivated () {}    失活
    -->
  <!-- scroll-wrapper 这个类名在全局样式中有设置 -->
  <div class="scroll-wrapper" @scroll="hScroll" ref="refScroll">
    <!--
      van-list自带上拉 加载更多 的效果
      原理：
        1）数据项保存在list中
        2）在显示数据时，如果当前的数据不足一屏，它会 自动触发load事件，调用 onLoad去加载数据
           在onload是要通过ajax取回新数据
           - 1. 把数据追加到list中（list的内容会越来越多）
           - 2. 把loading手动设置为false（这个组件在加载新数据之前，会自动把loading设为true）
           - 3. 判断是否所有的数据已经加载完成，如果是，则把finished设为true
        3) 如果手动向上拉，且finished不为true, 也会去调用onLoad
    -->

    <van-pull-refresh v-model="isLoadingNew" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        loading-text="一大波数据正在赶过来"
        finished-text="讨厌，人家被你看完了"
        @load="onLoad"
      >
        <van-cell v-for="article in list"
        :key="article.art_id.toString()"
        @click="$router.push({name: 'Article', params:{id:article.art_id.toString(), a:1, b:2}})"
        :title="article.title">
          <div slot="label">
            <!-- 图片: 可能出现三种情况： 0, 1, 3
              article.cover.images:[]
            -->
            <van-grid :column-num="article.cover.images.length" :border="false">
              <van-grid-item
                v-for="(image, idx) in article.cover.images"
                :key="idx">
                <van-image lazy-load :src="image" alt="" />
              </van-grid-item>
            </van-grid>

            <!-- 文字 -->
            <div class="meta">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}评论</span>
              <span>{{article.pubdate | relativeTime}}</span>
              <span @click.stop="hClose(article)" class="close" v-if="$store.getters.isLogin">
                  <van-icon name="cross" />
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
console.log(getArticles)

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      scrollTop: 0,
      isLoadingNew: false, // 是否正在加载最新数据（下拉刷新）
      timestamp: null,
      list: [], // 数据项 文章列表
      loading: false, // 是否正在加载（上拉加载更多）...
      finished: false // 是否所有的数据全部加载完成
    }
  },
  activated () {
    // console.log('激活....')
    // 恢复
    if (this.scrollTop) {
      this.$refs.refScroll.scrollTop = this.scrollTop
    }
  },
  deactivated () {
    // console.log('失活....')
  },
  created () {
    // 监听eventBus
    this.$eventBus.$on('delArticle', (obj) => {
      const { articleId, channelId } = obj
      console.log(this.channel.name, '收到了删除文章的消息', articleId, channelId)

      this.delArticle(articleId, channelId)
    })
  },
  methods: {
    delArticle (articleId, channelId) {
      // 检查频道id
      if (this.channel.id !== channelId) {
        console.log(this.channel, '这不是我的频道，我不用进一步去搜索')
        return
      }

      // 去在当前的文章列表中搜索是否有 编号是articleId的文章，
      //  1. findIndex会找出下标，如果找不到，返回-1
      const idx = this.list.findIndex(item => {
        return item.art_id.toString() === articleId
      })

      if (idx !== -1) {
        // 如果找到就删除
        this.list.splice(idx, 1)
      }
    },
    hClose (article) {
      // 1. 获取当前的文章编号
      const id = article.art_id.toString()
      // console.log(article, article.art_id)
      // 2. 抛出去
      this.$emit('showMoreAction', id)
    },
    async onRefresh () {
      // 1. 重发请求，取最新的数据
      const result = await getArticles(this.channel.id, Date.now())
      // 2. 放在list的最前面（数组的头部）
      const arr = result.data.data.results
      this.list.unshift(...arr)

      // 3. 结束loading: isLoadingNew=false
      this.isLoadingNew = false
      // 4. 提示
      this.$toast(`更新${arr.length}条数据`)
    },
    async onLoad () {
      // 1. 发请求，取回数据
      if (!this.timestamp) {
        this.timestamp = Date.now()
      }
      const result = await getArticles(this.channel.id, this.timestamp)

      // result.data.data.pre_timestamp
      // 更新时间戳
      this.timestamp = result.data.data.pre_timestamp
      const arr = result.data.data.results
      console.log(arr)

      // 2. 把数据追加到list
      //    arr是一个数组，每一个元素都是一个对象，表示当前的一个文章
      //    加...是把arr中的元素追加到list中。
      this.list.push(...arr)
      // 3. 加载状态结束
      this.loading = false
      // 4. 判断是否全部加载完成
      if (arr.length === 0) {
        this.finished = true
      }
    },
    hScroll () {
      // 监听用户滚动条
      // 保存一下
      // TODO: 防抖处理
      console.log(this.$refs.refScroll.scrollTop)
      // 对象普通的属性， 不是响应式的数据
      this.scrollTop = this.$refs.refScroll.scrollTop
    }
  }
}
</script>

<style scoped lang='less'>
.meta {
  display: flex;
  span{
    margin-right: 10px;
  }
  .close {
    margin-left: auto;
  }
}
</style>
