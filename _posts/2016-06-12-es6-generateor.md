---
layout: post
title: ECMAScript6 - <strong>Generator</strong>
subtitle: 제너레이터
categories: es6
section: es6
description: ES6에서 도입된 제너레이터(Generator)는 함수 블록을 한번에 실행하지 않고, 실행을 일시 중지했다가 필요한 시점에 다시 시작할 수 있는 함수이다. 제너레이터는 함수이지만 일반 함수와는 다른 독특한 움직임을 한다. 함수를 호출하면 함수 블록이 실행되지만, 제너레이터는 제너레이터 객체를 반환한다. 이 제너레이터 객체는 순회 가능한(iterable)한 값이다. 즉, 제너레이터는 순회 가능한(iterable)한 값을 생성하는(gererate) 함수이다. 제너레이터는 이터러블의 구현과 비동기 함수의 호출 차단 등에 유용하다.
---

* TOC
{:toc}

![es6 Logo](./img/es6.png)
{: .w-650}

ES6에서 도입된 제너레이터(Generator)는 함수 블록을 한 번에 실행하지 않고, 실행을 일시 중지했다가 필요한 시점에 다시 시작할 수 있는 함수이다. 제너레이터는 함수이지만 일반 함수와는 다른 독특한 동작을 한다. 함수를 호출하면 함수 블록이 실행되지만, 제너레이터는 제너레이터 객체를 반환한다. 이 제너레이터 객체는 순회 가능한(iterable) 값이다. 즉, 제너레이터는 순회 가능한(iterable)한 값을 생성하는(gererate) 함수이다.

제너레이터는 이터러블의 구현과 비동기 함수의 호출 차단 등에 유용하다.

# 1. 제너레이터 함수의 생성

제너레이터 함수는 function* 키워드로 선언한다. 그리고 하나 이상의 yield 구문을 포함한다.

```javascript
// 제너레이터 함수 선언: 함수 선언식
function* genFunc() {
  var index = 0;
  while (index < 3) {
    yield index++;
  }
}
```

제너레이터 함수는 일반함수와 같이 함수 선언식, 함수 표현식, 메소드로 선언할 수 있다.

```javascript
// 제너레이터 함수 선언: 함수 표현식
const genFunc = function* () {
 ...
};

// 제너레이터 메소드
const obj = {
  * generatorMethod() {
    ···
  }
};

// 제너레이터 클래스 메소드
class MyClass {
  * generatorMethod() {
    ···
  }
}
```

# 2. 제너레이터 함수의 호출

제너레이터 함수를 호출하면 함수 블록이 실행되는 것이 아니라, 제너레이터 객체를 반환한다.

```javascript
// 제너레이터 함수 선언
function* foo() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수 호출. 제너레이터 객체를 생성하고 반환한다.
const generator = foo();

for (const val of generator) {
  console.log(val); // 1 2 3
}

// spead operator
const arr = [...foo()];
```

제너레이터 함수의 함수 블록을 실행하려면 제너레이터 함수가 생성한 제너레이터 객체의 next() 메소드를 호출한다. yield 구문은 next() 메소드를 일시 중지시킨다. return처럼 값을 반환할 수 있다.

next() 메소드가 처음으로 호출되면 yield 이전까지 실행하고 실행을 일시 중지한다. next() 메소드가 호출되면 일시 중지된 코드를 다시 실행하고 yield를 만나면 또 다시 실행을 일시 중지한다.

```
next() -> yield -> next() ->  yield
```

이러한 흐름은 return을 만나거나 또는 함수의 마지막 라인까지 실행하여 해당 함수가 종료할 때까지 진행된다. 제너레이터 함수로 제너레이터 객체를 생성하여 보자.

```javascript
// 제너레이터 함수 선언
function* genFunc() {
  console.log('제너레이터 함수 시작');
  yield 1;
  console.log('제너레이터 함수 재시작');
  yield 2;
  console.log('제너레이터 함수 종료');
}

// 제너레이터 함수 호출. 제너레이터 객체를 생성하고 반환한다.
const generator = genFunc();

// 처음 실행
console.log(generator.next());
// 제너레이터 함수 시작
// { value: 1, done: false }

// 두번째 실행
console.log(generator.next());
// 제너레이터 함수 재시작
// { value: 2, done: false }

// 마지막 실행
console.log(generator.next());
// 제너레이터 함수 종료
// { value: undefined, done: true }
```

제너레이터 객체는 기본적으로 next() 메소드를 가지고 있다. 이는 제너레이터 객체가 이터레이터인 것을 의미한다. 이터레이터의 next() 메소드는 value, done 프로퍼티를 갖는 객체를 반환한다. value 프로퍼티는 yield 구문이 반환한 값이고 done 프로퍼티는 제너레이터 함수 내의 모든 yield 구문이 실행되었는지를 나타내는 boolean 타입의 값이다.

