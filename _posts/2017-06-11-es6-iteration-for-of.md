---
layout: post
title: <strong>Iteration & for...of</strong>
subtitle: 이터레이션과 for...of 문
categories: es6
section: es6
seq: 6
subseq: 10
description: ES6에서 도입된 이터레이션 프로토콜(iteration protocol)은 데이터 컬렉션을 순회하기 위한 프로토콜(미리 약속된 규칙)이다. 이 프로토콜을 준수한 객체는 for...of 문으로 순회할 수 있고 Spread 연산자)의 피연산자가 될 수 있다. 이터레이션 프로토콜에는 이터러블 프로토콜(iterable protocol)과 이터레이터 프로토콜(iterator protocol)이 있다.
---

* TOC
{:toc}

![es6 Logo](./img/es6.png)
{: .w-650}

# 1. 이터레이션 프로토콜

ES6에서 도입된 이터레이션 프로토콜(iteration protocol)은 데이터 컬렉션을 순회하기 위한 프로토콜(미리 약속된 규칙)이다. 이 프로토콜을 준수한 객체는 for...of 문으로 순회할 수 있고 [Spread 연산자](./es6-extended-parameter-handling#3-spread-연산자)의 피연산자가 될 수 있다.

이터레이션 프로토콜에는 이터러블 프로토콜(iterable protocol)과 이터레이터 프로토콜(iterator protocol)이 있다.

![iteration-protocol](./img/iteration-protocol.png)

이터레이션 프로토콜(Iteration protocol)
{: .desc-img}

<!-- 이터레이션 프로토콜(iteration protocol)은 ES6에서 새롭게 도입된 for...of 문을 통해 반복 처리를 수행하기 위한 프로토콜(미리 약속된 규칙)이다. 이터레이션 프로토콜은 이터러블 프로토콜(iterable protocol)과 이터레이터 프로토콜(iterator protocol)로 구성된다. -->

## 1.1 이터러블

이터러블 프로토콜을 준수한 객체를 이터러블이라 한다. 이터러블은 <strong>Symbol.iterator 메소드</strong>를 구현하거나 프로토타입 체인에 의해 상속한 객체를 말한다. Symbol.iterator 메소드는 이터레이터를 반환한다. 이터러블은 for…of 문에서 순회가 가능하다.

배열은 Symbol.iterator 메소드를 소유한다. 따라서 배열은 이터러블 프로토콜을 준수한 이터러블이다.

```javascript
const array = [1, 2, 3];

// 배열은 Symbol.iterator 메소드를 소유한다.
// 따라서 배열은 이터러블 프로토콜을 준수한 이터러블이다.
console.log(Symbol.iterator in array); // true

// 이터러블 프로토콜을 준수한 배열은 for...of 문에서 순회 가능하다.
for (const item of array) {
  console.log(item);
}
```

일반 객체는 Symbol.iterator 메소드를 소유하지 않는다. 따라서 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.

```javascript
const obj = { a: 1, b: 2 };

// 일반 객체는 Symbol.iterator 메소드를 소유하지 않는다.
// 따라서 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.
console.log(Symbol.iterator in obj); // false

// 이터러블이 아닌 일반 객체는 for...of 문에서 순회할 수 없다.
// TypeError: obj is not iterable
for (const p of obj) {
  console.log(p);
}
```

## 1.2 이터레이터

이터레이터 프로토콜은 next 메소드를 소유하며 next 메소드를 호출하면 이터러블을 순회하며 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 것이다. 이 규약을 준수한 객체가 이터레이터이다.

이터러블 프로토콜을 준수한 이터러블은 Symbol.iterator 메소드를 소유한다. 이 메소드를 호출하면 이터레이터를 반환한다. 이터레이터 프로토콜을 준수한 이터레이터는 <strong>next 메소드</strong>를 갖는다.

```javascript
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메소드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// 이터레이터 프로토콜을 준수한 이터레이터는 next 메소드를 갖는다.
console.log('next' in iterator); // true
```

이터레이터의 next 메소드를 호출하면 value, done 프로퍼티를 갖는 <strong>이터레이터 리절트(iterator result) 객체<strong>를 반환한다.

```javascript
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메소드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// 이터레이터 프로토콜을 준수한 이터레이터는 next 메소드를 갖는다.
console.log('next' in iterator); // true

// 이터레이터의 next 메소드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.
let iteratorResult = iterator.next();
console.log(iteratorResult); // {value: 1, done: false}
```

이터레이터의 next 메소드는 이터러블의 각 요소를 순회하기 위한 포인터의 역할한다. next 메소드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며 이터레이터 리절트 객체를 반환한다.

```javascript
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메소드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// 이터레이터 프로토콜을 준수한 이터레이터는 next 메소드를 갖는다.
console.log('next' in iterator); // true

// 이터레이터의 next 메소드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.
// next 메소드를 호출할 때 마다 이터러블을 순회하며 이터레이터 리절트 객체를 반환한다.
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

이터레이터의 next 메소드가 반환하는 이터레이터 리절트 객체의 value 프로퍼티는 현재 순회 중인 이터러블의 값을 반환하고 done 프로퍼티는 이터러블의 순회 완료 여부를 반환한다.

## 1.3 빌트인 이터러블

ES6에서 제공하는 빌트인 이터러블은 아래와 같다.

Array, String, Map, Set, TypedArray(Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), DOM data structure(NodeList, HTMLCollection), Arguments
{: .info}

```javascript
// 배열은 이터러블이다.
const array = [1, 2, 3];

// 이터러블은 Symbol.iterator 메소드를 소유한다.
// Symbol.iterator 메소드는 이터레이터를 반환한다.
let iter = array[Symbol.iterator]();

// 이터레이터는 next 메소드를 소유한다.
// next 메소드는 이터레이터 리절트 객체를 반환한다.
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: undefined, done: true}

