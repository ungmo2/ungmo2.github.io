---
layout: post
title: Snippet - Misc
subtitle:
categories: snippet
section: snippet
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
