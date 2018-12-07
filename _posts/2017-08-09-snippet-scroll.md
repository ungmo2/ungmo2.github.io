---
layout: post
title: Snippet - Scroll
subtitle:
categories: snippet
section: snippet
seq: 8
subseq: 9
---

* TOC
{:toc}

# 1. Waypoints

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Waypoints</title>
  <link rel="stylesheet" href="assets/vendor/animate.css/animate.min.css">
  <style>
    section {
      height: 500px;
      background-color: #f0f0f0;
      margin: 5px;
    }
  </style>
</head>
<body>
  <section id="header">&#8595;&#8595;&#8595;</section>
  <section id="animation">
    <img src="img/carl.jpg">
    <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h1>
  </section>
</body>
<script src="assets/vendor/jquery/dist/jquery.min.js"></script>
<script src="assets/vendor/waypoints/lib/jquery.waypoints.min.js"></script>

<script>
  $(function() {
    $('#animation').waypoint(function(direction) {
      if(direction == 'down') {
        $('#animation img').addClass('animated shake');
        $('#animation h1').addClass('animated bounceInRight');
      } else {
        $('#animation img').removeClass('animated shake');
        $('#animation h1').removeClass('animated bounceInRight');
      }
    }, { offset: '50%' });
  });
</script>
</html>
```

<p data-height="265" data-theme-id="0" data-slug-hash="aBJJdo" data-default-tab="result" data-user="ungmo2" data-embed-version="2" data-pen-title="waypoints" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/aBJJdo/">waypoints</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
