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

/** @type {number[]} */
let nums;

/** @type { {id: number, content: string, completed: boolean} } */
let obj;

/** @type {string|number} */
let union;

/** @type {Array<{ id: number, content: string, completed: boolean }>} */
let generic;
```

# 2. 함수 타입

```javascript
// @ts-check

// TYPESCRIPT SYNTAX를 사용하는 방법
/**
 * 두 수의 합을 구한다.
 * @type { (a: number, b: number) => number }
 */
 const add1 = (a, b) => a + b;

// JSDOC SYNTAX를 사용하는 방법
/**
 * 두 수의 차를 구한다.
 * @param {number} a - the first thing
 * @param {number} b - the second thing
 * @returns {number}
 */
 const sub = (a, b) => a - b;
```

# 3. 타입 정의

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

# Reference

- [JS Projects Utilizing TypeScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html)

- [JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
