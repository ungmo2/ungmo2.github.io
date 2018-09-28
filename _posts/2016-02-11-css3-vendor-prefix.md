---
layout: post
title: CSS3 <strong>Vendor Prefix</strong>
subtitle: 벤더 프리픽스
categories: css
section: css
seq: 2
subseq: 11
description: CSS3 표준으로 확정되기 이전 또는 브라우저 개발사가 실험적으로 제공하는 기능을 사용하기 위해서는 벤더 프리픽스를 사용하여야 한다.
---

CSS3 표준으로 확정되기 이전 또는 브라우저 개발사가 실험적으로 제공하는 기능을 사용하기 위해서는 벤더 프리픽스(Vendor Prefix)를 사용하여야 한다.

[Can I use?](http://caniuse.com/)에서 제공하는 브라우저별 CSS 지원 정보를 보면 텍스트와 요소의 선택을 방지하는 `user-select` 프로퍼티는 모든 브라우저에 벤더 프리픽스를 사용하여야 한다. 브라우저의 버전이 올라감에 따라 벤더 프리픽스를 사용하지 않아도 될 수 있다. 그러나 구형 브라우저를 지원하기 위하여 벤더 프리픽스를 사용하여야 할 필요가 있다.

![caniuse screen shot](/img/caniuse.png)

2016년 3월 기준
{: .desc-img}

```css
* {
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */
}
```

![vendor-prefix in chrome-devtool](/img/chrome-devtool-vendor-prefix.png)
{: .w-400}

브라우저 별 벤더 프리픽스는 다음과 같다.

| Browser    | Vendor Prefix                          |
|:-----------|:-------------------------------------|
| IE or Edge | -ms-
| Chrome     | -webkit-
| Firefox    | -moz-
| Safari     | -webkit-
| Opera      | -o-
| iOS Safari | -webkit-
| Android Browser    | -webkit-
| Chrome for Android | -webkit-

많은 브라우저를 위한 벤더 프리픽스를 사용하는 것은 코드의 양을 늘게 하고 또한 브라우저는 거의 매달 업데이트가 이루어지고 있어 불필요한 벤더 프리픽스를 사용할 가능성이 크다. 사용하지 않아도 되는 벤더 프리픽스를 사용하는 것은 성능에도 영향을 주기 때문에 [Prefix Free 라이브러리](http://leaverou.github.io/prefixfree/) 를 사용하는 것은 매우 유용한 방법이다.

사용법은 매우 간단하다. [Prefix Free](http://leaverou.github.io/prefixfree/) 사이트에서 라이브러리를 다운로드하고 include 하기만 하면 이 후에는 벤더 프리픽스없이 모든 CSS를 사용할 수 있다.

```html
<script src="prefixfree.min.js"></script>
```
