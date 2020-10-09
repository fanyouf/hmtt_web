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

    <!-- 路由出口
    keep-alive:是vue内置的组件。它的功能是 对 包在它里面的组件时行 缓存
    缓存：在切换路由时，不做删除。

    对于不同路由组件，可以有针对性进行缓存。
    -->

    <!-- 如果当前的路由对象上有 isKeepAlive 这个标识就缓存，否则就不缓存 -->
    <!-- 路由出口 -->
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>

    <router-view v-if="!$route.meta.isKeepAlive"/>

  </div>
</template>

<script>
// eslint-disable-next-line import/no-duplicates
// import request, { instance1, instance2 } from '@/utils/request'
// eslint-disable-next-line import/no-duplicates
// import  from '@/utils/request'
export default {
  name: 'App',
  // mounted () {
  //   window.addEventListener('hashChange', () => {
  //     const currentPath = window.location.hash.slice(1)
  //     if (this.$route.path !== currentPath) {
  //       this.$router.push(currentPath)
  //     }
  //   }, false)
  // },
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