// 이터러블은 for...of 문으로 순회 가능하다.
for (const item of array) {
  console.log(item);
}

// 문자열은 이터러블이다.
const string = 'hi';

// 이터러블은 Symbol.iterator 메소드를 소유한다.
// Symbol.iterator 메소드는 이터레이터를 반환한다.
iter = string[Symbol.iterator]();

// 이터레이터는 next 메소드를 소유한다.
// next 메소드는 이터레이터 리절트 객체를 반환한다.
console.log(iter.next()); // {value: "h", done: false}
console.log(iter.next()); // {value: "i", done: false}
console.log(iter.next()); // {value: undefined, done: true}

// 이터러블은 for...of 문으로 순회 가능하다.
for (const letter of string) {
  console.log(letter);
}

// arguments 객체는 이터러블이다.
(function () {
  // 이터러블은 Symbol.iterator 메소드를 소유한다.
  // Symbol.iterator 메소드는 이터레이터를 반환한다.
  iter = arguments[Symbol.iterator]();

  // 이터레이터는 next 메소드를 소유한다.
  // next 메소드는 이터레이터 리절트 객체를 반환한다.
  console.log(iter.next()); // {value: 1, done: false}
  console.log(iter.next()); // {value: 2, done: false}
  console.log(iter.next()); // {value: undefined, done: true}

  // 이터러블은 for...of 문으로 순회 가능하다.
  for (const arg of arguments) {
    console.log(arg);
  }
}(1, 2));
```

# 4. 이터레이션 프로토콜의 필요성

데이터 소비자(Data consumer)인 for...of 문, spread 연산자 등은 아래와 같이 다양한 데이터 소스를 사용한다.

Array, String, Map, Set, TypedArray(Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), DOM data structure(NodeList, HTMLCollection), Arguments
{: .info}

위 데이터 소스는 모두 이터레이션 프로토콜을 준수하는 이터러블이다. 즉, 이터러블은 데이터 공급자(Data provider)의 역할을 한다.

만약 이처럼 다양한 데이터 소스가 각자의 순회 방식을 갖는다면 데이터 소비자는 다양한 데이터 소스의 순회 방식을 모두 지원해야 한다. 이는 효율적이지 않다. 하지만 다양한 데이터 소스가 이터레이션 프로토콜을 준수하도록 규정하면 데이터 소비자는 이터레이션 프로토콜만을 지원하도록 구현하면 된다.

즉, 이터레이션 프로토콜은 다양한 데이터 소스가 하나의 순회 방식을 갖도록 규정하여 데이터 소비자가 효율적으로 다양한 데이터 소스를 사용할 수 있도록 <strong>데이터 소비자와 데이터 소스를 연결하는 인터페이스의 역할을 한다.</strong>

![iteration-protocol](./img/iteration-protocol-interface.png)

이터레블은 데이터 소비자와 데이터 소스를 연결하는 인터페이스
{: .desc-img}

이터러블을 지원하는 데이터 소비자는 내부에서 Symbol.iterator 메소드를 호출해 이터레이터를 생성하고 이터레리터의 next 메소드를 호출하여 이터러블을 순회한다. 그리고 next 메소드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 취득한다.

# 2. for...of 문

for...of 문은 내부적으로 이터레이터의 next 메소드를 호출하여 이터러블을 순회하며 next 메소드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for...of 문의 변수에 할당한다. 그리고 이터레이터 리절트 객체의 done 프로퍼티 값이 false이면 이터러블의 순회를 계속하고 true이면 이터러블의 순회를 중단한다.

```javascript
// 배열
for (const item of ['a', 'b', 'c']) {
  console.log(item);
}

