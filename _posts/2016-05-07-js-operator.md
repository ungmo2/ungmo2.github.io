---
layout: post
title: <strong>Operator</strong>
subtitle: 연산자
categories: javascript
section: javascript
seq: 5
subseq: 7
description: 연산자(Operator)는 하나 혹은 그 이상의 값을 하나의 값으로 만들 때 사용한다.
---

* TOC
{:toc}

표현식(Expression)은 리터럴, 식별자(변수명, 함수명, 객체의 프로퍼티명, 배열의 요소 등), 연산자의 조합을 말한다.

```javascript
// 표현식
10          // 리터럴
sum         // 변수
person.name // 객체의 프로퍼티
arr[1]      // 배열의 요소
square()    // 함수 호출
person.getBirthday() // 메소드 호출
```

위와 같이 **표현식은 평가(Evaluation)되고 그 결과, 하나의 값으로 수렴된다.** 위 예제는 하나의 표현식으로만 이루어져 있지만 하나 이상의 표현식을 결합하여 하나의 값을 만들어낼 수 있다.

```javascript
// 연산자 표현식
10 + 20
sum = 10 + 20
person.name !== 'Lee'
!arr[1]
typeof square()
person.getBirthday() instanceof Date
```

이처럼 **연산자(Operator)는 하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입 연산 등을 수행하여 하나의 값을 만든다.** 이때 연산의 대상을 피연산자(Operand)라 한다. 피연산자와 연산자의 조합은 하나의 값으로 평가되므로 표현식이다. 표현식이 명사의 역할을 한다면 연산자는 동사의 역할을 한다고 볼 수 있다.

자바스크립트가 제공하는 다양한 연산자에 대해 살펴보도록 하자.

# 1. 산술 연산자

산술 연산자(Arithmetic Operator)는 피연산자가 숫자이거나 숫자로 타입을 변환할 수 있는 값을 산술 연산한다. 연산을 할 수 없거나 피연산자를 숫자로 타입 변환할 수 없는 경우 NaN을 반환한다.

산술 연산자는 이항 산술 연산자와 단항 산술 연산자로 구분할 수 있다.

| 이항 산술 연산자	| 의미           |
| :-----------: |:------------- |
| +	            | 덧셈
| -	            | 뺄셈
| *	            | 곱셈
| /	            | 나눗셈
| %	            | 나머지

```javascript
var x = 5;
var y = 2;
var res;

res = x + y;  // 7
res = x - y;  // 3
res = x * y;  // 10
res = x / y;  // 2.5
res = x % y;  // 1
```

이항 산술 연산자는 피연산자의 값을 변경하는 부수 효과가 없다. 하지만 단항 산술 연산자는 모두 피연산자의 값을 변경하는 부수 효과가 있다.

| 단항 산술 연산자	| 의미           |
| :-----------: |:------------- |
| ++	          | 증가
| -\-	          | 감소
| +	            | 아무 일도 일어나지 않는다.
| -	            | 부호 반전

```javascript
var x = 5;
var res;

res = x++; // 5 선대입후증가 / Postfix increment operator
res = ++x; // 7 선증가후대입 / Prefix increment operator
res = x--; // 7 선대입후감소 / Postfix decrement operator
res = --x; // 5 선감소후대입 / Prefix decrement operator

+x; // 5
-x; // -5
```

`+ 연산자`는 경우에 따라 덧셈 연산과 문자열 연결 연산을 수행한다.

- 피연산자 중 하나 이상이 문자열인 경우 : 문자열 연결 연산자로 동작한다.
- 모든 피연산자가 숫자 값이거나 숫자 타입을 타입 변환할 수 있는 경우 : 덧셈 연산자로 동작한다.

```javascript
1 + 2         // 3
1 + true      // 2 (true → 1)
1 + false     // 1 (false → 0)
true + false  // 1 (true → 1 / false → 0)
1 + null      // 1 (null → 0)
1 + undefined // NaN (undefined → NaN)
'1' + 2       // '12'
```

# 2. 할당 연산자

할당 연산자(Assignment Operator)는 우항의 피연산자의 값을 좌항의 변수에 할당한다. 할당 연산자는 좌항의 변수에 값을 할당하므로 부수 효과가 있는 표현식을 만든다.

