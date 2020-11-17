<template>
  <div id="app">
    <!-- 路由出口 -->
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
