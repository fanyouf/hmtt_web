<template>
  <div id="app">
    <div class="div">
      黑马头条移动版
    </div>
    <van-button type="default" @click="hClick1">请求服务器地址1</van-button>
    <van-button type="primary" @click="hClick2">请求服务器地址2</van-button>
    <van-button type="info"  @click="hClick3">使用默认导入的地址</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <router-view/>
  </div>
</template>

<script>
// ajax123456是从request.js中默认导出的内容。它可以重命名
import ajax123456, { instance1, instance2 } from './utils/request'
// import ajax from './utils/request'
export default {
  methods: {
    hClick1 () {
      instance1({
        method: 'GET',
        url: '/app/v1_0/user/channels'
      })
    },
    hClick2 () {
      instance2({
        method: 'GET',
        url: '/app/v1_0/user/channels'
      })
    },
    hClick3 () {
      ajax123456({
        method: 'GET',
        url: '/app/v1_0/user/channels'
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .div{
    width: 75px;
    height: 37.5px;
    background-color: green;
  }
</style>