// 문자열
for (const letter of 'abc') {
  console.log(letter);
}

// Map
for (const [key, value] of new Map([['a', '1'], ['b', '2'], ['c', '3']])) {
  console.log(`key : ${key} value : ${value}`); // key : a value : 1 ...
}

// Set
for (const val of new Set([1, 2, 3])) {
  console.log(val);
}
```

for...of 문이 내부적으로 동작하는 것을 for 문으로 표현하면 아래와 같다.

```javascript
// 이터러블
const iterable = [1, 2, 3];

// 이터레이터
const iterator = iterable[Symbol.iterator]();

for (;;) {
  // 이터레이터의 next 메소드를 호출하여 이터러블을 순회한다.
  const res = iterator.next();

  // next 메소드가 반환하는 이터레이터 리절트 객체의 done 프로퍼티가 true가 될 때까지 반복한다.
  if (res.done) break;

  console.log(res);
}
```

# 3. 커스텀 이터러블

## 3.1 커스텀 이터러블 구현

일반 객체는 이터러블이 아니다. 일반 객체는 Symbol.iterator 메소드를 소유하지 않는다. 즉, 일반 객체는 이터러블 프로토콜을 준수하지 않으므로 for...of 문으로 순회할 수 없다.

```javascript
// 일반 객체는 이터러블이 아니다.
const obj = { a: 1, b: 2 };

// 일반 객체는 Symbol.iterator 메소드를 소유하지 않는다.
// 따라서 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.
console.log(Symbol.iterator in obj); // false

// 이터러블이 아닌 일반 객체는 for...of 문에서 순회할 수 없다.
// TypeError: obj is not iterable
for (const p of obj) {
  console.log(p);
}
```

하지만 일반 객체가 이터레이션 프로토콜을 준수하도록 구현하면 이터러블이 된다. 피보나치 수열(1, 2, 3, 5...)을 구현한 간단한 이터러블을 만들어 보자.

```javascript
const fibonacci = {
  // Symbol.iterator 메소드를 구현하여 이터러블 프로토콜을 준수
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    // 최대값
    const max = 10;

    // Symbol.iterator 메소드는 next 메소드를 소유한 이터레이터를 반환해야 한다.
    // next 메소드는 이터레이터 리절트 객체를 반환
    return {
      // fibonacci 객체를 순회할 때마다 next 메소드가 호출된다.
      next() {
        [pre, cur] = [cur, pre + cur];
        return {
          value: cur,
          done: cur >= max
        };
      }
    };
  }
};

// 이터러블의 최대값을 외부에서 전달할 수 없다.
for (const num of fibonacci) {
  // for...of 내부에서 break는 가능하다.
  // if (num >= 10) break;
  console.log(num); // 1 2 3 5 8
}
```

Symbol.iterator 메소드는 next 메소드를 갖는 이터레이터를 반환하여야 한다. 그리고 next 메소드는 done과 value 프로퍼티를 가지는 이터레이터 리절트 객체를 반환한다. for...of 문은 done 프로퍼티가 true가 될 때까지 반복하며 done 프로퍼티가 true가 되면 반복을 중지한다.

이터러블은 for...of 문뿐만 아니라 spread 연산자, 디스트럭쳐링 할당, Map과 Set의 생성자에도 사용된다.

```javascript
// spread 연산자
const arr = [...fibonacci];
console.log(arr); // [ 1, 2, 3, 5, 8 ]

