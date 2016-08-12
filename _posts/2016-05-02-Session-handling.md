---
layout: post
title: Session handling
categories: express
tags: []
---

* TOC
{:toc}

Web application은 로그인 인증 등의 용도로 Session을 사용한다. Express는 메모리 상(MemoryStore)에 Session data를 저장할 수 있다.

개발을 위한 MemoryStore의 사용은 문제될 것이 없지만 production 환경에서 MemoryStore의 사용은 적절하지 않으며 복수 서버 상에서의 Session data 공유도 MemoryStore에서는 불가능하다.

따라서 production 환경에서는 [Redis](http://www.redis.io/), [MongoDB](https://www.mongodb.com/)를 사용하여 영속적 Session data 관리하는 것이 일반적이다.


# 1. HTTP Stateless Protocol

http 프로토콜은 상태(state)를 유지하지 않는다. 이를 [stateless protocol](https://ko.wikipedia.org/wiki/%EB%AC%B4%EC%83%81%ED%83%9C_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)이라 한다.

HTTP 프로토콜은 요청(request)를 전송하고 응답(response)를 전송받은 시점에서 통신이 종료되며 어떠한 상태 정보도 남지 않는다. 즉 특정 클라이언트에서 동일 서버에 반복하여 접속하여도 각각의 접속은 독립적인 트랜재션으로 취급된다.

따라서 로그인 화면에서 아이디, 패스워드를 입력하여 사용자 인증 과정을 거친 이후에 재차 웹사이트에 접근하면 로그인 상태임을 인식(유지)할 수 없으므로 매번 사용자 인증 과정을 반복해야 하는 문제가 발생한다.

# 2. Session & Cookie

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


# 3. MemoryStore를 사용한 세션 관리

Express 4.x에서는 express-session 모듈이 express에서 분리되었으므로 npm install이 필요하다.

```
$ npm install express-session -save
```

app.js을 작성한다.

```javascript
var express = require('express');
var session = require('express-session');

var app = express();

// session 설정
app.use(session({
  secret : 'Rs89I67YEA55cLMgi0t6oyr8568e6KtD',
  resave: false,
  saveUninitialized: true
}));

// routing 설정
app.get('/memory-store-counter', function(req, res) {
  var session = req.session;
  if (session && session.count) {
    session.count++;
  } else {
    session.count = 1;
  }
  res.send('count is ' + session.count);
});

app.get('/session-destroy', function (req, res) {
  req.session.destroy();
  res.send('Session Destroyed!');
});

app.listen(3000, function() {
  console.log('Express server listening on port ' + 3000);
});
```

session secret는 쿠키에 저장될 Session ID 서명에 사용된다. session secret는 랜덤한 일정 길이 이상의 문자열을 사용하는 것이 좋다.

# 4. Redis를 사용한 세션 관리


# Reference

* [Express Guide](http://expressjs.com/en/guide/routing.html)
