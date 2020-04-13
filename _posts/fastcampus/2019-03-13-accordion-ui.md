---
layout: fs-post
title: <strong>Accordion UI</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 13
permalink: /:categories/:title
description:
---

* TOC
{:toc}

Accordion UI(Collapse UI)는 컨텐츠의 일부 영역만을 노출시키고 다른 영역은 감추는 기능을 말한다. 구현할 아코디언 UI의 이미지는 아래와 같다.

![accordion-ui](/img/accordion-ui.gif)
아코디언 UI
{:.desc-img}

먼저 하나의 DOM 요소에 노출과 감춤을 반복하는 collapse 기능을 구현해 보자.

# 1. collapse 기능

이 기능에 대한 요구 사항은 아래와 같다.

1. 대상 요소의 height는 알 수 없다. 하지만 어떤 height라도 동작해야 한다.
2. CSS animation/transition를 이용하여 슬라이드 효과를 구현한다.
3. CSS animation/transition은 적절한 타이밍을 유지해야 한다. 다시 말해 열고 닫히는 타이밍이 같아야 한다.
4. 라이브러리를 사용하지 않고 Vanilla javascript로 구현한다.

위 요구 사항을 충족하기 위해 아래와 같은 방법으로 가설을 세우고 구현해보자.

1. 세로 방향으로 슬라이드 효과를 구현하기 위해 대상 요소에 `height: 0`을 지정하여 감춘다.
2. 감춤 상태에서 버튼을 클릭하면 대상 요소에 `height: auto`를 지정하여 노출시킨다.
3. 노출 상태에서 버튼을 클릭하면 대상 요소에 `height: 0`을 지정하여 감춘다.
4. 애니메이션 효과를 위해 transition에 height를 등록한다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Collapse</title>
  <style>
    *, *:before, *:after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
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
  <div class='collapse'>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error sequi labore nesciunt, molestiae veritatis quas tenetur quam pariatur delectus corporis itaque perferendis facere cum ab odit id sint, aliquid modi?
  </div>
  <script>
    const $btnToggle = document.querySelector('.toggle');
    const $collapse = document.querySelector('.collapse');

    $btnToggle.addEventListener('click', () => $collapse.classList.toggle('active'));
  </script>
</body>
</html>
```

<div class="result" style="height: 200px"></div>

위와 같은 구현 방법으로는 아래와 같은 2가지의 문제가 발생하는 것을 알 수 있다.

첫번째, 대상 요소에 `height: 0`, `box-sizing: border-box`, `overflow: hidden`을 지정했음에도 불구하고 padding이 유지되어 height는 20px(padding-top + padding-bottom)이 된다.

[box-sizing: border-box](./css3-box-model#4-box-sizing-프로퍼티)를 지정한 상태에서 `height: 0`을 지정하면 요소의 border, padding, content 영역의 height가 모두 0이 될 것으로 예상하기 쉽지만 그렇지 않다. `box-sizing: border-box`은 **border와 padding을 유지한 상태에서 content 영역의 widhth/height를 계산**한다. 다시말해 height는 padding 20px(padding-top + padding-bottom)이 유지된 상태에서 계산되어 -20px이 되지만 height는 음수가 될 수 없으므로 0px로 계산된다.

![height-0](/img/height-0.png)
{: .w-250}
box-sizing: border-box은 border와 padding을 유지한 상태에서 content 영역의 widhth/height를 계산한다.
{:.desc-img}

이 문제를 회피하기 위해 대상 요소를 감싸는 컨테이너 요소가 필요하다. 컨테이너 요소에 `padding: 0`, `height: 0`을 지정하고 `overflow: hidden`를 지정하면 자식 요소를 감출 수 있다.

두번째, transition이 동작하지 않는다. 이것은 `height: 0`에서 `height: auto`로의 변화는 transition이 동작하지 않기 때문이다. 이 문제를 회피하기 위해 자바스크립트를 사용하여 height에 명확한 수치를 지정할 필요가 있다. max-height에 임의의 높이(1000px)를 지정하는 방법도 있지만 이 방법을 사용하면 애니메이션 타이밍이 망가진다.

문제 발생 원인과 대응 방법을 알았으니 다시 구현해보자.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Collapse</title>
  <style>
    *, *:before, *:after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      height: 100%;
    }

    body {
      background-image: linear-gradient(20deg, #08aeea 0%, #2af598 100%);
    }

    /* padding에 의해 height가 0이 되지 않는 문제를 해결하기 위한 컨테이너 */
    .collapse {
      height: 0;
      overflow: hidden;
      transition: height 0.4s ease;
    }

    .collapse-body {
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
  <!-- padding에 의해 height가 0이 되지 않는 문제를 해결하기 위한 컨테이너 -->
  <div class='collapse'>
    <div class="collapse-body">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error sequi labore nesciunt, molestiae veritatis quas tenetur quam pariatur delectus corporis itaque perferendis facere cum ab odit id sint, aliquid modi?
    </div>
  </div>
  <script>
    const $btnToggle = document.querySelector('.toggle');
    const $collapse = document.querySelector('.collapse');

    $btnToggle.addEventListener('click', () => {
      $collapse.classList.toggle('active');
      /**
       * `height: 0`에서 `height: auto`로의 변화는 transition이 동작하지 않는다.
       * 이 문제를 회피하기 위해 자바스크립트를 사용하여 height에 명확한 수치를 지정할 필요가 있다.
       * max-height에 임의의 높이를 지정하는 방법도 있지만 이 방법을 사용하면 애니메이션 타이밍이 망가진다.
       */
       // scrollHeight: https://stackoverflow.com/questions/22675126/what-is-offsetheight-clientheight-scrollheight
      $collapse.style.height = $collapse.classList.contains('active') ? $collapse.scrollHeight + 'px' : '0';
    });
  </script>
</body>
</html>
```

