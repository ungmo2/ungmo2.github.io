---
layout: post
title: Standard Built-in Objects
categories: javascript
---

Javascript는 프로그램 전체의 영역에서 공통적으로 필요한 기능을 사용자 각자가 일일히 작성하는 수고를 줄이기 위해 Standard Built-in Objects(표준 빌트인 객체)를 제공한다. 일반적으로 String, Array와 같이 대문자로 시작한다.

Standard Built-in Objects(표준 빌트인 객체)를 Global Objects로 표현하기도 하는데 이것은 전역 객체(Global Object)와 다른 의미로 사용되므로 혼동에 주의하여야 한다.

# Global Object

- 전역 객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 `window`, Server-side(Node.js)에서는 `global` 객체를 의미한다.

- 전역 객체는 [실행 컨텍스트](http://ungmo2.github.io/javascript/Javascript-Execution-Context/)에 컨트롤이 들어가기 이전에 생성이 되며 constructor가 없기 때문에 new 연산자를 이용하여 새롭게 생성할 수 없다. 즉, 개발자가 전역 객체를 생성하는 것은 불가능하다.

- 또한 전역 객체는 전역 스코프(Global Scope)를 갖게 된다.

- 전역 객체의 자식 객체를 사용할 때 전역 객체의 기술은 생략할 수 있다. 아래에서 document 객체는 전역 객체 window의 자식 객체로서 window.document...와 같이 기술하여도 좋으나 일반적으로 전역 객체의 기술은 생략한다.

  ```javascript
  document.getElementById('foo').style.display = 'none';
  ```

- 그러나 사용자가 정의한 변수와 전역 객체의 자식 객체 이름이 충돌할 때 명확히 명확히 전역 객체를 기술하여 혼동을 방지할 수 있다.

  ```javascript
  function moveTo(url)
  {
    var location = {'href':'move to '};
    alert(location.href + url);
    // location.href = url;
    window.location.href = url;
  }
  moveTo('http://www.google.com');
  ```

- 전역 객체는 전역 변수(Global variable)를 속성으로 가지게 된다.

  ```javascript
  var ga = "Global variable";
  console.log(ga);
  console.log(window.ga);
  ```

- 글로벌 영역에 선언한 함수도 전역 객체의 속성으로 접근할 수 있다.

  ```javascript
  function foo () {
    console.log("invoked!");
  }
  window.foo();
  ```

- Standard Built-in Objects(표준 빌트인 객체)도 역시 전역 객체의 자식 객체이다.

global properties like undefined, Infinity, and NaN • global functions like isNaN(), parseInt() (§3.8.2), and eval() (§4.12). • constructor functions like Date(), RegExp(), String(), Object(), and Array() (§3.8.2) • global objects like Math and JSON (§6.9)

String

Number

Math

Date

-------

Array

RegExp

Global




https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

# Introduction

The term "global objects" (or standard built-in objects) here is not to be confused with the global object. Here, global objects refer to objects in the global scope (but only if ECMAScript 5 strict mode is not used; in that case it returns undefined). The global object itself can be accessed using the this operator in the global scope. In fact, the global scope consists of the properties of the global object, including inherited properties, if any.
