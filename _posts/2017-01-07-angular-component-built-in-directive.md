---
layout: post
title: Angular Component - <strong>Built-in directive</strong>
subtitle: 빌트인 디렉티브
categories: angular
section: angular
description: 디렉티브(Directive / 지시자)는 "DOM의 모든 것(모양이나 동작 등)을 관리하기 위한 지시(명령)"이다. HTML 요소 또는 어트리뷰트의 형태로 사용하여 디렉티브가 사용된 요소에게 무언가를 하라는 지시(directive)를 전달한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 빌트인 디렉티브(Built-in directive)란?

디렉티브(Directive / 지시자)는 "DOM의 모든 것(모양이나 동작 등)을 관리하기 위한 지시(명령)"이다. HTML 요소 또는 어트리뷰트의 형태로 사용하여 디렉티브가 사용된 요소에게 무언가를 하라는 지시(directive)를 전달한다.

**디렉티브는 애플리케이션 전역에서 사용할 수 있는 공통 관심사를 컴포넌트에서 분리하여 구현한 것으로 컴포넌트의 복잡도를 낮추고 가독성을 향상시킨다.** 컴포넌트도 뷰를 생성하고 이벤트를 처리하는 등 DOM을 관리하기 때문에 큰 의미에서 디렉티브로 볼 수 있다.

간단한 예제를 살펴보자. textBlue 디렉티브는 호스트 요소(디렉티브가 선언된 요소)의 텍스트 컬러를 파란색으로 변경한다.

```typescript
// text-blue.directive.ts
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[textBlue]'
})
export class TextBlueDirective {
  constructor(el: ElementRef, renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'color', 'blue');
  }
}
```

textBlue 디렉티브는 요소의 어트리뷰트로 사용한다. 단, 디렉티브는 모듈의 declarations 프로퍼티에 등록되어야 한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div textBlue>textBlue directive</div>
  `
})
export class AppComponent { }
```

<!-- <iframe src="https://embed.plnkr.co/ObCeP8OmDzYcvTdEtDBO/?show=preview" frameborder="0" width="100%" height="400"></iframe> -->

이전 버전인 AngularJS에는 70개 이상의 빌트인 디렉티브가 존재하였으나 컴포넌트 기반의 Angular 디렉티브는 단순화되어 아래와 같이 3가지 유형의 디렉티브를 제공한다.

[컴포넌트 디렉티브(Component Directives)](./angular-component-basics)
: 컴포넌트의 템플릿을 표시하기 위한 디렉티브이다. @Component 데코레이터의 메타데이터 객체의 seletor 프로퍼티에 임의의 디렉티브의 이름을 정의한다.

