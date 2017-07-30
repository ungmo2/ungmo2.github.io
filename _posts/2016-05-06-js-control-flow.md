---
layout: post
title: Javascript <strong>Control Flow</strong>
subtitle: 제어문
categories: javascript
section: javascript
description: 제어문(Control flow statement)은 조건에 따른 명령 실행(조건문)이나 반복 실행(반복문)이 필요할 때 사용된다. 일반적으로 코드는 위에서 아래 방향으로 순차적 실행을 하지만 실행 순서를 변경하거나 조건에 따라 실행 여부를 결정하기도 하고 반복할 수도 있다.
---

* TOC
{:toc}

제어문(Control flow statement)은 조건에 따른 명령 실행(조건문)이나 반복 실행(반복문)이 필요할 때 사용된다.

일반적으로 코드는 위에서 아래 방향으로 순차적 실행을 하지만 실행 순서를 변경하거나 조건에 따라 실행 여부를 결정하기도 하고 반복할 수도 있다.

# 1. 블록 구문(Block statement)

블록 구문(Block statement)는 구문들의 집합으로 가장 기본이 되는 구문이다. (블록은 중괄호로 그 범위를 정한다)
블록 구문은 일반적으로 함수, 객체리터럴, 흐름 제어 구문(control flow statement)에서 사용된다. (e.g. if, for, while)

```javascript
// 함수 선언문
function foo() {
  var x = 1, y = 2;
  console.log(x + y);
}
foo();

// 객체리터럴에 의한 객체 선언
var obj = {
  x: 1,
  y: 2
};
console.log(obj.x + obj.y);

// 흐름 제어 구문(control flow statement)
var x = 0;
while (x < 10) {
  x++;
}
console.log(x);
```

# 2. 조건문(Conditional statement)

프로그래밍(coding)이란 변수를 통해 값를 저장하고 참조하며 연산자로 값을 연산, 평가하고 조건문과 반복문에 의한 ***흐름제어로 데이터의 흐름을 제어*** 하고 함수로 구문의 집합을 만들며 객체, 배열 등으로 자료를 구조화한다.

> ***프로그래밍은 요구사항의 집합을 분석하여 적절한 자료구조와 함수의 집합으로 변환한 후 그 흐름을 제어하는 것이다.***

데이터의 흐름을 제어한다는 것은 일정 조건에 따른 의사결정(decision)을 통해 다음 진행 흐름으로 유도(Control flow)하는 것이다. 이는 가장 원시적인 형태의 인공 지능(Artificial Intelligence)을 부여하는 것이라고 볼 수 있다. 즉 의사결정(상황판단)의 기준을 제시하고 그 결과에 따른 행위를 지시하는 것이다.

조건문(conditional statement)를 통해 이를 수행할 수 있다. 조건문은 주어진 조건식(conditional expression)이 참(`true`)인지 거짓(`false`)인지에 따라 실행되어질 구문들의 집합이다.

JavaScript는 2가지의 조건문 `if...else` 와 `switch`를 제공한다.

## 2.1 if 문

`if` 문은 주어진 조건식을 평가하여 논리적 참, 거짓을 구별하는 구문이다. 조건식은 표현식이기 때문에 하나의 값(true/false)으로 수렴될 수 있다.

```javascript
if (조건식) {
  // 조건식이 참이면 이 코드블록이 실행된다.
} else {
  // 조건식이 거짓이면 이 코드블록이 실행된다.
}
```

조건문의 평가 결과가 참(true)일 경우, `if` 문 직후에 존재하는 코드 블럭이 실행된다. 거짓(false)일 경우, `else` 구문 직후에 존재하는 코드 블럭이 실행된다. (`else if`와 `else` 구문은 option이다.)

```javascript
var hour = 20;
var greeting;

// if 문
if (hour < 18) {
  greeting = 'Good day';
}

console.log(greeting);

// if-else 문
if (hour < 18) {
  greeting = 'Good day';
} else {
  greeting = 'Good evening';
}

console.log(greeting);

// if-else if 문
if (hour < 10) {
  greeting = 'Good morning';
} else if (hour < 20) {
  greeting = 'Good day';
} else {
  greeting = 'Good evening';
}

console.log(greeting);
```

## 2.2 switch 문

switch 문의 경우, `switch`변수의 값과 일치되는 `case`문으로 실행 순서가 이동하게 된다. `switch`변수의 값과 일치되는 `case`문이 없다면 실행 순서는 `default`로 이동한다.

