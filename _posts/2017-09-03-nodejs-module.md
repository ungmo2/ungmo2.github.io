---
layout: post
title: Node.js <strong>module</strong>
subtitle: Node.js의 module loading system
categories: nodejs
section: nodejs
seq: 9
subseq: 3
description: Node.js는 사실상 모듈 시스템의 사실상 표준(de facto standard)인 CommonJS를 채택하였고 현재는 독자적인 진화를 거쳐 CommonJS 사양과 100% 동일하지는 않지만 기본적으로 CommonJS 방식을 따르고 있다. Node.js는 module 단위로 각 기능을 분할할 수 있다. module은 파일과 1대1의 대응 관계를 가지며 하나의 모듈은 자신만의 독립적인 실행 영역(Scope)를 가지게 된다. 따라서 클라이언트 사이드 JavaScript와는 달리 전역변수의 중복 문제가 발생하지 않는다. 모듈은 module.exports 또는 exports 객체를 통해 정의하고 외부로 공개한다. 그리고 공개된 모듈은 require 함수를 사용하여 임포트한다.
---

* TOC
{:toc}

![node-logo](/img/node-logo.png)

# 1. Node.js 모듈

자바스크립트는 웹페이지에 있어서 보조적인 기능을 수행하기 위해 한정적인 용도로 만들어진 태생적 한계로 다른 언어에 비해 부족한(나쁜) 부분이 있는 것이 사실이다. 그 대표적인 것이 모듈 기능이 없는 것이다.

브라우저 상에서 동작하는 JavaScript는 script tag로 로드하며 복수의 JavaScript 파일을 로드할 경우 하나의 파일로 merge되며 동일한 유효범위를 갖게 된다.