// 디스트럭처링
const [first, second, ...rest] = fibonacci;
console.log(first, second, rest); // 1 2 [ 3, 5, 8 ]
```

## 3.2 이터러블을 생성하는 함수

위 fibonacci 이터러블에는 외부에서 값을 전달할 방법이 없다는 아쉬운 점이 있다. fibonacci 이터러블의 최대값을 외부에서 전달할 수 있도록 수정해 보자. 이터러블의 최대 순회수를 전달받아 이터러블을 반환하는 함수를 만들면 된다.

```javascript
// 이터러블을 반환하는 함수
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  return {
    // Symbol.iterator 메소드를 구현하여 이터러블 프로토콜을 준수
    [Symbol.iterator]() {
      // Symbol.iterator 메소드는 next 메소드를 소유한 이터레이터를 반환해야 한다.
      // next 메소드는 이터레이터 리절트 객체를 반환
      return {
        // fibonacci 객체를 순회할 때마다 next 메소드가 호출된다.
        next() {
          [pre, cur] = [cur, pre + cur];
          return {
            value: cur,
            done: cur >= max
          };
        }
      };
    }
  };
};

// 이터러블을 반환하는 함수에 이터러블의 최대값을 전달한다.
for (const num of fibonacciFunc(10)) {
  console.log(num); // 1 2 3 5 8
}
```

## 3.3 이터러블이면서 이터레이터인 객체를 생성하는 함수

이터레이터를 생성하려면 이터러블의 Symbol.iterator 메소드를 호출해야 한다. 이터러블이면서 이터레이터인 객체를 생성하면 Symbol.iterator 메소드를 호출하지 않아도 된다.

```javascript
// 이터러블이면서 이터레이터인 객체를 반환하는 함수
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  // Symbol.iterator 메소드와 next 메소드를 소유한
  // 이터러블이면서 이터레이터인 객체를 반환
  return {
    // Symbol.iterator 메소드
    [Symbol.iterator]() {
      return this;
    },
    // next 메소드는 이터레이터 리절트 객체를 반환
    next() {
      [pre, cur] = [cur, pre + cur];
      return {
        value: cur,
        done: cur >= max
      };
    }
  };
};

// iter는 이터러블이면서 이터레이터이다.
let iter = fibonacciFunc(10);

// iter는 이터레이터이다.
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: 5, done: false}
console.log(iter.next()); // {value: 8, done: false}
console.log(iter.next()); // {value: 13, done: true}

iter = fibonacciFunc(10);

// iter는 이터러블이다.
for (const num of iter) {
  console.log(num); // 1 2 3 5 8
}
```

아래의 객체는 Symbol.iterator 메소드와 next 메소드를 소유한 이터러블이면서 이터레이터이다. Symbol.iterator 메소드는 this를 반환하므로 next 메소드를 갖는 이터레이터를 반환한다.

```javascript
{
  [Symbol.iterator]() {
    return this;
  },
  next() { /***/ }
}
```

## 3.4 무한 이터러블과 Lazy evaluation(지연 평가)

무한 이터러블(infinite sequence)을 생성하는 함수를 정의해보자. 이를 통해 [무한 수열(infinite sequence)](https://www.scienceall.com/무한수열infinite-sequence/)을 간단히 표현할 수 있다.

```javascript
// 무한 이터러블을 생성하는 함수
const fibonacciFunc = function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      // done 프로퍼티를 생략한다.
      return { value: cur };
    }
  };
};

// fibonacciFunc 함수는 무한 이터러블을 생성한다.
for (const num of fibonacciFunc()) {
  if (num > 10000) break;
  console.log(num); // 1 2 3 5 8...
}

