---
layout: post
title: Javascript Prototype
categories: javascript
tags: []
---

* TOC
{:toc}

# 1. 프로토타입 객체

자바스크립트는 Java, C++과 같은 객체지향 프로그래밍 언어와 달리 프로토타입 기반 객체지향 프로그래밍 언어이다. 따라서 자바스크립트의 동작 원리를 이해하기 위해서는 프로토타입의 개념을 잘 이해하고 있어야 한다.

Java, C++과 같은 객체지향 프로그래밍 언어는 클래스를 정의하고 이를 통해 객체(인스턴스)를 생성한다. 하지만 자바스크립트는 클래스 없이도 (ECMAScript 6에서 클래스가 추가되었다) 객체를 생성할 수 있다.

[Javascript Object](http://ungmo2.github.io/javascript/Javascript-Object/) 참고

자바스크립트의 모든 객체는 자신의 부모 역할을 하는 객체와 연결되어 있다. 그리고 이것은 마치 객체 지향의 상속 개념과 같이 부모 객체의 프로퍼티 또는 메서드를 상속받아 사용할 수 있게 한다. 이러한 부모 객체를 `Prototype(프로토타입) 객체` 또는 줄여서 Prototype(프로토타입)이라 한다.

```javascript
var student = {
  name: 'Lee',
  score: 90
}
console.dir(student);
```

![Google chrome에서 student 객체 출력 결과](/img/printout_student_obj_from_chrome.png)

Google chrome에서 student 객체 출력 결과
{: style="color:gray; font-size: 80%; text-align: center; margin-top: 5px;"}

ECMAScript spec에서는 <b style="text-decoration:underline">자바스크립트의 모든 객체는 자신의 프로토타입을 가리키는 `[[Prototype]]`이라는 숨겨진 프로퍼티를 가진다</b> 라고 되어있다. 크롬, 파이어폭스 등에서는 숨겨진 `[[Prototype]]` 프로퍼티가 `__proto__` 프로퍼티로 구현되어 있다. 즉 `__proto__`과 `[[Prototype]]`은 같은 개념이다.

student 객체는 `__proto__`라는 프로퍼티에 자신의 부모 객체(프로토타입 객체)인 Object.prototype을 Link하고 있는 것이다. 정의하지 않고도 사용할 수 있었던 toString() 메서드는 student 객체의 프로토타입 객체인 Object.prototype의 메서드로 존재함을 확인할 수 있다.

객체를 생성할 때 프로토타입은 결정된다. 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다. 이러한 특징을 활용하여 객체의 상속을 구현할 수 있다.

# 2. `[[Prototype]]` 프로퍼티 vs prototype 프로퍼티

`[[Prototype]]` 프로퍼티는 모든 객체는 자신의 프로토타입 객체를 가리키는 숨겨진 프로퍼티이다. `[[Prototype]]` 프로퍼티는 `__proto__` 프로퍼티로 구현되어 있어 `__proto__`과 `[[Prototype]]`은 같은 개념이다.

함수도 객체이므로 `[[Prototype]]` 프로퍼티를 갖는다. 그런데 일반 객체와는 달리 `prototype` 프로퍼티도 소유하게 된다.

주의해야 할 것은 `prototype` 프로퍼티는 프로토타입 객체를 가리키는 `[[Prototype]]` 프로퍼티(`__proto__` 프로퍼티)와는 다르다는 것이다. `prototype` 프로퍼티와 `[[Prototype]]` 프로퍼티는 모두 프로토타입 객체를 가리키지만 관점의 차이가 있다.

```javascript
function Person(name, gender) {
  this.name = name;
}

var foo = new Person('Lee');

console.dir(Person);
console.dir(foo);
```

- [[Prototype]] 프로퍼티  
  - 함수를 포함한 모든 객체가 가지고 있는 프로퍼티이다.
  - <b style="text-decoration:underline">객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체을 가리키며 함수 객체의 경우 `Function.prototype`를 가리킨다.</b>

    ```javascript
    console.log(Person.__proto__ === Function.prototype);
    ```

- prototype 프로퍼티  
  - 함수 객체만 가지고 있는 프로퍼티이다.
  - <b style="text-decoration:underline">함수 객체가 생성자로 사용될 때 이 함수를 통해 생성된 객체의 부모 역할을 하는 객체를 가리킨다.</b>

    ```javascript
    console.log(Person.prototype === foo.__proto__);
    ```

  - 함수가 생성될 때 만들어 지며 `constructor` 프로퍼티를 가지는 객체를 가리킨다. 이 `constructor` 프로퍼티는 함수 객체 자신을 가리킨다.

    ```javascript
    console.log(Person.prototype.constructor === Person);
    ```

# 2. Prototype chaining

자바스크립트는 특정 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 `[[Prototype]]` 프로퍼티가 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메서드를 차례대로 검색한다. 이것을 프로토타입 체이닝이라 한다.

```javascript
var student = {
  name: 'Lee',
  score: 90
}

console.log(student.hasOwnProperty('name')); // true
```

student 객체는 hasOwnProperty 메서드를 가지고 있지 않으므로 에러가 발생하여야 하나 정상적으로 결과가 출력되었다. 이는 student 객체의 `[[Prototype]]` 프로퍼티가 가리키는 링크를 따라가서 student 객체의 부모역할을 하는 프로토타입 객체(Object.prototype)의 메서드 hasOwnProperty를 호출하였기 때문에 가능한 것이다.

## 2.1 객체 리터럴 방식으로 생성된 객체의 프로토타입 체이닝

[객체 생성 방법](http://ungmo2.github.io/javascript/Javascript-Object/#section)은 3가지가 있다.

- 객체 리터럴  
- 생성자 함수  
- Object() 생성자 함수  

객체 리터럴 방식으로 생성된 객체는 결국 내장 함수 Object() 생성자 함수로 객체를 생성하는 것을 단순화 시킨 것이다.

Object() 생성자 함수는 물론 함수이다. 따라서 객체인 함수는 일반 객체와 달리 `prototype` 프로퍼티가 있다.

- [`prototype` 프로퍼티](http://ungmo2.github.io/javascript/Javascript-Function/#prototype-)는 함수 객체가 생성자로 사용될 때 이 함수를 통해 생성된 객체의 부모 역할을 하는 객체를 가리킨다.  
- [`[[Prototype]]` 프로퍼티](http://ungmo2.github.io/javascript/Javascript-Function/#proto-)는 객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체을 가리킨다.

```javascript
var person = {
  name: 'Lee',
  gender: 'male',
  sayHello: function(){
    alert('Hi! my name is ' + this.name);
  }
};

console.dir(person);

console.log(person.__proto__ === Object.prototype);   // true
console.log(Object.prototype === person.__proto__);   // true
console.log(Object.prototype.constructor === Object); // true
console.log(Object.__proto__ === Function.prototype); // true
```

![Object literal Prototype chaining](/img/object_literal_prototype_chaining.png)

## 2.2 생성자 함수로 생성된 객체의 프로토타입 체이닝

생성자 함수로 객체를 생성하기 위해서는 우선 생성자 함수를 정의하여야 한다.

[함수를 정의하는 방식](http://ungmo2.github.io/javascript/Javascript-Function/#section)은 3가지가 있다.

- 함수선언식(Function declaration)
- 함수표현식(Function expression)
- Function() 생성자 함수

함수표현식으로 함수를 정의할 때 함수 리터럴 방식을 사용한다. 함수선언식도 내부적으로 자바스크립트 엔진이 기명 함수표현식으로 변환하므로 결국 함수 리터럴 방식을 사용한다.

```javascript
var square = function square(number) {
  return number * number;
};
```

따라서 함수선언식과 함수표현식은 모두 함수 리터럴 방식으로 함수를 정의하는데 이것은 결국 내장 함수 Function() 생성자 함수로 함수를 생성하는 것을 단순화 시킨 것이다.

이는 앞서 살펴본 `객체 리터럴 방식으로 생성된 객체의 프로토타입 체이닝`의 경우, 객체의 생성은 내장 함수 Object() 생성자 함수를 사용하는 것과 유사하다. Object() 생성자 함수는 물론 함수이기 때문에 함수 객체는 일반 객체와 달리 `prototype` 프로퍼티가 있다고 했다.

내장 함수 Function() 생성자 함수도 물론 함수이기 때문에 일반 객체와 달리 `prototype` 프로퍼티가 있다.

```javascript
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
  this.sayHello = function(){
    alert('Hi! my name is ' + this.name);
  };
}

var foo = new Person('Lee', 'male');

console.dir(Person);
console.dir(foo);
```

![object creating rule](/img/object_creating_rule.png)
