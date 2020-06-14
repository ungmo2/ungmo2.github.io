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

ES6에서 도입된 제너레이터(generator) 함수는 이터러블을 생성하는 함수이다. 제너레이터 함수를 사용하면 [이터레이션 프로토콜](/fastcampus/iterable#1-이터레이션-프로토콜)을 준수해 이터러블을 생성하는 방식보다 간편하게 이터러블을 구현할 수 있다. 또한 제너레이터 함수는 비동기 처리를 동기 처리처럼 구현하기 위해 유용하게 사용된다.

먼저 이터레이션 프로토콜을 준수해 무한 이터러블을 생성하는 함수를 구현해보자.

```javascript
const createInfinityByIteration = function () {
  let i = 0;
  return {
    [Symbol.iterator]() { return this; },
    next() {
      return { value: ++i };
    }
  };
};

for (const n of createInfinityByIteration()) {
  if (n > 5) break;
  console.log(n); // 1 2 3 4 5
}
```

이번에는 제너레이터 함수를 사용해 무한 이터러블을 생성하는 함수를 구현해보자.

```javascript
function* createInfinityByGenerator() {
  let i = 0;
  while (true) { yield ++i; }
}

for (const n of createInfinityByGenerator()) {
  if (n > 5) break;
  console.log(n); // 1 2 3 4 5
}
```

제너레이터 함수는 일반 함수처럼 함수의 코드 블록을 한 번에 실행하지 않고, 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수이다.

```javascript
// 제너레이터 함수 정의
function* counter(n) {
  console.log('Point 1');
  yield ++n;              // 첫 번째 next 메서드 호출 시에 이 지점까지 실행된다.
  console.log('Point 2');
  yield ++n;              // 두 번째 next 메서드 호출 시에 이 지점까지 실행된다.
  console.log('Point 3'); // 세 번째 next 메서드 호출 시에 이 지점까지 실행된다.
}

// 제너레이터 함수를 호출하면 이터러블이며 동시에 이터레이터인 제너레이터 객체를 반환한다.
const generator = counter(0);

console.log(generator.next()); // Point 1 {value: 1, done: false}
console.log(generator.next()); // Point 2 {value: 2, done: false}
console.log(generator.next()); // Point 3 {value: undefined, done: true}
```

일반 함수를 호출하면 코드 블록을 실행하고 return 키워드 뒤의 값을 반환한다. 하지만 **제너레이터 함수를 호출하면 일반 함수처럼 코드 블록을 실행하지 것이 아니라 이터러블(iterable)이면서 동시에 이터레이터(iterator)인 제너레이터 객체를 생성해 반환한다.** 다시 말해, 제너레이터 함수가 생성해 반환한 제너레이터 객체는 Symbol.iterator 메서드를 소유한 이터러블이면서 next 메서드를 소유하며 next 메서드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 이터레이터다.

```javascript
// 제너레이터 함수 정의
function* counter(n) {
  yield ++n;
  yield ++n;
}

// 제너레이터 함수를 호출하면 제너레이터를 반환한다.
let generator = counter(0);

// 제너레이터는 이터러블이다.
// 이터러블은 Symbol.iterator을 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인에 의해 상속한 객체다.
console.log(Symbol.iterator in generator); // true

// 제너레이터는 이터러블이므로 for...of 문으로 순회할 수 있다.
for (const v of generator) {
  console.log(v); // 1 2
}

generator = counter(0);
// 제너레이터는 이터러블이므로 스프레드 문법의 대상이 될 수 있다.
console.log([...generator]); // [1, 2]

generator = counter(0);
// 제너레이터는 이터러블이므로 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [x, y, z] = generator;
console.log(x, y, z); // 1 2

generator = counter(0);
// 제너레이터는 이터러블이면서 동시에 이터러레이터다.
// 이터레이터는 next 메서드를 갖는다.
console.log('next' in generator); // true

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.next()); // {value: 2, done: false}
console.log(generator.next()); // {value: undefined, done: true}
```

# 2. 제너레이터 함수의 정의

제너레이터 함수는 function* 키워드로 선언한다. 그리고 하나 이상의 yield 문을 포함한다.

```javascript
// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

let generator = genDecFunc();

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

generator = genExpFunc();

// 제너레이터 메서드
const obj = {
  * genObjMethod() {
    yield 1;
  }
};

generator = obj.genObjMethod();

// 제너레이터 클래스 메서드
class MyClass {
  * genClsMethod() {
    yield 1;
  }
}

const myClass = new MyClass();
generator = myClass.genClsMethod();
```

제너레이터 함수는 화살표 함수로 정의할 수 없다.

```javascript
const genArrowFunc = * () => {
  yield 1;
};
// SyntaxError: Unexpected token '*'
```

제너레이터 함수는 생성자 함수로 호출할 수 없다.

```javascript
function* genFunc() {
  yield 1;
}
new genFunc(); // TypeError: genFunc is not a constructor
```

# 3. 제너레이터 실행의 일시 중단과 재개

앞에서 살펴본 바와 같이 제너레이터 함수를 호출하면 제너레이터 함수의 코드 블록이 실행되는 것이 아니라 제너레이터 객체를 반환한다. 제너레이터 객체는 이터러블이면서 동시에 이터레이터다. 이터레이터인 제너레이터 객체는 next 메서드를 가지므로 next 메서드를 호출하기 위해 Symbol.iterator 메서드로 이터레이터를 별도 생성할 필요가 없다.

제너레이터 함수가 생성한 제너레이터 객체의 next 메서드를 호출하면 제너레이터 함수의 코드 블록을 실행한다. 단, 일반 함수처럼 한 번에 코드 블록의 모든 코드를 실행하는 것이 아니라 yield 문까지 실행한다. 다음 예제를 살펴보자.

```javascript
// 제너레이터 함수 정의
function* counter() {
  console.log('Point 1');
  yield 1;                // 첫 번째 next 메서드 호출 시 여기까지 실행된다.
  console.log('Point 2');
  yield 2;                // 두 번째 next 메서드 호출 시 여기까지 실행된다.
  console.log('Point 3'); // 세 번째 next 메서드 호출 시 여기까지 실행된다.
}

// 제너레이터 함수를 호출하면 이터러블이며 동시에 이터레이터인 제너레이터 객체를 반환한다.
// 이터레이터는 next 메서드를 갖는다.
const generator = counter(0);

// 첫 번째 next 메서드 호출: 첫 번째 yield 문까지 실행되고 일시 중단된다.
console.log(generator.next()); // Point 1 {value: 1, done: false}

// 두 번째 next 메서드 호출: 두 번째 yield 문까지 실행되고 일시 중단된다.
console.log(generator.next()); // Point 2 {value: 2, done: false}

// 세 번째 next 메서드 호출: 제너레이터 함수 내의 모든 yield 문이 실행되면 done 프로퍼티 값은 true가 된다.
console.log(generator.next()); // Point 3 {value: undefined, done: true}
```

제너레이터 함수가 생성한 제너레이터 객체의 next 메서드를 처음 호출하면 첫 번째 yield 문까지 실행되고 일시 중단(suspend)된다. 또 다시 next 메서드를 호출하면 중단된 위치에서 다시 실행을 재개(resume)하기 시작하여 두 번째 yield 문까지 실행되고 또 다시 일시 중단된다.

```
start -> generator.next() -> yield 1 -> generator.next() -> yield 2 -> generator.next() -> end
```

# 4. next 메서드와 yield

이터러블이면서 동시에 이터러이터인 제너레이터 객체의 next 메서드는 value, done 프로퍼티를 갖는 이터레이터 리절트 객체(["34.1.2. 이터레이터"](/fastcampus/iterable#12-이터레이터) 참고)를 반환한다.

제너레이터 객체의 next 메서드가 호출되면 제너레이터 함수의 yield 문까지 실행된다. 이때 **yield 키워드 뒤의 반환값은 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당된다. 그리고 done 프로퍼티에는 제너레이터 함수 내의 모든 yield 문이 실행되었는지를 나타내는 불리언 값이 할당된다.**

```javascript
function* genFunc(n) {
  yield ++n;
  yield ++n;
  return ++n;
}

// 제너레이터 함수를 호출하면 이터러블이며 동시에 이터레이터인 제너레이터 객체를 반환한다.
// 이터레이터는 next 메서드를 갖는다.
const generator = genFunc(0);

// 제너레이터 객체의 next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 yield 문이 반환한 값이 할당된다.
// done 프로퍼티에는 모든 yield 문이 실행되었는지를 나타내는 불리언 값이 할당된다.
let res = generator.next();
console.log(res); // {value: 1, done: false}

res = generator.next();
console.log(res); // {value: 2, done: false}

res = generator.next();
console.log(res); // {value: 3, done: true}
```

이터레이터의 next 메서드와 다르게 제너레이터의 next 메서드에는 인수를 전달할 수 있다. next 메서드에 전달한 인수는 제너레이터 함수의 yield 문을 할당받는 변수에 할당된다.

```javascript
function* genFunc(n) {
  // n은 첫 번째 next 메서드를 호출했을 때 반환된 이터레이터 리절트 객체의 value 프로퍼티에 할당된다.
  // x 변수에는 두 번째 next 메서드를 호출할 때 전달한 인수가 할당된다.
  const x = yield n;

  // x + 1은 두 번째 next 메서드를 호출했을 때 반환된 이터레이터 리절트 객체의 value 프로퍼티에 할당된다.
  // y 변수에는 세 번째 next 메서드를 호출할 때 전달한 인수가 할당된다.
  const y = yield (x + 1);

  // x + y는 세 번째 next 메서드를 호출했을 때 반환된 이터레이터 리절트 객체의 value 프로퍼티에 할당된다.
  return x + y;
}

// 제너레이터 함수를 호출하면 이터러블이며 동시에 이터레이터인 제너레이터 객체를 반환한다.
// 이터레이터는 next 메서드를 갖는다.
const generator = genFunc(0);

// 첫 번째 호출하는 next 메서드에는 인수를 전달하지 않는다.
// 만약 첫 번째 호출하는 next 메서드에 인수를 전달하면 무시된다.
let res = generator.next();
console.log(res); // {value: 0, done: false}

// next 메서드에 인수로 전달한 10은 genFunc 함수의 x 변수에 할당된다.
res = generator.next(10);
console.log(res); // {value: 11, done: false}

// next 메서드에 인수로 전달한 20은 genFunc 함수의 y 변수에 할당된다.
res = generator.next(20);
console.log(res); // {value: 30, done: true}
```

이처럼 next 메서드와 yield를 통해 제너레이터 객체의 데이터를 외부로 전달할 수 있고, 외부의 데이터를 제너레이터 객체에 전달할 수도 있다.

# 5. 제너레이터의 활용

## 5.1 이터러블의 구현

제너레이터 함수를 사용하면 [이터레이션 프로토콜](/fastcampus/iterable#1-이터레이션-프로토콜)을 준수해 이터러블을 생성하는 방식보다 간편하게 이터러블을 구현할 수 있다. 이터레이션 프로토콜을 준수하여 무한 피보나치 수열을 생성하는 함수를 구현해 보자.

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
  console.log(num); // 1 2 3 5 8...
}
```

이터레이션 프로토콜을 보다 간단하게 처리하기 위해 제너레이터를 활용할 수 있다. 제너레이터를 활용하여 무한 피보나치 수열을 구현한 이터러블을 만들어 보자.

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
  console.log(num);
}
```

제너레이터 함수에 최대값을 인수로 전달해보자.

```javascript
// 무한 이터러블을 생성하는 제너레이터 함수
const createInfiniteFibByGen = function* (max) {
  let [prev, curr] = [0, 1];

  while (true) {
    [prev, curr] = [curr, prev + curr];
    if (curr >= max) return; // 제너레이터 함수 종료
    yield curr;
  }
};

for (const num of createInfiniteFibByGen(10000)) {
  console.log(num); // 1 2 3 5 8 ... 2584, 4181, 6765
}
```

제너레이터 객체의 next 메서드에는 인수를 전달할 수도 있다. 이를 통해 제너레이터 객체에 데이터를 전달할 수 있다.

```javascript
function* gen(n) {
  let res;
  res = yield n;    // n: 0 ⟸ gen 함수에 전달한 인수

  console.log(res); // res: 1 ⟸ 두 번째 next 호출 시 전달한 데이터
  res = yield res;

  console.log(res); // res: 2 ⟸ 세 번째 next 호출 시 전달한 데이터
  res = yield res;

  console.log(res); // res: 3 ⟸ 네번째 next 호출 시 전달한 데이터
  return res;
}

const generator = gen(0);

console.log(generator.next());  // 제너레이터 함수의 코드 블록을 실행하기 시작
console.log(generator.next(1)); // 제너레이터 객체에 1 전달
console.log(generator.next(2)); // 제너레이터 객체에 2 전달
console.log(generator.next(3)); // 제너레이터 객체에 3 전달
/*
{ value: 0, done: false }
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: true }
*/
```

이터레이터의 next 메서드는 이터러블의 데이터를 꺼내 온다. 이에 반해 제너레이터의 next 메서드에 인수를 전달하면 제너레이터 객체에 데이터를 밀어 넣는다. 제너레이터의 이런 특성은 동시성 프로그래밍을 가능하게 한다.

<!-- ## 4.3 배열 고차함수와의 성능 비교

[무한 이터러블과 Lazy evaluation(지연 평가)](./es6-iteration-for-of#34-무한-이터러블과-lazy-evaluation지연-평가)에서 살펴 보았듯이 Array.prototype.forEach, Array.prototype.map, Array.prototype.filter 등과 같은 배열 고차함수는 for 문과는 달리 break 문을 사용할 수 없어서 불필요한 순회를 하는 경우가 있고, 처리 결과를 배열로 반환한다. 이터러블은 지연 평가를 통해 데이터를 생성하기 때문에 배열 고차함수보다 빠르고 메모리를 효율적으로 사용한다.

이는 제러네이터 함수로 이터러블을 생성할 때도 마찬가지다. 아래 예제는 id와 name 프로퍼티를 갖는 user 객체들의 배열인 users에서 user 객체를 Array.prototype.filter과 이터러블을 통해 필터링하는 경우, 각각 퍼포먼스를 측정한 것이다. 약 25배 정도의 성능 차이를 보인다. 대상 배열이 크면 클수록 격차는 더 벌어진다.

```javascript
// 퍼포먼스 테스트를 위해 id로 sort되어 있는 1,000,000개의 요소를 갖는 배열을 생성
const users = [];
for (let i = 0; i < 1000000; i++) {
  users.push({ id: i + 1, name: String.fromCharCode(65 + i) });
}

// Array.prototype.filetr를 사용한 경우의 퍼포먼스
console.time('Array#filter');
console.log(users.filter(user => user.id <= 3));
console.timeEnd('Array#filter'); // 약 25 ~ 30ms

// Generator를 사용한 경우의 퍼포먼스
console.time('Generator');
function* filter(iterable, fn) {
  for (const item of iterable) {
    if (fn(item)) yield item;
    else return; // 필터링 조건에 맞지 않으면 이터러블 순회를 멈추고 종료
  }
}

console.log([...filter(users, user => user.id <= 3)]);
console.timeEnd('Generator'); // 약 1ms
``` -->

## 5.2 비동기 처리

제너레이터를 사용해 비동기 처리를 동기 처리처럼 구현할 수 있다. 다시 말해, 비동기 처리 함수가 처리 결과를 반환하도록 구현할 수 있다. 다음 예제를 살펴보자.

```javascript
// node-fetch는 node.js 환경에서 window.fetch 함수를 사용하기 위한 패키지다.
// https://github.com/node-fetch/node-fetch
const fetch = require('node-fetch');

// 비동기 함수
const getUser = (genObj, username) => {
  fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    // ④ 제너레이터 객체의 next 메서드를 호출하면서 비동기 처리 결과를 전달한다.
    .then(user => genObj.next(user.name));
};

// ① 제너레이터 함수를 즉시 실행하여 제너레이터 객체를 생성하고 g 변수에 할당한다.
const g = (function* () {
  // next 메서드의 처음 호출하면 이 곳부터 실행이 시작된다.
  let user;
  // ③ 비동기 함수 getUser가 호출된다.
  // user 변수에는 ④의 비동기 처리 결과가 할당한다. 이로써 비동기 처리의 순서가 보장된다.
  user = yield getUser(g, 'jeresig');
  // next 메서드의 처음 호출하면 이 곳에서 실행이 일시 정지된다.

  // next 메서드의 두 번째 호출하면 이 곳부터 실행이 재개된다.
  console.log(user); // John Resig
  user = yield getUser(g, 'ahejlsberg');
  // next 메서드의 두 번째하면 이 곳에서 실행이 일시 정지된다.

  // next 메서드의 세 번째 호출하면 이 곳부터 실행이 재개된다.
  console.log(user); // Anders Hejlsberg
  user = yield getUser(g, 'ungmo2');
  // next 메서드의 세 번째 호출하면 이 곳부터 실행이 재개된다.

  // next 메서드의 네 번째 호출하면 이 곳부터 실행이 재개된다.
  console.log(user); // Ungmo Lee
}());

// ② 제너레이터 객체의 next 메서드를 호출해서 제너레이터 함수의 첫 번째 yield 문까지 실행한다.
g.next();
```

위 예제가 어떻게 실행되는지 순서대로 살펴보자.

1. ①에서 제너레이터 함수를 즉시 호출하여 제너레이터 객체를 생성하고 g 변수에 할당한다. 제너레이터 함수가 호출됐지만 현재 제너레이터 함수의 코드 블록은 아직 실행되지 않았고 제너레이터 객체를 생성해 반환했을 뿐이다.

2. ②에서 제너레이터 객체의 next 메서드를 처음 호출(첫 번째 호출)해서 제너레이터 함수의 첫 번째 yield 문까지 실행한다. 이때 비동기 함수인 getUser가 호출된다(③). 현재 user 변수의 값은 undefined다.

3. 비동기 함수인 getUser가 호출되면 fetch 함수를 통해 HTTP 요청이 전송되고 서버의 응답이 도착하면 getUser 함수 내부의 두 번째 then 메서드가 호출된다(④). then 메서드가 호출되면 then 메서드의 콜백 함수가 호출되어 제너레이터 객체의 next 메서드를 호출(두 번째 호출)하면서 비동기 처리 결과 user.name을 인수로 전달한다. 이때 next 메서드의 인수로 전달한 비동기 처리 결과 user.name은 ③의 user 변수에 할당된다.

4. 3에서 제너레이터 객체의 next 메서드가 두 번째 호출되었으므로 제너레이터 함수의 두 번째 yield 문까지 실행한다. 이때 비동기 함수인 getUser가 호출된다(③). getUser 함수가 호출되면 3을 반복한다.

# 6. async/await

제너레이터를 통해 비동기 처리를 동기 처리처럼 구현할 수 있게 되었지만 코드는 장황해졌다. 따라서 좀 더 간편하게 비동기 처리를 동기 처리처럼 구현할 수 있는 async/awit가 ES7에서 도입되었다.

async/await를 사용하면 프로미스의 then/catch/finally 후속 처리 메서드에 콜백 함수를 전달해서 후속 처리를 할 필요없이 마치 동기 처리처럼 프로미스를 사용할 수 있다. 위 예제를 async/awit 구현해 보자.

```javascript
const fetch = require('node-fetch');

// Promise를 반환하는 함수 정의
function getUser(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(user => user.name);
}

async function getUserAll() {
  let user;
  user = await getUser('jeresig');
  console.log(user);

  user = await getUser('ahejlsberg');
  console.log(user);

  user = await getUser('ungmo2');
  console.log(user);
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

# Reference

* [MDN: function\*](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)

* [ES6 In Depth: 제너레이터(Generator)](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/)

* [이터레이션 프로토콜(iteration protocol)과 for-of 루프](./es6-iteration-for-of)
