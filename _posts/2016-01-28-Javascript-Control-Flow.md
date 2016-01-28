---
layout: post
title: Javascript Control Flow (흐름 제어)
---

#블록 구문(Block statement)
블록 구문(Block statement)는 구문들의 집합으로 가장 기본이 되는 구문이다. (블록은 중괄호로 그 범위를 정한다)
블록 구문은 일반적으로 함수, 객체리터럴, 흐름 제어 구문(control flow statement)에서 사용된다. (e.g. if, for, while)

```javascript
var x = 0;
while (x < 10) {
  x++;
}
```

JavaScript는 `block-scope`를 지원하지 않는다. 즉, 블록 구문은 scope를 의미하지는 않는다.
이는 C-family language (C, Java) 대부분이 block scope를 지원하는 것과는 다른 Javascript의 특징이다.

```javascript
var x = 1;
{
  var x = 2;
}
console.log(x); // logs 2: C나 Java에서는 1
```

ECMAScript 6에서 도입된 `let` keyword를 사용하면 block scope를 사용할 수 있다.

#조건문(Conditional statement)

프로그래밍(coding)이란 변수를 통해 값를 저장하고 참조하며 연산자로 값을 연산, 평가하고 조건문과 반복문에 의한 ***흐름제어로 데이터의 흐름을 제어*** 하고 함수로 구문의 집합을 만들며 객체, 배열 등으로 자료를 구조화한다.

> ***프로그래밍은 요구사항의 집합을 분석하여 적절한 자료구조와 함수의 집합으로 변환한 후 그 흐름을 제어하는 것이다.***

데이터의 흐름을 제어한다는 것은 일정 조건에 따른 의사결정(decision)을 통해 다음 진행 흐름으로 유도(Control flow)하는 것이다.

조건문(conditional statement)를 통해 이를 수행할 수 있다

조건문은 주어진 조건식(condition expression)이 참(`true`)인지 거짓(`false`)인지에 따라 실행되어질 구문들의 집합이다.

JavaScript는 2가지의 조건문  `if...else` 와 `switch`를 제공한다.

`if` 구문은 주어진 조건식을 평가하여 논리적 참, 거짓을 구별하는 구문이다.
참(`true`)일 경우, `if` 구문 직후에 존재하는 코드 블럭이 실행된다. 거짓(`false`)일 경우, `else` 구문 직후에 존재하는 코드 블럭이 실행된다. (`else if`와 `else` 구문은 option이다.)

```javascript
var now = new Date();
var hour = now.getHours();
var greeting;

// if 문
if (hour < 18) {
  greeting = "Good day";
}

// else 문
if (hour < 18) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}

// else if 문
if (time < 10) {
  greeting = "Good morning";
} else if (time < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}
```

`switch`변수의 값과 일치되는 `case`구문으로 실행 순서가 이동하게 된다. `break` keyword는 `switch` 구문에서 탈출하는 역할을 수행한다.

`break`가 없다면 실행 순서는 다음 `case`구문으로 이동한다. `switch`변수의 값과 일치되는 구문이 없다면 실행 순서는 `default`로 이동한다.

```javascript
var text;

switch (new Date().getDay()) {
  case 0:
    text = "Today is Sunday";
    break;
  case 6:
    text = "Today is Saturday";
    break;
  default:
    text = "Looking forward to the Weekend";
}
```
`default`구문에 `break`는 생략하여도 무방하다. 이유는 `default`구문이 가장 마지막에 위치하므로 다음 구문으로 이동할 수 없기 때문이다.

#Truthy & Falsy values
##Falsy values
아래 값들은 Boolean context에서 `false`로 평가된다.

* `false`
* `undefined`
* `null`
* `0`
* `NaN` (Not a Number)
* `""` (빈문자열)

##Truthy values
Falsy values 이외의 값들(object포함)은 모두 true로 평가된다.

