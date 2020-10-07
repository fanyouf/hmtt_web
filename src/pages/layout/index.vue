<template>
  <div class="container">
    <!-- logo导航 -->
    <van-nav-bar fixed>
      <div slot="left" class="logo"></div>
      <van-button slot="right"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
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
      <van-tabbar-item icon="setting-o" to="/user">
      <!-- {{ $store.state.tokenInfo.token ? '我的' : '未登陆'}} -->
      <!-- {{ $store.getters.isLogin ? '我的' : '未登陆'}} -->
      {{ isLogin ? '我的' : '未登陆'}}

      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  computed: {
    ...mapGetters(['isLogin'])
  }
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
