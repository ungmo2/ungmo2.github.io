---
layout: post
title: Snippet - Animation
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
    text-align: center;    
  }
  .loader span {
    display: inline-block;
    vertical-align: middle;
    width: 10px;
    height: 10px;
    margin: 50px auto;
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
  @-webkit-keyframes loader {
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
  @-moz-keyframes loader {
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

# 2. Hamburger Navigation

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hamburger Button</title>
  <style>
  * {
    box-sizing: border-box;
  }

  body {
    background-color: #f0f0f0;
  }

  .toggle-button {
    position: fixed;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .toggle-button:hover {
    cursor: pointer;
  }

  .toggle-button .menu-bar {
    width: 100%;
    height: 4px;
    background-color: #555;
    border-radius: 2px;
    position: absolute;
    transition: .5s;
  }

  .toggle-button .menu-bar-top {
    top: 0;
  }

  .toggle-button .menu-bar-middle {
    top: 50%;
    transform: translateY(-50%);
  }

  .toggle-button .menu-bar-bottom {
    bottom: 0;
  }

  .button-open .menu-bar-top {
    transform: rotate(45deg);
    top: 50%;
  }

  .button-open .menu-bar-middle {
    transform: translate(-230px);
    opacity: 0;
    transition: all .1s ease-in;
  }

  .button-open .menu-bar-bottom {
    transform: rotate(-45deg);
    top: 50%;
  }
  </style>
</head>
<body>
  <div class="toggle-button">
      <div class="menu-bar menu-bar-top"></div>
      <div class="menu-bar menu-bar-middle"></div>
      <div class="menu-bar menu-bar-bottom"></div>
  </div>
  <script src="https://code.jquery.com/jquery.js"></script>
  <script>
  $(document).ready(function() {
    var $toggleButton = $('.toggle-button');
    // Hamburger button
    $toggleButton.on('click', function() {
      $(this).toggleClass('button-open');
    });
  });
  </script>
</body>
</html>
```

<div class="result"></div>

# 3. Card flipping effect

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      margin: 10px;
    }

    .card-container {
      -webkit-perspective: 700;
      perspective: 700;
    }

    .card {
      position: relative;
      color: white;
      text-align: center;
      line-height: 200px;
      width: 200px;
      height: 200px;
      margin-top: 20px;
      transition: all 0.6s ease;
      /*자식요소를 3D 공간에 배치*/
      transform-style: preserve-3d;
    }

    .front, .back {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 200px;
      background: #5677fc;
      backface-visibility: hidden;
    }

    .back {
      /*.card.back을 표시하기 위하여 .card:hover로 인해 180도 회전된 .back을 되돌린다*/
      transform: rotateY(180deg);
    }

    .card:hover {
      transform: rotateY(180deg);
    }
  </style>
</head>
<body>
  <div class="card-container">
    <div class="card">
      <div class="front">
        <h1>Hello</h1>
      </div>
      <div class="back">
        <!-- <h1>Goodbye</h1> -->
        <img src="http://placekitten.com/200/200" alt="">
      </div>
    </div>
  </div>
</body>
</html>
```

<div class="result"></div>