```javascript
var x = false;
if (!x)  console.log(x+" is falsy value");

x = undefined;
if (!x)  console.log(x+" is falsy value");

x = null;
if (!x)  console.log(x+" is falsy value");

x = 0;
if (!x)  console.log(x+" is falsy value");

x = NaN;
if (!x)  console.log(x+" is falsy value");

x = "";
if (!x)  console.log(x+" is falsy value");
```

#Type coercion (Type강제)
Javascript는 context(문맥)을 고려하여 내부적으로 자료형을 자동 변경하여 작업을 완료할 수 있다.
이는 의도하지 않은 값을 만들어낼 수 있어 주의가 필요하다.

```javascript
console.log('1' > 0);            // logs true
console.log(1 + '2');            // logs '12'
console.log(2 - '1');            // logs 1
console.log('10' == 10);         // logs true
console.log('10' === 10);        // logs false
console.log(undefined == null);  // logs true
console.log(undefined === null); // logs false
```

#Checking equality

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

#Checking existence
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
if (document.getElementById('header') == true) // this condition evaluates to false
```

아래 예와 같은 경우를 주의해야 한다.

```javascript
var b = new Boolean(false);
if (b) // this condition evaluates to true
```

#단축 평가 (Short-Circuit Evaluation)
논리 연산자가 왼쪽에서 오른쪽으로 평가될때, 논리연산자는 다음의 규칙을 따라서 "단축 평가"로 검사된다.

| 평가식                 | 평가 결과        |
| :-------------------: | :------------- |
| true  &#124;&#124; anything     | true
| false &#124;&#124; anything     | anything
| true  && anything     | anything
| false && anything     | false

Boolean값으로 평가하기 위해 참조하여야 할 곳까지 진행하여 평가가 중지하게된 계기가 된 값을 리턴한다.

```javascript
var foo = "Cat" && "Dog"  // t && t returns "Dog"
```

이 경우, "Cat" 은 `true`로 평가되므로 "Dog"까지 평가해 보아야 한다. 평가가 중지하게된 계기가 된 값("Dog")을 리턴한다.

```javascript
var foo = false && "Cat"  // f && t returns false
```

이 경우, `false`가 처음 등장했으므로 평가는 중지되고 `false`가 리턴된다

```javascript
var foo = "Cat" || "Dog"  // t || t returns "Cat"
```

이 경우, "Cat" 은 `true`로 평가 되므로 평가는 중지되고 `true`가 리턴된다.

#Loop
반복문(Loops)은 주어진 조건식 (condition expression)이  참인 경우 코드 블록을 실행한다.

그 후 조건식을 다시 검사하여 여전히 참인 경우 코드 블록을 다시 실행하며 이는 조건식이 거짓일 때까지 반복된다.
배열 내의 각 요소에 대한 동일한 코드를 반복 실행할 때 유용하다.

JavaScript는 3가지의 반복문  `for`, `while`, `do while` 을 제공한다.

##for문
가장 일반적으로 사용되는 반복문이다. 일정 횟수만큼 반복
실행하여야 할 때 사용한다.

```javascript
for (var i = 0; i < 3; i++) {
  console.log(i);
}
```

###while문
반복 횟수를 정확히 알지 못할 때 사용한다.

```javascript
var i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
```

##do while문
While문과 매우 유사하나 코드블록은 최소 1회 이상 실행된다.

```javascript
var i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);
```

##break
반복문을 탈출할 때 사용하는 키워드이다. break문을 감싸는 반복문 하나를 탈출한다.

```javascript
var i = 0;
while (1) {    // infinite loop
  if (i > 3) break;
  console.log("The number is " + i );
  i++;
}
```

##continue
continue문 이후의 구문은 실행 생략하고 반복문의 조건검사 위치로 이동한다.

```javascript
for (var i = 0; i < 5; i++) {
  if (i % 2 == 0) continue;
  console.log("The number is " + i );
}
```
