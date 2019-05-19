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

```javascript
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
```

# 2. 1 ~ 10,000의 숫자 중 8이 등장하는 횟수 구하기 (Google)

1부터 10,000까지 8이라는 숫자가 총 몇번 나오는가? 이를 구하는 함수를 완성하라.

단, 8이 포함되어 있는 숫자의 갯수를 카운팅 하는 것이 아니라 8이라는 숫자를 모두 카운팅 해야 한다. 예를 들어 8808은 3, 8888은 4로 카운팅 해야 한다.

(hint) 문자열 중 n번째에 있는 문자 : str.charAt(n) or str[n]

```javascript
function getCount8 () {

}

console.log(getCount8()); // 4000
```

```javascript
function getCount8() {
  let str = ''; // 1 ~ 10,000의 숫자를 연결하여 문자열로 만들기 위한 변수
  let sum = 0;  // 리턴용 변수

  // looping: 0 ~ 10000
  for (let i = 0; i < 10001; i++) {
    str += i;
  }

  // console.log(str);

  for (let j = 0; j < str.length; j++) {
    // if (str.charAt(i) === '8') sum++;
    if (str[j] === '8') sum++;
  }

  return sum;
}

console.log(getCount8()); // 4000
```

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

```javascript
function alphaString46(s) {
  if (!s) return false;

  // isNaN('a234') // true
  // isNaN('1234') // false
  return ((s.length >= 4 && s.length <= 6) && !isNaN(s));
}

// 정규 표현식
function alphaString46(s) {
  if (!s) return false;

  // /^ / => 문자열의 시작점
  // \d => decimal
  // {4,6} => 4~6자리
  // / $/ => 문자열의 끝
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
```

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

```javascript
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
```

# 5. 이상한 문자 만들기

toWeirdCase함수는 문자열을 인수로 전달받는다. 문자열 s에 각 단어의 짝수번째 인덱스 문자는 대문자로, 홀수번째 인덱스 문자는 소문자로 바꾼 문자열을 리턴하도록 함수를 완성하라.

예를 들어 s가 'hello world'라면 첫번째 단어는 'HeLlO', 두번째 단어는 'WoRlD'로 바꿔 'HeLlO WoRlD'를 리턴한다.

주의) 문자열 전체의 짝/홀수 인덱스가 아니라 단어(공백을 기준)별로 짝/홀수 인덱스를 판단한다.

```javascript
function toWeirdCase(s) {

}

console.log(toWeirdCase('hello world'));    // 'HeLlO WoRlD'
console.log(toWeirdCase('my name is lee')); // 'My NaMe Is LeE'
```

```javascript
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
```

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

```javascript
function hideNumbers(str) {
  // 문자열을 뒤에서 4자리 잘라내기
  // console.log(str.slice(-4));
  // console.log(str.substring(str.length - 4));

  return '*'.repeat(str.length - 4) + str.slice(-4);
}

console.log(hideNumbers('01033334444')); // *******4444
console.log(hideNumbers('027778888'));   // *****8888
```

# 7. 문자열을 숫자로 바꾸기

strToInt 메소드는 문자열을 인수로 전달받는다. 전달받은 문자열 인수를 숫자로 변환한 결과를 반환하도록 strToInt를 작성하라.

예를 들어 str이 '1234'이면 1234를 반환하고, '-1234'이면 -1234를 반환한다. str은 부호(+,-)와 숫자로만 구성되어 있고, 잘못된 값이 입력되는 경우는 없다.

```javascript
function strToInt(str) {

}

console.log(strToInt('1234'));  // 1234
console.log(strToInt('-1234')); // -1234
```

```javascript
function strToInt(str) {
  return +str;
  // return str * 1;
  // return Number(str);
  // return parseInt(str);
}

console.log(strToInt('1234'));  // 1234
console.log(strToInt('-1234')); // -1234
```

# 8. 수박수박수박수박수박수?

waterMelon 함수는 정수를 인수로 전달받는다. 길이가 n이고, 수박수박수...와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하라.

예를 들어 n이 4이면 '수박수박'을 리턴하고 3이라면 '수박수'를 리턴한다.

