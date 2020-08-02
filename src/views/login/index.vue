<template>
  <div class="login">
    <van-nav-bar
      title="登陆"
    />
    <van-cell-group>
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field type="tel"
      label="手机号"
      v-model.trim="mobile"
      placeholder="请输入手机号" />

      <!-- 输入密码 -->
      <van-field type="password"
      label="密码"
      v-model.trim="code"
      placeholder="请输入密码"/>
    </van-cell-group>

    <div class="btn-wrap">
      <van-button type="info" class="btn" @click="hLogin">登陆</van-button>
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/request'
console.log(ajax)
export default {
  name: 'Login',
  data () {
    return {
      mobile: '13912345678',
      code: '246810'
    }
  },
  methods: {
    hLogin () {
      console.log(this.mobile, this.code)
      // 1. 检验
      // 2. 发请求.根据接口文档说明
      ajax({
        method: 'POST', // 接口请求的方式
        url: '/app/v1_0/authorizations', // 接口的地址
        data: { // 如果接口约定是 Body传参-- 请求体， 要通过data去写数据
          mobile: this.mobile,
          code: this.code
        }
      })
      // ajax123.post('/app/v1_0/authorizations', {
      //   mobile: this.mobile,
      //   code: this.code
      // })

      // 3. 根据请求结果，做下一步处理
      //     登陆失败；
      //     登陆成功，跳转
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    .btn-wrap {
      padding: 20px;
      .btn {
        width: 100%;
        background-color: #6db4fd;
        color:#fff;
      }
    }
  }
</style>
