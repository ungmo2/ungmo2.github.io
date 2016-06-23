---
layout: post
title: CSS3 Property
categories: css
---

* TOC
{:toc}

# 1. CSS 속성값(Property Values)의 표현

CSS 속성값은 키워드, 크기 단위, 색상 표현 단위 등의 특정 단위를 갖는다.

![css selector](/img/css-syntax.png)

Rule Set
{: style="color:gray; font-size: 80%; text-align: center; margin-top: 5px;"}

## 1.1 키워드

각 속성에 따라 별도의 키워드가 존재한다. 예를 들어 [display 속성](http://ungmo2.github.io/css/CSS3-Property/#display-)의 속성값으로 사용할 수 있는 키워드는 block, inline, inline-block, none이 있다. 자세한 내용은 각각의 속성을 참조하기 바란다.

## 1.2 크기 단위

cm, mm, inch 등의 단위도 존재하나 대표적인 크기 단위는 다음과 같다. px은 절대값이고 em, %는 상대값이 된다.

대부분 브라우저의 폰트 사이즈 기본값은 16px, 1em, 100%이다. 속성값이 0인 경우, 단위를 지정하지 않아도 된다.

### 1.2.1 px

[픽셀(화소)](https://ko.wikipedia.org/wiki/%ED%99%94%EC%86%8C) 단위. 1px은 화소 1개 크기를 의미한다. 디바이스 [해상도(resolution)](https://ko.wikipedia.org/wiki/%ED%95%B4%EC%83%81%EB%8F%84)에 따라 상대적인 크기를 갖는다.

![pixels](/img/pixels.jpg)

스크린에서 확대한 픽셀. 각 픽셀들은 적색, 녹색, 청색 요소들(RGB)을 가지고 있다.
{: style="color:gray; font-size: 80%; text-align: center; margin-top: 5px;"}

22인치 LCD 모니터의 경우 해상도가 1680 * 1050 인데 이것은 가로에 1680개의 픽셀, 세로에 1050개의 픽셀을 가진다는 의미이다.

요소의 크기나 이미지의 크기 지정에 주로 사용된다. (절대단위)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      text-align: center;
    }
    div {
      font-size: 14px;
      font-weight: bold;
      padding: 2em; /* 14px * 2 = 28px */
      background-color:rgba(255,0,0,0.2);
    }
  </style>
</head>
<body>
  <div>14px</div>
</body>
</html>
```

### 1.2.2 %

백분률 단위. 요소에 지정된 폰트 사이즈(부모 요소에 지정된 사이즈나 디폴트 사이즈)에 상대적인 폰트 사이즈를 설정한다.(상대단위)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-size: 14px;
      text-align: center;
    }
    div {
      font-size: 120%; /* 14px * 1.2 = 16.8px */
      font-weight: bold;
      padding: 2em;    /* 16.8px * 2 = 33.6px */
      background-color:rgba(255,0,0,0.2);
    }
  </style>
</head>
<body>
  <div>14px * 120% → 16.8px</div>
</body>
</html>
```

### 1.2.3 em

배수(倍數) 단위. 요소에 지정된 폰트 사이즈(부모 요소에 지정된 사이즈나 디폴트 사이즈)에 상대적인 폰트 사이즈를 설정한다.

예를 들어 1em은 요소에 지정된 폰트 사이즈와 같고 2em은 요소에 지정된 폰트 사이즈의 2배이다.

폰트 사이즈 설정이나 컨텐츠를 포함하는 컨테이너의 크기 설정에 사용하면 상대적인 설정이 가능하여 편리하다. (상대단위)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-size: 14px;
      text-align: center;
    }
    div {
      font-size: 1.2em; /* 14px * 1.2 = 16.8px */
      font-weight: bold;
      padding: 2em;     /* 16.8px * 2 = 33.6px */
      background-color:rgba(255,0,0,0.2);
    }
  </style>
</head>
<body>
  <div>14px * 1.2em → 16.8px</div>
</body>
</html>
```

중첩된 자식 요소에 em을 지정하면 모든 자식 요소의 폰트 사이즈에 영향을 미친다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-size: 14px;
      text-align: center;
    }
    div {
      font-size: 1.2em; /* 14px * 1.2 = 16.8px */
      font-weight: bold;
      padding: 2em;
    }
    .box1 { background-color:rgba(255,0,0,0.2); }
    .box2 { background-color:rgba(255,0,0,0.6); }
    .box3 { background-color:rgba(255,0,0,0.8); }
  </style>
</head>
<body>
  <div class='box1'>
    14px * 1.2em ⇒ 16.8px
    <div class='box2'>
      16.8px * 1.2em ⇒ 20.16px
      <div class='box3'>
        20.16px * 1.2em ⇒ 24.192px
      </div>
    </div>
  </div>
</body>
</html>
```

의도되지 않은 상황이라면 무척 난감한 상황일 수 있다. 즉 상대 단위인 em의 기준(부모 요소에 지정된 폰트 사이즈)이 상속의 영향으로 일정하지 않기 때문이다.

### 1.2.4 rem

em의 기준(부모 요소에 지정된 폰트 사이즈)은 상속의 영향으로 일정하지 않다. 즉 상황에 따라 1.2em은 각기 다른 값을 가질 수 있다.

