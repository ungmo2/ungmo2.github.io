---
layout: post
title: Javascript this
categories: javascript
tags: []
---

JavaScript의 `this` keyword는 Java와 같은 익숙한 언어의 개념과 달라 개발자에게 혼란을 준다. Java에서의 `this`는 자기자신(self)을 의미한다.

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

JavaScript의 경우, 함수 호출 패턴에 따라 어떤 객체를  `this`에 바인딩(참조)하는지가 결정된다.

함수 호출 패턴은 아래와 같다.

> 1. 함수호출패턴(Function Invocation Pattern)
> 2. 메소드 호출 패턴(Method Invocation Pattern)
> 3. 생성자호출패턴(Constructor Invocation Pattern)
> 4. apply호출패턴(Apply Invocation Pattern)


#함수호출패턴(Function Invocation Pattern)
기본적으로 `this`는 전역객체(global object)에 바인딩된다. 전역 함수는 물론이고 심지어 내부함수의 경우도 `this`는 외부함수가 아닌 전역객체에 바인딩된다.

더글라스 크락포드는 "이것은 설계 단계의 결함으로 메소드가 내부함수를 사용하여 자신의 작업을 돕게 할 수 없다는 것을 의미한다"라고 말한다. 내부함수의 `this`가 전역객체를 참조하는 것을 회피방법은 아래와 같다.

```javascript
var myObject = {
  value: 3
}

var add = function (a, b) {
  return a + b;
};

// myObject에 double method 추가

myObject.double = function (  ) {

  var that = this;	// Workaround : this === myObject

  var helper = function (  ) {
    // 내부함수의 this는 전역객체에 바인딩된다.
    // console.log(this === global); // true
    that.value = add(that.value, that.value)
  };

  helper(  );    // Invoke helper as a function.
};

myObject.double(  );
console.log(myObject.value);    // 6
```

#메소드 호출 패턴(Method Invocation Pattern)
그러나, 함수가 메소드일 경우, 즉, 함수가 객체의 속성이면 메소드 호출 패턴으로 호출된다. 이때 메소드 내부의 `this`는 해당 메소드를 소유한 객체를 참조한다.

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

#생성자호출패턴(Constructor Invocation Pattern)
생성자 함수 내부의 `this`는 새로 생성된 객체를 참조한다. 그리고 프로토타입 객체 메소드 내부의 this도 해당 메소드의 소유 객체를 참조한다.

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

#apply호출패턴(Apply Invocation Pattern)
call()과 apply() 메소드로 함수를 호출할 때, 함수의 this는 첫 번째 인자로 넘겨받은 객체를 참조한다.

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

#Reference  

* [JavaScript : The Good Parts 04.Functions -by Douglas Crockford](http://www.yes24.com/24/goods/3071412?scode=032&OzSrank=1)  
