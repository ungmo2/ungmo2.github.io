---
layout: post
title: Javascript <strong>Data type & Variable</strong>
subtitle: 자료형과 변수
categories: javascript
section: javascript
---

* TOC
{:toc}

# 1. Data Type (자료형)

모든 프로그래밍 언어의 학습은 Data Type(자료형)을 파악하는 것으로부터 시작된다.

자료형은 프로그래밍 언어에서 객체, 정수, 불린 등 여러 종류의 데이터를 식별하는 분류를 말한다. 최신 ECMAScript 표준(ECMAScript 2015 (6th Edition, ECMA-262) / 2015.06)은 7개의 data type을 정의한다

* 기본 자료형 (primitive data type)
  * `Boolean`
  * `null`
  * `undefined`
  * `Number`
  * `String`
  * `Symbol` (New in ECMAScript 6)
* `Object`

Javascript의 자료형은 크게 기본 자료형(primitive data type)과 Object(객체형, 참조형)으로 구분할 수 있다.

## 1.1 Primitive Data Type (기본자료형)

기본자료형(Primitive data type)의 값은 변경 불가능한 값(immutable value)이다. 또한 이들은 **[pass-by-value](./js-object.html#pass-by-value)** 이다.

### 1.1.1 Boolean

논리적인 요소를 나타내며 `true`와 `false` 두가지 값을 가질 수 있다. 비어있는 문자열과 `null`, `undefined`, 숫자 0은 `false`로 간주된다.

```javascript
var foo = true;
var bar = false;
```

### 1.1.2 null

null 타입은 딱 한 가지 값, `null` 을 가질 수 있다. JavaScript는 case-sensitive하므로 `null`은 Null, NULL등과 다르다.

Computer science에서 `null`은 의도적으로 기본형(primitives) 또는 object형 변수에 값이 없다는 것을 명시한 것이다.

```javascript
var foo = 'Lee';
foo = null;  // 값 또는 참조 정보가 제거됨
```

주의할 것은 데이터 형식을 나타내는 문자열을 반환하는 typeof 연산자로 null값은 가진 변수를 연산해 보면 null이 아닌 object가 나온다. 이는 설계상의 문제이다.

```javascript
var foo  = null;
console.log(typeof foo); // object
```

따라서 null 타입 변수인지 확인할 때 typeof 연산자를 사용하면 안되고 일치 연산자(===)를 사용하여야 한다.

```javascript
var foo  = null;
console.log(typeof foo === null); // false
console.log(foo === null);        // true
```

### 1.1.3 undefined

값을 할당하지 않은 변수는 `undefined` 값을 가진다. 즉, 선언은 되었지만 할당된 적이 없는 변수에 접근하거나 존재하지 않는 객체 프로퍼티에 접근할 경우 반환된다.

```javascript
var foo;
console.log(foo); // undefined

foo = {
  name: 'Lee',
  gender: 'male'
}
console.log(foo.bar); // undefined
```

### 1.1.4 Number

C 언어의 경우, 정수형과 실수형을 구분하여 int, long, float, double 등과 같은 다양한 숫자 자료형이 존재한다. 하지만 자바스크립트는 하나의 숫자 자료형만 존재한다.

ECMAScript 표준에 따르면, 숫자 자료형은 배정밀도 64비트 부동 소수점 형 ([double-precision 64-bit floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) : -(2<sup>53</sup> -1) 와 2<sup>53</sup> -1 사이의 숫자값) 단 하나만 존재한다. 정수만을 표현하기 위한 특별한 자료형(integer type)은 없다.

추가적으로 세가지 의미있는 기호적인 값들도 표현할 수 있다.

* `+/- Infinity`
* `NaN` (not-a-number)

```javascript
var x = 10;    // 정수
var y = 10.12; // 실수
var z = -20;   // 음의 정수

var foo = 42 / -0;
console.log(foo);        // -Infinity
console.log(typeof foo); // number

var bar = 1 * 'string';
console.log(bar);        // NaN
console.log(typeof bar); // number
```

### 1.1.5 String

String(문자열) 타입은 텍스트 데이터를 나타내는데 사용한다. 이는 0개 또는 그 이상의 유니코드(16비트 부호없는 정수 값) 문자들의 집합이다. 문자열은 작은 따옴표('') 또는 큰 따옴표("") 안에 텍스트를 넣어 생성한다.

```javascript
var name = "John Doe";    // Using double quotes
    name = 'John Doe';    // Using single quotes
console.log(typeof name); // string

var answer = "It's alright";          // Single quote inside double quotes
    answer = "He is called 'Johnny'"; // Single quotes inside double quotes
    answer = 'He is called "Johnny"'; // Double quotes inside single quotes
```

C와 같은 언어와는 다르게, 자바스크립트의 문자열은 변경 불가능(immutable) 하다. 이것은 한 번 문자열이 생성되면, 그 문자열을 변경할 수 없다는걸 의미한다.

```javascript
var str = 'string';
console.log(str[0],str[1],str[2],str[3],str[4],str[5]);

str[0] = 'S';
console.log(str); // string
```

문자열은 배열처럼 인덱스를 통해 접근할 수 있다. str[0] = 'S'처럼 이미 생성된 문자열에 새로운 문자를 대입하여 변경시켜도 반영되지 않는다(이때 에러가 발생하지 않는다). 한번 생성된 문자열은 read only로서 수정은 불가하다. 이것을 변경 불가능(immutable)이라 한다.

그러나 새로운 문자열을 할당하는 것은 물론 가능하다. 이는 기존 문자열을 수정하는 것이 아닌 새로운 문자열을 할당하는 것이기 때문이다.

```javascript
var str = 'string';
console.log(str); // string

str = 'String';
console.log(str); // String

str += ' test';
console.log(str); // String test

str.substring(0, 3);
console.log(str); // Str

str = str.toUpperCase();
console.log(str); // STR
```

### 1.1.6 Symbol

ECMAScript 6(Javascript 2015) 에서 추가되었다. Symbol은 유일하고 변경 불가능한 (immutable) 기본값 (primitive value) 이다. 또한, 객체 속성의 key 값으로도 사용될 수 있다. 몇몇 프로그래밍 언어에서는 Symbol을 atom 이라고 부른다. C 언어의 이름있는 열거형 (enum) 과도 비슷하다.

## 1.2 Object (객체형, 참조형)

[객체](./js-object.html)는 데이터와 그 데이터에 관련되는 동작(절차,방법,기능)을 모두 포함할 수 있는 개념적 존재이다. 달리 말해, 이름과 값을 가지는 데이터를 의미하는 속성(property)와 동작을 의미하는 메서드(method)를 포함하고 있는 독립적 주체이다.

자바스크립트는 객체(object)기반의 스크립트 언어이며 자바스크립트를 이루고 있는 거의 “모든 것”은 객체이다. 기본자료형(Primitives)을 제외한 나머지 값들(배열, 함수, 정규표현식 등)은 모두 객체이다.

* 함수 (Function)
* 배열 (Array)
* 날짜 (Date)
* 정규식 (RegExp)

이것들은 모두 객체이다. 또한 객체는 <strong>pass-by-reference</strong>이다.

# 2. Variable (변수)

어플리케이션에서 값(value)을 유지할 필요가 있을 때 변수를 사용한다.  

변수는 값을 저장, 조회, 조작(변경)하는 데 사용되며 다른 사용자가 변수의 존재 목적을 쉽게 이해할 수 있도록 의미있는 이름을 지정하여야한다.

```javascript
var score = 100;  // OK
var x = 3;        // NG
```

변수명은 identifier(식별자)로 불리기도 하며 명명 규칙이 존재한다.

* 반드시 영문자(특수문자 제외), underscore ( _ ), 또는 달러 기호($)로 시작하여야 한다. 이어지는 문자에는 숫자(0~9)도 사용할 수 있다.  
* JavaScript는 대/소문자를 구별하므로 사용할 수 있는 문자는 "A" ~ "Z" (대문자)와 "a" ~ "z" (소문자)이다.

변수를 선언할 때 `var` keyword가 사용된다. 등호(=, equal sign)는 변수에 값을 할당하기 위해 사용된다.

```javascript
var name;     // 변수 name 선언
name = 'Lee'; // 변수 name에 값 'Lee'가 저장(할당)되었다.

var age = 30; // 선언과 할당

var person = "John Doe",
    carName = "Volvo",
    price = 200;

var price = 10;
var tax   = 1;
var total = price + tax;
```

초기화되지 않은 변수는 `undefined` 값을 갖게 된다. 미선언 변수에 접근하면 `ReferenceError` 예외가 발생한다.

```javascript
var x;
console.log(x); // logs "undefined"
console.log(y); // throws ReferenceError exception
```

# 3. Dynamic Type (동적 타입)

프로그래밍은 변수를 통해 값을 저장하고 참조하며 연산자로 값을 연산, 평가하고 조건문과 반복문에 의한 흐름제어로 데이터의 흐름을 제어하고 함수로 구문의 집합을 만들며 객체, 배열 등으로 자료를 구조화하는 것이다.

변수는 위치(주소)를 기억하는 저장소이다. 위치(주소)란 메모리 상의 주소(address)를 의미한다. 즉 변수란 메모리 주소(Memory address)에 접근하기 위해 사람이 이해할 수 있는 언어로 지정한 식별자(identifier)이다.

![memory_address](/img/memory_address.png)

변수(memory address에 접근하기 위한 식별자)를 통해 메모리에 값을 저장하기 위해서는 우선 필요한 저장 단위(byte)를 알아야한다. 이는 값의 종류(데이터의 종류 = 자료형)에 따라 필요한 메모리의 크기가 다르기 때문이다.

예를 들어 1byte로 표현할 수 있는 값의 총수는 256개(2<sup>8</sup>), 4byte로 표현할 수 있는 값의 총수는 4,294,967,296개(2<sup>32</sup>)이다.

C나 Java같은 언어는 변수 선언 시 변수에 저장할 값의 종류에 따라 사전에 자료형을 지정해 주어야 한다.

```c
int num; // 4byte 정수형
```

![int num](/img/int_num.png)

또한 자료형에 맞는 값을 대입(할당)하여야한다. (statically typed languages)

```c
int main(void) {
  int num = 46;
  char * str = "String";

  num = "String"; // warning: incompatible pointer to integer conversion assigning to 'int' from 'char [7]'

  return 0;
}
```

Javascript는 동적 타입(dynamic typed) 언어 혹은 느슨한 타입(loosely typed) 언어이다. 이것은 변수의 data type을 미리 선언할 필요없이 값이 할당되는 과정에서 자동으로 data type이 결정될 것이라는 뜻이다. 따라서 같은 변수에 여러 data type의 값을 대입할 수 있다.

```javascript
var foo;

console.log(typeof foo);  // undefined

foo = null;
console.log(typeof foo);  // object

foo = {};
console.log(typeof foo);  // object

foo = 3;
console.log(typeof foo);  // number
foo = 3.14;
console.log(typeof foo);  // number

foo = "Hi there";            
console.log(typeof foo);  // string

foo = true;                  
console.log(typeof foo);  // boolean
```
