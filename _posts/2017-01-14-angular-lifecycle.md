---
layout: post
title: Angular <strong>Lifecycle Hooks</strong>
subtitle: 생명주기와 훅 메소드
categories: angular
section: angular
description: 컴포넌트와 디렉티브는 생명주기(Lifecycle)를 갖는다. 이 생명주기는 컴포넌트와 디렉티브가 생성하고 소멸되기까지의 여러 과정을 말하며 Angular에 의해 관리된다. Angular는 생명주기를 통해 컴포넌트와 디렉티브를 생성하고 렌더링하며, 프로퍼티의 변화를 체크하고 DOM에서 제거하는 일련의 과정을 관리한다. 개발자는 Angular가 제공하는 생명주기 훅 메소드(Lifecycle hooks)를 구현하여 생명주기 단계에서 처리하여야 행위를 정의할 수 있다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 생명주기(Lifecycle)

컴포넌트와 디렉티브는 생명주기(Lifecycle)를 갖는다. 이 생명주기는 컴포넌트와 디렉티브가 생성하고 소멸되기까지의 여러 과정을 말하며 Angular에 의해 관리된다. Angular는 생명주기를 통해 컴포넌트와 디렉티브를 생성하고 렌더링하며, 프로퍼티의 변화를 체크하고 DOM에서 제거하는 일련의 과정을 관리한다. 개발자는 Angular가 제공하는 생명주기 훅 메소드(Lifecycle hooks)를 구현하여 생명주기 단계에서 처리하여야 행위를 정의할 수 있다.

![lifecycle hooks](/img/hooks-in-sequence.png)

생명주기 시퀀스와 훅 메소드
{: .desc-img}

Angular는 위 그림의 순서(생명주기 시퀀스)대로 생명주기를 관리하고 생명주기 이름 앞에 ng가 붙은 생명주기 훅 메소드를 제공한다.

# 2. 생명주기 훅 메소드(Lifecycle hooks)

생명주기 훅 메소드는 인터페이스의 형태로 제공된다. 예를 들어 OnInit 생명주기에 처리되어야 할 행위를 정의하기 위해서는 훅 메소드 ngOnInit를 구현한다. 이 ngOnInit 메소드는 추상 메소드이며 OnInit 인터페이스에 포함되어 있다.

```typescript
interface OnInit {
  ngOnInit(): void
}
```

이와 같이 생명주기(OnInit)에는 동일한 이름의 인터페이스(OnInit)가 존재한다. 그리고 이 인터페이스는 생명주기 이름 앞에 ng 접두어가 붙은 추상 메서드(ngOnInit)를 포함한다. 생명주기(OnInit)에 처리되어야 할 행위를 정의하려면 생명주기 인터페이스(OnInit)의 추상 메소드(ngOnInit)를 구현한다.

```typescript
import { Component, OnInit } from '@angular/core';
...
export class AppComponent implements OnInit {
  name = 'Lee';

  constructor() { }

  // 생명주기 OnInit 단계에 실행할 처리를 구현한다.
  ngOnInit() { ... }
}
```

컴포넌트와 디렉티브는 클래스이므로 construnctor의 호출에 의해 생성된다. 그 이후, Angular는 특별한 시점에 구현된 생명주기 훅 메소드를 호출한다. 물론 모든 생명주기 훅 메소드를 구현할 필요는 없다. 특정 생명주기에 처리해야 할 행위가 있을 때, 필요한 생명주기 훅 메소드만을 구현하면 된다. 각각의 생명주기 훅 메소드가 어떤 시점에 호출되는지 알아보도록 하자.

## 2.1 ngOnChanges

