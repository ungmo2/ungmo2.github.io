---
layout: post
title: <strong>Built-in Object</strong>
subtitle: 자바스크립트가 제공하는 내장 객체
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

Boolean 객체는 기본자료형 boolean을 위한 레퍼(wrapper) 객체이다. Boolean 생성자 함수로 Boolean 객체를 생성할 수 있다.

```javascript
var foo = new Boolean(true);    // true
var foo = new Boolean('false'); // true

var foo = new Boolean(false); // false
var foo = new Boolean();      // false
var foo = new Boolean('');    // false
var foo = new Boolean(0);     // false
var foo = new Boolean(null);  // false
```

Boolean 객체와 기본자료형 boolean을 혼동하기 쉽다. Boolean 객체는 true/false를 포함하고 있는 객체이다.

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

Symbol은 ECMAScript 6(Javascript 2015) 에서 추가된 유일하고 변경 불가능한(immutable) 기본자료형으로 Symbol 객체는 기본자료형 Symbol을 위한 레퍼(wrapper) 객체를 생성한다.

# 1.12 기본자료형과 래퍼객체(Wrapper Object)

앞서 살펴본 바와 같이 각 네이티브 객체는 각자의 프로퍼티와 메소드를 가진다. 정적(static) 프로퍼티, 메소드는 해당 인스턴스를 생성하지 않아도 사용할 수 있고 prototype에 속해있는 메소드는 해당 prototype을 상속받은 인스턴스가 있어야만 사용할 수 있다.

그런데 기본자료형의 값에 대해 표준 빌트인 객체의 메소드를 호출하면 정상적으로 작동한다.

```javascript
var str = 'Hello world!';
var res = str.toUpperCase();
console.log(res); // 'HELLO WORLD!'

var num = 1.5;
console.log(num.toFixed()); // 2
```

이는 기본자료형의 값에 대해 표준 빌트인 객체의 메소드를 호출할 때, **기본자료형의 값은 연관된 객체(Wrapper 객체)로 일시 변환** 되기 때문에 가능한 것이다. 그리고 메소드 호출이 종료되면 객체로 변환된 기본자료형의 값은 다시 기본자료형의 값으로 복귀한다.

