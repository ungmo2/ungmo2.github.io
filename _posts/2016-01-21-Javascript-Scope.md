---
layout: post
title: Javascript Scope
categories: javascript
tags: []
---

Scope란 변수(매개변수 포함)에의 접근성과 생존기간(life-cycle)을 의미한다.

Scope의 종류는 다음과 같다.

- 전역 Scope (Global scope)
- 지역 Scope (Local scope or Function-level scope)

전역 Scope를 갖는 변수를 전역 변수(Global variable), 지역 Scope를 갖는 변수를 지역 변수(Local variable)이라 한다.

- C-family language 대부분은 `block-level scope`를 사용하지만 Javascript는 `function-level scope`를 사용한다.  

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
  
- 즉, 함수 내에서 정의된 매개변수와 변수는 함수 외부에서는 유효하지 않다.
- 단, ECMAScript 6에서 도입된 `let` keyword를 사용하면 `block-level scope`를 사용할 수 있다.

#Global scope

```javascript
var x = 'global'; // Global scope

function foo(){
  console.log(x);
}

foo();
```

변수 x는 함수 영역 밖에서 선언되었다. 함수 영역 밖에서 선언된 변수는 모두 global scope을 갖게된다. 따라서 변수 x는 전역 변수이다. 전역 변수는 어느 곳에서든지 참조할 수 있다.

#Non block-level scope

```javascript
if (true) {
  var x = 5; // The scope is inside the if-block
}
console.log(x);
```

변수 x는 코드 블럭 내에서 선언되었다. 하지만 JavaScript는 block-level scope를 사용하지 않으므로 function 밖에서 선언된 변수는 모두 global scope을 갖게된다. 따라서 변수 x는 전역 변수이다.

#Function scope

```javascript
var a = 10;     // variable of the global context

(function () {
  var b = 20;   // local variable of the function context
})();

console.log(a); // 10
console.log(b); // "b" is not defined
```

Javascript는 function-level scope를 사용한다. 즉 함수 내에서 선언된 매개변수와 변수는 함수 외부에서는 유효하지 않다. 따라서 변수 b는 지역 변수이다.

```javascript
var x = 'global'; // Global scope

function foo(){
  var x = 'local';  // Local scope
  console.log(x);
}

foo();
console.log(x); // ?
```

전역변수 x와 지역변수 x가 중복 선언되었다. 전역 영역에서는 전역변수만이 참조 가능하고 함수 내 지역 영역에서는 전역과 지역 변수 모두 참조 가능하나 위 예제와 같이 변수명이 중복된 경우, 지역변수를 우선하여 참조한다.

```javascript
var x = 'global'; // Global scope

function foo(){
  var x = 'local';  // Local scope
  console.log(x);

  function bar(){ // 내부함수
    console.log(x); // ?
  }

  bar();
}
foo();
console.log(x); // ?
```

내부함수는 자신을 포함하고 있는 외부함수의 변수에 접근할 수 있다. 이는 매우 유용하다. 클로저에서와 같이 내부함수가 더 오래 생존하는 경우, 타 언어와는 다른 움직임을 보인다.


```javascript
var x = 10; // Global scope

function foo(){
  x = 100;
  console.log(x);
}
foo();
console.log(x); // ?
```

함수(지역) 영역에서 전역 변수의 값을 변경할 수 있다.

```javascript
var x = 10; // Global scope

function foo(){
  var x = 100;  // Local scope
  console.log(x);

  function bar(){ // 내부함수
    x = 1000;
    console.log(x); // ?
  }

  bar();
}
foo();
console.log(x); // ?
```

중첩 scope는 가장 인접한 지역을 우선하여 참조한다.

```javascript
var foo = function ( ) {

  var a = 3, b = 5;

  var bar = function ( ) {
    var b = 7, c = 11;

// 이 시점에서 a는 3, b는 7, c는 11

    a += b + c;

// 이 시점에서 a는 21, b는 7, c는 11

  };

// 이 시점에서 a는 3, b는 5, c는 not defined

  bar( );

// 이 시점에서 a는 21, b는 5

};
```

#암묵적 전역 (implied globals)

