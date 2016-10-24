---
layout: post
title: Node.js 모듈 (module.exports & exports)
categories: nodejs
section: nodejs
---

클라이언트 사이드 자바스크립트에서 코드를 파일 단위로 분할하여 사용할 때, 전역 변수의 중복 문제가 발생하곤 한다.

```javascript
// file-A.js
var x = 1, y = 2;
```

```javascript
// file-B.js
var y = 20, z = 30
```

```html
<html>
<body>
<script src='file-A.js'></script>
<script src='file-B.js'></script>
<script>
  console.log('x is ' + x);
  console.log('y is ' + y);
  console.log('z is ' + y);
</script>
</body>
</html>
```

변수 x, y, z는 모두 전역에 존재하는 변수로 파일이 분할되어도 마치 한 파일에 있는 변수처럼 행동한다. 이는 파일 단위의 스코프가 존재하지 않기 때문이다.

전역 네임스페이스(Global Namespace) 오염 문제는 변수명의 중복, 의도되지 않은 값의 변경 등 문제를 야기할 수 있는 우려가 있으므로 아래와 같이 지역 변수로 바꾸어 보자.

```javascript
// file-A.js
(function(){
  var x = 1, y = 2;
}());
```

```javascript
// file-B.js
(function(){
  var y = 20, z = 30
}());
```

```html
<html>
<body>
<script src='file-A.js'></script>
<script src='file-B.js'></script>
<script>
  console.log('x is ' + x);
  console.log('y is ' + y);
  console.log('z is ' + y);
</script>
</body>
</html>
```

즉시 실행 함수(IIFE)를 사용하여 파일 별로 각각의 스코프를 생성하었고 각 변수는 지역변수가 되었다. 그런데 이제는 각 파일의 지역변수를 전역 코드 영역(HTML의 script tag내)에서 참조할 수 없게 되었다.

각 파일의 즉시 실행 함수가 변수값을 담은 객체를 반환하도록 변경하는 수 밖에 없겠다.

```javascript
// file-A.js
var file-A = (function(){
  return {
    x: 1, y: 2
  }
}());
```

```javascript
// file-B.js
var file-B = (function(){
  return {
    y: 20, z: 30
  }
}());
```

```html
<html>
<body>
<script src='file-A.js'></script>
<script src='file-B.js'></script>
<script>
  console.log('file-A.x is ' + file-A.x);
  console.log('file-A.y is ' + file-A.y);
  console.log('file-B.y is ' + file-B.y);
  console.log('file-B.z is ' + file-B.z);
</script>
</body>
</html>
```

지금까지 알아본 것이 바로 `모듈 패턴 (Module Pattern)`이다. 모듈(module)이란 관련있는 코드를 캡슐로 감싸듯 모아둔 코드의 집합이다. 즉시 실행 함수로 코드를 wrapping하고 객체를 반환하여 `네임스페이스 변수`에 할당하는 형태이다. 반환하는 객체에 포함시키지 않은 값은 `private`이 된다.

아래 예제에서 변수 id는 `private`이고 next, reset 함수만이 외부로 공개된다.

```javascript
var myApp = (function() {
  var id = 0;

  return {
    next: function() {
      return id++;    
    },

    reset: function() {
      id = 0;     
    }
  };  
}());   

console.log(
  myApp.next(),
  myApp.next(),
  myApp.reset(),
  myApp.next()
); // 0, 1, undefined, 0
```

# Node.js 모듈

[Node.js](https://nodejs.org/dist/latest-v4.x/docs/api/modules.html)는 심플하고 사용이 간편한 module loading system을 제공한다. json 형식의 파일을 로드할 수도 있고 자바스크립트 모듈을 로드할 수도 있다.

모듈을 추출할 때는 `require`, 모듈화할 때는 `exports`를 사용한다.

```javascript
// circle.js

const PI = Math.PI;

exports.area = function (r) {
  return PI * r * r;
};

exports.circumference = function (r) {
  return 2 * PI * r;
};
```

```javascript
// foo.js

const circle = require('./circle.js');
console.log( 'The area of a circle of radius 4 is ' + circle.area(4));
```

```bash
$ node foo.js
The area of a circle of radius 4 is 50.26548245743669
```
