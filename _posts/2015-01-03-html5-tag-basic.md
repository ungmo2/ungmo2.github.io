---
layout: post
title: HTML5 Tag - Basic
subtitle: 웹페이지의 기본을 구성하는 태그
category: html
section: html
---

* TOC
{:toc}

# 1. 문서 형식(Document Type) tag

문서 형식 태그는 브라우저에게 출력할 웹 페이지의 형식을 전달한다. 문서의 최상위에 위치해야 하며 대소문자를 구별하지 않는다. 문서별 기술 양식은 아래와 같다.

HTML5

```html
<!DOCTYPE html>
```

HTML 4.01

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

XHTML 1.0

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

# 2. html tag

html 태그는 모든 HTML 요소의 부모 요소이다. 즉 모든 요소는 html 요소의 자식 요소이며 html 요소 내부에 기술해야 한다. 단 `<!DOCTYPE>`는 예외이다.

```html
<!DOCTYPE HTML>
<html>
  <head>
    <title>Title of the document</title>
  </head>

  <body>
    The content of the document......
  </body>
</html>
```

html은 글로벌 속성을 지원한다. 특히 `lang` 속성을 사용하는 경우가 많다. 다음은 한국어를 주언어로 사용하는 경우의 예이다.

```html
<html lang="ko">
```

# 3. head tag

head 요소는 [메타데이터](https://ko.wikipedia.org/wiki/%EB%A9%94%ED%83%80%EB%8D%B0%EC%9D%B4%ED%84%B0)를 포함하기 위한 요소이다. 메타데이터는 HTML 문서의 title, style, link, script에 대한 데이터로 화면에 표시되지 않는다.

head 요소에는 메타데이터 이외의 화면에 표시되는 일체의 요소를 포함시킬 수 없다.

## 3.1 title tag

title 요소는 문서의 제목을 정의한다. 정의된 제목은 브라우저의 탭에 표시된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>

  <body>
    The content of the document......
  </body>
</html>
```

## 3.2 style tag

style 요소에는 HTML 문서를 위한 style 정보를 정의한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <style>
      body {
        background-color: yellow;
        color: blue;
      }
    </style>
  </head>

  <body>
    The content of the document......
  </body>
</html>
```

<p class="result"></p>

## 3.3 link tag

link 요소에는 외부 리소스와의 연계 정보를 정의한다. 주로 HTML과 외부 CSS 파일을 연계에 사용된다

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    The content of the document......
  </body>
</html>
```

## 3.4 script tag

script 요소에는 client-side JavaScript를 정의한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      document.addEventListener('click', function() {
        alert('Clicked!');
      });
    </script>
  </head>

  <body>
    The content of the document......
  </body>
</html>
```

<p class="result"></p>

## 3.5 meta tag

meta 요소는 description, keywords, author, 기타 메타데이터 정의에 사용된다. 메터데이터는 브라우저, 검색엔진(keywords) 등에에 의해 사용된다.

브라우저가 사용할 문자셋을 정의한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>

  <body>
    <p>안녕하세요</p>
    <p>Hello</p>
    <p>こんにちは</p>
    <p>你好</p>
    <p>שלום</p>
    <p>สวัสดี</p>
  </body>
</html>
```

<p class="result"></p>

SEO(검색엔진 최적화)를 위해 검색엔진이 사용할 keywords을 정의한다.

```html
<meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript">
```

웹페이지의 설명을 정의한다.

```html
<meta name="description" content="Web tutorials on HTML and CSS">
```

웹페이지의 저자을 명기한다.

```html
<meta name="author" content="John Doe">
```

웹페이지를 30초 마다 Refresh한다.

```html
<meta http-equiv="refresh" content="30">
```

# 4. body tag

body tag는 HTML 문서의 내용을 나타낸다. 메타데이터를 제외한 웹페이지를 구성하는 대부분의 요소가 body 요소 내에 기술된다.

HTML 문서에는 오직 하나의 body 요소만이 존재할 수 있다.

```html
<html>
  <head>
    <title>Title of the document</title>
  </head>

  <body>
    The content of the document......
  </body>
</html>
```

# Reference

* [HTML 요소 레퍼런스](https://developer.mozilla.org/ko/docs/Web/HTML/Element)

* [HTML elements](https://www.w3.org/TR/html-markup/elements.html)

* [HTML attributes](https://www.w3.org/TR/html-markup/global-attributes.html#common.attrs.core)
