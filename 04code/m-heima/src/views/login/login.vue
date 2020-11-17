<template>
  <div class="login">
    <!-- 顶部导航条 -->
    <van-nav-bar
      title="登陆"
    />
    <!-- 表单区域 -->
    <van-cell-group>
      <van-field v-model.trim="userInfo.mobile"
      type="tel"
      label="手机号"
      :error-message="errorInfo.mobile"
      />
      <van-field v-model.trim="userInfo.code"
      type="password"
      label="密码"
      :error-message="errorInfo.code"
      />
    </van-cell-group>

    <!-- 按钮 -->
    <div class="btn-wrap">
      <!-- h: handle, 处理.  涉及用户交互的动作，都加上h -->
      <van-button type="info" @click="hLogin">登陆</van-button>
    </div>
  </div>
</template>

<script>

import { login } from '@/api/user.js'
export default {
  data () {
    return {
      errorInfo: {
        mobile: '',
        code: ''
      },
      userInfo: {
        mobile: '13912345678',
        code: '246810'
      }
    }
  },
  methods: {
    validate () {
      // 数据检验
      const { mobile, code } = this.userInfo

      // 验证手机号
      // if (/^\d{11}$/.test(mobile)) {
      //   this.errorInfo.mobile = ''
      // } else {
      //   this.errorInfo.mobile = '请输入正确的手机号'
      //   return false
      // }

      this.errorInfo.mobile = /^\d{11}$/.test(mobile) ? '' : '请输入正确的手机号'
      this.errorInfo.code = /^\d{6}$/.test(code) ? '' : '请输入正确的密码'

      // 验证密码
      // if (/^\d{6}$/.test(code)) {
      //   this.errorInfo.code = ''
      // } else {
      //   this.errorInfo.code = '请输入正确的密码'
      //   return false
      // }
      return this.errorInfo.mobile === '' && this.errorInfo.code === ''
    },
    async doLogin () {
      const { mobile, code } = this.userInfo
      // 显示loading
      this.$toast.loading({
        duration: 0, // 持续展示 toast, 不会自已关闭
        overlay: true, // 整体加一个遮罩
        message: '登陆中....'
      })
      try {
        const res = await login(mobile, code)

        console.log(res)
        // 给出成功的提示， 它会把前面的loading替换掉
        this.$toast.success('登陆成功')
        // alert('登陆成功，准备跳转')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
        // alert('登陆失败，用户名密码错误')
      }
    },
    hLogin () {
      // 1. 验证数据有效性， TODOS
      if (this.validate()) {
        // 2. 发请求
        this.doLogin()
      }
      // 尽早的返回
      // if (!this.validate()) {
      //   return
      // }
      // this.doLogin()
    }
  }
}
</script>
<style lang="less" scoped>
  // 按钮
  .btn-wrap {
    padding:20px;
    .van-button{
      width: 100%;
      background-color: #6db4fd;
      color:#fff;
    }
  }
</style>