<div class="result" style="height: 200px"></div>

# 2. Accordion UI

요소를 어떻게 애니메이션과 함께 감추고 노출하면되는지 아이디어를 얻었으므로 이제 Accordion UI를 구현해보자.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Accordion Menu</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet">

  <style>
    *, *:before, *:after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      height: 100%;
    }

    body {
      background-image: linear-gradient(20deg, #08aeea 0%, #2af598 100%);
      font-family: 'Open Sans', Arial, Helvetica, Sans-serif, Verdana, Tahoma;
    }

    ul {
      list-style-type: none;
    }

    h1 {
      color: #fff;
      font-size: 2.5rem;
      text-align: center;
      padding: 50px 0;
    }

    .accordion {
      width: 100%;
      max-width: 360px;
      margin: auto;
      background: #fff;
      border-radius: 4px;
    }

    .accordion .menu {
      position: relative;
      padding: 15px 15px 15px 45px;
      color: #4d4d4d;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      transition: all 0.4s ease;
    }

    .accordion li:last-child .menu {
      border-bottom: 0;
    }

    .accordion li i {
      position: absolute;
      top: 1.2rem;
      left: 1rem;
      color: #595959;
      transition: all 0.4s ease;
    }

    .accordion li i.fa-chevron-down {
      right: 1rem;
      left: auto;
    }

    .accordion li.active i.fa-chevron-down {
      transform: rotate(180deg);
    }

    .accordion li.active .menu {
      color: #b63b4d;
    }

    .accordion li.active i {
      color: #b63b4d;
    }

    /* Show submenu */
    .accordion li.active .submenu {
      /*
        height: 0 -> height: auto;는 transition이 동작하지 않는다.
        max-height: 임의의 높이;를 지정하면 transition이 동작하지만 타이밍이 망가진다.
        max-height: 1000px;과 max-height: 133px;을 비교해 보라!
        height를 1000px으로 transition할 시간에 실제로는 133px정도만 transition하므로 여는 시간이 닫는 시간보다 빠르다.
      */
      /* max-height: 1000px; */
      /* max-height: 133px; */
    }

    .submenu {
      height: 0;
      overflow: hidden;
      background: #444359;
      font-size: 14px;
      transition: height 0.4s ease;
    }

    .submenu li {
      border-bottom: 1px solid #4b4a5e;
    }

    .accordion li:last-child .submenu {
      border-radius: 0 0 4px 4px;
    }

    .accordion li:last-child .submenu li:last-child {
      border-bottom: 0;
    }

    .submenu a {
      display: block;
      text-decoration: none;
      color: #d9d9d9;
      padding: 12px;
      padding-left: 42px;
      transition: all 0.25s ease-in-out;
    }

    .submenu a:hover {
      background: #b63b4d;
      color: #fff;
    }
  </style>
</head>

<body>
  <h1>Accordion Menu</h1>

  <ul id="accordion" class="accordion">
    <li class="active">
    <!-- <li> -->
      <div class="menu"><i class="fa fa-code"></i>Front-end<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">HTML</a></li>
        <li><a href="#">CSS</a></li>
        <li><a href="#">Javascript</a></li>
      </ul>
    </li>
    <li>
      <div class="menu"><i class="fa fa-mobile"></i>Responsive web<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">Tablets</a></li>
        <li><a href="#">Mobiles</a></li>
        <li><a href="#">Desktop</a></li>
      </ul>
    </li>
    <li>
      <div class="menu"><i class="fa fa-globe"></i>Web Browser<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">Chrome</a></li>
        <li><a href="#">Firefox</a></li>
        <li><a href="#">Safari</a></li>
      </ul>
    </li>
  </ul>
</body>
<script>
  class Accordion {
    constructor(options) {
      // 기본 옵션과 사용자 지정 옵션을 병합
      this.config = Accordion.mergeConfig(options);
      this.$accordion = document.querySelector(this.config.selector);

      // do something!
    }

    static mergeConfig(options) {
      // 기본 옵션
      const config = {
        selector: '#accordion',
        multi: true
      };

      return { ...config, ...options };
    }

    // do something!
  }

  window.onload = function () {
    const accordion = new Accordion({ multi: false });
    // const accordion = new Accordion();
  };
</script>
</html>
```

<!-- <div class="result" style="height: 600px"></div>

# 3. Angular Accordion UI

바닐라 자바스크립트로 구현한 아코디언 UI를 이번에는 Angular로 구현해 보자.

<iframe src="https://stackblitz.com/edit/angular-accordion-menu?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="700"></iframe> -->
