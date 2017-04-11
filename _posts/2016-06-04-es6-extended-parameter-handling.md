---
layout: post
title: ECMAScript6 - <strong>Extended Parameter Handling</strong>
subtitle: 함수 파라미터 확장
categories: es6
section: es6
description: ECMAScript6 ES6 'Extended Parameter Handling' '함수 파라미터 확장'
---

* TOC
{:toc}

![es6 Logo](/img/es6.png)
{: .w-650}

# 1. 기본 파라미터 초기값 (Default Parameter value)

파라미터에 초기값을 설정하여 함수 내에서 수행하던 파라미터 체크 및 초기화를 간편화할 수 있다.

```javascript
// ES5
function plus(x, y) {
  x = x || 0;
  y = y || 0;
  return x + y;
}

console.log(plus());     // 0
console.log(plus(1, 2)); // 3
```

```javascript
// ES6
function plus(x = 0, y = 0) {
  return x + y;
}

console.log(plus());     // 0
console.log(plus(1, 2)); // 3
```

# 2. Rest 파라미터 (Rest Parameter)

ES6 이전에는 인자의 갯수를 사전에 알 수 없는 가변 인자 함수의 경우, [arguments 객체](http://poiemaweb.com/js-function#61-arguments-속성)를 통해 인자값을 확인한다. arguments 객체는 함수 호출 시 전달된 인수들의 정보를 배열의 형태로 담고 있는 객체로 함수 내부에서 지역변수처럼 사용된다.

```javascript
function variadic() {
  console.log(arguments);
}

variadic(1,2,3); // { '0': 1, '1': 2, '2': 3 }
```

arguments 객체는 유사배열객체(array-like object)로 이것를 배열로 변환하려면 call 메서드를 사용한다.

```javascript
function variadic() {
  // console.log(arguments);
  var array = Array.prototype.slice.call(arguments);
  console.log(array);
}

variadic(1,2,3); // [ 1, 2, 3 ]
```

ES6의 Rest 파라미터는 가변인자를 함수 내부에 <string>배열</string>로 전달한다. 따라서 유사 배열인 arguments 객체를 배열로 변환하는 등의 번거로움을 피할 수 있다.

```javascript
// ES5
function sum() {
  var array = Array.prototype.slice.call(arguments);
  return array.reduce(function(pre, cur) {
    return pre + cur;
  });
}

console.log(sum(1, 2, 3, 4, 5));
```

```javascript
// ES6
function sum(...args) {
  console.log(Array.isArray(args)); // true
  return args.reduce((pre, cur) => pre + cur);
}
console.log(sum(1, 2, 3, 4, 5));
```

# 3. Spread 연산자 (Spread Operator)

Spread 연산자(...)는 배열을 다른 배열의 내부에 삽입시킨다.

```javascript
// ES5
var arr = [ 1, 2, 3 ];
console.log(arr.concat([ 4, 5, 6 ])); // [ 1, 2, 3, 4, 5, 6 ]
```

```javascript
// ES6
var arr = [ 1, 2, 3 ];
console.log([ ...arr, 4, 5, 6 ]); // [ 1, 2, 3, 4, 5, 6 ]
```

배열을 함수의 인수로 사용하고 싶은 경우, Function.prototype.apply를 사용하는 것이 일반적이다. 하지만 Spread 연산자를 사용하면 Function.prototype.apply를 사용할 필요가 없다.

```javascript
// ES5
function sum() {
  var array = Array.prototype.slice.call(arguments);
  return array.reduce(function(pre, cur) {
    return pre + cur;
  });
}

var arr = [1, 2, 3, 4, 5];

console.log(sum.apply(null, arr));
```

```javascript
// ES6
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur);
}

var arr = [1, 2, 3, 4, 5];

console.log(sum(...arr));
```

# Reference

* [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf)

* [ECMAScript 6 New Features: Overview & Comparison](http://es6-features.org/#Constants)

* [ES6 compat table](https://kangax.github.io/compat-table/es6/)