```javascript
function waterMelon(n) {

}

console.log('n이 3인 경우: '+ waterMelon(3));
console.log('n이 4인 경우: '+ waterMelon(4));
```

```javascript
function waterMelon(n) {
  let result = '';

  for (let i = 0; i < n; i++) {
    result += i % 2 ? '박' : '수';
  }
  return result;
}

console.log('n이 3인 경우: '+ waterMelon(3));
console.log('n이 4인 경우: '+ waterMelon(4));
```

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

```javascript
function nextSqaure(n) {
  // Math.sqrt: 양의 제곱근을 반환
  // n = 9 이면 3 반환
  // n = 3 이면 1.7320508075688772 반환
  const root = Math.sqrt(n);

  // console.log(root);

  return Number.isInteger(root) ? Math.pow((root + 1), 2) : 'no';
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

```javascript
function getMaxValueFromArray(array) {
  return Math.max.apply(null, array);
  // return Math.max(...array);
}
console.log(getMaxValueFromArray([3, 6, -2, -5, 7, 3])); // 7

function getMinValueFromArray(array) {
  return Math.min.apply(null, array);
  // return Math.min(...array);
}
console.log(getMinValueFromArray([3, 6, -2, -5, 7, 3])); // -5
```

# 11. Check Palindrom

palindrome(팰린드롬/회문)은 왼쪽에서 오른쪽으로 읽은 다음, 오른쪽부터 왼쪽으로 다시 읽어도 똑같은 형태와 의미를 유지하는 문장이나 단어를 지칭한다. 인자로 전달한 문자열이 palindrome인지 검사하여 Boolean값을 반환하는 함수를 완성하라. 단, 반드시 1자 이상의 문자열을 인자로 전달한다.

```javascript
function checkPalindrom(str) {

}

console.log(checkPalindrom('dad')); // true
console.log(checkPalindrom('mom')); // true
console.log(checkPalindrom('palindrom')); // false
console.log(checkPalindrom('s')); // true
```

<!--```javascript

function checkPalindrom(str) {
  // str.split('') => 각 문자를 요소로 하는 배열
  // str.split('').reverse() => 배열을 반대로
  // str.split('').reverse().join('') => 배열 요소 전체를 연결하여 문자열로
  return str === str.split('').reverse().join('');
}

console.log(checkPalindrom('dad')); // true
console.log(checkPalindrom('mom')); // true
console.log(checkPalindrom('palindrom')); // false
console.log(checkPalindrom('s')); // true
``` -->

# 12. 중복 요소 제거

인수로 전달된 배열의 요소 중에서 중복된 요소를 제외하고 유니크한 요소만을 반환하는 함수를 작성하라.

for 문 대신 forEach를 사용하도록 하자.


```javascript
function uniq(array) {

}

console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]
```
<!-- ```javascript
function uniq(array) {
  // const result = [];
  // array.forEach(item => {
  //   if (result.indexOf(item) === -1) result.push(item);
  // });
  // return result;
  return array.filter((item, i, self) => self.indexOf(item) === i);
}

console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]
``` -->

# 13. 중복된 요소

인수로 전달된 배열의 요소 중에서 중복된 요소만으로 구성된 배열을 반환하는 함수를 작성하라.

for 문 대신 forEach를 사용하도록 하자.

```javascript
function findDuplicated(array) {

}

console.log(findDuplicated([1, 2, 3, 4, 1, 2, 3])); // [ 1, 2, 3 ]
```
<!--
function findDuplicated(array) {
  return array.filter((item, i, self) => self.indexOf(item) !== i);
}

console.log(findDuplicated([1, 2, 3, 4, 1, 2, 3])); // [ 1, 2, 3 ]
-->

# 14. 약수의 합

어떤 수를 입력받아 그 수의 약수를 모두 더한 수를 구하는 sumDivisor 함수를 완성하라. 예를 들어 12가 입력된다면 12의 약수는 [1, 2, 3, 4, 6, 12]가 되고, 총 합은 28이 되므로 28을 반환한다.

약수(約數, divisor)는 어떤 수를 나누었을 때 나머지가 0인 수를 말하며, 배수 관계와 서로 반대되는 개념이다

```javascript
function sumDivisor(num) {

}

