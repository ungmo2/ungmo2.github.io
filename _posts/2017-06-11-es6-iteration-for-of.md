---
layout: post
title: <strong>Iteration protocol & for-of</strong>
subtitle: 이터레이션 프로토콜(iteration protocol)과 for-of 루프
categories: es6
section: es6
seq: 6
subseq: 10
description: ES6에는 이터러블(iterable)과 이터레이터(iterator)를 정의한 이터레이션 프로토콜(iteration protocol)이 추가되었다. 이터러블은 순회 가능한 자료 구조이다. Symbol.iterator를 프로퍼티 키로 사용한 메소드를 구현하는 것에 의해 순회 가능한 자료 구조인 이터러블이 된다. 이터러블의 Symbol.iterator를 프로퍼티 키로 사용한 메소드는 이터레이터를 반환한다. 이터레이터는 순회 가능한 자료 구조인 이터러블의 요소를 탐색하기 위한 포인터이다.
---

* TOC
{:toc}

![es6 Logo](./img/es6.png)
{: .w-650}

# 1. 이터레이션 프로토콜(Iteration protocol)

이터레이션 프로토콜(iteration protocol)은 ES6에서 새롭게 도입된 for...of 문을 통해 반복 처리를 수행하기 위한 프로토콜(미리 약속된 규칙)이다. 이터레이션 프로토콜은 이터러블 프로토콜(iterable protocol)과 이터레이터 프로토콜(iterator protocol)로 구성된다.

이터러블 프로토콜을 준수한 객체를 이터러블 객체라 하고 이터레이터 프로토콜을 준수한 객체를 이터레이터 객체라 한다. 먼저 이터러블 객체와 이터레이터 객체가 무엇인지 살펴보자.

## 1.1 이터러블 객체

이터러블(iterable) 객체는 <strong>Symbol.iterator 메소드</strong>를 소유(하거나 프로토타입 체인에 의해 상속)한 객체를 말한다. 이러한 규약을 이터러블 프로토콜(iterable protocol)이라 하며 이터러블 프로토콜을 준수한 객체가 이터러블 객체이다.

이터러블 프로토콜을 준수하면 for...of 문에서 순회가 가능해 진다. 따라서 이터러블 객체는 for...of 문에서 순회 가능한 객체이다.

```javascript
const array = [1, 2, 3];

// 배열은 Symbol.iterator 메소드를 소유한다.
// 따라서 배열은 이터러블 프로토콜을 준수한 이터러블 객체이다.
console.log(typeof array[Symbol.iterator]); // function

// 이터러블 프로토콜을 준수한 배열은 for...of 문에서 순회 가능하다.
for (const item of array) {
  console.log(item);
}
```

## 1.2 이터레이터 객체

이터러블 프로토콜을 준수한 이터러블 객체는 Symbol.iterator 메소드를 소유한다. 이 메소드를 호출하면 이터레이터(iterator) 객체를 반환한다. Symbol.iterator 메소드가 반환한 이터레이터 객체는 <strong>next 메소드</strong>를 갖는다.

```javascript
// 배열은 이터러블 프로토콜을 준수한 이터러블 객체이다.
const array = [1, 2, 3];

// Symbol.iterator 메소드는 이터레이터(iterator) 객체를 반환한다.
const iterator = array[Symbol.iterator]();

// 이터레이터 객체는 next 메소드를 갖는다.
console.log(typeof iterator.next); // function
```

![iteration-protocol](./img/iteration-protocol.png)

이터레이션 프로토콜(Iteration protocol)
{: .desc-img}

이터레이터 객체의 next 메소드를 호출하면 value, done 프로퍼티를 갖는 <strong>이터레이터 리절트(iterator result) 객체<strong>를 반환한다.

```javascript
// 배열은 이터러블 프로토콜을 준수한 이터러블 객체이다.
const array = [1, 2, 3];

// Symbol.iterator 메소드는 이터레이터(iterator) 객체를 반환한다.
const iterator = array[Symbol.iterator]();

// 이터레이터 객체는 next 메소드를 갖는다.
console.log(typeof iterator.next); // function

// 이터레이터 객체의 next 메소드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트(iterator result) 객체를 반환한다.
let iteratorResult = iterator.next();
console.log(iteratorResult); // {value: 1, done: false}
```

