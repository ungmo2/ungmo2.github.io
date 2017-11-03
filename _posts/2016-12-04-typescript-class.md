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

[ECMAScript 6 클래스](./es6-class#4-멤버-변수)는 메소드만을 포함할 수 있다. 클래스 바디에 멤버 변수(member variable)를 정의할 수 없고 반드시 생성자 내부에서 멤버 변수를 정의하고 초기화한다.

```javascript
class Person {
  constructor(name) {
    // 멤버 변수
    this.name = name;
  }

  walk() {
    console.log(`${this.name} is walking.`);
  }
}
```

위 예제는 ECMAScript 6에서는 문제없이 실행되는 코드이지만 Typescript에서 위 예제를 실행하면 Property 'name' does not exist on type 'Person'.이라는 에러가 발생한다. **Typescript 클래스는 클래스 바디에 멤버 변수를 사전 정의하여야 한다.**

```typescript
class Foo {
  // 멤버 변수 (public)
  name: string;

  constructor(name: string) {
    // 멤버 변수에 값을 할당
    this.name = name;
  }

  walk() {
    console.log(`${this.name} is walking.`);
  }
}

const person = new Foo('Lee');
person.walk(); // Lee is walking
```

# 2. 접근 제한자 (Access modifier)

Typescript 클래스는 Java, C#과 같은 클래스 기반 객체 지향 언어가 지원하는 public, private, protected 접근 제한자를 지원하며 의미 또한 기본적으로 동일하다.

단, 접근 제한자를 명시하지 않았을 때, 다른 클래스 기반 언어의 경우, 암묵적으로 protected로 지정되어 패키지 레벨로 공개되지만 Typescript의 경우, 접근 제한자를 생략한 멤버 변수와 메소드는 암묵적으로 public이 지정된다. 따라서 public으로 지정하고자 하는 멤버 변수와 메소드는 접근 제한자를 생략한다.

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

Typescript는 접근 제한자와 함께 `readonly` 키워드를 사용할 수 있다. readonly가 선언된 프로퍼티는 선언시 또는 생성자 내부에서만 값을 할당할 수 있다. 그 외의 경우에는 값을 할당할 수 없고 오직 읽기만 가능한 상태가 된다. 이를 이용하여 상수의 선언에 사용한다.

```typescript
class Foo {
  private readonly MAX_LEN: number = 5;
  private readonly MSG: string;

  constructor() {
    this.MSG = 'hello';
  }

  log() {
    this.MAX_LEN = 10; // Cannot assign to 'MAX_LEN' because it is a constant or a read-only property.
    this.MSG = 'Hi'; // Cannot assign to 'MSG' because it is a constant or a read-only property.
    console.log(`MAX_LEN: ${this.MAX_LEN}`); // MAX_LEN: 5
    console.log(`MSG: ${this.MSG}`); // MSG: hello
  }
}

new Foo().log();
```

# 3. 생성자 파라미터에 접근 제한자 사용

접근 제한자는 생성자의 파라미터에서도 사용할 수 있다. 이때 **접근 제한자가 사용된 생성자의 파라미터는 암묵적으로 멤버 변수로 정의되고 생성자 내부에서 별도의 초기화가 없어도 암묵적으로 초기화가 수행된다.**

이때 private 접근 제한자가 사용되면 클래스 내부에서만 참조 가능하고 public 접근 제한자가 사용되면 클래스 외부에서도 참조가 가능하다.

```typescript
class Foo {
  // 접근 제한자가 사용된 생성자의 파라미터 x는 멤버 변수로 정의되고 초기화가 수행된다
  // public이 사용되었으므로 x는 클래스 외부에서도 참조가 가능하다
  constructor(public x: string) { }
}

const foo = new Foo('Hello');
console.log(foo);   // Foo { x: 'Hello' }
console.log(foo.x); // Hello

class Bar {
  // 접근 제한자가 사용된 생성자의 파라미터 x는 멤버 변수로 정의되고 초기화가 수행된다
  // private이 사용되었으므로 x는 클래스 내부에서만 참조 가능하다
  constructor(private x: string) { }
}

const bar = new Bar('Hello');
console.log(bar);      // Bar { x: 'Hello' }
// console.log(bar.x); // Property 'x' is private and only accessible within class 'Bar'.
```

만일 생성자 파라미터에 접근 제한자를 사용하지 않으면 생성자 파라미터는 생성자 내부에서만 유효한 지역 변수가 되어 생성자 외부에서 참조가 불가능하게 된다.

```typescript
class Foo {
  // x는 생성자 내부에서만 유효한 지역 변수이다.
  constructor(x: string) {
    console.log(x); // Hello
  }
}

const foo = new Foo('Hello');
console.log(foo); // Foo {}
```

# 4. static 키워드

ECMAScript 6 클래스에서 static 키워드는 클래스의 정적(static) 메소드를 정의한다. 정적 메소드는 클래스의 인스턴스화(instantiating)없이 호출하며 클래스의 인스턴스로 호출할 수 없다.

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

**Typescript 클래스에서 static 키워드는 멤버 변수에도 사용할 수 있다.** ECMAScript 6와 마찬가지로 정적 프로퍼티는 클래스의 인스턴스화없이 호출하며 클래스의 인스턴스로 호출할 수 없다.

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

# 5. 추상 클래스 (Abstract class)

추상 클래스는 추상 메소드(Abstract method)를 포함할 수 있는 클래스로서 직접 인스턴스를 생성할 수 없으며 상속만을 위해 사용된다. 추상 클래스를 상속하는 클래스는 추상 클래스의 추상 메소드를 반드시 구현하여야 한다.

```typescript
abstract class Animal {
  // 추상 메소드
  abstract makeSound(): void;
  // 일반 메소드
  move(): void {
    console.log("roaming the earth...");
  }
}

// new Animal();
// error TS2511: Cannot create an instance of the abstract class 'Animal'.

class Dog extends Animal {
  // 추상 클래스의 추상 메소드를 반드시 구현하여야 한다
  makeSound() {
    console.log('bowwow~~');
  }
}

const myDog = new Dog();
myDog.makeSound();
myDog.move();
```

[인터페이스](./typescript-interface)는 모든 메소드가 추상 메소드이지만 추상 클래스는 추상 메소드와 구현이 되어 있는 일반 메소드를 포함할 수 있다.

# Reference

* [ECMAScript6 - Class](./es6-class)

* [Typescript Class](https://www.typescriptlang.org/docs/handbook/classes.html)

* [Typescript Interface](./typescript-interface)
