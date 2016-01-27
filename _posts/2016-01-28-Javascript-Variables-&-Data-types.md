---
layout: post
title: Javascript Variables & Data types
---

#Variables
어플리케이션에서 값(value)을 유지할 필요가 있을 때 변수를 사용한다.  

변수는 값을 저장, 조회, 조작하는 데 사용되며 다른 사용자가 변수가 수행하는 작업을 쉽게 이해할 수 있도록 의미있는 이름을 지정하여야한다.

변수명은 identifier(식별자)로 불리기도 하며 명명 규칙이 존재한다.
* 반드시 문자(특수문자 제외), underscore ( _ ), 또는 달러 기호($)로 시작하여야 한다. 이어지는 문자에는 숫자(0~9)도 사용할 수 있다.
* JavaScript는 대/소문자를 구별하므로 사용할 수 있는 문자는 "A" ~ "Z" (대문자)와 "a" ~ "z" (소문자)이다.

변수를 선언할 때 `var` keyword가 사용된다. 등호(=, equal sign)는 변수에 값을 할당하기 위해 사용된다.

```javascript
var name;     // 변수 name 선언
name = 'Lee'; // 변수 name에 값 'Lee'가 저장(할당)되었다.

var age = 30; // 선언과 할당

var person = "John Doe",
    carName = "Volvo",
    price = 200;

var price1 = 5;
var price2 = 6;
var total = price1 + price2;
```

초기화되지 않은 변수는 `undefined` 값을 갖게 된다. 미선언 변수에 접근하면 `ReferenceError` 예외가 발생한다.

```javascript
var x;
console.log(x); // logs "undefined"
console.log(y); // throws ReferenceError exception
```

#Data Types
최신 ECMAScript 표준(ECMAScript 2015 (6th Edition, ECMA-262) / 2015.06)은 7개의 data type을 정의한다
* 기본 자료형 (primitive data type)
  * `Boolean`
  * `null`
  * `undefined`
  * `Number`
  * `String`
  * `Symbol` (New in ECMAScript 6)
* `Object`

##Primitive Data Type (기본자료형)
기본자료형(Primitive data type)의 값은 변경 불가능한 값 (immutable value)이다. 또한 이들은 pass-by-value이다.

###Boolean
논리적인 요소를 나타내며 `true`와 `false` 두가지 값을 가질 수 있다. 비어있는 문자열과 `null`, `undefined`, 숫자 0은 `false`로 간주된다.

```javascript
var foo = true;
var bar = false;
```

###null
null 타입은 딱 한 가지 값, `null` 을 가질 수 있다. JavaScript는 case-sensitive하므로 `null`은 Null, NULL등과 다르다.

Computer science에서 `null`은 의도적으로 기본형(primitives)과 object에 값이 없다는 것을 명시한 것이다. 따라서 값이 없는 변수의 초기화 시 `null`을 사용한다.

```javascript
var foo = 'Lee';
foo = null;  // 값 또는 참조 정보가 제거됨
```

###undefined
값을 할당하지 않은 변수는 `undefined` 값을 가진다. 즉, 선언은 되었지만 할당된 적이 없는 변수에 접근하거나 존재하지 않는 객체 프로퍼티에 접근할 경우 반환된다.

```javascript
var foo;
console.log(foo); // undefined
```

###Number
ECMAScript 표준에 따르면, 숫자의 자료형은 배정밀도 64비트 부동 소수점 형 (double-precision 64-bit floating-point format : -(2<sup>53</sup> -1) 와 2<sup>53</sup> -1 사이의 숫자값) 단 하나만 존재한다. 정수만을 표현하기 위한 특별한 자료형(integer type)은 없다.

추가적으로 세가지 의미있는 기호적인 값들도 표현할 수 있다.
* `+/-` Infinity
* `NaN` (not-a-number)

```javascript
var x = 10;
var y = 10.12;
var z = -20;

var foo = 1 * 'string';
console.log(foo);  // NaN
```

###String
String 타입은 텍스트 데이터를 나타내는데 사용한다. 이는 0개 또는 그 이상의 유니코드(16비트 부호없는 정수 값) 문자들의 집합이다.

C와 같은 언어와는 다르게, 자바스크립트의 문자열은 변경 불가능 (immutable) 하다.

이것은 한 번 문자열이 생성되면, 그 문자열을 변경할 수 없다는걸 의미한다.
그러나 원래 문자열에서 일부가 수정된 다른 문자열을 만드는건 가능하다. 예를 들면
* 원래 문자열에서 각각의 글자를 추출하거나 String.substr()을 사용해서 만든 부분 문자열
* 접합 연산자 (+) 나 String.concat() 으로 두 문자열을 합친 문자열

