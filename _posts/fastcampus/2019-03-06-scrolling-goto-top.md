---
layout: fs-post
title: <strong>Scrolling goto top</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 6
permalink: /:categories/:title
description:
---

* TOC
{:toc}

# 1. Scrolling goto top

![popup-ui](/assets/fs-images/exercise/scrolling-goto-top.gif)
Scrolling goto top
{:.desc-img}

- [Window.pageYOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset)
- [Window.scrollTo()](https://developer.mozilla.org/ko/docs/Web/API/Window/scrollTo)
- [Window.scroll()](https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>scrolling-goto-top</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);
    @import url(https://use.fontawesome.com/releases/v5.5.0/css/all.css);

    body {
      font-family: 'Open Sans';
      font-weight: 300;
      background-color: #D6E1E5;
    }

    h1 {
      color: #DB5B33;
      font-weight: 300;
      text-align: center;
    }

    .scroll-icon {
      position: fixed;
      left: 50%;
      bottom: 20px;
      font-size: 36px;
      cursor: pointer;
      animation: glow 4s infinite;
      display: none;
    }

    @keyframes glow {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.3;
        transform: translateY(10px);
      }
    }
  </style>
</head>
<body>
  <h1>JavaScript Scrolling goto top</h1>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>

  <div class="scroll-icon fa fa-angle-double-up"></div>

  <script>

  </script>
</body>
</html>
```

<!--
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>scrolling-goto-top</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);
    @import url(https://use.fontawesome.com/releases/v5.5.0/css/all.css);

    body {
      font-family: 'Open Sans';
      font-weight: 300;
      background-color: #D6E1E5;
    }

    h1 {
      color: #DB5B33;
      font-weight: 300;
      text-align: center;
    }

    .scroll-icon {
      position: fixed;
      left: 50%;
      bottom: 20px;
      font-size: 36px;
      cursor: pointer;
      animation: glow 4s infinite;
      display: none;
    }

    @keyframes glow {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.3;
        transform: translateY(10px);
      }
    }
  </style>
</head>
<body>
  <h1>JavaScript Scrolling goto top</h1>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>

  <div class="scroll-icon fa fa-angle-double-up"></div>

  <script>
  (function () {
    const $scrollIcon = document.querySelector('.scroll-icon');
    // 버튼이 활성화될 스크롤 포지션
    const topPosToStartShowing = 100;

    window.onscroll = function () {
      // window의 scroll top
      const scrollPosition = window.pageYOffset || 0;
      // console.log(scrollPosition);

      $scrollIcon.style.display = scrollPosition >= topPosToStartShowing ? 'block' : 'none';
    };

    $scrollIcon.onclick = function () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
  }());
  </script>
</body>
</html>
-->

# 2. Angular version

- [@HostListener](https://poiemaweb.com/fastcampus-angular/angular-directive#32-이벤트-처리)

<!-- <iframe src="https://stackblitz.com/edit/angular-scrolling-goto-top-directive?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="700"></iframe> -->

