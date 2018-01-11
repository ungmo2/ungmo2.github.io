---
layout: post
title: Angular <strong>Service & Dependency Injection</strong>
subtitle: 서비스와 의존성 주입
categories: angular
section: angular
description: 컴포넌트는 화면을 구성하는 뷰(View)를 생성하고 관리하는 것이 주된 역할이다. 하지만 컴포넌트를 작성하다보면 컴포넌트 내에 컴포넌트의 주 관심사 이외의 기능(예를 들어 로깅 기능, 서버 통신 기능 등)이 필요하게 된다. 이때 컴포넌트의 주 관심사 이외의 부가적 기능을 컴포넌트 내에 작성하면 부가 기능이 변경되었을 때 컴포넌트 또한 변경되어야 한다. 이처럼 자신의 관심사에 집중하는 독립성이 보장된 코드의 작성이 어려워지면 코드가 중복되어 재사용성이 낮아지고 복잡도는 높아진다. 자신의 주요 관심사 이외의 부가적 기능은 애플리케이션 전역 관심사인 경우가 많다. 이러한 경우, 컴포넌트의 관심사와 **애플리케이션 전역 관심사를 분리**하는 것이 필요한데 이때 사용하는 것이 서비스이다. 애플리케이션 전역 관심사를 서비스로 분리하여 외부에서 관리할 수 있다면 컴포넌트는 자신의 관심사에 집중할 수 있어 복잡도가 낮아지고 서비스는 재사용이 가능하게 되어 일관된 애플리케이션 코드의 작성이 가능해 진다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 서비스(Service)란?

컴포넌트는 화면을 구성하는 뷰(View)를 생성하고 관리하는 것이 주된 역할이다. 하지만 컴포넌트를 작성하다보면 컴포넌트 내에 컴포넌트의 주 관심사 이외의 기능(예를 들어 로깅 기능, 서버 통신 기능 등)이 필요하게 된다. 이때 컴포넌트의 주 관심사 이외의 부가적 기능을 컴포넌트 내에 작성하면 부가 기능이 변경되었을 때 컴포넌트 또한 변경되어야 한다. 이처럼 자신의 관심사에 집중하는 독립성이 보장된 코드의 작성이 어려워지면 코드가 중복되어 재사용성이 낮아지고 복잡도는 높아진다.

자신의 주요 관심사 이외의 부가적 기능은 애플리케이션 전역 관심사인 경우가 많다. 이러한 경우, 컴포넌트의 관심사와 **애플리케이션 전역 관심사를 분리**하는 것이 필요한데 이때 사용하는 것이 서비스이다. 애플리케이션 전역 관심사를 서비스로 분리하여 외부에서 관리할 수 있다면 컴포넌트는 자신의 관심사에 집중할 수 있어 복잡도가 낮아지고 서비스는 재사용이 가능하게 되어 일관된 애플리케이션 코드의 작성이 가능해 진다.

예를 들어 뷰를 구성하기 위해 필요한 데이터를 서버로 부터 취득하는 행위는 컴포넌트에게 필요한 기능이지만 그 기능 자체가 컴포넌트의 주된 관심사는 아니다. 이 기능은 다른 구성 요소들에게도 필요한 공통 기능이기 때문에 애플리케이션 전역 관심사로 구분할 수 있다. 이러한 애플리케이션 공통 관심사를 서비스로 분리한다면 구성 요소마다 자신의 관심사에 집중할 수 있어서 구성 요소 마다 자신의 관심사에 집중하는 독립성이 보장된 코드의 작성이 가능하게 되어 재사용성은 높아지고 복잡도는 낮출 수 있을 것이다.

# 2. 서비스의 생성

서비스는 의존성 주입(Dependency Injection)이 가능한 클래스로 작성한다. 의존성 주입에 대해서는 나중에 알아보기로 하고 우선 인사말을 생성하는 간단한 서비스를 작성하여 보자.

```typescript
// greeting.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class GreetingService {
  sayHi() { return 'Hi!'; }
}
```

Angular CLI를 통해 서비스를 생성(`ng generate service greeting`)하면 @Injectable 데코레이터가 추가된 클래스가 생성된다. @Injectable 데코레이터는 자신의 아래에 정의된 클래스가 주입 가능한(Injectable) 클래스임을 나타낸다. 이제 이 서비스를 컴포넌트에서 사용해보자.

