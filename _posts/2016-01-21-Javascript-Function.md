---
layout: post
title: Javascript Function
categories: javascript
tags: []
---

* TOC
{:toc}

- 함수란 어떤 특정 작업을 수행하기 위해 필요한 일련의 구문들을 그룹화하기 위한 개념이다. 만일 스크립트의 다른 부분에서도 동일한 작업을 반복적으로 수행해야 한다면 (동일한 구문을 계속해서 반복 작성하는 것이 아니라) 미리 작성된 함수를 재사용할 수 있다.(코드의 재사용)

- 함수의 일반적 기능은 특정 작업을 수행하는 구문들의 집합을 정의하고 필요시에 호출하여 필요한 값 또는 수행 결과를 얻는 것이다. 그러나 이러한 일반적 기능(코드의 재사용) 이외에 객체 생성, 객체의 행위 지정(메서드), 정보의 구성 및 은닉, 클로저, 모듈화 등의 기능을 수행할 수 있다. 함수는 구문(statement)의 집합으로 모듈화의 근간이 된다. 일반적으로 프로그래밍 기술은 요구사항의 집합을 자료구조와 함수의 집합으로 변환하는 것이다.

- 함수도 객체이다. 다른 객체와 구분될 수 있는 특징은 호출할 수 있다는 것이다.

- 함수도 객체(일급 객체 First-class object)이므로 다른 값들처럼 사용할 수 있다. 즉 변수나 객체, 배열 등에 저장될 수 있고 다른 함수에 전달되는 인수로도 사용될 수 있으며 함수의 반환값이 될 수도 있다.

# 1. 함수 정의

함수를 정의하는 방식은 3가지가 있다.

- 함수선언식(Function declaration)
- 함수표현식(Function expression)
- Function() 생성자 함수

## 1.1 함수선언식(Function declaration)

함수선언식을 사용한 함수 정의는 `function` 키워드와 이하의 내용으로 구성된다.

- 함수명  
  함수선언식의 경우, 함수명은 생략할 수 없다. 함수명은 함수 몸체에서 자신을 재귀적 호출하거나 자바스크립트 디버거가 해당 함수를 구분할 수 있는 식별자의 역할을 한다.

- 매개변수 목록  
  0개 이상의 목록으로 괄호로 감싸고 콤마로 분리한다. 다른 언어와의 차이점은 매개변수의 자료형을 기술하지 않는다는 것이다. 이 때문에 함수 몸체 내에서 매개변수의 자료형 체크가 필요할 수 있다.

- 함수 몸체  
  실제 함수가 호출되었을 때 실행되는 구문들의 집합이다. 중괄호({ })로 구문들을 감싸고 `return` 문으로 결과값을 반환할 수 있다. 이를 반환값(return value)라 한다.

```javascript
function square(number) {
  return number * number;
}
```

## 1.2 함수표현식(Function expression)

자바스크립트의 함수는 `일급 객체`이므로 아래와 같은 특징이 있다.

- 무명의 리터럴로 표현이 가능하다.
- 변수나 자료 구조(객체, 배열…)에 저장할 수 있다.
- 함수의 파라미터로 전달 할 수 있다.
- 반환값(return value)으로 사용할 수 있다.

함수의 일급객체 특성을 이용하여 함수 리터럴 방식으로 함수를 정의하고 변수에 할당할 수 있는데 이러한 방식을 함수표현식(Function expression)이라 한다.

함수선언식으로 정의한 함수 square()를 함수표현식으로 정의하면 아래와 같다.

```javascript
var square = function(number) {
  return number * number;
};
```

함수표현식으로 정의한 함수는 함수명을 생략할 수 있다. 이러한 함수를 `익명 함수(anonymous function)`이라 한다. 함수표현식에서는 함수명을 생략하는 것이 일반적이다.

