---
layout: fs-post
title: <strong>Range slider UI</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 14
permalink: /:categories/:title
description:
---

* TOC
{:toc}

마우스 이벤트를 사용하여 Range slider UI를 구현해 보자. 구현할 Range silider UI의 이미지는 아래와 같다.

![range-slider-ui](/img/range-slider-ui.gif)
Range silider UI
{:.desc-img}

Range silider UI를 구현하려면 마우스 이벤트를 사용해 DOM 요소를 움직일 수 있어야 한다. 먼저 마우스 이벤트를 사용해 DOM 요소를 드래그하는 방법에 대해 살펴보자.

# 1. DOM 요소 드래그하기

이 기능에 대한 요구 사항은 아래와 같다.

1. 마우스로 드래그 대상 요소를 선택하고 마우스를 드래그하면 대상 요소가 마우스의 위치를 따라 이동하도록 한다. 드래그를 끝내면 이동을 멈춘다.
2. 마우스 이벤트를 사용하여 구현한다.
3. 라이브러리를 사용하지 않고 Vanilla javascript로 구현한다.

위 요구 사항을 충족하기 위해 아래와 같은 방법으로 가설을 세우고 구현해보자.

1. mousedown 이벤트가 발생한 상태에서만 mousemove 이벤트를 캐치해 드래그 대상 요소를 이동시킨다. 이를 위해 드래그 시작 시점(mousedown 이벤트가 발생했을 때)의 마우스 포인터 위치와 드래그를 하고 있는 시점(mousemove 이벤트가 발생할 때마다)의 마우스 포인터 위치를 비교하여 드래그 대상 요소의 이동 거리를 계산한다. 드래그 시작 시점의 마우스 포인터 위치는 드래그가 끝날 때까지 바뀌지 않지만 드래그를 하고 있는 시점(mousemove 이벤트가 발생할 때마다)의 마우스 포인터 위치는 계속 변화한다.
2. 드래그 대상 요소를 이동시킬 때 `position: absolute`의 top, left를 변경하는 방법으로 이동하지 말고 `transform: translate()`를 사용한다. translate 함수는 GPU를 사용하므로 top, left를 변경하는 방법보다 빠르다.
3. 드래그가 끝나면(mouseup 이벤트 발생) mousemove 이벤트 핸들러를 제거해 이동을 멈춘다.

