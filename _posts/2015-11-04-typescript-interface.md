---
layout: post
title: TypeScript <strong>Interface</strong>
subtitle: 인터페이스
categories: typescript
section: typescript
---

![typescript Logo](/img/typescript-logo.png)

ES6는 인터페이스를 지원하지 않지만 TypeScript는 인터페이스를 지원한다.

인터페이스는 여러가지 자료형을 갖는 새로운 자료형을 정의하는 것과 유사하다. 인터페이스에 선언된 변수이나 메소드의 사용을 강제하여 일관성을 유지할 수 있도록 하는 것이다.

연관성을 가지는 데이터의 유형을 인터페이스로 정의하여 사용하면 여러개의 매개변수를 전달하여야 하는 경우 복잡한 매개변수 체크가 필요없어서 매우 유용하다.

```typescript
interface IPerson {
  name: string;
  age: number;
}

function sayHello(person: IPerson) {
  console.log(`
    Hello ${person.name}
    You are ${person.age} years old.
  `);
}

const me: IPerson = { name: 'Lee', age: 18 };
sayHello(me); // Hello Lee
```

인터페이스를 구현하는 클래스는 해당 인터페이스를 준수하여야 한다. 이는 인터페이스를 구현하는 클래스의 일관성을 유지할 수 있는 장점을 갖는다.

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

인터페이스에는 변수뿐만 아니라 메서드도 포함시킬 수 있다. 메서드의 구현은 클래스에서 실시한다.

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

function greeter(person: IPerson) {
  person.sayHello();
}

const me = new Person('Lee');
greeter(me); // Hello Lee
```

인터페이스와 일치하거나 인터페이스를 구현하였다는 것으로 타입 체크가 이루어 지는 것은 아니다. 중요한 것은 값이 실제로 가지고 있는 것이다. 이해가 어려울 수 있으므로 예를 들어 설명한다.

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

(1) 인터페이스 IDuck은 quack() 메서드를 갖는다.  
(2) makeNoise 함수는 인터페이스 IDuck를 구현한 클래스의 인스턴스인 duck을 인자로 전달받는다.  
(3) 클래스 MallardDuck은 인터페이스 IDuck을 구현하였다.  
(4) 클래스 RedheadDuck은 인터페이스 IDuck을 구현하지는 않았지만 quack() 메서드를 갖는다.  
(5) makeNoise() 함수에 인터페이스 IDuck을 구현하지 않은 클래스 RedheadDuck의 인스턴스를 인자로 전달하여도 에러없이 처리된다.

이것을 [덕 타이핑(duck typing)](https://ko.wikipedia.org/wiki/%EB%8D%95_%ED%83%80%EC%9D%B4%ED%95%91)이라 한다. TypeScript는 해당 인터페이스에서 정의한 값(변수나 메서드)을 가지고 있다면 그 인터페이스를 구현한 것으로 인정한다.

인터페이스의 메서드 뿐만 아니라 변수의 경우를 살펴보자.

```typescript
interface IPerson {
  name: string;
}

function sayHello(person: IPerson) {
  console.log(`Hello ${person.name}`);
}

const me = { name: 'Lee', age: 18 };
sayHello(me); // Hello Lee
```

인터페이스 IPerson와 일치하지는 않지만 IPerson의 name을 가지고 있으면 타입체크 에러가 발생하지 않고 인터페이스에 부합하는 것으로 처리된다.

인터페이스의 개발 단계에서 도움을 주기 위해 제공되는 기능이기 때문에 위의 TypeScript 코드는 컴파일되면 아래와 같이 인터페이스가 삭제된다.

```javascript
function sayHello(person) {
  console.log("Hello " + person.name);
}
var me = { name: 'Lee', age: 18 };
sayHello(me); // Hello Lee
```

# Reference

* [TypeScript Documentation](http://www.typescriptlang.org/docs/tutorial.html)

* [덕 타이핑(duck typing)](https://ko.wikipedia.org/wiki/%EB%8D%95_%ED%83%80%EC%9D%B4%ED%95%91)
