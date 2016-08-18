---
layout: post
title: MongoDB Basics
categories: mongodb
tags: []
---

* TOC
{:toc}

# 1. Introduction

[MongoDB](https://www.mongodb.com/)는 Document-Oriented  [NoSQL](https://ko.wikipedia.org/wiki/NoSQL) 데이터베이스이다. 오픈 소스이며 엔진은 C++로 작성되었다.

MongoDB는 RDMS의 record와 유사한 개념의 ***document*** 라고 하는 JSON objects 형태의 key-value의 쌍으로 이루어진 데이터 구조로 구성된다.

value field에는 다른 document, array, document array가 포함될 수 있다.

```javascript
{
  name: "sue",
  age: 26,
  status: "A",
  groups: ["news", "sports"]
}
```

# 2. 특징

- Schema-less하다. 이는 RDMS처럼 고정 Schema가 존재하지 않는다는 의미로 같은 Collection 내에 있더라도 다른 Schema를 가질 수 있다.

- RDMS와 같은 JOIN이 없어 Table JOIN은 효과적이지 않지만(불가능하지는 않다) CRUD Query는 고속으로 동작한다.

- Scalability(규모 가변성, 확장성)이 우수하며 Sharding(여러 개의 데이터베이스에 데이터를 분할하는 기술) 클러스터 구축도 가능하다.

![mongodb sharding](/img/mongodb-sharding.gif)
{: style="max-width:550px; margin: 20px auto 10px;"}

MongoDB Sharding Clustering
{: style="color:gray; font-size: 80%; text-align: center; margin-top: 5px;"}

# 3. RDMS와 mongodb의 비교

<table>
  <tr>
    <th style="width:220px;">RDBMS</th>
    <th style="width:220px;">MongoDB</th>
  </tr>
  <tr>
    <td>Database</td>
    <td>Database</td>
  </tr>
  <tr>
    <td>Table</td>
    <td>Collection</td>
  </tr>
  <tr>
    <td>Tuple / Row</td>
    <td>Document</td>
  </tr>
  <tr>
    <td>Column</td>
    <td>Key field</td>
  </tr>
  <tr>
    <td>Table Join</td>
    <td>Embedded Documents</td>
  </tr>
  <tr>
    <td>Primary Key</td>
    <td>Primary Key (&#95;id)</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Database Server</th>
  </tr>
  <tr>
    <td style="width:220px;">mysqld</td>
    <td style="width:220px;">mongod</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Database Client</th>
  </tr>
  <tr>
    <td style="width:220px;">mysql</td>
    <td style="width:220px;">mongo</td>
  </tr>
</table>


# 4. install

https://docs.mongodb.com/manual/installation/

기동

# path 설정

home directory 내의 .bash_profile 파일을 확인한다.

```
$ cd  ~
$ ls -al
```

.bash_profile 파일이 없으면 생성한다.

```
$ touch .bash_profile
```

.bash_profile을 텍스트 편집기로 수정한다.

```
$ open -e .bash_profile
```

```
export PATH=<mongodb-install-directory>/bin:$PATH
```

ex) export PATH=/usr/local/bin:$PATH


restart terminal

```
$ mongo -version
MongoDB shell version: 3.2.8
```

# Start MongoDB

Terminal 1

```
$ mongod
MongoDB starting : pid=8459 port=27017 dbpath=/data/db 64-bit host=ungmo2.local

...

waiting for connections on port 27017
```

Terminal 2

```
$ mongo
MongoDB shell version: 3.2.8
connecting to: test
```

# Auto Start MongoDB -> XXXXX

To auto start mongoDB, create a launchd job on Mac.

$ sudo touch /Library/LaunchDaemons/mongodb.plist
$ sudo open -e /Library/LaunchDaemons/mongodb.plist
