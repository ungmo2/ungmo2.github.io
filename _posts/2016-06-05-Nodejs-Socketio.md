---
layout: post
title: Node.js(express)와 Socket.io
categories: node.js
---

![socket.io logo](/img/socketio-logo.png)
{: style="max-width:600px; margin: 10px auto;"}

HTTP는 무상태 프로토콜(stateless protocol)으로 어떠한 이전 요청과도 무관한 각각의 요청을 독립적인 트랜잭션으로 취급하는 통신 프로토콜이다. 이러한 HTTP의 한계에서 벗어나 실시간 양방향 웹 애플리케이션을 작성 가능한 HTML5 표준 기술인 WebSocket과 Node.js에서 손쉽게 실시간 양방향 웹 애플리케이션을 작성할 수 있는 Socket.io를 간단한 채팅 애플리케이션 작성을 통해 알아본다.

* TOC
{:toc}

# 1. WebSocket

[WebSocket](https://www.websocket.org/aboutwebsocket.html)은 브라우저(클라이언트)와 서버 간의 특별한 통신 채널을 구성하는 HTML5 프로토콜이다.

HTTP는 클라이언트에 의해 초기화되기 때문에 서버가 변경사항을 클라이언트에게 알릴 수 있는 방법이 없지만  WebSocket의 연결은 HTTP 통신과는 다르게 클라언트가 특정 주기를 가지고 Polling하지 않아도 변경된 사항을 시기 적절하게 전달할 수 있는 지속적이고 완전한 양방향 연결 스트림을 만들어 주는 기술이다.

![websocket-polling](/img/websocket-polling.gif)
{: style="max-width:500px; margin: 10px auto;"}

WebSocket과 Polling 방식 비교 ([www.websocket.org](https://www.websocket.org/quantum.html))
{: style="color:gray; font-size: 80%; text-align: center; margin-top: 5px;"}

이러한 특성으로 인해 WebSocket은 서버의 데이터를 클라이언트에 즉시 전달할 수 있는 실시간 애플리케이션 작성에 매우 효과적인 프로토콜이다.
