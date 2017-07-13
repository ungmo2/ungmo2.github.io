---
layout: post
title: Snippet - Menu
subtitle:
categories: snippet
section: snippet
---

* TOC
{:toc}

# 1. Accordion

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Accordion Menu</title>
  <link rel="stylesheet" href="assets/vendor/font-awesome/css/font-awesome.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #2d2c41;
      font-family: 'Open Sans', Arial, Helvetica, Sans-serif, Verdana, Tahoma;
    }

    ul {
      list-style-type: none;
    }

    a {
      color: #b63b4d;
      text-decoration: none;
    }

    h1 {
      color: #FFF;
      font-size: 24px;
      font-weight: 400;
      text-align: center;
      margin-top: 80px;
    }

    h1 a {
      color: #c12c42;
      font-size: 16px;
    }

    .accordion {
      width: 100%;
      max-width: 360px;
      margin: 30px auto 20px;
      background: #FFF;
      border-radius: 4px;
    }

    .accordion .link {
      cursor: pointer;
      display: block;
      padding: 15px 15px 15px 42px;
      color: #4D4D4D;
      font-size: 14px;
      font-weight: 700;
      border-bottom: 1px solid #CCC;
      position: relative;
      transition: all 0.4s ease;
    }

    .accordion li:last-child .link {
      border-bottom: 0;
    }

    .accordion li i {
      position: absolute;
      top: 16px;
      left: 12px;
      font-size: 18px;
      color: #595959;
      -webkit-transition: all 0.4s ease;
      -o-transition: all 0.4s ease;
      transition: all 0.4s ease;
    }

    .accordion li i.fa-chevron-down {
      right: 12px;
      left: auto;
      font-size: 16px;
    }

    .accordion li.open .link {
      color: #b63b4d;
    }

    .accordion li.open i {
      color: #b63b4d;
    }

    .accordion li.open i.fa-chevron-down {
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      transform: rotate(180deg);
    }

    .accordion li.default .submenu {
      display: block;
    }

    .submenu {
      display: none;
      background: #444359;
      font-size: 14px;
    }

    .submenu li {
      border-bottom: 1px solid #4b4a5e;
    }

    .submenu a {
      display: block;
      text-decoration: none;
      color: #d9d9d9;
      padding: 12px;
      padding-left: 42px;
      -webkit-transition: all 0.25s ease;
      -o-transition: all 0.25s ease;
      transition: all 0.25s ease;
    }

    .submenu a:hover {
      background: #b63b4d;
      color: #FFF;
    }
  </style>
</head>

<body>
  <h1>Accordion Menu</h1>

  <ul id="accordion" class="accordion">
    <li class="default open">
      <div class="link"><i class="fa fa-paint-brush"></i>Web Design<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">Photoshop</a></li>
        <li><a href="#">HTML</a></li>
        <li><a href="#">CSS</a></li>
        <li><a href="#">Bootstrap</a></li>
      </ul>
    </li>
    <li>
      <div class="link"><i class="fa fa-code"></i>Front-end<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">Javascript</a></li>
        <li><a href="#">jQuery</a></li>
        <li><a href="#">Angular2</a></li>
      </ul>
    </li>
    <li>
      <div class="link"><i class="fa fa-mobile"></i>Responsive web<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">Tablets</a></li>
        <li><a href="#">Mobiles</a></li>
        <li><a href="#">Desktop</a></li>
      </ul>
    </li>
    <li>
      <div class="link"><i class="fa fa-globe"></i>Web Browser<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">Chrome</a></li>
        <li><a href="#">Firfox</a></li>
        <li><a href="#">Safari</a></li>
      </ul>
    </li>
  </ul>
</body>
<script src="assets/vendor/jquery/dist/jquery.js"></script>
<script>
  (function ($) {
    $.fn.accordion = function(opt) {
      // var settings = $.extend({
      //   multi: false
      // }, opt );

      var $links = this.find('.link');

      $links.on('click', function() {
        // click 이벤트를 발생시킨 <div class="link"> 요소
        var $this = $(this),
        // click 이벤트를 발생시킨 <div class="link"> 요소 아래의 <ul class="submenu"> 요소
            $next = $this.next();

        $this.parent().toggleClass('open');
        $next.slideToggle();

        // opt.multi이 false이면 서브메뉴가 오픈되었을 때 다른 서브메뉴를 클로즈한다.
        if (!opt.multi) {
          $('.submenu').not($next).slideUp().parent().removeClass('open');
        }
      });

      return this;
    };
  }(jQuery));

  $(function() {
    $('#accordion').accordion({
      multi: false
    });
  });
</script>
</html>
```

<div class="result h-1000"></div>
