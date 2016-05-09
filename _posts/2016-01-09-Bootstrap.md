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

사람은 실수를 하게 마련이다. 따라서 검증된 Framework나 Library를 사용하는 것은 옳바른 어프로치이다. 또한 Framework에 제시하는 Coding style로 팀 전체의 Coding style을 통일시키는 것은 커뮤니케이션과 maintenance 측면에서도 바람직하다. 자신만의(팀이나 회사 고유의) Framework를 만드는 것도 좋은 방법이기는 하나 일정 기간, 여러 사람의 검증을 받아 실제 환경에서 안정된 운용을 하고 있는 Framework보다 안정성과 성능면에서 더 나은 제품이어야 한다는 전제가 따른다. 이것은 소규모 회사나 팀에게는 버거운 일일 것이다.

## 1.2 Bootstrap의 장점

- Easy to use: HTML과 CSS에 대한 기본 지식이 있다면 쉽게 사용할 수 있다.
- Responsive features: 스마트폰, 테블릿, 데스크탑에 적합한 responsive CSS를 제공한다.
- Mobile-first approach: Bootstrap 3부터 mobile-first style을 기본으로 지원한다.
- Browser compatibility: 대부분의 브라우저(Chrome, Firefox, Internet Explorer, Safari, Opera)를 지원한다.

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
    <p>This is some text.</p>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  </body>
</html>
```

javascript 파일을 2개 포함시켰다. 하나는 bootstrap의 자바스크립트 파일이고 또 다른 하나는 bootstrap이 사용할 jQuery이다. jQuery는 bootstrap의 자바스크립트가 사용하므로 bootstrap 자바스크립트 파일 로드 전에 로드하여야 한다. 그리고 body tag가 끝나기 직전 javascript 파일을 로드하였는데 이 방법은 웹페이지 로딩 속도 향상에 효과적이다.

# 4. Media Query

Bootstrap은 Mobile-first 방식을 기본 지원하므로 Media query에 포함되지 않은 모든 정의는 768px 미만 디바이스를 위한 것이다.

기본적으로 4개의 breakpoint로 구간을 나눈다.

```
/* Extra small devices (phones, less than 768px) */
/* No media query since this is the default in Bootstrap */

/* Small devices (tablets, 768px and up) */
@media (min-width: @screen-sm-min) { ... }

/* Medium devices (desktops, 992px and up) */
@media (min-width: @screen-md-min) { ... }

/* Large devices (large desktops, 1200px and up) */
@media (min-width: @screen-lg-min) { ... }
```

# 5. Container

Bootstrap은 모든 컨텐츠를 감싸는 wrapping 요소(container)를 포함해야 한다. 즉 모든 컨텐츠 요소는 wrapping 요소의 자식이어야 한다. container는 그리드 시스템을 위한 필수 사항이다.

container에는 2가지 종류가 있다.

- .container class:
  fixed width container로서 responsive fixed layout(반응형 고정폭 레이아웃)을 제공한다.
- .container-fluid class:
  full width container로서 fluid layout(유동 최대폭 레이아웃)을 제공한다.

2가지 container를 중첩 사용해서는 않된다. padding에 문제가 발생하기 때문이다.

## 5.1 fixed width container (responsive fixed layout)

responsive fixed layout(반응형 고정폭 레이아웃)을 만들 때 사용한다. Media query에 의해 반응형으로 동작하며 viewport 너비가 늘어나거나 줄어들어도 고정폭을 갖는다.

.container의 속성은 다음과 같다.

```css
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
/* Extra small devices (phones, less than 768px) */
/* No media query since this is the default in Bootstrap */