```typescript
// app.component.ts
import { Component } from '@angular/core';
// 컴포넌트에서 사용할 서비스를 임포트
import { GreetingService } from './greeting.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="sayHi()">Say Hi</button>
    <p>{{ "{{ greeting " }}}}</p>
  `
})
export class AppComponent {
  greeting: string;
  // 서비스의 인스턴스를 담을 프로퍼티
  greetingService: GreetingService;

  constructor() {
    // 서비스의 인스턴스의 명시적 생성
    this.greetingService = new GreetingService();
  }

  sayHi() {
    // 서비스의 사용
    this.greeting = this.greetingService.sayHi();
  }
}
```

버튼 클릭 이벤트 핸들러인 sayHi가 호출되면 GreetingService의 메소드 sayHi를 호출하여 인사말을 생성한다. 이때 컴포넌트는 GreetingService의 인스턴스가 필요하다. 따라서 컴포넌트 생성자 함수 내에서 GreetingService의 인스턴스를 명시적으로 생성하였다.

```typescript
constructor() {
  // 서비스의 인스턴스의 명시적 생성
  this.greetingService = new GreetingService();
}
```

이때 컴포넌트는 GreetingService와 **의존 관계(Dependency relationship)**에 있다. 즉 컴포넌트는 GreetingService에 의존하고 있으며 이때 컴포넌트의 관점에서 GreetingService를 **의존성(Dependency)**라 한다.

예를 들어 A가 B에 의존하는 의존 관계에 있을 때, B의 기능이 추가되거나 변경되면 A는 영향을 받는다. 즉 A가 B의 메소드를 사용한다면 B의 메소드 형식이 변경되었을 때 A도 수정되어야 한다.

![dependency](/img/dependency.png)

의존 관계(Dependency relationship)
{: .desc-img}

위 예제에서 컴포넌트는 GreetingService에 의존하고 있으므로 GreetingService의 인스턴스가 필요하고 컴포넌트가 GreetingService 의 인스턴스를 직접 생성하기 때문에 GreetingService 인스턴스의 생성 방법을 알고 있어야 한다.

예를 들어 인스턴스의 생성은 new 키워드를 사용할 수도 있고, 싱글턴 패턴의 경우 getInstance() 함수를 호출할 수도 있으며, createGreetingService()와 같은 팩토리 함수를 사용할 수도 있을 것이다.

이처럼 의존성을 생성하는 코드와 사용하는 코드가 컴포넌트 내에 같이 존재한다면 이는 컴포넌트와 의존성이 **긴밀히 결합(Tight Coupling)**되어 있다고 할 수 있다. 만약에 이 컴포넌트가 GreetingService가 아닌 다른 서비스를 사용하여 인사말을 생성하도록 변경된다면 컴포넌트는 수정되어야 한다.

```typescript
...
export class AppComponent {
  greeting: string;
  greetingService: AnotherGreetingService;

  constructor() {
    // 의존관계의 서비스가 변경되면 코드를 수정해야 한다..
    this.greetingService = new AnotherGreetingService();
  }

  sayHi() {
    this.greeting = this.greetingService.sayHi();
  }
}
```

컴포넌트와 의존성의 의존 관계를 긴밀한 결합(Tight Coupling)에서 느슨한 결합(Loose Coupling)으로 전환하기 위해 Angular는 **의존성 주입(Dependency Injection)**을 지원한다.

의존성 주입은 애플리케이션이 직접 인스턴스를 생성하는 것이 아니라 Angular 프레임워크가 생성한 인스턴스를 사용하는 방식이다.

의존성 주입을 사용하여 컴포넌트가 직접 인스턴스를 생성하지 않고 Angular가 인스턴스 생성의 주체가 되도록 위 코드를 수정해 보자.

# 3. 의존성 주입(Dependency Injection)

의존성 주입(Dependency Injection, DI)은 구성 요소 간의 의존 관계를 코드 내부가 아닌 외부의 설정파일 등을 통해 정의하는 디자인 패턴 중의 하나로서 구성 요소 간 결합도를 낮추고 재사용성을 높인다.

아래의 코드를 살펴보자.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { GreetingService } from './greeting.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="sayHi()">Say Hi</button>
    <p>{{ "{{ greeting " }}}}</p>
  `,
  providers: [GreetingService]
})
export class AppComponent {
  greeting: string;

