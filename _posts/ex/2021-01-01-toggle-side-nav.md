---
layout: post
title: <strong>Toggle side nav</strong>
categories: ex-ui-component
section: ex-ui-component
seq: 1
permalink: /:categories/:title
description:
---

* TOC
{:toc}

![](/assets/fs-images/exercise/toggle-side-nav.gif)

Toggle side nav
{: .desc-img}

요구 사항
{: .title}
- 페이지 상단 토글 버튼(i.toggle)이 클릭되면 사이드 내비게이션이 토글(오픈/클로즈)되도록 구현한다.
- 사이드 내비게이션이 포함된 페이지가 애플리케이션 내에 여러 개 존재한다고 가정하고 reload, 페이지 이동 시에도 이전에 적용된 사이드 내비게이션 상태가 동일하게 적용되도록 구현한다.
- 사이드 네비게이션이 오픈된 상태에서 리로드하면 사이드 네비게이션이 다시 트랜지션하지 않고 오픈된 상태 그대로 렌더링되어야 한다.
- 아이콘은 [Boxicons](https://boxicons.com)을 사용한다.

뷰의 기본 템플릿은 다음과 같다.

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

      /* 트랜지션 취소 */
      .notransition {
        transition: none !important;
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error,
              dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga
              sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt
              error, dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus
              fuga sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore
              sunt error, dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed
              temporibus fuga sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit
              labore sunt error, dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed
              temporibus fuga sint!
            </p>
          </article>
          <article>
            <h2>Lorem ipsum</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error,
              dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga
              sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt
              error, dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus
              fuga sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore
              sunt error, dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed
              temporibus fuga sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit
              labore sunt error, dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed
              temporibus fuga sint!
            </p>
          </article>
          <article>
            <h2>Lorem ipsum</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt error,
              dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus fuga
              sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore sunt
              error, dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed temporibus
              fuga sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit labore
              sunt error, dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed
              temporibus fuga sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eos fugit
              labore sunt error, dolores ullam, sit, quis atque molestiae? Atque rem facere perspiciatis cupiditate sed
              temporibus fuga sint!
            </p>
          </article>
        </section>
      </main>
    </div>
  </body>
</html>
```
