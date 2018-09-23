---
layout: post
title: <strong>Type coercion</strong>
subtitle: 암묵적 타입 강제 변환과 단축 평가
categories: javascript
section: javascript
description: 자바스크립트는 암묵적 타입 강제 변환을 통해 조건식을 평가한다. 다시 말해, 조건식에 주어진 값이 Boolean 값이 아니더라도 암묵적 타입 강제 변환을 통해 Boolean 값으로 변환하여 평가한다.
---

* TOC
{:toc}

# 1. 암묵적 타입 강제 변환

자바스크립트는 필요에 따라 값을 암묵적 타입 강제 변환(Type coercion)한다. 아래의 예제를 살펴보자.

```javascript
1 + '2'            // '12'
2 - '1'            // 1
'1' > 0            // true
'10' == 10         // true
undefined == null  // true
```

위 예제의 `+` 연산자는 산술 연산자가 아니라 문자열 연산자이다. 문자열 연산자는 좌후항 피연산자 중에서 문자열이 아닌 피연산자를 암묵적 타입 강제 변환을 통해 문자열 타입으로 변환한다.

피연산자만이 암묵적 타입 강제 변환의 대상이 되는 것은 아니다. if문이나 for문과 같은 제어문의 조건식도 필요에 따라 암묵적 타입 강제 변환의 대상이 될 수 있다.

```javascript
var x = '';

if (x) {
  console.log(x);
}
```

조건식(conditional expression)은 표현식의 일종이다. 따라서 피연산자와 연산자로 구성된 일반적 표현식은 물론 하나의 값으로 수렴할 수 있는 문자열이나 숫자와 같은 리터럴 값, 변수, 내장값들(true, false, null, undefined, Nan, Infinity...)등 또한 조건식으로 사용될 수 있다.

조건식은 논리적 참, 거짓으로 평가할 수 있어야 한다. 만약에 조건식의 평가 결과가 불리언 값이 아니라면 암묵적 타입 강제 변환을 통해 불리언 타입으로 변환한다.

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

이처럼 자바스크립트는 문맥(context)을 고려하여 타입을 암묵적으로 강제 변환하여 작업을 수행한다. 이때 의도하지 않은 값을 만들어낼 수 있으므로 주의가 필요하다.

```javascript
var num = 2;
var str = '1';

// Bad
console.log(num - str);

// Good
console.log(num - parseInt(str));
```

위 예제와 같이 암묵적 타입 강제 변환이 일어나도록 코딩하는 것은 가독성이 좋지 않고 의도하지 않은 오류를 만들 가능성이 있으므로 바람직하지 않다.

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

# 5. 단축 평가

논리 연산자는 다음의 규칙을 따라서 "단축 평가(Short-Circuit evaluation)"된다.

| 평가식                 | 평가 결과        |
| :-------------------: | :------------- |
| true  &#124;&#124; anything     | true
| false &#124;&#124; anything     | anything
| true  && anything     | anything
| false && anything     | false

논리 연산자는 좌우항의 피연산자가 불리언 타입이 아닌 경우, 피연산자를 불리언 타입으로 변환한 후, 연산한다. 이때 논리 연산자는 연산의 결과를 반환하기 위해 피연산자 모두를 평가할 필요가 없는 경우도 있다. 아래 예제를 통해 살펴보자.


```javascript
'Cat' && 'Dog'; // 'Dog'
```

'Cat'은 truthy 값이므로 `true`로 평가된다. 논리곱 연산자 `&&`의 경우, 좌우항의  피연산자 모두 `true`로 평가되어야 `true`를 반환하므로 연산 결과를 알기 위해서는 'Dog'까지 평가해 보아야 한다. 이때 논리 연산의 결과를 결정한 우항 피연산자의 값 'Dog'를 그대로 반환한다.

```javascript
false && 'Cat'; // false
```

위 예제의 경우, 좌항 피연산자의 값이 `false`이므로 논리곱 연산자 `&&`는 우항 피연산자의 값까지 평가할 필요가 없다. 따라서 논리 연산의 결과가 결정한 좌항 피연산자의 값 `false`를 그대로 반환한다.

```javascript
'Cat' || 'Dog'; // 'Cat'
```

위 예제의 경우, 좌항 피연산자의 값 'Cat'은 truthy 값이므로 `true`로 평가된다. 이때 논리합 연산자 `||`는 우항 피연산자의 값까지 평가할 필요가 없다. 따라서 논리 연산의 결과가 결정한 좌항 피연산자의 값 'Cat'을 그대로 반환한다.

이처럼 **논리 연산자는 좌우항 피연산자 중 논리 연산의 결과를 결정한 피연산자의 값을 그대로 반환한다.**

```javascript
// || (논리 합) 연산자
'Cat' || 'Dog';  // 'Cat'
false || 'Cat';  // 'Cat'
'Cat' || false;  // 'Cat'

// && (논리곱) 연산자
'Cat' && 'Dog';  // Dog
false && 'Cat';  // false
'Cat' && false;  // alse

// Short-Circuit evaluation에 의한 파라미터 기본값
function getStringLength(str) {
  str = str || '';
  return str.length;
}
// ES6 파라미터 기본값
function getStringLength(str = '') {
  return str.length;
}

getStringLength();     // 0
getStringLength('hi'); // 2
```

# 6. 동등성 체크 (Checking equality)

두 값이 같은 값인지 비교할 때에 동등 연산자(==, !=)보다 일치 연산자(===, !==)를 사용하여야 한다. 동등 연산자는 암묵적으로 타입 변환된 값을 비교하지만 일치 연산자는 타입까지 비교하므로 보다 정확한 결과를 얻을 수 있다.

```javascript
console.log(1 == '1');  // true
console.log(1 === '1'); // false
```

# 7. 존재 확인 (Checking existence)

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

# 8. !!

부정 연산자 `!`를 두번 언이어 사용하면 피연산자를 불리언 타입으로 변경하고 두번 부정 연산을 실행한다. 따라서 `!!`는 피연산자를 불리언 타입의 값으로 타입 변환하는 역할을 한다.

```javascript
console.log(!!1);         // true
console.log(!!0);         // false
console.log(!!'string');  // true
console.log(!!'');        // false
console.log(!!null);      // false
console.log(!!undefined); // false
console.log(!!{});        // true
console.log(!![]);        // true
```

객체(배열 포함)의 경우 빈 객체라도 존재하기만하면 true로 변환된다.

객체의 존재 확인 후 그 결과를 반환해야 하는 경우, !!를 사용하면 강제로 피연산자를 불리언으로 형 변환할 수 있다.

```javascript
var obj;
console.log(!!obj); // false

obj = {};
console.log(!!obj); // true
```

# Reference

* [단항 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)
