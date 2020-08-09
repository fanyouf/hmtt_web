<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      :title="article.title"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading v-if="loading" class="article-loading" />
    <!-- /加载中 loading -->

    <div class="error" v-if="is404">
      <p>文章被外星人吃掉了</p>
      <van-button @click="$router.back()">后退</van-button>
      <van-button @click="$router.push('/')">回主页</van-button>
    </div>

    <!-- 文章详情 -->
    <div class="detail" v-else>
      <h3 class="title">{{article.title}}</h3>

      <author :author="article">
        <van-button
          round
          size="small"
          type="info"
          @click="hSwitchFollow"
        >{{ article.is_followed ? '取关' : '+ 关注'}}</van-button>
      </author>

      <!-- 作者 -->
      <!-- <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill"
        :src="article.aut_photo"/>
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | relativeTime}}</p>
        </div>
        <van-button
          round
          size="small"
          type="info"
          @click="hSwitchFollow"
        >{{ article.is_followed ? '取关' : '+ 关注'}}</van-button>
      </div> -->
      <!-- 作者 end-->

      <div class="content">
        <div v-html="article.content"></div>
      </div>
      <van-divider>END</van-divider>
      <div class="zan">
        <van-button round size="small" hairline type="primary" plain icon="good-job-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 文章评论 -->
    <article-comment :article_id="$route.params.id"></article-comment>

  </div>
</template>

<script>
import ArticleComment from './comment'
import Author from '@/components/author'
import { unFollowUser, followUser } from '@/api/user.js'
import { getArticle } from '@/api/article.js'

export default {
  name: 'ArticleIndex',
  data () {
    return {
      is404: false, // 文章是否存在
      loading: true, // 控制加载中的 loading 状态
      article: { } // 当前文章
    }
  },
  created () {
    this.loadArticle()
  },
  components: {
    Author,
    ArticleComment
  },
  methods: {
    async loadArticle () {
      try {
        const id = this.$route.params.id
        const result = await getArticle(id)
        this.article = result.data.data
        this.loading = false // 结束loading
      } catch (err) {
        this.loading = false // 结束loading
        if (err.response && err.response.status === 404) {
          this.is404 = true
        } else {
          this.$toast.fail('文章加载失败')
        }
      }
    },
    // 如果这篇文章是自已写的。则不能自已关注自已！
    async hSwitchFollow () {
      try {
        const isFollowed = this.article.is_followed
        const autId = this.article.aut_id
        // 根据当前的is_followed的值决定调用哪个 方法
        // 如果 is_followed是true,在点击按钮，说明要做取关
        if (isFollowed) {
          const result = await unFollowUser(autId)
          console.log(result)
        } else {
          // 如果 is_followed是false,在点击按钮，说明要做加关注
          const result = await followUser(autId)
          console.log(result)
        }
        // 更新视图
        // 在本地取反
        this.article.is_followed = !isFollowed

        this.$toast.success('操作成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.article-container{
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan{
    text-align: center;
  }
  .content {
    font-size:14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
  }
}
</style>
