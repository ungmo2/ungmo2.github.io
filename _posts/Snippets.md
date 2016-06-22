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

# 텍스트 수직 정렬

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .center {
      padding: 70px 0;
      border: 3px solid green;
      text-align: center;
    }
  </style>
</head>
<body>
  <h2>Centering</h2>
  <p>In this example, we use padding and text-align to center the div element vertically and horizontally:</p>

  <div class="center">
    <p>I am vertically and horizontally centered.</p>
  </div>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .center {
      line-height: 200px;
      height: 200px;
      border: 3px solid green;
      text-align: center;
    }
    /* If the text has multiple lines, add the following: */
    .center p {
      line-height: 1.5;
      display: inline-block;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <h2>Centering</h2>
  <p>In this example, we use the line-height property with a value that is equal to the height property to center the div element:</p>

  <div class="center">
    <p>I am vertically and horizontally centered.</p>
  </div>
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

# CSS 상속

CSS는 부모가 자식에게 영향을 준다. 특히 color, font 등이 주로 자식에게 영향을 주며, 이런 속성들은 대체로 에 작성해두어 모든 요소들이 영향을 받게 한다.

```css
body {
  font-size: 2em;
  line-height: 3em;
  font-family: "Helvetica", "APPLE SD Gothic NEO", sans-serif;
}
```

<input>

요소에서 font-size나 line-height가 상속받지 않고, [요소에서 color 속성을 상속받지 않는데, 그런 경우에는 inherit 키워드를 명시적으로 작성해주어 상속받게 할 수 있다.]()

[`css a { color: inherit; } input { font-size: inherit; line-height: inherit; }`

# Animated Resizing Header On Scroll]()

[]()<http://callmenick.com/post/animated-resizing-header-on-scroll>

<http://deanattali.com/beautiful-jekyll/>