[어트리뷰트 디렉티브(Attribute Directives)](./angular-component-template-syntax#21-빌트인-어트리뷰트-디렉티브built-in-attribute-directive)
: 어트리뷰트 디렉티브는 HTML 요소의 어트리뷰트와 같이 사용하여 호스트 요소의 모양이나 동작을 제어한다. ngClass, ngStyle와 같은 빌트인 어트리뷰트 디렉티브가 있다.

[구조 디렉티브(Structural Directives)](./angular-component-template-syntax#22-빌트인-구조-디렉티브built-in-structural-directive)
: 구조 디렉티브는 DOM 요소를 반복 생성(ngFor), 조건에 의한 추가 또는 제거(ngIf, ngSwitch)를 통해 DOM 레이아웃(layout)을 변경한다.

이 장에서는 빌트인 어트리뷰트 디렉티브와 빌트인 구조 디렉티브에 집중하기로 한다. 커스텀 디렉티브는 [디렉티브](./angular-directive)에서 자세히 살펴보도록 하자.

# 2. 빌트인 어트리뷰트 디렉티브(Built-in attribute directive)

빌트인 어트리뷰트 디렉티브는 ngClass, ngStyle 디렉티브와 같이 Angular가 제공하는 어트리뷰트 디렉티브이다.

## 2.1 ngClass

여러 개의 CSS 클래스를 추가 또는 제거한다. 한 개의 클래스를 추가 또는 제거할 때는 클래스 바인딩을 사용하는 것이 좋다.

```html
<element [ngClass]="문자열 | 배열 | 객체">...</element>
```

[ngClass 디렉티브](https://angular.io/api/common/NgClass)는 바인딩된 문자열이나 배열 또는 객체를 HTML 요소의 class 어트리뷰트에 반영한다. ngClass 디렉티브에 바인딩할 수 있는 값은 아래와 같다.

- CSS 클래스 이름이 공백 문자로 구분된 문자열
: 문자열에 나열된 모든 CSS 클래스 이름이 class 어트리뷰트에 반영된다.

```html
<div [ngClass]="'text-bold color-blue'">...</div>
```

- CSS 클래스 이름의 요소로 구성된 배열
: 배열의 요소인 모든 CSS 클래스 이름이 class 어트리뷰트에 반영된다.

```html
<div [ngClass]="['text-bold', 'color-blue']">...</div>
```

- CSS 클래스 이름을 프로퍼티 이름으로, boolean 타입을 프로퍼티 값으로 갖는 객체
: 프로퍼티 값이 true인 프로퍼티 만이 class 어트리뷰트에 반영된다.

```html
<div [ngClass]="{ 'text-bold': true, 'color-blue': false }">...</div>
```

class 어트리뷰트에 의해 이미 클래스가 지정되어 있을 때 ngClass 디렉티브는 class 어트리뷰트를 병합(merge)하여 새로운 HTML class 어트리뷰트를 작성한다.

예를 들어 아래의 코드를 살펴보자.

```html
<div class="class1 class2" [ngClass]="['class2', 'class3']">...</div>
```

위 코드는 class 어트리뷰트에 선언된 클래스와 ngClass 디렉티브에 바인딩된 클래스가 병합되어 아래와 같이 변환될 것이다.

```html
<div class="class1 class2 class3">...</div>
```

여러 개의 클래스를 대상으로 하는 클래스 바인딩([class])의 경우, 기존의 class 어트리뷰트를 삭제하고 바인딩된 클래스의 리스트를 기준으로 새로운 class 어트리뷰트를 작성하는 것과 다르게 동작한다.

ngClass 디렉티브의 사용 방법은 아래와 같다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <!-- 문자열에 의한 클래스 지정  -->
      <li [ngClass]="stringCssClasses">bold blue</li>
      <!-- 배열에 의한 클래스 지정  -->
      <li [ngClass]="ArrayCssClasses">italic red</li>
      <!-- 객체에 의한 클래스 지정  -->
      <li [ngClass]="ObjectCssClasses">bold red</li>
      <!-- 컴포넌트 메소드에 의한 클래스 지정 -->
      <li [ngClass]="getCSSClasses('italic-blue')">italic blue</li>
    </ul>
  `,
  styles: [`
    .text-bold   { font-weight: bold; }
    .text-italic { font-style: italic; }
    .color-blue  { color: blue; }
    .color-red   { color: red; }
  `]
})
export class AppComponent {
  state = true;

  // 문자열 클래스 목록
  stringCssClasses = 'text-bold color-blue';
  // 배열 클래스 목록
  ArrayCssClasses = ['text-italic', 'color-red'];
  // 객체 클래스 목록
  ObjectCssClasses = {
    'text-bold': this.state,
    'text-italic': !this.state,
    'color-blue': !this.state,
    'color-red': this.state
  };

  // 클래스 목록을 반환하는 컴포넌트 메소드
  getCSSClasses(flag: string) {
    let classes;
    if (flag === 'italic-blue') {
      classes = {
        'text-bold': !this.state,
        'text-italic': this.state,
        'color-red': !this.state,
        'color-blue': this.state
      };
    } else {
      classes = {
        'text-bold': this.state,
        'text-italic': !this.state,
        'color-red': this.state,
        'color-blue': !this.state
      };
    }
    return classes;
  }
}
```

<iframe src="https://stackblitz.com/edit/builtin-directive-ngclass?ctl=1&embed=1&hideNavigation=1&file=app/app.component.ts" frameborder="0" width="100%" height="800"></iframe>

클래스 바인딩은 Boolean 표현식 또는 클래스 리스트를 나타내는 문자열을 바인딩한다. ngClass 디렉티브는 문자열, 배열, 객체를 바인딩할 수 있다.

## 2.2 ngStyle

여러 개의 인라인 스타일을 추가 또는 제거한다. 한 개의 인라인 스타일을 추가 또는 제거할 때는 스타일 바인딩을 사용하는 것이 좋다.

```html
<element [ngStyle]="객체">...</element>
```

[ngStyle 디렉티브](https://angular.io/api/common/NgStyle)는 바인딩된 객체를 HTML 요소의 style 어트리뷰트에 반영한다. ngStyle 디렉티브에 바인딩된 객체는 CSS 프로퍼티를 프로퍼티 이름으로, CSS 프로퍼티 값을 프로퍼티 값으로 갖는다. 이때 CSS 프로퍼티 값에 단위가 필요한 경우, CSS 프로퍼티에 단위를 추가한다.

```html
<div [ngStyle]="{ color: 'red', 'width.px': 100 }"></div>
```

style 어트리뷰트에 의해 이미 스타일이 지정되어 있을 때 ngStyle 디렉티브는 HTML style 어트리뷰트를 병합(merge)하여 새로운 HTML style 어트리뷰트를 작성한다.

예를 들어 아래의 코드를 살펴보자.

```html
<div style="color: red; width: 100px;" [ngStyle]="{ color: 'blue', 'height.px': 100 }">...</div>
```

위 코드는 style 어트리뷰트에 선언된 스타일과 ngStyle 디렉티브에 바인딩된 스타일이 병합되어 아래와 같이 변환될 것이다.

```html
<div style="color: blue; width: 100px; height: 100px;">...</div>
```

ngStyle 디렉티브의 사용 방법은 아래와 같다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      Width: <input type="text" [(ngModel)]="width">
      <button (click)="increaseWidth()">+</button>
      <button (click)="decreaseWidth()">-</button>
    </div>
    <div>
      Height: <input type="text" [(ngModel)]="height">
      <button (click)="increaseHeight()">+</button>
      <button (click)="decreaseHeight()">-</button>
    </div>
    <button (click)="isShow=!isShow">{{ "{{ isShow ? 'Hide' : 'Show' " }}}}</button>
    <!-- 스타일 지정  -->
    <div
      [ngStyle]="{
        'width.px': width,
        'height.px': height,
        'background-color': bgColor,
        'visibility': isShow ? 'visible' : 'hidden'
      }">
    </div>
  `
})
export class AppComponent {
  width = 200;
  height = 200;
  bgColor = '#4caf50';
  isShow = true;

  increaseWidth()  { this.width  += 10; }
  decreaseWidth()  { this.width  -= 10; }
  increaseHeight() { this.height += 10; }
  decreaseHeight() { this.height -= 10; }
}
```

<iframe src="https://stackblitz.com/edit/builtin-directive-ngstyle?ctl=1&embed=1&hideNavigation=1&file=app/app.component.ts" frameborder="0" width="100%" height="800"></iframe>

<!-- <iframe src="https://embed.plnkr.co/SlDSZfsOteIjuSCijD2h/?show=preview" frameborder="0" width="100%" height="400"></iframe> -->

스타일 바인딩은 하나의 인라인 스타일을 조건에 의해 추가하는 용도로 사용한다. ngStyle 디렉티브는 객체를 바인딩하여 여러 개의 인라인 스타일을 한 번에 반영할 수 있다.

# 3. 빌트인 구조 디렉티브(Built-in structural directive)

빌트인 구조 디렉티브는 DOM 요소를 반복 생성(ngFor), 조건에 의한 추가 또는 제거를 수행(ngIf, ngSwitch)을 통해 뷰의 구조를 변경한다.

- 구조 디렉티브에는 `*` 접두사를 추가하며 `[]`을 사용하지 않는다.
- 하나의 호스트 요소(디렉티브가 선언된 요소)에는 하나의 구조 디렉티브만을 사용할 수 있다.

## 3.1 ngIf

ngIf 디렉티브는 우변 표현식의 연산 결과가 참이면 호스트 요소를 DOM에 추가하고 거짓이면 호스트 요소를 DOM에서 제거한다. 우변의 표현식은 반드시 true 또는 false로 평가될 수 있어야한다.

```html
<element *ngIf="expression">...</element>
```

ngIf 디렉티브 앞에 붙은 *(asterisk)는 아래 구문의 문법적 설탕(syntactic sugar)이다. 즉 위 코드는 아래의 코드로 변환된다.

```html
<ng-template [ngIf]="expression">
  <element>...</element>
</ng-template>
```

Angular는 *ngIf를 만나면 호스트 요소를 `ng-template` 디렉티브로 래핑하고 *ngIf를 프로퍼티 바인딩으로 변환한다. ngFor와 ngSwitch 디렉티브도 동일한 패턴을 따른다.

ng-template 디렉티브는 컴포넌트 템플릿의 일부로서 정의되지만 단순히 정의된 상태에서는 주석 처리되어 뷰에 렌더링되지 않고 있다가 ngIf에 바인딩된 값이 참으로 평가되면 비로서 뷰에 렌더링된다. 일반적으로 ng-template 디렉티브는 템플릿화된 뷰 스니펫을 호스트 뷰에 추가해야 할 경우 사용한다. ng-template에 대해서는 [ng-template 디렉티브](./angular-directive#43-ng-template)를 참조하기 바란다.
{: .info}

버튼 클릭에 의해 요소를 show/hide하는 간단한 예제를 살펴보자.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- ngIf에 의한 show/hide -->
    <p *ngIf="isShow">Lorem ipsum dolor sit amet</p>

    <!-- 스타일 바인딩에 의한 show/hide -->
    <p [style.display]="isShow ? 'block' : 'none'">Lorem ipsum dolor sit amet</p>

    <button (click)="isShow=!isShow">{{ "{{ isShow ? 'Hide' : 'Show' " }}}}</button>
  `,
  styles: [`
    p { background-color: #CDDC39; }
  `]
})
export class AppComponent {
  isShow = true;
}
```

<iframe src="https://stackblitz.com/edit/builtin-directive-ngif-1?ctl=1&embed=1&hideNavigation=1&file=app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>

ngIf 디렉티브를 사용하지 않고 스타일 바인딩 또는 클래스 바인딩을 사용하여 요소의 표시/비표시를 구현할 수도 있다. 하지만 스타일 바인딩 또는 클래스 바인딩에 의해 비표시된 요소는 브라우저에 의해 렌더링되지 않지만 DOM에 남아있다. ngIf 디렉티브에 의해 제거된 요소는 DOM에 남아 있지 않고 완전히 제거되어 불필요한 자원의 낭비를 방지한다.

![show-hide](./img/show-hide.png)

ngIf에 의해 제거된 요소는 DOM에 남아있지 않는다.
{: .desc-img}

Angular 4부터 `ngIf else`가 추가되었다. ngIf 우변의 표현식이 참이면 호스트 요소를 DOM에 추가하고 거짓이면 else 이후에 기술한 ng-template 디렉티브의 자식을 DOM에 추가한다. 이때 ng-template 디렉티브에는 else 또는 then 이후에 지정한 템플릿 참조 변수를 지정한다.

```html
<!-- if else -->
<element *ngIf="expression; else elseBlock">Truthy condition</element>
<ng-template #elseBlock>Falsy condition</ng-template>

<!-- if else -->
<element *ngIf="expression; then thenBlock else elseBlock"></element>
<ng-template #thenBlock>Truthy condition</ng-template>
<ng-template #elseBlock>Falsy condition</ng-template>

<!-- if -->
<element *ngIf="expression; then thenBlock"></element>
<ng-template #thenBlock>Truthy condition</ng-template>
```

아래의 간단한 예제를 통해 ngIf 디렉티브의 사용법을 살펴보기 바란다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <input type="radio" id="one" name="skill"
            (click)="mySkill=$event.target.value" value="HTML">
      <label for="one"> HTML</label>
      <input type="radio" id="two" name="skill"
            (click)="mySkill=$event.target.value" value="CSS">
      <label for="two"> CSS</label>
    </div>

    <!-- 참인 경우, 별도의 ng-template를 사용하지 않는 방법  -->
    <div *ngIf="mySkill==='HTML'; else elseBlock">HTML</div>
    <ng-template #elseBlock><div>CSS</div></ng-template>

    <!-- 참인 경우, 별도의 ng-template를 사용하는 방법  -->
    <div *ngIf="mySkill==='HTML'; then thenBlock_1 else elseBlock_1"></div>
    <ng-template #thenBlock_1><div>HTML</div></ng-template>
    <ng-template #elseBlock_1><div>CSS</div></ng-template>
  `
})
export class AppComponent {
  mySkill = 'HTML';
}
```

<iframe src="https://stackblitz.com/edit/builtin-directive-ngif-2?ctl=1&embed=1&hideNavigation=1&file=app/app.component.ts" frameborder="0" width="100%" height="700"></iframe>
<!-- <iframe src="https://embed.plnkr.co/ty9JmDJ6rMFNpK7ijYUn/?show=preview" frameborder="0" width="100%" height="400"></iframe> -->

## 3.2 ngFor

ngFor 디렉티브는 컴포넌트 클래스의 컬렉션(배열과 같은 이터러블 객체)을 반복하여 호스트 요소(ngFor 디렉티브가 선언된 요소) 및 하위 요소를 DOM에 추가한다. ngFor 디렉티브에 바인딩된 ES6의 [for...of](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...of)와 유사하게 동작한다.

```html
<element *ngFor="let item of items">...</element>

<element *ngFor="let item of items; let i=index; let odd=odd; trackBy: trackById">...</element>
```

ngFor 디렉티브 앞에 붙은 *(asterisk)는 아래 구문의 문법적 설탕(syntactic sugar)이다. 즉 위 코드는 아래의 코드로 변환된다.

```html
<ng-template ngFor let-item [ngForOf]="items">
  <element>...</element>
</ng-template>

<ng-template ngFor let-item [ngForOf]="items" let-i="index" let-odd="odd" [ngForTrackBy]="trackById">
  <element>...</element>
</ng-template>
```

위 코드는 컴포넌트 클래스의 프로퍼티 items를 바인딩한 후 items의 요소 개수만큼 순회하며 개별 요소를 item에 할당한다. item(템플릿 입력 변수, template input variable)은 호스트 요소 및 하위 요소에서만 유효한 로컬 변수이다. items에 해당하는 바인딩 객체는 일반적으로 배열을 사용하지만 반드시 배열만 사용할 수 있는 것은 아니다. ES6의 [for...of](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...of)에서 사용할 수 있는 [이터러블(iterable)](./es6-iteration-for-of)이라면 사용이 가능하다.

인덱스를 취득할 필요가 있는 경우, 인덱스를 의미하는 템플릿 입력 변수 index를 사용하여 변수에 인덱스를 할당받을 수 있다. index 이외에도 first, last, even, odd와 같은 템플릿 입력 변수가 제공된다. 자세한 내용은 [ngFor API reference](https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html)를 참조하기 바란다.

```html
<element *ngFor="let item of items; let i=index">...</element>
```

컴포넌트 클래스의 프로퍼티인 배열을 뷰에 출력하는 예제를 살펴보자.

```typescript
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string
}

@Component({
  selector: 'app-root',
  template: `
    <!-- user를 추가한다 -->
    <input type="text" placeholder="이름을 입력하세요" #name>
    <button (click)="addUser(name.value)">add user</button>
    <ul>
      <!-- users 배열의 length만큼 반복하며 li 요소와 하위 요소를 DOM에 추가한다 -->
      <li *ngFor="let user of users; let i=index">
        {{ "{{ i " }}}}: {{ "{{ user.name " }}}}
        <!-- 해당 user를 제거한다 -->
        <button (click)="removeUser(user.id)">X</button>
      </li>
    </ul>
    <pre>{{ "{{ users | json " }}}}</pre>
  `
})
export class AppComponent {
  users: User[] = [
    { id: 1, name: 'Lee' },
    { id: 2, name: 'Kim' },
    { id: 3, name: 'Baek' }
  ];

  // user를 추가한다
  addUser(name: string) {
    if (name) {
      this.users.push({ id: this.getNewUserId(), name });
    }
  }

  // 해당 user를 제거한다.
  removeUser(userid: number) {
    this.users = this.users.filter(({ id }) => id !== userid);
  }

  // 추가될 user의 id를 반환한다
  getNewUserId(): number {
    return this.users.length ? Math.max(...this.users.map(({ id }) => id)) + 1 : 1;
  }
}
```

