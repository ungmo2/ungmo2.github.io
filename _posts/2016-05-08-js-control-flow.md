---
layout: post
title: <strong>Control Flow</strong>
subtitle: 제어문
categories: javascript
section: javascript
seq: 5
subseq: 8
description: 제어문(Control flow statement)은 주어진 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다. 일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행된다. 제어문은 코드의 실행 순서를 인위적으로 제어할 수 있다
---

* TOC
{:toc}

제어문(Control flow statement)은 주어진 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다.

일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행된다. 제어문은 코드의 실행 순서를 인위적으로 제어할 수 있다

# 1. 블록문

블록문(Block statement/Compound statement)는 0개 이상의 문들을 중괄호로 묶은 것으로 코드 블록 또는 블록이라고 부르기도 한다. 자바스크립트는 블록문을 하나의 단위로 취급한다.

블록문은 단독으로 사용할 수도 있으나 일반적으로 제어문이나 함수 선언문 등에서 사용한다. 문의 끝에는 세미 콜론(;)을 붙이는 것이 일반적이지만 블록문은 세미콜론을 붙이지 않는다.

```javascript
// 블록문
{
  var foo = 10;
  console.log(foo);
}

// 제어문
var x = 0;
while (x < 10) {
  x++;
}
console.log(x); // 10

// 함수 선언문
function sum(x, y) {
  return x + y;
}
console.log(sum(1, 2)); // 3
```

# 2. 조건문

조건문(conditional statement)은 주어진 조건식(conditional expression)의 평가 결과에 따라 코드 블럭(블록문)의 실행을 결정한다. 조건식은 불리언 값으로 평가될 수 있는 표현식이다.

자바스크립트는 2가지의 조건문 if...else 문과 switch 문을 제공한다.

## 2.1 if..else 문

if…else 문은 주어진 조건식(불리언 값으로 평가될 수 있는 표현식)의 평가 결과, 즉 논리적 참, 거짓에 따라 실행할 코드 블록을 결정한다. 만약 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 [강제 변환](./js-type-coercion)되어 논리적 참, 거짓을 구별한다.

```javascript
if (조건식) {
  // 조건식이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식이 거짓이면 이 코드 블록이 실행된다.
}
```

조건식의 평가 결과가 참(true)일 경우, if 문 다음의 코드 블록이 실행된다. 거짓(false)일 경우, else 문 다음의 코드 블록이 실행된다.

조건식을 추가하고 싶으면 else if 문을 사용한다.

```javascript
if (조건식1) {
  // 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2) {
  // 조건식2이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다.
}
```

else if 문과 else 문은 옵션으로 사용할 수도 있고 사용하지 않을 수도 있다. if 문과 else 문은 2번 이상 사용할 수 없지만 else if 문은 여러 번 사용할 수도 있다.

```javascript
var num = 2;
var kind;

// if 문
if (num > 0) {
  kind = '양수'; // 음수를 구별할 수 없다
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

만약 코드 블록 내의 문이 하나뿐이라면 중괄호를 생략할 수 있다.

```javascript
var num = 2;
var kind;

if (num > 0)      kind = '양수';
else if (num < 0) kind = '음수';
else              kind = '영';

console.log(kind); // 양수
```

대부분의 if...else 문은 연산자에서 살펴본 [삼항 조건 연산자](./js-operator#4-삼항-조건-연산자)로 바꿔쓸 수 있다. 아래 예제를 살펴보자.

```javascript
// x가 짝수이면 ‘짝수'를 홀수이면 ‘홀수'를 반환한다.
var x = 2;
var result;

if (x % 2) { // 2 % 2는 0이고 0은 false로 취급된다.
  result = '홀수';
} else {
  result = '짝수';
}

console.log(result); // 짝수
```

위 예제는 아래와 같이 삼항 조건 연산자로 바꿔쓸 수 있다.

```javascript
// x가 짝수이면 '짝수'를 홀수이면 '홀수'를 반환한다.
var x = 2;

