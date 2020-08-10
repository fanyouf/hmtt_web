<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="list.length===0 ? '没有评论' : '以上所有的评论'"
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
            <span style="margin-right: 10px;">{{item.pubdate | relativeTime }}</span>
            <van-button size="mini"
            type="default"
            @click="hShowReplay(item)"
            >回复{{item.reply_count}}</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入评论内容"
        v-model.trim="content"
      >
        <van-button slot="button" size="mini" type="info" @click="hAddComment">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->

    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      round position="bottom"
      :style="{ height: '85%' }"
      >
      <!--  :comment="currentComment" 向子组件传递当要评论的 那条数据 -->
      <!--  @close="isReplyShow=false"  收到子组件传递消息，关闭弹层 -->
        <comment-reply
        v-if="isReplyShow"
        @close="isReplyShow=false"
        :comment="currentComment"
        :article_id="article_id"></comment-reply>
    </van-popup>
    <!-- 评论回复 -->
  </div>
</template>

<script>
import CommentReply from './commentReply'
import { addComment, getComments } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    article_id: {
      type: String,
      required: true
    }
  },
  components: {
    CommentReply
  },
  data () {
    return {
      currentComment: {}, // 表示当前的评论回复组件 要 回复是评论是第一条
      isReplyShow: false, // 是否显示评论回复
      offset: null, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      content: '', // 当前的评论内容
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },

  methods: {
    // 用户在回复按钮点击了
    hShowReplay (item) {
      // 1. 显示弹层。--- 评论回复组件
      this.isReplyShow = true

      // 2. 当前评论传递给评论回复组件
      this.currentComment = item
    },
    async hAddComment () {
      if (this.content === '') {
        return
      }
      try {
        // 1. 发请求
        // addComment(文章编号, 评论内容)
        const result = await addComment(this.article_id, this.content)
        // 在result中有一个new_obj这个值表示 本次评论的结果。

        // 2. 更新视图。 把最新评论添加在评论列表的最上面
        this.list.unshift(result.data.data.new_obj)

        // 3. 清空评论区
        this.content = ''

        // 4. 反馈
        this.$toast.success('发布评论成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('评论失败')
      }
    },
    async onLoad () {
      // 1. 请求评论数据
      // 如果this.offset是null，则axios在传参时，会忽略这个参数
      const result = await getComments(this.article_id, this.offset)
      this.offset = result.data.data.last_id

      // console.log(result)
      const arr = result.data.data.results
      // 2. 把请求回来的数据添加到list中
      this.list.push(...arr)
      // 3. 加载状态结束
      this.loading = false
      // 4. 判断是否全部的数据加载完成
      this.finished = (arr.length === 0)
      // this.finished = arr.length ? false : true
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
