---
layout: fs-post
title: <strong>제어문 연습 문제</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 1
permalink: /:categories/:title
description:
---

* TOC
{:toc}

# 1. 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라

```javascript
var x = 15;

// 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라.
if (...) {
  console.log(x);
}
```

<!-- ```javascript
var x = 15;

if (x > 10 && x < 20) {
  console.log(x);
}
``` -->

# 2. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

```
0
2
4
6
8
```

<!-- ```javascript
// 0부터 9까지 loop
for (var i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
``` -->

# 3. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.

```
02468
```

<!-- ```javascript
// 결과 출력용 변수
var str = '';

// 0부터 9까지 loop
for (var i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    // console.log(i);
    str += i;
  }
}
console.log(str);
```-->

# 4. for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

```
9
7
5
3
1
```

<!--```javascript
// 9부터 0까지 loop
for (var i = 9; i >= 0; i--) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}
```-->

# 5. while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

```
0
2
4
6
8
```

<!--```javascript
var i = 0;

// 0부터 9까지 loop
while (i < 10) {
  if (i % 2 === 0) {
    console.log(i);
  }
  i++;
}
```-->

# 6. while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

```
9
7
5
3
1
```

<!--```javascript
var i = 9;

// 9부터 0까지 loop
while (i >= 0) {
  if (i % 2 !== 0) {
    console.log(i);
  }
  i--;
}
```-->

# 7. for 문을 사용하여 0부터 10미만의 정수의 합을 출력하시오.

```
45
```

<!--```javascript
var sum = 0;
for (var i = 0; i < 10; i++) {
  // sum = sum + i;
  sum += i;
}

console.log(sum);
```-->

# 8. 1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오.

```
73
```

<!--```javascript
// 1, 5, 7, 11, 13, 17, 19 => 79
var sum = 0;
for (var i = 1; i < 21; i++) {
  // i % 2가 0이면 2의 배수이다. i % 2가 0이면 false로 간주된다.
  if (i % 2 && i % 3) {
    // console.log(i);
    sum += i;
  }
}
```-->

# 9. 1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오.

```
117
```

<!--```javascript
// 2, 3, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18 => 117
var sum = 0;
for (var i = 1; i < 21; i++) {
  // i % 2가 0이면 2의 배수이다. i % 2가 0이면 false로 간주된다.
  if (!(i % 2) || !(i % 3)) {
    console.log(i);
    sum += i;
  }
}

console.log(sum);
```-->

# 10. 두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.

```
[ 1, 5 ]
[ 2, 4 ]
[ 3, 3 ]
[ 4, 2 ]
[ 5, 1 ]
```

<!--```javascript
for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) {
      console.log([i, j]);
    }
  }
}
```-->

# 11. 삼각형 출력하기 - pattern 1

다음을 참고하여 *(별)로 높이가 5인(var line = 5) 삼각형을 문자열로 완성하라.
개행문자('\n')를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자('\n')로 끝나도 관계없다.

```
// 높이(line)가 5
*
**
***
****
*****
```

<!--```javascript
// 삼각형 라인수
var line = 5;
// 출력용 변수
var star = '';

// 삼각형 라인수(line)만큼 루프: i = 0, 1, 2, 3, 4
for (var i = 0; i < line; i++) {
  // 라인별 별의 갯수(i + 1)만큼 루프
  for (var j = 0; j < i + 1; j++) {
    // 1번째 라인 : i = 0 / j = 0 => *
    // 2번째 라인 : i = 1 / j = 0, 1 => **
    // 3번째 라인 : i = 2 / j = 0, 1, 2 => ***
    // 4번째 라인 : i = 3 / j = 0, 1, 2, 3 => ****
    // 5번째 라인 : i = 4 / j = 0, 1, 2, 3, 4 => *****
    star += '*';
  }
  // 개행
  star += '\n';
}

console.log(star);
```-->

# 12. 삼각형 출력하기 - pattern 2

다음을 참고하여 *(별)로 트리를 문자열로 완성하라.
개행문자('\n')를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자('\n')로 끝나도 관계없다.

```
*****
 ****
  ***
   **
    *
```

<!--```javascript
var line = 5;
var star = '';
for (var i = 0; i < line; i++) {
  for (var j = 0; j < line; j++) {
    if (i <= j) {
      star += '*’;
    } else {
      star += ' ';
    }
  }
  star += '\n';
}
console.log(star);
```-->

# 13. 삼각형 출력하기 - pattern 3

다음을 참고하여 *(별)로 트리를 문자열로 완성하라.
개행문자('\n')를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자('\n')로 끝나도 관계없다.

```
*****
****
***
**
*
```

<!--```javascript
var line = 5;
var star = '';
for (var i = 0; i < line; i++) {
  for (var j = 0; j < line; j++) {
    if (i + j < line) {
      star += '*';
    }
  }
  star += '\n';
}
console.log(star);
```-->

# 14. 삼각형 출력하기 - pattern 4

다음을 참고하여 *(별)로 트리를 문자열로 완성하라.
개행문자('\n')를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자('\n')로 끝나도 관계없다.

```
    *
   **
  ***
 ****
*****
```

<!--```javascript
var line = 5;
var star = '';
for (var i = 0; i < line; i++) {
  for (var j = 0; j < line; j++) {
    if (i + j >= line - 1) {
      star += '*';
    } else {
      star += ' ';
    }
  }
  star += '\n';
}
console.log(star);
```-->

# 15. 정삼각형 출력하기

```
    *
   ***
  *****
 *******
*********
```

<!--```javascript
var line = 5;
var star = '';
for (var i = 0; i < line; i++) {
  for (var j = 0; j < line; j++) {
    if (i + j >= line - 1) {
      star += '*';
    } else {
      star += ' ';
    }
  }
  for (j = 0; j < line; j++) {
    if (i > j) {
      star += '*';
    }
  }
  star += '\n';
}

console.log(star);
```-->

# 16. 역정삼각형 출력하기

```
*********
 *******
  *****
   ***
    *
```

<!--```javascript
var line = 5;
var star = '';
for (var i = 0; i < line; i++) {
  for (var j = 0; j < line; j++) {
    if (i <= j) {
      star += '*';
    } else {
      star += ' ';
    }
  }
  for (j = 0; j < line; j++) {
    if (i + j < line - 1) {
      star += '*';
    }
  }
  star += '\n';
}
console.log(star);
```-->
