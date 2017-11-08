---
layout: post
title: Angular Component - <strong>Style</strong>
subtitle: 컴포넌트와 스타일
categories: angular
section: angular
description: Angular 컴포넌트는 동작 가능한 하나의 부품으로 다른 컴포넌트에 간섭을 받지 않는 독립된 스코프의 스타일 정보를 갖는다. 다시 말해 컴포넌트에서 정의한 스타일은 그 컴포넌트에서만 유효하다. 스타일을 정의하는 방법은 @Component 데코레이터의 메타데이터 객체의 styles 프로퍼티에 직접 정의하는 방법과 styleUrls 프로퍼티에 외부 CSS 파일의 경로를 정의하는 방법이 있다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 컴포넌트 스타일

Angular 컴포넌트는 동작 가능한 하나의 부품으로 다른 컴포넌트에 간섭을 받지 않는 독립된 스코프의 스타일 정보를 갖는다. 다시 말해 컴포넌트에서 정의한 스타일은 그 컴포넌트에서만 유효하다.

스타일을 정의하는 방법은 @Component 데코레이터의 메타데이터 객체의 styles 프로퍼티에 직접 정의하는 방법과 styleUrls 프로퍼티에 외부 CSS 파일의 경로를 정의하는 방법이 있다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h3>Component Style: Parent</h3>
    <button class="btn-primary">Button</button>
  `,
  styles: [`
    h3 {
      color: dimgray;
    }
    .btn-primary {
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
    }
  `]
})
export class AppComponent {}
```

스타일 정의가 복잡하지 않을 경우, CSS를 인라인 스타일로 정의하여도 좋지만 스타일 정의가 복잡해지면 외부 파일로 분리하는 것이 좋다. 하나의 외부 파일만이 아니라 기능별로 분리된 여러개의 CSS 파일을 포함할 수도 있다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h3>Component Style: Parent</h3>
    <button class="btn-primary">Button</button>
  `,
  styleUrls: [`./app.component.css`]
})
export class AppComponent {}
```

```css
/* app.component.css */
h3 {
  color: dimgray;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
```

AppComponent 컴포넌트에서 정의한 스타일은 AppComponent 컴포넌트를 위한 스타일이다. 위 예제의 h3 셀렉터는 AppComponent 컴포넌트 템플릿만을 대상으로 하며 다른 컴포넌트에는 영향을 주지 않는다.

자식 컴포넌트를 추가하여 부모 컴포넌트의 스타일이 자식 스타일에 영향을 주지 않는 것을 확인하여 보자.

```typescript
// child.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h3>Component Style: Child</h3>
    <button class="btn-primary">Button</button>
  `
})
export class ChildComponent {}
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h3>Component Style: Parent</h3>
    <button class="btn-primary">Button</button>
    <app-child></app-child>
  `,
  styleUrls: [`./app.component.css`]
})
export class AppComponent {}
```

부모 컴포넌트 AppComponent에는 스타일을 정의하였으나 자식 컴포넌트 ChildComponent에는 아무런 스타일도 정의하지 않았다. 이때 부모 컴포넌트의 스타일은 자식 컴포넌트에 어떠한 영향을 주지 않는다.

![component style](/img/comp-style.png)

컴포넌트에서 정의한 스타일은 그 컴포넌트에서만 유효하다.
{: .desc-img}

자식 컴포넌트 ChildComponent에 스타일을 정의하여 컴포넌트 간에 영향을 주지 않는 것을 확인하여 보자.

