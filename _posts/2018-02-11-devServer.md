---
layout: post
title: Webpack DevServer
categories: tools
section: tools
seq: 15
subseq: 11
description: Webpack DevServer webpack-dev-server
---

# 1. webpack-dev-server

[webpack-dev-server](https://github.com/webpack/webpack-dev-server)는 라이브 리로드 기능을 제공하는 개발용 서버다. 빌드를 실행하면 번들링된 파일을 생성하기 때문에 규모가 큰 프로젝트라면 빌드에 시간이 걸린다. webpack-dev-server는 실제 번들링된 파일을 생성하지 않고 번들링된 결과를 메모리에 저장하기 때문에 빌드 속도가 빠르다. 따라서 개발 시에는 매번 빌드를 실행하지 않고 webpack-dev-server를 사용하는 편이 좋다.

webpack-dev-server는 webpack.config.js에 설정을 추가하는 것으로 간단한 사용할 수 있다. 먼저 다음과 같이 webpack-dev-server를 설치하자.

```bash
$ npm install --save-dev webpack-dev-server
```

webpack.config.js에 다음과 같이 설정을 추가한다.

```javascript
const path = require('path');

...
  // https://webpack.js.org/configuration/dev-server
  devServer: {
    // https://webpack.js.org/configuration/dev-server/#devserverstatic
    static: {
      // https://webpack.js.org/configuration/dev-server/#directory
      directory: path.join(__dirname, 'public'), //
    },
    // https://webpack.js.org/configuration/dev-server/#devserveropen
    open: true,
    // https://webpack.js.org/configuration/dev-server/#devserverport
    port: 'auto'
  },
...
```

package.json의 scripts에 `webpack serve`를 추가한다.

```json
...
  "scripts": {
    "start": "webpack serve",
    "build": "webpack -w"
  },
...
```

webpack-dev-server의 실행을 위해 다음과 같이 package.json scripts의 start를 실행한다.

```bash
$ npm start
```

이때 index.html의 script 태그에 번들링된 자바스크립트 파일을 설정해 주어야 한다. 만약 번들링된 자바스크립트 파일 이름이 `main.bundle.js`라면 다음과 같이 index.html에 자바스크립트 파일을 추가한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <script defer src="main.bundle.js"></script>
  </head>
  ...
```

# 2. HTMLWebpack 플러그인

[HTMLWebpack 플러그인](https://webpack.js.org/plugins/html-webpack-plugin)을 사용하면 번들링된 자바스크립트 파일을 html 파일에 자동 추가해 준다. 설치 방법은 다음과 같다.

```bash
$ npm install --save-dev html-webpack-plugin
```

webpack.config.js에 다음과 같이 설정을 추가한다. HtmlWebpackPlugin 함수의 인수에는 html 파일의 경로를 지정한다.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

...
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
...
```

# 3. 프록시(Proxy) 설정

별도의 API 백엔드 개발 서버가 있고 동일한 도메인에서 API 요청을 보내려는 경우 일부 URL을 프록시하는 것이 편리하다.

webpack.config.js에 다음과 같이 설정을 추가한다.

```javascript
...
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    port: 'auto',
    // https://webpack.js.org/configuration/dev-server/#devserverproxy
    proxy: {
      '/todos': {
        target: 'http://localhost:5500/todos',
        pathRewrite: { '^/todos': '' },
      },
    },
  },
...
```

이처럼 프록시를 설정하면 `/todos`에 대한 요청을 `http://localhost:5000/todos`로 프록시한다.

# 4. Ref

- [DevServer](https://webpack.js.org/configuration/dev-server)
