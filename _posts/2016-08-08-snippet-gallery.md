---
layout: post
title: Snippet - Gallery
subtitle:
categories: snippet
section: snippet
---

* TOC
{:toc}

# 1. Zooming Background-image Gallery

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link href="https://fonts.googleapis.com/css?family=Raleway:300,400" rel="stylesheet">
  <link rel="stylesheet" href="http://poiemaweb.com/assets/vendor/fancybox/jquery.fancybox.css">
  <style>
    /* Global Styling */
    * {
      box-sizing: border-box;
      margin: 0px;
      padding: 0px;
    }

    .wrapper {
      width: 85%;
      margin: 50px auto 0;
      overflow: hidden;
    }

    .item-wrapper {
      float: left;
      width: 45%;
      height: 300px;
      margin: 20px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
    }

    .item-wrapper:nth-of-type(2n) {
      float: right;
    }

    .item {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      transition: all .5s;
    }

    .item-wrapper:nth-child(1) .item {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-1.png);
    }

    .item-wrapper:nth-child(2) .item {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-2.png);
    }

    .item-wrapper:nth-child(3) .item{
      background-image: url(http://poiemaweb.com/assets/images/dribbble-3.png);
    }

    .item-wrapper:nth-child(4) .item {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-4.png);
    }

    .item-wrapper:nth-child(5) .item {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-5.png);
    }

    .item-wrapper:nth-child(6) .item{
      background-image: url(http://poiemaweb.com/assets/images/dribbble-6.png);
    }

    .image-btn {
      display: block;
      width: 100px;
      height: 30px;
      font-family: 'Raleway', sans-serif;
      font-size: 16px;
      font-weight: 300;
      color: #fff;
      text-align: center;
      line-height: 30px;
      text-decoration: none;
      border-radius: 10px;
      border: 1px solid #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      opacity: 0;
      transition: all .4s linear;
    }

    .image-btn:hover {
      color: #000;
      background-color: #fff;
    }

    .item-wrapper:hover .item,
    .item-wrapper:focus .item {
      transform: scale(1.1);
    }

    .item-wrapper:hover .image-btn,
    .item-wrapper:focus .image-btn {
      opacity: 1;
    }

    /* Media Queries */
    @media screen and (max-width: 960px) {
      .item-wrapper {
        float: none;
        width: 100%;
        margin: 20px 0px
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="item-wrapper">
      <div class="item">
        <a class="image-btn fancybox" href="http://poiemaweb.com/assets/images/dribbble-1.png">View</a>
      </div>
    </div>

    <div class="item-wrapper">
      <div class="item">
        <a class="image-btn fancybox" href="http://poiemaweb.com/assets/images/dribbble-2.png">View</a>
      </div>
    </div>

    <div class="item-wrapper">
      <div class="item">
        <a class="image-btn fancybox" href="http://poiemaweb.com/assets/images/dribbble-3.png">View</a>
      </div>
    </div>

    <div class="item-wrapper">
      <div class="item">
        <a class="image-btn fancybox" href="http://poiemaweb.com/assets/images/dribbble-4.png">View</a>
      </div>
    </div>

    <div class="item-wrapper">
      <div class="item">
        <a class="image-btn fancybox" href="http://poiemaweb.com/assets/images/dribbble-5.png">View</a>
      </div>
    </div>

    <div class="item-wrapper">
      <div class="item">
        <a class="image-btn fancybox" href="http://poiemaweb.com/assets/images/dribbble-6.png">View</a>
      </div>
    </div>
  </div>
  <script src="http://poiemaweb.com/assets/vendor/jquery/dist/jquery.min.js"></script>
  <script src="http://poiemaweb.com/assets/vendor/fancybox/jquery.fancybox.pack.js"></script>
  <script>
  $(function() {
    // Fancybox
    $('.fancybox').fancybox({
      helpers: {
        overlay: { locked: false }
      }
    });
  });
  </script>
</body>
</html>
```

<p data-height="500" data-theme-id="0" data-slug-hash="GNvbZG" data-default-tab="result" data-user="ungmo2" data-embed-version="2" data-pen-title="zooming-background-image" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/GNvbZG/">zooming-background-image</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

# 2. Masonry Grid Animation & Fancybox

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Masonry & Fancybox</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:300" rel="stylesheet">
  <link rel="stylesheet" href="http://poiemaweb.com/assets/vendor/fancybox/jquery.fancybox.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #e3e3e3;
      padding: 20px;
      font-family: "Roboto Slab", serif;
    }

    .wrapper {
      margin: 50px auto;
      background: #fff;
      max-width: 800px;
      box-shadow: 0px 25px 30px -20px rgba(0, 0, 0, 0.2);
    }

    .grid {
      margin: 0 auto;
      padding: 10px;
      -webkit-perspective: 1000px;
      perspective: 1000px;
    }

    .grid-item {
      width: 180px;
      height: 100px;
      margin-bottom: 10px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      opacity: 0;
    }

    .grid-item.is-visible {
      animation: Items .6s ease-in forwards;
    }

    @keyframes Items {
      0% {
        opacity: 0;
        -webkit-transform: scale(0.3) rotateY(90deg);
        transform: scale(0.3) rotateY(90deg);
      }
      60% {
        -webkit-transform: scale(1.4);
        transform: scale(1.4);
      }
      90% {
        -webkit-transform: scale(0.9);
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
      }
    }

    .fancybox {
      display: block;
      width: 100%;
      height: 100%;
      height: 100%;
      width: 100%;
      border-radius: 4px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      transition: all .5s;
    }

    .grid-item:hover .fancybox {
      transform: scale(1.1);
    }

    .grid-item:nth-child(1) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-1.png);
    }

    .grid-item:nth-child(2) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-2.png);
    }

    .grid-item:nth-child(3) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-3.png);
    }

    .grid-item:nth-child(4) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-4.png);
    }

    .grid-item:nth-child(5) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-5.png);
    }

    .grid-item:nth-child(6) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-6.png);
    }

    .grid-item:nth-child(7) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-7.png);
    }

    .grid-item:nth-child(8) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-8.png);
    }

    .grid-item:nth-child(9) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-9.png);
    }

    .grid-item:nth-child(10) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-10.png);
    }

    .grid-item:nth-child(11) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-11.png);
    }

    .grid-item:nth-child(12) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-12.png);
    }

    .grid-item:nth-child(13) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-13.png);
    }

    .grid-item:nth-child(14) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-14.png);
    }

    .grid-item:nth-child(15) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-15.png);
    }

    .grid-item:nth-child(16) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-16.png);
    }

    .grid-item:nth-child(17) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-17.png);
    }

    .grid-item:nth-child(18) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-18.png);
    }

    .grid-item:nth-child(19) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-19.png);
    }

    .grid-item:nth-child(4n-5) {
      height: 50px;
    }

    .grid-item:nth-child(2n) {
      height: 300px;
    }

    .grid-item:nth-child(3n) {
      height: 120px;
    }
  </style>
</head>

<body>
  <h1 style="text-align: center;">Masonry Grid Animation & Fancybox</h1>
  <div class="wrapper">
    <div class="grid">
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-1.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-2.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-3.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-4.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-5.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-6.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-7.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-8.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-9.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-10.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-11.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-12.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-13.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-14.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-15.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-16.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-17.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-18.png"></a>
      </div>
      <div class="grid-item">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-19.png"></a>
      </div>
    </div>
  </div>
<script src="http://poiemaweb.com/assets/vendor/jquery/dist/jquery.js"></script>
<script src="http://poiemaweb.com/assets/vendor/masonry.pkgd.js"></script>
<script src="http://poiemaweb.com/assets/vendor/fancybox/jquery.fancybox.pack.js"></script>
<script>
$(function() {
  // Masonry Grid
  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 180,
    fitWidth: true, // When enabled, you can center the container with CSS.
    gutter: 10
  });

  // Loading Animation
  $('.grid-item').each(function(i) {
    setTimeout(function() {
      $('.grid-item').eq(i).addClass('is-visible');
    }, 200 * i);
  });

  // Fancybox
  $('.fancybox').fancybox({
    helpers: {
      overlay: { locked: false }
    }
  });
});
</script>
</body>
</html>
```

<p data-height="1000" data-theme-id="0" data-slug-hash="QGqjmW" data-default-tab="result" data-user="ungmo2" data-embed-version="2" data-pen-title="Masonry Grid Animation & Fancybox" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/QGqjmW/">Masonry Grid Animation & Fancybox</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

# 3. Isotope & Fancybox

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>isotope & Fancybox</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:300" rel="stylesheet">
  <link rel="stylesheet" href="http://poiemaweb.com/assets/vendor/fancybox/jquery.fancybox.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #e3e3e3;
      padding: 20px;
      font-family: "Roboto Slab", serif;
    }

    .wrapper {
      margin: 50px auto;
      background: #fff;
      max-width: 800px;
      box-shadow: 0px 25px 30px -20px rgba(0, 0, 0, 0.2);
    }

    .filter {
      padding: 20px 0;
      margin-bottom: 20px;
      border-bottom: solid 1px #e3e3e3;
      text-align: center;
      font-size: 12px;
    }

    .filter a {
      margin-right: 10px;
      color: #666;
      text-decoration: none;
      border: 1px solid #ccc;
      padding: 4px 15px;
      border-radius: 50px;
      display: inline-block;
    }

    .filter a.current {
      background: #1e1e1e;
      border: 1px solid #1e1e1e;
      color: #f9f9f9;
    }

    .grid {
      margin: 0 auto;
      padding: 10px;
      -webkit-perspective: 1000px;
      perspective: 1000px;
    }

    .grid-item {
      width: 180px;
      height: 100px;
      margin-bottom: 10px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
    }

    .fancybox {
      display: block;
      width: 100%;
      height: 100%;
      height: 100%;
      width: 100%;
      border-radius: 4px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      transition: all .5s;
    }

    .grid-item:hover .fancybox {
      transform: scale(1.1);
    }

    .grid-item:nth-child(1) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-1.png);
    }

    .grid-item:nth-child(2) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-2.png);
    }

    .grid-item:nth-child(3) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-3.png);
    }

    .grid-item:nth-child(4) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-4.png);
    }

    .grid-item:nth-child(5) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-5.png);
    }

    .grid-item:nth-child(6) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-6.png);
    }

    .grid-item:nth-child(7) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-7.png);
    }

    .grid-item:nth-child(8) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-8.png);
    }

    .grid-item:nth-child(9) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-9.png);
    }

    .grid-item:nth-child(10) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-10.png);
    }

    .grid-item:nth-child(11) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-11.png);
    }

    .grid-item:nth-child(12) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-12.png);
    }

    .grid-item:nth-child(13) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-13.png);
    }

    .grid-item:nth-child(14) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-14.png);
    }

    .grid-item:nth-child(15) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-15.png);
    }

    .grid-item:nth-child(16) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-16.png);
    }

    .grid-item:nth-child(17) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-17.png);
    }

    .grid-item:nth-child(18) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-18.png);
    }

    .grid-item:nth-child(19) .fancybox {
      background-image: url(http://poiemaweb.com/assets/images/dribbble-19.png);
    }

    .grid-item:nth-child(4n-5) {
      height: 50px;
    }

    .grid-item:nth-child(2n) {
      height: 300px;
    }

    .grid-item:nth-child(3n) {
      height: 120px;
    }
  </style>
</head>

<body>
  <h1 style="text-align: center;">Isotope & Fancybox</h1>
  <div class="wrapper">
    <div class="filter">
      <a href="#" data-filter="*" class="current">All Categories</a>
      <a href="#" data-filter=".webTemplates">Web Templates</a>
      <a href="#" data-filter=".logos">Logos</a>
      <a href="#" data-filter=".drawings">Drawings</a>
      <a href="#" data-filter=".ui">UI Elements</a>
    </div>
    <div class="grid">
      <div class="grid-item logos">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-1.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-2.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-3.png"></a>
      </div>
      <div class="grid-item webTemplates">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-4.png"></a>
      </div>
      <div class="grid-item webTemplates">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-5.png"></a>
      </div>
      <div class="grid-item ui">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-6.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-7.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-8.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-9.png"></a>
      </div>
      <div class="grid-item logos">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-10.png"></a>
      </div>
      <div class="grid-item ui">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-11.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-12.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-13.png"></a>
      </div>
      <div class="grid-item logos">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-14.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-15.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-16.png"></a>
      </div>
      <div class="grid-item logos">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-17.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-18.png"></a>
      </div>
      <div class="grid-item drawings">
        <a class="fancybox" href="http://poiemaweb.com/assets/images/dribbble-19.png"></a>
      </div>
    </div>
  </div>
<script src="http://poiemaweb.com/assets/vendor/jquery/dist/jquery.js"></script>
<script src="http://poiemaweb.com/assets/vendor/isotope.pkgd.min.js"></script>
<script src="http://poiemaweb.com/assets/vendor/fancybox/jquery.fancybox.pack.js"></script>
<script>
$(function() {
  // Masonry Grid
  $('.grid').isotope({
    filter: '*',
    // itemSelector: '.grid-item',
    masonry: {
      columnWidth: 180,
      fitWidth: true, // When enabled, you can center the container with CSS.
      gutter: 10
    }
    // layoutMode: 'fitRows'
  });

  $('.filter a').click(function(){
    $('.filter .current').removeClass('current');
    $(this).addClass('current');

    var selector = $(this).data('filter');
    $('.grid').isotope({
      filter: selector
    });
    return false;
  });

  // Fancybox
  $('.fancybox').fancybox({
    helpers: {
      overlay: { locked: false }
    }
  });
});
</script>
</body>
</html>
```

<p data-height="600" data-theme-id="0" data-slug-hash="BQGRaL" data-default-tab="result" data-user="ungmo2" data-embed-version="2" data-pen-title="Isotope & Fancybox" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/BQGRaL/">Isotope & Fancybox</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