<iframe src="https://stackblitz.com/edit/builtin-directive-ngfor?ctl=1&embed=1&hideNavigation=1&file=app/app.component.ts" frameborder="0" width="100%" height="800"></iframe>

ngFor 디렉티브를 사용하여 users 배열의 length만큼 반복하며 li 요소와 하위 요소를 DOM에 추가한다. ngFor 디렉티브에서 사용된 템플릿 입력 변수 user는 users 배열의 개별 요소를 일시적으로 저장하며 호스트 요소 및 하위 요소에서만 유효한 로컬 변수이다.

ngFor 디렉티브는 컬렉션 데이터(users 배열)가 변경되면 컬렉션과 연결된 모든 DOM 요소를 제거하고 다시 생성한다. 이는 컬렉션의 변경 사항을 추적(tracking)할 수 없기 때문이다. 따라서 크기가 매우 큰 컬렉션을 다루는 경우, 퍼포먼스상의 문제를 발생시킬 수 있다. ngFor 디렉티브는 퍼포먼스를 향상시키기 위한 기능으로 `trackBy`를 제공한다.

trackBy 기능을 추가하여 위 예제를 수정하여 보자.

```typescript
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string
}

@Component({
  selector: 'app-root',
  template: `
    <!-- user를 추가한다 -->
    <input type="text" placeholder="이름을 입력하세요" #name>
    <button (click)="addUser(name.value)">add user</button>
    <ul>
      <!-- users 배열의 length만큼 반복하며 li 요소를 DOM에 추가한다 -->
      <!-- 변경을 트랙킹을 할 수 있도록 trackBy를 추가하였다. -->
      <li *ngFor="let user of users; let i=index; trackBy: trackByUserId">
        {{ "{{ i " }}}}: {{ "{{ user.name " }}}}
        <!-- 해당 user를 제거한다 -->
        <button (click)="removeUser(user.id)">X</button>
      </li>
    </ul>
    <pre>{{ "{{ users | json " }}}}</pre>
  `
})
export class AppComponent {
  users: User[] = [
    { id: 1, name: 'Lee' },
    { id: 2, name: 'Kim' },
    { id: 3, name: 'Baek' }
  ];

  // user를 추가한다
  addUser(name: string) {
    if (name) {
      this.users.push({ id: this.getNewUserId(), name });
    }
  }

  // 해당 user를 제거한다.
  removeUser(userid: number) {
    this.users = this.users.filter(({ id }) => id !== userid);
  }

  // 추가될 users의 id를 반환한다
  getNewUserId(): number {
    return this.users.length ? Math.max(...this.users.map(({ id }) => id)) + 1 : 1;
  }

  // 변경 트래킹 기준을 반환한다.
  trackByUserId(index: number, user: User) {
    // user.id를 기준으로 변경을 트래킹한다.
    return user.id; // or index
  }
}
```