| 할당 연산자	   | 사례   	 | 동일 표현
| :---------: |:-------- | :-------- |
| =         	| x = y	   | x = y
| +=	        | x += y	 | x = x + y
| -=	        | x -= y	 | x = x - y
| *=	        | x *= y	 | x = x * y
| /=	        | x /= y	 | x = x / y
| %=	        | x %= y	 | x = x % y

```javascript
var x;

x = 10;   // 10
x += 5;   // 15
x -= 5;   // 10
x *= 5;   // 50
x /= 5;   // 10
x %= 5;   // 0

var txt1 = 'Good';
var txt2 = 'Morning';
var txt3 = txt1 + ' ' + txt2; // Good Morning

txt1 = 'What a very ';
txt1 += 'nice day'; // What a very nice day
```

표현식은 "하나의 값으로 수렴된다"고 하였다. 그렇다면 할당 연산은 표현식일까? 아래의 예제를 살펴보자.

```javascript
var x;
console.log(x = 10); // 10
```

할당 연산은 변수에 값을 할당하는 부수 효과가 있기는 하지만 값으로 평가되지 않을 것처럼 보인다. 하지만 할당 연산은 하나의 값으로 평가되는 표현식이다. 따라서 아래와 같이 할당 연산 표현식을 다른 변수에 할당할 수도 있다.

```javascript
var x, y;
y = x = 10; // 연쇄 할당(Chained assignment)
console.log(x, y); // 10 10
```

# 3. 비교 연산자

비교 연산자(Comparison Operator)는 우항과 좌항의 피연산자를 비교하여 불리언 값을 반환한다. if 문이나 for 문과 같은 제어문의 조건식에서 주로 사용하며 부수 효과는 없다.

| 비교 연산자	   | 의미
| :---------: |:-------------- |
| ==	        | 동등비교(loose equality). 좌우항의 피연산자의 타입이 일치하도록 변환한 후, 값이 동등한지 비교한다.
| ===	        | 일치비교(strict equality). 좌우항의 피연산자의 타입을 변경하지 않은 상태에서 값이 동등한지 비교한다. 즉, 값은 물론 타입까지 일치하여야 true를 반환한다.
| !=	        | 부등비교
| !==	        | 불일치비교
| >	          | 관계비교
| <	          | 관계비교
| >=	        | 관계비교
| <=	        | 관계비교


```javascript
// 동등비교
5 == 5    // true
5 == '5'  // true
5 == 8    // false

// 일치비교
5 === 5   // true
5 === '5' // false

// 부등비교
5 != 8    // true
5 != 5    // false
5 != '5'  // false

// 불일치비교
5 !== 8   // true
5 !== 5   // false
5 !== '5' // true

// 관계비교
5 > 0     // true
5 > 5     // false
5 > 8     // false

5 < 0     // false
5 < 5     // false
5 < 8     // true

5 >= 0    // true
5 >= 5    // true
5 >= 8    // false

5 <= 0    // false
5 <= 5    // true
5 <= 8    // true
```

# 4. 삼항 조건 연산자

삼항 조건 연산자(ternary operator)는 조건식의 평가 결과에 따라 반환할 값을 결정한다. 자바스크립트의 유일한 삼항 연산자이며 부수 효과는 없다. 삼항 조건 연산자식은 아래와 같이 사용한다.

```
조건식 ? 조건식이 ture일때 반환할 값 : 조건식이 false일때 반환할 값
```

물음표(?) 앞의 첫번째 피연산자가 조건식이다. 즉, 불리언 타입의 값으로 평가될 표현식이다. 첫번째 피연산자가 불리언 타입의 값이 아닌 경우, 불리언 타입의 값으로 강제 타입 변환된다.

만일 첫번째 피연산자인 조건식이 참이면 콜론(:) 앞의 두번째 피연산자가 반환되고, 거짓이면 콜론(:) 뒤의 세번째 피연산자가 반환된다.