console.log(sumDivisor(12)); // 28
```
<!--
// 약수의 배열의 구한다
function getDivisorArray(num) {
  const divisors = [];

  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}

// 약수의 배열 요소를 모두 합한 값을 구한다.
function sumDivisor(num) {
  let result = 0;
  const arr = getDivisorArray(num);
  // for (var i = 0; i < arr.length; i++) {
  //   result += arr[i];
  // }
  // return result;
  return arr.reduce((p, c) => p + c);
}
-->

# 15. 소수 찾기

numberOfPrime 메소드는 정수 n을 매개변수로 입력받는다. 1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하도록 numberOfPrime 함수를 완성하라.
예를 들어 10을 입력받았다면, 1부터 10 사이의 소수는 [2,3,5,7] 4개가 존재하므로 4를 반환한다.

소수(素數, prime number)는 2, 3, 5, 7, 11, 13, 17...과 같이 1과 자신 이외의 어떤 수로도 나눠지지 않는 1보다 큰 양의 정수이다.

```javascript
function numberOfPrime(n) {

}

console.log(numberOfPrime(10)); // 4
```
<!--
function isPrime(n) {
  // 2보다 작으면 소수가 아니다
  if (n < 2) return false;

  // 2부터 n-1까지의 모든수로 n을 나눠서 나머지가 있는지 확인한다.
  // 만약 나머지가 없다면 약수가 존재한다는 의미이므로 소수가 아니다.
  for (var i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }

  return true;
}

console.log(isPrime(1));   // false
console.log(isPrime(2));   // true
console.log(isPrime(3));   // true
console.log(isPrime(4));   // false
console.log(isPrime(5));   // true
console.log(isPrime(17));  // true
console.log(isPrime(100)); // false
console.log(isPrime(101)); // true
console.log(isPrime(199)); // true


function numberOfPrime(n) {
  var cnt = 0;
  // 2부터 n까지 반복하며 소수인지 확인하여 소수이면 카운트한다.
  for (var i = 2; i <= n; i++) {
    if (isPrime(i)) cnt++;
  }
  return cnt;
}
-->
<!--
# 13. 최대공약수와 최소공배수

두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환해주는 gcdlcm 함수를 완성하라. 배열의 맨 앞에 최대공약수, 그 다음 최소공배수를 넣어 반환한다. 예를 들어 gcdlcm(3,12)가 입력되면, [3, 12]를 반환하라.

[최대공약수(最大公約數 greatest common divisor)](https://ko.wikipedia.org/wiki/%EC%B5%9C%EB%8C%80%EA%B3%B5%EC%95%BD%EC%88%98)란, 0이 아닌 두 정수나 다항식의 공통되는 약수 중에서 가장 큰 수를 말한다.

두 수 a와 b의 최대공약수를 구하는 방법은 소인수 분해를 사용하는 방법과 [유클리드 호제법](https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95)이 있다.

일반적으로 소인수 분해를 효율적으로 빠른 시간 내에 하는 방법은 알려져 있지 않다. 더 빠른 시간 안에 구하는 방법에는 호제법이 있다.

똑같이 두 수 192와 72의 최대공약수를 이번에는 호제법으로 구하여 보자. 일단 192을 72로 나누어 나머지를 구한다.

192 = 72 * 2 + 48이다. 이는 192을 72로 나누어 나온 나머지가 48라는 것을 의미한다. 이번에는 72을 나머지인 48로 나눈다.

72 = 48 * 1 + 24이다. 이와 같은 연산을 나머지가 0이 될 때까지 반복한다. 48 = 24 * 2 + 0 나머지가 0이 되었으므로 연산을 중지한다. 이때, 나머지가 0이 되기 바로 직전의 연산에서의 나머지가 원래 두 수의 최대공약수가 된다.

1071과 1029의 최대공약수를 구하면,

1071은 1029로 나누어 떨어지지 않기 때문에, 1071을 1029로 나눈 나머지를 구한다. => 42
1029는 42로 나누어 떨어지지 않기 때문에, 1029를 42로 나눈 나머지를 구한다. => 21
42는 21로 나누어 떨어진다.
따라서, 최대공약수는 21이다.

```javascript
function gcdlcm(a, b) {

}

