---
layout: post
title: TypeScript - <strong>Interface</strong>
subtitle: 인터페이스
categories: typescript
section: typescript
description: 인터페이스는 일반적으로 타입 체크를 위해 사용되며 일반 변수, 함수, 클래스에 사용</strong>할 수 있다. 인터페이스는 여러가지 자료형을 갖는 프로퍼티로 이루어진 새로운 자료형을 정의하는 것과 유사하다. 인터페이스에 선언된 프로퍼티 또는 메소드의 사용을 강제하여 일관성을 유지할 수 있도록 하는 것이다. ES6는 인터페이스를 지원하지 않지만 TypeScript는 인터페이스를 지원한다.
---

* TOC
{:toc}

![typescript Logo](/img/typescript-logo.png)

# 1. Introduction

인터페이스는 일반적으로 <strong>타입 체크를 위해 사용되며 일반 변수, 함수, 클래스에 사용</strong>할 수 있다. 인터페이스는 여러가지 자료형을 갖는 프로퍼티로 이루어진 새로운 자료형을 정의하는 것과 유사하다. 인터페이스에 선언된 프로퍼티 또는 메소드의 사용을 강제하여 일관성을 유지할 수 있도록 하는 것이다. ES6는 인터페이스를 지원하지 않지만 TypeScript는 인터페이스를 지원한다.

<!-- # Interface 상속

인터페이스는 extends 키워드를 사용하여 상속이 가능하다.

```typescript
interface IPerson {
  name: string;
}

interface IStudent extends IPerson {
  grade: number;
}

const person: IStudent =  {
  name: 'Lee',
  grade: 3
}
``` -->

연관성을 가지는 데이터들의 타입을 인터페이스로 정의하여 사용하면 함수에 여러개의 매개변수를 전달하여야 할 때 복잡한 매개변수 체크가 필요없어서 매우 유용하다.

```typescript
interface IPerson {
  name: string;
  age: number;
}

function sayHello(person: IPerson): void {
  console.log(`
    Hello ${person.name}
    You are ${person.age} years old.
  `);
}

const me: IPerson = { name: 'Lee', age: 18 };
sayHello(me);
```

인터페이스를 구현하는 클래스는 해당 인터페이스를 준수하여야 한다. 이는 인터페이스를 구현하는 클래스의 일관성을 유지할 수 있는 장점을 갖는다. 인터페이스는 프로퍼티와 메소드를 가질 수 있다는 점에서 클래스와 유사하나 직접 인스턴스를 생성할 수는 없다.

```typescript
interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  constructor (public name: string, public age: number) {
  }
}

const me = new Person('Lee', 18);
```

인터페이스에는 멤버변수뿐만 아니라 메소드도 포함시킬 수 있다. 인터페이스를 구현하는 클래스는 인터페이스에서 정의한 멤버변수와 메소드를 반드시 구현하여야 한다.

```typescript
interface IPerson {
  name: string;
  sayHello(): void;
}

class Person implements IPerson {
  constructor(public name: string) {}

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}

function greeter(person: IPerson): void {
  person.sayHello();
}

const me = new Person('Lee');
greeter(me); // Hello Lee
```

# 2. 덕 타이핑 (Duck typing)

주의해야 할 것은 인터페이스를 구현하였다는 것만이 타입 체크를 통과하는 유일한 방법은 아니다. 타입 체크에서 중요한 것은 값이 실제로 가지고 있는 것이다. 이해가 어려울 수 있으므로 예를 들어 설명한다.

```typescript
interface IDuck { // 1
  quack(): void;
}

class MallardDuck implements IDuck { // 3
  quack() {
    console.log('Quack!');
  }
}

class RedheadDuck { // 4
  quack() {
    console.log('q~uack!');
  }
}

function makeNoise(duck: IDuck): void { // 2
  duck.quack();
}

makeNoise(new MallardDuck()); // Quack!
makeNoise(new RedheadDuck()); // q~uack! // 5
```

