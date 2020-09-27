<template>
  <div class="login">
    <!-- 1. 导航 -->
    <van-nav-bar
      title="登陆页"
    ></van-nav-bar>

    <!-- 2. 输入区域 -->
    <van-cell-group>
      <van-field
        v-model="userInfo.phone"
        required
        label="手机号"
        placeholder="请输入手机号"
        error-message=""
      />
      <van-field
        v-model="userInfo.code"
        required
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>

    <!-- 3. 按钮 -->
    <div class="btn-wrap">
      <van-button round type="info" class="btn">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        phone: '13912345678',
        code: '246810'
      }
    }
  }
}
</script>

<style lang="less">
.login {
  .btn-wrap {
    padding: 0 15px;
    .btn{
      width: 100%;
      background-color: #6db4fd;
      color:#fff;
    }
  }
}
</style>
