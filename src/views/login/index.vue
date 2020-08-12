<template>
  <div class="login">
    <!-- 标题 -->
    <van-nav-bar
      title="登陆"
    />

    <!-- 表单区域 -->
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

    <!-- 按钮 -->
    <div class="btn-wrap">
      <van-button type="info" class="btn" @click="hLogin">登陆</van-button>
    </div>
 <p>当前是否有登陆：{{$store.state.tokenInfo.token ? '登陆了': '没有登陆'}}</p>
    <van-button type="info" class="btn" @click="hGetProfile">测试去获取用户个人信息{{$store.state.tokenInfo.token ? '登陆了': '没有登陆'}}</van-button>
  </div>
</template>

<script>
import { login, getProfile, getInfo } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '13912345678',
      code: '246810',
      // 验证错误提示
      mobile_errmsg: '',
      code_errmsg: ''
    }
  },
  methods: {
    async hGetProfile () {
      // 调用接口，获取用户个人信息
      await getProfile()
    },
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
        const result = await login(this.mobile, this.code)
        // 登陆成功之后，后端返回的数据
        // 1. 保存token 到vuex (所有的组件都可以访问这个数据)
        //    在组件中如何去调用mutation?(1) mapMutations,(2)$store.commit
        // console.log(result.data.data)
        this.$store.commit('mSetTokenInfo', result.data.data)

        // 2. 再发请求获取个人信息
        const res = await getInfo()
        console.log(res)
        const user = res.data.data
        // 保存到vuex
        this.$store.commit('mSetUserInfo', {
          id: user.id,
          name: user.name,
          photo: user.photo
        })

        // 覆盖上一个toast提示
        // 会在3s之后关闭
        this.$toast.success('登陆成功')
        // todo 登陆成功，跳转
        const backto = this.$route.query.backto || '/'
        this.$router.push(backto)
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
      }
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
