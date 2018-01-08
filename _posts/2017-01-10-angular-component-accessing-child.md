---
layout: post
title: Angular Component - <strong>Accessing Child</strong>
subtitle: 부모 컴포넌트에서 자식 요소로의 접근
categories: angular
section: angular
description: Angular 애플리케이션을 작성하다보면 부모 컴포넌트에서 자식 요소(자식 컴포넌트, 디렉티브, 네이티브 DOM 요소)에 접근이 필요한 경우가 있다. 예를 들어 부모 컴포넌트에서 자식 컴포넌트의 프로퍼티를 직접 변경하고 싶다던지 메소드를 직접 실행하고 싶은 경우이다. Angular는 부모 컴포넌트에서 자식 요소에 접근할 수 있는 데코레이터들을 제공한다. 컴포넌트 템플릿에 배치된 자식요소(자식 컴포넌트, 디렉티브, 네이티브 DOM 요소)를 ViewChild라고 한다. 이름에서 알 수 있듯이 @ViewChild는 탐색 조건에 부합하는 1개의 요소를 취득할 수 있고, @ViewChildren는 탐색 조건에 부합하는 여러개의 요소를 한꺼번에 취득할 수 있다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

Angular 애플리케이션을 작성하다보면 부모 컴포넌트에서 자식 요소(자식 컴포넌트, 디렉티브, 네이티브 DOM 요소)에 접근이 필요한 경우가 있다. 예를 들어 부모 컴포넌트에서 자식 컴포넌트의 프로퍼티를 직접 변경하고 싶다던지 메소드를 직접 실행하고 싶은 경우이다. Angular는 부모 컴포넌트에서 자식 요소에 접근할 수 있는 데코레이터들을 제공한다.

- @ViewChild
- @ViewChildren
- @ContentChild
- @ContentChildren

이 데코레이터들은 접근이 필요한 자식 요소를 탐색하고 탐색된 요소의 인스턴스를 데코레이터가 장식한 프로퍼티에 바인딩한다.

# 1. @ViewChild와 @ViewChildren

컴포넌트 템플릿에 배치된 자식요소(자식 컴포넌트, 디렉티브, 네이티브 DOM 요소)를 ViewChild라고 한다. 이름에서 알 수 있듯이 @ViewChild는 탐색 조건에 부합하는 1개의 요소를 취득할 수 있고, @ViewChildren는 탐색 조건에 부합하는 여러개의 요소를 한꺼번에 취득할 수 있다.

## 1.1 @ViewChild

@ViewChild 데코레이터의 인자로 탐색대상 클래스명을 지정하고 그 결과를 바인딩할 프로퍼티를 지정한다.

```typescript
@ViewChild(탐색대상 클래스명) 프로퍼티명: 탐색대상 클래스명;
```

![viewchild](./img/viewchild.png)
{: .w-650}

@ViewChild 데코레이터
{: .desc-img}

예제를 통해 @ViewChild를 사용하여 보자. 완성된 예제는 아래와 같다.

![example-view-child](./img/example-view-child.png)

@ViewChild 예제 실행 화면
{: .desc-img}

Toggle Child 버튼을 클릭하면 부모 컴포넌트는 자식 컴포넌트의 프로퍼티를 직접 조작하여 자식 컴포넌트를 감추고 다시 클릭하면 자식 컴포넌트를 보여준다. Change Child's text 버튼을 클릭하면 부모 컴포넌트는 자식 컴포넌트의 메소드를 직접 실행하여 자식 컴포넌트의 프로퍼티를 변경시킨다.

새로운 Angular 애플리케이션을 작성하도록 하자.

```bash
$ ng new view-child -it -is -st
```

루트 컴포넌트의 자식 컴포넌트 child를 추가한다.

```bash
$ cd view-child
$ ng g c child
```

자식 컴포넌트 child.component.ts를 아래와 같이 수정한다.

