---
layout: post
title: Javascript Operator
---

# 산술 연산자 (Arithmetic Operators)

| Operator	  | Description   |
| :---------: |:------------- |
| +	          | 덧셈
| -	          | 뺄셈
| *	          | 곱셈
| /	          | 나눗셈
| %	          | 나머지
| ++	        | 증가
| --	        | 감소

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
```

##대입 연산자 (Assignment Operators)

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

var txt1 = "Good";
var txt2 = "Morning";
var txt3 = txt1 + " " + txt2; // Good Morning

txt1 = "What a very ";
txt1 += "nice day"; // What a very nice day

var x = 5 + 5;        // 10
var y = "5" + 5;      // '55'
var z = "Hello" + 5;  // 'Hello5'
```

#비교 연산자 (Comparison Operators)

| Operator	  | Description
| :---------: |:-------------- |
| ==	        | 동등비교 (loose equality)
| ===	        | 일치비교 (strict equality)
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

//삼항연산자(ternary operator)
var now = new Date();
var greeting = "Good" + ((now.getHours() > 17) ? " evening." : " day.");
```

#논리 연산자 (Logical Operators)

| Operator	  | Description
| :---------: |:-------------:|
| &&	        | and
| ||	        | or
| !	          | not

```javascript
// && (논리곱) 연산자
var a1 =  true && true;     // t && t returns true
var a2 =  true && false;    // t && f returns false
var a3 = false && true;     // f && t returns false
var a4 = false && (3 == 4); // f && f returns false
var a5 = "Cat" && "Dog";    // t && t returns Dog
var a6 = false && "Cat";    // f && t returns false
var a7 = "Cat" && false;    // t && f returns false

// || (논리 합) 연산자
var o1 =  true || true;     // t || t returns true
var o2 = false || true;     // f || t returns true
var o3 =  true || false;    // t || f returns true
var o4 = false || (3 == 4); // f || f returns false
var o5 = "Cat" || "Dog";    // t || t returns Cat
var o6 = false || "Cat";    // f || t returns Cat
var o7 = "Cat" || false;    // t || f returns Cat

// ! (논리 부정) 연산자
var n1 = !true;  // false
var n2 = !false; // true
var n3 = !"Cat"; // false
```

#타입 연산자(Type Operators)

| Operator	  | Description
| :---------: |:-------------- |
| `typeof`	    | 변수의 자료형을 반환한다.
| `instanceof`	| 객체가 동일 객체형의 인스턴스이면 `true`를 반환한다.

```javascript
typeof "John"                 // returns string
typeof 3.14                   // returns number
typeof NaN                    // returns number
typeof false                  // returns boolean
typeof [1, 2, 3, 4]           // returns object
typeof {name:'John', age:34}  // returns object
typeof new Date()             // returns object
typeof function () {}         // returns function
typeof myCar                  // returns undefined (if myCar is not declared)
typeof null                   // returns object


function Person(){}
var me = new Person()
me instanceof Person // true
```

#Evaluating variable
초기화되지 않은 변수는 `undefined` 값을 갖게 된다. 미선언 변수에 접근하면 `ReferenceError` 예외가 발생한다.

```javascript
var x;
console.log("The value of x is " + x); // logs "The value of a is undefined"
console.log("The value of y is " + y); // throws ReferenceError exception
```

`undefined`은 boolean context에서 사용되면 `false`가 된다. (비어있는 문자열과 `null`, `undefined`, 숫자 0은 `false`로 간주된다.)

```javascript
var name;
if (!name) console.log(name); // undefined
```

`undefined`은 numeric context에서 사용되면 `NaN`(Not a Number)으로 변환된다.

```javascript
var x;
console.log(x + 2); // NaN
```

`null`은 numeric context에서 사용되면 0이 되며, boolean context에서 사용되면 `false`가 된다.  

```javascript
var x = null;
console.log(x * 2); // 0

if (!x) console.log(x); // null
```

#단축 평가 (Short-Circuit Evaluation)
논리 연산자가 왼쪽에서 오른쪽으로 평가될때, 논리연산자는 다음의 규칙을 따라서 "단축 평가"로 검사된다.

| 평가식                  | 평가 결과        |
| :-------------------: | :------------- |
| `true  \|\| anything`   | `true`
| `false \|\| anything`   | `anything`
| `true  && anything`   | `anything`
| `false && anything`   | `false`

Boolean값으로 평가하기 위해 참조하여야 할 곳까지 진행하여 평가가 중지하게된 계기가 된 값을 리턴한다.

```javascript
var foo = "Cat" && "Dog"  // t && t returns "Dog"
```

이 경우, "Cat" 은 `true`로 평가되므로 "Dog"까지 평가해 보아야 한다. 평가가 중지하게된 계기가 된 값("Dog")을 리턴한다.

```javascript
var foo = false && "Cat"  // f && t returns false
```

이 경우, `false`가 처음 등장했으므로 평가는 중지되고 `false`가 리턴된다

```javascript
var foo = "Cat" || "Dog"  // t || t returns "Cat"
```

이 경우, "Cat" 은 `true`로 평가 되므로 평가는 중지되고 `true`가 리턴된다.
