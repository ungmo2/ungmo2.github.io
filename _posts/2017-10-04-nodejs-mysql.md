---
layout: post
title: <strong>MySQL 연동</strong>
subtitle: Node.js(Express)와 <strong>MySQL 연동</strong>
categories: express
section: express
seq: 10
subseq: 4
description: Node.js(express)와 MySQL 연동
---

* TOC
{:toc}

![node mysql](/img/nodejs-mysql.png)

# 1. Introduction

[MySQL](https://www.mysql.com/)은 오픈 소스의 관계형 데이터베이스 관리 시스템(RDBMS)이다. [Wordpress](https://wordpress.org/)의 기본 데이터베이스이며 알려진 대부분의 프로그래밍 언어를 위한 드라이버를 지원하고 있다. AMP(Apache-MySQL-PHP) 플랫폼의 데이터베이스 구성체로 작동한다.

SUN이 인수한(SUN Microsystems에 10억 달러에 인수되었으나, Oracle이 SUN Microsystems를 인수하였다.) 이후, 중소기업이나 개인용 사이트뿐만 아니라 대기업에서도 점차 관심을 보이고 있다. 현재 Wikipedia, Goggle(검색 엔진 제외), Facebook, Tweeter, Youtube 등에서 MySQL을 사용하고 있다.

MySQL은 GPL/Commercial License의 듀얼 라이선스가 적용된다.

# 2. Express Hello world example

Node.js(express)와 MySQL 연동을 위한 모듈 중 대표적인 [mysql](https://github.com/mysqljs/mysql) 대해 알아본다.

사전에 MySQL이 설치되어 있어야 한다. 설치 방법은 설명하지 않으니 별도로 검색하여 설치하기 바란다.

- [Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

우선 간단한 [express Hello world example](http://expressjs.com/en/starter/hello-world.html)을 만들어 보자.

Express에 대한 자세한 내용은 아래의 포스트를 참조하기 바란다.

- [Express Basics](./express-basics)
- [Express Error Handling](./express-error-handling)
- [Express Session Handling](./express-session-handling)

적당한 위치에 애플리케이션 디렉터리를 생성하고 `npm init`를 실행한다. 일단 기본 설정(yes option)으로 package.json을 생성한다.

```bash
$ mkdir express-mysql-example
$ cd express-mysql-example
$ npm init --yes
```

express와 mysql 모듈을 설치한다.

```bash
$ npm install express mysql
```

package.json을 아래와 같이 수정한다.


```json
{
  "name": "express-mysql-example",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mysql": "^2.18.1"
  }
}
```

다음은 루트 디렉터리에 index.js를 생성한다.

```javascript
// index.js
console.log('Hello world')
```

애플리케이션을 실행하여 콘솔에 'Hello world'가 출력되는 것을 확인한다.

```bash
$ npm start
```

# 3. 테이블 생성 및 테스트용 데이터 삽입

MySQL에 접속하여 테이블을 생성하고 테스트용 데이터를 insert해 놓자.

```sql
CREATE DATABASE IF NOT EXISTS my_db;

USE my_db;

CREATE TABLE IF NOT EXISTS Users (
  id VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));

INSERT INTO Users (id, password) VALUES ('ungmo2', '1234');

SELECT password FROM Users WHERE id='ungmo2';
```

# 4. Node.js와 MySQL 연동

index.js를 아래와 같이 변경한다.

`createConnection` 메소드의 인자로 전달되는 객체에 자신의 데이터베이스 정보(유저명과 패스워드 등)를 입력하여야 한다. 설정 정보의 관리에 대해서는 [Node.js에서 비밀 설정 정보(Secrets) 관리](./nodejs-kepping-secrets)를 참조하기 바란다.

```javascript
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : '< MySQL username >',
  password : '< MySQL password >',
  database : 'my_db'
});

connection.connect();

connection.query('SELECT * from Users', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows);
});

connection.end();
```

콘솔에 이하의 결과가 출력되면 성공이다.

```
User info is:  [ RowDataPacket { id: 'ungmo2', password: '1234' } ]
```

만약 'ER_NOT_SUPPORTED_AUTH_MODE' 에러가 발생하면 아래 sql을 실행하고 다시 접속해보자.

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '< MySQL password >';
FLUSH PRIVILEGES;
```

# 5. Route 작성

클라이언트 요청에 대응하는 route를 설정해보자.

- routing에 대한 자세한 내용은 [Express routing](./express-basics#routing)을 참조하기 바란다.

index.js를 아래와 같이 변경한다.

```javascript
const express    = require('express');
const mysql      = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

// configuration =========================
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.get('/users', (req, res) => {
  connection.query('SELECT * from Users', function(error, rows) {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
```

데이터베이스 설정 정보를 아래와 같이 작성한 후 루트 디렉터리 아래 config 디렉터리에 저장한다.

- module에 대한 자세한 내용은 [Node.js - module](./nodejs-module)을 참조하기 바란다.

```javascript
// config/database.js
module.exports = {
  host     : 'localhost',
  user     : '< MySQL username >',
  password : '< MySQL password >',
  database : 'my_db'
};
```

서버를 실행한다.

```bash
$ npm start
```

localhost:3000/users에 접속하여 결과를 확인한다.

![node mysql routing](/img/nodejs-mysql-routing.png)

# Reference

* [Node.js - module](./nodejs-module)
* [Express Basics](./express-basics)
* [Express Error Handling](./express-error-handling)
* [Express Session Handling](./express-session-handling)
* [Node.js에서 비밀 설정 정보(Secrets) 관리](./nodejs-kepping-secrets)
