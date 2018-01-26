---
layout: post
title: Angular <strong>Directive</strong>
subtitle: 디렉티브
categories: angular
section: angular
description: 디렉티브(Directive 지시자)는 “DOM의 모든 것(모양이나 동작 등)을 관리하기 위한 지시(명령)”이다. HTML 요소 또는 어트리뷰트의 형태로 사용하여 디렉티브가 사용된 요소에게 무언가를 하라는 지시(directive)를 전달한다. 디렉티브는 애플리케이션 전역에서 사용할 수 있는 공통 관심사를 컴포넌트에서 분리하여 구현한 것으로 컴포넌트의 복잡도를 낮추고 가독성을 향상시킨다. 컴포넌트도 뷰를 생성하고 이벤트를 처리하는 등 DOM을 관리하기 때문에 큰 의미에서 디렉티브로 볼 수 있다. 디렉티브는 요소 또는 어트리뷰트와 유사하게 의미를 갖는 이름으로 표현된다. 이때 로직은 드러나지 않으며 단지 디렉티브를 순서에 맞게 배치한다. 이를 선언형 프로그래밍(Declarative programming)이라 한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 디렉티브(directive)란?

디렉티브(Directive 지시자)는 “DOM의 모든 것(모양이나 동작 등)을 관리하기 위한 지시(명령)”이다. HTML 요소 또는 어트리뷰트의 형태로 사용하여 디렉티브가 사용된 요소에게 무언가를 하라는 지시(directive)를 전달한다.

**디렉티브는 애플리케이션 전역에서 사용할 수 있는 공통 관심사를 컴포넌트에서 분리하여 구현한 것으로 컴포넌트의 복잡도를 낮추고 가독성을 향상시킨다. 컴포넌트도 뷰를 생성하고 이벤트를 처리하는 등 DOM을 관리하기 때문에 큰 의미에서 디렉티브로 볼 수 있다.**

컴포넌트는 뷰 단위의 관심사를 가지고 있다면 디렉티브는 DOM 요소의 공통 기능에 관심을 갖는다. 컴포넌트는 뷰를 구성하는 독립적인 구성 요소로서 다른 컴포넌트에 직접적인 관심을 두지 않는다. 디렉티브는 보편적이며 애플리케이션 전역에서 공통으로 사용 가능한 고유의 관심사를 기능으로 구현한다. 디렉티브는 단일 책임 원칙(Single responsibilty principle)에 의해 복합적인 기능보다는 여러 요소에서 공통적, 반복적으로 사용될 하나의 기능을 명확히 구현하는 것이 바람직하다.

큰 의미에서 디렉티브인 컴포넌트는 뷰를 가지며 다른 컴포넌트를 자식으로 가질 수 있다. 하지만 디렉티브는 뷰를 가지고 있지 않기 때문에 자식을 가질 수 없다. 다시 말해 컴포넌트는 자식 컴포넌트, 디렉티브, 파이프를 조합하여 뷰를 만들지만 디렉티브는 부모가 될 수 없고 컴포넌트에 의해 사용될 뿐이다.

디렉티브는 DOM 요소 또는 어트리뷰트와 유사하게 의미를 갖는 이름으로 표현된다. 이때 로직은 드러나지 않으며 단지 디렉티브를 순서에 맞게 배치한다. 이를 선언형 프로그래밍(Declarative programming)이라 한다.

```html
<todo-form></todo-form>
<todo-nav></todo-nav>
<todo-list [todos]="todos"></todo-list>
<todo-footer></todo-footer>
```

