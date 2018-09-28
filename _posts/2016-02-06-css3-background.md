---
layout: post
title: CSS3 <strong>Background</strong>
subtitle: 백그라운드
categories: css
section: css
seq: 2
subseq: 6
description: Background 관련 프로퍼티는 해당 요소의 배경으로 이미지 또는 색상을 정의한다.
---

* TOC
{:toc}

Background 관련 프로퍼티는 해당 요소의 배경으로 이미지 또는 색상을 정의한다.

자세한 내용은 [CSS Background and Borders](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Background_and_Borders)를 참조한다.

# 1. background-image 프로퍼티

요소에 배경 이미지를 지정한다.

- [MDN: background-image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background-image: url("http://poiemaweb.com/img/bg/dot.png");
    }
  </style>
</head>
<body>
  <h3>Background Image</h3>
</body>
</html>
```

<div class='result'></div>

# 2. background-repeat 프로퍼티

배경 이미지의 반복을 지정한다. 수직, 수평 또는 수직과 수평 모두의 반복을 지정할 수 있다.

설정된 이미지의 크기가 화면보다 작으면 자동으로 이미지가 반복 출력되어 화면을 채우게 된다. 이것은 `background-repeat` 프로퍼티의 기본값이 `repeat`이기 때문이다.

x축으로만 배경 이미지를 반복할 경우, `background-repeat` 프로퍼티값에 `repeat-x`, y축으로만 배경 이미지를 반복할 경우, `repeat-y`를 설정한다.

- [MDN: background-repeat](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background-image: url("http://poiemaweb.com/img/bg/dot.png");
      background-repeat: repeat-x;
    }
  </style>
</head>
<body>
  <h3>background-repeat: repeat-x;</h3>
</body>
</html>
```

<div class='result'></div>

반복 출력을 멈추고 싶은 경우, `background-repeat` 프로퍼티값에 `no-repeat`를 설정한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background-image: url("http://poiemaweb.com/img/bg/dot.png");
      background-repeat: no-repeat;
    }
  </style>
</head>
<body>
  <h3>background-repeat: no-repeat;</h3>
</body>
</html>
```

<div class='result'></div>

background-image에 복수개의 이미지를 설정할 경우, 먼저 설정된 이미지가 전면에 출력된다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background-image: url("http://poiemaweb.com/img/bg/dot.png"), url("http://poiemaweb.com/img/bg/paper.gif");
      background-repeat: no-repeat, repeat;
    }
  </style>
</head>
<body>
  <h3>background-repeat: no-repeat, repeat;</h3>
</body>
</html>
```

<div class='result'></div>

# 3. background-size 프로퍼티

배경 이미지의 사이즈를 지정한다. 배경 이미지의 고유 비율을 유지하기 때문에 설정에 따라 이미지의 일부가 보이지 않을 수 있다.

프로퍼티값은 px, %, cover, contain 등을 사용한다.

배경이미지의 width, height를 모두 설정할 수 있다. 이때 첫번째 값은 width, 두번째 값은 height를 의미한다. <strong>하나의 값만을 지정한 경우, 지정한 값은 width를 의미하게 되며 height는 auto로 지정된다.</strong>

- [MDN: background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)

**px값 지정**

배경이미지 크기가 지정된 px값 그대로 설정된다. 첫번째 값은 width, 두번째 값은 height를 의미한다.

```css
.bg {
  background-size: 700px 500px;
}
```

<p data-height="425" data-theme-id="0" data-slug-hash="rrQxGB" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/rrQxGB/">background-size: px지정 - example</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

**%값 지정**

배경이미지 크기가 지정된 %값에 비례하여 설정된다. 첫번째 값은 width, 두번째 값은 height를 의미한다.

화면을 줄이거나 늘리면 배경이미지의 크기도 따라서 변경되어 찌그러지는 현상이 나타난다.

```css
.bg {
  background-size: 100% 100%;
}
```

<p data-height="415" data-theme-id="0" data-slug-hash="xEQkYR" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/xEQkYR/">background-size: %지정 - example  </a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

**cover 지정**

배경이미지의 크기 비율을 유지한 상태에서 부모 요소의 width, height 중 큰값에 배경이미지를 맞춘다. 따라서 이미지의 일부가 보이지 않을 수 있다.

```css
.bg {
  background-size: cover;
}
```

<p data-height="415" data-theme-id="0" data-slug-hash="GjvGmR" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/GjvGmR/">background: cover - example</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

**4. contain 지정**

배경이미지의 크기 비율을 유지한 상태에서 부모 요소의 영역에 배경이미지가 보이지 않는 부분없이 전체가 들어갈 수 있도록 이미지 스케일을 조정한다.

```css
.bg {
  background-size: contain;
}
```

