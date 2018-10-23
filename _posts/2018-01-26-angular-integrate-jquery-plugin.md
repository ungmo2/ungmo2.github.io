---
layout: post
title: Angular <strong>jQuery 플러그인</strong>
subtitle: Angular CLI 환경에서 jQuery 플러그인 사용하기
categories: angular
section: angular
seq: 13
subseq: 26
description: Angular CLI 환경에서 jQuery 플러그인 사용하기
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

Angular에서는 템플릿 문법을 사용한 선언형 프로그래밍 방식으로 뷰를 관리하므로 jQuery의 사용은 권장하지 않는다. 하지만 jQuery로 작성된 플러그인을 사용해야만 하는 상황이라면 한정적으로 jQuery를 사용할 수 있다. jQuery 플러그인을 사용하기 위한 방법에 대해 알아보기 위해 Angular CLI를 사용하여 생성한 프로젝트에서 캐러셀 슬라이드 jQuery 플러그인 [slick](http://kenwheeler.github.io/slick)을 사용하는 과정에 대해 살펴보도록 하자.

이 글에서는 slick 플러그인 사용 방법에 대해 설명하지 않는다. slick 플러그인 사용 방법은 [slick usage](http://kenwheeler.github.io/slick)를 참고하기 바란다.
{: .info}

# 1. Angular 프로젝트 생성

먼저 Angular CLI(v6.1.2)를 사용하여 프로젝트를 생성한다.

```bash
$ ng new integrate-jquey-plugin -t -s -S
```

아래와 같이 글로벌 스타일을 styles.css에 정의한다.

```css
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);

body {
  font-family: 'Open Sans';
  font-weight: 300;
  background-color: #D6E1E5;
}

.title {
  color: #DB5B33;
  font-weight: 300;
  text-align: center;
}
```

# 2. jQuery 설치

slick 플러그인은 jQuery에 의존하는 플러그인이므로 jQuery의 설치가 필요하다. jQuery를 설치한다.

```bash
$ cd integrate-jquey-plugin
$ npm install jquery
```

# 3. jQuery 임포트

jQuery를 사용할 구성 요소 내에서 아래와 같이 jQuery를 임포트한다.

```typescript
import * as $ from 'jquery';
```

angular.json에 `"scripts": ["./node_modules/jquery/dist/jquery.min.js"]`와 같이 jQuery를 포함시킬 수도 있다. 하지만 이 방식을 사용하면 index.html에 jQuery가 포함되므로 jQuery를 사용할 구성 요소 내에서 임포트하는 방식을 사용하도록 한다.
{: .info}

앞에서 생성한 Angular 프로젝트의 루트 컴포넌트에서 jQuery를 사용할 것이므로 루트 컴포넌트를 아래와 같이 수정하여 jQuery를 임포트한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  template: `
    <h2 class="title">Integrate jQuery plugin</h2>
  `,
  styles: []
})
export class AppComponent {
  constructor() {
    console.log($);
  }
}
```

jQuery는 임포트되었다. 하지만 jQuery는 타입 정의 파일(Type definition file)을 제공하지 않기 때문에 VS Code와 같은 코드 에디터의 인텔리센스(IntelliSense) 기능을 사용할 수 없다.

![import-jquery-without-type-definition-file](./img/import-jquery-without-type-definition-file.png)

코드 에디터의 인텔리센스 기능을 사용할 수 없다
{: .desc-img}

# 4. jQuery 타입 정의 파일 설치

코드 에디터의 인텔리센스 기능을 사용하기 위해 jQuery 타입 정의 파일을 설치한다.

```bash
$ npm install --save-dev @types/jquery
```

설치된 타입 정의 파일은 node_modules/@types 폴더에 설치되고 타입스크립트 컴파일러는 타입 정의 파일을 자동 반영한다. 이제 코드 에디터의 인텔리센스 기능이 활성화되었다.

![import-jquery-with-type-definition-file](./img/import-jquery-with-type-definition-file.png)

코드 에디터의 인텔리센스 기능이 활성화되었다.
{: .desc-img}

# 5. slick 플러그인 설치 및 임포트

캐러셀 슬라이드 jQuery 플러그인 [slick](http://kenwheeler.github.io/slick)을 설치한다.

```bash
$ npm install slick-carousel
```

설치가 완료되었으면 slick 플러그인의 CSS를 글로벌로 설치하기 위해 angular.json에 등록한다.

```json
...
  "styles": [
    "src/styles.css",
    "./node_modules/slick-carousel/slick/slick.css",
    "./node_modules/slick-carousel/slick/slick-theme.css"
  ],
...
```

# 5. slick 플러그인 임포트

이제 컴포넌트에서 slick 플러그인을 임포트하고 slick 플러그인을 사용하도록 하자.

```typescript
// app.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel';

