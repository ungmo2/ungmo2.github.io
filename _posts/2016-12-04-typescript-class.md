---
layout: post
title: TypeScript - <strong>Class</strong>
subtitle: 클래스
categories: typescript
section: typescript
description: ECMAScript 6에서 새롭게 도입된 클래스는 기존 prototype 기반 객체지향 프로그래밍보다 클래스 기반 언어에 익숙한 프로그래머가 보다 빠르게 학습할 수 있는 단순명료한 새로운 문법을 제시하고 있다. 하지만 클래스가 새로운 객체지향 모델을 제공하는 것이 아니다. 사실 클래스도 함수이고 기존 prototype 기반 패턴의 Syntactic sugar일 뿐이다. Typescript가 지원하는 클래스는 ECMAScript 6의 클래스와 상당히 유사하지만 몇가지 Typescript 고유 기능이 존재한다.
---

* TOC
{:toc}

![typescript Logo](/img/typescript-logo.png)

[ECMAScript 6에서 새롭게 도입된 클래스](./es6-class)는 기존 prototype 기반 객체지향 프로그래밍보다 클래스 기반 언어에 익숙한 프로그래머가 보다 빠르게 학습할 수 있는 단순명료한 새로운 문법을 제시하고 있다. 하지만 클래스가 새로운 객체지향 모델을 제공하는 것이 아니다. 사실 클래스도 함수이고 기존 prototype 기반 패턴의 Syntactic sugar일 뿐이다. Typescript가 지원하는 클래스는 ECMAScript 6의 클래스와 상당히 유사하지만 몇가지 Typescript 고유 기능이 존재한다.

# 1. 클래스 정의 (Class Definition)

ECMAScript 6 클래스는 메서드만을 포함할 수 있다. 클래스 바디에 프로퍼티를 정의할 수 없고 반드시 생성자 내부에서 프로퍼티를 정의하고 초기화한다.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  walk() {
    console.log(`${this.name} is walking.`);
  }
}
```

위 예제는 ECMAScript 6에서는 문제없이 실행되는 코드이지만 Typescript에서 위 예제를 실행하면 Property 'name' does not exist on type 'Person'.이라는 에러가 발생한다. Typescript 클래스는 클래스 바디에 프로퍼티를 사전 정의하여야 한다.

```typescript
class Foo {
  // 프로퍼티 (public)
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }

  walk() {
    console.log(`${this.name} is walking.`);
  }
}

const person = new Foo('Lee');
console.log(person.walk()); // Lee is walking
```

# 2. 접근 제한자(Access modifier)

Typescript 클래스는 public, private, protected 접근 제한자를 지원한다. 접근 제한자를 생략한 프로퍼티는 암묵적으로 public 프로퍼티로 지정된다. 

접근 제한자의 프로퍼티에 대한 접근 가능성은 아래와 같다. 

| 접근 가능성    | public  | protected | private
|:------------|:-------:|:---------:|:----------:
| 클래스 내부    | ◯       | ◯         | ◯
| 자식 클래스    | ◯       | ◯         | ✕
| 클래스 인스턴스 | ◯       | ✕         | ✕


```typescript
class Foo {
  public x: string;
  protected y: string;
  private z: string;

  constructor(x: string, y: string, z: string) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const foo = new Foo('x', 'y', 'z');

console.log(foo.x);
console.log(foo.y); // error TS2445: Property 'y' is protected and only accessible within class 'Foo' and its subclasses.
console.log(foo.z); // error TS2341: Property 'z' is private and only accessible within class 'Foo'.

class Bar extends Foo {
  constructor(x: string, y: string, z: string) {
    super(x, y, z);
    console.log(this.x);
    console.log(this.y);
    console.log(this.z); // error TS2341: Property 'z' is private and only accessible within class 'Foo'.
  }  
}
```

# 3. 생성자 파라미터에 접근 제한자 사용

접근 제한자는 생성자의 파라미터에서도 사용할 수 있다. 이때 접근 제한자가 사용된 생성자의 파라미터는 암묵적으로 프로퍼티로 정의되고 생성자 내부에서 별도의 프로퍼티 초기화가 없어도 암묵적으로 초기화가 수행된다.

```typescript
class Foo {
  // x는 프로퍼티로 정의되고 초기화가 수행된다
  constructor(private x: string) { }
}

const foo = new Foo('Hello');
console.log(foo); // Foo { x: 'Hello' }
```

# 4. static 프로퍼티

ECMAScript 6 클래스에서 static 키워드는 클래스의 정적(static) 메서드를 정의한다. 정적 메서드는 클래스의 인스턴스화(instantiating)없이 호출하며 클래스의 인스턴스로 호출할 수 없다.

```javascript
class Foo {
  constructor(prop) {
    this.prop = prop;      
  }
  static staticMethod() {
    return 'staticMethod';
  }
  prototypeMethod() {
    return 'prototypeMethod';
  }
}

const foo = new Foo(123);

console.log(Foo.staticMethod());
console.log(foo.staticMethod()); // error TS2339: Property 'staticMethod' does not exist on type 'Foo'.
```

Typescript 클래스에서 static 키워드는 프로퍼티에도 사용할 수 있다. ECMAScript 6와 마찬가지로 정적 프로퍼티는 클래스의 인스턴스화없이 호출하며 클래스의 인스턴스로 호출할 수 없다.

```typescript
class Foo {
  static instanceCounter = 0;
  constructor() {
    Foo.instanceCounter++;
  }
}

var foo1 = new Foo();
var foo2 = new Foo();
console.log(Foo.instanceCounter);  // 2
console.log(foo2.instanceCounter); // error TS2339: Property 'instanceCounter' does not exist on type 'Foo'.
```

# Reference

* [ECMAScript6 - Class](http://poiemaweb.com/es6-class)

* [Typescript Class](https://www.typescriptlang.org/docs/handbook/classes.html)
