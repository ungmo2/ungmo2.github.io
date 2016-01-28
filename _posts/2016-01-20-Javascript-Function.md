---
layout: post
title: Javascript Function
---

함수란 어떤 특정 작업을 수행하기 위해 필요한 일련의 구문들을 그룹화하기 위한 개념이다. 만일 스크립트의 다른 부분에서도 동일한 작업을 반복적으로 수행해야 한다면 (동일한 구문을 계속해서 반복 작성하는 것이 아니라) 함수를 재사용할 수 있다.

함수는 구문(statement)의 집합으로 모듈화의 근간이 된다. 코드의 재사용이나 정보의 구성 및 은닉 등에 사용하고, 객체의 행위를 지정하기도 한다. 일반적으로 프로그래밍 기술은 요구사항의 집합을 자료구조와 함수의 집합으로 변환하는 것이다.

#함수 정의
함수를 정의하기 위해 `함수선언식(Function declaration)` 또는 `함수표현식(Function expression)`을 사용할 수 있다.

##함수선언식(Function declaration)
함수선언식으로의 함수 정의는 `function` 키워드와 이하의 내용으로 구성된다.

* 함수의 이름 (option)
* 매개변수 목록 (option / 괄호로 감싸고 콤마로 분리한다.)
* 함수를 정의하는 JavaScript 구문 (중괄호 { }로 감싸인 코드 블럭)

```javascript
function square(number) {
  return number * number;
}
```
`return`문은 함수가 반환하는 값을 지정한다.

##함수표현식(Function expression)
함수선언식으로 정의한 함수 squre를 함수표현식으로 선언하면 아래와 같다.

```javascript
var square = function(number) {
  return number * number;
};
```

 함수의 이름은 생략할 수 있다.(익명 함수. anonymous function)

```javascript
// 기명 함수표현식(named function expression)
var foo = function myFunction(a, b) {
  return a * b;
};
// 익명 함수표현식(anonymous function expression)
var foo = function(a, b) {
  return a * b;
};
```

#함수의 호출

```javascript
square(5);
```

함수선언식으로 정의된 함수는 자바스크립트 인터프리터가 스크립트가 로딩되는 시점에 바로 초기화하고 이를 VO(variable object)에 저장한다 (Excute Context 참고).
그렇기 때문에 함수 선언의 위치와는 상관없이 소스 내 어느 곳에서든지 호출이 가능하다. (Hoisting 참고)

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

함수선언식으로 함수를 정의하면 사용하기에 쉽지만 대규모 애플리케이션을 개발하는 경우 인터프리터가 너무 많은 코드를 VO에 저장하므로 애플리케이션의 응답속도는 현저히 떨어질 수 있으므로 주의해야 할 필요가 있다.

#반환값 (return value)
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

#매개변수(Parameter)
함수의 작업 실행을 위해 추가적인 정보가 필요할 경우, 매개변수를 지정한다. 매개변수는 함수 내에서 변수와 동일하게 동작한다.

##매개변수(parameter) vs 인수(argument)
매개변수는 함수 내에서 변수와 동일하게 메모리 공간을 확보하며 전달되어진 인수는 매개변수에 대입된다. 즉, 일반적인 변수는 `undefined`로 초기화되는 것과 달리 매개변수는 인수로 초기화된다.

##Pass-by-value
Primitives(기본자료형) 매개변수는 `Pass-by-value`로 함수에 전달된다.

```javascript
function myFunc(primitive) {
  primitive += 1;
}

var x = 0;

myFunc(x);

console.log(x); // logs 0
```

##Pass-by-reference
객체 매개변수는 `Pass-by-reference`로 함수에 전달된다.

```javascript
function myFunc(theObject) {
  theObject.make = "Toyota";
}

var mycar = {
  make: "Honda",
  model: "Accord",
  year: 1998
};

var x, y;

console.log(mycar.make); // "Honda"

myFunc(mycar);

console.log(mycar.make); // "Toyota"
```

#즉시호출함수표현식 (IIFE, Immediately Invoke Function Expression)

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

자바스크립트에서 가장 큰 문제점 중의 하나는 글로벌 스코프에 정의된 것은 코드 내의 어디서든지 접근이 가능하다는 것이다.
하지만, 외부에 공유되면 안되거나 공유될 필요가 없는 속성이나 메서드가 있다.

또한, 다른 스크립트 파일 내에서 동일한 이름으로 명명된 변수나 함수가 있을 경우 원치 않는 결과를 가져올 수 있다.
익명함수를 선언하여 사용하는 방법은 여러가지 상황에 활용될 수 있지만 간혹 변수 이름의 충돌을 방지하기 위한 목적으로 사용되기도 한다.

즉, 글로벌 네임스페이스에 변수를 추가하지 않아도 되기 때문에 코드 충돌이 없이 구현할 수 있어 플러그인이나 라이브러리 등을 만들 때 많이 사용된다.

#First-class object
일급 객체(first-class object)란, 생성, 대입, 연산, 인자 또는 반환값으로서의 전달 등, 프로그래밍언어의 기본적 조작을 제한없이 사용할 수 있는 대상을 의미한다.

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

Javascript의 함수는 위의 조건을 모두 만족하므로 ***Javascript의 함수는 일급객체이다.***  따라서 Javascript의 함수는 흡사 변수와 같이 사용할 수 있으며 코드의 어디에서든지 정의할 수 있다.  

***함수와 다른 객체를 구분 짖는 특징은 호출할 수 있다는 것이다.***
