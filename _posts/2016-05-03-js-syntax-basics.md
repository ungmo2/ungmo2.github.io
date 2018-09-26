---
layout: post
title: <strong>Syntax Basics</strong>
subtitle: 자바스크립트의 기본 문법
categories: javascript
section: javascript
description: Javascript는 interactive한 웹페이지 작성을 가능하게 한다. 예를 들면, 이벤트(e.g. 버튼 클릭, 웹페이지 로딩 완료 등)에 반응하여 HTML 요소에 접근하고 HTML 요소를 조작할 수 있다. 정적인 HTML을 동적으로 변경할 수 있는 유일한 방법은 Javascript를 사용하는 것이다
---

* TOC
{:toc}

# 1. 문

프로그램(스크립트)은 컴퓨터(Client-side Javascript의 경우, 엄밀히 말하면 웹 브라우저)에 의해 단계별로 수행될 명령들의 집합이다.

각각의 명령을 문(statement)이라 하며 문이 실행되면 무슨 일인가가 일어나게 된다.

문은 값(Value), 연산자(Operator), 표현식(Expression), 키워드(Keyword), 주석(Comment)으로 구성되며 세미콜론( ; )으로 끝나야 한다.

```javascript
var x = 5;
var y = 6;
var z = x + y;

console.log(z);
```

문은 코드 블록(code block, {…})으로 그룹화할 수 있다. 그룹화의 목적은 함께 실행되어져야 하는 문을 정의하기 위함이다.

```javascript
// 함수
function myFunction(x, y) {
  return x + y;
}

// if 문
if(x > 0) {
  // do something
}

// for 문
for (var i = 0; i < 10; i++) {
  // do something
}
```

문들은 일반적으로 위에서 아래로 순서대로 실행된다. 이러한 실행 순서는 조건문(if, switch)이나 반복문(while, for)의 사용으로 제어할 수 있다 이를 흐름제어(Control Flow)라 한다. 또는 함수 호출로 변경될 수 있다.

```javascript
var time = 10;
var greeting;

if (time < 10) {
  greeting = 'Good morning';
} else if (time < 20) {
  greeting = 'Good day';
} else {
  greeting = 'Good evening';
}

console.log(greeting);
```

다른 언어와 달리 자바스크립트에서는 블록 유효범위(Block-level scope)를 생성하지 않는다. 함수 단위의 유효범위(Function-level scope)만이 생성된다.

# 2. 표현식

표현식(Expression)은 값(리터럴), 변수, 객체의 프로퍼티, 배열의 요소, 함수 호출, 메소드 호출, 연산자의 조합을 말한다. **표현식은 평가(Evaluation)되고 그 결과, 하나의 값으로 수렴된다.** 아래의 예에서 5 * 10은 50으로 평가(연산)된다.

```javascript
// 표현식
5 * 10                   // 50
'Hello' + ' ' + 'world'  // 'Hello world'
```

# 3. 문과 표현식의 비교

자연어에서 문(Statement)이 마침표로 끝나는 하나의 완전한 문장(Sentence)이라고 한다면 표현식은 문을 구성하는 요소이다. 표현식은 그자체로 하나의 문이 될 수도 있다. 아래의 예제는 표현식이 포함된 문이다.

```javascript
// 선언문(Declaration statement)
var x = 5 * 10;
// 할당문(Assignment statement)
x = 100;
```

첫번째 선언문은 표현식 `x = 5 * 10`를 포함하는 문이다. 두번째 할당문은 그자체가 표현식이지만 완전한 문이기도 하다.

# 4. 변수

프로그래밍 언어에서 변수는 값(value)을 저장(할당), 참조하기 위해 사용된다. 한번 쓰고 버리는 값이 아닌 유지할 필요가 있는 값의 경우, 변수를 사용한다.

변수(Variable)는 위치(주소)를 기억하는 저장소이다. 위치란 메모리 상의 주소(address)를 의미한다. 즉, 변수란 메모리 주소(Memory address)에 접근하기 위해 사람이 이해할 수 있는 언어로 지정한 식별자(identifier)이다.

변수를 선언할 때 `var` keyword가 사용된다. 등호(=, equal sign)는 변수에 값을 할당하기 위해 사용된다.

아래의 예에서 x는 변수로 선언되었고 변수 x에는 정수값 6이 할당되었다.

```javascript
var x; // 변수의 선언과 초기화
x = 6; // 정수값의 할당
```

# 5. 값

```java
String str = "Hello World";
< 1 > < 2 >      < 3 >
```

위의 Java 예제에서 <1> 은 데이터 타입(자료형), <2>는 변수명, <3>은 문자열 리터럴(literal)이다. 위 예제의 변수 str은 문자열 타입의 값을 할당받는 변수이다.

데이터 타입이란, 변수가 할당받을 값의 타입을 말한다.

