---
layout: post
title: TypeScript <strong>Typing</strong>
subtitle: 타입 선언과 정적 타이핑
categories: typescript
section: typescript
---

* TOC
{:toc}

![typescript Logo](/img/typescript-logo.png)

# 1. 타입 선언 (Type Declaration)

TypeScript는 아래와 같이 변수명 뒤에 타입(자료형)을 명시하는 것으로 타입을 선언할 수 있다.

```typescript
let foo: string = 'hello';
let bar: number = true; // error TS2322: Type 'true' is not assignable to type 'number'.
```

타입 선언은 코드 예측성을 향상시킨다. 또한 타입 선언은 강력한 타입 체크를 가능하게 하여 문법 에러나 타입과 일치하지 않는 값의 할당 등 기본적인 오류를 런타임 이전에 검출한다. VSCode와 같은 툴을 사용하면 코드 작성 시점에 에러를 검출할 수 있어서 개발효율이 대폭 향상된다.

![type-error](./img/type-error.png)
{: .w-350}

Visual Studio Code의 에러 사전 검출
{: .desc-img}

함수의 매개변수와 반환값에 대한 타입 선언 방법은 아래와 같다. 일반 변수와 마찬가지로 선언된 타입에 일치하지 않는 값이 주어지면 에러가 발생한다.

```typescript
// 함수선언식
function multiply1(x: number, y: number): number {
  return x * y;
}

// 함수표현식
const multiply2 = (x: number, y: number): number => x * y;

console.log(multiply1(10, 2));
console.log(multiply2(10, 3));

console.log(multiply1(true, 1)); // error TS2345: Argument of type 'true' is not assignable to parameter of type 'number'.
```

TypeScript는 ES5, ES6의 Superset(상위확장)이므로 [JavaScript의 타입](./js-data-type-variable#data-type-)을 그대로 사용할 수 있다. JavaScript의 타입 이외에도 TypeScript 고유의 타입이 추가로 제공된다.

| Type        | JS | TS | Description      |
|:------------|:--:|:--:|:-----------------|
| boolean     |◯   |    | true와 false
| null        |◯   |    | primitives 또는 object형 변수에 값이 없다는 것을 명시          
| undefined   |◯   |    | 값을 할당하지 않은 변수의 초기값         
| number      |◯   |    | 숫자(정수와 실수, Infinity, NaN)
| string      |◯   |    | 문자열
| symbol      |◯   |    | 고유하고 수정 불가능한 데이터 타입이며 주로 객체 속성(object property)들의 식별자로 사용(ES6에서 추가)
| object      |◯   |    | 객체형, 참조형
| array       |    |◯   | 배열
| tuple       |    |◯   | 고정된 요소수 만큼의 자료형을 미리 선언후 배열을 표현
| enum        |    |◯   | 열거형. 숫자값 집합에 이름을 지정한 것이다.
| any         |    |◯   | 타입 추론(type inference)할 수 없거나 타입 체크가 필요없는 변수는 any 타입으로 선언한다.
| void        |    |◯   | 일반적으로 함수에서 반환값이 없을 경우 사용한다.
| never       |    |◯   | 결코 발생하지 않는 값


```typescript
// boolean
let isDone: boolean = false;

// null
let n: null = null;

// undefined
let u: undefined = undefined;

// number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// string
let color: string = "blue";
color = 'red';
let myName: string = `Lee`; // ES6 템플릿 문자열
let greeting: string = `Hello, my name is ${ myName }.` // ES6 템플릿 대입문

// object : 별도의 타입 선언을 하지 않는다.
const obj = {};

// array
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3]; // Generic array type

// tuple : 고정된 요소수 만큼의 타입을 미리 선언후 배열을 표현
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error

console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

// enum : 열거형은 숫자값 집합에 이름을 지정한 것.
enum Color1 {Red, Green, Blue};
let c1: Color1 = Color1.Green;

console.log(c1); // 1

enum Color2 {Red = 1, Green, Blue};
let c2: Color2 = Color2.Green;

console.log(c2); // 2

enum Color3 {Red = 1, Green = 2, Blue = 4};
let c3: Color3 = Color3.Blue;

console.log(c3); // 4

// any : 타입 추론(type inference)할 수 없거나 타입 체크가 필요없는 변수는 any 타입으로 선언한다.
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// void : 일반적으로 함수에서 반환값이 없을 경우 사용한다.
function warnUser(): void {
  console.log("This is my warning message");
}

// never : 결코 발생하지 않는 값
function infiniteLoop(): never {
  while (true) {
  }
}

function error(message: string): never {
  throw new Error(message);
}
```

# 2. 정적 타이핑 (Static Typing)

C나 Java같은 C-family 언어는 변수 선언 시 변수에 저장할 값의 종류에 따라 사전에 타입을 선언(Type declaration)하여야 하며 지정한 타입에 맞는 값을 할당하여 한다. 이를 정적 타이핑(Static Typing)이라한다.

JavaScript는 동적 타입(dynamic typed) 언어 혹은 느슨한 타입(loosely typed) 언어이다. 이것은 변수의 타입 선언없이 값이 할당되는 과정에서 동적으로 타입이 추론(타입추론 Type Inference)될 것이라는 뜻이다. 따라서 같은 변수에 여러 타입의 값을 교차하여 대입할 수 있다. 이를 동적 타이핑(Dynamic Typing)이라 한다.

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

TypeScript의 가장 독특한 특징은 <strong>정적 타이핑</strong>을 지원한다는 것이다. 즉 변수의 타입을 선언할 수 있으며 잘못된 타입의 값이 할당되면 컴파일러는 이를 감지한다.

```typescript
let foo: string,   // String
    bar: number,   // Numeric
    baz: boolean;  // Boolean

foo = 'Hello';
bar = 123;
baz = 'true'; // error: Type '"true"' is not assignable to type 'boolean'.
```

만약 타입 선언을 생략하면 값이 할당되는 과정에서 동적으로 타입이 결정(타입추론: Type Inference)된다. 하지만 타입 추론으로 자료형이 결정된 이후 다른 타입의 값을 할당하면 에러가 발생한다.

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

정적 타이팅의 장점은 <strong>코드 가독성과 예측성 향상</strong>과 <strong>안정성의 향상</strong>이라고 볼 수 있는데 이는 대규모 프로젝트에 매우 적합하다.

# Reference

* [TypeScript: Basic Types](http://www.typescriptlang.org/docs/handbook/basic-types.html)
