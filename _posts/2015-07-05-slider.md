---
layout: post
title: Snippet - Slider
subtitle:
categories: snippet
section: snippet
---

* TOC
{:toc}

# 1. Flex Slider

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Flex Slider</title>
    <link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="assets/vendor/flexslider/flexslider.css">
    <style>
    body {
      background-color: #f0f0f0;
    }
    .flexslider {
      margin: 0;
      overflow: hidden;
    }
    .flex-direction-nav a:before {
      font-size: 35px;
    }
    .flex-control-nav {
      bottom: 10px;
      z-index: 99;
    }
    /*Caption Text*/
    .flexslider .slides li {
      position: relative;
    }

    .flex-caption {
      color: white;
      font-size: 1.8em;
      font-weight: bold;
      width: 70%;
      text-align: center;
      position: absolute;
      top: 50%;
      left:50%;
      transform: translate(-50%, -50%);
    }
    </style>

  </head>
  <body>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h1>Silder</h1>
          <!-- Slider -->
          <div id="silder" class="flexslider">
            <ul class="slides">
              <li>
                <img src="assets/images/slide1.jpg">
                <p class="flex-caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </li>
              <li><img src="assets/images/slide2.jpg"></li>
              <li><img src="assets/images/slide3.jpg"></li>
              <li><img src="assets/images/slide4.jpg"></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h1>Carousel</h1>
          <!-- Carousel -->
          <div id="carousel" class="flexslider">
            <ul class="slides">
              <li><img src="assets/images/slide1.jpg"></li>
              <li><img src="assets/images/slide2.jpg"></li>
              <li><img src="assets/images/slide3.jpg"></li>
              <li><img src="assets/images/slide4.jpg"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <script src="assets/vendor/jquery/dist/jquery.js"></script>
    <script src="assets/vendor/flexslider/jquery.flexslider.js"></script>
    <script>
      $(function() {
        $('#silder').flexslider({
          animation: "slide"
        });

        $('#carousel').flexslider({
          animation: "slide",
          animationLoop: false,
          itemWidth: 210,
          itemMargin: 5
        });
      });
    </script>
  </body>
</html>
```

<div class="result h-1000"></div>
