---
layout: post
title: Javascript <strong>Standard Built-in Objects</strong>
subtitle: 표준 빌트인 객체
categories: javascript
section: javascript
---

* TOC
{:toc}

Javascript는 프로그램 전체의 영역에서 공통적으로 필요한 기능을 개발자 각자가 일일히 작성하는 수고를 줄이기 위해 Standard Built-in Objects(표준 빌트인 객체)를 제공한다. 일반적으로 String, Array와 같이 대문자로 시작한다.

Standard Built-in Objects(표준 빌트인 객체)를 Global Objects로 표현하기도 하는데 이것은 전역 객체(Global Object)와 다른 의미로 사용되므로 혼동에 주의하여야 한다.

# 1. Global Object

- 전역 객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 `window`, Server-side(Node.js)에서는 `global` 객체를 의미한다.

  ```javascript
  // in browser console
  this === window // true

  // in Terminal
  node
  this === global // true
  ```

- 전역 객체는 [실행 컨텍스트](./js-execution-context)에 컨트롤이 들어가기 이전에 생성이 되며 constructor가 없기 때문에 new 연산자를 이용하여 새롭게 생성할 수 없다. 즉, 개발자가 전역 객체를 생성하는 것은 불가능하다.

- 전역 객체는 전역 스코프(Global Scope)를 갖게 된다.

- 전역 객체의 자식 객체를 사용할 때 전역 객체의 기술은 생략할 수 있다. 예를 들어 document 객체는 전역 객체 window의 자식 객체로서 window.document...와 같이 기술하여도 좋으나 일반적으로 전역 객체의 기술은 생략한다.

  ```javascript
  document.getElementById('foo').style.display = 'none';
  // window.document.getElementById('foo').style.display = 'none';
  ```

- 그러나 사용자가 정의한 변수와 전역 객체의 자식 객체 이름이 충돌할 때 명확히 명확히 전역 객체를 기술하여 혼동을 방지할 수 있다.

  ```javascript
  function moveTo(url) {
    var location = {'href':'move to '};
    alert(location.href + url);
    // location.href = url;
    window.location.href = url;
  }
  moveTo('http://www.google.com');
  ```

- 전역 객체는 전역 변수(Global variable)를 프로퍼티로 가지게 된다.

  ```javascript
  var ga = 'Global variable';
  console.log(ga);
  console.log(window.ga);
  ```

- 글로벌 영역에 선언한 함수도 전역 객체의 프로퍼티로 접근할 수 있다.

  ```javascript
  function foo() {
    console.log('invoked!');
  }
  window.foo();
  ```

- Standard Built-in Objects(표준 빌트인 객체)도 역시 전역 객체의 자식 객체이다. 전역 객체의 자식 객체를 사용할 때 전역 객체의 기술은 생략할 수 있으므로 표준 빌트인 객체도 전역 객체의 기술을 생략할 수 있다.

  ```javascript
  // window.alert('Hello world!');;
  alert('Hello world!');
  ```

## 1.1 Global property (전역 프로퍼티)

Global property(전역 프로퍼티)은 간단한 값을 나타내며 다른 프로퍼티나 메서드를 가지고 있지 않다. 아래의 전역 프로퍼티는 모두 Global Object(전역 객체)의 프로퍼티이다.

### 1.1.1 Infinity  

양/음의 무한대를 나타내는 숫자값이다.

```javascript
console.log(3/0);  // Infinity
console.log(-3/0); // -Infinity
console.log(Number.MAX_VALUE * 2); // 1.7976931348623157e+308 * 2
console.log(typeof Infinity); // number
```

### 1.1.2 NaN  

숫자가 아님(Not-a-Number)을 나타내는 숫자값이다. NaN 프로퍼티는 Number.NaN 프로퍼티와 같다.

```javascript
console.log(Number('xyz')); // NaN
console.log(1 * 'string');  // NaN
console.log(typeof NaN);    // number
```

### 1.1.3 undefined