디렉티브는 [@Directive](https://angular.io/api/core/Directive) 데코레이터로 장식된 클래스이다. @Directive 데코레이터는 함수이며 디렉티브의 설정 정보가 기술된 메타데이터 객체를 인자로 전달받아 디렉티브를 생성한다. 메타데이터 객체의 정보는 아래와 같다.

```typescript
@Directive({
  selector?: string
  inputs?: string[]
  outputs?: string[]
  host?: {[key: string]: string}
  providers?: Provider[]
  exportAs?: string
  queries?: {[key: string]: any}
})
```

# 2. 디렉티브의 종류

Angular는 3가지 유형의 디렉티브를 제공한다.

[컴포넌트 디렉티브(Component Directives)](./angular-component-basics)
: 컴포넌트의 템플릿을 표시하기 위한 디렉티브이다. @component 데코레이터의 메타데이터 객체의 seletor 프로퍼티에서 임의의 디렉티브의 이름을 정의한다.

[어트리뷰트 디렉티브(Attribute Directives)](./angular-component-template-syntax#21-빌트인-어트리뷰트-디렉티브built-in-attribute-directive)
: 어트리뷰트 디렉티브는 HTML 요소의 어트리뷰트로 사용하여 해당 요소의 모양이나 동작을 제어한다. ngClass, ngStyle와 같은 빌트인 디렉티브가 있다.

[구조 디렉티브(Structural Directives)](./angular-component-template-syntax#22-빌트인-구조-디렉티브built-in-structural-directive)
: 구조 디렉티브는 DOM 요소를 반복 생성(ngFor), 조건에 의한 추가 또는 제거(ngIf, ngSwitch)를 통해 DOM 레이아웃(layout)을 변경한다.

사용자 정의 디렉티브
: 사용자 정의 디렉티브는 Angular의 빌트인 디렉티브가 아닌 사용자 정의 디렉티브이다.

# 3. 사용자 정의 어트리뷰트 디렉티브

## 3.1 사용자 정의 어트리뷰트 디렉티브의 생성

예제를 통해 사용자 정의 어트리뷰트 디렉티브를 살펴보자. textBlue 디렉티브는 해당 요소의 텍스트 컬러를 파란색으로 변경한다. Angular CLI를 사용하여 디렉티브를 추가하도록 한다.

```bash
$ ng generate directive textBlue
```

생성된 text-blue.directive.ts를 아래와 같이 수정한다.

```typescript
// text-blue.directive.ts
import { Directive, ElementRef } from '@angular/core';

// 디렉티브의 식별자를 @Directive 데코레이터의 메타데이터 객체의 selector 프로퍼티에 지정한다.
@Directive({
  selector: '[textBlue]'
})
export class TextBlueDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.color = 'blue';
  }
}
```

디렉티브는 @Directive 데코레이터로 장식된 순수한 자바스크립트 클래스이다. @Directive 데코레이터의 메타데이터에는 디렉티브에 필요한 정보를 설정한다. selector 프로퍼티에는 디렉티브의 이름을 설정하며 값에 있는 대괄호는 이 디렉티브가 프로퍼티 바인딩으로 사용될 수 있음을 표현한 것이다.

<!-- 생성자에 ElementRef와 Renderer가 주입(inject)되었다. ElementRef는 nativeElement 프로퍼티를 통해 DOM에 직접 접근할 수 있는 서비스이다. DOM에 직접 접근하는 경우, XSS 공격에 노출될 수 있는 단점이 있다. 따라서 ElementRef 대신 Renderer의 setElementStyle 메소드를 사용하여 요소의 스타일을 변경하도록 한다. -->

생성자에 [ElementRef](https://angular.io/api/core/ElementRef) 타입의 인스턴스가 주입(inject)되었다. ElementRef 인스턴스는 디렉티브가 선언된 호스트 요소를 가리킨다. 이 인스턴스는 호스트 네이티브 DOM의 프로퍼티를 담고 있는 nativeElement 프로퍼티를 소유한다. 따라서 `ElementRef.nativeElement`로 접근하면 호스트 네이티브 DOM의 프로퍼티에 접근할 수 있다.

하지만 ElementRef를 사용하여 DOM에 직접 접근하는 경우, XSS 공격에 노출될 수 있는 단점이 있다. 따라서 [Renderer2](https://angular.io/api/core/Renderer2)의 [setStyle](https://angular.io/api/core/Renderer2#setStyle) 메소드를 사용하여 호스트 요소의 스타일을 변경하도록 한다.

```typescript
// text-blue.directive.ts
import { Directive, ElementRef, Renderer2 } from '@angular/core';

// 디렉티브의 식별자를 @Directive 데코레이터의 메타데이터 객체의 selector 프로퍼티에 지정한다.
@Directive({
  selector: '[textBlue]'
})
export class TextBlueDirective {
  constructor(el: ElementRef, renderer: Renderer2) {
    // el.nativeElement.style.color = 'blue';
    renderer.setStyle(el.nativeElement, 'color', 'blue');
  }
}
```

디렉티브는 모듈에 등록되어야 한다. @NgModule 데코레이터의 메타데이터 객체의 declarations 프로퍼티에 디렉티브를 추가한다.

```typescript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextBlueDirective } from './text-blue.directive';

@NgModule({
  // 이 모듈에 소속하는 컴포넌트, 디렉티브, 파이프를 선언
  declarations: [AppComponent, TextBlueDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

디렉티브를 모듈에 등록하면 컴포넌트에서 사용할 수 있다. textBlue 디렉티브를 p 요소에 어트리뷰트로 적용한다. 이때 textBlue 디렉티브가 적용된 p 요소는 어트리뷰트 호스트(attribute host)가 된다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<p textBlue>textBlue directive</p>`
})
export class AppComponent { }
```

컴포넌트를 실행하면 textBlue 디렉티브에 의해 요소의 텍스트 컬러가 파란색으로 표시되는 것을 확인할 수 있다.

<iframe src="https://stackblitz.com/edit/custom-attr-directive-1?embed=1&file=app/text-blue.directive.ts" frameborder="0" width="100%" height="500"></iframe>

## 3.2 이벤트 처리

textBlue 디렉티브는 단순히 텍스트의 컬러를 파란색으로 표시한다. 이 정도의 기능이라면 디렉티브를 사용하기 보다는 CSS로 처리할 수 있다. textBlue 디렉티브에 이벤트 처리 기능을 추가해 보자. 마우스 이벤트 mouseenter가 발생하면 텍스트의 컬러를 파란색으로 지정하고 마우스 이벤트 mouseleave가 발생하면 텍스트의 컬러에 지정된 파란색을 취소하도록 textBlue 디렉티브를 리팩토링한다.

```typescript
// text-blue.directive.ts
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({ selector: '[textBlue]' })
export class TextBlueDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.textColor('blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.textColor(null);
  }

  private textColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
```

먼저 주입받은 생성자 파라미터 el(ElementRef 클래스의 인스턴스)에 접근 제한자 private를 추가하여 생성자 내부에서만 유효하던 ElementRef 클래스의 인스턴스 el을 클래스 내부에서 참조가능한 멤버 변수로 변경한다.

사용자 정의 디렉티브에 이벤트 처리 기능을 추가하기 위해 [@HostListener](https://angular.io/api/core/HostListener) 데코레이터를 사용하여 컴포넌트 또는 요소의 이벤트에 대한 핸들러를 정의한다. @HostListener를 사용하면 호스트 요소의 이벤트를 수신할 수 있다.

@HostListener 데코레이터를 사용하는 대신 @Directive 데코레이터의 메타데이터 객체의 host 프로퍼티를 사용할 수도 있다. 하지만 코드의 가독성 측면에서 유리한 @HostListener 데코레이터를 사용하도록 한다. 이벤트 핸들러 onMouseEnter, onMouseLeave는 textColor 메서드를 호출하여 어트리뷰트 호스트의 텍스트 컬러를 변경한다.

<iframe src="https://stackblitz.com/edit/custom-attr-directive-2?embed=1&file=app/text-blue.directive.ts" frameborder="0" width="100%" height="500"></iframe>

## 3.3 @Input 데이터 바인딩

현재 textBlue 디렉티브는 이벤트에 의해 어트리뷰트 호스트의 텍스트 컬러를 파란색으로 변경한다. 이제 어트리뷰트 호스트에서 지정한 컬러를 사용하여 어트리뷰트 호스트의 텍스트 컬러를 변경하도록 리팩토링하여 보자. 이를 위해 어트리뷰트 호스트에서 지정한 값을 디렉티브로 가져올 수 있어야 한다.

우선 컴포넌트 템플릿을 수정한다. 디렉티브의 이름을 textColor로 변경하고 어트리뷰트 호스트에서 프로퍼티 바인딩을 통해 디렉티브로 컬러 값을 전달한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<p textColor [color]="color">Text Color</p>`
})
export class AppComponent {
  color = 'red'
}
```

새로운 TextColorDirective 디렉티브를 추가하고 아래와 같이 편집한다.

```typescript
// text-color.directive.ts
import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[textColor]'
})
export class TextColorDirective {

