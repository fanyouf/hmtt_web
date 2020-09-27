<template>
  <div>
    <!-- logo导航 -->
    <van-nav-bar>
      <div slot="left" class="logo"></div>
      <van-button slot="right"
        round
        type="info"
        size="small"
        icon="search"
      >搜索</van-button>
    </van-nav-bar>

    <!-- 主体区域 -->
    <router-view></router-view>

    <!-- 底部的tabbar -->
    <!-- 启用路由导航功能
      -route : 启用路由导航
      -to : 导航路由的path
    -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="question" to="/question">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .logo {
    background: url("../../assets/logo.png") no-repeat;
    background-size: cover;
    width: 100px;
    height: 30px;
  }
  .van-nav-bar .van-icon{
    color: #fff;
  }
</style>
