---
layout: post
title: <strong>Scrolling goto top</strong>
categories: ex-ui-component
section: ex-ui-component
seq: 2
permalink: /:categories/:title
description:
---

![scrolling-goto-top](/assets/fs-images/exercise/scrolling-goto-top.gif)
{: .w-450}

Scrolling goto top
{:.desc-img}

# 1. 요구 사항
  - 아래를 참조하여 일정 거리(예를 들어, 100px)만큼 스크롤되면 버튼(.scroll-icon)을 활성화하고 그 버튼이 클릭되면 맨 위로 스크롤되도록 구현한다.
    - [Window.pageYOffset](https://developer.mozilla.org/ko/docs/Web/API/Window/pageYOffset)
    - [Window.scrollTo()](https://developer.mozilla.org/ko/docs/Web/API/Window/scrollTo)
    - [Window.scroll()](https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll)

  - scroll 이벤트는 짧은 시간 간격으로 연속해서 발생한다. 이벤트 핸들러가 과도하게 호출되지 않도록 한다.
    - <41장 3.디바운스와 스로틀> 참고
    <!-- - [디바운스와 스로틀](/fastcampus/timer#3-디바운스와-스로틀) -->

# 2. 기본 템플릿

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Scrolling goto top</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet" />
    <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
    <style>
      body {
        font-family: 'Open Sans';
        font-weight: 300;
        background-color: #d6e1e5;
      }
      .title {
        color: #db5b33;
        font-weight: 300;
        text-align: center;
      }
      .container {
        min-height: 2000px;
      }
      .scroll-icon {
        position: fixed;
        left: 50%;
        bottom: 20px;
        transform: translate3D(-50%, 0, 0);
        font-size: 48px;
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
          transform: translate3D(-50%, 10px, 0);
        }
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js"></script>
    <script defer src="app.js"></script>
  </head>
  <body>
    <h1 class="title">Scrolling goto top</h1>
    <div class="container">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa
        repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
      </p>
    </div>
    <div class="scroll-icon bx bxs-chevrons-up"></div>
  </body>
</html>
```

<!-- # 2. Angular version

- [@HostListener](https://poiemaweb.com/fastcampus-angular/angular-directive#32-이벤트-처리) -->

<!-- <iframe src="https://stackblitz.com/edit/angular-scrolling-goto-top-directive?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="700"></iframe> -->
