---
layout: fs-post
title: <strong>Carousel slider UI</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 16
permalink: /:categories/:title
description:
---

* TOC
{:toc}

# 1. 캐러셀 슬라이더 UI

캐러셀(Carousel)은 슬라이드 형태의 컨텐츠를 순환하며 표시하는 UI를 말한다. [캐러셀은 비생산적인 디자인 패턴](https://brunch.co.kr/@ebprux/41)이라는 주장이 있기도 하지만 사용자가 스크롤을 내리지 않은 상태에서도 많은 정보를 노출할 수 있는 장점이 있어 많은 웹사이트에서 사용하고 있다.

![porsche](/img/porsche.gif)
{: .w-650}

[Porsche 메인페이지의 캐러셀](https://www.porsche.com/usa/)
{: .desc-img}

시중에는 jQuery 기반의 캐러설 플러그인이 다수 존재하고 이들로 멋진 캐러셀을 만들 수 있다. jQuery에 의존성이 없는 간단한 캐러셀을 만들어보자.

우리가 작성할 캐러셀의 최종 모습은 아래와 같다.

![carousel-slider](/img/carousel-slider.gif)
{: .w-650}

캐러셀 슬라이더 UI
{: .desc-img}

이 기능에 대한 요구 사항은 아래와 같다.

1. 무한 루핑 기능을 지원한다.
2. 슬라이딩 애니메이션을 지원한다.
3. 각 슬라이드의 width/height는 가변적이다. 단, 모든 슬라이드의 width/height는 동일하다.
3. 라이브러리를 사용하지 않고 Vanilla javascript로 구현한다.

# 2. 캐러셀 슬라이더 UI 구현하기

## 2.1 carousel 요소에 width/height 셋팅

먼저 무한 루핑 기능은 지원하지 않는 단순한 캐러셀 슬라이더 UI를 구현해 보자.

각 슬라이드의 width/height는 가변적이므로 [HTMLElement.offsetWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)와 [HTMLElement.offsetHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight)를 사용해 슬라이드의 width/height를 취득하여 캐러셀 슬라이더 UI의 윈도우 역할을 하는 carousel 요소에 width/height를 셋팅하도록 하자.

![offsetWidth-offsetHeight](/img/offsetWidth-offsetHeight.png)

HTMLElement.offsetWidth와 HTMLElement.offsetHeight
{: .desc-img}

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Carousel Slider</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);

    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #58666e;
      background-color: #f0f3f4;
    }

    /*
      carousel의 window 역할을 한다.
      하나의 carousel-item의 width/height로 크기를 조절하고 overflow: hidden;으로 넘치는 자식 요소를 숨길 것이다.
      carousel-item의 width/height는 가변이므로 carousel의 width/height는 첫번째 carousel-item의 width/height를 자바스크립트로 취득해 셋팅할 것이다
     */
    .carousel {
      position: relative;
      margin: 0 auto;
      overflow: hidden;
      border: 1px dotted red; /* for test */
    }

    .carousel-item-container {
      /* 수평 정렬 */
      display: flex;
    }

    .carousel-item {
      padding: 5px;
    }

    .carousel-item img {
      /* image 요소 아래에 패딩된 여분의 공간 제거하기 */
      vertical-align: bottom;
    }

    /* carousel의 prev, next 버튼 */
    .carousel-control {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2em;
      color: #fff;
      background-color: transparent;
      border-color: transparent;
      cursor: pointer;
      z-index: 99;
    }

    .carousel-control:focus {
      outline: none;
    }

    /* carousel의 prev 버튼 */
    .carousel-control.prev {
      left: 0;
    }

    /* carousel의 next 버튼 */
    .carousel-control.next {
      right: 0;
    }
  </style>
