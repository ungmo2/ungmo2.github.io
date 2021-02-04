---
layout: fs-post
title: <strong>Dark mode - Toggle button</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 10
permalink: /:categories/:title
description:
---

* TOC
{:toc}

다음과 같이 토글 버튼을 클릭하여 테마(다크 모드/라이트 모드)를 설정하면 테마가 뷰에 반영되도록 구현해보자. 테마는 로컬스토리지에 저장하여 웹페이지를 리로드하거나 다시 접근했을 때 저장된 테마를 적용하도록 한다.

![](/assets/fs-images/exercise/dark-mode.gif)
{: .w-700}

Dark mode - Toggle button
{: .desc-img}

요구 사항은 다음과 같다.

1. [로컬스토리지](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)에 저장되어 있는 테마(다크 모드/라이트 모드)를 기준으로 초기 렌더링한다.
2. 로컬스토리지에 저장된 테마가 없다면 라이트 모드로 초기 렌더링한다.
3. 테마를 적용하여 렌더링할 때 기존 테마가 변경되어 깜빡거리는 현상(flash of incorrect theme, FOIT)이 발생하지 않도록 한다.
4. 토글 버튼을 클릭하면 로컬스토리지에 테마를 저장하고 저장된 테마를 기준으로 다시 렌더링한다.

뷰의 기본 템플릿은 다음과 같다. body 요소에 dark 클래스를 추가하면 다크 모드가 적용되고 body 요소에서 dark 클래스를 제거하면 라이트 모드가 적용된다.

![](/assets/fs-images/exercise/dark-mode-toggle.gif)
{: .w-700}

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Light / Dark Mode - Toggle button</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" rel="stylesheet" />
    <style>
      *,
      *::after,
      *::before {
        box-sizing: border-box;
      }
      body {
        font-family: 'Open Sans';
        font-weight: 300;
      }
      .title {
        color: #db5b33;
        font-weight: 300;
        text-align: center;
      }
      .toggle-button {
        position: relative;
        width: 100px;
        height: 50px;
        margin: 0 auto;
        cursor: pointer;
      }
      /* 토글 버튼 내부의 원 */
      .toggle-button > .toggle-button-switch {
        position: absolute;
        top: 2px;
        left: 2px; /* toggle => left: 52px */
        width: 46px;
        height: 46px;
        background-color: #fff;
        border-radius: 100%;
        transition: left 0.3s;
      }
      /* 토글 버튼의 바탕 */
      .toggle-button > .toggle-button-text {
        display: flex;
        background-color: #3dbf87;
        border-radius: 25px;
        box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
        transition: background-color 0.3s;
      }
      /* 토글 버튼의 텍스트 */
      .toggle-button > .toggle-button-text > .toggle-button-text-on,
      .toggle-button > .toggle-button-text > .toggle-button-text-off {
        width: 50%;
        line-height: 50px;
        text-align: center;
        color: #fff;
      }
      article {
        width: 960px;
        margin: 50px auto 0;
        font-size: 1.5em;
      }

      /* Dark Theme */
      body.dark {
        background-color: #232323;
      }
      body.dark .toggle-button > .toggle-button-switch {
        left: 52px;
      }
      body.dark .toggle-button > .toggle-button-text {
        background-color: #fc3164;
      }
      body.dark article {
        color: #fff;
      }
    </style>
  </head>
  <body>
    <h1 class="title">Light / Dark Mode - Toggle Button</h1>
    <div class="toggle-button">
      <div class="toggle-button-switch"></div>
      <div class="toggle-button-text">
        <div class="toggle-button-text-on"><i class="far fa-sun fa-lg"></i></div>
        <div class="toggle-button-text-off"><i class="far fa-moon fa-lg"></i></div>
      </div>
    </div>
    <article>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum optio ab porro magni in sunt ipsam, doloremque minima,
      itaque sapiente consequatur, repellat velit voluptatum accusantium aperiam. Nostrum sunt reprehenderit nemo!
    </article>
  </body>
</html>
```

- 추가 기능

Windows와 macOS 등은 운영 체제 레벨에서 사용자 테마(다크 모드/라이트 모드)를 설정할 수 있다.

![](/assets/fs-images/exercise/os-theme.png)
{: .w-650}

CSS의 [prefers-color-scheme](https://developer.mozilla.org/ko/docs/Web/CSS/@media/prefers-color-scheme) media query나 자바스크립트의 [window.matchMedia](https://developer.mozilla.org/ko/docs/Web/API/Window/matchMedia) 메서드를 사용하면 운영 체제 레벨에서 설정한 사용자 테마를 감지할 수 있다.

- [prefers-color-scheme: Hello darkness, my old friend](https://web.dev/prefers-color-scheme)

prefers-color-scheme media query와 window.matchMedia 메서드의 간단한 예제는 다음과 같다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .themed {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 100px;
        background-color: rgb(250, 250, 250);
      }
      .themed::after {
        content: 'Light mode(default)';
      }

      @media (prefers-color-scheme: dark) {
        .themed {
          background-color: #000;
          color: #fff;
        }
        .themed::after {
          content: 'Dark mode detacked';
        }
      }
    </style>
  </head>
  <body>
    <div class="themed"></div>
    <script>
      // https://web.dev/prefers-color-scheme
      // https://caniuse.com/?search=prefers-color-scheme
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      console.log(darkModeMediaQuery);
      // MediaQueryList {media: "(prefers-color-scheme: dark)", matches: true, onchange: null}

      darkModeMediaQuery.addListener(e => {
        const darkModeOn = e.matches;
        console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
      });
    </script>
  </body>
</html>
```

요구 사항은 다음과 같다.

1. 로컬스토리지에 저장된 테마가 없다면 window.matchMedia 메서드로 사용자 OS 테마를 감지해 이를 로컬스토리지에 저장하고 테마에 적용한다.
2. 로컬스토리지에 저장된 테마가 있다면 사용자 OS 테마보다 이를 우선 적용한다.

<!-- # 2. Angular version -->

<!--
<iframe src="https://stackblitz.com/edit/angular-toggle-button?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="500"></iframe> -->
