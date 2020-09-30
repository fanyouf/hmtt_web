<template>
<div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道
    点击就会执行： 把右边的值赋值给左边的变量。
    相当于每点一次，就取反一次。效果就是一个开关true ->false -> true.....
    @click="isEdit=!isEdit"
    -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button
        size="mini"
        type="info"
        @click="isEdit=!isEdit">{{isEdit ? '取消':'编辑'}}</van-button>
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
          <!--
            我的频道上的x按钮
            1. 只有在编辑状态时，才可见
            2. 推荐频道始终是不能删除的，它不应该显示x
               推荐频道的id一直是0
          -->
          <van-icon v-show="isEdit && idx!=0" name="cross" class="btn"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>

     <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item v-for="channel in recommandChannels"
        :key="channel.id"
        @click="hClickRecommandChannel(channel)">
          <span>{{channel.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels, addChannel, delChannel } from '@/api/channel.js' //
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
      isEdit: false, // 是否处于编辑状态
      allChannels: [] // 所有频道
    }
  },
  computed: {
    recommandChannels () {
      console.log('recommandChannels....')
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
    async hClickRecommandChannel (channel) {
      // 1. 组装接口需要的参数 -- 推荐频道不能加在其中
      //  (1) 获取当前的频道的id
      const curSelectChannelId = channel.id
      //  (2) 添加已选的频道列表中
      const channels = this.channels.map(channel => {
        return { id: channel.id }
      })
      channels.push({ id: curSelectChannelId })
      //  (3) 调整属性名
      channels.forEach((item, idx) => {
        item.seq = idx
      })
      console.log(channels)
      // 2.推荐频道不能加在其中 删除第一项： 推荐频道
      channels.splice(0, 1)
      //
      // const channels = [{id, seq}, {id, seq}.....]
      // 3. 发请求
      addChannel(channels)

      // 4. 更新视图: 把用户点击的频道从可选频道中删除，添加已选频道中
      //   有三个效果
      // （1） 我的频道会多出一个
      // （2） 可选频道会少一个（计算属性）
      // （3） 父组件中频道列表也会被修改（prop中传递的是一个数组）
      this.channels.push(channel)
      this.$toast.success('添加频道成功')
    },
    async loadAllChannels () {
      const result = await getAllChannels()
      console.log(result)
      this.allChannels = result.data.data.channels
    },
    async hClickMyChannel (idx) {
      // 告诉父组件，当前被前点击的是第几个频道
      if (this.isEdit) {
        // 推荐频道不能删除
        if (idx === 0) {
          return
        }
        // 1. 频道删除
        // alert(idx)
        const res = await delChannel(this.channels[idx].id)
        console.log(res)
        // 2.更新视图
        this.channels.splice(idx, 1)
        this.$toast.success('删除频道成功')
      } else {
        // 2. 频道切换
        this.$emit('updateCurChannel', idx)
      }
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
