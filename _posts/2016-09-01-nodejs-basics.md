---
layout: post
title: Node.js <strong>Basics</strong>
subtitle: 네트워크 애플리케이션을 위한 자바스크립트 런타임 환경
categories: nodejs
section: nodejs
description: Node.js는 Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임으로 주로 서버 사이드 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다. Node.js는 브라우저 외부 환경에서 자바스크립트 애플리케이션 개발에 사용되며 이에 필요한 모듈, 파일 시스템, HTTP 등 Built-in API가 제공한다. 2009년 Ryan Dahl이 발표된 Node.js는 폭발적인 관심을 받아왔고 Node.js를 사용하는 기업수도 대폭 증가했다. 이후 엔터프라이즈 영역에서 기존 Java나 .NET을 Node.js로 대체하려는 검토가 활발히 진행될 것으로 예상된다. 현재 Node.js를 사용하는 기업은 Microsoft, Paypal, eBay, Yahoo, GoDaddy 등이 있다.
---

* TOC
{:toc}

![node-logo](/img/node-logo.png)

# 1. Introduction

[Node.js](https://nodejs.org)는 [Chrome V8 자바스크립트 엔진](https://developers.google.com/v8/)으로 빌드된 자바스크립트 [런타임 환경(Runtime Environment)](https://ko.wikipedia.org/wiki/%EB%9F%B0%ED%83%80%EC%9E%84)으로 주로 서버 사이드 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다. Node.js는 브라우저 외부 환경에서 자바스크립트 애플리케이션 개발에 사용되며 이에 필요한 모듈, 파일 시스템, HTTP 등 Built-in API를 제공한다.

2009년 [라이언 달(Ryan Dahl)](https://en.wikipedia.org/wiki/Ryan_Dahl)이 발표한 Node.js는 폭발적인 관심을 받아왔고 Node.js를 사용하는 기업수도 대폭 증가했다. 앞으로 엔터프라이즈 영역에서 기존 Java나 .NET을 Node.js로 대체하려는 검토가 활발히 진행될 것으로 예상된다. 현재 Node.js를 사용하는 기업은 Microsoft, Paypal, eBay, Yahoo, GoDaddy 등이 있다.

Node.js는 자바스크립트를 사용해 개발한다. Front-end와 Back-end에서 자바스크립트를 사용할 수 있다는 동형성(isomorphic)은 별도의 언어 학습 시간을 단축해 주는 장점이 있다.

![Isomorphic-JavaScript](./img/Isomorphic-JavaScript.png)
{: .w-450}

Isomorphic JavaScript
{: .desc-img}

Node.js는 **Non-blocking I/O와 단일 스레드 이벤트 루프**를 통한 높은 Request 처리 성능을 가지고 있다.

데이터베이스로부터 대량의 데이터를 취득하여 웹페이지에 표시할 때, 일반적으로 데이터베이스 처리에 대기시간(blocking)이 발생하기 때문에 웹페이지 표시가 지연되는 현상이 발생한다. Node.js의 모든 API는 비동기 방식으로 동작하여 Non-blocking I/O가 가능하고 단일 스레드 이벤트 루프 모델을 사용하여 보다 가벼운 환경에서도 높은 Request 처리 성능을 가지고 있다.

Node.js는 데이터를 실시간 처리하여 빈번한 I/O가 발생하는 SPA(Single Page Application)에 적합하다. 하지만 CPU 사용률이 높은 애플리케이션에는 권장하지 않는다.

Node.js에는 [Socket.io](./nodejs-socketio)라는 실시간 통신을 실현하는 라이브러리를 사용할 수 있어서 대량의 데이터 처리와 실시간 통신을 구현할 수 기능을 모두 갖추고 있다.

# 2. Install

Node.js를 인스톨하기 위해 [Node.js의 공식 홈페이지(http://nodejs.org)](https://nodejs.org/)에 접속한다.

![node-homepage](./img/node-homepage.png)

Node.js의 공식 홈페이지
{: .desc-img}

Node.js 홈페이지에 접속하면 두 개의 다운로드 버튼이 보이는데 왼쪽은 LTS 버전을, 오른쪽은 Current 버전을 다운로드할 수 있다. LTS(Long Term Supported) 버전은 장기적으로 안정된 지원이 보장되는 버전이고, Current 버전은 변경이 발생하고 있는 버전으로 안정적이지 않을 수 있다. 따라서 최신의 LTS 버전을 다운로드하도록 한다.

<!-- LTS(Long Term Supported) 버전은 장기적으로 안정된 지원이 보장되는 버전이다.

![lts-schedule](./img/lts-schedule.png)

[LTS Release Schedule](https://github.com/nodejs/Release#release-schedule)
{: .desc-img} -->

Current 버전은 변경이 발생하고 있는 버전으로 안정적이지 않을 수 있다. 따라서 최신의 LTS 버전을 다운로드하도록 한다. "8.11.1 LTS Recommended For Most Users" 버튼을 클릭하면 사용자 OS에 적합한 설치 파일을 다운로드하여 설치할 수 있다. 이때 `npm`도 동시에 설치된다.

설치가 완료되면 다음의 디렉터리에 Node.js가 설치된다. 버전에 따라 설치 장소는 바뀔 수 있다.

- Windows : C:\Program Files\nodejs\node.exe

- Mac : /usr/local/bin/node

설치가 완료되었다면 터미널(윈도우에서는 명령 프롬프트)에서 Node.js와 npm의 버전을 출력하여 정상적으로 설치되었는지 확인한다.

```bash
$ node -v
v8.11.1
$ npm -v
5.6.0
```

# 3. Update

## 3.1 Node.js

설치된 Node.js를 업데이트하기 위해 Node.js 버전 매니저인 [n](https://www.npmjs.com/package/n)을 설치한다.

```bash
$ npm install -g n
/usr/local/bin/n -> /usr/local/lib/node_modules/n/bin/n
+ n@2.1.8
```

관리자 권한이 필요할 수 있으므로 permission 에러가 발생하는 경우, `sudo`를 명령어 선두에 추가한다.
{: .info}

캐시를 강제 삭제한다.

```bash
$ npm cache clean -f
npm WARN using --force I sure hope you know what you are doing.
```

버전을 지정하거나 lts/stable/latest를 지정하여 Node.js를 설치한다.

```bash
$ n 8.0.0   # 버전 지정 설치
$ n lts     # 최신 LTS 버전 설치
$ n stable  # stable 버전 설치
$ n latest  # 최신 currunt 버전 설치
```

stable 버전을 설치하도록 하자.

```bash
$ node -v
v8.11.1
$ n latest # sudo n latest

     install : node-v10.0.0
       mkdir : /usr/local/n/versions/node/10.0.0
       fetch : https://nodejs.org/dist/v10.0.0/node-v10.0.0-darwin-x64.tar.gz
######################################################################## 100.0%
   installed : v10.0.0
$ n
 ο node/10.0.0
   node/8.11.1
$ node -v
v10.0.0
```

설치에 실패하였거나 버전이 변경되지 않는 경우, 해당 폴더(위의 경우, /usr/local/n/versions/node/10.0.0)를 삭제하고 재설치한다.
{: .info}

특정 버전을 삭제하고 싶은 경우, 아래와 같이 명령어를 실행한다.

```bash
$ n rm 8.0.0  # 버전 지정 삭제
$ n - 8.0.0   # rm 대신 -를 사용할 수 있다
$ n prune     # 현재 사용중인 버전을 제외한 나머지를 일괄 삭제
```

## 3.2 npm

npm은 Node.js에 포함되어 있어 Node.js 설치시 자동 설치되므로 별도의 설치가 필요없다. 하지만 Node.js보다 자주 업데이트되므로 최신 버전이 아닐 수 있다. 최신 버전으로 npm을 업데이트하도록 한다.

```bash
$ npm install -g npm@latest
$ npm -v
6.0.0
```

관리자 권한이 필요할 수 있으므로 permission 에러가 발생하는 경우, `sudo`를 명령어 선두에 추가한다.
{: .info}

# 4. REPL

REPL(Read Eval Print Loop: 입력 수행 출력 반복)은 Node.js는 물론 대부분의 언어(Java, Python 등)가 제공하는 가상환경으로 간단한 코드를 직접 실행해 결과를 확인해 볼 수 있다. 터미널(윈도우에서는 명령 프롬프트)에 다음과 같은 명령어를 실행해 보자.

```bash
$ node
```

프롬프트가 >로 변경되면 Node.js 코드를 실행해 볼 수 있다.

```bash
> 1 * 0
0
> x = 10
10
> console.log('Hello World')
Hello World
undefined
```

Node.js 파일을 실행하려면 node 명령어 뒤에 파일명을 입력한다. 파일 확장자 .js는 생략할 수 있다.

```bash
$ node index.js
```

CTRL + C 키를 두번 실행하면 REPL을 종료시킨다. Node.js REPL에 관한 더 자세한 내용은 [Node.js Documentation : REPL](https://nodejs.org/dist/latest-v6.x/docs/api/repl.html)을 참조하기 바란다.

# 5. Node.js 맛보기 : HTTP Server

Node.js를 사용하여 간단한 HTTP 서버를 작성해 보자. Node.js는 http 서버 모듈을 내장하고 있어서 아파치와 같은 별도의 웹서버를 설치할 필요가 없다. 아래와 같은 내용으로 app.js 파일을 생성한다.

```javascript
// app.js
const http = require('http'); // 1

http.createServer((request, response) => { // 2
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World');
}).listen(3000); // 3

console.log('Server running at http://127.0.0.1:3000/');
```

1. http 모듈을 로딩하여 변수 http에 할당하였다. Node.js는 module 단위로 각 기능을 분할할 수 있다. module은 파일과 1대1 대응 관계를 가지며 하나의 모듈은 자신만의 독립적인 실행 영역(Scope)을 가지게 된다. 따라서 클라이언트 사이드 자바스크립트와는 달리 전역 변수의 중복 문제가 발생하지 않는다. 모듈은 module.exports 또는 exports 객체를 통해 정의하고 외부로 공개한다. 그리고 공개된 모듈은 require 함수를 사용하여 임포트한다.

2. http 모듈의 `createServer([requestListener])` 메소드를 사용하여 HTTP 서버 객체를 생성한다. HTTP 서버 객체는 [EventEmitter](https://nodejs.org/dist/latest-v8.x/docs/api/events.html#events_class_eventemitter) 클래스를 상속한 것으로 request 이벤트가 발생하면 HTTP request를 처리하여 response를 반환하는 request Listener 함수를 호출한다. 이 request Listener 함수는 request와 response 객체를 전달받으며 HTTP request 이벤트가 발생할 때마다 한번씩 호출된다.

3. createServer 메소드가 반환한 HTTP 서버 객체의 listen 메소드에 포트번호 3000을 전달하여 서버를 실행한다.

app.js 파일을 만들었으면 터미널을 열고 해당 파일이 있는 경로에서 다음 명령으로 서버를 실행한다.

```bash
$ node app.js
```

위 명령을 실행하고 브라우저에서 "http://localhost:3000" 에 접속하면 "Hello World"가 출력되는 것을 확인할 수 있다.


# Reference

* [Node.js](https://nodejs.org/)

* [Node.js Documentation : REPL](https://nodejs.org/dist/latest-v6.x/docs/api/repl.html)
