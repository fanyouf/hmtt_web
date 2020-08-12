<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div class="chat-item"
        v-for="(item,idx) in list"
        :key="item.timestamp + idx"
        :class="item.name==='xz' ? 'left':'right'"
      >
        <!-- template这个组件的作用：是在逻辑上形成一个整体，在实际渲染时，它并不会呈现为任意的dom元素 -->
        <!-- 充当一个想象的div -->
        <template v-if="item.name==='xz'">
          <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="chat-pao">{{item.msg}}</div>
        </template>
        <template v-else>
          <div class="chat-pao">{{item.msg}}</div>
          <van-image fit="cover" round :src="$store.state.userInfo.photo"/>
        </template>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="word" placeholder="说点什么...">
        <span  @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
// 提供websocket的功能
import io from 'socket.io-client'
export default {
  name: 'UserChat',
  data () {
    return {
      // 对话记录
      list: [
        { name: 'xz', msg: '你好，我是无所不知的小智同学！', timestamp: Date.now() },
        { name: 'me', msg: '小智同学, 请问你知道你不知道什么吗？', timestamp: Date.now() },
        { name: 'xz', msg: '我有点晕了', timestamp: Date.now() },
        { name: 'xz', msg: '我要下班了', timestamp: Date.now() },
        { name: 'xz', msg: '你好，我是无所不知的小智同学！', timestamp: Date.now() },
        { name: 'me', msg: '小智同学, 请问你知道你不知道什么吗？', timestamp: Date.now() },
        { name: 'xz', msg: '我有点晕了', timestamp: Date.now() },
        { name: 'xz', msg: '我要下班了', timestamp: Date.now() }
      ],
      word: ''
    }
  },
  created () {
    // 1. 创建webscoket连接
    // 格式：io(url, 参数)
    // http://47.114.163.79:3003
    // http://ttapi.research.itcast.cn
    this.socket = io('http://47.114.163.79:3003', {
      query: {
        token: this.$store.state.tokenInfo.token
      }
    })
    this.socket.on('connect', () => {
      console.log('与webscoket服务器连接成功')
      // 填充到list中
      this.list.push({
        msg: '我是小智。你已经连上我了',
        timestamp: Date.now(),
        name: 'xz'
      })
      this.$nextTick(() => {
        document.querySelector('.chat-list').scrollTop = document.querySelector('.chat-list').scrollHeight
      })
    })
    this.socket.on('message', obj => {
      console.log('收到服务器端的消息', obj)
      // 填充到list中
      this.list.push({
        msg: obj.msg,
        timestamp: obj.timestamp,
        name: 'xz'
      })
      this.$nextTick(() => {
        document.querySelector('.chat-list').scrollTop = document.querySelector('.chat-list').scrollHeight
      })
    })
  },
  methods: {
    // 用户点击了发送按钮
    send () {
      console.log(this.word)
      if (this.word === '') {
        return
      }
      if (this.socket) {
        // 1. 向websocket服务器发消息
        const info = {
          msg: this.word,
          timestamp: Date.now()
        }
        this.socket.emit('message', info)

        // 2. 把自已说的话，添加到list中去
        // 添加了数据项，会引起视图的变化 ---- 添加了一个div块 ---- 导致整体高度会增加
        this.list.push({
          name: 'me',
          msg: this.word,
          timestamp: Date.now()
        })
        // console.log(document.querySelector('.chat-list').scrollHeight)
        // setTimeout(() => {
        //   console.log(document.querySelector('.chat-list').scrollHeight)
        // }, 1000)
        this.$nextTick(() => {
          document.querySelector('.chat-list').scrollTop = document.querySelector('.chat-list').scrollHeight
        })
        // 3. 清空留言区域
        this.word = ''
      }
    }
  },
  destroyed () {
    // 组件销毁时，关闭与服务器的连接
    if (this.socket) {
      this.socket.close()
    }
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
