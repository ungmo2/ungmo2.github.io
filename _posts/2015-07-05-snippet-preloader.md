---
layout: post
title: Snippet - Preloader
subtitle:
categories: snippet
section: snippet
---

* TOC
{:toc}

# 1. Loading Animation

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .loader {
      height: 20px;
      width: 250px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
    .loader-dot {
      height: 20px;
      width: 20px;
      border-radius: 100%;
      background-color: black;
      position: absolute;
      border: 2px solid white;
      animation: loader 3s infinite ease-in-out alternate;
    }
    .loader-dot:first-child {
      background-color: #8cc759;
      animation-delay: 0.5s;
    }
    .loader-dot:nth-child(2) {
      background-color: #8c6daf;
      animation-delay: 0.4s;
    }
    .loader-dot:nth-child(3) {
      background-color: #ef5d74;
      animation-delay: 0.3s;
    }
    .loader-dot:nth-child(4) {
      background-color: #f9a74b;
      animation-delay: 0.2s;
    }
    .loader-dot:nth-child(5) {
      background-color: #60beeb;
      animation-delay: 0.1s;
    }
    .loader-dot:nth-child(6) {
      background-color: #fbef5a;
      animation-delay: 0s;
    }
    .loader-text {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      width: 4rem;
      margin: auto;
    }
    .loader-text:after {
      content: "Loading";
      font-weight: bold;
      animation-name: loading-text;
      animation-duration: 3s;
      animation-iteration-count: infinite;
    }
    @keyframes loader {
      15% {
        transform: translateX(0);
      }
      45% {
        transform: translateX(230px);
      }
      65% {
        transform: translateX(230px);
      }
      95% {
        transform: translateX(0);
      }
    }
    @keyframes loading-text {
      0% {
        content: "Loading";
      }
      25% {
        content: "Loading.";
      }
      50% {
        content: "Loading..";
      }
      75% {
        content: "Loading...";
      }
    }
  </style>
</head>
<body>
  <div class="loader">
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-text"></div>
  </div>
</body>
</html>
```

<div class="result"></div>


```html
<!DOCTYPE html>
<html>
<head>
  <style>
  .loader {
    width: 100px;
    height: 10px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .loader span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: black;
    border-radius: 50px;
    animation: loader 0.9s infinite alternate;
  }
  .loader span:nth-of-type(2) {
    animation-delay: 0.3s;
  }
  .loader span:nth-of-type(3) {
    animation-delay: 0.6s;
  }
  @keyframes loader {
    0% {
      width: 10px;
      height: 10px;
      opacity: 0.9;
      transform: translateY(0);
    }
    100% {
      width: 24px;
      height: 24px;
      opacity: 0.1;
      transform: translateY(-21px);
    }
  }
  </style>
</head>
<body>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
</div>
</body>
</html>
```

<div class="result"></div>

# 2. Page Preloader

```html
<!DOCTYPE html>
<html>
<head>
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
    /* Page Preloader */
    .loader {
      height: 20px;
      width: 250px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
    .loader-dot {
      height: 20px;
      width: 20px;
      border-radius: 100%;
      background-color: black;
      position: absolute;
      border: 2px solid white;
      animation: loader 3s infinite ease-in-out alternate;
    }
    .loader-dot:first-child {
      background-color: #8cc759;
      animation-delay: 0.5s;
    }
    .loader-dot:nth-child(2) {
      background-color: #8c6daf;
      animation-delay: 0.4s;
    }
    .loader-dot:nth-child(3) {
      background-color: #ef5d74;
      animation-delay: 0.3s;
    }
    .loader-dot:nth-child(4) {
      background-color: #f9a74b;
      animation-delay: 0.2s;
    }
    .loader-dot:nth-child(5) {
      background-color: #60beeb;
      animation-delay: 0.1s;
    }
    .loader-dot:nth-child(6) {
      background-color: #fbef5a;
      animation-delay: 0s;
    }
    .loader-text {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      width: 4rem;
      margin: auto;
    }
    .loader-text:after {
      content: "Loading";
      font-weight: bold;
      animation-name: loading-text;
      animation-duration: 3s;
      animation-iteration-count: infinite;
    }
    @keyframes loader {
      15% {
        transform: translateX(0);
      }
      45% {
        transform: translateX(230px);
      }
      65% {
        transform: translateX(230px);
      }
      95% {
        transform: translateX(0);
      }
    }
    @keyframes loading-text {
      0% {
        content: "Loading";
      }
      25% {
        content: "Loading.";
      }
      50% {
        content: "Loading..";
      }
      75% {
        content: "Loading...";
      }
    }
    /* Page Wrapper */
    .wrapper {
      display: none;
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
  <div class="loader">
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-text"></div>
  </div>

  <div class="wrapper">
    <h1 style="text-align:center; padding:20px;">Isotope Grid Animation & Fancybox</h1>
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

      $('.filter a').click(function() {
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
          overlay: {
            locked: false
          }
        }
      });

      $(window).load(function() {
        $('.loader').delay(500).fadeOut('slow').promise().done(function() {
          $('.wrapper').fadeIn('slow');
          // Masonry Grid
          $('.grid').isotope({
            filter: '*',
            masonry: {
              columnWidth: 180,
              fitWidth: true, // When enabled, you can center the container with CSS.
              gutter: 10
            }
          });
        });
      });
    });
  </script>
</body>
</html>
```
<p data-height="750" data-theme-id="0" data-slug-hash="JbqJGZ" data-default-tab="result" data-user="ungmo2" data-embed-version="2" data-pen-title="Page Preloader" class="codepen">See the Pen <a href="http://codepen.io/ungmo2/pen/JbqJGZ/">Page Preloader</a> by Ungmo Lee (<a href="http://codepen.io/ungmo2">@ungmo2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
