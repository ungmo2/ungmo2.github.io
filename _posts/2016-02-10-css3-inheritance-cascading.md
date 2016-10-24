---
layout: post
title: CSS3 <strong>Inheritance & Cascading</strong>
subtitle: 스타일의 상속과 적용 우선 순위
categories: css
section: css
---

* TOC
{:toc}


# 1. 상속(Inheritance)

상속이란 상위(부모, 조상) 요소의 속성을 하위(자식, 자손) 요소가 물려 받는 것을 의미한다. 상속 기능이 없다면 각 요소의 Rule set에 속성을 매번 각각 지정해야 한다.

하지만 모든 속성이 상속되는 것은 아니다. <strong>속성 중에는 상속이 되는 것과 되지 않는 것이 있다.</strong>

| property     | Inherit     |
| :----------: |:-----------:|
| width/height | no
| margin       | no
| padding      | no
| border       | no
| box-sizing   | no
| display      | no
| visibility   | yes
| opacity      | yes
| background   | no
| font         | yes
| color        | yes
| line-height  | yes
| text-align   | yes
| vertical-align  | no
| text-decoration | no
| white-space | yes
| position    | no
| top/right/bottom/left | no
| z-index     | no
| overflow    | no
| float       | no

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    .text-red {
      color: red;
      border: 1px solid #bcbcbc;
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="text-red">
    <h1>Heading</h1>
    <p>Paragraph<strong>strong</strong></p>
    <button>Button</button>
  </div>
</body>
</html>
```

<div class="result"></div>

color는 상속되는 속성으로 자식 요소는 물론 자손 요소까지 적용된다. 하지만 button처럼 상속 받지 않는 요소도 존재한다.

border, padding은 상속되지 않는 요소로 하위 요소에 적용되지 않는다. [Full property table](https://www.w3.org/TR/CSS21/propidx.html)의 Inherited?가 yes인 속성만 상속된다.

![css inheritance](/img/css_inheritance.png)

상속되지 않는 경우(상속받지 않는 요소 또는 상속되지 않는 속성), `inherit` 키워드를 사용하여 명시적으로 상속받게 할 수 있다.

```css
button {
  color: inherit;
}
p {
  border: inherit;
  padding: inherit;
}
```

# 2. 캐스캐이딩(Cascading)

요소는 하나 이상의 CSS 선언에 영향을 받을 수 있다. 이때 충돌을 피하기 위해 <strong>CSS 적용 우선순위</strong>가 필요한데 이를 <strong>캐스캐이딩(Cascading Order)</strong>이라고 한다.

캐스캐이딩에는 다음과 같이 세가지 규칙이 있다.

중요도
: CSS가 <strong>어디에 선언 되었는지</strong>에 따라서 우선순위가 달라진다.

명시도
: 대상을 <strong>명확하게 특정</strong>할수록 명시도가 높아지고 우선순위가 높아진다.

선언순서
: <strong>선언된 순서</strong>에 따라 우선 순위가 적용된다. 즉, 나중에 선언된 스타일이 우선 적용된다.

## 2.1 중요도

CSS가 어디에 선언 되었는지에 따라서 우선순위가 달라진다.

1. head 요소 내의 style 요소
2. head 요소 내의 style 요소 내의 `@import` 문
3. `<link>` 로 연결된 CSS 파일
4. `<link>` 로 연결된 CSS 파일 내의 `@import` 문
5. 브라우저 디폴트 스타일시트

```css
/* style.css */
body {
  background-color: blue;
  color: red;
}
```

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      background-color: beige;
      color: navy;
    }
  </style>
</head>
<body>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</body>
</html>
```

```css
/* style.css */
body {
  background-color: red;
  color: white;
}
```

## 2.2 명시도

대상을 명확하게 특정할수록 명시도가 높아지고 우선순위가 높아진다.

```
!important > 인라인 스타일 > 아이디 선택자 > 클래스/속성/가상 선택자 > 태그 선택자 > 전체 선택자 > 상위 요소에 의해 상속된 속성
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p        { color: red !important; }
    div.food { color: chocolate; }
    #thing   { color: blue; }
    .food    { color: green; }
    div      { color: orange; }
  </style>
</head>
<body>
  <p id="thing">Will be Red.</p>
  <div class="food">Will be Chocolate.</div>
</body>
</html>
```

<div class="result"></div>

## 2.3 선언순서

선언된 순서에 따라 우선 순위가 적용된다. 즉, 나중에 선언된 스타일이 우선 적용된다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p { color: blue; }
    p { color: red; }

    .red { color: red; }
    .blue { color: blue; }
  </style>
</head>
<body>
  <p>Will be RED.</p>
  <p class="blue red">Will be BLUE.</p>
</body>
</html>
```

<div class="result"></div>
