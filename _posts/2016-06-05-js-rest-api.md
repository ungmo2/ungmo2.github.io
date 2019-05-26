---
layout: post
title: <strong>REST API</strong>
subtitle: REST(Representational State Transfer) API
categories: javascript
section: javascript
seq: 5
subseq: 35
description: REST(Representational State Transfer)는 HTTP/1.0과 1.1의 스펙 작성에 참여하였고 아파치 HTTP 서버 프로젝트의 공동설립자인 로이 필딩 (Roy Fielding)의 2000년 논문에서 처음 소개되었다. 발표 당시의 웹이 HTTP의 설계 상 우수성을 제대로 사용하지 못하고 있는 상황을 보고 웹의 장점을 최대한 활용할 수 있는 아키텍쳐로 REST를 소개했다고 한다. HTTP 프로토콜을 의도에 맞게 디자인하도록 유도하고 있다. REST의 기본 원칙을 성실히 지킨 서비스 디자인을 "RESTful"이라고 표현한다.
---

* TOC
{:toc}

REST(Representational State Transfer)는 HTTP/1.0과 1.1의 스펙 작성에 참여하였고 아파치 HTTP 서버 프로젝트의 공동설립자인 로이 필딩 (Roy Fielding)의 2000년 논문에서 처음 소개되었다. 발표 당시의 웹이 HTTP의 설계 상 우수성을 제대로 사용하지 못하고 있는 상황을 보고 웹의 장점을 최대한 활용할 수 있는 아키텍쳐로서 REST를 소개하였고 이는 HTTP 프로토콜을 의도에 맞게 디자인하도록 유도하고 있다. REST의 기본 원칙을 성실히 지킨 서비스 디자인을 "RESTful"이라고 표현한다.

# 1. REST API 중심 규칙

REST에서 가장 중요한 기본적인 규칙은 두 가지이다. URI는 자원을 표현하는 데에 집중하고 행위에 대한 정의는 HTTP Method를 통해 하는 것이 REST한 API를 설계하는 중심 규칙이다.

**1. URI는 정보의 자원을 표현해야 한다.**

리소스명은 동사보다는 명사를 사용한다. URI는 자원을 표현하는데 중점을 두어야 한다. get 같은 행위에 대한 표현이 들어가서는 안된다.

```
# bad
GET /getBooks/1
GET /books/show/1

# good
GET /books/1
```

**2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE 등)으로 표현한다.**

```
# bad
GET /books/delete/1

# good
DELETE /books/1
```

# 2. HTTP Method

주로 5가지의 Method(GET, POST, PUT, PATCH, DELETE)를 사용하여 CRUD를 구현한다.

| Method | Action         | 역할
|:-------|:---------------|--------------------
| GET    | index/retrieve | 모든/특정 리소스를 조회
| POST   | create         | 리소스를 생성
| PUT    | update         | 리소스를 갱신
| PATCH  | update all     | 리소스를 일괄 갱신
| DELETE | delete         | 리소스를 삭제

# 3. REST API의 구성

REST API는 자원(Resource), 행위(Verb), 표현(Representations)의 3가지 요소로 구성된다. REST는 자체 표현 구조(Self-descriptiveness)로 구성되어 REST API만으로 요청을 이해할 수 있다.

| 구성 요소         | 내용               | 표현 방법
|:----------------|:------------------|:----------------------------
| Resource        | 자원               | HTTP URI
| Verb            | 자원에 대한 행위      | HTTP Method
| Representations | 자원에 대한 행위의 내용 | HTTP Message Pay Load


# 4. REST API의 Example

## 4.1 json-server

[json-server](./json-server)를 사용하여 REST API를 사용하여 보자.

```bash
$ mkdir rest-api-exam && cd rest-api-exam
$ npm init -y
$ npm install json-server
```

db.json 파일을 아래와 같이 생성한다.

```json
{
  "books": [
    { "id": 1, "title": "html", "author": "Lee" },
    { "id": 2, "title": "css", "author": "Kim" },
    { "id": 3, "title": "javascript", "author": "Park" }
  ]
}
```

npm script를 사용하여 json-server를 실행한다. 아래와 같이 package.json을 수정한다.

```json
{
  "name": "rest-api-exam",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "serve": "json-server --watch db.json --port 5000"
  },
  "dependencies": {
    "json-server": "^0.15.0"
  }
}
```

json-server를 실행한다. 포트는 5000을 사용한다.

```bash
$ npm run serve
```

## 4.2 GET

books 리소스에서 모든 책을 조회(index)한다.

```bash
$ curl -X GET http://localhost:5000/books
[
  {
    "id": 1,
    "title": "html",
    "author": "Lee"
  },
  {
    "id": 2,
    "title": "css",
    "author": "Kim"
  },
  {
    "id": 3,
    "title": "javascript",
    "author": "Park"
  }
]
```

![get-books](/img/get-books.png)

[Postman](https://www.getpostman.com/)
{: .desc-img}

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:5000/books');
xhr.send();

xhr.onreadystatechange = function (e) {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if(xhr.status === 200) { // 200: OK => https://httpstatuses.com
      console.log(xhr.responseText);
    } else {
      console.log("Error!");
    }
  }
};
```

books 리소스에서 특정 책을 조회(retrieve)한다.

```bash
$ curl -X GET http://localhost:5000/books/1
{
  "id": 1,
  "title": "html",
  "author": "Lee"
}
```

![get-books](/img/get-books-retrieve.png)

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:5000/books/1');
xhr.send();

xhr.onreadystatechange = function (e) {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if(xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log("Error!");
    }
  }
};
```

## 4.3 POST

books 리소스에 책을 생성한다.

```bash
$ curl -X POST http://localhost:5000/books -H "Content-Type: application/json" -d '{"title": "ES6", "author": "Choi"}'
{
  "title": "ES6",
  "author": "Choi",
  "id": 4
}
```

![post-books](/img/post-books.png)

```javascript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:5000/books');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({
  title: "ES6",
  author: "Choi"
}));

xhr.onreadystatechange = function (e) {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if(xhr.status === 201) { // 201: Created
      console.log(xhr.responseText);
    } else {
      console.log("Error!");
    }
  }
};
```

## 4.4 PUT

books 리소스의 책의 타이틀을 "ES6"에서 "ECMAScript6"로 갱신한다.

```bash
$ curl -X PUT http://localhost:5000/books/4 -H "Content-Type: application/json" -d '{"title": "ECMAScript6", "author": "Choi"}'
{
  "title": "ECMAScript6",
  "author": "Choi",
  "id": 4
}
```

![put-books](/img/put-books.png)

```javascript
const xhr = new XMLHttpRequest();
xhr.open('PUT', 'http://localhost:5000/books/4');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({
  title: 'ecmascript',
  author: "Choi"
}));

xhr.onreadystatechange = function (e) {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if(xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log("Error!");
    }
  }
};
```

## 4.5 DELETE

books 리소스에서 책을 삭제한다.

```bash
$ curl -X DELETE http://localhost:5000/books/4
{}
```

![delete-books](/img/delete-books.png)

```javascript
const xhr = new XMLHttpRequest();
xhr.open('DELETE', 'http://localhost:5000/books/4');
xhr.send();

xhr.onreadystatechange = function (e) {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if(xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log("Error!");
    }
  }
};
```

# Reference

* [RESTFul이란 무엇인가?](http://blog.remotty.com/blog/2014/01/28/lets-study-rest)

* [HTTP GET with request body](https://stackoverflow.com/questions/978061/http-get-with-request-body)

* [HTTP Status codes](https://httpstatuses.com)

