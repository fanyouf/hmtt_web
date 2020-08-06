<template>
  <div class="container">
    <!-- logo导航  logo + 按钮  固定在头部 -->
    <van-nav-bar fixed>
      <!-- 注意插槽的问题 -->
      <div slot="left" class="logo"></div>
      <van-button slot="right"
        round
        type="info"
        size="small"
        icon="search"
      >搜索</van-button>
    </van-nav-bar>

    <!-- 二级路由出口
      1. 首页
      2. 问答
      3. 视频
      4. 我的
    -->
    <router-view />

    <!-- 底部的tabbar -->
    <!-- 启用路由导航功能
      -route : 启用路由导航
      -to : 导航路由的path
    -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/user" icon="search">
        {{$store.state.tokenInfo.token ? '我的' : '未登陆' }}
      </van-tabbar-item>
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
