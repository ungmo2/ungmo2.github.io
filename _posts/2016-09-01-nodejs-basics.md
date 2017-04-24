---
layout: post
title: Node.js - <strong>Basics</strong>
subtitle: 네트워크 어플리케이션을 위한 JavaScript runtime
categories: nodejs
section: nodejs
description: Node.js는 Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임으로 주로 서버 사이드 어플리케이션 개발에 사용되는 소프트웨어 플랫폼이다.
---

* TOC
{:toc}

![node-logo](/img/node-logo.png)

# 1. Introduction

Node.js는 [Chrome V8 JavaScript 엔진](https://developers.google.com/v8/)으로 빌드된 JavaScript [런타임 환경(Runtime Environment)](https://ko.wikipedia.org/wiki/%EB%9F%B0%ED%83%80%EC%9E%84)으로 주로 서버 사이드 어플리케이션 개발에 사용되는 소프트웨어 플랫폼이다.

Node.js는 브라우저 외부에서 JavaScript 어플리케이션 개발에 사용되며 이에 필요한 모듈, 파일 시스템, HTTP 등 Built-in API가 제공한다.

2009년 발표된 Node.js는 폭발적인 관심을 받아왔고 Node.js를 사용하는 기업수도 대폭 증가했다. 이후 엔터프라이즈 영역에서 기존 Java나 .NET을 Node.js로 대체하려는 검토가 활발히 진행될 것으로 예상된다.

언어로는 자바스크립트를 사용한다. Front-end와 Back-end에서 자바스크립트를 사용할 수 있다는 동형성(isomorphic)은 별도의 언어 학습 시간을 단축시켜 주는 장점을 갖는다.

![Isomorphic-JavaScript](./img/Isomorphic-JavaScript.png)
{: .w-450}

Isomorphic JavaScript
{: .desc-img}

Node.js는 Non-blocking I/O와 단일 스레드 이벤트 루프를 통한 높은 Request 처리 성능을 가지고 있다.

데이터베이스로부터 대량의 데이터를 취득하여 웹페이지에 표시하는 처리의 경우, 일반적으로 데이터베이스 처리에 대기시간(blocking)이 발생하기 때문에 웹페이지 표시가 지연되는 현상이 발생한다.

Non-blocking I/O는 비동기 처리를 실시하므로 데이터베이스 처리와 웹페이지 표시를 별도 진행하여 스트레스없이 웹페이지 표시가 기능하다.

Node.js에는 [Socket.io](./nodejs-socketio)라는 실시간 통신을 실현하는 라이브러리를 사용할 수 있어서 대량의 데이터 처리와 실시간 통신을 구현할 수 기능을 모두 갖추고 있다.

# 2. Install

[http://nodejs.org/](https://nodejs.org/)로 이동한다.

![node-homepage](./img/node-homepage.png)

2017년 1월 20일 현재 최신 버전은 6.9.4이다
{: .desc-img}

LTS(Long Term Supported) 버전은 장기적으로 안정된 지원이 보장되는 버전이다.

![lts-schedule](./img/lts-schedule.png)

LTS Release Schedule ([https://github.com/nodejs/LTS](https://github.com/nodejs/LTS))
{: .desc-img}

Current 버전은 변경이 발생하고 있는 버전으로 안정적이지 않을 수 있다. 따라서 최신의 LTS 버전을 다운로드하도록 한다.

녹색의 "v6.9.4 LTS Recommended For Most Users" 버튼을 클릭하면 사용자의 OS에 가장 적합한 installer를 다운로드 할 수 있다. "other Downloads"를 클릭하면 다음 화면으로 이동한다.

![node-download](./img/node-download.png)

사용자의 OS에 적합한 installer 또는 소스코드를 선택한다.
{: .desc-img}

사용자의 OS에 적합한 installer 또는 소스코드를 선택하여 설치한다. 이때 `npm`도 동시에 설치된다.

설치가 완료되면 다음의 디렉터리에 Node.js가 설치된다. (버전에 따라 설치 경로는 바뀔 수 있다)

- Windows : C:\Program Files\nodejs\node.exe

- Mac : /usr/local/bin/node

Node.js와 npm의 버전을 출력하여 제대로 설치되었는지 확인한다.

```bash
$ node -v
v6.9.4
$ npm -v
3.10.10
```

npm은 Node.js에 포함되어 있어 Node.js 설치시 자동 설치되므로 별도의 설치가 필요없다. 하지만 Node.js보다 자주 업데이트되므로 최신 버전이 아닐 수 있다. 최신의 npm 버전으로 업데이트하도록 한다.

```bash
$ npm install npm@latest -g
$ npm -v
4.1.1
```

# 3. REPL

REPL(Read Eval Print Loop: 입력 수행 출력 반복)은 Node.js는 물론 대부분의 언어(Java, Python 등)이 제공하는 가상환경으로 간단한 코드를 직접 실행해 결과를 확인해 볼 수 있다. 터미널(윈도우의 경우 커맨드창)에 다음과 명령어를 실행시켜 보자.

```bash
$ node
```  

프롬프트가 >로 변경되면 Node.js 코드를 실행시켜 볼 수 있다.

```bash
> 1 * 0
0
> x = 10
10
> console.log('Hello World')
Hello World
undefined
```

Node.js 파일을 실행하려면 node 명령어 뒤에 파일명을 입력한다.

```bash
$ node index.js
```  

CTRL + C 키를 두번 실행하면 REPL을 종료시킨다.

자세한 내용은 [Node.js Documentation : REPL](https://nodejs.org/dist/latest-v6.x/docs/api/repl.html)을 참조하기 바란다.

<!-- # module

브라우저 상에서 동작하는 JavaScript는 script tag로 로드하며 복수의 JavaScript 파일을 로드할 경우 하나의 파일로 merge되며 동일한 유효범위를 갖게 된다.

Node.js는 module 단위로 각 기능을 분할할 수 있다.

module은 파일과 1대1의 대응 관계를 가지며 하나의 모듈은 독자적인 유효범위를 가지게 된다. 그리고 `module.exports` 또는 `exports` 객체를 통해 외부로 공개된다.

함수를 가지는 모듈 foo를 생성해보자.

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

node 명령어를 사용하여 main.js를 실행하면 3이 출력되는 것을 확인할 수 있다.

```bash
$ node main.js
``` -->

# 4. Node.js 맛보기 : HTTP Server

이번에는 간단한 HTTP Server를 작성해 보자. Node.js는 http 서버 모듈을 내장하고 있어서 아피치와 같은 별도의 웹서버를 설치할 필요가 없다

```javascript
// app.js
var http = require('http'); // 1

http.createServer(function (request, response) { // 2
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World\n');
}).listen(3000); // 3

console.log('Server running at http://127.0.0.1:3000/');
```

1. http 모듈을 로딩하여 변수 http에 할당하였다.

2. http 모듈의 `createServer([requestListener])` 메서드를 사용하여 HTTP 서버 객체를 생성한다. HTTP 서버 객체는 [EventEmitter](https://nodejs.org/dist/latest-v6.x/docs/api/events.html#events_class_eventemitter) 클래스를 상속한 것으로 request 이벤트가 발생하면 HTTP request를 처리하여 response를 반환하는 request Listener 함수를 호출한다. 이 request Listener 함수는 request와 response 객체를 전달받으며 HTTP request 이벤트가 발생할 때마다 한번씩 호출된다.

3. createServer 메서드가 반환한 HTTP 서버 객체의 listen 메서드에 포트번호 3000를 전달하여 서버를 기동시킨다.

위 코드를 실행시키고 브라우저로 http://localhost:3000/ 에 접속하면 Hello World가 출력되는 것을 확인할 수 있다.

```bash
$ node app.js
```

# Reference

* [Node.js](https://nodejs.org/)

* [Node.js Documentation : REPL](https://nodejs.org/dist/latest-v6.x/docs/api/repl.html)
