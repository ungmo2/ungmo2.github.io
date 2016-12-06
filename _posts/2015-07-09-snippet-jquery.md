---
layout: post
title: Snippet - jQuery
subtitle:
categories: snippet
section: snippet
---

* TOC
{:toc}

# 1. 모바일에서 :hover 처리

```html
<!DOCTYPE html>
<html>
<head>
  <title>Document</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    div {
      width: 100px;
      height: 100px;
      background: red;
      transition: all 2s;
    }
    div:hover, div:focus {
      border-radius: 50%;
      background: blue;
    }
    /*.hover {
      border-radius: 50%;
      background: blue;
    }*/
  </style>
</head>
<body>
  <div></div>
<script src="http://code.jquery.com/jquery.min.js"></script>
<script>
  // $(function() {
  //   $('div').on('touchstart', function(){
  //     $(this).addClass('hover');
  //   }).on('touchend', function(){
  //     $(this).removeClass('hover');
  //   });
  // });
</script>
</body>
</html>
```

<div class="result"></div>