/* Small devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
/* Medium devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
/* Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
```

## 5.2 full width container (fluid layout)

fluid layout(유동 최대폭 레이아웃)을 만들 때 사용한다. viewport 너비에 상관없이 언제나 컨텐츠 요소를 화면에 꽉차는 너비를 갖게 한다.

.container-fluid의 속성은 다음과 같다.

```css
.container-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
```

다음은 fixed width container(container class)와 full width container(container-fluid class)이 예제이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
    <style>
      .container, .container-fluid {
        background: #eaeaed;
      }
      .fixed, .fluid {
        background: #2db34a;
        height: 100px;
        line-height: 100px;
        text-align: center;
        color: white;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="fixed">fixed width (.container)</div>
    </div>
    <br>
    <div class="container-fluid">
      <div class="fluid">full width (.container-fluid)</div>
    </div>
  </body>
</html>
```

# 6. Grid system

앞에서 설명한 .container와 .container-fluid는 모든 컨텐츠 요소를 포함하는 부모 요소로서 wrapping 요소(container)라고 부른다. container는 그리드 시스템을 위한 필수 사항이다.

그리드 시스템은 열을 나누어 컨텐츠를 원하는 위치에 배치하는 방법을 말한다. Bootstrap은 반응형 12열 그리드 시스템을 제공한다. 반드시 `.row`(행)를 먼저 구성하며 행 안에 `.col-*-*`(열)을 필요한 갯수만큼 포함시킨다.

즉 container 내에 `.row`(행)이 위치하고 그 안에 `.col-*-*`(열)이 위치하게 된다.

## 6.1 행(.row)의 구성

container(.container 또는 .container-fluid) 내에 `.row` class를 사용하여 행을 생성한다.

```html
<div class="container">
  <div class="row">
    <!-- ... -->
  </div>
  <div class="row">
    <!-- ... -->
  </div>
</div>
```

## 6.2 열(`.col-*-*`)의 구성

열은 행(.row) 내에 위치하여야 한다. `.col-*-*` class로 열을 생성하는데 첫번째 `*`에는 xs, sm, md, lg 중의 하나를 지정하고 두번째 `*`에는 1부터 12까지의 숫자 중의 하나를 지정한다.



<h2 id="grid-options">Grid options</h2>
<p>See how aspects of the Bootstrap grid system work across multiple devices with a handy table.</p>
<div class="table-responsive">
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th></th>
        <th>
          Extra small devices
          <small>Phones (&lt;768px)</small>
        </th>
        <th>
          Small devices
          <small>Tablets (&ge;768px)</small>
        </th>
        <th>
          Medium devices
          <small>Desktops (&ge;992px)</small>
        </th>
        <th>
          Large devices
          <small>Desktops (&ge;1200px)</small>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="text-nowrap" scope="row">Grid behavior</th>
        <td>Horizontal at all times</td>
        <td colspan="3">Collapsed to start, horizontal above breakpoints</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Container width</th>
        <td>None (auto)</td>
        <td>750px</td>
        <td>970px</td>
        <td>1170px</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Class prefix</th>
        <td><code>.col-xs-</code></td>
        <td><code>.col-sm-</code></td>
        <td><code>.col-md-</code></td>
        <td><code>.col-lg-</code></td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row"># of columns</th>
        <td colspan="4">12</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Column width</th>
        <td class="text-muted">Auto</td>
        <td>~62px</td>
        <td>~81px</td>
        <td>~97px</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Gutter width</th>
        <td colspan="4">30px (15px on each side of a column)</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Nestable</th>
        <td colspan="4">Yes</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Offsets</th>
        <td colspan="4">Yes</td>
      </tr>
      <tr>
        <th class="text-nowrap" scope="row">Column ordering</th>
        <td colspan="4">Yes</td>
      </tr>
    </tbody>
  </table>
</div>

Grid options

|                 | Extra small devicesPhones (<768px)             | prefix | breakpoint         |:----------------|:----------------|:------:|--------------------|:--------------
| Grid behavior   |
| Container width |
| Class prefix    |
| # of columns    |
| Column width    |
| Nestable        |
| Offsets         |
| Column ordering |




| Device              | 구분             | prefix | breakpoint         | 동작
|:--------------------|:----------------|:------:|--------------------|:--------------
| Extra small devices | phones          | xs     | 768px 미만 (default)| 항상 적용
| Small devices       | tablets         | sm     | 768px 이상          | 768px보다 크면 적용
| Medium devices      | desktops        | md     | 992px 이상          | 992px보다 크면 적용
| Large devices       | large desktops  | lg     | 1200px 이상         | 1200px보다 크면 적용


| prefix | breakpoint         | 동작
|:------:|--------------------|:--------------
| xs     | 768px 미만 (default)| 항상 적용
| sm     | 768px 이상          | 768px보다 크면 적용
| md     | 992px 이상          | 992px보다 크면 적용
| lg     | 1200px 이상         | 1200px보다 크면 적용

### 6.2.1 .col-xs-*


dsdsdsd



.col-sm-*
.col-md-*
.col-lg-*


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
    <style>
      .show-viewport-width {
        position: fixed;
        top: 0; right: 0;
        z-index: 1000;
        margin: 5px; padding: 5px;
        background: rgba(255,255,255,0.5);
      }
      .row {
        margin-bottom: 10px;
      }
      [class*="col-"] {
        background: #2db34a;
        border: 1px solid #eaeaed;
        height: 50px;
        font-size: .8em;
        line-height: 50px;
        text-align: center;
        color: white;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div class="show-viewport-width"></div>
    <div class="container">
      <h4>col-lg-*: 1200px 이상</h4>
      <div class="row">
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
        <div class="col-lg-1">col-lg-1</div>
      </div>
      <div class="row">
        <div class="col-lg-3">col-lg-3</div>
        <div class="col-lg-6">col-lg-6</div>
        <div class="col-lg-3">col-lg-3</div>
      </div><hr>

      <h4>col-md-*: 992px 이상</h4>
      <div class="row">
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
      </div>
      <div class="row">
        <div class="col-md-3">col-md-3</div>
        <div class="col-md-9">col-md-9</div>
      </div><hr>

      <h4>col-sm-*: 768px 이상</h4>
      <div class="row">
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
        <div class="col-sm-1">sm-1</div>
      </div>
      <div class="row">
        <div class="col-sm-4">col-sm-4</div>
        <div class="col-sm-4">col-sm-4</div>
        <div class="col-sm-4">col-sm-4</div>
      </div><hr>

      <h4>col-xs-*: 768px 미만</h4>
      <div class="row">
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
      </div>
      <div class="row">
        <div class="col-xs-5">xs-5</div>
        <div class="col-xs-4">xs-4</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
        <div class="col-xs-1">xs-1</div>
      </div><hr>

      <h4>Mixed: smartphone(768px 미만) 3:9, tablet(768px 이상) 4:8</h4>
      <div class="row">
        <div class="col-xs-3 col-sm-4">col-xs-3 col-sm-4</div>
        <div class="col-xs-9 col-sm-8">col-xs-9 col-sm-8</div>
      </div><hr>

      <h4>Mixed: smartphone(768px 미만) stack, tablet(768px 이상) 4:8, desktop(992px 이상) 3:9</h4>
      <div class="row">
        <div class="col-sm-4 col-md-3">col-sm-4 col-md-3</div>
        <div class="col-sm-8 col-md-9">col-sm-8 col-md-9</div>
      </div>

<!-- ******* -->
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-8">.col-xs-12 .col-sm-6 .col-md-8</div>
        <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
      </div>
      <div class="row">
        <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
        <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
        <!-- Optional: clear the XS cols if their content doesn't match in height -->
        <div class="clearfix visible-xs-block"></div>
        <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
      </div>
<!-- ******* -->

    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script>
      $(document).ready(function(){
        showViewportWidth();
        $(window).on('resize orientationChange', function(event) {
          showViewportWidth();
        });
        function showViewportWidth() {
          var width = $(window).width();
          $(".show-viewport-width").text( "width : " + width + "px" );
        }
      });
    </script>
  </body>
</html>
```



부트스트랩의 장점 중 하나는 반응형 웹 디자인이 쉽게 만들어진다는 점이다


CSS 전처리기(pre-processor)
"Sass(Syntactically Awesome Stylesheets)는 CSS 상위에 있는 메타언어(meta-language)로 보다 간결하고 격식을 갖춘 CSS 문법을 사용합니다


스프라이트 이미지 (sprite image)

페이지의 로딩 속도를 감소시켜주는 방법 중 하나이다. 자주 쓰는 이미지들을 쓸 때마다 각각 로딩하는 것이 아니라 하나의 이미지파일로 작성한 후 좌표값을 사용하여 필요한 이미지를 로딩하는 방식이다. 하나의 이미지로 만들기 때문에 관기가 쉽고 여러번 로딩할 필요가 없고 중복되는 이미지를 로딩하지 않기 때문에 트래픽이 감소되는 효과가 있다.


# Reference

* [Bootstrap website](http://getbootstrap.com/)
* [Bootstrap 한국어 website](http://bootstrapk.com/)
* [w3schools bootstrap tutorial](http://www.w3schools.com/bootstrap/default.asp)