@Component({
  selector: 'app-root',
  template: `
    <h2 class="title">Integrate jQuery plugin</h2>

    <div class="carousel-container" #carousel>
      <div class="carousel-item" *ngFor="let item of carouselItems">
        {{ "{{ item " }}}}
      </div>
    </div>
  `,
  styles: [`
    /* Slick Custom Theme */
    .carousel-container .carousel-item {
      position: relative;
      color: white;
      background-color: #3498db;
      min-height: 250px;
      text-align: center;
    }

    .carousel-container {
      width: 500px;
      margin: 0 auto;
    }

    .carousel-item {
      font-size: 10em;
      line-height: 250px;
    }
  `]
})
export class AppComponent implements OnInit {
  carouselItems: string[] = ['1', '2', '3'];
  @ViewChild('carousel') carousel: ElementRef;

  ngOnInit() {
    $(this.carousel.nativeElement).slick();
  }
}
```

참고로 from이 없는 import는 모듈에서 어떠한 값도 취득할 필요가 없이 사이드 이펙트만을 발생시키는 모듈에 사용한다. slick 플러그인이 로드되면 jQuery 객체에 slick 메소드를 바인딩한다.

`ng serve` 명령어로 프로젝트를 실행하면 아래와 같은 에러가 발생한다.

```
ERROR in src/app/app.component.ts(21,19): error TS2551: Property 'slick' does not exist ontype 'JQuery<HTMLElement>'. Did you mean 'click'?
```

이 에러는 slick 플러그인의 타입 정의 파일이 없어서 타입스크립트가 slick 메소드를 알지 못하기 때문에 발생한 것이다.

# 6. slick 플러그인 타입 정의 파일 설치

slick 플러그인의 타입 정의 파일을 설치한다.

```bash
$ npm install --save-dev @types/slick-carousel
```

에러는 발생하지 않지만 slick 플러그인이 정상적으로 동작하지 않는다. 그 이유는 템플릿의 컴파일이 완료되어 DOM이 완성되기 이전에 slick 메소드를 호출하였기 때문이다. ngOnInit 생명주기 훅 메소드에서 호출하던 slick 메소드를 ngAfterViewInit 생명주기 훅 메소드에서 호출하도록 수정한다.

```typescript
// app.component.ts
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

...

export class AppComponent implements AfterViewInit {
  carouselItems: string[] = ['1', '2', '3'];
  @ViewChild('carousel') carousel: ElementRef;

  ngAfterViewInit() {
    $(this.carousel.nativeElement).slick();
  }
}
```

이제 slick 플러그인이 정상적으로 동작하기 시작한다.

![slick-plugin](./img/slick-plugin.png)

캐러셀 슬라이드가 동작한다
{: .desc-img}

하지만 캐러셀 슬라이드를 좌우로 이동시키는 버튼의 CSS가 배경과 비슷하여 구분이 어려우므로 버튼의 위치를 조정해보자.

```typescript
// app.component.ts
...
  styles: [`
    ...

    .slick-prev {
      left: 10px;
      z-index: 99;
    }

    .slick-next {
      right: 10px;
      z-index: 99;
    }
  `]
})
```

하지만 CSS 룰셋이 정상적으로 적용되지 않았다. 그 이유는 slick 플러그인이 동적으로 생성하는 HTML 요소는 템플릿이 컴파일된 이후에 DOM에 추가되므로 Angular가 캡슐화를 위해 자동 생성하는 `_ngcontent-c0`와 같은 어트리뷰트가 추가되지 않았기 때문에 이들 HTML 요소에는 컴포넌트에서 지정한 CSS 룰셋이 적용되지 않는다. `:host ::ng-deep mySelector` 선택자를 사용하여 회피할 수 있으나 `::ng-deep` 선택자의 경우, 브라우저의 Shadow DOM 지원이 대중화되는 시점에 폐지될 예정이기 때문에 사용하지 않는 편이 좋다.

현재 위 문제를 회피할 수 있는 방법 중에 가장 권장할 수 있는 방법은 뷰 캡슐화 전략을 `ViewEncapsulation.None`으로 변경하는 것이다. 이 뷰 캡슐화 전략을 사용하면 컴포넌트에서 지정한 스타일은 글로벌 스타일이 되어 다른 다른 컴포넌트에 영향을 주므로 주의해야 한다.

```typescript
// app.component.ts
import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

  styles: [`
    ...

    .slick-prev {
      left: 10px;
      z-index: 99;
    }

    .slick-next {
      right: 10px;
      z-index: 99;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
```

![slick-plugin](./img/slick-plugin-css.png)

CSS 룰셋이 정상적으로 적용되었다
{: .desc-img}

<iframe src="https://stackblitz.com/edit/integrate-jquery-plugin?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>
