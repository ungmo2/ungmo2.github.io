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

제어문(Control flow statement)은 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다.

일반적으로 코드는 위에서 아래 방향으로 순차적 실행을 한다. 제어문은 코드의 실행 순서를 인위적으로 변경할 수 있다. 조건에 따라 코드의 실행 여부를 결정하기도 하고 반복할 수도 있다.

# 1. 코드 블록(Block statement)

코드 블록(Block statement)는 0개 이상의 문들을 묶은 문으로 중괄호로 그 범위를 정한다. 코드 블록은 일반적으로 함수, 객체리터럴, 흐름 제어 구문(control flow statement)에서 사용된다.

```javascript
// 함수 선언문
function sum(x, y) {
  return x + y;
}
console.log(sum(1, 2)); // 3

// 객체리터럴에 의한 객체 선언
var obj = {
  x: 1,
  y: 2
};
console.log(obj); // { x: 1, y: 2 }

// 제어문(control flow statement)
var x = 0;
while (x < 10) {
  x++;
}
console.log(x); // 10
```

# 2. 조건문(Conditional statement)

프로그래밍(coding)이란 변수를 통해 값를 저장하고 참조하며 연산자로 값을 연산, 평가하고 조건문과 반복문에 의한 **흐름 제어(control flow)로 데이터의 흐름을 제어** 하고 함수로 구문의 집합을 만들며 객체, 배열 등으로 자료를 구조화한다.

> 프로그래밍은 요구사항의 집합을 분석하여 적절한 자료구조와 함수의 집합으로 변환한 후 그 흐름을 제어하는 것이다.

데이터의 흐름을 제어한다는 것은 일정 조건에 따른 의사 결정을 통해 다음 진행 흐름으로 유도하는 것이다. 즉, 의사 결정(상황 판단)의 기준을 제시하고 그 결과에 따른 행위를 지시하는 것이다.

조건문(conditional statement)을 통해 이를 수행할 수 있다. 조건문은 주어진 조건식(conditional expression)이 참(`true`)인지 거짓(`false`)인지에 따라 실행되어질 구문들의 집합이다.

자바스크립트는 2가지의 조건문 `if...else`문과 `switch` 문을 제공한다.

## 2.1 if..else 문

if…else 문은 주어진 조건식을 평가하여 논리적 참, 거짓을 구별하여 실행할 코드 블록을 결정한다. 조건식은 불리언 값으로 평가될 수 있는 표현식이다.

만약 조건식의 평가 결과가 불리언 값이 아니라면 암묵적 강제 타입 변환을 통해 불리언 값으로 변환되어 논리적 참, 거짓을 구별한다.

```javascript
if (조건식) {
  // 조건식이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식이 거짓이면 이 코드 블록이 실행된다.
}
```

조건식의 평가 결과가 참(true)일 경우, if 문 다음의 코드 블록이 실행된다. 거짓(false)일 경우, else 문 다음의 코드 블록이 실행된다. else if 문과 else 문은 옵션으로 사용할 수도 있고 사용하지 않을 수도 있다.

```javascript
var num = 2;
var kind;

// if 문
if (num > 0) {
  kind = '양수';
}
console.log(kind); // 양수

// if…else 문
if (num > 0) {
  kind = '양수';
} else {
  kind = '음수'; // 0은 음수가 아니다
}
console.log(kind); // 양수

// if…else if 문
if (num > 0) {
  kind = '양수';
} else if (num < 0) {
  kind = '음수';
} else {
  kind = '영';
}
console.log(kind); // 양수
```

## 2.2 switch 문

switch 문은 switch 변수의 값과 일치되는 case 문으로 실행 순서를 이동시킨다. switch 변수는 반드시 변수이여야 하는 것은 아니고 값으로 평가될 수 있는 표현식일 수 있다. switch 변수의 값과 일치하는 case 문이 없다면 실행 순서는 default 문으로 이동한다.

```
switch (switch 변수) {
  case 표현식:
    switch 변수와 case 문의 표현식이 일치하면 실행될 문;
    break;
  case 표현식:
    switch 변수와 case 문의 표현식이 일치하면 실행될 문;
    break;
  default:
    switch 변수와 일치하는 case 문의 표현식이 없을 때 실행될 문;
}
```

아래 예제를 살펴보자. switch 변수는 변수 color이다. 변수 color의 값은 문자열이다. switch 변수인 변수 color의 값과 일치하는 case 문으로 실행 순서가 이동한다.

```javascript
// switch 변수
var color = 'red';

switch (color) {
  case 'yellow':
    console.log('yellow color');
  case 'red':
    console.log('red color');
  case 'blue':
    console.log('blue color');
  default:
    console.log('unknown color');
}
```

위 예제를 실행해 보면 switch 변수의 값이 ‘red’이므로 case 'red' 문이 실행될 것이다. 그런데 case 'red' 문만이 실행된 것이 아니라 아래와 같이 case 'red' 문 이후의 모든 case 문이 실행된다.

```
red color
blue color
unknown color
```

실행 결과가 이러한 이유는 case 문의 마지막에 `break` 키워드를 사용하지 않았기 때문이다.
break 키워드는 코드 블록에서 탈출하는 역할을 수행한다. break 키워드가 없다면 case 문의 조건과 일치하지 않더라도 실행 순서는 다음 case 문으로 연이어 이동한다. 올바른 switch 문은 아래와 같다.

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

default 문에는 break 키워드를 생략해도 좋다. 이유는 default 문이 가장 마지막에 위치하므로 다음  case 문으로 연이어 이동할 수 없기 때문이다.


# 3. 반복문(Loop)

반복문은 주어진 조건식(conditional expression)이 참인 경우 코드 블록을 실행한다. 그 후 조건식을 다시 검사하여 여전히 참인 경우 코드 블록을 다시 실행하며 이는 조건식이 거짓일 때까지 반복된다.

자바스크립트는 3가지의 반복문 `for`, `while`, `do while`을 제공한다.

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
