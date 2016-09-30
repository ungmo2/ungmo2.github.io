---
layout: post
title: CSS3 - Margin collapsing (마진 상쇄)
categories: css
---

* TOC
{:toc}

# Margin collapsing?

마진 상쇄(Margin collapsing)란 블록의 top과 bottom의 마진이 결합되어 상쇄되는 것을 말한다.

![margin-collapsing](/img/margin-collapsing.png)
{: style="max-width:550px; margin: 10px auto;"}

마진 상쇄 현상의 발생에는 일정 조건이 있다. 즉 반드시 마진 상쇄가 일어는 것이 아니라 일정 조건하에서 일어 나기 때문에 마진 상쇄에 대한 정확한 이해가 없으면 현상을 이해하기가 어려울 수 있다.

# 상쇄조건 A : 인접 형제 요소

**상하로 인접한 요소의 margin은 상쇄된다.**

<p data-height="388" data-theme-id="0" data-slug-hash="LRjJVy" data-default-tab="css,result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/LRjJVy/">margin collapsing - A</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

# Reference

[MDN : Margin collapsing](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)
