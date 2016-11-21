---
layout: post
title: Snippet - Text
subtitle:
categories: snippet
section: snippet
---

* TOC
{:toc}

# 1. Blurry Text

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .blur {
      color: transparent;
      text-shadow: 0 0 5px rgba(0,0,0,0.5);
    }
  </style>
</head>
<body>
  <p class="blur">This paragraph is styled with CSS.</p>
</body>
</html>
```

<div class="result"></div>

# 2. 선택된 텍스트의 색생 변경

```html
<!DOCTYPE html>
<html>
<head>
  <style>
  /* Code for Firefox */
  ::-moz-selection {
    background-color: blue;
    color: white;
  }

  ::selection {
    background-color: blue;
    color: white;
  }
  </style>
</head>
<body>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</body>
</html>
```

<div class="result"></div>