rem은 최상위 요소(html)의 폰트 사이즈를 기준으로 삼는다. rem의 r은 root를 의미한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    html {
      font-size: 14px;
    }
    div {
      font-size: 1.2rem; /* html font-size:14px * 1.2 = 16.8px */
      font-weight: bold;
      padding: 2em;
      text-align: center;
    }
    .box1 { background-color:rgba(255,0,0,0.2); }
    .box2 { background-color:rgba(255,0,0,0.6); }
    .box3 { background-color:rgba(255,0,0,0.8); }
  </style>
</head>
<body>
  <div class='box1'>
    14px * 1.2em ⇒ 16.8px
    <div class='box2'>
      14px * 1.2em ⇒ 16.8px
      <div class='box3'>
        14px * 1.2em ⇒ 16.8px
      </div>
    </div>
  </div>
</body>
</html>
```

사용자가 브라우저의 기본 폰트 크기를 변경(Mac Chrome의 경우, 설정 > 고급 설정 표시 > 웹 컨텐츠 > 글꼴 맞춤 설정)하더라도 이에 따라 웹사이트의 레이아웃을 적절히 조정할 수 있다는 장점이 있다. 따라서 폰트 사이즈 뿐만이 아니라 컨텐츠의 크기에 따라 가변적으로 대응하여야 하는 wrapper 요소(container) 등에 적합하다.

```css
.container {
  width: 70rem; /* 14px * 70rem = 980px */
}
```

Reset CSS를 사용하여 사전에 html 요소의 font-size 지정이 필요하다.

### 1.2.5 Viewport 단위(vh, vw, vmin, vmax)

반응형 웹디자인은 화면의 크기에 동적으로 대응하기 위해 % 단위를 많이 사용한다. 하지만 % 단위는 em과 같이 상속에 의해 부모 요소에 상대적 영향을 받는다.

Viewport 단위는 상대적인 단위로 [viewport](http://ungmo2.github.io/css/CSS3-Responsive-Web-Design/#viewport-meta-tag)를 기준으로 한 상대적 사이즈를 의미한다.

| 단위   | Description
|:-----:|:--------------------------------
| vw    | viewport 너비의 1/100
| vh    | viewport 높이의 1/100
| vmin  | viewport 너비 또는 높이 중 작은 쪽의 1/100
| vmax  | viewport 너비 또는 높이 중 큰 쪽의 1/100

예를 들어 viewport 너비가 1000px, 높이가 600px인 경우,

- 1vw  : viewport 너비 1000px의 1%인 10px
- 1vh  : viewport 높이 600px의 1%인 6px
- vmin : viewport 높이 600px의 1%인 6px
- vmax : viewport 너비 1000px의 1%인 10px

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0px; }
    .item {
      width: 50vw;
      height: 100vh;
      text-align: center;
      line-height: 100vh;
      font-size: 4rem;
      color: white;
    }
    .item1 { background-color: red; }
    .item2 { background-color: orange; }
  </style>
</head>
<body>
  <div class='item item1'>item1</div>
  <div class='item item2'>item2</div>
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

더욱 다양한 색상을 표현하기 위해 다음과 같은 색상 표현 단위를 사용할 수 있다. [HTML COLOR CODES](http://htmlcolorcodes.com/)를 참조하면 편리하다.

| 단위                                         | 사용예                          
|:--------------------------------------------|:------------------------------|
| HEX 코드 단위 (Hexadecimal Colors)            | #000000
| RGB (Red, Green, Blue)                      | rgb(255, 255, 0)
| RGBA (Red, Green, Blue, Alpha/투명도)         | rgba(255, 255, 0, 1)
| HSL (Hue/색상, Saturation/채도, Lightness/명도) | hsl(0, 100%, 25%)
| HSLA (Hue, Saturation, Lightness, Alpha)     | hsla(60, 100%, 50%, 1)

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

## 2.1 박스 모델 (Box Model)

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

### 2.1.1 width / height 속성

width와 height 속성은 요소의 내용(content)가 위치하는 영역의 너비와 높이를 의미한다. 따라서 박스 전체 크기는 다음과 같이 계산할 수 있다.

- 전체 너비 = width + left padding + right padding + left border + right border + left margin + right margin

- 전체 높이 = height + top padding + bottom padding + top border + bottom border + top margin + bottom margin

### 2.1.2 margin / padding 속성

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

### 2.1.3 border 속성

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

### 2.1.4 box-sizing 속성

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

## 2.2 표시(Display）

### 2.2.1 display 속성

display 속성은 layout 정의에 자주 사용되는 중요한 속성이다.

| 속성값 키워드   | 설명                         |
|:-------------|:----------------------------|
| block        | block 속성 요소로 지정
| inline       | inline 속성 요소로 지정
| inline-block | inline-block 속성 요소로 지정
| none         | 해당 요소를 화면에 표시하지 않는다 (공간조차 사라진다)

모든 HTML 요소는 아무런 CSS를 적용하지 않아도 기본적으로 브라우저에 표현되는 디폴트 표시값을 가진다. HTML 요소는 block 또는 inline 속성을 갖는다.

display 속성은 상속되지 않는다.

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

#### 2.2.1.1 block 속성

- 항상 새로운 라인에서 시작한다.

- 화면 크기 전체의 가로폭을 차지한다. (width: 100%)

- width, height, margin, padding 속성 지정이 가능하다.

- block 속성 요소 내에 inline 속성 요소를 포함할 수 있다

- block 속성 요소 예

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
<head>
  <style>
    div:nth-of-type(1) {
      background-color: #FFA07A;
      padding: 20px;
    }

    div:nth-of-type(2) {
      background-color: #FF7F50;
      padding: 20px;
      width: 200px;
    }
  </style>
</head>
<body>
  <div>
    <h2>London</h2>
    <p>London is the capital city of England. It is the most populous city in the United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
  </div>
  <div>
    <h2>Paris</h2>
    <p>Paris is the capital and most populous city of France. Situated on the Seine River, in the north of the country.</p>
  </div>
</body>
</html>
```

