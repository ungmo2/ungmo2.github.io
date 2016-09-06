---
layout: post
title: Node.js(express)와 MongoDB 연동 RESTful API - Mongoose
categories: mongodb
---

![mongoose logo](/img/mongoose-logo.jpeg)

# 1. Introduction

Mongoose는 Node.js와 MongoDB를 위한 ODM(Object Data Mapping) library이다. Java 기반의 Hibernate. iBatis 등의 ORM(Object Relational Mapping)과 유사한 개념이다.

ODM의 사용은 코드 구성이나 개발 편의성 측면에서 장점이 많다. 호환성이 없는 프로그래밍언어(JavaScript) Object와 MongoDB의 데이터를 Mapping하여 간편한 CRUD를 가능하게 한다.

필요에 따라 확장 및 변경이 가능한 자체 검증(Validation)과 타입 변환(Casting)이 가능하며 Express와 함께 사용하면 MVC Concept 구현이 용이하다.

# 2. RESTful API

REST는 Representational state transfer의 약자로 World Wide Web과 같은 분산 하이퍼미디어 시스템에서 운영되는 소프트웨어 아키텍처 스타일이다.

HTTP 프로토콜을 의도에 맞게 정확히 활용하여 디자인하도록 유도하고 있기 때문에 디자인 기준이 명확해지며, 의미적인 범용성을 지니므로 중간 계층의 컴포넌트들이 서비스를 최적화하는 데 도움이 된다. REST의 기본 원칙을 충실히 지킨 서비스 디자인을 “RESTful” 이라고 표현한다.

REST에서 가장 중요하며 기본적인 규칙은 아래 두 가지이다.

- URI는 정보의 자원을 표현해야 한다.
- 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE 등)으로 표현한다.

예를 들면

| 예약 생성 | POST   | /reservation/2013012500001
| 예약 수정 | PUT    | /reservation/2013012500001
| 예약 조회 | GET    | /reservation/2013012500001
| 예약 취소 | DELETE | /reservation/2013012500001

# 3. Install

mongoose-example 디렉터리를 생성하고 npm을 사용하여 Mongoose 모듈을 install한다.

```bash
$ mkdir mongoose-example && cd mongoose-example
$ npm init --yes
$ npm install --save --save-exact express body-parser mongoose
```

package.json은 아래와 같다.

```json
{
  "name": "mongoose-example",
  "version": "1.0.0",
  "scripts": {
    "start": "supervisor node app.js"
  },
  "dependencies": {
    "body-parser": "1.15.2",
    "express": "4.14.0",
    "mongoose": "4.5.10"
  }
}
```

# 4. Setting

## 4.1. 디렉터리 구조

```
mongoose-example/
├── models/
│   └── user.js
├── routes/
│   └── user.js
├── app.js
└── pakage.json
```

## 4.2. API Reference

| Route                         | Method   | Description
|:------------------------------|:---------|:-----------
| /api/users                    | POST     | user 생성
| /api/users                    | GET      | 모든 user 조회
| /api/users/:id                | GET      | _id로 user 조회
| /api/users/username/:username | GET      | username으로 user 조회
| /api/users/:id                | PUT      | _id로 user 조회 후 수정
| /api/users/username/:username | PUT      | username으로 user 조회 후 수정
| /api/users                    | DELETE   | 모든 user 삭제
| /api/users/username/:username | DELETE   | username으로 user 조회 후 삭제

# 5. Connection

루트 디렉터리에 app.js를 생성한다. mongoose 모듈을 require하고 connect 메서드로 MongoDB에 connect한다.

```javascript
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var app  = express();
var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect successfully");
});

mongoose.connect('mongodb://localhost/mydatabase');
```

mongoose.connection의 error, open 등의 이벤트를 활용하여 접속 실패, 접속 성공 시의 handling이 가능하다.