```javascript
// 기명 함수표현식(named function expression)
var foo = function multiply(a, b) {
  return a * b;
};
// 익명 함수표현식(anonymous function expression)
var bar = function(a, b) {
  return a * b;
};

console.log(foo(10, 5)); // 50
console.log(multiply(10, 5)); // Uncaught ReferenceError: multiply is not defined
```

함수의 일급객체이기 때문에 변수에 할당할 수 있는데 이 변수는 함수명이 아니라 할당된 함수를 가리키는 참조값을 저장하게 된다. 함수 호출시 이 변수가 함수명처럼 사용된다.

```javascript
var foo = function(a, b) {
  return a * b;
};

var bar = foo;
```

변수 bar와 변수 foo는 동일한 익명 함수의 참조값을 갖는다.

![anonymous function](/img/anonymous_function.png)
{: style="max-width:400px; margin:10px auto;"}

<b style="text-decoration:underline">함수가 할당된 변수를 사용해 함수를 호출하지 않고 기명 함수의 함수명을 사용해 호출하게 되면 에러가 발생한다. 이는 함수표현식에서 사용한 함수명은 외부 코드에서 접근 불가능하기 때문이다.</b> (사실은 함수선언식의 경우도 마찬가지이다.)

함수표현식과 함수선언식에서 사용한 함수명은 함수 몸체에서 자신을 재귀적 호출하거나 자바스크립트 디버거가 해당 함수를 구분할 수 있는 식별자의 역할을 한다.

함수선언식으로 정의한 square()의 경우, 함수명으로 호출할 수 있었는데 이는 자바스크립트 엔진에 의해 아래와 같은 함수표현식으로 형태가 변경되었기 때문이다.

```javascript
var square = function square(number) {
  return number * number;
};
```

함수명과 함수 참조값을 가진 변수명이 일치하므로 함수명으로 호출되는 듯 보이지만 사실은 변수명으로 호출된 것이다.


## 1.3 Function() 생성자 함수

함수표현식으로 함수를 정의할 때 함수 리터럴 방식을 사용한다. 함수선언식도 내부적으로 자바스크립트 엔진이 기명 함수표현식으로 변환하므로 결국 함수 리터럴 방식을 사용한다.

따라서 함수선언식과 함수표현식은 모두 함수 리터럴 방식으로 함수를 정의하는데 이것은 결국 내장 함수 Function() 생성자 함수로 함수를 생성하는 것을 단순화 시킨 것이다. Function() 생성자 함수는 Function.prototype.constructor 속성으로 접근할 수 있다.

Function() 생성자 함수로 함수를 생성하는 문법은 다음과 같다.

```javascript
new Function(arg1, arg2, ... argN, functionBody)
```

```javascript
var square = new Function('number', 'return number * number');
console.log(square(10)); // 100
```

Function() 생성자 함수로 함수를 생성하는 방식은 일반적으로 사용하지 않는다.

# 2. 함수 호이스팅(Function Hoisting)

3가지의 함수 정의 방식을 알아보았다. 정의 방식은 달라도 결국 Function() 생성자 함수를 통해 함수를 생성하는 것까지 확인하였다. 그런데 이 3가지 함수 정의 방식은 약간의 동작 방식에 차이가 있다.

```javascript
var res = square(5);

function square(number) {
  return number * number;
}
```

위 코드를 보면 함수선언식으로 함수가 정의되기 이전에 함수 호출이 가능하다. 함수 선언의 위치와는 상관없이 코드 내 어느 곳에서든지 호출이 가능한데 이것을 함수 호이스팅(Function Hoisting)이라 한다.