  // 어트리뷰트 호스트에서 프로퍼티 바인딩한 값을 전달 받는다.
  @Input() color: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.textColor(this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.textColor(null);
  }

  private textColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
```

@Input 데코레이터를 사용하여 어트리뷰트 호스트에서 프로퍼티 바인딩한 값을 전달 받는다. @Input 데코레이터의 사용 방법은 [부모 컴포넌트에서 자식 컴포넌트로 상태 전달](./angular-component-interaction#21-부모-컴포넌트에서-자식-컴포넌트로-상태-전달) 시에 사용할 때와 동일하다.

모듈에 TextColorDirective를 등록하고 컴포넌트를 실행하면 color 어트리뷰트에 바인딩한 컬러가 textColor 디렉티브로 전달되고 요소의 텍스트 컬러가 이벤트에 의해 변경되는 것을 확인할 수 있다.

<iframe src="https://stackblitz.com/edit/custom-attr-directive-3?embed=1&file=app/text-color.directive.ts" frameborder="0" width="100%" height="500"></iframe>

조금더 리팩터링를 해보자. 별도의 color 어트리뷰트에 바인딩한 컬러를 이번에는 textColor 디렉티브에 직접 바인딩하도록 수정한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<p [textColor]="color">Text Color</p>`
})
export class AppComponent {
  color = 'red'
}
```

textColor 디렉티브는 아래와 같이 수정한다.

```typescript
// text-color.directive.ts
...
export class TextColorDirective {

