---
layout: post
title: <strong>Operator</strong>
subtitle: 연산자
categories: javascript
section: javascript
description: 연산자(Operator)는 하나 혹은 그 이상의 값을 하나의 값으로 만들 때 사용한다.
---

* TOC
{:toc}

표현식(Expression)은 값(리터럴), 변수, 객체의 프로퍼티, 배열의 요소, 함수 호출, 메소드 호출, 연산자의 조합을 말한다.

```javascript
// 표현식
10
sum
person.name
arr[1]
square()
person.getBirthday()
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

이처럼 **연산자(Operator)는 하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입 연산 등을 수행하여 하나의 값을 만든다.** 이때 연산의 대상을 피연산자(Operand)라 한다. 표현식이 명사의 역할을 한다면 연산자는 동사의 역할을 한다고 볼 수 있다.

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

res = x++; // 5 선대입후증가
res = ++x; // 7 선증가후대입
res = x--; // 7 선대입후감소
res = --x; // 5 선감소후대입

+x; // 5
-x; // -5
```

`+ 연산자`는 경우에 따라 덧셈 연산과 문자열 연결 연산을 수행한다.

- 피연산자가 모두 숫자인 경우 : 덧셈 연산자로 동작
- 그 외의 경우 : 문자열 연결 연산자로 동작

```javascript
5 + 5         // 10
'5' + 5;      // '55'
5 + '5';      // '55'
'Hello' + 5;  // 'Hello5'
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

비교 연산자(Comparison Operator)는 우항의 값과 좌항의 값을 비교하여 불리언 값을 반환한다. if 문이나 for 문과 같은 제어문의 조건식에서 주로 사용되며 부수 효과는 없다.

| 비교 연산자	   | 의미
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

# 4. 논리 연산자

논리 연산자(Logical Operator)는 우항과 좌항의 불리언 값을 피연산자로 사용하여 논리 연산을 수행하여 불리언 값을 반환하는 것이 일반적이다. 일반적이라고 표현한 것은 반드시 불리언 값을 반환하지 않을 수 있다는 것이다. 이에 대해서는 다음의 "단축 평가"에서 설명하기로 하고 지금은 일반적인 논리 연산자에 알아보도록 하자.

| 논리 연산자	   | 의미
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

# 5. 단축 평가

**논리 연산자는 사실 피연산자 중 하나를 반환한다.** 따라서 논리 연산자가 피연산자가 불리언 값이 아닌 경우, 피연산자의 값을 그대로 반환한다. 논리 연산자는 다음의 규칙을 따라서 "단축 평가(Short-Circuit Evaluation)"된다.

| 평가식                 | 평가 결과        |
| :-------------------: | :------------- |
| true  &#124;&#124; anything     | true
| false &#124;&#124; anything     | anything
| true  && anything     | anything
| false && anything     | false

불리언 값으로 평가하기 위해 참조하여야 할 곳까지 진행한 후, 평가를 중지하게된 계기가 된 값을 반환한다.

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

# 6. 타입 연산자

타입 연산자(Type Operator)는 데이터 타입을 반환하거나 객체의 종류를 반환한다.

| 타입 연산자 	 | 의미
| :---------: |:-------------- |
| typeof	    | 피연산자의 데이터 타입(자료형)을 문자열로 반환한다. null과 배열의 경우 object, 함수의 경우 function를 반환하는 것에 유의하여야 한다.
| instanceof	| 객체가 동일 객체형의 인스턴스이면 `true`를 반환한다.

```javascript
console.log(typeof '');              // string
console.log(typeof 1);               // number
console.log(typeof NaN);             // number
console.log(typeof true);            // boolean
console.log(typeof []);              // object
console.log(typeof {});              // object
console.log(typeof new Date());      // object
console.log(typeof /test/gi);        // object
console.log(typeof function () {});  // function
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object (설계적 결함)
console.log(typeof undeclared);      // undefined (설계적 결함)

function Person() {}
var me = new Person();
console.log(me instanceof Person); // true
```

# 7. !!

부정 연산자 `!`를 두번 언이어 사용하면 피연산자를 불리언 타입으로 변경하고 두번 부정 연산을 실행한다. 따라서 `!!`는 피연산자를 불리언 타입의 값으로 타입 변환하는 역할을 한다.

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

객체의 존재 확인 후 그 결과를 반환해야 하는 경우, !!를 사용하면 강제로 피연산자를 불리언으로 형 변환할 수 있다.

```javascript
var obj;
console.log(!!obj); // false

obj = {};
console.log(!!obj); // true
```
