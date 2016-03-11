---
layout: post
title: CSS3 Property
categories: css
---

* TOC
{:toc}

# 1. CSS 속성값(Property Values)의 표현

CSS 속성값은 키워드, 크기 단위, 색상 표현 단위 등의 특정 단위를 갖는다.

## 1.1 키워드

각 속성에 따라 별도의 키워드가 존재한다. 자세한 내용은 [CSS 속성](/css/CSS3-Basics/#css-property)에서 설명하기로 한다.

## 1.2 크기 단위

cm, mm, inch 등의 단위도 존재하나 대표적인 크기 단위는 다음과 같다. px은 절대값이고 em, %는 상재값이 된다.

| 단위        | Description                          |
|:-----------|:-------------------------------------|
| px         | 픽셀 단위 (1px = 1/96 inches)
| em         | 배수 단위 (2em은 2배의 크기를 의미한다)
| %          | 백분률 단위

속성값이 0인 경우, 단위를 지정하지 않아도 된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      #px > :nth-child(1) { }
      #px > :nth-child(2) { font-size: 16px; }
      #px > :nth-child(3) { font-size: 24px; }
      #px > :nth-child(4) { font-size: 32px; }

      #em > :nth-child(1) { }
      #em > :nth-child(2) { font-size: 1.0em; }
      #em > :nth-child(3) { font-size: 1.5em; }
      #em > :nth-child(4) { font-size: 2.0em; }

      #percent > :nth-child(1) { }
      #percent > :nth-child(2) { font-size: 100%; }
      #percent > :nth-child(3) { font-size: 150%; }
      #percent > :nth-child(4) { font-size: 200%; }
    </style>
  </head>
  <body>
    <h1>px uint</h1>
    <div id="px">
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
    </div>

    <h1>em unit</h1>
    <div id="em">
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
    </div>

    <h1>% unit</h1>
    <div id="percent">
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
    </div>
  </body>
</html>
```

## 1.3 색상 표현 단위

색상을 지정하기 위해 키워드(red, blue...)를 사용할 수 있다. 사용이 간편하다는 장점이 있으나 표현할 수 있는 색상의 수는 제한된다.

색상를 표현할 수 있는 키워드 리스트는 [W3C css3-color ](https://www.w3.org/TR/css3-color/) 를 참고하기 바란다.

```html
<!DOCTYPE html>
<html>
  <body>
    <h2 style="background-color:red">
    Red background-color
    </h2>

    <h2 style="background-color:green">
    Green background-color
    </h2>

    <h2 style="background-color:blue;color:white">
    Blue background-color and white text color
    </h2>

    <h2 style="background-color:orange">
    Orange background-color
    </h2>

    <h2 style="background-color:yellow">
    Yellow background-color
    </h2>

    <h2 style="background-color:cyan">
    Cyan background-color
    </h2>

    <h2 style="background-color:black;color:white">
    Black background-color and white text color
    </h2>
  </body>
</html>
```

더욱 다양한 색상을 표현하기 위해 다음과 같은 색상 표현 단위를 사용할 수 있다.

| 단위                               | 사용예                          |
|:----------------------------------|:------------------------------|
| HEX 코드 단위 (Hexadecimal Colors)  | #000000
| RGB (Red, Green, Blue)            | rgb(255, 255, 0)
| RGBA (Red, Green, Blue, Alpha)    | rgba(255, 255, 0, 1)
| HSL                               | hsl(0, 100%, 25%)
| HSLA                              | hsla(60, 100%, 50%, 1)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      #hex-p1 {background-color:#ff0000;}
      #hex-p2 {background-color:#00ff00;}
      #hex-p3 {background-color:#0000ff;}
      #hex-p4 {background-color:#ffff00;}
      #hex-p5 {background-color:#ff00ff;}

      #rgb-p1 {background-color:rgb(255,0,0);}
      #rgb-p2 {background-color:rgb(0,255,0);}
      #rgb-p3 {background-color:rgb(0,0,255);}
      #rgb-p4 {background-color:rgb(192,192,192);}
      #rgb-p5 {background-color:rgb(255,255,0);}
      #rgb-p6 {background-color:rgb(255,0,255);}

      #rgba-p1 {background-color:rgba(255,0,0,0.3);}
      #rgba-p2 {background-color:rgba(0,255,0,0.3);}
      #rgba-p3 {background-color:rgba(0,0,255,0.3);}
      #rgba-p4 {background-color:rgba(192,192,192,0.3);}
      #rgba-p5 {background-color:rgba(255,255,0,0.3);}
      #rgba-p6 {background-color:rgba(255,0,255,0.3);}

      #hsl-p1 {background-color:hsl(120,100%,50%);}
      #hsl-p2 {background-color:hsl(120,100%,75%);}
      #hsl-p3 {background-color:hsl(120,100%,25%);}
      #hsl-p4 {background-color:hsl(120,60%,70%);}
      #hsl-p5 {background-color:hsl(290,100%,50%);}
      #hsl-p6 {background-color:hsl(290,60%,70%);}

      #hsla-p1 {background-color:hsla(120,100%,50%,0.3);}
      #hsla-p2 {background-color:hsla(120,100%,75%,0.3);}
      #hsla-p3 {background-color:hsla(120,100%,25%,0.3);}
      #hsla-p4 {background-color:hsla(120,60%,70%,0.3);}
      #hsla-p5 {background-color:hsla(290,100%,50%,0.3);}
      #hsla-p6 {background-color:hsla(290,60%,70%,0.3);}
    </style>
  </head>

  <body>
    <h1>HEX colors:</h1>
    <p id="hex-p1">Red</p>
    <p id="hex-p2">Green</p>
    <p id="hex-p3">Blue</p>
    <p id="hex-p4">Yellow</p>
    <p id="hex-p5">Cerise</p>

    <h1>RGB colors:</h1>
    <p id="rgb-p1">Red</p>
    <p id="rgb-p2">Green</p>
    <p id="rgb-p3">Blue</p>
    <p id="rgb-p4">Grey</p>
    <p id="rgb-p5">Yellow</p>
    <p id="rgb-p6">Cerise</p>

    <h1>RGB colors with opacity:</h1>
    <p id="rgba-p1">Red</p>
    <p id="rgba-p2">Green</p>
    <p id="rgba-p3">Blue</p>
    <p id="rgba-p4">Grey</p>
    <p id="rgba-p5">Yellow</p>
    <p id="rgba-p6">Cerise</p>

    <h1>HSL colors:</h1>
    <p id="hsl-p1">Green</p>
    <p id="hsl-p2">Light green</p>
    <p id="hsl-p3">Dark green</p>
    <p id="hsl-p4">Pastel green</p>
    <p id="hsl-p5">Violet</p>
    <p id="hsl-p6">Pastel violet</p>

    <h1>HSL colors with opacity:</h1>
    <p id="hsla-p1">Green</p>
    <p id="hsla-p2">Light green</p>
    <p id="hsla-p3">Dark green</p>
    <p id="hsla-p4">Pastel green</p>
    <p id="hsla-p5">Violet</p>
    <p id="hsla-p6">Pastel violet</p>
  </body>
</html>
```

# 2. CSS 속성(Property)

## 2.1 block / inline

모든 HTML 요소는 아무런 CSS를 적용하지 않아도 기본적으로 브라우저에 표현되는 디폴트 표시 값을 가진다. 대부분의 HTML 요소는 block 또는 inline 속성을 갖는다.

아래는 p 요소에 대한 크롬 브라우저의 디폴트 css이다.

```css
p {
  display: block;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
}
```

### 2.1.1 block 속성

- 항상 새로운 라인에서 시작한다.

- 화면 크기 전체의 가로폭을 차지한다. (width: 100%)

- width, height, margin 속성 지정이 가능하다.

- block 요소 예

  - div

  - h1 ~ h6

  - p

  - ol

  - ul

  - li

  - hr

  - table

  - form

```html
<!DOCTYPE html>
<html>
  <body>
    <div style="background-color:black; color:white; padding:20px;">
      <h2>London</h2>
      <p>London is the capital city of England. It is the most populous city in the United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
    </div>
    <div style="background-color:red; color:white; padding:20px; width:200px;">
      <h2>Paris</h2>
      <p>Paris is the capital and most populous city of France. Situated on the Seine River, in the north of the country.</p>
    </div>
  </body>
</html>
```

### 2.1.2 inline 속성

- 새로운 라인에서 시작하지 않으며 문장의 중간에 들어갈 수 있다. 즉, 줄을 바꾸지 않고 다른 요소와 함께 한 행에 위치시킬 수 있다.

- content의 폭만큼만 가로폭을 차지한다.

- width, height, margin-top, margin-bottom 속성 지정이 불가능하다. inline 요소를 연속 사용하는 경우, 간격을 유지하기 위해서 좌, 우에 약 5px 가량의 외부 여백(margin)이 자동 지정된다. 그리고 inline 요소의 상, 하 여백은 line-height 속성으로 지정한다.

- inline 요소 예

  - span

  - a

  - strong

  - img

  - br

  - input

  - select

  - textarea

  - button

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>My <span style="background-color:red; color:white;">Important</span> Heading</h1>
  </body>
</html>
```

### 2.1.3 inline-block 요소

block과 inline의 특징을 모두 갖는다. inline 요소 같이 한 줄에 표현되면서 width, height, margin 속성을 지정할 수 있다. 디폴트 표시값으로 inline-block 속성을 갖는 요소는 없다. inline-block 속성을 갖게 하려면 별도 지정이 필요하다.

- 기본적으로 inline 속성과 흡사하게 줄을 바꾸지 않고 다른 요소와 함께 한 행에 위치시킬 수 있다.

- block 속성처럼 width와 height, margin 속성을 정의할 수 있다. 상, 하 여백을 margin과 line-height 두가지 속성 모두를 통해 제어할 수 있다.

- inline-block 속성을 가진 태그끼리 연속으로 사용되는 경우에는 최소한의 간격을 유지하기 위해서 좌, 우에 약 5px 가량의 외부 여백(margin)이 자동 지정된다. margin-left나 margin-right를 사용하면 추가로 여백을 지정 가능하다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .floating-box {
        display: inline-block;
        width: 150px;
        height: 75px;
        margin: 10px;
        border: 3px solid #73AD21;
      }

      .after-box {
        border: 3px solid red;
      }
    </style>
  </head>
  <body>
    <div class="floating-box">Floating box</div>
    <div class="floating-box">Floating box</div>
    <div class="floating-box">Floating box</div>
    <div class="floating-box">Floating box</div>
    <div class="floating-box">Floating box</div>
    <div class="floating-box">Floating box</div>
    <div class="floating-box">Floating box</div>
    <div class="floating-box">Floating box</div>

    <div class="after-box">Another box, after the floating boxes...</div>
  </body>
</html>
```

## 2.2 표시 （Display）

### 2.2.1 display 속성

display 속성은 layout을 정의하기 위한 가장 중요한 CSS 속성이다.


| 속성값 키워드   | 설명                         |
|:-------------|:----------------------------|
| block        | block 속성 요소로 지정
| inline       | inline 속성 요소로 지정
| inline-block | inline-block 속성 요소로 지정
| none         | 해당 요소를 화면에 표시하지 않는다 (공간조차 사라진다)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      span {
        display: block;
        width: 150px;
        height: 75px;
        margin: 10px;
        border: 3px solid #73AD21;
      }
      li {
        display: inline;
      }
      div {
        display: inline-block;
        width: 150px;
        height: 75px;
        margin: 10px;
        border: 3px solid #73AD21;
      }
      .hidden {
        display: none;
      }
    </style>
  </head>
  <body>
    <h1>display: block</h1>

    <span>A display property with a value of "block" results in</span> <span>a line break between the two elements.</span>

    <h1>display: inline</h1>

    <ul>
      <li><a href="/html/default.asp" target="_blank">HTML</a></li>
      <li><a href="/css/default.asp" target="_blank">CSS</a></li>
      <li><a href="/js/default.asp" target="_blank">JavaScript</a></li>
    </ul>

    <h1>display: inline-block</h1>

    <div>This is a div</div>
    <strong>This is a strong</strong>

    <h1>display: none</h1>

    <h1 class="hidden">This is a hidden heading</h1>
    <p>Notice that the h1 element with display: none; does not take up any space.</p>
  </body>
</html>
```

### 2.2.2 visibility 속성

visibility 속성은 요소를 보이게 할 것인지 보이지 않게 할 것인지를 정의한다.

| 속성값 키워드   | 설명                         |
|:-------------|:----------------------------|
| visible      | 해당 요소를 보이게 한다 (기본값)
| hidden       | 해당 요소를 보이지 않게 한다. display 속성의 none 속성값과 다르게 해당 공간은 사라지지 않는다.
| collapse     | inline-block 속성 요소로 지정
| none         | 테이블 요소의 row나 column을 보이지 않게 한다. IE, 파이어폭스에서만 동작하며 크롬에서는 hidden과 동일하게 동작한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1.visible {
        visibility: visible
      }
      h1.hidden {
        visibility: hidden
      }

      table, td {
        border: 1px solid black;
      }
      tr.collapse {
        visibility: collapse;
      }
    </style>
  </head>
  <body>
    <h1 class="visible">This is a visible heading</h1>
    <h1 class="hidden">This is an invisible heading</h1>

    <table>
      <tr>
        <td>Peter</td>
        <td>Griffin</td>
      </tr>
      <tr class="collapse">
        <td>Lois</td>
        <td>Griffin</td>
      </tr>
    </table>
  </body>
</html>
```

### 2.2.3 opacity 속성

opacity 속성은 요소의 투명도를 정의한다. 0.0 ~ 1.0의 값을 입력하며 0.0은 투명, 1.0은 불투명을 의미한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div, img {
        background-color: blue;
        color: white;

        opacity: 0.5;
        filter: Alpha(opacity=50); /* IE8 and earlier */
      }

      div:hover, img:hover {
        opacity: 1.0;
        filter: alpha(opacity=100); /* For IE8 and earlier */
      }
    </style>
  </head>
    <body>
    <div>This element's opacity is 0.5! Note that both the text and the background-color are affected by the opacity level!</div>

    <h1>Image Transparency</h1>
    <img src="klematis.jpg" width="150" height="113" alt="klematis">
  </body>
</html>
```

## 2.3 박스 모델 (Box Model)

모든 HTML 요소는 박스 형태의 영역을 가지고 있다.

![typesetting](/img/typesetting.jpg)

CSS 박스 모델은 모든 HTML 요소를 감싸고 있는 margin, border, padding 속성을 의미한다.

![css box model](/img/box-model.png)

| 명칭     | 설명
|:--------|:-----------------------------------------------------------
| Content | 요소의 텍스트나 이미지 등의 내용이 위치하는 영역이다. width, height 속성을 갖는다.
| Padding | 테두리 내부 영역이다. 속성값은 두께를 의미하며 기본적으로 투명한 색을 갖는다.
| Border  | 테두리 영역이다. 속성값은 두께를 의미한다.
| Margin  | 테두리의 외부 영역이다. 기본적으로 투명한 색을 갖는다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        background-color: lightgrey;
        width: 300px;
        padding: 25px;
        border: 25px solid navy;
        margin: 25px;
      }
    </style>
  </head>
  <body>
    <h2>Demonstrating the Box Model</h2>

    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
  </body>
</html>
```

### 2.3.1 width / height 속성

width와 height 속성은 요소의 내용(content)가 위치하는 영역의 너비와 높이를 의미한다. 따라서 박스 전체 크기는 다음과 같이 계산할 수 있다.

- 전체 너비 = width + left padding + right padding + left border + right border + left margin + right margin

- 전체 높이 = height + top padding + bottom padding + top border + bottom border + top margin + bottom margin

### 2.3.2 margin / padding 속성

margin / padding 속성은 content의 4개 방향에 대하여 지정이 가능하다.

![box model detail](/img/box-model-detail.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        border:5px solid red;

        margin-top: 40px;
        margin-right: 30px;
        margin-bottom: 20px;
        margin-left: 10px;

        padding-top: 10px;
        padding-right: 20px;
        padding-bottom: 30px;
        padding-left: 40px;
      }
    </style>
  </head>
  <body>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
  </body>
</html>
```

-top, -right, -bottom, -left 4방향의 속성을 각각 지정하지 않고 margin, padding 1개의 속성만으로 4방향의 속성을 한번에 지정할 수 있다.

- 4개의 값을 지정할 때
  - margin: 25px 50px 75px 100px;
    - top margin : 25px
    - right margin : 50px
    - bottom margin : 75px
    - left margin : 100px

- 3개의 값을 지정할 때
  - margin: 25px 50px 75px;
    - top margin : 25px
    - right, left margin : 50px
    - bottom margin : 75px

- 2개의 값을 지정할 때
  - margin: 25px 50px;
    - top, bottom margin : 25px
    - right, left margin : 50px

- 1개의 값을 지정할 때
  - margin: 25px;
    - top, right, bottom, left margin : 25px


```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        border:5px solid red;

        margin:  40px 30px 20px 10px;
        padding: 10px 20px 30px 40px;
      }
    </style>
  </head>
  <body>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
  </body>
