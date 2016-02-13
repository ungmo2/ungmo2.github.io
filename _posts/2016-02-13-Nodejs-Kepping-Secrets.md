---
layout: post
title: Node.js에서 비밀 설정 정보(Secrets) 관리
categories: node.js
---

어플리케이션을 개발할 때, 외부에 알려지면 않되는 민감한 정보들를 사용할 때가 있다.  
여기서 말하는 민감한 정보들이란 예를 들면 아래와 같은 것들이다.

- 세션 키
- 데이터베이스 접속을 위한 정보 (host, user, password...)

이런 정보들을 어떤 형태이든 코드내에 포함되어야 하는데 일반적으로 다음과 같은 방법이 사용된다.

- 코드 내에 하드 코딩하기
- 설정파일 사용하기
- command-line에서 argument 요구하기
- 환경변수 사용하기

그럼 각각의 장단점을 알아보자.

# 코드 내에 하드 코딩하기

데이터베이스에 접속하기 위해서는 host, user, password, database명 등의 정보가 필요하다. 물론 이 정보들은 외부에 알려지면 곤란한 정보들이다.

이하는 mysql 연동 모듈인 `node-mysql`의 Introduction에 소개된 예제이다.

```javascript
// tps://github.com/felixge/node-mysql#introduction

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();
```

이것은 모듈의 사용법을 설명하기 위한 단순한 예제이다. 실무에서 코드내에 설정 정보를 그대로 하드 코딩하는 것은 절대로 해서는 안된다.

- 설정 정보가 변경되면 코드를 수정해야 한다. 물론 배포도 다시 해야 한다. 관심사의 분리(Separation of Concerns) 원칙을 적용하여 설정 정보와 코드는 분리되어야 한다.  
- github과 같은 SCM(source code management)를 사용하는 경우, 비밀 정보가 노출되므로 별도의 행위가 필요하다.

# 설정파일 사용하기

다음은 설정 정보를 JSON file에 저장해 두고 `require()`를 사용하여 필요 정보를 get하는 예제이다.

```javascript
var mysql      = require('mysql');
var db_config  = require('./config/db-config.json');

var connection = mysql.createConnection({
  host     : db_config.host,
  user     : db_config.user,
  password : db_config.password,
  database : db_config.database
});
```

```javascript
// db-config.json

{
  "host":"localhost",
  "user":"me",
  "password":"secret",
  "database":"my_db"
}
```

코드 내에 하드 코딩하는 경우의 단점 중 관심사의 분리 문제는 해결되었다. 설정 정보가 코드에서 분리되었을 뿐이므로 SCM을 이용한 배포시에 주의해야 한다.

- .gitignore file에 설정 파일(db-config.json. 해당폴더를 통째로 등록해 두는 것이 더 낮겠다.)을 추가하여 SCM에 저장하지 않는다.  
- 대신 db-config-sample.json과 같은 예제 파일을 등록하고 사용법을 명시한다.

그러나 설정 파일 내부에 비밀 정보가 존재하는 것은 여전히 문제로 남아있고 SCM 배포 시 특정 파일의 배포를 회피해야 하는 번거로움은 그대로이다.

# command-line에서 argument 요구하기

비밀 정보를 보호하는 가장 좋은 방법은 설정 파일에 저장하지 않는 것이다.

[nopt package](https://www.npmjs.com/package/nopt)를 사용하여 command-line에서 설정 정보를 argument로 요구하면 비밀 정보는 파일로 존재하지 않아도 된다.

아래는 `nopt` package를 사용하여 argument로 세션 키를 요구하는 예제이다.

```javascript
// secret-arg.js

var nopt = require("nopt")

var longOpts = {
  "sessionSecret": String,
}

var shortOpts = {
  "s": ["--sessionSecret"],
}

var parsed = nopt(longOpts, shortOpts, process.argv, 2)

console.log("session secret is:", parsed.sessionSecret)
```

```
node secret-arg.js --sessionSecret "keyboard cat"
node secret-arg.js -s "keyboard cat"
```

설정 정보를 하드코딩하거나 설정 파일로 가지고 있는 것보다 비밀정보 노출에 보다 안전해졌다. 그러나 앱을 실행할 때마다 입력해야 할 정보의 양이 많아진 것은 번거로울 수 있다. script를 만들어 해결하려 한다면 설정 정보를 입력해 두면 매번 입력하는 수고를 덜 수 있겠지만 여전히 비밀정보가 script내에 존재하는 문제는 남게 된다.

# 환경변수(environment variable) 사용하기

OSX, Linux에서 환경변수를 설정할 때는 `export`를 사용하면 된다. 예를 들어 SESSION_SECRET key에 값을 설정해 보자

```
export SESSION_SECRET="keyboard cat"
```

Windows에서는 `set`을 사용하면 된다.

```
set SESSION_SECRET="keyboard cat"
```

실행할 때마다 환경변수를 설정할 수도 있다.

```
SESSION_SECRET="keyboard cat" node secret-env.js
```

코드 내에서 환경변수에 접근할 때에는 node.js의 `process.env`를 사용한다.

```javascript
// https://github.com/expressjs/session 참고

var express = require('express')
var session = require('express-session')

var app = express()

app.use(session({secret: process.env.SESSION_SECRET}))
```

앞에서 살펴본 command-line에서 argument 요구하기와 비교하면 `nopt` 패키지를 별도로 사용하지 않아도 된다는 점과 매번 설정 정보를 입력하지 않아도 된다는 것은 좀더 개선된 방법으로 보인다. 여러분의 선택은 무엇인가?


# Reference

[Keeping secrets](https://developer.ibm.com/bluemix/2014/10/14/keeping-secrets-cloud-application-access-credentials-private-data/)
