---
layout: post
title: Javascript <strong>Type Checking</strong>
subtitle: 타입 체크
categories: javascript
section: javascript
description: 자바스크립트는 동적 타입(dynamic typed) 언어이므로 변수에 어떤 값이 할당될 지 예측하기 어렵다. 아래 코드를 살펴보자.
---

* TOC
{:toc}

자바스크립트는 동적 타입(dynamic typed) 언어이므로 변수에 어떤 값이 할당될 지 예측하기 어렵다. 아래 코드를 살펴보자.

```javascript
function sum(a, b) {
  return a + b;
}
```

위 코드를 작성한 개발자의 의도는 아마도 2개의 number 타입 인수를 전달받아 그 합계를 반환하려는 것으로 추측된다. 하지만 코드 상으로는 어떤 타입의 인수를 전달하여야 하는지, 어떤 타입의 값을 반환해야 하는지 명확하지 않다. 따라서 위 코드는 다음처럼 호출될 수 있다.

```javascript
function sum(a, b) {
  return a + b;
}

sum('x', 'y'); // 'xy'
```

위 코드는 자바스크립트 문법 상 어떠한 문제도 없으므로 자바스크립트 엔진은 아무런 이의 제기없이 위 코드를 실행할 것이다. 이러한 상황이 발생한 이유는 변수나 반환값의 타입을 사전에 지정하지 않는 자바스크립트의 동적 타이핑(Dynamic Typing)에 의한 것이다.

```javascript
function sum(a, b) {
  // a와 b가 number 타입인지 체크
  return a + b;
}
```

이와 같은 이유로 자바스크립트는 타입 체크가 필요하다. [타입 연산자(Type Operators)](./js-operator#6-%ED%83%80%EC%9E%85-%EC%97%B0%EC%82%B0%EC%9E%90-type-operators)는 피연산자의 데이터 타입(자료형)을 문자열로 반환한다.

```javascript
typeof '';              // string
typeof 1;               // number
typeof NaN;             // number
typeof true;            // boolean
typeof [];              // object
typeof {};              // object
typeof new String();    // object
typeof new Date();      // object
typeof /test/gi;        // object
typeof function () {};  // function
typeof undefined;       // undefined
typeof null;            // object (설계적 결함)
typeof undeclared;      // undefined (설계적 결함)
```

그런데 `typeof`는 null과 배열의 경우 object, 함수의 경우 function를 반환하고, Date, RegExp, 사용자 정의 객체 등 거의 모든 객체의 경우, object를 반환한다. 따라서 `typeof`는 기본자료형을 체크하는 데는 문제가 없지만 객체의 종류까지 구분하여 체크하려할 때는 사용하기는 곤란하다. 여러 종류의 객체(일반 객체, 배열, Date, RegExp, Function, DOM 요소 등)를 구분할 수 있는 타입 체크 기능을 만들어보자.


[Object.prototype.toString](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 메소드는 객체를 나타내는 문자열을 반환한다.


```javascript
var obj = new Object();
obj.toString(); // [object Object]
```

[Function.prototype.call](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 메소드를 사용하면 모든 타입의 값의 타입을 알아낼 수 있다.

```javascript
Object.prototype.toString.call('');             // [object String]
Object.prototype.toString.call(new String());   // [object String]
Object.prototype.toString.call(1);              // [object Number]
Object.prototype.toString.call(new Number());   // [object Number]
Object.prototype.toString.call(NaN);            // [object Number]
Object.prototype.toString.call(Infinity);       // [object Number]
Object.prototype.toString.call(true);           // [object Boolean]
Object.prototype.toString.call(undefined);      // [object Undefined]
Object.prototype.toString.call();               // [object Undefined]
Object.prototype.toString.call(null);           // [object Null]
Object.prototype.toString.call([]);             // [object Array]
Object.prototype.toString.call({});             // [object Object]
Object.prototype.toString.call(new Date());     // [object Date]
Object.prototype.toString.call(Math);           // [object Math]
Object.prototype.toString.call(/test/i);        // [object RegExp]
Object.prototype.toString.call(function () {}); // [object Function]
Object.prototype.toString.call(document);       // [object HTMLDocument]
Object.prototype.toString.call(argument);       // [object Arguments]
Object.prototype.toString.call(undeclared);     // ReferenceError
```

이것을 이용하여 타입을 반환하는 함수를 만들어보자.

```javascript
function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}
```

[String.prototype.slice](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 메소드를 사용하여 Object.prototype.toString.call 메소드가 반환한 문자열에서 "[object"와 "]"를 제외하고 타입을 나타내는 문자열만을 추출하였다.

```javascript
getType('');         // String
getType(1);          // Number
getType(true);       // Boolean
getType(undefined);  // Undefined
getType(null);       // Null
getType({});         // Object
getType([]);         // Array
getType(/test/i);    // RegExp
getType(Math);       // Math
getType(new Date()); // Date
getType(function () {}); // Function
```

이제 앞에서 살펴본 sum 함수에 타입 체크 기능을 추가해 보자.

```javascript
function sum(a, b) {
  // a와 b가 number 타입인지 체크
  if (getType(a) !== 'Number' || getType(b) !== 'Number') {
    throw new TypeError('파라미터에 number 타입이 아닌 값이 할당되었습니다.');
  }
  return a + b;
}

console.log(sum(10, 20));   // 30
console.log(sum('10', 20)); // TypeError
```

타입별로 체크하는 기능을 만들려면 아래와 같이 함수를 작성한다.


```javascript
function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}

function isString(target) {
  return getType(target) === 'String';
}

function isNumber(target) {
  return getType(target) === 'Number';
}

function isBoolean(target) {
  return getType(target) === 'Boolean';
}

function isNull(target) {
  return getType(target) === 'Null';
}

function isUndefined(target) {
  return getType(target) === 'Undefined';
}

function isObject(target) {
  return getType(target) === 'Object';
}

function isArray(target) {
  return getType(target) === 'Array';
}

function isDate(target) {
  return getType(target) === 'Date';
}

function isRegExp(target) {
  return getType(target) === 'RegExp';
}

function isFunction(target) {
  return getType(target) === 'Function';
}
```