<iframe src="https://stackblitz.com/edit/builtin-directive-ngfor-trackby?ctl=1&embed=1&hideNavigation=1&file=app/app.component.ts" frameborder="0" width="100%" height="1000"></iframe>

user 객체의 id 프로퍼티를 사용하여 users 배열의 변경을 트랙킹할 수 있도록 trackByUserId 메소드를 추가하였다. 이때 user 객체의 id 프로퍼티는 유니크하여야 한다. user 객체의 id 프로퍼티를 사용하지 않고 trackByUserId에 인자로 전달된 index를 사용하여도 무방하다.

add user 또는 X 버튼을 클릭하면 해당 user를 추가/제거한다. 예를 들어 3번째 user 객체를 제거하면 users의 변경을 DOM에 반영하여야 한다. 이때 trackBy를 사용하지 않는 경우 ngFor는 DOM을 다시 생성한다. trackBy를 사용한 경우 user.id를 기준으로 컬렉션의 변경을 트래킹하기 때문에 퍼포먼스가 향상된다.

일반적인 경우 ngFor는 충분히 빠르기 때문에 trackBy에 의한 퍼포먼스 최적화는 기본적으로 필요하지 않다. trackBy는 퍼포먼스에 문제가 있는 경우에만 사용한다.

<!--X 버튼을 클릭하면 해당 user를 제거한다. 예를 들어 3번째 user인 'Park'을 제거하면 users의 변경을 DOM에 반영하여야 한다. 이때 Angular는 변경을 트래킹할 수 없다.

