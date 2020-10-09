<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list" ref="refList">
      <div
        v-for="(item,idx) in list"
        :key="idx"
        :class="item.name === 'xz' ? 'left' : 'right'"
        class="chat-item">
          <!-- template是一个逻辑上的容器，页面在渲染时，它不会产生dom -->
          <template v-if="item.name === 'xz'">
            <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div class="chat-pao">{{item.msg}}</div>
          </template>
          <template v-else>
            <div class="chat-pao">{{item.msg}}</div>
            <van-image fit="cover" round :src="userPhoto" />
          </template>
      </div>
    </div>

    <!-- 对话区域 说话-->
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="word" placeholder="说点什么...">
        <span  @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters } from 'vuex'
export default {
  name: 'UserChat',
  data () {
    return {
      list: [ // 对话记录
        { name: 'xz', msg: '你好，我是无所不知的小智同学！', timestamp: Date.now() },
        { name: 'me', msg: '小智同学, 请问你知道你不知道什么吗？', timestamp: Date.now() },
        { name: 'xz', msg: '我有点晕了', timestamp: Date.now() },
        { name: 'me', msg: '我是一个伟大的程序员', timestamp: Date.now() },
        { name: 'xz', msg: '哦，你cv一定很熟！', timestamp: Date.now() }
      ],
      word: ''
    }
  },
  computed: {
    ...mapGetters(['userPhoto'])
  },
  created () {
    this.timer = setInterval(() => {
      console.log(Date.now())
    }, 1000)
    // 1. 创建webscoket连接
    // 格式：io(url, 参数)
    // http://47.114.163.79:3003
    // http://ttapi.research.itcast.cn
    this.socketio = io('http://47.114.163.79:3003', {
      query: {
        token: this.$store.state.tokenInfo.token
      }
    })
    this.socketio.on('connect', () => {
      console.log('连接成功')
      // 小智同学打招呼
      this.list.push({
        name: 'xz', msg: '你好，你的小智同学上线了！', timestamp: Date.now()
      })
      this.scrollToBottom()
    })

    this.socketio.on('message', (obj) => {
      console.log('从服务器发回来的数据', obj)
      // {msg: "我的长的好看!", timestamp: 1602229081886}
      const msg = {
        ...obj, name: 'xz'
      }
      this.list.push(msg)
      this.scrollToBottom()
    })
  },
  methods: {
    scrollToBottom () {
      this.$nextTick(() => {
        const dom = this.$refs.refList
        // scrollTop 是dom元素的属性，可以去手动设置
        //   它表示当前dom元素中的滚动条距离元素顶部的距离
        dom.scrollTop = dom.scrollHeight
      })
    },
    send () {
      if (this.word === '') {
        return
      }
      // 1. 把我要说的话发给服务器接口
      console.log(this.word)
      // this.socketio.emit(消息名称，内容)
      this.socketio.emit('message', {
        msg: this.word,
        timestamp: Date.now()
      })

      // 2.在本地添加消息
      this.list.push({ name: 'me', msg: this.word, timestamp: Date.now() })
      this.scrollToBottom()
      // 3. 清空
      this.word = ''
    }
  },
  // 组件销毁时，关闭与服务器的连接
  destroyed () {
    // 组件销毁时，关闭与服务器的连接
    if (this.socketio) {
      this.socketio.close()
    }

    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