```typescript
// child.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'child',
  template: `
    <div *ngIf="isShow">{{ "{{ contentText " }}}}</div>
  `,
  styles: [`
    div {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      background-color: gray;
      color: white;
      margin-top: 10px;
    }
  `]
})
export class ChildComponent {
  // 부모 컴포넌트가 자식 컴포넌트의 뷰를 감추거나 보이기 위해 직접 접근할 프로퍼티.
  isShow = true;
  contentText = 'Child';

  // 부모 컴포넌트가 자식 컴포넌트의 contentText 프로퍼티를 변경하기 위해 직접 접근할 메소드
  changeText(text: string) {
    this.contentText = text;
  }
}
```

부모 컴포넌트 app.component.ts를 아래와 같이 수정한다.

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  template: `
    <h3>Parent</h3>
    <button type="button" (click)="toggle()">Toggle Child</button>
    <button type="button" (click)="changeText()">Change Child's text</button>
    <child></child>
  `
})
export class AppComponent {
  // myChild 프로퍼티에 자식 컴포넌트 ChildComponent의 인스턴스가 바인딩된다.
  @ViewChild(ChildComponent) myChild: ChildComponent;

  toggle() {
    // 자식 컴포넌트의 프로퍼티를 직접 변경할 수 있다.
    this.myChild.isShow = !this.myChild.isShow;
  }

  changeText() {
    // 자식 컴포넌트의 메소드를 직접 실행할 수 있다.
    this.myChild.changeText('Hello');
  }
}
```

부모 컴포넌트는 @ViewChild 데코레이터를 통해 자식 컴포넌트 ChildComponent를 탐색하여 취득한 자식 컴포넌트 ChildComponent의 인스턴스를 myChild 프로퍼티에 바인딩하였다.

```typescript
@ViewChild(ChildComponent) myChild: ChildComponent;
```

@ViewChild 데코레이터는 1개의 자식 요소만을 가져올 수 있기 때문에 만일 자식 요소 중에 ChildComponent가 여러개 탐색되었을 경우, 첫번째 ChildComponent의 인스턴스를 가져온다.
프로퍼티 myChild에는 자식 컴포넌트 ChildComponent의 인스턴스가 바인딩되어 있으므로 프로퍼티 myChild를 통해 자식 컴포넌트의 프로퍼티, 메소드에 접근할 수 있다. 단 접근 제한자(Access modifier) public으로 공개된 프로퍼티, 메소드에만 접근할 수 있다. typescript는 public, protected, private와 같은 접근 제한자를 지정하지 않은 프로퍼티, 메소드를 기본설정인 public으로 지정한다.

<iframe src="https://stackblitz.com/edit/view-child-decorator?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 1.2 @ViewChildren

@ViewChildren 데코레이터의 인자로 탐색대상 클래스명을 지정하고 그 결과를 바인딩할 프로퍼티를 지정한다. @ViewChildren 데코레이터는 여러개의 자식 요소를 한꺼번에 취득한다. 이때 취득된 자식 요소를 바인딩할 프로퍼티의 타입은 [QueryList](https://angular.io/docs/ts/latest/api/core/index/QueryList-class.html)이 된다.

```typescript
@ViewChildren(탐색대상 클래스명) 프로퍼티명: QueryList<탐색대상 클래스명>;
```

![viewchild](./img/viewchildren.png)
{: .w-650}

@ViewChildren 데코레이터
{: .desc-img}

예제를 통해 @ViewChildren를 사용하여 보자. 완성된 예제는 아래와 같다.

![example-view-children](./img/example-view-children.png)

@ViewChildren 예제 실행 화면
{: .desc-img}

Toggle Child 버튼을 클릭하면 부모 컴포넌트는 모든 자식 컴포넌트 ChildComponent의 프로퍼티를 직접 조작하여 자식 컴포넌트를 체크 상태로 만들고 다시 클릭하면 자식 컴포넌트를 비체크 상태로 만든다.

새로운 Angular 애플리케이션을 작성하도록 하자.

```bash
$ ng new view-children -it -is -st
```

루트 컴포넌트의 자식 컴포넌트 child를 추가한다.

```bash
$ cd view-children
$ ng g c child
```

자식 컴포넌트 child.component.ts를 아래와 같이 수정한다.

```typescript
// child.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'child',
  template: `
    <input
      type="checkbox"
      [id]="checkbox.id"
      [checked]="checkbox.checked">
    <label [for]="checkbox.id">{{ "{{ checkbox.label " }}}}</label>
  `
})
export class ChildComponent {
  // 부모 컴포넌트가 직접 접근할 프로퍼티.
  @Input() checkbox: { id: number, label: string, checked: boolean };
}
```

부모 컴포넌트 app.component.ts를 아래와 같이 수정한다.

```typescript
// app.component.ts
import { Component, ViewChildren, QueryList } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  template: `
    <h3>Parent</h3>
    <button type="button" (click)="toggle()">Toggle Child</button>
    <div *ngFor="let checkbox of checkboxs">
      <child [checkbox]="checkbox"></child>
    </div>
  `
})
export class AppComponent {
  checkboxs: [{ id: number, label: string, checked: boolean }];
  active: boolean;