부모 컴포넌트에서 자식 컴포넌트의 **[입력 프로퍼티(@Input 데코레이터로 장식된 프로퍼티)](./angular-component-interaction#21-부모-컴포넌트에서-자식-컴포넌트로-상태-전달)로 바인딩한 값이 초기화 또는 변경되었을 때 실행**된다. 따라서 컴포넌트에 입력 프로퍼티가 없는 경우, 호출할 필요가 없다. 아래의 예제를 살펴보도록 하자.

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

ngOnChanges는 ngOnInit 이전에 입력 프로퍼티가 존재하는 경우, 최소 1회 호출된다. 이후에는 입력 프로퍼티가 변경될 때마다 반복 호출된다. 이때 변경은 입력 프로퍼티의 참조 변경을 말한다. 다시 말해 **기본 자료형의 값이 재할당되었을 때와 객체의 참조가 변경되었을 때만 반응한다.** ngOnChanges은 입력 프로퍼티의 참조 변경에만 반응하므로 입력 프로퍼티가 아닌 일반 컴포넌트 프로퍼티의 내용이 변경되었을 때는 반응하지 않는다. 이에 대해서는 "[ngOnChanges와 ngDoCheck](./angular-lifecycle#32-ngonchanges%EC%99%80-ngdocheck)"에서 좀 더 자세히 살펴볼 것이다.

ngOnChange 메소드는 입력 프로퍼티의 변경 정보를 담고 있는 [SimpleChanges](https://angular.io/api/core/SimpleChanges) 객체를 인자로 전달받을 수 있다. 이 객체는 모든 입력 프로퍼티의 이전 값과 현재 값을 포함한다.

## 2.2 ngOnInit

ngOnChanges 이후, **입력 프로퍼티를 포함한 모든 프로퍼티의 초기화가 완료된 시점에 한 번만 호출된다.**

constructor는 [TypeScript 클래스](./typescript-class)의 메소드로서 인스턴스 생성을 위해 호출된다. Angular에서 constructor는 의존성 주입을 위해 사용되기도 하지만 Angular의 생명주기와 직접적인 관계는 없다.

TypeScript에서는 constructor에서 프로퍼티를 초기화하는 것이 일반적이지만 Angular의 경우, 프로퍼티 초기화 처리는 constructor가 아닌 `ngOnInit`에서 수행하는 것이 좋다. 간단한 값으로 프로퍼티를 초기화하는 것은 문제가 되지 않지만 서버에서 데이터를 가져와 할당하는 것과 같이 복잡한 처리는 constructor가 아닌 ngOnInit에서 수행해야 한다.

Constructor에서 복잡한 처리를 피해야하는 이유에 대해서는 [미스코 헤브리(Miško Hevery)의 글](http://misko.hevery.com/code-reviewers-guide/flaw-constructor-does-real-work)을 참고하기 바란다.
{: .info}

constructor가 실행되는 시점에 Angular에서 관리하는 입력 프로퍼티는 초기화되기 이전의 상태이며 참조시 undefined가 반환된다. 만일 이 시점에 입력 프로퍼티를 사용한다면 의도하지 않은 결과가 발생하기 때문에 주의해야 한다.

ngOnInit에서는 입력 프로퍼티의 참조가 보장되며 된다. 입력 프로퍼티의 초기화는 ngOnChanges에서 처음 수행되지만 ngOnChanges는 입력 프로퍼티가 변경될 때마다 반복 호출된다. 따라서 프로퍼티 초기화를 수행하기에 가장 적당한 훅 메소드는 ngOnInit이다.

## 2.3 ngDoCheck

ngOnInit 이후, 컴포넌트 또는 디렉티브의 모든 상태 변화가 발생할 때마다 호출된다. 다시 말해 변화 감지(Change detection) 로직이 실행될 때 호출된다.

[변화 감지](./angular-component-data-binding#2-%EB%B3%80%ED%99%94-%EA%B0%90%EC%A7%80change-detection)에서 살펴보았듯이 Angular는 컴포넌트 클래스의 프로퍼티 값이 변경되는 상황, 즉 DOM 이벤트, Timer 함수의 tick 이벤트, Ajax 통신 등과 같은 비동기 처리가 수행될 때, 변화 감지 로직을 실행한다. 바로 이때 호출되는 훅 메소드가 ngDoCheck이다.

ngDoCheck는 Angular의 변화 감지에 의해 감지되지 않거나 감지할 수 없는 변경 사항을 수동으로 더티 체크(dirty check)하기 위해 사용한다. 커스텀 더티 체크를 통해 사용자 변화 감지 로직을 구현하기 위해서는 Angular가 제공하는 [KeyValueDiffers](https://angular.io/api/core/KeyValueDiffers)와 [IterableDiffers](https://angular.io/api/core/IterableDiffers)를 사용한다.

하지만 ngDoCheck는 모든 상태 변화가 발생할 때마다 매번 호출되기 때문에 성능에 악영향을 줄 수 있다. 가장 바람직한 것은 Angular의 변화 감지가 상태 변화를 감지하도록 코드를 구현하는 것이지만, ngDoCheck를 사용할 수밖에 없는 상황이라면 최대한 가벼운 처리로 성능에 무리를 주지 않도록 주의하여야 한다.

ngOnChanges는 입력 프로퍼티에 바인딩된 값이 초기화 또는 변경(기본 자료형의 값이 재할당되었을 때와 객체의 참조가 변경)되었을 때만 반응하여 호출되지만, ngDoCheck는 모든 상태의 변경에 의해 호출된다. ngOnChanges와 ngDoCheck의 차이점에 대해서는 [ngOnChanges와 ngDoCheck](./angular-lifecycle#32-ngonchanges%EC%99%80-ngdocheck)에서 보다 자세히 살펴보도록 한다.

## 2.4 ngAfterContentInit

ngContent 디렉티브를 사용하여 외부 콘텐츠를 컴포넌트의 뷰에 [콘텐트 프로젝션(부모 컴포넌트가 자식 컴포넌트에게 부모 컴포넌트의 템플릿 일부를 전달하는 기능)](./angular-component-accessing-child#21-콘텐트-프로젝션content-projection)한 이후 호출된다. 첫 번째 ngDoCheck 호출 이후에 한 번만 호출되며 컴포넌트에서만 동작하는 컴포넌트 전용 훅 메소드이다.

## 2.5 ngAfterContentChecked

콘텐트 프로젝션에 의해 부모 컴포넌트가 전달한 부모 컴포넌트의 템플릿 조각을 체크한 후 호출된다. ngAfterContentInit 호출 이후, ngDoCheck가 호출된 이후에 호출되며 컴포넌트에서만 동작하는 컴포넌트 전용 훅 메소드이다.

## 2.6 ngAfterViewInit

컴포넌트의 뷰와 자식 컴포넌트의 뷰를 초기화한 이후 호출된다. 첫 번째 ngAfterContentChecked 호출 이후 한 번만 호출되며 컴포넌트에서만 동작하는 컴포넌트 전용 훅 메소드이다.

## 2.7 ngAfterViewChecked

컴포넌트의 뷰와 자식 컴포넌트의 뷰를 체크한 이후 호출된다. 첫 번째 ngAfterViewInit 호출 이후, ngAfterContentChecked 호출 이후 호출되며 컴포넌트에서만 동작하는 컴포넌트 전용 훅 메소드이다.

## 2.8 ngOnDestroy

컴포넌트와 디렉티브가 소멸하기 이전 호출된다. [RxJS](http://reactivex.io/rxjs/)의 unsubscribe 등 메모리 누수(memory leaks)를 방지 위한 코드 등을 정의한다.

# 3. 생명주기 훅 메소드 실습

예제를 통해 훅 메소드가 실제로 동작하는 것을 살펴보며 훅 메소드의 호출 시점과 용도에 대해 알아보도록 하자.

## 3.1 컴포넌트 생명주기 훅 메소드

모든 훅 메소드가 호출되도록 예제를 작성하여 보자. Angular CLI를 사용하여 프로젝트를 생성하고 부모 컴포넌트 역할을 담당할 루트 컴포넌트를 아래와 같이 작성한다. 부모 컴포넌트의 버튼에 의해 자식 컴포넌트가 생성, 소멸하도록 ngIf 디렉티브를 사용하도록 한다. 그리고 프로퍼티 바인딩에 의해 부모 컴포넌트에서 자식 컴포넌트로 상태를 전달한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="status = !status">
      {{ "{{ status ? 'Destroy Child' : 'Create Child' " }}}}
    </button>
    <app-child *ngIf="status" [prop]="prop"></app-child>
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

<iframe src="https://stackblitz.com/edit/lifecycle-hooks-exam?ctl=1&embed=1&hideNavigation=1&file=app/child.component.ts" frameborder="0" width="100%" height="600"></iframe>

가장 먼저 construnctor가 호출되었다. construnctor는 인스턴스 생성을 위해 호출되며 Angular가 관리하는 메소드가 아니다. construnctor에서 입력 프로퍼티를 참조하면 undefined가 출력되는데 이는 입력 프로퍼티의 초기화가 OnChanges에서 완성되기 때문이다. 따라서 위 예제처럼 constructor에서 입력 프로퍼티를 초기화하는 것은 무의미한 행위이며 해서도 않된다. 인스턴스 생성 이후 Angular가 부모 컴포넌트가 전달한 값으로 입력 프로퍼티를 초기화하기 때문이다.

ngOnChanges는 자식 컴포넌트에 입력 프로퍼티가 존재하기 때문에 실행되었다. 만약 자식 컴포넌트에 입력 프로퍼티가 존재하지 않으면 ngOnChanges는 호출되지 않는다.

이후 OnInit, DoCheck, ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked가 순차적으로 호출되는 것을 확인할 수 있다.

이제 생성된 자식 컴포넌트를 소멸시켜 보자. Destroy Child 버튼은 ngIf에 false를 할당하여 자식 컴포넌트를 소멸시킨다. Destroy Child 버튼을 클릭하면 ngOnDestroy가 호출되는 것을 확인할 수 있다.

## 3.2 ngOnChanges와 ngDoCheck

ngOnChanges와 ngDoCheck는 모두 상태 변화와 관계가 있다. 하지만 ngOnChanges는 입력 프로퍼티의 초기화, 입력 프로퍼티의 참조 변경 시에 호출되고 ngDoCheck는 모든 상태 변화 시점, 즉 변화 감지(Change detection) 로직이 실행될 때 호출된다.

하지만 객체의 경우, 프로퍼티의 값을 변경하여도 객체의 참조는 변경되지 않기 때문에 ngOnChanges는 이 변화에 반응하지 않는다. 즉, 기본 자료형이나 불변 객체와 같이 이뮤터블(immutable)한 값에만 반응한다. 예제를 통해 살펴보도록 하자.

부모 컴포넌트를 아래와 같이 작성한다. 부모 컴포넌트의 버튼에 의해 자식 컴포넌트가 생성, 소멸하도록 ngIf 디렉티브를 사용하도록 한다. 자식 컴포넌트가 생성된 이후 2개의 버튼이 나타나는데, 이 버튼이 변경하고 전달하는 값은 이뮤터블(immutable, 기본 자료형이나 불변 객체처럼 생성 이후 변경할 수 없는 값. 즉, 재할당 이외에는 참조 변경이 발생하지 않는 값)한 값과 뮤터블(mutable, 객체처럼 변경할 수 있는 값. 즉, 프로퍼티가 변경되어도 참조가 변경되지 않는 값)한 값이다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="status = !status">
      {{ "{{ status ? 'Destroy Child' : 'Create Child' " }}}
    </button>
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

첫 번째 "기본자료형 프로퍼티 변경" 버튼을 클릭하면 기본자료형인 string 타입의 값을 자식 컴포넌트에 전송한다. 이때 자식 컴포넌트의 입력 프로퍼티 immutable에 새로운 값이 재할당된다.

입력 프로퍼티 immutable의 타입은 기본 자료형(string)이므로 입력 프로퍼티 immutable의 값은 절대로 변경할 수 없다. 재할당 이전의 값인 문자열 "Hello"를 변경하는 것이 아니라, 새로운 문자열 "HELLO"를 메모리에 생성하고 입력 프로퍼티 immutable은 이것을 가리킨다. 즉, 재할당 시에 입력 프로퍼티 immutable이 가리키는 참조가 변경된다. 따라서 ngOnChanges가 호출된다.

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

두번째 "객체형 프로퍼티 변경" 버튼을 클릭하면 객체의 프로퍼티 값을 변경하여 자식 컴포넌트에 전송한다. 이때 객체는 뮤터블하므로 객체의 프로퍼티 값을 변경하더라도 참조가 변경되지 않는다. 따라서 **입력 프로퍼티가 변경되지 않은 것으로 간주되어 OnChanges가 호출되지 않는다.** 하지만 Angular의 변화 감지 로직은 실행되며 변화 감지 로직이 실행될 때 호출되는 ngDoCheck도 호출된다.

```
[DoCheck]
immutable: HELLO
mutable: {name: "kim"}
[ngAfterContentChecked]
[ngAfterViewChecked]
```

ngDoCheck는 모든 상태 변경에 의해 호출된다. 따라서 입력 프로퍼티뿐만 아니라 컴포넌트 프로퍼티가 변경되어도 호출된다. 예를 들어 자식 컴포넌트 템플릿에 아래의 버튼을 추가하고 클릭하면 ngDoCheck는 호출된다.

```html
<button (click)="prop='changed!'">컴포넌트 프로퍼티 변경</button>
```

<iframe src="https://stackblitz.com/edit/lifecycle-hooks-ngonchanges-ngdocheck?ctl=1&embed=1&hideNavigation=1&file=app/child.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 3.3 디렉티브 생명주기 훅 메소드

디렉티브도 컴포넌트와 동일한 생명주기와 훅 메소드를 사용한다. 다만 뷰가 없는 디렉티브의 특성상 뷰에 관련한 생명주기는 디렉티브에 존재하지 않는다. 뷰에 관련된 생명주기 AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked는 디렉티브 생명주기에 존재하지 않는 컴포넌트 전용 생명주기이다. 따라서 디렉티브 생명주기는 OnChanges, DoCheck, OnInit, OnDestory만이 존재한다.

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

