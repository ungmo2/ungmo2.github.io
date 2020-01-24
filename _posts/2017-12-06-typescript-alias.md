---
layout: post
title: TypeScript - <strong>Type Alias</strong>
subtitle: 타입 앨리어스
categories: typescript
section: typescript
seq: 12
subseq: 6
description:
---

* TOC
{:toc}

![typescript Logo](/img/typescript-logo.png)

타입 앨리어스는 새로운 타입을 정의한다. 타입으로 사용할 수 있다는 점에서 타입 앨리어스는 인터페이스와 유사하다.

인터페이스는 아래와 같이 타입으로 사용할 수 있다.

```typescript
interface Person {
  name: string,
  age?: number
}

// 빈 객체를 Person 타입으로 지정
const person = {} as Person;
person.name = 'Lee';
person.age = 20;
person.address = 'Seoul'; // Error
```

타입 앨리어스도 인터페이스와 마찬가지로 타입으로 사용할 수 있다.

```typescript
// 타입 앨리어스
type Person = {
  name: string,
  age?: number
}

// 빈 객체를 Person 타입으로 지정
const person = {} as Person;
person.name = 'Lee';
person.age = 20;
person.address = 'Seoul'; // Error
```

하지만 타입 앨리어스는 원시값, 유니온 타입, 튜플 등도 타입으로 지정할 수 있다.

```typescript
// 문자열 타입으로 타입 지정
type StringName = string;

let stringName: StringName;
stringName = 'Lee';
stringName = 1; // Error

// 문자열 리터럴로 타입 지정
type StringLiteral = 'Lee';

let stringLiteralName: StringLiteral;
stringLiteralName = 'Lee';
stringLiteralName = 'Kim'; // Error

// 유니온 타입으로 타입 지정
type UnionName = 'Lee' | 'Kim';

let unionName: UnionName;
unionName = 'Lee';
unionName = 'Park'; // Error

// 숫자 리터럴 유니온 타입으로 타입 지정
type NumberLiteralUnion = 1 | 2 | 3 | 4 | 5;

let numberLiteralUnion: NumberLiteralUnion;
numberLiteralUnion = 1;
numberLiteralUnion = 6; // Error

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

// 인터페이스 유니온 타입으로 타입 지정
type Shape = Square | Rectangle | Circle;

let shape: Shape;
```