</html>
```

margin 속성에 `auto` 키워드를 설정하면 해당 요소를 브라우저 중앙에 위치 시킬 수 있다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        border:5px solid red;
        width: 600px;
        margin: auto;
      }
    </style>
  </head>
  <body>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
  </body>
</html>
```

브라우저 너비가 요소 너비보다 좁으면 가로 스크롤바가 만들어진다. 이 문제를 해결하기 위해서 `max-width` 속성을 사용할 수 있다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        border:5px solid red;
        max-width: 600px;
        margin: auto;
      }
    </style>
  </head>
  <body>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
  </body>
</html>
```

`max-width` 속성을 사용하면 브라우저 너비가 요소의 너비보다 좁아질 때 자동으로 요소의 너비가 줄어든다.

### 2.3.3 border 속성

Border Style

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      p.dotted { border-style: dotted; }
      p.dashed { border-style: dashed; }
      p.solid  { border-style: solid; }
      p.double { border-style: double; }
      p.groove { border-style: groove; }
      p.ridge  { border-style: ridge; }
      p.inset  { border-style: inset; }
      p.outset { border-style: outset; }
      p.none   { border-style: none; }
      p.hidden { border-style: hidden; }
      p.mix    { border-style: dotted dashed solid double; }
    </style>
  </head>
  <body>
    <h2>The border-style Property</h2>
    <p>This property specifies what kind of border to display:</p>

    <p class="dotted">A dotted border.</p>
    <p class="dashed">A dashed border.</p>
    <p class="solid">A solid border.</p>
    <p class="double">A double border.</p>
    <p class="groove">A groove border.</p>
    <p class="ridge">A ridge border.</p>
    <p class="inset">An inset border.</p>
    <p class="outset">An outset border.</p>
    <p class="none">No border.</p>
    <p class="hidden">A hidden border.</p>
    <p class="mix">A mixed border.</p>
  </body>
</html>
```

