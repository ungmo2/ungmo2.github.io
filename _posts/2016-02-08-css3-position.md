---
layout: post
title: CSS3 <strong>Position</strong>
subtitle: 요소의 위치 정의
categories: css
section: css
seq: 2
subseq: 8
description: position 프로퍼티는 요소의 위치를 정의한다. top, bottom, left, right 프로퍼티와 함께 사용하여 위치를 지정한다.
---

* TOC
{:toc}

# 1. position 프로퍼티

`position` 프로퍼티는 요소의 위치를 정의한다. top, bottom, left, right 프로퍼티와 함께 사용하여 위치를 지정한다.

![position](/img/position.png)

<!--
**absolute 또는 fixed로 position 설정시, block 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 주의하여야 한다.** 또한 position 속성은 상속되지 않는다.

| 속성값	      | Description
|:-----------|:-----------------
| static     | 위에서 아래로, 왼쪽에서 오른쪽으로 순서에 따라 배치된다.(기본값)
| relative   | 기본 위치(static으로 지정되었을 때의 위치)에서 좌표 속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다.(상대위치)
| absolute   | 부모 혹은 조상 요소중에 relative 속성이 선언된 요소를 기준으로 좌표속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다.(절대위치)
| fixed      | viewport를 기준으로 좌표속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다. 스크롤이 되더라도 화면에서 사라지지 않고 같은 곳에 위치한다.(고정위치)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        color: #fff;
        font-weight: 600;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
        border: 1px solid #bcbcbc;
        border-radius: 6px;
        height: 80px;
        padding: 20px;
      }
      #box1 {
        position: static;
        top:20px; right:30px;
        background: #2db34a;
      }
      #box2 {
        position: absolute;
        top:20px; right:30px;
        background: #F44336;
      }
      #box3 {
        position: relative;
        top:20px; left:30px;
        background: #795548;
      }
      #box4 {
        position: fixed;
        bottom:20px; right:30px;
        background: #673AB7;
      }
    </style>
  </head>
  <body>
    <div id="box1">static; top:20px; right:30px;</div>
    <div id="box2">absolute; top:20px; right:30px;</div>
    <div id="box3">relative; top:20px; left:30px;</div>
    <div id="box4">fixed; bottom:20px; right:30px; </div>
  </body>
</html>
```
-->

## 1.1 static (기본위치)

static은 position 프로퍼티의 기본값으로 position 프로퍼티를 지정하지 않았을 때와 같다.

기본적인 요소의 배치 순서에 따라 위에서 아래로, 왼쪽에서 오른쪽으로 순서에 따라 배치되며 부모 요소 내에 자식 요소로서 존재할 때는 <strong>부모 요소의 위치를 기준으로 배치</strong>된다.

기본적으로 이 값을 지정할 일은 없지만 이미 설정된 position을 무력화하기 위해 사용될 수 있다.

좌표 프로퍼티(top, bottom, left, right)를 같이 사용할 수 없으며 사용할 경우에는 무시된다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; }
    .parent {
      width: 150px;
      height: 150px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
    }
    .static-box {
      position: static;
      background: #2E303D;
      color: #e55c3c;
      font-weight: bold;
      text-align: center;
      line-height: 150px;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="static-box">static box</div>
  </div>
</body>
</html>
```

<p data-height="270" data-theme-id="0" data-slug-hash="gwGqLJ" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/gwGqLJ/">position: static - example</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## 1.2 relative (상대위치)

