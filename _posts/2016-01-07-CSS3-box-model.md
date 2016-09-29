---
layout: post
title: CSS3 박스 모델 (Box Model)
categories: css
---

모든 HTML 요소는 박스 형태의 영역을 가지고 있다. 박스 형태는 사각형을 의미하므로 너비와 높이로 요소의 영역을 표현할 수 있다.

![typesetting](/img/typesetting.jpg)
{: style="max-width:500px; margin: 10px auto;"}

CSS 박스 모델은 모든 HTML 요소를 감싸고 있는 margin, border, padding 속성을 의미한다.

![css box model](/img/box-model.png)
{: style="max-width:500px; margin: 10px auto;"}

브라우저는 박스 모델의 크기(dimension)와 속성(색, 배경, 모양 등), 위치를 근거로 하여 렌더링을 실시하게 된다.

웹디자인은 컨텐츠를 담을 [박스 모델을 정의](http://ungmo2.github.io/css/CSS3-Property/#display)하고 CSS 속성을 통해 스타일([배경](http://ungmo2.github.io/css/CSS3-Property/#background), [폰트와 텍스트](http://ungmo2.github.io/css/CSS3-Property/#section-4) 등)과 [위치](http://ungmo2.github.io/css/CSS3-Property/#position) 및 [정렬](http://ungmo2.github.io/css/CSS3-Property/#float)을 부여하는 것이라고 할 수 있다.

| 명칭     | 설명
|:--------|:-----------------------------------------------------------
| Content | 요소의 텍스트나 이미지 등의 실제 내용이 위치하는 영역이다. width, height 속성을 갖는다.
| Padding | 테두리(Border) 안쪽에 위치하는 요소의 내부 여백 영역이다. 속성값은 패딩 영역의 두께를 의미하며 기본적으로 투명한 색을 갖는다. 요소에 적용된 배경의 컬러, 이미지는 패딩 영역까지 적용된다.
| Border  | 테두리 영역으로 속성값은 테두리의 두께를 의미한다.
| Margin  | 테두리(Border) 바깥에 위치하는 요소의 외부 여백 영역이다. 속성값은 마진 영역의 두께를 의미한다. 기본적으로 투명(transparent)이며 배경색을 지정할 수 없다.

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
  <h2>Box Model</h2>

  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
</body>
</html>
```

* TOC
{:toc}

# 1. width / height 속성

width와 height 속성은 요소의 내용(content)가 위치하는 영역의 너비와 높이를 의미한다. 따라서 박스 전체 크기는 다음과 같이 계산할 수 있다.

- 전체 너비 = width + left padding + right padding + left border + right border + left margin + right margin

- 전체 높이 = height + top padding + bottom padding + top border + bottom border + top margin + bottom margin

width / height 속성은 상속되지 않는다.

# 2. margin / padding 속성

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

요소 너비가 브라우저 너비보다 크면 가로 스크롤바가 만들어진다. 이 문제를 해결하기 위해서 `max-width` 속성을 사용할 수 있다.

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

# 3. border 속성

[Border Style](https://developer.mozilla.org/ko/docs/Web/CSS/border-style)

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

[Border Width](https://developer.mozilla.org/ko/docs/Web/CSS/border-width)

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

[Border Color](https://developer.mozilla.org/ko/docs/Web/CSS/border-color)

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

[Border Radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)

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
        /* Radius is set for all 4 sides */
        border-radius: 5px;
      }
      .border-circle {
        border-radius: 50%;
      }
      .border-football {
        /* top-left-and-bottom-right | top-right-and-bottom-left */
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

[Border Shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/border)

Syntax

```
border: border-width border-style border-color;
```

```css
p {
  border: 5px solid red;
}
```

# 4. box-sizing 속성

box-sizing 속성은 CSS Layout을 직관적으로 사용할 수 있게 한다. 즉 padding, border, margin을 제외한 값인 width, height 속성을 content 영역, padding, border가 포함된 값으로 사용할 수 있게한다.

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

box-sizing 속성은 상속되지 않는다. 따라서 box-sizing 속성을 사용하도록 초기화하려면 아래와 같이 정의한다.

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

<!--
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
    }
    div {
      box-sizing: border-box;
      width: 50%;
      height: 100px;
      float: left;
      background-color: rgba(255, 0, 0, 0.5);
      border: 1px solid black;
    }
  </style>
</head>
<body>
  <div></div>
  <div></div>
</body>
</html>
```
-->


# Reference

* [W3C CSS Document](https://www.w3.org/TR/CSS/)