</head>
<body>
  <div class="carousel">
    <div class="carousel-item-container">
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=1">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=2">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=3">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=4">
        </a>
      </div>
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>
  </div>
  <script>
    class Carousel {
      constructor() {
        this.carousel = document.querySelector('.carousel');
        this.item = this.carousel.querySelector('.carousel-item');

        this.init();
      }

      init() {
        /*
          carousel-item의 width/height는 가변이다.
          따라서 carousel의 윈도우 역할을 하는 carousel 요소의 width/height는
          첫번째 carousel-item의 width/height를 취득해 셋팅한다.
        */
        this.carousel.style.width = this.item.offsetWidth + 'px';
        this.carousel.style.height = this.item.offsetHeight + 'px';
      }
    }

    window.onload = function () {
      const carousel = new Carousel();
    };
  </script>
</body>
</html>
```

<div class="result" style="height: 250px"></div>

위 예제를 실행해보면 캐러셀 슬라이더 UI의 윈도우 역할을 하는 carousel 요소가 원래의 크기(whidth를 지정하지 않았으므로 100%)에서 자바스크립트로 width/height를 셋팅할 때 요소의 크기가 바뀌는 모습이 그대로 노출된다.

![](/img/carousel-slider-error.gif)
{: .w-650}
자바스크립트로 width/height를 셋팅할 때 요소의 크기가 바뀌는 모습이 그대로 노출된다.
{: .desc-img}

carousel 요소에 `opacity: 0`을 지정하여 carousel 요소의 width/height의 셋팅이 완료될 때까지 감추었다가 셋팅이 완료되면 `opacity: 1`을 지정하여 보여주도록 하자.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Carousel Slider</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);

    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #58666e;
      background-color: #f0f3f4;
    }

    /*
      carousel의 window 역할을 한다.
      하나의 carousel-item의 width/height로 크기를 조절하고 overflow: hidden;으로 넘치는 자식 요소를 숨길 것이다.
      carousel-item의 width/height는 가변이므로 carousel의 width/height는 첫번째 carousel-item의 width/height를 자바스크립트로 취득해 셋팅할 것이다
     */
    .carousel {
      position: relative;
      margin: 0 auto;
      overflow: hidden;
      /* carousel 요소의 width/height의 셋팅이 완료될 때까지 감춘다. */
      opacity: 0;
      border: 1px dotted red; /* for test */

    }

    .carousel-item-container {
      /* 수평 정렬 */
      display: flex;
    }

    .carousel-item {
      padding: 5px;
    }

    .carousel-item img {
      /* image 요소 아래에 패딩된 여분의 공간 제거하기 */
      vertical-align: bottom;
    }

    /* carousel의 prev, next 버튼 */
    .carousel-control {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2em;
      color: #fff;
      background-color: transparent;
      border-color: transparent;
      cursor: pointer;
      z-index: 99;
    }

    .carousel-control:focus {
      outline: none;
    }

    /* carousel의 prev 버튼 */
    .carousel-control.prev {
      left: 0;
    }

    /* carousel의 next 버튼 */
    .carousel-control.next {
      right: 0;
    }
  </style>
</head>
<body>
  <div class="carousel">
    <div class="carousel-item-container">
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=1">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=2">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=3">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=4">
        </a>
      </div>
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>
  </div>
  <script>
    class Carousel {
      constructor() {
        this.carousel = document.querySelector('.carousel');
        this.item = this.carousel.querySelector('.carousel-item');

        this.init();
      }

      init() {
        /*
          carousel-item의 width/height는 가변적이다.
          따라서 carousel의 윈도우 역할을 하는 carousel 요소의 width/height는
          첫번째 carousel-item의 width/height를 취득해 셋팅한다.
        */
        this.carousel.style.width = this.item.offsetWidth + 'px';
        this.carousel.style.height = this.item.offsetHeight + 'px';

        // carousel 요소의 width/height의 셋팅이 완료되면 carousel 요소를 보여준다.
        this.carousel.style.opacity = 1;
      }
    }

    window.onload = function () {
      const carousel = new Carousel();
    };
  </script>
</body>
</html>
```

