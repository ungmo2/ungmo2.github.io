---
layout: fs-post
title: <strong>Toggle side nav</strong>
categories: fastcampus-ui-component
section: fastcampus-ui-component
seq: 5
permalink: /:categories/:title
description:
---

* TOC
{:toc}

![](/assets/fs-images/exercise/toggle-side-nav.gif)

Toggle side nav
{: .desc-img}

요구 사항
: 자바스크립트를 사용하여 버튼이 클릭되었을 때 사이드 내비게이션이 토글되도록 구현한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Toggle side nav</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400" rel="stylesheet" />
    <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
    <style>
      html,
      body {
        font-family: 'Open Sans';
        font-weight: 300;
        height: 100%;
        margin: 0;
      }
      .container {
        position: relative;
        overflow-x: hidden; /* 가로 scroll bar 방지 */
        width: 100%;
        height: 100%;
      }
      nav,
      main {
        position: absolute;
        height: 100%;
        transition: transform 0.5s;
      }
      nav {
        left: -300px;
        width: 300px;
        background: #20232a;
      }
      main {
        height: 100%;
        padding: 20px;
      }
      .toggle {
        font-size: 2em;
        color: maroon;
        cursor: pointer;
        transition: transform 0.5s;
      }

      /* nav 요소 활성화 */
      nav.active,
      nav.active ~ main {
        transform: translate3d(300px, 0, 0);
      }
      nav.active ~ main > .toggle {
        transform: rotate(180deg);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <nav></nav>
      <main>
        <i class="toggle bx bx-right-arrow-circle"></i>
        <h1>Toggle side nav</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <section>
          <article>
            <h2>Lorem ipsum</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores
              ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga sint! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores ullam, sit, quis
              atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga sint! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores ullam, sit, quis atque
              molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga sint! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores ullam, sit, quis atque molestiae? Atque rem
              facere perspiciatis cupiditate sed temporibus fuga sint!
            </p>
          </article>
          <article>
            <h2>Lorem ipsum</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores
              ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga sint! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores ullam, sit, quis
              atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga sint! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores ullam, sit, quis atque
              molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga sint! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores ullam, sit, quis atque molestiae? Atque rem
              facere perspiciatis cupiditate sed temporibus fuga sint!
            </p>
          </article>
          <article>
            <h2>Lorem ipsum</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores
              ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga sint! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores ullam, sit, quis
              atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga sint! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores ullam, sit, quis atque
              molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga sint! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Distinctio cumque eos fugit labore sunt error, dolores ullam, sit, quis atque molestiae? Atque rem
              facere perspiciatis cupiditate sed temporibus fuga sint!
            </p>
          </article>
        </section>
      </main>
    </div>
  </body>
</html>
```
