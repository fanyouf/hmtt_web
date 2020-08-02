<template>
  <div class="login">
    <van-nav-bar
      title="登陆"
    />
    <van-cell-group>
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field type="tel"
      label="手机号"
      required
      v-model.trim="mobile"
      :error-message="mobile_errmsg"
      placeholder="请输入手机号" />

      <!-- 输入密码 -->
      <van-field type="password"
      label="密码"
      required
      v-model.trim="code"
      :error-message="code_errmsg"
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
      code: '246810',
      mobile_errmsg: '',
      code_errmsg: ''
    }
  },
  methods: {
    check () {
      // 如果验证不通过，返回false
      // 规则：不能为空
      this.mobile_errmsg = this.mobile === '' ? '大姐，手机号要写对' : ''
      this.code_errmsg = this.code === '' ? '大姐，您没有收到密码吗？' : ''

      if (this.mobile === '') {
        return false
      }

      if (this.code === '') {
        return false
      }

      return true
    },
    async hLogin () {
      console.log(this.mobile, this.code)
      // 1. 检验
      // 验证用户输入数据的有效性。
      //  (1) 自己写判断
      if (!this.check()) {
        console.log('没有通过验证')
        return
      }
      //  (2) 可以采用vant中的form组件，自带的检验（作业）
      //   参考：https://vant-contrib.gitee.io/vant/#/zh-CN/form#xiao-yan-gui-ze

      // 提示登陆中
      this.$toast.loading({
        duration: 0, // 永远不会关闭
        mask: true,
        message: '登陆中....'
      });
      // 2. 发请求.根据接口文档说明
      try {
        await ajax({
          method: 'POST', // 接口请求的方式
          url: '/app/v1_0/authorizations', // 接口的地址
          data: { // 如果接口约定是 Body传参-- 请求体， 要通过data去写数据
            mobile: this.mobile,
            code: this.code
          }
        })
        // 覆盖上一个toast提示
        this.$toast.success('登陆成功')
        // todo 登陆成功，跳转
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
      }

      // ajax.post('/app/v1_0/authorizations', {
      //   mobile: this.mobile,
      //   code: this.code
      // })
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
