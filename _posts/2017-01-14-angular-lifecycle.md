---
layout: post
title: Angular <strong>Lifecycle Hooks</strong>
subtitle: 생명주기와 훅 메소드
categories: angular
section: angular
description: 컴포넌트와 디렉티브는 생명주기(Lifecycle)를 갖는다. 이 생명주기는 생성하고 소멸되기까지의 여러 과정을 말하며 Angular에 의해 관리된다. 다시 말해 Angular는 생명주기를 통해 컴포넌트와 디렉티브를 생성하고 자식 컴포넌트를 생성하고 렌더링하며 프로퍼티의 변화를 체크하고 DOM에서 제거하는 일련의 과정을 관리한다. Angular는 생명주기 훅 메소드(lifecycle hooks)를 제공하여 생명주기 단계에서 처리하여야 행위를 정의할 수 있도록 한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 생명주기(Lifecycle)

컴포넌트와 디렉티브는 생명주기(Lifecycle)를 갖는다. 이 생명주기는 생성하고 소멸되기까지의 여러 과정을 말하며 Angular에 의해 관리된다. 다시 말해 Angular는 생명주기를 통해 컴포넌트와 디렉티브를 생성하고 렌더링하며 프로퍼티의 변화를 체크하고 DOM에서 제거하는 일련의 과정을 관리한다.

Angular는 생명주기 훅 메소드(Lifecycle hooks)를 제공하여 생명주기 단계에서 처리하여야 행위를 정의할 수 있도록 한다.

![lifecycle hooks](/img/hooks-in-sequence.png)

생명주기 훅 메소드와 시퀀스
{: .desc-img}

Angular는 위 그림의 순서대로 컴포넌트와 디렉티브를 생성하고 소멸하는 과정 즉 생명주기를 관리하고 변화 감지(Change detection)에 의해 해당 인스턴스를 변경한다. 개발자는 Angular가 제공하는 생명주기 훅 메소드를 구현하여 생명주기 단계에서 필요한 처리를 정의한다.

# 2. 생명주기 훅 메소드(Lifecycle hooks)

생명주기 훅 메소드는 인터페이스의 형태로 제공된다. 예를 들어 OnInit 생명주기에 실행되어야 할 행위를 정의하기 위해서는 훅 메소드 ngOnInit을 구현한다. 이 ngOnInit 메소드는 추상 메소드이며 OnInit 인터페이스에 포함되어 있다.

```typescript
interface OnInit {
  ngOnInit(): void
}
```

이와 같이 생명주기(OnInit)에는 동일한 이름의 인터페이스(OnInit)가 존재한다. 그리고 이 인터페이스는 생명주기 이름 앞에 ng 접두어가 붙은 메서드(ngOnInit)를 포함한다.

따라서 생명주기 OnInit에 실행되어야 할 행위를 정의하려면 OnInit 인터페이스의 ngOnInit 추상 메소드를 구현한다.

```typescript
export class AppComponent implements OnInit {
  name = 'Lee';

  constructor() {
    console.log('constructor');
  }

  // 생명주기 OnInit 단계에 실행할 처리를 구현한다.
  ngOnInit() {
    console.log('ngOnInit');
  }
}
```

컴포넌트와 디렉티브는 클래스이므로 construnctor의 호출에 의해 생성된다. 그 이후, Angular는 특별한 시점에 생명주기 훅 메소드를 호출한다. 각각의 생명주기 훅 메소드가 어떤 시점에 호출되는지 알아보도록 하자.

## 2.1 ngOnChanges