#### 2.2.1.2 inline 속성

- 새로운 라인에서 시작하지 않으며 문장의 중간에 들어갈 수 있다. 즉, 줄을 바꾸지 않고 다른 요소와 함께 한 행에 위치시킬 수 있다.

- content의 너비만큼 가로폭을 차지한다.

- width, height, margin-top, margin-bottom 속성을 지정할 수 없다. 상, 하 여백은 line-height로 지정한다.

- inline 속성 요소를 연속 사용하는 경우, 좌우에 정의하지 않은 space(4px)가 자동 지정된다.

- inline 속성 요소 내에 block 속성 요소를 포함할 수 없다.

- inline 속성 요소 예

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
<head>
  <style>
    span {
      background-color:red;
      color:white;
      padding: 10px;
      /*width: 200px;*/
      /*margin: 10px;*/
      /*line-height: 50px;*/
    }
  </style>
</head>
<body>
  <h1>My <span>Important</span> Heading</h1>
  <span>Inline</span>
  <span>Inline</span><span>Inline</span>
</body>
</html>
```

#### 2.2.1.3 inline-block 속성

block과 inline의 특징을 모두 갖는다. inline 요소 같이 한 줄에 표현되면서 width, height, margin 속성을 모두 지정할 수 있다. 디폴트 표시값으로 inline-block 속성을 갖는 요소는 없다. inline-block 속성을 갖게 하려면 별도 지정이 필요하다.

- 기본적으로 inline 속성과 흡사하게 줄을 바꾸지 않고 다른 요소와 함께 한 행에 위치시킬 수 있다.

- block 속성처럼 width, height, margin, padding 속성을 모두 정의할 수 있다. 상, 하 여백을 margin과 line-height 두가지 속성 모두를 통해 제어할 수 있다.

- inline-block 속성 요소를 연속 사용되는 경우, 좌우에 정의하지 않은 space(4px)가 자동 지정된다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .box {
      width: 150px;
      height: 75px;
      margin: 10px;
    }

    .floating {
      display: inline-block;
      border: 3px solid #73AD21;
    }

    .after {
      border: 3px solid red;
    }
  </style>
</head>
<body>
  <div class="floating box">Floating box</div>
  <div class="floating box">Floating box</div>
  <div class="floating box">Floating box</div>
  <div class="floating box">Floating box</div>
  <div class="floating box">Floating box</div>
  <div class="floating box">Floating box</div>
  <div class="floating box">Floating box</div>
  <div class="floating box">Floating box</div>

  <div class="after box">Another box, after the floating boxes...</div>
</body>
</html>
```

아래는 display 속성 사용 예제이다.

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

  <span>A display property with a value of "block" results in</span>
  <span>a line break between the two elements.</span>

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

visibility 속성은 요소를 보이게 할 것인지 보이지 않게 할 것인지를 정의한다. 즉 요소의 렌더링 여부를 결정한다.

| 속성값 키워드   | 설명                         |
|:-------------|:----------------------------|
| visible      | 해당 요소를 보이게 한다 (기본값)
| hidden       | 해당 요소를 보이지 않게 한다. display: none;은 해당 요소의 공간까지 사라지게 하지만 visibility: hidden;은 해당 요소의 공간은 사라지지 않고 남아있게 된다.
| collapse     | table 요소에 사용하며 행이나 열을 보이지 않게 한다.
| none         | table 요소의 row나 column을 보이지 않게 한다. IE, 파이어폭스에서만 동작하며 크롬에서는 hidden과 동일하게 동작한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1.visible { visibility: visible; }
    h1.hidden  { visibility: hidden; }

    /*셀의 테두리선을 겹쳐서 표현*/
    table { border-collapse: collapse; }
    table, td { border: 1px solid black; }
    tr.collapse { visibility: collapse; }
    /*tr.collapse { visibility: hidden; }*/
  </style>
</head>
<body>
  <h1 class="visible">This is a visible heading</h1>
  <h1 class="hidden">This is an invisible heading</h1>
  <h1 style="display:none">This is an invisible heading</h1>

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
    }

    div:hover, img:hover {
      opacity: 1.0;
    }
  </style>
</head>
<body>
  <div>This element's opacity is 0.5! Note that both the text and the background-color are affected by the opacity level!</div>

  <h1>Image Transparency</h1>
  <img src="img/klematis.jpg" width="150" height="113" alt="klematis">
</body>
</html>
```

## 2.3 배경 (Background)

해당 요소의 배경으로 이미지 또는 색상을 정의한다.

자세한 내용은 [CSS Background and Borders](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Background_and_Borders)를 참조한다.

### 2.3.1 Background Image 속성

[background-image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background-image: url("img/dot.png");
    }
    </style>
</head>
<body>
  <h1>Hello World!</h1>
  <p>This page has an image as the background!</p>
</body>
</html>
```

### 2.3.2 Background Repeat 속성

