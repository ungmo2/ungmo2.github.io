---
layout: post
title: Snippet - Navigation
subtitle:
categories: snippet
section: snippet
seq: 8
subseq: 3
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

# 2. Navigation Bar

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Navigation Bar</title>
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700" rel="stylesheet">
  <link rel="stylesheet" href="http://poiemaweb.com/assets/vendor/font-awesome/css/font-awesome.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      height: 100%;
    }

    body {
      background: #1f253d;
    }

    ol,
    ul {
      list-style: none;
    }

    a,
    a:hover {
      text-decoration: none;
    }

    .container {
      font-family: 'Ubuntu', sans-serif;
      width: 950px;
      margin: 80px auto;
    }

    header {
      height: 80px;
      background: #394264;
      border-radius: 5px;
      /*overflow: hidden;*/
    }

    .nav {
      float: left;
      font-size: 17px;
    }

    .nav li {
      display: inline-block;
      position: relative;
    }

    .profile {
      float: right;
      padding-right: 20px;
    }

    .nav-item {
      display: block;
      color: #fff;
      line-height: 80px;
      padding: 0 27px;
      transition: background .3s;
    }

    .nav-item:hover {
      height: 80px;
      background: #50597b;
      border-bottom: 4px solid #11a8ab;
    }

    .fa {
      color: #9099b7;
      font-size: 25px;
      padding-right: 15px;
    }

    .message-counter {
      position: absolute;
      color: #fff;
      line-height: 22px;
      padding: 0 6px;
      font-weight: 700;
      background: #e64c65;
      border-radius: 100%;
      top: 15px;
      right: 2px;
      transition: all .3s linear;
    }

    .nav-item:hover+.message-counter {
      transform: rotate(360deg);
    }

    .profile p {
      font-size: 17px;
      color: #fff;
      display: inline-block;
      line-height: 80px;
    }

    .profile-picture {
      display: inline-block;
      width: 45px;
      height: 45px;
      border: 2px solid #50597b;
      border-radius: 100%;
      overflow: hidden;
      vertical-align: middle;
    }

    .profile .fa {
      font-size: 12px;
      padding-left: 5px;
    }
  </style>
</head>

<body>
  <div class="container">
    <header>
      <ul class="nav">
        <li>
          <a class="nav-item" href="#1"><span class="fa fa-cog"></span>Settings</a>
        </li>
        <li>
          <a class="nav-item" href="#2"><span class="fa fa-user"></span>Account</a>
        </li>
        <li>
          <a class="nav-item" href="#3"><span class="fa fa-envelope-o"></span>Messages</a>
          <a class="message-counter" href="#4">5</a>
        </li>
        <li>
          <a class="nav-item" href="#5"><span class="fa fa-star-o"></span>Favorites</a>
        </li>
      </ul>
      <div class="profile">
        <p>Me <a href="#26"><span class="fa fa-chevron-down"></span></a></p>
        <div class="profile-picture">
          <img width="40px" alt="Anne Hathaway picture" src="http://upload.wikimedia.org/wikipedia/commons/e/e1/Anne_Hathaway_Face.jpg">
        </div>
      </div>
    </header>
  </div>
</body>
</html>
```

<div class="result"></div>