(1) 인터페이스 IDuck은 quack() 메소드를 정의하였다.  
(2) makeNoise 함수는 인터페이스 IDuck를 구현한 클래스의 인스턴스 duck을 인자로 전달받는다.  
(3) 클래스 MallardDuck은 인터페이스 IDuck을 구현하였다.  
(4) 클래스 RedheadDuck은 인터페이스 IDuck을 구현하지는 않았지만 quack() 메소드를 갖는다.  
(5) makeNoise() 함수에 인터페이스 IDuck을 구현하지 않은 클래스 RedheadDuck의 인스턴스를 인자로 전달하여도 에러없이 처리된다.

TypeScript는 해당 인터페이스에서 정의한 값(멤버변수나 메소드)을 가지고 있다면 그 인터페이스를 구현한 것으로 인정한다. 이것을 [덕 타이핑(duck typing)](https://ko.wikipedia.org/wiki/%EB%8D%95_%ED%83%80%EC%9D%B4%ED%95%91) 또는 구조적 타이핑(structural typing)이라 한다.

인터페이스를 일반 변수에 사용할 경우에도 덕 타이핑은 적용된다.

```typescript
interface IPerson {
  name: string;
}

function sayHello(person: IPerson): void {
  console.log(`Hello ${person.name}`);
}

const me = { name: 'Lee', age: 18 };
sayHello(me); // Hello Lee
```

변수 me는 인터페이스 IPerson와 일치하지는 않는다. 하지만 IPerson의 name을 가지고 있으면 타입체크 에러가 발생하지 않고 인터페이스에 부합하는 것으로 처리된다.

인터페이스는 개발 단계에서 도움을 주기 위해 제공되는 기능이기 때문에 위의 TypeScript 코드는 컴파일되면 아래와 같이 인터페이스가 삭제된다.

```javascript
function sayHello(person) {
  console.log("Hello " + person.name);
}
var me = { name: 'Lee', age: 18 };
sayHello(me); // Hello Lee
```

# 3. 함수 타입

인터페이스는 일반 변수, 클래스 뿐만아니라 함수에도 사용할 수 있다.

```typescript
interface SquareFunc {
  (num: number): number;
}

const squareFunc: SquareFunc = (num: number) => num * num;

console.log(squareFunc(10)); // 100
```

함수의 매개변수 리스트와 리턴타입을 정의한다. 인테페이스를 구현하는 함수는 인터페이스에 정의된 매개변수 리스트와 리턴타입을 준수하여야 한다.

# 4. 선택적 프로퍼티 (Optional Property)

인터페이스의 프로퍼티는 반드시 구현되어야 한다. 하지만 인터페이스의 프로퍼티가 선택적으로 필요한 경우가 있을 수 있다. 선택적 프로퍼티는 프로퍼티명 뒤에 `?`를 붙이며 생략하여도 에러가 발생하지 않는다.

```typescript
interface IUserInfo {
  username: string;
  password: string;
  age?    : number;
  address?: string;
}

function checkUserInfo(user: IUserInfo): boolean {
  const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  // username는 이메일 형식이고 password는 5자리 이상이어야 한다
  if(!regexr.test(user.username) || user.password.length < 6) return false;

  return true;
}

const userInfo = {
  username: 'ungmo2@gmail.com',
  password: '123456'
}

console.log(checkUserInfo(userInfo));
```

선택적 프로퍼티를 사용하는 이유는 사용 가능한 프로퍼티를 파악할 수 있어서 코드에 대한 이해를 도우며 인터페이스의 프로퍼티가 아닌 프로퍼티를 사용하였을 경우 사전에 에러를 발생시켜 준다는 것이다.

<!-- # 5. 읽기전용 프로퍼티 (Readonly property) -->

# Reference

* [TypeScript Documentation](http://www.typescriptlang.org/docs/tutorial.html)

* [덕 타이핑(duck typing)](https://ko.wikipedia.org/wiki/%EB%8D%95_%ED%83%80%EC%9D%B4%ED%95%91)
