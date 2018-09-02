---
layout: post
title: Javascript <strong>Type coercion</strong>
subtitle: 암묵적 타입 강제 변환
categories: javascript
section: javascript
description: 바스크립트는 암묵적 타입 강제 변환을 통해 조건식을 평가한다. 다시 말해, 조건식에 주어진 값이 Boolean 값이 아니더라도 암묵적 타입 강제 변환을 통해 Boolean 값으로 변환하여 평가한다.
---

* TOC
{:toc}

# 1. 암묵적 타입 강제 변환 (Type coercion)

흐름제어를 위해서는 조건식을 평가하여 논리적 참, 거짓을 구별한 후 평가 결과에 따라 의사결정을 하는 것이 일반적이다.

조건식(conditional expression)은 표현식(expression)의 일종이다. 따라서 피연산자와 연산자로 구성된 일반적 표현식뿐만 아니라 하나의 값으로 수렴할 수 있는 문자열이나 숫자와 같은 리터럴 값, 변수, 내장값들(true, false, null, undefined, Nan, Infinity...)등 또한 조건식으로 사용될 수 있다.

이때 자바스크립트는 암묵적 타입 강제 변환을 통해 조건식을 평가한다. 다시 말해, 조건식에 주어진 값이 Boolean 값이 아니더라도 암묵적 타입 강제 변환을 통해 Boolean 값으로 변환하여 평가한다.

```javascript
if (true) {
  console.log('1');
}

if (1) {
  console.log('2');
}

if ('str') {
  console.log('3');
}

if (null) {
  console.log('4');
}

var x = '';

if (x) {
  console.log('5');
}

if (!x) {
  console.log('6');
}
```

자바스크립트는 context(문맥)을 고려하여 타입(자료형)을 암묵적으로 강제 변환하여 작업을 수행한다. 이때 의도하지 않은 값을 만들어낼 수 있으므로 주의가 필요하다.

```javascript
console.log('1' > 0);            // true
console.log(1 + '2');            // '12'
console.log(2 - '1');            // 1
console.log('10' == 10);         // true
console.log('10' === 10);        // false
console.log(undefined == null);  // true
console.log(undefined === null); // false
```

위 예제와 같이 암묵적 타입 강제 변환이 일어나도록 코딩하는 것은 가독성이 좋지 않고 의도하지 않은 오류를 만들 가능성이 있으므로 바람직하지 않다.

```javascript
var num = 2;
var str = '1';

// Bad
console.log(num - str);

// Good
console.log(num - parseInt(str));
```

# 2. 타입 변환 테이블 (Type Conversion Table)

|Original Value|Converted to Number	|Converted to String |Converted to Boolean|
|:-------------|:------------------:|:------------------:|:------------------:|
| false        | <b style='color:red'>0</b> | 'false'	   | false
| true         | <b style='color:red'>1</b> | 'true'	   | true
| 0	           | 0	                | '0'	               | <b style='color:red'>false</b>
| 1	           | 1  	              | '1'	               | true
| '0'	         | <b style='color:red'>0</b>	| '0'	       | <b style='color:red'>true</b>
| '1'	         | <b style='color:red'>1</b>	| '1'        | true
| NaN	         | NaN	              | 'NaN'	             | <b style='color:red'>false</b>
| Infinity	   | Infinity	          | 'Infinity'	       | true
| -Infinity	   | -Infinity	        | '-Infinity'	       | true
| ''	         | <b style='color:red'>0</b>| ''	         | <b style='color:red'>false</b>
| '10'	       | 10	                | '10'	             | true
| 'ten'	       | NaN	              | 'ten'	             | true
| [ ]	         | <b style='color:red'>0</b>| ''	         | true
| [10]	       | <b style='color:red'>10</b>| '10'	     | true
| [10, 20]	   | NaN	              | '10,20'	           | true
| ['ten']	     | NaN	              | 'ten'	         | true
| ['ten', 'twenty']|	NaN	            | 'ten, twenty'	     | true
| function(){} | NaN	              | 'function(){}'	   | true
| { }	         | NaN	              | '[object Object]'	 | true
| null	       | <b style='color:red'>0</b> | 'null'	   | <b style='color:red'>false</b>
| undefined    | <b style='color:red'>NaN</b> | 'undefined'	| <b style='color:red'>false</b>


# 3. 타입 변환 (Type Casting)

값의 타입을 변경(casting)하는 방법은 다양하다. 아래와 같이 래퍼 객체 생성자 함수를 new 연산자없이 호출하면 타입을 변경한 값을 생성할 수 있다.

```javascript
var x = false;

// 변수 x의 값을 숫자 타입으로 변환
console.log('Number : ' + Number(x));  // 0
// 변수 x의 값을 문자열 타입으로 변환
console.log('String : ' + String(x));  // 'false'
// 변수 x의 값을 불리언 타입으로 변환
console.log('Boolean: ' + Boolean(x)); // false
```