![non-trackby](./img/non-trackby.png)
{: .w-700}

trackBy를 사용하지 않은 경우, 변경을 트래킹할 수 없다
{: .desc-img}

위의 그림과 같이 변경을 트래킹할 수 없기 때문에 Angular는 컬렉션과 연결된 모든 DOM 요소를 제거하고 다시 생성한다. 하지만 trackBy를 사용한 경우, Angular는 user 객체의 id 프로퍼티를 기준으로 아래와 같이 변경을 트랙킹한다.

![trackby](./img/trackby.png)
{: .w-700}

trackBy를 사용한 경우, 변경 트래킹이 가능하다
{: .desc-img}

이와 같이 trackBy는 컬렉션의 변경 트래킹이 가능하기 때문에 보다 향상된 퍼포먼스를 기대할 수 있다.-->

<!--
```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let todo of todos">
        <label for="{{todo.id}}" [class.completed]="todo.completed">
          <input type="checkbox" id="{{todo.id}}"
                 [checked]="todo.completed"
                 (change)="onChange(todo)"> {{todo.content}}
        </label>
      </li>
    </ul>
    <pre>{{todos | json}}</pre>
  `,
  styles: [`
    .completed { text-decoration: line-through; }
  `]
})
export class AppComponent {
  todos: any[];