<div class="result" style="height: 250px"></div>

## 2.2 슬라이드 이동

이제 prev, next 버튼을 클릭하면 슬라이드를 이동시킨다.

캐러셀의 윈도우 역할을 하는 carousel 요소를 고정한 상태에서 슬라이더 들의 컨테이너인 carousel-item-container 요소를 이동시키면 슬라이더가 이동하는 것처럼 보인다. carousel-item-container 요소를 왼쪽으로 이동시키면 이전 슬라이더로 이동하고 carousel-item-container 요소를 오른쪽으로 이동시키면 다음 슬라이더로 이동한다. 이때 carousel-item-container 요소의 이동 거리는 슬라이더 하나의 width와 같다.

![](/img/carousel-slider-move.png)
{: .w-650}

슬라이드 이동
{: .desc-img}

처음 슬라이드 이동하면 prev 버튼을 비활성화하고 마지막 슬라이드로 이동하면 next 버튼을 비활성화해서 더 이상 이동하지 못하도록 한다. 무한 루핑 기능을 지원하면 처음 슬라이드 또는 마지막 슬라이드로 이동해도 다음 슬라이드로 이동할 수 있게 된다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Carousel Slider</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);

    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #58666e;
      background-color: #f0f3f4;
    }

    /*
      carousel의 window 역할을 한다.
      하나의 carousel-item의 width/height로 크기를 조절하고 overflow: hidden;으로 넘치는 자식 요소를 숨길 것이다.
      carousel-item의 width/height는 가변이므로 carousel의 width/height는 첫번째 carousel-item의 width/height를 자바스크립트로 취득해 셋팅할 것이다
     */
    .carousel {
      position: relative;
      margin: 0 auto;
      overflow: hidden;
      /* carousel 요소의 width/height의 셋팅이 완료될 때까지 감춘다. */
      opacity: 0;
      border: 1px dotted red; /* for test */

    }

    .carousel-item-container {
      /* 수평 정렬 */
      display: flex;
    }

    .carousel-item {
      padding: 5px;
    }

    .carousel-item img {
      /* image 요소 아래에 패딩된 여분의 공간 제거하기 */
      vertical-align: bottom;
    }

    /* carousel의 prev, next 버튼 */
    .carousel-control {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2em;
      color: #fff;
      background-color: transparent;
      border-color: transparent;
      cursor: pointer;
      z-index: 99;
    }

    .carousel-control:focus {
      outline: none;
    }

    /* carousel의 prev 버튼 */
    .carousel-control.prev {
      left: 0;
    }

    /* carousel의 next 버튼 */
    .carousel-control.next {
      right: 0;
    }

    .carousel-control.disabled {
      opacity: 0.5;
    }

    /* For Test */
    .carousel {
      overflow: visible;
    }

    /* For Test */
    #overflow:checked + .carousel {
      overflow: hidden;
    }
  </style>
