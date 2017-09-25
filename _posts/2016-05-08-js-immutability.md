---
layout: post
title: Javascript <strong>Immutability</strong>
subtitle: 객체와 변경불가성(Immutability)
categories: javascript
section: javascript
description: 함수형 프로그래밍의 핵심 원리이다. 객체는 참조(reference) 형태로 전달하고 전달 받는다. 객체가 참조를 통해 공유되어 있다면 그 상태가 언제든지 변경될 수 있기 때문에 문제가 될 가능성도 커지게 된다. 이는 객체의 참조를 가지고 있는 어떤 장소에서 객체를 변경하면 참조를 공유하는 모든 장소에서 그 영향을 받기 때문인데 이것이 의도한 동작이 아니라면 참조를 가지고 있는 다른 장소에 변경 사실을 통지하고 대처하는 추가 대응이 필요하다. 의도하지 않은 객체의 변경이 발생하는 원인의 대다수는 "레퍼런스를 참조한 다른 객체에서 객체를 변경"하기 때문이다. 이 문제의 해결 방법은 비용은 조금 들지만 객체를 불변객체로 만들어 프로퍼티의 변경을 방지하며 객체의 변경이 필요한 경우에는 참조가 아닌 객체의 방어적 복사(defensive copy)를 통해 새로운 객체를 생성한 후 변경한다. 또는 Observer 패턴으로 객체의 변경에 대처할 수도 있다. 불변 객체를 사용하면 복제나 비교를 위한 조작을 단순화 할 수 있고 성능 개선에도 도움이 된다. 하지만 객체가 변경 가능한 데이터를 많이 가지고 있는 경우 오히려 부적절한 경우가 있다.
---

* TOC
{:toc}

Immutability(변경불가성)는 객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴을 의미한다. Immutability은 함수형 프로그래밍의 핵심 원리이다.

객체는 참조(reference) 형태로 전달하고 전달 받는다. 객체가 참조를 통해 공유되어 있다면 그 상태가 언제든지 변경될 수 있기 때문에 문제가 될 가능성도 커지게 된다. 이는 객체의 참조를 가지고 있는 어떤 장소에서 객체를 변경하면 참조를 공유하는 모든 장소에서 그 영향을 받기 때문인데 이것이 의도한 동작이 아니라면 참조를 가지고 있는 다른 장소에 변경 사실을 통지하고 대처하는 추가 대응이 필요하다.

