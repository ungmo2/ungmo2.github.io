---
layout: post
title: CSS3 <strong>Gradient</strong>
subtitle: 그레이디언트
categories: css
section: css
description: 그레이디언트는 2가지 이상의 색상을 혼합하여 부드러운 색감의 배경 등을 생성하는 것이다. CSS3가 이 기능을 제공하기 이전에는 포토샵 등의 소프트웨어를 사용하여 그레이디언트 효과의 이미지를 제작하여 사용하였다. 그러나 이러한 방법은 이미지 다운로드에 시간이 소요되는 문제와 이미지를 확대하였을 때 해상도가 나빠지는 문제 등을 내포하고 있었다.
---

# 그레이디언트 (Gradient)

그레이디언트는 2가지 이상의 색상을 혼합하여 부드러운 색감의 배경 등을 생성하는 것이다. CSS3가 이 기능을 제공하기 이전에는 포토샵 등의 소프트웨어를 사용하여 그레이디언트 효과의 이미지를 제작하여 사용하였다. 그러나 이러한 방법은 이미지 다운로드에 시간이 소요되는 문제와 이미지를 확대하였을 때 해상도가 나빠지는 문제 등을 내포하고 있었다.

그레이디언트는 2가지 종류가 있다.

- 선형 그레이디언트 (Linear Gradient: goes down/up/left/right/diagonally)
- 방사형 그레이디언트 (Radial Gradient: defined by their center)

그레이디언트는 CSS3가 비교적 최근부터 제공하는 기술로서 대부분의 브라우저에 벤더프리픽스를 사용하여야 하고 브라우저에 따라 조금씩 문법이 상이하여 다루기가 수월하지 않다. 따라서 그레이디언트를 직접 작성하는 것보다 작성 툴을 이용하는 것이 보편적이다.

- [Ultimate CSS Gradient Generator](http://www.colorzilla.com/gradient-editor/)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
    }
    div {
      width: 100vw;
      height: 100vh;
    }
    .dawn {
      /* Old browsers */
      background: #b3cae5;
      /* FF3.6+ */
      background: -moz-linear-gradient(-45deg, #b3cae5 12%, #dbdde4 46%, #e4e3e4 70%, #f7ddbb 94%, #efcab2 100%);
      /* Chrome,Safari4+ */
      background: -webkit-gradient(linear, left top, right bottom, color-stop(12%, #b3cae5), color-stop(46%, #dbdde4), color-stop(70%, #e4e3e4), color-stop(94%, #f7ddbb), color-stop(100%, #efcab2));
      /* Chrome10+,Safari5.1+ */
      background: -webkit-linear-gradient(-45deg, #b3cae5 12%, #dbdde4 46%, #e4e3e4 70%, #f7ddbb 94%, #efcab2 100%);
      /* Opera 11.10+ */
      background: -o-linear-gradient(-45deg, #b3cae5 12%, #dbdde4 46%, #e4e3e4 70%, #f7ddbb 94%, #efcab2 100%);
      /* IE10+ */
      background: -ms-linear-gradient(-45deg, #b3cae5 12%, #dbdde4 46%, #e4e3e4 70%, #f7ddbb 94%, #efcab2 100%);
      /* W3C */
      background: linear-gradient(135deg, #b3cae5 12%, #dbdde4 46%, #e4e3e4 70%, #f7ddbb 94%, #efcab2 100%);
    }
  </style>
</head>
<body>
  <div class="dawn"></div>
</body>
</html>
```

<div class="result"></div>

| Property        | Chrome | Edge   | IE     | Firefox| Safari | Opera  |
|:----------------|:------:|:------:|:------:|:------:|:------:|:------:|
| linear-gradient | 26.0	 | 12.0   | 10.0   | 16.0   | 6.1    |	12.1  |
| prefix          | 10.0	 |        |        | 3.6    | 5.1    |	11.1  |

| Property        | Chrome | Edge   | IE     | Firefox| Safari | Opera  |
|:----------------|:------:|:------:|:------:|:------:|:------:|:------:|
| radial-gradient | 26.0	 | 12.0   | 10.0   | 16.0   | 6.1    |	12.1  |
| prefix          | 10.0	 |        |        | 3.6    | 5.1    |	11.1  |

| Property                  | Chrome | Edge   | IE     | Firefox| Safari | Opera  |
|:--------------------------|:------:|:------:|:------:|:------:|:------:|:------:|
| repeating-linear-gradient | 26.0	 | 12.0   | 10.0   | 16.0   | 6.1    |	12.1  |
| prefix                    | 10.0	 |        |        | 3.6    | 5.1    |	11.1  |

| Property                  | Chrome | Edge   | IE     | Firefox| Safari | Opera  |
|:--------------------------|:------:|:------:|:------:|:------:|:------:|:------:|
| repeating-radial-gradient | 26.0	 | 12.0   | 10.0   | 16.0   | 6.1    |	12.1  |
| prefix                    | 10.0	 |        |        | 3.6    | 5.1    |	11.1  |

# Reference

* [css3generator.com](http://www.css3generator.com/)

* [css3gen.com](http://css3gen.com/)

* [cssmatic.com](http://www.cssmatic.com/box-shadow)
