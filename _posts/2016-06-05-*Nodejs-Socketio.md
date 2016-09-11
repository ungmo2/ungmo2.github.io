---
layout: post
title: Node.js(express)와 Socket.io
categories: node.js
---

![socket.io logo](/img/socketio-logo.png)
{: style="max-width:600px; margin: 10px auto;"}

HTTP는 무상태 프로토콜(stateless protocol)으로 어떠한 이전 요청과도 무관한 각각의 요청을 독립적인 트랜잭션으로 취급하는 통신 프로토콜이다. 이러한 HTTP의 한계에서 벗어나 Node.js에서 손쉽게 Real-time communication(RTC, 실시간 양방향 통신) 웹 애플리케이션을 작성할 수 있는 Socket.io를 간단한 채팅 애플리케이션 작성을 통해 알아본다.

* TOC
{:toc}

# 1. WebSocket

[WebSocket](https://www.websocket.org/aboutwebsocket.html)은 사용자의 브라우저와 서버 사이의 동적인 양방향 연결 채널을 구성하는 HTML5 프로토콜이다. WebSocket API를 통해 서버로 메시지를 보내고 요청 없이 응답을 받아오는 것이 가능하다.

HTTP는 클라이언트에 의해 초기화되기 때문에 서버가 변경사항을 클라이언트에게 알릴 수 있는 방법이 없지만  WebSocket의 연결은 HTTP 통신과는 다르게 클라언트가 특정 주기를 가지고 Polling하지 않아도 변경된 사항을 시기 적절하게 전달할 수 있는 지속적이고 완전한 양방향 연결 스트림을 만들어 주는 기술이다.

![websocket-polling](/img/websocket-polling.gif)
{: style="max-width:500px; margin: 10px auto;"}

WebSocket과 Polling 방식 비교 ([www.websocket.org](https://www.websocket.org/quantum.html))
{: style="color:gray; font-size: 80%; text-align: center; margin-top: 5px;"}

이러한 특성으로 인해 WebSocket은 서버의 데이터를 클라이언트에 즉시 전달할 수 있는 실시간 애플리케이션 작성에 매우 효과적인 프로토콜이다.

WebSocket을 사용하여 Node.js 기반 서버와 통신이 가능한 예제를 작성하여 보자.

먼저 클라이언트(브라우저) WebSocket을 구현한다. 루트 디렉터리에 index.html을 작성한다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Native WebSocket Example</title>
</head>
<body>
<script>
  // 웹소켓 전역 객체 생성
  var ws = new WebSocket("ws://localhost:3000");

  // 연결이 수립되면 서버에 메시지를 전송한다
  ws.onopen = function(event) {
    ws.send("Client message: Hi!");
  }

  // 서버로 부터 메시지를 수신한다
  ws.onmessage = function(event) {
    console.log("Server message: ", event.data);
  }

  // error event handler
  ws.onerror = function(event) {
    console.log("Server error message: ", event.data);
  }
</script>
</body>
</html>
```

다음은 [ws 모듈](https://www.npmjs.com/package/ws)을 사용하여 Node.js 기반 서버를 구현한다.

```bash
$ mkdir native-websocket && cd native-websocket
$ npm init --yes
$ npm install ws --save
```

루트 디렉터리에 server.js을 작성한다.

```javascript
var WebSocketS = require("ws").Server;
var wss = new WebSocketServer({ port: 3000 });

// 연결이 수립되면 클라이언트에 메시지를 전송하고 클라이언트로부터의 메시지를 수신한다
wss.on("connection", function(ws) {
  ws.send("Hello! I am a server.");
  ws.on("message", function(message) {
    console.log("Received: %s", message);
  });
});
```

서버를 실행한다.

```bash
$ node server
```

브라우저에서 index.html을 열면 콘솔에서 메시지를 확인할 수 있다.

![native-websocket-client](/img/native-websocket-client.png)
{: style="max-width:500px; margin: 10px auto; border: 0.5px solid gray;"}

Client에 수신한 메시지
{: style="color:gray; font-size: 80%; text-align: center; margin-top: 5px;"}

![native-websocket-server](/img/native-websocket-server.png)
{: style="max-width:500px; margin: 10px auto; border: 0.5px solid gray;"}

Server에서 수신한 메시지
{: style="color:gray; font-size: 80%; text-align: center; margin-top: 5px;"}

# 2. Socket.io

HTML5 WebSocket은 매우 유용한 기술이지만 오래된 브라우저의 경우 지원하지 않는 경우가 있다.

![caniuse-websocket](/img/caniuse-websocket.png)
{: style="max-width:500px; margin: 10px auto;"}

[www.caniuse.com](http://caniuse.com/#feat=websockets)
{: style="color:gray; font-size: 80%; text-align: center; margin-top: 5px;"}

또한 연결은 언제든지 끊어질 수 있기 때문에 재연결 수립이 필요하다. 브라우저 간 호환이나 이전 버전 호환을 고려하여 Node.js를 위한 강력한 Cross-platform WebSocket API인 [Socket.io](http://socket.io/)를 사용하는 것이 바람직하다.

# 3. Install

프로젝트 루트 디렉터리를 생성하고 Socket.io를 인스톨한다.

```bash
$ mkdir socketio-chat && cd socketio-chat
$ npm init --yes
$ npm install --save --save-exact socket.io express
```

package.json의 내용은 아래와 같다. Node.js 6.4.0를 사용하였다.

```json
{
  "name": "socketio-chat",
  "version": "1.0.0",
  "scripts": {
    "start": "node app"
  },
  "dependencies": {
    "express": "4.14.0",
    "socket.io": "1.4.8"
  }
}
```

# 4. Real-time Chat App

Socket.io를 사용하여 클라이언트 간 Real-time Chat app을 구현하여 본다.

## 4.1. Server-side

| Method               | Description
|:---------------------|:-------------------------
| io.emit              | 자신을 포함한 모두에게 송신
| socket.emit          | 자신에게만 송신
| socket.broadcast.emit| 자신을 제외한 모든 클라이언트에게 송신


app.js

```javascript
var app = require('express')();
var server = require('http').createServer(app);
// upgrade http server to socket.io server
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  socket.emit('s2c', 'Wecome to Socket IO Server');

  socket.on('c2s', function(data) {
    socket.broadcast.emit('toclient',data); // 자신을 제외하고 다른 클라이언트에게 보냄
    socket.emit('toclient',data); // 해당 클라이언트에게만 보냄. 다른 클라이언트에 보낼려면?
    console.log('Message from client :'+data.msg);
  });

  console.log('a user connected');

  // Send data
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    // データを送信する
    // io.emit('chat message', msg);
    // 送信元以外に送信する
    socket.broadcast.emit('chat message', msg);
  });

  // Receive data
  socket.on('login message', function (data) {
    var id   = socket.id;
    var name = data;
    var msg  = "Hello " + name;
    // 送信元だけにデータを送信する
    io.to(id).emit('login message', msg);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

server.listen(3000, function () {
  console.log('Socket IO server listening on port 3000');
});
```


Chat app의 Skeleton을 작성한다.

websocket-chat 디렉터리에 아래의 2개 파일을 작성한다.

- index.html : Client-side（Chat UI）

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>websocket-chat</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
  <div class="container">
    <h1>WebSocket-Chat</h1>
    <form class="form-inline">
      <div class="form-group">
        <label for="msgForm">Message: </label>
        <input type="text" class="form-control" id="msgForm">
      </div>
      <button type="submit" class="btn btn-primary">Send</button>
    </form>
    <div id="chatLogs"></div>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  <script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io.connect();
    socket.on("server_to_client", function(data) {
      appendMsg(data.value)
    });

    function appendMsg(text) {
      $("#chatLogs").append("<div>" + text + "</div>");
    }
    $("form").submit(function(e) {
      var message = $("#msgForm").val();
      $("#msgForm").val("");
      socket.emit("client_to_server", { value: message });
      e.preventDefault();
    });
  </script>
</body>
</html>
```



Skeleton의 동작을 확인한다.

```bash
$ node app.js
```



Socket.IOクライアントライブラリの読み込み
クライアントライブラリは、srcに"/socket.io/socket.io.js"を指定したscriptタグを記述するだけで読み込めます。実際にjsファイルを配置する必要はありません。これは、Socket.IOがサーバ起動時に"/socket.io/socket.io.js"ライブラリを自動生成するためです


| 処理概要         | クライアントサイド       | サーバサイド
|:---------------|:--------------------
| Load Module    | <script src="/socket.io/socket.io.js"></script>
| Connect        | io(url:String, opts:Object):Socket	・モジュール読み込み（require）
・HTTPサーバ生成（createServer）
・ソケットのひも付け（listen）
| Send data
| Receive data   
|
データ送信	emit：一斉送信
―	broadcast：自分以外
―	to(id)：自分のみ
データ受信	on：イベント・データ受信
切断時の処理	―	disconnectイベント定義