Border Width

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      p.one {
        border-style: solid;
        border-width: 5px;
      }
      p.two {
        border-style: solid;
        border-width: medium;
      }
      p.three {
        border-style: dotted;
        border-width: 2px;
      }
      p.four {
        border-style: dotted;
        border-width: thick;
      }
      p.five {
        border-style: double;
        border-width: 15px;
      }
      p.six {
        border-style: double;
        border-width: thick;
      }
      p.seven {
        border-style: solid;
        border-width: 2px 10px 4px 20px;
      }
    </style>
  </head>
  <body>
    <h2>The border-width Property</h2>
    <p>This property specifies the width of the four borders:</p>

    <p class="one">Some text.</p>
    <p class="two">Some text.</p>
    <p class="three">Some text.</p>
    <p class="four">Some text.</p>
    <p class="five">Some text.</p>
    <p class="six">Some text.</p>
    <p class="seven">Some text.</p>

    <p><b>Note:</b> The "border-width" property does not work if it is used alone.
    Always specify the "border-style" property to set the borders first.</p>
  </body>
</html>
```

Border Color

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      p.one {
        border-style: solid;
        border-color: red;
      }
      p.two {
        border-style: solid;
        border-color: green;
      }
      p.three {
        border-style: solid;
        border-color: red green blue yellow;
      }
    </style>
  </head>
  <body>
    <h2>The border-color Property</h2>
    <p>This property specifies the color of the four borders:</p>

    <p class="one">A solid red border</p>
    <p class="two">A solid green border</p>
    <p class="three">A solid multicolor border</p>
    <p><b>Note:</b> The "border-color" property does not work if it is used alone. Use the "border-style" property to set the borders first.</p>
  </body>
</html>
```

Border Radius

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        background: #eaeaed;
        color: #666;
        display: inline-block;
        width: 90px;
        height: 90px;
        line-height: 90px;
        margin: 0 14px;
        text-align: center;
      }

      .border-rounded {
        border-radius: 5px;
      }
      .border-circle {
        border-radius: 50%;
      }
      .border-football {
        border-radius: 15px 75px;
      }
    </style>
  </head>
  <body>
    <div class="border-rounded">5px</div>
    <div class="border-circle">50%</div>
    <div class="border-football">15px 75px</div>
  </body>