부모 컴포넌트에서 자식 컴포넌트의 **[입력 프로퍼티](./angular-component-interaction#21-부모-컴포넌트에서-자식-컴포넌트로-상태-전달)로 바인딩한 값이 초기화 또는 변경되었을 때 실행**된다. 따라서 컴포넌트에 입력 프로퍼티가 없는 경우, 호출되지 않는다.

ngOnChanges는 ngOnInit 이전에 입력 프로퍼티가 존재하는 경우, 최소 1회 호출된다. 이후에는 입력 프로퍼티가 변경될 때마다 반복 호출된다. 이때 변경은 입력 프로퍼티의 참조의 변경을 말한다. 다시 말해 **기본자료형의 값이 재할당되었을 때와 객체의 참조가 변경되었을 때만 반응한다.** 즉 객체의 프로퍼티가 변경되었을 때에는 반응하지 않는다. 자세한 내용은 아래의 예제에서 살펴보도록 하자.

입력 프로퍼티의 변경 정보를 담고 있는 [SimpleChanges](https://angular.io/api/core/SimpleChanges) 객체를 파라미터로 수신할 수 있다.

```typescript
class MyComponent implements OnChanges {
  @Input() prop1: number;
  @Input() prop2: string;

  ngOnChanges(changes: SimpleChanges) {
    // changes는 모든 입력 프로퍼티의 이전 값과 현재 값을 포함한다.
    console.log(changes);
    /*
    {prop1: SimpleChange, prop2: SimpleChange}
      prop1: SimpleChange {previousValue: undefined, currentValue: 100, firstChange: true}
      prop2: SimpleChange {previousValue: undefined, currentValue: "string", firstChange: true}
    */
  }
}
```

ngOnChange 메소드는 SimpleChanges 객체를 인자로 전달받는다. 이 객체는 모든 입력 프로퍼티의 이전 값과 현재 값을 포함한다.

## 2.2 ngOnInit

ngOnChanges 이후, **모든 프로퍼티와 입력 프로퍼티의 초기화가 완료된 시점에 한번만 호출된다.**

constructor는 [Typescript 클래스](./typescript-class)의 메소드로서 Angular의 생명주기와 직접적인 관계가 없다. constructor는 인스턴스를 생성을 위해 호출된다.

Angular에서 관리하는 입력 프로퍼티의 경우, constructor가 호출되는 단계에서는 초기화되기 이전의 상태이며 참조시 undefined가 반환된다. 즉 **컴포넌트 프로퍼티의 참조는 ngOnInit 이후 보장된다.**

Typescript에서는 constructor에서 프로퍼티를 초기화하는 것이 일반적이지만 Angular의 경우, **프로퍼티의 초기화 처리는 constructor가 아닌 ngOnInit에서 수행하는 것이 좋다.** 만일 constructor에서 프로퍼티를 초기화하면 ngOnInit에서 재차 입력 프로퍼티 초기화가 실행되어 constructor에서 실행한 프로퍼티 초기화 값을 덮어쓰게 된다.

## 2.3 ngDoCheck

ngOnInit 이후, 컴포넌트 또는 디렉티브의 모든 상태의 변화가 발생할 때마다 호출된다. 즉 Angular의 변화 감지 로직이 상태 변화를 감지하면 호출된다.

주의할 것은 ngOnChanges는 입력 프로퍼티에 바인딩된 값이 초기화 또는 변경(기본자료형의 값이 재할당되었을 때와 객체의 참조가 변경)되었을 때에만 반응하여 호출되지만 ngDoCheck는 모든 상태의 변경에 의해 호출된다

따라서 ngDoCheck는 Angular의 변화 감지에 의해 감지되지 않거나 감지할 수 없는 변경 사항을 수동으로 더티 체크(dirty check)하기 위해 사용한다. 커스텀 더티 체크를 구현하기 위해서 [KeyValueDiffers](https://angular.io/api/core/KeyValueDiffers)와 [IterableDiffers](https://angular.io/api/core/IterableDiffers)를 사용한다.

하지만 모든 변화 감지 수행 시점마다 매번 호출되기 때문에 성능에 악영향을 줄 수 있다. 가장 바람직한 것은 Angular의 변화 감지가 상태의 변화를 감지하도록 코드를 구현하는 것이지만 ngDoCheck를 사용할 수 밖에 없는 상황이라면 최대한 가벼운 처리로 성능에 무리를 주지 않도록 주의하여야 한다.

## 2.4 ngAfterContentInit

ngContent 디렉티브를 사용하여 외부 콘텐츠를 컴포넌트의 뷰에 [프로젝션](./angular-component-accessing-child#21-콘텐트-프로젝션content-projection)한 이후 호출된다. 첫번째 ngDoCheck 호출 이후에 한번만 호출되며 컴포넌트에서만 동작하는 컴포넌트 전용 훅 메소드이다.

## 2.5 ngAfterContentChecked

콘텐츠 프로젝션에 의해 컴포넌트로 프로젝션된 콘텐츠를 체크한 후 호출된다. ngAfterContentInit 호출 이후, ngDoCheck 호출 이후 호출되며 컴포넌트에서만 동작하는 컴포넌트 전용 훅 메소드이다.

## 2.6 ngAfterViewInit

컴포넌트의 뷰와 자식 컴포넌트의 뷰를 초기화한 이후 호출된다. 첫번째 ngAfterContentChecked 호출 이후 한번만 호출되며 컴포넌트에서만 동작하는 컴포넌트 전용 훅 메소드이다.

## 2.7 ngAfterViewChecked

컴포넌트의 뷰와 자식 컴포넌트의 뷰를 체크한 이후 호출된다. 첫번째 ngAfterViewInit 호출 이후, ngAfterContentChecked 호출 이후 호출되며 컴포넌트에서만 동작하는 컴포넌트 전용 훅 메소드이다.

## 2.8 ngOnDestroy

컴포넌트와 디렉티브가 소멸하기 이전 호출된다. [RxJS](http://reactivex.io/rxjs/)의 unsubscribe 등 메모리 누수(memory leaks)를 방지 위한 코드 등을 정의한다.

# 3. 생명주기 훅 메소드 실습

예제를 통해 훅 메소드가 실제로 동작하는 것을 살펴보며 훅 메소드의 호출 시점과 용도에 알아보도록 하자.

## 3.1 컴포넌트 생명 주기 훅 메소드

모든 훅 메소드가 호출되도록 예제를 작성하여 보자.

부모 컴포넌트를 아래와 같이 작성한다. 부모 컴포넌트의 버튼에 의해 자식 컴포넌트가 생성, 소멸하도록 ngIf 디렉티브를 사용하도록 한다. 그리고 프로퍼티 바인딩에 의해 부모 컴포넌트에서 자식 컴포넌트로 상태를 전달한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="status = !status">
      {{ "{{ status ? 'Destroy Child' : 'Create Child' " }}}}
    </button>
    <div *ngIf="status">
      <app-child [prop]="prop"></app-child>
    </div>
  `
})
export class AppComponent {
  status = false;
  prop = 'Hello';
}
```

자식 컴포넌트를 아래와 같이 작성한다. 자식 컴포넌트는 @Input 데코레이터를 사용하여 부모 컴포넌트로부터 상태를 전달받는다. 생성자 함수와 모든 생명주기 훅 메소드를 구현하여 훅 메소드의 호출 여부를 확인하여 보자.

```typescript
// child.component.ts
import { Component, Input, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <p>child component</p>
    <p>부모 컴포넌트가 전달한 값: {{ "{{ prop " }}}}</p>
  `
})
export class ChildComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() prop: string;

  constructor() {
    console.log('[construnctor]');
    console.log(`prop: ${this.prop}`); // prop: undefined
    this.prop = 'TEST';
    console.log(`prop: ${this.prop}`); // prop: TEST
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('[OnChanges]');
    console.log(`prop: ${this.prop}`); // prop: Hello
    console.log('changes:', changes);
  }

  ngOnInit() {
    console.log('[OnInit]');
    console.log(`prop: ${this.prop}`); // prop: Hello
  }

  ngDoCheck() {
    console.log('[DoCheck]');
  }

  ngAfterContentInit() {
    console.log('[ngAfterContentInit]');
  }

  ngAfterContentChecked() {
    console.log('[ngAfterContentChecked]');
  }

  ngAfterViewInit() {
    console.log('[ngAfterViewInit]');
  }

  ngAfterViewChecked() {
    console.log('[ngAfterViewChecked]');
  }

  ngOnDestroy() {
    console.log('[ngOnDestroy]');
  }
}
```

Create Child 버튼을 클릭하면 자식 컴포넌트가 생성되면서 훅 메소드가 순차적으로 호출된다. 위 예제의 실행 결과는 아래와 같다.

```
[construnctor]
prop: undefined
prop: TEST
[OnChanges]
prop: Hello
changes: {prop: SimpleChange}
          prop: SimpleChange {previousValue: undefined, currentValue: "Hello", firstChange: true}
          __proto__: Object