  constructor(private greetingService: GreetingService) {}

  sayHi() {
    this.greeting = this.greetingService.sayHi();
  }
}
```

의존성 주입을 사용하기 이전에는 컴포넌트가 직접 GreetingService의 인스턴스를 생성하였지만 위 코드를 보면 GreetingService의 인스턴스를 컴포넌트가 직접 생성하지 않았다.

이는 컴포넌트가 직접 의존관계 객체의 인스턴스를 생성하는 것이 아니라 Angular가 인스턴스를 생성하고 컴포넌트에 전달하는 방식이다. 컴포넌트는 필요한 의존관계 객체를 요구하고, 프레임워크는 제어권(Control)을 갖는 주체로 동작하여 요구된 의존관계 객체의 인스턴스를 직접 생성하여 전달한다. 이를 **제어권의 역전(Inversion of Control, IoC)**이라 한다.

컴포넌트는 더 이상 의존 관계 객체의 인스턴스 생성에 대해 관여하지 않아도 된다. Angular는 설정 정보에 의해 인스턴스를 생성하여 컴포넌트에게 전달(주입, Inject)해 줄 것이다. 이를 **의존성 주입(Dependency Injection)**이라 한다.

다만 필요한 의존 관계 객체의 인스턴스를 어떻게 생성하는지 Angular는 알지 못하므로 이 정보를 Angular에 알려주어야 한다. @Component 어노테이션(Annotation)의 **providers 프로퍼티는 의존성으로 주입될 객체의 인스턴스를 어떻게 생성하는지 Angular에 설명한다.**

providers: [GreetingService]는 아래 코드의 축약 표현으로 GreetingService 클래스에 의해 생성된 GreetingService 타입의 인스턴스가 컴포넌트에 주입될 것을 의미한다.

```typescript
providers: [{
  // 의존성으로 주입될 객체의 타입(토큰, Token)
  provide: GreetingService,
  // 의존성으로 주입될 객체의 인스턴스를 생성할 클래스
  useClass: GreetingService
}]
```

이와 같은 방법으로 Angular는 주입할 의존 관계 객체의 생성 방법을 알게 되고 **인젝터(Injector)**는 providers 프로퍼티의 설정 정보대로 동작하여 의존 관계 객체의 인스턴스를 생성하고 주입한다. 이제 컴포넌트는 의존 관계 객체의 생성 방법을 알 필요가 없고 인젝터가 생성하여 생성자의 인자로 주입한 인스턴스를 사용하기만 하면 된다.

```typescript
// 의존성 주입
constructor(private greetingService: GreetingService) {}
```

greetingService는 GreetingService 타입 인스턴스를 가리키는 멤버 변수이고 컴포넌트의 메소드에서 this에 의해 참조 가능하게 되었다.

```typescript
sayHi() {
  // 주입된 객체의 사용
  this.greeting = this.greetingService.sayHi();
}
```

<iframe src="https://stackblitz.com/edit/service-di?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

# 4. 인젝터(Injector)

컴포넌트가 생성될 때, Angular는 컴포넌트에 필요한 인스턴스를 인젝터에 요청한다. 인젝터는 이전에 이미 생성한 인스턴스를 담고 있는 컨테이너를 관리하고 있는데 요청된 인스턴스가 컨테이너에 존재하지 않으면 인스턴스를 생성하고 컨테이너에 추가한다. 그리고 요청된 인스턴스를 컴포넌트 생성자의 인자로 주입한다.

![Injector](/img/injector.png)

인젝터(Injector)
{: .desc-img}

# 5. 인젝터 트리(Injector tree)

컴포넌트는 트리 구조로 구성된다. 컴포넌트는 각각 하나의 인젝터를 가지고 있기 때문에 컴포넌트의 트리 구조와 동일한 인젝터 트리가 만들어진다.

컴포넌트의 주입 요청이 있을 때 인젝터는 현재 컴포넌트에서 등록한 프로바이더에서 주입 대상을 검색한다. 이때 해당 컴포넌트의 프로바이더에서 주입 대상을 찾을 수 없으면 상위 컴포넌트의 프로바이더에서 주입 대상을 검색한다. 상위 컴포넌트의 프로바이더를 검색하여 주입 대상을 찾으면 해당 인젝터는 인스턴스를 생성하며 **상위 인젝터가 생성한 인스턴스는 하위 컴포넌트에서 사용할 수 있다.**

따라서 인젝터 트리의 최상위 인젝터 즉 루트 인젝터에서 생성한 인스턴스는 전역에서 사용 가능한 전역 서비스로 사용할 수 있다.

# 6. 프로바이더(Provider)

인젝터가 인스턴스를 생성할 때 인스턴스를 어떻게 생성하는지 인스턴스 생성 정보를 Angular에 알려주어야 한다. 이 인스턴스 생성 정보는 providers 프로퍼티에 등록한다. **providers 프로퍼티는 모듈의 @NgModule 또는 컴포넌트의 @Component 어노테이션에 등록한다.**

```typescript
// @NgModule 프로바이더
@NgModule({
  ...
  providers: [GreetingService],
})

