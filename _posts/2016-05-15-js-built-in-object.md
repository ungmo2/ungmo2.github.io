---
layout: post
title: Javascript <strong>Built-in Object</strong>
subtitle: 자바스크립트가 제공하는 내장 객체
categories: javascript
section: javascript
---

* TOC
{:toc}

<strong>Built-in Object(내장 객체)</strong>는 웹페이지 등을 표현하기 위한 공통의 기능을 제공한다. 웹페이지가 브라우저에 의해 로드되자마자 별다른 행위없이 바로 사용이 가능하다. Built-in Object는 아래와 같이 구분할 수 있다.

- Standard Built-in Objects (or Global Objects)  

- BOM (Browser Object Model)  

- DOM (Document Object Model)

<strong>Standard Built-in Objects(표준 빌트인 객체)</strong>를 제외한 BOM과 DOM을 <strong>Native Object</strong>라고 분류하기도 한다. 또한 사용자가 생성한 객체를 <strong>Host Object(사용자 정의 객체)</strong>라 한다.

![object](/img/object.png)
{: .w-400}

# 1. Standard Built-in Objects (or Global Objects)

Javascript는 프로그램 전체의 영역에서 공통적으로 필요한 기능을 사용자 각자가 일일히 작성하는 수고를 줄이기 위해 Standard Built-in Objects(표준 빌트인 객체)를 제공한다. 일반적으로 String, Array와 같이 <strong>대문자</strong>로 시작한다.

Standard Built-in Objects(표준 빌트인 객체)를 <strong>Global Objects</strong>라고 부르기도 하는데 이것은 전역 객체(Global Object)와 다른 의미로 사용되므로 혼동에 주의하여야 한다.

전역 객체(Global Object)는 모든 객체의 최상위 객체를 의미하며 일반적으로 Browser-side에서는 `window`, Server-side(Node.js)에서는 `global` 객체를 의미한다.

자세한 내용은 [Javascript Standard Built-in Objects](./js-standard-built-in-objects.html)를 참조하기 바란다.

# 2. BOM (Browser Object Model)

브라우저 객체 모델은 브라우저 탭 또는 브라우저 창의 모델을 생성한다. 최상위 객체는 `window` 객체로 현재 브라우저 창 또는 탭을 표현하는 객체이다. 또한 이 객체의 자식 객체 들은 브라우저의 다른 기능들을 표현한다. 이 객체들은 Standard Built-in Objects가 구성된 후에 구성된다.

![BOM](/img/BOM.png)
{: .w-400}

자세한 내용은 [MDN Web APIs: Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)를 참조하기 바란다.

# 3. DOM (Document Object Model)

문서 객체 모델은 현재 웹페이지의 모델을 생성한다. 최상위 객체는 `document` 객체로 전체 문서를 표현한다. 또한 이 객체의 자식 객체들은 문서의 다른 요소들을 표현한다. 이 객체들은 Standard Built-in Objects가 구성된 후에 구성된다.

![DOM](/img/DOM.png)
{: .w-400}

자세한 내용은 [Javascript DOM](./js-dom.html)를 참조하기 바란다.

# Reference

* [Standard Built-in Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
