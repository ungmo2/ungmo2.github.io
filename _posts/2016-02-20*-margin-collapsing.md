---
layout: post
title: CSS3 - Margin collapsing (마진 상쇄)
categories: css
section: css
---

* TOC
{:toc}

# Margin collapsing?

마진 상쇄(Margin collapsing)란 블록의 top과 bottom의 마진이 결합되어 상쇄되는 것을 말한다.

![margin-collapsing](/img/margin-collapsing.png)

마진 상쇄 현상의 발생에는 일정 조건이 있다. 즉 반드시 마진 상쇄가 일어는 것이 아니라 일정 조건하에서 일어 나기 때문에 마진 상쇄에 대한 정확한 이해가 없으면 현상을 이해하기가 어려울 수 있다.

# 상쇄조건 A : 상하로 인접한 형제 요소의 margin은 상쇄된다.

<p data-height="388" data-theme-id="0" data-slug-hash="LRjJVy" data-default-tab="css,result" data-user="ungmo2" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/LRjJVy/">margin collapsing - A</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

# 상쇄조건 B : 부모요소의 마진과 자식요소의 마진은 상쇄된다.
# 상쇄조건 C : 빈 블록은 부모요소의 마진과 자식요소의 마진은 상쇄된다.

marginの相殺が起きる場合のルール
上下に隣接する兄弟要素の marginの相殺
親のmarginと子のmarginの相殺
空のブロックは 自分自身の上下のmarginが相殺されます
ネガティブ・マージンの場合の相殺

marginの相殺が起こらない場合
display:inline-block な兄弟要素の場合（兄弟）
display:flex の中のFlexアイテムな兄弟要素の場合（兄弟）
float を指定した要素の場合（兄弟も親子も）
余談だけど、flort している要素と連接していると
clear を指定した要素の場合（兄弟も親子も）
親が overflow:visible 以外の overflow の指定のとき（親子）
親が position: absolute または fixed のとき（親子）

억제방법
親要素にpaddingを設定した場合

# Reference

[MDN : Margin collapsing](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)
