---
layout: fs-post
title: <strong>전역 객체</strong>
categories: fastcampus
section: fastcampus
seq: 20
permalink: /:categories/:title
description:
---

* TOC
{:toc}

전역 객체(Global Object)는 어떤 객체보다도 먼저 생성되며 어떤 객체에도 속하지 않은 최상위 객체이다. 전역 객체는 클라이언트 사이드 환경(브라우저)에서는 window, 서버 사이드 환경(Node.js)에서는 global 객체를 의미한다. 전역 객체는 일반 객체와는 다른 특수한 객체이다. 전역 객체의 특징은 아래와 같다.

-	전역 객체는 개발자가 의도적으로 생성할 수 없다.

-	전역 객체의 프로퍼티를 참조할 때 window를 생략할 수 있다.

```javascript
// 문자열 'F'를 16진수로 해석하여 10진수로 변환하여 반환한다.
console.log(window.parseInt('F', 16)); // 15
// 전역 객체 window의 메소드인 parseInt은 window.parseInt 또는 parseInt으로 호출할 수 있다.
console.log(parseInt('F', 16)); // 15

console.log(window.parseInt === parseInt); // true
```

-	전역 객체는 Object, String, Number, Boolean, Function, Array, RegExp, Date, Math, Promise와 같은 모든 빌트인 객체를 프로퍼티로 가지고 있다.

-	자바스크립트 실행 환경(브라우저 환경 또는 Node.js 환경. “3.1 자바스크립트 실행 환경” 참고)에 따라 추가적으로 프로퍼티와 메소드를 갖는다. 브라우저 환경의 window 객체는 DOM, BOM, Canvas, XMLHttpRequest, Fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web worker와 같은 [클라이언트 사이드 Web API](https://www.w3.org/standards/webdesign/script)를 프로퍼티로 소유한다.

-	var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역 변수(“12.8 암묵적 전역 변수” 참고) 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.

![](/assets/fs-images/20-1.png)
{: .w-400 }
var 키워드로 선언한 변수와 전역 함수는 전역 객체의 프로퍼티가 된다.
{: .desc-img}

let이나 const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다. 즉, window.foo와 같이 접근할 수 없다. let이나 const 키워드로 선언한 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드, "22. 실행 컨텍스트"에서 살펴볼 것이다.) 내에 존재하게 된다.

```javascript
let foo = 123; // 전역변수
console.log(window.foo); // undefined
```

-	전역 객체는 몇가지 프로퍼티와 메소드를 가지고 있다. 전역 객체의 프로퍼티와 메소드는 window를 생략하여 참조/호출할 수 있으므로 전역 변수와 전역 함수처럼 사용할 수 있다. 이에 대해 살펴보자.

# 1.	전역 프로퍼티(Global property)

전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. 애플리케이션 전역에서 사용하는 값들을 나타내기 위해 사용한다.

## 1.1.	Infinity

Infinity 프로퍼티는 양/음의 무한대를 나타내는 숫자값 Infinity를 갖는다.

```javascript
// 전역 프로퍼티는 window를 생략하고 참조할 수 있다.
console.log(window.Infinity === Infinity); // true

// 양의 무한대
console.log(3/0);  // Infinity
// 음의 무한대
console.log(-3/0); // -Infinity
// Infinity는 숫자 타입인 값이다.
console.log(typeof Infinity); // number
```

## 1.2.	NaN

NaN 프로퍼티는 숫자가 아님(Not-a-Number)을 나타내는 숫자값 NaN을 갖는다. NaN 프로퍼티는 Number.NaN 프로퍼티와 같다.

```javascript
console.log(window.NaN); // NaN

console.log(Number('xyz')); // NaN
console.log(1 * 'string');  // NaN
console.log(typeof NaN);    // number
```

## 1.3.	undefined

undefined 프로퍼티는 원시 타입 undefined를 값으로 갖는다.

```javascript
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined
```

# 2. 전역 함수(Global function)

전역 함수는 애플리케이션 전역에서 호출할 수 있는 함수로서 전역 객체의 메소드이다.

## 2.1.	eval

매개변수에 전달된 코드(표현식 또는 문)을 나타내는 문자열을 평가 또는 실행하고 결과값을 반환한다. 전달된 코드가 여러 개의 문으로 이루어져 있다면 모든 문을 일괄 실행한다.