```typescript
// child.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h3>Component Style: Child</h3>
    <button class="btn-primary">Button</button>
  `,
  styleUrls: [`./child.component.css`]
})
export class ChildComponent {}
```

```css
/* child.component.css */
h3 {
  color: deepskyblue;
}
```

위 예제를 확인하여 보면 자신에 적용한 스타일은 자신에만 영향을 주는 확인할 수 있다.

# 2. 뷰 캡슐화 (View Encapsulation)

위 예제의 실행 결과를 크롬 개발자 도구를 사용하여 확인하여 보자.

![Encapsulation](/img/encapsulation.png)

Encapsulation
{: .desc-img}

위 결과를 살펴보면 ChildComponent의 컴포넌트 템플릿의 h3 요소에 어트리뷰트 _ngcontent-c1가 추가된 것을 확인할 수 있다. 이것은 Angular가 임의로 추가한 어트리뷰트로 이 어트리뷰트를 기존 CSS에 어트리뷰트 셀렉터를 추가하는 방식으로 해당 컴포넌트를 스코프로 한정하여 스타일이 적용될 수 있도록 한다.

Angular는 컴포넌트의 CSS 스타일을 컴포넌트의 뷰에 캡슐화하여 다른 컴포넌트에는 영향을 주지 않는다. 위의 경우와 같이 Angular는 기본적으로 임의의 어트리뷰트를 추가하는 방식(Emulated)을 사용하여 뷰 캡슐화를 구현하지만 브라우저가 웹 컴포넌트를 지원한다는 전제 하에 웹 컴포넌트의 Shadow DOM을 이용하여 뷰 캡슐화를 구현할 수도 있다.

이를 위해 @Component 메타데이터 객체에 `encapsulation` 프로퍼티에 [ViewEncapsulation](https://angular.io/api/core/ViewEncapsulation) 옵션을 지정하여 컴포넌트 별로 뷰 캡슐화 전략을 설정할 수 있다. ViewEncapsulation은 열거형으로 아래의 3가지 캡슐화 전략을 제공한다.

| ViewEncapsulation  | 의미
|:-------------------|:----------------------
| Emulated           | 임의의 어트리뷰트를 추가하는 브라우저의 기본 쉐도우 DOM 구현 방식으로 컴포넌트의 스타일은 해당 컴포넌트에만 적용된다. (기본 전략)
| Native             | 웹 컴포넌트의 Shadow DOM를 사용하는 방식으로 컴포넌트의 스타일은 해당 컴포넌트에만 적용된다.
| None               | 스타일 캡슐화를 지원하지 않는다. 컴포넌트의 CSS는 전역에 지정되어 다른 다른 컴포넌트에 영향을 준다.

위 예제를 웹 컴포넌트의 Shadow DOM를 사용하는 Native 전략으로 변경하여 보자. AppComponent와 ChildComponent의 @Component 메타데이터 객체에 아래와 같이 encapsulation 프로퍼티를 추가하고 ViewEncapsulation.Native를 지정한다.

```typescript
// app.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h3>Component Style: Parent</h3>
    <button class="btn-primary">Button</button>
    <app-child></app-child>
  `,
  styleUrls: [`./app.component.css`],
  encapsulation: ViewEncapsulation.Native
})
export class AppComponent {}
```

![Encapsulation Native](/img/encapsulation-native.png)

Encapsulation Native
{: .desc-img}

# 3. 쉐도우 DOM 스타일 셀렉터 (Shadow DOM Style Selector)

컴포넌트 스타일은 쉐도우 DOM에 접근에 사용하는 특수한 셀렉터인 쉐도우 DOM 스타일 셀렉터를 제공한다. 쉐도우 DOM 스타일 셀렉터는 Shadow DOM 스펙에 명시된 셀렉터로 스타일 캡슐화(Emulated 또는 Native)와 상관없이 사용할 수 있다.

| 쉐도우 DOM 스타일 셀렉터 | 의미
|:--------------------|:------------------------------------
| :host               | 호스트 요소(컴포넌트 자신)을 선택한다.
| :host-context       | 호스트 요소의 외부(예를 들어 body)의 조건에 의해 컴포넌트의 요소를 선택한다.
| /deep/              | [폐지 예정](https://angular.io/guide/component-styles#deprecated-deep--and-ng-deep) 자식 컴포넌트에 속한 요소를 선택한다.

## 3.1 :host

:host 셀렉터는 호스트 요소(컴포넌트 자신)을 선택한다. 위 예제에 :host 셀렉터를 사용하여 보자.

```css
/* app.component.css */
/* 호스트 요소 <app-root>에 대해 적용된다 */
:host {
  display: block;
  background-color: lightgray;
  border: 1px solid dimgray;
  padding: 20px;
}
h3 {
  color: dimgray;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
```

```css
/* child.component.css */
/* 호스트 요소 <app-child>에 대해 적용된다 */
:host {
  display: block;
  background-color: lightcyan;
}

h3 {
  color: deepskyblue;
}
```

![:host 셀렉터](/img/shdow-dom-host.png)

:host 셀렉터
{: .desc-img}

만약에 호스트 요소의 상태에 따라 스타일을 적용하려면 :host 셀렉터에 부가적인 정보를 추가한다. 예를 들어 호스트 요소에 active 클래스가 선언되어 있을 경우, 또는 호스트 요소가 hover 상태일 때 스타일을 적용하려면 아랴와 같이 룰셋을 정의한다.

```typescript
// app.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h3>Component Style: Parent</h3>
    <button class="btn-primary">Button</button>
    <app-child class="active"></app-child>
  `,
  styleUrls: [`./app.component.css`],
  encapsulation: ViewEncapsulation.Native
})
export class AppComponent {}
```

자식 컴포넌트에 active 클래스를 선언하였다. 이때 자식 컴포넌트 CSS의 :host(.active) 셀렉터가 적용된다.

```css
/* child.component.css */
:host {
  display: block;
}