  // @ViewChildren 데코레이터는 여러개의 자식 요소를 취득한다.
  // 이때 취득된 자식 요소를 바인딩할 프로퍼티의 타입은 QueryList이다.
  @ViewChildren(ChildComponent) myChildren: QueryList<ChildComponent>;

  constructor() {
    this.checkboxs = [
      {id: 1, label: 'HTML', checked: true},
      {id: 2, label: 'CSS', checked: false},
      {id: 3, label: 'Javascript', checked: false}
    ];
    this.active = false;
  }

  toggle() {
    this.active = !this.active;
    // 자식 컴포넌트들을 순회하며 공개된 프로퍼티 checkbox를 변경한다.
    // QueryList는 마치 자바스크립트 배열과 같이 사용할 수 있다.
    this.myChildren.map(child => child.checkbox.checked = this.active);
  }
}
```

부모 컴포넌트는 프로퍼티 바인딩을 통해 자식 컴포넌트에게 checkbox 객체를 전달하고 자식 컴포넌트는 @Input 데코레이터를 통해 checkbox 객체를 접수한다. 부모 컴포넌트는 @ViewChildren 데코레이터를 통해 자식 컴포넌트 ChildComponent를 탐색하여 취득한 모든 자식 컴포넌트 ChildComponent의 인스턴스를 myChildren 프로퍼티에 바인딩하였다.

```typescript
@ViewChildren(ChildComponent) myChildren: QueryList<ChildComponent>;
```

@ViewChildren의 탐색 결과가 바인딩된 myChildren 프로퍼티의 타입은 [QueryList](https://angular.io/api/core/QueryList)이다. QueryList 클래스는 배열과 같이 순회가능한 이터러블(iterable) 객체이다. iterable 인터페이스를 구현하므로 ES6의 for of 루프에 사용할 수 있고 [ngFor](./angular-component-template-syntax#222-ngfor)와 함께 템플릿 내에서도 사용할 수 있다.

또한 클래스 내부에는 탐색 결과를 저장하는 배열 _result 프로퍼티를 가지고 있고 이 프로퍼티를 사용하는 [자바스크립트 배열 메소드](./js-array#5-array-method)와 동일하게 동작하는 map, filter, find, reduce, forEach, some 등의 메소드를 소유하고 있어서 **QueryList는 마치 자바스크립트 배열과 같이 사용할 수 있다.** QueryList는 옵저버블(Observable)한 컬렉션으로 변경 사항을 구독(subscribe)할 수 있다. 옵저버블에 대해서는 RxJS에서 살펴볼 것이다.

QueryList 클래스의 map 메소드를 사용하여 자식 컴포넌트 ChildComponent의 인스턴스들이 바인딩되어 있는 myChildren를 순회하며 자식 컴포넌트 ChildComponent의 프로퍼티에 접근하여 값을 변경한다.

```typescript
this.myChildren.map(child => child.checkbox.checked = this.active);
```

<iframe src="https://stackblitz.com/edit/view-children-decorator?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 1.3 템플릿 참조 변수를 사용한 네이티브 DOM 접근

지금까지 @ViewChild와 @ViewChildren 데코레이터를 통해 자식 컴포넌트의 인스턴스를 취득하는 방법에 대해 알아보았다. @ViewChild와 @ViewChildren 데코레이터는 자식 컴포넌트뿐만 아니라 템플릿에 배치된 모든 요소 즉, 자식 컴포넌트, 디렉티브, 네이티브 DOM 요소를 직접 탐색하고 접근할 수 있다.

Angular는 DOM에 직접 접근하는 방식을 사용하지 않고 템플릿과 컴포넌트 클래스의 상호 관계를 선언하는 방식(선언형 프로그래밍: Declarative programming)으로 뷰와 모델의 관계를 관리한다. 이때 사용되는 것이 데이터 바인딩이며 이를 통해 템플릿은 컴포넌트 클래스와 연결된다.

네이티브 DOM에 직접 접근하는 방식은 뷰와 로직 간의 관계를 느슨하게 결합하기 어려운 구조로 만든다. 뷰가 변경되면 로직도 변경될 가능성이 매우 높아져 로직이 뷰에 종속되기 때문에 템플릿 참조 변수를 사용하여 네이티브 DOM에 직접 접근하는 방식은 이 방법 이외에는 다른 해결 수단이 없을 때에만 한정하여 사용하여야 한다.

DOM에 직접 접근하여 템플릿 내의 자식 요소를 직접 탐색하고 접근하기 위해서는 탐색 대상 요소에 템플릿 참조 변수를 지정할 필요가 있다. 그리고 @ViewChild와 @ViewChildren 데코레이터의 인자로 탐색 대상 요소에 지정된 템플릿 참조 변수를 문자열의 형태로 전달한다.

![elementref](./img/elementref.png)
{: .w-650}

템플릿 참조 변수를 사용한 DOM 접근
{: .desc-img}

예제를 통해 사용 방법을 살펴보자. 새로운 Angular 애플리케이션을 생성하자.

```bash
$ ng new access-native-dom -it -is -st
```

루트 컴포넌트를 아래와 같이 수정한다.

```typescript
// app.component.ts
import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 #h1>Heading1</h1>
    <h2 #h2>Heading2</h2>
    <h3 #h3>Heading3</h3>
  `
})
export class AppComponent {

  // @ViewChild 데코레이터의 인자로 탐색 대상 요소에 지정된 템플릿 참조 변수를 문자열의 형태로 전달한다.
  // 템플릿 참조 변수를 사용하여 네이티브 DOM을 탐색한 경우, 탐색 결과는 ElementRef 타입의 인스턴스가 바인딩된다.
  @ViewChild('h1') myElem: ElementRef;

  // @ViewChildren 데코레이터의 인자로 탐색 대상 요소에 지정된 템플릿 참조 변수의 리스트를 문자열의 형태로 전달한다.
  // 템플릿 참조 변수를 사용하여 네이티브 DOM을 탐색한 경우, 탐색 결과는 ElementRef 타입 인스턴스의 리스트가 바인딩된다.
  @ViewChildren('h2, h3') myElems: QueryList<ElementRef>;

  constructor(elementRef: ElementRef) {
    // 생성자 함수에 주입된 ElementRef는 컴포넌트의 루트 요소를 반환한다.
    console.log(elementRef);
  }

  // ngAfterViewInit은 뷰 초기화가 종료됐을 때 실행되는 컴포넌트 생명주기 메소드이다.
  // Angular가 뷰를 초기화하기 이전에는 DOM에 접근할 수 없다.
  ngAfterViewInit() {
    console.log(this.myElem);
    this.myElems.forEach(child => console.log(child));
  }
}
```

