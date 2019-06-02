---
layout: post
title: <strong>Babel</strong>
subtitle: Babel과 Webpack을 이용한 ES6 환경 구축 ①
categories: es6
section: es6
seq: 6
subseq: 13
description: 현재 브라우저는 ES6를 완전하게 지원하지 않는다. ES6+(ES6 이상의 버전)를 사용하여 프로젝트를 진행하려면 ES6+로 작성된 코드를 IE를 포함한 모든 브라우저에서 문제 없이 동작시키기 위한 개발 환경을 구축하는 것이 필요하다. 특히 모듈의 경우, 모듈 로더가 필요하다. 트랜스파일러(Transpiler) [Babel](https://babeljs.io/)과 모듈 번들러(Module bundler) [Webpack](https://webpack.js.org/)을 이용하여 ES6+ 개발환경을 구축하여 보자. 아울러 Webpack을 통해 ES6+ 코드와 Sass를 트랜스파일링하는 방법도 알아볼 것이다. 본 문서에서 사용한 Babel, Webpack, 플러그인의 버전은 아래와 같다.
---

* TOC
{:toc}

![babel-webpack](./img/babel-webpack.png)

현재 브라우저는 ES6를 완전하게 지원하지 않는다.

![es6-browser-support](./img/es6-browser-support.png)

[ECMAScript 6 Browser Support](https://kangax.github.io/compat-table/es6/)
{: .desc-img}

ES6+(ES6 이상의 버전)를 사용하여 프로젝트를 진행하려면 ES6+로 작성된 코드를 IE를 포함한 모든 브라우저에서 문제 없이 동작시키기 위한 개발 환경을 구축하는 것이 필요하다. 특히 모듈의 경우, 모듈 로더가 필요하다.

2019년 5월 현재, 모던 브라우저(Chrome 61, FF 60, SF 10.1, Edge 16 이상)에서 ES6 모듈을 사용할 수 있다. 단, 아래와 같은 이유로 아직까지는 브라우저가 지원하는 ES6 모듈 기능보다는 Webpack 등의 모듈 번들러를 사용하는 것이 일반적이다.

- IE를 포함한 구형 브라우저는 ES6 모듈을 지원하지 않는다.
- 브라우저의 ES6 모듈 기능을 사용하더라도 트랜스파일링이나 번들링이 필요하다.
- 아직 지원하지 않는 기능(Bare import 등)이 있다. ([ECMAScript modules in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/) 참고)
- 점차 해결되고는 있지만 아직 몇가지 이슈가 있다. ([ECMAScript modules in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/) 참고)

트랜스파일러(Transpiler) [Babel](https://babeljs.io/)과 모듈 번들러(Module bundler) [Webpack](https://webpack.js.org/)을 이용하여 ES6+ 개발환경을 구축하여 보자. 아울러 Webpack을 통해 ES6+ 코드와 Sass를 트랜스파일링하는 방법도 알아볼 것이다.

본 문서에서 사용한 Babel, Webpack, 플러그인의 버전은 아래와 같다.

Node.js
: 11.3.1

npm
: 6.9.0

Babel
: - @babel/cli : 7.4.4
- @babel/core : 7.4.5
- @babel/preset-env : 7.4.5
- @babel/plugin-proposal-class-properties :  7.4.4
- @babel/polyfill : 7.2.5

Webpack
: - webpack : 4.29.1
- webpack-cli : 3.2.1

Webpack plug-in: ES6+ ⇒ ES5
: - babel-loader : 8.0.5

Webpack plug-in: Sass ⇒ CSS
: - node-sass : 4.11.0
- style-loader : 0.23.1
- css-loader : 2.1.0
- sass-loader : 7.1.0
- mini-css-extract-plugin : 0.5.0

# 1. Babel

## 1.2 Babel이란?

Babel은 ES6+ 코드를 ES5 이하의 버전으로 트랜스파일링한다.

```javascript
// ES6(Arrow Function) + ES7(Exponentiation operator)
[1, 2, 3].map(n => n ** n);
```

위 코드는 ES6에서 도입된 화살표 함수와 ES7에서 도입된 거듭제곱 연산자를 사용하고 있다. 이 두가지 기능은 IE는 물론이고 구형 브라우저에서 지원하지 않는다. 따라서 IE나 구형 브라우저에서도 동작하는 애플리케이션을 구현하기 위해 ES6+ 코드를 ES5 이하의 버전으로 변환(트랜스파일링)할 필요가 있다. Babel을 사용하면 위 코드를 아래와 같이 ES5 이하의 버전으로 트랜스파일링할 수 있다.

```javascript
// ES5
"use strict";

[1, 2, 3].map(function (n) {
  return Math.pow(n, n);
});
```

## 1.2 Babel CLI 설치

[npm](./nodejs-basics#2-install)을 사용하여 Babel CLI을 설치해 보자. 프로젝트에 따라 설정이 다를 수 있으므로 전역으로 설치하지 말고 로컬로 설치하도록 하자.

```bash
# 프로젝트 폴더 생성
$ mkdir es6-project && cd es6-project
# package.json 생성
$ npm init -y
# babel-core, babel-cli 설치
$ npm install --save-dev @babel/core @babel/cli
```

설치가 완료된 이후 package.json 파일은 아래와 같다. 불필요한 설정은 삭제하였다.

```json
{
  "name": "es6-project",
  "version": "1.0.0",
  "devDependencies": {
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5"
  }
}
```

## 1.3 .babelrc 설정 파일 작성

Babel을 사용하려면 먼저 `@babel/preset-env`을 설치해야 한다. [@babel/preset-env](https://babeljs.io/docs/plugins/preset-env/)은 함께 사용되어야 하는 Babel 플러그인을 모아 둔 것으로 [Babel 프리셋](https://babeljs.io/docs/en/presets)이라고 부른다. Babel이 제공하는 공식 Babel 프리셋(Official Preset)은 아래와 같다.

- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/preset-flow](https://babeljs.io/docs/en/babel-preset-flow)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

@babel/preset-env도 공식 프리셋의 하나이며 필요한 플러그인 들을 프로젝트 지원 환경에 맞춰서 동적으로 결정해 준다. 프로젝트 지원 환경은 [Browserslist](https://github.com/browserslist/browserslist) 형식으로 .browserslistrc 파일에 상세히 설정할 수 있다. 프로젝트 지원 환경 설정 작업을 생략하면 기본값으로 설정된다. 일단은 기본 설정으로 진행하도록 하자.

```bash
# env preset 설치
$ npm install --save-dev @babel/preset-env
```

설치가 완료된 이후 package.json 파일은 아래와 같다.

```json
{
  "name": "es6-project",
  "version": "1.0.0",
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.4.5"
  }
}
```

설치가 완료되었으면 프로젝트 루트에 .babelrc 파일을 생성하고 아래와 같이 작성한다. 지금 설치한 @babel/preset-env을 사용하겠다는 의미이다.

```json
{
  "presets": ["@babel/preset-env"]
}
```

## 1.4 트랜스파일링

Babel을 사용하여 ES6+ 코드를 ES5 이하의 코드로 트랜스파일링하기 위해 [Babel CLI 명령어](https://babeljs.io/docs/usage/cli/)를 사용할 수도 있으나 npm script를 사용하여 트랜스파일링하는 방법에 대해 알아보도록 하자.

package.json 파일에 scripts를 추가한다. 완성된 package.json 파일은 아래와 같다.

```json
{
  "name": "es6-project",
  "version": "1.0.0",
  "scripts": {
    "build": "babel src/js -w -d dist/js"
  },
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.3.1"
  }
}
```

위 npm script는 src/js 폴더(타깃 폴더)에 있는 모든 ES6+ 파일들을 트랜스파일링한 후, 그 결과물을 dist/js 폴더에 저장한다. 사용한 옵션의 의미는 아래와 같다.

-w
: 타깃 폴더에 있는 모든 파일들의 변경을 감지하여 자동으로 트랜스파일한다. (\-\-watch 옵션의 축약형)

-d
: 트랜스파일링된 결과물이 저장될 폴더를 지정한다. (\-\-out-dir 옵션의 축약형)

이제 트랜스파일링을 테스트하기 위해 ES6 파일을 작성해 보자. 프로젝트 루트에 src/js 폴더를 생성한 후 main.js와 lib.js를 추가한다.

```javascript
// src/js/main.js
import { pi, power, Foo } from './lib';

console.log(pi);
console.log(power(pi, pi));
console.log(new Person('Lee'));
```

```javascript
// src/js/lib.js
// src/js/lib.js
export const pi = Math.PI;

export function power(x, y) {
  // ES7: exponentiation operator
  return x ** y;
}

export class Foo {
  // stage 3: Class field declarations proposal
  #private = 10;

  foo() {
    // stage 4: Object Rest/Spread Properties
    const { a, b, ...x } = { ...{ a: 1, b: 2 }, c: 3, d: 4 };
    return { a, b, x };
  }

  bar() {
    return this.#private;
  }
}
```

터미널에서 아래 명령으로 트랜스파일링을 실행한다.

```bash
$ npm run build

> es6-project@1.0.0 build /Users/leeungmo/Desktop/es6-project
> babel src/js -w -d dist/js

SyntaxError: /Users/leeungmo/Desktop/es6-project/src/js/lib.js: Unexpected character '#' (11:2)

   9 | export class Foo {
  10 |   // stage 3: Class field declarations proposal
> 11 |   #private = 10;
     |   ^
  12 |
  13 |   foo() {
  14 |     // stage 4: Object Rest/Spread Properties
...
```

2019년 5월 현재 TC39 프로세스의 stage 3(candidate) 단계에 있는 [Class field declarations proposal](https://github.com/tc39/proposal-class-fields)에서 에러가 발생하였다.

@babel/preset-env는 현재 제안 단계에 있는 사양에 대한 플러그인을 지원하지 않기 때문에 발생한 에러이다. 현재 제안 단계에 있는 사양을 지원하려면 플러그인을 설치하여야 한다.

## 1.5 Babel 플러그인

설치가 필요한 플러그인은 Babel 홈페이지에서 검색할 수 있다. 상단 메뉴의 Search에 프로포절의 이름을 입력하면 해당 플러그인을 검색할 수 있다.

![](/img/babel-plugin-search.png)

검색한 플러그인을 설치해보자.

```bash
$ npm install --save-dev @babel/plugin-proposal-class-properties
```

설치 이후 package.json 파일은 아래와 같다.

```json
{
  "name": "es6-project",
  "version": "1.0.0",
  "scripts": {
    "build": "babel src/js -w -d dist/js"
  },
  "devDependencies": {
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/preset-env": "^7.4.5"
  }
}
```

설치한 플러그인은 .babelrc 파일에 추가해 주어야 한다.

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

다시 터미널에서 아래 명령으로 트랜스파일링을 실행해보자.

```bash
npm run build

> es6-project@1.0.0 build /Users/leeungmo/Desktop/es6-project
> babel src/js -w -d dist/js

Successfully compiled 2 files with Babel.
```

트랜스파일링에 성공하면 프로젝트 루트에 dist/js 폴더가 자동 생성되고 트랜스파일링된 main.js와 lib.js가 저장된다.

트랜스파일링된 main.js를 실행하여 보자. 결과는 아래와 같다.

```bash
$ node dist/js/main
3.141592653589793
36.4621596072079
{ a: 1, b: 2, x: { c: 3, d: 4 } }
10
```

## 1.6 브라우저에서 모듈 로딩 테스트

앞에서 main.js와 lib.js 모듈을 트랜스파일링하여 ES5로 변환된 main.js을 실행한 결과, 문제없이 실행되는 것을 확인하였다. ES6+에서 새롭게 추가된 기능은 물론 현재 제안 상태에 있는 사양도 ES5로 트랜스파일링된 것은 물론 ES6의 모듈의 import와 export 키워드도 트랜스파일링되어 모듈 기능도 정상적으로 동작하는 것을 확인하였다.

하지만 모듈 기능은 node.js 환경에서 동작한 것이고 Babel이 모듈을 트랜스파일링한 것도 node.js가 기본 지원하는 CommonJS 방식의 module loading system에 따른 것이다. 아래는 src/js/main.js가 Babel에 의해 트랜스파일링된 결과이다.

```javascript
// dist/js/main.js
"use strict";

var _lib = require("./lib");

console.log(_lib.pi);
console.log((0, _lib.power)(_lib.pi, _lib.pi));
var f = new _lib.Foo();
console.log(f.foo());
console.log(f.bar());
```

브라우저는 CommonJS 방식의 module loading system(require 함수)을 지원하지 않으므로 위에서 트랜스파일링된 결과를 그대로 브라우저에서 실행하면 에러가 발생한다.

트랜스파일링된 자바스크립트 파일을 브라우저에서 실행해보자.

```html
<!DOCTYPE html>
<html>
<body>
  <script src="dist/js/lib.js"></script>
  <script src="dist/js/main.js"></script>
</body>
</html>
```

위 html 파일을 브라우저 실행하면 아래와 같은 에러가 발생한다.

```
Uncaught ReferenceError: exports is not defined
    at lib.js:3
main.js:3 Uncaught ReferenceError: require is not defined
    at main.js:3
```

브라우저의 ES6 모듈 기능을 사용하도록 Babel을 설정할 수도 있으나 앞서 설명한 바와 같이 브라우저의 ES6 모듈 기능을 사용하는 것은 문제가 있다.

[다음 장](./es6-babel-webpack-2)에서는 Webpack을 통해 이러한 문제를 해결해보도록 하자.

# Reference

* [Babel](https://babeljs.io/)

* [ECMAScript 6 Browser Support](https://kangax.github.io/compat-table/es6/)