[OnInit]
prop: Hello
[DoCheck]
[ngAfterContentInit]
[ngAfterContentChecked]
[ngAfterViewInit]
[ngAfterViewChecked]
```

<iframe src="https://stackblitz.com/edit/lifecycle-hooks-exam?embed=1&file=app/child.component.ts" frameborder="0" width="100%" height="600"></iframe>

우선 construnctor가 호출되었다. construnctor는 인스턴스 생성을 위해 호출되며 Angular의 메소드가 아니다. construnctor에서 입력 프로퍼티를 참조하면 undefined가 출력되는데 이는 입력 프로퍼티의 초기화가 OnInit에서 완성되기 때문이다.

ngOnChanges는 자식 컴포넌트에 입력 프로퍼티가 존재하기 때문에 실행되었다. 만약 자식 컴포넌트에 입력 프로퍼티가 존재하지 않으면 ngOnChanges는 호출되지 않는다.

이후 OnInit, DoCheck, ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked가 순차적으로 호출되는 것을 확인할 수 있다.

이제 생성된 자식 컴포넌트를 소멸시켜 보자. Destroy Child 버튼은 ngIf에 false를 할당하여 자식 컴포넌트를 소멸시킨다. Destroy Child 버튼을 클릭하면 ngOnDestroy가 호출되는 것을 확인할 수 있다.

## 3.2 ngOnChanges와 ngDoCheck

ngOnChanges와 ngDoCheck는 모두 상태 변화와 관계가 있다. 하지만 ngOnChanges는 입력 프로퍼티의 초기화, 변경 시에 호출되고 ngDoCheck는 모든 변화 감지 시점에 호출된다. 하지만 객체의 경우, 내부 프로퍼티를 변경하여도 객체의 참조는 변경되지 않기 때문에 ngOnChanges는 이 변화에 반응하지 않는다. 즉 기본자료형과 불변객체와 같이 이뮤터블(immutable)한 값에만 반응한다. 예제를 통해 살펴보도록 하자.

부모 컴포넌트를 아래와 같이 작성한다. 부모 컴포넌트의 버튼에 의해 자식 컴포넌트가 생성, 소멸하도록 ngIf 디렉티브를 사용하도록 한다. 자식 컴포넌트가 생성된 이후 2개의 버튼이 나타나는데 이 버튼이 변경하고 전달하는 값은 이뮤터블(immutable), 뮤터블(mutable)한 값이다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="status = !status">{{ "{{ status ? 'Destroy Child' : 'Create Child' " }}}}</button>
    <div *ngIf="status">
      <button (click)="immutable='HELLO'">기본자료형 프로퍼티 변경</button>
      <button (click)="mutable.name='kim'">객체형 프로퍼티 변경</button>

      <app-child [immutable]="immutable" [mutable]="mutable"></app-child>
    </div>
  `
})
export class AppComponent {
  status = false;

