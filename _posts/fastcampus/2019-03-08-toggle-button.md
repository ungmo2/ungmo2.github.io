---
layout: fs-post
title: <strong>Toggle button</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 8
permalink: /:categories/:title
description:
---

* TOC
{:toc}

![](/assets/fs-images/exercise/toggle-button.gif)

counter
{: .desc-img}

요구 사항
: 1. Light/Dark 상태(true: Light / false: Dark)를 서버로부터 가져온다고 가정한다. 즉, 서버로부터 가져온 상태로 버튼의 상태를 초기화해야 한다.
2. Light Mode : body { background-color: '#fff'; }, .toggle-button-text { background-color: #3dbf87; },
3. Dark Mode : body { background-color: '#232323'; }, .toggle-button-text { background-color: #fc3164; }


```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Light / Dark Mode - Toggle button</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" rel="stylesheet">
  <style>
    body {
      font-family: 'Open Sans';
      font-weight: 300;
    }

    .title {
      color: #db5b33;
      font-weight: 300;
      text-align: center;
    }

    .toggle-button {
      position: relative;
      width: 100px;
      height: 50px;
      margin: 0 auto;
    }

    /* 토글 버튼 내부의 원 */
    .toggle-button .toggle-button-switch {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 46px;
      height: 46px;
      background-color: #fff;
      border-radius: 100%;
      cursor: pointer;
      z-index: 100;
      transition: transform 0.3s;
    }

    /* 토글 버튼의 바탕 */
    .toggle-button .toggle-button-text {
      overflow: hidden;
      background-color: #3dbf87;
      border-radius: 25px;
      box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
      transition: background-color 0.3s;
    }

    /* 토글 버튼의 텍스트 */
    .toggle-button .toggle-button-text-on,
    .toggle-button .toggle-button-text-off {
      float: left;
      width: 50%;
      height: 100%;
      line-height: 50px;
      font-family: Lato, sans-serif;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1 class="title">Light / Dark Mode - Toggle Button</h1>

  <div class="toggle-button">
    <div class="toggle-button-switch"></div>
    <div class="toggle-button-text">
      <div class="toggle-button-text-on"><i class="far fa-sun fa-lg"></i></div>
      <div class="toggle-button-text-off"><i class="far fa-moon fa-lg"></i></div>
    </div>
  </div>

  <script>
  </script>
</body>
</html>
```
<!--
    const $toggleButtonSwitch = document.querySelector('.toggle-button-switch');

    const toggleButton = (function () {
      // from server...
      let toggleState = true; // true: Light / false: Dark
      // let toggleState = false;

      const $toggleButtonText = document.querySelector('.toggle-button-text');

      const changeMode = function () {
        if (toggleState) {
          // Dark => Light
          document.body.style.backgroundColor = '#fff';
          $toggleButtonSwitch.style.transform = 'translate3D(0, 0, 0)';
          $toggleButtonText.style.backgroundColor = '#3dbf87';
        } else {
          // Light => Dark
          document.body.style.backgroundColor = '#232323';
          $toggleButtonSwitch.style.transform = 'translate3D(50px, 0, 0)';
          $toggleButtonText.style.backgroundColor = '#fc3164';
        }
      };

      return {
        init() {
          changeMode();
        },
        toggle() {
          toggleState = !toggleState;
          changeMode();
        }
      };
    }());

    window.onload = toggleButton.init;
    $toggleButtonSwitch.onclick = toggleButton.toggle;
 -->

# 2. Angular version

<!--
<iframe src="https://stackblitz.com/edit/angular-toggle-button?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="500"></iframe> -->