// @Component 프로바이더
@Component({
  ...
  providers: [GreetingService]
})
```

@NgModule 어노테이션에 등록한 서비스는 모듈 전체(루트 모듈인 경우, 애플리케이션 전역)에 반영되고 @Component 어노테이션에 등록한 서비스는 해당 컴포넌트와 자식 컴포넌트에 반영된다. **모듈 레벨에 등록한 서비스는 하나의 인스턴스를 공유하지만 컴포넌트 레벨로 등록한 서비스는 컴포넌트가 생성될 때마다 새로운 인스턴스를 취득한다.**

프로바이더는 사용 방법에 따라 3가지 종류로 구분할 수 있다.

## 6.1 클래스 프로바이더(Class Provideer)

클래스 프로바이더는 클래스의 인스턴스를 의존성 주입하기 위한 설정을 등록한다. providers 프로퍼티는 아래와 같이 객체의 배열을 값으로 갖는다.

```typescript
@Component({
  ...
  // 주입할 인스턴스의 클래스 리스트
  providers: [GreetingService]
})
```

이것은 실제로 두개의 프로퍼티를 가진 객체 리터럴을 사용하여 프로바이더를 등록하는 것을 축약 표현(shorhand)한 것으로 아래와 동일한 표현이다.

```typescript
@Component({
  ...
  providers: [{
    provide: GreetingService,
    useClass: GreetingService
  }]
})
```

첫번째 provide 프로퍼티는 인젝터가 의존성을 찾거나 등록할 때 키 역할을 하는 토큰(token)이며 주로 클래스의 타입이 사용된다.

두번째 useClass 프로퍼티는 의존성 인스턴스를 생성하는 클래스(provider definition object)를 의미한다. 인젝터는 인스턴스를 생성할 때 이 클래스를 사용한다.

위 코드는 GreetingService 클래스에 의해 생성된 GreetingService 타입의 인스턴스가 컴포넌트에 주입될 것을 의미한다.

컴포넌트가 GreetingService 클래스가 아닌 다른 **대체 클래스**를 사용하는 경우를 살펴보자.

GreetingService 서비스는 아래와 같다.

```typescript
// greeting.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class GreetingService {
  sayHi() { return 'Hi!'; }
}
```

GreetingService 서비스를 대체할 AnotherGreetingService 서비스는 아래와 같다.

```typescript
// another-greeting.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class AnotherGreetingService {
  sayHi() { return 'Hello!'; }
}
```

GreetingService 서비스를 대체할 AnotherGreetingService 서비스를 주입하도록 프로바이더를 변경하는 것으로 간단히 다른 서비스를 사용할 수 있다.

```typescript
providers: [{
  // 의존성으로 주입될 객체의 타입(토큰, Token)
  provide: GreetingService,
  // 의존성으로 주입될 객체의 인스턴스를 생성할 클래스
  useClass: AnotherGreetingService
}]
```

이때 대체 클래스는 토큰과 타입이 일치하여야 한다. 아래의 두 클래스는 비록 같은 인터페이스를 구현하지는 않았지만 같은 메소드를 가지고 있기 때문에 [덕 타이핑(duck typing)](./typescript-interface#2-덕-타이핑-duck-typing)에 의해 같은 타입으로 인정된다.

GreetingService의 인스턴스를 사용하던 컴포넌트가 AnotherGreetingService의 인스턴스를 사용하도록 변경되었지만 컴포넌트 클래스는 어떠한 수정없이도 문제없이 동작할 것이다. 이와 같이 의존성 주입을 사용하면 재사용성이 향상되고 긴밀히 결합된 의존 관계를 느슨한 결합으로 분리할 수 있다.

서비스를 사용하는 컴포넌트는 아래와 같다.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { GreetingService } from './greeting.service';
import { AnotherGreetingService } from './another-greeting.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="sayHi()">Say Hi</button>
    <p>{{ "{{ greeting " }}}}</p>
  `,
  providers: [{
    // 의존성으로 주입될 객체의 타입(토큰, Token)
    provide: GreetingService,
    // 의존성으로 주입될 객체의 인스턴스를 생성할 클래스
    useClass: AnotherGreetingService
  }]
})
export class AppComponent {
  greeting: string;

