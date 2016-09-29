---
layout: post
title: Sass - CSS Extensions
categories: [Sass]
tags: []
---

![sass-logo](/img/sass-logo.png)

* TOC
{:toc}

# 1. Nesting

Sass의 유용한 확장 기능으로 선언을 중첩(Nesting)하는 것이다.

CSS는 자식요소를 선택하여 선언하는 경우 부모요소를 기술하여야 한다.

```css
.container {
  width: 100%;
}

.container h1 {
  color: red;
}
```

하지만 Sass는 Nesting으로 표현할 수 있다.

```scss
.container {
  width: 100%;
  h1 {
    color: red;
  }
}
```

부모요소의 참조가 필요한 경우 `&`를 사용한다. 예를들어 :hover 또는 ::before 등의 [가상 클래스 선택자 (Pseudo-Class Selector)](http://poiemaweb.com/css/CSS3-Selector/#pseudo-class-selector)를 지정하는 경우 부모요소의 참조가 필요하다.

```scss
a.myAnchor {
  color: blue;
  &:hover {   // a.myAnchor:hover
    text-decoration: underline;
  }
  &:visited { // a.myAnchor:visited
    color: purple;
  }
}
```

Nesting은 속성에도 사용할 수 있다.

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

# 2. @import

1개의 CSS 파일에 모든 스타일을 기술하는 것은 가독성을 나쁘게 한다. 따라서 룰을 정하여 파일을 분리하여 개발하는 것이 유지보수 측면에서 효과적이다.

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

여러개의 파일로 분할하는 것 또는 분항된 파일을 **partial** 이라 하며 partial된 Sass 파일명의 선두에 underscore(&#95;)를 붙인다. (&#95;reset.scss, &#95;module.scss, &#95;print.scss)

예를 들어 "&#95;foo.scss"라는 partial된 Sass 파일이 있고 이 파일을 import하는 경우 아래와 같이 기술한다. 파일명 선두의 &#95와 확장자는 생략할 수 있다.

```scss
@import "foo";
```

partial된 Sass 파일명 선두에 붙인 &#95;의 의미는 import는 수행하되 CSS로의 컴파일은 수행하지 말라는 의미를 갖는다. 따라서 partial은 import시에는 CSS 파일로 컴파일되지 않기 때문에 최종적으로 CSS로 컴파일을 수행할 Sass 파일로 import된다.

![partial](/img/partial.png)
{: style="max-width:550px; margin:10px auto;"}



# Reference

* [Sass](http://sass-lang.com/)

* [The Sass Way](http://www.thesassway.com/)

* [Getting Started with SASS ](https://scotch.io/tutorials/getting-started-with-sass)

* [Sass & Compass Color Functions](http://jackiebalzer.com/color)

* [Using pure Sass functions to make reusable logic more useful](http://thesassway.com/advanced/pure-sass-functions)

* [The Sass Ampersand](https://css-tricks.com/the-sass-ampersand/)

* [Approaches to Media Queries in Sass](https://css-tricks.com/approaches-media-queries-sass/)
