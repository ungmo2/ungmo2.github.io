---
layout: post
title: javascript Closure
categories: javascript
---

클로저(closure)는 자바스크립트에서 중요한 개념 중 하나로 자바스크립트에 관심을 가지고 있다면 한번쯤은 들어보았을 내용이다. [function]({% post_url 2016-01-20-Javascript-Function %}), [scope]({% post_url 2016-01-21-Javascript-Scope %}), [execution context]({% post_url 2016-01-23-Javascript-Execution-Context %})에 대한 사전 지식이 없는 사람에게는 이해하기 어려운 개념일 수도 있다.

클로저는 함수의 지역변수가 함수의 반환 이후에도 유지되는 것을 의미한다.
A closure is the local variables for a function - kept alive after the function has returned, or

A closure is a stack-frame which is not deallocated when the function returns. (as if a 'stack-frame' were malloc'ed instead of being on the stack!)

우선 예제를 살펴보자.

```javascript
function sayHello(name){
  var text = 'Hello ' + name;
  var logHello = function(){ console.log(text); }
  logHello();
}

sayHello('lee');  // Hello lee
```
함수 sayHello 내에는 내부함수(inner function) logHello가 선언되며 실행된다.
이때 내부함수 logHello는 자신을 포함하고 있는 외부함수 sayHello의 변수 text에 접근할 수 있다.

이번에는 내부함수 logHello를 sayHello내에서 실행하지 말고 반환하는 코드로 변경해 보자.

```javascript
function sayHello(name){
  var text = 'Hello ' + name; // local variable
  return function(){ console.log(text); }
}

sayHello('lee')(); // Hello lee
```

함수 sayHello는 내부함수를 반환하고 생을 마감했다. 따라서 함수 sayHello의 변수 text는 scope에서 벗어났으며 변수 text에 접근할 수 있는 방법은 달리 없어 보인다. 그러나 위 코드의 실행 결과는 "Hello lee"이다. 뭔가 특별한 일이 벌어 지고 있는 것 같다.

외부함수보다 내부함수가 더 오래 유지되는 경우인데



```javascript
var sequencer = function() {
  var s = 0;
  return function() {
    return ++s;
  }
};

var seq = sequencer();

seq(); // 1
seq(); // 2
seq(); // 3
```





```javascript
var myObject = function() {
  var value = 0;

  return {
    increment: function(inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function() {
      return value;
    }
  }
}();
```




우선 C 언어로 만들어진 코드를 살펴보자.

```c

```

#Reference

* [http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/](http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/)
