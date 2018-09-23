---
layout: post
title: <strong>Built-in Object</strong>
subtitle: 빌트인 객체
categories: javascript
section: javascript
description: Built-in Object(내장 객체)는 웹페이지 등을 표현하기 위한 공통의 기능을 제공한다. 웹페이지가 브라우저에 의해 로드되자마자 별다른 행위없이 바로 사용이 가능하다. Built-in Object는 아래와 같이 구분할 수 있다.
---

* TOC
{:toc}

자바스크립트의 객체는 아래와 같이 크게 3개의 객체로 분류할 수 있다.

![object](/img/objects.png)
{: .w-500}

자바스크립트 객체의 분류
{: .desc-img}

# 1. 네이티브 객체

네이티브 객체(Native objects or Built-in objects or Global Objects)는 ECMAScript 명세에 정의된 객체를 말하며 애플리케이션 전역의 공통 기능을 제공한다. 네이티브 객체는 애플리케이션의 환경과 관계없이 언제나 사용할 수 있다.

Object, String, Number, Function, Array, RegExp, Date, Math와 같은 객체 생성에 관계가 있는 함수 객체와 메소드로 구성된다.

네이티브 객체를 <strong>Global Objects</strong>라고 부르기도 하는데 이것은 전역 객체(Global Object)와 다른 의미로 사용되므로 혼동에 주의하여야 한다.

전역 객체(Global Object)는 모든 객체의 최상위 객체를 의미하며 일반적으로 Browser-side에서는 `window`, Server-side(Node.js)에서는 `global` 객체를 의미한다.

## 1.1 Object

