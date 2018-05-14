---
layout: post
title: MongoDB Shell - <strong>CRUD</strong>
subtitle: MongoDB Shell method를 사용한 CRUD의 기본
categories: mongodb
section: mongodb
description: MongoDB Shell method를 사용한 CRUD의 기본
---

* TOC
{:toc}

![MongoDB Logo](/img/mongo-db-logo.png)

MongoDB Shell을 사용하여 CRUD의 기본을 알아본다.

MongoDB Shell은 JavaScript 실행 환경을 가지고 있어 JavaScript의 실행이 가능하다.

```bash
> for(var i = 0; i < 3 ; i++) { print("i = " + i); }
i=0
i=1
i=2
```

# 1. Create

`use <database_name>` shell method를 사용하여 database를 생성한다.

만약 동일한 이름의 Database가 존재할 경우, 그 database를 사용하며 존재하지 않을 경우, database를 생성한다.

```bash
> use mongo-example
switched to db mongo-example
```

`db` shell method를 사용하여 현재 사용중인 database를 확인한다.

```bash
> db
mongo-example
```

`show dbs` shell method를 사용하여 데이터베이스 리스트를 확인한다.

```bash
> show dbs
local             0.000GB
```

이 시점에서 mongo-example database는 아직 생성되지 않았다. 최소 한 개 이상의 document를 추가하여야 database가 생성된다.

`insert()` 메소드를 사용하여 collection에 document를 insert한다. 이때 collection books도 생성된다.

```javascript
db.collection.insert(
  <document or array of documents>,
  {
    writeConcern: <document>,
    ordered: <boolean>
  }
)
```