  constructor(private greetingService: GreetingService) {
    console.log(greetingService instanceof AnotherGreetingService); // true
  }

  sayHi() {
    this.greeting = this.greetingService.sayHi();
  }
}
```

위 코드는 잘 동작한다. 그런데 프로바이더를 컴포넌트 레벨로 등록하였기 때문에 GreetingService 타입의 AnotherGreetingService는 컴포넌트 레벨로 생성된다. 만약 모듈에 AnotherGreetingService를 등록하면 새로운 AnotherGreetingService 인스턴스를 생성하여 2개의 인스턴스가 존재하게 된다.

모듈에 AnotherGreetingService를 등록하여 보자.

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AnotherGreetingService } from './another-greeting.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [AnotherGreetingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

이러한 경우, 동일한 기능을 하는 AnotherGreetingService의 인스턴스가 2개 생성되는 것은 바람직하지 않다. AnotherGreetingService의 인스턴스를 싱글턴으로 생성하도록 프로바이더를 수정하여 보자.

```typescript
// app.component.ts
...
  providers: [{
    provide: GreetingService,
    // 인스턴스가 존재하면 새로 인스턴스를 생성하지 않고 기존의 인스턴스를 사용
    useExisting: AnotherGreetingService
  }]
...
```

useExisting 프로퍼티에 지정한 클래스의 인스턴스가 존재하면 새로 인스턴스를 생성하지 않고 기존의 인스턴스를 사용한다. 싱글턴이 제대로 동작하는지 확인하는 코드를 만들어보자. 컴포넌트를 아래와 같이 수정한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

import { GreetingService } from './greeting.service';
import { AnotherGreetingService } from './another-greeting.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="sayHi()">Say Hi</button>
    <p>{{ "{{ greeting " }}}}</p>
  `,
  providers: [{
    provide: GreetingService,
    // 인스턴스가 존재하면 새로 인스턴스를 생성하지 않고 기존의 인스턴스를 사용
    useExisting: AnotherGreetingService
  }]
})
export class AppComponent {
  greeting: string;

  constructor(
    public greetingService: GreetingService,
    public anotherGreetingService: AnotherGreetingService) {
    // 모듈의 프로바이더에 등록한 AnotherGreetingService의 인스턴스가 컴포넌트 레벨로 새롭게 생성되지 않았다.
    console.log(greetingService ===  anotherGreetingService); // true
  }

  sayHi() {
    this.greeting = this.greetingService.sayHi();
  }
}
```

<iframe src="https://stackblitz.com/edit/service-class-provider?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 6.2 값 프로바이더(Value Provider)

값 프로바이더는 고정 값을 의존성 주입하기 위한 설정을 등록한다. 아래의 예제를 살펴보자. 주입될 클래스에 고정 값을 공급하고 있다.

```typescript
// app.config.ts
export class AppConfig {
  url: string;
  port: string;
}

// 공급 대상 고정 값
export const MY_APP_CONFIG: AppConfig = {
  url: 'http://somewhere.io/api',
  port: '5000'
};
```

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { AppConfig, MY_APP_CONFIG } from './app.config';

@Component({
  selector: 'app-root',
  template: '{{ "{{ appConfig | json " }}}}',
  providers: [
    // MY_APP_CONFIG를 사용하여 AppConfig의 인스턴스를 생성
    { provide: AppConfig, useValue: MY_APP_CONFIG }
  ]
})
export class AppComponent {
  constructor(public appConfig: AppConfig) {
    console.log(appConfig);
    // {url: "http://somewhere.io/api", port: "5000"}
  }
}
```