</html>
```

### 2.3.4 box-sizing 속성

| 키워드           | 설명
|:----------------|:-----------------------------------------------------------
| content-box     | width, height 속성값은 content 영역을 의미한다. (기본값)
| border-box      | width, height 속성값은 content 영역, padding, border가 포함된 값을 의미한다.

![box-sizing](/img/box-sizing.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .content-box {
        width: 600px;
        border: 10px solid;
        padding: 50px;
        margin: 50px;
        background-color: red;
      }
      .border-box {
        box-sizing: border-box;
        width: 600px;
        border: 10px solid;
        padding: 50px;
        margin: 50px;
        background-color: red;
      }
    </style>
  </head>
  <body>
  <div class="content-box">content-box</div>
  <div class="border-box">border-box</div>
</body>
</html>
```

## 2.4 배경 (Background)

해당 요소의 배경으로 이미지 또는 색상을 정의한다.

### 2.4.1 Background Image

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background-image: url("dot.png");
      }
      </style>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This page has an image as the background!</p>
  </body>
</html>
```

background-image에 복수개의 이미지를 설정할 경우, 먼저 설정된 이미지가 전면에 출력된다.

```css
background-image: url("front.png"), url("back.png");
```

설정된 이미지의 크기가 화면보다 작으면 자동으로 이미지가 반복 출력되어 화면을 채우게 된다. 이것은 `background-repeat` 속성의 기본값이 `repeat`이기 때문이다.

x축으로만 배경 이미지를 반복할 경우, `background-repeat` 속성값에 `repeat-x`, y축으로만 배경 이미지를 반복할 경우, `repeat-y`를 설정한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background-image: url("dot.png");
        background-repeat: repeat-x;
      }
      </style>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This page has an image as the background!</p>
  </body>
</html>
```

반복 출력을 멈추고 싶은 경우, `background-repeat` 속성값에 `no-repeat`를 설정한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background-image: url("dot.png");
        background-repeat: no-repeat;
      }
      </style>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This page has an image as the background!</p>
  </body>
</html>
```

배경 이미지의 크기를 조절하고 싶은 경우, `background-size` 속성을 사용한다. px값을 지정할 경우, 배경이미지 크기가 지정된 px값으로 조정되고 100%를 지정하며 화면 크기에 맞추어 이미지를 출력한다. 이때 지정한 값은 width를 의미한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background-image: url("dot.png");
        background-repeat: no-repeat;
        background-size: 100%;
      }
      </style>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This page has an image as the background!</p>
  </body>
</html>
```

배경이미지의 width, height를 모두 설정할 수 있다. 이때 첫번째 값은 width, 두번째 값은 height를 의미한다.

```html
background-size: 100% 500px;
```

이때 쉼표로 값을 구분하면 다른 배경이미지의 너비를 지정하는 것으로 인식된다.

```html
background-image: url("front.png"), url("back.png");
background-size: 100%, 500px;
```

화면을 스크롤하면 배경 이미지도 함께 스크롤된다. 화면이 스크롤되더라도 배경이미지는 스크롤되지 않고 고정되어 있게 하려면 `background-attachment` 속성에 `fixed` 키워드를 지정한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      background-image: url("background.jpg");
      background-size: 100% 100%;
      display: inline-block;
      width: 45%;
    }
    .fixed {
      background-attachment: fixed;
    }
  </style>
</head>
<body>

  <div>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
  </div>
  <div class='fixed'>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
    <p>The background-image is fixed. Try to scroll down the page.</p>
  </div>
</body>
</html>
```

### 2.4.2 Background Position

| 속성값	        | Description
|:--------------|:-----------------
| left top       | x축 y축
| left center    | x축 y축
| left bottom    | x축 y축
| right top      | x축 y축
| right center   | x축 y축
| right bottom   | x축 y축
| center top     | x축 y축
| center center  | x축 y축
| center         | center center
| bottom	       | bottom center
| x% y%          | x축 y축
| xpos ypos      | x축 y축

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        background-image: url('dot.png');
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
      }
    </style>
  </head>
  <body><div></div></body>
</html>
```

### 2.4.3 Background Color

```css
div {
  background-color:red;
  background-color:rgb(255,255,255);
}
```

## 2.5 폰트와 텍스트

폰트 및 텍스트 관련 속성은 폰트의 크기, 폰트의 지정, 폰트의 스타일, 텍스트 정렬 등을 정의한다.

### 2.5.1 font-size 속성

텍스트의 크기를 정의한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .font-size-40 { font-size: 40px; }
      .font-size-2x { font-size: 2.0em; }
      .font-size-150ps { font-size: 150%; }
      .font-size-large { font-size: large; }

    </style>
  </head>
  <body>
    <p>This is text: p tag's default font size: 16px</p>
    <p class='font-size-40'>This is text</p>
    <p class='font-size-2x'>This is text</p>
    <p class='font-size-150ps'>This is text</p>
    <p class='font-size-large'>This is text</p>
  </body>
</html>
```

### 2.5.2 font-family 속성

폰트를 지정한다. 컴퓨터에 폰트가 설치되어 있지 않으면 적용되지 않는다. 폰트는 복수개 지정이 가능한데 첫번째 지정한 폰트가 클라이언트 컴퓨터에 설치되어 있지 않은 경우, 다음에 지정된 폰트를 적용한다. 따라서 마지막에 지정하는 폰트는 대부분의 OS에 기본적으로 설치되어 있는 generic-family 폰트(Serif, Sans-serif, Mono space)를 지정하는 것이 일반적이다.

다음은 맥용 크롬 브라우저의 generic-family 폰트 설정 화면이다.

![Chrome generic-family font](/img/generic-family-font.png)

폰트명은 따옴표로 감싸주며 폰트명이 한단어인 경우는 따옴표로 감싸주지 않아도 된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      p.serif {
        font-family: "Times New Roman", Times, serif;
      }

      p.sansserif {
        font-family: Arial, Helvetica, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>CSS font-family</h1>
    <p class="serif">This is a paragraph, shown in the Times New Roman font.</p>
    <p class="sansserif">This is a paragraph, shown in the Arial font.</p>
  </body>
</html>
```

### 2.5.2 font-style / font-weight 속성

font-style 속성은 이탤릭체의 지정, font-weight 속성은 폰트 굵기 지정에 사용된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      p { font-size: 2.0em; }

      /* font-style */
      .italic {
        font-style: italic;
      }

      /* font-weight */
      .light {
        font-weight: lighter;
      }
      .thick {
        font-weight: bold;
      }
      .thicker {
        font-weight: 900;
      }
    </style>
  </head>
  <body>
    <p>normal style.</p>
    <p class="italic">font-style: italic</p>

    <p class="light">font-weight: lighter</p>
    <p class="thick">font-weight: bold</p>
    <p class="thicker">font-weight: 900</p>
  </body>
</html>
```

### 2.5.3 line-height 속성

텍스트의 높이를 지정한다. 텍스트 수직 정렬에도 응용되어 사용된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .small {
        line-height: 70%;
      }
      .big {
        line-height: 200%;
      }
    </style>
  </head>
  <body>
    <p>
    This is a paragraph with a standard line-height.<br>
    This is a paragraph with a standard line-height.<br>
    The default line height in most browsers is about 110% to 120%.<br>
    </p>

    <p class="small">
      This is a paragraph with a smaller line-height.<br>
      This is a paragraph with a smaller line-height.<br>
    </p>

    <p class="big">
      This is a paragraph with a bigger line-height.<br>
      This is a paragraph with a bigger line-height.<br>
    </p>
  </body>
</html>
```

