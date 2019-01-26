---
layout: post
title: <strong>Babel + Webpack</strong>
subtitle: Babel과 Webpack을 이용한 ES6 환경 구축
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

트랜스파일러(Transpiler) [Babel](https://babeljs.io/)과 모듈 번들러(Module bundler) [Webpack](https://webpack.js.org/)을 이용하여 ES6+ 개발환경을 구축하여 보자. 아울러 Webpack을 통해 ES6+ 코드와 Sass를 트랜스파일링하는 방법도 알아볼 것이다.

본 문서에서 사용한 Babel, Webpack, 플러그인의 버전은 아래와 같다.

Node.js
: 11.6.0

npm
: 6.7.0

Babel
: - @babel/cli : 7.23.0
- @babel/core : 7.2.2
- @babel/preset-env : 7.3.1
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
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2"
  }
}
```

## 1.3 .babelrc 설정 파일 작성

Babel을 사용하려면 먼저 `@babel/preset-env`을 설치해야 한다. [@babel/preset-env](https://babeljs.io/docs/plugins/preset-env/)은 함께 사용되어야 하는 Babel 플러그인을 모아 둔 것으로 [Babel 프리셋](https://babeljs.io/docs/en/presets)이라고 부른다. Babel이 공식 지원하는 Babel 프리셋에는 [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript), [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) 등이 있다.

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
    "@babel/preset-env": "^7.3.1"
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
import { pi, power, Person } from './lib';

console.log(pi);
console.log(power(pi, pi));
console.log(new Person('Lee'));
```

```javascript
// src/js/lib.js
export const pi = Math.PI;

export function power(x, y) {
  return x ** y;
}

export class Person {
  constructor(name) {
    this.name = name;
  }
}
```

터미널에서 아래 명령으로 트랜스파일링을 실행한다.

```bash
$ npm run build

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
Person { name: 'Lee' }
```

## 1.5 브라우저에서 모듈 로딩 테스트

앞에서 main.js와 lib.js 모듈을 트랜스파일링하여 ES5로 변환된 main.js을 실행한 결과, 문제없이 실행되는 것을 확인하였다. ES6+에서 새롭게 추가된 기능들이 ES5로 트랜스파일링된 것은 물론 ES6의 모듈의 import와 export 키워드도 트랜스파일링되어 모듈 기능도 정상적으로 동작한 것이다. 하지만 모듈 기능은 node.js 환경에서 동작한 것이다. node.js는 CommonJS 방식의 module loading system을 기본으로 지원한다.

현재 대부분의 브라우저는 ES6의 모듈을 지원하지 않고 있다. 현재 사용하고 있는 브라우저에서 ES6의 모듈의 import와 export 키워드를 사용해보자. 테스트를 위해 hello.js, world.js, entry.js 모듈을 작성한다. hello.js와 world.js는 entry.js에 의해 import되는 의존 모듈이다.

```javascript
// src/js/hello.js
export default 'Hello';
```

```javascript
// src/js/world.js
export default 'world';
```

```javascript
// src/js/entry.js
import hello from './hello';
import world from './world';

document.getElementById('demo').innerHTML = `${hello}, ${world}!`;
```

Babel을 사용하여 트랜스파일링을 실행한다. 이전에 실행시킨 빌드 명령을 중지하지 않았다면 다시 실행하지 않아도 된다.

```bash
$ npm run build
```

트랜스파일링이 성공하면 dist/js 폴더에 트랜스파일링된 entry.js, hello.js, world.js가 저장된다. 이제 프로젝트 루트에 index.html을 생성하고 트랜스파일링된 자바스크립트 파일을 로드한다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Babel Demo</title>
  <script src="./dist/js/hello.js" defer></script>
  <script src="./dist/js/world.js" defer></script>
  <script src="./dist/js/entry.js" defer></script>
</head>
<body>
  <h1>Babel Demo</h1>
  <div id="demo"></div>
</body>
</html>
```

index.html을 브라우저에서 불러오면 아래와 같이 에러가 발생한다.

![module error](./img/module-error.png)

모듈 로딩 실패
{: .desc-img}

이 에러는 브라우저에서 CommonJS 모듈을 사용하려고 시도하였으나 실패한 것이다.

# 2. Webpack

## 2.1 Webpack이란?

앞에서 테스트해 본 바와 같이 ES6 모듈을 현재의 브라우저에서 사용하려면 [RequireJS](http://requirejs.org/) 또는 [SystemJS](https://github.com/systemjs/systemjs)와 같은 모듈 로더가 필요하다.

[Webpack](https://webpack.js.org/)은 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링하는 모듈 번들러이다. Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요없다. 그리고 다수의 자바스크립트 파일을 하나의 파일로 번들링하므로 html 파일에서 script 태그로 다수의 자바스크립트 파일을 로드할 번거로움도 사라진다.

![Webpack](./img/webpack.png)

[Webpack](https://webpack.js.org/)
{: .desc-img}

Webpack과 Babel을 이용하여 ES6 개발 환경을 구축하여 보자. Webpack이 자바스크립트 파일을 번들링하기 전에 Babel을 로드하여 ES6+ 코드를 ES5 코드로 트랜스파일링하는 작업을 관리하도록 설정할 것이다.

## 2.2 Webpack 설치

아래 명령으로 Webpack을 설치한다.

```bash
# Webpack V4는 webpack-cli를 요구한다
$ npm install --save-dev webpack webpack-cli
```

설치가 완료된 이후 package.json 파일은 아래와 같다.

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
    "@babel/preset-env": "^7.3.1",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1"
  }
}
```

