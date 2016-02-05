---
layout: post
title: Node.js file upload example
categories: node.js
---

Node.js는 Server-side Javascript이다. 즉 백엔드에서 자바스크립트를 실행할 수 있게 한다. 또한 유용한 모듈을 내부에 탑재하고 있고 필요에 따라 `npm` 등을 사용하여 외부에서 필요한 모듈을 import하여 사용할 수 있어 높은 생산성과 스피디한 개발을 가능케 해준다. 따라서 Node.js는 Server-side Javascript와 모듈(라이브러리)로 구성되어 있고 말할 수 있다.

file upload 예제를 통해서 Node.js의 기본과 Routing, 모듈화, Request Handling 등을 알아보자.

# *Install*

아래의 페이지에 방문하여 자신의 개발환경에 맞는 설치파일을 다운로드하여 설치한다.

[https://nodejs.org/en/download](https://nodejs.org/en/download/)

# *Hello World*

설치가 완료되었으면 아래의 예제를 실시하여 동작을 확인해 보자.

```javascript
// helloworld.js
console.log("Hello World");
```
```bash
$ node helloworld.js
```

# *Use cases*

앞으로 구현해볼 예제의 use case는 아래와 같다.

* 사용자는 웹 브라우저로 이 웹 애플리케이션을 이용할 수 있다.
* 사용자가 http://domain/start 를 요청하면 파일 업로드 폼이 들어있는 웰컴 페이지를 볼 수 있어야 한다.
* 업로드할 이미지 파일을 선택해서 폼으로 전송하면, 해당 이미지는 http://domain/upload 로 업로드 되어야 하며, 업로드가 끝나면 해당 페이지에 표시된다.

# *Appication Stack*

use case를 만족시키기 위해 구현되어야 할 기술적 사항은 아래와 같다.

* 웹페이지를 제공해야 한다. 따라서 HTTP 서버가 필요하다.
* 서버는 어떤 URL 요청(request)을 받았는지에 따라 다르게 응답해야 한다. 따라서, 요청과 요청을 처리할 핸들러들을 연결짓기 위한 라우터(router) 같은 것이 필요하다.
* 서버로 도착한 요청들, 그리고 라우터를 이용해서 라우팅된 요청들을 만족시키기 위해서 실제적인 요청 핸들러(request handlers)가 필요하다.
* 라우터는 들어오는 어떠한 POST 데이터들도 다룰 수 있어야 한다. 그리고 해당 데이터를 다루기 편한 형태로 만들어 request handler 들에게 넘겨야 한다. 따라서 요청 데이터 핸들링(request data handling)이 필요하다.
* URL에 대한 요청을 다루는 것뿐 아니라 URL이 요청되었을 때 내용을 표시할 필요도 있다. 이 말은 즉, request handler 들이 사용자 브라우저로 콘텐트를 보내기 위해 사용할 수 있는 뷰 로직(view logic)이 필요하다.
* 사용자가 이미지들을 업로드 할 수 있어야 하므로, 세부 사항을 다루는 업로드 핸들링(upload handling)이 필요하다.

# *Building the application stack*
## *Basic HTTP server*

우선 HTTP server와 client를 사용하기 위하여 `http` 모듈을 로드한다.

`http.createServer([requestListener])`는 `http.Server`의 새로운 인스턴스를 반환한다. 반환된 인스턴스의 메서드 `listen`을 호출하여 접속 대기를 시작한다.

다음은 8888 포트를 Listen 하는 HTTP 서버를 시작한 다음 아무일도 안 하는 코드이다. 어떤 요청이 들어오더라도 웹 브라우저는 대기상태에 빠지게 된다.

```javascript
// server.js

// Node.js에 기본 포함되어 있는 http 모듈을 로드한다
var http = require("http");

// http 모듈의 createServer 메서드를 호출
var server = http.createServer();
server.listen(8888);
```
```bash
$ node server.js
```
요청이 발생 했을 때, 서버가 특정 동작을 수행하게 하려면 콜백함수를 지정하여야 한다.
`requestListener`는 `request` event가 발생했을 때 자동 호출될 콜백 함수이다.

```javascript
// server.js

// Node.js에 기본 포함되어 있는 http 모듈을 로드한다
var http = require("http");

// http 모듈의 createServer 메서드를 호출
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
```
```bash
$ node server.js
```

* 요청(request)이 올 때마다 response.writeHead() 함수를 사용해서 HTTP status 200 과 content-type을 응답 헤더로 보내고,
* response.write() 함수로 “Hello World” 텍스트를 HTTP 응답 바디로 보낸다.
* 마지막으로 response.end()로 응답을 마무리한다.

## *Event-driven callbacks*

Node.js는 event-driven, non-blocking I/O model을 지원한다. 자세한 사항은 아래의 포스트를 참조하기 바란다.

* [Understanding node.js](http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb)

Javascript의 함수는 일급 객체이다.

일급 객체(first-class object)란, 생성, 대입, 연산, 인자 또는 반환값으로서의 전달 등, 프로그래밍언어의 기본적 조작을 제한없이 사용할 수 있는 대상을 의미한다.

다음 조건을 만족하면 일급 객체로 간주한다.

> 1. 무명의 리터럴로 표현이 가능하다.
> 2. 변수나 자료 구조(객체, 배열...)에 저장할 수 있다.
> 3. 함수의 파라미터로 전달 할 수 있다.
> 4. 반환값(return value)으로 사용할 수 있다.

```javascript
// 1. 무명의 리터럴로 표현이 가능하다.
// 2. 변수나 데이터 구조안에 담을 수 있다.

var increase = function(num) {
  return num + 1;
};

var decrease = function(num){
  return num - 1;
};

var obj = {
  increase: increase,
  decrease: decrease
};

// 2. 함수의 파라미터로 전달 할 수 있다.
function cal(func, num){
  return func(num);
}

console.log(cal(increase, 1));
console.log(cal(decrease, 1));

// 3. 반환값(return value)으로 사용할 수 있다.
function cal(mode){
  var funcs = {
    'plus' : function(left, right){return left + right},
    'minus' : function(left, right){return left - right}
  }
  return funcs[mode];
}
console.log(cal('plus')(2,1));
console.log(cal('minus')(2,1));
```

Javascript의 함수는 위의 조건을 모두 만족하므로 ***Javascript의 함수는 일급객체이다.***  따라서 Javascript의 함수는 흡사 변수와 같이 사용할 수 있으며 코드의 어디에서든지 정의할 수 있다.  

***함수와 다른 객체를 구분 짖는 특징은 호출할 수 있다는 것이다.***

```javascript
// server.js
var http = require("http");

// callback function
function onRequest(request, response) {
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started.");
```
HTTP 요청(비동기적 이벤트)이 발생하면 callback(onRequest)이 호출된다. 이 때 두 개의 파라미터 `reqeust`와 `response` 가 callback 함수 onRequest에 전달된다. 요청에 대한 처리를 callback에서 처리한다.

한번의 브라우저 요청에 “Request received.” 메시지가 두번 STDOUT으로 찍히는 것은 대부분의 브라우저가 http://localhost:8888/ 을 요청할 때 http://localhost:8888/favicon.ico 를 로드하려 하기 때문이다.

## *모듈화*

```javascript
// server.js
var http = require("http"); // node.js의 내부모듈

function start() {
  function onRequest(request, response) {
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

```javascript
// index.js
var server = require("./server");

server.start();
```

```bash
$ node index.js
```
모듈을 만든다는 것은 모듈을 필요로 하는 스크립트에 제공할 기능의 일부를 export 하는 것이다.

## *Routing*
요청 URL과 GET/POST 파라미터를 router로 전달하면 router는 어떤 코드를 실행할지 결정할 수 있어야 한다.

즉, 전달된 요청 URL과 파라미터에 따라 서버의 할 일이 정해지는데 서버의 할 일을 수행하는 함수를 request handler라 한다.

우선, 요청 URL과 파라미터를 취득할 수 있어야 한다.

```
// url & querystring modules

                        url.parse(string).query
                                        |
          url.parse(string).pathname    |
                        |               |
                        |               |
                      ----- -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
        querystring.parse(string)["foo"]    |
                                            |
                querystring.parse(string)["hello"]
```

우리에게 필요한 모든 정보는 request 객체(callback 함수 onRequest의 첫 번째 파라미터)를 통해 접근할 수 있습니다. 하지만 이 정보를 얻어내기 위해 `url`과 `querystring` 이라는 모듈이 추가로 필요하다.

`url` 모듈은 URL의 각각의 부분 (예를들면 URL path와 query string) 을 뽑아낼 수 있는 메소드를 제공한다.

`querystring`은 query string을 request 파라미터로 파싱 하는데 사용한다. 또한, POST 요청의 body를 파싱하는 데도 사용된다.

### *Get path name & request parameters*
```javascript
var http = require("http");
var url = require("url");

http.createServer(function(request, response){
  var pathname = url.parse(request.url).pathname;
  console.log("Path name is " + pathname);

  var query = url.parse(request.url, true).query;
  console.log("Request parameter is ", query);

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(
    "<h1>Path name is " + pathname + "</h1>" +
    "<h1>Request parameter is " + JSON.stringify(query) + "</h1>");
  response.end();
}).listen(8888);

console.log("Server has started.");
```

```
localhost:8888/user?name=lee

Path name is /user
Request parameter is {"name":"lee"}
```

요청 URL과 파라미터 취득 처리를 어디에 구현해야 하는지 논의가 필요하지만 일단은 HTTP server의 일부로 만들어 본다.

```javascript
var http = require("http");
var url = require("url");

function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

`url`모듈을 사용하여 URL path를 기준으로 요청을 구분할 수 있게 되었다.

이것을 이용하면 URL path를 기반으로 요청을 request handler로 매핑하는 router를 만들 수 있다.

router의 역할은 클라이언트의 요청과 request handler를 매핑하는 것이다.

예를 들어, /start 요청과 /upload 요청에 각각 달리 반응하는 request handler를 매핑할 수 있다. 우선은 URL path를 전달받는 router를 구현한다.

```javascript
// router.js
function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route;
```

## *Dependency injection*
router를 server와 어떻게 엮을지 고려해야 한다.

HTTP server가 router를 사용한다는 것을 알게 해야 한다.  [dependency injection](http://martinfowler.com/articles/injection.html)을 통해 server와 router를 느슨하게 결합한다.

먼저 router 함수를 파라미터로 넘길 수 있도록 server의 start() 함수를 확장한다.

```javascript
// server.js
var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

그리고 index.js를 확장한다. 여기서 router 함수를 server로 주입(inject)한다.

```javascript
// index.js

var server = require("./server");
var router = require("./router");

server.start(router.route);
```
```
$ node index
```
```
http://localhost:8888/foo
```
```
Server has started.
Request for /foo received.
About to route a request for /foo
```
server는 router 객체의 route 메서드를 전달(주입/inject)받아 server는 이 객체의 메서드를 호출할 수 있게 되었다.

## *Request handler*
`server`는 `router`를 주입받아 사용할 수 있게 되었다.
`router`는 `server`로 부터 `pathname`을 전달 받는데 이 `pathname`에 따라 각각의 `Request handler`를 호출하면 요청에 따라 행동하는 서버를 만들 수 있다.

그러면 `Request handler`를 만들어 본다.

```javascript
// requestHandlers.js

function start() {
  console.log("Request handler 'start' was called.");
}

function upload() {
  console.log("Request handler 'upload' was called.");
}

exports.start = start;
exports.upload = upload;
```

`router`에 `Request handler`를 하드코딩할 수도 있으나 이 방법을 사용하면 handler의 수가 늘어날 때 마다 `router`에서 request와 handler를 매핑하는 일을 해야만 한다 (if request == x then call handler y)

`server`와 `router` 이외에 request와 handler의 관계를 알고 있는 무언가를 만들어 `router`에 주입하면 깔끔한 연결이 될 것이다.

request와 handler의 관계를 알고 있는 무언가는 키와 값의 쌍인 Javascript object의 성질과 잘 맞아 떨어진다.


```javascript
// index.js

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
```

```javascript
// server.js

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(handle, pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

```javascript
// router.js

function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
  }
}

exports.route = route;
```

브라우저에 표시된 "Hello World"는 `server.js`의 `onRequest`함수 내에서 처리하고 있다. 사실 이 처리는 `request handler`가 처리하여야 한다.

먼저 떠오르는 아이디어는 `request handler`가 화면에 표시할 컨텐츠를 반환해 주면 컨텐츠를 sever가 `response.write`로 처리하는 것일 것이다.

```javascript
// requestHandlers.js

function start() {
  console.log("Request handler 'start' was called.");
  return "Hello Start";
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;
```
```javascript
// router.js

function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
    return "404 Not found";
  }
}

exports.route = route;
```
```javascript
// server.js

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {"Content-Type": "text/plain"});
    var content = route(handle, pathname)
    response.write(content);
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

http://localhost:8888/start 를 요청하면 “Hello Start”가 출력되고, http://localhost:8888/upload 는 “Hello Upload”가, http://localhost:8888/foo 는 “404 Not found”가 출력된다.

## *Blocking vs Non-Blocking*
위의 코드는 문제없이 잘 동작하는 것처럼 보이지만 치명적 결함을 가지고 있다.
`request handler`에 비동기 방식의 코드를 포함시키면 문제가 발생한다.

<img src='/img/block_nonblock.png'>

기존의 웹 서버는 대부분 쓰레드를 기반으로 하는 동기 방식으로 I/O를 처리를 한다. 반면에 Node.js는 이벤트를 기반으로 하는 비동기 방식으로 I/O를 처리한다.

Node.js의 방식을 ***[이벤트 기반 비동기 방식](http://www.nextree.co.kr/p7292/)*** 이라 한다. 동시작업을 event loop을 실행해서 처리하며 단일 쓰레드이기 때문에 접속 수에 관계없이 메모리 사용량과 같은 시스템 리소스 사용량에 변화가 거의 없어 대규모 네트워크 프로그램을 개발하기 적합한 형태이다. 다만, 단일 쓰레드이기 때문에 서버에 문제가 발생하는 순간 서버는 정지하게 된다.

Node.js가 비동기(Non-Blocking) 방식으로 동작하므로 우리도 blocking 방식을 피하고 non-blocking 방식을 사용해야만 한다.

###동기 방식
```javascript
var fs = require('fs');

var filenames = fs.readdirSync('.');

for (var i = 0; i < filenames.length; i++) {
  console.log(filenames[i]);
}
console.log('ready');

console.log('can process next job...');
```

###비동기 방식
```javascript
var fs = require('fs');

fs.readdir('.', function (err, filenames){
  for (var i = 0; i < filenames.length; i++) {
    console.log(filenames[i]);
  }
  console.log('ready');
});

console.log('can process next job...');
```

이러한 동기방식의 코드를 비동기로 전환하는 첫번째 방법은 동기방식 API에 대응하는 코드를 비동기 API로 교체하는 것이다.

두번째는 동기 방식에서 동기API 호출 이후에 처리하여야 하는(순서가 있는) 로직을 그대로 Callback 함수로 옮기는 것이다.

지금까지의 코드는 `request handler`에 비동기 방식의 코드를 포함시키면 문제가 발생한다고 했다. 정말 그런지 확인해 보자.

```javascript
// requestHandlers.js

var exec = require("child_process").exec;

function start() {
  console.log("Request handler 'start' was called.");
  var content = "empty";

  exec("ls -lah", function (error, stdout, stderr) {
    content = stdout;
  });

  return content;
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;
```

shell 커맨드를 Node.js 안에서 실행하는 `exec`은 non-blocking 방식으로 동작한다.

http://localhost:8888/start 에 접속하면 현재 디렉토리에 있는 모든 파일 리스트를 출력하지 않고 empty가 표시된다.

위의 코드는 동기적으로 동작한다. 즉 `exec`를 호출한 후 결과를 기달리지 않고 바로 `return content;`를 실행한다.

이 시점에 content는 여전히 'empty'이며 화면에 'empty'가 출력된다.

## *Non-blocking 방식 request handler*
지금까지는 handler가 작성한 content를 여러 layer를 거쳐 server에 전달하였다.

```
content의 이동
request handler ⇒ router ⇒ sever   
```

새로운 방법은 `http.createServer`의 callback인 onRequest()에서 취득한 `response` 객체를 `router`를 통해 `request handler`에게 주입(inject)한다. 이제 handler는 이 객체가 가진 함수들을 이용해서 스스로 요청에 응답할 수 있게 되었다.

```
response의 이동
sever ⇒ router ⇒ request handler
```

```javascript
// server.js

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```
```javascript
// router.js

function route(handle, pathname, response) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
```

```javascript
// requestHandlers.js

var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
```

## *Handling POST requests*

Post 요청 처리를 구현하기 위해 http://localhost:8888 에 접속하면 textarea와 submit 버튼을 가진 html을 클라이언트에 전송한다.

submit 버튼을 클릭하여 textarea에 입력한 내용을 Post 요청으로 서버에 전송하면 서버는 이 요청을 받아 내용을 출력하는 처리를 구현한다.

```javascript
// requestHandler.js

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
```
`view`와 `controller` 로직을 한 곳에 구현하는 것은 바람직하지 않다.

>모든 소프트웨어 개발의 핵심은 복잡성을 극복하는 것이다. 프로그램은 작은 프로그램의 조합으로 만들어지는데, 다른 엔지니어링과 달리 이런 조합에 물리적인 제약이 존재하지 않기 때문에 훨씬 쉽게 복잡해지는 경향이 있다. 예를 들어, 초고층 건물이나 우주 비행선은 물리 법칙의 제약 때문에 더 복잡해지기 어렵지만, 소프트웨어는 이런 제약이 없다. <br>소프트웨어 엔지니어링에서 강조하는 원리 중 하나는 관심사의 분리(Separation of Concerns)이다. 여러 가지를 동시에 고려해야 한다면 매우 복잡해지기 때문에 성질이 다른(관심사가 다른) 것들 각각을 따로 분리해서 생각하자는 것이다.

`view`를 `request handler` 안에 가지고 있는 것이 바람직하지는 않지만 일단은 그대로 해보자.

textarea의 내용은 상당히 클 수도 있다. 전체 데이터 블록을 하나로 처리하는 것은 blocking 방식일 것이다.

non-blocking 으로 만들려면, POST 데이터를 작은 청크로 나누고 특정 이벤트 때마다 callback을 호출하는 방식으로 만들어야 한다. 이 이벤트가 `data` (POST 데이터의 새 청크가 도착했다)와 `end` (모든 청크를 다 받았다) 이다.

이 이벤트가 발생했을 때 어떤 callback이 호출되어야 할지 Node.js에게 알려줘야 하는데, HTTP 요청이 올 때 `onRequest` callback 함수가 넘겨받은 `request` 객체에 listener 함수들을 추가하는 방식으로 할 수 있다.

```javascript
request.addListener("data", function(chunk) {
  // called when a new chunk of data was received
});

request.addListener("end", function() {
  // called when all chunks of data have been received
});
```
참고로 `request.addListener` 대신 `request.on`도 가능하다.

> .on() is exactly the same as .addListener() in the EventEmitter object.  
[EventEmitter source code:](https://github.com/nodejs/node-v0.x-archive/blob/master/lib/events.js#L188)  
EventEmitter.prototype.on = EventEmitter.prototype.addListener;

위의 처리는 `request` 객체가 필요하다.

`http.createServer`의 callback인 onRequest()에서 취득한 `response` 객체를 `router`를 통해 `request handler`에게 주입(inject)하여 handler가 요청에 직접 응답하도록 하였다.

이번에는 `request` 객체를 `router`를 통해 `request handler`에게 주입(inject)하는 것보다 `server`가 POST data를 받고 최종 data를 `router`를 통해 `request handler`로 보내도록 한다.

```javascript
// server.js

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });

  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

`/upload request handler`가 POST data를 화면에 표시하기 위해 `router.js`를 아래와 같이 수정한다.

```javascript
// router.js

function route(handle, pathname, response, postData) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
```

그리고 requestHandlers.js의 upload request handler에서 응답에 이 데이터를 추가한다.

```javascript
// requestHandlers.js

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent: " + postData);
  response.end();
}

exports.start = start;
exports.upload = upload;
```

## *Handling file uploads*
우리 계획은 사용자가 이미지 파일을 업로드 하면 업로드된 이미지를 브라우저에 출력하는 것이었다.

파일 데이터를 받아서 처리하는 것은 단지 POST 데이터를 처리하는 것이지만, 그 처리가 단순하지 않고 복잡하기 때문에, 여기서는 미리 만들어진 `formidable` 오픈소스 모듈을 사용한다.

Node.js 외부 모듈을 설치하는 방법과 이것을 코드에서 사용하는 것으로 우리의 목표를 구현해 보자.

```bash
$ npm install formidable@latest --save
```

[node-formidable](https://github.com/felixge/node-formidable)의 예제를 살펴보자.

`formidable`은 HTTP POST로 submit 된 “form”을 Node.js에서 파싱할 수 있게 (“parseable”) 한다. 사용법은 다음과 같다.

1. 새 IncomingForm을 생성한다. 이것은 submit된 form의 추상화 객체이다.
2. request 객체를 파싱하여 submit된 파일과 필드들을 얻는다.

```javascript
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8888);
```

위 코드를 실행하면 `form.parse` 메서드의 callback에 파라미터로 넘어가는 `files` 객체가 어떻게 생겼는지 살펴볼 수 있다.

```
received upload:

{ fields: { title: 'Hello World' },
  files:
   { upload:
      { size: 1558,
        path: '/tmp/1c747974a27a6292743669e91f29350b',
        name: 'us-flag.png',
        type: 'image/png',
        lastModifiedDate: Tue, 21 Jun 2011 07:02:41 GMT,
        _writeStream: [Object],
        length: [Getter],
        filename: [Getter],
        mime: [Getter] } } }
```
이제 `formidable`을 코드에서 사용해 보자.

`formidable`을 사용하여 할 일은 2가지다.

1. 업로드된 파일을 저장 (/tmp 폴더)
2. 업로드된 파일을 읽어 들여 화면에 출력

우선 2 부터 구현해 본다.
/tmp/test.png에 파일이 존재한다고 가정하고 `/show request handler`에서 이것을 처리한다고 하자.

```javascript
// requestHandlers.js

var querystring = require("querystring"),
    fs = require("fs");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: " + querystring.parse(postData).text);
  response.end();
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
```
`request handler`를 `/show` URL 과 매핑한다.

```javascript
// index.js

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
```

다음은 /start의 form에 파일 업로드 element를 추가한다.

```javascript
// requestHandlers.js

var querystring = require("querystring"),
    fs = require("fs");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+
  querystring.parse(postData).text);
  response.end();
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
```

다음은 업로드된 파일을 /tmp/test.png에 저장하기 위해서 `formidable`을 `upload request handler`에 추가한다. 이때 `request` 객체가 필요하므로 `server`에서 `router`를 통해 `request handler`에게 `request` 객체를 전달하여야 한다.

postData 처리와 request.setEncoding 부분을 삭제하고 대신 `request`를 `router`로 전달한다.

```javascript
// server.js

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

전달된 `request`를 bypass한다.

```javascript
// router.js

function route(handle, pathname, response, request) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
```

`formidable`는 외부 모듈이므로 npm으로 install한다.

```
$ cd <path>
$ npm init
$ npm install formidable --save
```
`package.json`을 수정한다.

```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "formidable": "^1.0.17"
  }
}
```

```javascript
// requestHandler.js

var fs = require("fs"),
    formidable = require("formidable");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
```

```
$ npm start
```

# Express framework
본 예제에서 다루는 web page는 css와 js 파일을 사용하지 않는 단순한 html을 사용하였다. 만약, html에 extern css, js 파일이 사용된다면 클라이언트는 css, js 파일을 요청할 것이고 그 요청에 대응하는 처리를 구현하여야 한다.

extern css, js 파일 요청에 응답하는 예제는 아래와 같다.

```javascript
var http = require('http'),
    fs = require('fs');

http.createServer(function (req, res) {

  if(req.url.indexOf('.html') != -1){ //req.url has the pathname, check if it conatins '.html'
    fs.readFile(__dirname + '/public/chatclient.html', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });

  }

  if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'
    fs.readFile(__dirname + '/public/js/script.js', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }

  if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'
    fs.readFile(__dirname + '/public/css/style.css', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }
}).listen(8888, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8888/');
```

이것이 꽤 번거러운 일이다. 그러나. `Express`와 같은 framework를 사용하면 이러한 문제는 쉽게 해결할 수 있다. 지금까지 살펴본 코드를 이해할 수 있다면 `Express`는 쉽게 사용할 수 있다. `Express`을 사용하면 Routing, Error handling, static file 제공 등을 매우 쉽게 구현할 수 있는 장점이 있다.

아래는 Server, Routing, Request handler가 모두 구현되어 있는 `Express`의 Hello world 예제이다.

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8888, function () {
  console.log('Example app listening on port 8888!');
});
```

이 포스트는 [http://www.nodebeginner.org](http://www.nodebeginner.org/) 를 바탕으로 작성되었다. 한국어 번역도 있으니 참조 바란다. 소스코드는 [이곳]( https://github.com/manuelkiessling/nodebeginner.org/tree/master/code/application) 에서 다운 받을 수 있다.


# *Reference*

* [Node.js](https://nodejs.org)
* [Understanding node.js](http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb)
* [이벤트 기반 비동기 방식](http://www.nextree.co.kr/p7292/)
* [Express](http://expressjs.com/)
