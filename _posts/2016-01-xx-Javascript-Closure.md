---
layout: post
title: javascript Closure
categories: javascript
---

클로저(closure)는 자바스크립트에서 중요한 개념 중 하나로 자바스크립트에 관심을 가지고 있다면 한번쯤은 들어보았을 내용이다. [function]({% post_url 2016-01-20-Javascript-Function %}), [scope]({% post_url 2016-01-21-Javascript-Scope %}), [execution context]({% post_url 2016-01-23-Javascript-Execution-Context %})에 대한 사전 지식이 없는 사람에게는 이해하기 어려운 개념일 수도 있다.

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
