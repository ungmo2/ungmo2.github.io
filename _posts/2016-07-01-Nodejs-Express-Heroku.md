---
layout: post
title: Deploying Node.js(Express) App to Heroku
categories: [node.js]
tags: [node.js, express]
---

* TOC
{:toc}

![Heroku Logo](/img/heroku-logo.png)

# 1. Heroku account 취득

[Heroku](https://www.heroku.com/)에서 sign up을 실시하여 account를 취득한다.

# 2. Node.js & npm install 확인

node.js와 npm, git이 install되어 있어야 한다. install 여부를 확인한다.

```
$ node -v
v6.4.0
$ npm -v
3.10.3
$ git --version
git version 2.6.4 (Apple Git-63)
```

# 3. Install Heroku Toolbelt

Heroku Toolbelt는 Heroku Command Line Interface(CLI)를 제공한다.

[Heroku Toolbelt](https://toolbelt.heroku.com/)에서 자신의 사양에 맞는 toolbelt를 설치한다.

# 4. Login to Heroku

터미널에서 Heroku에 로그인한다.

```
$ heroku login
Enter your Heroku credentials.
Email: ungmo2@gmail.com
Password (typing will be hidden):
Logged in as ungmo2@gmail.com
```

# 5. Prepare sample app

Sample app을 clone한다.

```
$ git clone https://github.com/heroku/node-js-getting-started.git
$ cd node-js-getting-started
```

# 6. Deploy App

Sample app을 Heroku에 deploy한다. app의 이름을 지정하지 않으면 random한 이름이 자동으로 생성된다.

```
$ heroku create heroku-express-example
Creating ⬢ heroku-express-example... done
https://heroku-express-example.herokuapp.com/ | https://git.heroku.com/heroku-express-example.git
```

![heroku create app](/img/heroku-create-app.png)

ode를 Heroku로 push한다.

```
$ git push heroku master
Counting objects: 456, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (353/353), done.
Writing objects: 100% (456/456), 226.22 KiB | 0 bytes/s, done.
Total 456 (delta 69), reused 455 (delta 69)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:        
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NPM_CONFIG_PRODUCTION=true
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:
remote: -----> Installing binaries
remote:        engines.node (package.json):  5.9.1
remote:        engines.npm (package.json):   unspecified (use default)
remote:        
remote:        Downloading and installing node 5.9.1...
remote:        Using default npm version: 3.7.3
remote:
remote: -----> Restoring cache
remote:        Skipping cache restore (new runtime signature)
remote:
remote: -----> Building dependencies
remote:        Installing node modules (package.json)
remote:        node-js-getting-started@0.2.5 /tmp/build_9d5b37e25a8be581c1ec02687f237a83
remote:        ├── ejs@2.4.1
remote:        └─┬ express@4.13.3
remote:        ├─┬ accepts@1.2.13
remote:        │ ├─┬ mime-types@2.1.11
remote:        │ │ └── mime-db@1.23.0
remote:        │ └── negotiator@0.5.3
remote:        ├── array-flatten@1.1.1
remote:        ├── content-disposition@0.5.0
remote:        ├── content-type@1.0.2
remote:        ├── cookie@0.1.3
remote:        ├── cookie-signature@1.0.6
remote:        ├─┬ debug@2.2.0
remote:        │ └── ms@0.7.1
remote:        ├── depd@1.0.1
remote:        ├── escape-html@1.0.2
remote:        ├── etag@1.7.0
remote:        ├─┬ finalhandler@0.4.0
remote:        │ └── unpipe@1.0.0
remote:        ├── fresh@0.3.0
remote:        ├── merge-descriptors@1.0.0
remote:        ├── methods@1.1.2
remote:        ├─┬ on-finished@2.3.0
remote:        │ └── ee-first@1.1.1
remote:        ├── parseurl@1.3.1
remote:        ├── path-to-regexp@0.1.7
remote:        ├─┬ proxy-addr@1.0.10
remote:        │ ├── forwarded@0.1.0
remote:        │ └── ipaddr.js@1.0.5
remote:        ├── qs@4.0.0
remote:        ├── range-parser@1.0.3
remote:        ├─┬ send@0.13.0
remote:        │ ├── destroy@1.0.3
remote:        │ ├─┬ http-errors@1.3.1
remote:        │ │ └── inherits@2.0.1
remote:        │ ├── mime@1.3.4
remote:        │ └── statuses@1.2.1
remote:        ├─┬ serve-static@1.10.3
remote:        │ ├── escape-html@1.0.3
remote:        │ └─┬ send@0.13.2
remote:        │   ├── depd@1.1.0
remote:        │   └── destroy@1.0.4
remote:        ├─┬ type-is@1.6.13
remote:        │ └── media-typer@0.3.0
remote:        ├── utils-merge@1.0.0
remote:        └── vary@1.0.1
remote:        
remote:
remote: -----> Caching build
remote:        Clearing previous node cache
remote:        Saving 2 cacheDirectories (default):
remote:        - node_modules
remote:        - bower_components (nothing to cache)
remote:
remote: -----> Build succeeded!
remote:        ├── ejs@2.4.1
remote:        └── express@4.13.3
remote:        
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote:
remote: -----> Compressing...
remote:        Done: 12M
remote: -----> Launching...
remote:        Released v3
remote:        https://heroku-express-example.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/heroku-express-example.git
 * [new branch]      master -> master
```

app이 deploy되었다. instance가 동작하고 있는지 확인한다.

```
$ heroku ps:scale web=1
```

이제 생성된 app이 동작하는 [URL](https://heroku-express-example.herokuapp.com/)으로 방문하여 동작을 확인한다. 또는 아래의 명령어로 방문할 수 있다.

```
$ heroku open
```

log를 확인하는 방법은 아래와 같다.

```
$ heroku logs --tail
```

# 7. Procfile

루트 디렉터리에 있는 `Procfile`에는 app이 start할 때 실행하여야 하는 동작을 명시적으로 정의한다.

```
web: node index.js
```

web은 process type을 의미한다.



<!-- ************************************************** -->








# 3. Node.js App 생성

deploy할 프로젝트를 생성하다.

```
$ mkdir <project-name>
$ cd <project-name>
$ npm init
$ npm install express --save
```

package.json은 아래와 같다.

```
{
  "name": "express-skeletion",
  "version": "0.0.1",
  "description": "",
  "main": "app.js",
  "dependencies": {
    "express": "4.14.0"
  }
}
```

app.js를 아래와 같이 생성하고 project root directory에 추가한다.

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Express server listening on port 3000!');
});
```

app을 기동하여 http://localhost:3000에 접속하여 Hello World!가 출력되는지 확인한다.

```
$ node app.js
```






# 6. Deploy App

프로젝트 디렉터리로 이동하여 Heroku에 app을 생성한다.

```
$ cd <project-path>
$ heroku create <project-name>
Creating ⬢ heroku-express-example... done
https://heroku-express-example.herokuapp.com/ | https://git.heroku.com/heroku-express-example.git
```

http://<project-name>.herokuapp.com/으로 접속하여 동작여부를 확인한다.





# Reference

* [The MongoDB 3.2 Manual](https://docs.mongodb.com/manual/)

* [SQL to MongoDB Mapping Chart](https://docs.mongodb.com/manual/reference/sql-comparison/)

* [Robomongo](https://robomongo.org/)
