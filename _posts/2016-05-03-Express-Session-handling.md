---
layout: post
title: Express Session Handling
categories: express
tags: []
---

Web application은 로그인 인증 등의 용도로 Session을 사용한다. Express는 메모리 상(MemoryStore)에 Session data를 저장할 수 있다.

개발을 위한 MemoryStore의 사용은 문제될 것이 없지만 production 환경에서 MemoryStore의 사용은 적절하지 않으며 복수 서버 상에서의 Session data 공유도 MemoryStore에서는 불가능하다.

따라서 production 환경에서는 [Redis](http://www.redis.io/), [MongoDB](https://www.mongodb.com/)를 사용하여 영속적 Session data 관리하는 것이 일반적이다.

* TOC
{:toc}

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

세션 데이터는 쿠키에 저장되지 않고 server-side에 저장된다. 쿠키에는 session ID만이 저장된다.

개발을 위한 MemoryStore, server-side session storage의 사용은 문제될 것이 없지만 production 환경에서 MemoryStore의 사용은 적절하지 않으며 복수 서버 상에서의 Session data 공유도 MemoryStore에서는 불가능하다.

Express 4.x에서는 express-session middleware가 express에서 분리되었으므로 별도의 npm install이 필요하다.

express-session 1.5.0 이후 버전부터는 cookie-parser middleware가 필요하지 않다.

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

Redis는 [in-memory](https://ko.wikipedia.org/wiki/%EC%9D%B8%EB%A9%94%EB%AA%A8%EB%A6%AC_%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4) data structure store로 key-value의 형태로 data를 저장한다.

Express의 경우, [connect-redis](https://github.com/tj/connect-redis) 모듈을 사용하여 Redis를 사용한 세션 관리가 가능하다.

Redis를 사용하여 세션을 관리하면 application process가 종료되어도 세션 정보를 보존할 수 있고 복수 서버 환경에서도 세션 정보 공유가 가능하게 된다.

## 4.1 Windows

Redis는 공식적으로 Windows를 지원하지 않는다. 하지만 [Microsoft Open Tech 그룹](https://msopentech.com/opentech-projects/redis/)에서 64bit 포팅판을 제공하고 있다.

[Windows Radis Download](https://github.com/MSOpenTech/redis)에서 msi 파일을 다운로드하여 설치한다.

설치가 완료되면 Redis 서버가 서비스로 등록되어 실행되고 있는 것을 확인한다.

![windows-radis-service](/img/windows-radis-service.png)
{: style="max-width:550px; margin: 20px auto 10px;"}

Radis 설치 디렉터리에 있는 클라이언트 redis-cli.exe를 실행한다.

![windows-radis-client](/img/windows-radis-client.png)
{: style="max-width:550px; margin: 20px auto 10px;"}


## 4.2 Mac

Mac user의 경우, Homebrew를 사용하여 install할 수 있다.

```
$ brew update && brew install redis
```

Radis server를 기동한다.

```
$ redis-server

6612:C 12 Aug 16:50:58.467 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
6612:M 12 Aug 16:50:58.470 * Increased maximum number of open files to 10032 (it was originally set to 256).
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 3.2.3 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 6612
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

6612:M 12 Aug 16:50:58.499 # Server started, Redis version 3.2.3
6612:M 12 Aug 16:50:58.499 * The server is now ready to accept connections on port 6379
```

connect-redis 모듈을 인스톨한다.

```
$ npm install connect-redis --save
```

app.js을 작성한다.

```javascript
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();

// session 설정
app.use(session({
  store: new RedisStore({}),
  secret : 'Rs89I67YEA55cLMgi0t6oyr8568e6KtD',
  resave: false,
  saveUninitialized: true
}));

// routing 설정
app.get('/radis-store-counter', function(req, res) {
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

application을 재기동하여도 이전 카운트가 보존됨을 확인할 수 있다.