<!--```javascript
// bundle.js : line 78
document.getElementById('demo').innerHTML = `${__WEBPACK_IMPORTED_MODULE_0__hello__["a" /* default */]}, ${__WEBPACK_IMPORTED_MODULE_1__world__["a" /* default */]}!`;
```-->

## 2.2 babel-loader

Webpack이 모듈을 번들링할 때 Babel을 사용하여 ES6+ 코드를 ES5 코드로 트랜스파일링하도록 babel-loader를 설치한다.

```bash
# babel-loader 설치
$ npm install --save-dev babel-loader
```

이제 npm script를 변경하여 Babel 대신 Webpack을 실행하도록 수정하자. 아래와 같이 package.json 파일의 scripts를 변경한다. 완성된 package.json 파일은 아래와 같다.

```json
{
  "name": "es6-project",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack -w"
  },
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "babel-loader": "^8.0.5",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1"
  }
}
```

프로젝트 루트에 webpack.config.js 파일을 생성하고 아래와 같이 작성한다. webpack.config.js은 Webpack이 실행될 때 참조하는 설정 파일이다.

```javascript
const path = require('path');

module.exports = {
  entry: './src/js/entry.js',
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};
```

이제 Webpack을 실행하여 트랜스파일링 및 번들링을 실행한다. 번들링은 Webpack이 실행하고 트랜스파일링은 Babel이 실행된다. 만약 이전에 실행시킨 빌드 명령이 실행 중인 상태라면 중지시키고 다시 아래 명령을 실행한다.

```bash
$ npm run build

> es6-project@1.0.0 build /Users/leeungmo/Desktop/es6-project
> webpack -w

webpack is watching the files…

Hash: ce7125f4b2a118ae6a63
Version: webpack 4.29.0
Time: 916ms
Built at: 2019-01-24 13:33:17
        Asset      Size  Chunks             Chunk Names
    bundle.js  4.96 KiB    main  [emitted]  main
bundle.js.map  4.02 KiB    main  [emitted]  main
Entrypoint main = bundle.js bundle.js.map
[./src/js/entry.js] 144 bytes {main} [built]
[./src/js/hello.js] 23 bytes {main} [built]
[./src/js/world.js] 23 bytes {main} [built]
```

실행 결과 dist/js 폴더에 bundle.js이 생성되었다. 이 파일은 hello.js, world.js, entry.js 모듈이 하나로 번들링된 결과물이다.

index.html을 아래와 같이 수정하고 브라우저에서 실행해 보자.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Babel + Webpack Demo</title>
  <script src="./dist/js/bundle.js" defer></script>
</head>
<body>
  <h1>Babel + Webpack Demo</h1>
  <div id="demo"></div>
</body>
</html>
```

![module success](./img/module-success.png)

모듈 로딩 성공
{: .desc-img}

hello.js, world.js, entry.js 모듈이 하나로 번들링된 bundle.js가 브라우저에서 문제없이 실행된 것을 확인할 수 있다.

## 2.3 babel-polyfill

ES5 이하로 트랜스파일링하여도 브라우저가 지원하지 않는 코드가 남아 있을 수 있다. 예를 들어, ES6에서 추가된 Promise, Object.assign, Array.from 등은 ES5 이하로 트랜스파일링하여도 대체할 ES5 기능이 없기 때문에 그대로 남아 있다.

![babel-polyfill](./img/babel-polyfill-1.png)

트랜스파일링이 되지 않는다.
{: .desc-img}

따라서 오래된 브라우저에서도 ES6에서 새롭게 추가된 객체나 메소드를 사용하기 위해서는 [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)을 설치해야 한다.

```bash
$ npm install @babel/polyfill
```

설치가 완료된 이후 package.json 파일은 아래와 같다.

```json
{
  "name": "es6-project",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack -w"
  },
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "babel-loader": "^8.0.5",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1"
  },
  "dependencies": {
    "@babel/polyfill": "^7.2.5"
  }
}
```

babel-polyfill은 개발 환경만 사용하는 것이 아니라 실제 환경에서도 사용하여야 하므로 \-\-save-dev 옵션으로 개발 설치를 하지 않도록 한다.

ES6의 import를 사용하는 경우에는 진입점의 선두에서 먼저 폴리필을 로드하여 폴리필이 전역을 조작하도록 한다.

```javascript
import "@babel/polyfill";
...
```

webpack을 사용하는 경우에는 폴리필을 webpack.config.js 파일의 entry 배열에 추가한다.

```javascript
const path = require('path');

