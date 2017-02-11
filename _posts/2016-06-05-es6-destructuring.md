---
layout: post
title: ECMAScript6 - <strong>Destructuring</strong>
subtitle: 디스트럭처링
categories: es6
section: es6
description: ECMAScript6 ES6 디스트럭처링 Destructuring
---

* TOC
{:toc}

![es6 Logo](/img/es6.png)
{: .w-650}

Destructuring은 객체 또는 배열에 저장되어 있는 여러 값을 추출해내는 매우 편리한 방법이다.

# 1. 객체 디스트럭처링 (Object destructuring)

ES5의 경우, 객체의 값에 접근 또는 할당하기 위해서는 속성명(키)를 사용하여야 한다.

```javascript
var obj = { first: 'Jane', last: 'Doe' };
var name = {};

name.first = obj.first;
name.last  = obj.last;

console.log(name); // { first: 'Jane', last: 'Doe' }
```

ES6에서는 destructuring을 사용할 수 있다.

```javascript
const obj = { first: 'Jane', last: 'Doe' };
const {first: f, last: l} = obj;
// f = 'Jane', l = 'Doe'

console.log({first: f, last: l});
// { first: 'Jane', last: 'Doe' }

// {prop} is short for {prop: prop}
const {first, last} = obj;
// first = 'Jane'; last = 'Doe'

console.log({first, last});
// { first: 'Jane', last: 'Doe' }
```

속성명을 지정하여 여러 값이 저장되어 있는 객체에서 원하는 값만을 추출할 수 있다.

```javascript
function margin() {
  const left = 1, right = 2, top = 3, bottom = 4;
  return { left, right, top, bottom };
}
const { left, bottom } = margin();
console.log(left, bottom); // 1 4
```

중첩 객체의 경우는 아래와 같이 사용한다.

```javascript
function settings() {
  return { display: { color: 'red' }, keyboard: { layout: 'qwerty'} };
}
const { display: { color: displayColor }, keyboard: { layout: keyboardLayout }} = settings();

console.log(displayColor, keyboardLayout); // red qwerty
```

# 2. 배열 디스트럭처링 (Array destructuring)

배열의 경우도 객체의 경우와 유사하다.

```javascript
const iterable = ['a', 'b'];
const [x, y] = iterable; // x = 'a', y = 'b'

console.log([x, y]); // [ 'a', 'b' ]
```

객체의 경우 속성명이 일치하는 값을 가지고 오지만 배열의 경우, 순차적으로 값이 저장된다.

```javascript
const [all, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('1999-12-31');

console.log([all, year, month, day]); // [ '1999-12-31', '1999', '12', '31' ]
```

필요한 값만을 추출할 수 있다.

```javascript
const array = [1, 2, 3, 4];
const [first, ,third] = array;
console.log(first, third); // 1 3
```

# Reference

* [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf)

* [ECMAScript 6 New Features: Overview & Comparison](http://es6-features.org/#Constants)

* [ES6 compat table](https://kangax.github.io/compat-table/es6/)
