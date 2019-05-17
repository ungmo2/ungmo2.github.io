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

# 4. 문자열 내 p와 y의 개수

numPY함수는 대문자와 소문자가 섞여있는 문자열 s를 인수로 전달받는다. s에 존재하는 'p'의 개수와 'y'의 갯수를 비교해 같으면 true, 다르면 false를 리턴하도록 함수를 완성하라. 대소문자를 구별하지 않으며 'p', 'y' 모두 하나도 없는 경우는 항상 true를 리턴한다.

예를 들어 s가 'pPoooyY'면 true를 리턴하고 'Pyy'라면 false를 리턴한다.

```javascript
function numPY(s) {

}

console.log(numPY('pPoooyY')); // true
console.log(numPY('Pyy'));     // false
console.log(numPY('ab'));      // true
console.log(numPY(''));        // true
console.log(numPY());          // true
```

<!-- ```javascript
function numPY(s) {
  if (!s) return true;

  const target = s.toLowerCase();

  let cntP = 0;
  let cntY = 0;

  for (let i = 0; i < target.length; i++) {
    if (target[i] === 'p') ++cntP;
    if (target[i] === 'y') ++cntY;
  }

  return cntP === cntY;
}

// 정규 표현식
function numPY(s) {
  if (!s) return true;

  const matchP = s.match(/p/ig);
  const matchY = s.match(/y/ig);

  return (matchP ? matchP.length : 0) === (matchY ? matchY.length : 0);
}

console.log(numPY('pPoooyY')); // true
console.log(numPY('Pyy'));     // false
console.log(numPY('ab'));      // true
console.log(numPY(''));        // true
console.log(numPY());          // true
``` -->

# 5. 이상한 문자만들기

toWeirdCase함수는 문자열을 인수로 전달받는다. 문자열 s에 각 단어의 짝수번째 인덱스 문자는 대문자로, 홀수번째 인덱스 문자는 소문자로 바꾼 문자열을 리턴하도록 함수를 완성하라.

예를 들어 s가 'hello world'라면 첫번째 단어는 'HeLlO', 두번째 단어는 'WoRlD'로 바꿔 'HeLlO WoRlD'를 리턴한다.

주의) 문자열 전체의 짝/홀수 인덱스가 아니라 단어(공백을 기준)별로 짝/홀수 인덱스를 판단한다.

```javascript
function toWeirdCase(s) {

}

console.log(toWeirdCase('hello world'));    // 'HeLlO WoRlD'
console.log(toWeirdCase('my name is lee')); // 'My NaMe Is LeE'
```

<!-- ```javascript
function toWeirdCase(str) {
  // str을 단어로 구분하여 array화
  const wordArr = str.split(' ');
  // console.log(wordArr); // [ 'hello', 'world' ]

  function toUpperLower(word) {
    let res = '';
    for (let i = 0; i < word.length; i++) {
      // 짝수번째 인덱스 문자는 대문자로, 홀수번째 인덱스 문자는 소문자로
      res += i % 2 ? word[i].toLowerCase() : word[i].toUpperCase();
    }
    return res;
  }

  for (let i = 0; i < wordArr.length; i++) {
    wordArr[i] = toUpperLower(wordArr[i]);
  }

  return wordArr.join(' ');
}

console.log(toWeirdCase('hello world'));    // 'HeLlO WoRlD'
console.log(toWeirdCase('my name is lee')); // 'My NaMe Is LeE'
``` -->

# 6. 핸드폰번호 가리기

핸드폰 요금 고지서에 표시할 전화번호는 개인정보 보호를 위해 맨 뒷자리 4자리를 제외한 나머지를 `*`으로 바꿔야 한다.
전화번호를 나타내는 문자열 str을 입력받는 hideNumbers 함수를 완성하라
예를들어 s가 '01033334444'면 `*******4444`를 리턴하고, '027778888'인 경우는 `*****8888`을 리턴한다.

```javascript
function hideNumbers(str) {

}

console.log(hideNumbers('01033334444')); // *******4444
console.log(hideNumbers('027778888'));   // *****8888
```

