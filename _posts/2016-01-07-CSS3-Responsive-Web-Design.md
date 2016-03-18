---
layout: post
title: Responsive Web Design
categories: css
---

* TOC
{:toc}

[앞에서](http://ungmo2.github.io/css/CSS3-Layout/) 살펴본 예제에는 사실 몇가지 문제가 숨겨져 있다. 그 문제를 해결할 열쇠는 바로 Responsive Web Design이다.

먼저 어떤 문제가 있는지 알아본다.

화면폭을 좁히면 아래 그림과 같이 화면이 망가지는데 이것는 HTML 요소에 고정폭을 지정하여 가로 스크롤을 발생시키지 않으면 해결이 어렵다.

![](/img/break-view.png)
{: style="max-width:500px; margin: 0 auto;"}

그리고 모바일과 같이 작은 해상도의 디바이스에서 접근했을 때 화면이 너무 작아져 가시성에 문제가 발생한다.

![](/img/mobile-view.jpg)
{: style="max-width:350px; margin: 0 auto;"}

# 1. Responsive Web Design

사용자가 어떤 디바이스로 웹사이트를 방문할 지 알 수 없다. layout은 방문자의 모니터의 화면 해상도를 고려하여야 한다. 가로폭이 너무 큰 layout을 작성하면 작은 해상도 모니터로 방문하였을 때 가로 스크롤이 생겨서 사용이 불편할 수도 있다.

또한 스마트폰이나 태블릿 등 모바일 기기는 화면이 작기 때문에 가독성에 더욱 신경써야 한다. 보통 웹사이트가 축소되어 가로 스크롤 없이 컨텐츠를 볼 수 있으나 글자가 너무 작아지기 때문이다.

이러한 문제를 해결하는 방법 중의 하나가 반응형 웹디자인(Responsive Web Design)이다. 화면 해상도에 따라 가로폭이나 배치를 변경하여 가독성을 높이는 것이다.

![Responsive_Web_Design_for_Desktop_Notebook_Tablet_and_Mobile_Phone](/img/Responsive_Web_Design_for_Desktop_Notebook_Tablet_and_Mobile_Phone.png)

또한 모바일 웹페이지는 대부분 애플리케이션의 형태로 진화하고 있어 앱인지 웹인지 구분이 어려울 정도이다. HTML5/CSS3/Javascript만으로 네이티브 앱과 차이를 느낄 수 없는 앱을 만들 수 있다. 다음은 최근 관심을 끌고 있는 Web App Framework이다.

- [ionic](http://ionicframework.com/)
- [Electron](http://electron.atom.io/)
- [PhoneGap](http://phonegap.com/)
- [Sencha Touch](https://www.sencha.com/)

## 1.1 viewport meta tag

viewport란 웹페이지의 가시영역을 의미한다. viewport는 디바이스에 따라 차이가 있다. 예를 들어 모바일 브라우저는 윈도우 resize가 불가하고 화면 터치를 사용하는 등 데스크탑 브라우저와 구성이나 형태가 다르다. 또한 모바일의 화면은 데스크탑 화면보다 훨씬 작으므로 데스크탑용 웹페이지를 그대로 모바일에 출력하면 가독성이 현저히 나빠진다. 따라서 viewport를 이용하여 디바이스의 특성과 디바이스의 화면 크기 등을 고려하여 각종 디바이스 사용자에게 최적화된 웹페이지를 제공할 수 있다.

![viewport](/img/viewport.png)
{: style="max-width:500px; margin: 0 auto;"}

[meta tag](http://ungmo2.github.io/html/HTML5-Tag/#meta)는 브라우저 혹은 검색엔진최적화(SEO)를 위해 검색엔진에게 메타데이터를 전달하기 위해 사용된다. viewport meta tag는 브라우저의 화면 설정과 관련된 정보를 제공한다.

| 속성	          | Description      | 사용예
|:---------------|:-----------------|:--------------
| width          | viewport 너비(px) | width=240
|                |                  | width=device-width
| height         | viewport 높이(px) | height=800
|                |                  | width=device-height
| initial-scale  | viewport초기 배율  | initial-scale=1.0
| user-scale     | 확대 축소 가능 여부  | user-scale=no
| maximum-scale  | viewport 최대 배율 | maximum-scale=2.0
| minimum-scale  | viewport 최소 배율 | minimum-scale=1.0

meta tag에서는 px단위를 사용하며 단위 표현은 생략한다. 복수개의 속성을 사용할 때는 쉼표(,)로 구분한다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

위 예제는 가장 일반적인 viewport 설정이다. 가로폭을 디바이스의 가로폭에 맞추고 초기 화면 배율을 100%로 설정하는 것을 의미한다.


## 1.2 @media 속성

이것은 서로 다른 미디어 타입(print, screen...)에 따라 각각의 styles을 지정하는 것을 가능하게 한다. 다음은 일반 화면(screen)과 인쇄장치 별로 서로 다른 style을 지정하는 예이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      @media screen {
        * { color: red; }
      }
      @media print {
        * { color: blue; }
      }
    </style>
  </head>
  <body>
    <h1>@media practice</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </body>
</html>
```

반응형 웹디자인에 사용되는 핵심 기술은 `@media`이다.


`@media`을 사용하여 미디어 별로 style을 지정하는 것을 `Media Query`라 한다. 디바이스를 지정하는 것뿐만 아니라 디바이스의 크기나 비율까지 구분할 수 있다.

다음은 Media Query의 문법이다.

```
@media not|only mediatype and (expressions) {
  CSS-Code;
}
```

```css
@media screen and (min-width: 480px) {
  body {
    background-color: lightgreen;
  }
}
```

| 속성	               |  Description
|:--------------------|:-----------------
| width               | viewport 너비(px)
| height              | viewport 높이(px)
| device-width        | 디바이스의 물리적 너비(px)
| device-height       | 디바이스의 물리적 높이(px)
| orientation         | 디바이스 방향 (가로 방향: landscape, 세로방향 portrait)
| device-aspect-ratio | 디바이스의 물리적 width/height 비율
| color               | 디바이스에서 표현 가능한 최대 색상 비트수
| monochrome          | 흑백 디바이스의 픽셀 당 비트수
| resolution          | 디바이스 해상도

orientation을 제외한 모든 속성은 min/max 접두사를 사용할 수 있다. 이것을 이용하여 화면 크기 범위를 지정할 수 있다.

```css
/*==========  Mobile First Method  ==========*/
/* All Device */

/* Custom, iPhone Retina : 320px ~ */
@media only screen and (min-width : 320px) {

}
/* Extra Small Devices, Phones : 480px ~ */
@media only screen and (min-width : 480px) {

}  
/* Small Devices, Tablets : 768px ~ */
@media only screen and (min-width : 768px) {

}
/* Medium Devices, Desktops : 992px ~ */
@media only screen and (min-width : 992px) {

}
/* Large Devices, Wide Screens : 1200px ~ */
@media only screen and (min-width : 1200px) {

}

/*==========  Non-Mobile First Method  ==========*/
/* All Device */

/* Large Devices, Wide Screens : ~ 1200px */
@media only screen and (max-width : 1200px) {

}
/* Medium Devices, Desktops : ~ 992px */
@media only screen and (max-width : 992px) {

}
/* Small Devices, Tablets : ~ 768px */
@media only screen and (max-width : 768px) {

}
/* Extra Small Devices, Phones : ~ 480px */
@media only screen and (max-width : 480px) {

}
/* Custom, iPhone Retina : ~ 320px */
@media only screen and (max-width : 320px) {

}
```

![media-query-breakpoints](/img/media-query-breakpoints.jpg)

다음은 임의로 해상도를 3단계로 구분하여 breakpoint를 정의한 예제이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /* 801px ~ */
      * { color: black; }
      /* 800~ px */
      @media screen and (max-width: 800px) {
        * { color: blue; }
      }
      /* ~ 480px */
      @media screen and (max-width: 480px) {
        * { color: red; }
      }
    </style>
  </head>
  <body>
    <h1>@media practice</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </body>
</html>
```

다음은 화면이 세로일 때, 가로일 때를 구분하는 예제이다. 주의할 점은 데스크탑은 언제나 가로 화면이기 때문에 `device-width`로 스마트폰의 해상도를 지정하지 않으면 데스크탑에서도 가로화면 시 style이 적용되는 문제가 발생한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /* 세로  */
      * { color: black; }
      /* 가로 */
      /*@media screen and (orientation: landscape) {
        * { color: blue; }
      }*/

      /* Landscape */
      @media screen
        and (min-device-width: 320px)
        and (max-device-width: 480px)
        and (orientation: landscape) {
        * { color: blue; }
      }
    </style>
  </head>
  <body>
    <h1>@media practice</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </body>
</html>
```

이제까지의 내용을 바탕으로 [앞서 만들어본 예제](http://ungmo2.github.io/css/CSS3-Layout/#header--navigation-bar)를 Responsive Web Design에 맞추어 수정해 보자.

## 1.3 Responsive Navigation Bar

디바이스 해상도에 따라 반응할 수 있도록 viewport meta tag와 media query를 추가한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /*Media Query*/
      /* for tablet */
      @media screen and (max-width: 800px) {

      }
      /* for smartphone */
      @media screen and (max-width: 480px) {

      }      
    </style>
  </head>
  ...
```

스마트폰, 태블릿, 데스크탑 그룹의 3단계로 구분하여 breakpoint를 정의하였다. Non Mobile First Method로 정의하였기 때문에 Media Query로 정의하지 않은 스타일은 데스크탑 그룹을 위한 코드가 된다.


```css
/* for tablet */
@media screen and (max-width: 800px) {
}
```

최대 viewport width를 800px로 한정하였다는 것은 화면 크기가 800px 이하인 디바이스(태블릿)를 위한 정의란 의미가 된다. 위 예제 내에 정의 되는 스타일은 화면 크기가 800px 이하인 디바이스에서 웹사이트가 표시될 때 실행된다.

```css
/* for smartphone */
@media screen and (max-width: 480px) {
}  
```

최대 viewport width를 480px로 한정하였다는 것은 화면 크기가 480px 이하인 디바이스(스마트폰)를 위한 정의란 의미가 된다. 위 예제 내에 정의 되는 스타일은 화면 크기가 480px 이하인 디바이스에서 웹사이트가 표시될 때 실행된다.

[CSS 적용 우선 순위 (Cascading Order)](http://ungmo2.github.io/css/CSS3-Selector/#css----cascading-order) 에 따라 나중에 선언된 스타일이 우선 적용된다. 따라서 Media Query는 기술 순서에 의미가 있다. 만일 스마트폰 용 스타일을 태블릿 용 스타일 보다 먼저 기술하면 최종적으로 태블릿 용 스타일이 적용된다. 일반적으로 Mobile-first 방식은 해상도가 작은 순서로, Non Mobile-first 방식은 해상도 큰 순서로 기술한다.

### 1.3.1 Responsive Navigation Bar - Tablet

데스크탑 layout에서 화면이 작아질 때 header navigation bar가 header 영역 아래로 내려오는 현상이 발생하였다. 다음과 같이 태블릿에서의 layout을 정의한다.

1. viewport width가 800px 이하가 되면 header 영역을 2단으로 하여 현재(60px)의 2배로 넓힌다.

2. logo image를 centering하고 상단에 배치한다.

3. navigation bar를 centering하고 하단에 배치한다.


### 1.3.2 Responsive Navigation Bar - Smartphone

태블릿 layout에서는 navigation bar를 header 영역 하단에 배치하였다. 하지만 스마트폰의 width는 navigation bar를 모두 담기에는 너무 좁다. 따라서
다음과 같이 스마트폰 layout을 정의한다.

1. viewport width가 480px 이하가 되면 header 영역을 데스크탑 layout과 같이 다시 1단으로 되돌려서 60px이 되게 한다.

2. logo image를 centering 한다.

3. 스마트폰 이외의 layout에서는 감추었던 navigation item을 담고 있는 navigation icon을 우측에 표시한다.

4. navigation icon이 클릭되면 navigation icon을 애니메이션 처리하고 navigation item 수직 정렬하여 header 영역 아래에 추가한다.


## 2.2



# Less
# SASS


# 2. Bootstrap

부트스트랩의 장점 중 하나는 반응형 웹 디자인이 쉽게 만들어진다는 점이다


----->CSS3
# Web font
# CSS3 Transition & Animation

## Media Queries
----->CSS3

스프라이트 이미지 (sprite image)

페이지의 로딩 속도를 감소시켜주는 방법 중 하나이다. 자주 쓰는 이미지들을 쓸 때마다 각각 로딩하는 것이 아니라 하나의 이미지파일로 작성한 후 좌표값을 사용하여 필요한 이미지를 로딩하는 방식이다. 하나의 이미지로 만들기 때문에 관기가 쉽고 여러번 로딩할 필요가 없고 중복되는 이미지를 로딩하지 않기 때문에 트래픽이 감소되는 효과가 있다.





# Reference

* [w3schools.com](http://www.w3schools.com)

* [Learn to Code HTML & CSS](http://learn.shayhowe.com/)
