---
layout: post
title: Javascript <strong>Operator</strong>
categories: javascript
subtitle: 연산자
section: javascript
description: 연산자(Operators)는 하나 혹은 그 이상의 값을 하나의 값으로 만들 때 사용한다.
---

* TOC
{:toc}

연산자(Operators)는 하나 혹은 그 이상의 값을 하나의 값으로 만들 때 사용한다.

# 1. 산술 연산자 (Arithmetic Operators)

| Operator	  | Description   |
| :---------: |:------------- |
| +	          | 덧셈
| -	          | 뺄셈
| *	          | 곱셈
| /	          | 나눗셈
| %	          | 나머지
| ++	        | 증가
| -\-	        | 감소

```javascript
var x = 5;
var y = 2;
var z;

z = x + y;  // 7
z = x - y;  // 3
z = x * y;  // 10
z = x / y;  // 2.5
z = x % y;  // 1
z = x++;    // 5 선대입후증가
z = ++x;    // 7 선증가후대입
z = x--;    // 7 선대입후감소
z = --x;    // 5 선감소후대입

var str1 = '5' + 5;      // '55'
var str2 = 5 + '5';      // '55'
var str3 = 'Hello' + 5;  // 'Hello5'
```

`+ 연산자`는 덧셈 연산과 문자열 연결 연산을 수행한다.

- 연산 대상이 모두 숫자인 경우 : 덧셈 연산
- 그 외의 경우 : 문자열 연결 연산

# 2. 대입 연산자 (Assignment Operators)

| Operator	  | Example	 | Same As
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

# 3. 비교 연산자 (Comparison Operators)

| Operator	  | Description
| :---------: |:-------------- |
| ==	        | 동등비교 (loose equality) 형변환 후, 비교한다.
| ===	        | 일치비교 (strict equality) 타입까지 일치하여야 true를 반환한다.
| !=	        | 부등비교
| !==	        | 불일치비교
| >	          | 관계비교
| <	          | 관계비교
| >=	        | 관계비교
| <=	        | 관계비교
| ?	          | 삼항 연산자

```javascript
var x = 5

x == 5    // true
x == '5'  // true
x == 8    // false

x === 5   // true
x === '5' // false

x != 8    // true
x != 5    // false
x != '5'  // false

x !== 8   // true
x !== 5   // false
x !== '5' // true

x > 0     // true
x > 5     // false
x > 8     // false

x < 0     // false
x < 5     // false
x < 8     // true

x >= 0    // true
x >= 5    // true
x >= 8    // false

x <= 0    // false
x <= 5    // true
x <= 8    // true

// 삼항연산자(ternary operator)
// 조건 ? 조건이 ture일때 반환할 값 : 조건이 false일때 반환할 값
var condition = true;
var result = condition ? 'true' : 'false';
console.log(result); // 'true'

// id의 길이가 INPUT_ID_MIN_LEN보다 작으면 에러 메시지를 출력한다.
var id = 'lee';
var INPUT_ID_MIN_LEN = 5;
var errMsg = id.length < INPUT_ID_MIN_LEN ? '아이디는 5자리 이상으로 입력하세요' : '성공';
console.log(errMsg); // '아이디는 5자리 이상으로 입력하세요'
```

# 4. 논리 연산자 (Logical Operators)

논리 연산자는 Boolean 값과 함께 사용하여 Boolean 값을 반환하는 것이 일반적이다. 사실 논리 연산자는 피연산자 중 하나를 반환한다.

| Operator	  | Description
| :---------: |:-------------:|
| &#124;&#124;| or
| &&	        | and
| !	          | not

```javascript
// || (논리 합) 연산자
var o1 =  true || true;     // t || t returns true
var o2 = false || true;     // f || t returns true
var o3 =  true || false;    // t || f returns true
var o4 = false || (3 == 4); // f || f returns false

// && (논리곱) 연산자
var a1 =  true && true;     // t && t returns true
var a2 =  true && false;    // t && f returns false
var a3 = false && true;     // f && t returns false
var a4 = false && (3 == 4); // f && f returns false

// ! (논리 부정) 연산자
var n1 = !true;  // false
var n2 = !false; // true
var n3 = !'Cat'; // false
```

