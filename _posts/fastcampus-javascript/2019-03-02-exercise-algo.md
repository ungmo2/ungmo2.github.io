---
layout: fs-post
title: <strong>알고리즘 연습 문제</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 2
permalink: /:categories/:title
description:
---

* TOC
{:toc}

# 1. 짝수와 홀수

evenOrOdd 함수는 정수 num을 매개변수로 받는다. num은 1이상의 정수이며, num이 음수인 경우는 없다. num이 짝수일 경우 'Even'을 반환하고 홀수인 경우 'Odd'를 반환하도록 evenOrOdd 함수를 완성하라.

단, if문을 사용한 답과 삼항 조건 연산자를 사용한 답 두가지를 제시하여야 한다.

```javascript
// if문
function evenOrOdd(num) {

}

console.log(evenOrOdd(2)); // Even
console.log(evenOrOdd(3)); // Odd
console.log(evenOrOdd(1000)); // Even

// 3항 연산자
function evenOrOdd(num) {

}

console.log(evenOrOdd(2)); // Even
console.log(evenOrOdd(3)); // Odd
console.log(evenOrOdd(1000)); // Even
```

<!-- ```javascript
// if문
function evenOrOdd(num) {
  var result = '';

  if (num % 2) {
    result = 'Odd';
  } else {
    result = 'Even';
  }

  return result;
}

console.log(evenOrOdd(2)); // Even
console.log(evenOrOdd(3)); // Odd
console.log(evenOrOdd(1000)); // Even

// 3항 연산자
function evenOrOdd(num) {
  return num % 2 ? 'Odd' : 'Even';
}

console.log(evenOrOdd(2)); // Even
console.log(evenOrOdd(3)); // Odd
console.log(evenOrOdd(1000)); // Even
``` -->

# 2. 1 ~ 10,000의 숫자 중 8이 등장하는 횟수 구하기 (Google)

1부터 10,000까지 8이라는 숫자가 총 몇번 나오는가? 이를 구하는 함수를 완성하라.

단, 8이 포함되어 있는 숫자의 갯수를 카운팅 하는 것이 아니라 8이라는 숫자를 모두 카운팅 해야 한다. 예를 들어 8808은 3, 8888은 4로 카운팅 해야 한다.

(hint) 문자열 중 n번째에 있는 문자 : str.charAt(n) or str[n]

```javascript
function getCount8 () {

}

console.log(getCount8()); // 4000
```

<!--```javascript
function getCount8 () {
  var str = ''; // 1 ~ 10,000의 숫자를 연결하여 문자열로 만들기 위한 변수
  var sum = 0;  // 리턴용 변수

  // looping: 0 ~ 10000
  for (var i = 0; i < 10001; i++) {
    // str += i.toString();
    str += i;
  }

  // console.log(str);

  for (var j = 0; j < str.length; j++) {
    // if (str.charAt(i) === '8') sum++;
    if (str[j] === '8') sum++;
  }

  return sum;
}

console.log(getCount8()); // 4000
```-->

# 3. 문자열 다루기

alphaString46 함수는 문자열 s를 매개변수로 입력받는다. s의 길이가 4 ~ 6이고, 숫자로만 구성되어 있는지 확인하는 alphaString46 함수를 완성하라.

예를 들어 s가 'a234'이면 false를 리턴하고 '1234'라면 true를 리턴한다.

```javascript
function alphaString46(s) {

}

console.log(alphaString46('1234')); // true
console.log(alphaString46('9014')); // true
console.log(alphaString46('723'));  // false
console.log(alphaString46('a234')); // false
console.log(alphaString46(''));     // false
console.log(alphaString46());       // false
```

<!-- ```javascript
function alphaString46(s) {
  if (!s) return false;

  // isNaN('a234') // true
  // isNaN('1234') // false
  return ((s.length >= 4 && s.length <= 6) && !isNaN(s));
}

function alphaString46(s) {
  if (!s) return false;

  return /^\d{4,6}$/.test(s);
}

console.log(alphaString46('1234'));  // true
console.log(alphaString46('9014'));  // true
console.log(alphaString46('18464')); // true
console.log(alphaString46('723'));   // false
console.log(alphaString46('a234'));  // false
console.log(alphaString46('12x4'));  // false
console.log(alphaString46(''));      // false
console.log(alphaString46());        // false
``` -->
