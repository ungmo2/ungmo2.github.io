---
layout: post
title: <strong>Calendar & Datepicker</strong>
categories: ex-ui-component
section: ex-ui-component
seq: 12
permalink: /:categories/:title
description:
---

# Calendar & Date picker

HTML에서 기본 제공하는 네이티브 Date picker(`<input type="date" />`)와 유사하게 동작하는 커스텀 Date picker를 구현해보자.

네이티브 Date picker는 다음과 같이 동작한다.

![native-date-picker](/assets/fs-images/exercise/native-date-picker.gif)
{: .w-300}
native-date-picker
{: .desc-img}

최종적으로 구현하려는 커스텀 Date picker도 다음과 같이 네이티브 Date picker와 유사하게 동작한다.

![date-picker](/assets/fs-images/exercise/date-picker.gif)
{: .w-300}
date picker
{: .desc-img}

다음의 순서에 따라 먼저 Calendar를 구현하고 이를 기반으로 Date picker를 구현해보자.

# 1. Calendar

## 1.1. 뷰

다음 그림을 참고해서 Calendar의 뷰를 구현한다.

![calendar layout](/assets/fs-images/exercise/calendar-layout.png)
calendar layout
{: .desc-img}

요구 사항은 다음과 같다.

1. 레이아웃

flexbox는 1차원(선형) 레이아웃의 정렬에 적합하고 grid는 2차원(매트릭스) 레이이웃에 적합하다. .calendar-nav 요소의 콘텐츠는 선형이고 .calendar-grid 요소의 콘텐츠는 매트릭스이므로 다음과 같이 레이아웃 시스템을 적용해 구현한다.

| 구성 요소            | 적용 레이아웃
|:-------------------|:---------------
| .calendar-nav      | flexbox
| .calendar-grid     | gird

- [When to use Flexbox and when to use CSS grid](https://blog.logrocket.com/flexbox-vs-css-grid)

2. css 변수와 반응형 뷰

CSS의 미디어 쿼리(@media)는 HTML 요소를 기반으로 동작하지 않고 디바이스 또는 [미디어 타입](https://www.w3.org/TR/CSS21/media.html)(screen, print 등)을 기반으로 동작한다. 따라서 미디어 쿼리로는 특정 HTML 요소의 width 값의 변화에 반응하는 뷰를 구현할 수 없다. 하지만 [css 변수(css 커스텀 프로퍼티)](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)를 사용하면 특정 HTML 요소의 width 값의 변화에 반응하는 뷰를 구현할 수 있다.

- [Responsive Designs and CSS Custom Properties: Building a Flexible Grid System](https://css-tricks.com/responsive-designs-and-css-custom-properties-building-a-flexible-grid-system)

자바스크립트로 .calendar 요소의 width 값을 동적으로 변경할 경우를 대비해 [css 변수](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)를 사용하여 .calendar 요소의 width 값을 관리하려 한다. 다음과 같이 .calendar 요소의 width 값이 변경되면 캘린더 전체의 크기와 폰트 사이즈가 연동해서 조정되도록 뷰를 구현한다.

![calendar layout](/assets/fs-images/exercise/calendar-size.gif)
{: .w-400}
calendar size
{: .desc-img}

기본 템플릿은 다음과 같다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calendar</title>
    <!-- 원하는 폰트와 아이콘을 사용해도 좋다. -->
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet" />
    <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
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

      /* 뷰를 구현하세요. */
    </style>
  </head>
  <body>
    <h1 class="title">Calendar</h1>
    <div class="calendar">
      <!-- 뷰를 구현하세요 -->
    </div>
  </body>
</html>
```

## 1.2. 기능

구현된 뷰를 기반으로 다음 그림을 참고해서 바닐라 자바스크립트로 기능을 구현한다.

![calendar function](/assets/fs-images/exercise/calendar-function.png)
calendar function
{: .desc-img}

요구 사항은 다음과 같다.

1. 현재를 기준으로 .calendar 요소의 콘텐츠를 동적으로 생성하여 초기 렌더링한다.
2. .calendar-nav 요소의 버튼을 클릭하면 익월 또는 전월을 기준으로 .calendar 요소의 컨텐츠를 동적으로 생성하여 렌더링한다.
3. 현재 표시 중인 달의 1일 앞과 말일 뒤에 이전 달과 다음 달의 날짜를 채운다.
4. 캘린터에 오늘이 포함되어 있으면 구별할 수 있도록 표시한다.
5. 일요일은 폰트 컬러를 빨간색으로 지정한다.
6. 캘린터 크기는 동적으로 변경할 수 있어야 한다. 즉, 캘린터를 생성할 때 캘린터 크기를 지정할 수 있어야 한다.
7. 날짜를 클릭하면 해당 날짜를 'yyyy-mm-dd' 형식의 문자열로 콘솔에 출력한다.

# 2. Date picker

다음 그림을 참고해서 Date picker의 뷰와 기능을 구현한다.

![date picker](/assets/fs-images/exercise/date-picker.gif)
{: .w-400}
date picker
{: .desc-img}

요구 사항은 다음과 같다.

1. Date picker를 클릭(포커스)하면 캘린더가 렌더링된다. 이때 Date picker의 값은 빈문자열이다.
2. Date picker는 read only하다.
3. 캘린더의 날짜를 클릭하면 해당 날짜가 Date picker의 값으로 출력된다.
4. 캘린더와 Date picker 이외의 영역을 클릭하면 캘린더가 사라진다.
5. Date picker의 값이 존재할 때 Date picker를 다시 클릭(포커스)하면 Date picker의 값을 기준으로 캘린더를 렌더링한다.
