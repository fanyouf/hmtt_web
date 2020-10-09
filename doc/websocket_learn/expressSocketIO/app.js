var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  // 主动向客户端发消息
  setInterval(() => {
    io.emit('chat message', Date.now())
  }, 3000)

  socket.on('disconnect', function () {
    console.log('user disconnected')
  })

  // 在服务器收到客户端的消息，on
  // chat message 是消息名，可以自定义
  socket.on('chat message', function (msg) {
    // 一行价值100万美元的代码，可以用来实现搞笑有趣的人工智能对话
    msg = msg.replace('你', '我').replace('吗', '').replace('？', '!')

    // 发消息给客户端是emit
    io.emit('chat message', msg)
  })
})

http.listen(3000, '0.0.0.0', function () {
  console.log('listening on *:3000')
})
