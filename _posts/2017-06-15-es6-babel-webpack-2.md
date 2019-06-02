---
layout: post
title: <strong>Webpack</strong>
subtitle: Babel과 Webpack을 이용한 ES6 환경 구축 ②
categories: es6
section: es6
seq: 6
subseq: 14
description: 앞에서 테스트해 본 바와 같이 ES6 모듈을 현재의 브라우저에서 사용하려면 [RequireJS](http://requirejs.org/) 또는 [SystemJS](https://github.com/systemjs/systemjs)와 같은 모듈 로더가 필요하다. [Webpack](https://webpack.js.org/)은 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링하는 모듈 번들러이다. Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요없다. 그리고 다수의 자바스크립트 파일을 하나의 파일로 번들링하므로 html 파일에서 script 태그로 다수의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다.
---

* TOC
{:toc}

![babel-webpack](./img/babel-webpack.png)

# 2. Webpack

## 2.1 Webpack이란?

[Webpack](https://webpack.js.org/)은 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링하는 모듈 번들러이다. Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요없다. 그리고 다수의 자바스크립트 파일을 하나의 파일로 번들링하므로 html 파일에서 script 태그로 다수의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다.

![Webpack](./img/webpack.png)

[Webpack](https://webpack.js.org/)
{: .desc-img}

Webpack과 Babel을 이용하여 ES6 개발 환경을 구축하여 보자. Webpack이 자바스크립트 파일을 번들링하기 전에 Babel을 로드하여 ES6+ 코드를 ES5 코드로 트랜스파일링하는 작업을 실행하도록 설정할 것이다. 그리고 Sass를 사용하는 경우, Sass 컴파일도 Webpack에서 관리하도록 할 것이다.

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
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/preset-env": "^7.4.5",
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.2"
  }
}
```

<!--```javascript
// bundle.js : line 78
document.getElementById('demo').innerHTML = `${__WEBPACK_IMPORTED_MODULE_0__hello__["a" /* default */]}, ${__WEBPACK_IMPORTED_MODULE_1__world__["a" /* default */]}!`;
```-->

## 2.3 babel-loader

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
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/preset-env": "^7.4.5",
    "babel-loader": "^8.0.6",
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.2"
  }
}
```

# 2.4 webpack.config.js

webpack.config.js은 Webpack이 실행될 때 참조하는 설정 파일이다. 프로젝트 루트에 webpack.config.js 파일을 생성하고 아래와 같이 작성한다.

```javascript
const path = require('path');

module.exports = {
  // enntry file
  entry: './src/js/main.js',
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
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
```

이제 Webpack을 실행하여 트랜스파일링 및 번들링을 실행한다. 트랜스파일링은 Babel이 실행하고 번들링은 Webpack이 실행한다. 만약 이전에 실행시킨 빌드 명령이 실행 중인 상태라면 중지시키고 다시 아래 명령을 실행한다.

```bash
$ npm run build

> es6-project@1.0.0 build /Users/leeungmo/Desktop/es6-project
> webpack -w

webpack is watching the files…

Hash: 4b21ef06781a83e8d0c3
Version: webpack 4.32.2
Time: 1078ms
Built at: 2019-06-02 17:21:56
        Asset      Size  Chunks             Chunk Names
    bundle.js  8.13 KiB    main  [emitted]  main
bundle.js.map  5.07 KiB    main  [emitted]  main
Entrypoint main = bundle.js bundle.js.map
[./src/js/lib.js] 3.29 KiB {main} [built]
[./src/js/main.js] 147 bytes {main} [built]
```

실행 결과 dist/js 폴더에 bundle.js이 생성되었다. 이 파일은 main.js, lib.js 모듈이 하나로 번들링된 결과물이다.

index.html을 아래와 같이 수정하고 브라우저에서 실행해 보자.

```html
<!DOCTYPE html>
<html>
<body>
  <script src="./dist/js/bundle.js"></script>
</body>
</html>
```

![module success](./img/module-success.png)

모듈 로딩 성공
{: .desc-img}

main.js, lib.js 모듈이 하나로 번들링된 bundle.js가 브라우저에서 문제없이 실행된 것을 확인할 수 있다.

## 2.5 babel-polyfill

ES5 이하로 트랜스파일링하여도 브라우저가 지원하지 않는 코드가 남아 있을 수 있다. 예를 들어, ES6에서 추가된 Promise, Object.assign, Array.from 등은 ES5 이하로 트랜스파일링하여도 대체할 ES5 기능이 없기 때문에 그대로 남아 있다.

src/js/main.js를 아래와 같이 수정하여 ES6에서 추가된 Promise, Object.assign, Array.from 등이 어떻게 트랜스파일링되는지 확인해 보자.

```javascript
// src/js/main.js
import { pi, power, Foo } from './lib';
import { resolve } from 'path';

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());

// polyfill이 필요한 코드
console.log(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 100);
}));

console.log(Object.assign({}, { x: 1 }, { y: 2 }));

console.log(Array.from([1, 2, 3], v => v + v));
```

다시 트랜스파일링과 번들링을 실행한 다음, dist/js/bundle.js을 확인해보자.

```javascript
...
// 619 line
console.log(f.bar()); // polyfill이 필요한 코드

console.log(new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 100);
}));
console.log(Object.assign({}, {
  x: 1
}, {
  y: 2
}));
console.log(Array.from([1, 2, 3], function (v) {
  return v + v;
}));
...
```

위와 같이 Promise, Object.assign, Array.from 등과 같이 ES5 이하로 대체할 수 없는 기능은 트랜스파일링이 되지 않는다.

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
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/preset-env": "^7.4.5",
    "babel-loader": "^8.0.6",
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.2"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4"
  }
}
```

babel-polyfill은 개발 환경만 사용하는 것이 아니라 실제 환경에서도 사용하여야 하므로 \-\-save-dev 옵션으로 개발 설치를 하지 않도록 한다.

ES6의 import를 사용하는 경우에는 진입점의 선두에서 먼저 폴리필을 로드하도록 한다.

```javascript
// src/js/main.js
import "@babel/polyfill";
...
```

webpack을 사용하는 경우에는 폴리필을 webpack.config.js 파일의 entry 배열에 추가한다.

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  // entry files
  entry: ['@babel/polyfill', './src/js/main.js'],
  ...
```

