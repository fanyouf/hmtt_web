<template>
  <div class="container">
    <!-- logo导航 -->
    <van-nav-bar fixed v-show="cIsVisiable">
      <!-- 注意插槽的使用 -->
      <div slot="left" class="logo"></div>
      <template #right>
        <van-button
        @click="$router.push('/search')"
        round
        type="info"
        icon="search"
        size="small">搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 主体区域 -->
    <router-view></router-view>

    <!-- 底部的tabbar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="question-o" to="/question">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/setting">
      {{ isLogin ? "我的" : "未登陆"}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      active: 0
    }
  },
  computed: {
    cIsVisiable () {
      // 只有在个人中心页才不可见
      return this.$route.path !== '/setting'
    },
    ...mapGetters(['isLogin'])
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