변수명은 메모리에 확보된 공간을 가리키는 식별자(identifier)이다.

**리터럴(literal)이란, 프로그램 안에서 직접 만들어 낸 상수 값 자체를 의미한다.** 리터럴은 변수명이 가리키는 메모리 공간에 값으로 저장된다.

자바스크립트는 7가지 데이터 타입을 제공한다.

* 기본 자료형 (primitive data type)
  * `Number`
  * `String`
  * `Boolean`
  * `null`
  * `undefined`
  * `Symbol` (New in ECMAScript 6)
* `Object`

```javascript
// 숫자 리터럴
10.50
1001

// 문자열 리터럴
'Hello'
"World"

// 불리언 리터럴
true
false

// null
null

// undefined
undefined

// 심볼
Symbol()

// 객체 리터럴
{ name: 'Lee', gender: 'male' }

// 배열 리터럴
[ 1, 2, 3 ]

// 함수 리터럴
function() {}
```

자바스크립트는 Java와 같이 변수를 선언할 때 데이터 타입을 미리 지정하지 않는다. 다시 말해, 변수에 할당된 리터럴의 타입에 의해 동적으로 변수의 타입이 결정된다. 이를 동적 타이핑이라 하며 자바스크립트가 다른 프로그래밍 언어와 구별되는 특징 중 하나이다.

```javascript
// Number
var num1 = 1001;
var num2 = 10.50;

// String
var string1 = 'Hello';
var string2 = "World";

// Boolean
var bool = true;

// null
var foo = null;

// undefined
var bar;

// Object
var obj = { name: 'Lee', gender: 'male' };

// Array
var array = [ 1, 2, 3 ];

// function
var foo = function() {};
```

# 6. 연산자

연산자(Operator)는 하나 혹은 그 이상의 값을 하나의 값으로 만들 때 사용한다.

```javascript
// 대입 연산자
var color = 'red';

// 산술 연산자
var area = 5 * 4;

// 문자열 연산자
var str = 'Hi! ' + 'My name is Lee';

// 비교 연산자
var foo = 3 > 5; // false

// 논리 연산자
var bar = (5 > 3) && (2 < 4);  // true

// 인스턴스 생성 연산자
var today = new Date();
```

# 7. 키워드

키워드(keyword)는 수행할 동작을 규정한 것이다. 예를 들어 `var` keyword는 브라우저에게 새로운 변수를 생성할 것을 지시한다.

```javascript
// 변수의 선언
var x = 5 + 6;

// 함수의 선언
function foo (arg) {
  // 함수 종료 및 값의 반환
  return ++arg;
}

var i = 0;
// 반복문
while (1) {
  if (i > 5) {
    // 반복문 탈출
    break;
  }
  console.log(i);
  i++;
}
```

<!--
| Keyword	        | Description                              |
| --------------- | ---------------------------------------- |
| break           | Terminates a switch or a loop
| continue        | Jumps out of a loop and starts at the top
| debugger        | Stops the execution of JavaScript, and calls (if available) the debugging function
| do ... while    | Executes a block of statements, and repeats the block, while a condition is true
| for             | Marks a block of statements to be executed, as long as a condition is true
| function        | Declares a function
| if ... else     | Marks a block of statements to be executed, depending on a condition
| return          | Exits a function
| switch          | Marks a block of statements to be executed, depending on different cases
| try ... catch   | Implements error handling to a block of statements
| var             | Declares a variable
-->

# 8. 주석

주석(Comment)은 작성된 코드의 의미를 설명하기 위해 사용한다. 코드는 읽기(이해하기) 쉬워야 한다.(가독성이 좋아야 한다)

여러분이 작성한 코드를 다른 누군가가 읽는다면 “아니, 이게 뭐하는 코드야?”라고 생각하는 순간이 있기 마련이다. 여러분이 해야 하는 일은 바로 그런 부분에 주석을 다는 것이다. (읽기 좋은 코드가 좋은 코드이다)

한줄 주석은 `//` 다음에 작성하며 여러 줄 주석은 `/*`과 `*/`의 사이에 작성한다. 주석은 해석기(parser)가 무시하며 실행되지 않는다.

```javascript
/*
주석(Comment)은 작성된 코드의 의미를 설명하기 위해 사용한다.
코드는 읽기(이해하기) 쉬워야 한다.
*/

// 주석(Comment)은 작성된 코드의 의미를 설명하기 위해 사용한다.
document.getElementById('myH').innerHTML = 'My Header';
// 코드는 읽기(이해하기) 쉬워야 한다.
document.getElementById('myP').innerHTML = 'My Paragraph.';
```

하지만 과도한 주석은 오히려 가독성을 해칠 수 있다. 주석없이도 읽을 수 있는 코드가 최선이다.

```javascript
// Bad
// 변수 x에 정수 10을 할당한다.
var x = 10;

// Good
var age = 10;
```