위와 같이 webpack.config.js 파일을 수정하여 폴리필을 반영해보자. 빌드 명령이 실행 중인 상태라면 중지시키고 다시 아래 명령을 실행한다.

```bash
$ npm run build

> es6-project@1.0.0 build /Users/leeungmo/Desktop/es6-project
> webpack -w

webpack is watching the files…

Hash: a243daf5f2849cd5a2e3
Version: webpack 4.32.2
Time: 2933ms
Built at: 2019-06-02 17:50:24
        Asset     Size  Chunks             Chunk Names
    bundle.js  420 KiB    main  [emitted]  main
bundle.js.map  338 KiB    main  [emitted]  main
Entrypoint main = bundle.js bundle.js.map
[0] multi @babel/polyfill ./src/js/main.js 40 bytes {main} [built]
[./src/js/lib.js] 3.29 KiB {main} [built]
[./src/js/main.js] 438 bytes {main} [built]
    + 309 hidden modules
```

dist/js/bundle.js을 확인해보면 아래와 같이 polyfill이 추가된 것을 확인할 수 있다.

![babel-polyfill](./img/babel-polyfill-2.png)

추가된 폴리필
{: .desc-img}

## 2.6 Sass 컴파일

이번에는 Webpack을 통해 [Sass](./sass-basics)를 컴파일하는 방법에 대해 살펴보자. Sass를 컴파일한 결과물인 css를 bundle.js 파일에 포함시키는 방법과 별도의 css 파일로 분리하는 방법이 있다.

### 2.6.1 컴파일된 css를 bundle.js 파일에 포함시키는 방법

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
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/preset-env": "^7.4.5",
    "babel-loader": "^8.0.6",
    "css-loader": "^2.1.1",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.2"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4"
  }
}
```

webpack.config.js 파일을 아래와 같이 수정한다.

```javascript
const path = require('path');

