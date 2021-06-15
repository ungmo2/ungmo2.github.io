---
layout: fs-post
title: <strong>Analog Clock</strong>
categories: fastcampus-ui-component
section: fastcampus-ui-component
seq: 4
permalink: /:categories/:title
description:
---

다음과 같이 동작하는 아날로그 시계를 구현해보자.

![](/assets/fs-images/exercise/analog-clock.gif)
{: .w-350}

Analog clock
{: .desc-img}

요구 사항
{: .title}
- CSS 변수를 사용해 시계의 시침(.hand.hour 요소), 분침(.hand.minute 요소), 초침(.hand.second 요소)을 1초 간격으로 회전시켜 현재 시간을 표시한다.
- CSS 변수에 대해서는 [Updating a CSS Variable with JavaScript](https://css-tricks.com/updating-a-css-variable-with-javascript)을 참조한다.

뷰의 기본 템플릿은 다음과 같다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Analog clock</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400" rel="stylesheet" />
    <style>
      *,
      *::after,
      *::before {
        box-sizing: border-box;
      }
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
      .clock {
        position: relative;
        width: 300px;
        height: 300px;
        background-color: #fff;
        border-radius: 50%;
        margin: 40px auto;
        border: 5px solid white;
        box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1);
      }
      .clock::after {
        content: '';
        width: 15px;
        height: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: black;
        border-radius: 50%;
        z-index: 100;
      }

      .clock > .hand {
        /* 자바스크립트로 --deg 값을 변경한다. */
        --deg: 0;
        position: absolute;
        bottom: 50%;
        left: 50%;
        border: 1px solid white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        transform-origin: bottom;
        transform: translate3D(-50%, 0, 0) rotate(calc(var(--deg) * 1deg));
        z-index: 10;
      }
      .clock > .hand.second {
        width: 4px;
        height: 120px;
        background-color: red;
      }
      .clock > .hand.minute {
        width: 6px;
        height: 110px;
        background-color: black;
      }
      .clock > .hand.hour {
        width: 8px;
        height: 80px;
        background-color: black;
      }

      /* 시간 구분 마크: .clock과 같은 크기의 블록 요소를 회전시킨다. */
      .clock > .time {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 10px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
      }

      .clock > .time.time1 {
        transform: rotate(30deg);
      }
      .clock > .time.time2 {
        transform: rotate(60deg);
      }
      .clock > .time.time3 {
        transform: rotate(90deg);
      }
      .clock > .time.time4 {
        transform: rotate(120deg);
      }
      .clock > .time.time5 {
        transform: rotate(150deg);
      }
      .clock > .time.time6 {
        transform: rotate(180deg);
      }
      .clock > .time.time7 {
        transform: rotate(210deg);
      }
      .clock > .time.time8 {
        transform: rotate(240deg);
      }
      .clock > .time.time9 {
        transform: rotate(270deg);
      }
      .clock > .time.time10 {
        transform: rotate(300deg);
      }
      .clock > .time.time11 {
        transform: rotate(330deg);
      }
    </style>
  </head>
  <body>
    <h1 class="title">Analog clock</h1>
    <div class="clock">
      <!-- 시계의 시침 -->
      <div class="hand hour"></div>
      <!-- 시계의 분침 -->
      <div class="hand minute"></div>
      <!-- 시계의 초침 -->
      <div class="hand second"></div>
      <!-- 시간 구분 마크 -->
      <div class="time time1">|</div>
      <div class="time time2">|</div>
      <div class="time time3">|</div>
      <div class="time time4">|</div>
      <div class="time time5">|</div>
      <div class="time time6">|</div>
      <div class="time time7">|</div>
      <div class="time time8">|</div>
      <div class="time time9">|</div>
      <div class="time time10">|</div>
      <div class="time time11">|</div>
      <div class="time time12">|</div>
    </div>
  </body>
</html>
```