<p data-height="265" data-theme-id="0" data-slug-hash="GjvGER" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/GjvGER/">background: contain - example  </a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

width, height의 프로퍼티값은 공백으로 구분하여야 한다. 프로퍼티값을 쉼표로 구분하면 다른 배경이미지의 너비를 지정하는 것으로 인식되기 때문에 주의가 필요하다.

```css
body {
  background-image: url("front.png"), url("back.png");
  background-repeat: no-repeat, no-repeat;
  background-size: 100%, 500px;
}
```

# 4. background-attachment 프로퍼티

일반적으로 화면을 스크롤하면 배경 이미지도 함께 스크롤된다. 화면이 스크롤되더라도 배경이미지는 스크롤되지 않고 고정되어 있게 하려면 `background-attachment` 프로퍼티에 `fixed` 키워드를 지정한다.

- [MDN: background-attachment](https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    *, *:after, *:before {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width:100%;
      height:100%;
    }

    .bg-wrap {
      /* page-wrap 보다 bg-wrap이 작은 경우, page-wrap이 가리는 문제를 해결 */
      min-height: 600px;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      /* 마진 상쇄 문제 해결을 위한 코드
        https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing
      */
      overflow: auto;
      /* or padding: 0.1px; */
    }

    .parallax {
      background-image: url("http://poiemaweb.com/img/bg/stock-photo-125979219.jpg");
      /* parallax scrolling effect */
      background-attachment: fixed;
    }

    .normal {
      background-image: url("http://poiemaweb.com/img/bg/stock-photo-155153867.jpg");
    }

    #page-wrap {
      width: 400px;
      /* 마진 상쇄 발생 */
      margin: 50px auto;
      padding: 30px;
      background: white;
      box-shadow: 0 0 20px black;
      /* size/line-height | family */
      font: 15px/2 Georgia, Serif;
    }
  </style>
</head>
<body>
  <div class="bg-wrap parallax">
    <div id="page-wrap">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid ipsum maxime libero, impedit necessitatibus quas blanditiis tenetur vero aut esse unde ab similique, delectus placeat enim quae expedita excepturi laboriosam.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid ipsum maxime libero, impedit necessitatibus quas blanditiis tenetur vero aut esse unde ab similique, delectus placeat enim quae expedita excepturi laboriosam.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid ipsum maxime libero, impedit necessitatibus quas blanditiis tenetur vero aut esse unde ab similique, delectus placeat enim quae expedita excepturi laboriosam.</p>
    </div>
  </div>
  <div class="bg-wrap normal"></div>
</body>
</html>
```

<p data-height="425" data-theme-id="0" data-slug-hash="qaXYyx" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/qaXYyx/">background:attachment - example</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

# 5. background-position 프로퍼티

일반적으로 `background-image`는 좌상단부터 이미지를 출력한다. 이때 `background-position` 프로퍼티를 사용하면 이미지의 좌표(xpos, ypos)를 지정 할 수 있다.

기본값은 `background-position: 0% 0%;`로 배경이미지는 우측 상단에 위치하게 된다.

- [MDN: background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
    }
    div {
      background-image: url("http://poiemaweb.com/img/bg/dot.png");
      background-color: #FFEE99;
      background-repeat: no-repeat;
      width: 32vw;
      height: 200px;
      margin-bottom: 2vw;
      float: left;
    }
    div:not(:nth-of-type(3n+1)) {
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
      /*
        <length> values
        xpos ypos
      */
      background-position: 10px 20px;
    }
    .example8 {
      background-image: url("http://poiemaweb.com/img/bg/dot.png"), url("http://poiemaweb.com/img/bg/dot.png");
      background-position: 0px 0px, center;
    }
  </style>
</head>

<body>
  <div>default(0% 0%)</div>
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

<p data-height="711" data-theme-id="0" data-slug-hash="dpzKKB" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/dpzKKB/">background-position example</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

# 6. background-color 프로퍼티

`background-color` 프로퍼티는 요소의 배경 색상을 지정한다. 색상값 또는 transparent 키워드를 지정할 수 있다.

- [MDN: background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)


```css
.bg-col-white {
  background-color: rgb(255, 255, 255);
}

.bg-col-red {
  background-color: red;
}
```

# 7. background Shorthand

background-color, background-image, background-repeat, background-position를 한번에 정의하기 위한 Shorthand Syntax이다.

```
// order
background: color || image || repeat || attachment || position
```

- [MDN: background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      /* background: color || image || repeat || attachment || position */
      background: #FFEE99 url("http://poiemaweb.com/img/bg/dot.png") no-repeat center;
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

<div class='result'></div>

# Reference

* [W3C CSS Document](https://www.w3.org/TR/CSS/)

* [마진 상쇄](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)
