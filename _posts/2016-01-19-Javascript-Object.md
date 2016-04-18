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

# 객체 생성 방법

## 객체 리터럴

객체를 생성하는 가장 일반적이고 가장 쉬운 방법이다.

```javascript
var person = {
  name: 'Lee',
  gender:'male',
  sayHello: function(){
    alert('Hi! my name is ' + this.name);
  }
};
person.sayHello();
```

## Object() 생성자 (Constructor)

new 연산자와 Object 객체 생성자를 사용하여 빈 객체를 생성할 수 있다. 빈 객체 생성 이후 속성과 메서드를 추가하여 객체를 완성하는 방법이다.

객체가 소유하고 있는 속성에 새로운 값을 할당하면 속성값은 갱신된다. 객체가 소유하고 있지 않은 속성에 값을 할당하려고 하면 해당 속성과 값을 객체에 추가한다.

```javascript
var person = new Object();
person.name = 'Lee';
person.gender = 'male';
person.sayHello = function(){
  alert('Hi! my name is ' + this.name);
};
```

사실 위의 방법은 반드시 new 연산자와 Object 객체 생성자를 사용해야는 것은 아니다. 빈 객체를 생성는 방법은 객체 리터럴를 사용하는 것이 더 간편하다. 그리고 빈 객체를 생성 후에 속성과 메서드를 추가해야하는 특별한 이유가 옶다면 이 방식은 그다지 유용해 보이지 않는다.

```javascript
var person = {};
person.name = 'Lee';
person.gender = 'male';
person.sayHello = function(){
  alert('Hi! my name is ' + this.name);
};
```

# 객체 생성자 함수

객체 리터럴 방식과 Object() 생성자 방식으로 객체를 생성하는 것은 속성값만 다른 여러개의 객체 생성에 불편이 있다.

객체 생성자 함수를 마치 객체를 생성하기 위한 템플릿처럼 사용하여 속성이 다른 동일한 객체 여러개를 간편하게 생성할 수 있다.

```javascript
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
  this.sayHello = function(){
    alert('Hi! my name is ' + this.name);
  };
}

var person1 = new Person('Lee', 'male');
var person2 = new Person('Kim', 'female');

person1.sayHello();
person2.sayHello();
```

- 생성자 함수 이름은 일반적으로 대분자로 시작한다. 이것은 생성자 함수임을 인식하도록 도움을 준다.
- 속성 또는 메서드명 앞에 기술한 `this`는 생성자 함수로 생성될 `인스턴스(instance)`이다. 따라서 this에 연결되어 있는 속성과 메서드는 `public`이다.
- 생성자 함수 내에서 선언된 일반 변수는 `private`이다. 즉 생성자 함수 내부에서는 자유롭게 접근이 가능하나 외부에서 접근할 수 있는 방법이 없다.

  ```javascript
  function Person(name, gender) {
    var married = 'yes';
    this.name = name;
    this.gender = gender;
    this.sayHello = function(){
      alert('Hi! my name is ' + this.name);
    };
  }

  var person = new Person('Lee', 'male');
  console.log(person.married); // undefined
  ```

# 객체에의 접근

```javascript
var empty_object = {}; // 객체리터럴

var empty_object = new Object(); // 객체 생성자

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

객체가 소유하고 있는 속성에 새로운 값을 할당하면 속성값은 갱신된다.

```javascript
stooge['first-name'] = 'Joe';
```

객체가 소유하고 있지 않은 속성에 값을 할당하려고 하면 해당 속성을 객체에 추가한다.

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

# 객체의 분류

객체는 아래와 같이 분류할 수 있다.

![object](/img/object.png)
{: style="max-width:400px; margin:10px auto;"}

- [Built-in Object(내장 객체)](http://ungmo2.github.io/javascript/Built-in-Object/)는 웹페이지 등을 표현하기 위한 공통의 기능을 제공한다. 웹페이지가 브라우저에 의해 로드되자마자 별다른 행위없이 바로 사용이 가능하다. Built-in Object는 아래와 같이 구분할 수 있다.

  - [Standard Built-in Objects (or Global Objects)](http://ungmo2.github.io/javascript/Built-in-Object/)
  - [BOM (Browser Object Model)](http://ungmo2.github.io/javascript/BOM/)
  - [DOM (Document Object Model)](http://ungmo2.github.io/javascript/DOM/)

`Standard Built-in Objects`(표준 빌트인 객체)를 제외한 BOM과 DOM을 `Native Object`라고 분류하기도 한다. 또한 사용자가 생성한 객체를 `Host Object`(사용자 정의 객체)라 한다.

- Host Object(사용자 정의 객체)
  사용자가 생성한 객체 들이다. constructor 혹은 객체리터럴을 통해 사용자가 객체를 정의하고 확장시킨 것들이기 때문에 Built-in Object 와 Native Object가 구성된 이후에 구성된다.