// 0은 false로 취급된다.
var result = x % 2 ? '홀수' : '짝수';
console.log(result); // 짝수
```

위 예제는 두가지 경우의 수('홀수' 또는 '짝수')를 갖는 경우이다. 만약 세가지 경우의 수를 경우는 아래와 같이 바꿔쓸 수 있다.

```javascript
var num = 2;

// 0은 false로 취급된다.
var kind = num ? (num > 0 ? '양수' : '음수') : '영';
console.log(kind); // 양수
```

`num > 0 ? '양수' : '음수'`는 표현식이므로 다른 표현식의 일부가 될 수 있다.

## 2.2 switch 문

switch 문은 switch 문의 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case 문으로 실행 순서를 이동시킨다.

case 문은 상황(case)을 의미하는 표현식을 지정하고 콜론으로 마친다. 그리고 그 뒤에 실행할 문들을 위치시킨다.

switch 문의 표현식과 일치하는 표현식을 갖는 case 문이 없다면 실행 순서는 default 문으로 이동한다.
default 옵션으로 사용할 수도 있고 사용하지 않을 수도 있다.

```
switch (표현식) {
  case 표현식1:
    switch 문의 표현식과 표현식1이 일치하면 실행될 문;
    break;
  case 표현식2:
    switch 문의 표현식과 표현식2가 일치하면 실행될 문;
    break;
  default:
    switch 문의 표현식과 일치하는 표현식을 갖는 case 문이 없을 때 실행될 문;
}
```

if...else 문의 조건식은 반드시 불리언 값으로 평가되지만 switch 문의 표현식은 불리언 값보다는 문자열, 숫자 값인 경우가 많다. if…else 문은 논리적 참, 거짓으로 실행할 코드 블록을 결정한다. switch 문은 논리적 참, 거짓보다는 다양한 상황(case)에 따라 실행할 코드 블록을 결정할 때 사용한다.

아래 예제를 살펴보자. switch 문의 표현식, 즉 변수 month의 평가 결과인 숫자 값 11과 일치하는 case 문으로 실행 순서가 이동한다.

```javascript
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = 'January';
  case 2:
    monthName = 'February';
  case 3:
    monthName = 'March';
  case 4:
    monthName = 'April';
  case 5:
    monthName = 'May';
  case 6:
    monthName = 'June';
  case 7:
    monthName = 'July';
  case 8:
    monthName = 'August';
  case 9:
    monthName = 'September';
  case 10:
    monthName = 'October';
  case 11:
    monthName = 'November';
  case 12:
    monthName = 'December';
  default:
    monthName = 'Invalid month';
}

console.log(monthName); // Invalid month
```

그런데 위 예제를 실행해 보면 'November'가 출력되지 않고 'Invalid month'가 출력된다. 이는 switch 문의 표현식의 평가 결과와 일치하는 case 문으로 실행 순서가 이동하여 문을 실행한 것은 맞지만, 문을 실행한 후 switch 문을 탈출하지 않고 switch 문이 끝날 때까지 모든 case 문과 default 문을 실행했기 때문이다. 이를 폴스루(fall through)라 한다. 다시 말해 변수 monthName에 'November'가 할당된 후 switch 문을 탈출하지 않고 연이어 'December'가 재할당되고 마지막으로 'Invalid month'가 재할당되었다.

결과가 이러한 이유는 case 문에 해당하는 문의 마지막에 `break` 문을 사용하지 않았기 때문이다. break 키워드로 구성된 break 문은 코드 블록에서 탈출하는 역할을 수행한다. break 문이 없다면 case 문의 표현식과 일치하지 않더라도 실행 순서는 다음 case 문으로 연이어 이동한다. 올바른 switch 문은 아래와 같다.

```javascript
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = 'January';
    break;
  case 2:
    monthName = 'February';
    break;
  case 3:
    monthName = 'March';
    break;
  case 4:
    monthName = 'April';
    break;
  case 5:
    monthName = 'May';
    break;
  case 6:
    monthName = 'June';
    break;
  case 7:
    monthName = 'July';
    break;
  case 8:
    monthName = 'August';
    break;
  case 9:
    monthName = 'September';
    break;
  case 10:
    monthName = 'October';
    break;
  case 11:
    monthName = 'November';
    break;
  case 12:
    monthName = 'December';
    break;
  default:
    monthName = 'Invalid month';
}