<iframe src="https://stackblitz.com/edit/service-value-provider-1?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

주입된 AppConfig의 인스턴스는 값 프로바이더 useValue 프로퍼티의 MY\_APP_CONFIG의 값으로 초기화되었다.

주입될 의존성은 클래스가 아닌 문자열, 함수, 객체일 수도 있다. 아래의 코드는 문자열 의존성을 주입하는 경우이다. 애플리케이션 공통 상수가 있다면 아래와 같이 선언할 수 있다.

```typescript
// app.compoenet.ts
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '{{ "{{ myConfig " }}}}',
  providers: [
    { provide: 'myConfig', useValue: 'Hello World' }
  ]
})
export class AppComponent {
  constructor(@Inject('myConfig') public myConfig: string) {
    console.log(myConfig); // Hello World
  }
}
```

<iframe src="https://stackblitz.com/edit/service-value-provider-2?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

@Inject 데코레이터에는 주입할 대상의 토큰을 설정한다. 일반적으로 주입 대상의 타입이 클래스인 경우, Angular에 의해 자동으로 설정되기 때문에 @Inject 데코레이터를 사용하지 않아도 된다. 하지만 **클래스 이외의 토큰의 경우, 명시적으로 @Inject 데코레이터를 선언하여야 한다.**

하지만 문자열을 토큰으로 사용하는 것은 토큰이 중복될 수 있어서 위험한 방법이다. 만약 외부 라이브러리에서 사용하는 토큰과 중복된다면 인젝터는 마지막에 선언된 프로바이더를 사용하여 인스턴스를 선택하고 주입할 것이다. 이러한 경우를 위하여 **InjectionToken**을 제공한다.

## 6.3 팩토리 프로바이더(Factory Provider)

의존성을 생성할 때 어떠한 로직을 거쳐야 한다면 팩토리 함수를 사용한다. 예를 들어 조건을 인자로 받아 의존성을 생성하거나 여러 의존성 중에 어떤 것을 생성할 지 결정해야 하는 경우, 팩토리 함수를 사용한다.

개발 모드(isDev가 true)인 경우, MockUserService를 생성하고 그외의 경우 UserService를 생성하는 예제를 작성해 보자.

```typescript
// user.ts
export class User {
  constructor(public id: string, public password: string) {}
}
```

```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {
  getUser(): User { return new User('real user', '123'); }
}
```

```typescript
// mock-user.service.ts
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class MockUserService {
  getUser(): User { return new User('mock user', 'abc'); }
}
```

```typescript
// user.service.provider.ts
import { MockUserService } from './mock-user.service';
import { UserService } from './user.service';

// 팩토리 함수
const userServiceFactory = (isDev: boolean) => {
  console.log(isDev);
  return isDev ? new MockUserService() : new UserService();
};

// 프로바이더
export const UserServiceProvider = {
  // 최종적으로 생성될 인스턴스의 타입
  provide: UserService,
  // 인스턴스 생성을 담당할 팩토리 함수
  useFactory: userServiceFactory,
  // 인스턴스 생성에 필요한 의존성 토큰
  deps: ['isDev']
};
```

프로바이더의 useFactory 프로퍼티에는 인스턴스 생성을 담당할 팩토리 함수를 등록한다. 이 팩토리 함수 userServiceFactory는 토큰 isDev의 값을 인수로 받는다. isDev는 컴포넌트의 프로바이더에 등록되어 있다. 팩토리 함수는 토큰 isDev의 값에 의존하고 있으며 이 값은 의존성의 토큰을 등록하는 deps 프로퍼티에 설정한다.

