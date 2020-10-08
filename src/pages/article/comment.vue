<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
     >
      <van-cell
        v-for="item in list"
        :key="item.com_id.toString()"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate | relativeTime}}</span>
            <van-button size="mini" type="default" @click="hReply(item)">回复{{item.reply_count}}</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        v-model.trim="content"
        clearable
        placeholder="请输入评论内容"
      >
        <van-button slot="button" size="mini" type="info" @click="hAddComment">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->

    <!-- 评论回复弹层 -->
    <van-popup v-model="isReplyShow" round position="bottom" :style="{ height: '80%' }">
      <comment-reply :currentComment="currentComment"/>
    </van-popup>
  </div>
</template>

<script>
import CommentReply from './commentReply'
import { addComment, getComments } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  components: {
    CommentReply
  },
  data () {
    return {
      currentComment: {}, // 当前要回复的评论
      isReplyShow: false, // 是否显示评论回复弹层
      offset: null, // 评论的偏移量
      content: '开始你的表演：',
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },
  methods: {
    // 点击了某个评论上的回复按钮
    hReply (item) {
      // 1. 显示弹层
      this.isReplyShow = true
      // 2. 更新当前要回复的评论
      this.currentComment = item
    },
    async hAddComment () {
      if (this.content === '') {
        return
      }
      try {
        // const result = await addComment('文章编号'， 评论内容)
        const result = await addComment(this.articleId, this.content)
        console.log(result)
        // 评论成功之后，后端返回的数据中有一个new_obj，它表示本次评论产生完整的数据
        this.list.unshift(result.data.data.new_obj)

        this.$toast.success('评论成功')
        this.content = ''
      } catch (err) {
        console.log(err)
        this.$toast('文章没有开放评论权限')
      }
    },
    async onLoad () {
      // 1. 请求数据
      const result = await getComments(this.articleId, this.offset)
      // 2. 将求回的数据添加到list
      const arr = result.data.data.results
      this.list.push(...arr)
      // 3. 更新offset
      this.offset = result.data.data.last_id
      // 4.手动设置loading
      this.loading = false
      // 5.判断是否全部数据加载完成
      if (arr.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang='less'>
// 发表评论的区域是固定在下端的
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>