console.log(monthName); // November
```

default 문에는 break 문을 생략하는 것이 일반적이다. default 문은 switch 문의 가장 마지막에 위치하므로 default 문의 실행이 종료하면 switch 문을 빠져나간다. 따라서 별도로 break 문이 필요없다.

case 문은 반드시 단독으로 사용되어야 하는 것은 아니다. 아래 예제와 같이 여러 개의 case 문을 중복해 사용할 수도 있다. 아래는 윤년인지 판별해서 2월의 일수를 계산하는 예제다.

```javascript
var year = 2000; // 2000년은 윤년으로 2월이 29일이다.
var month = 2;
var days = 0;

switch (month) {
  case 1: case 3: case 5: case 7: case 8: case 10: case 12:
    days = 31;
    break;
  case 4: case 6: case 9: case 11:
    days = 30;
    break;
  case 2:
    // 윤년 계산 알고리즘
    // 1. 년도가 4로 나누어 떨어지는 해는 윤년(2000, 2004, 2008, 2012, 2016, 2020…)
    // 2. 그 중에서 년도가 100으로 나누어 떨어지는 해는 평년(2000, 2100, 2200...)
    // 3. 그 중에서 년도가 400으로 나누어 떨어지는 해는 윤년(2000, 2400, 2800...)
    days = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 29 : 28;
    break;
  default:
    console.log('Invalid month');
}

console.log(days); // 29
```

switch 문은 case, default, break 등 다양한 키워드를 사용해야 하고 폴스루가 발생하는 등 문법도 복잡하다. if...else 문으로 해결할 수 있다면 if...else 문을 사용하는 편이 좋다. 하지만 if...else 문보다 switch 문을 사용했을 때 가독성이 더 좋다면 switch 문을 사용하는 편이 좋다.

# 3. 반복문

반복문(Loop statement)은 주어진 조건식(conditional expression)의 평가 결과가 참인 경우 코드 블럭을 실행한다. 그 후 조건식을 다시 검사하여 여전히 참인 경우 코드 블록을 다시 실행한다. 이는 조건식이 거짓일 때까지 반복된다.

자바스크립트는 3가지의 반복문 for 문, while 문, do...while 문을 제공한다. 그 외에도 for..in 문, ES6에서 새롭게 도입된 for…of 문이 있다. for..in 문과 for…of 문에 대해서는 나중에 살펴보기로 하자.

## 3.1 for 문

for 문은 조건식이 거짓으로 판별될 때까지 코드 블록을 반복 실행한다. 가장 일반적으로 사용되는 반복문이다.

```
for (초기화식; 조건식; 증감식) {
  조건식이 참인 경우 반복 실행될 문;
}
```

for 문은 매우 중요하다. 아직 for 문에 익숙하지 않다면 많은 연습을 통해 확실히 이해하기를 권장한다.

아래 예제를 통해 for 문이 어떻게 동작하는지 살펴보자.

```javascript
for (var i = 0; i < 2; i++) {
  console.log(i);
}
```

![for문](./img/for-statement.png)
{: .w-350}

for 문의 실행 순서
{: .desc-img}

위 예제의 for 문은 변수 i가 0으로 초기화된 상태에서 시작하여 i가 2보다 작을 때까지 코드 블록을 2번 반복 실행한다. for 문의 실행 순서를 따라가며 어떻게 동작하는지 살펴보자.

1. for 문을 실행하면 가장 먼저 초기화식 `var i = 0`이 실행된다. 초기화식은 단 한번만 실행된다.

2. 초기화식의 실행이 종료되면 조건식으로 실행 순서가 이동한다. 현재 변수 i는 0이므로 조건식의 평가 결과는 true다.

3. 조건식의 평가 결과가 true이므로 실행 순서가 코드 블록으로 이동하여 실행된다. 증감문으로 실행 순서가 이동하는 것이 아니라 코드 블록으로 실행 순서가 이동하는 것에 주의하자.

4. 코드 블록의 실행이 종료하면 증감식으로 실행 순서가 이동한다. 증감식 i++가 실행되어 i는 1이 된다.

5. 증감식 실행이 종료되면 다시 조건식으로 실행 순서가 이동한다. 초기화식으로 실행 순서가 이동하는 것이 아니라 조건식으로 실행 순서가 이동하는 것에 주의하자. 초기화식은 단 한번만 실행된다. 현재 변수 i는 1이므로 조건식의 평가 결과는 true다.

6. 조건식의 평가 결과가 true이므로 실행 순서가 코드 블록으로 이동하여 실행된다.

7. 코드 블록의 실행이 종료하면 증감식으로 실행 순서가 이동한다. 증감식 i++가 실행되어 i는 2가 된다.

8. 증감식 실행이 종료되면 다시 조건식으로 실행 순서가 이동한다. 현재 변수 i는 2이므로 조건식의 평가 결과는 false다. 조건식의 평가 결과가 false이므로 for 문의 실행이 종료된다.

아래 예제는 위 예제를 역으로 반복하는 for 문이다. 변수 i가 1으로 초기화된 상태에서 시작하여 i가 0보다 같거나 커질 때까지 코드 블록을 2번 반복 실행한다.

```javascript
for (var i = 1; i >= 0; i--) {
  console.log(i);
}
```
<!--
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
``` -->

