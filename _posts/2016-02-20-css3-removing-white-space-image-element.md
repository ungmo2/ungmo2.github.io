---
layout: post
title: <strong>image 요소 아래의 공간 제거하기</strong>
subtitle:
categories: css
section: css
description:
---

* TOC
{:toc}

컨테이너 요소로 img 요소를 래핑하면 img 요소 아래에 3px의 공간이 패딩된다.

```html
<!DOCTYPE html>
<html>
<body>
  <div style="border: 1px solid red; width: 350px;">
    <img src="http://via.placeholder.com/350x150">
  </div>
</body>
</html>
```

<div class="result" style="height: 210px;"></div>

이 문제가 발생하는 이유에 대해 살펴보자. 단순히 문제 해결 방법을 외우지 않고 문제가 발생하는 이유를 이해하면 문제 해결 방법을 기억하는 것에 도움이 된다.

image 요소는 inline 요소이다. 다시 말해 image 요소는 텍스트로 취급된다. 브라우저는 요소 내의 텍스트는 표시할 때 나름의 방식이 있는데 이를 이해하려면 [타이포그래피(Typography)](https://ko.wikipedia.org/wiki/타이포그래피)에 대해 어느 정도 이해해야 한다.

![Typography](./img/typo.png)

타이포그래피
{: .desc-img}

image 요소는 inline 요소이며 텍스트로 취급된다고 하였다. 이것은 image 요소 또한 위 그림과 같이 타이포그래피를 따른다 것을 의미한다. 텍스트와 image 요소를 같이 배치해보자.

```html
<!DOCTYPE html>
<html>
<body>
  <div style="border: 1px solid red; width: 435px;">
    Typography
    <img src="http://via.placeholder.com/350x150">
  </div>
</body>
</html>
```

<div class="result" style="height: 210px;"></div>

![descender](./img/descender.png)

디센더가 적용되어 여분의 공간이 발생한다.
{: .desc-img}

위 그림과 같이 image 요소에도 디센더가 적용되어 여분의 공간이 발생한다. 그럼 이 문제에 대한 해결 방에 대해 생각해보자.

첫번째, image 요소를 블록 요소로 전환하면 더 이상 텍스트로 취급되지 않는다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    img {
      display: block;
    }
  </style>
</head>
<body>
  <div style="border: 1px solid red; width: 350px;">
    <img src="http://via.placeholder.com/350x150">
  </div>
</body>
</html>
```

<div class="result" style="height: 210px;"></div>

하지만 이 방법은 imgae 요소를 블록 요소로 전환할 수 없는 레이아웃에서는 사용할 수 없다.

두번째, inline 요소에 사용할 수 있는 [vertical-align](https://developer.mozilla.org/ko/docs/Web/CSS/vertical-align) 프로퍼티를 사용하는 방법이 있다. vertical-align 프로퍼티의 기본값은 baseline인데 이를 변경하여 이미지 표시 위치를 조정하는 것이다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    img {
      vertical-align: bottom;
    }
  </style>
</head>
<body>
  <div style="border: 1px solid red; width: 350px;">
    <img src="http://via.placeholder.com/350x150">
  </div>
</body>
</html>
```

<div class="result" style="height: 210px;"></div>

