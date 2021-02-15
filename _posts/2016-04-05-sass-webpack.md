---
layout: post
title: Webpack + Sass
subtitle: Webpack 개발 환경에서 Sass 사용하기
categories: Sass
section: Sass
seq: 5
subseq: 5
---

![sass-logo](/img/sass-logo.png)

Webpack 개발 환경에서 Sass를 사용해보자. 먼저 다음 명령을 사용해 필요한 패키지를 설치한다.

```bash
$ npm install --save-dev webpack webpack-cli css-loader sass sass-loader mini-css-extract-plugin
```

package.json은 다음과 같다. npm scripts에 build를 추가한다.

```json
{
  "name": "sass-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^5.0.2",
    "mini-css-extract-plugin": "^1.3.6",
    "sass": "^1.32.7",
    "sass-loader": "^11.0.1",
    "webpack": "^5.21.2",
    "webpack-cli": "^4.5.0"
  }
}
```

프로젝트 루트에 webpack.config.js 파일을 생성하고 다음과 같이 수정한다.

```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/sass/foo.scss',
  output: {
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: 'css/style.css' })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};
```

다음 명령으로 빌드를 실행하면 webpack.config.js 파일에 지정한 경로('public/css/style.css')에 컴파일되어 번들링된 css 파일이 저장된다.

```bash
$ npm run build
```