module.exports = {
  // entry files
  entry: ['@babel/polyfill', './src/js/main.js', './src/sass/main.scss'],
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
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
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
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
```

테스트를 위해 3개의 Sass 파일을 src/sass 폴더와 src/sass/partials 폴더에 추가한다.

```scss
// src/sass/main.scss
@import "partials/vars";
@import "partials/body";
```

```scss
// src/sass/partials/_vars.scss
$font_color: #333;
$font_family: Arial, sans-serif;
$font_size: 16px;
$line_height: percentage(20px / $font_size);
```

```scss
// src/sass/partials/_body.scss
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

> es6-project@1.0.0 build /Users/leeungmo/Desktop/es6-project
> webpack -w

webpack is watching the files…

Hash: fe8a8df6a068e9d9d414
Version: webpack 4.32.2
Time: 2144ms
Built at: 2019-06-02 17:58:40
        Asset     Size  Chunks             Chunk Names
    bundle.js  438 KiB    main  [emitted]  main
bundle.js.map  360 KiB    main  [emitted]  main
Entrypoint main = bundle.js bundle.js.map
[0] multi @babel/polyfill ./src/js/main.js ./src/sass/main.scss 52 bytes {main} [built]
[./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/sass/main.scss] 245 bytes {main} [built]
[./src/js/lib.js] 3.29 KiB {main} [built]
[./src/js/main.js] 438 bytes {main} [built]
[./src/sass/main.scss] 1.2 KiB {main} [built]
    + 312 hidden modules
```

CSS가 적용되는 것을 확인하기 위해 index.html을 아래와 같이 수정하자.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="./dist/js/bundle.js"></script>
  </head>
<body>
  Hello world!
</body>
</html>
```

아래와 같이 CSS가 적용된 것을 확인할 수 있다.

![webpack-sass](./img/webpack-sass-1.png)

컴파일된 CSS는 bundle.js에 포함되어 있다.

![webpack-sass](./img/webpack-sass-2.png)

### 2.6.2 컴파일된 CSS를 별도의 CSS 파일로 분리하는 방법

Sass 파일이 방대해지면 자바스크립트 파일에서 분리하는 것이 효율적일 수 있다. bundle.js 파일에 컴파일된 css를 포함시키지 말고 별도의 css 파일로 분리해서 하나의 파일로 번들링해보자. 이때 사용하는 플러그인은 [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)이다.

Webpack v4 이전 버전에서는 `extract-text-webpack-plugin`을 사용했었다. Webpack v4부터 css와 관련한 파일 분리는 mini-css-extract-plugin을 사용하도록 변경되었다.
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
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/preset-env": "^7.4.5",
    "babel-loader": "^8.0.6",
    "css-loader": "^2.1.1",
    "mini-css-extract-plugin": "^0.7.0",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.2"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4"
  }
}
```

webpack.config.js 파일을 아래와 같이 수정한다.

```javascript
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // entry files
  entry: ['@babel/polyfill', './src/js/main.js', './src/sass/main.scss'],
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
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
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
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
```

빌드 명령이 실행 중인 상태라면 중지시키고 다시 아래 명령을 실행한다.

```bash
$ npm run build

> es6-project@1.0.0 build /Users/leeungmo/Desktop/es6-project
> webpack -w

webpack is watching the files…

Hash: 0d14eca447fc0218ad37
Version: webpack 4.32.2
Time: 2243ms
Built at: 2019-06-02 18:09:45
            Asset       Size  Chunks             Chunk Names
    css/style.css  136 bytes    main  [emitted]  main
css/style.css.map  278 bytes    main  [emitted]  main
     js/bundle.js    420 KiB    main  [emitted]  main
 js/bundle.js.map    338 KiB    main  [emitted]  main
Entrypoint main = css/style.css js/bundle.js css/style.css.map js/bundle.js.map
[0] multi @babel/polyfill ./src/js/main.js ./src/sass/main.scss 52 bytes {main} [built]
[./src/js/lib.js] 3.29 KiB {main} [built]
[./src/js/main.js] 438 bytes {main} [built]
[./src/sass/main.scss] 39 bytes {main} [built]
    + 310 hidden modules
Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/lib/loader.js?outputStyle=expanded!src/sass/main.scss:
    Entrypoint mini-css-extract-plugin = *
    [./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?outputStyle=expanded!./src/sass/main.scss] 246 bytes {mini-css-extract-plugin} [built]
        + 1 hidden module
```

아래와 같이 css 폴더가 생성되고 style.css 파일이 저장되었다. 컴파일되고 하나의 파일로 번들링된 css가 bundle.js 파일에 포함되지 않고 별도 파일로 분리된 것이다.

```css
body {
  color: #333;
  font-size: 16px;
  font-family: Arial, sans-serif;
  line-height: 125%;
}


/*# sourceMappingURL=style.css.map*/
```

이제 index.html에서 style.css 파일을 로드하도록 하자.

```html
<!DOCTYPE html>
<html>
  <head>
    <link href="./dist/css/style.css" rel="stylesheet"></link>
    <script src="./dist/js/bundle.js"></script>
  </head>
<body>
  Hello world!
</body>
</html>
```

아래와 같이 CSS가 적용된 것을 확인할 수 있다.

![webpack-sass](./img/webpack-sass-3.png)

# Reference

* [Webpack](https://webpack.js.org/)

* [webpack academy](https://webpack.academy/)

* [ECMAScript 6 Browser Support](https://kangax.github.io/compat-table/es6/)