```javascript
var color = 'red';

// color = switch 변수
switch (color) {
  // color == 'yellow'인 경우
  case 'yellow':
    console.log('yellow color');
  // color == 'red'인 경우
  case 'red':
    console.log('red color');
  // color == 'blue'인 경우
  case 'blue':
    console.log('blue color');
  // 그외의 경우
  default:
    console.log('unknown color');
}
```

`break` keyword는 switch 구문에서 탈출하는 역할을 수행한다. break문이 없다면 case문의 조건과 일치하지 않더라도 실행 순서는 다음 case문으로 이동한다.

```javascript
var color = 'red';

switch (color) {
  case 'yellow':
    console.log('yellow color');
    break;
  case 'red':
    console.log('red color');
    break;
  case 'blue':
    console.log('blue color');
    break;
  default:
    console.log('unknown color');
}
```

`default`문에는 `break`를 생략하여도 무방하다. 이유는 `default`문이 가장 마지막에 위치하므로 다음 구문으로 이동할 수 없기 때문이다.

# 3. 반복문(Loop)

반복문은 주어진 조건식(conditional expression)이 참인 경우 코드 블록을 실행한다.

그 후 조건식을 다시 검사하여 여전히 참인 경우 코드 블록을 다시 실행하며 이는 조건식이 거짓일 때까지 반복된다.

JavaScript는 3가지의 반복문 `for`, `while`, `do while`을 제공한다.

## 3.1 for 문

for문은 특정 조건이 거짓으로 판별될 때까지 반복한다. 가장 일반적으로 사용되는 반복문이다.

```
for ([초기문]; [조건문]; [증감문]) {
  구문;
}
```

아래의 for문은 변수 i가 0으로 초기화된 상태에서 i가 2보다 작아질 때까지 코드블럭을 반복 실행한다.

```javascript
for (var i = 0; i < 2; i++) {
  console.log(i);
}
```

![for문](./img/for-statement.png)
{: .w-350}

for문의 실행 순서
{: .desc-img}

다음은 위 예제를 역으로 반복하는 for문의 예이다.

```javascript
for (var i = 1; i >= 0; i--) {
  console.log(i);
}
```

다음은 배열을 순회하는 for문의 예이다.

```javascript
var array = ['one', 'two', 'three', 'four'];

for (var i = 0; i < array.length; i++) {
  // console.log(array[i]);
  console.log('[' + i + '] = ' + array[i]);
}

// for-in
for (var index in array) {
  console.log('[' + index + '] = ' + array[index]);
}

// foreach
array.forEach(function (element, index, arr) {
  console.log('[' + index + '] = ' + element);
});

// for-of (ES6)
for (const element of array) {
  console.log(element);
}
// array.entries(): 배열의 key/value의 쌍을 반환하는 iterator를 반환
for (const [index, value] of array.entries()) {
  console.log('[' + index + '] = ' + value);
}
```

for문의 모든 식은 선택 사항이며 반드시 사용할 필요는 없다. 어떤 식도 선언하지 않으면 무한루프가 된다.

```javascript
var i = 0;
for (;;) { // 무한루프
  if (i >= 3) {
    break;
  }
  console.log(i);
  i++;
}
```

## 3.2 while 문

while 문은 조건문이 참이면 코드 블럭을 계속해서 반복 실행한다. 조건문이 거짓이 되면 실행을 종료하고 반복문을 빠져나간다.

```javascript
var n = 0;
var x = 0;

// n이 3보다 작을 때까지 계속 반복한다.
while (n < 3) { // n: 0 1 2
  n++;          // n: 1 2 3
  x += n;       // x: 1 3 6
  console.log(x);
}
```

조건문이 언제나 참이면 무한루프가 된다.

```javascript
var i = 0;
// 무한루프
while (true) {
  console.log(i);
  i++;
}
```

무한루프를 탈출하기 위해서는 break문을 사용한다. break문을 감싸는 반복문 하나를 탈출한다.

```javascript
var i = 0;
// 무한루프
while (true) {
  console.log(i);
  i++;
  // i가 10이면 exit!
  if (i === 10) break;
}
```

## 3.3 do while문

while문과 유사하나 코드블록은 조건문을 확인하기 전에 무조건 1회 실행된다. 그후 조건문을 확인하여 실행 여부를 판별한다.

```javascript
var i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);
```

## 3.4 continue

break문은 반복문 하나를 탈출한다. continue문은 이후 구문의 실행을 스킵하고 반복문의 조건문으로 이동한다.