이터레이터 객체의 next 메소드를 호출할 때 마다 이터러블 객체를 순회하며 이터레이터 리절트 객체를 반환한다.

```javascript
// 배열은 이터러블 프로토콜을 준수한 이터러블 객체이다.
const array = [1, 2, 3];

// Symbol.iterator 메소드는 이터레이터(iterator) 객체를 반환한다.
const iterator = array[Symbol.iterator]();

// 이터레이터 객체는 next 메소드를 갖는다.
console.log(typeof iterator.next); // function

// 이터레이터 객체의 next 메소드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트(iterator result) 객체를 반환한다.
// next 메소드를 호출할 때 마다 이터러블 객체를 순회하며 이터레이터 리절트 객체를 반환한다.
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

이터레이터 객체의 next 메소드가 반환하는 이터레이터 리절트 객체의 value 프로퍼티는 현재 순회 중인 이터러블 객체의 값을 반환하고 done 프로퍼티는 이터러블의 순회 완료 여부를 반환한다.

이터레이터 프로토콜은 next 메소드를 소유하며 next 메소드를 호출하면 이터러블 객체를 순회하며 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 것이다. 이 규약을 준수한 객체가 이터레이터 객체이다. 이터레이터 객체는 next 메소드는 이터러블 객체의 각 요소를 순회하기 위한 포인터의 역할한다. 이 메소드를 통해 이터러블 객체를 순회할 때 처리 단계를 제어할 수 있다.

## 1.3 빌트인 이터러블 객체

ES6에서 제공하는 빌트인 이터러블 객체는 아래와 같다.

Array, String, Map, Set, TypedArray(Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), DOM data structure(NodeList, HTMLCollection), Arguments
{: .info}

```javascript
// 배열은 이터러블 객체이다.
const array = [1, 2, 3];

// 이터러블 객체는 Symbol.iterator 메소드를 소유한다.
// Symbol.iterator 메소드는 이터레이터 객체를 반환한다.
let iter = array[Symbol.iterator]();

// 이터레이터 객체는 next 메소드를 소유한다.
// next 메소드는 이터레이터 리절트 객체를 반환한다.
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: undefined, done: true}

// 이터러블 객체는 for...of 문에서 순회 가능하다.
for (const item of array) {
  console.log(item);
}

// 문자열은 이터러블 객체이다.
const string = 'hi';

// 이터러블 객체는 Symbol.iterator 메소드를 소유한다.
// Symbol.iterator 메소드는 이터레이터 객체를 반환한다.
iter = string[Symbol.iterator]();

// 이터레이터 객체는 next 메소드를 소유한다.
// next 메소드는 이터레이터 리절트 객체를 반환한다.
console.log(iter.next()); // {value: "h", done: false}
console.log(iter.next()); // {value: "i", done: false}
console.log(iter.next()); // {value: undefined, done: true}

// 이터러블 객체는 for...of 문에서 순회 가능하다.
for (const letter of string) {
  console.log(letter);
}

// arguments 객체는 이터러블 객체이다.
(function () {
  // 이터러블 객체는 Symbol.iterator 메소드를 소유한다.
  // Symbol.iterator 메소드는 이터레이터 객체를 반환한다.
  iter = arguments[Symbol.iterator]();

  // 이터레이터 객체는 next 메소드를 소유한다.
  // next 메소드는 이터레이터 리절트 객체를 반환한다.
  console.log(iter.next()); // {value: 1, done: false}
  console.log(iter.next()); // {value: 2, done: false}
  console.log(iter.next()); // {value: undefined, done: true}

  // 이터러블 객체는 for...of 문에서 순회 가능하다.
  for (const arg of arguments) {
    console.log(arg);
  }
}(1, 2));
```

아래는 for 문을 사용하여 이터레이터 객체의 next 메소드를 호출하여 이터러블 객체를 순회하는 예이다.

```javascript
// 이터러블 객체
const iterable = [1, 2, 3];

// 이터레이터 객체
const iterator = iterable[Symbol.iterator]();

