<template>
  <div class="login">
    <!-- 1. 导航 -->
    <van-nav-bar
      title="登陆页"
    ></van-nav-bar>

    <!-- 2. 输入区域 -->
    <van-cell-group>
      <van-field
        v-model.trim="userInfo.mobile"
        required
        label="手机号"
        placeholder="请输入手机号"
        error-message=""
      />
      <van-field
        v-model.trim="userInfo.code"
        required
        label="短信验证"
        placeholder="请输入密码"
      />
    </van-cell-group>

    <!-- 3. 按钮 -->
    <div class="btn-wrap">
      <van-button round type="info" class="btn" @click="hLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/request.js'
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        mobile: '13912345678',
        code: '246810'
      }
    }
  },
  methods: {
    async hLogin () {
      // 1. 表单验证
      // TODO: 表单验证
      console.log(this.userInfo)
      // 2. 发请求
      // (1) 引入axios， （2）传入接口所需的参数
      const { mobile, code } = this.userInfo
      try {
        const result = await axios({
          url: '/app/v1_0/authorizations',
          method: 'POST',
          data: {
            mobile,
            code
          }
        })
        console.log(result)
        alert('成功')
      } catch (err) {
        console.log(err)
        alert('登陆失败')
      }
      // 3. 根据请求结果给出反馈，做后续
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