</head>
<body>
  <label for="overflow">carousel <b>overflow: hidden</b></label>
  <input type="checkbox" id="overflow" checked>

  <div class="carousel">
    <div class="carousel-item-container">
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=1">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=2">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=3">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=4">
        </a>
      </div>
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>
  </div>
  <script>
    class Carousel {
      constructor() {
        this.carousel = document.querySelector('.carousel');
        this.container = this.carousel.querySelector('.carousel-item-container');
        this.item = this.carousel.querySelector('.carousel-item');

        this.prev = this.carousel.querySelector('.prev');
        this.next = this.carousel.querySelector('.next');

        // 캐러셀 아이템의 width
        this.itemWidth = this.item.offsetWidth;
        // 캐러셀 아이템의 height
        this.itemHeight = this.item.offsetHeight;
        // 캐러셀 아이템의 개수
        this.itemLength = this.carousel.querySelectorAll('.carousel-item').length;

        // 캐러셀 이동 거리
        this.offset = 0;
        // 현재 표시 중인 캐러셀 아이템
        this.currentItem = 1;

        // 설정 정보
        this.config = {
          duration: 200,
          easing: 'ease-out'
        };

        this.init();
        this.attachEvent();
      }

      init() {
        /*
          carousel-item의 width/height는 가변적이다.
          따라서 carousel의 윈도우 역할을 하는 carousel 요소의 width/height는
          첫번째 carousel-item의 width/height를 취득해 셋팅한다.
        */
        this.carousel.style.width = this.itemWidth + 'px';
        this.carousel.style.height = this.itemHeight + 'px';

        // carousel 요소의 width/height의 셋팅이 완료되면 carousel 요소를 보여준다.
        this.carousel.style.opacity = 1;

        // prev, next 버튼 활성화/비활성화 결정
        this.checkMovable();
      }

      attachEvent() {
        this.prev.addEventListener('click', this.moveToPrev.bind(this));
        this.next.addEventListener('click', this.moveToNext.bind(this));
      }

      /*
        prev 버튼 이벤트 핸들러
        이전 슬라이더로 이동하기 위해 carousel-container 요소를 오른쪽으로 이동시킨다.
      */
      moveToPrev() {
        // carousel-container 요소를 오른쪽으로 이동시키기 위해 이동거리를 캐러셀 아이템의 너비만큼 증시킨다.
        this.offset += this.itemWidth;
        // 이전 슬라이더로 이동하기 위해 carousel-container 요소를 오른쪽으로 이동시킨다.
        this.move();
        // 현재 표시 중인 캐러셀 아이템 인덱스(1~4)
        this.currentItem--;
        // prev, next 버튼 활성화/비활성화 결정
        this.checkMovable();
      }

      /*
        next 버튼 이벤트 핸들러
        다음 슬라이더로 이동하기 위해 carousel-container 요소를 왼쪽으로 이동시킨다.
      */
      moveToNext() {
        // carousel-container 요소를 왼쪽으로 이동시키기 위해 이동거리를 캐러셀 아이템의 너비만큼 감소시킨다.
        this.offset -= this.itemWidth;
        // 다음 슬라이더로 이동하기 위해 carousel-container 요소를 왼쪽으로 이동시킨다.
        this.move();
        // 현재 표시 중인 캐러셀 아이템 인덱스(1~4)
        this.currentItem++;
        // prev, next 버튼 활성화/비활성화 결정
        this.checkMovable();
      }

      // offset 만큼 carousel-container 요소를 이동시킨다.
      move() {
        this.container.style.transition = `transform ${this.config.duration}ms ${this.config.easing}`;
        this.container.style.transform = `translate3D(${this.offset}px, 0, 0)`;
      }

      // prev, next 버튼 활성화/비활성화 결정
      checkMovable() {
        if (this.currentItem === 1) {
          this.prev.disabled = true;
          this.prev.classList.add('disabled');
        } else {
          this.prev.disabled = false;
          this.prev.classList.remove('disabled');
        }

        if (this.currentItem === this.itemLength) {
          this.next.disabled = true;
          this.next.classList.add('disabled');
        } else {
          this.next.disabled = false;
          this.next.classList.remove('disabled');
        }
      }
    }

    window.onload = function () {
      const carousel = new Carousel();
    };
  </script>