변수에 값이 대입되지 않았음을 나타내는 값이다. 초기값은 [기본 자료형(primitive data type)](./js-data-type-variable#11-primitive-data-type-기본자료형) `undefined`이다.

```javascript
var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined
```

## 1.2 Global function (전역 함수)

Global function(전역 함수)는 전역에서 호출할 수 있으며 호출한 곳(caller)으로 결과값을 반환한다. 아래의 Global function(전역 함수)는 모두 Global Object(전역 객체)의 함수 프로퍼티이다.

### 1.2.1 eval()

문자열 파라미터로서 전달된 code 또는 표현식(expression)을 평가 또는 실행한다. 사용자로 부터 입력받은 Contents(untrusted data)를 eval()로 실행하는 것은 보안에 매우 취약하다. 불필요한 eval()의 사용은 금지되어야 한다.

```javascript
eval(string)
// string: code 또는 표현식을 나타내는 문자열. 표현식은 존재하는 객체들의 프로퍼티들과 변수들을 포함할 수 있다.
```

```javascript
var foo = eval('2 + 2');
var x = 5,
    y = 4;
console.log(foo); // 4
console.log(eval('x * y')); // 20
```

### 1.2.2 isFinite()  

매개변수(parameter)로 전달된 값이 유한수인지, 정상적인 수인지를 검사하여 그 결과를 Boolean으로 반환한다. 매개변수가 숫자가 아닌 경우, 숫자로 변환한 후 검사를 수행한다.

```javascript
isFinite(testValue)
// testValue: 검사 대상 값
```

```javascript
console.log(isFinite(Infinity));  // false
console.log(isFinite(NaN));       // false
console.log(isFinite('Hello'));   // false
console.log(isFinite('2005/12/12'));   // false

console.log(isFinite(0));         // true
console.log(isFinite(2e64));      // true
console.log(isFinite(null));      // true: null->0
```

isFinite(null)은 true를 반환하는데 이것은 null을 숫자로 변환하여 검사를 수행하였기 때문이다.

```javascript
Number(null)  // 0
Boolean(null) // false
```

### 1.2.3 isNaN()  

매개변수(parameter)로 전달된 값이 NaN인지를 검사하여 그 결과를 Boolean으로 반환한다. 매개변수가 숫자가 아닌 경우, 숫자로 변환한 후 검사를 수행한다.

```javascript
isNaN(testValue)
// testValue: 검사 대상 값
```

```javascript
isNaN(NaN)       // true
isNaN(undefined) // true: undefined -> NaN
isNaN({})        // true: {} -> NaN
isNaN('blabla')  // true: 'blabla' -> NaN

isNaN(true)      // false: true -> 1
isNaN(null)      // false: null -> 0
isNaN(37)        // false

// strings
isNaN('37')      // false: '37' -> 37
isNaN('37.37')   // false: '37.37' -> 37.37
isNaN('')        // false: '' -> 0
isNaN(' ')       // false: ' ' -> 0

// dates
isNaN(new Date())             // false: new Date() -> Number
isNaN(new Date().toString())  // true:  String -> NaN
```

### 1.2.4 parseFloat()  

매개변수(parameter)로 전달된 문자열을 부동소수점숫자(floating point number)로 변환하여 반환한다.

```javascript
parseFloat(string)
// string: 변환 대상 문자열
```

매개변수 문자열의 첫 숫자만 반환되며 전후 공백은 무시된다. 그리고 첫문자를 숫자로 변환할 수 없다면 NaN을 반환한다.

```javascript
parseFloat('3.14');     // 3.14
parseFloat('10.00');    // 10
parseFloat('34 45 66'); // 34
parseFloat(' 60 ');     // 60
parseFloat('40 years'); // 40
parseFloat('He was 40') // NaN
```

### 1.2.5 parseInt()  

매개변수(parameter)로 전달된 문자열을 정수형 숫자(Integer)로 변환하여 반환한다.

```javascript
parseInt(string, radix);
// string: 변환 대상 문자열
// radix: 진법을 나타내는 기수(2 ~ 36, 기본값 10)
```

매개변수 문자열의 첫 숫자만 반환되며 전후 공백은 무시된다. 그리고 첫문자를 숫자로 변환할 수 없다면 NaN을 반환한다.

2번재 매개변수에 진법을 나타내는 기수를 지정할 수 있다. 1번째 매개변수 문자열이 0x로 시작되면 기수를 생략하여도 16진수로 인식한다, 하지만 0으로 시작되면 10진수로 인식하므로 8진수로 인식시키기 위해서는 반드시 기수 8을 지정하여야 한다.

```javascript
parseInt('10');       // 10
parseInt('10.33');    // 10
parseInt('34 45 66'); // 34
parseInt(' 60 ');     // 60
parseInt('40 years'); // 40
parseInt('He was 40') // NaN

parseInt('0x20');     // 32
parseInt('020', 8);   // 16
parseInt('020');      // 20
parseInt('10', 16);   // 16
parseInt('10', 8);    // 8
```

### 1.2.6 encodeURI() / decodeURI()  

encodeURI()은 매개변수로 전달된 URI(Uniform Resource Identifier)를 인코딩한다.

![uri](/img/uri.png)

여기서 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다.

- 이스케이프 처리: 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 ASCII 문자로 변환하는 것이다. UTF-8 특수문자의 경우, 1문자당 1~3byte, UTF-8 한글 표현의 경우, 1문자당 3btye이다.  예를 들어 특수문자 공백(space)은	%20, 한글 '가'는 %EC%9E%90으로 인코딩된다.

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
var uri = 'http://www.test.com/자바스크립트/test.php?who=나&target=너#전역 객체';
var enc = encodeURI(uri);
var dec = decodeURI(enc);
console.log(enc);
console.log(dec);
```

### 1.2.7 encodeURIComponent() / decodeURIComponent()

encodeURIComponent()은 매개변수로 전달된 URI(Uniform Resource Identifier) component(구성 요소)를 인코딩한다. 여기서 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다. 단 아래의 문자는 이스케이프 처리에서 제외된다.

- 알파벳, 0~9의 숫자, - _ . ! ~ * ' ( )

decodeURIComponent()은 매개변수로 전달된 URI component(구성 요소)를 디코딩한다.

```javascript
encodeURIComponent(URI)
// URI: URI component(구성 요소)
decodeURIComponent(encodedURI)
// encodedURI: 인코딩된 URI component(구성 요소)
```

```javascript
var uriComp = 'who=나&target=너#전역 객체';
var enc = encodeURI(uriComp);
var dec = decodeURI(enc);
console.log(enc);
console.log(dec);
```

# 2. Standard Built-in Objects (Global objects)

Javascript는 프로그램 전체의 영역에서 공통적으로 필요한 기능을 사용자 각자가 일일히 작성하는 수고를 줄이기 위해 Standard Built-in Objects(표준 빌트인 객체)를 제공한다.

## 2.1 Object  

[객체 생성자(Object constructor)](./js-object#object--)는 레퍼(wrapper) 객체를 생성한다. 만약 생성자 인수값이 null이거나 undefined이면 빈 객체를 반환한다.

```javascript
// 변수 o에 빈 객체를 저장한다
var o = new Object();
console.log(typeof o + ': ', o);

o = new Object(undefined);
console.log(typeof o + ': ', o);

o = new Object(null);
console.log(typeof o + ': ', o);
```

그 이외의 경우 생성자 함수의 인수값에 따라 강제 형변환된 객체가 반환된다. 이때 반환된 객체의 [[prototype]]프로퍼티에 바인딩된 객체는 Object.prototype이 아니다.

```javascript
// String 객체를 반환한다
// var o = new String('String');과 동치이다
var obj = new Object('String');
console.log(typeof obj + ': ', obj);
console.dir(obj);

var strObj = new String('String');
console.log(typeof strObj + ': ', strObj);

// Number 객체를 반환한다
// var o = new Number(123);과 동치이다
var obj = new Object(123);
console.log(typeof obj + ': ', obj);

var numObj = new Number(123);
console.log(typeof numObj + ': ', numObj);

// Boolean 객체를 반환한다.
// var o = new Boolean(true);과 동치이다
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

## 2.2 Function

자바스크립트의 모든 함수는 Function 객체이다. 다른 모든 객체들처럼 Function 객체는 new 연산자을 사용해 생성할 수 있다.

```javascript
var adder = new Function('a', 'b', 'return a + b');

adder(2, 6);  // 8
```

함수에 대한 자세한 내용은 [Javascript Function](./js-function)을 참조 바란다.

## 2.3 Boolean

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

## 2.4 Number

* [Number](./js-number)

## 2.5 Math

* [Math](./js-math)

## 2.6 Date

* [Date](./js-date)

## 2.7 String

* [Date](./js-string)

## 2.8 RegExp

* [RegExp](./js-regexp)

## 2.9 Array

* [Array](./js-array)

## 2.10 Error

Error 생성자는 error 객체를 생성한다. error 객체의 인스턴스는 런타임 에러가 발생하였을 때 throw된다.

```javascript
try {
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

## 2.11 Symbol

Symbol은 ECMAScript 6(Javascript 2015) 에서 추가된 유일하고 변경 불가능한(immutable) 기본자료형으로 Symbol 객체는 기본자료형 Symbol을 위한 레퍼(wrapper) 객체를 생성한다.

# 3. 기본자료형과 래퍼객체(Wrapper Object)

앞서 살펴본 바와 같이 각 Standard Built-in Object는 각자의 프로퍼티와 메서드를 가진다. 정적(static) 프로퍼티, 메서드는 해당 인스턴스를 생성하지 않아도 사용할 수 있고 prototype에 속해있는 메소드는 해당 prototype을 상속받은 인스턴스가 있어야만 사용할 수 있다.

그런데 기본자료형의 값에 대해 Standard Built-in Object의 메서드를 호출하면 정상적으로 작동한다.

```javascript
var str = 'Hello world!';
var res = str.toUpperCase();
console.log(res); // 'HELLO WORLD!'

var num = 1.5;
console.log(num.toFixed()); // 2
```

이는 기본자료형의 값에 대해 Standard Built-in Object의 메서드를 호출할 때, **기본자료형의 값은 연관된 객체(Wrapper 객체)로 일시 변환** 되기 때문에 가능한 것이다. 그리고 메서드 호출이 종료되면 객체로 변환된 기본자료형의 값은 다시 기본자료형의 값으로 복귀한다.

자세한 내용은 [Prototype: 4.기본자료형(Primitive data type)의 확장](./js-prototype#primitive-data-type-)을 참조 바란다.

Wrapper 객체는 String, Number, Boolean이 있다.

# Reference

* [Standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
