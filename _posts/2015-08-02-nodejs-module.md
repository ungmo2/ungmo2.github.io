---
layout: post
title: Node.js - <strong>module</strong>
subtitle: Node.js의 module loading system
categories: nodejs
section: nodejs
description: Node.js의 module loading system module.exports vs. exports
---

* TOC
{:toc}

![node-logo](/img/node-logo.png)

Node.js는 [CommonJS](http://www.commonjs.org/) 방식의 module loading system으로 디펜던시를 로드할 수 있다.

CommonJS는 JavaScript를 브라우저에서만 아니라 서버사이드 애플리케이션이나 데스크톱 애플리케이션에서도 사용할 수 있도록 조직한 자발적 워킹 그룹으로 JavaScript를 범용적으로 사용하기 위해 필요한 명세(Specification)를 만드는 일을 한다.

모듈은 자신만의 <strong>독립적인 실행 영역(Scope)</strong>가 있어야 하며 모듈 정의는 <strong>exports 객체</strong>, 모듈 사용은 <strong>require 함수</strong>를 사용한다.

Node.js는 파일마다 독립적인 파일 Scope가 있기 때문에 클라이언트 사이드 JavaScript와는 달리 전역변수의 중복 문제가 발생하지 않는다.

몇가지의 구체적인 예제를 통해 Node.js의 module loading system을 살펴보자.

# exports에 함수를 할당하는 방식

모듈은 객체 또는 함수를 통해 정의한다. 함수를 외부에 공개하는 경우 다음과 같이 정의한다.

```javascript
// foo.js
// module 정의
module.exports = function(a, b) {
  return a + b;
};
```

```javascript
// app.js
// module 로드
var add = require('./foo.js'); // 확장자를 생략할 수 있다 require('./foo')

var result = add(1, 2);
console.log(result); // => 3
```

1개의 모듈에서 1개의 함수만을 제공하는 것은 불편할 수 있다. 대부분의 경우, 다음과 같이 객체를 사용하여 복수의 기능을 하나로 묶어 공개하는 방식을 사용한다.

# exports에 객체를 할당하는 방식

객체를 외부에 공개하는 경우 다음과 같이 정의한다.

```javascript
// foo.js
// module 정의
module.exports = {
  add: function (v1, v2) {
    return v1 + v2;
  },
  minus: function (v1, v2) {
    return v1 - v2;
  }
};
```

```javascript
// app.js
// module 로드
var calc = require('./foo');

var result1 = calc.add(1, 2);
console.log(result1); // => 3

var result2 = calc.minus(1, 2);
console.log(result2); // => -1
```

또는 module.exports에 다음과 같이 할당할 수도 있다.

```javascript
// foo.js
module.exports.add = function (v1, v2) {
  return v1 + v2;  
};

module.exports.minus = function (v1, v2) {
  return v1 - v2;  
};
```

# require

require 메서드의 인수에는 파일뿐만 아니라 디렉터리를 지정할 수도 있다.

require는 modules.exports에 할당된 객체를 반환한다.

예를 들어 다음과 같은 디렉터리 구조의 경우

```
project/
├── app.js
└── module/
    ├── index.js
    ├── calc.js
    └── print.js
```

다음과 같이 파일을 명시하지 않고 require 메서드를 호출하면 해당 디렉터리의 index.js을 로드한다.

```javascript
var myModule = require('./module');
```

이때 로드되는 index.js 내에서 calc.js과 print.js를 require하면 한번의 require로 alc.js과 print.js의 모든 기능을 사용할 수 있다.

```javascript
// module/index.js
module.exports = {
  calc: require('./calc'),
  print: require('./print')
};
```

```javascript
// module/calc.js
module.exports = {
  add: function(v1, v2) {
    return v1 + v2;
  },
  minus: function(v1, v2) {
    return v1 - v2;
  }
};
```

```javascript
// module/print.js
module.exports = {
  sayHello: function() {
    console.log('Hi!');
  }
};
```

```javascript
// app.js
var myModule = require('./module');

// module/calc.js의 기능
var result = myModule.calc.add(1, 2);

console.log(result);

// module/print.js의 기능
myModule.print.sayHi();
```

# module.exports vs. exports

module.exports 객체는 모듈 시스템에 의해 생성된다.

exports는 module.exports에의 참조이며 module.exports의 alias이다. 즉 exports는 module.exports와 같다고 보아도 무방하다.

Node.js의 [document](https://nodejs.org/dist/latest-v6.x/docs/api/modules#modules_exports_alias)에는 만약 exports와 module.exports의 관계가 어렵게 느껴진다면 exports를 무시하고 module.exports만을 사용하라고 되어 있다.

As a guideline, if the relationship between exports and module.exports seems like magic to you, ignore exports and only use module.exports.
{: .info}

# 코어 모듈과 파일 모듈

Node.js는 기본으로 포함하고 있는 모듈이 있다. 이를 코어 모듈이라 한다.

코어 모듈을 로딩할 때에는 패스를 명시하지 않아도 무방하다.

```javascript
var http = require('http');
```

코어 모듈 이외는 모두 파일 모듈이다.

파일 모듈을 로딩할 때에는 패스를 명시하여야 한다.

# Reference

* [Node.js v6.7.0 : Modules](https://nodejs.org/dist/latest-v6.x/docs/api/modules.html)
