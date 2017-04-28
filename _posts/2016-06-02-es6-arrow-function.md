---
layout: post
title: ECMAScript6 - <strong>Arrow function</strong>
subtitle: 화살표 함수
categories: es6
section: es6
description: ECMAScript6 ES6 '화살표 함수' 'Arrow function'
---

* TOC
{:toc}

![es6 Logo](/img/es6.png)
{: .w-650}

Arrow function(화살표 함수)은 익명함수를 간략하게 표현할 수 있으며 Lexical this를 제공한다.

# 1. Syntex

Arrow function은 항상 익명으로 사용한다. 문법은 아래와 같다.

```javascript
// 매개변수 지정
    () => { ... } // 매개변수가 없을 경우
     x => { ... } // 매개변수가 한개인 경우는 괄호를 생략할 수 있다.
(x, y) => { ... } // 매개변수가 여러개인 경우

// 함수 몸체 지정
x => { return x * x }  // block
x => x * x             // 위 표현과 동일하다.
```

Arrow function은 일반적인 함수 표현식보다 표현이 간단하다.

```javascript
// ES5
var arr = [1, 2, 3];
var pow = arr.map(function(x) {
  // x는 요소값
  return x * x;
});

console.log(pow); // [ 1, 4, 9 ]
```

```javascript
// ES6
const arr = [1, 2, 3];
const pow = arr.map(x => x * x);

console.log(pow); // [ 1, 4, 9 ]
```

# 2. this

function 키워드를 사용하여 생성한 일반 함수와 Arrow function와의 가장 큰 차이점은 this이다. 

일반 함수의 경우, 해당 함수 호출 패턴에 따라 [this](./js-this)에 바인딩되는 객체가 달라진다. 콜백함수 내부의 this는 전역 객체 window를 가리킨다.

Arrow function은 위의 규칙을 따르지 않고 언제나 자신을 포함하는 외부 scope에서 this를 계승 받는다. 이를 <strong>Lexical this</strong>라 한다.

```javascript
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  // (B)
  return arr.map(function (x) {
    return this.prefix + x; // (A)
  });
};

var pre = new Prefixer('Hi ');
console.log(pre.prefixArray(['Lee', 'Kim']));
```

(A)에서 사용한 this는 아마도 생성자 함수 Prefixer가 생성한 객체(위 예제의 경우 pre)일 것으로 기대하였겠지만 이곳에서 this는 전역 객체 window를 가리키므로 기대한 대로 동작하지 않는다.  
(B)에서의 this는 생성자 함수 Prefixer가 생성한 객체(위 예제의 경우 pre)이다.

위 설명이 잘 이해되지 않는다면 [this](./js-this)를 참조하기 바란다.

콜백함수 내부의 this가 메서드를 호출한 객체를 가리키게 하기 위해서는 아래의 4가지 방법이 있다.

```javascript
// Solution 1: that = this
Prefixer.prototype.prefixArray = function (arr) {
  var that = this;  // (A)
  return arr.map(function (x) {
    return that.prefix + x;
  });
};
```

```javascript
// Solution 2: map(func, this)
Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + x;
  }, this); // (A)
};
```

ES5에 추가된 [Function.prototype.bind()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)로 this를 바인딩한다. [call(), apply()도 사용 가능하다.](./js-this#apply--apply-invocation-pattern)

```javascript
// Solution 3: bind(this)
Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + x;
  }.bind(this)); // (A)
};
```

Arrow function은 Solution 3의 Syntactic sugar이다.

```javascript
Prefixer.prototype.prefixArray = function (arr) {
  return arr.map((x) => this.prefix + x);
};
```

이것을 class로 표현하면 아래와 같다.

```javascript
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }
  prefixArray(arr) {
    return arr.map(x => this.prefix + x); // (A)
  }
}
```

# 3. Arrow Function을 사용해서는 안되는 경우

Arrow Function는 Lexical this를 지원하므로 콜백함수에 사용하기 편리하다. 하지만 Arrow Function을 사용하는 것이 오히려 혼란을 불러오는 경우도 있기 때문에 주의하여야 한다.

## 3.1 객체 메서드

Arrow Function으로 메서드를 정의하여 보자.

```javascript
const obj = {
  name: 'Lee',
  sayHi: () => console.log(`Hi ${this.name}`)
};

obj.sayHi(); // Hi undefined
```

해당 메서드를 소유한 객체 즉 해당 메서드를 호출한 객체에 this를 바인딩하지 않고 window에 바인딩된다. 따라서 Arrow Function으로 메서드를 정의하는 것은 바람직하지 않다.

ES6의 축약 메서드 정의 또는 일반 메서드 정의 방식으로 위 예제를 수정하여 보자. ES6의 축약 메서드 정의는 메서드명에 할당된 함수를 위한 단축 표기법이다.

```javascript
const obj = {
  name: 'Lee',
  sayHi() { // === sayHi: function() {
    console.log(`Hi ${this.name}`);
  }
};

obj.sayHi(); // Hi Lee
```

## 3.2 prototype

Arrow Function으로 prototype에 메서드를 할당하여 보자.

```javascript
const obj = {
  name: 'Lee',
};

Object.prototype.sayHi = () => console.log(`Hi ${this.name}`);

obj.sayHi(); // Hi undefined
```

Arrow Function으로 객체 메서드를 정의하였을 때와 같은 문제가 발생한다. 일반 함수를 할당한다.

```javascript
const obj = {
  name: 'Lee',
};

Object.prototype.sayHi = function() {
  console.log(`Hi ${this.name}`);
};

obj.sayHi(); // Hi Lee
```

# Reference

* [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf)

* [ECMAScript 6 New Features: Overview & Comparison](http://es6-features.org/#Constants)

* [ES6 compat table](https://kangax.github.io/compat-table/es6/)

* [Arrow functions](http://exploringjs.com/es6/ch_arrow-functions.html)
