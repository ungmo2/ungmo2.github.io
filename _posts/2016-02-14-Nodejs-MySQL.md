---
layout: post
title: Node.js(express)와 MySQL 연동
categories: node.js
---

[MySQL](https://www.mysql.com/)은 오픈 소스 데이터베이스이다. [Wordpress](https://wordpress.org/)의 기본 데이터베이스이며 알려진 대부분의 프로그래밍 언어를 위한 드라이버를 지원하고 있다. 상용 데이터베이스와 비교해도 성능 상의 문제가 없어 중소형 웹사이트를 위한 데이터베이스로써 사용되고 있다.

Node.js(express)와 MySQL 연동을 위한 모듈 중 대표적인 [node-mysql](https://github.com/felixge/node-mysql) 대해 알아본다.

사전에 MySQL이 설치되어 있어야 한다. 설치 방법은 설명하지 않으니 별도로 검색하여 설치하기 바란다.

우선 간단한 [express Hello world example](http://expressjs.com/en/starter/hello-world.html)을 만들어 보자.

# express Hello world example

어플리케이션 디렉터리를 생성하고 `npm init`를 실행한다. 일단 기본 설정(모두 엔터)으로 `package.json`을 생성한다.

```bash
mkdir express-mysql
cd express-mysql
npm init
```

`express`와 `node-mysql`을 설치한다.

```bash
npm install express --save
npm install mysql --save
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
    "express": "^4.13.4",
    "mysql": "^2.10.2"
  }
}
```

다음은 `index.js`를 생성한다.

```javascript
console.log('Hello world')
```

어플리케이션을 실행하여 'Hello world'가 출력되는 것을 확인한다.

```bash
npm start
```

# 테이블 생성 및 테스트용 데이터 삽입

데이터베이스에 접속하여 테이블을 생성하고 테스트용 데이터를 insert해 놓자.

```sql
CREATE DATABASE my_db;

USE my_db;

CREATE TABLE Persons
(
id int,
name varchar(255),
age int
);

INSERT INTO PersonsPersons (id, name, age)
VALUES (1,'John Doe', 20);

SELECT * FROM Persons;
```

# Node.js와 MySQL 연동

index.js를 아래와 같이 변경한다. `createConnection` 함수의 인자로 전달되는 객체에 자신의 데이터베이스 유저명과 패스워드를 입력하여야 한다.

```javascript
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '< MySQL username >',
  password : '< MySQL password >',
  database : 'my_db'
});

connection.connect();

connection.query('SELECT * from Persons', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();
```

이하의 결과가 출력되면 성공이다.

```
The solution is:  [ RowDataPacket { id: 1, name: 'John Doe', age: 20 } ]
```