```javascript
/**
 * 주어진 코드(문 또는 표현식)을 평가하고 결과값을 반환한다.
 * @param {string} code - 문 또는 표현식을 나타내는 문자열
 * @returns {*} 문 또는 표현식을 평가한 결과값
 */
eval(code)
```

```javascript
const x = 1;
const y = 2;
console.log(eval('x * y')); // 3

console.log(eval('function foo() { return true; } foo();')); // true
```

eval 함수는 스코프를 수정한다. 아래 예제를 살펴보자.

```javascript
var x = 1;

function foo() {
  // eval 함수는 런타임에 foo 함수의 스코프를 수정한다.
  eval('var x = 2;');
  console.log(x); // 2
}

foo();

console.log(x); // 1
```

위 예제의 eval 함수는 새로운 변수를 선언하면서 foo 함수의 스코프에 선언된 변수를 추가한다. 이때 eval 함수에 전달된 코드는 이미 그 위치에 존재하던 코드처럼 동작한다. eval 함수가 호출되는 시점에는 이미 foo 함수의 스코프가 존재한다. 따라서 eval 함수는 기존의 스코프를 수정하는 것이다.

자바스크립트는 렉시컬 스코프(“12.7 렉시컬 스코프” 참고)를 따르므로 스코프는 함수 정의가 평가되는 시점에 결정된다. 다시 말해 스코프는 런타임에 결정되는 것이 아니다. 하지만 eval 함수는 런타임에 스코프를 수정할 수 있다. 다시 말해 eval 함수는 렉시컬 스코프를 동적으로 수정할 수 있다. 하지만 성능적인 면에서 손해를 감수해야 한다.

엄격 모드(strict mode)에서 eval 함수는 기존의 스코프를 수정하지 않고 자신만의 독자적인 스코프를 생성한다.

```javascript
var x = 1;

function foo() {
  'use strict';

  // 엄격 모드에서 eval 함수는 기존의 스코프를 수정하지 않고 자체적인 스코프를 생성한다.
  eval('var x = 2; console.log(x);'); // 2
  console.log(x); // 1
}

foo();

console.log(x); // 1
```

또한 eval 함수에 전달한 변수 선언문이 let, const 키워드를 사용했다면 엄격 모드가 적용된다.

```javascript
var x = 1;

function foo() {
  // 'use strict';
  // eval 함수에 전달한 변수 선언문이 let, const 키워드를 사용했다면 엄격 모드가 적용된다.
  eval('const x = 2; console.log(x);'); // 2
  console.log(x); // 1
}

foo();

console.log(x); // 1
```

eval 함수를 통해 사용자로부터 입력 받은 콘텐츠(untrusted data)를 실행하는 것은 보안에 매우 취약하다. 또한 자바스크립트 엔진에 의해 최적화가 수행되지 않으므로 일반적인 코드 실행에 비해 처리 속도가 느리다. 따라서 eval 함수의 사용은 가급적 금지되어야 한다.

## 2.2.	isFinite

매개 변수에 전달된 값이 정상적인 유한수인지 검사하여 그 결과를 불리언 타입으로 반환한다. 매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 타입을 변환한 후 검사를 수행한다.

```javascript
/**
 * 주어진 숫자가 유한수인지 확인하고 그 결과를 반환한다.
 * @param {number} testValue - 검사 대상 값
 * @returns {boolean} 유한수 여부 확인 결과값
 */
isFinite(testValue)
```

```javascript
console.log(isFinite(Infinity));  // false
console.log(isFinite(NaN));       // false
console.log(isFinite('Hello'));   // false
console.log(isFinite('2005/12/12'));   // false

console.log(isFinite(0));         // true
console.log(isFinite(2e64));      // true
console.log(isFinite('10'));      // true: '10' → 10
console.log(isFinite(null));      // true: null → 0
```

isFinite(null)은 true를 반환한다. 이것은 null을 숫자로 변환하여 검사를 수행하였기 때문이다. null을 숫자 타입으로 변환하면 0이 된다.(“8. 타입 변환과 단축 평가” 참고)

```javascript
console.log(+null); // 0
```

## 2.3.	isNaN

매개변수에 전달된 값이 NaN인지 검사하여 그 결과를 불리런 타입으로 반환한다. 매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 타입을 변환한 후 검사를 수행한다.

```javascript
/**
 * 주어진 숫자가 NaN인지 확인하고 그 결과를 반환한다.
 * @param {number} testValue - 검사 대상 값
 * @returns {boolean} NaN 여부 확인 결과값
 */
isNaN(testValue)
```

