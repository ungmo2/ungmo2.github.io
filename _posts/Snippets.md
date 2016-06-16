---
layout: post
title: Snippets
categories: html
---

# 수평 정렬

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    div {
      border: 1px solid red;
      width: 600px;
      padding: 1em;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
</body>
</html>
```

# Scroll

## div 요소의 스크롤바 위치

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>jQuery Methods | .scrollTop()</title>
  <style>
    .jbBox {
      width: 200px;
      height: 200px;
      border: 1px solid red;
      overflow: auto;
      margin-bottom: 20px;
    }
  </style>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script>
    $(document).ready(function() {
      $('button').click(function() {
        alert($('.jbBox').scrollTop());
      });
    });
  </script>
</head>
<body>
  <div class="jbBox">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec mollis nulla. Phasellus lacinia tempus mauris eu laoreet. Proin gravida velit dictum dui consequat malesuada. Aenean et nibh eu purus scelerisque aliquet nec non justo. Aliquam vitae aliquet ipsum. Etiam condimentum varius purus ut ultricies. Mauris id odio pretium, sollicitudin sapien eget, adipiscing risus.
    </p>
  </div>
  <button>Click</button>
</body>
</html>
```

## div 요소의 스크롤바가 위에서 50px 위치로 이동

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>jQuery Methods | .scrollTop()</title>
  <style>
    .jbBox {
      width: 200px;
      height: 200px;
      overflow: auto;
      margin-bottom: 20px;
    }
  </style>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script>
    $(document).ready(function() {
      $('button').click(function() {
        $('.jbBox').scrollTop(50);
      });
    });
  </script>
</head>
<body>
  <div class="jbBox">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec mollis nulla. Phasellus lacinia tempus mauris eu laoreet. Proin gravida velit dictum dui consequat malesuada. Aenean et nibh eu purus scelerisque aliquet nec non justo. Aliquam vitae aliquet ipsum. Etiam condimentum varius purus ut ultricies. Mauris id odio pretium, sollicitudin sapien eget, adipiscing risus.
    </p>
  </div>
  <button>Click</button>
</body>
</html>
```



# Animated Resizing Header On Scroll

http://callmenick.com/post/animated-resizing-header-on-scroll

http://deanattali.com/beautiful-jekyll/
