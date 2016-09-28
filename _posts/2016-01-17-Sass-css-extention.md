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

# Reference

* [Sass](http://sass-lang.com/)

* [The Sass Way](http://www.thesassway.com/)

* [Getting Started with SASS ](https://scotch.io/tutorials/getting-started-with-sass)

* [Sass & Compass Color Functions](http://jackiebalzer.com/color)

* [Using pure Sass functions to make reusable logic more useful](http://thesassway.com/advanced/pure-sass-functions)

* [The Sass Ampersand](https://css-tricks.com/the-sass-ampersand/)

* [Approaches to Media Queries in Sass](https://css-tricks.com/approaches-media-queries-sass/)
