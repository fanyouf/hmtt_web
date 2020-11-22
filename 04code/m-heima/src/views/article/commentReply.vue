<template>
<div class="article-comments">
    <!-- 1. 导航栏 -->
    <van-nav-bar :title="comment.reply_count+'条回复'">
      <van-icon slot="left" name="cross" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 2. 当前评论 -->
    <van-cell title="当前评论">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="comment.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{comment.aut_name}}</span>
      <div slot="label">
        <p style="color: #363636;">{{comment.content}}</p>
        <p>
          <span style="margin-right: 10px;">{{comment.pubdate | relativeTime}}</span>
          <van-button
            size="mini"
            type="default"
          >回复 {{comment.reply_count}}</van-button>
        </p>
      </div>
      <van-icon slot="right-icon" />
    </van-cell>
    <!-- /当前评论 -->
    <van-divider>全部回复</van-divider>

    <!-- 3. 对当前评论 回复列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
     >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
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
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 回复列表 -->

    <!-- 4. 发布回复 -->
    <van-cell-group class="publish-wrap">
      <van-field
        v-model.trim="content"
        clearable
        placeholder="请输入回复内容"
      >
        <van-button
          slot="button"
          size="mini"
          type="info"
          @click="hAddReply"
        >发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布回复 -->
</div>

</template>
<script>
import { getCommentReply, addCommentReply } from '@/api/comment.js'
export default {
  name: 'CommentReply',
  props: {
    articleId: {
      type: String,
      required: true
    },
    // 父组件 中传过来的当前评论
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      content: '', // 回复的内容
      offset: null, // 评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1. 发请求
        const res = await getCommentReply(this.comment.com_id.toString(), this.offset)
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
        this.$toast('获取评论回复失败')
        this.loading = false
      }
    },
    async hAddReply () {
      if (this.content === '') {
        return
      }
      try {
        const res = await addCommentReply(this.comment.com_id.toString(), this.articleId, this.content)
        console.log(res)
        this.list.unshift(res.data.data.new_obj)
        // 更新回复的条数
        this.comment.reply_count++
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="less" scoped>
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
