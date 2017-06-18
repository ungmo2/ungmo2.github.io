---
layout: post
title: ECMAScript6 - <strong>Arrow function</strong>
subtitle: 화살표 함수
categories: es6
section: es6
description: Arrow function(화살표 함수)은 function 키워드 대신 화살표(=>)를 사용하여 간략한 방법으로 함수를 선언할 수 있다. 하지만 모든 경우 사용할 수 있는 것은 아니다. 문법은 아래와 같다.
---

* TOC
{:toc}

![es6 Logo](/img/es6.png)
{: .w-650}

# 1. Syntax

Arrow function(화살표 함수)은 function 키워드 대신 화살표(=>)를 사용하여 간략한 방법으로 함수를 선언할 수 있다. 하지만 모든 경우 사용할 수 있는 것은 아니다. 문법은 아래와 같다.

```javascript
// 매개변수 지정 방법
    () => { ... } // 매개변수가 없을 경우
     x => { ... } // 매개변수가 한개인 경우, 소괄호를 생략할 수 있다.
(x, y) => { ... } // 매개변수가 여러개인 경우

// 함수 몸체 지정 방법
x => { return x * x }  // single line block
x => x * x             // 함수 몸체가 한줄의 표현식이라면 중괄호를 생략할 수 있으며 자동으로 return된다. 위 표현과 동일하다.

() => { return { a: 1 }; }
() => ({ a: 1 })  // 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다.

() => {           // multi line block.
  const x = 10;
  return x * x;
};
```

# 2. Arrow function의 호출

Arrow function은 익명 함수로만 사용할 수 있다. 따라서 Arrow function을 호출하기 위해서는 함수표현식을 사용한다.

```javascript
// ES5
var pow = function (x) { return x * x; };
console.log(pow(10)); // 100
```

```javascript
// ES6
const pow = x => x * x;
console.log(pow(10)); // 100
```

또는 콜백함수로 사용할 수 있다. 이 경우 일반적인 함수 표현식보다 표현이 간결하다.

```javascript
// ES5
var arr = [1, 2, 3];
var pow = arr.map(function (x) { // x는 요소값
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

# 3. arguments와 rest 파라미터

arguments 객체는 함수 호출 시 전달된 인수(argument)들의 정보를 담고 있는 순회가능한(iterable) 유사 배열 객체(array-like object)이다. 함수 객체의 arguments 프로퍼티는 arguments 객체를 값으로 가지며 함수 내부에서 지역변수처럼 사용된다.

```javascript
// ES5
var foo = function (x, y) {
  console.log(arguments);
};

foo(1, 2); // { '0': 1, '1': 2 }
```

ES5에서 매개변수 갯수가 확정되지 않은 가변 인자 함수를 구현할 때 arguments 객체가 유용하게 사용된다. 하지만 arguments 객체는 유사 배열 객체이기 때문에 배열 메서드를 사용하려면 [Function.prototype.call](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call), [Function.prototype.apply](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)를 사용하여야 하는 번거로움이 있다.

```javascript
// ES5
function sum() {
  // arguments 객체를 배열로 변환
  var array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  });
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