의도하지 않은 객체의 변경이 발생하는 원인의 대다수는 "레퍼런스를 참조한 다른 객체에서 객체를 변경"하기 때문이다. 이 문제의 해결 방법은 비용은 조금 들지만 객체를 불변객체로 만들어 프로퍼티의 변경을 방지하며 객체의 변경이 필요한 경우에는 참조가 아닌 객체의 방어적 복사(defensive copy)를 통해 새로운 객체를 생성한 후 변경한다. 또는 [Observer 패턴](https://ko.wikipedia.org/wiki/%EC%98%B5%EC%84%9C%EB%B2%84_%ED%8C%A8%ED%84%B4)으로 객체의 변경에 대처할 수도 있다.

불변 객체를 사용하면 복제나 비교를 위한 조작을 단순화 할 수 있고 성능 개선에도 도움이 된다. 하지만 객체가 변경 가능한 데이터를 많이 가지고 있는 경우 오히려 부적절한 경우가 있다.

ES6에서는 불변 데이터 패턴(immutable data pattern)을 쉽게 구현할 수 있는 새로운 기능이 추가되었다.

# 1. immutable value vs. mutable value

Javascript의 기본 자료형(primitive data type)은 변경 불가능한 값(immutable value)이다.

- Boolean
- null
- undefined
- Number
- String
- Symbol (New in ECMAScript 6)

기본 자료형 이외의 모든 값은 객체(Object) 타입이며 객체 타입은 변경 가능한 값(mutable value)이다. 즉 객체는 새로운 값을 다시 만들 필요없이 직접 변경이 가능하다는 것이다.

예를 들어 살펴보자. C 언어와는 다르게 Javascript의 문자열은 변경 불가능한 값(immutable value) 이다. 이런 값을 "primitive values" 라 한다. (변경이 불가능하다는 뜻은 메모리 영역에서의 변경이 불가능하다는 뜻이다. 재할당은 가능하다)

아래의 코드를 살펴보자.

```javascript
var str = 'Hello';
str = 'world';
```

첫번째 구문이 실행되면 메모리에 문자열 'Hello'가 생성되고 식별자 str은 메모리에 생성된 문자열 'Hello'의 메모리 주소를 가리킨다. 그리고 두번째 구문이 실행되면 이전에 생성된 문자열 'Hello'을 수정하는 것이 아니라 새로운 문자열 'world'를 메모리에 생성하고 식별자 str은 이것을 가리킨다. 이때 문자열 'Hello'와 'world'는 모두 메모리에 존재하고 있다. 변수 str은 문자열 'Hello'를 가리키고 있다가 문자열 'world'를 가리키도록 변경되었을 뿐이다.

```javascript
var statement = 'I am an immutable value'; // string은 immutable value

var otherStr = statement.slice(8, 17);

console.log(otherStr);   // 'immutable'
console.log(statement);  // 'I am an immutable value'
```

2행에서 Stirng 객체의 slice() 메소드는 statement 변수에 저장된 문자열을 변경하는 것이 아니라 사실은 새로운 문자열을 생성하여 반환하고 있다. 그 이유는 문자열은 변경할 수 없는 immutable value이기 때문이다.

```javascript
var arr = [];
console.log(arr.length); // 0

var v2 = arr.push(2);    // arr.push()는 메소드 실행 후 arr의 length를 반환
console.log(arr.length); // 1
```

상기 예제에서 v2의 값은 무엇인가? 문자열의 예와 같이 배열이 동작한다면 v2는 새로운 배열(하나의 요소를 가지고 그 값은 2인)을 가지게 될 것이다. 그러나 객체인 arr은 push 메소드에 의해 update되고 v2에는 배열의 새로운 length 값이 반환된다.

처리 후 결과의 복사본을 리턴하는 문자열의 메소드 slice()와는 달리 배열(객체)의 메소드 push()는 `직접 대상 배열을 변경`한다. 그 이유는 배열은 객체이고 객체는 immutable value가 아닌 변경 가능한 값이기 때문이다.

다른 예를 알아보자.

```javascript
var user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

var myName = user.name; // 변수 myName은 string 타입이다.

user.name = 'Kim';
console.log(myName); // Lee

myName = user.name;  // 재할당
console.log(myName); // Kim
```

user.name의 값을 변경했지만 변수 myName의 값은 변경되지 않았다. 이는 user.name의 타입 string이 변경 불가능하기 때문이다.

```javascript
var user1 = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

var user2 = user1; // 변수 user2는 객체 타입이다.

user2.name = 'Kim';

console.log(user1.name); // Kim
console.log(user2.name); // Kim
```

위의 경우 객체 user2의 name 프로퍼티에 새로운 값을 할당하면 객체는 변경 불가능한 값이 아니므로 객체 user2는 변경된다. 그런데 변경하지도 않은 객체 user1도 동시에 변경된다. 이는 user1과 user2가 같은 어드레스를 참조하고 있기 때문이다.

![immutability](/img/immutability.png)
{: .w-400}

Pass-by-reference
{: .desc-img}

이것이 의도한 동작이 아니라면 참조를 가지고 있는 다른 장소에 변경 사실을 통지하고 대처하는 추가 대응이 필요하다.

# 2. 불변 데이터 패턴(immutable data pattern)

의도하지 않은 객체의 변경이 발생하는 원인의 대다수는 "레퍼런스를 참조한 다른 객체에서 객체를 변경"하기 때문이다. 이 문제의 해결 방법은 비용은 조금 들지만 객체를 불변객체로 만들어 프로퍼티의 변경을 방지하며 객체의 변경이 필요한 경우에는 참조가 아닌 객체의 방어적 복사(defensive copy)를 통해 새로운 객체를 생성한 후 변경한다.

이를 정리하면 아래와 같다.

- 객체의 방어적 복사(defensive copy)
: Object.assign

- 불변객체화를 통한 객체 변경 방지
: Object.freeze

## 2.1 Object.assign

Object.assign은 타킷 객체로 소스 객체의 프로퍼티를 복사한다. 이때 소스 객체의 프로퍼티와 동일한 프로퍼티를 가진 타켓 객체의 프로퍼티들은 소스 객체의 프로퍼티로 덮어쓰기된다. 리턴값으로 타킷 객체를 반환한다. ES6에서 추가된 메소드이며 Internet Explorer는 지원하지 않는다.

```javascript
// Syntax
Object.assign(target, ...sources)
```

```javascript
// Copy
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
console.log(obj == copy); // false

// Merge
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const merge1 = Object.assign(o1, o2, o3);

console.log(merge1); // { a: 1, b: 2, c: 3 }
console.log(o1);     // { a: 1, b: 2, c: 3 }, 타겟 객체가 변경된다!

// Merge
const o4 = { a: 1 };
const o5 = { b: 2 };
const o6 = { c: 3 };

const merge2 = Object.assign({}, o4, o5, o6);

console.log(merge2); // { a: 1, b: 2, c: 3 }
console.log(o4);     // { a: 1 }
```

Object.assign을 사용하여 기존 객체를 변경하지 않고 객체를 복사하여 사용할 수 있다.

```javascript
const user1 = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

const user2 = Object.assign({}, user1); // user1을 {}에 Copy

user2.name = 'Kim';

// 상기 2행은 아래와 동치이다.
// {name: 'Kim'}은 user1에 병합되는 것이 아니라 첫번째 인자인 {}에 병합된다.
// const user2 = Object.assign({}, user1, {name: 'Kim'});

console.log(user1.name); // Lee
console.log(user2.name); // Kim
```

user1 객체를 빈객체에 복사하여 새로운 객체 user2를 생성하였다. user1과 user2는 어드레스를 공유하지 않으므로 한 객체를 변경하여도 다른 객체에 아무런 영향을 주지 않는다.

주의할 것은 user1 객체는 const로 선언되어 재할당은 할 수 없지만 객체의 프로퍼티는 보호되지 않는다. 다시 말하자면 객체의 내용은 변경할 수 있다.

## 2.2 Object.freeze

[Object.freeze()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)를 사용하여 불변(immutable) 객체로 만들수 있다.

```javascript
const user1 = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

const user2 = Object.assign({}, user1, {name: 'Kim'});

console.log(user1.name); // Lee
console.log(user2.name); // Kim

Object.freeze(user1);

user1.name = 'Kim'; // 무시된다!

console.log(user1); // { name: 'Lee', address: { city: 'Seoul' } }

console.log(Object.isFrozen(user1)); // true
```

하지만 객체 내부의 객체(Nested Object)는 변경가능하다.

```javascript
const user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

Object.freeze(user);

user.address.city = 'Busan'; // 변경된다!
console.log(user); // { name: 'Lee', address: { city: 'Busan' } }
```

내부 객체까지 변경 불가능하게 만들려면 Deep freeze를 하여야 한다.

```javascript
function deepFreeze(obj) {
  const props = Object.getOwnPropertyNames(obj);

  props.forEach((name) => {
    const prop = obj[name];
    if(typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}

const user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

deepFreeze(user);

user.name = 'Kim';           // 무시된다
user.address.city = 'Busan'; // 무시된다

console.log(user); // { name: 'Lee', address: { city: 'Seoul' } }
```

<!--프로토타입을 통한 우회
```javascript
var parent = { name: 'Lee' }; // prototype

var me = Object.create(parent);

console.log(me.name); // prototype chain

Object.freeze(me);

parent.name = 'Kim';

console.log(me.name);
```
-->

## 2.3 Immutable.js

Object.assign과 Object.freeze을 사용하여 불변 객체를 만드는 방법은 번거러울 뿐더러 성능상 이슈가 있어서 큰 객체에는 사용하지 않는 것이 좋다.

또 다른 대안으로 Facebook이 제공하는 [Immutable.js](https://facebook.github.io/immutable-js/)를 사용하는 방법이 있다.

Immutable.js는 List, Stack, Map, OrderedMap, Set, OrderedSet, Record와 같은 영구 불변 (Permit Immutable) 데이터 구조를 제공한다.

npm을 사용하여 Immutable.js를 설치한다.

```bash
$ npm install immutable
```

Immutable.js의 Map 모듈을 임포트하여 사용한다.

```javascript
const { Map } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3 })
const map2 = map1.set('b', 50)
map1.get('b') // 2
map2.get('b') // 50
```

map1.set('b', 50)의 실행에도 불구하고 map1은 불변하였다. map1.set()은 결과를 반영한 새로운 객체를 반환한다.
