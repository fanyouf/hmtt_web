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
        :error-message="mobileErrMsg"
      />
      <van-field
        v-model.trim="userInfo.code"
        required
        label="短信验证"
        placeholder="请输入密码"
        :error-message="codeErrMsg"
      />
    </van-cell-group>

    <!-- 3. 按钮 -->
    <div class="btn-wrap">
      <van-button round type="info" class="btn" @click="hLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
// import axios from '@/utils/request.js'
import { login } from '@/api/user.js'
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        mobile: '13912345678',
        code: '246810'
      },
      mobileErrMsg: '',
      codeErrMsg: ''
    }
  },
  methods: {
    // 用来做校验
    // 手机号： /\d{11}/
    // 密码： /\d{6}/
    validtor () {
      this.mobileErrMsg = /\d{11}/.test(this.userInfo.mobile) ? '' : '手机号不对'
      this.codeErrMsg = /\d{6}/.test(this.userInfo.code) ? '' : '密码不对'

      // 如果 ErrMsg都是''，就说明通过了验证
      // if (this.mobileErrMsg === '' && this.codeErrMsg === '') {
      //   return true
      // } else {
      //   return false
      // }

      return (this.mobileErrMsg === '' && this.codeErrMsg === '')
    },
    async hLogin () {
      // 1. 表单验证
      // if (this.validtor() === false) {
      if (!this.validtor()) {
        // this.$toast('信息格式不对')
        // 原则： （1）尽早返回 （2） 减少嵌套层次
        return
      }

      console.log(this.userInfo)
      // 2. 发请求
      // (1) 引入axios， （2）传入接口所需的参数
      const { mobile, code } = this.userInfo
      // 请求前加loading
      // https://youzan.github.io/vant/#/zh-CN/toast#zu-jian-nei-diao-yong
      this.$toast.loading({
        duration: 0, // 持续展示 toast,永远不会关闭
        overlay: true, // 整体添加一个遮罩
        message: '加载中...'
      })
      try {
        const result = await login(mobile, code)

        // const result = await axios({
        //   url: '/app/v1_0/authorizations',
        //   method: 'POST',
        //   data: {
        //     mobile,
        //     code
        //   }
        // })
        console.log(result)
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
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
