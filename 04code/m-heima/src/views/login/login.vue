<template>
  <div class="login">
    <!-- 顶部导航条 -->
    <van-nav-bar
      title="登陆"
    />
    <!-- 表单区域 -->
    <van-cell-group>
      <van-field v-model="mobile" type="tel" label="手机号" />
      <van-field v-model="code" type="password" label="密码" />
    </van-cell-group>

    <!-- 按钮 -->
    <div class="btn-warp">
      <van-button type="info">登陆</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mobile: '13912345678',
      code: '246810'
    }
  }
}
</script>