![draggable-distance](/img/draggable-distance.png)
드래그 대상 요소의 이동 거리 계산
{: .desc-img}

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Drag and Drop</title>
  <style>
    body {
      background-color: #333;
    }

    .draggable {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #fff700;
      border: 5px solid orange;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="draggable"></div>

  <script>
    // 드래그 대상 요소
    const $draggable = document.querySelector('.draggable');
    // 드래그 시작 시점의 마우스 포인터 위치
    const initailMousePos = { x: 0, y: 0 };
    // 오프셋: 이동할 거리
    const offset = { x: 0, y: 0 };

    // mousemove 이벤트 핸들러
    function move(e) {
      $draggable.style.opacity = 0.7;

      // 오프셋 = 현재(드래그하고 있는 시점)의 마우스 포인터 위치 - 드래그 시작 시점의 마우스 포인터 위치
      offset.x = e.clientX - initailMousePos.x;
      offset.y = e.clientY - initailMousePos.y;

      // translate3d는 GPU를 사용하므로 absolute의 top, left를 사용하는 것보다 빠르다. top, left는 레이아웃에 영향을 준다.
      $draggable.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
    }

    // draggable 요소 내에서의 mousedown 이벤트만 처리한다.
    $draggable.addEventListener('mousedown', e => {
      /*
      드래그를 하고 있는 시점의 마우스 포인터 위치와 드래그 시작 시점의 마우스 포인터 위치를 비교해
      요소를 이동시킬 거리를 계산하기 위해 mousedown 이벤트가 발생(드래그를 시작)하면 드래그 시작 시점의
      마우스 포인터 위치(e.clientX/e.clientY: 뷰포트 상에서 현재 마우스의 포인터 위치)를 저장해 둔다.
      */
      initailMousePos.x = e.clientX - offset.x;
      initailMousePos.y = e.clientY - offset.y;

      // mousedown 이벤트가 발생한 상태에서 mousemove 이벤트가 발생하면 draggable 요소를 이동시킨다.
      document.addEventListener('mousemove', move);
    });

    // mouseup 이벤트가 발생하면 mousemove 이벤트를 삭제해 이동을 멈춘다.
    document.addEventListener('mouseup', () => {
      $draggable.style.opacity = 1;
      document.removeEventListener('mousemove', move);
    });
  </script>
</body>
</html>
```

<div class="result" style="height: 400px"></div>

# 2. Range slider UI

마우스 이벤트를 사용해 요소를 드래그하는 방법을 알았으니 이것을 활용해 Range slider UI를 구현해 보자. Range slider UI는 세로(Y축) 방향으로 이동할 필요는 없고 오직 가로(X축) 방향으로 요소를 이동시키면 된다.


```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Draggable Range Slider</title>
  <style>
    html {
      height: 100%;
    }

    body {
      margin: 0;
      background-color: #292c2f;
      font-family: monospace;
      overflow: hidden;
    }

    header {
      height: 70px;
      line-height: 70px;
      background: #252525;
    }

    .range-container {
      position: absolute;
      left: 30px;
      top: 25px;
      width: 300px;
      height: 20px;
    }

    .range {
      position: relative;
      margin: 0 10px;
      height: 20px;
      cursor: pointer;
    }

    .range-track {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      height: 4px;
      background: #424242;
      border-radius: 4px;
    }

    .range-track.fill {
      width: 0%;
      background: #4ac1ff;
    }

    .range-handle {
      position: absolute;
      left: -10px;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      outline: none;
    }

    .gradient {
      position: absolute;
      width: 100%;
      height: calc(100% - 70px);
      background-image: linear-gradient(0deg, #f1a829, #f14429);
    }

    .gradient-val {
      color: #ccc;
      font-size: 14px;
      font-weight: 800;
      padding-left: 350px;
      user-select: none;
    }

    .gradient-val span {
      color: #ccc;
    }
  </style>
</head>
<body>
  <header>
    <div class="range-container">
      <div class="range">
        <div class="range-track"></div>
        <div class="range-track fill"></div>
        <span class="range-handle"></span>
      </div>
    </div>
    <div class="gradient-val">
      background-image: linear-gradient(
        <span class="gradient-angle">0</span>deg,
        <span style="color: #f1a829;">#f1a829</span>,
        <span style="color: #f14429;">#f14429</span> )
    </div>
  </header>
  <div class="gradient"></div>
  <script>
    const $range = document.querySelector('.range');
    const $track = document.querySelector('.range-track');
    const $fill = document.querySelector('.range-track.fill');
    const $handle = document.querySelector('.range-handle');
    const $gradient = document.querySelector('.gradient');
    const $gradientAngle = document.querySelector('.gradient-angle');

    // .range-track 요소의 정보
    const { left, right, width } = $track.getBoundingClientRect();

    /**
     * mousedown, mousemove 이벤트 핸들러
     * 1. 뷰포트를 기준으로 한 마우스 포인터의 x축 위치를 바탕으로 .range-handle 요소를 수평 이동하고 .fill 요소의 너비를 변경한다.
     * 2. .gradient 요소의 background-image를 변경한다.
     *
     * @param {MouseEvent} e - 이벤트 객체
     */
    function rangeHandler(e) {
      // do something!
    }

    // .range-track 요소의 좌우 영역 내에서 발생한 이벤트만 캐치하기 위해 .range 요소에 이벤트를 등록한다.
    // margin 영역은 이벤트를 발생시키지 않는다.
    $range.addEventListener('mousedown', e => {
      e.preventDefault();

      rangeHandler(e);

      // mousedown 이벤트가 발생한 상태에서 mousemove 이벤트가 발생
      $range.addEventListener('mousemove', rangeHandler);
    });

    // mouseup 이벤트가 발생하면 mousemove 이벤트를 삭제한다.
    // $range 밖에서 발생한 mouseup 이벤트도 처리하기 위해 document의 mouseup 이벤트에 이벤트 핸들러를 등록한다
    document.addEventListener('mouseup', () => {
      $range.removeEventListener('mousemove', rangeHandler);
    });
  </script>
</body>
</html>
```

<!-- <div class="result" style="height: 600px"></div>

# 3. Angular Range slider UI

바닐라 자바스크립트로 구현한  Range slider UI를 이번에는 Angular로 구현해 보자.

<iframe src="https://stackblitz.com/edit/angular-range-slider-ui?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="700"></iframe> -->

# Reference

* [High Performance Animations](https://www.html5rocks.com/ko/tutorials/speed/high-performance-animations/)

* [Moving elements with translate() is better than absolute positioning (top, left, right, bottom)](http://krasimirtsonev.com/blog/article/Moving-elements-with-translate-is-better-than-absolute-positioning-top-left-right-bottom)

* [translate3d와 translateX/translateY의 성능 비교](https://jsperf.com/translate3d-vs-xy)