함수 호이스팅이 발생하는 원인은 자바스크립트이 변수 생성과 초기화가 분리되어 진행되기 때문이다. 이는 [Execution Context](http://ungmo2.github.io/javascript/Javascript-Execution-Context/)에서 자세히 설명한다.

간단히 설명하면 함수선언식으로 정의된 함수는 자바스크립트 엔진이 스크립트가 로딩되는 시점에 바로 초기화하고 이를 VO(variable object)에 저장한다. 그렇기 때문에 함수 선언의 위치와는 상관없이 소스 내 어느 곳에서든지 호출이 가능하다.

다음은 함수표현식으로 함수를 정의한 경우이다.

```javascript
var res = square(5); // TypeError: square is not a function

var square = function(number) {
  return number * number;
}
```
함수선언식의 경우와는 달리 TypeError가 발생하였다. 함수표현식의 경우 함수 호이스팅이 발생하지 않는다.

함수표현식은 함수선언식과는 달리 스크립트 로딩 시점에 VO에 함수를 저장하지 않고 runtime에 해석되고 실행되므로 이 두가지를 구분하는 것은 중요하다.

[JavaScript : The Good Parts](http://www.yes24.com/24/goods/3071412?scode=032&OzSrank=1)의 저자이며 자바스크립트의 권위자인 더글러스 크락포드(Douglas Crockford)는 이와 같은 문제 때문에 함수표현식만을 사용할 것을 권고하고 있다. 함수 호이스팅이 함수 호출 전 반드시 함수를 선언하여야 한다는 규칙을 무시하므로 코드의 구조를 엉성하게 만들 수 있다고 지적한다.

또한 함수선언식으로 함수를 정의하면 사용하기에 쉽지만 대규모 애플리케이션을 개발하는 경우 인터프리터가 너무 많은 코드를 VO에 저장하므로 애플리케이션의 응답속도는 현저히 떨어질 수 있으므로 주의해야 할 필요가 있다.

# 3. First-class object (일급 객체)

일급 객체(first-class object)란 생성, 대입, 연산, 인자 또는 반환값으로서의 전달 등 프로그래밍언어의 기본적 조작을 제한없이 사용할 수 있는 대상을 의미한다.

다음 조건을 만족하면 일급 객체로 간주한다.

> 1. 무명의 리터럴로 표현이 가능하다.
> 2. 변수나 자료 구조(객체, 배열...)에 저장할 수 있다.
> 3. 함수의 파라미터로 전달 할 수 있다.
> 4. 반환값(return value)으로 사용할 수 있다.

```javascript
// 1. 무명의 리터럴로 표현이 가능하다.
// 2. 변수나 데이터 구조안에 담을 수 있다.
var increase = function(num) {
  return num + 1;
};

var decrease = function(num){
  return num - 1;
};

var obj = {
  increase: increase,
  decrease: decrease
};

// 2. 함수의 파라미터로 전달 할 수 있다.
function cal(func, num){
  return func(num);
}

console.log(cal(increase, 1));
console.log(cal(decrease, 1));

// 3. 반환값(return value)으로 사용할 수 있다.
function cal(mode){
  var funcs = {
    'plus' : function(left, right){return left + right},
    'minus' : function(left, right){return left - right}
  }
  return funcs[mode];
}
console.log(cal('plus')(2,1));
console.log(cal('minus')(2,1));
```

Javascript의 함수는 위의 조건을 모두 만족하므로 <b style="text-decoration:underline">Javascript의 함수는 일급객체이다.</b>  따라서 Javascript의 함수는 흡사 변수와 같이 사용할 수 있으며 코드의 어디에서든지 정의할 수 있다.  

***함수와 다른 객체를 구분 짖는 특징은 호출할 수 있다는 것이다.***

# 4. 매개변수(Parameter)

함수의 작업 실행을 위해 추가적인 정보가 필요할 경우, 매개변수를 지정한다. 매개변수는 함수 내에서 변수와 동일하게 동작한다.

## 4.1 매개변수(parameter) vs 인수(argument)

매개변수는 함수 내에서 변수와 동일하게 메모리 공간을 확보하며 전달되어진 인수는 매개변수에 대입된다. 즉, 일반적인 변수는 `undefined`로 초기화되는 것과 달리 매개변수는 인수로 초기화된다.

## 4.2 Call-by-value

Primitives(기본자료형) 인수는 `Call-by-value`로 동작한다. 이는 함수 호출 시 기본자료형 인수를 함수에 매개변수로 전달할 때 매개변수에 값을 복사하여 함수로 전달하는 방식이다. 이때 함수 내에서 매개변수를 통해 값이 변경되어도 전달이 완료된 기본자료형 값은 변경되지 않는다.

```javascript
function foo(primitive) {
  primitive += 1;
  return primitive;
}

var x = 0;

console.log(foo(x)); // 1
console.log(x);      // 0
```

## 4.3 Call-by-reference

객체 타입(참조 타입) 인수는 `Call-by-reference`로 동작한다. 이는 함수 호출 시 참조 타입 인수를 함수에 매개변수로 전달할 때 매개변수에 값이 복사되지 않고 객체의 참조값이 매개변수에 저장되어 함수로 전달되는 방식이다. 이때 함수 내에서 매개변수의 참조값이 이용하여 객체의 값을 변경했을 때 전달되어진 참조형의 인수값도 같이 변경된다.

```javascript
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = "Kim";
  obj.gender = "female";
}

var num = 100;
var obj = {
  name: "Lee",
  gender: "male"
};

console.log(num); // 100
console.log(obj); // Object {name: "Lee", gender: "male"}

changeVal(num, obj);

console.log(num); // 100
console.log(obj); // Object {name: "Kim", gender: "female"}
```

![call-by-value & call-by-reference](/img/call-by-val&ref.png)
{: style="max-width:600px; margin:10px auto;"}

# 5. 반환값 (return value)

함수는 자신을 호출한 코드에게 수행한 결과를 반환(return)할 수 있다.

* `return` 키워드는 함수를 호출한 코드에게 값을 반환할 때 사용한다.
* 함수는 배열을 이용해 한 번에 여러 개의 값을 리턴할 수 있다.
* 자바스크립트 해석기는 `return` 키워드를 만나면 함수의 실행을 중단한 후, 함수를 호출한 코드로 되돌아간다.
* 만일 `return` 키워드 이후에 다른 구문이 존재하면 그 구문은 샐행되지 않는다.


```javascript
function calculateArea(width, height) {
  var area = width * height;
  return area; // 단일 값의 반환
}
var wallOne = calculateArea(3, 5);
var wallTwo = calculateArea(8, 5);

function getSize(width, height, depth) {
  var area = width * height;
  var volume = width * height * depth;
  var sizes = [area, volume];
  return sizes; // 복수 값의 반환
}
var areaOne = getSize(3, 2, 3)[0];
var volumeOne = getSize(3, 2, 3)[1];
```

# 6. 함수의 다양한 형태

# 6.1. 즉시호출함수표현식 (IIFE, Immediately Invoke Function Expression)

```javascript
// 기명 즉시실행함수(named immediately-invoked function expression)
(function myFunction() {
  var a = 3;
  var b = 5;
  return a * b;
}());

// 익명 즉시실행함수(immediately-invoked function expression)
(function() {
  var a = 3;
  var b = 5;
  return a * b;
}());
```

자바스크립트에서 가장 큰 문제점 중의 하나는 글로벌 스코프에 정의된 것은 코드 내의 어디서든지 접근이 가능하다는 것이다. 하지만, 외부에 공유되면 안되거나 공유될 필요가 없는 속성이나 메서드가 있다.

또한, 다른 스크립트 파일 내에서 동일한 이름으로 명명된 변수나 함수가 있을 경우 원치 않는 결과를 가져올 수 있다.
익명함수를 선언하여 사용하는 방법은 여러가지 상황에 활용될 수 있지만 간혹 변수 이름의 충돌을 방지하기 위한 목적으로 사용되기도 한다.

즉, 글로벌 네임스페이스에 변수를 추가하지 않아도 되기 때문에 코드 충돌이 없이 구현할 수 있어 플러그인이나 라이브러리 등을 만들 때 많이 사용된다.