기본 위치(static으로 지정되었을 때의 위치)를 기준으로 좌표 프로퍼티(top, bottom, left, right)를 사용하여 위치를 이동시킨다. static을 선언한 요소와 relative를 선언한 요소의 차이점은 좌표 프로퍼티의 동작 여부뿐이며 그외는 동일하게 동작한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; }
    .parent {
      width: 150px;
      height: 150px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
      margin: 50px;
    }
    .relative-box {
      position: relative;
      top: 50px; left: 50px;
      background: #2E303D;
      color: #e55c3c;
      font-weight: bold;
      text-align: center;
      line-height: 150px;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="relative-box">relative box</div>
  </div>
</body>
</html>
```

<p data-height="350" data-theme-id="0" data-slug-hash="amLXVY" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/amLXVY/">position: relative - example </a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

위 예제를 보면 parent 클래스의 자식인 relative-box 클래스 요소의 width, height가 부모 요소와 동일하다. 이는 상속에 의한 것이 아니라(width, height는 상속되지 않는다.) relative를 적용한 요소는 좌표 프로퍼티가 적용되는 것만 다를 뿐 그 이외는 static을 지정했을 때와 동일하게 동작하기 때문이다. 즉, width는 100%가 적용되어 부모 요소의 width와 동일한 값을 갖게된 것이고, hight는 auto가 적용되지만 line-height: 150px이 적용되어 부모 요소와 hight가 동일하게 된 것이다.

## 1.3 absolute (절대위치)

<strong>부모 요소 또는 가장 가까이 있는 조상 요소(static 제외)를 기준으로 좌표 프로퍼티(top, bottom, left, right)만큼 이동한다. 즉, relative, absolute, fixed 프로퍼티가 선언되어 있는 부모 또는 조상 요소를 기준으로 위치가 결정된다.</strong>

<!-- <strong>부모 또는 조상 요소에 relative 속성이 선언되어 있으면 그 요소를 기준으로 하여 좌표 속성(top, bottom, left, right)만큼 이동한다.</strong> -->

<strong>만일 부모 또는 조상 요소가 static인 경우, document body를 기준으로 하여 좌표 프로퍼티대로 위치하게 된다.</strong>

따라서 부모 요소를 배치의 기준으로 삼기 위해서는 부모 요소에 relative를 정의하여야 한다.

이때 다른 요소가 먼저 위치를 점유하고 있어도 뒤로 밀리지 않고 덮어쓰게 된다. (이런 특성을 부유 또는 부유 객체라 한다)

<strong>absolute 선언 시, block 레벨 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 적절한 width를 지정하여야 한다.</strong>

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; }
    .parent {
      width: 200px;
      height: 200px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
      margin: 50px 0 0 300px;
      position: relative;
    }
    .absolute-box {
      position: absolute;
      height: 200px; width: 200px;
      top: 50px; left: 50px;
      color: #e55c3c;
      font-weight: bold;
      text-align: center;
      background: #2E303D;
      line-height: 200px;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="absolute-box">absolute box (in parent)</div>
  </div>
  <div class="absolute-box">absolute box (no parent)</div></body>
</html>
```

<p data-height="400" data-theme-id="0" data-slug-hash="kkGVEo" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/kkGVEo/">position: absolute - example  </a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

<strong>relative 프로퍼티와 absolute 프로퍼티의 차이점</strong>은 아래와 같다.

relative 프로퍼티는 기본 위치(static으로 지정되었을 때의 위치)를 기준으로 좌표 프로퍼티(top, bottom, left, right)을 사용하여 위치를 이동시킨다. 따라서 <strong>무조건 부모를 기준으로 위치</strong>하게 된다.

absolute 프로퍼티는 부모에 static 이외의 position 프로퍼티가 지정되어 있을 경우에만 부모를 기준으로 위치하게 된다. 만일 부모, 조상이 모두 static 프로퍼티인 경우, document body를 기준으로 위치하게 된다.

따라서 absolute 프로퍼티 요소는 부모 요소의 영역을 벗어나 자유롭게 어디든지 위치할 수 있다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0;}
    .parent {
      width: 150px;
      height: 150px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
      margin: 50px;
      float: left;
      /*position: relative;*/
    }
    .relative-box {
      position: relative;
      top: 10px; left: 10px;
      width: 150px;
      height: 150px;
      background: #2E303D;
      color: #e55c3c;
      font-weight: bold;
      text-align: center;
      line-height: 150px;
    }
    .absolute-box {
      position: absolute;
      top: 10px; left: 10px;
      width: 150px;
      height: 150px;
      background: #2E303D;
      color: #e55c3c;
      font-weight: bold;
      text-align: center;
      line-height: 150px;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="absolute-box">absolute box</div>
  </div>
  <div class="parent">
    <div class="relative-box">relative box</div>
  </div>
</body>
</html>
```

<p data-height="400" data-theme-id="0" data-slug-hash="pewbWo" data-default-tab="result" data-user="ungmo2" data-embed-version="2" data-pen-title="position: absolute vs position: relative" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/pewbWo/">position: absolute vs position: relative</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## 1.4 fixed (고정위치)

부모 요소와 관계없이 브라우저의 viewport를 기준으로 좌표프로퍼티(top, bottom, left, right)을 사용하여 위치를 이동시킨다.

<strong>스크롤이 되더라도 화면에서 사라지지 않고 항상 같은 곳에 위치한다.</strong>

<strong>fixed 프로퍼티 선언 시, block 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 적절한 width를 지정하여야 한다.</strong>

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; }
    .fixed-box {
      position: fixed;
      color: #e55c3c;
      font-weight: bold;
      text-align: center;
      background: #2E303D;
    }
    .sidebar {
      width: 50px;
      height: 100%;
      top: 0;
      right: 0;
      padding-top: 100px;
    }
    .footer {
      width: 200px;
      width: 100%;
      height: 50px;
      bottom: 0;
      left: 0;
      line-height: 50px;
    }
  </style>
</head>
<body>
  <div class="fixed-box sidebar">fixed box (side-bar)</div>
  <div class="fixed-box footer">fixed box (footer)</div>
</body>
</html>
```

<p data-height="400" data-theme-id="0" data-slug-hash="gwGqBb" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/gwGqBb/">position: fixed - example </a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

# 2. z-index 프로퍼티

z-index 프로퍼티에 큰 숫자값을 지정할수록 화면 전면에 출력된다. position 프로퍼티가 static 이외인 요소에만 적용된다.

![z-index](/img/z-index.jpeg)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .normal-box {
      width: 100px; height: 100px;
    }
    .absolute-box {
      width: 100px; height: 100px;
      position: absolute;
    }
    /* z-index는 position 프로퍼티가 static 이외인 요소에만 적용된다. */
    .orange {
      background-color: orange;
      z-index: 1000;
    }
    .red {
      background-color: red;
      left: 50px; top: 50px;
      z-index: 100;
    }
    .green {
      background-color: green;
      left: 100px; top: 100px;
      z-index: 10;
    }
    .blue {
      background-color: blue;
      left: 150px; top: 150px;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div class="normal-box orange"></div>
  <div class="absolute-box red"></div>
  <div class="absolute-box green"></div>
  <div class="absolute-box blue"></div>
</body>
</html>
```

<div class="result"></div>

# 3. overflow 프로퍼티

overflow 프로퍼티는 자식 요소가 부모 요소의 영역를 벗어났을 때 처리 방법을 정의한다.

| 프로퍼티값	     | Description
|:----------|:-----------------
| visible   | 영역을 벗어난 부분을 표시한다. (기본값)
| hidden    | 영역을 벗어난 부분을 잘라내어 보이지 않게 한다.
| scroll    | 영역을 벗어난 부분이 없어도 스크롤 표시한다.(현재 대부분 브라우저는 auto과 동일하게 작동한다)
| auto      | 영역을 벗어난 부분이 있을때만 스크롤 표시한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      width: 150px;
      height: 150px;
      padding: 10px;
      margin: 30px;
      font-size: 1.2em;
      border-radius: 6px;
      border-color: gray;
      border-style: dotted;
      float: left;
    }
    .visible { overflow: visible; }
    .hidden  { overflow: hidden; }
    .scroll  { overflow: scroll; }
    .auto    { overflow: auto; }
  </style>
</head>
<body>
  <h1>overflow</h1>
  <div class="visible"><h3>visible</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="hidden"><h3>hidden</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="scroll"><h3>scroll</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="auto"><h3>auto</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
</body>
</html>
```

<div class="result"></div>

특정 방향으로만 스크롤을 표시하고자 할 때는 overflow-x 또는 overflow-y 프로퍼티를 사용한다.

```css
div { overflow-y: auto; }
```

# Reference

* [W3C CSS Document](https://www.w3.org/TR/CSS/)