[background-repeat](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat)

설정된 이미지의 크기가 화면보다 작으면 자동으로 이미지가 반복 출력되어 화면을 채우게 된다. 이것은 `background-repeat` 속성의 기본값이 `repeat`이기 때문이다.

x축으로만 배경 이미지를 반복할 경우, `background-repeat` 속성값에 `repeat-x`, y축으로만 배경 이미지를 반복할 경우, `repeat-y`를 설정한다.

```css
body {
  background-image: url("img/dot.png");
  background-repeat: repeat-x;
}
```

반복 출력을 멈추고 싶은 경우, `background-repeat` 속성값에 `no-repeat`를 설정한다.

```css
body {
  background-image: url("img/dot.png");
  background-repeat: no-repeat;
}
```

background-image에 복수개의 이미지를 설정할 경우, 먼저 설정된 이미지가 전면에 출력된다.

```css
body {
  background-image: url("img/dot.png"), url("img/paper.gif");
  background-repeat: no-repeat, repeat;
}
```

### 2.3.3 Background Size 속성

[background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)

배경 이미지의 크기를 조절하고 싶은 경우, `background-size` 속성을 사용한다. px값을 지정할 경우, 배경이미지 크기가 지정된 px값으로 조정되고 100%를 지정하며 화면 크기에 맞추어 이미지를 출력한다. 이때 지정한 값은 width를 의미한다. width만 지정한 경우 height는 auto로 지장된다.

```css
body {
  background-image: url("img/dot.png");
  background-repeat: no-repeat;
  /* One-value syntax */
  /* the width of the image (height set to 'auto') */
  background-size: 100%;
}
```

배경이미지의 width, height를 모두 설정할 수 있다. 이때 첫번째 값은 width, 두번째 값은 height를 의미한다.

```css
body {
  background-image: url("img/dot.png");
  background-repeat: no-repeat;
  /* Two-value syntax */
  /* first value: width of the image, second value: height */
  background-size: 100% 500px;
}
```

이때 쉼표로 값을 구분하면 다른 배경이미지의 너비를 지정하는 것으로 인식된다.

```css
body {
  background-image: url("front.png"), url("back.png");
  background-repeat: no-repeat, no-repeat;
  background-size: 100%, 500px;
}
```

### 2.3.4 Background Attachment 속성

[background-attachment](https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachmen)

화면을 스크롤하면 배경 이미지도 함께 스크롤된다. 화면이 스크롤되더라도 배경이미지는 스크롤되지 않고 고정되어 있게 하려면 `background-attachment` 속성에 `fixed` 키워드를 지정한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      /*overflow: hidden;*/
      margin: 0;
      padding: 0;
    }

    .bg {
      background-image: url("img/bg.jpg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-attachment: fixed;
      float: left;
      width: 100vw;
      height: 100vh;
      overflow: auto;
    }

    #page-wrap {
      width: 300px;
      margin: 50px auto;
      padding: 20px;
      background: white;
      box-shadow: 0 0 20px black;
      /* size/line-height | family */
      font: 15px/2 Georgia, Serif;
    }
  </style>
</head>

<body>
  <div class="bg">
    <div id="page-wrap">
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.</p>
      <p>Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus acus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
    </div>
  </div>
</body>
</html>
```

### 2.3.5 Background Position 속성

[background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)

일반적으로 background-image는 좌상단부터 이미지를 출력한다. 이때 background-position 속성을 사용하면 이미지의 좌표를 지정 할 수 있다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
    }
    div {
      background-image: url("img/dot.png");
      background-color: #FFEE99;
      background-repeat: no-repeat;
      width: 32vw;
      height: 200px;
      margin-bottom: 2vw;
      float: left;
    }
    div:not(:nth-of-type(3n-2)) {
      margin-left: 2vw;
    }
    .example1 {
      background-position: top;
    }
    .example2 {
      background-position: bottom;
    }
    .example3 {
      background-position: center;
    }
    .example4 {
      background-position: left;
    }
    .example5 {
      background-position: right;
    }
    .example6 {
      /* <percentage> values */
      background-position: 25% 75%;
    }
    .example7 {
      /* <length> values */
      background-position: 10px 20px;
    }
    .example8 {
      background-image: url("img/dot.png"), url("img/dot.png");
      background-position: 0px 0px, center;
    }
  </style>
</head>

<body>
  <div class="example1">top</div>
  <div class="example2">bottom</div>
  <div class="example3">center</div>
  <div class="example4">left</div>
  <div class="example5">right</div>
  <div class="example6">25% 75%</div>
  <div class="example7">10px 20px</div>
  <div class="example8">0px 0px, center</div>
</body>
</html>
```

### 2.3.6 Background Color 속성

[background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)

```css
div {
  background-color: red;
  background-color: rgb(255,255,255);
}
```

### 2.3.7 Background Shorthand

[background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)

Shorthand Syntax

```
// any order
background: color || image || repeat || attachment || position
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      /*background: color || image || repeat || attachment || position*/
      background: #FFEE99 url("img/dot.png") no-repeat center;
      width: 50vw;
      height: 300px;
    }
  </style>
</head>
<body>
  <div></div>
</body>
</html>
```

## 2.4 폰트와 텍스트

폰트 및 텍스트 관련 속성은 폰트의 크기, 폰트의 지정, 폰트의 스타일, 텍스트 정렬 등을 정의한다.

### 2.4.1 font-size 속성