```javascript
// 숫자
console.log(isNaN(NaN)); // true
console.log(isNaN(10));  // false

// 문자열
console.log(isNaN('blabla')); // true: 'blabla' → NaN
console.log(isNaN('10'));     // false: '10' → 10
console.log(isNaN('10.12'));  // false: '10.12' → 10.12
console.log(isNaN(''));       // false: '' → 0
console.log(isNaN(' '));      // false: ' ' → 0

// 불리언
console.log(isNaN(true)); // false: true → 1
console.log(isNaN(null)); // false: null → 0

// undefined
console.log(isNaN(undefined)); // true: undefined → NaN

// 객체
console.log(isNaN({}));  // true: {} → NaN

// date
console.log(isNaN(new Date()));             // false: new Date() → Number
console.log(isNaN(new Date().toString()));  // true:  String → NaN
```

## 2.4.	parseFloat

매개변수에 전달된 문자열을 부동소수점 숫자(floating point number)로 변환하여 반환한다.

```javascript
/**
 * 주어진 문자열을 부동소수점 숫자로 변환하여 반환한다.
 * @param {string} string - 변환 대상 값
 * @returns {number} 변환 결과값
 */
parseFloat(string)
```

```javascript
console.log(parseFloat('3.14'));  // 3.14
console.log(parseFloat('10.00')); // 10
// 공백으로 구분된 문자열은 첫번째 문자열만 변환한다.
console.log(parseFloat('34 45 66')); // 34
console.log(parseFloat('40 years')); // 40
// 첫번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환한다.
console.log(parseFloat('He was 40')); // NaN
// 전후 공백은 무시된다.
console.log(parseFloat(' 60 ')); // 60
```

## 2.5.	parseInt

매개변수에 전달된 문자열을 정수형 숫자(Integer)로 해석(parsing)하여 반환한다. 반환값은 언제나 10진수이다.

```javascript
/**
 * 주어진 문자열을 정수형 숫자(Integer)로 해석(parsing)하여 반환한다.
 * 반환값은 언제나 10진수이다.
 * @param {string} string - 변환 대상 값
 * @param {number} [radix] - 진법을 나타내는 기수(2 ~ 36, 기본값 10)
 * @returns {number} 변환 결과값
 */
parseInt(string, radix);
```

```javascript
// 주어진 문자열을 10진수 정수로 해석하여 반환한다.
console.log(parseInt('10'));     // 10
console.log(parseInt('10.123')); // 10
```

주어진 변환 대상 값이 문자열이 아니면 문자열로 변환한 후 정수형 숫자로 해석하여 반환한다.

```javascript
console.log(parseInt(10));     // 10
console.log(parseInt(10.123)); // 10
```

2번째 매개변수에는 진법을 나타내는 기수(2 ~ 36)를 지정할 수 있다. 기수를 지정하면 첫번째 매개변수에 전달된 문자열을 해당 기수의 숫자로 해석하여 반환한다. 이때 반환값은 언제나 10진수이다. 기수를 생략하면 첫번째 매개변수에 전달된 문자열을 10진수로 해석하여 반환한다.

```javascript
// '10'을 10진수로 해석하고 10진수 정수로 그 결과를 반환한다
console.log(parseInt('10')); // 10
// '10'을 2진수로 해석하고 10진수 정수로 그 결과를 반환한다
console.log(parseInt('10', 2)); // 2
// '10'을 8진수로 해석하고 10진수 정수로 그 결과를 반환한다
console.log(parseInt('10', 8)); // 8
// '10'을 16진수로 해석하고 10진수 정수로 그 결과를 반환한다
console.log(parseInt('10', 16)); // 16
```

기수를 지정하여 10진수 숫자를 해당 기수의 문자열로 변환하여 반환하고 싶을 때는 Number.prototype.toString 메소드를 사용한다.

```javascript
const x = 15;

// 15을 2진수로 변환하여 그 결과를 문자열로 반환한다.
console.log(x.toString(2)); // '1111'
// 15을 8진수로 변환하여 그 결과를 문자열로 반환한다.
console.log(x.toString(8)); // '17'
// 15을 16진수로 변환하여 그 결과를 문자열로 반환한다.
console.log(x.toString(16)); // 'f'

// 숫자값을 문자열로 변환한다.
console.log(x.toString()); // '15'
```

두번째 매개변수에 진법을 나타내는 기수를 지정하지 않더라도 첫번째 매개변수에 전달된 문자열이 "0x" 또는 "0X"로 시작하는 16진수 리터럴이라면 16진수로 해석하여 10진수 정수로 반환한다.

