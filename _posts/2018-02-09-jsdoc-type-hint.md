---
layout: post
title: JSDoc을 사용하여 자바스크립트에 타입 힌트 제공하기
categories: tools
section: tools
seq: 15
subseq: 9
description: JSDoc을 사용하여 자바스크립트에 타입 힌트 제공하기
---

* TOC
{:toc}

VS Code에서 순수한 자바스크립트 소스코드에 다음과 같이 `@ts-check`를 주석으로 추가하면 TypeScript처럼 타입 및 에러 체크가 가능하다.

- [@ts-check](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check)

```javascript
// @ts-check

function compact(arr) {
  if (orr.length > 10)
  //  ~~~ 'orr' 이름을 찾을 수 없습니다.ts(2304)
    return arr.trim(0, 10)
  return arr
}
```

JSDoc을 사용하면 자바스크립트 소스코드에 타입 힌트를 제공할 수 있다.

[JSDoc](https://jsdoc.app)은 자바스크립트 API 문서 생성기다. 자바스크립트 소스코드에 JSDoc 형식의 주석을 추가하면 API를 설명하는 HTML 문서를 생성할 수 있다. JSDoc 주석은 `/** ... */` 사이에 기술한다. 일반적인 자바스크립트 주석 `/* ... */`은 무시된다.
{:.info}

```javascript
// @ts-check

/**
 * @param {any[]} arr
 */
function compact(arr) {
  if (arr.length > 10) return arr.trim(0, 10);
  //                              ~~~~
  // 'any[]' 형식에 'trim' 속성이 없습니다.ts(2339)
  return arr;
}
```

# 1. 변수 타입

```javascript
// @ts-check

/** @type {string} */
let str;

/** @type {number} */
let num;

/** @type {boolean} */
let bool;

/** @type {*} */
let any;

/** @type {?} */
let unknown;

/** @type {number[]} */
let nums;

/** @type { {id: number, content: string, completed: boolean} } */
let obj;

/** @type {string|number} */
let union;

/** @type {Array<{ id: number, content: string, completed: boolean }>} */
let generic;
```

- [@type](https://jsdoc.app/tags-type.html)

# 2. 함수 타입

```javascript
// @ts-check

// TypeScript syntax를 사용하는 방법
/**
 * 두 수의 합을 구한다.
 * @type { (a: number, b: number) => number }
 */
 const add = (a, b) => a + b;

// Closure syntax를 사용하는 방법
/**
 * 두 수의 곱을 구한다.
 * @type { function(number, number): number }
 */
 const multiply = (a, b) => a * b;

// JSDoc syntax를 사용하는 방법
/**
 * 두 수의 차를 구한다.
 * @param {number} a - the first thing
 * @param {number} b - the second thing
 * @returns {number}
 */
 const subtract = (a, b) => a - b;
```

@param은 타입 구문인 @type과 동일하게 사용할 수 있다, 단, @param은 매개변수 이름을 추가할 수 있고 매개변수는 이름을 대괄호로 감싸서 선택적 매개변수임을 명시할 수 있다.

- [@param and @returns](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#param-and-returns)

```javascript
// @ts-check

// Parameters may be declared in a variety of syntactic forms
/**
 * @param {string}  p1 - A string param.
 * @param {string=} p2 - An optional param (Closure syntax)
 * @param {string} [p3] - Another optional param (JSDoc syntax).
 * @param {string} [p4="test"] - An optional param with a default value
 * @return {string} This is the result
 */
function stringsStringStrings(p1, p2, p3, p4) {
  // TODO
}
```

- [@param (synonyms: @arg, @argument)](https://jsdoc.app/tags-param.html)
- [@returns(synonyms: @return)](https://jsdoc.app/tags-returns.html)

# 3. 타입 정의

@typedef는 복잡한 타입을 정의할 때 사용한다.

```javascript
// @ts-check

/**
 * 할일
 * @typedef {Object} Todo
 * @property {number} id - 할일 id
 * @property {string} content - 할일 내용
 * @property {boolean} completed - 할일 완료 여부
 */

/**
 * 할일 목록
 * @type {Todo[]}
 */
const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false },
];
```

- [@typedef](https://jsdoc.app/tags-typedef.html)

# 4. Callback

@callback은 @typedef와 유사하지만 object 타입 대신 특정한 function 타입을 지정한다.

```javascript
// @ts-check

// TypeScript syntax를 사용하는 방법
/**
 * @typedef { (data: string, index?: number) => boolean } Predicate1
 */

// Closure syntax를 사용하는 방법
/**
 * @typedef { function(string, number=): boolean } Predicate2
 */

// JSDoc syntax를 사용하는 방법
/**
 * @callback Predicate3
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */


/** @type {Predicate1} */
const ok = s => !(s.length % 2);
```

- [@callback](https://jsdoc.app/tags-callback.html)

# 5. DOM

```html
<!DOCTYPE html>
<html>
  <body>
    <input type="text" class="foo" />
    <script scr="app.js"></script>
  </body>
</html>
```

```javascript
// app.js

// @ts-check
// 태그 이름 input을 인수로 전달하면서 querySelector를 호출하면 HTMLInputElement 타입이 반환되는 것으로 인식한다.
const $input1 = document.querySelector('input');
// HTMLInputElement 타입의 객체에는 value 프로퍼티가 존재하므로 에러가 발생하지 않는디.
$input1.value = 'hello';

// 클래스 foo를 인수로 전달하면서 querySelector를 호출하면 Element 타입이 반환되는 것으로 인식한다.
const $input2 = document.querySelector('.foo');
// Element 타입의 객체에는 value 프로퍼티가 존재하지 않기 때문에 에러가 발생한디.
$input2.value = 'hello';
//      ~~~~~ 'Element' 형식에 'value' 속성이 없습니다.

// $input3를 HTMLInputElement 타입으로 타입 단언한다.
/** @type {HTMLInputElement} */
const $input3 = document.querySelector('.foo');
$input3.value = 'hello';

// $input4를 HTMLInputElement 타입으로 타입 단언한다.
const $input4 = /** @type {HTMLInputElement} */ (document.querySelector('.foo'));
$input4.value = 'hello';

// $input5를 HTMLInputElement 타입으로 타입 단언한다.
const $input5 = document.querySelector('.foo');
/** @type {HTMLInputElement} */ ($input5).value = 'hello';
```

# 6. Reference

- [JS Projects Utilizing TypeScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html)

- [JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
