---
layout: post
title: TypeScript - <strong>Static Typing & Data Types</strong>
subtitle: TypeScript 정적 타이핑과 데이터 타입
categories: typescript
section: typescript
---

* TOC
{:toc}

![typescript Logo](/img/typescript-logo.png)

# 1. Static Typing (정적 타이핑)

C나 Java같은 C-family 언어는 변수 선언 시 변수에 저장할 값의 종류에 따라 사전에 자료형을 선언(Type declaration)하여야 하며 지정한 자료형에 맞는 값을 할당하여 한다. 이를 정적 타이핑(Static Typing)이라한다.

JavaScript는 동적 타입(dynamic typed) 언어 혹은 느슨한 타입(loosely typed) 언어이다. 이것은 변수의 자료형 선언이 없이 값이 할당되는 과정에서 동적으로 자료형이 추론(형추론 Type Inference)될 것이라는 뜻이다. 따라서 같은 변수에 여러 data type의 값을 대입할 수 있다. 이를 동적 타이핑(Dynamic Typing)이라 한다.

```javascript
var foo;

console.log(typeof foo);  // undefined

foo = null;
console.log(typeof foo);  // object

foo = {};
console.log(typeof foo);  // object

foo = 3;
console.log(typeof foo);  // number

foo = 3.14;
console.log(typeof foo);  // number

foo = "Hi there";            
console.log(typeof foo);  // string

foo = true;                  
console.log(typeof foo);  // boolean
```

TypeScript의 가장 독특한 특징은 <strong>정적 타이핑</strong>을 지원한다는 것이다. 즉 변수의 자료형(type)을 선언할 수 있으며 잘못된 자료형의 값이 할당되면 컴파일러는 이를 감지한다.

```typescript
let foo: string,   // String
    bar: number,   // Numeric
    baz: boolean;  // Boolean

foo = 'Hello';
bar = 123;
baz = 'true'; // error: Type '"true"' is not assignable to type 'boolean'.
```

만약 자료형의 선언을 생략하면 값이 할당되는 과정에서 동적으로 자료형이 결정(타입 추론: Type Inference)된다. 하지만 타입 추론으로 자료형이 결정된 이후 다른 자료형의 값을 할당하면 에러가 발생한다.

```typescript
let foo = 123; // let foo: number와 동치
foo = 'hi';    // error: Type '"hi"' is not assignable to type 'number'.
```

변수의 선언과 동시에 값을 초기화하지 않으면 그 변수는 `any` 타입이 된다. `any` 타입의 변수는 JavaScript의 var 키워드와 같이 어떤 타입의 값도 재할당이 가능하다. 이는 TypeScript를 사용하는 장점을 없애기 때문에 사용하지 않는 편이 좋겠다.

```typescript
let foo; // let foo: any와 동치

foo = 'Hello';
console.log(typeof foo); // string

foo = true;
console.log(typeof foo); // boolean
```

정적 타이핑은 변수는 물론 함수의 매개변수와 리턴값에도 사용할 수 있다.

```typescript
function add(x: number, y: number): number {
  return x + y;
}

console.log(add(10, 10)); // 20
console.log(add('10', '10'));
// error TS2345: Argument of type '"10"' is not assignable to parameter of type 'number'.
```

참고로 정적 타이핑과 동적 타이핑 중 무엇이 우위인지에 대한 논쟁은 사실 큰 의미가 없다. 정적 타이핑과 동적 타이핑의 가장 큰 차이를 컴파일 시의 에러 검출과 런타임 시의 에러 검출로 볼 수 있는데 Java와 같은 정적 타이핑 언어도 런타임에만 검출되는 에러가 존재하기 때문이다.

정적 타이팅의 장점은 <strong>코드 가독성 향상</strong>과 <strong>안정성의 향상</strong>이라고 볼 수 있는데 이는 대규모 프로젝트에 적합하다.

# 2. Data Type

TypeScript는 ES5, ES6의 Superset(상위확장)이므로 [JavaScript의 자료형](./js-data-type-variable#data-type-)을 그대로 사용할 수 있다. JavaScript의 자료형 이외에도 TypeScript 고유의 자료형이 추가로 제공된다.

| 자료형        | JS | TS | Description      |
|:------------|:--:|:--:|:-----------------|
| boolean     |◯   |    | true와 false
| null        |◯   |    | primitives 또는 object형 변수에 값이 없다는 것을 명시          
| undefined   |◯   |    | 값을 할당하지 않은 변수의 초기값         
| number      |◯   |    | 숫자(정수와 실수, Infinity, NaN)
| string      |◯   |    | 문자열
| symbol      |◯   |    | 고유하고 수정 불가능한 데이터 타입이며 주로 객체 속성(object property)들의 식별자로 사용(ES6에서 추가)
| object      |◯   |    | 객체형, 참조형
| array       |    |◯   | 배열
| tuple       |    |◯   | 고정된 요소 수 만큼의 자료형을 미리 선언후 배열을 표현
| enum        |    |◯   | 열거형
| any         |    |◯   | 타입 추론(type inference)할 수 없는 변수는 any 타입으로 선언된다.
| void        |    |◯   | 함수에서 반환값이 없을 경우 사용한다.
| never       |    |◯   | 결코 발생하지 않는 값

TypeScript 자료형에 관한 자세한 내용은 [TypeScript: Basic Types](http://www.typescriptlang.org/docs/handbook/basic-types.html)을 참조하기 바란다.

# 2. Interface

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

# 3. Class

# 4. Generic

# 5. Module

# 6. Declaration File

# Reference

* [TypeScript](http://www.typescriptlang.org/index)

* [TypeScript Documentation](http://www.typescriptlang.org/docs/tutorial.html)
