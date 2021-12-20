---
layout: post
title: <strong>Stopwatch</strong>
categories: ex-ui-component
section: ex-ui-component
seq: 5
permalink: /:categories/:title
description:
---

![](/assets/fs-images/exercise/stopwatch.gif)
{: .w-350}

Stopwatch
{: .desc-img}

# 1. 요구 사항

- 스톱워치의 시간은 mm:ss:ms 형식(예시 '01:59:89')으로 표시한다.

| 구분 | 의미  | 범위     | 비고
|:----|:-----|:-------|:--
| mm  | 분    | 0 ~    |
| ss  | 초    | 0 ~ 59 |
| ms  | 미리초 | 0 ~ 99 | 미리초는 100분의 1초를 나타내지만 10ms 단위로 표시한다.

- 스톱워치는 2개의 컨트롤 버튼을 가진다.
  - 왼쪽 버튼: 클릭할 때마다 Start/Stop으로 토글된다.
  - 오른쪽 버튼: 오른쪽 버튼은 아래와 같이 왼쪽 버튼에 종속적이다. 왼쪽 버튼이 Start이면 오른쪽 버튼은 Reset이고 왼쪽 버튼이 Stop이면 오른쪽 버튼은 Lap이다.

| 왼쪽 버튼 | 오른쪽 버튼
|:--------|:------------
| Start   | Reset
| Stop    | Lap

- 각 버튼의 기능은 다음과 같다.

| 버튼   | 기능
|:------|:----------------------------
| Start | 스톱워치를 시작한다.
| Stop  | 스톱워치를 일시정지시킨다.
| Reset | 스톱워치와 랩 타임을 초기화한다. 스톱워치의 현재 시간이 '00:00:00'이면 disabled 상태이어야 한다.
| Lap   | 랩 타임을 기록한다.

# 2. 기본 템플릿

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Stopwatch</title>
    <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
    <style>
      *,
      *::after,
      *::before {
        box-sizing: border-box;
      }
      body {
        font-family: 'Source Code Pro', monospace;
      }
      .title {
        color: #db5b33;
        font-weight: 300;
        text-align: center;
      }
      .stopwatch {
        text-align: center;
        font-size: 3em;
        padding: 30px;
      }
      .control {
        width: 120px;
        padding: 5px;
        margin: 15px;
        font-size: 36px;
        font-weight: bold;
        border: 2px solid #f44336;
        border-radius: 4px;
        cursor: pointer;
        outline: none;
      }
      .control:hover:enabled {
        background: #f44336;
        color: aliceblue;
      }
      .control:disabled {
        color: gray;
        cursor: not-allowed;
      }
      .laps {
        display: grid;
        grid-template-columns: 70px 1fr;
        column-gap: 50px;
        row-gap: 10px;
        width: 260px;
        margin: 10px auto;
        font-size: 0.5em;
        display: none;
      }
    </style>
    <script defer src="app.js"></script>
  </head>
  <body>
    <h1 class="title">Stopwatch</h1>
    <div class="stopwatch">
      <div class="display">00:00:00</div>
      <button class="control">Start</button>
      <button class="control" disabled>Reset</button>
      <div class="laps">
        <div class="lap-title">Laps</div>
        <div class="lap-title">Time</div>
      </div>
    </div>
  </body>
</html>
```

<!-- # 2. Angular version

<iframe src="https://stackblitz.com/edit/angular-stop-watch?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>

# 3. React version

<iframe src="https://stackblitz.com/edit/react-stop-watch?ctl=1&embed=1&hideNavigation=1&file=index.js" frameborder="0" width="100%" height="500"></iframe> -->
