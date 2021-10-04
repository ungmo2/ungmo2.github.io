---
layout: post
title:
subtitle: <strong>Code Structure</strong>
category: ex
section: ex
seq: 4
permalink: /:categories/:title
description:
---

# Code Structure

[Array HOF 연습 문제: html 생성](/ex/array-hof#1-html-생성)에서 작성한 코드를 다시 한번 살펴보자.

```javascript
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

const render = todos =>
  todos
    .map(
      ({ id, content, completed }) => `
        <li id="${id}">
          <label><input type="checkbox" ${completed ? 'checked' : ''}>${content}</label>
        </li>`
    )
    .join('');

console.log(render(todos));
/*
<li id="3">
  <label><input type="checkbox">HTML</label>
</li>
<li id="2">
  <label><input type="checkbox" checked>CSS</label>
</li>
<li id="1">
  <label><input type="checkbox">Javascript</label>
</li>
*/
```

<!-- 위 예제에서는 todos 배열이 존재하는 상태에서 시작한다. 하지만 프론트엔드 프로그래밍에서 사용하는 데이터의 대부분은 백엔드에서 전달받는 것이 일반적이다. -->

## 1.1. 응집도

위 방식은 상태(todos 배열)과 상태를 사용하는 함수(render) 사이의 응집도가 낮다. 응집도를 높이기 위해 todos 배열과 render 함수를 Todos 객체에 바인딩한다.

```javascript
const Todos = { /* Do something */ };

console.log(Todos.state);
/*
[
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false }
]
*/

console.log(Todos.render());
/*
<li id="3">
  <label><input type="checkbox">HTML</label>
</li>
<li id="2">
  <label><input type="checkbox" checked>CSS</label>
</li>
<li id="1">
  <label><input type="checkbox">Javascript</label>
</li>
*/
```

<!--
const Todos = {
  state: [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ],
  render() {
    return this.state
      .map(
        ({ id, content, completed }) => `
          <li id="${id}">
            <label><input type="checkbox" ${completed ? 'checked' : ''}>${content}</label>
          </li>`
      )
      .join('');
  },
};

console.log(Todos.state);
/*
[
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false }
]
*/

console.log(Todos.render());
/*
<li id="3">
  <label><input type="checkbox">HTML</label>
</li>
<li id="2">
  <label><input type="checkbox" checked>CSS</label>
</li>
<li id="1">
  <label><input type="checkbox">Javascript</label>
</li>
*/
-->

## 1.2. 정보 은닉

위 Todos 객체에 바인딩된 todos 배열은 public하므로 render 함수 이외의 로직에도 공개되어 있어 변경에 안전하지 못하다. 다음 요구 사항이 충족되도록 구현하라.

1. Todos 객체에 바인딩된 todos 배열은 render 함수만 참조 가능하도록 안전하게 은닉되어야 한다. 즉, Todos 객체 외부에서 todos 배열을 참조할 수 없도록 한다.
2. Todos 객체는 애플리케이션 전역에서 단 한번만 생성되는 싱글톤 객체다.
3. 모듈은 사용하지 않는다.

```javascript
const Todos = /* Do something */;

console.log(Todos.render());
/*
<li id="3">
  <label><input type="checkbox">HTML</label>
</li>
<li id="2">
  <label><input type="checkbox" checked>CSS</label>
</li>
<li id="1">
  <label><input type="checkbox">Javascript</label>
</li>
*/
```

<!--
const Todos = (() => {
  const todos = [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ];

  return {
    render() {
      return todos
        .map(
          ({ id, content, completed }) => `
            <li id="${id}">
              <label><input type="checkbox" ${completed ? 'checked' : ''}>${content}</label>
            </li>`
        )
        .join('');
    },
  };
})();
-->

## 1.3. 모듈화

위 Todos 객체를 모듈(ESM)로 구현한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script type="module" src="app.js"></script>
  </body>
</html>
```

```javascript
// app.js
import Todos from './Todos.js';
console.log(Todos.render());
```

```javascript
// Todos.js
// Do something.

export default Todos;
```

<!--
<!DOCTYPE html>
<html>
  <body>
    <script type="module" src="app.js"></script>
  </body>
</html>

// app.js
import Todos from './Todos.js';
console.log(Todos.render());

// Todos.js
const todos = [
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

const render = () =>
  todos
    .map(
      ({ id, content, completed }) => `
        <li id="${id}">
          <label><input type="checkbox" ${completed ? 'checked' : ''}>${content}</label>
        </li>`
    )
    .join('');

const Todos = { render };

export default Todos;
-->

## 1.4. Conclusion

위 4가지 패턴을 구현해 본 결과 얻은 TIL을 응집도, 결합도, 정보 은닉, 모듈의 관점에서 정리한다.