  constructor() {
    this.todos = [
      { id: 1, content: 'HTML', completed: true },
      { id: 2, content: 'CSS', completed: false },
      { id: 3, content: 'Javascript', completed: false }
    ];
  }

  onChange(todo) {
    this.todos = this.todos.map(
      (item) => item.id === todo.id ?
      Object.assign(item, { completed: !item.completed }) : item
    );
  }
}
```
-->

## 3.3 ngSwitch

ngSwitch 디렉티브는 switch 조건에 따라 여러 요소 중에 하나의 요소를 선택하여 DOM에 추가한다. 자바스크립트의 switch 문과 유사하게 동작한다.

```html
<element [ngSwitch]="expression">
  <!-- switch 조건이 'case1'인 경우 DOM에 추가 -->
  <element *ngSwitchCase="'case1'">...<element>
  <!-- switch 조건이 'case2'인 경우 DOM에 추가 -->
  <element *ngSwitchCase="'case2'">...<element>
  <!-- switch 조건과 일치하는 ngSwitchCase가 없는 경우 DOM에 추가 -->
  <element *ngSwitchDefault>...<element>
</element>
```

ngSwitch 디렉티브 앞에 붙은 *(asterisk)는 아래 구문의 문법적 설탕(syntactic sugar)이다. 즉 위 코드는 아래의 코드로 변환된다.

```html
<element [ngSwitch]="expression">
  <ng-template [ngSwitchCase]="'case1'">
    <element>...</element>
  </ng-template>
  <ng-template [ngSwitchCase]="'case2'">
    <element>...</element>
  </ng-template>
  <ng-template ngSwitchDefault>
    <element>...</element>
  </ng-template>
</element>
```

ngSwitch 디렉티브를 활용한 예제는 아래와 같다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" [(ngModel)]="num" placeholder="숫자를 입력하세요">
    <div [ngSwitch]="num">
      <div *ngSwitchCase="'1'">One</div>
      <div *ngSwitchCase="'2'">Two</div>
      <div *ngSwitchCase="'3'">Three</div>
      <div *ngSwitchDefault>This is Default</div>
    </div>
  `
})
export class AppComponent {
  num: string;
}
```

<iframe src="https://stackblitz.com/edit/builtin-directive-ngswitch?ctl=1&embed=1&hideNavigation=1&file=app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>

# Reference

* [Angular Template Syntax](https://angular.io/guide/template-syntax)

* [ngFor— Not only for Arrays](https://netbasal.com/angular-2-ngfor-array-with-unique-values-6b15478d6484)

* [ES6 In Depth: 이터레이터(iterator)와 for-of 루프 구문](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-iterators-and-the-for-of-loop/)
