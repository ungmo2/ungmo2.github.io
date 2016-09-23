---
layout: post
title: Centering with CSS
subtitle: CSS를 사용한 HTML 요소의 수평 수직 중앙 정렬
categories: css
---

* TOC
{:toc}

# 1. 수평 정렬(Horizontal Align)

## 1.1 inline/inline-block 요소

정렬 대상 요소(텍스트 또는 링크 등)의 부모 요소에 `text-align: center;`를 지정한다.

```css
.container {
  text-align: center;
}
```

## 1.2 block 요소

정렬 대상 요소에 너비를 명시적으로 지정하고 margin-right와 margin-left 속성에 auto를 지정한다.

정렬 대상 요소에 너비를 명시적으로 지정하지 않으면 너비는 full width가 되므로 중앙 정렬이 필요없다.

```css
.item {
  width: 200px;
  margin: 20px auto;
}
```

## 1.3 복수의 block 요소

복수의 block 요소는 기본적으로 수직 정렬된다. 이것을 수평정렬하기 위해서는 정렬 대상 block 요소를 inline-block 요소로 변경한 후 부모 요소에 `text-align: center;`를 지정한다.

정렬 대상 요소에 width를 지정하지 않으면 컨텐츠에 너비에 맞추어 너비가 결정되므로 명시적으로 너비를 지정한다.

```css
.container {
  text-align: center;
}
.item {
  width: 150px;
  display: inline-block;
}
```

[flexbox](http://poiemaweb.com/css/Flexbox/)를 사용할 수도 있다.

```css
.flex-center {
  display: flex;
  justify-content: center;
}
```

<p data-height="1133" data-theme-id="0" data-slug-hash="PGWvBZ" data-default-tab="result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/PGWvBZ/">centering-horizontal-align</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

# 2. 수직 정렬(Vertical Align)

## 2.1 inline/inline-block 요소

## 2.2 block 요소

# 3. 수평/수직 정렬(Horizontal & Vertical Align)

## 3.1 요소의 너비와 높이가 고정되어 있는 경우

## 3.1 요소의 너비와 높이가 불확정 상태의 경우

# Reference

[Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