console.log(gcdlcm(3, 12)); // [3, 12]
``` -->

# 16. 피보나치 수

피보나치 수는 0과 1로 시작하며, 다음 피보나치 수는 바로 앞의 두 피보나치 수의 합이 된다.
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946...

2 이상의 n이 입력되었을 때, n번째 피보나치 수를 반환하는 fibonacci 함수를 작성하라. 예를 들어 n = 3이라면 2를 반환한다.

```javascript
function fibonacci(n) {

}

console.log(fibonacci(2)); // 1
console.log(fibonacci(3)); // 2
console.log(fibonacci(4)); // 3
console.log(fibonacci(5)); // 5
console.log(fibonacci(6)); // 8
```
<!--
function fibonacci(n) {
  if (n < 2) return n;

  // n이 2 이상인 경우
  var temp1 = 0;
  var temp2 = 1;
  var fibo = 1;

  for (var i = 2; i <= n; i++) {
    fibo = temp1 + temp2;
    temp1 = temp2;
    temp2 = fibo;
  }
  return fibo;
}

// 재귀 함수를 사용한 방법
function fibonacci(n) {
  if (n < 2) return n;
  // n이 2 이상인 경우
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 메모이제이션
// 메모이제이션이란 함수에 전달한 인수와 함수의 반환값을 쌍으로 저장해 두는 기법을 말한다.
// 메모이제이션을 사용하면 한번 호출한 이력이 있는 처리는 저장해 둔 인수와 반환값을 재사용할 수 있다.
function fibonacci(n) {
  if (n < 2) return n;
  // fibonacci 함수 객체에 n 프로퍼티가 없으면 프로퍼티를 생성하고 값을 할당
  if (!(n in fibonacci)) fibonacci[n] = fibonacci(n - 1) + fibonacci(n - 2);
  return fibonacci[n];
}
-->

# 17. 하샤드 수

하샤드 수는 그 수의 각 자릿수 숫자의 합으로 그 수가 나누어지는 양의 정수를 말한다.

양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 한다. 예를들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수이다.

10, 12, 18, 20, 21, 24, 27, 30, 36, 40, 42, 45, 48, 50, 54, 60, 63, 70, 72, 80, 81, 84, 90, 100, 102, 108, 110, 111, 112, 114, 117, 120, 126, 132, 133, 135, 140, 144, 150, 152, 153, 156, 162, 171, 180, 190, 192, 195, 198, 200

Harshad함수는 양의 정수 n을 매개변수로 입력받는다. 이 n이 하샤드수인지 아닌지 판단하는 함수를 완성하라.

예를들어 n이 10, 12, 18이면 True를 리턴 11, 13이면 False를 리턴한다.

```javascript
function isHarshad(n){

}

console.log(isHarshad(10)); // true
console.log(isHarshad(12)); // true
console.log(isHarshad(18)); // true
console.log(isHarshad(11)); // false
console.log(isHarshad(13)); // false
```
<!--
function isHarshad(n) {
  const str = n + '';
  let sum = 0;

  for (var i = 0; i < str.length; i++) {
    sum += parseInt(str[i]);
  }
  // for (const digit of str) {
  //   sum += parseInt(digit);
  // }

  // return n % sum ? false : true;
  return !(n % sum);
}
-->

# 18. 두 정수 사이의 합

adder함수는 정수 x, y를 매개변수로 입력받는다.
두 수와 두 수 사이에 있는 모든 정수를 더해서 리턴하도록 함수를 완성하라.

x와 y가 같은 경우는 둘 중 아무 수나 리턴한다.
x, y는 음수나 0, 양수일 수 있으며 둘의 대소 관계도 정해져 있지 않다.

예를들어 x가 3, y가 5이면 12를 리턴한다.

```javascript
function adder(x, y){

}

