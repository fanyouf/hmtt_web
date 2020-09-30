<template>
<div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button  size="mini" type="info">编辑</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item
        v-for="(channel, idx) in channels"
        :key="channel.id"
        @click="hClickMyChannel(idx)">
          <span>{{channel.name}}</span>
          <!-- <van-icon name="cross" class="btn"></van-icon> -->
        </van-grid-item>
      </van-grid>
    </div>

     <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item v-for="index in 8" :key="index">
          <span>频道{{index}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: 'channelEdit',
  props: {
    channels: {
      type: Array,
      required: true
    }
  },
  methods: {
    hClickMyChannel (idx) {
      // 告诉父组件，当前被前点击的是第几个频道
      this.$emit('updateCurChannel', idx)
    }
  }
}
</script>

<style lang="less" scoped>
  .channel{
    padding:15px;
    font-size:14px;
  }
  .btn {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 24px;
}
</style>