  // 어트리뷰트 호스트에서 프로퍼티 바인딩한 값을 전달 받는다.
  // color는 alias이다.
  @Input('textColor') color: string;
...
```

<iframe src="https://stackblitz.com/edit/custom-attr-directive-4?embed=1&file=app/text-color.directive.ts" frameborder="0" width="100%" height="500"></iframe>

어트리뷰트 디렉티브는 요소의 어트리뷰트로 사용되기 때문에 프로퍼티 바인딩이 가능하다. @Input 데코레이터는 프로퍼티 바인딩을 통한 상태의 전달에 사용된다. 또한 일반 어트리뷰트의 정적인 값을 전달받을 때도 사용할 수 있다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button myDirective [inputValue]="msg" staticValue="hi!">Click me</button>
  `
})
export class AppComponent {
  msg = 'button click';
}
```

위 예제의 inputValue 어트리뷰트는 어트리뷰트 바인딩에 의해 값을 전달받는다. 그에 비해 staticValue 어트리뷰트는 어트리뷰트 바인딩이 아닌 정적 값을 전달받는다. 이 두가지 경우 모두 @Input 데코레이터를 사용할 수 있다.

```typescript
// my-directive.directive.ts
import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[myDirective]'
})
export class MyDirectiveDirective {
  // 프로퍼티 바인딩을 통한 상태 전달
  @Input() inputValue: string;
  // 일반 어트리뷰트의 정적 값의 전달
  @Input() staticValue: string;

  @HostListener('click') onClick() {
    console.log('inputValue: ' + this.inputValue);   // 'button click'
    console.log('staticValue: ' + this.staticValue); // 'hi!'
  }
}
```

<iframe src="https://stackblitz.com/edit/custom-attr-directive-5?embed=1&file=app/my-directive.directive.ts" frameborder="0" width="100%" height="500"></iframe>

마지막으로 mouseenter 이벤트 발생 시에는 라디오 버튼에 의해 입력된 컬러에 의해 텍스트 컬러가 변경되도록 하고 mouseleave 이벤트 발생 시에는 어트리뷰트 호스트의 일반 어트리뷰트에 지정된 정적 값을 통해 텍스트 컬러가 변경되도록 수정하여 보자.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Attribute Directive</h1>

    <h4>텍스트의 컬러를 선택하세요</h4>
    <div>
      <input type="radio" name="colors" (click)="color='red'">Red
      <input type="radio" name="colors" (click)="color='blue'">Blue
      <input type="radio" name="colors" (click)="color='green'">Green
    </div>

    <p [textColor]="color" defaultColor="violet">Text Color</p>
  `
})
export class AppComponent {
  // 라디오 버튼에 의해 지정된 텍스트 컬러
  // 프로퍼티 바인딩에 의해 디렉티브로 전달된다.
  color: string;
}
```

```typescript
// text-color.directive.ts
import { Directive, ElementRef, Renderer2, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[textColor]'
})
export class TextColorDirective implements OnInit  {

