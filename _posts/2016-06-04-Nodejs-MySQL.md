---
layout: post
title: Node.js(express)와 MySQL 연동
categories: node.js
---
* TOC
{:toc}

![node mysql](/img/nodejs-mysql.png)

# 1. Introduction

[MySQL](https://www.mysql.com/)은 오픈 소스 데이터베이스이다. [Wordpress](https://wordpress.org/)의 기본 데이터베이스이며 알려진 대부분의 프로그래밍 언어를 위한 드라이버를 지원하고 있다. AMP(Apache-MySQL-PHP) 플랫폼의 데이터베이스 구성체로 작동한다.

SUN 인수 이후, 중소기업이나 개인용 사이트뿐만 아니라 대기업에서도 점차 관심을 보이고 있다. Wikipedia, Goggle(검색 엔진 제외), Facebook, Tweeter, Youtube 등에서 사용하고 있다. MySQL은 GPL/Commercial License의 듀얼 이중 라이선스가 적용된다.

# 2. Express Hello world example

Node.js(express)와 MySQL 연동을 위한 모듈 중 대표적인 [node-mysql](https://github.com/felixge/node-mysql) 대해 알아본다.

사전에 MySQL이 설치되어 있어야 한다. 설치 방법은 설명하지 않으니 별도로 검색하여 설치하기 바란다.

우선 간단한 [express Hello world example](http://expressjs.com/en/starter/hello-world.html)을 만들어 보자.

어플리케이션 디렉터리를 생성하고 `npm init`를 실행한다. 일단 기본 설정(yes option)으로 `package.json`을 생성한다.

```bash
$ mkdir express-mysql
$ cd express-mysql
$ npm init --yes
```

`express`와 `node-mysql`을 설치한다.

```bash
$ npm install express mysql --save --save-exact
```

`package.json`을 아래와 같이 수정한다.


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
    "express": "4.14.0",
    "mysql": "2.11.1"
  }
}
```

다음은 루트 디렉터리에 `index.js`를 생성한다.

```javascript
console.log('Hello world')
```

어플리케이션을 실행하여 'Hello world'가 출력되는 것을 확인한다.

```bash
$ npm start
```

# 3. 테이블 생성 및 테스트용 데이터 삽입

MtSQL에 접속하여 테이블을 생성하고 테스트용 데이터를 insert해 놓자.

```sql
CREATE DATABASE my_db;

USE my_db;

CREATE TABLE Persons
(
id int,
name varchar(255),
age int
);

INSERT INTO Persons (id, name, age)
VALUES (1, 'John Doe', 20);

SELECT * FROM Persons;
```

# 4. Node.js와 MySQL 연동

index.js를 아래와 같이 변경한다.

`createConnection` 메서드의 인자로 전달되는 객체에 자신의 데이터베이스 정보(유저명과 패스워드 등)를 입력하여야 한다. 설정 정보의 관리에 대해서는 [Node.js에서 비밀 설정 정보(Secrets) 관리](http://ungmo2.github.io/node.js/Nodejs-Kepping-Secrets/)를 참조하기 바란다.

```javascript
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '< MySQL username >',
  password : '< MySQL password >',
  port     : '<port>',
  database : 'my_db'
});

connection.connect();

connection.query('SELECT * from Persons', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.', err);
});

connection.end();
```

console에 이하의 결과가 출력되면 성공이다.

```
The solution is:  [ RowDataPacket { id: 1, name: 'John Doe', age: 20 } ]
```

# 5. Route 작성

클라이언트 요청에 대응하는 route를 설정해보자.

index.js를 아래와 같이 변경한다.

```javascript
var express    = require('express');
var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();

// configuration ===============================================================
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.send('Root');
});

app.get('/persons', function(req, res){

  connection.query('SELECT * from Persons', function(err, rows) {
    if(err) throw err;

    console.log('The solution is: ', rows);
    res.send(rows);
  });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
```

데이터베이스 설정 정보를 아래와 같이 작성한 후 루트 디렉터리 아래 config 디렉터리에 저장한다.

```javascript
// config/database.js
module.exports = {
  host     : 'localhost',
  user     : '< MySQL username >',
  password : '< MySQL password >',
  port     : <port>,
  database : 'my_db'
};
```

서버를 실행한다.

```bash
$ npm start
```

localhost:3000/persons에 접속하여 결과를 확인한다.

![node mysql routing](/img/nodejs-mysql-routing.png)