```javascript
for (var i = 0; i < 5; i++) {
  if (i % 2 == 0) continue;
  console.log(i);
}
```

# 4. 평가(Evaluating)

흐름제어를 위해서는 조건식을 평가하여 논리적 참, 거짓을 구별한 후 평가 결과에 따라 의사결정을 하는 것이 일반적이다.

조건식(conditional expression)은 표현식(expression)의 일종이다. 따라서 피연산자와 이항연산자로 구성된 일반적 표현식뿐만 아니라 문자열이나 숫자와 같은 리터럴 값, 변수, 내장값들(true, false, null, undefined, Nan, Infinity...)등 또한 조건식으로 사용될 수 있다.

```javascript
if (1) {
  console.log('1');
}

if ('str') {
  console.log('2');
}

if (true) {
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

이때 자바스크립트는 암묵적 강제 형 변환을 통해 조건식을 평가한다.

## 4.1 암묵적 강제 형 변환 (Type coercion)

Javascript는 context(문맥)을 고려하여 내부적으로 자료형을 암묵적으로 강제 변환하여 작업을 완료할 수 있다. 이는 의도하지 않은 값을 만들어낼 수 있어 주의가 필요하다.

```javascript
console.log('1' > 0);            // true
console.log(1 + '2');            // '12'
console.log(2 - '1');            // 1
console.log('10' == 10);         // true
console.log('10' === 10);        // false
console.log(undefined == null);  // true
console.log(undefined === null); // false
```

## 4.2 Type Conversion Table

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
| '20'	       | 20	                | '20'	             | true
| 'twenty'	   | NaN	              | 'twenty'	         | true
| [ ]	         | <b style='color:red'>0</b>| ''	         | true
| [20]	       | <b style='color:red'>20</b>| '20'	     | true
| [10,20]	     | NaN	              | '10,20'	           | true
| ['twenty']	 | NaN	              | 'twenty'	         | true
| ['ten', 'twenty']|	NaN	            | 'ten, twenty'	     | true
| function(){} | NaN	              | 'function(){}'	   | true
| { }	         | NaN	              | '[object Object]'	 | true
| null	       | <b style='color:red'>0</b> | 'null'	   | <b style='color:red'>false</b>
| undefined    | <b style='color:red'>NaN</b> | 'undefined'	| <b style='color:red'>false</b>


```javascript
var x = false;
console.log('Number : ' + Number(x));
console.log('String : ' + String(x));
console.log('Boolean: ' + Boolean(x));
```

## 4.3 Data type conversion

```javascript
var val = '123';
console.log(typeof val + ': ' + val); // string: 123

// sting -> number
val *= 1;
// val = Number(val);
// val = parseInt(val);
console.log(typeof val + ': ' + val); // number: 123

// number -> sting 
val += '';
// val = String(val);
console.log(typeof val + ': ' + val); // string: 123
```

## 4.4 Truthy & Falsy values

아래 값들은 Boolean context에서 `false`로 평가된다.

* `false`
* `undefined`
* `null`
* `0`
* `NaN` (Not a Number)
* `''` (빈문자열)

이들을 Falsy values라 한다.

Falsy values 이외의 값들(object포함)은 모두 true로 평가된다. 이들을 Truthy values라 한다.

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

## 4.5 Checking equality

```javascript
// logs false !!!
console.log(null == false);
console.log(undefined == false);
console.log(null == 0);
console.log(undefined == 0);
console.log(undefined === null);
console.log(NaN == null);
console.log(NaN == NaN);
```

두 값을 비교할 때에 동등연산자(==, !=)보다 일치연산자(===, !==)를 사용하여야 한다.

## 4.6 Checking existence

단항 연산자를 활용한 존재 확인이 가능하다. 즉, 객체나 배열(배열도 객체이다)이 값을 가지고 있으면 truthy value로 취급된다.받는다. 이를 이용하여 존재여부를 확인할 수 있다.

```javascript
if (document.getElementById('header')) {
  // 요소가 존재함 : 필요한 작업을 수행
} else {
  // 요소가 존재하지 않음 : 필요한 작업을 수행
}
```

아래 예는 위의 예와는 다른 의미이다. 객체의 존재는 truthy value로 취급지만 boolean 값 true와 같지는 않다.

```javascript
if (document.getElementById('header') == true) // false
```

아래 예와 같은 경우를 주의해야 한다.

```javascript
var b = new Boolean(false);
if (b) // true
```
