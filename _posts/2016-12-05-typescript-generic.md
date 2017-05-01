---
layout: post
title: TypeScript <strong>Generic</strong>
subtitle: 제네릭
categories: typescript
section: typescript
description:
---

![typescript Logo](/img/typescript-logo.png)

Java나 C# 같은 정적 타입 언어의 경우, 함수 또는 클래스를 선언하는 시점에 매개변수나 반환값의 타입을 명시하여야 한다. TypeScript 또한 정적 타입 언어이기 때문에 함수 또는 클래스를 선언하는 시점에 매개변수나 반환값의 타입을 명시하여야 한다.

아래의 예제를 살펴보자. FIFO(First In First Out) 구조로 데이터를 저장하는 큐를 표현한 것이다.

```typescript
class Queue {
  protected data = []; // data: any[]
  push(item) {
    this.data.push(item);
  }
  pop() {
    return this.data.shift();
  }
}

const queue = new Queue();
queue.push(0);
queue.push('1'); // 의도하지 않은 실수!

console.log(queue.pop().toPrecision(1)); // 0
console.log(queue.pop().toPrecision(1)); // Runtime error
```

Queue 클래스의 data 프로퍼티는 타입 선언을 생략하였기 때문에 타입추론에 의해 any[] 타입이 된다. any[] 타입은 어떤 타입의 요소도 가질 수 있는 배열을 의미한다.

any[] 타입은 배열 요소의 타입이 모두 같지 않다는 문제를 가지게 된다. 위 예제의 경우 data 프로퍼티에는 number 타입만을 포함하는 배열이라는 기대 하에 각 요소에 대해 toPrecision() 함수를 사용하였고 number 타입이 아닌 요소의 경우 런타임 에러가 발생한다.

위와 같은 문제를 해결하기 위해 Queue 클래스를 상속하여 number 타입 전용 NumberQueue 클래스를 정의할 수 있다. 

```typescript
class Queue {
  protected data = []; // data: any[]
  push(item) {
    this.data.push(item);
  }
  pop() {
    return this.data.shift();
  }
}

class NumberQueue extends Queue {
  push(item: number) {
    super.push(item);
  }
  pop(): number {
    return this.pop();
  }
}

const queue = new NumberQueue();
queue.push(0);
queue.push('1'); // 의도하지 않은 실수를 사전 검출 가능: '1' -> +'1'

console.log(queue.pop().toPrecision(1)); // 0
console.log(queue.pop().toPrecision(1)); // 1
```

하지만 타입에 따라 클래스가 추가되어야 하므로 이 또한 좋은 방법은 아니다. 제네릭을 사용하여 이 문제를 해결하여 보자.

```typescript
class Queue<T> {
  protected data = [];
  push(item: T) {
    this.data.push(item);
  }
  pop(): T {
    return this.data.shift();
  }
}

// number 전용 Queue
const numberQueue = new Queue<number>();
numberQueue.push(0);
numberQueue.push(+'1'); // 의도하지 않은 실수를 사전 검출 가능: '1' -> +'1'

console.log(numberQueue.pop().toPrecision(1)); // 0
console.log(numberQueue.pop().toPrecision(1)); // 1

// string 전용 Queue
const stringQueue = new Queue<string>();
stringQueue.push('Hello');
stringQueue.push('World');

console.log(stringQueue.pop().toUpperCase()); // HELLO
console.log(stringQueue.pop().toUpperCase()); // WORLD

// custom object Queue
const myQueue = new Queue<{name: string, age: number}>();
myQueue.push({name: 'Lee', age: 10});
myQueue.push({name: 'Kim', age: 20});

console.log(myQueue.pop()); // { name: 'Lee', age: 10 }
console.log(myQueue.pop()); // { name: 'Kim', age: 20 }
```

제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법이다. 한번의 선언으로 다양한 타입에 재사용이 가능하다는 장점이 있다.

T는 제네릭을 선언할 때 관용적으로 사용되는 식별자로 타입 매개변수(Type parameter)라 한다. T는 Type의 약자로 반드시 T를 사용하여야 하는 것은 아니다. 

함수에도 제네릭을 사용할 수 있다. 제네릭을 사용하면 하나의 타입만이 아닌 다양한 타입의 매개변수와 리턴값을 사용할 수 있다.

```typescript
function reverse<T>(items: T[]): T[] {
  return items.reverse();
}

const arg = [{name: 'Lee'}, {name: 'Kim'}, {name: 'Park'}];

// 인수에 의해 타입매개변수가 결정된다 
const reversed = reverse(arg); // reversed: {name: string}[] 
console.log(reversed);

reversed.push({name: 100}); // Error
console.log(reversed);
```

# Reference

* [TypeScript Documentation : Generics](https://www.typescriptlang.org/docs/handbook/generics.html)
