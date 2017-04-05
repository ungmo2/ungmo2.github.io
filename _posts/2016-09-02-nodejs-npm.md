---
layout: post
title: Node.js - <strong>npm</strong>
subtitle: 모듈화와 npm(node package manager)
categories: nodejs
section: nodejs
description: npm(node package manager)은 자바스크립트 패키지 매니저이다. Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할과 패키지 설치 및 관리를 위한 CLI를 제공한다. 자신이 작성한 패키지를 공개할 수도 있고 필요한 패키지를 검색하여 재사용할 수도 있다. 패키지를 설치할 때에는 `npm install` 명령어 뒤에 설치하고자 하는 패키지 명을 지정한다.
---

* TOC
{:toc}

![node-npm](/img/node-npm.png)

# 1. 모듈화와 CommonJS

모듈이란 어플리케이션을 구성하는 개별적 요소를 말한다. 일반적으로 파일 단위로 분리되어 있으며 필요에 따라 어플리케이션은 명시적으로 모듈을 로드한다. 모듈은 어플리케이션에 분리되어 개별적으로 존재하다가 어플리케이션의 로드에 의해 비로소 어플리케이션의 일원이 된다. 모듈은 기능별로 분리되어 작성되므로 개발효율성과 유지보수성의 향상을 기대할 수 있다.

자바스크립트는 웹페이지에 있어서 보조적인 기능을 수행하기 위해 한정적인 용도로 만들어진 태생적 한계로 다른 언어에 비해 부족한(나쁜) 부분이 있는 것이 사실이다. 그 대표적인 것이 모듈 기능이 없는 것이다.

C언어는 #include, Java는 import 등 대부분의 언어는 모듈 기능을 가지고 있다. 하지만 Client-side JavaScript의 경우, script 태그를 사용하여 외부의 스크립트 파일을 가져올 수는 있지만 파일마다 독립적인 파일 Scope를 갖지 않고 하나의 전역 객체(Global Object)에 바인딩되기 때문에 전역변수가 중복되는 등의 문제가 발생할 수 있다. 이것으로는 모듈화를 구현할 수 없다.

