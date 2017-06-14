---
layout: post
title: Javascript <strong>Syntax Basics</strong>
subtitle: Hello Javascript
categories: javascript
section: javascript
description: Javascript는 interactive한 웹페이지 작성을 가능하게 한다. 예를 들면, 이벤트(e.g. 버튼 클릭, 웹페이지 로딩 완료 등)에 반응하여 HTML 요소에 접근하고 HTML 요소를 조작할 수 있다. 정적인 HTML을 동적으로 변경할 수 있는 유일한 방법은 Javascript를 사용하는 것이다
---

* TOC
{:toc}

# 1. Hello World

Javascript는 interactive한 웹페이지 작성을 가능하게 한다. 예를 들면, 이벤트(e.g. 버튼 클릭, 웹페이지 로딩 완료 등)에 반응하여 HTML 요소에 접근하고 HTML 요소를 조작할 수 있다. 정적인 HTML을 동적으로 변경할 수 있는 유일한 방법은 Javascript를 사용하는 것이다. 

사용자에 의해 버튼이 클릭되면 정적 HTML을 조작하는 간단한 Javascript 예제를 만들어 보자.

```html
<!DOCTYPE html>
<html>
<body>
  <h1 id="demo">My Web Page</h1>
  <button type="button" onclick="myFunction()">Click me</button>
  <script>
    function myFunction() {
      var myHeader = document.getElementById('demo');
      myHeader.innerHTML = 'Hello world!';
    }
  </script>
</body>
</html>
```

<div class='result'></div>

# 2. 외부의 Javascript 실행하기 (External JavaScript)

HTML은 웹페이지의 내용(content)과 구조(structure)을 담당한다. Javascript의 역할은 정적인 HTML을 동적으로 변경하는 것이다. 즉 HTML과 Javascript는 역할(관심사 Concern)이 다르므로 분리된 파일로 작성하는 것이 바람직하다.

```html
<!DOCTYPE html>
<html>
<body>
  <h1 id="demo">My Web Page</h1>
  <button type="button" onclick="myFunction()">Click me</button>
  <script src="extern.js"></script>
</body>
</html>
```

```javascript
// extern.js
function myFunction() {
  var myHeader = document.getElementById('demo');
  myHeader.innerHTML = 'Hello world!';
}
```

브라우저는 위 코드를 아래와 같이 실행할 것이다.

1. script 요소를 만나면 웹페이지의 파싱을 잠시 중단한다.
2. src 어트리뷰트에 정의된 자바스크립트 파일을 로드한 후 실행한다.
3. 중단된 웹페이지의 파싱을 계속 진행한다.

body 요소의 가장 아래에 스크립트를 위치시키는 것은 좋은 아이디어이다. HTML 요소들이 스크립트 로딩 지연으로 인해 렌더링에 지장 받는 일이 발생하지 않아 페이지 로딩 시간이 단축된다.

이와 같이 스크립트 로딩 지연으로 인한 병목 현상을 근본적으로 방지하기 위해 HTML5부터 script 태그에 `async`와 `defer` 어트리뷰트가 추가되었다. 

```html
<script async src="extern.js"></script>
<script defer src="extern.js"></script>
```

async와 defer 어트리뷰트는 웹페이지 파싱과 외부 스크립트 파일의 다운로드가 동시에 진행된다는 면에서는 동일하다. 하지만 스크립트의 실행 시점이 다르다.

async
: 웹페이지 파싱과 외부 스크립트 파일의 다운로드가 동시에 진행된다. 스크립트는 다운로드 완료 직후 실행된다. IE9 이하 버전은 지원하지 않는다.

defer
: 웹페이지 파싱과 외부 스크립트 파일의 다운로드가 동시에 진행된다. 스크립트는 웹페이지 파싱 완료 직후 실행된다. IE9 이하 버전에서 정상적으로 동작하지 않을 수 있다.

![script-execution](./img/script-execution.jpg)
{: .w-650}