foo 함수 내의 변수 x는 var keyword를 사용하지 않고 선언되었다. `var` keyword를 사용하지 않고 선언된 변수는 암묵적으로 전역변수가 된다.

```javascript
function foo() {
  x = 1;   // Throws a ReferenceError in strict mode
  var y = 2;
}

foo();

console.log(x); // logs "1"
console.log(y); // Throws a ReferenceError
```

의도하지 않게 전역변수가 되었다면 혼란의 여지가 있으므로 `var` keyword는 반드시 사용하자.

#Hoisting

JavaScript는 선언문을 모두 호이스트(Hoist)한다. 호이스트란 var 구문이나 function 선언문을 해당 스코프의 맨 위로 옮기는 것을 말한다. 코드를 실행하기 전에 JavaScript는 var 구문과 function 선언문을 해당 스코프의 맨위로 옮긴다.

```javascript
console.log(x); // ReferenceError ??
x = 3;          // 할당문은 Hoisting하지 않는다.
var x;
console.log(x);
```

함수선언식으로 정의된 함수는 자바스크립트 인터프리터가 스크립트가 로딩되는 시점에 바로 초기화하고 이를 VO(variable object)에 저장한다 (Excute Context 참고).
그렇기 때문에 함수 선언의 위치와는 상관없이 소스 내 어느 곳에서든지 호출이 가능하다.

```javascript
var res = square(5);

function square(number) {
  return number * number;
}
```

함수표현식은 함수선언식과는 달리 스크립트 로딩 시점에 VO에 함수를 저장하지 않고 runtime시에 해석되고 실행되므로 이 두가지를 구분하는 것은 중요하다.

```javascript
var res = square(5); // TypeError: square is not a function

var square = function(number) {
  return number * number;
}
```

#Lexical scoping (Static scoping)
자바스크립트는 함수가 선언된 시점에서의 유효범위를 갖는다. 예제의 함수 bar가 어떤 상황에서 호출될 지 선언 시점에서는 알 수 없다.

```javascript
var i = 5;

function foo() {
  var i = 10;
  bar();
}

function bar() { // 선언된 시점에서의 scope를 갖는다!
  console.log(i);
}

foo(); // ?
```

#변수명의 중복
```javascript
// script A
function foo (){
  // var i = 0;
  i = 0;
  // ...
}

// script B
for(var i = 0; i < 5; i++){
  foo();
  console.log(i);
}
```

***전역변수를 반드시 사용하여야 할 이유를 찾지 못한다면 지역변수를 사용하여야 한다.***

- 코드가 길어지면 변수명의 중복이 발생하기 쉬워 예기치 못한 이상의 원인이 되기 쉽다.
- 전역변수는 지역변수보다 탐색에 걸리는 시간이 더 길다.(속도면에서 그리 큰 차이는 없지만 분명히 느리다.)

#최소한의 전역변수 사용
더글라스 크락포드의 제안:  
전역변수 사용을 최소화하는 방법 한가지는 애플리케이션에세 전역변수 사용을 위해 다음과 같이 전역변수 하나를 만들어 사용하는 것이다.

```javascript
var MYAPP = {};

MYAPP.stooge = {
  "first-name": "Joe",
  "last-name": "Howard"
};

MYAPP.flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
  }
};
```

#즉시실행함수를 이용한 전역변수 사용 억제
전역변수 사용을 억제하기 위해, 즉시 실행 함수(IIFE, Immediately-Invoked Function Expression)를 사용할 수 있다. 이 방법을 사용하면 전역변수를 만들지 않으므로 라이브러리 등에 자주 사용된다. 즉시 실행 함수는 즉시 실행되고 그 후 전역스페이스에서 바로 사라진다.

```javascript
(function(){
  var MYAPP = {}; // var를 생략하면 전역변수가 된다.

  MYAPP.stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
  };

  MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
      IATA: "SYD",
      time: "2004-09-22 14:55",
      city: "Sydney"
    },
    arrival: {
      IATA: "LAX",
      time: "2004-09-23 10:42",
      city: "Los Angeles"
    }
  };
}());

console.log(MYAPP);
```

#Reference  
* [JavaScript : The Good Parts 03.Object -by Douglas Crockford](http://www.yes24.com/24/goods/3071412?scode=032&OzSrank=1)
