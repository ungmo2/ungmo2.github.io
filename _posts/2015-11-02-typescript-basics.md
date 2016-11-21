---
layout: post
title: TypeScript - <strong>Basics</strong>
subtitle: TypeScript의 소개와 개발 환경
categories: typescript
section: typescript
---

* TOC
{:toc}

![typescript Logo](/img/typescript-logo.png)

# 1. TypeScript Data Type

TypeScript는 [JavaScript의 자료형](./js-data-type-variable#data-type-)을 사용할 수 있다.

* 기본 자료형 (primitive data type)
  * `Boolean`
  * `null`
  * `undefined`
  * `Number`
  * `String`
  * `Symbol` (New in ECMAScript 6)
* `Object`


```typescript
// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// String
let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
// template string
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`


// Array
let list: number[] = [1, 2, 3];
// generic array type
let list: Array<number> = [1, 2, 3];

// Tuple
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

TypeScript에서 추가된 자료형은 아래와 같다.

Any
: 모든 자료형에 사용할 수 있다. 타입 추론(type inference)할 수 없는 변수는 any 타입으로 선언된다.

```typescript
var x: any;
var y;            // var y: any;와 같다
var z: { a; b; }; // var z: { a: any; b: any; };와 같다
```

Void
: 함수에서 반환값이 없을 경우 사용한다.

```typescript
function speak(food: string, energy: number): void {
  console.log("Our " + food + " has " + energy + " calories.");
}
```

TypeScript 자료형에 관한 보다 자세한 내용은 [TypeScript: Basic Types](http://www.typescriptlang.org/docs/handbook/basic-types.html)을 참조하기 바란다.


# 2. Static Typing (정적 타이핑)

C나 Java같은 C-family 언어는 변수 선언 시 변수에 저장할 값의 종류에 따라 사전에 자료형을 지정(Type annotation)하여야 하며 지정한 자료형에 맞는 값을 할당하여 한다.

JavaScript는 동적 타입(dynamic typed) 언어 혹은 느슨한 타입(loosely typed) 언어이다. 이것은 변수의 Type annotation이 필요없이 값이 할당되는 과정에서 동적으로 자료형이 결정(Type Inference)될 것이라는 뜻이다. 따라서 같은 변수에 여러 data type의 값을 대입할 수 있다. 이를 동적 타이핑(Dynamic Typing)이라 한다.

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

<strong>정적 타이핑</strong>은 <strong>Type</strong>Script의 가장 대표적인 특징 중 하나로 변수의 자료형을 선언할 수 있는 것을 의미한다. 그리고 컴파일러는 선언된 자료형에 맞게 변수가 사용되었는지 확인한다.

```typescript
var burger: string = 'hamburger',     // String
    calories: number = 300,           // Numeric
    tasty: boolean = true;            // Boolean
```

만약 자료형의 선언을 생략하면 값이 할당되는 과정에서 동적으로 자료형이 결정(타입 추론: Type Inference)된다. 하지만 자료형의 선언을 생략하여도 타입 추론으로 자료형이 결정된 이후 다른 자료형의 값을 할당하면 에러가 발생한다.

```typescript
var burger = 'hamburger';

burger = 1;  // Error!: Type '1' is not assignable to type 'string'
```

정적 타이핑은 변수는 물론 함수의 매개변수, 리턴값에도 사용할 수 있다.

```typescript
var burger: string = 'hamburger',  // String
    calories: number = 300,        // Numeric
    tasty: boolean = true;         // Boolean

function speak(food: string, energy: number): void {
  console.log("Our " + food + " has " + energy + " calories.");
}

speak(burger, calories); // Our hamburger has 300 calories.

speak("tripple cheesburger", "a ton of"); // Error!: Argument of type '"a ton of"' is not assignable to parameter of type 'number'
```

참고로 정적 타이핑과 동적 타이핑 중 무엇이 우위인지에 대한 논쟁은 사실 큰 의미가 없다. 정적 타이핑과 동적 타이핑의 가장 큰 차이를 런타임 시의 에러 검출과 컴파일 시의 에러 검출로 볼 수 있는데 Java와 같은 정적 타이핑 언어도 런타임에만 검출되는 에러가 존재하기 때문이다.

정적 타이팅의 장점은 <strong>코드 가독성</strong>과 <strong>안정성</strong>의 향상이라고 볼 수 있는데 이는 대규모 프로젝트에 적합하다. 

# 2. Interface

Interface는 자료형을 체크하기 위해 사용된다.
Interfaces are used to type-check whether an object fits a certain structure. By defining an interface we can name a specific combination of variables, making sure that they will always go together. When translated to JavaScript, interfaces disappear – their only purpose is to help in the development stage.

In the below example we define a simple interface to type-check a function’s arguments:

```typescript
// Here we define our Food interface, its properties, and their types.
interface Food {
    name: string;
    calories: number;
}

// We tell our function to expect an object that fulfills the Food interface.
// This way we know that the properties we need will always be available.
function speak(food: Food): void{
  console.log("Our " + food.name + " has " + food.calories + " calories.");
}

// We define an object that has all of the properties the Food interface expects.
// Notice that types will be inferred automatically.
var ice_cream = {
  name: "ice cream",
  calories: 200
}

speak(ice_cream);
```


# 3. Class

# 4. Generic

# 5. Module

# 6. Declaration File

# Reference

* [TypeScript](http://www.typescriptlang.org/index)

* [TypeScript Documentation](http://www.typescriptlang.org/docs/tutorial.html)