텍스트의 크기를 정의한다.

[font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)

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

### 2.4.2 font-family 속성

폰트를 지정한다. 컴퓨터에 폰트가 설치되어 있지 않으면 적용되지 않는다.

[font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)

폰트는 복수개 지정이 가능한데 첫번째 지정한 폰트가 클라이언트 컴퓨터에 설치되어 있지 않은 경우, 다음에 지정된 폰트를 적용한다. 따라서 마지막에 지정하는 폰트는 대부분의 OS에 기본적으로 설치되어 있는 generic-family 폰트(Serif, Sans-serif, Mono space)를 지정하는 것이 일반적이다.

다음은 맥용 크롬 브라우저의 generic-family 폰트 설정 화면이다.

![Chrome generic-family font](/img/generic-family-font.png)
{: style="max-width:500px; margin: 10px auto;"}

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

### 2.4.3 font-style / font-weight 속성

font-style 속성은 이탤릭체의 지정, font-weight 속성은 폰트 굵기 지정에 사용된다.

- [font-style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style)

- [font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)

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

### 2.4.4 line-height 속성

텍스트의 높이를 지정한다. 텍스트 수직 정렬에도 응용되어 사용된다.

[line-height](https://developer.mozilla.org/ko/docs/Web/CSS/line-height)

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
    .lh-3x {
      line-height: 3.0; /*16px * 3*/
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

  <p class="lh-3x">
    This is a paragraph with a 3x line-height.<br>
    This is a paragraph with a 3x line-height.<br>
  </p>
</body>
</html>

```

다음은 수직 중앙 정렬 예제이다. a 요소의 `line-height` 값과 a 요소를 감싸는 div 요소의 `height` 값을 일치시킨다.

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

### 2.4.5 font Shorthand

Shorthand Syntax

```
font : font-style(optional) font-variant(optional) font-weight(optional) font-size(mandatory) line-height(optional) font-family(mandatory)
```

```
/* size | family */
font: 2em "Open Sans", sans-serif;

/* style | size | family */
font: italic 2em "Open Sans", sans-serif;

/* style | variant | weight | size/line-height | family */
font: italic small-caps bolder 16px/3 cursive;

/* style | variant | weight | stretch | size/line-height | family */
font: italic small-caps bolder condensed 16px/3 cursive;
```

### 2.4.6 text-align 속성

텍스트의 수평 정렬을 정의한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1 { text-align: center; }
    h3 { text-align: right; }
    p  { text-align: left; }
    a  { text-align: center; }
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

### 2.4.7 text-decoration 속성

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

### 2.4.8 white-space 속성

html의 white space는 공백(space), 들여쓰기(tab), 줄바꿈(line break)을 의미한다. html은 기본적으로 연속된 공백(space), 들여쓰기(tab)는 1번만 실행되며 줄바꿈(line break)은 무시된다. 또한 텍스트는 부모 가로 영역을 벗어나지 않고 자동 줄바꿈(wrap)된다. white-space 속성은 이러한 기본 동작을 제어하기 위한 속성이다.

| 속성값     |line break | space/tab | wrapping(자동줄바꿈)
|:---------|:---------:|:---------:|:---------:|
| normal   | 무시       | 1번만      | O
| nowrap   | 무시       | 1번만      | X
| pre      | 반영       | 반영       | X
| pre-wrap | 반영       | 반영       | O
| pre-line | 반영       | 1번만      | O

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      width: 150px;
      height: 150px;
      padding: 10px;
      margin: 40px;
      border-radius: 6px;
      border-color: gray;
      border-style: dotted;
      /*overflow: hidden;*/
    }
    .normal { white-space: normal; }
    .nowrap { white-space: nowrap; }
    .pre    { white-space: pre; }
    .pre-wrap { white-space: pre-wrap; }
    .pre-line { white-space: pre-line; }
  </style>
</head>
<body>
  <h1>white-space</h1>
  <div class="normal"><h3>normal</h3>Lorem   ipsum

    dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="nowrap"><h3>nowrap</h3>Lorem   ipsum

    dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="pre"><h3>pre</h3>Lorem   ipsum

      dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="pre-wrap"><h3>pre-wrap</h3>Lorem   ipsum

    dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="pre-line"><h3>pre-line</h3>Lorem   ipsum

    dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
</body>
</html>
```

### 2.4.9 text-overflow 속성

부모 영역을 벗어난 wrapping(자동줄바꿈)이 되지 않은 텍스트의 처리 방법을 정의한다. 이 속성을 사용하기 위해서는 overflow 속성에 반드시 "visible" 이외의 값이 지정되어 있어야 한다.

| 속성값	     | Description
|:----------|:-----------------
| clip      | 영역을 벗어난 부분을 표시하지 않는다. (기본값)
| ellipsis  | 영역을 벗어난 부분을 잘라내어 보이지 않게 하고 말줄임표(...)를 표시한다.
| \<string\>  | 값으로 지정한 임의의 문자열을 출력한다. Firefox(9.0~)만 지원하는 기능이다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    div {
      width: 150px;
      height: 150px;
      padding: 10px;
      margin: 40px;
      border-radius: 6px;
      border-color: gray;
      border-style: dotted;
      white-space: nowrap;
      overflow: hidden;  /*반드시 "visible" 이외의 값이 지정되어 있어야 한다.*/
    }
    .clip     { text-overflow: clip; }
    .ellipsis { text-overflow: ellipsis; }
    .string   { text-overflow: '☺'; } /*only Firefox(9.0~)*/
  </style>
</head>
<body>
  <h1>text-overflow</h1>
  <div class="clip"><h3>clip</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="ellipsis"><h3>ellipsis</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="string"><h3>string</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
</body>
</html>
```

### 2.4.10 word-wrap 속성

한 단어의 길이가 길어서 부모 영역을 벗어난 텍스트의 처리 방법을 정의한다. link 등을 표기할 때(e.g. http://ungmo2.github.io/css/CSS3-Property/) 그 길이가 매우 길어지는데 이 속성을 사용하지 않으면 부모 영역을 넘어가게 된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      div {
        width: 150px;
        height: 150px;
        padding: 10px;
        margin: 40px;
        border-radius: 6px;
        border-color: gray;
        border-style: dotted;
      }
      .word-wrap { word-wrap: break-word; }
    </style>
  </head>
  <body>
    <h1>word-wrap</h1>
    <div>Floccinaucinihilipilification http://ungmo2.github.io/css/CSS3-Property/</div>
    <div class="word-wrap">Floccinaucinihilipilification http://ungmo2.github.io/css/CSS3-Property/</div>
  </body>
</html>
```

### 2.4.11 word-break 속성

한 단어의 길이가 길어서 부모 영역을 벗어난 텍스트의 처리 방법을 정의한다.

word-wrap 속성은 단어를 어느 정도는 고려하여 개행하지만(.,- 등을 고려한다) word-break: break-all;는 단어를 부모 영역에 맞추어 개행한다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    div {
      width: 150px;
      height: 150px;
      padding: 10px;
      margin: 40px;
      border-radius: 6px;
      border-color: gray;
      border-style: dotted;
    }
    .word-wrap  { word-wrap: break-word; }
    .word-break { word-break: break-all; }
  </style>
</head>
<body>
  <div>Floccinaucinihilipilification http://ungmo2.github.io/css/CSS3-Property/</div>

  <h1>word-wrap</h1>
  <div class="word-wrap">Floccinaucinihilipilification http://ungmo2.github.io/css/CSS3-Property/</div>

  <h1>word-break</h1>
  <div class="word-break">Floccinaucinihilipilification http://ungmo2.github.io/css/CSS3-Property/</div>
</body>
</html>
```

## 2.5 위치 (Position)

### 2.5.1 position 속성

position 속성은 요소의 위치를 정의한다. top, bottom, left, right 속성과 함께 사용하여 위치를 지정한다.

![position](/img/position.png)

<!--
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
-->

#### 2.5.1.1 static (기본위치)

static은 position 속성의 기본값으로 position 속성을 지정하지 않았을 때와 같다.

기본적인 요소의 배치 순서에 따라 위에서 아래로, 왼쪽에서 오른쪽으로 순서에 따라 배치되며 부모 요소 내에 자식 요소로서 존재할 때는 부모 요소의 위치를 기준으로 배치된다.

기본적으로 이 속성값을 지정할 일은 없지만 이미 설정된 position을 무력화하기 위해 사용될 수 있다.

좌표속성(top, bottom, left, right)을 같이 사용할 수 없다. 좌표속성을 사용할 경우 무시된다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0;}
    div {
      color: #fff;
      text-align: center;
      height: 150px; width: 150px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
    }
    .static-box {
      position: static;
      background: #2db34a;
      line-height: 150px;
    }
  </style>
</head>
<body>
  <div>
    <div class="static-box">static box</div>
  </div>
</body>
</html>
```

#### 2.5.1.2 relative (상대위치)

기본 위치(static으로 지정되었을 때의 위치)를 기준으로 좌표 속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0;}
    div {
      color: #fff;
      text-align: center;
      line-height: 150px;
      height: 150px; width: 150px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
    }
    .relative-box {
      position: relative;
      top: 50px; left: 50px;
      background: #2db34a;
    }
  </style>
</head>
<body>
  <div>
    <div class="relative-box">relative box</div>
  </div>
</body>
</html>
```

#### 2.5.1.3 absolute (절대위치)

***부모 또는 조상 요소에 relative 속성이 선언되어 있으면 그 요소를 기준으로 하여 좌표 속성(top, bottom, left, right)만큼 이동한다.***

***relative 속성이 선언되어 있는 부모 또는 조상 요소가 없다면 부모 요소와 관계없이 document body를 기준으로 하여 좌표 속성대로 위치하게 된다.***

따라서 부모 요소를 배치의 기준으로 삼기 위해서는 부모 요소에 relative 속성을 정의하여야 한다.

이때 다른 요소가 먼저 위치를 점유하고 있어도 뒤로 밀리지 않고 덮어쓰게 된다. (이런 특성을 부유 또는 부유 객체라 한다)

***absolute 속성 선언 시, block 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 주의하여야 한다.***

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0;}
    div {
      color: #fff;
      text-align: center;
      line-height: 200px;
      height: 300px; width: 300px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
      position: relative;
      top: 200px; left: 200px;
    }
    .absolute-box {
      background: #2db34a;
      height: 200px; width: 200px;
      position: absolute;
      top: 50px; left: 50px;
    }
  </style>
</head>
<body>
  <div>
    <div class="absolute-box">absolute box1</div>
  </div>
  <div class="absolute-box">absolute box2</div>
</body>
</html>
```

#### 2.5.1.4 fixed (고정위치)

부모 요소와 관계없이 브라우저의 viewport를 기준으로 좌표속성(top, bottom, left, right)을 사용하여 위치를 이동시킨다.

스크롤이 되더라도 화면에서 사라지지 않고 항상 같은 곳에 위치한다.

***fixed 속성 선언 시, block 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 주의하여야 한다.***

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0;}
    div {
      color: #fff;
      text-align: center;
      line-height: 150px;
      height: 150px; width: 150px;
      background: #bcbcbc;
      border: 1px solid #bcbcbc;
    }
    .fixed-box1 {
      position: fixed;
      background: #2db34a;
      bottom: 0; left: 0;
    }
    .fixed-box2 {
      position: fixed;
      background: #2db34a;
      top: 0; right: 0;
    }
  </style>
