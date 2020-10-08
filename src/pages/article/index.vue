<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading class="article-loading"  v-if="loading"/>
    <!-- /加载中 loading -->

    <div class="error" v-if="is404">
      <p>文章被外星人吃掉了</p>
      <van-button @click="$router.back()">后退</van-button>
      <van-button @click="$router.push('/')">回主页</van-button>
    </div>

    <!-- 文章详情 -->
    <div class="detail" v-else>
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo"/>
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | relativeTime}}</p>
        </div>
        <van-button
          round
          size="small"
          type="info"
          @click="hSwitchFollow"
        >{{ article.is_followed ? '取关' : '+ 关注' }}</van-button>
      </div>
      <div class="content">
        <div v-html="article.content"></div>
      </div>
      <van-divider>END</van-divider>
      <div class="zan">
        <van-button round size="small" hairline type="primary" plain
        :icon="article.attitude === 1 ? 'good-job': 'good-job-o'">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 文章评论 -->
    <article-comment :articleId="articleId"/>
  </div>
</template>

<script>
import ArticleComment from './comment.vue'
import { followUser, unFollowUser } from '@/api/user'
import { getArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {
    ArticleComment
  },
  data () {
    return {
      is404: false, // 文章是否存在
      articleId: null,
      loading: true, // 控制加载中的 loading 状态
      article: { }
    }
  },
  created () {
    this.articleId = this.$route.params.id
    this.loadArticle()
  },
  methods: {
    async hSwitchFollow () {
      const { is_followed: isFollowed, aut_id: autId } = this.article
      if (isFollowed) {
        // 已关注，这里要做取关
        // 1. 发请求
        await unFollowUser(autId.toString())
        // 2. 修改视图
        this.article.is_followed = false
        this.$toast.success('取关成功')
      } else {
        try {
          await followUser(autId.toString())
          this.article.is_followed = true
          this.$toast.success('加关注成功')
        } catch (err) {
          this.$toast.fail('加关注失败')
        }
      }
    },
    async loadArticle () {
      // 1. 设置loading
      this.loading = true
      try {
        // 2. 发请求
        const result = await getArticle(this.articleId)
        // console.log(result)
        this.article = result.data.data
        // 3. 设置loading
        this.loading = false
      } catch (err) {
        // if (err.response && err.response.status === 404) {
        //   this.is404 = true
        // } else {
        //   this.$toast.fail('加载失败')
        // }
        this.is404 = (err.response && err.response.status === 404)
        this.$toast.fail('加载失败')
        this.loading = false
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
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
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