  // 프로퍼티 바인딩을 통한 상태 전달
  @Input('textColor') color: string;
  // 일반 어트리뷰트의 정적 값의 전달
  @Input() defaultColor: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // 기본 컬러를 초기 표시에 적용
  ngOnInit() {
    this.textColor(this.defaultColor);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.textColor(this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.textColor(null);
    this.textColor(this.defaultColor);
  }

  private textColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
```

<iframe src="https://stackblitz.com/edit/custom-attr-directive-6?embed=1&file=app/text-color.directive.ts" frameborder="0" width="100%" height="500"></iframe>

# 4. 사용자 정의 구조 디렉티브

## 4.1 사용자 정의 구조 디렉티브의 생성

ngIf 디렉티브의 기능을 그대로 재현하는 간단한 예제를 통해 사용자 정의 구조 디렉티브의 살펴보자. Angular CLI를 사용하여 디렉티브를 추가하도록 한다.

```bash
$ ng generate directive myNgIf
```

TemplateRef와 ViewContainerRef를 import 한 후, 아래와 같이 코드를 수정한다.

```typescript
// my-ng-if.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myNgIf]'
})
export class MyNgIfDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set myNgIf(condition: boolean) {
    if (condition) {
      // 호스트 뷰에 ng-template 디렉티브를 추가
      this.viewContainer.createEmbeddedView(this.templateRef); // ①
    } else {
      // 호스트 뷰에서 ng-template 디렉티브를 제거
      this.viewContainer.clear(); // ②
    }
  }
}
```

myNgIf 디렉티브를 사용하는 컴포넌트는 아래와 같다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h2 *myNgIf="condition">Hello {{ "{{ name " }}}}</h2>
  <button (click)="condition = !condition">Click</button>
  `
})
export class AppComponent {
  condition = false;
  name = 'Lee';
}
```

myNgIf 디렉티브는 TemplateRef와 ViewContainerRef 클래스의 인스턴스를 [주입(Depedency Inject. 의존성 주입)](./angular-service#3-%EC%9D%98%EC%A1%B4%EC%84%B1-%EC%A3%BC%EC%9E%85dependency-injection)받아 사용한다. 이들 클래스에 대해 살펴보도록 하자.

<iframe src="https://stackblitz.com/edit/custom-structure-directive-1?embed=1&file=app/my-ng-if.directive.ts" frameborder="0" width="100%" height="600"></iframe>

## 4.2 TemplateRef와 ViewContainerRef

ngIf, ngFor, ngSwitch와 같은 [빌트인 구조 디렉티브](./angular-component-template-syntax#22-빌트인-구조-디렉티브built-in-structural-directive)는 디렉티브 이름 앞에 붙은 *(asterisk)에 의해 `ng-template`으로 변환된다. 예를 들어 ngIf의 경우를 살펴보자.

```html
<element *ngIf="expression">...</element>
```

ngIf 디렉티브 앞에 붙은 *(asterisk)는 아래 구문의 문법적 설탕(syntactic sugar)이다. 즉 위 코드는 아래의 코드로 변환된다.

```html
<ng-template [ngIf]="expression">
  <element>...</element>
