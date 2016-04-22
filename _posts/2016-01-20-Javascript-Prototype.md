---
layout: post
title: Javascript Prototype
categories: javascript
tags: []
---

* TOC
{:toc}

모든 객체는 자신의 부모 역할을 하는 객체와 연결되어 있다. 그리고 이것은 마치 객체 지향의 상속 개념과 같이 부모 객체의 속성들을 마치 자신의 속성처럼 사용할 수 있게 한다. 이러한 부모 객체를 Prototype(프로토타입) 객체 또는 줄여서 Prototype(프로토타입)이라 한다.

```javascript
var student = {
  name: 'Lee',
  score: 90
}
console.log(student.toString());
```

student 객체에는 toString() 메서드가 없으므로 에러가 발생하여야 하나 정상적으로 결과가 출력되었다. 이는 student 객체의 프로토타입(객체)에 toString() 메서드가 정의되어있고 프로토타입(객체)를 student 객체가 상속한 것 같이 toString()를 호출한 것이다.

이번에는 student 객체를 출력하여 보자.

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

student 객체에 name과 score 속성 이외에 `__proto__` 속성이 존재하고 있다. 이 속성이 바로 student 객체의 프로토타입이다. 앞서 student 객체에서 정의하지 않고도 사용할 수 있었던 toString() 메서드 또한 프로토타입의 메서드로 존재함을 확인할 수 있다.

ECMAScript spec에서는 **자바스크립트의 모든 객체는 자신의 프로토타입을 가리키는 [[Prototype]]이라는 숨겨진 프로퍼티를 가진다** 라고 되어있다. 크롬 브라우저에서는 `__proto__`가 바로 숨겨진 [[Prototype]] 속성을 의미한다. 즉 student 객체는 `__proto__`라는 숨겨진 속성에 자신의 부모 객체(프로토타입)를 Link하고 있는 것이다.

객체를 생성할 때 프로토타입은 결정된다. 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 자바스크립트 표준 빌트인 객체인 Object의 속성 prototype 객체 (`Object.prototype`)에 연결된다.

또한 객체를 생성할 때 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다. 이러한 특징을 활용하여 객체의 상속을 구현할 수 있다.


# Reference

* [인사이드 자바스크립트](http://www.hanbit.co.kr/book/look.html?isbn=978-89-6848-065-2)
