---
layout: fs-post
title: <strong>제너레이터와 async/awit</strong>
categories: fastcampus
section: fastcampus
seq: 46
permalink: /:categories/:title
description:
---

* TOC
{:toc}

# 1. 제너레이터란?

ES6에서 도입된 제너레이터(generator)는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수이다. 제너레이터와 일반 함수는 다음과 같은 차이가 있다.

1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
: 일반 함수를 호출하면 제어권이 함수에게 넘어가고 함수 코드를 일괄 실행한다. 즉, 함수 호출자(caller)는 함수를 호출한 후에 함수의 실행을 제어할 수 없다. 제너레이터 함수는 함수의 실행을 함수 호출자가 제어할 수 있다. 다시 말해, 함수 호출자가 함수의 실행을 일시 중지시키거나 재개시킬 수 있다. 이는 **함수의 제어권을 함수가 독점하는 것이 아니라 함수 호출자에게 양도(yield)할 수 있다**는 것을 의미한다.

2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고 받을 수 있다.
: 일반 함수를 호출하면 매개변수를 통해 함수 외부에서 값을 주입받고 함수 코드를 일괄 실행하여 결과값을 함수 외부로 반환한다. 즉, 함수가 실행되고 있는 동안에는 함수 외부에서 함수 내부로 값을 전달하여 함수의 상태를 변경할 수 없다. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고 받을 수 있다. 다시 말해, **함수 호출자에게 상태를 전달할 수 있고 함수 호출자로부터 상태를 전달받을 수도 있다.**

3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
: 일반 함수를 호출하면 함수 코드를 일괄 실행하고 값을 반환한다. **제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 제너레이터 객체를 반환한다.**

# 2. 제너레이터 함수의 정의

제너레이터 함수는 function* 키워드로 선언한다. 그리고 하나 이상의 yield 문을 포함한다. 이것을 제외하면 일반 함수를 정의하는 방법과 같다.

```javascript
// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

// 제너레이터 메서드
const obj = {
  * genObjMethod() {
    yield 1;
  }
};

// 제너레이터 클래스 메서드
class MyClass {
  * genClsMethod() {
    yield 1;
  }
}
```

제너레이터 함수는 화살표 함수로 정의할 수 없다.

```javascript
const genArrowFunc = * () => {
  yield 1;
};
// SyntaxError: Unexpected token '*'
```

제너레이터 함수는 new 연산자와 함깨 생성자 함수로 호출할 수 없다.

```javascript
function* genFunc() {
  yield 1;
}
new genFunc(); // TypeError: genFunc is not a constructor
```

# 3. 제너레이터 객체