위 예제의 실행 결과는 아래와 같다.

![example-view-children-ref](./img/example-view-children-ref.png)

템플릿 참조 변수를 사용한 DOM 접근 예제 실행 화면
{: .desc-img}

@ViewChild와 @ViewChildren 데코레이터를 사용하여 자식 컴포넌트를 탐색하는 경우, 탐색 결과로 자식 컴포넌트의 인스턴스를 취득할 수 있었다. 취득한 인스턴스는 당연히 인스턴스를 생성한 컴포넌트 클래스가 타입이 된다. 템플릿 참조 변수를 사용하여 네이티브 DOM을 탐색한 경우, 탐색 결과로 [ElementRef](https://angular.io/api/core/ElementRef) 타입의 인스턴스가 바인딩된다. ElementRef는 네이티브 DOM의 프로퍼티를 담고 있는 nativeElement 프로퍼티를 소유한다. 따라서 `ElementRef.nativeElement`로 접근하면 네이티브 DOM의 프로퍼티에 접근할 수 있다.

ngAfterViewInit 메소드는 컴포넌트의 뷰와 자식 컴포넌트의 뷰를 초기화한 이후 호출되는 컴포넌트 생명주기 메소드이다. @ViewChild와 @ViewChildren를 통해 바인딩한 프로퍼티에는 컴포넌트 생명주기 메소드 ngAfterViewInit가 호출된 시점부터 접근할 수 있다. [컴포넌트 생명주기](./angular-lifecycle)에 대해서는 다른 장에서 자세히 다룰 것이다.

<iframe src="https://stackblitz.com/edit/access-native-dom?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

# 2. @ContentChild와 @ContentChildren

## 2.1 콘텐트 프로젝션(Content Projection)

HTML 요소는 시작 태그와 종료 태그 사이에 콘텐츠(Contents)를 포함할 수 있다. 이 콘텐츠는 텍스트일 수도 있고 또 다른 요소일 수도 있다.

![HTML 요소](./img/tag.png)
{: .w-300}

HTML 요소와 콘텐츠
{: .desc-img}

Angular는 콘텐트 프로젝션(Content projection)을 통해 자식 컴포넌트의 콘텐츠를 지정할 수 있다. AngularJS에서 트랜스클루전(transclusion)이라고 불렀던 콘텐트 프로젝션은 부모 컴포넌트가 자식 컴포넌트에게 부모 컴포넌트의 템플릿 일부를 콘텐츠로 전달할 수 있는 기능이다. 자식 컴포넌트는 부모 컴포넌트가 전달한 콘텐츠를 전달받아 표시할 위치를 ngContent 디렉티브를 사용하여 지정한다.

예를 들어 아래와 같이 부모 컴포넌트는 자식 컴포넌트를 템플릿에 추가하면서 자식 컴포넌트에 콘텐츠를 지정하였다. 이 콘텐츠(<p>Contents</p>)는 자식 컴포넌트에 전달된다.

```html
<child>
  <p>Contents</p>
</child>
```

자식 컴포넌트는 ngContent 디렉티브를 사용하여 부모 컴포넌트가 전달한 템플릿 조각을 원하는 위치에 표시한다. ngContent 디렉티브는 부모 컴포넌트가 전달한 템플릿 조각으로 치환된다.

```html
...
<ng-content></ng-content>
...
```

예제를 통해 ngContent의 사용 방법을 알아보자. 새로운 Angular 애플리케이션을 생성하자.

```bash
$ ng new content-projection -it -is -st
```

루트 컴포넌트를 아래와 같이 수정한다. app.component.ts는 두개의 자식 컴포넌트를 사용할 것이다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- 싱글 슬롯 콘텐트 프로젝션 -->
    <single-content-projection>
      <strong>Single-slot</strong> <i>content projection</i>
    </single-content-projection>

    <!-- 멀티 슬롯 콘텐트 프로젝션 -->
    <multi-content-projection>
      <footer>Footer Content</footer>
      <header>Header Content</header>
      <section>Section Content</section>
      <div class="my-class">div with .my-class</div>
    <multi-content-projection>
  `
})
export class AppComponent {}
```

첫번째 자식 컴포넌트 single-content-projection.component.ts를 생성한 후 아래와 같이 수정한다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'single-content-projection',
  template: `
    <h3>Single-slot content projection</h3>
    <div>
      <ng-content></ng-content>
    <div>
  `
})
export class SingleContentProjectionComponent {}
```

부모 컴포넌트가 SingleContentProjectionComponent 컴포넌트를 사용할 때 시작 태그와 종료 태그 사이에 콘텐츠를 추가하였다.

```html
<single-content-projection>
  <!-- 콘텐츠 -->
  <strong>Single-slot</strong> <i>content projection</i>