| Parameter    | Type              | Description
|:-------------|:------------------|:----------------------------------------
| document     | document or array | collection에 insert할 document 또는 document의 array이다.
| writeConcern | document          | Option. database에 write(insert, update, remove) 처리를 영속화시키기 위한 설정이다. 기본 설정을 사용하려면 이 설정을 생략한다. 자세한 내용은 [Write Concern](https://docs.mongodb.com/manual/reference/write-concern/)을 참조하기 바란다.
| ordered      | boolean           | Option(Defaults: true). true로 설정하면 document array의 인덱스 순으로 insert한다. 처리중 에러가 발생하면 에러가 발생된 document 이후의 처리는 진행되지 않는다.


```bash
> db.books.insert({ title: "Example1", author: "Lee", price: 100 })
WriteResult({ "nInserted" : 1 })
```

한번에 여러 개의 document를 insert할 수 있다.

```bash
> db.books.insert([
  { title: "Example2", author: "Lee", price: 200 },
  { title: "Example3", author: "Lee", price: 300 },
  { title: "Example4", author: "Lee", price: 400 }
  ])
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 3,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

MongoDB는 Schema-less하므로 동일한 Collection 내에 있더라도 document level의 다른 Schema를 가질 수 있다.

```bash
> db.books.insert({ title: "Example5", author: "Lee", price: 200, stock: 0 })
WriteResult({ "nInserted" : 1 })
```

database list를 확인하면 mongo-example database가 생성된 것을 확인할 수 있다.

```bash
> show dbs
local             0.000GB
mongo-example     0.000GB
```

collection list를 확인하려면 아래 shell method를 실행한다.

```bash
> show collections
books
```

또는 getCollectionNames() 메소드를 사용한다.

```bash
> db.getCollectionNames()
[ "books" ]
```

# 2. Read

`find()` 메소드를 사용하여 collection 내의 document를 select한다.

```bash
db.collection.find(query, projection)
```

| Parameter  | Type     | Description
|:-----------|:---------|:--------------------------------
| query      | document | Option. document selection criteria(기준)이다. criteria 없이 collect 내의 모든 document를 select하는 경우에는 생략하거나 { }를 전달한다. SQL의 WHERE절과 유사하다.
| projection | document | Option. document select 결과에 포함될 field이다.

다음 예제는 books collection 내의 모든 document를 select한다.

```bash
> db.books.find()
{ "_id" : ObjectId("57bd5f2e414be2f9e2b81770"), "title" : "Example1", "author" : "Lee", "price" : 100 }
{ "_id" : ObjectId("57bd5f34414be2f9e2b81771"), "title" : "Example2", "author" : "Lee", "price" : 200 }
{ "_id" : ObjectId("57bd5f34414be2f9e2b81772"), "title" : "Example3", "author" : "Lee", "price" : 300 }
{ "_id" : ObjectId("57bd5f34414be2f9e2b81773"), "title" : "Example4", "author" : "Lee", "price" : 400 }
{ "_id" : ObjectId("57bd5f3b414be2f9e2b81774"), "title" : "Example5", "author" : "Lee", "price" : 200, "stock" : 0 }
```

`pretty()`를 사용하면 return data를 format에 맞게 출력한다.

```bash
> db.books.find().pretty()
{
  "_id" : ObjectId("57bd5f2e414be2f9e2b81770"),
  "title" : "Example1",
  "author" : "Lee",
  "price" : 100
}
{
  "_id" : ObjectId("57bd5f34414be2f9e2b81771"),
  "title" : "Example2",
  "author" : "Lee",
  "price" : 200
}
{
  "_id" : ObjectId("57bd5f34414be2f9e2b81772"),
  "title" : "Example3",
  "author" : "Lee",
  "price" : 300
}
{
  "_id" : ObjectId("57bd5f34414be2f9e2b81773"),
  "title" : "Example4",
  "author" : "Lee",
  "price" : 400
}
{
  "_id" : ObjectId("57bd5f3b414be2f9e2b81774"),
  "title" : "Example5",
  "author" : "Lee",
  "price" : 200,
  "stock" : 0
}
```

별도 지정하지 않은 &#95;id field가 추가되었다. 모든 document는 unique한 &#95;id field를 갖는다.

select할 field를 지정할 수 있다. &#95;id는 지정하지 않아도 출력에 포함되므로 select할 field에 포함시키지 않을 경우에는 projection의 해당 field의 value에 0을 지정하여 명시적으로 배제하여야 한다.

```bash
> db.books.find({ }, { _id: 0, title: 1 })
{ "title" : "MongoDB Example" }
{ "title" : "Example1" }
{ "title" : "Example2" }
{ "title" : "Example3" }
```

SQL SELECT 구문과 find() 구문을 비교하면 다음과 같다.

```sql
SELECT id, title, author
FROM books
```

```bash
db.users.find(
  { },
  { title: 1, author: 1 }
)
```

```sql
SELECT title, author
FROM books
```

```bash
db.users.find(
  { },
  { _id: 0, title: 1, author: 1 }
)
```

```sql
SELECT title, author
FROM books
WHERE price = 200
```

```bash
db.books.find(
  { price: 200 },
  { title: 1, author: 1, _id: 0 }
)
```

projection를 생략하면 모든 field가 선택된다. 다음은 price가 100 보다 크고(100 미포함) 400보다 작은(400 포함) document를 select한다.


```sql
SELECT *
FROM books
WHERE price > 100
AND   price <= 400
```

```bash
db.books.find(
  { price: { $gt: 100, $lte: 400 } }
)
```

`$gt`는 greater than을 의미하는 [MongoDB Query operator](https://docs.mongodb.com/manual/reference/operator/query/)이다.

Query operator(쿼리 연산자)에는 비교(Comparison), 논리(Logical), 요소(Element), 평가(Evaluation), 배열(Array) 등이 있다.

그 중 사용 빈도가 높은 연산자에 대해 알아본다.

**비교(Comparison) 연산자**

| Operator  | Meaning             | Description
|:----------|:--------------------|:------------------------------------
| $eq       | equals              | 지정 값과 일치하는 값
| $gt	      | greater than        | 지정 값보다 큰 값
| $gte      | greater than or equals | 지정 값보다 크거나 같은 값
| $lt       | less than           | 지정 값보다 작은 값
| $lte      | less than or equals | 지정 값보다 작거나 같은 값
| $ne       | not equal           | 지정 값과 일치하지 않는 값
| $in       | in an array         | 지정 배열 안에 속하는 값
| $nin      | none in an array    | 지정 배열 안에 속하지 않는 값

다음은 price가 200보다 크고 400보다 작거나 같은 document를 select한다.

```bash
db.books.find(
  { price: { $gt: 200, $lte: 400 } }
)
```

**논리 연산자**

| Operator  | Description
|:----------|:------------------------------------
| $or	      | 지정 조건중 하나라도 true이면 true
| $and	    | 모든 지정 조건이 true이면 true
| $not	    | 지정 조건이 false이면 true, true이면 false
| $nor	    | 모든 지정 조건이 false이면 true

다음은 price가 200보다 작거나 stock이 0인 document를 select한다.

```bash
db.books.find(
  { $or: [ { price: { $lt: 200 } }, { stock: 0 } ] }
)
```

정규표현식을 사용할 수 있다. 다음은 title이 /Example[1-2]/에 일치하는 document를 select한다.

```bash
db.books.find(
  { title : /Example[1-2]/ }
)
```

# 3. Update

`update()` 메소드를 사용하여 collection 내의 document를 update한다.

```bash
db.<collection_name>.update(
  <query>,
  <update>,
  {
    upsert: <boolean>,
    multi: <boolean>,
    writeConcern: <document>
  }
)
```

| Parameter    | Type     | Description
|:-------------|:---------|:----------------------------------------
| query        | document | update를 위한 selection criteria(기준)이다. find()의 query와 같다. SQL의 WHERE절과 유사하다.
| update       | document | document에 update할 수정 사항이다.
| upsert       | boolean  | Option(Default: false) true로 설정하면 query criteria에 매칭하는 document가 없을 경우 새로운 document를 insert한다. false로 설정하면 insert하지 않는다.
| multi        | boolean  | Option(Default: false) true로 설정하면 query criteria에 매칭하는 document 모두를 update한다. false로 설정하면 하나의 document만 update한다.
| writeConcern | document | Option. database에 write(insert, update, remove) 처리를 영속화시키기 위한 설정이다. 기본 설정을 사용하려면 이 설정을 생략한다. 자세한 내용은 [Write Concern](https://docs.mongodb.com/manual/reference/write-concern/)을 참조하기 바란다.


```sql
UPDATE books
SET author = "Kim"
WHERE price > 200
```

```bash
db.books.update(
  { price: { $gt: 200 } },
  { $set: { author: "Kim" } },
  { multi: true }
)
```

`$set`는 SQL의 SET을 의미하는 [MongoDB Update field operator](https://docs.mongodb.com/manual/reference/operator/update-field/)이다.

| Operator     | Description
|:-------------|:------------------------------------
| $inc         | field의 value를 지정한 수만큼 증가시킨다.
| $rename      | field 이름을 rename한다.
| $setOnInsert | update()의 upsert가 true로 설정되었을 경우, document가 insert될 때의 field value를 설정한다.
| $set         | update할 field의 value를 설정한다.
| $unset       | document에서 설정된 field를 삭제한다
| $min         | 설정값이 field value보다 작은 경우만 update한다.
| $max         | 설정값이 field value보다 큰 경우만 update한다.
| $currentDate | 현재 시간을 설정한다

다음은 author가 "Kim"인 document의 price field value를 -50 증가시킨다(즉 50 감소시킨다). 이때 multi를 생략하였으므로 query criteria에 매칭되는 document 중 첫번째만 update된다.

```bash
db.books.update(
  { author: "Kim" },
  { $inc: { price: -50 } }
)
```

다음은 모든 document의 field name을 "ttle"에서 "title"로 rename한다. 새로운 collection test에 테스트용 document를 insert한다.

```bash
db.test.insert([
  { ttle: "Example1", author: "Lee", price: 200 },
  { ttle: "Example2", author: "Lee", price: 300 },
  { ttle: "Example3", author: "Lee", price: 400 }
])

db.test.update(
  {},
  { $rename: { "ttle": "title" } },
  { multi: true }
)
```

다음은 author가 "Park"인 document의 title을 "Example4"로 update한다. 이때 query criteria({ author: "Park" })에 매칭되는 document가 없으면 upsert: true에 의해 새로운 document가 insert된다.

$set value에는 { title: "Example4" }만 설정되어 있으나 query criteria { author: "Park" }과 $setOnInsert value { price: 100 }도 더불어 insert된다.

```bash
db.test.update(
  { author: "Park" },
  {
    $set: { title: "Example4" },
    $setOnInsert: { price: 100 } // set default value
  },
  { upsert: true }
)
```

위 처리의 결과 아래의 document가 insert된다.

```bash
{
  "_id" : ObjectId("57b841d16a73151e5d98f3c9"),
  "author" : "Park",
  "title" : "Example4",
  "price" : 100
}
```

다음은 test collection의 첫번째 document의 author, price field를 삭제한다.

```bash
db.test.update(
  { },
  { $unset: { author: "", price: 0 } }
)
```

다음은 dateEntered field value와 $min의 value로 설정한 dateEntered field value(설정값)를 비교하여 설정값이 field value보다 작은 경우 설정값으로 field value를 update한다.

```bash
db.test.drop()

db.test.insert([
  { "title": "Example1", price: 100, dateEntered: new Date(Date.now()) },
  { "title": "Example2", price: 200, dateEntered: new Date(Date.now()) }
])

db.test.update(
  {  },
  { $min: { dateEntered: new Date("2016-07-01") } }
)
```

상기 처리의 결과로 document는 아래와 같이 update된다.

```bash
// update 전
{
  "_id" : ObjectId("57b85d77370997928bbee569"),
  "title" : "Example1",
  "price" : 100,
  "dateEntered" : ISODate("2016-08-20T13:39:03.880Z")
}
{
  "_id" : ObjectId("57b85d77370997928bbee56a"),
  "title" : "Example2",
  "price" : 200,
  "dateEntered" : ISODate("2016-08-20T13:39:03.880Z")
}
```

```bash
// update 후
{
  "_id" : ObjectId("57b85d77370997928bbee569"),
  "title" : "Example1",
  "price" : 100,
  "dateEntered" : ISODate("2016-07-01T00:00:00Z")
}
{
  "_id" : ObjectId("57b85d77370997928bbee56a"),
  "title" : "Example2",
  "price" : 200,
  "dateEntered" : ISODate("2016-08-20T13:39:03.880Z")
}
```


# 4. Delete

**Document의 삭제**

```bash
db.collection.remove(
  <query>,
  {
    justOne: <boolean>,
    writeConcern: <document>
  }
)
```

| Parameter    | Type     | Description
|:-------------|:---------|:----------------------------------------
| query        | document | deletion criteria(기준)이다. collection 내의 모든 document를 삭제할 경우, {}를 전달한다.
| justOne      | boolean  | Option(Default: false) true로 설정하면 하나의 document만 삭제한다. 생략하면 deletion criteria에 매칭하는 document 모두를 삭제한다.
| writeConcern | document | Option. database에 write(insert, update, remove) 처리를 영속화시키기 위한 설정이다. 기본 설정을 사용하려면 이 설정을 생략한다. 자세한 내용은 [Write Concern](https://docs.mongodb.com/manual/reference/write-concern/)을 참조하기 바란다.


다음은 price가 200보다 큰 모든 document를 삭제한다.

```bash
db.books.remove(
  { price: { $gt: 200 } }
)
```

다음은 books collection의 모든 document를 삭제한다.

```bash
db.books.remove( { } )
```

**Collection의 삭제**

```bash
db.books.drop()
```

**Database의 삭제**

```bash
use mongodb_example
db.dropDatabase();
```


# Reference

* [The MongoDB 3.2 Manual](https://docs.mongodb.com/manual/)

* [MongoDB Shell Quick Reference](https://docs.mongodb.com/manual/reference/mongo-shell/)

* [MongoDB CRUD Operations](https://docs.mongodb.com/manual/crud/)

* [SQL to MongoDB Mapping Chart](https://docs.mongodb.com/manual/reference/sql-comparison/)

* [Robomongo](https://robomongo.org/)