다음은 수직 중앙 정렬 예제이다. a 요소의 `line-height` 값과 a 요소를 감싸는　div 요소의 `height` 값을 일치시킨다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .button {
        width: 150px;
        height: 70px;
        background-color: #FF6A00;
        border: 10px solid #FFFFFF;
        border-radius: 30px;
        box-shadow: 5px 5px 5px #A9A9A9;
      }
      .button > a {
        display: block;
        font-size: 2em;
        font-style: italic;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        line-height: 70px;
      }
    </style>
  </head>
  <body>
    <div class="button">
      <a href="#">Click</a>
    </div>
  </body>
</html>
```

### 2.5.4 text-align 속성

텍스트의 수평 정렬을 정의한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        text-align: center;
      }
      h3 {
        text-align: right;
      }
      p {
        text-align: left;
      }
      a {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Understanding Node.js</h1>
    <h3>2016.03.07</h3>
    <p>As developers, we often face situations where we need to use unfamiliar code. A question will arise during these moments. How much time should I invest in understanding the code that I’m about to use? A typical answer is learn enough to start coding; then explore that topic further when time permits. Well, the time has come to gain a better understanding of module.exports and exports in Node.js. Here’s what I have learned.</p>

    <a href='#'>Reference</a>
  </body>
</html>
```

위 예제의 a 요소에 대한 중앙 정렬은 적용되지 않았다. 이는 a 요소는 inline 요소이기 때문이다. inline 요소는 width 속성이 없으므로 중앙 개념이 존재하지 않는다. a 요소에 `display: block;`을 지정한다면 중앙 정렬이 가능할 것이다.

### 2.5.5 text-decoration 속성

text-decoration 속성을 사용하여 링크 underline을 제거할 수 있다. 또는 텍스트에 underline, overline, line-through를 추가할 수도 있다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      a { text-decoration: none; }

      p:nth-of-type(1) { text-decoration: overline; }
      p:nth-of-type(2) { text-decoration: line-through; }
      p:nth-of-type(3) { text-decoration: underline; }
    </style>
  </head>
  <body>
    <a href='#'>text-decoration: none</a>

    <p>text-decoration: overline</p>
    <p>text-decoration: line-through</p>
    <p>text-decoration: underline</p>
  </body>
</html>
```

## 2.6 Shadow Effect

text-shadow 속성은 텍스트에 그림자 효과를 지정한다.

```
text-shadow: h-shadow(오른쪽) v-shadow(아래) blur-radius(흐림정도) color
```

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        color: white;
        text-shadow: 2px 2px 4px #000000;
      }
    </style>
  </head>
  <body>
    <h1>Text-shadow on white text</h1>
  </body>
</html>
```

box-shadow 속성은 박스에 그림자 효과를 지정한다.

```
box-shadow: h-shadow v-shadow blur spread color
```

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        width: 300px;
        height: 100px;
        background-color: yellow;
        box-shadow: 10px 10px 5px #888888;
      }
    </style>
  </head>
  <body>
    <div></div>
  </body>
</html>
```

다음과 같은 툴을 사용하여 간단히 작성할 수 있다. (Rounded Corner, Gradient...)

* [css3generator.com](http://www.css3generator.com/)  
* [css3gen.com/](http://css3gen.com/)  
* [cssmatic.com](http://www.cssmatic.com/box-shadow)

## 2.7 위치 (Position)

### 2.7.1 position

position 속성은 요소의 위치를 정의한다. top, bottom, left, right 속성과 함께 사용하여 위치를 지정한다.

![position](/img/position.png)

**absolute 또는 fixed로 position 설정시, block 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 주의하여야 한다.** 또한 position 속성은 상속되지 않는다.

| 속성값	      | Description
|:-----------|:-----------------
| static     | 위에서 아래로, 왼쪽에서 오른쪽으로 순서에 따라 배치된다.(기본값)
| relative   | 기본 위치(static으로 지정되었을 때의 위치)에서 좌표 속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다.(상대위치)
| absolute   | 부모 혹은 조상 요소중에 relative 속성이 선언된 요소를 기준으로 좌표속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다.(절대위치)
| fixed      | viewport를 기준으로 좌표속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다. 스크롤이 되더라도 화면에서 사라지지 않고 같은 곳에 위치한다.(고정위치)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        color: #fff;
        font-weight: 600;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
        border: 1px solid #bcbcbc;
        border-radius: 6px;
        height: 80px;
        padding: 20px;
      }
      #box1 {
        position: static;
        top:20px; right:30px;
        background: #2db34a;
      }
      #box2 {
        position: absolute;
        top:20px; right:30px;
        background: #F44336;
      }
      #box3 {
        position: relative;
        top:20px; left:30px;
        background: #795548;
      }
      #box4 {
        position: fixed;
        bottom:20px; right:30px;
        background: #673AB7;
      }
    </style>
  </head>
  <body>
    <div id="box1">static; top:20px; right:30px;</div>
    <div id="box2">absolute; top:20px; right:30px;</div>
    <div id="box3">relative; top:20px; left:30px;</div>
    <div id="box4">fixed; bottom:20px; right:30px; </div>
  </body>
</html>
```

#### 2.7.1.1 static (기본위치)

위에서 아래로, 왼쪽에서 오른쪽으로 순서에 따라 배치된다. 이는 static 속성을 지정하지 않았을 때와 같다. 부모 요소 내에 존재할 때는 부모 요소의 위치를 기준으로 배치된다.

기본적으로 이 속성을 지정할 일은 없지만 이전에 설정된 position을 무력화하기 위해 사용될 수 있다. 좌표속성(top, bottom, left, right)을 같이 사용할 수 없다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        color: #fff;
        font-weight: 600;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
        border: 1px solid #bcbcbc;
        border-radius: 6px;
        height: 100%;
        padding: 20px;
        background: #bcbcbc;
      }
      .static-box {
        position: static;
        background: #2db34a;
      }
    </style>
  </head>
  <body>
    <h1>Static</h1>
    <div>
      parent
      <div class="static-box">static box</div>
      <div class="static-box">static box</div>
    </div>
    <div class="static-box">static box</div>
    <div class="static-box">static box</div>
  </body>
</html>
```

#### 2.7.1.2 relative (상대위치)

기본 위치(static으로 지정되었을 때의 위치)에서 좌표 속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다. 부모 요소 내에 존재할 때는 부모 요소의 위치를 기준으로 배치된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        color: #fff;
        font-weight: 600;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
        border: 1px solid #bcbcbc;
        border-radius: 6px;
        height: 100%;
        padding: 20px;
        background: #bcbcbc;
      }
      .relative-box {
        position: relative;
        background: #2db34a;
        top: 50px; left: 50px;
      }
    </style>
  </head>
  <body>
    <h1>Relative</h1>
    <div>
      parent
      <div class="relative-box">relative box</div>
      <div class="relative-box">relative box</div>
    </div>
    <div class="relative-box">relative box</div>
    <div class="relative-box">relative box</div>
  </body>
</html>
```