ES6에서는 Client-side JavaScript에서도 동작하는 모듈 기능을 추가하였다. 단 현재 대부분의 브라우저가 ES6의 모듈을 지원하지 않고 있으므로 ES6 모듈을 현재의 브라우저에서 사용하기 위해서는 SystemJS, RequireJS 등의 모듈 로더 또는 Webpack 등의 모듈번들러를 사용하여야 한다. [ES6 모듈](http://poiemaweb.com/es6-module)은 키워드 export, import를 제공한다.
{: .info}

JavaScript를 Client-side에 국한하지 않고 범용적으로 사용하고자 하는 움직임이 생기면서 모듈 기능은 반드시 해결해야하는 핵심 과제가 되었고 이런 상황에서 제안된 것이 [CommonJS](http://www.commonjs.org/)와 [AMD(Asynchronous Module Definition)](https://github.com/amdjs/amdjs-api/wiki/AMD)이다.

Node.js는 사실상 모듈 시스템의 사실상 표준(de facto standard)인 [CommonJS](http://www.commonjs.org/)를 채택하였고 현재는 독자적인 진화를 거쳐 CommonJS 사양과 100% 동일하지는 않지만 기본적으로 CommonJS 방식을 따르고 있다.

Node.js는 module 단위로 각 기능을 분할할 수 있다. module은 파일과 1대1의 대응 관계를 가지며 하나의 모듈은 자신만의 <strong>독립적인 실행 영역(Scope)</strong>를 가지게 된다. 따라서 클라이언트 사이드 JavaScript와는 달리 전역변수의 중복 문제가 발생하지 않는다.

모듈은 <strong>module.exports 또는 exports 객체</strong>를 통해 정의하고 외부로 공개한다. 그리고 공개된 모듈은 <strong>require 함수</strong>를 사용하여 임포트한다.

# 2. exports

모듈은 독립적인 파일 스코프를 갖기 때문에 모듈 안에 선언한 모든 것들은 기본적으로 해당 모듈 내부에서만 참조 가능하다. 만약 모듈 안에 선언한 항목을 외부에 공개하여 다른 모듈들이 사용할 수 있게 하고 싶다면 exports 객체를 사용해야 한다.

모듈을 파일로 작성하고 외부에 공개할 대상을 exports 객체의 프로퍼티 또는 메소드를 정의한다. 그리고 모듈을 전역 함수 require()를 이용하여 추출한다.

```javascript
// circle.js
const { PI } = Math;

exports.area = (r) => PI * r * r;

exports.circumference = (r) => 2 * PI * r;
```

circle.js는 독립적인 파일 스코프를 갖는 모듈이다. circle 모듈에서 area와 circumference를 exports 객체의 메소드로 정의하였다. 변수 PI는 circle 모듈에서만 유효한 private 변수가 되고, area와 circumference는 외부에 공개된다.

require 함수를 사용하여 임의의 이름으로 circle 모듈을 import한다. 모듈의 확장자는 생략할 수 있다.

```javascript
// app.js
const circle = require('./circle.js'); // == require('./circle')

console.log(`지름이 4인 원의 면적: ${circle.area(4)}`);
console.log(`지름이 4인 원의 둘레: ${circle.circumference(4)}`);
```

이때 circle 모듈은 객체로 반환된다. 따라서 circle.area, circle.circumference와 같은 형식으로 공개된 circle 모듈을 참조한다. app.js를 실행해 보자.

```bash
$ node app
지름이 4인 원의 면적: 50.26548245743669
지름이 4인 원의 둘레: 25.132741228718345
```

# 3. module.exports

**exports 객체는 프로퍼티 또는 메소드를 여러 개 정의할 수 있었다. 하지만 module.exports에는 하나의 값(원시 타입, 함수, 객체)을 할당할 수 있다.**

```javascript
// circle.js
const { PI } = Math;

module.exports = function (r) {
  return {
    area() { return PI * r * r; },
    circumference() { return 2 * PI * r}
  };
```

circle 모듈의 module.exports에는 하나의 함수를 할당하였다.

```javascript
// app.js
const circle = require('./circle');
const myCircle = circle(4);

console.log(`지름이 4인 원의 면적: ${myCircle.area()}`);
console.log(`지름이 4인 원의 둘레: ${myCircle.circumference()}`);
```

require 함수를 통해 circle 모듈을 임포트하여 circle 변수에 할당하였다. 이때 circle 변수는 circle 모듈에서 module.exports에 할당한 값 자체 즉 객체를 반환하는 함수이다.

```javascript
// primitive.js
const pv = 'primitive value';
module.exports = pv;
```

```javascript
// app.js
const value = require('./primitive');
console.log(value); // => 'primitive value'
```

exports와 module.exports는 혼동하기 쉽다. exports는 module.exports에의 참조이며 module.exports의 alias이다. 즉, exports는 module.exports와 같다고 보아도 무방하다. <!-- Node.js의 [document](https://nodejs.org/dist/latest-v6.x/docs/api/modules#modules_exports_alias)에는 만약 exports와 module.exports의 관계가 어렵게 느껴진다면 exports를 무시하고 module.exports만을 사용하라고 권유하고 있다. -->


| 구분            | 모듈 정의 방식                                  | require 함수의 호출 결과
|:---------------|:---------------------------------------------|----------------
| exports        | **exports 객체에는 값을 할당할 수 없고 공개할 대상을 exports 객체에 프로퍼티 또는 메소드로 추가한다.** | exports 객체에 추가한 프로퍼티와 메소드가 담긴 객체가 전달된다.
| module.exports | **module.exports 객체에 하나의 값(원시 타입, 함수, 객체)만을 할당한다.** | module.exports 객체에 할당한 값이 전달된다.

## 3.1 module.exports에 함수를 할당하는 방식

```javascript
// foo.js
module.exports = function(a, b) {
  return a + b;
};
```

```javascript
// app.js
const add = require('./foo');

const result = add(1, 2);
console.log(result); // => 3
```

module.exports는 1개의 값만을 할당할 수 있다. 모듈에서 1개의 값만을 공개하는 것은 불편할 수 있다. 다음과 같이 객체를 사용하여 복수의 기능을 하나로 묶어 공개하는 방식을 사용할 수 있다.

## 3.2 exports에 객체를 할당하는 방식

객체를 외부에 공개하는 경우 다음과 같이 정의한다.

```javascript
// foo.js
module.exports = {
  add (v1, v2) { return v1 + v2 },
  minus (v1, v2) { return v1 - v2 }
};
```

```javascript
// app.js
const calc = require('./foo');

const result1 = calc.add(1, 2);
console.log(result1); // => 3

const result2 = calc.minus(1, 2);
console.log(result2); // => -1
```

# 4. require

require 함수의 인수에는 파일뿐만 아니라 디렉터리를 지정할 수도 있다. 예를 들어 다음과 같은 디렉터리 구조의 경우를 살펴보자.

```
project/
├── app.js
└── module/
    ├── index.js
    ├── calc.js
    └── print.js
```

아래과 같이 모듈을 명시하지 않고 require 함수를 호출하면 해당 디렉터리의 index.js을 로드한다.

```javascript
const myModule = require('./module');
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
  add (v1, v2) { return v1 + v2 },
  minus (v1, v2) { return v1 - v2 }
};
```

```javascript
// module/print.js
module.exports = {
  sayHello() { console.log('Hi!') }
};
```

```javascript
// app.js
const myModule = require('./module');

// module/calc.js의 기능
const result = myModule.calc.add(1, 2);

console.log(result);

// module/print.js의 기능
myModule.print.sayHello();
```

# 5. 코어 모듈과 파일 모듈

Node.js는 기본으로 포함하고 있는 모듈이 있다. 이를 코어 모듈이라 한다. 코어 모듈을 로딩할 때에는 패스를 명시하지 않아도 무방하다.

```javascript
const http = require('http');
```

npm을 통해 설치한 외부 패키지 또한 패스를 명시하지 않아도 무방하다.

```javascript
const mongoose = require('mongoose');
```

코어 모듈과 외부 패키지 이외는 모두 파일 모듈이다. 파일 모듈을 로딩할 때에는 패스를 명시하여야 한다.

```javascript
const foo = require('./lib/foo');
```

# Reference

* [Node.js v6.11.5 : Modules](https://nodejs.org/dist/latest-v8.x/docs/api/modules.html)

* [ES6 Module](http://poiemaweb.com/es6-module)
