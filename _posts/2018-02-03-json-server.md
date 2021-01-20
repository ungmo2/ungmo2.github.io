---
layout: post
title: JSON Server
categories: tools
section: tools
seq: 14
subseq: 3
description: json-server는 json 파일을 사용하여 간단한 시뮬레이션을 위한 REST API Mock server를 구축할 수 있는 툴이다.
---

* TOC
{:toc}

# 1. Introduction

json-server는 json 파일을 사용하여 간단한 시뮬레이션을 위한 REST API Mock server를 구축할 수 있는 툴이다.

# 2. Setup

## 2.1 json-server 설치

npm을 이용하여 json-server를 로컬 설치한다.

```bash
$ mkdir json-server-exam && cd json-server-exam
$ npm init -y
$ npm install json-server --save-dev
```

## 2.2 db.json 파일 생성

프로젝트 루트 폴더에 아래와 같이 db.json 파일을 생성한다. db.json 파일은 데이터베이스 역할을 한다.

```json
{
  "todos": [
    {
      "id": 1,
      "content": "HTML",
      "completed": true
    },
    {
      "id": 2,
      "content": "CSS",
      "completed": false
    },
    {
      "id": 3,
      "content": "Javascript",
      "completed": true
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "Lee",
      "role": "developer"
    },
    {
      "id": 2,
      "name": "Kim",
      "role": "designer"
    }
  ]
}
```

## 2.3 json-server 실행

json-server가 db.json 파일을 watching하도록 실행한다.

```bash
## watch 옵션 적용
$ json-server --watch db.json
```

기본 포트는 3000이다. 포트를 변경하려면 port 옵션을 추가한다.

```bash
## 포트 변경
$ json-server --watch db.json --port 5000
```

위와 같이 매번 명령어를 입력하는 것이 번거로우니 package.json 파일의 scripts를 아래와 수정하여 json-server을 실행하여 보자.

```json
{
  "name": "json-server-exam",
  "version": "1.0.0",
  "scripts": {
    "start": "json-server --watch db.json"
  },
  "devDependencies": {
    "json-server": "^0.15.0"
  }
}
```

```bash
$ npm start
```

# 3. json-server 접속

[Postman](https://www.getpostman.com/)을 사용하여 json-server에 접속하여 보자.

## 3.1 GET request

![GET request](/img/get-req.png)

## 3.2 POST request

![POST request](/img/post-req.png)

## 3.3 PUT request

![PUT request](/img/put-req.png)

## 3.4 PATCH request

![PATCH request](/img/patch-req.png)

## 3.5 DELETE request

![DELETE request](/img/delete-req.png)

# 4. 커스텀 라우트

커스텀 라우트를 추가하기 위해 아래와 같이 lowdb를 설치하고, server.js를 프로젝트 루트에 생성한다.

```bash
## https://github.com/typicode/lowdb
npm install lowdb
```

```javascript
// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// db.json를 조작하기 위해 lowdb를 사용
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.delete('/todos/completed', (req, res) => {
  // lowdb를 사용해서 db.json에서 completed: true인 todo를 제거
  db.get('todos')
    .remove({ completed: true })
    .write();

  // todos를 응답
  res.send(db.get('todos').value());
})

// Use default router
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running')
});
```

package.json을 아래와 같이 수정한다.

```json
...
- "scripts": {
-   "start": "json-server --watch db.json"
- },
+ "scripts": {
+   "start": "node server.js"
+ },
...
```

```bash
$ npm start
```

# Reference

- [json-server](https://github.com/typicode/json-server)

- [Postman](https://www.getpostman.com/)