</head>
<body>
  <div>
    <div class="fixed-box1">fixed box1</div>
  </div>
  <div class="fixed-box2">fixed box2</div>
</body>
</html>
```

### 2.5.2 z-index 속성

z-index 속성에 큰 숫자값을 지정할수록 화면 전면에 출력된다.

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

### 2.5.3 overflow 속성

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
      width: 150px;
      height: 150px;
      padding: 10px;
      margin: 30px;
      font-size: 1.2em;
      border-radius: 6px;
      border-color: gray;
      border-style: dotted;
      float: left;
    }
    .visible { overflow: visible; }
    .hidden  { overflow: hidden; }
    .scroll  { overflow: scroll; }
    .auto    { overflow: auto; }
  </style>
</head>
<body>
  <h1>overflow</h1>
  <div class="visible"><h3>visible</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="hidden"><h3>hidden</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="scroll"><h3>scroll</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="auto"><h3>auto</h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
</body>
</html>
```

특정 방향으로만 스크롤을 표시하고자 할 때는 overflow-x 또는 overflow-y 속성을 사용한다.

```css
div { overflow-y: auto; }
```

## 2.6 float 속성

float 속성은 주로 layout을 구성하기 위해 사용되는 핵심 기술이다. layout의 가장 큰 목적은 1개 이상의 block 속성 요소를 원하는 위치에 정렬시키는 것이다.

