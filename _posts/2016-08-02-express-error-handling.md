---
layout: post
title: Express <strong>Error Handling</strong>
subtitle: Express의 기본적인 에러 처리 방식
categories: express
section: express
---

Web application은 에러가 발생하였을 경우 반드시 Client에 에러 관련 정보를 알려야 한다. 에러는 Client에 의한 것(e.g, 부적절한 input data)일 수도 있고 Server에 의한 것(e.g, 코드내의 버그)일 수도 있다.

Express에서 에러 처리는 매개변수가 4개(err, req, res, next)인 미들웨어 함수를 사용한다.

```javascript
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err.stack);
  res.status(500).send({status:500, message: 'internal error', type:'internal'});
});
```

클라이언트에서 jqXHR 객체의 status, statusText 등을 참조하면 에러 내용을 확인할 수 있다.

- [HTTP Status code](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)

```javascript
$.ajax({
  url: '/error'
})
  .done(function(data, textStatus, jqXHR) {
    console.log('Success!');
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR);
  })
```

따라서 전달하고자 하는 텍스트만 클라이언트로 전송하여도 무방하다.

```javascript
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err.stack);
  res.status(500).send('internal server error');
})
```

또는 view template이나 html을 render할 수도 있다.

```javascript
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err.stack);
  res.render('500'); // 500.jade or 500.ejs
})
```

next()를 사용하여 Error handler middleware로 에러 처리를 위임할 수 있다.

next()를 인수없이 호출하면 이후에 일치하는 route로 이동하지만 next()에 인수를 전달하여 호출하면 Error handler middleware로 처리를 이동시킨다.

```javascript
var express = require('express');
var app = express();

app.get('*', function(req, res, next) {
  var error = new Error('My Error occurred');
  error.status = 500;
  next(error);
});

app.use(logHandler);
app.use(errorHandler);

// logger middleware
function logHandler(err, req, res, next) {
  console.error('[' + new Date() + ']\n' + err.stack);
  next(err);
}

// error handler middleware
function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message || 'Error!!');
}

app.listen(3000, function() {
  console.log('Express server listening on port ' + 3000);
});
```