</ng-template>
```

Angular는 *ngIf를 만나면 호스트 요소를 `ng-template` 디렉티브로 래핑하고 ngIf를 프로퍼티 바인딩으로 변환한다.

[TemplateRef](https://angular.io/api/core/TemplateRef)는 ng-template 디렉티브를 가리키는 객체이다. ng-template 디렉티브는 프로퍼티 바인딩에 의해 상태 값을 갖는다.

[ViewContainerRef](https://angular.io/api/core/ViewContainerRef)는 뷰를 포함시킬 수 있는 컨테이너이다. 이 컨테이너에는 두 종류의 뷰가 포함될 수 있다. 하나는 ViewContainerRef의 createComponent 메소드를 통해 컴포넌트를 인스턴스화하여 만든 호스트 뷰(Host View)이고 또 하나는 ViewContainerRef의 createEmbeddedView 메소드를 통해 ng-template을 인스턴스화하여 포함한 임베디브 뷰(Embedded View)이다.

다시 말해 ViewContainerRef는 컴포넌트, 어트리뷰트 디렉티브, 구조 디렉티브의 호스트 뷰를 가리키며 createComponent, createEmbeddedView 메소드를 통해 새로운 요소(컴포넌트 템플릿 또는 ng-template 디렉티브)를 담을 수 있는 DOM 요소이다.

위 코드의 ①과 ②를 살펴보자.

```typescript
  @Input() set myNgIf(condition: boolean) {
    if (condition) {
      // 호스트 뷰에 ng-template 디렉티브를 추가
      this.viewContainer.createEmbeddedView(this.templateRef); // ①
    } else {
      // 호스트 뷰에서 ng-template 디렉티브를 제거
      this.viewContainer.clear(); // ②
    }
  }
}
```

① 프로퍼티 바인딩에 의해 myNgIf 디렉티브의 상태 값이 true이면 createEmbeddedView 메소드에 ng-template 디렉티브를 가리키는 templateRef 객체를 인자로 전달하여 ng-template 디렉티브를 호스트 뷰에 추가한다.

② 상태 값이 false이면 clear 메소드를 호출하여 호스트 뷰에서 ng-template 디렉티브를 제거한다. 제거된 ng-template 디렉티브는 `display: none`으로 감추어진 것이 아니라 DOM에 남아있지 않고 완전히 제거되어 불필요한 자원의 낭비를 방지한다.

## 4.3 ng-template 디렉티브

ng-template 디렉티브는 페이지에서 렌더링 될 요소를 div 또는 span 등의 요소와 함께 사용할 필요가 없는 요소들을 그룹화할 때 사용한다.

ngIf, ngFor, ngSwtch 디렉티브의 경우, ng-template 디렉티브로 변환된다.

```html
<ul>
  <li *ngFor="let item of items">{{ "{{ item " }}}}</li>
</ul>

<!--
NgFor 디렉티브 앞에 붙은 *(asterisk)는 아래 구문의 문법적 설탕(syntactic sugar)이다.
즉 위 코드는 아래의 코드로 변환된다.
-->

<ul>
  <ng-template ngFor let-item [ngForOf]="items">
    <li>{{ "{{ item " }}}}</li>
  </ng-template>
</ul>
```

이때 ng-template는 DOM에 어떠한 영향도 주지 않고 다만 li 요소를 반복하기 위한 ngFor, let-item, [ngForOf]를 담는 역할을 한다. ng-template는 렌더링 시에 주석 처리된다.

일반적으로 ng-template는 [ngTemplateOutlet](https://angular.io/api/common/NgTemplateOutlet) 또는 myNgIf 예제에서 살펴본 바와 같이 createEmbeddedView를 사용하여 TemplateRef이 가리키는 템플릿화된 뷰 스니펫을 호스트 뷰에 추가해야 할 경우 사용한다.

## 4.4 ng-container 디렉티브

ng-container 디렉티브도 ng-template와 마찬가지로 페이지에서 렌더링 될 요소를 div 또는 span 등의 요소와 함께 사용할 필요가 없는 요소들을 그룹화할 때 사용한다.

예를 들어 아래의 경우를 살펴보자

```html
<p>
  안녕하세요!
  <span *ngIf="user">
    {{ "{{ user.name " }}}} 님
  </span>
  방갑습니다.
</p>
```

만일 컴포넌트 클래스에 user 객체가 존재한다면 이름을 표시하는 코드가 있다고 할 때 *ngIf를 사용하기 위해서는 *ngIf를 위한 태그가 있어야 한다. 하지만 span 태그에 CSS가 지정되어 있으면 의도치 않게 스타일이 적용될 것이다. 위 코드에서 span 태그를 제외하려면 ng-container를 사용한다.

```html
<p>
  안녕하세요!
  <ng-container *ngIf="user">
    {{ "{{ user.name " }}}} 님
  </ng-container>
  방갑습니다.