  immutable = 'Hello';
  mutable = { name: 'Lee' };
}
```

자식 컴포넌트를 아래와 같이 작성한다. 자식 컴포넌트는 @Input 데코레이터를 사용하여 부모 컴포넌트로부터 상태를 전달받는다. 이때 전달된 값의 타입에 따라 다르게 동작하는 것을 확인할 수 있다.

```typescript
// child.component.ts
import { Component, Input, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <p>child component</p>
    <p>부모 컴포넌트가 전달한 값: {{ "{{ immutable " }}}}</p>
    <p>부모 컴포넌트가 전달한 값: {{ "{{ mutable | json " }}}}</p>
  `
})
export class ChildComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() immutable: string;
  @Input() mutable: object;
  prop = 'normal prop';

  constructor() {
    console.log('[construnctor]');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('[OnChanges]');
    console.log(`changes:`, changes);
    console.log(`immutable: ${this.immutable}`);
    console.log(`mutable:`, this.mutable);
  }

  ngOnInit() {
    console.log('[OnInit]');
    console.log(`prop: ${this.prop}`);
    console.log(`immutable: ${this.immutable}`);
    console.log(`mutable:`, this.mutable);
  }

  ngDoCheck() {
    console.log('[DoCheck]');
    console.log(`immutable: ${this.immutable}`);
    console.log(`mutable:`, this.mutable);
  }

  ngAfterContentInit() {
    console.log('[ngAfterContentInit]');
  }

  ngAfterContentChecked() {
    console.log('[ngAfterContentChecked]');
  }

  ngAfterViewInit() {
    console.log('[ngAfterViewInit]');
  }

  ngAfterViewChecked() {
    console.log('[ngAfterViewChecked]');
  }

  ngOnDestroy() {
    console.log('[ngOnDestroy]');
  }
}
```

