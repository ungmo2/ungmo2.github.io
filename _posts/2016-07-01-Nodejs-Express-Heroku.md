---
layout: post
title: Deploying Node.js(Express) to Heroku
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
$ git clone https://github.com/heroku/node-js-getting-started.git heroku-express-example
$ cd heroku-express-example
```

# 6. Deploy App

Sample app을 Heroku에 deploy한다. app의 이름을 지정하지 않으면 random한 이름이 자동으로 생성된다.

```
$ heroku create heroku-express-example
Creating ⬢ heroku-express-example... done
https://heroku-express-example.herokuapp.com/ | https://git.heroku.com/heroku-express-example.git
```

이때 .git/config 파일에 아래 내용이 추가된다.

```
[remote "heroku"]
	url = https://git.heroku.com/heroku-express-example.git
	fetch = +refs/heads/*:refs/remotes/heroku/*
```

![heroku create app](/img/heroku-create-app.png)

Sample app을 Heroku로 push한다.

```
$ git push heroku master
Counting objects: 456, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 695 bytes | 0 bytes/s, done.
Total 6 (delta 0), reused 0 (delta 0)
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
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:        
remote:        Resolving node version (latest stable) via semver.io...
remote:        Downloading and installing node 5.11.1...
remote:        Using default npm version: 3.8.6
remote:
remote: -----> Restoring cache
remote:        Skipping cache restore (new runtime signature)
remote:
remote: -----> Building dependencies
remote:        Installing node modules (package.json)
remote:        express-skeletion@0.0.1 /tmp/build_08cf53544f91bec4bcfe881762701b40
remote:        └─┬ express@4.14.0
remote:        ├─┬ accepts@1.3.3
remote:        │ ├─┬ mime-types@2.1.11
remote:        │ │ └── mime-db@1.23.0
remote:        │ └── negotiator@0.6.1
remote:        ├── array-flatten@1.1.1
remote:        ├── content-disposition@0.5.1
remote:        ├── content-type@1.0.2
remote:        ├── cookie@0.3.1
remote:        ├── cookie-signature@1.0.6
remote:        ├─┬ debug@2.2.0
remote:        │ └── ms@0.7.1
remote:        ├── depd@1.1.0
remote:        ├── encodeurl@1.0.1
remote:        ├── escape-html@1.0.3
remote:        ├── etag@1.7.0
remote:        ├─┬ finalhandler@0.5.0
remote:        │ ├── statuses@1.3.0
remote:        │ └── unpipe@1.0.0
remote:        ├── fresh@0.3.0
remote:        ├── merge-descriptors@1.0.1
remote:        ├── methods@1.1.2
remote:        ├─┬ on-finished@2.3.0
remote:        │ └── ee-first@1.1.1
remote:        ├── parseurl@1.3.1
remote:        ├── path-to-regexp@0.1.7
remote:        ├─┬ proxy-addr@1.1.2
remote:        │ ├── forwarded@0.1.0
remote:        │ └── ipaddr.js@1.1.1
remote:        ├── qs@6.2.0
remote:        ├── range-parser@1.2.0
remote:        ├─┬ send@0.14.1
remote:        │ ├── destroy@1.0.4
remote:        │ ├─┬ http-errors@1.5.0
remote:        │ │ ├── inherits@2.0.1
remote:        │ │ └── setprototypeof@1.0.1
remote:        │ └── mime@1.3.4
remote:        ├── serve-static@1.11.1
remote:        ├─┬ type-is@1.6.13
remote:        │ └── media-typer@0.3.0
remote:        ├── utils-merge@1.0.0
remote:        └── vary@1.1.0
remote:        
remote:
remote: -----> Caching build
remote:        Clearing previous node cache
remote:        Saving 2 cacheDirectories (default):
remote:        - node_modules
remote:        - bower_components (nothing to cache)
remote:
remote: -----> Build succeeded!
remote:        └── express@4.14.0
remote:        
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote:
remote: -----> Compressing...
remote:        Done: 12.1M
remote: -----> Launching...
remote:        Released v3
remote:        https://heroku-express-example.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/heroku-express-example.git
 * [new branch]      master -> master
```

app이 deploy되었다. deploy될 때 package.json의 dependency가 자동으로 install된다.

![heroku deploy app](/img/heroku-deploy-app.png)

instance가 동작하고 있지 않으면 다음 명령어로 기동시킨다.

```
$ heroku ps:scale web=1
```

이제 생성된 app이 동작하는 [URL](https://heroku-express-example.herokuapp.com/)으로 방문하여 동작을 확인한다. 또는 아래의 명령어로 방문할 수 있다.

```
$ heroku open
```

![heroku open app](/img/heroku-open-app.png)

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

# 8. local 환경에서의 Code의 수정과 Heroku에의 Deploy

## 8.1 local 환경 구축

local 환경에서 code를 수정하고 local 환경에서 app을 기동하여 수정사항을 확인한 후 Heroku에 수정사항을 반영한다.

local 환경을 구축하기 위하여 pakage.json의 dependency 설정을 사용하여 local 환경에 필요 dependency를 설치한다.

```
$ cd heroku-express-example
$ npm install
```

`heroku local` command를 사용하여 local에서 app을 기동한다.

```
$ heroku local web
[OKAY] Loaded ENV .env File as KEY=VALUE Format
17:15:52 web.1   |  Node app is running on port 5000
```

반듯이 heroku 명령어를 사용해야 하는 것은 아니다. 아래와 같이 일반적인 방법도 가능하다.

```
$ npm start
```

브라우저에서 http://localhost:5000으로 접속하여 local 환경에서 app이 실행되었음을 확인한다.

## 8.2 Code의 수정

code를 수정한다.

[cool-ascii-faces](https://www.npmjs.com/package/cool-ascii-faces)를 install한다.

```
$ npm install --save --save-exact cool-ascii-faces
```

index.js를 아래와 같이 수정한다. ool-ascii-faces를 require하고 /cool 라우트를 추가한다.

```javascript
var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
```

```
$ npm install
$ heroku local web
```

브라우저에서 http://localhost:5000/cool으로 접속하여 local 환경에서 app이 실행되었음을 확인한다.

```
( ⚆ _ ⚆ )
```

## 8.3 Heroku에의 Deploy

먼저 모든 파일을 local git에 추가한다.

```
$ git add .
```

수정사항을 repository에 commit한다.

```
$ git commit -m "Demo"
```

heroku master에 git push한다.

```
$ git push heroku master
```

```
$ git push origin master
```

app을 실행시켜서 정상 작동됨을 확인한다.

```
$ heroku open cool
```

# 9. GitHub Integration

github와 연동하여 heroku에 수정사항을 반영할 수 있다.

Heroku Dashboard > Deploy 탭으로 이동한다.

Deployment method에서 GitHub를 선택한다.

Connect to GitHub에 자신의 github repository를 등록한다.

![Heroku GitHub Integration](/img/heroku-github integration-1.png)

Connect to GitHub의 Search 버튼을 클릭하여 github repository를 등록한 후 Connect 버튼을 클릭한다.

![Heroku GitHub Integration](/img/heroku-github integration-2.png)

Automatic deploys에서 Enable Automatic Deploys 버튼을 클릭한다.

![Heroku GitHub Integration](/img/heroku-github integration-3.png)

이후 code를 GitHub에 push하면 자동으로 Heroku에 deploy가 실행된다.

# 10. Add-on 설치

Logging add-on [Papertrail](https://elements.heroku.com/addons/papertrail)을 설치한다.

```
$ heroku addons:create papertrail
```

```
$ heroku addons

Add-on                                  Plan     Price
──────────────────────────────────────  ───────  ─────
papertrail (papertrail-colorful-87606)  choklad  free
 └─ as PAPERTRAIL

The table above shows add-ons and the attachments to the current app (heroku-express-example) or other apps.
```

```
$ heroku addons:open papertrail
```



# Reference

* [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
