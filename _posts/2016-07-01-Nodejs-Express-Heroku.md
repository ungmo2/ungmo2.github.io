---
layout: post
title: Deploying Node.js(Express) App to Heroku
categories: [node.js, express]
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


# Git リポジトリの作成とコミット

リポジトリつくって、
ローカルのファイルを全部 Index に追加して、
コメントつけてコミット
という、普通の Git の操作をします。

$ git init
$ git add .
$ git commit -m "initial commit"



# Procfile 작성

Procfile とは、Heroku で必要となる、アプリケーションの起動に関するファイルです。私はこれがないと Heroku での表示で「Web じゃないよ」みたいなエラーになりました。詳しいことは procfile · herokaijp/devcenter Wiki に書かれているようですが、私は理解できませんでした／(^o^)＼

とりあえず動くようにするには、次の一文だけ書いて、ファイル名を「Procfile」とし、プロジェクト直下に置きます。

```
web: node app.js
```

# .gitignore をつくる

プロジェクトのファイルは Git を使って Heroku に Push しますが、node_modules ディレクトリ以下は Heroku 上で展開する（？）ので、ローカルから Push する必要はありません。そのため、.gitignore ファイルをつくってその旨を指定します。

```
node_modules
.DS_Store
```

# package.json に追記

Express で生成された sample/package.json ファイルに、Heroku 用の記述を追加します。これを書かないと Heroku に Push したときにエラーになるので注意！（はい、ハマりました。）

Express で生成された状態では、"dependencies" の記述はありますが、"engines" の記述がありません。そのため下記のように、"dependencies" のあとに "engines" を追加して、Node.js と npm のバージョンを記述します。

```
--- 省略 ---
"dependencies": {
  "express": "4.14.0"
},
"engines": {
  "node": "6.4.0",
  "npm":  "3.10.3"
}
--- 省略 ---
```


# Reference

* [The MongoDB 3.2 Manual](https://docs.mongodb.com/manual/)

* [SQL to MongoDB Mapping Chart](https://docs.mongodb.com/manual/reference/sql-comparison/)

* [Robomongo](https://robomongo.org/)
