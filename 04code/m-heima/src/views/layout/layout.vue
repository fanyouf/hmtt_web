<template>
  <div class="container">
    <!-- logo导航 -->
    <van-nav-bar>
      <!-- 注意插槽的使用 -->
      <div slot="left" class="logo"></div>
      <template #right>
        <van-button round type="info" icon="search" size="small">搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 主体区域 -->
    <router-view></router-view>

    <!-- 底部的tabbar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="question-o" to="/question">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/setting">未登陆|我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less" scoped>
.van-nav-bar .van-icon{
    color: #fff;
  }
.logo {
    background: url("../../assets/logo.png") no-repeat;
    background-size: cover;
    width: 100px;
    height: 30px;
  }
</style>
