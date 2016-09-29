---
layout: post
title: CSS3 Position
categories: css
---

* TOC
{:toc}

# 1. position 속성

position 속성은 요소의 위치를 정의한다. top, bottom, left, right 속성과 함께 사용하여 위치를 지정한다.

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

static은 position 속성의 기본값으로 position 속성을 지정하지 않았을 때와 같다.

기본적인 요소의 배치 순서에 따라 위에서 아래로, 왼쪽에서 오른쪽으로 순서에 따라 배치되며 부모 요소 내에 자식 요소로서 존재할 때는 부모 요소의 위치를 기준으로 배치된다.

기본적으로 이 속성값을 지정할 일은 없지만 이미 설정된 position을 무력화하기 위해 사용될 수 있다.

좌표속성(top, bottom, left, right)을 같이 사용할 수 없다. 좌표속성을 사용할 경우 무시된다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0;}
    div {
      color: #fff;
      text-align: center;
      height: 150px; width: 150px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
    }
    .static-box {
      position: static;
      background: #2db34a;
      line-height: 150px;
    }
  </style>
</head>
<body>
  <div>
    <div class="static-box">static box</div>
  </div>
</body>
</html>
```

## 1.2 relative (상대위치)

기본 위치(static으로 지정되었을 때의 위치)를 기준으로 좌표 속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0;}
    div {
      color: #fff;
      text-align: center;
      line-height: 150px;
      height: 150px; width: 150px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
    }
    .relative-box {
      position: relative;
      top: 50px; left: 50px;
      background: #2db34a;
    }
  </style>
</head>
<body>
  <div>
    <div class="relative-box">relative box</div>
  </div>
</body>
</html>
```

## 1.3 absolute (절대위치)

***부모 또는 조상 요소에 relative 속성이 선언되어 있으면 그 요소를 기준으로 하여 좌표 속성(top, bottom, left, right)만큼 이동한다.***

***relative 속성이 선언되어 있는 부모 또는 조상 요소가 없다면 부모 요소와 관계없이 document body를 기준으로 하여 좌표 속성대로 위치하게 된다.***

따라서 부모 요소를 배치의 기준으로 삼기 위해서는 부모 요소에 relative 속성을 정의하여야 한다.

이때 다른 요소가 먼저 위치를 점유하고 있어도 뒤로 밀리지 않고 덮어쓰게 된다. (이런 특성을 부유 또는 부유 객체라 한다)

***absolute 속성 선언 시, block 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 주의하여야 한다.***

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0;}
    div {
      color: #fff;
      text-align: center;
      line-height: 200px;
      height: 300px; width: 300px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
      position: relative;
      top: 200px; left: 200px;
    }
    .absolute-box {
      background: #2db34a;
      height: 200px; width: 200px;
      position: absolute;
      top: 50px; left: 50px;
    }
  </style>
</head>
<body>
  <div>
    <div class="absolute-box">absolute box1</div>
  </div>
  <div class="absolute-box">absolute box2</div>
</body>
</html>
```

## 1.4 fixed (고정위치)

부모 요소와 관계없이 브라우저의 viewport를 기준으로 좌표속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다.

스크롤이 되더라도 화면에서 사라지지 않고 항상 같은 곳에 위치한다.

***fixed 속성 선언 시, block 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 주의하여야 한다.***

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0;}
    div {
      color: #fff;
      text-align: center;
      line-height: 150px;
      height: 150px; width: 150px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
    }
    .fixed-box1 {
      position: fixed;
      background: #2db34a;
      bottom: 0; left: 0;
    }
    .fixed-box2 {
      position: fixed;
      background: #2db34a;
      top: 0; right: 0;
    }
  </style>
</head>
<body>
  <div>
    <div class="fixed-box1">fixed box1</div>
  </div>
  <div class="fixed-box2">fixed box2</div>
</body>
</html>
```

# 2. z-index 속성

z-index 속성에 큰 숫자값을 지정할수록 화면 전면에 출력된다.

![z-index](/img/z-index.jpeg)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .box {
      width: 100px; height: 100px;
      position: absolute;
    }
    .red {
      background-color: red;
      left: 10px; top: 10px;
      z-index: 100;
    }
    .green {
      background-color: green;
      left: 50px; top: 50px;
      z-index: 10;
    }
    .blue {
      background-color: blue;
      left: 90px; top: 90px;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div class="box red"></div>
  <div class="box green"></div>
  <div class="box blue"></div>
</body>
</html>
```

# 3. overflow 속성

overflow 속성은 자식 요소가 부모 요소의 영역를 벗어났을 때 처리 방법을 정의한다.

| 속성값	     | Description
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

특정 방향으로만 스크롤을 표시하고자 할 때는 overflow-x 또는 overflow-y 속성을 사용한다.

```css
div { overflow-y: auto; }
```

# Reference

* [W3C CSS Document](https://www.w3.org/TR/CSS/)
