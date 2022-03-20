---
layout: post
title: <strong>Accordion</strong>
categories: ex-ui-component
section: ex-ui-component
seq: 9
permalink: /:categories/:title
description:
---

* TOC
{:toc}

Accordion UI(Collapse UI)는 컨텐츠의 일부 영역만을 노출시키고 다른 영역은 감추는 기능을 말한다. 구현할 아코디언 UI의 이미지는 아래와 같다.

![accordion-ui](/assets/fs-images/exercise/accordion.gif)
{: .w-350}
아코디언
{:.desc-img}

먼저 하나의 DOM 요소에 노출과 감춤을 반복하는 collapse 기능을 구현해 보자.

# 1. collapse 기능

요구 사항은 아래와 같다.

1. 서브 메뉴의 높이는 가변적이다. 따라서 자바스크립트에서 서브 메뉴의 높이를 측정해야 한다.
2. CSS transition을 이용하여 슬라이드 효과를 구현한다.
3. CSS transition은 적절한 타이밍을 유지해야 한다. 다시 말해, 열고 닫히는 타이밍이 같아야 한다.

위 요구 사항을 충족하기 위해 아래와 같은 방법으로 가설을 세우고 구현해보자.

1. 세로 방향으로 슬라이드 효과를 구현하기 위해 대상 요소에 `height: 0`을 지정하여 감춘다.
2. 감춤 상태에서 버튼을 클릭하면 대상 요소에 `height: auto`를 지정하여 노출시킨다.
3. 노출 상태에서 버튼을 클릭하면 대상 요소에 `height: 0`을 지정하여 감춘다.
4. 애니메이션 효과를 위해 transition에 height를 등록한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Collapse</title>
    <style>
      *,
      *:before,
      *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        height: 100%;
      }
      body {
        background-image: linear-gradient(20deg, #08aeea 0%, #2af598 100%);
      }
      .collapse {
        height: 0;
        overflow: hidden;
        /* height: 0을 지정하였으나 height는 20px(padding-top + padding-bottom)이 된다. */
        padding: 10px;
        margin: 10px;
        border-radius: 6px;
        background: #fff;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        /* height: 0 -> height: auto;는 transition이 동작하지 않는다. */
        transition: height 0.4s ease;
      }
      .active {
        /* height: 0 -> height: auto;는 transition이 동작하지 않는다. */
        height: auto;
      }
    </style>
  </head>
  <body>
    <button class="toggle">slide toggle</button>
    <div class="collapse">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error sequi labore nesciunt, molestiae
      veritatis quas tenetur quam pariatur delectus corporis itaque perferendis facere cum ab odit id sint,
      aliquid modi?
    </div>
    <script>
      const $btnToggle = document.querySelector('.toggle');
      const $collapse = document.querySelector('.collapse');

      $btnToggle.onclick = () => $collapse.classList.toggle('active');
    </script>
  </body>
</html>
```

<div class="result" style="height: 200px"></div>

위와 같은 구현 방법을 사용하면 아래와 같은 2가지의 문제가 발생하는 것을 알 수 있다.

첫 번째, .collapse 요소에 `height: 0`, `box-sizing: border-box`, `overflow: hidden`을 지정했음에도 불구하고 padding이 유지되어 height는 20px(padding-top + padding-bottom)이 된다.

[box-sizing: border-box](./css3-box-model#4-box-sizing-프로퍼티)를 지정한 상태에서 `height: 0`을 지정하면 요소의 border, padding, content 영역의 height가 모두 0이 될 것으로 예상하기 쉽지만 그렇지 않다. `box-sizing: border-box`은 **border와 padding을 유지한 상태에서 content 영역의 widhth/height를 계산**한다. 따라서 height는 padding 20px(padding-top + padding-bottom)이 유지된 상태에서 계산되어 height는 20px이 된다.

![height-0](/img/height-0.png)
{: .w-250}
box-sizing: border-box은 border와 padding을 유지한 상태에서 content 영역의 widhth/height를 계산한다.
{:.desc-img}

이 문제를 회피하기 위해 .collapse 요소를 감싸는 컨테이너 요소가 필요하다. 컨테이너 요소에 `padding: 0`, `height: 0`을 지정하고 `overflow: hidden`를 지정하면 자식 요소를 감출 수 있다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Collapse</title>
    <style>
      *,
      *:before,
      *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        height: 100%;
      }
      body {
        background-image: linear-gradient(20deg, #08aeea 0%, #2af598 100%);
      }
      /* padding에 의해 height가 0이 되지 않는 문제를 해결하기 위한 컨테이너 */
      .collapse-container {
        height: 0;
        overflow: hidden;
        transition: height 0.4s ease;
      }
      .collapse {
        padding: 10px;
        margin: 10px;
        border-radius: 6px;
        background: #fff;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }
      .active {
        /* height: 0 -> height: auto;는 transition이 동작하지 않는다. */
        height: auto;
      }
    </style>
  </head>
  <body>
    <button class="toggle">slide toggle</button>
    <div class="collapse-container">
      <div class="collapse">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error sequi labore nesciunt, molestiae
        veritatis quas tenetur quam pariatur delectus corporis itaque perferendis facere cum ab odit id sint,
        aliquid modi?
      </div>
    </div>
    <script>
      const $btnToggle = document.querySelector('.toggle');
      const $collapseContainer = document.querySelector('.collapse-container');

      $btnToggle.onclick = () => $collapseContainer.classList.toggle('active');
    </script>
  </body>
</html>
```

<div class="result" style="height: 200px"></div>

두 번째, transition이 동작하지 않는다. 이것은 `height: 0`에서 `height: auto`로 변화할 때 transition이 동작하지 않기 때문이다. 이 문제를 회피하기 위해 자바스크립트를 사용하여 height에 auto가 아닌 명확한 수치를 지정할 필요가 있다. max-height에 임의의 높이(1000px)를 지정하는 방법도 있지만 이 방법을 사용하면 애니메이션 타이밍이 망가진다.

문제 발생 원인과 대응 방법을 알았으니 다시 구현해보자.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Collapse</title>
    <style>
      *,
      *:before,
      *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        height: 100%;
      }
      body {
        background-image: linear-gradient(20deg, #08aeea 0%, #2af598 100%);
      }
      /* padding에 의해 height가 0이 되지 않는 문제를 해결하기 위한 컨테이너 */
      .collapse-container {
        height: 0;
        overflow: hidden;
        transition: height 0.4s ease;
      }
      .collapse {
        padding: 10px;
        margin: 10px;
        border-radius: 6px;
        background: #fff;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }
      .active {
        /* height: 0 -> height: auto;는 transition이 동작하지 않는다. */
        /* height: auto; */
      }
    </style>
  </head>
  <body>
    <button class="toggle">slide toggle</button>
    <div class="collapse-container">
      <div class="collapse">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error sequi labore nesciunt, molestiae
        veritatis quas tenetur quam pariatur delectus corporis itaque perferendis facere cum ab odit id sint,
        aliquid modi?
      </div>
    </div>
    <script>
      const $btnToggle = document.querySelector('.toggle');
      const $collapseContainer = document.querySelector('.collapse-container');

      let active = false;

      $btnToggle.onclick = () => {
        // $collapseContainer.classList.toggle('active');
        active = !active;

        /**
         * height: 0에서 height: auto로 변화할 때 transition이 동작하지 않는다.
         * 이 문제를 회피하기 위해 자바스크립트를 사용하여 height에 auto가 아닌 명확한 수치를 지정할 필요가 있다.
         * max-height에 임의의 높이를 지정하는 방법도 있지만 이 방법을 사용하면 애니메이션 타이밍이 망가진다.
         *
         * scrollHeight: https://stackoverflow.com/questions/22675126/what-is-offsetheight-clientheight-scrollheight
         * scrollHeight: ENTIRE content + padding (visible or not)
         *               Height of all content + paddings, despite of height of the element.
         * clientHeight: VISIBLE content & padding
         *               Only visible height: content portion limited by explicitly defined height of the element.
         * offsetHeight: VISIBLE content & padding + border + scrollbar
         */
        $collapseContainer.style.height = active ? `${$collapseContainer.scrollHeight}px` : '0';
      };
    </script>
  </body>
</html>
```

<div class="result" style="height: 200px"></div>

# 2. Accordion UI

transition을 사용해 HTML 요소를 어떻게 감추고 노출하면 되는지 아이디어를 얻었으므로 이제 Accordion UI를 구현해보자.

요구 사항은 아래와 같다.

1. Accordion의 메뉴는 정적이다. 즉, Accordion 메뉴의 갯수는 늘어나거나 줄지 않는다.
2. 서브 메뉴의 높이는 가변적이다. 따라서 자바스크립트에서 서브 메뉴의 높이를 측정해야 한다.
3. HTML에 active 클래스가 부여되어 있는 .menu-container 요소는 초기 렌더링 시에 오픈되어야 한다. 이때 transition되는 것이 보이지 않도록 한다.
4. CSS transition을 이용하여 슬라이드 효과를 구현한다. CSS transition은 적절한 타이밍을 유지해야 한다. 다시 말해, 열고 닫히는 타이밍이 같아야 한다.

뷰의 기본 템플릿은 다음과 같다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Accordion</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet" />
    <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
    <style>
      *,
      *:before,
      *:after {
        box-sizing: border-box;
      }
      .title {
        color: #db5b33;
        font-weight: 300;
        text-align: center;
      }
      body {
        font-family: 'Open Sans';
        font-weight: 300;
        background-color: #d6e1e5;
      }
      .accordion {
        max-width: 360px;
        margin: 20px auto;
        background: #fff;
        box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14),
          0 5px 24px 4px rgba(0, 0, 0, 0.12);
        border-radius: 5px;
        opacity: 0;
      }
      .accordion > .menu-container > .menu {
        position: relative;
        padding: 15px 15px 15px 45px;
        color: #4d4d4d;
        font-weight: bold;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        transition: all 0.4s ease;
      }
      .accordion > .menu-container:last-child > .menu {
        border-bottom: 0;
      }
      .accordion > .menu-container > .menu > i {
        position: absolute;
        top: 1.2rem;
        left: 1rem;
        color: #595959;
        transition: all 0.4s ease;
        /* https://developer.mozilla.org/ko/docs/Web/CSS/pointer-events
          pointer-events에 none을 지정하면 해당 요소에서 클릭, 드래그, 호버와 같은 포인터 이벤트가 발생하지 않는다. */
        pointer-events: none;
      }
      .accordion > .menu-container.active > .menu > i {
        transform: rotate(180deg);
      }
      .accordion > .menu-container.active > .menu,
      .accordion > .menu-container.active > .menu > i {
        color: #b63b4d;
      }
      /* Show submenu */
      .accordion > .menu-container.active > .submenu {
        /*
        height: 0 -> height: auto;는 transition이 동작하지 않는다.
        max-height: 임의의 높이;를 지정하면 transition은 동작하지만 타이밍이 망가진다.
        max-height: 1000px;과 max-height: 132px;을 비교해 보라!
        height를 1000px으로 transition할 시간에 실제로는 132px만큼 transition하므로 여는 시간이 닫는 시간보다 빠르다.
        */
        /* max-height: 1000px; */
        /* max-height: 132px; */
      }
      .accordion > .menu-container > .submenu {
        height: 0;
        overflow: hidden;
        background: #444359;
        font-size: 14px;
        transition: height 0.4s ease;
      }
      .accordion > .menu-container > .submenu > div {
        /* 서브 메뉴의 높이는 가변적이다. 따라서 자바스크립트에서 서브 메뉴의 높이를 측정해야 한다. */
        height: 44px;
        border-bottom: 1px solid #4b4a5e;
      }
      .accordion > .menu-container:last-child > .submenu {
        border-radius: 0 0 4px 4px;
      }
      .accordion > .menu-container:last-child > .submenu > div:last-child {
        border-bottom: 0;
      }
      .accordion > .menu-container > .submenu > div > a {
        display: block;
        text-decoration: none;
        color: #d9d9d9;
        padding: 12px;
        padding-left: 48px;
        transition: all 0.25s ease-in-out;
      }
      .accordion > .menu-container > .submenu > div > a:hover {
        background: #b63b4d;
        color: #fff;
      }
    </style>
    <script defer src="app.js"></script>
  </head>
  <body>
    <h1 class="title">Accordion</h1>
    <div class="accordion">
      <div class="menu-container active">
        <div class="menu"><i class="bx bxs-chevron-down"></i>Front-end</div>
        <div class="submenu">
          <div><a href="#">HTML</a></div>
          <div><a href="#">CSS</a></div>
          <div><a href="#">Javascript</a></div>
        </div>
      </div>
      <div class="menu-container">
        <div class="menu"><i class="bx bxs-chevron-down"></i>Responsive web</div>
        <div class="submenu">
          <div><a href="#">Tablets</a></div>
          <div><a href="#">Mobiles</a></div>
          <div><a href="#">Desktop</a></div>
        </div>
      </div>
      <div class="menu-container">
        <div class="menu"><i class="bx bxs-chevron-down"></i>Web Browser</div>
        <div class="submenu">
          <div><a href="#">Chrome</a></div>
          <div><a href="#">Firefox</a></div>
          <div><a href="#">Safari</a></div>
        </div>
      </div>
    </div>
  </body>
</html>
```

<div class="result" style="height: 400px"></div>
