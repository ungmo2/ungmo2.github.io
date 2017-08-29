---
layout: post
title: JSON Server
categories: tools
section: tools
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

```json
{
  "todos": [
    { "id": 1, "todo": "html" },
    { "id": 2, "todo": "css" },
    { "id": 3, "todo": "javascript" }
  ],
  "users": [
    {"id": 1, "name": "Lee", "age": 20, "gender": "male"},
    {"id": 2, "name": "Kim", "age": 30, "gender": "female"}
  ]
}
```

## 2.3 json-server 실행

json-server가 db.json 파일을 watching하도록 실행한다. 기본 포트는 3000이다.

```bash
## 기본 포트(3000) 사용
$ json-server --watch db.json
## 포트 변경
$ json-server --watch db.json --port 5000
```

package.json script를 아래와 수정하여 json-server을 실행하여 보자.

```json
{
  "name": "json-server-exam",
  "version": "1.0.0",
  "scripts": {
    "serve": "json-server --watch db.json"
  },
  "devDependencies": {
    "json-server": "^0.12.0"
  }
}
```

```bash
$ npm run serve
```

# 3. json-server 접속

[Postman](https://www.getpostman.com/)을 사용하여 json-server에 접속하여 보자.

## 3.1 Get request

![Get request](/img/get-req.png)

## 3.2 Post request

![Post request](/img/post-req.png)

## 3.3 Put request

![Put request](/img/put-req.png)

## 3.4 Delete request

![Delete request](/img/delete-req.png)

# Reference

- [json-server](https://github.com/typicode/json-server)

- [Postman](https://www.getpostman.com/)