이터레이터의 next()와 다르게 제너레이터 객체의 next()는 인자를 받을 수도 있다.

```javascript
function* foo(n) {
  const x = yield n;       // x = 10
  const y = yield (x + 1); // y = 20
  const z = yield (y + 2); // z = 30
  return x + y + z;
}

// 파라미터 n에 1을 할당하고 제너레이터 객체를 iterator에 할당
const iterator = foo(1);

console.log(iterator.next());
// {value:1, done:false}

console.log(iterator.next(10));
// {value:11, done:false}

console.log(iterator.next(20));
// {value:22, done:false}

console.log(iterator.next(30));
// {value:60, done:true}
```

이때 yield는 대입문 변수에 값을 할당하지 않고, next()의 인자가 대입문 변수에 할당된다.

![generator-next](./img/generator-next.png)

제너레이터 객체의 next() 메소드
{: .desc-img}

<!--# 2. 제너레이터의 활용

## 2.1 이터러블의 구현-->
# 3. 이터러블의 구현

제너레이터 함수를 호출하면 함수 블록이 실행되는 것이 아니라, 제너레이터 객체를 반환한다. 이 제너레이터 객체는 for-of 루프로 순회할 수 있으며 next() 메소드를 가지고 있다. 즉, <strong>제너레이터 객체는 이터러블(iterable)임과 동시에 이터레이터(iterator)이다.</strong>

```javascript
// 제너레이터 함수
function* foo() {
  let index = 0;
  while (index < 3) {
    yield index++;
  }
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
const generator = foo();

// 제너레이터 객체는 next() 메소드를 갖는 이터레이터이다.
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());

// 제너레이터 객체는 순회가능한 이터러블이다.
for (const val of foo()) {
  console.log(val); // 0 1 2
}
```

제너레이터는 이터레이터이므로 제너레이터를 활용하여 커스텀 이터러블 객체를 생성할 수 있다.

이터레이션 프로토콜을 사용하여 피보나치 수열을 구현한 간단한 이터러블 객체를 만들어 보자.

```javascript
const fibonacci = {
  [Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    let step = 0;
    const maxStep = 10;
    return {
      next() {
        [prev, curr] = [curr, prev + curr];
        return { value: curr, done: step++ >= maxStep };
      }
    };
  }
};

for (const num of fibonacci) {
  console.log(num);
}
```

위와 같이 이터레이터를 생성하려면 [이터레이션 프로토콜](./es6-iteration-for-of#1-이터레이션-프로토콜iteration-protocol)을 준수해야 한다. 즉, Symbol.iterator를 프로퍼티 키로 사용한 메소드를 구현하여 이터러블 객체를 만들고 Symbol.iterator를 프로퍼티 키로 사용한 메소드가 value, done 프로퍼티를 갖는 객체를 반환하는 next() 함수를 메소드로 갖는 객체를 반환해야 한다.

이러한 이터레이션 프로토콜을 보다 간단하게 처리하기 위해 제너레이터를 활용할 수 있다. 제너레이터를 활용하여 피보나치 수열을 구현한 이터러블 객체를 만들어 보자.

```javascript
const fibonacci = {
  * [Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    const maxStep = 10;

    for (let i = 0; i < maxStep; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
};

for (const num of fibonacci) {
  console.log(num);
}
```

\* [Symbol.iterator\]\(\)는 이터레이터를 제너레이터로 구현한 것이다. 따라서 fibonacci 객체는 이터레이터를 구현한 이터러블 객체이다.

이처럼 제너레이터로 이터레이터를 구현하면 value, done 프로퍼티를 갖는 객체를 반환하는 next() 메소드를 별도로 구현하지 않아도 value, done 프로퍼티를 갖는 객체를 반환하기 때문에 구현도 간단해지며 가독성도 높아진다.

위 예제는 제너레이터를 사용하여 이터레이터를 구현한 것이다. 제너레이터는 그 자신이 이터러블인 특성을 이용하여 직접 이터러블 객체를 구현할 수 있다. 이를 활용하여 위 예제를 수정해 보자.

```javascript
// 제너레이터 객체는 이터러블이다.
const fibonacci = function* (maxStep) {
  let [prev, curr] = [0, 1];

  for (let i = 0; i < maxStep; i++) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
};

for (const num of fibonacci(10)) {
  console.log(num);
}
```

<!--## 2.2 비동기 처리-->

# Reference

* [MDN: function\*](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)

* [ES6 In Depth: 제너레이터(Generator)](hhttp://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/)

* [이터레이션 프로토콜(iteration protocol)과 for-of 루프](./es6-iteration-for-of)

* [Generators](http://exploringjs.com/es6/ch_generators.html)

