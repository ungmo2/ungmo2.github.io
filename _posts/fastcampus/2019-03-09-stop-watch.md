---
layout: fs-post
title: <strong>Stop watch</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 9
permalink: /:categories/:title
description:
---

* TOC
{:toc}

![](/assets/fs-images/exercise/stop-watch.gif)

Stop watch
{: .desc-img}

요구 사항
: 버튼을 처음 클릭하면 스톱워치가 시작하고 버튼을 다시 클릭하면 일시 정지와 시작을 반복한다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Stop watch</title>
  <style>
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

    .stop-watch {
      font-family: 'Source Code Pro', monospace;
      text-align: center;
      font-size: 3em;
      padding: 30px;
    }

    .control {
      width: 300px;
      padding: 5px;
      margin-top: 15px;
      font-size: 36px;
      font-weight: bold;
      border: 2px solid #f44336;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
    }

    .control:hover {
      background: #f44336;
      color: aliceblue;
    }
  </style>
  <title>Stop watch</title>
</head>
<body>
  <div class="stop-watch">
    <div class="display">00:00:00</div>
    <button class="control">Start</button>
  </div>
  <script>

  </script>
</body>
</html>
```
<!--
    const $control = document.querySelector('.control');

    $control.onclick = (() => {
      let [mm, ss, ms] = [0, 0, 0];
      let isRunning = false;
      let timerID = 0;
      const $display = document.querySelector('.display');

      // 1 => 01
      const format = num => (num < 10 ? '0' + num : num + '');

      return function () {
        if (isRunning) {
          // Running => Stop
          clearInterval(timerID);
        } else {
          // Stop => Running
          timerID = setInterval(() => {
            // 10ms 단위로 증가
            ms++;
            if (ms >= 100) {
              ss++;
              ms = 0;
            }
            if (ss >= 60) {
              mm++;
              ss = 0;
            }
            $display.innerHTML = `${format(mm)}:${format(ss)}:${format(ms)}`;
          }, 10);
        }
        isRunning = !isRunning;
        $control.textContent = isRunning ? 'Stop' : 'Start';
      };
    })();
 -->
# 2. Angular version

<iframe src="https://stackblitz.com/edit/angular-stop-watch?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>

# 3. React version

<iframe src="https://stackblitz.com/edit/react-stop-watch?ctl=1&embed=1&hideNavigation=1&file=index.js" frameborder="0" width="100%" height="500"></iframe>
