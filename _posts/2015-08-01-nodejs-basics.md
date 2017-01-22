---
layout: post
title: Node.js - <strong>Basics</strong>
subtitle: 네트워크 애플리케이션을 위한 JavaScript runtime
categories: nodejs
section: nodejs
description: Node.js는 Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임으로 주로 서버 사이드 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다.
---

* TOC
{:toc}

![node-logo](/img/node-logo.png)

# 1. Introduction

Node.js는 [Chrome V8 JavaScript 엔진](https://developers.google.com/v8/)으로 빌드된 JavaScript 런타임으로 주로 서버 사이드 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다.

2009년 발표된 Node.js는 폭발적인 관심을 받아왔고 Node.js를 사용하는 기업수도 대폭 증가했다. 이후 엔터프라이즈 영역에서 기존 Java나 .NET을 Node.js로 대체하려는 검토가 활발히 진행될 것으로 예상된다.

언어로는 자바스크립트를 사용한다. Front-end와 Back-end에서 자바스크립트를 사용할 수 있다는 동형성(isomorphic)은 별도의 언어 학습 시간을 단축시켜 주는 장점을 갖는다.

![Isomorphic-JavaScript](./img/Isomorphic-JavaScript.png)
{: .w-450}

Isomorphic JavaScript
{: .desc-img}

Node.js는 Non-blocking I/O와 단일 스레드 이벤트 루프를 통한 높은 Request 처리 성능을 가지고 있다.

데이터베이스로부터 대량의 데이터를 취득하여 웹페이지에 표시하는 처리의 경우, 일반적으로 데이터베이스 처리에 대기시간(blocking)이 발생하기 때문에 웹페이지 표시가 지연되는 현상이 발생한다.

Non-blocking I/O는 비동기 처리를 실시하므로 데이터베이스 처리와 웹페이지 표시를 별도 진행하여 스트레스없이 웹페이지 표시가 기능하다.

Node.js에는 [Socket.io](./nodejs-socketio)라는 실시간 통신을 실현하는 라이브러리를 사용할 수 있어서 대량의 데이터 처리와 실시간 통신을 구현할 수 기능을 모두 갖추고 있다.

# 2. Install

[http://nodejs.org/](https://nodejs.org/)로 이동한다.

![node-homepage](./img/node-homepage.png)

2017년 1월 20일 현재 최신 버전은 6.9.4이다
{: .desc-img}

LTS(Long Term Supported) 버전은 장기적으로 안정된 지원이 보장되는 버전이다.

![lts-schedule](./img/lts-schedule.png)

LTS Release Schedule ([https://github.com/nodejs/LTS](https://github.com/nodejs/LTS))
{: .desc-img}

Current 버전은 변경이 발생하고 있는 버전으로 안정적이지 않을 수 있다. 따라서 최신의 LTS 버전을 다운로드하도록 한다.

녹색의 "v6.9.4 LTS Recommended For Most Users" 버튼을 클릭하면 사용자의 OS에 가장 적합한 installer를 다운로드 할 수 있다. "others Downloads"를 클릭하면 다음 화면으로 이동한다.

![node-download](./img/node-download.png)

사용자의 OS에 적합한 installer 또는 소스코드를 선택한다.
{: .desc-img}

사용자의 OS에 적합한 installer 또는 소스코드를 선택하여 설치한다. 이때 `npm`도 동시에 설치된다.

설치가 완료되면 다음의 디렉터리에 Node.js가 설치된다. (버전에 따라 설치 경로는 바뀔 수 있다)

- Windows : C:\Program Files (x86)\nodejs\node.exe

- Mac : /usr/local/bin/node

Node.js와 npm의 버전을 출력하여 제대로 설치되었는지 확인한다.

```bash
$ node -v
v6.9.4
$ npm -v
3.10.10
```

npm은 Node.js에 포함되어 있어 Node.js 설치시 자동 설치되므로 별도의 설치가 필요없다. 하지만 Node.js보다 자주 업데이트되므로 최신 버전이 아닐 수 있다. 최신의 npm 버전으로 업데이트하도록 한다. macOS의 경우, sudo를

```bash
$ npm install npm@latest -g
$ npm -v
4.1.1
```

# 3. REPL

REPL(Read Eval Print Loop: 입력 수행 출력 반복)은 Node.js는 물론 대부분의 언어(Java, Python 등)이 제공하는 가상환경으로 간단한 코드를 직접 실행해 결과를 확인해 볼 수 있다. 터미널(윈도우의 경우 커맨드창)에 다음과 명령어를 실행시켜 보자.

```bash
$ node
```  

프롬프트가 >로 변경되면 Node.js 또는 JavaScript 코드를 입력하고 실행시켜 볼 수 있다.

```bash
> 1 * 0
0
> x = 10
10
> console.log('Hello World')
Hello World
undefined
```

Node.js 파일을 실행하려면 node 명령어 뒤에 파일명을 입력한다.

```bash
$ node index.js
```  

CTRL + C 키를 두번 실행하면 REPL을 종료시킨다.

자세한 내용은 [Node.js Documentation : REPL](https://nodejs.org/dist/latest-v6.x/docs/api/repl.html)을 참조하기 바란다.

<!-- # module

브라우저 상에서 동작하는 JavaScript는 script tag로 로드하며 복수의 JavaScript 파일을 로드할 경우 하나의 파일로 merge되며 동일한 유효범위를 갖게 된다.

Node.js는 module 단위로 각 기능을 분할할 수 있다.

module은 파일과 1대1의 대응 관계를 가지며 하나의 모듈은 독자적인 유효범위를 가지게 된다. 그리고 `module.exports` 또는 `exports` 객체를 통해 외부로 공개된다.

함수를 가지는 모듈 foo를 생성해보자.

```javascript
// foo.js
module.exports = function(a, b) {
  return a + b;
};
```

모듈의 로딩은 `require` 함수를 사용한다. 이 함수는 로딩한 모듈의 exports 객체를 반환한다.

위에서 정의한 foo 모듈을 로딩한다.

```javascript
// main.js
var add = require('./foo.js'); // 확장자를 생략할 수 있다 require('./foo')

var result = add(1, 2);
console.log(result); // => 3
```

node 명령어를 사용하여 main.js를 실행하면 3이 출력되는 것을 확인할 수 있다.

```bash
$ node main.js
``` -->

# 4. 모듈화와 npm

## 4.1 모듈화

자바스크립트는 웹페이지에 있어서 보조적인 기능을 수행하기 위해 한정적인 용도로 만들어진 태생적 한계로 다른 언어에 비해 부족한(나쁜) 부분이 있는 것이 사실이다. 그 대표적인 것이 모듈 기능이 없는 것이다.

C언어는 #include, Java는 import 등 대부분의 언어는 모듈 기능을 가지고 있다. 하지만 Client-side JavaScript의 경우, script 태크를 사용하여 외부의 스크립트 파일을 가져올 수는 있지만 파일마다 독립적인 파일 Scope를 갖지 않고 하나의 전역 객체(Global Object)에 바인딩되기 때문에 전역변수가 중복되는 등의 문제가 발생할 수 있다. 이것으로는 모듈화를 구현할 수 없다.

JavaScript를 Client-side에 국한하지 않고 범용적으로 사용하고자 하는 움직임이 생기면서 모듈 기능은 반드시 해결해야하는 핵심 과제가 되었고 이런 상황에서 제안된 것이 [CommonJS](http://www.commonjs.org/)이다. CommonJS는 사양(spec)으로 CommonJS라는 라이브러리가 존재하는 것은 아니다.

Node.js는 사실상 module loading system의 실질적 표준(de facto standard)인 CommonJS를 채택하였고 현재는 독자적인 진화를 거쳐 CommonJS 사양과 100% 동일하지는 않지만 기본적으로 CommonJS 방식을 따르고 있다.

모듈화에 대한 자세한 사항은 다음을 참고하기 바란다.

- [JavaScript 표준을 위한 움직임: CommonJS와 AMD](http://d2.naver.com/helloworld/12864)

## 4.2 npm

[npm(node package manager)](https://www.npmjs.com/)은 자바스크립트 패키지 매니저이다. Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할과 패키지 설치 및 관리를 위한 CLI를 제공한다. 자신이 작성한 패키지를 공개할 수도 있고 필요한 패키지를 검색하여 재사용할 수도 있다.

패키지를 설치할 때에는 `npm install` 명령어 뒤에 설치하고자 하는 패키지 명을 지정한다.

```bash
$ npm install <package>
```

Node.js 환경에서 emoji를 지원하는 [node-emoji](https://www.npmjs.com/package/node-emoji)를 설치해 보자. 먼저 적당한 위치에 프로젝트 디렉터리를 생성하고 프로젝트 디렉터리로 이동한다.

```bash
$ mkdir emoji && cd emoji
```

npm install 명령어로 node-emoji 패키지를 설치한다.

```bash
$ npm install node-emoji
/Users/leeungmo/Desktop/emoji
└─┬ node-emoji@1.5.1
  └── string.prototype.codepointat@0.2.0

npm WARN enoent ENOENT: no such file or directory, open '/Users/leeungmo/Desktop/emoji/package.json'
npm WARN emoji No description
npm WARN emoji No repository field.
npm WARN emoji No README data
npm WARN emoji No license field.
```

node-emoji 패키지가 설치되었다. 설치된 패키지는 프로젝트 디렉터리 내의 Node_modules 디렉터리에 설치된다.

npm install 명령어에는 지역(local)과 전역(global)이라는 두가지 옵션이 존재한다. 전역에 패키지를 설치하려면 `-g` 옵션을 지정한다. 전역에 설치된 패키지는 macOS의 경우 /usr/local/lib/node_modules에 설치되며 윈도우의 경우 c:\Users\%USERNAME%\AppData\Roaming\npm\node_modules에 설치된다. 전역으로 설치된 패키지는 전역에서 참조가 가능하게 된다. 예를 들어 npm의 경우 모든 프로젝트가 사용하기 때문에 지역으로 설치하는 것보다 전역에 설치하는 것이 일반적이다.

node 명령어로 Node.js REPL을 기동시키고 node-emoji를 로드한 후 emoji를 출력해 보자.

```bash
$ node
> var emoji = require('node-emoji').emoji;
undefined
> console.log(emoji.heart);
❤️
undefined
```

하지만 npm install 명령어로 node-emoji 패키지를 설치할 때 package.json을 찾을 수 없었다는 경고가 발생하였다.

Node.js 프로젝트에서는 많은 패키지를 사용하게 되고 패키지의 버전도 빈번하게 업데이트되기 때문에 프로젝트가 의존하고 있는 모듈의 관리가 필요하게 된다. npm은 `package.json` 파일을 통해서 모듈의 의존성을 관리한다. 이미 작성된 package.json은 팀 내에 배포하여 동일한 개발 환경을 빠르게 구축할 수 있는 장점을 가진다.

package.json을 생성하기 위해서는 `npm init` 명령어를 사용한다.

```bash
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (emoji)
```

npm init 명령어를 사용하면 프로젝트에 대한 여러가지 정보를 입력하도록 요구받게 된다. 입력된 정보를 바탕으로 npm은 package.json 파일을 생성한다. 일단 파일로 생성된 package.json을 수정하는 방법이 더 편리할 수 있으므로 `--yes` 옵션으로 디폴트 설정으로 package.json을 생성해 보자.

```bash
$ npm init --yes
Wrote to /Users/leeungmo/Desktop/emoji/package.json:

{
  "name": "emoji",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "node-emoji": "^1.5.1"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

package.json에서 가장 중요한 항목은 `name`과 `version`이다. 이것으로 패키지의 고유성을 판단하게 되기 때문에 생략할 수 없으며 필수로 입력하여야 한다.

`dependencies`에는 해당 프로젝트가 의존하는 패키지들의 이름과 버전을 명시한다. npm install 명령어에 `--save` 옵션을 사용하면 패키지 설치와 함께 package.json의 dependencies에 설치된 패키지와 버전이 기록된다.

```bash
$ npm install <package> --save
```

npm install 명령어에 `--save-exact` 옵션을 지정하면 설치된 버전을 범위 지정없이 기록한다.

npm install 명령어의 패키명 뒤에 \@버전을 추가하면 패키지 버전을 지정할 수 있다.

버전의 기술 방식을 아래와 같다.

| 표기법      | Description                     |
|:--------- |:--------------------------------|
| version   | 명시된 version과 일치         
| >version  | 명시된 version보다 높은 버전
| >=version | 명시된 version과 같거나 높은 버전
| <version  | 명시된 version보다 낮은 버전
| <=version | 명시된 version과 같거나 낮은 버전
| ~version  | 명시된 version과 근사한 버전
| ^version  | 명시된 version과 호환되는 버전

버전에 대한 보다 자세한 사항은 [semver : The semantic versioner for npm](https://docs.npmjs.com/misc/semver)를 참조하기 바란다.

`devDependencies`에는 개발 시에만 사용하는 의존 패키지를 명시한다. 예를 들어 TypeScript와 같은 트랜스파일러는 개발단계에서만 필요하고 배포할 필요는 없으므로 devDependencies에 포함시킨다. npm install 명령어에 `--save-dev` 옵션을 사용하면 패키지 설치와 함께 package.json의 devDependencies에 설치된 패키지와 버전이 기록된다.

```bash
$ npm install <package> --save-dev
```

npm install 명령어를 사용하면 package.json에 명시된 의존 패키지를 한번에 설치할 수 있다.

```bash
$ npm install
```

package.json의 자세한 설명은 [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)을 참조하기 바란다.

`npm help` 명령어를 사용하면 npm CLI 명령어에 대한 설명을 참조할 수 있다.

```bash
$ npm help <command>
```

npm의 명령어에 대한 자세한 설명은 [npm CLI 명령어](https://docs.npmjs.com/#cli)을 참조하기 바란다.

# 5. Node.js 맛보기 : HTTP Server

이번에는 간단한 HTTP Server를 작성해 보자. Node.js는 http 서버 모듈을 내장하고 있어서 아피치와 같은 별도의 웹서버를 설치할 필요가 없다

```javascript
// app.js
var http = require('http'); // 1

http.createServer(function (request, response) { // 2
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World\n');
}).listen(3000); // 3

console.log('Server running at http://127.0.0.1:3000/');
```

1. http 모듈을 로딩하여 변수 http에 할당하였다.

2. 이후 http 모듈의 createServer 메서드에 HTTP request를 처리하여 response를 반환하는 HTTP 서버 애플리케이션으로서의 처리를 정의한 함수를 전달한다.

3. createServer 메서드는 HTTP 서버 객체를 반환한다. 반환된 HTTP 서버 객체의 listen 메서드에 포트번호 3000를 전달하여 서버를 기동시킨다.

위 코드를 실행시키고 브라우저로 http://localhost:3000/ 에 접속하면 Hello World가 출력되는 것을 확인할 수 있다.

```bash
$ node app.js
```

# Reference

* [Node.js](https://nodejs.org/)

* [npm](https://www.npmjs.com/)