# 5. 단축 평가 (Short-Circuit Evaluation)

논리연산자가 Boolean 값과 함께 사용되지 않을 경우, Boolean 값을 반환하지 않을 수 있다. 이는 논리 연산자가 피연산자 중 하나를 반환하기 때문이다. 논리연산자는 다음의 규칙을 따라서 "단축 평가"로 검사된다.

| 평가식                 | 평가 결과        |
| :-------------------: | :------------- |
| true  &#124;&#124; anything     | true
| false &#124;&#124; anything     | anything
| true  && anything     | anything
| false && anything     | false

Boolean값으로 평가하기 위해 참조하여야 할 곳까지 진행한 후, 평가를 중지하게된 계기가 된 값을 반환한다.

```javascript
var foo = 'Cat' && 'Dog'  // t && t returns 'Dog'
```

이 경우, 'Cat' 은 `true`로 평가되므로 연산 결과를 알기 위해서는 'Dog'까지 평가해 보아야 한다. 따라서 평가를 중지하게된 계기가 된 값('Dog')을 반환한다.

```javascript
var foo = false && 'Cat'  // f && t returns false
```

이 경우, `false`가 처음 등장하였다. 더 이상 진행하지 않아도 결과를 반환할 수 있으므로 평가는 중지되고 평가를 중지하게된 계기가 된 값인 `false`가 반환된다

```javascript
var foo = 'Cat' || 'Dog'  // t || t returns 'Cat'
```

이 경우, 'Cat'은 `true`로 평가되므로 평가는 중지되고 `Cat`이 반환된다.

```javascript
// || (논리 합) 연산자
var o1 = 'Cat' || 'Dog';    // t || t returns Cat
var o2 = false || 'Cat';    // f || t returns Cat
var o3 = 'Cat' || false;    // t || f returns Cat

// && (논리곱) 연산자
var a1 = 'Cat' && 'Dog';    // t && t returns Dog
var a2 = false && 'Cat';    // f && t returns false
var a3 = 'Cat' && false;    // t && f returns false

// example
function foo (str) {
  str = str || '';
  // do somethig with str
  console.log(str.length);
}

foo();     // 0
foo('hi'); // 2

// example
var obj = {
  // foo: 'hi',
  bar: 'hey'
};

console.log('obj.foo is ' + obj.foo); // obj.foo is undefined

if (obj && obj.foo) {
  // do somethig with obj.foo
  console.log('obj.foo is ' + obj.foo);
}
```

# 6. 타입 연산자 (Type Operators)

| Operator	  | Description
| :---------: |:-------------- |
| typeof	    | 피연산자의 데이터 타입(자료형)을 문자열로 반환한다. null과 배열의 경우 object, 함수의 경우 function를 반환하는 것에 유의하여야 한다.
| instanceof	| 객체가 동일 객체형의 인스턴스이면 `true`를 반환한다.

```javascript
console.log(typeof 'John');                 // string
console.log(typeof 3.14);                   // number
console.log(typeof NaN);                    // number
console.log(typeof false);                  // boolean
console.log(typeof [1, 2, 3, 4]);           // object
console.log(typeof {name:'John', age:34});  // object
console.log(typeof new Date());             // object
console.log(typeof function () {});         // function
console.log(typeof myCar);                  // undefined (설계적 결함)
console.log(typeof null);                   // object (설계적 결함)

function Person() {}
var me = new Person();
console.log(me instanceof Person); // true
```

# 7. !!

`!!`의 역할은 피연산자를 불린값으로 변환하는 것이다.

```javascript
console.log(!!1);         // true
console.log(!!0);         // false
console.log(!!'string');  // true
console.log(!!'');        // false
console.log(!!null);      // false
console.log(!!undefined); // false
console.log(!!{});        // true
console.log(!![]);        // true
```

객체(배열 포함)의 경우 빈 객체라도 존재하기만하면 true로 변환된다.

객체의 존재 확인 후 그 결과를 반환해야 하는 경우, !!를 사용하면 강제로 피연산자를 boolean으로 형 변환 할 수 있다.

```javascript
var obj;
console.log(!!obj); // false

obj = {};
console.log(!!obj); // true
```