```javascript
var name = "John Doe";   // Using double quotes
var name = 'John Doe';   // Using single quotes

var answer = "It's alright";          // Single quote inside double quotes
var answer = "He is called 'Johnny'"; // Single quotes inside double quotes
var answer = 'He is called "Johnny"'; // Double quotes inside single quotes
```

###Symbol
ECMAScript 6 에서 추가되었다. Symbol은 유일하고 변경 불가능한 (immutable) 기본값 (primitive value) 이다. 또한, 객체 속성의 key 값으로도 사용될 수 있다. 몇몇 프로그래밍 언어에서는 Symbol을 atom 이라고 부른다. C 언어의 이름있는 열거형 (enum) 과도 비슷하다.

###Object
6가지 기본자료형을 제외한 나머지는 모두 객체이다.

* 함수 (Function)
* 배열 (Array)
* 날짜 (Date)
* 정규식 (RegExp)

이것들은 모두 객체이다. 또한 객체는 pass-by-reference이다

##Dynamic Type
C-family language은 변수의 data type(자료형)을 미리 선언하고 data type에 맞는 값을 대입하여야한다. (statically typed languages)

```c
int main(void) {
  int num = 46;
  char * str = "String";

  num = "String"; // warning: incompatible pointer to integer conversion assigning to 'int' from 'char [7]'

  return 0;
}
```

Javascript는 느슨한 타입(loosely typed) 언어 혹은 동적(dynamic typed) 언어이다. 이것은 변수의 data type을 미리 선언할 필요없이 값이 할당되는 과정에서 자동으로 data type이 결정될 것이라는 뜻이다. 따라서 같은 변수에 여러 data type의 값을 대입할 수 있다.

```javascript
var foo = 3;                 // Number
foo = "Hi there";            // String
foo = true;                  // Boolean
foo = "The answer is " + 42; // "The answer is 42“
foo = "37" - 7;              // 30
foo = "37" + 7;              // "377"
```

##Immutability in JavaScript
Immutability (변경불가성)은 함수형 프로그래밍의 핵심 원리이다. 뿐만 아니라, 객체 지향 프로그램을 위한 기능을 제공하고 있다

`object` type을 제외한 모든 data type은 한번 정해지면 변경이 불가능한 값 (immutable value)이다.
C 언어와는 다르게도, 문자열은 변경 불가능한 값 (immutable) 이다. 이런 값을 "primitive values" 라 한다. 
(변경이 불가능하다는 뜻은 메모리 영역에서의 변경이 불가능하다는 뜻이다. 재할당은 가능하다)

```javascript
var statement = "I am an immutable value"; // String is an immutable value
var otherStr = statement.slice(8, 17);     // “immutable”
console.log(statement);                    
```

2행에서 Stirng객체의 slice 메서드는 statement 변수에 저장된 문자열을 변경하는 것이 아니라 사실은 새로운 문자열을 생성하여 반환하고 있다.
그 이유는 문자열은 변경할 수 없는 immutable value이기 때문이다.

```javascript
var arr = [];
var v2 = arr.push(2);
```

상기 예제에서 v2의 값은 무엇인가? 문자열의 예와 같이 배열이 동작한다면 v2는 새로운 배열(하나의 요소를 가지고 그 값은 2인)을 가지게 될 것이다. 그러나 객체인 arr은 push 메서드에 의해 update되고 v2에는 배열의 새로운 `length` 값이 반환된다. (Passing by Reference)


#Variable scope
Scope란 변수(매개변수 포함)에의 접근성과 생존기간(life-cycle)을 의미한다.

C-family language 대부분은 `block-scope`를 사용하지만 Javascript는 `function scope`를 사용한다.

변수를 함수 밖에서 선언하면 `전역변수(Global variable)`가 된다. 전역변수는 어니 곳에서든지 접근이 가능하다.

함수 내부에서 선언된 변수는 함수 내부에서만 접근이 가능하다. 이런 변수를 `지역변수(Local variable)`이라한다.

```c
int main(void) {
  // block-scope
  if (1) {
    int x = 5;
    printf("x = %d\n", x);
  }

  printf("x = %d\n", x); // use of undeclared identifier 'x'

  return 0;
}
```

```javascript
// non-block-scope
if (true) {
  var x = 5;
}
console.log(x);
```

```javascript
// Function-scope
var x = 1; // global variable

function foo() {
  x = 2;
  y = 3;  // 암묵적 전역
  var z = 4;  // local variable
}

foo();

console.log(x); // logs "2"
console.log(y); // logs "3"
console.log(z); // Throws a ReferenceError
```
