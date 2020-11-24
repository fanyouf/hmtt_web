<template>
  <div class="container">
    <!-- 用户个人资料 -->
    <div class="user-profile">
      <div class="info">
        <van-image round
        :src="userInfo.photo" />
        <h3 class="name">
          {{userInfo.name}}
          <br />
          <van-tag size="mini">申请认证</van-tag>
        </h3>
      </div>
      <van-row>
        <van-col span="8">
          <p>{{userInfo.art_count}}</p>
          <p>动态</p>
        </van-col>
        <van-col span="8">
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </van-col>
        <van-col span="8">
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </van-col>
      </van-row>
    </div>

    <!-- 操作链接 -->
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="newspaper-o" color="#7af" />我的作品
      </van-col>
      <van-col span="8">
        <van-icon name="star-o" color="#f00" />我的收藏
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" color="#fa0" />阅读历史
      </van-col>
    </van-row>

    <!-- 编辑入口
      is-link: 产生一个向右的箭头
      to: 用来做路由的跳转
    -->
    <van-cell-group class="user-group">
      <van-cell icon="edit" title="编辑资料" to="/setting/profile" is-link />
      <van-cell icon="chat-o" title="小智同学" to="/setting/chat" is-link />
      <van-cell icon="setting-o" title="系统设置" />
      <van-cell icon="warning-o" title="退出登录" to="/login" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getInfo } from '@/api/user.js'
export default {
  name: 'UserIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const res = await getInfo()
      console.log(res)
      this.userInfo = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  &-profile {
    width: 100%;
    height: 200px;
    display: block;
    background: #3296fa;
    color: #fff;
    .info {
      display: flex;
      padding: 20px;
      align-items: center;
      .van-image{
        width: 64px;
        height: 64px;
      }
      .name {
        font-size: 16px;
        font-weight: normal;
        margin-left: 10px;
      }
      .van-tag {
        background: #fff;
        color: #3296fa;
      }
    }
    p{
      margin: 0;
      text-align: center;
    }
  }
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
      padding-bottom: 5px;
    }
  }
}
</style>