![CSS Grid Layout example](/img/layout.png)

float 속성은 본래 다음 예제와 같이 이미지 주위를 텍스트로 감싸기 위해 만들어진 것이다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    img { float: right; }
  </style>
</head>
<body>
  <img src="img/klematis.jpg">
  <p>The float property was originally designed to allow content to wrap around images. An image could be floated, and all of the content surrounding that image could then naturally flow around it. Although this works great for images, the float property was never actually intended to be used for layout and positioning purposes, and thus it comes with a few pitfalls.One of those pitfalls is that occasionally the proper styles will not render on an element that it is sitting next to or is a parent element of a floated element. When an element is floated, it is taken out of the normal flow of the page, and, as a result, the styles of elements around that floated element can be negatively impacted. Often margin and padding property values arent interpreted correctly, causing them to blend into the floated element; other properties can be affected, too. Another pitfall is that sometimes unwanted content begins to wrap around a floated element. Removing an element from the flow of the document allows all the elements around the floated element to wrap and consume any available space around the floated element, which is often undesired.</p>
</body>
</html>
```

float 속성은 해당 요소를 떠 있게 한다. 여기서 떠 있다(float)는 의미는 요소가 기본 레이아웃 흐름에서 벗어나 요소의 모서리가 페이지의 왼쪽이나 오른쪽에 이동하는 것이다. float 속성을 사용할 때 요소의 위치를 고정시키는 position 속성의 absolute를 사용하면 안된다.

| 속성값	     | Description
|:----------|:-----------------
| none      | 요소를 떠 있게 하지 않는다. (기본값)
| right     | 요소를 오른쪽으로 이동시킨다
| left      | 요소를 왼쪽으로 이동시킨다.

![css float](/img/float.png)

### 2.6.1 정렬

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
{: style="max-width:500px; margin: 10px auto;"}

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

### 2.6.2 float 속성 관련 문제 해결 방법

#### 2.6.2.1 float 속성 요소와 float 속성이 선언되지 않은 요소간 margin이 사라지는 문제

위 예제를 보면 두 요소간 margin이 있어야 한다. 그러나 결과는 그렇지 않다.

![float problem](/img/float-problem1.png)

이것은 두번째 요소에 float 속성을 선언하지 않았기 때문에 발생하는 박스 모델 상의 문제이다. 이 문제를 해결하는 가장 쉬운 방법은 float 속성을 선언하지 않은 요소(.d2)에 `overflow: hidden` 속성을 선언하는 것이다.

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

두번째 요소에도 float 속성을 선언하면 `overflow: hidden` 속성은 선언하지 않아도 되지만 너비가 최소화된다.

#### 2.6.2.2 float속성을 가진 자식 요소를 포함하는 부모 요소의 높이가 정상적으로 반영되지 않는 문제

아래 예제를 보면 float 속성이 선언된 두개의 자식 요소를 포함하는 부모 요소의 높이가 정상적인 값을 가지지 못하는 문제가 발생한다. 이 문제는 부모 요소 이후에 위치하는 요소의 정렬에 문제를 발생시킨다.

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
  <div style="background:red;padding:10px;color:white;">dv3</div>
</body>
</html>
```

