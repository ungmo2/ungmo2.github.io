---
layout: post
title: Sass - <strong>CSS Extensions</strong>
subtitle: Nesting, import, extend, 조건과 반복, Mixin, Function
categories: Sass
section: Sass
description: Sass의 유용한 확장 기능으로 선언을 중첩(Nesting)하는 것이다. CSS는 후손 셀렉터(Descendant Combinator)의 경우, 부모요소를 기술하여야 한다.
---

* TOC
{:toc}

![sass-logo](/img/sass-logo.png)

# 1. Nesting

Nesting은 Sass의 유용한 확장 기능으로 선언을 중첩(Nesting)하는 것이다.

CSS는 [후손 셀렉터(Descendant Combinator)](./css3-selector#61-후손-셀렉터-descendant-combinator)의 경우, 부모요소를 기술하여야 한다.

```css
#navbar {
  width: 80%;
  height: 23px;
}

#navbar ul {
  list-style-type: none;
}

#navbar li {
  float: left;
}

#navbar li a {
  font-weight: bold;
}
```

Sass의 Nesting은 후손 셀렉터를 간단히 기술이 가능하다. 또한 HTML의 구조를 반영한 CSS를 기술할 수 있다.

```scss
#navbar {
  width: 80%;
  height: 23px;

  ul { list-style-type: none; }

  li {
    float: left;
    a { font-weight: bold; }
  }
}
```

너무 깊은 Nesting은 가독성을 나쁘게 하고 셀렉터를 복잡하게 만든다.

```scss
// Bad case
div#main {
  #sidebar {
    #navbar {
      width: 80%;
      height: 23px;

      aside {
        div {
          ul {
            list-style-type: none;

            li {
              float: left;

              a {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}
```

부모요소의 참조가 필요한 경우 `&`를 사용한다. 예를들어 :hover 또는 ::before 등의 [가상 클래스 선택자 (Pseudo-Class Selector)](./css3-selector#7-가상-클래스-셀렉터-pseudo-class-selector)를 지정하는 경우 부모요소의 참조가 필요하다.

```scss
.myAnchor {
  color: blue;

  // .myAnchor:hover
  &:hover {
    text-decoration: underline;
  }

  // .myAnchor:visited
  &:visited {
    color: purple;
  }
}
```

Nesting은 프로퍼티에도 사용할 수 있다.

```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

위 코드의 컴파일 결과는 아래와 같다.

```css
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

# 2. @-Rules and Directives

## 2.1 @import

1개의 CSS 파일에 모든 스타일을 기술하는 것은 가독성을 나쁘게 한다. 또한 기능에 따라 CSS 파일을 분리하면 재사용 및 유지보수 측면에서 유리하다. 따라서 룰을 정하여 파일을 분리하여 개발하는 것은 효과적인 방법이다.

Sass는 @import directive를 사용하여 분리된 stylesheet 파일을 import할 수 있다. 기존의 [CSS @import](https://developer.mozilla.org/ko/docs/Web/CSS/@import)보다 편리한 기능을 제공한다.

```scss
@import "foo.scss";

// 확장자는 생략 가능하다
@import "foo";

// import multiple files
@import "rounded-corners", "text-shadow";

$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=#{$family}");
```

여러 개의 파일로 분할하는 것 또는 분할된 파일을 **partial** 이라 하며 partial된 Sass 파일명의 선두에는 underscore(&#95;)를 붙인다. (&#95;reset.scss, &#95;module.scss, &#95;print.scss)

예를 들어 "&#95;foo.scss"라는 partial된 Sass 파일이 있고 이 파일을 import하는 경우 아래와 같이 기술한다. 파일명 선두의 &#95;와 확장자는 생략할 수 있다.

```scss
@import "foo";
```

partial된 Sass 파일명 선두에 붙인 &#95;의 의미는 import는 수행하되 CSS로의 컴파일은 수행하지 말라는 의미를 갖는다. 따라서 partial은 import시에는 CSS 파일로 컴파일되지 않기 때문에 최종적으로 CSS로 컴파일을 수행할 Sass 파일에서 import한다.

![partial](/img/partial.png)

예를 들어 위 그림과 같이 partial된 _vars.scss, _header.scss, _sidebar.scss, _footer.scss를 style.scss가 import하는 경우를 생각해 보자.

```scss
// _vars.scss
$width: 960px;
```

```scss
// _header.scss
#header {
  width: $width;
}
```

```scss
// _sidebar.scss
#sidebar {
  width: $width;
}
```

```scss
// _footer.scss
#footer {
  width: $width;
}
```

```scss
// style.scss
@import "partial/vars";
@import "partial/header";
@import "partial/sidebar";
@import "partial/footer";
```

_vars.scss에는 변수가 선언되어 있으므로 partial된 _vars.scss, _header.scss, _sidebar.scss, _footer.scss를 import가 수행되어 하나의 파일이 되기 이전에 컴파일을 실행하면 에러가 발생한다. 즉, partial된 Sass 파일명 선두에 붙인 &#95;을 제거하면 에러가 발생한다. 따라서 partial된 Sass 파일명 선두에는 반드시 &#95;를 붙여서 import 시에는 partial이 CSS 파일로 컴파일되지 않고 import가 완료된 이후, CSS로 컴파일을 수행도록 한다.

@import는 top-level에서 사용하는 것이 일반적이지만 CSS rule 또는 @media rule 내에 포함시키는 것도 가능하다.

```scss
// _example.scss
.example {
  color: red;
}
```

```scss
#main {
  @import "example";
}
```

위 코드의 컴파일 결과는 아래와 같다.

```css
#main .example {
  color: red;
}
```

## 2.2 @extend

기존 스타일을 상속하고자 경우 @extend를 사용한다.

예를 들어 아래의 경우를 살펴보자.

```html
<div class="error seriousError">
  Oh no! You've been hacked!
</div>
```

기존에 선언되어 있는 error class를 사용하면서 일부 rule set에 대해서는 다른 선언이 필요한 경우 자주 사용하는 방법이다.

이러한 경우 사용할 수 있는 방법이 상속이다. 상속되는 rule set을 그대로 상속받아 다른 부분만 별도 선언하면 된다.

```scss
.error {
  border: 1px #f00;
  background-color: blue;
}

.seriousError {
  @extend .error;

  border-width: 3px;
  border-color: darkblue;
}
```

위 코드의 컴파일 결과는 아래와 같다. .error와 .seriousError가 공통으로 사용하는 프로퍼티를 묶어 합리적인 룰셋을 생성한다.

```css
.error, .seriousError {
  border: 1px #f00;
  background-color: blue;
}

.seriousError {
  border-width: 3px;
  border-color: darkblue;
}
```

이제는 하나의 클래스만 적용시키면 된다.

```html
<div class="seriousError">
  Oh no! You've been hacked!
</div>
```

@extend를 @media 블록과 같이 사용하는 경우, 제대로 작동하지 않는다. 다시말해 @media 안에서 외부의 선택자를 @extend할 수 없다.

```scss
.foo {
  color: red;
}

@media print {
  .bar {
    // ERROR
    @extend .foo;
  }
}
```

@extend를 사용하면 컴파일 후 자신의 셀렉터가 어디에 첨부될 것인지 예상하기 어렵고, 예상치 못했던 부작용이 발생할 수 있다. 따라서 @extend의 사용은 가급적 자제하고 Mixin은 사용하는 것을 추천한다.
{: .info}

- [@extend의 부작용](https://sass-guidelin.es/ko/#extend)

## 2.3 Placeholder Selectors

Placeholder Selector는 Sass 3.2부터 제공되는 기능으로 재이용이 가능한 rule set을 % 키워드로 지정하는 @extend 전용 Selector이다.

Placeholder Selector은 상속만을 위한 rule set으로 자신은 컴파일되지 않는다.

```scss
%input-style {
  font-size: 14px;
}

.input-black {
  @extend %input-style;

  color: black;
}

.input-red {
  @extend %input-style;

  color: red;
}
```

컴파일 결과는 아래와 같다.

```css
.input-black, .input-red {
  font-size: 14px;
}

.input-black {
  color: black;
}

.input-red {
  color: red;
}
```

# 3. 조건과 반복

Sass는 Javascript 같은 프로그래밍 언어와 같이 제어문(Control flow statement)을 사용할 수 있는 기능을 제공한다.

- [Javascript Control Flow](./js-control-flow)

## 3.1 if()

built-in if() 함수는 주어진 조건을 판단하여 결과를 리턴한다. Javascript의 삼항연산자와 유사하게 동작한다.

```scss
if(condition, if_true, if_false)
```

condition이 true이면 if_true를, false이면 if_false를 반환한다.

```scss
$type: ocean;

p {
  color: if($type == ocean, blue, black); // color: blue;
}
```

## 3.2 @if

@if를 사용하면 조건분기가 가능하다.

```scss
$type: monster;

p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

컴파일 결과는 아래와 같다.

```css
p {
  color: green;
}
```

## 3.3 @for

@for으로 반복문을 사용할 수 있다.

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

컴파일 결과는 아래와 같다.

```css
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}
```

## 3.4 @each

@each와 list 또는 map의 요소에 대해 반복을 실시한다.

```scss
// List
@each $animal in puma, sea-slug, egret, salamander {

  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

// Map
// $header: h1, $size: 2em
// $header: h2, $size: 1.5em
// $header: h3, $size: 1.2em
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```

컴파일 결과는 아래와 같다.

```css
.puma-icon {
  background-image: url("/images/puma.png");
}

.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
}

.egret-icon {
  background-image: url("/images/egret.png");
}

.salamander-icon {
  background-image: url("/images/salamander.png");
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

h3 {
  font-size: 1.2em;
}
```

## 3.5 @while

@while으로 반복문을 사용할 수 있다.

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

컴파일 결과는 아래와 같다.

```css
.item-6 {
  width: 12em;
}

.item-4 {
  width: 8em;
}

.item-2 {
  width: 4em;
}
```

# 4. Mixin

Mixin은 Sass의 매우 유용한 기능으로 중복 기술을 방지하기 위해 사용 빈도가 높은 마크업을 사전에 정의하여 필요할 때에 불러 사용하는 방법이다.

@extend와 유사하나 프로그래밍 언어의 함수와 같이 argument를 받을 수 있다.

사용법은 매우 간단하다. `@mixin` 선언하고 `@include`로 불러들인다.

```scss
// 지름이 50px인 원
@mixin circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

// 지름이 50px인 원을 위한 mixin을 include한 후, 배경을 추가 지정
.box {
  @include circle;

  background: #f00;
}
```

컴파일 결과는 아래와 같다. 배경이 red이고 지름이 50px인 원을 표시한다.

```css
.box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f00;
}
```

@extend와 차이가 없어 보이나 Mixin은 함수와 같이 argument를 사용할 수 있다.

```scss
@mixin circle($size) {
  width: $size;
  height: $size;
  border-radius: 50%;
}

.box {
  @include circle(100px);

  background: #f00;
}
```

컴파일 결과는 아래와 같다.

```css
.box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #f00;
}
```

argument의 초기값을 설정할 수도 있다.

```scss
@mixin circle($size: 10px) {
  width: $size;
  height: $size;
  border-radius: 50%;
}

.box {
  // 인자가 없으면 초기값을 사용한다.
  @include circle();
  background: #f00;
}
```

컴파일 결과는 아래와 같다.

```css
.box {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f00;
}
```

Mixin을 사용한 유용한 예제를 살펴보자.

vendor prefix
{: .title}

```scss
@mixin vendorPrefix($property, $value) {
  @each $prefix in -webkit-, -moz-, -ms-, -o-, '' {
    #{$prefix}#{$property}: $value;
  }
}

.border_radius {
  @include vendorPrefix(transition, 0.5s);
}
```

```css
.border_radius {
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -ms-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
}
```

opacity
{: .title}

```scss
@mixin opacity($opacity) {
  opacity: $opacity; /* All modern browsers */
  $opacityIE: $opacity * 100;
  filter: alpha(opacity=$opacityIE); /* For IE5~IE9 */
}

.box {
  @include opacity(0.5);
}
```

```css
.box {
  opacity: 0.5;
  /* All modern browsers */
  filter: alpha(opacity=50);
  /* For IE5~IE9 */
}
```

position
{: .title}

```scss
@mixin position($position, $top: null, $right: null, $bottom: null, $left: null) {
  position: $position;
  top: $top;
  right: $right;
  bottom: $bottom;
  left: $left;
}

.box {
  @include position(absolute, $top: 10px, $left: 50%);
}
```

```css
.box {
  position: absolute;
  top: 10px;
  left: 50%;
}
```

이와 같이 Mixin을 작성하여 사용할 수도 있으나 Sass Framework/Library를 사용하는 것은 매우 바람직한 방법이다.

- [Bourbon: Sass Mixins Library](http://bourbon.io/)

- [Compass: CSS Authoring Framework](http://compass-style.org/)

- [Susy: Sass grid framework](http://susy.oddbird.net/)


# 5. Function

Function은 mixin과 유사하나 리턴값에 차이가 있다.

- mixin : style markup을 리턴

- function : @return directive를 통하여 값을 리턴

```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }  // width: 240px;
```

# 6. Comment

CSS는 멀티 라인 주석 /&#42; &#42;/만을 지원하지만 Sass는 /&#42; &#42;/와 // 모두 사용할 수 있다.

한 줄 주석 //은 컴파일 후 CSS에서 사라지고, 멀티 라인 주석은 CSS에 나타난다.

# Reference

* [Sass](http://sass-lang.com/)

* [The Sass Way](http://www.thesassway.com/)

* [Getting Started with SASS ](https://scotch.io/tutorials/getting-started-with-sass)

* [Using pure Sass functions to make reusable logic more useful](http://thesassway.com/advanced/pure-sass-functions)

* [Approaches to Media Queries in Sass](https://css-tricks.com/approaches-media-queries-sass/)

* [Bourbon: Sass Mixins Library](http://bourbon.io/)

* [Compass: CSS Authoring Framework](http://compass-style.org/)

* [Susy: Sass grid framework](http://susy.oddbird.net/)