```javascript
// x가 짝수이면 ‘짝수’를 홀수이면 ‘홀수’를 반환한다.
var x = 2;
var result = x % 2 ? '홀수' : '짝수'; // 2 % 2는 0이고 0은 false로 강제 타입 변환된다
console.log(result); // 짝수

// id의 길이가 INPUT_ID_MIN_LEN보다 작으면 에러 메시지를 출력한다.
var id = 'lee';
var INPUT_ID_MIN_LEN = 5;
var errMsg = id.length < INPUT_ID_MIN_LEN ? '5자리 이상으로 입력하세요' : '성공';
console.log(errMsg); // '5자리 이상으로 입력하세요'
```

삼항 조건 연산자는 다음 장에서 살펴볼 if … else 문을 사용해도 동일한 처리를 할 수 있다.

```javascript
// x가 짝수이면 ‘짝수’를 홀수이면 ‘홀수’를 반환한다.
var x = 2;
var result;

if (x % 2) { // 2 % 2는 0이고 0은 false로 강제 타입 변환된다
  result = '홀수';
} else {
  result = '짝수';
}

console.log(result); // 짝수
```

하지만 if … else 문은 표현식이 아닌 문으로 값으로 평가할 수 없다. 하지만 삼항 조건 연산자식은 값으로 평가할 수 있는 표현식이다. 따라서 삼항 조건 연산자식은 다른 표현식의 일부가 될 수 있어 매우 유용하다.

# 5. 논리 연산자

논리 연산자(Logical Operator)는 우항과 좌항의 피연산자(부정 논리 연산자의 경우, 우항의 피연산자)를 논리 연산하여 불리언 값을 반환하는 것이 일반적이다.

| 논리 연산자	   | 의미
| :---------: |:-------------:|
| &#124;&#124;| 논리합(OR)
| &&	        | 논리곱(AND)
| !	          | 부정(NOT)

```javascript
// || (논리합) 연산자
true || true;   // true
false || true;  // true
true || false;  // true
false || false; // false

// && (논리곱) 연산자
true && true;   // true
true && false;  // false
false && true;  // false
false && false; // false

// ! (논리 부정) 연산자
!true;  // false
!false; // true
```

논리 연산의 피연산자는 반드시 불리언 값일 필요는 없다. 만약에 피연산자가 불리언 값이 아니라면 필요에 따라 "암묵적 강제 타입 변환"을 통해 불리언 타입으로 변환한다.

```javascript
// 암묵적 강제 타입 변환
!0;
```

또한 연산 결과도 불리언 값이 아닐 수도 있다.

```javascript
// 단축 평가
'Cat' && 'Dog';
```

이에 대해서는 다음의 [암묵적 강제 타입 변환](./js-type-coercion#1-암묵적-타입-강제-변환)과 [단축 평가](./js-type-coercion#5-단축-평가)에서 살펴보기로 하자.

# 6. 타입 연산자

타입 연산자(Type Operator)는 데이터 타입을 반환하거나 객체의 종류를 반환한다.

| 타입 연산자 	 | 의미
| :---------: |:-------------- |
| typeof	    | 피연산자의 데이터 타입을 문자열로 반환한다. null과 배열의 경우 object, 함수의 경우 function를 반환하는 것에 유의하여야 한다.
| instanceof	| 객체가 동일 객체형의 인스턴스이면 `true`를 반환한다.

```javascript
typeof ''              // "string"
typeof 1               // "number"
typeof NaN             // "number"
typeof true            // "boolean"
typeof undefined       // "undefined"
typeof Symbol()        // "symbol"
typeof null            // "object" (설계적 결함)
typeof []              // "object"
typeof {}              // "object"
typeof new Date()      // "object"
typeof /test/gi        // "object"
typeof function () {}  // "function"
typeof undeclared      // undefined (설계적 결함)


var arr = [];
arr instanceof Array  // true
arr instanceof Object // true

function Person() {}
var me = new Person();
me instanceof Person // true
me instanceof Object // true
```

<!--
# 6. 우선 순위

```javascript
foo.a = b + c; // foo is not defined => 왼쪽 -> 오른쪽 방향으로
a = b + c; // b is not defined => 왼쪽 -> 오른쪽 방향으로
```
 -->