</single-content-projection>
```

자식 컴포넌트 SingleContentProjectionComponent는 아래와 같이 ng-content를 가지고 있다.

```html
<div>
  <!-- 부모 컴포넌트가 지정한 콘텐츠와 치환된다. -->
  <ng-content></ng-content>
<div>
```

ng-content는 부모 컴포넌트가 지정한 콘텐츠와 치환되어 결국 아래와 같은 DOM을 생성한다.

```html
<div>
  <strong>Single-slot</strong> <i>content projection</i>
<div>
```

두번째 자식 컴포넌트 multi-content-projection.component.ts를 생성한 후 아래와 같이 수정한다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'multi-content-projection',
  template: `
    <h3>Multi-slot content projection</h3>

    <ng-content select="header"></ng-content>
    <ng-content select="section"></ng-content>
    <ng-content select=".my-class"></ng-content>
    <ng-content select="footer"></ng-content>
  `
})
export class MultiContentProjectionComponent {}
```

ng-content는 여러개의 콘텐츠를 한번에 받아들일 수 있는 멀티 슬롯 콘텐트 프로젝션을 지원한다. 이때 ng-content의 select 어트리뷰트를 사용하여 부모 컴포넌트가 지정한 콘텐츠 내의 요소가 프로젝션될 위치를 지정한다.

