<template>
<div class="article-comments">
    <!-- 导航栏 -->
    <van-nav-bar :title="currentComment.reply_count + '条回复'">
      <van-icon slot="left" name="cross" />
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
        :src="currentComment.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{currentComment.aut_name}}</span>
      <div slot="label">
        <p style="color: #363636;">{{currentComment.content}}</p>
        <p>
          <span style="margin-right: 10px;">{{currentComment.pubdate | relativeTime}}</span>
          <van-button
            size="mini"
            type="default"
          >回复{{currentComment.reply_count}}</van-button>
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
            <span style="margin-right: 10px;">{{item.pubdate | relativeTime}}</span>
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
      >
        <van-button
          slot="button"
          size="mini"
          type="info"
        >发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布回复 -->
</div>

</template>
<script>
import { getCommentReplys } from '@/api/comment'
export default {
  name: 'CommentReply',
  props: {
    currentComment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      offset: null,
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },
  methods: {
    async onLoad () {
      const comId = this.currentComment.com_id.toString()
      // 1. 请求数据
      const result = await getCommentReplys(comId, this.offset)
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