#### 2.7.1.3 absolute (절대위치)

부모 혹은 조상 요소중에 relative 속성이 선언된 가장 가까운 요소를 기준으로 좌표속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다. 이때 다른 요소가 먼저 위치를 점유하고 있어도 뒤로 밀리지 않고 덮어쓰게 된다. (이런 특성을 부유 또는 부유 객체라 한다)

***부모 또는 조상 요소에 relative 속성이 선언되어 있으면 그 요소를 기준으로 하여 좌표 속성(top, bottom, left, right)만큼 이동한다. 따라서 부모 요소를 배치의 기준으로 삼기 위해서는 부모 요소에 relative 속성을 정의하여야 한다. relative 속성이 선언되어 있는 부모 요소가 없다면 부모 요소와 관계없이 document body를 기준으로 하여 좌표 속성대로 위치하게 된다.***

***absolute 속성 선언 시, block 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 주의하여야 한다.*** 또한 position 속성은 상속되지 않는다.

실제 웹페이지 개발에 사용하는 경우는 드물다(바람직하지 않다)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        color: #fff;
        font-weight: 600;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
        border: 1px solid #bcbcbc;
        border-radius: 6px;
        height: 100%;
        padding: 20px;
        background: #bcbcbc;
        position: relative;
      }
      .absolute-box1 {
        position: absolute;
        background: #2db34a;
        top: 50px; left: 50px;
      }
      .absolute-box2 {
        position: absolute;
        background: #2db34a;
        top: 100px; left: 100px;
      }
      .absolute-box3 {
        position: absolute;
        background: #2db34a;
        bottom: 50px; right: 50px;
      }
      .absolute-box4 {
        position: absolute;
        background: #2db34a;
        bottom: 100px; right: 100px;
      }
    </style>
  </head>
  <body>
    <h1>Absolute</h1>
    <div>
      parent
      <div class="absolute-box1">absolute box1</div>
      <div class="absolute-box2">absolute box2</div>
      <div class="absolute-box3">absolute box3</div>
      <div class="absolute-box4">absolute box4</div>
    </div>
    <div class="absolute-box3">absolute box3</div>
    <div class="absolute-box4">absolute box4</div>
  </body>
</html>
```

#### 2.7.1.4 fixed (고정위치)

부모 요소와 관계없이 브라우저의 viewport를 기준으로 좌표속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다. 스크롤이 되더라도 화면에서 사라지지 않고 항상 같은 곳에 위치한다. ***fixed 속성 선언 시, block 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 주의하여야 한다.***

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { margin: 0; }
      div {
        color: #fff;
        font-weight: 600;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
        border: 1px solid #bcbcbc;
        border-radius: 6px;
        height: 100%;
        padding: 20px;
        background: #bcbcbc;
        position: relative;
      }
      .fixed-box1 {
        position: fixed;
        background: #2db34a;
        bottom: 0; left: 0;
        width: 300px; height: 50px;
      }
      .fixed-box2 {
        position: fixed;
        background: #2db34a;
        bottom: 50px; right: 50px;
        width: 300px; height: 50px;
      }
    </style>
  </head>
  <body>
    <h1>Absolute</h1>
    <div>
      parent
      <div class="fixed-box1">fixed box1</div>
    </div>
    <div class="fixed-box2">fixed box2</div>
  </body>
</html>
```

### 2.7.2 z-index

z-index 속성에 큰 숫자값을 지정할 수록 화면 전면에 출력된다.

![z-index](/img/z-index.jpeg)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .box {
        width: 100px; height: 100px;
        position: absolute;
      }
      .red {
        background-color: red;
        left: 10px; top: 10px;
        z-index: 100;
      }
      .green {
        background-color: green;
        left: 50px; top: 50px;
        z-index: 10;
      }
      .blue {
        background-color: blue;
        left: 90px; top: 90px;
        z-index: 1;
      }
    </style>
  </head>
  <body>
    <div class="box red"></div>
    <div class="box green"></div>
    <div class="box blue"></div>
  </body>
</html>
```

### 2.7.3 overflow

overflow 속성은 자식 요소가 부모 요소의 영역를 벗어났을 때 처리 방법을 정의한다.

| 속성값	     | Description
|:----------|:-----------------
| visible   | 영역을 벗어난 부분을 표시한다. (기본값)
| hidden    | 영역을 벗어난 부분을 잘라내어 보이지 않게 한다.
| scroll    | 영역을 벗어난 부분이 없어도 스크롤 표시한다.(현재 대부분 브라우저는 auto과 동일하게 작동한다)
| auto      | 영역을 벗어난 부분이 있을때만 스크롤 표시한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        color: #fff;
        font-weight: 600;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
        border: 1px solid #bcbcbc;
        border-radius: 6px;
        height: 200px;
        padding: 20px;
        background: #bcbcbc;
        position: relative;
        overflow: scroll;
      }
      .absolute-box1 {
        position: absolute;
        background: #2db34a;
        top: 100px; left: 50px;
        height: 150px;
      }
      .absolute-box2 {
        position: absolute;
        background: #F44336;
        top: 150px; left: 100px;
        height: 150px;
      }
    </style>
  </head>
  <body>
    <h1>Absolute</h1>
    <div>
      parent
      <div class="absolute-box1">absolute box1</div>
      <div class="absolute-box2">absolute box2</div>
    </div>
  </body>
</html>
```

특정 방향으로만 스크롤을 표시하고자 할 때는 overflow-x 또는 overflow-y 속성을 사용한다.

```css
div { overflow-y: scroll; }
```

## 2.8 float

float 속성은 주로 layout을 구성하기 위해 사용되는 핵심 기술이다. layout의 가장 큰 목적은 1개 이상의 block 속성 요소를 원하는 위치에 정렬시키는 것이다.

![CSS Grid Layout example](/img/layout.png)

float 속성은 다음 예제와 같이 이미지 주위를 텍스트로 감싸기 위해 만들어진 것이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      img { float: right; }
    </style>
  </head>
  <body>
    <img src="klematis.jpg">
    <p>The float property was originally designed to allow content to wrap around images. An image could be floated, and all of the content surrounding that image could then naturally flow around it. Although this works great for images, the float property was never actually intended to be used for layout and positioning purposes, and thus it comes with a few pitfalls.One of those pitfalls is that occasionally the proper styles will not render on an element that it is sitting next to or is a parent element of a floated element. When an element is floated, it is taken out of the normal flow of the page, and, as a result, the styles of elements around that floated element can be negatively impacted. Often margin and padding property values arent interpreted correctly, causing them to blend into the floated element; other properties can be affected, too. Another pitfall is that sometimes unwanted content begins to wrap around a floated element. Removing an element from the flow of the document allows all the elements around the floated element to wrap and consume any available space around the floated element, which is often undesired.</p>
  </body>