![multi-slot-content-projection](./img/multi-slot-content-projection.png)
{: .w-650}

멀티 슬롯 콘텐트 프로젝션
{: .desc-img}

<iframe src="https://stackblitz.com/edit/content-projection-exam?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 2.1 @ContentChild와 @ContentChildren

컴포넌트 템플릿에 배치된 자식요소(자식 컴포넌트, 디렉티브, 네이티브 DOM 요소) 즉 ViewChild의 시작 태그와 종료 태그 사이에 있는 콘텐츠를 ContentChild라고 한다. @ContentChild와 @ContentChildren 데코레이터는 이 ContentChild를 탐색할 때 사용한다. 이름에서 알 수 있듯이 @ContentChild는 탐색 조건에 부합하는 1개의 콘텐츠를 취득할 수 있고, @ContentChildren는 탐색 조건에 부합하는 여러개의 콘텐츠를 한꺼번에 취득할 수 있다.

예제를 통해 @ContentChild와 @ContentChildren의 사용 방법을 알아보자. 새로운 Angular 애플리케이션을 생성하자.

```bash
$ ng new content-child-children -it -is -st
```

루트 컴포넌트를 아래와 같이 수정한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <user-list>
      <user #first>Lee</user>
      <user>Beak</user>
      <user>Kim</user>
    </user-list>
  `
})
export class AppComponent {}
```

루트 컴포넌트의 자식 컴포넌트인 UserListComponent는 자식 컴포넌트 UserComponent를 포함하며 이 UserComponent는 ng-content에 의해 프로젝션된다. UserListComponent는 아래와 같다.

```typescript
// user-list.component.ts
import { Component, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { UserComponent } from './user.component';

@Component({
  selector: 'user-list',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
    <button (click)="changeFirstUserColor()">
      첫번째 사용자 배경색 변경
    </button>
    <button (click)="changeAllUserColor()">
      모든 사용자 배경색 변경
    </button>
  `
})
export class UserListComponent {
  // 부모 컴포넌트가 지정한 콘텐츠 중에서 템플릿 참조 변수 first를 가진 콘텐츠를 취득한다.
  @ContentChild('first') firstChild: UserComponent;
  // 부모 컴포넌트가 지정한 콘텐츠 중에서 UserComponent 모두를 취득한다.
  @ContentChildren(UserComponent) children: QueryList<UserComponent>;

