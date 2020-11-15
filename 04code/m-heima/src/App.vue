<template>
  <div id="app">
    黑马头条
    <van-button type="danger" @click="hTestAxios1">测试axios的效果</van-button>
    <van-button type="primary" @click="hTestAxios2">测试axios的效果-async</van-button>
    <router-view/>
  </div>
</template>
<script>
import { instance2 } from '@/utils/request.js'
// import request from '@/utils/request.js'
export default {
  methods: {
    async hTestAxios2 () {
      try {
        const res = await instance2({
          method: 'GET',
          url: '/app/v1_0/user/channels'
        })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    hTestAxios1 () {
      instance2({
        method: 'GET',
        url: '/app/v1_0/user/channels'
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