</html>
```

float 속성은 해당 요소를 떠 있게 한다. 여기서 떠 있다(float)는 의미는 요소가 기본 레이아웃 흐름에서 벗어나 요소의 모서리가 페이지의 왼쪽이나 오른쪽에 이동하는 것이다. float 속성을 사용할 때 요소의 위치가 고정시키는 position 속성의 absolute를 사용하면 안된다.

| 속성값	     | Description
|:----------|:-----------------
| none      | 요소를 떠 있게 하지 않는다. (기본값)
| right     | 요소를 오른쪽으로 이동시킨다
| left      | 요소를 왼쪽으로 이동시킨다.
| inherit   | 요소를 감싸는 부모 요소의 float 속성을 상속받는다.

![css float](/img/float.png)

### 2.8.1 정렬

float 속성을 사용하지 않은 블록 요소들은 수직으로 정렬된다. `float:left;` 속성을 사용하면 왼쪽부터 정렬되고, `float:right;` 속성을 사용하면 오른쪽부터 정렬된다.

오른쪽 정렬의 경우, 먼저 기술된 요소가 가장 오른쪽에 출력되므로 출력 순서가 역순이 된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div{
        color: white;
        font-weight: 600;
        font-size: 50px;
        border-radius: 6px;
        background: #bcbcbc;
        width: 200px;
        height: 200px;
        margin: 10px 10px;
        padding: 10px;
      }
      #content1 {
        /*float: left;*/
        float: right;
        background: red;
      }
      #content2 {
        /*float: left;*/
        float: right;
        background: orange;
      }
    </style>
  </head>
  <body>
    <div id="content1"> 1 </div>
    <div id="content2"> 2 </div>
  </body>
</html>
```

float 속성은 좌측, 우측 정렬만 할 수 있다. 중앙 정렬은 margin 속성을 사용해야 한다.

```css
div {
  width: 960px;
  margin: 0 auto;
}
```

width값을 지정하지 않은 block 속성 요소는 기본적으로 `width: 100%`가 된다. 이때 block 속성 요소에 float 속성이 선언되면 width가 inline 요소와 같이 content에 맞게 최소화되고 남는 공간에 다음 요소가 위치한다. 다음요소에 float 속성이 선언되지 않았다면 다음요소는 남은 공간을 가득 채운다.

![float lineup](/img/float-lineup.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        color: white;
        margin: 0 10px;
        padding: 20px;
      }
      .d1 {
      	background-color: #59b1f6;
      	float: left;
      }
      .d2 {
      	background-color: #ffb5b4;
      }
    </style>
  </head>
    <body>
    <div class="d1">dv1</div>
    <div class="d2">dv2</div>
  </body>
</html>
```

### 2.8.2 float 속성 문제 해결

#### 2.8.2.1 float 속성이 선언되지 않은 요소의 문제

위 예제를 보면 두 요소간 margin이 있어야 한다. 그러나 결과는 그렇지 않다.

![float problem](/img/float-problem1.png)

이것은 두번째 요소에 float 속성을 선언하지 않았기 때문에 발생하는 박스 모델 상의 문제이다. 이 문제를 해결하는 가장 쉬운 방법은 float 속성을 선언하지 않은 요소에 `overflow: hidden` 속성을 선언하는 것이다.

`overflow: hidden` 속성은 자식 요소가 부모 요소의 영역보다 클 경우 넘치는 부분을 안보이게 해주는 역할을 하는데 여기서는 float 속성이 없어서 제대로 표현되지 못하는 요소를 제대로 출력해준다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        color: white;
        margin: 0 10px;
        padding: 20px;
      }
      .d1 {
      	background-color: #59b1f6;
      	float: left;
      }
      .d2 {
      	background-color: #ffb5b4;
        overflow: hidden;
      }
    </style>
  </head>
    <body>
    <div class="d1">dv1</div>
    <div class="d2">dv2</div>
  </body>
</html>
```

두번째 요소에도 float 속성을 선언하면 `overflow: hidden` 속성은 선언하지 않아도 되지만  너비가 최소화된다.

#### 2.8.2.2 float 속성이 선언된 요소 간의 문제

아래 예제를 보면 float 속성이 선언된 두개의 자식 요소를 포함하는 부모 요소의 높이가 정상적인 값을 가지지 못하는 문제가 발생한다.