// 무한 이터러블에서 3개만을 취득한다.
const [f1, f2, f3] = fibonacciFunc();
console.log(f1, f2, f3); // 1 2 3
```

"[이터레이션 프로토콜의 필요성](./es6-iteration-for-of#4-이터레이션-프로토콜의-필요성)"에서 살펴보았듯이 이터러블은 데이터 공급자(Data provider)의 역할을 한다. 배열, 문자열, Map, Set 등의 빌트인 이터러블은 데이터를 모두 메모리에 확보한 다음 동작한다. 하지만 이터러블은 **[Lazy evaluation(지연 평가)](https://ko.wikipedia.org/wiki/느긋한_계산법)**를 통해 값을 생성한다. Lazy evaluation은 평가 결과가 필요할 때까지 평가를 늦추는 기법이다. 위 예제를 통해 Lazy evaluation에 대해 좀 더 자세히 살펴보자.

위 예제의 fibonacciFunc 함수는 무한 이터러블을 생성한다. 하지만 fibonacciFunc 함수가 생성한 무한 이터러블은 데이터를 공급하는 메커니즘을 구현한 것으로 데이터 소비자인 for...of 문이나 디스트럭처링 할당이 실행되기 이전까지 데이터를 생성하지는 않는다. for...of 문의 경우, 이터러블을 순회할 때 내부에서 이터레이터의 next 메소드를 호출하는데 바로 이때 데이터가 생성된다. next 메소드가 호출되기 이전까지는 데이터를 생성하지 않는다. 즉, 데이터가 필요할 때까지 데이터의 생성을 지연하다가 데이터가 필요한 순간 데이터를 생성한다. 이를 통해 메모리를 효율적으로 사용할 수 있다.

이터러블을 통해 메모리를 효율적으로 사용하는 예제를 살펴보자.

```javascript
// 원본 배열의 각 요소의 제곱근 배열 반환
const arr = [1, 2, 3];
const result = arr.map(Math.sqrt);
// [ 1, 1.4142135623730951, 1.7320508075688772 ]

for (const item of result) {
  console.log(item);
}
```

Array.prototype.map 메소드는 원본 배열과 동일한 length를 갖는 배열을 생성한다. 따라서 메모리는 원본의 2배를 소비한다. 다음은 이터러블을 통해 Array.prototype.map 메소드와 동일한 결과를 얻을 수 있도록 작성한 예제이다.

```javascript
// 전달받은 배열의 각 요소의 제곱근 이터러블 반환
function map(array, fn) {
  let i = -1;
  return {
    [Symbol.iterator]() { return this; },
    next() {
      i++;
      return { value: fn(array[i]), done: (i === array.length) };
    }
  };
}

// Lazy evaluation(지연 평가)을 통해 데이터를 생성한다.
for (const item of map([1, 2, 3])) {
  console.log(item);
}
```

Array.prototype.forEach, Array.prototype.map, Array.prototype.filter 등과 같은 고차함수는 for 문과는 달리 break 문을 사용할 수 없다. 따라서 불필요한 순회를 하는 경우가 있다. 예를 들어 id와 name 프로퍼티를 갖는 user 객체들의 배열인 users에서 id로 user 객체를 Array.prototype.filter과 이터러블을 통해 필터링하는 경우, 각각 퍼포먼스를 측정해 보자.

```javascript
// 퍼포먼스 테스트를 위해 1,000,000개의 요소를 갖는 배열을 생성
const users = [];
for (let i = 0; i < 1000000; i++) {
  users.push({ id: i + 1, name: String.fromCharCode(65 + i) });
}

// Array.prototype.filetr를 사용한 경우의 퍼포먼스
console.time('Array#filter');
console.log(users.filter(user => user.id <= 3));
console.timeEnd('Array#filter'); // 약 25 ~ 30ms

// 이터러블을 사용한 경우의 퍼포먼스
console.time('Iterable');
function filter(array, fn) {
  let i = -1;
  return {
    [Symbol.iterator]() { return this; },
    next() {
      i++;
      return { value: array[i], done: !fn(array[i]) };
    }
  };
}

console.log([...filter(users, user => user.id <= 3)]);
console.timeEnd('Iterable'); // 약 1ms
```

이터러블이 Array.prototype.filter보다 약 25배 정도 빠른 것을 알 수 있다. 대상 배열이 크면 클수록 격차는 더 벌어진다.

이터러블을 통해 메모리는 효율적으로 사용할 수 있고 퍼퍼먼스도 향상되었으나 코드는 장황해졌다. 따라서 좀 더 간편하게 이터러블을 생성할 수 있는 제너레이터(generator)가 등장했다.

```javascript
// 더 간편하게 이터러블을 생성할 수 있는 제너레이터
function* map(iterable, fn) {
  for (const item of iterable) yield fn(item);
}
console.log([...map([1, 2, 3], Math.sqrt)]);

function* filter(array, fn) {
  for (const item of array) {
    if (fn(item)) yield item;
    else return;
  }
}
console.log([...filter([1, 2, 3], item => item <= 2)]);
```

다음 장에서 제너레이터에 대해 살펴보도록 하자.

# Reference

* [MDN: Iterators and generators](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Iterators_and_Generators)

* [MDN: for...of](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of)

* [Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html)

* [심볼(Symbol)](./es6-symbol)
