<template>
  <div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button  size="mini" type="info">编辑</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item v-for="item in channels" :key="item.id">
          <span>{{item.name}}</span>
          <!-- <van-icon name="cross" class="btn"></van-icon> -->
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item v-for="item in recommendChannels" :key="item.id">
          <span>{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel.js'
export default {
  name: 'ChannelEdit',
  props: ['channels'],
  data () {
    return {
      allChannels: [] // 所有的频道
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    // 可选频道
    recommendChannels () {
      // 公式： this.allChannels - this.channels
      // 本质是：从一个数组中减去另一个数组
      //  对 所有频道进行过滤，只留下那些个 没有出现在 我的频道中的 数据
      const result = this.allChannels.filter(channel => {
        // 只留下那些个 没有出现在 我的频道中的 数据
        // 去到我的频道中找一下channel,如果找到说明已经出现在我的频道，则不要保留；找不到，则留下
        const idx = this.channels.findIndex(item => item.id === channel.id)
        if (idx === -1) {
          // 没有找到
          return true
        } else {
          return false
        }
      })

      return result
    }
  },
  methods: {
    async loadAllChannels () {
      const result = await getAllChannels()
      console.log(result)
      this.allChannels = result.data.data.channels
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