ES6의 Arrow function에는 함수 객체의 [arguments](/js-function#61-arguments-속성) 프로퍼티가 없다.

```javascript
var es5 = function () {};
console.log(es5.hasOwnProperty('arguments')); // true

const es6 = () => {};
console.log(es6.hasOwnProperty('arguments')); // false
```

ES6에서는 [rest 파라미터](./es6-extended-parameter-handling#2-rest-파라미터-rest-parameter)를 사용하여 가변인자를 함수 내부에 배열로 전달한다.

```javascript
// ES6
function sum(...args) {
  console.log(Array.isArray(args)); // true
  return args.reduce((pre, cur) => pre + cur);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

# 4. this

function 키워드를 사용하여 생성한 일반 함수와 Arrow function와의 가장 큰 차이점은 this이다. 

## 4.1 일반 함수의 this

일반 함수의 경우, 해당 함수 호출 패턴에 따라 [this](./js-this)에 바인딩되는 객체가 달라진다. 콜백함수 내부의 this는 전역 객체 window를 가리킨다.

```javascript
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  // (A)
  return arr.map(function (x) {
    return this.prefix + ' ' + x; // (B)
  });
};

var pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```

(A)에서의 this는 생성자 함수 Prefixer가 생성한 객체, 즉 생성자 함수의 인스턴스(위 예제의 경우 pre)이다.

(B)에서 사용한 this는 아마도 생성자 함수 Prefixer가 생성한 객체(위 예제의 경우 pre)일 것으로 기대하였겠지만 이곳에서 this는 전역 객체 window를 가리킨다. 이는 생성자 함수와 객체의 메서드를 제외한 모든 함수(내부함수, 콜백함수 포함)의 내부의 this는 전역객체를 가리키기 때문이다.

위 설명이 잘 이해되지 않는다면 [this](./js-this)를 참조하기 바란다.

콜백함수 내부의 this가 메서드를 호출한 객체(생성자 함수의 인스턴스)를 가리키게 하기 위해서는 아래의 4가지 방법이 있다.

```javascript
// Solution 1: that = this
Prefixer.prototype.prefixArray = function (arr) {
  var that = this;  // this: Prefixer 생성자 함수의 인스턴스
  return arr.map(function (x) {
    return this.prefix + ' ' + x;
  });
};

var pre = new Prefixer('Hi ');
console.log(pre.prefixArray(['Lee', 'Kim']));
```

```javascript
// Solution 2: map(func, this)
Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + ' ' + x;;
  }, this); // this: Prefixer 생성자 함수의 인스턴스
};
```

ES5에 추가된 [Function.prototype.bind()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)로 this를 바인딩한다. [call(), apply()도 사용 가능하다.](./js-this#apply--apply-invocation-pattern)

```javascript
// Solution 3: bind(this)
Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + ' ' + x;;
  }.bind(this)); // this: Prefixer 생성자 함수의 인스턴스
};
```

## 4.2 Arrow function의 this

Arrow function은 언제나 자신을 포함하는 외부 scope에서 this를 계승 받는다. 다시 말해 Arrow function은 자신만의 this를 생성하지 않고 자신을 포함하고 있는 컨텍스트로 부터 this를 계승 받는다. 이를 <strong>Lexical this</strong>라 한다. Arrow function은 Solution 3의 Syntactic sugar이다. 

```javascript
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(x => `${this.prefix}  ${x}`);
};

const pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```

<!--이것을 class로 표현하면 아래와 같다.

```javascript
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }
  prefixArray(arr) {
    return arr.map(x => `${this.prefix}  ${x}`); // (A)
  }
}

const pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```-->

# 3. Arrow Function을 사용해서는 안되는 경우

Arrow Function는 Lexical this를 지원하므로 콜백함수에 사용하기 편리하다. 하지만 Arrow Function을 사용하는 것이 오히려 혼란을 불러오는 경우도 있기 때문에 주의하여야 한다. 

## 3.1 메서드

메서드 정의 시 Arrow Function을 사용하는 것은 피해야 한다. Arrow Function으로 메서드를 정의하여 보자.

```javascript
const obj = {
  name: 'Lee',
  sayHi: () => console.log(`Hi ${this.name}`)
};

obj.sayHi(); // Hi undefined
```

해당 메서드를 소유한 객체 즉 해당 메서드를 호출한 객체에 this를 바인딩하지 않고 window에 바인딩된다. 따라서 Arrow Function으로 메서드를 정의하는 것은 바람직하지 않다.

ES6의 축약 메서드 정의 방식으로 위 예제를 수정하여 보자. ES6의 축약 메서드 정의는 메서드명에 할당된 함수를 위한 단축 표기법이다.

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

prototype에 메서드를 할당하는 경우도 동일한 문제가 발생한다. Arrow Function으로 prototype에 메서드를 할당하여 보자.

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

## 3.3 생성자 함수

Arrow Function은 생성자 함수로 사용할 수 없다. 생성자 함수는 prototype 프로퍼티를 가지며 prototype 프로퍼티가 가리키는 프로토타입 객체에 constructor를 사용한다. 하지만 Arrow Function은 prototype 프로퍼티를 가지고 있지 않는다.

```javascript
const Foo = () => {};
console.log(Foo.hasOwnProperty('prototype')); // false
const foo = new Foo(); // TypeError: Foo is not a constructor
```

# Reference

* [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf)

* [ECMAScript 6 New Features: Overview & Comparison](http://es6-features.org/#Constants)

* [ES6 compat table](https://kangax.github.io/compat-table/es6/)

* [Arrow functions](http://exploringjs.com/es6/ch_arrow-functions.html)