</body>
</html>
```

<div class="result" style="height: 250px"></div>

## 2.3 무한 루핑 기능

무한 루핑 기능은 처음 슬라이더에서 마지막 슬라이더로, 마지막 슬라이더에서 처음 슬라이더로 무한이 루핑할 수 있는 기능을 말한다. 아래의 알고리즘으로 무한 루핑 기능을 구현해보자.

1. 슬라이더의 선두에 마지막 슬라이더를, 슬라이더의 마지막에 첫번째 슬라이더를 클론하여 추가한다.
2. 클론하여 슬라이더의 선두에 추가한 마지막 슬라이더로 이동하면 더이상 이전 슬라이더로 이동할 수 없다. 따라서 뒤쪽에 존재하는 동일한 슬라이더로 이동한다. 이때 애니메이션 없이 이동해서 사용자에게 이동한 것을 감춘다.
3. 클론하여 슬라이더의 마지막에 추가한 첫번째 슬라이더로 이동하면 더이상 다음 슬라이더로 이동할 수 없다. 따라서 앞쪽에 존재하는 동일한 슬라이더로 이동한다. 이때 애니메이션 없이 이동해서 사용자에게 이동한 것을 감춘다.

![](/img/carousel-slider-infinite-loof.png)
{: .w-650}
무한 루핑 기능
{: .desc-img}

아울러 무한 루핑 기능 사용 여부 등의 설정 정보를 클래스 생성자 함수로 전달하는 기능도 추가할 것이다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Carousel Slider</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);

    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #58666e;
      background-color: #f0f3f4;
    }

    /*
      carousel의 window 역할을 한다.
      하나의 carousel-item의 width/height로 크기를 조절하고 overflow: hidden;으로 넘치는 자식 요소를 숨길 것이다.
      carousel-item의 width/height는 가변이므로 carousel의 width/height는 첫번째 carousel-item의 width/height를 자바스크립트로 취득해 셋팅할 것이다
     */
    .carousel {
      position: relative;
      margin: 0 auto;
      overflow: hidden;
      /* carousel 요소의 width/height의 셋팅이 완료될 때까지 감춘다. */
      opacity: 0;
      border: 1px dotted red; /* for test */

    }

    .carousel-item-container {
      /* 수평 정렬 */
      display: flex;
    }

    .carousel-item {
      padding: 5px;
    }

    .carousel-item img {
      /* image 요소 아래에 패딩된 여분의 공간 제거하기 */
      vertical-align: bottom;
    }

    /* carousel의 prev, next 버튼 */
    .carousel-control {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2em;
      color: #fff;
      background-color: transparent;
      border-color: transparent;
      cursor: pointer;
      z-index: 99;
    }

    .carousel-control:focus {
      outline: none;
    }

    /* carousel의 prev 버튼 */
    .carousel-control.prev {
      left: 0;
    }

    /* carousel의 next 버튼 */
    .carousel-control.next {
      right: 0;
    }

    .carousel-control.disabled {
      opacity: 0.5;
    }

    /* For Test */
    .carousel {
      overflow: visible;
    }

    /* For Test */
    #overflow:checked + .carousel {
      overflow: hidden;
    }
  </style>
</head>
<body>
  <label for="overflow">carousel <b>overflow: hidden</b></label>
  <input type="checkbox" id="overflow" checked>

  <div class="carousel">
    <div class="carousel-item-container">
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=1">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=2">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=3">
        </a>
      </div>
      <div class="carousel-item">
        <a href="#">
          <img src="http://via.placeholder.com/400x150/3498db/fff&text=4">
        </a>
      </div>
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>
  </div>
  <script>
    class Carousel {
      constructor(config) {
        // 기본 설정과 사용자 지정 설정을 병합
        this.config = Carousel.mergeConfig(config);

        // DOM
        this.carousel = document.querySelector(this.config.selector);
        this.container = this.carousel.querySelector('.carousel-item-container');
        this.item = this.carousel.querySelector('.carousel-item');
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.prev = this.carousel.querySelector('.prev');
        this.next = this.carousel.querySelector('.next');

        // 캐러셀 아이템의 width
        this.itemWidth = this.item.offsetWidth;
        // 캐러셀 아이템의 height
        this.itemHeight = this.item.offsetHeight;
        // 캐러셀 아이템의 개수
        this.itemLength = this.items.length;

        // 캐러셀 이동 거리
        this.offset = 0;
        // 현재 표시 중인 캐러셀 아이템
        this.currentItem = 1;
        // transition 진행 상태
        this.isTransiting = false;

        this.init();
        this.attachEvent();
      }

      static mergeConfig(config) {
        // 기본 설정 정보
        const defaultConfig = {
          selector: '.carousel',
          duration: 200,
          easing: 'ease-out',
          infinite: true, // Infinite loop sliding
        };

        return { ...defaultConfig, ...config };
      }

      init() {
        /*
          carousel-item의 width/height는 가변적이다.
          따라서 carousel의 윈도우 역할을 하는 carousel 요소의 width/height는
          첫번째 carousel-item의 width/height를 취득해 셋팅한다.
        */
        this.carousel.style.width = this.itemWidth + 'px';
        this.carousel.style.height = this.itemHeight + 'px';

        // 무한 루핑 여부에 따라
        if (this.config.infinite) {
          // 첫번째, 마지막 요소를 클론하여 슬라이더에 추가
          this.insertClone();
          // 캐러셀 리스트의 선두는 클론 요소이므로 캐러셀 아이템의 width만큼 이동
          this.offset = -this.itemWidth;
          this.moveWithoutAnimation();
        } else {
          // prev, next 버튼 활성화/비활성화 결정
          this.checkMovable();
        }

        /*
          초기 화면에서 나타나는 요소의 크기 조정에 따른 요소의 크기 변화가 보이지 않도록
          캐러셀을 감추고 있다가 요소의 크기 조정이 종료하면 나타낸다.
          opacity는 GPU를 사용하므로 visibility보다 빠르다. visibility는 페인팅에 영향을 준다.
        */
        this.carousel.style.opacity = 1;
      }

      attachEvent() {
        // 핸들러 내부의 this가 Carousel 클래스의 인스턴스를 가리키도록 this를 바인딩한다.
        this.prev.addEventListener('click', this.moveToPrev.bind(this));
        this.next.addEventListener('click', this.moveToNext.bind(this));
        // transition 중에 발생한 이동 요청은 무시한다.
        this.container.addEventListener('transitionend', () => this.isTransiting = false);
      }

      /*
        Infinite looping을 위해 캐러셀 리스트의 처음과 마지막에
        캐러셀 아이템의 첫번째, 마지막 요소를 클론하여 삽입한다.
       */
      insertClone() {
        const firstItem = this.items[0];
        const lastItem = this.items[this.items.length - 1];

        // 참조된 노드(firstChild) 앞에 특정 부모 노드(container)의 자식 노드(clone)를 삽입
        this.container.insertBefore(lastItem.cloneNode(true), this.container.firstChild);
        this.container.appendChild(firstItem.cloneNode(true));
      }
      /*
        prev 버튼 이벤트 핸들러
        이전 슬라이더로 이동하기 위해 carousel-container 요소를 오른쪽으로 이동시킨다.
      */
      moveToPrev() {
        // 과도한 이동 요청 방지를 위해 트랜지션이 진행중인 상태라면 이동 요청을 무시한다.
        if (this.isTransiting) return;

        // carousel-container 요소를 오른쪽으로 이동시키기 위해 이동거리를 캐러셀 아이템의 너비만큼 증시킨다.
        this.offset += this.itemWidth;
        // 이전 슬라이더로 이동하기 위해 carousel-container 요소를 오른쪽으로 이동시킨다.
        this.move();
        // 현재 표시 중인 캐러셀 아이템 인덱스(0~his.itemLength+1)
        this.currentItem--;

        if (this.config.infinite) {
          if (this.isClone()) {
            // 클론 요소이면 뒤쪽에 존재하는 동일한 슬라이더로 이동한다. 이때 애니메이션 없이 이동해서 사용자에게 이동한 것을 감춘다.
            // 이동 거리는 클론 요소를 제외한 슬라이더 개수 만큼
            this.offset -= this.itemLength * this.itemWidth;
            // this.move()에 소요되는 duration을 기다린 후에 이동한다.
            setTimeout(() => this.moveWithoutAnimation(), this.config.duration);
            // this.itemLength 만큼 이동했으므로 this.currentItem에서 this.itemLength를 더한다.
            this.currentItem = this.currentItem + this.itemLength;
          }
        } else {
          // prev, next 버튼 활성화/비활성화 결정
          this.checkMovable();
        }
      }

      /*
        next 버튼 이벤트 핸들러
        다음 슬라이더로 이동하기 위해 carousel-container 요소를 왼쪽으로 이동시킨다.
      */
      moveToNext() {
        console.log(this.isTransiting)
        // 과도한 이동 요청 방지를 위해 트랜지션이 진행중인 상태라면 이동 요청을 무시한다.
        if (this.isTransiting) return;

        // carousel-container 요소를 왼쪽으로 이동시키기 위해 이동거리를 캐러셀 아이템의 너비만큼 감소시킨다.
        this.offset -= this.itemWidth;
        // 다음 슬라이더로 이동하기 위해 carousel-container 요소를 왼쪽으로 이동시킨다.
        this.move();
        // 현재 표시 중인 캐러셀 아이템 인덱스(0~his.itemLength+1)
        this.currentItem++;

        if (this.config.infinite) {
          if (this.isClone()) {
            // 클론 요소이면 앞쪽에 존재하는 동일한 슬라이더로 이동한다. 이때 애니메이션 없이 이동해서 사용자에게 이동한 것을 감춘다.
            // 이동 거리는 클론 요소를 제외한 슬라이더 개수 만큼
            this.offset += this.itemLength * this.itemWidth;
            // this.move()에 소요되는 duration을 기다린 후에 이동한다.
            setTimeout(() => this.moveWithoutAnimation(), this.config.duration);
            // this.itemLength 만큼 이동했으므로 this.currentItem에서 this.itemLength를 뺀다.
            this.currentItem = this.currentItem - this.itemLength;
          }
        } else {
          // prev, next 버튼 활성화/비활성화 결정
          this.checkMovable();
        }
      }

      /*
        클론 요소인지 판별한다.
        this.currentItem은 0~this.itemLength + 1 사이의 정수
        this.currentItem이 0이면 첫번째 클론 요소
        this.currentItem이 this.itemLength + 1이면 마지막 클론 요소
      */
      isClone() {
        return this.currentItem === 0 || this.currentItem === this.itemLength + 1;
      }

      // offset 만큼 carousel-container 요소를 이동시킨다.
      move() {
        // transition 중인 상태
        this.isTransiting = true;
        this.container.style.transition = `transform ${this.config.duration}ms ${this.config.easing}`;
        this.container.style.transform = `translate3D(${this.offset}px, 0, 0)`;
      }

      // offset 만큼 carousel-container 요소를 애니메이션 없이 이동시킨다.
      moveWithoutAnimation() {
        this.container.style.transition = 'none';
        this.container.style.transform = `translate3D(${this.offset}px, 0, 0)`;
      }

      // prev, next 버튼 활성화/비활성화 결정
      checkMovable() {
        if (this.currentItem === 1) {
          this.prev.disabled = true;
          this.prev.classList.add('disabled');
        } else {
          this.prev.disabled = false;
          this.prev.classList.remove('disabled');
        }

        if (this.currentItem === this.itemLength) {
          this.next.disabled = true;
          this.next.classList.add('disabled');
        } else {
          this.next.disabled = false;
          this.next.classList.remove('disabled');
        }
      }
    }

    window.onload = function () {
      const carousel = new Carousel();
      // const carousel = new Carousel({ infinite: false });
    };
  </script>
</body>
</html>
```

<div class="result" style="height: 250px"></div>

<!-- # 3. Angular 캐러셀 슬라이더 UI

바닐라 자바스크립트로 구현한 캐러셀 슬라이더 UI를 이번에는 Angular로 구현해 보자.

<iframe src="https://stackblitz.com/edit/angular-select-box-ui?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="700"></iframe> -->
