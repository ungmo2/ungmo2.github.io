---
layout: post
title: ECMAScript6 - <strong>Block-level scope</strong>
subtitle: 블록 레벨 스코프
categories: es6
section: es6
description: ECMAScript6 ES6 블록 레벨 스코프 let const
---

* TOC
{:toc}

![es6 Logo](/img/es6.png)
{: .w-650}

# 1. let

ES5에서 변수를 선언할 수 있는 유일한 방법은 [var 키워드](./js-data-type-variable#variable-)를 사용하는 것이었다. var 키워드를 사용하여 선언한 변수는 중복 선언이 가능하며 [Function-level scope](./js-scope#function-scope)를 갖게 되는데 이것은 다른 C-family 언어와는 차별되는 특징이다.

기본적으로 JavaScript의 변수는 Function-level scope를 갖는다.

Function-level scope
: 함수내에서 선언된 변수는 함수 내에서만 유효하며 함수 외부에서는 참조할 수 없다.

Block-level scope
: 코드 블럭 내에서 선언된 변수는 코드 블럭 내에서만 유효하며 코드 블럭 외부에서는 참조할 수 없다.

아래의 예제를 살펴보자.

```javascript
console.log(foo); // undefined
var foo = 123;
console.log(foo); // 123
{
  var foo = 456;
}
console.log(foo); // 456
```

var 키워드를 사용하여 선언한 변수는 중복 선언이 가능하기 때문에 위의 코드는 문법적으로 문제가 없다. 하지만 코드블럭 내의 변수 foo는 전역변수이기 때문에 전역에서 선언된 변수 foo의 값을 대체하는 새로운 값을 재할당한다.

ES6는 <strong>Block-level scope</strong>를 갖는 변수를 선언하기 위해 `let` 키워드를 제공한다.

```javascript
let foo = 123;
{
  let foo = 456;
  let bar = 456;
}
console.log(foo); // 123
console.log(bar); // ReferenceError: bar is not defined
```

위 코드의 변수 bar는 Block-level scope를 갖는 지역 변수이다.

var는 중복 선언이 가능하였으나 let은 <strong>중복 선언 시 에러</strong>가 발생한다.

```javascript
var foo = 123;
var foo = 456;  // OK

let bar = 123;
let bar = 456;  // Error: Identifier 'bar' has already been declared
```

자바스크립트는 ES6의 let, const를 포함하여 모든 선언(var, let, const, function, [function*](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/), class)을 호이스팅(Hoisting)한다.

하지만 var 키워드로 선언된 변수와는 달리 let 키워드로 선언된 변수를 선언문 이전에 참조하면 ReferenceError가 발생한다. 이는 let 키워드로 선언된 변수는 코드블록의 시작에서 변수의 선언까지 <strong>일시적 사각지대(Temporal Dead Zone; TDZ)</strong>에 빠지게 되기 때문이다.

```javascript
console.log(foo); // undefined
var foo;

console.log(bar); // Error: Uncaught ReferenceError: bar is not defined
let bar;
```

Block-level scope를 지원하는 let은 var보다 더욱 직관적이다. 다음 코드를 살펴보자.

```javascript
var funcs = [];
// create a bunch of functions
for (var i = 0; i < 3; i++) {
  funcs.push(function() {
    console.log(i);
  })
}
// call them
for (var j = 0; j < 3; j++) {
  funcs[j]();
}
```

위 코드의 실행 결과로 0,1,2를 기대할 수도 있지만 결과는 3이 3번 출력된다. 그 이유는 for문의 var i가 전역 변수이기 때문이다. 0,1,2을 출력시키기 위해서는 아래와 같은 코드가 필요하다.

```javascript
var funcs = [];
// create a bunch of functions
for (var i = 0; i < 3; i++) {
  (function() {
    var local = i;
    funcs.push(function() {
      console.log(local);
    })
  })();
}
// call them
for (var j = 0; j < 3; j++) {
  funcs[j]();
}
```

JavaScript의 Function-level scope로 인한 문제를 회피하는 한 수단으로 [클로저](./js-closure)를 활용한 방법이다.

반복문에서 ES6의 let 키워드를 사용하면 동일한 동작을 한다.

```javascript
var funcs = [];
// create a bunch of functions
for (let i = 0; i < 3; i++) { // Note the use of let
  funcs.push(function() {
    console.log(i);
  })
}
// call them
for (var j = 0; j < 3; j++) {
  funcs[j]();
}
```

# 2. const

const는 상수(변하지 않는 값)를 위해 사용한다. 하지만 반드시 상수만을 위해 사용하지는 않는다. 이에 대해서는 후반부에 설명한다.

const는 let과 대부분 동일한 특징을 갖는다. 단 let은 초기화 이후 다른 값으로 재할당이 자유로우나 const는 초기화 이후 재할당이 금지된다.

```javascript
const FOO = 123;
FOO = 456; // TypeError: Assignment to constant variable.
```

주의할 것은 const는 반드시 선언과 동시에 초기화가 이루어져야 한다는 것이다.

```javascript
const FOO; // SyntaxError: Missing initializer in const declaration
```

또한 const는 let과 마찬가지로 Block-level scope를 갖는다.

```javascript
{
  const FOO = 10;
  console.log(FOO); //10
}
console.log(FOO); // ReferenceError: FOO is not defined
```

const는 가독성의 향상과 유지보수의 편의를 위해 적극적으로 사용해야 한다. 예를 들어 아래 코드를 살펴보자.

```javascript
// Low readability
if (x > 10) {
}

// Better!
const MAXROWS = 10;
if (x > MAXROWS) {
}
```

조건문 내의 10은 어떤 의미로 사용하였는지 파악하기가 곤란한다. 하지만 네이밍이 적절한 상수로 선언하면 가독성과 유지보수성이 대폭 향상된다.

const는 객체에도 사용할 수 있다. 물론 재할당은 금지된다.

```javascript
const obj = { foo: 123 };
obj = { bar: 456 }; // TypeError: Assignment to constant variable.
```

const는 객체에 대한 참조를 수정하지 못하게 한다. 하지만 **객체의 프로퍼티는 보호되지 않는다.** 다시 말하자면 재할당은 불가능하지만 할당된 객체의 내용은 변경할 수 있다.

```javascript
const user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

user.name = 'Kim'; // 허용된다!

console.log(user); // { name: 'Kim', address: { city: 'Seoul' } }
```

객체의 프로퍼티까지 보호하여 primitive data와 같이 변경이 불가능한 값(immutable value)으로 만들고 싶다면 Object.freeze() 메서드를 사용한다.

```javascript
const user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

Object.freeze(user);

user.name = 'Kim'; // 무시된다!
console.log(user); // { name: 'Lee', address: { city: 'Seoul' } }

console.log(Object.isFrozen(user)); // true
```

단 객체 내부의 객체는 변경가능하다.

```javascript
user.address.city = 'Busan'; // 변경된다!
console.log(user); // { name: 'Lee', address: { city: 'Busan' } }
```

내부 객체까지 변경 불가능하게 만들려면 Deep freeze를 하여야 한다.

```javascript
function deepFreeze(obj) {
  const props = Object.getOwnPropertyNames(obj);

  props.forEach((name) => {
    const prop = obj[name];
    if(typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}

const user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

deepFreeze(user);

user.name = 'Kim';
user.address.city = 'Busan';

console.log(user); // { name: 'Lee', address: { city: 'Seoul' } }
```

ES6를 사용한다면 var의 사용은 가급적 지양하고 아래와 같이 경우에 따라 let과 const를 사용하는 것을 추천한다.

- primitive형 변수에는 let를 사용
- 변경이 발생하지 않는(재할당이 필요없는) primitive형 변수와 객체형 변수에는 const를 사용

객체형 변수에 const를 사용하는 이유는 객체의 속성값이 변경된다하더라도 객체형 변수에 저장되는 주소값은 변경되지 않기 때문이다. 자바스크립트의 값은 대부분 객체(primitive형 변수를 제외한 모든 값은 객체이다)이므로 결국 대부분의 경우 const를 사용하게 된다.


# Reference

* [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf)

* [ECMAScript 6 New Features: Overview & Comparison](http://es6-features.org/#Constants)

* [ES6 compat table](https://kangax.github.io/compat-table/es6/)

* [Are variables declared with let or const not hoisted in ES6?](http://stackoverflow.com/questions/31219420/are-variables-declared-with-let-or-const-not-hoisted-in-es6)
