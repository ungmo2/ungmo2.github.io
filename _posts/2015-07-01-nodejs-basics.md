---
layout: post
title: Node.js - <strong>Basics</strong>
subtitle: 네트워크 애플리케이션을 위한 JavaScript runtime
categories: nodejs
section: nodejs
---

* TOC
{:toc}

![node-logo](/img/node-logo.png)

Node.js는 [Chrome V8 JavaScript 엔진](https://developers.google.com/v8/)으로 빌드된 JavaScript 런타임으로 주로 서버 사이드 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다.

언어로는 자바스크립트를 사용하며 Non-blocking I/O와 단일 스레드 이벤트 루프를 통한 높은 Request 처리 성능을 가지고 있다.

데이터베이스로부터 대량의 데이터를 취득하여 웹페이지에 표시하는 처리의 경우, 일반적으로 데이터베이스 처리에 대기시간(blocking)이 발생하기 때문에 웹페이지 표시가 지연되는 현상이 발생한다.

Non-blocking I/O는 비동기 처리를 실시하므로 데이터베이스 처리와 웹페이지 표시를 별도 진행하여 스트레스없이 웹페이지 표시가 기능하다.

Node.js에는 [Socket.io](./nodejs-socketio.html)라는 실시간 통신을 실현하는 라이브러리를 사용할 수 있어서 대량의 데이터 처리와 실시간 통신을 구현할 수 기능을 모두 갖추고 있다.

# Install

[http://nodejs.org/](https://nodejs.org/)로 이동하여 installer를 다운로드한다. installer를 실행하면 다음의 디렉터리에 Node.js가 설치된다.

- Windows : C:\Program Files (x86)\nodejs\node.exe

- Mac : /usr/local/bin/node

Node.js의 버전을 출력하여 제대로 설치되었는지 확인한다.

```bash
$ node -v
v6.4.0
```

# module

브라우저 상에서 동작하는 JavaScript는 script tag로 로드하며 복수의 JavaScript 파일을 로드할 경우 하나의 파일로 merge되며 동일한 유효범위를 갖게 된다.

Node.js는 module 단위로 각 기능을 분할할 수 있다.

module은 파일과 1대1의 대응 관계를 가지며 하나의 모듈은 독자적인 유효범위를 가지게 된다. 그리고 `module.exports` 또는 `exports` 객체를 통해 외부로 공개된다.

함수를 가지는 foo 모듈을 생성한다.

```javascript
// foo.js
module.exports = function(a, b) {
  return a + b;
};
```

모듈의 로딩은 `require` 함수를 사용한다. 이 함수는 로딩한 모듈의 exports 객체를 반환한다.

위에서 정의한 foo 모듈을 로딩한다.

```javascript
// main.js
var add = require('./foo.js'); // 확장자를 생략할 수 있다 require('./foo')

var result = add(1, 2);
console.log(result); // => 3
```

node 명령어를 사용하여 app.js를 실행하여 3이 출력되는 것을 확인한다.

```bash
$ node main.js
```

# HTTP Server

이번에는 간단한 HTTP Server를 작성해 보자.

```javascript
// app.js
var http = require('http');

http.createServer(function (request, response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World\n');
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
```

http 모듈을 로딩하여 변수 http에 할당하였다. 이후 http 모듈의 createServer 메서드에 HTTP request를 처리하여 response를 반환하는 HTTP 서버 애플리케이션으로서의 처리를 정의한 함수를 전달한다.

createServer 메서드는 HTTP 서버 객체를 반환한다. 반환된 HTTP 서버 객체의 listen 메서드에 포트번호 3000를 전달하여 서버를 기동시킨다.

위 코드를 실행시키고 브라우저로 http://localhost:3000/에 접속하면 Hello World가 출력되는 것을 확인할 수 있다.

```bash
$ node app.js
```

# Reference

* [Node.js](https://nodejs.org/)
