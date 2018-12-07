---
layout: post
title: Snippet - Menu
subtitle:
categories: snippet
section: snippet
seq: 8
subseq: 6
---

* TOC
{:toc}

# 1. Accordion

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Accordion Menu</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet">

  <style>
    * {
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
      font-weight: bold;
      text-align: center;
      padding: 40px;
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

    .accordion li.show i.fa-chevron-down {
      transform: rotate(180deg);
    }

    .accordion li.show .menu {
      color: #b63b4d;
    }

    .accordion li.show i {
      color: #b63b4d;
    }

    /* Show submenu */
    .accordion li.show .submenu {
      /* height: auto;를 지정하면 transition이 동작하지 않는다 */
      max-height: 500px;
    }

    .submenu {
      /* height: auto;를 지정하면 transition이 동작하지 않는다 */
      max-height: 0;
      overflow: hidden;
      background: #444359;
      font-size: 14px;
      transition: max-height 0.4s ease;
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
    <li class="show">
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
        <li><a href="#">Firfox</a></li>
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
      this.accordion = document.querySelector(this.config.selector);
      // 이벤트 핸들러 내부의 this는 currentTartget
      this.accordion.addEventListener('click', this.toogle.bind(this));
    }

    static mergeConfig(options) {
      // 기본 옵션
      const config = {
        selector: '#accordion',
        multi: true
      };

      return { ...config, ...options };
    }

    toogle(event) {
      if (!event.target.classList.contains('menu')) return;
      // click 이벤트를 발생시킨 <div class="menu"> 요소의 부모 요소인 li 요소
      const targetLi = event.target.parentNode;

      // 멀티 오픈을 허용하지 않으면 타깃 이외의 모든 서브메뉴를 클로즈한다.
      if (!this.config.multi) {
        [].filter.call(
          this.accordion.childNodes,
          li => li.nodeType === Node.ELEMENT_NODE && li !== targetLi
        ).forEach(li => li.classList.remove('show'));
      }

      // li 요소의 class에 "show"가 있으면 제거하고 없으면 추가한다.
      targetLi.classList.toggle('show');
    }
  }

  window.onload = function () {
    const accordion = new Accordion({ multi: false });
    // const accordion = new Accordion();
  };
</script>
</html>
```

<div class="result" style="height: 800px"></div>
