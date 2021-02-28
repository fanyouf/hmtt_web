<template>
  <div id="app">
    <div id="nav">
      <div class="head">黑马头条移动版</div>

      <!-- 测试vant中的button的效果，以检查是否已经把vant引入到本项目了 -->
      <van-button  type="primary" @click="hAjax1">向服务器1发请求</van-button>
      <hr/>
      <van-button  type="primary" @click="hAjax2">向服务器2发请求</van-button>
      <!-- <van-button loading type="primary" loading-type="spinner" />
      <van-button loading type="info" loading-text="加载中..." />
      <van-rate v-model="value" /> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import { instance, instance2 } from './utils/request.js'
export default {
  data () {
    return {
      value: 3
    }
  },
  methods: {
    hAjax1 () {
      instance({
        url: '/app/v1_0/user/channels',
        method: 'GET'
      })
    },
    hAjax2 () {
      instance2({
        url: 'xxxx',
        method: 'GET'
      })
    }
  }
}
</script>