<!-- ```javscript
function hideNumbers(str) {
  // 문자열을 뒤에서 4자리 잘라내기
  // console.log(str.slice(-4));
  // console.log(str.substring(str.length - 4));

  return '*'.repeat(str.length - 4) + str.slice(-4);
}

console.log(hideNumbers('01033334444')); // *******4444
console.log(hideNumbers('027778888'));   // *****8888
``` -->

# 7. 문자열을 숫자로 바꾸기

strToInt 메소드는 문자열을 인수로 전달받는다. 전달받은 문자열 인수를 숫자로 변환한 결과를 반환하도록 strToInt를 작성하라.

예를 들어 str이 '1234'이면 1234를 반환하고, '-1234'이면 -1234를 반환한다. str은 부호(+,-)와 숫자로만 구성되어 있고, 잘못된 값이 입력되는 경우는 없다.

```javascript
function strToInt(str) {

}

console.log(strToInt('1234'));  // 1234
console.log(strToInt('-1234')); // -1234
```

<!-- ```javascript
function strToInt(str) {
  return +str;
  // return str * 1;
  // return Number(str);
  // return parseInt(str);
}

console.log(strToInt('1234'));  // 1234
console.log(strToInt('-1234')); // -1234
``` -->

# 8. 수박수박수박수박수박수?

waterMelon 함수는 정수를 인수로 전달받는다. 길이가 n이고, 수박수박수...와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하라.

예를 들어 n이 4이면 '수박수박'을 리턴하고 3이라면 '수박수'를 리턴한다.

```javascript
function waterMelon(n) {

}

console.log('n이 3인 경우: '+ waterMelon(3));
console.log('n이 4인 경우: '+ waterMelon(4));
```

<!-- ```javascript
function waterMelon(n) {
  let result = '';

  for (let i = 0; i < n; i++) {
    result += i % 2 ? '박' : '수';
  }
  return result;
}

console.log('n이 3인 경우: '+ waterMelon(3));
console.log('n이 4인 경우: '+ waterMelon(4));
``` -->

# 9. 정수제곱근 판별하기

nextSqaure함수는 정수를 인수로 전달받는다. n이 임의의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 임의의 정수 x의 제곱이 아니라면 'no'를 리턴하는 함수를 작성하라.

예를 들어 n이 121이라면 이는 정수 11의 제곱이므로 (11+1)의 제곱인 144를 리턴하고, 3이라면 'no'을 리턴한다.

```javascript
function nextSqaure(n){

}

console.log(nextSqaure());    // no
console.log(nextSqaure(0));   // 1
console.log(nextSqaure(1));   // 4
console.log(nextSqaure(2));   // no
console.log(nextSqaure(3));   // no
console.log(nextSqaure(121)); // 144
console.log(nextSqaure(165)); // no
console.log(nextSqaure(400)); // 441
```

<!-- ```javascript
function nextSqaure(n) {
  // Math.sqrt: 양의 제곱근을 반환
  // n = 9 이면 3 반환
  // n = 3 이면 1.7320508075688772 반환
  var root = Math.sqrt(n);

  // console.log(root);

  return Number.isInteger(root) ? Math.pow((root + 1), 2) : 'no';
}
``` -->

# 10. 배열의 최대/최소값 구하기

배열의 요소 중 최대값/최소값을 반환하는 함수를 완성하라.

```javascript
function getMaxValueFromArray(array) {

}
console.log(getMaxValueFromArray([3, 6, -2, -5, 7, 3])); // 7

function getMinValueFromArray(array) {

}
console.log(getMinValueFromArray([3, 6, -2, -5, 7, 3])); // -5
```

<!-- ```javascript
function getMaxValueFromArray(array) {
  return Math.max.apply(null, array);
}
console.log(getMaxValueFromArray([3, 6, -2, -5, 7, 3])); // 7

function getMinValueFromArray(array) {
  return Math.min.apply(null, array);
}
console.log(getMinValueFromArray([3, 6, -2, -5, 7, 3])); // -5
``` -->
