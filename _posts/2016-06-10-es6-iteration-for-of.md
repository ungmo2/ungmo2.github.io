---
layout: post
title: ECMAScript6 - <strong>Iteration protocol & for-of</strong>
subtitle: 이터레이션 프로토콜(iteration protocol)과 for-of 루프
categories: es6
section: es6
description: ES6에는 이터러블(iterable)과 이터레이터(iterator)를 정의한 이터레이션 프로토콜(iteration protocol)이 추가되었다. 이터러블은 순회 가능한 자료 구조이다. Symbol.iterator를 key로 사용한 메서드를 구현하는 것에 의해 순회 가능한 자료 구조인 이터러블이 된다. 이터러블의 Symbol.iterator를 key로 사용한 메서드는 이터레이터를 반환한다. 이터레이터는 순회 가능한 자료 구조인 이터러블의 요소를 탐색하기 위한 포인터이다.
---

* TOC
{:toc}

![es6 Logo](./img/es6.png)
{: .w-650}

# 1. 이터레이션 프로토콜(Iteration protocol)

ES6에는 이터러블(iterable)과 이터레이터(iterator)를 정의한 이터레이션 프로토콜(iteration protocol)이 추가되었다.

이터러블(iterable)
: 이터러블은 순회 가능한 자료 구조이다. Symbol.iterator를 key로 사용한 메서드를 구현하는 것에 의해 순회 가능한 자료 구조인 이터러블이 된다.

이터레이터
: 이터러블의 Symbol.iterator를 key로 사용한 메서드는 이터레이터를 반환한다. 이터레이터는 순회 가능한 자료 구조인 이터러블의 요소를 탐색하기 위한 포인터이다.

ES6에서 제공하는 빌트인 이터러블은 아래와 같다. 아래의 객체들은 Symbol.iterator를 key로 사용한 메서드를 구현하고 있다.

Array 
: Array.prototype[Symbol.iterator]

String 
: String.prototype[Symbol.iterator]

Map 
: Map.prototype[Symbol.iterator]

Set 
: Set.prototype[Symbol.iterator]

DOM data structures 
: NodeList.prototype[Symbol.iterator]  
HTMLCollection.prototype[Symbol.iterator]

이터레이션 프로토콜은 다양한 데이터 소스에 순차적으로 접근할 수 있는 일관된 방법을 제시한다.

```javascript
const iterable = ['a', 'b', 'c'];

const iterator = iterable[Symbol.iterator]();

console.log(iterator.next()); // Object{value: "a", done: false}
console.log(iterator.next()); // Object{value: "b", done: false}
console.log(iterator.next()); // Object{value: "c", done: false}
console.log(iterator.next()); // Object{value: undefined, done: true}
```

# 2. for-of 루프

for-of 루프는 이터러블 객체를 순회한다. 

```javascript
// 배열
for (const val of ['a', 'b', 'c']) {
  console.log(val);
}

// 문자열
for (const val of 'abc') {
  console.log(val);
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

객체는 이터러블이 아니다. Symbol.iterator를 key로 사용한 메서드를 구현하여 객체를 이터러블로 만들수 있다. 

피보나치 수열을 구현한 간단한 이터러블 객체를 만들어 보자.

```javascript
const fibonacci = {
  maxStep: 10,
  [Symbol.iterator]() {
    let prev = 0;
    let curr = 1;
    let step = 0;
    const maxStep = this.maxStep;
    return {
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
```

Symbol.iterator를 key로 사용한 메서드는 next() 함수를 프로퍼티로 가지는 객체를 반환하여야 한다. 그리고 next() 함수는 done과 value 프로퍼티를 가지는 객체를 반환한다. for-of는 done 프로퍼티가 true가 될 때까지 반복하며 done 프로퍼티가 false가 되면 반복을 중지한다.

# Reference

* [MDN: Iterators and generators](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Iterators_and_Generators)

* [MDN: for...of](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of)

* [Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html)

* [심볼(Symbol)](http://poiemaweb.com/es6-symbol)
