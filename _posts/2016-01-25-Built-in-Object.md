---
layout: post
title: Built-in Object
categories: javascript
---

Built-in Object(내장 객체)는 웹페이지 등을 표현하기 위한 공통의 기능을 제공한다. 웹페이지가 브라우저에 의해 로드되자마자 별다른 행위없이 바로 사용이 가능하다. Built-in Object에는 아래와 같이 구분할 수 있다.

- Standard Built-in Objects (or Global Objects)  

- BOM (Browser Object Model)  

- DOM (Document Object Model)


# Standard Built-in Objects (or Global Objects)

Javascript는 프로그램 전체의 영역에서 공통적으로 필요한 기능을 사용자 각자가 일일히 작성하는 수고를 줄이기 위해 Standard Built-in Objects(표준 빌트인 객체)를 제공한다.

일반적으로 String, Array와 같이 대문자로 시작한다. 전역 객체(Global Object)와 다른 의미로 사용되므로 혼동에 주의하여야 한다.

전역 객체(Global Object)는 모든 객체의 최상위 객체를 의미하며 일반적으로 Browser-side에서는 `window`, Server-side(Node.js)에서는 `global` 객체를 의미한다.

대표적인 표준 빌트인 객체는 아래와 같다.

- Objects

  - Object
  - String
  - RegExp
  - Array
  - ArrayBuffer
  - JSON
  - Boolean
  - Number
  - Math
  - Date
  - Function
  - Symbol
  - Error
  - EvalError
  - InternalError
  - RangeError
  - ReferenceError
  - SyntaxError
  - TypeError
  - URIError
  - Map
  - Set
  - WeakMap
  - WeakSet
  - Promise

- 전역 속성

  - Infinity
  - NaN
  - undefined
  - null literal

- 전역 함수

  - eval()
  - uneval()
  - isFinite()
  - isNaN()
  - parseFloat()
  - parseInt()
  - decodeURI()
  - decodeURIComponent()
  - encodeURI()
  - encodeURIComponent()

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

# BOM (Browser Object Model)

브라우저 객체 모델은 브라우저 탭 또는 브라우저 창의 모델을 생성한다. 최상위 객체는 `window` 객체로 현재 브라우저 창 또는 탭을 표현하는 객체이다. 또한 이 객체의 자식 객체 들은 브라우저의 다른 기능들을 표현한다.

![BOM](/img/BOM.png)
{: style="max-width:400px; margin: 10px auto;"}

# DOM (Document Object Model)

문서 객체 모델은 현재 웹페이지의 모델을 생성한다. 최상위 객체는 `document` 객체로 전체 문서를 표현한다. 또한 이 객체의 자식 객체들은 문서의 다른 요소들을 표현한다.

![DOM](/img/DOM.png)
{: style="max-width:400px; margin: 10px auto;"}

# Built-in Object(내장객체)

## Built-in Object(자바스크립트 내장객체)
Javascript는 프로그램 전체의 영역에서 공통적으로 필요한 기능을 사용자 각자가 일일히 작성하는 수고를 줄이기 위해 Built-in Object(내장객체)를 제공한다.

Object, String, Number, Boolean, Date, Array, Math, RegExp, Error 등 많은 내장객체들이 있다.

이들은 자바스크립트 엔진이 구동되는 시점에서 바로 제공되며 자바스크립트코드 어디에서든 사용이 가능하다.

## Native Object(브라우저 내장 객체)
브라우저객체모델(BOM)과 문서객체모델(DOM)로 이 객체들은 Built-in Object 가 구성된 후에 구성된다.

Native Object 역시 내장객체이며 Built-in Object와 동일하게 자바스크립트 구동시점부터 바로 사용가능 하다. 

## Host Object(사용자 정의 객체)
사용자가 생성한 객체 들이다. constructor 혹은 객체리터럴을 통해 사용자가 객체를 정의하고 확장시킨 것들이기 때문에 Built-in Object 와 Native Object가 구성된 이후에 구성된다.
