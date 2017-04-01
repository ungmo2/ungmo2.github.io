---
layout: post
title: Angular <strong>Architecture</strong>
subtitle: Angular의 구조
categories: angular
section: angular
description:
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

Angular 어플리케이션은 컴포넌트로 구성된다. 컴포넌트는 <strong>뷰</strong>(화면을 구성하는 한부분)를 표현하는 HTML 템플릿과 뷰 컨트롤 <strong>로직</strong>을 포함한 컴포넌트 클래스로 구성된다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      Hello world!
    </div>
  `
})
export class AppComponent {}
```

컴포넌트는 다른 컴포넌트를 포함할 수 있으며 최상위 컴포넌트를 루트 컴포넌트라 한다.

![component-tree](./img/component-tree.png)

Component Tree
{: .desc-img}

컴포넌트는 모듈에 포함된다.

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ]
})
export class AppModule {}
```

모든 Angular 어플리케이션은 적어도 하나의 모듈을 소유하여야 한다. 이것을 루트 모듈이라 하며 AppModule으로 명명하는 것이 일반적이다.

@NgModule 데코레이터 함수는 메타 데이터 객체를 전달받아 모듈을 정의한다. 메타 데이터 객체의 중요 프로퍼티는 아래와 같다.

- declarations: 모듈에 소속될 구성요소(컴포넌트, 디렉티브, 파이프) 리스트
- bootstrap: 부트스트랩할 컴포넌트
- imports: 모듈에 소속된 구성요소가 필요로 하는 다른 모듈

루트 컴포넌트와 루트 모듈이 구성되었다. 이제 루트 모듈을 부트스트랩할 새로운 파일을 생성한다.

```typescript
// main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

모듈은 여러 환경(서버, 브라우저..)에서 실행될 수 있다. 루트 모듈이 실행될 환경이 브라우저인 경우 `platform-browser-dynamic` 모듈을 import한다. platformBrowserDynamic는 어플리케이션 부트스트래핑 함수이다.

![Angular Architecture](./img/angular-arch.png)
{: .w-650}

Angular Architecture
{: .desc-img}

# Reference

* [Angular](https://angular.io/)