for 문의 초기화식, 조건식, 증감식은 모두 옵션이므로 반드시 사용할 필요는 없다. 어떤 식도 선언하지 않으면 무한 루프가 된다.

<!-- ```javascript
var i = 0;
for (;;) { // 무한루프
  if (i >= 3) break;
  console.log(i);
  i++;
}
``` -->

```javascript
for (;;) { } // 무한루프
```

for 문 내에 for 문을 중첩해 사용할 수 있다. 아래는 두 개의 주사위를 던졌을 때, 두 눈의 합이 6이 되는 모든 경우의 수를 출력하는 예제다.

```javascript
for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) console.log(`[${i}, ${j}]`);
  }
}
```

출력 결과는 아래와 같다.

```
[1, 5]
[2, 4]
[3, 3]
[4, 2]
[5, 1]
```

## 3.2 while 문

while 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다. 조건문의 평가 결과가 거짓이 되면 실행을 종료한다. 만약 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 [강제 변환](./js-type-coercion)되어 논리적 참, 거짓을 구별한다.

```javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
while (count < 3) {
  console.log(count);
  count++;
} // 0 1 2
```

조건식의 평가 결과가 언제나 참이면 무한루프가 된다.

```javascript
// 무한루프
while (true) { }
```

무한루프를 탈출하기 위해서는 코드 블럭 탈출 조건을 if 문에 부여하고 break 문으로 코드 블럭을 탈출한다.

```javascript
var count = 0;

// 무한루프
while (true) {
  console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if (count === 3) break;
} // 0 1 2
```

## 3.3 do...while 문

do...while 문은 코드 블록을 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한번 이상 실행된다.

```javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
  console.log(count);
  count++;
} while (count < 3); // 0 1 2
```

# 4. break 문

switch 문과 while 문에서 살펴보았듯이 break 문은 코드 블록을 탈출한다. 좀 더 정확히 표현하자면 코드 블록을 탈출하는 것이 아니라 레이블 문, 반복문(for, for...in, for...of, while, do...while) 또는 switch 문의 코드 블록을 탈출한다. 레이블 문, 반복문, switch 문의 코드 블록 이외에 break 문을 사용하면 SyntaxError(문법 에러)가 발생한다.