JavaScript를 Client-side에 국한하지 않고 범용적으로 사용하고자 하는 움직임이 생기면서 모듈 기능은 반드시 해결해야하는 핵심 과제가 되었고 이런 상황에서 제안된 것이 [CommonJS](http://www.commonjs.org/)와 [AMD(Asynchronous Module Definition)](https://github.com/amdjs/amdjs-api/wiki/AMD)이다.

CommonJS과 AMD는 사양(spec)으로 CommonJS 또는 AMD라는 라이브러리가 존재하는 것은 아니다.

CommonJS 방식은 AMD에 비해 문법이 간단하며 동기 방식(synchronous loading)으로 동작한다.

AMD 방식은 CommonJS에 비해 문법이 다소 까다로우며 CommonJS와는 달리 비동기 방식(asynchronous loading)으로 동작한다. AMD 방식을 지원하는 대표적인 모듈 로더는 [RequireJS](http://requirejs.org/)이다.

Node.js는 사실상 모듈 시스템의 사실상 표준(de facto standard)인 CommonJS를 채택하였고 현재는 독자적인 진화를 거쳐 CommonJS 사양과 100% 동일하지는 않지만 기본적으로 CommonJS 방식을 따르고 있다. Node.js에서 모듈의 사용 방법에 대해서는 [Node.js module](./nodejs-module)을 참고하기 바란다.

브라우저에서의 모듈 사용은 대부분의 브라우저가 ES6의 모듈을 지원하지 않고 있으므로 [Browserify](http://browserify.org/) 또는 [webpack](https://webpack.github.io/)과 같은 모듈 번들러를 사용하여야 한다.

모듈화에 대한 자세한 사항은 [JavaScript 표준을 위한 움직임: CommonJS와 AMD](http://d2.naver.com/helloworld/12864)에 잘 정리되어 있다.

# 2. npm

[npm(node package manager)](https://www.npmjs.com/)은 자바스크립트 패키지 매니저이다. Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할과 패키지 설치 및 관리를 위한 CLI(Command line interface)를 제공한다. 자신이 작성한 패키지를 공개할 수도 있고 필요한 패키지를 검색하여 재사용할 수도 있다.

패키지를 설치할 때에는 `npm install` 명령어 뒤에 설치할 패키지 이름을 지정한다.

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

경고가 발생하였으나 node-emoji 패키지는 잘 설치되었다. 경고에 대해서는 잠시후 설명한다.

npm install 명령어에는 지역(local) 설치와 전역(global) 설치 옵션이 존재한다.

옵션을 별도로 지정하지 않으면 지역으로 설치되며 프로젝트 디렉터리 내에 node_modules 디렉터리가 자동 생성되고 그안에 설치한 패키지가 설치된다. 지역으로 설치된 패키지는 해당 프로젝트 내에서만 사용할 수 있다.

전역에 패키지를 설치하려면 `-g` 옵션을 지정한다. 전역으로 설치된 패키지는 전역에서 참조가 가능하게 된다. 예를 들어 npm의 경우 모든 프로젝트가 사용하기 때문에 지역으로 설치하는 것보다 전역에 설치하는 것이 일반적이다.

전역에 설치된 패키지는 OS에 따라 설치 장소가 다르다.
- macOS의 경우  
: /usr/local/lib/node_modules
- 윈도우의 경우  
: c:\Users\%USERNAME%\AppData\Roaming\npm\node_modules

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

```bash
...
npm WARN enoent ENOENT: no such file or directory, open '/Users/leeungmo/Desktop/emoji/package.json'
...
```

Node.js 프로젝트에서는 많은 의존 패키지를 사용하게 되고 패키지의 버전도 빈번하게 업데이트되기 때문에 프로젝트가 의존하고 있는 패키지의 관리가 필요하다. npm은 `package.json` 파일을 통해서 프로젝트 정보와 패키지의 의존성(dependency)을 관리한다. 이미 작성된 package.json은 팀 내에 배포하여 동일한 개발 환경을 빠르게 구축할 수 있는 장점을 가진다. package.json은 Java의 maven에서 pom.xml와 비슷한 역할을 한다.

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

npm init 명령어를 사용하면 프로젝트에 대한 여러가지 정보를 입력하도록 요구받게 된다. 입력된 정보를 바탕으로 npm은 package.json 파일을 생성한다. 일단 파일로 생성된 package.json을 수정하는 방법이 더 편리할 수 있으므로 `--yes` 또는 `-y` 옵션으로 디폴트 설정으로 package.json을 생성해 보자.

```bash
$ npm init -y
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
$ npm install node-emoji --save
```

npm install 명령어에 `--save-exact` 옵션을 지정하면 설치된 버전을 범위 지정없이 기록한다.

npm install 명령어의 패키명 뒤에 \@버전을 추가하면 패키지 버전을 지정할 수 있다.

```bash
$ npm install node-emoji@1.5.1 --save
```

npm은 semantic versioning(유의적 버전)을 지원한다. 버전 정보는 메이저 버전 번호, 마이너 버전 번호, 패치 버전 번호로 구성된다.

![sementic-versioning](./img/sementic-versioning.png)

semantic versioning(유의적 버전)
{: .desc-img}

버전 정보 앞에는 기호를 부여하여 업데이트 범위를 지정할 수 있다. 기술 방식은 아래와 같다.

| 표기법      | Description                     |
|:--------- |:--------------------------------|
| version   | 명시된 version과 일치         
| >version  | 명시된 version보다 높은 버전
| >=version | 명시된 version과 같거나 높은 버전
| <version  | 명시된 version보다 낮은 버전
| <=version | 명시된 version과 같거나 낮은 버전
| ~version  | 명시된 version과 근사한 버전
| ^version  | 명시된 version과 호환되는 버전

`~(틸트)`와 `^(캐럿)`의 차이는 아래와 같다.

~(틸트)는 패치 버전 범위 내에서 업데이트한다.
:  
  - ~0.0.1 : 0.0.1 <= version < 0.1.0
  - ~0.1.1 : 0.1.1 <= version < 0.2.0

^(캐럿)는 마이너 버전 범위 내에서 업데이트한다.
:  
  - ^0.1.2 : 0.1.2 <= version < 0.2.0
  - ^1.0.2 : 1.0.2 <= version < 2.0

[npm semver calculator](https://semver.npmjs.com/)에 방문하면 패키지 별로 버전 표기법을 사용하여 업데이트 버전 범위를 확인할 수 있다.

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

# Reference

* [CommonJS](http://www.commonjs.org/)

* [npm](https://www.npmjs.com/)

* [package.json](https://docs.npmjs.com/files/package.json)

* [npm CLI 명령어](https://docs.npmjs.com/#cli)

* [ES Modules와 Node.js: 쉽지 않은 선택](https://nodejs.github.io/nodejs-ko/articles/2016/06/09/es-modules-and-node-js-hard-choices/)
