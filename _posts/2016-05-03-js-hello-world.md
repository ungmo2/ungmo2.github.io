---
layout: post
title: <strong>Hello world</strong>
subtitle: 자바스크립트의 실행
categories: javascript
section: javascript
seq: 5
subseq: 3
description: 자바스크립트는 interactive한 웹페이지 작성을 가능하게 한다. 예를 들면, 이벤트(e.g. 버튼 클릭, 웹페이지 로딩 완료 등)에 반응하여 HTML 요소에 접근하고 조작할 수 있다. 정적인 HTML을 동적으로 조작할 수 있는 유일한 방법은 Javascript를 사용하는 것이다.
---

* TOC
{:toc}

# 1. Hello World

자바스크립트는 interactive한 웹페이지 작성을 가능하게 한다. 예를 들면, 이벤트(e.g. 버튼 클릭, 웹페이지 로딩 완료 등)에 반응하여 HTML 요소에 접근하고 조작할 수 있다. 정적인 HTML을 동적으로 조작할 수 있는 유일한 방법은 Javascript를 사용하는 것이다.

사용자에 의해 버튼이 클릭되면 정적 HTML을 동적으로 조작하는 간단한 자바스크립트 예제를 만들어 보자.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hello World</title>
  <style>
    button { color: red; }
  </style>
</head>
<body>
  <h1 id="heading"></h1>
  <button id="my-btn">click me!</button>

  <script>
    var heading = document.getElementById('heading');
    var myButton = document.getElementById('my-btn');

    myButton.addEventListener('click', function () {
      heading.innerHTML = 'Hello World!';
    });
  </script>
</body>
</html>
```

<div class='result' style="height: 136px;"></div>

# 2. 외부의 자바스크립트 파일 실행하기

HTML은 웹페이지의 내용(content)과 구조(structure)을 담당한다. Javascript의 역할은 정적인 HTML에 동적 기능을 부여하는 것이다. 즉, HTML과 Javascript는 역할(관심사, Concern)이 다르므로 분리된 파일로 작성하는 것이 바람직하다.

위 코드를 역할에 따라 HTML과 CSS, JavaScript로 각각 분리해 보자.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hello World</title>
  <link rel="stylesheet" href="style.css"></link>
</head>
<body>
  <h1 id="heading"></h1>
  <button id="my-btn">click me!</button>

  <script src="main.js"></script>
</body>
</html>
```

```css
/* style.css */
button {
  color: red;
}
```

```javascript
// main.js
var heading = document.getElementById('heading');
var myButton = document.getElementById('my-btn');

myButton.addEventListener('click', function () {
  heading.innerHTML = 'Hello World!';
});
```

# 3. script 태그의 async / defer 어트리뷰트

이와 같이 스크립트 로딩 지연으로 인한 병목 현상을 근본적으로 방지하기 위해 HTML5부터 script 태그에 `async`와 `defer` 어트리뷰트가 추가되었다.

```html
<script async src="extern.js"></script>
<script defer src="extern.js"></script>
```

async
: 웹페이지 파싱과 외부 스크립트 파일의 다운로드가 동시에 진행된다. 스크립트는 다운로드 완료 직후 실행된다. IE9 이하 버전은 지원하지 않는다.

defer
: 웹페이지 파싱과 외부 스크립트 파일의 다운로드가 동시에 진행된다. 스크립트는 웹페이지 파싱 완료 직후 실행된다. IE9 이하 버전에서 정상적으로 동작하지 않을 수 있다.

![script-execution](./img/script-execution.jpg)
{: .w-650}

script 태그의 async, defer 어트리뷰트 (출처: [Peter Beverloo](http://peter.sh/experiments/asynchronous-and-deferred-javascript-execution-explained/))
{: .desc-img}

async와 defer 어트리뷰트는 웹페이지 파싱과 외부 스크립트 파일의 다운로드가 동시에 진행된다는 면에서는 동일하다. 하지만 스크립트의 실행 시점이 다르다.

<!-- # 4. JavaScript Output

Javascript에서 data를 표시하는 방법은 아래와 같다.

| Type            | Code             |
| --------------- | ---------------- |
| alert box       | alert()          |
| HTML output     | document.write() |
| HTML element    | innerHTML        |
| Browser console | console.log()    |

```html
<!DOCTYPE html>
<html>
<body>
  <h1>My First Web Page</h1>
  <p id="demo"></p>
  <script>
    alert('alert');
    document.write('document.write');
    document.getElementById('demo').innerHTML = 'innerHTML';
    console.log('console.log');
  </script>
</body>
</html>
``` -->
# Reference

* [Asynchronous and deferred JavaScript execution explained](http://peter.sh/experiments/asynchronous-and-deferred-javascript-execution-explained/)
