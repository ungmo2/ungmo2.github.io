---
layout: post
title: CSS3 <strong>Font & Text</strong>
subtitle: 폰트 및 텍스트에 관련된 속성
categories: css
section: css
---

* TOC
{:toc}

폰트 및 텍스트 관련 속성은 폰트의 크기, 폰트의 지정, 폰트의 스타일, 텍스트 정렬 등을 정의한다.

# 1. font-size 속성

텍스트의 크기를 정의한다.

- [font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)

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

<div class="result"></div>

# 2. font-family 속성

폰트를 지정한다. 컴퓨터에 해당 폰트가 설치되어 있지 않으면 적용되지 않는다.

- [font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)

폰트는 복수개 지정이 가능한데 첫번째 지정한 폰트가 클라이언트 컴퓨터에 설치되어 있지 않은 경우, 다음에 지정된 폰트를 적용한다. 따라서 마지막에 지정하는 폰트는 대부분의 OS에 기본적으로 설치되어 있는 generic-family 폰트(Serif, Sans-serif, Mono space)를 지정하는 것이 일반적이다.

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

<div class="result"></div>

# 3. font-style / font-weight 속성

`font-style` 속성은 이탤릭체의 지정, `font-weight` 속성은 폰트 굵기 지정에 사용된다.

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

<div class="result"></div>

# 4. line-height 속성

텍스트의 높이를 지정한다. 텍스트 수직 정렬에도 응용되어 사용된다.

- [line-height](https://developer.mozilla.org/ko/docs/Web/CSS/line-height)

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

<div class="result"></div>

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

<div class="result"></div>

# 5. font Shorthand

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

# 6. text-align 속성

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

<div class="result"></div>

위 예제의 a 요소에 대한 중앙 정렬은 적용되지 않았다. 이는 a 요소는 inline 요소이기 때문이다. inline 요소는 width 속성이 없으므로 중앙 개념이 존재하지 않는다. a 요소에 `display: block;`을 지정한다면 중앙 정렬이 가능할 것이다.

# 7. text-decoration 속성

`text-decoration` 속성을 사용하여 링크 underline을 제거할 수 있다. 또는 텍스트에 underline, overline, line-through를 추가할 수도 있다.

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

<div class="result"></div>

# 8. white-space 속성

html의 white space는 공백(space), 들여쓰기(tab), 줄바꿈(line break)을 의미한다. html은 기본적으로 연속된 공백(space), 들여쓰기(tab)는 1번만 실행되며 줄바꿈(line break)은 무시된다. 또한 텍스트는 부모 가로 영역을 벗어나지 않고 자동 줄바꿈(wrap)된다. `white-space` 속성은 이러한 기본 동작을 제어하기 위한 속성이다.

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

<div class="result"></div>

# 9. text-overflow 속성

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

<div class="result"></div>

# 10. word-wrap 속성

한 단어의 길이가 길어서 부모 영역을 벗어난 텍스트의 처리 방법을 정의한다. link 등을 표기할 때(e.g. http://poiemaweb.com/css3-font-text.html) 그 길이가 매우 길어지는데 이 속성을 사용하지 않으면 부모 영역을 넘어가게 된다.

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
    <div>Floccinaucinihilipilification http://poiemaweb.com/css3-font-text.html</div>
    <div class="word-wrap">Floccinaucinihilipilification http://poiemaweb.com/css3-font-text.html</div>
  </body>
</html>
```

<div class="result"></div>

# 11. word-break 속성

한 단어의 길이가 길어서 부모 영역을 벗어난 텍스트의 처리 방법을 정의한다.

`word-wrap` 속성은 단어를 어느 정도는 고려하여 개행하지만(.,- 등을 고려한다) `word-break: break-all;`는 단어를 부모 영역에 맞추어 개행한다.

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
  <div>Floccinaucinihilipilification http://poiemaweb.com/css3-font-text.html</div>

  <h1>word-wrap</h1>
  <div class="word-wrap">Floccinaucinihilipilification http://poiemaweb.com/css3-font-text.html</div>

  <h1>word-break</h1>
  <div class="word-break">Floccinaucinihilipilification http://poiemaweb.com/css3-font-text.html</div>
</body>
</html>
```

<div class="result"></div>

# Reference

* [W3C CSS Document](https://www.w3.org/TR/CSS/)