/* 호스트 요소에 active class가 선언되어 있을 때 적용된다. */
:host(.active) {
  background-color: lightcyan;
}

/* 호스트 요소가 hover 상태일 때 적용된다. */
/* :click, :active도 사용할 수 있다. */
:host(:hover) {
  background-color: royalblue;
}
```

## 3.2 :host-context

:host-context 셀랙터는 호스트 요소의 외부의 조건 즉 조상 요소의 클래스 선언 상태에 의해 컴포넌트의 요소를 선택하는 경우 사용한다. :host-context 셀랙터는 호스트 요소(컴포넌트 자신)의 모든 조상 요소에서 CSS 클래스 찾는다. 이때 조건으로 지정한 클래스가 선언된 조상 요소가 존재하면 룰셋이 적용된다. 위 예제에 :host-context 셀렉터를 사용하여 보자.

```typescript
// app.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h3>Component Style: Parent</h3>
    <button class="btn-primary">Button</button>
    <div class="theme-red">
      <app-child class="active"></app-child>
    </div>
  `,
  styleUrls: [`./app.component.css`],
  encapsulation: ViewEncapsulation.Native
})
export class AppComponent {}
```

자식 컴포넌트의 조상 요소에 theme-red 클래스가 선언되었다. 이때 자식 컴포넌트 CSS의 :host-context(.theme-red) 셀렉터가 적용된다.

```css
/* child.component.css */
:host {
  display: block;
}

/* 호스트 요소에 active class가 선언되어 있을 때 적용된다. */
:host(.active) {
  background-color: lightcyan;
}

/* 호스트 요소가 hover 상태일 때 적용된다. */
:host(:hover) {
  background-color: royalblue;
}

/* 컴포넌트의 조상 요소에 theme-red 클래스가 선언되어 있을 때 적용된다. */
:host-context(.theme-red) .btn-primary {
  color: #fff;
  background-color: crimson;
  border-color: crimson;
}

/* 컴포넌트의 조상 요소에 theme-blue 클래스가 선언되어 있을 때 적용된다. */
:host-context(.theme-blue) .btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
```

# 4. 글로벌 스타일

애플리케이션 전역에 적용되는 글로벌 스타일을 적용하려면 src/styles.css에 CSS 룰셋을 정의한다. 또는 .angular-cli.json 파일의 apps.styles 프로퍼티에 CSS 파일의 경로를 추가한다.

```json
{
  ...
  "apps": [
    {
      ...
      "styles": [
        "styles.css",
        "another-global.css"
      ],
```


# 5. Angular CLI로 Sass 적용 프로젝트 생성

Angular는 Sass, Less, Stylus과 같은 대부분의 CSS 프리 프로세서를 지원한다. Sass를 적용한 프로젝트를 생성하려면 아래의 CLI 명령어를 사용한다.

```bash
$ ng new sass-project --style=scss
```

이때 생성된 .angular-cli.json 파일을 살펴보면 apps.tyles 프로퍼티와 defaults.styleExt 프로퍼티의 값이 scss로 변경된 것을 알 수 있다.

```json
{
  ...
  "apps": [
    ...
    "styles": [
      "styles.scss"
    ],
  ...
  "defaults": {
    "styleExt": "scss",
    "component": {}
  }
}
```

# 6. Angular Material

Angular Material 패키지를 적용하려면 아래의 링크를 참조하기 바란다.

[Getting started](https://material.angular.io/guide/getting-started)

# Reference

* [Angular Styles](https://angular.io/guide/component-styles)

* [Shadow DOM](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom?hl=ko)

* [ViewEncapsulation](https://angular.io/api/core/ViewEncapsulation)

* [Angular Material](https://material.angular.io/)

