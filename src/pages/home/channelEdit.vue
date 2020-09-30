<template>
<div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button  size="mini" type="info">编辑</van-button>
      </van-cell>
      <van-grid>
         <!--
           :class="{cur:idx===curIndex}"
            动态绑定class
            {"cur": idx===curIndex} : 如果idx===curIndex成立，则会多一个名为cur的类。
         -->
        <van-grid-item
        v-for="(channel, idx) in channels"
        :key="channel.id"
        @click="hClickMyChannel(idx)"
        :class="{cur:idx===curIndex}">
          <span>{{channel.name}}</span>
          <!-- <van-icon name="cross" class="btn"></van-icon> -->
        </van-grid-item>
      </van-grid>
    </div>

     <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item v-for="channel in recommandChannels"
        :key="channel.id">
          <span>{{channel.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel.js'
export default {
  name: 'channelEdit',
  props: {
    // 已经订阅的频道
    channels: {
      type: Array,
      required: true
    },
    // 当前选中的频道的下标
    curIndex: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  computed: {
    recommandChannels () {
      // 可选频道
      // 目标：从allChannels中减去channels的内容
      // 思路
      //   对allChannels中每一项进行循环，
      //      如果: 当前项在channels中出现过（用户已经选过了），则不是可选频道
      //      如果：当前项在channels中没有出现过，则是可选频道

      // const res = this.allChannels.filter(channel => {
      //   const idx = this.channels.findIndex(item => item.id === channel.id)
      //   if (idx !== -1) {
      //     return false // 不会保留
      //   } else {
      //     return true // 会保留
      //   }
      // })

      // const res = this.allChannels.filter(channel => {
      //   return this.channels.findIndex(item => item.id === channel.id) === -1
      // })

      //  const res = this.allChannels.filter(channel => this.channels.findIndex(item => item.id === channel.id) === -1)
      // return res

      return this.allChannels.filter(channel => this.channels.findIndex(item => item.id === channel.id) === -1)
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const result = await getAllChannels()
      console.log(result)
      this.allChannels = result.data.data.channels
    },
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
  // 频道高亮
  .cur{
    color:red;
    font-weight:bold;
  }
</style>