</p>
```

이와 같이 span나 div와 같이 사용할 필요가 없이 단순히 디렉티브를 위한 태그가 필요할 경우가 있다. 이런 경우 사용하는 것이 ng-template과 ng-container이다.

ng-container도 ng-template와 마찬가지로 DOM에 어떠한 영향도 주지 않고 div 또는 span 등을 사용하지 않고 요소들을 그룹화할 때 사용한다. <strong>ng-container와  ng-template의 차이는 ng-container는 `*` 문법을 사용할 수 있고 ng-template는 `*` 문법을 사용할 수 없다는 것이다.</strong>

```html
<ul>
  <ng-container *ngFor="let item of items">
    <element>...</element>
  </ng-container>
</ul>
```

Angular는 같은 요소에 하나 이상의 구조 디렉티브 사용을 금지한다. **일반적으로 ng-container는 동일한 요소에 하나 이상의 *ngIf 또는 *ngFor와 같은 구조 디렉티브를 사용하기 위한 헬퍼 요소로서 사용한다.**

아래는 하나 이상의 *ngIf 또는 *ngFor와 같은 구조 디렉티브를 사용하기 위한 헬퍼 요소로서 ng-container를 사용한 예제이다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="isShow">
      <ng-container *ngFor="let item of items">
        <span>{{ "{{ item " }}}}</span>
      </ng-container>
    </ng-container>
    <button (click)="isShow=!isShow">
      {{ "{{ isShow ? 'hide' : 'show' " }}}}
    </button>
  `
})
export class AppComponent {
  isShow = true;
  items = [1, 2, 3];
}
```

<iframe src="https://stackblitz.com/edit/ng-container?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

select 태그를 동적으로 구성하는 Range 사용자 정의 구조 디렉티브를 통해 ng-container에 사용 방법에 대해 알아보도록 하자.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>Your age:</h1>
  <select>
  <!--
  ng-container는 페이지에서 렌더링 될 요소를 div 또는 span 등의 다른 요소와 함께 사용할 필요가 없는 요소들을 그룹화할 때 사용한다.
  ng-container는 * 구문을 사용할 수 있다.
  -->
    <ng-container *range="[10, 19]; let num">
      <option [value]="num">{{ "{{ num " }}}}</option>
    </ng-container>
  </select>

  <h1>Year:</h1>
  <select>
    <ng-container *range="[2000, 2017]; let num">
      <option [value]="num">{{ "{{ num " }}}}</option>
    </ng-container>
  </select>
  `
})
export class AppComponent {}
```

```typescript
// range.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[range]'
})
export class RangeDirective {
  _range: number[];
  // 프로퍼티 바인딩: 범위 취득
  @Input() set range(value) {
    this.viewContainer.clear();
    this._range = this.generateRange(value[0], value[1]);

    // 범위를 갖는 배열 _range를 순회하며 select 요소의 option 요소를 호스트 뷰에 추가한다.
    this._range.forEach(num => {
      // $implicit 프로퍼티 값 num은 ng-container의 num 변수에 할당되고 컴포넌트 템플릿 value의 값이 된다.
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: num
      });
    });
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  // from과 to로 범위를 갖는 배열을 생성
  private generateRange(from, to) {
    const res = [];
    let i = from;
    while (i < to + 1) {
      res.push(i);
      i++;
    }
    return res;
  }
}
```

<iframe src="https://stackblitz.com/edit/custom-structure-directive-2?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

# Reference

* [Angular NgModules](https://angular.io/guide/ngmodule)

* [Angular Built-in directive](./angular-component-template-syntax#2-빌트인-디렉티브built-in-directive)

* [@Directive](https://angular.io/api/core/Directive)

* [@HostListener](https://angular.io/api/core/HostListener)

* [ElementRef vs Renderer](http://www.code-sample.com/2017/06/angular-2-elementref-vs-renderer.html)

* [TemplateRef](https://angular.io/api/core/TemplateRef)

* [ViewContainerRef](https://angular.io/api/core/ViewContainerRef)