  // ngAfterContentInit은 콘텐츠가 초기화됐을 때 실행되는 컴포넌트 생명주기 메소드이다.
  // Angular가 콘텐츠를 초기화하기 이전에는 DOM에 접근할 수 없다.
  ngAfterContentInit() {
    console.log(this.firstChild);
    this.children.forEach(child => console.log(child));
  }

  changeFirstUserColor() {
    this.firstChild.randomizeColor();
  }

  changeAllUserColor() {
    this.children.forEach(child => child.randomizeColor());
  }
}
```

UserListComponent는 부모 컴포넌트가 추가한 콘텐츠를 ng-content를 통해 프로젝션하였다. 프로젝션된 3개의 UserComponent를 @ContentChild와 @ContentChildren 데코레이터를 통해 탐색한다.

```typescript
// 부모 컴포넌트가 지정한 콘텐츠 중에서 템플릿 참조 변수 first를 가진 콘텐츠를 취득한다.
@ContentChild('first') firstChild: UserComponent;
// 부모 컴포넌트가 지정한 콘텐츠 중에서 UserComponent 모두를 취득한다.
@ContentChildren(UserComponent) children: QueryList<UserComponent>;
```

이때 @ContentChild와 @ContentChildren를 사용하는 컴포넌트는 ng-content에 의해 어떤 요소가 프로젝션되는지에 대해 사전에 인지하고 있어야 한다. 이는 자식 컴포넌트가 부모 컴포넌트에 의존하고 있음을 의미한다. 따라서 부모 컴포넌트가 콘텐츠로 지정한 요소가 변경되면 ng-content을 통한 프로젝션으로 이를 받아야 하는 자식 컴포넌트 또한 영향을 받기 때문에 주의가 필요하다.

@ViewChild와 @ViewChildren를 통해 바인딩한 프로퍼티에는 컴포넌트 생명주기 메소드 ngAfterViewInit가 호출된 시점부터 접근할 수 있었다. 이와 마찬가지로 @ContentChild와 @ContentChildren를 통해 바인딩한 프로퍼티에는 컴포넌트 생명주기 메소드 ngAfterContentInit가 호출된 시점부터 접근이 가능하다. [컴포넌트 생명주기](./angular-lifecycle)에 대해서는 다른 장에서 자세히 다룰 것이다.

UserListComponent의 자식 컴포넌트인 UserComponent는 아래와 같다.

```typescript
// user.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'user',
  template: `
    <p [ngStyle]="{ 'background-color': color }">
      <ng-content></ng-content>
    </p>
  `
})
export class UserComponent {
  colors = [ 'yellow', 'chartreuse', 'crimson' ];
  color = this.colors[0];

  randomizeColor() {
    this.color = this.colors[Math.floor(Math.random() * 3)];
  }
}
```

UserListComponent는 @ContentChild와 @ContentChildren 데코레이터를 통해 UserComponent의 인스턴스를 취득하고 randomizeColor 메소드를 직접 호출하여 UserComponent의 배경색을 변경하였다.

위 예제의 실행 결과는 아래와 같다.

<iframe src="https://stackblitz.com/edit/content-child-children?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>

<!-- <iframe src="http://embed.plnkr.co/i7SJPnLxnCeEfWuwArxb/?show=preview" frameborder="0" width="100%" height="400"></iframe> -->

# Reference

* [Angular Component Interaction
](https://angular.io/guide/component-interaction)

* [QueryList](https://angular.io/api/core/QueryList)

* [ES6 In Depth: 이터레이터(iterator)와 for-of 루프 구문](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-iterators-and-the-for-of-loop/)

* [ElementRef](https://angular.io/api/core/ElementRef)

* [Transclusion in Angular 2 with ng-content](https://toddmotto.com/transclusion-in-angular-2-with-ng-content)