팩토리 프로바이더에 의해 주입될 UserService를 사용하는 컴포넌트는 아래와 같다.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { UserServiceProvider } from './user.service.provider';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  template: '{{ "{{ userService.getUser() | json " }}}}',
  providers: [
    { provide: 'isDev', useValue: true },
    UserServiceProvider
  ]
})
export class AppComponent {
  constructor(public userService: UserService) {
    console.log(userService.getUser());
    // {id: "mock user", password: "abc"}
  }
}
```

<iframe src="https://stackblitz.com/edit/service-factory-provider?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 6.4 인젝션 토큰(Injection Token)

지금까지 살펴본 예제는 문자열을 애플리케이션 공통 상수로 사용하는 경우를 제외하고 토큰으로 클래스를 사용하였다. 인젝션 토큰은 클래스가 아닌 의존성(non-class dependency), 예를 들어 객체, 문자열, 함수 등을 위한 토큰을 주입받기 위해 사용한다.

예를 들어 객체 리터럴로 작성된 애플리케이션 설정 정보를 주입받기 위해 프로바이더를 등록하여 보자.

```typescript
// app.config.ts
export interface AppConfig {
  url: string;
  port: string;
}

export const MY_APP_CONFIG: AppConfig = {
  url: 'http://somewhere.io/api',
  port: '5000'
};
```

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { AppConfig, MY_APP_CONFIG } from './app.config';

@Component({
  selector: 'app-root',
  template: '{{ "{{ appConfig | json " }}}}',
  providers: [
    { provide: AppConfig, useValue: MY_APP_CONFIG }
  ]
})
export class AppComponent {
  constructor(public appConfig: AppConfig) {
    console.log(appConfig);
  }
}
```

위와 같이 인터페이스를 토큰으로 등록하면 에러가 발생한다. 이는 타입스크립트는 자바스크립트로 트랜스파일링될 때, 자바스크립트는 인터페이스를 지원하지 않으므로 인터페이스가 사라지게 된다. 따라서 Angular가 런타임에 찾을 수 있는 인터페이스 타입 정보가 없기 때문에 인터페이스를 토큰으로 등록하면 에러가 발생한다.

이러한 경우 사용하는 것이 인젝션 토큰(Injection Token)이다. 사용 방법은 아래와 같다.

```typescript
// app.config.ts
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  url: string;
  port: string;
}

export const MY_APP_CONFIG: AppConfig = {
  url: 'http://somewhere.io/api',
  port: '5000'
};

// AppConfig 타입의 InjectionToken
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// Providers
export const AppConfigProvider = {
  provide: APP_CONFIG,
  useValue: MY_APP_CONFIG
};
```

InjectionToken 클래스를 사용하여 인터페이스 AppConfig 타입의 인젝션 토큰 APP\_CONFIG를 생성하였다. InjectionToken 클래스의 생성자 인수는 개발자를 위한 설명(description) 문자열이다. InjectionToken 클래스는 클래스가 아닌 의존성(non-class dependency), 예를 들어 객체, 문자열, 함수 등을 위한 토큰을 생성한다. InjectionToken 클래스로 생성한 인젝션 토큰 APP\_CONFIG를 인터페이스 대신 provide 프로퍼티에 등록한다.

```typescript
// app.component.ts
import { Component, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG, AppConfigProvider } from './app.config';

@Component({
  selector: 'app-root',
  template: '{{ "{{ appConfig | json " }}}}',
  providers: [ AppConfigProvider ]
})
export class AppComponent {

  constructor(@Inject(APP_CONFIG) public appConfig: AppConfig) {
    console.log(appConfig);
    // {url: "http://somewhere.io/api", port: "5000"}
  }
}
```

<iframe src="https://stackblitz.com/edit/injection-token?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

@Inject 데코레이터에는 주입할 대상의 토큰을 설정한다. 일반적으로 주입 대상의 타입이 클래스인 경우, Angular에 의해 자동으로 설정되기 때문에 @Inject 데코레이터를 사용하지 않아도 된다. 하지만 클래스 이외의 토큰의 경우, 명시적으로 @Inject 데코레이터를 선언하여야 한다.

## 6.5 선택적 의존성 주입(Optional Dependency)

프로바이더 등록을 하지 않으면 의존성 주입은 실패하고 애플리케이션은 중단된다. @Optional 데코레이터를 사용하면 의존성 주입이 필수가 아닌 선택 사항임을 Angular에 알린다. 즉 주입받을 의존성이 없더라도 에러로 인해 애플리케이션이 중단되지 않는다. 사용 방법은 아래와 같다.

