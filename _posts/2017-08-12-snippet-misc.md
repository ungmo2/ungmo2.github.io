---
layout: post
title: Snippet - Misc
subtitle:
categories: snippet
section: snippet
seq: 8
subseq: 12
---

* TOC
{:toc}

# 1. Retina Display Media Query

```css
@media
(-webkit-min-device-pixel-ratio: 2),
(min-resolution: 192dpi) {
  /* Retina-specific stuff here */
}
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
  #logo img {
    height: 70px;
  }

  @media
  only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-resolution: 192dpi) {
    /* Retina-specific stuff here */
    #logo a.standard-logo {
      display: none;
    }
    #logo a.retina-logo {
      display: block;
    }
  }
  </style>
</head>
<body>
  <div id="logo">
    <a href="#" class="standard-logo"><img src="img/logo.png"></a>
    <a href="#" class="retina-logo"><img src="img/logo@2x.png"></a>
  </div>
</body>
</html>
```

<div class="result"></div>

# 2. 사파리에서 뒤로가기로 페이지에 진입하였을 때 스크립트가 실행되지 않는 문제

크롬에서는 발생하지 않으나 사파리, 파이어폭스에서는 뒤로가기 뒤로가기로 페이지에 진입하였을 때 스크립트가 실행되지 않는 문제가 발생한다. 새로 진입하든지 뒤로가기로 재진입하든지 반드시 실행되어야 하는 스크립트가 있다면 니 문제는 극복되어야만 한다.


```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <a href="http://www.google.com">Google</a>
  <script>
  alert(location.pathname.split("/").slice(-1));
  </script>
</body>
</html>
```

이와 같은 현상이 발생하는 이유는 뒤로가기를 실행할 때 보다 빠른 처리를 위해 [BFCache]( https://developer.mozilla.org/en-US/docs/Working_with_BFCache)를 사용하여 저장된 이전 페이지를 로드하기 때문이다.

이 현상을 극복하기 위한 대안은 pageshow/pagehide 이벤트를 사용하는 것이다. pageshow 이벤트는 load 이벤트에 대응되고 pagehide 이벤트는 unload 이벤트에 대응된다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <a href="http://www.google.com">Google</a>
  <script>
  window.onpageshow = function(event) {
    if(event.persisted) {
      // 뒤로가기로 재진입한 경우 페이지를 다시 로딩한다.
      window.location.reload();
    }
  }
  alert(location.pathname.split("/").slice(-1));
  </script>
</body>
</html>
```
