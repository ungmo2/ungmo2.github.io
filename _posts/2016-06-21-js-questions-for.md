---
layout: post
title: JavaScript Questions - for
subtitle: for문 연습 문제
categories: javascript
section: javascript
---

* TOC
{:toc}

# 1. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

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

# 2. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.

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

# 3. for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

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

# 4. while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

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

# 5. while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

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

# 6. for 문을 사용하여 0부터 10미만의 정수의 합을 출력하시오.

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

# 7. 1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오.

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

# 8. 1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오.

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

# 9. 두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.

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

# 10. 삼각형출력하기

다음을 참고하여 *(별)로 높이가 5인(var line = 5) 삼각형을 문자열로 완성하라.
개행문자('\n')를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자('\n')로 끝나도 관게없다.

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

# 11. 트리 출력하기

다음을 참고하여 *(별)로 트리를 문자열로 완성하라.
개행문자('\n')를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자('\n')로 끝나도 관게없다.

```
// 높이(line)가 3일때 + 높이(line)가 5일때
*
**
***
*
**
***
****
*****
```

<!--```javascript
// 3줄짜리 삼각형
var line = 3;
// 출력용 변수
var star = '';

// 삼각형 라인수(line)만큼 루프: i = 0, 1, 2
for (var i = 0; i < line; i++) {
  // 라인별 별의 갯수(i + 1)만큼 루프
  for (var j = 0; j < i + 1; j++) {
    // 1번째 라인 : i = 0 / j = 0 => *
    // 2번째 라인 : i = 1 / j = 0, 1 => **
    // 3번째 라인 : i = 2 / j = 0, 1, 2 => ***
    star += '*';
  }
  // 개행
  star += '\n';
}

// 5줄짜리 삼각형
line = 5;

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

# 12. 정삼각형 출력하기

```
    *
   ***
  *****
 *******
*********
```

<!--```javascript
function printEquilateralTriangle(line) {
  var result = '';

  // 라인수(line)만큼 루프
  // line 5 일때, i => 1,2,3,4,5
  for (var i = 1; i <= line; i++) {
    // 정삼각형 왼쪽의 스페이스 갯수 만큼 루프
    // 정삼각형 왼쪽의 스페이스 갯수 => line - i
    // i => 1,2,3,4,5 일때 스페이스 갯수 j => 4,3,2,1,0
    for (var j = line - i; j > 0; j--) {
      result += ' ';
    }

    // 별의 갯수 만큼 루프
    // 라인별 별의 갯수 => (i * 2) - 1
    // i => 1,2,3,4,5 일때 별의 갯수 k => 1,3,5,7,9
    for (var k = 0; k < (i * 2) - 1; k++) {
      result += '*';
    }

    result += '\n';
  }

  return result;
}

console.log(printEquilateralTriangle(5));
```-->

# 13. 역정삼각형 출력하기

```
*********
 *******
  *****
   ***
    *
```

<!--```javascript
function printReversedEquilateralTriangle(line) {
  var result = '';

  // 라인수(line)만큼 루프
  // line 5 일때, i => 1,2,3,4,5
  for (var i = 1; i <= line; i++) {

    // 정삼각형 왼쪽의 스페이스의 갯수 => i - 1
    // i => 1,2,3,4,5 일때 스페이스 갯수 j => 0,1,2,3,4
    for (var j = 0; j < i - 1; j++) {
      result += ' ';
    }

    // 라인별 별의 갯수 => ((line - i) * 2) + 1
    // i => 1,2,3,4,5 일때 별의 갯수 k => 9,7,5,3,1
    // 별의 갯수 k만큼 루프하면서 별 출력
    for (var k = ((line - i) * 2) + 1; k > 0; k--) {
      result += '*';
    }

    result += '\n';
  }

  return result;
}

console.log(printReversedEquilateralTriangle(0));
console.log(printReversedEquilateralTriangle(3));
console.log(printReversedEquilateralTriangle(5));
console.log(printReversedEquilateralTriangle(8));
```-->