for (;;) {
  // 이터레이터 객체의 next 메소드를 호출하여 이터러블 객체를 순회한다.
  const res = iterator.next();

  // next 메소드가 반환하는 이터레이터 리절트 객체의 done 프로퍼티가 true가 될 때까지 반복한다.
  if (res.done) break;

  console.log(res);
}
```

# 2. for...of 문

for...of 문은 내부적으로 이터레이터 객체의 next 메소드를 호출하여 이터러블 객체를 순회하며 next 메소드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for...of 문의 변수에 할당한다. 그리고 next 메소드가 반환한 이터레이터 리절트 객체의 done 프로퍼티 값이 false이면 이터러블 객체의 순회를 계속하고 true이면 이터러블 객체의 순회를 중단한다.

```javascript
// 배열
for (const item of ['a', 'b', 'c']) {
  console.log(item);
}

// 문자열
for (const letter of 'abc') {
  console.log(letter);
}

// Map
for (const [key, value] of new Map([['a', '1'], ['b', '2'], ['c', '3']])) {
  console.log(`key : ${key} value : ${value}`); // key : a value : 1 ...
}

// Set
for (const val of new Set([1, 2, 3])) {
  console.log(val);
}
```

# 3. 커스텀 이터러블 객체

일반 객체는 이터러블 객체가 아니다. 일반 객체는 Symbol.iterator 메소드를 소유하지 않는다. 즉, 일반 객체는 이터러블 프로토콜을 준수하지 않으므로 for...of 문으로 순회할 수 없다.

```javascript
// 일반 객체는 이터러블 객체가 아니다.
const obj = { a: 1, b: 2 };

// 일반 객체는 Symbol.iterator 메소드를 소유하지 않는다.
iter = obj[Symbol.iterator](); // TypeError: obj[Symbol.iterator] is not a function

// 일반 객체는 이터러블이 아니므로 for...of 문으로 순회할 수 없다.
// TypeError: obj is not iterable
for (const key of obj) {
  console.log(key);
}
```

하지만 이터레이션 프로토콜을 준수하는 객체를 만들면 for...of 문으로 순회 가능한 이터러블 객체를 만들수 있다.

피보나치 수열(1, 2, 3, 5, 8, 13, 21, 34, 55, 89...)을 구현한 간단한 이터러블 객체를 만들어 보자. Symbol.iterator를 프로퍼티 키로 사용하는 메소드를 구현하여 이터러블 프로토콜을 준수하면 for...of 문으로 순회 가능한 이터러블이 된다.

```javascript
const fibonacci = {
  // Symbol.iterator 메소드를 구현하여 이터러블 프로토콜을 준수
  [Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    // 순회 카운터
    let step = 0;
    // 최대 순회수
    const maxStep = 10;

    // Symbol.iterator 메소드는 next 메소드를 소유한 이터레이터 객체를 반환해야 한다.
    // next 메소드는 이터레이터 리절트 객체를 반환
    return {
      // fibonacci 객체를 순회할 때마다 next 메소드가 호출된다.
      next() {
        [prev, curr] = [curr, prev + curr];
        return { value: curr, done: step++ >= maxStep };
      }
    };
  }
};

for (const num of fibonacci) {
  console.log(num);
}

// spread 연산자
const arr = [...fibonacci];
console.log(arr); // [ 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ]

// 디스트럭처링
const [first, second, ...rest] = fibonacci;
console.log(first, second, rest); // 1 2 [ 3, 5, 8, 13, 21, 34, 55, 89 ]
```

Symbol.iterator 메소드는 next 메소드를 갖는 객체를 반환하여야 한다. 그리고 next 메소드는 done과 value 프로퍼티를 가지는 객체(iterator result)를 반환한다. for...of 문은 done 프로퍼티가 true가 될 때까지 반복하며 done 프로퍼티가 true가 되면 반복을 중지한다.

이터러블 객체는 for...of 문뿐만 아니라 디스트럭쳐링, spread 연산자, Map과 Set의 생성자에도 사용된다.

# Reference

* [MDN: Iterators and generators](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Iterators_and_Generators)

* [MDN: for...of](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of)

* [Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html)

* [심볼(Symbol)](./es6-symbol)
