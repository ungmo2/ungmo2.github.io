---
layout: post
title: <strong>Control Flow</strong>
subtitle: 제어문
categories: javascript
section: javascript
seq: 5
subseq: 8
description: 제어문(Control flow statement)은 조건에 따른 명령 실행(조건문)이나 반복 실행(반복문)이 필요할 때 사용된다. 일반적으로 코드는 위에서 아래 방향으로 순차적 실행을 하지만 실행 순서를 변경하거나 조건에 따라 실행 여부를 결정하기도 하고 반복할 수도 있다.
---

* TOC
{:toc}

제어문(Control flow statement)은 조건에 따른 명령 실행(조건문)이나 반복 실행(반복문)이 필요할 때 사용된다.

일반적으로 코드는 위에서 아래 방향으로 순차적 실행을 하지만 실행 순서를 변경하거나 조건에 따라 실행 여부를 결정하기도 하고 반복할 수도 있다.

# 1. 블록 구문(Block statement)

블록 구문(Block statement)는 구문들의 집합으로 중괄호로 그 범위를 정한다.
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

프로그래밍(coding)이란 변수를 통해 값를 저장하고 참조하며 연산자로 값을 연산, 평가하고 조건문과 반복문에 의한 **흐름제어로 데이터의 흐름을 제어** 하고 함수로 구문의 집합을 만들며 객체, 배열 등으로 자료를 구조화한다.

> 프로그래밍은 요구사항의 집합을 분석하여 적절한 자료구조와 함수의 집합으로 변환한 후 그 흐름을 제어하는 것이다.

데이터의 흐름을 제어한다는 것은 일정 조건에 따른 의사결정(decision)을 통해 다음 진행 흐름으로 유도(Control flow)하는 것이다. 이는 가장 원시적인 형태의 인공 지능(Artificial Intelligence)을 부여하는 것이라고 볼 수 있다. 즉, 의사결정(상황판단)의 기준을 제시하고 그 결과에 따른 행위를 지시하는 것이다.

조건문(conditional statement)을 통해 이를 수행할 수 있다. 조건문은 주어진 조건식(conditional expression)이 참(`true`)인지 거짓(`false`)인지에 따라 실행되어질 구문들의 집합이다.

JavaScript는 2가지의 조건문 `if...else` 와 `switch`를 제공한다.

## 2.1 if 문

`if` 문은 주어진 조건식을 평가하여 논리적 참, 거짓을 구별하는 구문이다. 조건식은 표현식이며 하나의 boolean 값(true/false)으로 수렴되어야 한다.

```javascript
if (조건식) {
  // 조건식이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식이 거짓이면 이 코드 블록이 실행된다.
}
```

조건식의 평가 결과가 참(true)일 경우, `if` 문 직후에 존재하는 코드 블록이 실행된다. 거짓(false)일 경우, `else` 구문 직후에 존재하는 코드 블록이 실행된다. (`else if`와 `else` 구문은 option이다.)

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

`break` 키워드는 코드 블록에서 탈출하는 역할을 수행한다. `break`가 없다면 `case`문의 조건과 일치하지 않더라도 실행 순서는 다음 `case`문으로 이동한다.

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

`default`문에는 `break` 키워드를 생략하여도 무방하다. 이유는 `default`문이 가장 마지막에 위치하므로 다음 `case`문으로 이동할 수 없기 때문이다.

# 3. 반복문(Loop)

반복문은 주어진 조건식(conditional expression)이 참인 경우 코드 블록을 실행한다. 그 후 조건식을 다시 검사하여 여전히 참인 경우 코드 블록을 다시 실행하며 이는 조건식이 거짓일 때까지 반복된다.

JavaScript는 3가지의 반복문 `for`, `while`, `do while`을 제공한다.

## 3.1 for 문

for문은 특정 조건이 거짓으로 판별될 때까지 반복한다. 가장 일반적으로 사용되는 반복문이다.

```
for ([초기문]; [조건식]; [증감식]) {
  구문;
}
```

아래의 for문은 변수 i가 0으로 초기화된 상태에서 시작하여 i가 2보다 작을 때까지 코드 블록을 2번(i: 0, 1)  반복 실행한다.

```javascript
for (var i = 0; i < 2; i++) {
  console.log(i);
}
```

![for문](./img/for-statement.png)
{: .w-350}

for문의 실행 순서
{: .desc-img}

다음은 위 예제를 역으로 반복하는 for문의 예이다. 변수 i가 1으로 초기화된 상태에서 시작하여 i가 0보다 같거나 커질 때까지 코드 블록을 2번(i: 1, 0) 반복 실행한다.

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

while 문은 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다. 조건문이 거짓이 되면 실행을 종료한다.

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

조건식의 평가 결과가 언제나 참이면 무한루프가 된다.

```javascript
var i = 0;
// 무한루프
while (true) {
  console.log(i);
  i++;
}
```

무한루프를 탈출하기 위해서는 if문과 함께 break 키워드를 사용한다. break 키워드는 자신을 포함하는 코드 블럭을 탈출한다.

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

while문과 유사하나 조건식을 확인하기 전에 코드 블록을 무조건 1회 실행한다. 그후 조건식을 확인하여 실행 여부를 판별한다.

```javascript
var i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);
```

## 3.4 continue

break 키워드는 코드 블럭을 탈출한다. continue 키워드는 이후 구문의 실행을 스킵하고 반복문의 조건식으로 이동한다.

```javascript
for (var i = 0; i < 5; i++) {
  if (i % 2 == 0) continue;
  console.log(i);
}
```
