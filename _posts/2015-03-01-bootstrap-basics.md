---
layout: post
title: <strong>Bootstrap</strong> Basics
subtitle: HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.
categories: bootstrap
section: bootstrap
---

* TOC
{:toc}

# 1. Introduction

> Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.

Bootstrap은 빠르고 간편한 반응형 웹 디자인(responsive web design)을 위한 open-source front-end framework이다.  HTML, CSS, JavaScript로 만들어진 typography, 입력 양식(forms), 버튼, 테이블, 탭, 네비게이션, 모달, 이미지 캐러셀(image carousel) 등을 제공하며 추가적으로 JavaScript plugin들을 제공한다. Twitter의 Mark Otto와 Jacob Thornton이 개발한 오픈 소스로 2011년 공개되었다.

- [Bootstrap website](http://getbootstrap.com/)
- [Bootstrap 한국어 website](http://bootstrapk.com/)

한국어 website의 경우, 대응 버전이 영문 website보다 느린 점은 주의하여야 한다.

## 1.1 Code의 재사용 (Code reuse)

CSS를 활용한 UI/UX 디자인은 수많은 선택자에 CSS 속성과 값을 선언하는 작업이다. 이때 중복되는 선언이 발생할 수 있는데 class 속성을 활용하면 중복 선언을 방지할 수 있고 코드를 재사용할 수 있다.

예를 들어 버튼을 만드는 경우, 웹사이트 내의 버튼은 한정된 스타일을 정하고 사용하는 것이 일반적이다. 이때 기본이 되는 스타일을 선언하고 컬러와 크기를 변경할 수 있는 구조가 바람직하다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
  .btn {
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: #333;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
  }
  .btn-large {
    font-size: 18px;
    padding: 10px 16px;
    border-radius: 6px;
  }
  .btn-red {
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
  }
  .btn-blue {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
  }
  </style>
</head>
<body>
  <button class="btn">Button</button>
  <button class="btn btn-red">Button</button>
  <button class="btn btn-blue">Button</button>
  <button class="btn btn-large">Button</button>
</body>
</html>
```

<div class="result"></div>

위와 같이 미리 사용될 가능성이 높은 스타일을 미리 작성하여 class화하면 같은 코드를 중복 작성하는 비효율을 줄일 수 있으며 이는 비용 절감과 품질의 향상으로 이어진다.

Bootstrap은 이처럼 미리 선언해 놓은 다양한 class와 자바스크립트 코드로 이루어진 프론트엔드 프레임워크이다. HTML에 Bootstrap의 class를 지정하는 것으로 빠르고 쉽게 일관된 스타일의 반응형 웹사이트를 작성할 수 있게 한다.

## 1.2 Framework의 장점

Framework의 사전적 의미는 아래와 같다.

1. (건물 등의) 뼈대(골조)  
2. (판단・결정 등을 위한) 틀  
3. 체제, 체계

소프트웨어에서의 Framework란 "소프트웨어 개발시 공통적으로 필요한 기능들을 재사용 관점에서 모아 구조화한 것"으로 일관된 애플리케이션의 뼈대를 제공하며 필요에 따라 확장 가능한 기반 코드를 제공한다. 즉 Framework에서 제공하는 기반 코드를 사용하여 필요한 기능을 추가해 나가는 방법이다.

웹사이트 디자인에는 정형화된 코드가 자주 사용되는데 이를 별도로 저장해 두었다가 필요할 때마다 복사하여 사용하곤 한다. 이를 스니핏(Snippet)이라 한다. 그러나 스니핏이 개발팀 내 공유되어 관리되지 못하고 개인별로 사용하다보면 전체 코드는 일관된 스타일을 가지지 못하여 품질면이나 유지보수면에서도 문제가 발생하곤 한다.

사람은 실수를 하게 마련이다. 따라서 검증된 Framework나 Library를 사용하는 것은 옳바른 어프로치이다. 또한 Framework에 제시하는 Coding style로 팀 전체의 Coding style을 통일시키는 것은 커뮤니케이션과 maintenance 측면에서도 바람직하다. 자신만의(팀이나 회사 고유의) Framework를 만드는 것도 좋은 방법이기는 하나 일정 기간, 여러 사람의 검증을 받아 실제 환경에서 안정된 운용을 하고 있는 Framework보다 안정성과 성능면에서 더 나은 제품이어야 한다는 전제가 따른다. 이것은 소규모 회사나 팀에게는 버거운 일일 것이다.

## 1.3 Bootstrap의 장점

Easy to use
: HTML과 CSS에 대한 기본 지식이 있다면 쉽게 사용할 수 있다.

Responsive features
: 스마트폰, 테블릿, 데스크탑에 적합한 responsive CSS를 제공한다.

Mobile-first approach
: Bootstrap 3부터 mobile-first style을 기본으로 지원한다.

Browser compatibility
: 대부분의 브라우저(Chrome, Firefox, Internet Explorer, Safari, Opera)를 지원한다.

## 1.4 Version

이글의 작성 시점인 2016년 현재 최신 버전은 3.3.6이며 2015년 8월 4-alpha 버전이 공개되었다. 이글은 3.3.6을 기준으로 작성되었다.

버전에 관련한 최근 소식은 [Bootstrap 공식 블로그](http://blog.getbootstrap.com/) 를 참조 바란다.

# 2. Bootstrap의 설치

Bootstrap을 사용하기 위한 방법은 Bootstrap을 다운로드 받은 후 자신의 환경에 위치시킨 후 사용하는 방법과 CDN(Content Delivery Network)을 사용하는 방법이 있다.

## 2.1 Bootstrap Download

[Bootstrap Download](http://getbootstrap.com/getting-started/#download)

다운로드 파일의 구조는 아래와 같다.

```
bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   ├── bootstrap.min.css.map
│   ├── bootstrap-theme.css
│   ├── bootstrap-theme.css.map
│   ├── bootstrap-theme.min.css
│   └── bootstrap-theme.min.css.map
├── js/
│   ├── bootstrap.js
│   └── bootstrap.min.js
└── fonts/
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    ├── glyphicons-halflings-regular.woff
    └── glyphicons-halflings-regular.woff2
```

## 2.2 Bootstrap CDN

CDN이란 html 파일에서 참조하는 css, javascript 파일이나 다른 리소스 파일을 웹사이트 서버가 아닌 다른 공유 공간에 두고 여러 웹사이트가 참조할 수 있게 하는 서비스를 의미한다. 웹사이트 구축 시, 별도 다운로드가 필요없고 페이지 로딩 속도가 빠르다는 장점이 있다. Bootstrap이나 jQuery는 많은 웹사이트에서 사용하기 때문에 CDN 서버에서 이미 다운로드했을 가능성이 크다. 이미 다운로드된 리소스 파일은 캐시에서 로드되어 결국 페이지 로딩 속도가 빨라지게 된다. 하지만 CDN을 제공하는 서버가 다운된다면 손쓸 방법이 없다. 웹페이지는 엉망이 될 것이다.

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
```

# 3. Hello world

아래와 같이 폴더 구조를 만들고 html 파일을 위치 시킨다.

```
bootstrap/
├── css/
├── js/
└── fonts/
mycode.html
```

아래와 같이 bootstrap을 웹페이지에 로드한다. bootstrap.min.css은 bootstrap.css을 압축(minify)한 것이다. bootstrap.css을 로드하여도 무방하다.

```html
<link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
```

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
</head>
<body>
  <h1>My First Bootstrap Page</h1>

  <!-- Standard button -->
  <button type="button" class="btn btn-default">Default</button>

  <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
  <button type="button" class="btn btn-primary">Primary</button>

  <!-- Indicates a successful or positive action -->
  <button type="button" class="btn btn-success">Success</button>

  <!-- Contextual button for informational alert messages -->
  <button type="button" class="btn btn-info">Info</button>

  <!-- Indicates caution should be taken with this action -->
  <button type="button" class="btn btn-warning">Warning</button>

  <!-- Indicates a dangerous or potentially negative action -->
  <button type="button" class="btn btn-danger">Danger</button>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="./bootstrap/js/bootstrap.min.js"></script>
</body>
</html>
```

<div class="result"></div>

javascript 파일을 2개 포함시켰다. 하나는 bootstrap의 자바스크립트 파일이고 또 다른 하나는 bootstrap이 사용할 jQuery이다. jQuery는 bootstrap의 자바스크립트가 사용하므로 bootstrap 자바스크립트 파일 로드 전에 로드하여야 한다. 그리고 body tag가 끝나기 직전 javascript 파일을 로드하였는데 이 방법은 웹페이지 로딩 속도 향상에 효과적이다.

# Reference

* [Bootstrap website](http://getbootstrap.com/)
* [Bootstrap 한국어 website](http://bootstrapk.com/)
* [w3schools bootstrap tutorial](http://www.w3schools.com/bootstrap/default.asp)
