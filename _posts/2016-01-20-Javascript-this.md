---
layout: post
title: Javascript this
categories: javascript
tags: []
---

* TOC
{:toc}

자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 인자값 이외에, [arguments 객체](http://ungmo2.github.io/javascript/Javascript-Function/#arguments-)와 `this`를 암묵적으로 전달 받는다.

```javascript
function square(number) {

  console.log(arguments);
  console.log(this);

  return number * number;
}

square();
```

자바스크립트의 `this` keyword는 Java와 같은 익숙한 언어의 개념과 달라 개발자에게 혼란을 준다. Java에서의 `this`는 자기자신(self)을 의미한다.

```java
public Class Person {

  private String firstName;
  private String lastName;

  public Person(String firstName, String lastName) {
  	this.firstName = firstName;
  	this.lastName = lastName;
  }
}
```

# 1. 함수 호출 패턴과 this 바인딩

자바스크립트의 경우 함수 호출 패턴에 따라 어떤 객체를 `this`에 바인딩할 지가 결정된다. 즉 함수 호출 패턴에 따라 this의 참조값이 달라진다.

함수 호출 패턴은 아래와 같다.

> 1. 메서드 호출 패턴(Method Invocation Pattern)
> 2. 함수 호출 패턴(Function Invocation Pattern)
> 3. 생성자 호출 패턴(Constructor Invocation Pattern)
> 4. apply 호출 패턴(Apply Invocation Pattern)

## 1.1 메서드 호출 패턴(Method Invocation Pattern)

함수가 객체의 속성이면 메서드 호출 패턴으로 호출된다. 이때 메서드 내부의 `this`는 해당 메서드를 소유한 객체 즉 해당 메서드를 호출한 객체를 바인딩한다.

<!--

```javascript
var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;	// this === myObject
  }
};

myObject.increment( );
console.log(myObject.value);

myObject.increment(2);
console.log(myObject.value);
```
 -->

```javascript
var obj1 = {
  name: 'Lee',
  sayName: function() {
    console.log(this.name);
  }
}

var obj2 = {
  name: 'Kim'
}

obj2.sayName = obj1.sayName;

obj1.sayName();
obj2.sayName();
```

![Method Invocation Pattern](/img/Method_Invocation_Pattern.png)
{: style="max-width:500px; margin:10px auto;"}

## 1.2 함수 호출 패턴(Function Invocation Pattern)

전역객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 `window`, Server-side(Node.js)에서는 `global` 객체를 의미한다.

```javascript
// in browser console
this === window // true

// in Terminal
node
this === global // true
```

전역객체는 전역 스코프(Global Scope)를 갖게 되며 전역변수(Global variable)를 속성으로 가지게 되며 글로벌 영역에 선언한 함수도 전역객체의 속성으로 접근할 수 있다.

```javascript
var ga = "Global variable";

console.log(ga);
console.log(window.ga);

function foo() {
  console.log("invoked!");
}
window.foo();
```

기본적으로 `this`는 전역객체(Global object)에 바인딩된다. 전역함수는 물론이고 심지어 내부함수의 경우도 `this`는 외부함수가 아닌 전역객체에 바인딩된다.

```javascript
function foo() {
  console.log("foo's this: ",  this);
  function bar() {
    console.log("bar's this: ", this);
  }
  bar();
}
foo();
```

또한 메서드의 내부함수일 경우에도 `this`는 전역객체에 바인딩된다.

```javascript
var value = 1;

var obj = {
  value: 100,
  foo: function() {
    console.log("foo's this: ",  this);  // obj
    console.log("foo's this.value: ",  this.value); // 100
    function bar() {
      console.log("bar's this: ",  this); // window
      console.log("bar's this.value: ", this.value); // 1
    }
    bar();
  }
}
obj.foo();
```

더글라스 크락포드는 "이것은 설계 단계의 결함으로 메서드가 내부함수를 사용하여 자신의 작업을 돕게 할 수 없다는 것을 의미한다" 라고 말한다. 내부함수의 `this`가 전역객체를 참조하는 것을 회피방법은 아래와 같다.

```javascript
var value = 1;

var obj = {
  value: 100,
  foo: function() {
    var that = this;  // Workaround : this === obj

    console.log("foo's this: ",  this);  // obj
    console.log("foo's this.value: ",  this.value); // 100
    function bar() {
      console.log("bar's this: ",  this); // window
      console.log("bar's this.value: ", this.value); // 1

      console.log("bar's that: ",  that); // obj
      console.log("bar's that.value: ", that.value); // 100
    }
    bar();
  }
}
obj.foo();
```

![Function Invocation Pattern](/img/Function_Invocation_Pattern.png)
{: style="max-width:600px; margin:10px auto;"}

메서드 호출 패턴이든 함수 호출 패턴이든 내부함수의 this는 모두 전역객체에 바인딩된다. 이러한 문제를 해소하기 위해 자바스크립트는 this 바인딩을 명시적으로 할 수 있는 call, apply 메서드를 제공한다.

<!--

```javascript
var myObject = {
  value: 3
}

var add = function (a, b) {
  return a + b;
};

// myObject에 double method 추가

myObject.double = function() {

  var that = this;	// Workaround : this === myObject

  var helper = function() {
    // 내부함수의 this는 전역객체에 바인딩된다.
    // console.log(this === global); // true
    that.value = add(that.value, that.value)
  };

  helper();    // Invoke helper as a function.
};

myObject.double();
console.log(myObject.value);    // 6
```
 -->

## 1.3 생성자 호출 패턴(Constructor Invocation Pattern)

자바스크립트의 생성자 함수는 말 그대로 객체를 생성하는 역할을 한다. 하지만 자바와 같은 객체지향 언어의 생성자 함수와는 다르게 그 형식이 정해져 있는 것이 아니라 기존 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다.

이는 반대로 생각하면 생성자 함수가 아닌 일반 함수에 new 연산자를 붙여 호출하면 생성자 함수처럼 동작할 수 있다. 따라서 일반적으로 생성자 함수명은 첫문자를 대문자로 기술하여 혼란을 방지하려는 노력을 한다.

new 연산자와 함께 생성자 함수를 호출하면 this 바인딩이 메서드나 함수 호출 때와는 다르게 동작한다.

### 1.3.1 생성자 함수 동작 방식

new 연산자와 함께 생성자 함수를 호출하면 다음과 같은 수순으로 동작한다.

1. 빈 객체 생성 및 this 바인딩
  생성자 함수의 코드가 실행되기 전 빈 객체가 생성된다. 이 빈 객체가 생성자 함수가 새로 생성하는 객체이며 this에 이 객체가 바인딩된다. 이후 생성자 함수 내에서 사용되는 this는 이 빈 객체를 가리킨다. 그리고 생성된 빈 객체는 생성자 함수의 prototype 프로퍼티가 가리키는 객테를 자신의 프로토타입 객체로 설정한다.

2. this를 통한 프로퍼티 생성
  this를 사용하여 생성된 빈 객체에 동적으로 프로퍼티나 메서드를 생성할 수 있다. this는 새로 생성된 객체를 가리키므로 this를 통해 생성한 프로퍼티와 메서드는 새로 생성된 객체에 추가된다.

3. 생성된 객체 반환

    - 반환문이 없는 경우, this에 바인딩된 새로 생성한 객체가 반환된다. 명시적으로 this를 반환하여도 결과는 같다.
    - 반환문이 this가 아닌 다른 객체를 반환하는 경우, this가 아닌 해당 객체가 반환된다.

```javascript
var Person = function(name) {
  // 생성자 함수 코드 실행 전 -------- 1
  this.name = name; // --------- 2
  // 생성된 함수 반환 -------------- 3
}

var me = new Person('Lee');
console.log(me.name);
```

![constructor](/img/constructor.png)
{: style="max-width:600px; margin:10px auto;"}


### 1.3.2 객체 리터럴 방식과 생성자 함수 방식의 차이

객체 리터럴 방식과 생성자 함수 방식의 차이를 비교해 보자.

```javascript
// 객체 리터럴 방식
var foo = {
  name: 'foo',
  gender: 'male'
}

console.dir(foo);

// 생성자 함수 방식
var Person = function(name, gender) {
  this.name = name;
  this.gender = gender;
}

var me  = new Person('Lee', 'male');
console.dir(me);

var you = new Person('Kim', 'female');
console.dir(you);
```

객체 리터럴 방식과 생성자 함수 방식의 차이는 [프로토타입 객체([[prototype]])](http://ungmo2.github.io/javascript/Javascript-Prototype/#prototype-chain)에 있다.

- 객체 리터럴 방식의 경우, 생성된 객체의 프로토타입 객체는 Object.prototype이다.

- 생성자 함수 방식의 경우, 생성된 객체의 프로토타입 객체는 Person.prototype이다.

### 1.3.3 생성자 함수에 new 연산자를 붙이지 않고 호출할 경우

일반함수와 생성자 함수에 특별한 형식적 차이는 없으며 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다.

그러나 객체 생성 목적으로 작성한 생성자 함수를 new 없이 호출하거나 일반함수에 new를 붙여 호출하면 오류가 발생할 수 있다. 일반함수와 생성자 함수의 호출 시 this 바인딩 방식이 다르기 때문이다.

일반 함수를 호출하면 this는 전역객체에 바인딩되지만 생성자 함수를 호출하면 this는 새로 생성되는 객체에 바인딩된다.

```javascript
var Person = function(name) {
  this.name = name;
}

var me = Person('Lee');

console.log(me); //undefined
console.log(window.name); // Lee
```

생성자 함수를 new 없이 호출한 경우 함수 Person 내부의 this는 전역객체를 가리키므로 name은 전역변수(window)에 바인딩된다. 또한 new와 함께 생성자 함수를 호출하는 경우 반환문이 없을 때 암묵적으로 반환하던 this도 반환하지 않으며, 반환문이 없으므로 undefined를 반환하게 된다.

일반함수와 생성자 함수에 특별한 형식적 차이는 없기 때문에 일반적으로 생성자 함수명은 첫문자를 대문자로 기술하여 혼란을 방지하려는 노력을 한다. 그러나 이러한 규칙을 사용한다 하더라도 실수는 발생할 수 있다.

이러한 위험성을 회피하기 위해 사용되는 패턴은 다음과 같다. 이 패턴은 대부분의 라이브러리에서 광범위하게 사용된다.

```javascript
function A(arg) {
  // this가 호출된 함수(arguments.callee)의 인스턴스가 아니면
  // new 연산자를 사용하지 않은 것이므로
  // 이 경우 new와 함께 생성자 함수를 호출하여 인스턴스를 반환한다.
  if(!(this instanceof arguments.callee))
    return new arguments.callee(arg);
  this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value);
console.log(b.value);
```

<!--
생성자 함수 내부의 `this`는 새로 생성된 객체를 참조한다. 그리고 프로토타입 객체 메서드 내부의 this도 해당 메서드의 소유 객체를 참조한다.

```javascript
// Quo라는 생성자 함수 생성
// 이 함수는 status property를 가지는 객체를 생성한다

var Quo = function (string) {
    this.status = string;
};

// Quo의 모든 인스턴스에 public method get_status를 준다.

Quo.prototype.get_status = function ( ) {
    return this.status;
};

// Quo의 인스턴스 생성

var myQuo = new Quo("confused");
console.log(myQuo.get_status( ));   // confused
```
 -->

## 1.4 apply 호출 패턴(Apply Invocation Pattern)

함수 호출 시 각 상황에 따라 this에 바인딩될 객체가 결정된다. 이는 자바스크립트 엔진 내부에서 자동으로 실시되는 것이다. 이러한 내부적인 바인딩 이외에 this를 특정 객체에 명시적으로 바인딩하는 방법도 제공된다. 이것을 가능하게 하는 것이 apply(), call() 메서드이다.

이 메서드들은 모든 함수 객체의 프로토타입 객체인 Function.prototype 객체의 메서드이다.

```javascript
func.apply(thisArg, [argsArray])

// thisArg: 함수 내부의 this에 바인딩할 객체
// argsArray: 함수에 전달할 인자 배열
```

기억해야 할 것은 apply() 메서드를 호출하는 주체가 함수이며 apply() 메서드도 this를 특정 객체에 바인딩할 뿐 본질적인 기능은 함수 호출이라는 것이다.

```javascript
var Person = function(name) {
  this.name= name;
}

var foo = {};

Person.apply(foo, ['name']);

console.log(foo);
```

빈 객체 foo를 apply() 메서드의 첫번째 인자로 배열을 두번째 인자로 전달하고 Person 함수를 호출하였다. 이때 Person 함수의 this는 foo 객체가 된다. Person 함수에서 this의 name 프로퍼티에 값을 할당하는데 this에 바인딩된 foo 객체에는 name 프로퍼티가 없으므로 name 프로퍼티가 새로 추가되가 값이 할당된다.

apply() 메서드의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우이다. arguments 객체는 배열이 아니기 때문에 slice() 같은 배열의 메서드를 사용할 수 없으나 apply() 메서드를 이용하면 가능하다.

```javascript
function convertArgsToArray() {
  console.log(arguments);

  // arguments 객체를 배열로 변환
  var arr = Array.prototype.slice.apply(arguments); // arguments.slice

  console.log(arr);
  return arr;
}

convertArgsToArray(1,2,3);
```

`Array.prototype.slice.apply(arguments)`는 Array.prototype.slice() 메서드를 호출하라. 단 this는 arguments 객체로 바인딩하라는 의미가 된다. 결국 Array.prototype.slice() 메서드를 arguments 객체 자신의 메서드인 것처럼 `arguments.slice()`와 같은 형태로 호출하라는 것이다.

call() 메서드의 경우, apply()와 기능은 같지만 apply()의 두번째 인자에서 배열 형태로 넘긴 것을 각각 하나의 인자로 넘긴다.

```javascript
Person.apply(foo, [1, 2, 3]);

Person.call(foo, 1, 2, 3);
```

<!--
call()과 apply() 메서드로 함수를 호출할 때, 함수의 this는 첫 번째 인자로 넘겨받은 객체를 참조한다.

```javascript
var add = function (a, b) {
  return a + b;
};

// 숫자 2개를 가진 배열을 생성하고 이를 더한다

var array = [3, 4];
var sum = add.apply(null, array);    // sum is 7

console.log(sum);

var Quo = function (string) {
  this.status = string;
};

Quo.prototype.get_status = function (  ) {
  return this.status;
};

// status member를 갖는 객체를 생성

var statusObject = {
  status: 'A-OK'
};

// apply()의 첫 번째 인자로 넘겨받은 객체를 this로 참조한다

var status = Quo.prototype.get_status.apply(statusObject);
console.log(status); // 'A-OK'
```
 -->

# Reference  

* [JavaScript : The Good Parts 04.Functions -by Douglas Crockford](http://www.yes24.com/24/goods/3071412?scode=032&OzSrank=1)  
