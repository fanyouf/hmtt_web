<template>
<div class="article-comments">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count + '条回复'">
      <!-- 通知父组件去关闭弹层 -->
      <van-icon @click="$emit('close')" slot="left" name="cross" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论 -->
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

    <!-- 对当前评论 回复列表 -->
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
            <span style="margin-right: 10px;">{{item.pubdate | relativeTime }}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 回复列表 -->

    <!-- 发布回复 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入回复内容"
        v-model.trim="content"
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
import { getCommentReplys, addCommentReply } from '@/api/comment.js'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    },
    article_id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      content: '', // 回复的内容
      offset: null, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },
  created () {
    console.log('评论回复组件', this.$route.params.id)
  },
  methods: {
    async hAddReply () {
      if (this.content === '') {
        return
      }
      try {
        // 1. 发请求
        // addCommentReply(评论id, 文章编号, 评论内容)
        const result = await addCommentReply(this.comment.com_id.toString(), this.article_id, this.content)
        // 在result中有一个new_obj这个值表示 本次评论的结果。

        // 2. 更新视图。 把最新评论添加在评论列表的最上面
        this.list.unshift(result.data.data.new_obj)

        // 3. 清空评论区
        this.content = ''

        // 4. 反馈
        this.$toast.success('发布回复成功')

        // 5. 回复数量+1
        this.comment.reply_count++
      } catch (err) {
        console.log(err)
        this.$toast.fail('回复失败')
      }
    },
    async onLoad () {
      // 1. 请求评论回复数据
      // 如果this.offset是null，则axios在传参时，会忽略这个参数
      const result = await getCommentReplys(this.comment.com_id.toString(), this.offset)
      this.offset = result.data.data.last_id

      console.log(result)
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