![float problem](/img/float-problem2.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .wrap {
        color: white;
        text-align: center;
        padding: 10px;
        background-color: #def0c2;
      }
      .d1 {
        float: left;
        width: 49%;
        margin-right: 2%;
        padding: 20px 0;
        background-color: #59b1f6;

      }
      .d2 {
        float: left;
        width: 49%;
        padding: 20px 0;
        background-color: #ffb5b4;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="d1">dv1</div>
      <div class="d2">dv2</div>
    </div>
  </body>
</html>
```

d1, d2 모두 `float: left` 속성을 가지고 있으므로 `overflow: hidden` 속성을 선언할 필요는 없다. 문제는 d1과 d2를 감싸고 있는 wrap이다. 요소를 감싸는 wrap 요소는 자식요소가  모두 float 속성을 가지고 있으면 정상적인 높이 값을 가지지 못하는 현상이 발생한다. 이 문제는 wrap 요소 이후에 위치하는 요소의 정렬에 문제를 발생시킨다.

이 문제를 해결하는 가장 쉬운 방법은 float 속성을 가진 요소의 부모 요소(wrap)에 `overflow: hidden` 속성을 선언하는 것이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .wrap {
        color: white;
        text-align: center;
        padding: 10px;
        background-color: #def0c2;
        overflow: hidden;
      }
      .d1 {
        float: left;
        width: 49%;
        margin-right: 2%;
        padding: 20px 0;
        background-color: #59b1f6;

      }
      .d2 {
        float: left;
        width: 49%;
        padding: 20px 0;
        background-color: #ffb5b4;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="d1">dv1</div>
      <div class="d2">dv2</div>
    </div>
  </body>
</html>
```

### 2.8.3 Layout

#### 2.8.3.1 2-Column Layout

![2-column-layout](/img/2-column-layout.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        max-width: 960px;
        margin: 0 auto;
        color: white;
      }
      header {
        padding: 10px;
        background-color: #FF9900;
      }
      nav {
        padding: 10px;
        background-color: #CC6600;
      }
      #wrap {
        padding: 10px;
        background-color: #def0c2;
        overflow: hidden;
      }
      section {
        float: left;
        width: 65%;
        padding: 2%;
        background-color: #59b1f6;
      }
      aside {
        float: right;
        width: 25%;
        padding: 2%;
        background-color: #C13100;
      }
      footer {
        padding: 10px;
        background-color: #003366;
      }
    </style>
  </head>
  <body>
    <header><h1>Header</h1></header>
    <nav><h1>Navigation</h1></nav>
    <div id="wrap">
      <section>
        <h1>Section</h1>
        <p>London is the capital city of England. It is the most populous city in the United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
        <p>Standing on the River Thames, London has been a major settlement for two millennia,its history going back to its founding by the Romans, who named it Londinium.</p>
        <p>London, also referred to as Greater London, is one of 9 regions of England and the top-level subdivision covering most of the city's metropolis. The small ancient City of London at its core once comprised the whole settlement, but as its urban area grew, the Corporation of London resisted attempts to amalgamate the city with its suburbs, causing "London" to be defined in a number ways for different purposes.</p>
      </section>
      <aside>
        <h1>Aside</h1>
        <ul>
          <li>London</li>
          <li>Paris</li>
          <li>Tokyo</li>
        </ul>
      </aside>
    </div>
    <footer><h1>Footer</h1></footer>
  </body>
</html>
```

#### 2.8.3.2 3-Column Layout

![3-column-layout](/img/3-column-layout.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        max-width: 960px;
        margin: 0 auto;
        color: white;
      }
      header {
        padding: 10px;
        background-color: #FF9900;
      }
      nav {
        padding: 10px;
        background-color: #CC6600;
      }
      #wrap {
        padding: 10px;
        background-color: #def0c2;
        overflow: hidden;
      }
      aside.left {
        float: left;
        width: 20%;
        padding: 2%;
        background-color: #C13100;
      }
      section {
        float: left;
        width: 44%;
        margin: 0 2%;
        padding: 2%;
        background-color: #59b1f6;
      }
      aside.right {
        float: right;
        width: 20%;
        padding: 2%;
        background-color: #C13100;
      }
      footer {
        padding: 10px;
        background-color: #003366;
      }
    </style>
  </head>
  <body>
    <header><h1>Header</h1></header>
    <nav><h1>Navigation</h1></nav>
    <div id="wrap">
      <aside class="left">
        <h1>Aside</h1>
        <ul>
          <li>London</li>
          <li>Paris</li>
          <li>Tokyo</li>
        </ul>
      </aside>
      <section>
      <h1>Section</h1>
        <p>London is the capital city of England. It is the most populous city in the United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
        <p>Standing on the River Thames, London has been a major settlement for two millennia,its history going back to its founding by the Romans, who named it Londinium.</p>
        <p>London, also referred to as Greater London, is one of 9 regions of England and the top-level subdivision covering most of the city's metropolis. The small ancient City of London at its core once comprised the whole settlement, but as its urban area grew, the Corporation of London resisted attempts to amalgamate the city with its suburbs, causing "London" to be defined in a number ways for different purposes.</p>
      </section>
      <aside class="right">
        <h1>Aside</h1>
        <ul>
          <li>London</li>
          <li>Paris</li>
          <li>Tokyo</li>
        </ul>
      </aside>
    </div>
    <footer><h1>Footer</h1></footer>
  </body>
</html>
```

# 3. Layout

이전에는 table을 사용하여 layout을 만들기도 하였으나 html과 css의 본연의 취지와도 맞지 않을 뿐더러 반응형 웹 페이지 작성이 곤란하며 코드의 양 또한 많아져 현재는 거의 사용하지 않는다. 모던한 웹 페이지는 style과 layout을 담당하는 CSS를 사용하여 layout을 구성하는 것이 일반적이다.

layout의 핵심은 블록 특성의 요소들을 원하는 위치에 배열하는 것이다.

![layout-samples](/img/layout-samples.png)

모바일 사용자가 데스크탑 사용자보다 많은 상황을 감안하여 화면의 크기에 따라 적절히 화면 구성을 변화시키는 반응형 웹 디자인(Responsive Web Design) 또한 모던 웹 사이트의 필수 사항이 되었다.

![responsive-web-design-sample](/img/responsive-web-design-samples.png)

CSS를 사용하여 layout을 구성할 때에 자주 사용되는 핵심 기술은 `float`이다. 다음은 전형적인 웹사이트의 layout이다.

![layout-default](/img/layout-default.png)

layout이란 웹사이트를 구성하는 요소들을 배치할 공간을 분할하여 정렬하는 것이다. 공간을 분할할 때는 일반적으로 행을 구분한 후, 행 내부 요소를 분리한다.

아래 예제는 단순한 2 column layout의 골격이다.

```html
<!DOCTYPE html>
<html>
  <body>
    <header>
      <nav></nav>
    </header>
    <div id="wrap">
      <section></section>
      <aside></aside>
    </div>
    <footer></footer>
  </body>
</html>
```

## 3.1 Navigation Bar

대부분의 웹사이트는 Navigation Bar를 가지고 있다. Navigation Bar는 웹사이트의 필수 구성 요소라고 할 수 있을 것이다.

Navigation Bar는 기본적으로 링크들의 리스트이다. 따라서 ul, li tag를 이용하여 작성한다.

다음은 최소한의 Reset CSS를 추가한 링크들의 리스트이다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#news">News</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </body>
</html>
```

## 3.1 2-Column Layout








# 4. Responsive Web Design

사용자가 어떤 디바이스로 웹사이트를 방문할 지 알 수 없다. layout은 방문자의 모니터의 화면 해상도를 고려하여야 한다. 가로폭이 너무 큰 layout을 작성하면 작은 해상도 모니터로 방문하였을 때 가로 스크롤이 생겨서 사용이 불편할 수도 있다.

또한 스마트폰이나 태블릿 등 모바일 기기는 화면이 작기 때문에 가독성에 더욱 신경써야 한다. 보통 웹사이트가 축소되어 가로 스크롤 없이 컨텐츠를 볼 수 있으나 글자가 너무 작아지기 때문이다.

이러한 문제를 해결하는 방법 중의 하나가 반응형 웹디자인(Responsive Web Design)이다. 화면 해상도에 따라 가로폭이나 배치를 변경하여 가독성을 높이는 것이다.

# 4.1 viewport meta tag

viewport란 웹페이지의 가시영역을 의미한다. viewport는 디바이스에 따라 차이가 있다. 예를 들어 모바일 브라우저는 윈도우 resize가 불가하고 화면 터치를 사용하는 등 데스크탑 브라우저와 구성이나 형태가 다르다. 또한 모바일의 화면은 데스크탑 화면보다 훨씬 작으므로 데스크탑용 웹페이지를 그대로 모바일에 출력하면 가독성이 현저히 나빠진다. 따라서 viewport를 이용하여 디바이스의 특성과 디바이스의 화면 크기 등을 고려하여 각종 디바이스 사용자에게 최적화된 웹페이지를 제공할 수 있다.

![viewport](/img/viewport.png)

[meta tag](http://ungmo2.github.io/html/HTML5-Tag/#meta)는 메타데이터를 브라우저 혹은 검색엔진에게 전달하기 위해 사용된다. viewport meta tag는 브라우저의 화면 설정과 관련된 정보를 제공한다.

| 속성	          | Description      | 사용예
|:---------------|:-----------------|:--------------
| width          | viewport 너비(px) | width=240
|                |                  | width=device-width
| height         | viewport 높이(px) | height=800
|                |                  | width=device-height
| initial-scale  | viewport초기 배율  | initial-scale=1.0
| user-scale     | 확대 축소 가능 여부  | user-scale=no
| maximum-scale  | 최대 화면 배율      | maximum-scale=2.0
| minimum-scale  | 최소 화면 배율      | minimum-scale=1.0


```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

# 4.2 `@media` 속성

반응형 웹디자인에 사용되는 핵심 기술은 `@media`이다.

## 4.1




----->CSS3
## Transitions

## Animations

## Media Queries
----->CSS3










# Reference

* [w3schools.com](http://www.w3schools.com)

* [Learn to Code HTML & CSS](http://learn.shayhowe.com/)

* [W3C CSS Document](https://www.w3.org/TR/CSS/)

* [positioning : Float](http://beautifulcss.com/archives/787)