script 태그의 async, defer 어트리뷰트 (출처: [Peter Beverloo](http://peter.sh/experiments/asynchronous-and-deferred-javascript-execution-explained/))
{: .desc-img}

# 3. JavaScript Output

Javascript에서 data를 표시하는 방법은 아래와 같다.

| Type            | Code             |
| --------------- | ---------------- |
| alert box       | alert()          |
| HTML output     | document.write() |
| HTML element    | innerHTML        |
| Browser console | console.log()    |

```html
<!DOCTYPE html>
<html>
<body>
  <h1>My First Web Page</h1>
  <p id="demo"></p>
  <script>
    alert('alert');
    document.write('document.write');
    document.getElementById('demo').innerHTML = 'innerHTML';
    console.log('console.log');
  </script>
</body>
</html>
```

# 4. Javascript Syntax Basics

## 4.1 구문 (Statement)

프로그램(스크립트)은 컴퓨터(Client-side Javascript의 경우, 엄밀히 말하면 웹 브라우저)에 의해 단계별로 수행될 명령들의 집합이다.

각각의 명령을 statement(구문)이라 하며 statement가 실행되면 무슨 일인가가 일어나게 된다.

구문은 값(Values), 연산자(Operators), 표현식(Expressions), Keywords, 주석(Comments)으로 구성되며 세미콜론( ; )으로 끝나야 한다.

```javascript
var x = 5;
var y = 6;
var z = x + y;
document.getElementById('demo').innerHTML = z;
```

구문은 code block({…})으로 그룹화할 수 있다.
그룹화의 목적은 함께 실행되어져야 하는 구문을 정의하기 위함이다. (e.g. function)

```javascript
function myFunction(x, y) {
  return x + y;
}
```

구문들은 대개 위에서 아래로 순서대로 실행된다. 이러한 실행 순서는 조건문(if, switch)이나 반복문(while, for)의 사용으로 제어될수 있으며(이를 Control Flow/흐름제어라 한다), 또는 함수 호출로 변경될 수 있다.

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

## 4.2 표현식 (Expression)

표현식(Expression)은 값, 변수, 연산자의 조합이며 이 조합은 연산을 통해 하나의 값을 만든다. 즉, 표현식은 하나의 값으로 평가될 수 있는 문장이다.
아래의 예에서 5 * 10은 50으로 평가(연산)된다.

```javascript
5 * 10                // 50
'Hello' + ' ' + 'world'  // 'Hello world'
```

## 4.3 변수 (Variable)

programming language에서 변수는 값을 저장(할당), 참조하기 위해 사용된다. 한번 쓰고 버리는 값이 아닌 값(value)을 유지할 필요가 있는 경우에 변수를 사용한다.

변수를 선언할 때 `var` keyword가 사용된다. 등호(=, equal sign)는 변수에 값을 할당하기 위해 사용된다.

아래의 예에서 x는 변수로 선언되었고 변수 x에는 정수값 6이 할당되었다.

```javascript
var x; // 변수의 선언과 초기화
x = 6; // 정수값의 할당
```

## 4.4 값 (Value)

```java
String str = "Hello World";
< 1 > < 2 >      < 3 >
```
위의 Java 예제에서 <1> 은 데이터 타입, <2>는 변수명, <3>은 문자열 리터럴(literal)이다. 리터럴(literal)이란 변수 또는 상수에 저장되는 값 자체를 의미한다. 변수명은 메모리에 할당된 공간을 가리키는 식별자(identifier)이며 리터럴은 이 공간에 저장되는 값이다. 

자바스크립트는 7가지 데이터 타입을 제공한다.

* 기본 자료형 (primitive data type)  
  * `Boolean`
  * `null`
  * `undefined`
  * `Number`
  * `String`
  * `Symbol` (New in ECMAScript 6)
* `Object`

자바스크립트는 자바와는 달리 값의 자료형에 따라 변수에 데이터 타입을 명시하지 않는다.

```javascript
// literal : Number
10.50
1001

// literal : String
'Hello'
"World"

// literal : Object
{ name: 'Lee', gender: 'male' }

// literal : Array
[ 'Black', 'Gray', 'White' ];
```

## 4.5 연산자 (Operator)

연산자(Operators)는 하나 혹은 그 이상의 값을 하나의 값으로 만들 때 사용한다.

```javascript
// 대입 연산자
var color = 'red';

// 산술 연산자
var area = 5 * 4;

// 문자열 연산자
var greeting = 'Hi! ' + 'My name is Lee';

// 비교 연산자
var buy = 3 > 5; // false

// 논리 연산자
var buy = (5 > 3) && (2 < 4);  // true
```

## 4.6 키워드 (keyword)

키워드(keyword)는 수행되어져할 동작을 규정한 것이다.
예를 들어 `var` keyword는 브라우저에게 새로운 변수를 생성할 것을 지시한다.

```javascript
var x = 5 + 6;
var y = x * 10;
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

| abstract | arguments | boolean | break | byte |
| case | catch | char | class | const |
| continue | debugger | default | delete | do |
| double | else | enum | eval | export |
| extends | false | final | finally | float |
| for | function | goto | if | implements |
| import | in | instanceof | int | interface |
| let | long | native | new | null |
| package | private | protected | public | return |
| short | static | super | switch | synchronized |
| this | throw | throws | transient | true |
| try | typeof | var | void | volatile |
| while | with | yield |

## 4.7 주석 (Comment)

주석(Comment)은 작성된 코드의 의미를 설명하기 위해 사용한다. 코드는 읽기(이해하기) 쉬워야 한다.(가독성이 좋아야 한다)

여러분이 작성한 코드를 다른 누군가가 읽는다면 “아니, 이게 뭐하는 코드야?”라고 생각하는 순간이 있기 마련이다.
여러분이 해야 하는 일은 바로 그런 부분에 주석을 다는 것이다. (읽기 좋은 코드가 좋은 코드이다)

한줄 주석은 `//` 다음에 작성하며 여러 줄 주석은 `/*`과 `*/`의 사이에 작성한다. 주석은 해석기가 무시하며 실행되지 않는다.

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