["+" 단항 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)는 대부분의 값을 number 타입으로 변환할 수 있다.

```javascript
console.log(+10);     // 10
console.log(+'10');   // 10
console.log(+true);   // 1
console.log(+false);  // 0
console.log(+null);   // 0
console.log(+undefined); // NaN
console.log(+NaN);    // NaN
```

문자열을 숫자 타입으로, 숫자 타입을 문자열 타입으로 변경하는 예제는 아래와 같다.

```javascript
var val = '123';
console.log(typeof val + ': ' + val); // string: 123

// sting -> number
val = +val; // "+": 단항 연산자(unary operator)
// val = val * 1;
// val = parseInt(val);
// val = Number(val);
console.log(typeof val + ': ' + val); // number: 123

// number -> sting
val = val + '';
// val = String(val);
// val = val.toString();
console.log(typeof val + ': ' + val); // string: 123
```

# 4. Truthy & Falsy value

아래 값들은 Boolean context에서 `false`로 평가된다.

* `false`
* `undefined`
* `null`
* `0`
* `NaN` (Not a Number)
* `''` (빈문자열)

이들을 Falsy value라 한다.

Falsy value 이외의 값들(object 포함)은 모두 true로 평가된다. 이들을 Truthy value라 한다.

```javascript
var x = false;
if (!x)  console.log(x+' is falsy value');

x = undefined;
if (!x)  console.log(x+' is falsy value');

x = null;
if (!x)  console.log(x+' is falsy value');

x = 0;
if (!x)  console.log(x+' is falsy value');

x = NaN;
if (!x)  console.log(x+' is falsy value');

x = '';
if (!x)  console.log(x+' is falsy value');
```

Truthy/Falsy value를 판별하는 함수는 아래와 같다.

```javascript
// 인자가 falsy 값이면 true, truthy 값이면 false를 반환
function falsy(v) {
  return !v;
}

// 인자가 truthy 값이면 true, falsy 값이면 false를 반환
function truthy(v) {
  return !!v;
}

// 모두 true
console.log(falsy(false));
console.log(falsy(undefined));
console.log(falsy(null));
console.log(falsy(0));
console.log(falsy(NaN));
console.log(falsy(''));

console.log(truthy(true));
console.log(truthy('0'));
console.log(truthy({}));
```

# 5. 동등성 체크 (Checking equality)

두 값이 같은 값인지 비교할 때에 동등 연산자(==, !=)보다 일치 연산자(===, !==)를 사용하여야 한다. 동등 연산자는 암묵적으로 타입 변환된 값을 비교하지만 일치 연산자는 타입까지 비교하므로 보다 정확한 결과를 얻을 수 있다.

```javascript
console.log(1 == '1');  // true
console.log(1 === '1'); // false
```

# 6. 존재 확인 (Checking existence)

객체나 배열(배열도 객체이다)은 인스턴스가 생성된 상태라면 빈 객체, 빈 배열이라도 truthy로 취급된다. 이를 이용하여 존재 여부를 확인할 수 있다. 아래의 예제를 살펴보자.

[getElementById](https://developer.mozilla.org/ko/docs/Web/API/Document/getElementById)를 통해 DOM에서 특정 요소를 취득하는 경우, DOM 상에 해당 요소가 존재할 수도 있지만 존재하지 않을 가능성도 있다. 만약 취득하고자하는 요소가 존재하여 해당 요소 취득에 성공하였다면 변수 elem의 값은 HTMLElement를 상속받은 객체의 인스턴스이다. 취득하고자하는 요소가 존재하지 않아서 요소 취득에 실패하였다면 변수 elem의 값은 null이다. 이때 객체의 인스턴스는 true로 평가되며 null은 false로 평가된다.

```javascript
// DOM에서 특정 요소를 취득
var elem = document.getElementById('header');

if (elem) {
  // 요소가 존재함(요소 취득 성공) : 필요한 작업을 수행
} else {
  // 요소가 존재하지 않음(요소 취득 실패) : 에러 처리
}
```

아래 예는 위의 예와는 다른 의미이다. 객체의 존재는 truthy value로 취급지만 boolean 값 true와 같지는 않다.

```javascript
// DOM에서 특정 요소를 취득
var elem = document.getElementById('header');

// 변수 elem의 값이 true인지 평가한다.
// 변수 elem의 값은 null 또는 HTMLElement를 상속받은 객체의 인스턴스
if (elem == true) // false
```

아래 예와 같은 경우를 주의해야 한다.

```javascript
var b = new Boolean(false);
if (b) // true
```

# Reference

* [단항 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)