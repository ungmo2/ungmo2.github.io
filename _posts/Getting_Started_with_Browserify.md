#Getting Started with Browserify

Browserify는 Node.js CommonJS 형식의 `require('modules')` 코드를 브라우저(Client-side) 자바스크립트 환경에서도 실행 가능하도록 하는 툴이다.

이것은 node 기반 package 를 그대로 사용할 수 있다는 것을 의미한다. 즉, `npm`으로 설치한 package을 컴파일을 통해 서버사이드 환경에서 뿐만 아니라 브라우저 환경에서도 그대로 사용할 수 있다는 것이다.

##Install Browserify & Watchify

```bash
$ npm init
$ npm i jquery --save
$ npm i browserify --save-dev
$ npm i watchify --save-dev
```

##package.json

```javascript
{
  "name": "Getting Started with Browserify",
  "version": "0.1.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "build": "browserify app.js -o bundle.js",
    "watch": "watchify app.js -o bundle.js"
  },
  "author": "Ung-mo Lee <ungmo2@gmail.com>",
  "license": "MIT",
  "devDependencies": {
    "browserify": "^12.0.1",
    "watchify": "^3.6.1"
  },
  "dependencies": {
    "jquery": "^2.1.4"
  }
}
```

##app.js
브라우저 환경에서 `require('modules')`를 사용할 수 있게 되었다. JQuery를 로드한 후 사용한다.
```javascript
var $ = require('jquery')
var button = $('<button/>').html('Click me').on('click',function(){
  alert('test browserify')
})
$('body').append(button)
```
모듈을 분리해보자.  
app.js
```javascript
var $ = require('jquery')
var button = require('./buttons/button.js')
$('body').append(button)
```
./buttons/button.js
```javascript
var $ = require('jquery')

var button = $('<button/>').html('Click me').on('click',function(){
  alert('test browserify')
})

module.exports = button
```

##Compile

bundle.js로 컴파일한다.
```bash
$ npm run build
```

#Watch
변경사항이 반영되어 bundle.js로 컴파일된다.

```bash
$ npm run watch
```

##HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Getting Started with Browserify</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```
##Reference
[Browserify](http://browserify.org/)
