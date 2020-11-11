---
layout: fs-post
title: <strong>Analog Clock</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 10
permalink: /:categories/:title
description:
---

* TOC
{:toc}

![](/assets/fs-images/exercise/analog-clock.gif)
{: .w-650}
Analog clock
{: .desc-img}

요구 사항
: 현재 시간을 표시하여야 한다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Analog Clock</title>
  <style>
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

    .analog-clock {
      position: relative;
      margin: 100px auto 0;
      width: 200px;
      height: 200px;
      background-color: aliceblue;
      border-radius: 50%;
    }

    .hand {
      position: absolute;
      left: 50%;
      width: 1px;
      height: 100px;
      /* 자바스크립트에 의해 덮어써진다. */
      /* transform: translate3d(-50%, 0, 0); */
      transform-origin: 100% 100%;
    }

    .hour {
      background-color: #f44336;
    }

    .minute {
      background-color: #3f51b5;
    }

    .second {
      background-color: #9e9e9e;
    }

    .center-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 12px;
      height: 12px;
      background-color: black;
      border-radius: 50%;
    }

    .digital-clock {
      position: absolute;
      top: 350px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      font-size: 2em;
      font-family: 'Source Code Pro', monospace;
    }
  </style>
</head>
<body>
  <div class="clock">
    <div class="analog-clock">
      <div class="hour hand"></div>
      <div class="minute hand"></div>
      <div class="second hand"></div>
      <div class="center-circle"></div>
    </div>
    <div class="digital-clock"></div>
  </div>

  <script>

  </script>
</body>
</html>
```
<!--
  (function () {
    const $hourHand = document.querySelector('.hour');
    const $minuteHand = document.querySelector('.minute');
    const $secondHand = document.querySelector('.second');
    const $digitalClock = document.querySelector('.digital-clock');

    // 1 => 01
    const format = num => (num < 10 ? '0' + num : num + '');

    const renderTime = () => {
      // 현재 시간 취득
      const date = new Date();
      let hour = date.getHours();
      // 15 => 3
      if (hour > 12) hour -= 12;
      const minute = date.getMinutes();
      const second = date.getSeconds();

      $digitalClock.textContent = `${format(hour)}:${format(minute)}:${format(second)}`;

      // 시계의 눈금 => 60개 => 1개당 6도
      // 60초 / 360도 => 1초 / 6도
      $secondHand.style.transform = `translate3d(-50%, 0, 0) rotate(${second * 6}deg)`;

      // 60분 / 360도 => 1분 / 6도 => 1초 / 1/10도
      $minuteHand.style.transform = `translate3d(-50%, 0, 0) rotate(${(minute * 6) + (second * 0.1)}deg)`;

      // 12시간 / 360도 => 1시간 / 30도 => 1분 / 0.5도 => 1초 / 0.5 / 60
      $hourHand.style.transform = `translate3d(-50%, 0, 0) rotate(${(hour * 30) + (minute * 0.5) + (second * (0.5 / 60))}deg)`;
      // 6시 => 6*15=90
      // 9시 => 9*15=139
    };

    setInterval(renderTime, 1000);
  }());
 -->
