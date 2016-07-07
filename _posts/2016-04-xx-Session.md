---
layout: post
title: Session - Express.js
categories: node.js
---

# HTTP Stateless Protocol

http 프로토콜은 상태(state)를 유지하지 않는다. 이를 [stateless protocol](https://ko.wikipedia.org/wiki/%EB%AC%B4%EC%83%81%ED%83%9C_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)이라 한다.

HTTP 프로토콜은 요청(request)를 전송하고 응답(response)를 전송받은 시점에서 통신이 종료되며 어떠한 상태 정보도 남지 않는다. 즉 특정 클라이언트에서 동일 서버에 반복하여 접속하여도 각각의 접속은 독립적인 트랜재션으로 취급된다.

따라서 로그인 화면에서 아이디, 패스워드를 입력하여 사용자 인증 과정을 거친 이후에 재차 웹사이트에 접근하면 로그인 상태임을 인식(유지)할 수 없으므로 매번 사용자 인증 과정을 반복해야 하는 문제가 발생한다.

# Session & Cookie

http 프로토콜의 상태 비유지(stateless) 문제를 보완하여 클라이언트와 서버 간의 논리적 연결을 위한 방법에는 Session과 Cookie가 있다.

**Cookie**

쿠키는 웹서버가 브라우저를 통해 클라이언트에 일시적으로 데이터를 저장하는 방식을 의미한다.

웹서버에 접속한 클라이언트의 정보를 쿠키에 기입한 후 클라이언트에 저장하면 이후 웹서버에 전송되는 요청에 쿠키내의 정보가 같이 전송되는 방식이다.  

이전 접속한 URL과 다른 URL에서는 쿠키를 사용할 수 없다. 예를 들어 www.google.com의 쿠키는 www.naver.com에서 사용할 수 없다.

쿠키는 클라이언트(브라우저)에 저장된 작은 조각(max 4kb)의 텍스트 파일로서 세션에 비해 보안에 취약하다. 따라서 아이디와 비밀번호를 쿠키에 저장하는 방식은 피해야 한다.

**Session**

세션의 사전적 의미는 "개회 중임, 개정 중임"으로 웹서버에 접속되어 있는 상태를 의미한다. 즉 브라우저를 통해 서버에 접속한뒤 접속을 종료하는 시점까지를 세션이라고 한다.

세션은 최초 접속 시점에 생성되어 일정 기간 유지되며 접속이 종료되면(브라우저 종료) 삭제된다.

쿠키와 달리 세션은 서버에 저장된다. 따라서 클라이언트에 저장되는 쿠키보다 안전하다 할 수 있다.

**Cookie-Based Session**

쿠키에 보안에 관련된 정보를 저장하는 것은 바람직하지 않다. 쿠키에는 Session ID만을 저장하고 전송된 Session ID를 사용하여 Session에 저장된 정보를 사용하는 방법이다.

![cookie_session](/img/session.png)

Express.js의 session 미들웨어와 cookieParser 미들웨어를 사용하여 간단한 예제를 작성하도록 한다.

아래와 같이 package.json을 생성하여 프로젝트 루트에 위치시킨다.

```
{
  "name": "cookie-based-session-example",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "supervisor node server.js"
  },
  "dependencies": {
    "cookie-parser": "^1.4.3",
    "ejs": "^2.4.2",
    "express": "^4.13.4",
    "express-session": "^1.13.0",
    "util": "^0.10.3"
  }
}
```

package를 install한다.

```
cd <project-root>
npm install
```

아래와 같이 server.js를 생성하여 프로젝트 루트에 위치시킨다.

```javascript
var express      = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

서버를 기동한다.

```
npm start
```
