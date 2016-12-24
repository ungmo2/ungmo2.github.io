---
layout: post
title: Snippet - Navigation
subtitle:
categories: snippet
section: snippet
---

* TOC
{:toc}

# 1. Hamburger Navigation

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
