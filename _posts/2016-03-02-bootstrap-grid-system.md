---
layout: post
title: <strong>Bootstrap</strong> Grid System
subtitle: Responsive, mobile first fluid grid system.
categories: bootstrap
section: bootstrap
---

* TOC
{:toc}

# 1. Media Query

Bootstrap은 Mobile-first 방식을 기본 지원하므로 [Media query](./css3-responsive-web-design#media-)에 포함되지 않은 모든 정의는 768px 미만 디바이스를 위한 것이다.

기본적으로 4개의 breakpoint로 구간을 나눈다.

```css
/* Extra small devices (phones, less than 768px) */
/* No media query since this is the default in Bootstrap */

/* Small devices (tablets, 768px and up) */
@media (min-width: @screen-sm-min) {
  /* ... */
}

/* Medium devices (desktops, 992px and up) */
@media (min-width: @screen-md-min) {
  /* ... */
}

/* Large devices (large desktops, 1200px and up) */
@media (min-width: @screen-lg-min) {   
  /* ... */
}
```

@screen-\*의 @는 [LESS](http://lesscss.org/)의 변수를 의미한다. LESS는 CSS 프리프로세서(Preprocessor)로서 Bootstrap의 소스코드는 Less와 Sass를 기반으로 작성되었다.

```scss
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

#header { color: @light-blue; }
```

위 코드를 컴파일하면 아래와 같은 CSS로 변환된다.

```css
#header { color: #6c94be; }
```

Sass에 대한 자세한 내용은 아래의 포스트를 참조하기 바란다.

- [Sass Basics](./sass-basics)

- [Sass SassScript](./sass-script)

- [Sass Built-in Function](./sass-built-in-function)

- [Sass CSS Extensions](sass-css-extention)


# 2. Container

Bootstrap은 콘텐츠를 감싸는 wrapping 요소(container)를 포함해야 한다. container는 그리드 시스템의 필수 요소이다.

container에는 2가지 종류가 있다.

.container class
: fixed width container로서 responsive fixed layout(반응형 고정폭 레이아웃)을 제공한다.

.container-fluid class
: full width container로서 fluid layout(유동 최대폭 레이아웃)을 제공한다.

2가지 container를 중첩 사용해서는 않된다. padding에 문제가 발생하기 때문이다.

## 2.1 fixed width container (responsive fixed layout)

responsive fixed layout(반응형 고정폭 레이아웃)을 만들 때 사용한다. Media query에 의해 반응형으로 동작하며 동일 breakpoint내에서는 viewport 너비가 늘어나거나 줄어들어도 고정폭을 갖는다.

.container의 룰셋은 다음과 같다.

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

## 2.2 full width container (fluid layout)

fluid layout(유동 최대폭 레이아웃)을 만들 때 사용한다. viewport 너비에 상관없이 언제나 콘텐츠 요소를 화면에 꽉차는 너비를 갖게 한다.

.container-fluid의 룰셋은 다음과 같다.

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

<div class='result'></div>

# 3. Grid system

앞에서 설명한 .container와 .container-fluid는 콘텐츠 요소를 포함하는 부모 요소로서 container 또는 wrapping 요소라고 부른다. container는 그리드 시스템을 위한 필수 사항이다.

그리드 시스템은 열을 나누어 콘텐츠를 원하는 위치에 배치하는 방법(Layout)을 말한다. Bootstrap은 반응형 12열 그리드 시스템을 제공한다.

![bootstrap grid](/img/bootstrap_grid.png)

Bootstrap Grid System
{: .desc-img}

그리드 레이아웃을 구성하려면 반드시 `.row`(행)를 먼저 구성하며 행 안에 `.col-*-*`(열)을 필요한 갯수만큼 포함시킨다. 즉 container 내에 .row(행)이 위치하고 그 안에 .col-\*-\*(열)이 위치하게 된다.

```
.container
  .row
    .col-xs-#
    .col-xs-#
  .row
    .col-xs-#
    .col-xs-#
```

## 3.1 행(.row)의 구성

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

## 3.2 열(.col-\*-\*)의 구성

열은 행(.row) 내에 위치하여야 한다. .col-\*-\* class로 열을 생성하는데 첫번째 \*에는 xs, sm, md, lg 중의 하나를 지정한다.

***Grid options***

<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th></th>
        <th>
          Extra small devices<br>
          <small>Phones<br>(&lt;768px)</small>
        </th>
        <th>
          Small devices
          <small>Tablets<br>(&ge;768px)</small>
        </th>
        <th>
          Medium devices
          <small>Desktops<br>(&ge;992px)</small>
        </th>
        <th>
          Large devices
          <small>Desktops<br>(&ge;1200px)</small>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="text-nowrap" scope="row">Grid behavior</th>
        <td>항상 수평 적용</td>
        <td colspan="3">viewport 너비가 breakpoint 이상이면 수평 적용, 미만이면 stack</td>
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
      <!--
      <tr>
        <th class="text-nowrap" scope="row">Gutter width</th>
        <td colspan="4">30px (15px on each side of a column)</td>
      </tr>
       -->
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

![Grid options](/img/bs_grid_options.png)
{: .w-650}

부트스트랩의 그리드 시스템은 12열까지 지원한다. 두번째 \*에는 1부터 12까지의 숫자 중의 하나를 지정한다.

예를 들어 col-xs-1은 행 너비의 1/12를 열의 너비로 한다는 의미이다. col-xs-6은 행 너비의 6/12를 열의 너비로, col-xs-12은 행 너비의 12/12를 열의 너비로 지정한다.

즉 col-xs-12는 전체 너비, col-xs-6은 전체 너비의 반을 의미한다.

col-xs-1의 경우, 행에 12개가 들어 올 수 있으며 col-xs-6의 경우 2개, col-xs-12의 경우 1개가 들어 올 수 있다.

즉 행에 들어 올 수 있는 열은 두번째 \*의 합 만큼이다. 12보다 클 경우는 다음 줄로 넘어간다.

- 두번째 \*의 합이 12인 경우, 행의 너비를 꽉 채운다.

- 두번째 \*의 합이 12보다 작은 경우, 오른쪽에 남는 부분이 생긴다.

- 두번째 \*의 합이 12보다 큰 경우, 12를 넘게한 마지막 열이 다음 줄로 넘어간다.

### 3.2.1 .col-xs-*

viewport 너비와 관계없이 항상 수평으로 정렬된다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
  <style>
    .row { margin-bottom: 10px; }
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
  <div class="container-fluid">
    <p>viewport 너비와 관계없이 항상 수평으로 정렬된다.</p>
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
      <div class="col-xs-8">xs-8</div>
      <div class="col-xs-4">xs-4</div>
    </div>
    <div class="row">
      <div class="col-xs-5">xs-5</div>
      <div class="col-xs-5">xs-5</div>
    </div>
    <div class="row">
      <div class="col-xs-5">xs-5</div>
      <div class="col-xs-5">xs-5</div>
      <div class="col-xs-4">xs-4</div>
    </div>
  </div>
</body>
</html>
```

<div class='result'></div>

### 3.2.2 .col-sm-*

viewport 너비가 768px 이상일 때 적용된다. 768px 미만일 때는 media query에 의해 해당 css가 적용되지 않고 div 요소의 block 특성에 의해 행 전체의 너비를 가지며 수직으로 쌓이게 된다.

```html
@media (min-width: 768px)
.col-sm-1 {
  width: 8.33333333%;
}
@media (min-width: 768px)
.col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9 {
  float: left;
}
```

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
  <style>
    .row { margin-bottom: 10px; }
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
  <div class="container-fluid">
    <p>viewport 너비가 768px 이상일 때 적용된다. 768px 미만일 때는 media query에 의해 해당 css가 적용되지 않고 div 요소의 block 특성에 의해 행 전체의 너비를 가지며 수직으로 쌓이게 된다.</p>
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
      <div class="col-sm-8">sm-8</div>
      <div class="col-sm-4">sm-4</div>
    </div>
    <div class="row">
      <div class="col-sm-5">sm-5</div>
      <div class="col-sm-5">sm-5</div>
    </div>
    <div class="row">
      <div class="col-sm-5">sm-5</div>
      <div class="col-sm-5">sm-5</div>
      <div class="col-sm-4">sm-4</div>
    </div>
  </div>
</body>
</html>
```

<div class='result'></div>

### 3.2.3 .col-md-*

viewport 너비가 992px 이상일 때 적용된다. 992px 미만일 때는 media query에 의해 해당 css가 적용되지 않고 div 요소의 block 특성에 의해 행 전체의 너비를 가지며 수직으로 쌓이게 된다.

### 3.2.4 .col-lg-*

viewport 너비가 1200px 이상일 때 적용된다. 1200px 미만일 때는 media query에 의해 해당 css가 적용되지 않고 div 요소의 block 특성에 의해 행 전체의 너비를 가지며 수직으로 쌓이게 된다.

## 3.3 col- class의 복합 구성

지금까지는 하나의 요소에 하나의 Class prefix(.col-xs-, .col-sm-, .col-md-, .col-lg-)만을 사용하였다.

```html
<div class="col-sm-8">sm-8</div>
```

하지만 Class prefix를 혼합하여 사용할 수도 있다.

```html
<div class="col-xs-12 col-sm-6">xs-12 sm-6</div>
```

위와 같이 정의하면 아래와 같이 동작한다.

- viewport 너비가 768px 미만이면 col-xs-12가 적용된다.
- viewport 너비가 768px 이상이면 col-sm-6가 적용된다.

하지만 col-xs-는 언제나 적용된다고 하였다.

```css
.col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
  float: left;
}
```

viewport 너비가 768px 이상인 경우 요소에 지정된 두개의 클래스는 경합하게 된다. 이때 **[우선순위](./css3-inheritance-cascading#cascading)는 CSS 파일 내에서 후위에 지정된 css가 더 높다.** 따라서 CSS 파일(bootstrap.css) 내에서 .col-xs-보다 후위에 정의된 col-sm-6가 적용되게 된다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .blue { color: blue; }
    .red  { color: red; }
  </style>
</head>
<body>
  <div class="red blue">Text</div>
</body>
</html>
```

breakpoint에 따른 Class prefix가 지정되어 있지 않다면 하위 Class prefix가 적용된다.

```html
<div class="row">
  <div class="col-sm-12 col-md-8">.col-sm-12 .col-md-8</div>
  <div class="col-sm-6">.col-sm-6</div>
</div>
```

위의 경우, viewport 너비가 992px 이상일 때 첫번째 div 요소는 col-md-8가 지정되어 있으므로 col-md-8가 적용되지만 두번째 div 요소에는 col-md-이 지정되어 있지 않다. 따라서 viewport 너비가 992px 이상이더라도 col-sm-6이 적용된다.

![Grid options](/img/bs_grid_options.png)

이는 col-xs-를 제외한 `col-*-`이 min-width로 지정되었기 때문이다. min-width는 프로퍼티값 이상을 의미한다. 예를 들어 `min-width: 768px`의 경우 viewport 너비가 768px 이상일 경우 적용된다.

```html
@media (min-width: 768px)
.col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9 {
  float: left;
}
```

### 3.3.1 Mobile and desktop

부트스트랩의 breakpoint는 기본적으로 아래와 같다.

- Mobile의 경우 breakpoint는 768px 미만이며 Class prefix는 .col-xs-이다.
- Desktop의 경우, breakpoint는 992px 이상이며 Class prefix는 .col-md-이다.

.col-xs-와 .col-md-를 혼용하면 아래와 같이 동작한다.

- viewport 너비가 992px 미만이면 .col-xs-가 적용된다.
- viewport 너비가 992px 이상이면 .col-md-가 적용된다.

```html
<!-- Stack the columns on mobile by making one full-width and the other half-width -->
<div class="row">
  <div class="col-xs-12 col-md-8">.col-xs-12 .col-md-8</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>

<!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
<div class="row">
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>

<!-- Columns are always 50% wide, on mobile and desktop -->
<div class="row">
  <div class="col-xs-6">.col-xs-6</div>
  <div class="col-xs-6">.col-xs-6</div>
</div>
```

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
  <style>
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
  <div class="container">
    <p>Viewport width가 992px 이상이면 3열, 미만이면 1열로 정렬된다</p>
    <div class="row">
      <div class="col-xs-12 col-md-4">1</div>
      <div class="col-xs-12 col-md-4">2</div>
      <div class="col-xs-12 col-md-4">3</div>
    </div>
  </div>
</body>
</html>
```

<div class='result'></div>

### 3.3.2 Mobile, tablet, desktop

부트스트랩의 breakpoint는 기본적으로 아래와 같다.

- Mobile의 경우 breakpoint는 768px 미만이며 Class prefix는 .col-xs-이다.
- tablet의 경우 breakpoint는 768px 이상이며 Class prefix는 .col-sm-이다.
- Desktop의 경우, breakpoint는 992px 이상이며 Class prefix는 .col-md-이다.

.col-xs-, .col-sm-, .col-md-를 혼용하면 아래와 같이 동작한다.

- viewport 너비가 768px 미만이면 .col-xs-가 적용된다.
- viewport 너비가 768px 이상이면 .col-sm-가 적용된다.
- viewport 너비가 992px 이상이면 .col-md-가 적용된다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
  <style>
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
    p.bg-info {
      font-weight: bold;
      padding: 10px;
      margin-right: -15px;
      margin-left: -15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <p class="bg-info">Viewport width가 992px 이상이면 3열, 991px~768px이면 2열, 768px미만이면 1열로 정렬된다</p>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">1</div>
      <div class="col-xs-12 col-sm-6 col-md-4">2</div>
      <div class="col-xs-12 col-sm-6 col-md-4">3</div>
      <div class="col-xs-12 col-sm-6 col-md-4">4</div>
      <div class="col-xs-12 col-sm-6 col-md-4">5</div>
      <div class="col-xs-12 col-sm-6 col-md-4">6</div>
    </div>
  </div>
</body>
</html>
```

<div class='result'></div>

breakpoint에 따른 Class prefix가 지정되어 있지 않다면 하위 Class prefix가 적용된다.

## 3.4 Nesting columns

열 내부에 그리드를 추가하면 자식 그리드의 전체 너비는 부모 열의 너비와 같다.

```html
<div class="row">
  <div class="col-sm-9">
    Level 1: .col-sm-9
    <div class="row">
      <div class="col-xs-8 col-sm-6">
        Level 2: .col-xs-8 .col-sm-6
      </div>
      <div class="col-xs-4 col-sm-6">
        Level 2: .col-xs-4 .col-sm-6
      </div>
    </div>
  </div>
</div>
```

## 3.5 Offsetting columns

열에 `.col-*-offset-*` 클래스를 추가하면 오른쪽으로 열을 이동시킬 수 있다.

예를 들어 `<div class="col-md-2 col-md-offset-4">`의 경우, viewport 너비가 992px 이상이면 .col-md-4 만큼 오른쪽으로 이동한 후 .col-md-2 만큼의 너비를 갖는 열을 표시한다.

```html
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
</div>
<div class="row">
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
</div>
<div class="row">
  <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
</div>
```

## 3.6 Column ordering

`.col-*-push-*` 와 `.col-*-pull-*` 클래스를 사용하여 열의 순서를 변경할 수 있다.

```html
<div class="row">
  <div class="col-md-9 col-md-push-3">.col-md-9 .col-md-push-3</div>
  <div class="col-md-3 col-md-pull-9">.col-md-3 .col-md-pull-9</div>
</div>
```

# Reference

* [Bootstrap website](http://getbootstrap.com/)
