---
layout: post
title: Javascript <strong>Immutability</strong>
subtitle: 객체와 변경불가성(Immutability)
categories: javascript
section: javascript
description: Immutability(변경불가성)은 함수형 프로그래밍의 핵심 원리이다. Immutability는 인스턴스화 된 후 무언가를 변경할 수 없는 디자인 패턴이다. 그 값을 변경하려면 새로운 값을 다시 만들어야한다. Javascript의 기본 자료형(primitive data type)은 변경 불가능한 값(immutable value)이다. 
---

* TOC
{:toc}

# 1. Immutability(변경불가성)이란?

Immutability(변경불가성)은 함수형 프로그래밍의 핵심 원리이다. Immutability는 인스턴스화 된 후 무언가를 변경할 수 없는 디자인 패턴이다. 그 값을 변경하려면 새로운 값을 다시 만들어야한다.

Javascript의 기본 자료형(primitive data type)은 변경 불가능한 값(immutable value)이다.

- Boolean
- null
- undefined
- Number
- String
- Symbol (New in ECMAScript 6)

기본 자료형 이외의 모든 값은 객체(Object) 타입이며 객체 타입은 변경 가능한 값(mutable value)이다. 즉 객체는 새로운 값을 다시 만들 필요없이 직접 변경이 가능하다는 것이다.

예를 들어 살펴보자. C 언어와는 다르게 Javascript의 문자열은 변경 불가능한 값(immutable value) 이다. 이런 값을 "primitive values" 라 한다. (변경이 불가능하다는 뜻은 메모리 영역에서의 변경이 불가능하다는 뜻이다. 재할당은 가능하다)

```javascript
var statement = "I am an immutable value"; // string은 immutable value

var otherStr = statement.slice(8, 17);

console.log(otherStr);   // "immutable"
console.log(statement);  // "I am an immutable value"
```

2행에서 Stirng 객체의 slice() 메서드는 statement 변수에 저장된 문자열을 변경하는 것이 아니라 사실은 새로운 문자열을 생성하여 반환하고 있다. 그 이유는 문자열은 변경할 수 없는 immutable value이기 때문이다.

```javascript
var arr = [];
console.log(arr.length); // 0

var v2 = arr.push(2);    // arr.push()는 메서드 실행 후 arr의 length를 반환
console.log(arr.length); // 1
```

상기 예제에서 v2의 값은 무엇인가? 문자열의 예와 같이 배열이 동작한다면 v2는 새로운 배열(하나의 요소를 가지고 그 값은 2인)을 가지게 될 것이다. 그러나 객체인 arr은 push 메서드에 의해 update되고 v2에는 배열의 새로운 length 값이 반환된다.

처리 후 결과의 복사본을 리턴하는 문자열의 메서드 slice()와는 달리 배열(객체)의 메서드 push()는 `직접 대상 배열을 변경`한다. 그 이유는 배열은 객체이고 객체는 immutable value가 아닌 변경 가능한 값이기 때문이다.

다른 예를 알아보자. 

```javascript
var person = {
  name: 'Lee',
  age: 20
};

var myAge = person.age; // 변수 myAge는 number 타입이다.

person.age = 30;

console.log(myAge); // 20
```

person.age의 값을 변경했지만 myAge의 값은 변경되지 않았다. 이는 person.age의 타입 number가 변경 불가능하기 때문이다.

```javascript
var person1 = {
  name: 'Lee',
  age: 20
};

var person2 = person1; // 변수 person2는 객체 타입이다.

person2.age = 30;

console.log(person1.age); // 30
console.log(person2.age); // 30
```

위의 경우 객체 person2의 age의 값을 변경하면 객체 person1의 값도 변경된다. 이는 person1과 person2가 객체 타입이고 객체는 변경 가능하기 때문이다.

![immutability](/img/immutability.png)
{: .w-400}

Pass-by-reference
{: .desc-img}