console.log(adder(3, 5)); // 12
```
<!--
function adder(x, y) {
  let sum = 0;
  const sortedArgs = [];

  if (x > y) {
    sortedArgs.push(y, x);
  } else if (x < y) {
    sortedArgs.push(x, y);
  } else {
    return x;
  }

  for (var i = sortedArgs[0]; i <= sortedArgs[1]; i++) {
    sum += i;
  }

  return sum;
}
-->

# 19. 배열의 첫 요소와 마지막 요소로 배열 만들기

배열의 첫 요소와 마지막 요소를 나타내는 정수를 인자로 받아 정수의 배열을 반환하는 함수를 완성하라.
예를 들어 인수가 [10, 15]인 경우, [ 10, 11, 12, 13, 14, 15 ]를 반환한다.

```javascript
function generateRange(from, to) {
  const res = [];

  return res;
}

console.log(generateRange(10, 15)); // [ 10, 11, 12, 13, 14, 15 ]
```
<!--
function generateRange(from, to) {
  const res = [];

  while (from < to + 1) {
    res.push(from);
    from++;
  }
  return res;
}
-->

# 20. 배열의 인접한 요소곱 중 가장 큰 값 구하기

정수의 배열에서 인접한 요소의 곱이 가장 큰 값을 반환하는 함수를 완성하라.
예를 들어 인수가 [3, 6, -2, -5, 7, 3]인 경우, 21을 반환한다.

```javascript
function adjacentElementsProduct(arr) {

}

console.log(adjacentElementsProduct([3, 6, -2, -5, 7, 3])); // 21
```
<!--
function adjacentElementsProduct(arr) {
  // var buf = [];
  // [3, 6, -2, -5, 7, 3]
  // 0 ~ 4까지 루프
  // for (let i = 0; i < arr.length - 1; i++) {
  //   // i: 0 => 3, 6
  //   // i: 1 => 6, -2
  //   // ...
  //   // i: 4 => 7, 3
  //   buf.push(arr[i] * arr[i + 1]);
  // }
  // 최대값을 반환
  // return Math.max.apply(null, buf);

  const buf = [];

  arr.reduce((pre, cur) => {
    buf.push(pre * cur);
    return cur;
  });

  // 최대값을 반환
  return Math.max(...buf);
}
-->

# 21. 배열에서 특정 값만을 구하기

배열 arr에서 짝수이고 3보다 큰 수만을 구하여 이를 배열로 반환하는 함수를 작성하라

```javascript
function getArray(arr) {

}

console.log(getArray([1, 2, 3, 4, 5, 6])); // [ 4, 6 ]
```
<!--
function getArray(arr) {
  return arr.filter(el => (el % 2 === 0) && (el > 3));
}
-->

# 22. 평균구하기

배열을 인자로 전달받아 각 요소의 평균을 구하는 함수를 완성하라.

```javascript
function average(array){

}

console.log(average([5, 3, 4])); // 4
```
<!--
function average(array) {
  return array.reduce((pre, cur) => pre + cur) / array.length;
}
-->

# 23. 최단 거리 1차원 점의 쌍 구하기 (DAUM)

1차원의 점들이 주어졌을 때, 그 중 가장 거리가 짧은 것(들)의 쌍을 배열로 반환하는 함수를 작성하라. (단 점들의 배열은 모두 정렬되어있다고 가정한다.) 예를들어 [1, 3, 4, 8, 13, 17, 20, 23, 24]이 주어졌다면, 결과값은 [[3, 4], [23, 24]]가 될 것이다.

```javascript
function findMinDistance(array){

}

// 1차원 점의 배열
var array = [1, 3, 4, 8, 13, 17, 20, 23, 24];
console.log(findMinDistance(array)); // [[3, 4], [23, 24]]
```
<!--
function findMinDistance(array) {
  // 리턴용 배열
  var shortests = [];
  // 두 점간의 최단 거리
  var minDistance = Number.MAX_VALUE;

  array.reduce(function (pre, cur) {
    // 두 점 간의 거리
    var distance = Math.abs(pre - cur);

    // 두 점 간의 거리가 최단 거리이면 shortests에 푸시한다.
    // 가장 거리가 짧은 것의 쌍은 여러개 일 수 있다.
    if (distance === minDistance) {
      shortests.push([pre, cur]);
    }

    // 두 점 간의 거리가 지금까지 조사된 최단 거리보다 작으면
    if (distance < minDistance) {
      // minDistance를 갱신한다.
      minDistance = distance;
      // shortests를 갱신한다.
      shortests = [[pre, cur]];
    }

    return cur;
  });

  return shortests;
}
-->

# 24. 특별한 정렬

n개의 정수를 가진 배열이 있다. 이 배열은 양의 정수와 음의 정수를 모두 가지고 있다. 이 배열을 좀 특별한 방법으로 정렬해야 한다. 음의 정수는 앞쪽에 내림차순으로, 양의 정수는 뒷쪽에 있어야 한다. 단, 인수로 주어진 원본 배열은 변경되지 않아야 한다.

예를 들어, [-1, 1, 3, -2, 2, 0]이 주어졌을 때, [-1, -2, 0, 1, 2, 3]를 반환한다.

```javascript
function specialSort(array) {

}