이 문제를 해결하는 가장 쉬운 방법은 float 속성을 가진 요소의 부모 요소(wrap)에 `overflow: hidden` 속성을 선언하는 것이다.

```css
.wrap {
  color: white;
  text-align: center;
  padding: 10px;
  background-color: #def0c2;
  overflow: hidden;
}
```

다른 방법으로 부모 요소에 float 속성을 부여하는 방법도 있다. 하지만 부모 요소의 너비는 float된 두개의 자식요소의 컨텐츠를 표현할 수 있는 만큼만으로 작게 줄어들게 된다. 권장할 수 있는 방법은 아니다.

wrap 영역이 끝나기 직전 빈 요소를 만들고 clear:both 속성을 부여하는 방법도 가능하다. 하지만 의미 없는 빈 요소를 사용하여야 하기 때문에 이 방법 역시 권장할 수 있는 방법은 아니다.

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
      /*overflow: hidden;*/
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
    .clear {
      height: 0;
      clear: both;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="d1">dv1</div>
    <div class="d2">dv2</div>
    <div class="clear"></div>
  </div>
  <div style="background:red;padding:10px;color:white;">dv3</div>
</body>
</html>
```

overflow: hidden;과 함께 많이 사용되는 방법은 [::after 가상 요소 선택자](http://ungmo2.github.io/css/CSS3-Selector/#pseudo-element-selector) 를 이용하는 것이다.

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
      /*overflow: hidden;*/
    }
    .wrap::after {
      content: "";
      display: block;
      clear: both;
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
  <div style="background:red;padding:10px;color:white;">dv3</div>
</body>
</html>
```

또 다른 방법은 float 속성 대신 display:inline-block;을 설정하는 것이다. 주의해야야 점은 [inline-block 속성](http://ungmo2.github.io/css/CSS3-Property/#inline-block-) 요소를 연속 사용되는 경우, 좌우에 정의하지 않은 space(4px)가 자동 지정되는 것이다.

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
      /*overflow: hidden;*/
    }
    .d1 {
      /*float: left;*/
      display: inline-block;
      width: 49%;
      /*margin-right: 2%;*/
      padding: 20px 0;
      background-color: #59b1f6;
    }
    .d2 {
      /*float: left;*/
      display: inline-block;
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
  <div style="background:red;padding:10px;color:white;">dv3</div>
</body>
</html>
```

### 2.6.3 Layout Examples

#### 2.6.3.1 2-Column Layout Example

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
  <header>
    <h1>Header</h1>
  </header>
  <nav>
    <h1>Navigation</h1>
  </nav>
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
  <footer>
    <h1>Footer</h1>
  </footer>
</body>
</html>
```

#### 2.6.3.2 3-Column Layout Example

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
  <header>
    <h1>Header</h1>
  </header>
  <nav>
    <h1>Navigation</h1>
  </nav>
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
  <footer>
    <h1>Footer</h1>
  </footer>
</body>
</html>
```

# 3. 상속과 캐스케이딩

## 3.1 상속(Inheritance)

상속이란 상위(부모, 조상) 요소의 속성을 하위(자식, 자손) 요소가 물려 받는 것을 의미한다. 상속 기능이 없다면 각 요소의 Rule set에 속성을 매번 각각 지정해야 한다.

하지만 모든 속성이 상속되는 것은 아니다. 속성 중에는 상속이 되는 것과 되지 않는 것이 있다.

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

color는 상속되는 속성으로 자식 요소는 물론 자손 요소까지 적용된다. 하지만 button처럼 상속 받지 않는 요소도 존재한다.

border, padding은 상속되지 않는 요소로 하위 요소에 적용되지 않는다. [Full property table](https://www.w3.org/TR/CSS21/propidx.html)의 Inherited?가 yes인 속성만 상속된다.

![css inheritance](/img/css_inheritance.png)

상속되지 않는 경우(상속받지 않는 요소 또는 상속되지 않는 속성), inherit 키워드를 사용하여 명시적으로 상속받게 할 수 있다.

```css
button {
  color: inherit;
}
p {
  border: inherit;
  padding: inherit;
}
```

## 3.2 캐스캐이딩(Cascading)

요소는 하나 이상의 CSS 선언에 영향을 받을 수 있다. 이때 충돌을 피하기 위해 ***CSS 적용 우선순위*** 가 필요한데 이를 캐스케이딩(Cascading Order)이라고 한다.

캐스케이딩에는 다음과 같이 세가지 규칙이 있다.

- 중요도 : css가 어디에 선언 되었는지에 따라서 우선순위가 달라진다.

- 명시도 : 대상을 명확하게 특정할수록 명시도가 높아지고 우선순위가 높아진다.

- 선언순서 : 선언된 순서에 따라 우선 순위가 적용된다. 즉, 나중에 선언된 스타일이 우선 적용된다.

**중요도**

css가 어디에 선언 되었는지에 따라서 우선순위가 달라진다.

1. head 요소 내의 style 요소
2. head 요소 내의 style 요소 내의 @import 문
3. \<link\> 로 연결된 CSS 파일
4. \<link\> 로 연결된 CSS 파일 내의 @import 문
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

**명시도**

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

**선언순서**

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

# Reference

* [w3schools.com](http://www.w3schools.com)

* [Learn to Code HTML & CSS](http://learn.shayhowe.com/)

* [W3C CSS Document](https://www.w3.org/TR/CSS/)

* [positioning : Float](http://beautifulcss.com/archives/787)
