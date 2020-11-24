<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      :title="'文章详情-'+ article.title"
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
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | relativeTime}}</p>
        </div>
        <van-button
          v-if="article.aut_id !== $store.state.userInfo.id"
          @click="hSwitchFollow"
          round
          size="small"
          type="info"
        >{{ article.is_followed ? "取关" : "+ 关注" }}</van-button>
      </div>
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
    <article-comment :articleId="articleId"></article-comment>
  </div>
</template>

<script>
import { unFollowed, followed } from '@/api/user.js'
import { getDetail } from '@/api/article.js'
import ArticleComment from './comment.vue'
export default {
  name: 'ArticleIndex',
  components: {
    ArticleComment
  },
  data () {
    return {
      articleId: '',
      is404: false, // 这篇是否是 不存在 的
      loading: true, // 控制加载中的 loading 状态
      article: { }
    }
  },
  created () {
    this.articleId = this.$route.params.id
    this.loadDetail()
  },
  methods: {
    async loadDetail () {
      try {
        this.is404 = false

        this.loading = true
        const res = await getDetail(this.$route.params.id)
        this.article = res.data.data
        this.loading = false
      } catch (err) {
        this.loading = false
        console.dir(err)
        // 如何去判断本次请求是404?
        if (err.response.status === 404) {
          this.is404 = true
        }
      }
    },
    // 取关 / 加关注
    // 自已不能关注， 自已不能关注
    async hSwitchFollow () {
      const { is_followed: isFollowed, aut_id: autId } = this.article
      try {
        if (isFollowed) {
          // 取关
          const res = await unFollowed(autId)
          console.log(res)
          this.$toast.success('取关成功')
          // 修改页面的状态
          this.article.is_followed = false
        } else {
          // 加关注
          const res = await followed(autId)
          console.log(res)
          this.$toast.success('加关成功')
          // 修改页面的状态
          this.article.is_followed = true
        }
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