const testArray = [-1, 1, 3, -2, 2, 0];

console.log(testArray); // [ -1, 1, 3, -2, 2, 0 ]
console.log(specialSort(testArray)); // [ -1, -2, 0, 1, 2, 3 ]
```
<!--
function specialSort(array) {
  // 배열 copy -> filter(음수만) -> sort(내림차순)
  // var minus = array.slice().filter(function (e) { return e < 0; }).sort(function (a, b) { return b - a; });
  const minus = array.slice().filter(e => e < 0).sort((a, b) => b - a);
  // console.log(minus);

  // 배열 copy -> filter(0과 양수만) -> sort(오름차순)
  // var plus = array.slice().filter(function (e) { return e >= 0; }).sort(function (a, b) { return a - b; });
  const plus = array.slice().filter(e => e >= 0).sort((a, b) => a - b);
  // console.log(plus);

  return minus.concat(plus);
}
-->

# 25. 각 자릿수의 합 구하기

정수 n이 주어지면, n의 각 자릿수의 합을 구해서 return 하는 digitSum 함수를 완성하라.
예를 들어 n = 123이면 1 + 2 + 3 = 6을 return한다. 단, n은 100,000,000 이하의 정수로 한다.


```javascript
function digitSum(n) {

}

console.log(digitSum(123));  // 6
console.log(digitSum(987));  // 24
console.log(digitSum(100000001));  // false
```

<!--
function digitSum(n) {
  if (n < 0 || n > 100000000) return false;

  let sum = 0;
  const arr = (n + '').split('');

  arr.forEach(digit => {
    sum += digit * 1;
  });

  return sum;
}
-->

# 26. 중복없는 배열

길이가 n인 배열에 1부터 n까지 숫자가 중복 없이 한 번씩 들어 있는지를 확인하려고 한다.
1부터 n까지 숫자가 중복 없이 한 번씩 들어 있는 경우 true를, 아닌 경우 false를 반환하도록 함수 isNotOverlapArray을 완성하라. 단, 배열의 요소는 정수이다.

예를 들어 주어진 배열이 [4, 1, 3, 2]이라면 true, [4, 1, 3] 또는 [1, 3]이라면 false를 반환한다.

```javascript
function isNotOverlapArray(array) {

}

console.log(isNotOverlapArray([4, 1, 3, 2])); // true
console.log(isNotOverlapArray([4, 1, 3]));    // false
```
<!--
function isNotOverlapArray(array) {
  let res = 0;

  // 정렬 => 2개 요소 비교
  array.sort((a, b) => a - b).reduce((pre, cur) => {
    // 2개 요소 비교: 차이가 1이 아니면 1 증가
    cur - pre !== 1 ? res++ : res;
    return cur;
  });

  return (res === 0);
}
-->

# 28. 요일 구하기

2016년 1월 1일은 금요일이다. 2016년 a월 b일은 무슨 요일일까? 두 수 a, b를 입력받아 a월 b일이 무슨 요일인지 출력하는 getDayName 함수를 완성하라.

요일의 이름은 일요일부터 토요일까지 각각 SUN, MON, TUE, WED, THU, FRI, SAT를 출력한다. 예를 들어 a=5, b=24가 입력된다면 5월 24일은 화요일이므로 TUE를 반환한다.

```javascript
function getDayName(a, b){

}

console.log(getDayName(5, 24)); // TUE
```
<!--
function getDayName(month, date) {
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const today = new Date(2016, month - 1, date);

  return dayNames[today.getDay()];
}

console.log(getDayName(5, 24)); // TUE
-->
