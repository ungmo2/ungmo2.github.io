---
layout: post
title: ECMAScript6 - <strong>Template String</strong>
subtitle: 템플릿 문자열
categories: es6
section: es6
description: ECMAScript6 ES6 'Template String' '템플릿 문자열'
---

![es6 Logo](/img/es6.png)
{: .w-650}

ES6는 템플릿 문자열(template string)이라고 불리는 새로운 종류의 문자열 표기법을 도입하였다. 템플릿 문자열은 일반 문자열과 비슷해 보이지만, ' 또는 " 같은 통상적인 따옴표 문자 대신 백틱(backtick) 문자 `` ` ``를 사용한다.

```javascript
let template = `Template strings can include 'single quotes' and "double quotes" inline.`;

console.log(template);
```

일반적인 문자열과 달리 템플릿 문자열은 여러 줄에 걸쳐 표현할 수 있으며 줄바꿈과 들여쓰기 등 템플릿 문자열 속의 모든 white-space는 있는 그대로 적용된다.

```javascript
let template =`<ul class="nav-items">
  <li><a href="#home">Home</a></li>
  <li><a href="#news">News</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#about">About</a></li>
</ul>`;

console.log(template);
```

템플릿 문자열은 + 연산자를 사용하지 않아도 간단한 방법으로 문자열에 새로운 문자열을 삽입할 수 있는 기능을 제공한다. 이를 String Interpolation(문자열 삽입)이라 한다.

```javascript
const first = 'Ung-mo';
const last = 'Lee';
console.log('My name is ' + first + ' ' + last + '.');
console.log(`My name is ${first} ${last}.`);

console.log(`1 and 1 make ${1 + 1}`);
```

위 코드의 `${text}`, `${1 + 1}`를 템플릿 대입문(template substitution)이라 한다. 템플릿 대입문에는 문자열뿐만아니라 모든 JavaScript 표현식이 사용될 수 있다.

```javascript
function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      `User ${user.name} is not authorized to do ${action}.`);
  }
}
```

# Reference

* [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf)

* [ECMAScript 6 New Features: Overview & Comparison](http://es6-features.org/#Constants)

* [ES6 compat table](https://kangax.github.io/compat-table/es6/)
