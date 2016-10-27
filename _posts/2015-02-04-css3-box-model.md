---
layout: post
title: CSS3 <strong>Box Model</strong>
subtitle: 모든 HTML 요소는 <strong>Box</strong>라고 불리는 사각형의 영역을 생성한다.
categories: css
section: css
---

* TOC
{:toc}

모든 HTML 요소는 Box 형태의 영역을 가지고 있다. Box 형태란 물론 사각형을 의미한다.

![typesetting](/img/typesetting.jpg)

이 Box는 마진(Margin), 테두리(Border), 패딩(Padding), 컨텐츠(Contents)로 구성된다.

![css box model](/img/box-model.png)

브라우저는 박스 모델의 크기(dimension)와 속성(색, 배경, 모양 등), 위치를 근거로 하여 렌더링을 실시하게 된다.

웹디자인은 컨텐츠를 담을 [박스 모델을 정의](./css3-display.html#display-)하고 CSS 속성을 통해 스타일([배경](./css3-background.html), [폰트와 텍스트](./css3-font-text.html) 등)과 [위치](./css3-position.html) 및 [정렬](./css3-float.html)을 부여하는 것이라고 할 수 있다.

| 명칭     | 설명
|:--------|:-----------------------------------------------------------
| Content | 요소의 텍스트나 이미지 등의 실제 내용이 위치하는 영역이다. width, height 속성을 갖는다.
| Padding | 테두리(Border) 안쪽에 위치하는 요소의 내부 여백 영역이다. 속성값은 패딩 영역의 두께를 의미하며 기본 색은 투명(transparent)이다. 요소에 적용된 배경의 컬러, 이미지는 패딩 영역까지 적용된다.
| Border  | 테두리 영역으로 속성값은 테두리의 두께를 의미한다.
| Margin  | 테두리(Border) 바깥에 위치하는 요소의 외부 여백 영역이다. 속성값은 마진 영역의 두께를 의미한다. 기본적으로 투명(transparent)하며 배경색을 지정할 수 없다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      /* 배경색의 지정: 컨텐츠영역과 패딩영역에 적용된다. */
      background-color: lightgrey;
      /* 컨텐츠영역의 너비 */
      width: 300px;
      /* 패딩영역의 두께 */
      padding: 25px;
      /* 테두리: 두께 형태 색상 */
      border: 25px solid navy;
      /* 마진영역의 두께 */
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

<div class='result'></div>

![Chrome DevTools](/img/chrome-devtools.png)

Chrome DevTools에서 확인한 Box-model
{: .desc-img}


# 1. width / height 속성

width와 height 속성은 요소의 내용(content)가 위치하는 영역의 너비와 높이를 의미한다. 따라서 박스 전체 크기는 다음과 같이 계산할 수 있다.

- 전체 너비 = width + left padding + right padding + left border + right border + left margin + right margin

- 전체 높이 = height + top padding + bottom padding + top border + bottom border + top margin + bottom margin

width / height 속성을 비롯한 모든 박스모델 관련 속성(margin, padding, border, box-sizing 등)은 [상속](./css3-inheritance-cascading.html)되지 않는다.
{: .info}

# 2. margin / padding 속성

margin / padding 속성은 content의 4개 방향(top, right, left, bottom)에 대하여 지정이 가능하다.

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

<div class='result'></div>

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

<div class='result'></div>

margin 속성에 `auto` 키워드를 설정하면 해당 요소를 브라우저 중앙에 위치 시킬 수 있다.

보다 자세한 중앙 정렬 방법에 대해서는 [Horizontal & Vertical Centering](./centering.html)을 참조하기 바란다.

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

<div class='result'></div>

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

<div class='result'></div>

`max-width` 속성을 사용하면 브라우저 너비가 요소의 너비보다 좁아질 때 자동으로 요소의 너비가 줄어든다.

`max-width` 속성은 요소 너비의 최대값을,  `min-width` 속성은 요소 너비의 최소값을 지정한다. 예를 들어 `max-width: 300px;`의 경우 브라우저의 너비가 300px보다 작아지면 요소 너비는 브라우저의 너비에 따라서 작아진다. `min-width: 300px;`의 경우 브라우저의 너비가 300px보다 작아져고 요소 너비는 지정 너비(300px)을 유지한다.
{: .info}

# 3. border 속성

## 3.1 border-style

`border-style` 속성은 테두리 선의 스타일을 지정한다.

- [MDN: border-style](https://developer.mozilla.org/ko/docs/Web/CSS/border-style)

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
      p {
        background: palegreen;
        padding: 10px;
      }  
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

<div class='result'></div>

속성값의 갯수에 따라 4개 방향(top, right, left, bottom)에 대하여 지정이 가능하다.  

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p.d1 {
      /* Apply to all four sides */
      border-style: dashed;
    }
    p.d2 {
      /* horizontal | vertical */
      border-style: dotted solid;
    }
    p.d3 {
      /* top | horizontal | bottom */
      border-style: hidden double dashed;
    }
    p.d4 {
      /* top | right | bottom | left */
      border-style: none solid dotted dashed;
    }
    p {
      background: palegreen;
      padding: 10px;
    }  
  </style>
</head>
<body>
  <p class="d1">Apply to all four sides</p>
  <p class="d2">horizontal | vertical</p>
  <p class="d3">top | horizontal | bottom</p>
  <p class="d4">top | right | bottom | left</p>
  </body>
</html>
```

<div class='result'></div>

## 3.2 border-width

`border-width` 속성은 테두리의 두께를 지정한다. 속성값의 갯수에 따라 4개 방향(top, right, left, bottom)에 대하여 지정이 가능하다.  

`border-width` 속성은 `border-style`과 함께 사용하지 않으면 적용되지 않는다.
{: .info}

- [MDN: border-width](https://developer.mozilla.org/ko/docs/Web/CSS/border-width)

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
      p {
        background: palegreen;
        padding: 10px;
      }  
    </style>
  </head>
  <body>
    <h2>The border-width Property</h2>
    <p>This property specifies the width of the four borders:</p>

    <p class="one">initial</p>
    <p class="two">medium</p>
    <p class="three">2px</p>
    <p class="four">thick</p>
    <p class="five">15px</p>
    <p class="six">thick</p>
    <p class="seven">2px 10px 4px 20px</p>
  </body>
</html>
```

<div class='result'></div>

## 3.3 border-color

`border-color` 속성은 테두리의 색상을 지정한다. 속성값의 갯수에 따라 4개 방향(top, right, left, bottom)에 대하여 지정이 가능하다.

`border-color` 속성은 `border-style`과 함께 사용하지 않으면 적용되지 않는다.
{: .info}

- [MDN: border-color](https://developer.mozilla.org/ko/docs/Web/CSS/border-color)

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
      p {
        background: palegreen;
        padding: 10px;
      }  
    </style>
  </head>
  <body>
    <h2>The border-color Property</h2>
    <p>This property specifies the color of the four borders:</p>

    <p class="one">A solid red border</p>
    <p class="two">A solid green border</p>
    <p class="three">A solid multicolor border</p>
  </body>
</html>
```

<div class='result'></div>

## 3.4 border-radius

`border-radius` 속성은 테두리 모서리를 둥글게 표현하도록 지정한다. 속성값은 길이를 나타내는 단위(px, em 등)와 percentage(%)를 사용한다.

하나 혹은 두개의 반지름을 설정하여 각각의 모서리 굴곡을 설정할 수 있기 때문에 원 혹은 타원의 모양으로 정의가 가능하다.

![border-radius](/img/border-radius-sh.png)

- [MDN: border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)

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

<div class='result'></div>


**모든 모서리에 동일한 둥근 모서리 설정**

```css
.border-rounded {
  border-radius: 20px;

  /* 위 코드는 아래의 shorthand이다.
  border-top-left-radius:     20px;
  border-top-right-radius:    20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius:  20px;
  */
}
```

![](/img/IC485208.png)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      background: #eaeaed;
      color: #666;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .border-rounded {
      /* 모든 모서리를 동일하게 설정 */
      border-radius: 20px;
    }
  </style>
</head>
<body>
  <div class="border-rounded">border-radius: 20px</div>
</body>
</html>
```

<div class='result'></div>

**각각의 모서리를 개별적으로 설정**

```css
.border-rounded {
  border-radius: 10px 40px 40px 10px;

  /* 위 코드는 아래의 shorthand이다.
  border-top-left-radius:     10px;
  border-top-right-radius:    40px;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius:  10px;
  */
}
```

![](/img/IC485216.png)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      background: #eaeaed;
      color: #666;
      width: 200px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .border-rounded {
      /* 각각의 모서리를 개별적으로 설정 */
      border-radius: 10px 40px 40px 10px;
    }
  </style>
</head>
<body>
  <div class="border-rounded">10px 40px 40px 10px</div>
</body>
</html>
```

<div class='result'></div>

**두개의 반지름을 지정하여 타원형 둥근 모서리 설정**

```css
.border-rounded {
  border-top-left-radius: 50px 25px;
}
```

![](/img/IC485217.png)


```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      background: #eaeaed;
      color: #666;
      width: 300px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .border-rounded {
      border-top-left-radius: 50px 25px;
    }
  </style>
</head>
<body>
  <div class="border-rounded">border-top-left-radius: 50px 25px</div>
</body>
</html>
```

<div class='result'></div>

**각각의 모서리에 타원형 둥근 모서리 축약 설정**

```css
.border-rounded {
  border-radius: 50px 50px 0 0 / 25px 25px 0 0;
}
```

![](/img/IC485220.png)


```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      background: #eaeaed;
      color: #666;
      width: 400px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .border-rounded {
      border-radius: 50px 50px 0 0 / 25px 25px 0 0;
    }
  </style>
</head>
<body>
  <div class="border-rounded">border-radius: 50px 50px 0 0 / 25px 25px 0 0;</div>
</body>
</html>
```

<div class='result'></div>

## 3.5 border

`border` 속성은 `border-width`, `border-style`, `border-color`를 한번에 설정하기 위한 shorthand 속성이다.

- [MDN: Border Shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/border)

```
/* Syntax */
border: border-width border-style border-color;
```

```css
p {
  /* border-width border-style border-color */
  border: 5px solid red;
}
```

# 4. box-sizing 속성

`box-sizing` 속성은 padding, border, margin을 제외한 값인 width, height 속성을 content 영역, padding, border가 포함된 값으로 사용할 수 있게 하여 CSS Layout을 직관적으로 사용할 수 있게 한다.

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

<div class='result'></div>

box-sizing 속성은 상속되지 않는다. 따라서 box-sizing 속성을 사용하도록 초기화하려면 아래와 같이 정의한다.
{: .info}

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

# Reference

* [W3C CSS Document](https://www.w3.org/TR/CSS/)
