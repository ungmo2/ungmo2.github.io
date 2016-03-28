---
layout: post
title: Bootstrap Basics
categories: bootstrap
---

* TOC
{:toc}

# 1. Introduction

> Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.

Bootstrap은 빠르고 간편한 반응형 웹 디자인(responsive web design)을 위한 open-source front-end framework이다.  HTML, CSS, JavaScript로 만들어진 typography, 입력 양식(forms), 버튼, 테이블, 탭, 네비게이션, 모달, 이미지 캐러셀(image carousel) 등을 제공하며 추가적으로 JavaScript plugin들을 제공한다. Twitter의 Mark Otto와 Jacob Thornton이 개발한 오픈 소스로 2011년 공개되었다.

- [Bootstrap website](http://getbootstrap.com/)
- [Bootstrap 한국어 website](http://bootstrapk.com/)

한국어 website의 경우, 대응 버전이 영문 website보다 느린 점은 주의하여야 한다.

## 1.1 Framework의 장점

사람은 실수를 하게 마련이다. 따라서 검증된 Framework나 Library를 사용하는 것은 옳바른 어프로치이다. 또한 Framework에 제시하는 Coding style로 팀 전체의 Coding style을 통일시키는 것은 커뮤니케이션과 유지보수 측면에서도 바람직하다. 자신만의(팀이나 회사 고유의) Framework를 만드는 것도 좋은 방법이기는 하나 일정 기간, 여러 사람의 검증을 받아 실제 환경에서 안정된 운용을 하고 있는 Framework보다 안정성과 성능면에서 더 나은 제품이어야 한다는 전제가 따른다. 이것은 소규모 회사나 팀에게는 버거운 일일 것이다.

## 1.2 Bootstrap의 장점

- Easy to use: HTML과 CSS에 대한 기본 지식이 있다면 쉽게 사용할 수 있다.
- Responsive features: 스마트폰, 테블릿, 데스크탑에 적합한 responsive CSS를 제공한다.
- Mobile-first approach: Bootstrap 3부터 mobile-first style을 기본으로 지원한다.
- Browser compatibility: 대부분의 브라우저(Chrome, Firefox, Internet Explorer, Safari, Opera)를 지원한다.

is compatible with all modern browsers

## 1.3 Version

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


부트스트랩의 장점 중 하나는 반응형 웹 디자인이 쉽게 만들어진다는 점이다



CDN

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
```



```
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js
```

```
npm install bootstrap
npm install jquery
```


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
<!-- <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> -->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```

CSS 전처리기(pre-processor)
"Sass(Syntactically Awesome Stylesheets)는 CSS 상위에 있는 메타언어(meta-language)로 보다 간결하고 격식을 갖춘 CSS 문법을 사용합니다


스프라이트 이미지 (sprite image)

페이지의 로딩 속도를 감소시켜주는 방법 중 하나이다. 자주 쓰는 이미지들을 쓸 때마다 각각 로딩하는 것이 아니라 하나의 이미지파일로 작성한 후 좌표값을 사용하여 필요한 이미지를 로딩하는 방식이다. 하나의 이미지로 만들기 때문에 관기가 쉽고 여러번 로딩할 필요가 없고 중복되는 이미지를 로딩하지 않기 때문에 트래픽이 감소되는 효과가 있다.


# Reference

* [Bootstrap website](http://getbootstrap.com/)
* [Bootstrap 한국어 website](http://bootstrapk.com/)