module.exports = {
  entry: {
    entry: ['@babel/polyfill', './src/js/entry.js'],
  ...
```

위와 같이 webpack.config.js 파일을 수정하여 폴리필을 반영해보자. 빌드 명령이 실행 중인 상태라면 중지시키고 다시 아래 명령을 실행한다.

```bash
$ npm run build
```

![babel-polyfill](./img/babel-polyfill-2.png)

추가된 폴리필
{: .desc-img}

## 2.4 Sass 컴파일

이번에는 Webpack을 통해 [Sass](./sass-basics)를 컴파일하는 방법에 대해 살펴보자. Sass를 컴파일한 결과물인 css를 bundle.js 파일에 포함시키는 방법과 별도의 css 파일로 분리하는 방법이 있다.

### 2.4.1 컴파일된 css를 bundle.js 파일에 포함시키는 방법

필요한 패키지를 설치하자. node-sass는 node.js 환경에서 사용할 수 있는 Sass 라이브러리이다. 실제로 Sass를 css로 컴파일하는 것은 node-sass이다. style-loader, css-loader, sass-loader는 Webpack 플러그인이다.

```bash
$ npm install node-sass style-loader css-loader sass-loader --save-dev
```

설치가 완료된 이후 package.json 파일은 아래와 같다.

```json
{
  "name": "es6-project",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack -w"
  },
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "babel-loader": "^8.0.5",
    "css-loader": "^2.1.0",
    "node-sass": "^4.11.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1"
  },
  "dependencies": {
    "@babel/polyfill": "^7.2.5"
  }
}
```

webpack.config.js 파일을 아래와 같이 수정한다.

```javascript
const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './src/js/entry.js', './src/sass/main.scss'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader",   // translates CSS into CommonJS
          "sass-loader"   // compiles Sass to CSS, using Node Sass by default
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};
```

테스트를 위해 3개의 Sass 파일을 추가한다.

```scss
// main.scss
@import "partial/vars";
@import "partial/body";
```

```scss
// partial/_vars.scss
$font_color: #333;
$font_family: Arial, sans-serif;
$font_size: 16px;
$line_height: percentage(20px / $font_size);
```

```scss
// partial/_body.scss
body {
  color: $font_color;

  // Property Nesting
  font: {
    size: $font_size;
    family: $font_family;
  }

  line-height: $line_height;
}
```

빌드 명령이 실행 중인 상태라면 중지시키고 다시 아래 명령을 실행한다.

```bash
$ npm run build
```

아래와 같이 CSS가 적용된 것을 확인할 수 있다.

![webpack-sass](./img/webpack-sass-1.png)

컴파일된 CSS는 bundle.js에 포함되어 있다.

![webpack-sass](./img/webpack-sass-2.png)

### 2.4.2 컴파일된 CSS를 별도의 CSS 파일로 분리하는 방법

Sass 파일이 방대해지면 자바스크립트 파일에서 분리하는 것이 효율적일 수 있다. bundle.js 파일에 컴파일된 css를 포함시키지 말고 별도의 css 파일로 분리해서 하나의 파일로 번들링해보자. 이때 사용하는 플러그인은 [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)이다.

Webpack v4 이전 버전에서는 extract-text-webpack-plugin을 사용했었다. Webpack v4부터 css와 관련한 파일 분리는 mini-css-extract-plugin을 사용하도록 변경되었다.
{: .info }

mini-css-extract-plugin을 설치하자.

```bash
$ npm install --save-dev mini-css-extract-plugin
```

설치가 완료된 이후 package.json 파일은 아래와 같다.

```json
{
  "name": "es6-project",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack -w"
  },
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "babel-loader": "^8.0.5",
    "css-loader": "^2.1.0",
    "mini-css-extract-plugin": "^0.5.0",
    "node-sass": "^4.11.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1"
  },
  "dependencies": {
    "@babel/polyfill": "^7.2.5"
  }
}
```

webpack.config.js 파일을 아래와 같이 수정한다.

```javascript
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ['@babel/polyfill', './src/js/entry.js', './src/sass/main.scss'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: 'css/style.css' })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader?outputStyle=expanded'
          // 'sass-loader?outputStyle=compressed'
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};
```

빌드 명령이 실행 중인 상태라면 중지시키고 다시 아래 명령을 실행한다.

```bash
$ npm run build
```

아래와 같이 css 폴더가 생성되고 style.css 파일이 저장되었다. 컴파일되고 하나의 파일로 번들링된 css가 bundle.js 파일에 포함되지 않고 별도 파일로 분리된 것이다.

![webpack-sass](./img/webpack-sass-3.png)

이제 index.html에서 style.css 파일을 로드하도록 하자.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Babel + Webpack Demo</title>
  <link href="./dist/css/style.css" rel="stylesheet"></link>
  <script src="./dist/js/bundle.js" defer></script>
</head>
<body>
  <h1>Babel + Webpack Demo</h1>
  <div id="demo"></div>
</body>
</html>
```

아래와 같이 CSS가 적용된 것을 확인할 수 있다.

![webpack-sass](./img/webpack-sass-4.png)

# Reference

* [Babel](https://babeljs.io/)

* [Webpack](https://webpack.js.org/)

* [ECMAScript 6 Browser Support](https://kangax.github.io/compat-table/es6/)

* [webpack academy](https://webpack.academy/)
