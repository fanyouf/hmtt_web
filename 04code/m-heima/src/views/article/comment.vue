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
            <van-button size="mini" type="default">回复</van-button>
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
  </div>
</template>

<script>
import { addComment, getComment } from '@/api/comment.js'
export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      offset: null,
      content: '', // 评论内容
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },

  methods: {
    async hAddComment () {
      if (this.content === '') {
        return
      }
      try {
        // const res = await addComment (文章的id，评论内容)
        const res = await addComment(this.articleId, this.content)
        console.log(res)
        // 如果顺利，则返回结果已经保存本次添加的评论信息，在new_obj
        this.list.unshift(res.data.data.new_obj)
      } catch (err) {
        this.$toast.fail('评论失败')
        console.log(err)
      }
    },
    async onLoad () {
      try {
        // 1. 发请求
        const res = await getComment(this.articleId, this.offset)
        console.log(res)
        // 2. 把请求的结果追加到list
        const arr = res.data.data.results
        this.list.push(...arr)
        // 3. 手动取消loading
        this.loading = false
        // 4. 判断是否全部加载完成 finished
        this.finished = !arr.length
        // 5. 更新offset
        this.offset = res.data.data.last_id
      } catch (error) {
        this.$toast('获取评论失败')
        this.loading = false
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
