<template>
  <div id="app">
    <!-- <div id="nav">
      黑马头条web版本
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning" @click="h2">警告按钮-接口1</van-button>
      <van-button type="danger" @click="h1">危险按钮-接口1</van-button>
    </div> -->

    <!-- 路由出口 -->
    <router-view/>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-duplicates
// import request, { instance1, instance2 } from '@/utils/request'
// eslint-disable-next-line import/no-duplicates
// import  from '@/utils/request'
export default {
  name: 'App',
  methods: {
    // h1 () {
    //   request.post('/abc')
    //   // console.log(instance1)
    //   instance1.get('/abc')
    // },
    // h2 () {
    //   // console.log(instance2)
    //   instance2.get('/abc')
    // }
  }
}
</script>
