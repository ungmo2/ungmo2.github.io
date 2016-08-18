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

## 4.1 Windows

**1. download & install**

[MongoDB download](https://www.mongodb.com/download-center?jmp=homepage#community)에서 자신의 사양에 맞는 버전을 다운로드한다.

설치가 완료되면 CMD 창을 열고 MongoDB가 설치된 디렉터리로 이동한다. 설치 디렉터리를 별도 지정하지 않았다면 `C:\Program Files\MongoDB\Server\3.2\bin\`에 설치된다.

```
cd C:\Program Files\MongoDB\Server\3.2\bin
```

**2. 기본 데이터베이스 디렉터리 생성**

기본 데이터베이스 디렉터리(C:\\data\\db)를 생성한다.

```
mkdir C:\data\db
mkdir C:\mongodb\log
```

**3. 환경설정 파일 생성**

mongod.cfg 환경설정 파일을 생성하여 C:\\mongodb 내에 저장한다.

```
##Which IP address(es) mongod should bind to.
bind_ip = 127.0.0.1

##Which port mongod should bind to.
port = 27017

##I set this to true, so that only critical events and errors are logged.
quiet = true

##store data here
dbpath=C:\data\db

##The path to the log file to which mongod should write its log messages.
logpath=C:\mongodb\log\mongo.log

##I set this to true so that the log is not overwritten upon restart of mongod.
logappend = true

##log read and write operations
diaglog=3

##It ensures write durability and data consistency much as any journaling scheme would be expected to do.
##Only set this to false if you don’t really care about your data (or more so, the loss of it).
journal = true
```

**3. DB 기동**

mongodb 서버를 실행한다.

```
mongod.exe --config d:\mongodb\mongo.config
```


```
Microsoft Windows [Version 10.0.10586]
(c) 2015 Microsoft Corporation. All rights reserved.

C:\Users\grace2us>cd "C:\Program Files\MongoDB\Server\3.2\bin"

C:\Program Files\MongoDB\Server\3.2\bin>dir
 C 드라이브의 볼륨에는 이름이 없습니다.
 볼륨 일련 번호: A470-9C67

 C:\Program Files\MongoDB\Server\3.2\bin 디렉터리

2016-08-18  오후 03:04    <DIR>          .
2016-08-18  오후 03:04    <DIR>          ..
2016-08-16  오후 05:29         4,380,672 bsondump.exe
2016-08-16  오후 05:33         7,741,440 mongo.exe
2016-08-16  오후 05:37        14,070,272 mongod.exe
2016-08-16  오후 05:38       153,481,216 mongod.pdb
2016-08-16  오후 05:30         9,457,152 mongodump.exe
2016-08-16  오후 05:29         5,873,152 mongoexport.exe
2016-08-16  오후 05:29         5,734,400 mongofiles.exe
2016-08-16  오후 05:29         5,974,528 mongoimport.exe
2016-08-16  오후 05:30         5,490,688 mongooplog.exe
2016-08-16  오후 05:38        11,912,704 mongoperf.exe
2016-08-16  오후 05:29        13,778,944 mongorestore.exe
2016-08-16  오후 05:37         6,254,592 mongos.exe
2016-08-16  오후 05:37        85,504,000 mongos.pdb
2016-08-16  오후 05:29         5,724,160 mongostat.exe
2016-08-16  오후 05:30         5,561,344 mongotop.exe
              15개 파일         340,939,264 바이트
               2개 디렉터리  134,826,655,744 바이트 남음

C:\Program Files\MongoDB\Server\3.2\bin>mkdir c:\data\db

C:\Program Files\MongoDB\Server\3.2\bin>mongod
2016-08-18T15:10:14.502+0900 I CONTROL  [main]
2016-08-18T15:10:14.504+0900 W CONTROL  [main] 32-bit servers don't have journaling enabled by default. Please use --journal if you want durability.
2016-08-18T15:10:14.508+0900 I CONTROL  [main]
2016-08-18T15:10:14.716+0900 I CONTROL  [initandlisten] MongoDB starting : pid=8400 port=27017 dbpath=C:\data\db\ 32-bit host=LibraHG
2016-08-18T15:10:14.720+0900 I CONTROL  [initandlisten] targetMinOS: Windows Vista/Windows Server 2008
2016-08-18T15:10:14.724+0900 I CONTROL  [initandlisten] db version v3.2.9
2016-08-18T15:10:14.727+0900 I CONTROL  [initandlisten] git version: 22ec9e93b40c85fc7cae7d56e7d6a02fd811088c
2016-08-18T15:10:14.732+0900 I CONTROL  [initandlisten] allocator: tcmalloc
2016-08-18T15:10:14.736+0900 I CONTROL  [initandlisten] modules: none
2016-08-18T15:10:14.739+0900 I CONTROL  [initandlisten] build environment:
2016-08-18T15:10:14.741+0900 I CONTROL  [initandlisten]     distarch: i386
2016-08-18T15:10:14.743+0900 I CONTROL  [initandlisten]     target_arch: i386
2016-08-18T15:10:14.746+0900 I CONTROL  [initandlisten] options: {}
2016-08-18T15:10:14.861+0900 I STORAGE  [initandlisten] exception in initAndListen: 28663 Cannot start server. The default storage engine 'wiredTiger' is not available with this build of mongod. Please specify a different storage engine explicitly, e.g. --storageEngine=mmapv1., terminating
2016-08-18T15:10:14.865+0900 I CONTROL  [initandlisten] dbexit:  rc: 100
```

<!-- ![mongodb windows install](/img/mongodb-windows-install.png) -->





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