첫번째 "기본자료형 프로퍼티 변경" 버튼을 클릭하면 기본자료형인 string 타입의 값이 자식 컴포넌트에 전송된다. 이때 이뮤터블한 입력 프로퍼티 immutable에 새로운 값을 재할당한다.

입력 프로퍼티 immutable의 타입은 기본자료형(string)이므로 입력 프로퍼티 immutable의 값은 절대로 변경할 수 없다. 재할당 이전의 값인 문자열 'Hello'를 변경하는 것이 아니라 새로운 문자열 'HELLO'를 메모리에 생성하고 입력 프로퍼티 immutable은 이것을 가리킨다. 즉 재할당 시에 입력 프로퍼티 immutable가 가리키는 참조가 변경된다. 따라서 ngOnChanges가 호출된다.

```
[OnChanges]
changes: {immutable: SimpleChange}
          immutable:SimpleChange {previousValue: "Hello", currentValue: "HELLO", firstChange: false}
immutable: HELLO
mutable: {name: "Lee"}
[DoCheck]
immutable: STRING
mutable: {name: "Lee"}
[ngAfterContentChecked]
[ngAfterViewChecked]
```

두번째 "객체형 프로퍼티 변경" 버튼을 클릭하면 객체 타입의 내부 프로퍼티를 변경하여 자식 컴포넌트에 전송된다. 이때 객체는 뮤터블하므로 내부 프로퍼티의 값을 변경하더라도 참조가 변경되지 않는다. 따라서 **입력 프로퍼티가 변경되지 않은 것으로 간주되어 OnChanges가 호출되지 않는다.** 하지만 Angular의 변화 감지는 상태의 변화를 감지하고 변화 감지에 의해 ngDoCheck는 호출된다.

```
[DoCheck]
immutable: HELLO
mutable: {name: "kim"}
[ngAfterContentChecked]
[ngAfterViewChecked]
```

ngDoCheck는 모든 상태의 변경에 의해 호출된다. 따라서 입력 프로퍼티뿐만 아니라 컴포넌트 프로퍼티가 변경되어도 호출된다. 예를 들어 자식 컴포넌트 템플릿에 아래의 버튼을 추가하고 클릭하면 ngDoCheck는 호출된다.

```html
<button (click)="prop='changed!'">컴포넌트 프로퍼티 변경</button>
```

<iframe src="https://stackblitz.com/edit/lifecycle-hooks-ngonchanges-ngdocheck?embed=1&file=app/child.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 3.3 디렉티브 생명 주기 훅 메소드

디렉티브도 컴포넌트와 동일한 훅 메소드를 사용한다. 다만 뷰가 없는 디렉티브의 특징 상 뷰에 관련한 생명주기는 디렉티브에 존재하지 않으므로 AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked는 디렉티브에 의미가 없다. 즉 OnChanges, DoCheck, OnInit, OnDestory를 필요한 시점에 호출하는 것이다.

# Reference

* [Angular Lifecycle Hooks](https://angular.io/guide/lifecycle-hooks)

* [ngOnChanges](https://angular.io/api/core/OnChanges)

* [ngOnInit](https://angular.io/api/core/OnInit)

* [ngDoCheck](https://angular.io/api/core/DoCheck)

* [ngAfterContentInit](https://angular.io/api/core/AfterContentInit)

* [ngAfterContentChecked](https://angular.io/api/core/AfterContentChecked)

* [ngAfterViewInit](https://angular.io/api/core/AfterViewInit)

* [ngAfterViewChecked](https://angular.io/api/core/AfterViewChecked)

* [ngOnDestroy](https://angular.io/api/core/OnDestroy)

* [SimpleChanges](https://angular.io/api/core/SimpleChanges)

* [Understanding ngDoCheck and KeyValueDiffers in Angular](https://netbasal.com/angular-the-ngstyle-directive-under-the-hood-2ed720fb9b61)

