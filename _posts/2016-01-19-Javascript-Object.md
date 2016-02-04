---
layout: post
title: Javascript Object
categories: javascript
tags: []
---

객체는 데이터와 그 데이터에 관련되는 동작(절차,방법,기능)을 모두 포함할 수 있는 개념적 존재이다.

달리 말해, 이름과 값을 가지는 데이터를 의미하는 속성(property)와 동작을 의미하는 메서드(method)를 포함하고 있는 독립적 주체이다.

객체는 데이터를 한 곳에 모으고 구조화하는데 유용하다. 객체 하나는 다른 객체를 포함할 수 있기 때문에, 그래프나 트리와 같은 자료구조를 쉽게 표현할 수 있다.

자바스크립트는 객체(object)기반의 스크립트 언어이며 자바스크립트를 이루고 있는 대부분 “모든 것”은 객체이다. 기본자료형(Primitives) 이외의 다른 값들(배열, 함수, 정규표현식 등)은 모두 객체이다.

객체는 이름(name)과 값(value)의 쌍인 속성들을 포함하는 컨테이너라고 할 수 있다.

* 속성명 : 빈 문자열을 포함하는 문자열
* 속성값 : `undefined`을 제외한 모든 값

```javascript
var empty_object = {}; // 객체리터럴

var empty_object = new Object();

var stooge = {
  "first-name": "Jerome",
  "last-name": "Howard"
};

//nested object
var flight = {
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

속성명이 유효한 자바스크립트 이름이고 예약어가 아닌 경우, 따옴표(" ")는 생략 가능하다. 속성명 "first-name"는 반드시 따옴표를 사용해야 하지만, first_name는 생략 가능하다.

객체에 속한 속성값은 속성명을 대괄호( [ ] )로 둘러싼 형태로 읽을 수 있다. 속성명이 유효한 자바스크립트 이름이고 예약어가 아닌 경우, 마침표(.)표기법을 대신 사용할 수 있다.

```javascript
stooge["first-name"]  // "Jerome"
flight.departure.IATA // "SYD"
```

객체에 존재하지 않는 속성을 읽으려고 하면 `undefined`를 반환한다.

```javascript
stooge["middle-name"] // undefined
flight.status         // undefined
stooge["FIRST-NAME"]  // undefined
```

`||` 연산자를 사용하여 기본값을 지정할 수 있다.  
[Operator: 단축 평가 참고]({% post_url 2016-01-14-Javascript-Operator %})

```javascript
var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";
```

존재하지 않는 속성, 즉 `undefined`의 속성을 참조하려 할 때 `TypeError` 예외가 발생한다. 이런 상황을 방지하기 위해서 `&&` 연산자를 사용할 수 있다.

```javascript
flight.equipment                            // undefined
flight.equipment.model                      // throw "TypeError"
flight.equipment && flight.equipment.model  // undefined
```

속성값은 할당에 의해 갱신한다. 만약 할당하는 표현식에서 속성명이 이미 객체 안에 존재하면 해당 속성값만 교체한다.

```javascript
stooge['first-name'] = 'Joe';
```

속성이 이미 객체 안에 존재하지 않으면 해당 속성을 객체에 추가한다.

```javascript
//Adding Property
stooge['middle-name'] = 'Lester';

stooge.nickname = 'Curly';

flight.equipment = {
  model: 'Boeing 777'
};

flight.status = 'overdue';
```

# Pass-by-reference
기본자료형은 값이 한번 정해지면 변경할 수 없지만(immutable), 객체는 변경 가능한 프로퍼티(속성)들의 집합이라 할 수 있다.

기본자료형의 값은 값(value)으로 전달된다. 즉, 복사되어 전달된다.

```javascript
var foo = 1;
var bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9

//Pass by Reference

var foo = [1, 2];
var bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9
```

객체는 참조(Reference) 방식으로 전달된다. 결코 복사되지 않는다.

```javascript
var x = stooge;

x.nickname = 'Curly';

var nick = stooge.nickname;
  // x와 stooge가 모두 같은 객체를 참조하기 때문에  
  // 변수 nick의 값은 'Curly'

var a = {}, b = {}, c = {};
  // a, b, c는 각각 다른 빈 객체를 참조

a = b = c = {};
  // a, b, c는 모두 같은 빈 객체를 참조
```

# 속성 삭제
`delete` 연산자를 사용하면 객체의 속성을 삭제할 수 있다.

```javascript
stooge.nickname   // 'Curly'

delete stooge.nickname;

stooge.nickname;  // undefined
```

# Built-in Object(내장객체)

## Built-in Object(자바스크립트 내장객체)
Javascript는 프로그램 전체의 영역에서 공통적으로 필요한 기능을 사용자 각자가 일일히 작성하는 수고를 줄이기 위해 Built-in Object(내장객체)를 제공한다.

Object, String, Number, Boolean, Date, Array, Math, RegExp, Error 등 많은 내장객체들이 있다.

이들은 자바스크립트 엔진이 구동되는 시점에서 바로 제공되며 자바스크립트코드 어디에서든 사용이 가능하다.

## Native Object(브라우저 내장 객체)
브라우저객체모델(BOM)과 문서객체모델(DOM)로 이 객체들은 Built-in Object 가 구성된 후에 구성된다.

Native Object 역시 내장객체이며  Built-in Object와 동일하게 자바스크립트 구동시점부터 바로 사용가능 하다. 

## Host Object(사용자 정의 객체)
사용자가 생성한 객체 들이다. constructor 혹은 객체리터럴을 통해 사용자가 객체를 정의하고 확장시킨 것들이기 때문에 Built-in Object 와 Native Object가 구성된 이후에 구성된다.