```javascript
if (true) {
  break; // Uncaught SyntaxError: Illegal break statement
}
```

레이블 문(Label statement)이란 식별자가 붙은 문을 말한다.

```javascript
// foo라는 레이블 식별자가 붙은 레이블 문
foo: console.log('foo');
```

레이블 문은 프로그램의 실행 순서를 제어하기 위해 사용한다. 사실 switch 문의 case 문과 default 문도 레이블 문이다. 레이블 문을 탈출하려면 break 문에 레이블 식별자를 지정한다.

```javascript
// foo라는 식별자가 붙은 레이블 블록문
foo: {
  console.log(1);
  break foo; // foo 레이블 블록문을 탈출한다.
  console.log(2);
}

console.log('Done!');
```

중첩된 for 문의 내부 for 문에서 break 문을 실행하면 내부 for 문을 탈출하여 외부 for 문으로 진입한다. 이때 내부 for 문이 아닌 외부 for 문을 탈출하려면 레이블 문을 사용한다.

```javascript
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    // i + j === 3이면 외부 for 문을 탈출한다.
    if (i + j === 3) break outer;
  }
}

console.log('Done!');
```

중첩된 for 문을 외부로 탈출할 때 레이블 문은 유용하지만 그 외의 경우 레이블 문은 일반적으로 권장하지 않는다. 레이블 문을 사용하면 프로그램의 흐름이 복잡해져서 가독성이 나빠지고 오류를 발생시킬 가능성이 높아지기 때문이다.

break 문은 레이블 문 뿐만이 아니라 반복문, switch 문에서도 사용할 수 있다. 이 경우에는 break 문에 레이블 식별자를 지정하지 않는다. break 문은 반복문을 더 이상 진행하지 않아도 될 때 불필요한 반복을 회피할 수 있어 유용하다.

아래는 문자열에서 특정 문자의 인덱스(위치)를 검색하는 예제이다.

```javascript
var string = 'Hello World.';
var index;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 문자열의 개별 문자가 'l'이면
  if (string[i] === 'l') {
    index = i;
    break; // 반복문을 탈출한다.
  }
}

console.log(index); // 2

// 참고로 String.prototype.indexOf 메소드를 사용해도 같은 동작을 한다.
console.log(string.indexOf('l')); // 2
```

# 5. continue 문

continue 문은 반복문(for, for...in, for...of, while, do...while)의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 이동한다. break 문처럼 반복문을 탈출하지는 않는다.

아래는 문자열에서 특정 문자의 개수를 카운트하는 예제이다.

```javascript
var string = 'Hello World.';
var count = 0;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동한다.
  if (string[i] !== 'l') continue;
  count++; // continue 문이 실행되면 이 문은 실행되지 않는다.
}

console.log(count); // 3

// 참고로 String.prototype.match 메소드를 사용해도 같은 동작을 한다.
console.log(string.match(/l/g).length); // 3
```

위 예제의 for 문은 아래와 동일하게 동작한다.

```javascript
for (var i = 0; i < string.length; i++) {
  // 'l'이면 카운트를 증가시킨다.
  if (string[i] === 'l') count++;
}
```

위와 같이 if 문 내에서 실행해야 할 코드가 한 줄이라면 continue 문을 사용했을 때보다 간편하며 가독성도 좋다. 하지만 if 문 내에서 실행해야 할 코드가 길다면 들여쓰기가 한 단계 더 깊어지므로 continue 문을 사용하는 것이 가독성이 더 좋다.

```javascript
// continue 문을 사용하지 않으면 if 문 내에 코드를 작성해야 한다.
for (var i = 0; i < string.length; i++) {
  // 'l'이면 카운트를 증가시킨다.
  if (string[i] === 'l') {
    count++;
    // code
    // code
    // code
  }
}

// continue 문을 사용면 if 문 밖에 코드를 작성할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 카운트를 증가시키지 않는다.
  if (string[i] !== 'l') continue;

  count++;
  // code
  // code
  // code
}
```