**제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다. 제너레이터 함수가 반환한 제너레이터 객체는 이터러블(iterable)이면서 동시에 이터레이터(iterator)다.** 다시 말해, 제너레이터 객체는 Symbol.iterator 메서드를 상속받는 이터러블이면서 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 next 메서드를 소유하는 이터레이터다. 제너레이터 객체는 next 메서드를 가지는 이터레이터이므로 Symbol.iterator 메서드를 호출해서 별도로 이터레이터를 생성할 필요가 없다.([이터레이션 프로토콜](/fastcampus/iterable#1-이터레이션-프로토콜) 참고)

```javascript
// 제너레이터 함수
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
const generator = genFunc();

// 제너레이터 객체는 이터러블(iterable)이면서 동시에 이터레이터(iterator)다.
// 이터러블은 Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체다.
console.log(Symbol.iterator in generator); // true
// 이터레이터는 next 메서드를 갖는다.
console.log('next' in generator); // true
```

# 4. 제너레이터 함수 실행의 일시 중단과 재개

앞에서 살펴본 바와 같이 제너레이터 함수를 호출하면 제너레이터 함수의 코드 블록이 실행되는 것이 아니라 제너레이터 객체를 반환한다. 이터러블이며 동시에 이터레이터인 제너레이터 객체는 next 메서드를 갖는다.

제너레이터 객체의 next 메서드를 호출하면 제너레이터 함수의 코드 블록을 실행한다. 단, 일반 함수처럼 한 번에 코드 블록의 모든 코드를 실행하는 것이 아니라 yield 문까지만 실행한다. 이를 통해 제너레이터 함수는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있다. 다음 예제를 살펴보자.

```javascript
// 제너레이터 함수
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// 이터러블이며 동시에 이터레이터인 제너레이터 객체는 next 메서드를 갖는다.
const generator = genFunc();

// 첫 번째 next 메서드를 호출하면 첫 번째 yield 문까지 실행되고 일시 중단된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 첫 번째 yield 문에서 yield된 값 1이 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 1, done: false}

// 두 번째 next 메서드를 호출하면 두 번째 yield 문까지 실행되고 일시 중단된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 두 번째 yield 문에서 yield된 값 2가 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 2, done: false}

// 세 번째 next 메서드를 호출하면 세 번째 yield 문까지 실행되고 일시 중단된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 세 번째 yield 문에서 yield된 값 3이 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 3, done: false}

// 네 번째 next 메서드를 호출하면 남은 yield 문이 없으므로 제너레이터 함수의 마지막까지 실행한다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 제너레이터 함수의 반환값 undefined가 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었음을 나타내는 true가 할당된다.
console.log(generator.next()); // {value: undefined, done: true}
```

**제너레이터 객체의 next 메서드를 호출하면 yield 문까지 실행되고 일시 중단(suspend)된다. 이때 제너레이터 객체의 next 메서드는 value, done 프로퍼티를 갖는 이터레이터 리절트 객체(["34.1.2. 이터레이터"](/fastcampus/iterable#12-이터레이터) 참고)를 반환한다. next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 yield 문에서 yield된 값(yield 키워드 뒤의 값)은 할당된다. 그리고 done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 불리언 값이 할당된다.**

또 다시 next 메서드를 호출하면 중단된 위치에서 다시 실행을 재개(resume)하기 시작하여 두 번째 yield 문까지 실행되고 또 다시 일시 중단된다.

이처럼 next 메서드를 반복 호출하여 yield 문까지 실행과 일시 중단을 반복하다가 제너레이터 함수가 끝까지 실행되면 next 메서드가 반환하는 이터레이터 리절트 객체의 value 프로퍼티에는 제너레이터 함수의 반환값이 할당되고 done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었음을 나타내는 false가 할당된다.

```
generator.next() -> yield -> generator.next() -> yield -> ... -> generator.next() -> return
```

이터레이터의 next 메서드와는 달리 제너레이터 객체의 next 메서드에는 인수를 전달할 수 있다. 제너레이터 객체의 next 메서드에 전달한 인수는 제너레이터 함수의 yield 문을 할당받는 변수에 할당된다. 다음 예제를 살펴보자.

```javascript
function* genFunc() {
  // 첫 번째 next 메서드를 호출하면 첫 번째 yield 문까지 실행되고 일시 중단된다.
  // yield된 값 1은 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당된다.
  const x = yield 1;

  // 두 번째 next 메서드를 호출할 때 전달한 인수 10은 x 변수에 할당된다.
  // 두 번째 next 메서드를 호출하면 두 번째 yield 문까지 실행되고 일시 중단된다.
  // yield된 값 x + 10은 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당된다.
  const y = yield (x + 10);

  // 세 번째 next 메서드를 호출할 때 전달한 인수 20은 y 변수에 할당된다.
  // 세 번째 next 메서드를 호출하면 함수 끝까지 실행된다.
  // 반환값 x + y는 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당된다.
  return x + y;
}

// 제너레이터 함수를 호출하면 이터러블이며 동시에 이터레이터인 제너레이터 객체를 반환한다.
// 이터레이터는 next 메서드를 갖는다.
const generator = genFunc(0);

// 첫 번째 호출하는 next 메서드에는 인수를 전달하지 않는다.
// 만약 첫 번째 호출하는 next 메서드에 인수를 전달하면 무시된다.
// next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 첫 번째 yield된 값 1이 할당된다.
let res = generator.next();
console.log(res); // {value: 1, done: false}

// next 메서드에 인수로 전달한 10은 genFunc 함수의 x 변수에 할당된다.
// next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 두 번째 yield된 값 20이 할당된다.
res = generator.next(10);
console.log(res); // {value: 20, done: false}

// next 메서드에 인수로 전달한 20은 genFunc 함수의 y 변수에 할당된다.
// next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 빈환값 30이 할당된다.
res = generator.next(20);
console.log(res); // {value: 30, done: true}
```

이처럼 제너레이터 함수는 next 메서드와 yield 문을 통해 함수 호출자와 함수의 상태를 주고 받을 수 있다. 함수 호출자는 next 메서드를 통해 제너레이터 객체가 관리하는 상태(yield된 값)를 꺼내올 수 있고, 제너레이터의 next 메서드에 인수를 전달하면서 호출하면 제너레이터 객체에 상태(yield 문을 할당받는 변수)를 밀어 넣을 수 있다. 제너레이터의 이런 특성은 비동기 처리를 동기 처리처럼 구현할 수 있게 한다. 이에 대해서는 "46.5.2. 비동기 처리"에서 살펴보자.

# 5. 제너레이터의 활용

## 5.1 이터러블의 구현

제너레이터 함수를 사용하면 [이터레이션 프로토콜](/fastcampus/iterable#1-이터레이션-프로토콜)을 준수해 이터러블을 생성하는 방식보다 간편하게 이터러블을 구현할 수 있다. 먼저 이터레이션 프로토콜을 준수하여 무한 피보나치 수열을 생성하는 함수를 구현해 보자.

```javascript
// 무한 이터러블을 생성하는 함수
const infiniteFibonacci = (function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() { return this; },
    next() {
      [pre, cur] = [cur, pre + cur];
      // 무한 이터러블이므로 done 프로퍼티를 생략한다.
      return { value: cur };
    }
  };
}());

// infiniteFibonacci는 무한 이터러블이다.
for (const num of infiniteFibonacci) {
  if (num > 10000) break;
  console.log(num); // 1 2 3 5 8...2584 4181 6765
}
```

이터레이션 프로토콜을 보다 간단하게 처리하기 위해 제너레이터를 활용할 수 있다. 제너레이터를 활용하여 무한 피보나치 수열을 생성하는 함수를 구현해 보자.

```javascript
// 무한 이터러블을 생성하는 제너레이터 함수
const infiniteFibonacci = (function* () {
  let [pre, cur] = [0, 1];

  while (true) {
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
}());

// infiniteFibonacci는 무한 이터러블이다.
for (const num of infiniteFibonacci) {
  if (num > 10000) break;
  console.log(num); // 1 2 3 5 8...2584 4181 6765
}
```

## 5.2 비동기 처리

제너레이터를 사용하면 비동기 처리를 동기 처리처럼 구현할 수 있다. 다시 말해, 비동기 처리 함수가 처리 결과를 반환하도록 구현할 수 있다. 다음 예제를 살펴보자.

```javascript
const fetch = require('node-fetch');

const async = generatorFunc => {
  // 제너레이터 함수를 호출하여 제너레이터 객체를 생성한다.
  const generator = generatorFunc();

  const onResolved = arg => {
    // 첫 번째 next 메서드 호출: 첫 번째 yeild까지 실행하고 yeild한 값(sleep(1000)이 resolve한 1000)을 value 프로퍼티 값으로 반환
    // {value: Promise, done: false}
    // 두 번째 next 메서드 호출: 두 번째 yeild까지 실행하고 yeild한 값(sleep(2000)이 resolve한 2000)을 value 프로퍼티 값으로 반환
    // {value: Promise, done: false}
    // 세 번째 next 메서드 호출: 세 번째 yeild까지 실행하고 yeild한 값(Promise.all([sleep(3000), sleep(4000)])이 resolve한 3000과 4000)을 value 프로퍼티 값으로 반환
    // {value: Promise, done: false}
    // 네 번째 next 메서드 호출: 마지막까지 실행하고 반환문이 없을므로 undefined를 value 프로퍼티 값으로 반환
    // {value: undefined, done: true}
    const result = generator.next(arg);

    // result.done이 true가 아니면 result.value(yeild한 값)를 인수로 전달하면서 onResolved를 재귀 호출한다.
    // 이때 next 메서드가 다시 호출된다.
    return result.done
      ? result.value
      : Promise.resolve(result.value).then(onResolved); // ③
  };
  return onResolved; // ①
};

(async(
  function* () {
    const response = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
    const todos = yield response.json();
    console.log(todos);
    // { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
  }
)()); // ②
```

위 예제의 async 함수는 제너레이터 함수를 인수로 전달받아 제너레이터 객체를 생성하고 onResolved 함수를 반환한다.(①)

async 함수를 즉시 실행(②)하여 onResolved 함수가 호출되면 제너레이터 객체의 next 메서드가 호출되고 이터레이터 리절트 객체를 반환한다. 이때 제너레이터 함수가 끝까지 실행되었음을 나타내는 이터레이터 리절트 객체의 done 프로퍼티의 값이 false이면 onResolved 함수를 재귀 호출(③)하여 제너레이터 함수를 끝까지 실행시킨다. 이처럼 제너레이터를 사용하면 비동기 처리를 동기 처리처럼 구현할 수 있다.

# 6. async/await

제너레이터를 사용해서 비동기 처리를 동기 처리처럼 구현했지만 코드는 장황해졌다. ES7에서는 제너레이터보다 간편하게 비동기 처리를 동기 처리처럼 구현할 수 있는 async/awit가 도입되었다.

async/await를 사용하면 프로미스의 then/catch/finally 후속 처리 메서드에 콜백 함수를 전달해서 후속 처리를 할 필요없이 마치 동기 처리처럼 프로미스를 사용할 수 있다. 위 예제를 async/awit 구현해 보자.

```javascript
const fetch = require('node-fetch');

// Promise를 반환하는 함수 정의
function getGithubUserName(githubId) {
  return fetch(`https://api.github.com/users/${githubId}`)
    .then(res => res.json())
    .then(user => user.name);
}

async function getUserAll() {
  let userName;
  userName = await getGithubUserName('jeresig');
  console.log(userName);

  userName = await getGithubUserName('ahejlsberg');
  console.log(userName);

  userName = await getGithubUserName('ungmo2');
  console.log(userName);
}

getUserAll();
```

## 6.1. async 함수

await 키워드는 반드시 async 함수 내부에서 사용해야 한다. async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다. async 함수가 명시적으로 프라미스를 반환하지 않더라도 async 함수의 반환값을 프로미스로 래핑하여 반환한다.

```javascript
// async 함수 선언문
async function foo(n) { return n; }
foo(1).then(v => console.log(v)); // 1

// async 함수 표현식
const bar = async function (n) { return n; };
bar(2).then(v => console.log(v)); // 2

// async 화살표 함수
const baz = async n => n;
baz(3).then(v => console.log(v)); // 3

// async 메서드
const obj = {
  async foo(n) { return n; }
};
obj.foo(4).then(v => console.log(v));

// async 클래스 메서드
class MyClass {
  async bar(n) { return n; }
}
const myClass = new MyClass();
myClass.bar(5).then(v => console.log(v));
```

## 6.2. await 키워드

await 키워드는 프라미스가 settled 상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다가 settled 상태가 되면 resolve된 처리 결과 또는 reject된 에러를 반환한다.

```javascript
const fetch = require('node-fetch');

const getGithubUserName = async id => {
  const res = await fetch(`https://api.github.com/users/${id}`);
  const { name } = await res.json();
  console.log(name);
}

getGithubUserName('ungmo2'); // Ungmo Lee
```

## 6.3. 에러 처리

비동기 처리를 위한 콜백 패턴의 단점 중 ["45.1.2. 에러 처리의 한계"](/fastcampus/promise#12-에러-처리의-한계)에서 살펴본 바와 같이, 에러는 호출자(caller) 방향으로 전파된다. 즉, 콜 스택의 아래 방향(실행 중인 실행 컨텍스트에서 직전에 푸시된 실행 컨텍스트 방향)으로 전파된다. 하지만 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에 try/catch 문을 사용해 에러를 캐치할 수 없다.

```javascript
try {
  setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
  // 에러를 캐치하지 못한다
  console.error('캐치한 에러', e);
}
```

async/await에서 에러 처리는 try/catch 문을 사용할 수 있다. 콜백 함수를 인수로 전달받는 비동기 함수와는 달리, 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.

```javascript
const fetch = require('node-fetch');

const getGithubUserName = async id => {
  try {
    const res = await fetch(`https://api.github.com/users/${id}`);
    const { name } = await res.json();
    console.log(name);
  } catch(err) {
    console.error(err);
  }
}

getGithubUserName('ungmo2'); // Ungmo Lee
```

위 예제의 getGithubUserName 함수의 catch 문은 HTTP 통신에서 발생한 네트워크 에러뿐만 try 문 내부의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있다.