객체는 변경 가능하기 때문에 의도치 않게 값이 변경될 가능성이 있어서 데이터의 일관성을 유지하는 것이 곤란하다. 이는 규모가 작은 애플리케이션이라면 큰 문제가 되지 않을 수 있만 이는 커지면 커질 수록 문제가 될 수 있다.

객체를 변경 불가능한 값(immutable value)으로 만들어 사용하면 이러한 문제를 해결할 수 있다. ES6에서는 불변 데이터 패턴(immutable data pattern)을 쉽게 구현할 수 있는 새로운 기능이 추가되었다.

# 2. 불변 데이터 패턴(immutable data pattern)

## 2.1 Object.assign

Object.assign은 타킷 객체로 소스 객체의 프로퍼티를 복사한다. 이때 소스 객체의 프로퍼티와 동일한 프로퍼티를 가진 타켓 객체의 프로퍼티들은 소스 객체의 프로퍼티로 덮어쓰기된다. 리턴값으로 타킷 객체를 반환한다. ES6에서 추가된 메서드이며 Internet Explorer는 지원하지 않는다.

```javascript
// Syntex
Object.assign(target, ...sources)
```

```javascript
// Copy
const copy = Object.assign({}, { a: 1 });
console.log(copy); // { a: 1 }

// Merge
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const merge1 = Object.assign(o1, o2, o3);

console.log(merge1); // { a: 1, b: 2, c: 3 }
console.log(o1);     // { a: 1, b: 2, c: 3 }, 타겟 객체가 변경된다!

// Merge
const o4 = { a: 1 };
const o5 = { b: 2 };
const o6 = { c: 3 };

const merge2 = Object.assign({}, o4, o5, o6);

console.log(merge2); // { a: 1, b: 2, c: 3 }
console.log(o4);     // { a: 1 }
```

Object.assign을 사용하여 기존 객체를 변경하지 않고 객체를 복사 할 수 있다.

```javascript
const person1 = {
  name: 'Lee',
  age: 20
};

const person2 = Object.assign({}, person1); // person1을 {}에 Copy

person2.age = 30;

// 상기 2행은 아래와 동치이다.
// {age: 30}은 person1에 병합되는 것이 아니라 첫번째 인자인 {}에 병합된다. 
// const person2 = Object.assign({}, person1, {age: 30});

console.log(person1.age); // 20
console.log(person2.age); // 30
```

person1 객체를 빈객체에 복사하여 새로운 객체 person2를 생성하였다. person1과 person2는 어드레스를 공유하지 않으므로 한 객체를 변경하여도 다른 객체에 아무런 영향을 주지 않는다.

하지만 person1 객체는 const로 선언되어있지만 객체의 프로퍼티는 보호되지 않는다. 다시 말하자면 재할당은 불가능하지만 할당된 객체의 내용은 변경할 수 있다. [Object.freeze()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)를 사용하여 불변(immutable) 객체로 만들수 있지만 객체 내부의 객체(Nested Object)는 변경가능하다. 또한 Object.freeze()은 성능상 이슈가 있어서 큰 배열에는 사용하지 않아야 한다. 

## 2.2 Immutable.js

Object.assign()과 Object.freeze()로 불변(immutable) 객체를 만드는 것은 완전하지 않다. Facebook이 제공하는 [Immutable.js](https://facebook.github.io/immutable-js/)는 이러한 문제를 해결해 준다.

Immutable.js는 List, Stack, Map, OrderedMap, Set, OrderedSet, Record와 같은 영구 불변 (Permit Immutable) 데이터 구조를 제공한다.

npm을 사용하여 Immutable.js를 설치한다.

```bash
$ npm install immutable
```

Immutable.js의 Map 모듈을 임포트하여 사용한다.

```javascript
const { Map } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3 })
const map2 = map1.set('b', 50)
map1.get('b') // 2
map2.get('b') // 50
```

map1.set('b', 50)의 실행에도 불구하고 map1은 불변하였다. map1.set()은 결과를 반영한 새로운 객체를 반환한다.