자세한 내용은 [Prototype: 6.기본자료형(Primitive data type)의 확장](./js-prototype#6-기본자료형primitive-data-type의-확장)을 참조 바란다.

Wrapper 객체는 String, Number, Boolean이 있다.

# 2. 호스트 객체

호스트 객체(Host object)는 브라우저 환경에서 제공하는 window, XmlHttpRequest, HTMLElement 등의 DOM 노드 객체와 같이 호스트 환경에 정의된 객체를 말한다. 예를 들어 브라우저에서 동작하는 환경과 브라우저 외부에서 동작하는 환경의 자바스크립트(Node.js)는 다른 호스트 객체를 사용할 수 있다.

브라우저에서 동작하는 환경의 호스트 객체는 전역 객체인 window, BOM(Browser Object Model)과 DOM(Document Object Model) 및 XMLHttpRequest 객체 등을 제공한다.

## 2.1 전역 객체(Global Object)

- 전역 객체는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 `window`, Server-side(Node.js)에서는 `global` 객체를 의미한다.

```javascript
// in browser console
this === window // true

// in Terminal
node
this === global // true
```

- 전역 객체는 [실행 컨텍스트](./js-execution-context)에 컨트롤이 들어가기 이전에 생성이 되며 constructor가 없기 때문에 new 연산자를 이용하여 새롭게 생성할 수 없다. 즉, 개발자가 전역 객체를 생성하는 것은 불가능하다.

- 전역 객체는 전역 스코프(Global Scope)를 갖게 된다.

- 전역 객체의 자식 객체를 사용할 때 전역 객체의 기술은 생략할 수 있다. 예를 들어 document 객체는 전역 객체 window의 자식 객체로서 window.document...와 같이 기술할 수 있으나 일반적으로 전역 객체의 기술은 생략한다.

```javascript
document.getElementById('foo').style.display = 'none';
// window.document.getElementById('foo').style.display = 'none';
```

- 그러나 사용자가 정의한 변수와 전역 객체의 자식 객체 이름이 충돌하는 경우, 명확히 전역 객체를 기술하여 혼동을 방지할 수 있다.

```javascript
function moveTo(url) {
  var location = {'href':'move to '};
  alert(location.href + url);
  // location.href = url;
  window.location.href = url;
}
moveTo('http://www.google.com');
```

- 전역 객체는 전역 변수(Global variable)를 프로퍼티로 가지게 된다. 다시 말해 전역 변수는 전역 객체의 프로퍼티이다.

```javascript
var ga = 'Global variable';
console.log(ga);
console.log(window.ga);
```

- 글로벌 영역에 선언한 함수도 전역 객체의 프로퍼티로 접근할 수 있다. 다시 말해 전역 함수는 전역 객체의 메소드이다.

```javascript
function foo() {
  console.log('invoked!');
}
window.foo();
```

- Standard Built-in Objects(표준 빌트인 객체)도 역시 전역 객체의 자식 객체이다. 전역 객체의 자식 객체를 사용할 때 전역 객체의 기술은 생략할 수 있으므로 표준 빌트인 객체도 전역 객체의 기술을 생략할 수 있다.

```javascript
// window.alert('Hello world!');
alert('Hello world!');
```

### 2.1.1 전역 프로퍼티(Global property)

전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. 애플리케이션 전역에서 사용하는 값들을 나타내기 위해 사용한다. 전역 프로퍼티는 간단한 값이 대부분이며 다른 프로퍼티나 메소드를 가지고 있지 않다.

#### 2.1.1.1 Infinity

Infinity 프로퍼티는 양/음의 무한대를 나타내는 숫자값 Infinity를 갖는다.

```javascript
console.log(window.Infinity); // Infinity

console.log(3/0);  // Infinity
console.log(-3/0); // -Infinity
console.log(Number.MAX_VALUE * 2); // 1.7976931348623157e+308 * 2
console.log(typeof Infinity); // number
```

#### 2.1.1.2 NaN

NaN 프로퍼티는 숫자가 아님(Not-a-Number)을 나타내는 숫자값 NaN을 갖는다. NaN 프로퍼티는 Number.NaN 프로퍼티와 같다.

```javascript
console.log(window.NaN); // NaN

console.log(Number('xyz')); // NaN
console.log(1 * 'string');  // NaN
console.log(typeof NaN);    // number
```

#### 2.1.1.3 undefined

undefined 프로퍼티는 기본자료형 undefined를 값으로 갖는다.

```javascript
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined
```

### 2.1.2 전역 함수(Global function)

전역 함수는 애플리케이션 전역에서 호출할 수 있는 함수로서 전역 객체의 메소드이다.

#### 2.1.2.1 eval()

매개변수에 전달된 문자열 구문 또는 표현식을 평가 또는 실행한다. 사용자로 부터 입력받은 콘텐츠(untrusted data)를 eval()로 실행하는 것은 보안에 매우 취약하다. eval()의 사용은 가급적으로 금지되어야 한다.

```javascript
eval(string)
// string: code 또는 표현식을 나타내는 문자열. 표현식은 존재하는 객체들의 프로퍼티들과 변수들을 포함할 수 있다.
```

```javascript
var foo = eval('2 + 2');
console.log(foo); // 4

var x = 5;
var y = 4;
console.log(eval('x * y')); // 20
```

#### 2.1.2.2 isFinite()

매개변수에 전달된 값이 정상적인 유한수인지 검사하여 그 결과를 Boolean으로 반환한다. 매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 변환한 후 검사를 수행한다.

```javascript
isFinite(testValue) // testValue: 검사 대상 값
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

isFinite(null)은 true를 반환하는데 이것은 null을 숫자로 변환하여 검사를 수행하였기 때문이다.

```javascript
// null이 숫자로 암묵적 강제 형변환이 일어난 경우
Number(null)  // 0
// null이 불리언로 암묵적 강제 형변환이 일어난 경우
Boolean(null) // false
```

#### 2.1.2.3 isNaN()

매개변수에 전달된 값이 NaN인지 검사하여 그 결과를 Boolean으로 반환한다. 매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 변환한 후 검사를 수행한다.

```javascript
isNaN(testValue) // testValue: 검사 대상 값
```

```javascript
isNaN(NaN)       // true
isNaN(undefined) // true: undefined → NaN
isNaN({})        // true: {} → NaN
isNaN('blabla')  // true: 'blabla' → NaN

isNaN(true)      // false: true → 1
isNaN(null)      // false: null → 0
isNaN(37)        // false

// strings
isNaN('37')      // false: '37' → 37
isNaN('37.37')   // false: '37.37' → 37.37
isNaN('')        // false: '' → 0
isNaN(' ')       // false: ' ' → 0

// dates
isNaN(new Date())             // false: new Date() → Number
isNaN(new Date().toString())  // true:  String → NaN
```

#### 2.1.2.4 parseFloat()

매개변수에 전달된 문자열을 부동소수점 숫자(floating point number)로 변환하여 반환한다.

```javascript
parseFloat(string)
// string: 변환 대상 문자열
```

문자열의 첫 숫자만 반환되며 전후 공백은 무시된다. 그리고 첫문자를 숫자로 변환할 수 없다면 NaN을 반환한다.

```javascript
parseFloat('3.14');     // 3.14
parseFloat('10.00');    // 10
parseFloat('34 45 66'); // 34
parseFloat(' 60 ');     // 60
parseFloat('40 years'); // 40
parseFloat('He was 40') // NaN
```

#### 2.1.2.5 parseInt()

매개변수에 전달된 문자열을 정수형 숫자(Integer)로 파싱하여 반환한다. 반환값은 언제나 10진수이다.

```javascript
parseInt(string, radix);
// string: 파싱 대상 문자열
// radix: 진법을 나타내는 기수(2 ~ 36, 기본값 10)
```

첫번째 매개변수에 전달된 값이 문자열이 아니면 문자열로 변환한 후 숫자로 파싱하여 반환한다.

```javascript
parseInt(10);     // 10
parseInt(10.123); // 10
```

2번째 매개변수에는 진법을 나타내는 기수(2 ~ 36)를 지정할 수 있다. 기수를 생략하면 첫번째 매개변수에 전달된 문자열을 10진수로 변환하여 반환한다.

```javascript
parseInt('10');     // 10
parseInt('10.123'); // 10
```

두번째 매개변수에 진법을 나타내는 기수를 지정하면 첫번째 매개변수에 전달된 문자열을 해당 기수의 숫자로 파싱하여 반환한다. 이때 **반환값은 언제나 10진수이다.**

```javascript
parseInt('10', 2);  // 2진수 10 → 10진수 2
parseInt('10', 8);  // 8진수 10 → 10진수 8
parseInt('10', 16); // 16진수 10 → 10진수 16
```

기수를 지정하여 10진수 숫자를 해당 기수의 문자열로 변환하여 반환하고 싶을 때는 [Number.prototype.toString](./js-number#38-numberprototypetostringradix-number-string-es1) 메소드를 사용한다.
{:.info}

두번째 매개변수에 진법을 나타내는 기수를 지정하지 않더라도 첫번째 매개변수에 전달된 문자열이 "0x" 또는 "0X"로 시작한다면 16진수로 파싱하여 반환한다.

```javascript
parseInt('0x10'); // 16진수 10 → 10진수 16
```

두번째 매개변수에 진법을 나타내는 기수를 지정하지 않더라도 첫번째 매개변수에 전달된 문자열이 "0"로 시작한다면 8진수로 파싱하지 않고 10진수로 파싱한다. 따라서 8진수 문자열을 파싱하려면 지수를 반드시 지정하여야 한다.

```javascript
parseInt('010'); // 8진수 10으로 인식하지 않는다.
parseInt('010', 8); // 8진수 10 → 10진수 8
parseInt('10', 8); // 8진수 10 → 10진수 8
```

parseInt는 첫번째 매개변수에 전달된 문자열의 첫번째 문자가 해당 지수의 숫자로 변환될 수 없다면 NaN을 반환한다.

```javascript
parseInt('A0'));   // NaN
parseInt('20', 2); // NaN
```

하지만 첫번째 매개변수에 전달된 문자열의 두번째 문자부터 해당 진수를 나타내는 숫자가 아닌 문자(예를 들어 2진수의 경우, 2)와 마주치면 이 문자와 계속되는 문자들은 전부 무시되며 파싱된 정수값만을 반환한다.

```javascript
parseInt('1A0'));    // 1
parseInt('102', 2)); // 2
parseInt('58', 8);   // 5
parseInt('FG', 16);  // 15
```

첫번째 매개변수에 전달된 문자열에 공백이 있다면 첫번째 문자열만 파싱하여 반환하며 전후 공백은 무시된다. 만일 첫번째 문자열을 숫자로 파싱할 수 없는 경우, NaN을 반환한다.

```javascript
parseInt('34 45 66'); // 34
parseInt(' 60 ');     // 60
parseInt('40 years'); // 40
parseInt('He was 40') // NaN
```

#### 2.1.2.6 encodeURI() / decodeURI()

encodeURI()은 매개변수로 전달된 URI(Uniform Resource Identifier)를 인코딩한다.

![uri](/img/uri.png)

URI(Uniform Resource Identifier)
{: .desc-img}

여기서 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다.

이스케이프 처리
: 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 [ASCII Character-set](https://en.wikipedia.org/wiki/ASCII)로 변환하는 것이다. UTF-8 특수문자의 경우, 1문자당 1~3byte, UTF-8 한글 표현의 경우, 1문자당 3btye이다. 예를 들어 특수문자 공백(space)은	%20, 한글 '가'는 %EC%9E%90으로 인코딩된다.

이스케이프 처리 이유
: URI 문법 형식 표준 [RFC3986](http://www.ietf.org/rfc/rfc3986.txt)에 따르면 URL은 ASCII Character-set으로만 구성되어야 하며 한글을 포함한 대부분의 외국어나 ASCII에 정의되지 않은 특수문자의 경우 URL에 포함될 수 없다. 따라서 URL 내에서 의미를 갖고 있는 문자(%, ?, #)나 URL에 올 수 없는 문자(한글, 공백 등) 또는 시스템에 의해 해석될 수 있는 문자(<, >)를 이스케이프 처리하여 야기될 수 있는 문제를 예방하기 위함이다.

단 아래의 문자는 이스케이프 처리에서 제외된다.

- 알파벳, 0~9의 숫자, - _ . ! ~ * ' ( )

decodeURI()은 매개변수로 전달된 URI을 디코딩한다.

```javascript
encodeURI(URI)
// URI: 완전한 URI
decodeURI(encodedURI)
// encodedURI: 인코딩된 완전한 URI
```

```javascript
var uri = 'http://example.com?name=이웅모&job=programmer&teacher';
var enc = encodeURI(uri);
var dec = decodeURI(enc);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher
console.log(dec);
// http://example.com?name=이웅모&job=programmer&teacher
```

#### 2.1.2.7 encodeURIComponent() / decodeURIComponent()

encodeURIComponent()은 매개변수로 전달된 URI(Uniform Resource Identifier) component(구성 요소)를 인코딩한다. 여기서 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다. 단 아래의 문자는 이스케이프 처리에서 제외된다.

- 알파벳, 0~9의 숫자, - _ . ! ~ * ' ( )

decodeURIComponent()은 매개변수로 전달된 URI component(구성 요소)를 디코딩한다.

**encodeURIComponent()는 인수를 쿼리스트링의 일부라고 간주한다. 따라서 =, ?, &를 인코딩한다. 반면 encodeURI()는 인수를 URI 전체라고 간주하며 파라미터 구분자인 =, ?, &를 인코딩하지 않는다.**

```javascript
encodeURIComponent(URI)
// URI: URI component(구성 요소)
decodeURIComponent(encodedURI)
// encodedURI: 인코딩된 URI component(구성 요소)
```

```javascript
var uriComp = '이웅모&job=programmer&teacher';

// encodeURI / decodeURI
var enc = encodeURI(uriComp);
var dec = decodeURI(enc);
console.log(enc);
// %EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher
console.log(dec);
// 이웅모&job=programmer&teacher

// encodeURIComponent / decodeURIComponent
enc = encodeURIComponent(uriComp);
dec = decodeURIComponent(enc);
console.log(enc);
// %EC%9D%B4%EC%9B%85%EB%AA%A8%26job%3Dprogrammer%26teacher
console.log(dec);
// 이웅모&job=programmer&teacher
```

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