[Object() 생성자 함수](./js-object#22-object-생성자-함수)는 객체를 생성한다. 만약 생성자 인수값이 null이거나 undefined이면 빈 객체를 반환한다.

```javascript
// 변수 o에 빈 객체를 저장한다
var o = new Object();
console.log(typeof o + ': ', o);

o = new Object(undefined);
console.log(typeof o + ': ', o);

o = new Object(null);
console.log(typeof o + ': ', o);
```

그 이외의 경우 생성자 함수의 인수값에 따라 강제 형변환된 객체가 반환된다. 이때 반환된 객체의 [[Prototype]] 프로퍼티에 바인딩된 객체는 Object.prototype이 아니다.

```javascript
// String 객체를 반환한다
// var obj = new String('String');과 동치이다
var obj = new Object('String');
console.log(typeof obj + ': ', obj);
console.dir(obj);

var strObj = new String('String');
console.log(typeof strObj + ': ', strObj);

// Number 객체를 반환한다
// var obj = new Number(123);과 동치이다
var obj = new Object(123);
console.log(typeof obj + ': ', obj);

var numObj = new Number(123);
console.log(typeof numObj + ': ', numObj);

// Boolean 객체를 반환한다.
// var obj = new Boolean(true);과 동치이다
var obj = new Object(true);
console.log(typeof obj + ': ', obj);

var boolObj = new Boolean(123);
console.log(typeof boolObj + ': ', boolObj);
```

객체를 생성할 경우 특수한 상황이 아니라면 객체리터럴 방식을 사용하는 것이 일반적이다.

```javascript
// 객체리터럴을 사용하는 것이 바람직하다.
var o = {};
```

객체에 대한 자세한 내용은 [Javascript Object](./js-object)을 참조 바란다.

## 1.2 Function

자바스크립트의 모든 함수는 Function 객체이다. 다른 모든 객체들처럼 Function 객체는 new 연산자을 사용해 생성할 수 있다.

```javascript
var adder = new Function('a', 'b', 'return a + b');

adder(2, 6);  // 8
```

함수에 대한 자세한 내용은 [Javascript Function](./js-function)을 참조 바란다.

## 1.3 Boolean

Boolean 객체는 원시 타입 boolean을 위한 레퍼(wrapper) 객체이다. Boolean 생성자 함수로 Boolean 객체를 생성할 수 있다.

```javascript
var foo = new Boolean(true);    // true
var foo = new Boolean('false'); // true

var foo = new Boolean(false); // false
var foo = new Boolean();      // false
var foo = new Boolean('');    // false
var foo = new Boolean(0);     // false
var foo = new Boolean(null);  // false
```

Boolean 객체와 원시 타입 boolean을 혼동하기 쉽다. Boolean 객체는 true/false를 포함하고 있는 객체이다.

```javascript
var x = new Boolean(false);
if (x) { // x는 객체로서 존재한다. 따라서 참으로 간주된다.
  // . . . 이 코드는 실행된다.
}
```

## 1.4 Number

* [Number](./js-number)

## 1.5 Math

* [Math](./js-math)

## 1.6 Date

* [Date](./js-date)

## 1.7 String

* [Date](./js-string)

## 1.8 RegExp

* [RegExp](./js-regexp)

## 1.9 Array

* [Array](./js-array)

## 1.10 Error

Error 생성자는 error 객체를 생성한다. error 객체의 인스턴스는 런타임 에러가 발생하였을 때 throw된다.

```javascript
try {
  // foo();
  throw new Error('Whoops!');
} catch (e) {
  console.log(e.name + ': ' + e.message);
}
```

Error 이외에 Error에 관련한 객체는 아래와 같다.

- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

## 1.11 Symbol

Symbol은 ECMAScript 6(Javascript 2015) 에서 추가된 유일하고 변경 불가능한(immutable) 원시 타입으로 Symbol 객체는 원시 타입 Symbol 값을 생성한다.

## 1.12 원시 타입과 래퍼객체(Wrapper Object)

앞서 살펴본 바와 같이 각 네이티브 객체는 각자의 프로퍼티와 메소드를 가진다. 정적(static) 프로퍼티, 메소드는 해당 인스턴스를 생성하지 않아도 사용할 수 있고 prototype에 속해있는 메소드는 해당 prototype을 상속받은 인스턴스가 있어야만 사용할 수 있다.

그런데 원시 타입 값에 대해 표준 빌트인 객체의 메소드를 호출하면 정상적으로 작동한다.

```javascript
var str = 'Hello world!';
var res = str.toUpperCase();
console.log(res); // 'HELLO WORLD!'

var num = 1.5;
console.log(num.toFixed()); // 2
```

이는 원시 타입 값에 대해 표준 빌트인 객체의 메소드를 호출할 때, **원시 타입 값은 연관된 객체(Wrapper 객체)로 일시 변환** 되기 때문에 가능한 것이다. 그리고 메소드 호출이 종료되면 객체로 변환된 원시 타입 값은 다시 원시 타입 값으로 복귀한다.

자세한 내용은 [Prototype: 6.원시 타입(Primitive data type)의 확장](./js-prototype#6-원시-타입primitive-data-type의-확장)을 참조 바란다.

Wrapper 객체는 String, Number, Boolean이 있다.

# 2. 호스트 객체

호스트 객체(Host object)는 브라우저 환경에서 제공하는 window, XmlHttpRequest, HTMLElement 등의 DOM 노드 객체와 같이 호스트 환경에 정의된 객체를 말한다. 예를 들어 브라우저에서 동작하는 환경과 브라우저 외부에서 동작하는 환경의 자바스크립트(Node.js)는 다른 호스트 객체를 사용할 수 있다.

브라우저에서 동작하는 환경의 호스트 객체는 전역 객체인 window, BOM(Browser Object Model)과 DOM(Document Object Model) 및 XMLHttpRequest 객체 등을 제공한다.

## 2.1 전역 객체(Global Object)

- [전역 객체](./js-global-object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 `window`, Server-side(Node.js)에서는 `global` 객체를 의미한다.

## 2.2 BOM (Browser Object Model)

브라우저 객체 모델은 브라우저 탭 또는 브라우저 창의 모델을 생성한다. 최상위 객체는 `window` 객체로 현재 브라우저 창 또는 탭을 표현하는 객체이다. 또한 이 객체의 자식 객체 들은 브라우저의 다른 기능들을 표현한다. 이 객체들은 Standard Built-in Objects가 구성된 후에 구성된다.

![BOM](/img/BOM.png)
{: .w-400}

자세한 내용은 [MDN Web APIs: Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)를 참조하기 바란다.

## 2.2 DOM (Document Object Model)

문서 객체 모델은 현재 웹페이지의 모델을 생성한다. 최상위 객체는 `document` 객체로 전체 문서를 표현한다. 또한 이 객체의 자식 객체들은 문서의 다른 요소들을 표현한다. 이 객체들은 Standard Built-in Objects가 구성된 후에 구성된다.

![DOM](/img/DOM.png)
{: .w-400}

자세한 내용은 [Javascript DOM](./js-dom)를 참조하기 바란다.

# Reference

* [Standard Built-in Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

* [ECMAScript APIs: TypeScript](https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es6.d.ts)