```javascript
// 16진수 리터럴 ‘0xf’를 16진수로 해석하고 10진수 정수로 그 결과를 반환한다.
console.log(parseInt('0xf')); // 15
// 위 코드와 같다.
console.log(parseInt('f', 16)); // 15
```

하지만 2진수 리터럴과 8진수 리터럴은 제대로 해석하지 못한다.

```javascript
// 2진수 리터럴(0b로 시작) => 0 이후 무시
console.log(parseInt('0b10')); // 0
// 8진수 리터럴(ES6에서 도입. 0o로 시작)  => 0 이후 무시
console.log(parseInt('0o10')); // 0
```

ES5 이전까지는 비록 사용을 금지하고는 있었지만 "0"로 시작하는 숫자를 8진수로 해석하였다. ES6부터는 "0"로 시작하는 숫자를 8진수로 해석하지 않고 10진수로 해석한다. 따라서 문자열을 8진수로 해석하려면 지수를 반드시 지정하여야 한다.

```javascript
// 문자열 ‘10’을 2진수로 해석한다.
console.log(parseInt('10', 2)); // 2
// 문자열 ‘10’을 8진수로 해석한다.
console.log(parseInt('10', 8)); // 8
```

첫번째 매개변수에 전달된 문자열의 첫번째 문자가 해당 지수의 숫자로 변환될 수 없다면 NaN을 반환한다.

```javascript
// 'A'는 10진수로 해석할 수 없다.
console.log(parseInt('A0')); // NaN
// '2'는 2진수로 해석할 수 없다.
console.log(parseInt('20', 2)); // NaN
```

하지만 첫번째 매개변수에 전달된 문자열의 두번째 문자부터 해당 진수를 나타내는 숫자가 아닌 문자(예를 들어 2진수의 경우, 2)와 마주치면 이 문자와 계속되는 문자들은 전부 무시되며 해석된 정수값만을 반환한다.

```javascript
// 10진수로 해석할 수 없는 'A'이후의 문자는 모두 무시된다.
console.log(parseInt('1A0')); // 1
// 2진수로 해석할 수 없는 '2'이후의 문자는 모두 무시된다.
console.log(parseInt('102', 2)); // 2
// 8진수로 해석할 수 없는 '8'이후의 문자는 모두 무시된다.
console.log(parseInt('58', 8)); // 5
// 16진수로 해석할 수 없는 'G'이후의 문자는 모두 무시된다.
console.log(parseInt('FG', 16)); // 15
```

첫번째 매개변수에 전달된 문자열에 공백이 있다면 첫번째 문자열만 해석하여 반환하며 전후 공백은 무시된다. 만일 첫번째 문자열을 숫자로 해석할 수 없는 경우, NaN을 반환한다.

```javascript
// 공백으로 구분된 문자열은 첫번째 문자열만 변환한다.
console.log(parseInt('34 45 66')); // 34
console.log(parseInt('40 years')); // 40
// 첫번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환한다.
console.log(parseInt('He was 40')); // NaN
// 전후 공백은 무시된다.
console.log(parseInt(' 60 ')); // 60
```

## 2.6. encodeURI / decodeURI

encodeURI 함수는 매개변수로 전달된 URI(Uniform Resource Identifier)를 인코딩한다. URI는 인터넷에 있는 자원을 나타내는 유일한 주소를 말한다. URI의 하위개념으로 URL, URN이 있다.

![](/assets/fs-images/20-2.png)
{: .w-650 }
URI(Uniform Resource Identifier)
{: .desc-img}

```javascript
/**
 * 완전한 URI를 전달받아 인코딩하여 이스케이프 처리한다.
 * @param {string} uri - 완전한 URI
 * @returns {string} 인코딩된 URI
 */
encodeURI(uri)
```
```javascript
/**
 * 인코딩된 URI을 전달받아 이스케이프 처리되기 이전으로 디코딩한다.
 * @param {string} encodedURI - 인코딩된 URI
 * @returns {string} 디코딩된 URI
 */
decodeURI(encodedURI)
```

인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다.

```javascript
// 완전한 URI
const uri = 'http://example.com?name=이웅모&job=programmer&teacher';

// encodeURI 함수는 완전한 URI를 전달받아 인코딩하여 이스케이프 처리한다.
const enc = encodeURI(uri);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher
```