[Mongoose Connections](http://mongoosejs.com/docs/connections.html)

# 6. Schema & Model

## 6.1. Schema

RDBMS의 Schema는 데이터베이스를 구성하는 레코드의 크기, 키(key)의 정의, 레코드와 레코드의 관계, 검색 방법 등을 정의한 것이다.

Mongoose의 Schema는 MongoDB에 저장되는 document의 Data 구조 즉 필드 타입에 관한 정보를 JSON 형태로 정의한 것으로 RDBMS의 테이블 정의와 유사한 개념이다.

MongoDB는 Schema-less하다. 이는 RDMS처럼 고정 Schema가 존재하지 않는다는 뜻으로 같은 Collection 내에 있더라도 document level의 다른 Schema를 가질 수 있다는 의미이다.

이는 자유도가 높아서 유연한 사용이 가능하다는 장점이 있지만 명시적인 구조가 없기 때문에 어떤 필드가 어떤 데이터 타입인지 알기 어려운 단점이 있다. 이러한 문제를 보완하기 위해서 Mongoose는 Schema를 사용한다.

models/user.js에 아래의 코드를 작성한다.

```javascript
var mongoose = require('mongoose');

// Define Schemes
var userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
```

Mongoose Schema는 다음의 Data type을 지원한다.

| Data Type  | Description
|:-----------|:------------------------------------
| String     | 표준 자바스크립트와 Node.js의 문자열 type
| Number     | 표준 자바스크립트와 Node.js의 숫자 type
| Boolean    | 표준 자바스크립트와 Node.js의 불리언 type
| Buffer     | Node.js의 binary type(이미지, PDF, 아카이브 등)
| Date       | ISODate format data type(2016-08-08T12:52:30:009Z)
| Array      | 표준 자바스크립트와 Node.js의 배열 type
| Schema.types.ObjectId | 12byte binary 숫자에 대한 MongoDB 24자리 hex 문자열(501d86090d371bab2c0341c5)
| Schema.types.Mixed    | 모든 유형의 데이터

primary-key인 &#95;id는 insert()나 save() 메서드 호출시 자동으로 추가된다.

- [Mongoose Schema Types](http://mongoosejs.com/docs/schematypes.html)

- [option: timestamps](http://mongoosejs.com/docs/guide.html#timestamps)

## 6.2. Model

model() 메서드에 문자열과 schema를 전달하여 model을 생성한다. model은 보통 대문자로 시작한다.

```javascript
var User = mongoose.model('User', userSchema);
```

첫번째 인자는 해당 collection의 단수적 표현을 나타내는 문자열이다. 실제 collection의 이름은 'Users'로 자동 변환되어 사용된다.

collection의 이름을 명시적으로 지정하고자 할 때는 schema 생성시 option은 지정한다.

```javascript
var userSchema = new mongoose.Schema({..}, { collection: 'data' });
```

model은 생성자이므로 instance를 생성할 수 있는데 이것은 document를 나타낸다. instance 생성시 생성자에 초기값을 전달하거나 instance 생성후 속성과 값을 추가하여 document를 생성한다.

```javascript
var lee = new User({
  name: 'Lee',
  username: 'ung-mo',
  password: '1234',
  ...
}});
```

models/user.js의 마지막 라인에서 model을 생성하고 export한다.

```javascript
...
module.exports = mongoose.model("User", userSchema);
```

[Mongoose Models](http://mongoosejs.com/docs/models.html)

# 7. Statics model methods & Document instance methods

Statics model methods와 Document instance methods는 혼동하기 쉬우므로 주의가 필요하다.

model(위의 경우 User)에서 메서드를 호출하면 Statics model methods가 되고 model의 instance(위의 경우 lee)에서 메서드를 호출하면 Document instance method가 된다.

- [Statics model methods](http://mongoosejs.com/docs/guide.html#statics)

- [Document instance methods](http://mongoosejs.com/docs/api.html#document-js)


<!-- 사용 빈도가 높은 [Statics model methods](http://mongoosejs.com/docs/guide.html#statics)는 아래와 같다.

- [Model.create(doc(s), [callback])](http://mongoosejs.com/docs/api.html#model_Model.create)

- [Model.remove(conditions, [callback])](http://mongoosejs.com/docs/api.html#model_Model.remove)

- [Model.update(conditions, doc, [options], [callback])](http://mongoosejs.com/docs/api.html#model_Model.update)

- [Model.populate(docs, options, [callback(err,doc)])](http://mongoosejs.com/docs/api.html#model_Model.populate)

- [Model.find(conditions, [projection], [options], [callback])](http://mongoosejs.com/docs/api.html#model_Model.find)

- [Model.findById(id, [projection], [options], [callback])](http://mongoosejs.com/docs/api.html#model_Model.findById)

- [Model.findByIdAndRemove(id, [options], [callback])](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove)

- [Model.findByIdAndUpdate(id, [update], [options], [callback])](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate)

- [Model.findOne([conditions], [projection], [options], [callback])](http://mongoosejs.com/docs/api.html#model_Model.findOne)

- [Model.findOneAndRemove(conditions, [options], [callback])](http://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove)

- [Model.findOneAndUpdate([conditions], [update], [options], [callback])](http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate) -->

# 9. Create

save() 메서드를 사용하여 user document를 저장한다.

```javascript
app.post('/api/users', function(req, res) {
  var newUser = new User({
    name     : req.body.name,
    username : req.body.username,
    password : req.body.password,
    admin    : req.body.admin,
    location : req.body.location,
    meta     : {
      age    : req.body.age,
      website: req.body.website
    }
  });

  newUser.save(function(err, doc){
    if(err) return res.status(500).send('save error');
    res.send("User saved successfully: " + doc);
  });
});

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
```

![Save Document](/img/mongoose-save-doc.png)

# 10. Find

## 10.1. Find One

findOne() 메서드를 사용하여 query criteria에 부합하는 첫번째 document를 취득한다.

```javascript
app.get('/api/users/username/:username', function(req, res) {
  User.findOne({ "username" : req.params.username }, function(err, doc) {
    if(err) return res.status(500).send(err);
    res.send("User findOne successfully:\n" + doc);
  });
});
```

![Find Document](/img/mongoose-findone-doc.png)

## 10.2. Find All

find() 메서드를 사용하여 query criteria에 부합하는 모든 document를 취득한다.

```javascript
app.get('/api/users', function(req, res) {
  User.find({ }, function(err, docs) {
    if(err) return res.status(500).send(err);
    res.send("User findOne successfully:\n" + docs);
  });
});
```

![Find Document](/img/mongoose-find-doc.png)

## 10.3. Find By ID

findById() 메서드를 사용하여 id에 부합하는 document를 취득한다.

```javascript
app.get('/api/users/id/:id', function(req, res) {
  User.findById(req.params.id, function(err, doc) {
    if(err) return res.status(500).send(err);
    res.send("User findById successfully:\n" + doc);
  });
});
```

![Find Document](/img/mongoose-findone-doc.png)
