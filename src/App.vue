<template>
  <div id="app">
    <div class="div">
      黑马头条移动版
    </div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <router-view/>
  </div>
</template>
<style lang="less" scoped>
  .div{
    width: 75px;
    height: 37.5px;
    background-color: green;
  }
</style>