```typescript
// app.component.ts
import { Component, Optional } from '@angular/core';
import { GreetingService } from './greeting.service';

@Component({
  selector: 'app-root',
  template: '{{ "{{ greeting " }}}}'
})
export class AppComponent {
  greeting: string;

  constructor(@Optional() public greetingService: GreetingService) {
    if (this.greetingService) {
      console.log(this.greetingService.sayHi());
      this.greeting = this.greetingService.sayHi();
    } else {
      console.log('Hi...');
      this.greeting = 'Hi...';
    }
  }
}
```

<iframe src="https://stackblitz.com/edit/optional-dependency?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

모듈 또는 컴포넌트의 프로바이더에 GreetingService가 등록되어 있다면 컴포넌트 레벨에서 GreetingService 인스턴스를 주입받을 수 있으므로 GreetingService의 sayHi 메소드를 사용할 수 있을 것이다. 하지만 프로바이더에 GreetingService가 등록되어 있지 않다면 GreetingService는 주입되지 않는다, 그러나 @Optional 데코레이터를 사용하였으므로 에러는 발생하지 않는다.

# 7. 서비스 중재자 패턴(Service Mediator Pattern)

컴포넌트는 독립적인 존재이지만 다른 컴포넌트와 결합도를 낮게 유지하면서 상태 정보를 교환할 수 있어야 한다. @Input, @Output 데코레이터를 사용하여 컴포넌트 간에 상태를 공유할 수 있지만 원거리 컴포넌트 간의 상태 공유를 위해서 상태 공유가 필요없는 컴포넌트를 경유해야 하고 일관된 자료 구조가 존재하지 않기 때문에 개별적인 프로퍼티만을 교환할 수 밖에 없는 한계가 있다. 이러한 경우, 컴포넌트 간 데이터 중개자로 서비스를 사용하면 일정한 형식의 자료 구조를 사용하면서 컴포넌트 간의 상태 공유가 가능하다.

서비스를 사용하여 2개의 형제 컴포넌트 간 상태를 공유하는 예제를 작성하여보자. 우선 서비스를 작성한다.

```typescript
// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  status: string;
}
```

SharedService는 status 프로퍼티를 갖는 클래스이다. 이 SharedService를 형제 컴포넌트에 모두 의존성 주입하여 상태를 공유하는 중개자의 역할을 담당하게 할 것이다.

다음은 2개의 형제 컴포넌트의 부모 컴포넌트를 작성한다. 이 부모 컴포넌트에 SharedService의 프로바이더를 등록할 것이다. 따라서 2개의 형제 컴포넌트는 별도의 프로바이더 등록없이 SharedService를 주입받을 수 있다.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  template: `
    <app-sibling1></app-sibling1>
    <app-sibling2></app-sibling2>
  `,
  providers: [SharedService]
})
export class AppComponent {}
```

이제 2개의 형제 컴포넌트를 작성한다. 형제 컴포넌트인 Sibling1Component에서 상태를 입력받으면 이 값을 데이터 중개 서비스에 등록한다. 이때 형제 컴포넌트 Sibling2Component는 Sibling1Component과 동일한 서비스를 참조하므로 상태를 공유할 수 있다.

```typescript
// sibling1.component.ts
import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-sibling1',
  template: `
    <p>
      Child-1: <input type="text" (input)="shared.status=$event.target.value">
    </p>
  `
})
export class Sibling1Component {
  constructor(private shared: SharedService) {}
}
```

```typescript
// sibling2.component.ts
import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-sibling2',
  template: `
    <p>Child-2: {{ "{{ shared.status " }}}}</p>
  `
})
export class Sibling2Component {
  constructor(private shared: SharedService) {}
}
```

Sibling1Component에서 입력받은 상태가 SharedService를 경유하여 Sibling2Component로 공유되었다.

<iframe src="https://stackblitz.com/edit/shared-todo-service?embed=1&file=app/shared-todo.service.ts" frameborder="0" width="100%" height="600"></iframe>

# Reference

* [The Dependency Injection pattern](https://angular.io/guide/dependency-injection-pattern)

* [Angular Dependency Injection](https://angular.io/guide/dependency-injection)

* [Hierarchical Dependency Injectors](https://angular.io/guide/hierarchical-dependency-injection)

* [Dependency Injection](https://angular.io/guide/dependency-injection-in-action)
