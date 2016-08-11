---
layout: post
title: Express Basics
categories: express
tags: []
---

* TOC
{:toc}

[Express](http://expressjs.com/)는 Node.js 환경에서 동작하는 Web application Framework이다. Express는 Web Application 구성에 필요한 Routing, View Helper, Session(영속적 Session관리를 위해서는 [Redis](http://www.redis.io/)등의 Data store가 필요하다)등의 기능을 제공한다.

Express 4.14.0 버전을 기준으로 한다.

# 1. Install

[Node.js](https://nodejs.org/)가 install되어 있음을 전제로 한다.

프로젝트 폴더를 생성하고 npm init로 package.json을 생성한 후 express install을 실시한다.

```
$ mkdir myapp
$ cd myapp
$ npm init
$ npm install express --save
```

# 2. Hello world example

프로젝트 폴더(myapp)에 app.js를 생성한다.

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

터미널에서 다음 명령을 실행하여 application을 구동시킨다.

```
$ node app.js
```

서버는 port 3000에서 사용자의 접속을 대기하고 있다. 클라언트가 root URL(http://localhost:3000/)로 요청를 보내면 서버는 'Hello World!'로 응답할 것이다.

# 3. Routing

클라이언트는 서버에 URI 및 특정한 HTTP 요청 메소드(GET, POST 등)로 요청을 전달한다.

```javascript
// client-side ajax request  
$.ajax({
  url    : '/signin',
  method : 'POST',
  data   : $('#signin-form').serialize()
})
```

이러한 클라이언트 요청에 응답하는 방법을 결정하는 것을 라우팅이라 한다. 각 라우트는 하나 이상의 핸들러 함수를 가질 수 있으며, 이러한 함수는 라우트가 일치할 때 실행된다.

라우트 정의에는 다음과 같은 구조가 필요하다.

![define route](/img/define-route.png)
{: style="max-width:550px; margin: 10px auto;"}

위의 클라이언트 요청에 대응하는 route를 설정해보자.

```javascript
// Server-side: app.js  
var express    = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  res.send({
   username : username,
   password : password
 });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

## 3.1 Route method

Express는 HTTP 메소드에 해당하는 다음과 같은 라우팅 메소드를 지원한다.

```
get, post, put, head, delete, options, trace, copy,
lock, mkcol, move, purge, propfind, proppatch, unlock,
report, mkactivity, checkout, merge, m-search, notify,
subscribe, unsubscribe, patch, search, connect.
```

```javascript
// GET method route
app.get('/api/books', function (req, res) {
  res.send('GET request to the /api/books');
});

// POST method route
app.post('/api/books', function (req, res) {
  res.send('POST request to the /api/books');
});
```

app.all() 메서드는 모든 HTTP method에 대응한다. next()를 사용하면 후속 route handler로 제어를 전달할 수 있다.

```javascript
// 모든 요청 메서드에 대응
app.all('/', function (req, res, next) {
  console.log('Accessing the root section ...');
  next(); // pass control to the next handler
});

app.get('/', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from homepage!');
});
```

## 3.2 Route path

Route path에는 문자열 또는 정규표현식을 사용할 수 있다.

```javascript
// localhost:3000/
app.get('/', function (req, res) {
  res.send('root');
});

// localhost:3000/about
app.get('/about', function (req, res) {
  res.send('about');
});

// localhost:3000//random.text
app.get('/random.text', function (req, res) {
  res.send('random.text');
});

// localhost:3000/<number>
app.get(/^\/[0-9]+$/, function(req, res) {
  res.send('regexp');
});

// localhost:3000/user/<userId>/item/<itemId>
app.get('/user/:userId/item/:itemId', function(req, res) {
  res.send('userId:' + req.params.userId + ", itemId:" + req.params.itemId);
});
```

## 3.3 Route handler

Route handler는 요청을 처리하는 콜백함수이다.

```javascript
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
```

next()를 사용하면 후속 route handler로 제어를 전달할 수 있다.

```javascript
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```

함수나 함수 배열 또는 둘을 조합한 형태로 사용한다.

```javascript
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
```

## 3.4 Response method

<table>
<thead>
<tr>
<th style="width:175px;">메소드</th>
<th>설명</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="http://expressjs.com/ko/4x/api.html#res.download">res.download()</a></td>
<td>다운로드될 파일을 전송한다.</td>
</tr>
<tr>
<td><a href="http://expressjs.com/ko/4x/api.html#res.end">res.end()</a></td>
<td>응답 프로세스를 종료한다.</td>
</tr>
<tr>
<td><a href="http://expressjs.com/ko/4x/api.html#res.json">res.json()</a></td>
<td>JSON 응답을 전송한다.</td>
</tr>
<tr>
<td><a href="http://expressjs.com/ko/4x/api.html#res.jsonp">res.jsonp()</a></td>
<td>JSONP 지원을 통해 JSON 응답을 전송한다.</td>
</tr>
<tr>
<td><a href="http://expressjs.com/ko/4x/api.html#res.redirect">res.redirect()</a></td>
<td>요청 경로를 재지정한다.</td>
</tr>
<tr>
<td><a href="http://expressjs.com/ko/4x/api.html#res.render">res.render()</a></td>
<td>view template을 렌더링한다.</td>
</tr>
<tr>
<td><a href="http://expressjs.com/ko/4x/api.html#res.send">res.send()</a></td>
<td>다양한 유형의 응답을 전송한다.</td>
</tr>
<tr>
<td><a href="http://expressjs.com/ko/4x/api.html#res.sendFile">res.sendFile</a></td>
<td>파일을 옥텟 스트림(이메일이나 http에서 사용되는 content-type에서 application의 형식이 지정되어 있지 않은 경우에 octet-stream이라고 한다)의 형태로 전송한다.</td>
</tr>
<tr>
<td><a href="http://expressjs.com/ko/4x/api.html#res.sendStatus">res.sendStatus()</a></td>
<td>응답 상태 코드(response status code)를 설정한 후 해당 코드를 문자열로 표현한 내용을 응답 본문으로서 전송한다.</td>
</tr>
</tbody>
</table>

```javascript
res.download(__dirname + '/public/report.pdf', 'report.pdf');

res.end();
res.status(404).end();

res.json(null);
res.json({ user: 'tobi' });
res.status(500).json({ error: 'message' });

res.jsonp({ user: 'tobi' });
res.status(500).jsonp({ error: 'message' });

res.redirect('/foo/bar');
res.redirect('http://example.com');
res.redirect(301, 'http://example.com');
res.redirect('../login');

// send the rendered view to the client
res.render('index');
// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', function(err, html) {
  res.send(html);
});
// pass a local variable to the view
res.render('user', { name: 'Tobi' }, function(err, html) {
  // ...
});

res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });

res.sendFile('test.json', { root: __dirname });

res.sendStatus(200); // equivalent to res.status(200).send('OK')
res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
```

# 4. Static file

이미지 파일, CSS 파일, javascript 파일 등과 같은 정적 파일을 제공하기 위해 Express의 기본 제공 미들웨어 함수인 express.static을 사용한다.

아래는 루트 리렉터리에 있는 public 디렉터리에 있는 정적 파일을 제공하는 예이다.

```javascript
app.use(express.static('public'));
```

# 5. Template engine

Express는 [jade](http://jade-lang.com/), [ejs](http://ejs.co/), [handlebars](http://handlebarsjs.com/)와 같은 템플릿 엔진을 사용할 수 있다.

**jade**

```javascript
// Optional since express defaults to CWD/views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index', {
    title: 'Hello world'
  })
});
```

**ejs**

```javascript
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
  res.render('index', {
    title: 'Hello world'
  })
});
```
