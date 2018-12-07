---
layout: post
title: Snippet - jQuery
subtitle:
categories: snippet
section: snippet
seq: 8
subseq: 8
---

* TOC
{:toc}

# 1. Hover effect with mouse and touch

모바일 디바이스와 같은 터치스크린에서는 마우스를 사용하지 않는 것이 일반적이다. 이러한 경우 `:hover` 효과 처리가 곤란하다.

일반 데스크탑과 터치스크린 디바이스에서도 동작하는 `:hover` 효과 처리를 위해 다음의 과정이 필요하다.

- `touchstart`와 `mouseenter` 이벤트가 발생하면 hover 효과를 추가한다.

- `mouseleave`, `touchmove`, `click` 이벤트가 발생하면 hover 효과를 제거한다.

- `touchend` 이벤트 등은 모두 무시한다.


```html
<!DOCTYPE html>
<html>
<head>
  <title>Hover effect with mouse and touch</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .test {
      position: relative;
      display: block;
      height: 40px;
      margin: 1em;
      padding-top: 20px;
      border: 1px solid black;
      text-align: center
    }

    .content {
      position: absolute;
      right: 10px;
      top: 10px;
      display: none;
    }

    #pure_css:hover {
      background: yellow;
    }

    #pure_css:hover .content {
      display: block;
    }

    #regular_js.hover {
      background: yellow;
    }

    #show_on_touch.hover {
      background: yellow;
    }

    #support_cancel.hover {
      background: yellow;
    }
  </style>
</head>

<body>
  <div class="tests">
    <a href="http://stackoverflow.com/" id="pure_css" class="test">1. regular :hover effect with CSS<div class="content">more info</div></a>
    <a href="http://stackoverflow.com/" id="regular_js" class="test">2. JavaScript-based hover<div class="content">more info</div></a>
    <a href="http://stackoverflow.com/" id="show_on_touch" class="test">3. JavaScript-based hover as #2 with highlight on touchstart<div class="content">more info</div></a>
    <a href="http://stackoverflow.com/" id="support_cancel" class="test">4. JavaScript-based hover as #3 with reset on touchmove<div class="content">more info</div></a>
  </div>

  <p>Explanation:</p>
  <ol>
    <li>This is a regular hover effect using CSS. Note that it is possible to show and hide content by hovering using pure CSS. On a touchpad, you will have to click this link twice in order to follow it. This is because a content change on a mouseover will
      prevent the click event from firing.</li>
    <li>This is the very some hover effect, only implemented in JavaScript. On a touchpad, you still have to click this link twice in order to follow it.</li>
    <li>This time, the hover effect is already started on touchstart. First, this make the hover faster on touch. Secondly, the mouseover event does not change the state (the state has already changes on touchtstart), so the click event is fired, and the
      user does not need to tap twice.</li>
    <li>Finishing touches: the user can cancel a tap by moving his/her finger, and the highlight is removed in that case.</li>
  </ol>

  <script src="http://code.jquery.com/jquery.min.js"></script>
  <script>
    $(function() {
      $('#regular_js').mouseenter(function(e) {
        $('#regular_js').addClass('hover');
        $('#regular_js .content').show();
      }).mouseleave(function(e) {
        $('#regular_js').removeClass('hover');
        $('#regular_js .content').hide();
      }).click(function(e) {
        $('#regular_js').removeClass('hover');
        $('#regular_js .content').hide();
      });

      $('#show_on_touch').on('touchstart', function(e) {
        $('#show_on_touch').addClass('hover');
        $('#show_on_touch .content').show();
      }).mouseenter(function(e) {
        $('#show_on_touch').addClass('hover');
        $('#show_on_touch .content').show();
      }).mouseleave(function(e) {
        $('#show_on_touch').removeClass('hover');
        $('#show_on_touch .content').hide();
      }).click(function(e) {
        $('#show_on_touch').removeClass('hover');
        $('#show_on_touch .content').hide();
      });

      $('#support_cancel').on('touchstart', function(e) {
        $('#support_cancel').addClass('hover');
        $('#support_cancel .content').show();
      }).on('touchmove', function(e) {
        console.log('mousemove: remove highlight');
        $('#support_cancel').removeClass('hover');
        $('#support_cancel .content').hide();
      }).mouseenter(function(e) {
        $('#support_cancel').addClass('hover');
        $('#support_cancel .content').show();
      }).mouseleave(function(e) {
        $('#support_cancel').removeClass('hover');
        $('#support_cancel .content').hide();
      }).click(function(e) {
        $('#support_cancel').removeClass('hover');
        $('#support_cancel .content').hide();
      });

      $('div').on('click', function(e) {
        console.log("** cancel click event (stay on page for debug purposes) **");
        e.preventDefault();
      });

    });
  </script>
</body>
</html>
```

<div class="result"></div>

# Reference

- [Touch and mouse with hover effects in a web browser](http://www.macfreek.nl/memory/Touch_and_mouse_with_hover_effects_in_a_web_browser)
