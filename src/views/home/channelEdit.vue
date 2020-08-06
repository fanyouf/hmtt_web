<template>
  <div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <!--
      :class="{'cur': 条件}"
      如果条件成立，就会有cur类。
    -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button size="mini" plain hairline type="info" @click="editing=!editing" class="editBtn">
          {{ editing ? '取消' : '编辑'}}
        </van-button>
      </van-cell>
      <van-grid>
        <van-grid-item
        v-for="item in channels"
        :key="item.id"
        @click="hClickMyChannel(item)"
        :class="{'cur': item.id === channelId}"
        >
          <span>{{item.name}}</span>
          <!--
            我的频道上的x按钮
            1. 只有在编辑状态时，才可见
          1 2. 推荐频道始终是不能删除的，它不应该显示x
               推荐频道的id一直是0
          -->
          <van-icon v-show="editing && item.id!== 0" name="cross" class="btn"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        @click="hAddChannel(item)">
          <span>{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels, addChannel, deleteChannel } from '@/api/channel.js'
export default {
  name: 'ChannelEdit',
  // props: ['channels', 'channelId'],
  props: {
    channels: {
      type: Array, // 类型
      required: true // 是否必须要传入
    },
    channelId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      editing: false, // 是否处于编辑状态
      allChannels: [] // 所有的频道
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    // 可选频道
    recommendChannels () {
      console.log(Date.now(), '计算属性在工作..... recommendChannels')
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
    // 用户在可选频道上做一次点击
    async hAddChannel (channel) {
      // 1. 组装参数，改造 成api要的格式
      //    在用户原来的订阅频道的基础上，添加这个频道
      let curChannelList = [...this.channels, channel]
      curChannelList = curChannelList.map((item, idx) => {
        return {
          id: item.id,
          seq: idx
        }
      })
      // 去掉推荐频道。 由于推荐频道总是第一个位置，所以这里直接删除它
      curChannelList.splice(0, 1)
      // console.log(curChannelList)
      // 2. 调用接口 -- 通知后端服务器去更新频道
      const result = await addChannel(curChannelList)
      console.log(result)
      // 3. 更新视图
      // this.channels表示已订阅的频道，这是从父组件中传过来了。
      this.channels.push(channel)
      // 1) 修改了已经订阅的频道   多出一项
      // 2) 会激活计算属性再次工作，修改可选频道会少一项
      // 3) 它还会去修改父组件中的channels。原因是channels本身就是通过props从父组件传递过来的 数组
    },

    // 用户点击了我的频道
    // 有两种情况：
    // 1. 普通状态
    //   要做频道跳转，通知父组件
    // 2. 编辑状态
    //   删除频道
    async hClickMyChannel (channel) {
      if (this.editing) {
        // 删除频道
        console.log('删除频道')
        if (channel.id === 0) { // 推荐频道是不能去删除的
          return
        }
        // 1. 请求接口。不再去订阅这个频道了
        const result = await deleteChannel(channel.id)
        console.log(result)
        // 2. 更新视图: 在已经选中的频道中去删除这一项
        const idx = this.channels.findIndex(item => item.id === channel.id)
        if (idx !== -1) {
          this.channels.splice(idx, 1)
          // 1) 修改了已经订阅的频道   减少出一项
          // 2) 会激活计算属性再次工作，修改可选频道会多一项
          // 3) 它还会去修改父组件中的channels。原因是channels本身就是通过props从父组件传递过来的 数组
        }
      } else {
        // 抛出事件
        this.$emit('updateCurChannel', channel)
      }
    },
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
  // 高亮显示当前频道
  .cur {
    color: red;
    font-weight: bold;
  }
  .editBtn {
    color: rgb(229, 97, 91) !important;
    margin-right:10px;
    padding:0 10px;
    border-color: rgb(229, 97, 91);
  }
</style>