이스케이프 처리는 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 [아스키 문자 셋(ASCII Character-set)](https://en.wikipedia.org/wiki/ASCII)으로로 변환하는 것이다. UTF-8 특수문자의 경우, 1문자당 1~3byte, UTF-8 한글 표현의 경우, 1문자당 3btye이다. 예를 들어 특수문자 공백(space)은 %20, 한글 '가'는 %EC%9E%90으로 인코딩된다.

URI 문법 형식 표준 [RFC3986](http://www.ietf.org/rfc/rfc3986.txt)에 따르면 URL은 아스키 문자 셋으로만 구성되어야 하며 한글을 포함한 대부분의 외국어나 아스키 문자 셋에 정의되지 않은 특수문자의 경우, URL에 포함될 수 없다. 따라서 URL 내에서 의미를 갖고 있는 문자(%, ?, #)나 URL에 올 수 없는 문자(한글, 공백 등) 또는 시스템에 의해 해석될 수 있는 문자(<, >)를 이스케이프 처리하여 야기될 수 있는 문제를 예방하기 위해 이스케이프 처리가 필요하다. 단, 알파벳, 0~9의 숫자, - _ . ! ~ * ' ( ) 문자는 이스케이프 처리에서 제외된다.

decodeURI 함수는 매개변수로 전달된 인코딩된 URI을 전달받아 이스케이프 처리되기 이전으로 디코딩한다.

```javascript
const uri = 'http://example.com?name=이웅모&job=programmer&teacher';

// encodeURI 함수는 완전한 URI를 전달받아 인코딩하여 이스케이프 처리한다.
const enc = encodeURI(uri);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

// decodeURI 함수는 인코딩된 완전한 URI를 전달받아 이스케이프 처리되기 이전으로 디코딩한다.
const dec = decodeURI(enc);
console.log(dec);
// http://example.com?name=이웅모&job=programmer&teacher
```

## 2.7.	encodeURIComponent / decodeURIComponent

encodeURIComponent 함수은 매개변수로 전달된 URI(Uniform Resource Identifier) 구성 요소(component)를 인코딩한다. 여기서 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다. 단, 알파벳, 0~9의 숫자, - _ . ! ~ * ' ( ) 문자는 이스케이프 처리에서 제외된다. decodeURIComponent 함수는 매개변수로 전달된 URI 구성 요소를 디코딩한다.

```javascript
/**
 * URI의 구성요소를 전달받아 인코딩하여 이스케이프 처리한다.
 * @param {string} uriComponent – URI의 구성요소
 * @returns {string} 인코딩된 URI의 구성요소
 */
encodeURIComponent(uriComponent)
```
```javascript
/**
 * 인코딩된 URI의 구성요소를 전달받아 이스케이프 처리되기 이전으로 디코딩한다.
 * @param {string} encodedURIComponent - 인코딩된 URI의 구성요소
 * @returns {string} 디코딩된 URI의 구성요소
 */
decodeURIComponent(encodedURIComponent)
```

encodeURIComponent 함수는 매개변수로 전달된 문자열을 URI의 구성요소인 쿼리 파라미터의 일부 간주한다. 따라서 쿼리 파라미터 구분자로 사용되는 =, ?, &를 인코딩한다.

반면 encodeURI 함수는 매개변수로 전달된 문자열을 완전한 URI 전체라고 간주한다. 따라서 쿼리 파라미터 구분자로 사용되는 =, ?, &를 인코딩하지 않는다.

```javascript
// URI의 쿼리 파라미터
const uriComp = 'name=이웅모&job=programmer&teacher';

// encodeURIComponent 함수는 매개변수로 전달된 문자열을 URI의 구성요소인 쿼리 파라미터의 일부 간주한다.
// 따라서 쿼리 파라미터 구분자로 사용되는 =, ?, &를 인코딩한다.
let enc = encodeURIComponent(uriComp);
console.log(enc);
// name%3D%EC%9D%B4%EC%9B%85%EB%AA%A8%26job%3Dprogrammer%26teacher

let dec = decodeURIComponent(enc);
console.log(dec);
// 이웅모&job=programmer&teacher

// encodeURI 함수는 매개변수로 전달된 문자열을 완전한 URI로 간주한다.
// 따라서 쿼리 파라미터 구분자로 사용되는 =, ?, &를 인코딩하지 않는다.
enc = encodeURI(uriComp);
console.log(enc);
// name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

dec = decodeURI(enc);
console.log(dec);
// name=이웅모&job=programmer&teacher
```
