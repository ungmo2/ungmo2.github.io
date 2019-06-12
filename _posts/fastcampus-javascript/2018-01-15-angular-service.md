---
layout: post
title: Angular <strong>Service & Dependency Injection</strong>
subtitle: 서비스와 의존성 주입
categories: fastcampus-angular
section: fastcampus-angular
seq: 15
description: 컴포넌트는 화면을 구성하는 뷰(View)를 생성하고 관리하는 것이 주된 역할이다. 하지만 컴포넌트를 작성하다보면 컴포넌트 내에 컴포넌트의 주 관심사 이외의 기능(예를 들어 로깅 기능, 서버 통신 기능 등)이 필요하게 된다. 이때 컴포넌트의 주 관심사 이외의 부가적 기능을 컴포넌트 내에 작성하면 부가 기능이 변경되었을 때 컴포넌트 또한 변경되어야 한다. 이처럼 자신의 관심사에 집중하는 독립성이 보장된 코드의 작성이 어려워지면 코드가 중복되어 재사용성이 낮아지고 복잡도는 높아진다. 자신의 주요 관심사 이외의 부가적 기능은 애플리케이션 전역 관심사인 경우가 많다. 이러한 경우, 컴포넌트의 관심사와 **애플리케이션 전역 관심사를 분리**하는 것이 필요한데 이때 사용하는 것이 서비스이다. 애플리케이션 전역 관심사를 서비스로 분리하여 외부에서 관리할 수 있다면 컴포넌트는 자신의 관심사에 집중할 수 있어 복잡도가 낮아지고 서비스는 재사용이 가능하게 되어 일관된 애플리케이션 코드의 작성이 가능해 진다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 서비스(Service)란?

컴포넌트는 화면을 구성하는 뷰(View)를 생성하고 관리하는 것이 주된 역할이다. 하지만 컴포넌트를 작성하다 보면 컴포넌트 내에 컴포넌트의 주 관심사 이외의 부가적인 기능(예를 들어 로깅 기능, 서버 통신 기능 등)이 필요하게 된다. 이때 컴포넌트의 주 관심사 이외의 부가적 기능을 컴포넌트 내에 작성하면 부가적 기능이 변경되었을 때 컴포넌트 또한 변경되어야 하며 재사용이 어려워진다. 이처럼 자신의 관심사에 집중하는 독립성이 보장된 코드의 작성이 어려워지면 코드가 중복되어 재사용성이 낮아지고 복잡도는 높아진다.

자신의 주요 관심사 이외의 부가적인 기능은 애플리케이션 전역의 관심사인 경우가 많다. 이러한 경우, 컴포넌트의 관심사와 **애플리케이션 전역의 관심사를 분리**하는 것이 필요한데 이때 사용하는 것이 서비스이다. 애플리케이션 전역의 관심사를 서비스로 분리하여 외부에서 관리할 수 있다면 컴포넌트는 자신의 관심사에 집중할 수 있어 복잡도가 낮아지고 서비스는 재사용이 가능하게 되어 일관된 애플리케이션 코드를 작성할 수 있다.

예를 들어, 뷰를 구성하기 위해 필요한 데이터를 서버로부터 취득하는 행위는 컴포넌트에 필요한 기능이지만, 그 기능 자체가 컴포넌트의 주된 관심사는 아니다. 이 기능은 다른 구성 요소들에도 필요한 공통 기능이기 때문에 애플리케이션 전역의 관심사로 구분할 수 있다. 이러한 애플리케이션 공통 관심사를 서비스로 분리하면 구성 요소마다 자신의 관심사에 집중할 수 있어서 구성 요소마다 자신의 관심사에 집중하는 독립성이 보장된 코드를 작성할 수 있게 된다. 즉, 재사용성은 높아지고 복잡도는 낮출 수 있다.

# 2. 의존성 주입(Dependency Injection)

인사말을 생성하는 간단한 서비스를 작성하여 보자. Angular CLI를 사용하여 프로젝트를 생성하고 서비스를 추가한다.

```bash
$ ng new dependency-injection -t -s -S
$ cd dependency-injection
$ ng generate service greeting
```

Angular CLI를 통해 서비스를 생성하면 아래와 같이 @Injectable 데코레이터가 추가된 클래스가 생성된다.

```typescript
// greeting.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {
  constructor() { }
}
```

서비스는 의존성 주입(Dependency Injection)이 가능한 클래스이다. @Injectable 데코레이터는 자신의 아래에 정의된 클래스가 **의존성 주입**이 가능한(injectable) 클래스임을 나타낸다.

@Injectable 메타데이터 객체의 `providedIn` 프로퍼티는 Angular 6에서 새롭게 도입된 것으로 프로퍼티 값으로 'root'를 설정하면 루트 인젝터에게 서비스를 제공하도록 지시하여 애플리케이션의 모든 구성요소에 싱글턴 전역 서비스를 주입할 수 있도록 한다. 상세한 내용은 지금부터 천천히 살펴보기로 하자.
{: .info}

의존성 주입을 알아보기 위해 생성된 서비스에서 @Injectable의 메타데이터 객체를 삭제하고 인사말을 반환하는 sayHi 메소드를 추가한다.

```typescript
// greeting.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class GreetingService {
  sayHi() { return 'Hi!'; }
}
```

GreetingService의 sayHi 메소드는 애플리케이션 전역에서 사용하는 공통 기능이라고 가정하자. GreetingService의 sayHi 메소드를 컴포넌트에서 사용해보자. 컴포넌트를 아래와 같이 수정한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';
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
  greetingService: GreetingService;

  constructor() {
    // 서비스의 인스턴스를 직접 생성한다.
    this.greetingService = new GreetingService();
  }

  sayHi() {
    // 서비스의 사용
    this.greeting = this.greetingService.sayHi();
  }
}
```

<iframe src="https://stackblitz.com/edit/dependency-injection-1?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

버튼 클릭 이벤트 핸들러인 sayHi가 호출되면 GreetingService의 메소드 sayHi를 호출하여 인사말을 생성한다. 이때 컴포넌트는 GreetingService의 인스턴스가 필요하므로 컴포넌트의 constructor 내에서 GreetingService의 인스턴스를 생성하였다.

```typescript
constructor() {
  // 서비스의 인스턴스를 직접 생성한다.
  this.greetingService = new GreetingService();
}
```

이때 컴포넌트는 GreetingService와 **의존 관계(Dependency relationship)**에 있다. 즉, 컴포넌트는 자신의 역할을 수행하기 위해 GreetingService가 반드시 필요하다. 이를 '컴포넌트는 GreetingService에 의존하고 있다'라고 말하며, 컴포넌트 관점에서 GreetingService를 **의존성(Dependency)**이라 한다.

위 예제에서 컴포넌트는 GreetingService에 의존하고 있으므로 GreetingService의 인스턴스가 필요하다. 그런데 컴포넌트가 GreetingService의 인스턴스를 constructor에서 직접 생성하기 때문에 컴포넌트는 GreetingService 인스턴스의 생성 방법을 알고 있어야 한다. 그리고 이 컴포넌트와 의존 관계에 있는 GreetingService가 변경되면 컴포넌트는 수정되어야 한다.

```typescript
...
export class AppComponent {
  greeting: string;
  greetingService: AnotherGreetingService;

  constructor() {
    // 의존 관계의 서비스가 변경되면 코드를 수정해야 한다.
    this.greetingService = new AnotherGreetingService();
  }

  sayHi() {
    this.greeting = this.greetingService.sayHi();
  }
}
```

이처럼 의존성의 인스턴스를 생성하는 코드와 사용하는 코드가 컴포넌트 내에 같이 존재한다면 이는 컴포넌트와 의존성이 **긴밀한 결합(Tight Coupling)**을 하고 있다고 할 수 있다. 긴밀한 결합을 **느슨한 결합(Loose Coupling)**으로 의존 관계를 갖게하려면 의존성 인스턴스를 사용하는 코드는 인스턴스 생성에 관여하지 않고 단지 필요한 인스턴스를 요구하기만 하고 외부 환경에서 요구된 인스턴스를 생성하여 전달하면 될 것이다.

그렇게 한다면 의존성 인스턴스를 사용하는 코드는 인스턴스를 생성하는 방법을 알 필요가 없어지고 의존성이 변경된다 하더라도 인스턴스를 전달하는 외부 환경이 변경된 의존성의 인스턴스를 전달하기만 한다면 코드의 수정없이 변경된 의존성 인스턴스를 사용할 수 있을 것이다. 이것은 의존 관계에 있는 두 개의 객체가 서로 상호 작용을 하기는 하지만 서로에 대해 잘 알지 못한다는 것을 의미하며 서로에게 주는 영향을 최소화하여 변경에 유연하게 대처할 수 있는 가능성을 확보할 수 있다. 아래의 코드를 살펴보자.

```typescript
// A와 B는 의존 관계이다. A가 B에 의존하고 있다.
class A {
  dependency: B;

  constructor() {
    // 의존성 인스턴스의 생성
    this.dependency = new B();
  }

  foo() { this.dependency.bar(); }
}

class B {
  bar() { console.log('bar'); }
}

const a = new A();
a.foo();
```

위 코드의 A는 B에 의존하고 있다. A가 B에 의존하는 의존 관계에 있을 때, B의 기능이 변경되면 A는 영향을 받는다. 즉, A가 B의 메소드를 사용한다면 B의 메소드 형식이 변경되었을 때 A도 수정되어야 한다. 그리고 A의 constructor에서 B를 직접 생성하고 있기 B의 인스턴스의 생성 방법을 알고 있어야 한다.

인스턴스의 생성 방식은 다양하다. 예를 들어, new 키워드를 사용할 수도 있고, 애플리케이션 전역에서 단일 인스턴스를 공유하는 [싱글턴 패턴](https://ko.wikipedia.org/wiki/싱글턴_패턴)의 경우 getInstance( )와 같은 함수를 호출할 수도 있으며, [팩토리 패턴](https://ko.wikipedia.org/wiki/팩토리_메서드_패턴)의 경우 createGreetingService( )와 같은 팩토리 함수를 사용할 수도 있을 것이다.

위 코드를 **의존성 주입(Dependency Injection, DI)** 패턴을 사용하여 긴밀한 결합(Tight Coupling)에서 느슨한 결합(Loose Coupling)으로 전환해 보자.

```typescript
class A {
  // 의존성 인스턴스를 직접 생성하지 않고 외부 환경에 요구한다.
  constructor(private dependency: B) {
  }

  foo() { this.dependency.bar(); }
}

class B {
  bar() { console.log('bar'); }
}

/*
A의 외부 환경에서 의존성 인스턴스를 주입한다.
이때 의존성 인스턴스의 생성 방법을 알아야 한다.
*/
const a = new A(new B());
a.foo();
```

의존성 주입은 의존 관계를 긴밀한 결합(Tight Coupling)에서 느슨한 결합(Loose Coupling)으로 의존 관계를 전환하기 위해 구성 요소 간의 의존 관계를 코드 내부가 아닌 외부의 설정 등을 통해 정의하는 디자인 패턴 중의 하나로서 구성 요소 간 결합도를 낮추고 재사용성을 높인다.

Angular는 의존성 주입을 프레임워크 차원에서 지원한다. 애플리케이션이 직접 인스턴스를 생성하는 것이 아니라 Angular 프레임워크에게 의존성 인스턴스를 요구하고 프레임워크가 생성한 인스턴스를 전달받아 사용하는 방식이다.

Angular가 지원하는 의존성 주입을 사용하여 컴포넌트가 직접 GreetingService의 인스턴스를 생성하지 않고 Angular가 인스턴스 생성의 주체가 되도록 위 코드를 수정해 보자. 앞에서 삭제했던 @Injectable 메타데이터 객체의 `providedIn` 프로퍼티를 추가하도록 한다.

```typescript
// greeting.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' /* @Injectable 프로바이더 */
})
export class GreetingService {
  sayHi() { return 'Hi!'; }
}
```

이제 서비스는 의존성 주입이 가능하게 되었다. 컴포넌트에서 이 서비스를 주입받아 사용해보자.

```typescript
// app.component.ts
import { Component } from '@angular/core';
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

  // 의존성 주입
  constructor(private greetingService: GreetingService) {}

  sayHi() {
    // 주입된 서비스의 사용
    this.greeting = this.greetingService.sayHi();
  }
}
```

<iframe src="https://stackblitz.com/edit/dependency-injection-2?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

의존성 주입을 사용하기 이전에는 컴포넌트가 직접 GreetingService의 인스턴스를 생성하였다. 하지만 의존성 주입을 도입한 위 코드를 보면 컴포넌트가 GreetingService의 인스턴스를 직접 생성하지 않았다. 다만 필요한 의존성을 constructor의 파라미터로 선언하여 의존성 인스턴스를 프레임워크에 요구했을 뿐이다.

의존성 주입을 사용하면 컴포넌트가 직접 의존성의 인스턴스를 생성하는 것이 아니라 컴포넌트는 단지 필요한 의존성을 요구하고, 프레임워크가 제어권(Control)을 갖는 주체로 동작하여 요구된 의존성 인스턴스를 생성하여 전달한다. 이를 **제어권의 역전(Inversion of Control, IoC)**이라 한다.

서비스를 사용하는 구성요소(컴포넌트만이 서비스를 사용할 수 있는 것은 아니다. 모든 구성요소가 서비스를 사용할 수 있다.)는 더 이상 의존성 인스턴스의 생성에 대해 관여하지 않아도 된다. Angular가 서비스의 인스턴스를 생성하여 컴포넌트에게 전달(주입, inject)해 줄 것이다. 다만, 인스턴스를 어떻게 생성하는지 Angular는 알지 못하므로 이 정보를 Angular에 알려주어야 한다. 다시 말해 주입될 의존성 인스턴스의 생성 정보를 Angular에 알려 주입을 지시하여야 한다. 이러한 인스턴스 생성 정보를 설정하여 의존성 인스턴스의 주입을 지시하는 것을 **프로바이더(provider)**라고 부른다.

프로바이더는 서비스의 @Injectable 메타데이터 객체의 providedIn 프로퍼티 뿐만 아니라 컴포넌트의 @Component와 모듈의 @NgModule 메타데이터 객체의 providers 프로퍼티에 등록할 수 있다.

@Injectable 메타데이터 객체의 providedIn 프로퍼티를 사용한 프로바이더의 설정은 Angular 6에서 새롭게 도입된 기능이다. 그런데 이 기능은 사실 기존의 프로바이더 설정 방식(@Component 또는 @NgModule 메타데이터 객체의 providers 프로퍼티를 사용한 프로바이더의 설정)의 문법적 설탕이다. 따라서 기존의 프로바이더 설정 방식을 이해하고 있으면 Angular 6의 새로운 기능도 쉽게 이해할 수 있을 것이다.
{: .info}

프로바이더를 컴포넌트의 @Component 메타데이터 객체에 등록해보자.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { GreetingService } from './greeting.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="sayHi()">Say Hi</button>
    <p>{{ greeting }}</p>
  `,
  providers: [GreetingService] /* @Component 프로바이더 */
})
...
```

서비스에 등록한 프로바이더를 삭제한다.

```typescript
// greeting.service.ts
import { Injectable } from '@angular/core';

@Injectable() /* @Injectable 프로바이더 삭제 */
export class GreetingService {
  sayHi() { return 'Hi!'; }
}
```

<iframe src="https://stackblitz.com/edit/dependency-injection-3?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

컴포넌트의 @Component 메타데이터 객체에 등록한 프로바이더를 살펴보자.

```typescript
// app.component.ts
@Component({
  ...
  providers: [GreetingService] /* @Component 프로바이더 */
})
```

위 코드는 아래 코드의 축약 표현으로 GreetingService 타입 인스턴스를 주입 요청받으면 GreetingService 클래스에 의해 생성된 GreetingService 타입의 인스턴스를 주입할 것을 Angular에 지시한다.

```typescript
// app.component.ts
@Component({
  ...
  /* @Component 프로바이더 */
  providers: [{
    // 의존성 인스턴스의 타입(토큰, Token)
    provide: GreetingService,
    // 의존성 인스턴스를 생성할 클래스
    useClass: GreetingService
  }]
})
```

providers 프로퍼티는 컴포넌트의 데코레이터 @Component의 메타데이터 객체 또는 모듈의 데코레이터 @NgModule의 메타데이터 객체에 등록한다. 이때 서비스의 주입 범위가 달라진다. 자세한 내용은 "[인젝터 트리](./angular-service#4-%EC%9D%B8%EC%A0%9D%ED%84%B0-%ED%8A%B8%EB%A6%ACinjector-tree)"에서 살펴볼 것이다.
{: .info}

이와 같은 방법으로 Angular는 주입할 의존 관계 객체의 생성 방법을 알게 되고 providers 프로퍼티의 설정 정보대로 동작하여 의존 관계 객체의 인스턴스를 생성하고 주입한다. 이제 컴포넌트는 의존 관계 객체의 생성 방법을 알 필요가 없고 인젝터가 생성하여 생성자의 인자로 주입한 인스턴스를 사용하기만 하면 된다.

주입을 요청할 때는 constructor의 파라미터에 주입된 인스턴스를 담을 변수의 이름과 주입 대상의 타입을 명시한다.

```typescript
// app.component.ts
// 의존성 주입
constructor(private greetingService: GreetingService) {}
```

위 코드는 GreetingService 타입의 인스턴스를 주입 요청하고 있다. Angular는 주입 요청된 인스턴스의 타입 GreetingService와 일치하는 프로바이더(의존성 주입을 위해 @NgModule이나 @Component 메타데이터 객체의 providers 프로퍼티에 등록한 인스턴스 생성 정보)의 토큰(providers.provide 프로퍼티)을 검색한다. 검색이 성공하면 프로바이더의 useClass 프로퍼티에 지정된 클래스를 사용하여 인스턴스를 생성한다. 그리고 이 인스턴스를 greetingService 프로퍼티에 할당하여 주입한다.

constructor 파라미터에 접근 제한자를 선언하였으므로 greetingService는 컴포넌트 내에서 this에 의해 참조 가능한 클래스 프로퍼티이다.


```typescript
sayHi() {
  // 주입된 서비스의 사용
  this.greeting = this.greetingService.sayHi();
}
```

# 3. 인젝터(Injector)

의존성 주입 요청에 의해 주입되어야 할 인스턴스가 있다면 Angular는 이 인스턴스의 주입을 인젝터(Injector)에 요청한다. 인젝터는 컴포넌트와 모듈 레벨로 존재하며 의존성 주입 요청에 의해 프로바이더를 검색하고 인스턴스를 생성하여 의존성 인스턴스를 주입한다.

의존성 요청이 있을 때마다 매번 의존성 인스턴스를 생성하는 것은 아니다. 인젝터는 인스턴스의 풀(pool)인 컨테이너를 관리하고 있다. 인젝터는 의존성 주입 요청을 받으면 프로바이더를 참조하여 요청된 인스턴스가 컨테이너에 존재하는지 검색한다. 이때 사용하는 것이 프로바이더의 provide 프로퍼티 값인 토큰이다. 기존에 생성된 인스턴스는 프로바이더의 토큰을 키로 컨테이너에 저장되어 있다. 인스턴스를 검색할 때에는 토큰을 키로 인스턴스를 검색한다.

```typescript
providers: [{
  // 의존성 인스턴스의 타입(토큰, Token)
  provide: GreetingService,
  // 의존성 인스턴스를 생성할 클래스
  useClass: GreetingService
}]
```

만약 주입 요청을 받은 인스턴스가 컨테이너에 존재하면 새롭게 인스턴스를 생성하는 것이 아니라 컨테이너에 이미 존재하는 인스턴스를 주입하고, 요청된 인스턴스가 컨테이너에 존재하지 않으면 프로바이더의 useClass 프로퍼티를 참조하여 인스턴스를 생성하고 토큰을 키로 컨테이너에 추가한 후, 이 인스턴스를 constructor에 주입한다.

![Injector](/img/injector.png)

인젝터(Injector)
{: .desc-img}

# 4. 인젝터 트리(Injector tree)

컴포넌트는 트리 구조로 구성된다. 모든 컴포넌트는 각각 하나의 인젝터를 가지고 있기 때문에 컴포넌트의 트리 구조와 동일한 인젝터 트리(Injector tree)가 만들어진다.

컴포넌트의 주입 요청이 있을 때 Angular는 해당 컴포넌트의 인젝터에게 의존성 주입을 요청한다. 해당 컴포넌트의 인젝터는 주입 대상의 프로바이더가 컴포넌트에 등록되어 있는지 검색한다. 예를 들어 아래와 같은 의존성 주입 요청이 있다고 하자.

```typescript
constructor(private user: UserService) {}
```

이 주입 요청에 대해 Angular는 위 의존성 주입을 요청한 컴포넌트의 인젝터에 주입을 요청하고 해당 인젝터는 해당 컴포넌트에 UserService를 토큰으로 갖는 프로바이더, 즉 프로바이더의 provide 프로퍼티 값이 UserService인 프로바이더가 존재하는지 검색한다.

검색에 성공하면 인젝터는 검색된 프로바이더를 사용하여 인스턴스를 주입한다. 만약, 해당 컴포넌트에서 프로바이더를 찾을 수 없으면 상위 컴포넌트의 인젝터로 주입 요청을 전달하고 상위 컴포넌트의 인젝터는 해당 컴포넌트에서 프로바이더를 검색한다. 이러한 방식으로 주입 대상의 프로바이더를 찾을 때까지 계속하여 상위 컴포넌트의 인젝터로 주입 요청을 전달하고 프로바이더를 검색한다. 최상위 컴포넌트에서도 주입 대상의 프로바이더를 찾지 못하면 모듈에서 프로바이더를 검색한다. 어디에서도 프로바이더를 찾지 못하면 에러를 발생시킨다.

예를 들어, 아래와 같은 구조의 애플리케이션이 있다고 가정하자.

![Injector](/img/injector-tree.png)
{: .w-350}

인젝터 트리
{: .desc-img}

ChildComponent에서 주입 요청이 있고 주입 대상의 프로바이더는 루트 모듈에 등록되어 있다. ChildComponent에 의존성을 주입하기 위한 인젝터의 움직임을 순서대로 따라가 보자.

1. ChildComponent의 인젝터는 ChildComponent에서 주입 대상의 프로바이더를 검색한다. ChildComponent에는 프로바이더가 등록되어 있지 않기 때문에 프로바이더 검색에 실패하였으므로 상위 컴포넌트인 ParentComponent의 인젝터에게 주입 요청을 전달한다.

2. ParentComponent의 인젝터는 ParentComponent에서 주입 대상의 프로바이더를 검색한다. 또 다시 프로바이더 검색에 실패하였으므로 상위 컴포넌트인 AppCompoent의 인젝터에게 주입 요청을 전달한다.

3. AppCompoent의 인젝터는 AppCompoent에서 주입 대상의 프로바이더를 검색한다. 이 또한 프로바이더 검색에 실패하였으므로 루트 모듈인 AppModule의 인젝터에게 주입 요청을 전달한다.

4. AppModule의 인젝터는 AppModule에서 주입 대상의 프로바이더를 검색한다. 이때 루트 모듈 AppModule에는 주입 대상의 프로바이더가 등록되어 있으므로 이 프로바이더를 사용하여 AppModule의 인젝터는 자신이 관리하고 있는 컨테이너에서 의존성 인스턴스를 검색하여 ChildComponent에 주입한다.

이와 같이 Angular는 의존성 주입을 위해 인젝터 트리를 따라 올라가면서 의존성 인스턴스를 주입할 인젝터를 찾는다. 이때 의존성 인스턴스를 주입할 인젝터를 특정하는 기준이 되는 것은 프로바이더가 등록되어 있는 위치이다. 이는 인젝터 트리상 상위 인젝터는 하위 요소에 의존성 인스턴스를 제공할 수 있다는 것을 의미한다. 하지만 하위 인젝터가 상위 요소에 의존성 인스턴스를 제공할 수는 없다. 이것을 통해 알 수 있는 것은 아래와 같다.

-	컴포넌트의 프로바이더에 등록되어 있는 서비스는 자신과 하위 컴포넌트에 주입할 수 있는 로컬 서비스이다.

-	루트 모듈의 프로바이더에 등록되어 있는 서비스는 애플리케이션 전역에 주입할 수 있는 전역 서비스이다. 루트 인젝터는 단일 인스턴스를 생성하고 인스턴스를 요청하는 모든 구성요소에게 동일한 싱글턴 인스턴스를 주입한다.

# 5. 프로바이더(Provider)

의존성 주입을 위해서는 Angular에 주입 대상 인스턴스를 어떻게 생성하는지에 대한 정보를 알려 주어야 한다. 이 인스턴스 생성 정보를 통해 의존성 인스턴스의 생성을 지시하는 것을 "프로바이더(provider)"라고 부르며 모듈의 @NgModule이나 컴포넌트의 @Component 메타데이터 객체의 `providers` 프로퍼티에 등록한다.


```typescript
// @NgModule 프로바이더
@NgModule({
  ...
  providers: [GreetingService]
})

// @Component 프로바이더
@Component({
  ...
  providers: [GreetingService]
})
```

@Injectable 메타데이터 객체의 `providedIn` 프로퍼티를 사용한 프로바이더 설정 방식도 Angular 6에서 새롭게 도입되었다. providedIn 프로퍼티의 값으로 'root'를 설정하면 루트 인젝터에게 서비스를 제공하도록 지시하여 애플리케이션의 모든 구성요소에 싱글턴 전역 서비스를 주입할 수 있도록 한다. 이것은 루트 모듈에 프로바이더를 등록한 것과 동일하게 동작한다.

```typescript
// @Injectable 프로바이더
@Injectable({
  providedIn: 'root'
})
```

providedIn 프로퍼티의 값으로 모듈을 설정할 수도 있다. 이것은 해당 모듈에 프로바이더를 등록한 것과 동일하게 동작한다.

```typescript
// @Injectable 프로바이더
@Injectable({
  providedIn: 'root'
})
```

모듈에 프로바이더를 등록한 서비스는 해당 모듈의 모든 구성요소(루트 모듈인 경우, 애플리케이션 전역)에 주입할 수 있고, 컴포넌트에 프로바이더를 등록한 서비스는 해당 컴포넌트와 하위 컴포넌트에 주입할 수 있다.

**서비스는 인젝터의 주입 범위 내에서 언제나 싱글턴이다.** 그러나 컴포넌트의 인젝터는 독립적으로 동작한다. 예를 들어 루트 모듈의 인젝터가 제공하는 서비스가 있을 때, 같은 프로바이더를 컴포넌트에 등록하면 해당 컴포넌트와 하위 컴포넌트에는 2개의 서비스가 주입될 수 있다.

예를 들어, 아래와 같은 구조의 애플리케이션이 있다고 가정하자.

![DI](/img/di.png)
{: .w-350}

컴포넌트 레벨의 프로바이더에 등록한 서비스는 컴포넌트마다 각각 다른 인스턴스가 생성되어 주입된다.
{: .desc-img}

ParentComponent와 ChildComponent 모두에 같은 토큰(의존성으로 주입될 인스턴스를 검색하거나 생성할 때 사용하는 키)의 프로바이더가 등록되어 있고 모두 같은 인스턴스를 주입 요청하는 경우, 각각 자신의 인젝터가 해당 컴포넌트에 각각 다른 인스턴스를 생성하어 주입한다. 하지만 프로바이더를 가지고 있지 않은 AppComponent가 주입을 요청하면 AppModule의 인젝터가 인스턴스를 생성하여 주입할 것이다.

인젝터는 요청된 인스턴스가 컨테이너에 존재하면 새롭게 인스턴스를 생성하는 것이 아니라 컨테이너에 이미 존재하는 인스턴스를 주입한다. 따라서 AppModule의 인젝터가 생성한 인스턴스는 싱글턴으로 하나의 인스턴스를 공유한다. 만약 ParentComponent와 ChildComponent 모두 프로바이더를 가지고 있지 않다면 AppModule의 인젝터가 제공하는 싱글턴 인스턴스를 주입받는다.

프로바이더는 사용 방법에 따라 3가지 종류로 구분할 수 있다.

## 5.1 클래스 프로바이더(Class Provideer)

클래스 프로바이더는 가장 일반적인 프로바이더로서 클래스의 인스턴스를 의존성 주입하기 위한 설정을 등록한다. providers 프로퍼티는 아래와 같이 제공할 인스턴스의 클래스 리스트로 구성된 배열을 값으로 갖는다.

```typescript
// 주입할 인스턴스의 클래스 리스트
providers: [GreetingService]
```

이것은 실제로 두개의 프로퍼티를 가진 객체 리터럴을 사용하여 프로바이더를 등록하는 것을 축약 표현(shorhand)한 것으로 아래와 동일한 표현이다.

```typescript
providers: [{
  provide: GreetingService,  // 토큰
  useClass: GreetingService  // 의존성 인스턴스를 생성할 클래스
}]
```

첫 번째 provide 프로퍼티는 인젝터가 관리하고 있는 컨테이너에서 주입 요청받은 인스턴스를 검색하거나 생성한 인스턴스를 등록할 때 키(key) 역할을 하는 토큰(token)이며 일반적으로 주입 대상 인스턴스의 타입을 지정한다.

두 번째 useClass 프로퍼티는 주입 대상 인스턴스를 생성하는 클래스(provider definition object)를 의미한다. 인젝터는 주입 요청받은 인스턴스를 컨테이너에서 검색할 수 없어서 인스턴스를 생성할 필요가 있을 때 이 클래스를 사용한다. 위 코드는 GreetingService 클래스에 의해 생성된 GreetingService 타입의 인스턴스가 주입될 것을 의미한다.

컴포넌트가 GreetingService 클래스가 아닌 다른 **대체 클래스**를 사용하는 경우를 살펴보자. GreetingService 서비스는 아래와 같다.

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
  // 의존성 인스턴스의 타입(토큰, Token)
  provide: GreetingService,
  // 의존성 인스턴스를 생성할 클래스
  useClass: AnotherGreetingService
}]
```

위 코드는 AnotherGreetingService 클래스로 생성한 인스턴스를 GreetingService란 이름의 토큰으로 인젝터의 컨테이너에 등록하고 검색할 것이라는 의미이다. 즉, 컴포넌트에서 의존성 주입을 요청할 때, GreetingService 타입의 인스턴스를 요청하면 인젝터는 컨테이너에서 GreetingService란 키(토큰)으로 인스턴스를 검색하여 AnotherGreetingService 클래스로 생성된 GreetingService 타입의 인스턴스를 주입할 것이다. GreetingService와 AnotherGreetingService 두 클래스는 비록 같은 인터페이스를 구현하지는 않았지만, 같은 메소드를 가지고 있기 때문에 [덕 타이핑(duck typing)](./typescript-interface#5-덕-타이핑-duck-typing)에 의해 같은 타입으로 인정된다.

GreetingService의 인스턴스를 주입받아 사용하던 컴포넌트가 AnotherGreetingService의 인스턴스를 주입받아 사용하도록 변경되었지만, 컴포넌트는 어떠한 수정 없이도 문제없이 동작할 것이다. 이와 같이 의존성 주입을 사용하면 재사용성이 향상되고 긴밀히 결합된 의존 관계를 느슨한 결합으로 분리할 수 있다.

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
    // 의존성 인스턴스의 타입(토큰, Token)
    provide: GreetingService,
    // 의존성 인스턴스를 생성할 클래스
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

<iframe src="https://stackblitz.com/edit/dependency-injection-4?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

위 코드는 문제없이 잘 동작한다. 그런데 프로바이더를 컴포넌트 레벨로 등록하였기 때문에 GreetingService 타입의 AnotherGreetingService 인스턴스는 컴포넌트 레벨로 생성된다. 만약 모듈이나 다른 컴포넌트에 동일한 프로바이더가 존재하면 AnotherGreetingService 인스턴스를 중복 생성하여 여러 개의 인스턴스가 존재할 가능성이 있다. AnotherGreetingService 인스턴스를 싱글턴으로 공유하여 사용할 수 있도록 컴포넌트에 등록되어 있던 프로바이더를 삭제하고 루트 모듈에 프로바이더를 등록하도록 한다.

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GreetingService } from './greeting.service';
import { AnotherGreetingService } from './another-greeting.service';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule ],
  providers: [{
    // 의존성 인스턴스의 타입(토큰, Token)
    provide: GreetingService,
    // 의존성 인스턴스를 생성할 클래스
    useClass: AnotherGreetingService
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

<iframe src="https://stackblitz.com/edit/dependency-injection-5?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 5.2 값 프로바이더(Value Provider)

값 프로바이더는 클래스의 인스턴스가 아닌 문자열이나 객체 리터럴과 같은 값을 의존성 주입하기 위한 설정을 등록한다. 아래의 예제를 살펴보자. AppConfig 클래스를 토큰으로, 객체 리터럴을 값으로 설정하여 AppConfig 타입의 인스턴스를 제공하도록 설정하고 있다.

```typescript
// app.config.ts
// 주입 대상의 토큰
export class AppConfig {
  url: string;
  port: string;
}

// 주입 대상의 값
export const MY_APP_CONFIG: AppConfig = {
  url: 'http://somewhere.io',
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
    /*
    AppConfig 클래스를 토큰으로, 객체 리터럴을 값으로 설정하여
    AppConfig 타입의 인스턴스를 제공
    */
    { provide: AppConfig, useValue: MY_APP_CONFIG }
  ]
})
export class AppComponent {
  constructor(public appConfig: AppConfig) {
    console.log(appConfig);
    // {url: "http://somewhere.io", port: "5000"}
  }
}
```

<iframe src="https://stackblitz.com/edit/service-value-provider-1?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

주입된 AppConfig 타입의 인스턴스는 값 프로바이더의 useValue 프로퍼티에 지정된 값인 객체 리터럴 `MY_APP_CONFIG`으로 초기화되었다.

객체 리터럴을 값으로 주입하는 경우, 클래스로 타입을 만들어 토큰으로 사용할 수 있기 때문에 클래스 프로바이더와 유사하게 아무런 문제없이 값을 주입할 수 있었다. 하지만 주입될 의존성은 클래스의 인스턴스와 객체 리터럴이 아닌 문자열, 숫자, 함수일 수도 있다. 예를 들어, 문자열을 주입하려면 토큰은 어떻게 지정하여야 하는가?

토큰(token)은 인젝터가 관리하고 있는 컨테이너에서 주입 요청받은 인스턴스를 검색하거나 생성한 인스턴스를 등록할 때 사용하는 키(key)이다. 클래스 프로바이더의 경우, 주입 대상 인스턴스의 타입 즉 클래스를 지정하지만 토큰은 반드시 클래스일 필요는 없다. 주입 대상이 쿤자열인 경우, 토큰으로 클래스를 지정할 수는 없으므로 값을 식별할 수 있는 식별자를 문자열로 지정한다.

```typescript
providers: [
  { provide: 'API_URL', useValue: 'http://somewhere.io' }
]
```

여러 개의 값을 주입할 필요가 있다면 여러 개의 토큰이 필요하다. 따라서 주입 대상 값마다 고유의 토큰이 필요하다.

```typescript
providers: [
  { provide: 'API_URL', useValue: 'http://somewhere.io' },
  { provide: 'API_PORT', useValue: 5000 },
  { provide: 'API_PROD', useValue: false }
]
```

아래의 코드는 문자열, 숫자, 불리언 타입의 의존성을 주입하는 경우이다. 애플리케이션 공통 상수가 있다면 아래와 같이 선언할 수 있다.

```typescript
// app.compoenet.ts
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>api server : {{ "{{ apiUrl " }}}}:{{ "{{ apiPort " }}}}</p>
    <p>api mode : {{ "{{ apiProd ? 'Production' : 'Developement' " }}}}</p>
  `,
  providers: [
    { provide: 'API_URL', useValue: 'http://somewhere.io' },
    { provide: 'API_PORT', useValue: 5000 },
    { provide: 'API_PROD', useValue: false }
  ]
})
export class AppComponent {
  constructor(
    @Inject('API_URL') public apiUrl: string,
    @Inject('API_PORT') public apiPort: number,
    @Inject('API_PROD') public apiProd: boolean
  ) {
    console.log(apiUrl);  // 'http://somewhere.io'
    console.log(apiPort); // 5000
    console.log(apiProd); // false
  }
}
```

<iframe src="https://stackblitz.com/edit/service-value-provider-2?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

위 코드의 프로바이더를 살펴보면 문자열 'http://somewhere.io'를 값으로 주입하기 위해 'API_URL'라는 문자열을 토큰으로 사용하였다. 토큰을 지정하는 provide 프로퍼티 값에 문자열을 사용하면 주입 대상의 타입을 추론할 수 없다. 예를 들어 아래와 같이 의존성 주입을 요청할 수는 없다.

```typescript
constructor(public apiUrl: 'API_URL') {} // 'API_URL'은 타입이 아니다.
```

이런 경우에는 `@Inject 데코레이터`를 사용한다. @Inject 데코레이터의 파라미터에는 주입 대상의 토큰을 설정한다.

```typescript
constructor(@Inject('API_URL') public apiUrl: string) {}
```

주입 대상의 타입이 클래스이면 Angular에 의해 암묵적으로 클래스를 @Inject 데코레이터의 인자로 전달하기 때문에 @Inject 데코레이터를 선언하지 않아도 된다. 하지만 **클래스 이외의 토큰은 명시적으로 @Inject 데코레이터를 선언하여야 한다.**

하지만 위 예제와 같이 문자열을 토큰으로 사용하는 것은 토큰이 중복될 위험이 있으므로 피해야 한다. 만약 외부 라이브러리에서 사용하는 토큰과 중복된다면 인젝터는 마지막에 선언된 프로바이더를 사용하여 인스턴스를 선택하고 주입할 것이다. 이러한 경우를 위하여 **[인젝션 토큰(Injection Token)](./angular-service#54-%EC%9D%B8%EC%A0%9D%EC%85%98-%ED%86%A0%ED%81%B0injection-token)**을 제공한다.

## 5.3 팩토리 프로바이더(Factory Provider)

의존성 인스턴스를 생성할 때 어떠한 로직을 거쳐야 한다면 팩토리 함수를 사용한다. 예를 들어 생성할 인스턴스를 조건에 따라 결정해야 하는 경우, 팩토리 함수를 사용한다.

의존성 요청이 있을 때마다 매번 의존성 인스턴스를 생성하는 것은 아니다. 인젝터는 인스턴스의 풀인 컨테이너를 관리하고 있다. 이 컨테이너에 요청된 인스턴스가 존재하면 새롭게 인스턴스를 생성하는 것이 아니라 컨테이너에 이미 존재하는 인스턴스를 주입하고, 요청된 인스턴스가 컨테이너에 존재하지 않으면 프로바이더를 참조하여 인스턴스를 생성하고 컨테이너에 추가한 후, 이 인스턴스를 컴포넌트 constructor에 주입한다.
{: .info}

개발 모드(isDev가 true)인 경우, 테스트용 가상 사용자 생성 서비스(MockUserService)를 생성하여 주입하고, 그외의 경우는 실제 사용자 생성 서비스(UserService) 를 생성하여 주입하는 예제를 작성해 보자.

```typescript
// user.ts
// 사용자 생성 클래스
export class User {
  constructor(public id: string, public password: string) {}
}
```

```typescript
// user.service.ts
// 사용자 생성 서비스
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {
  // 실제 사용자를 생성하여 반환
  getUser(): User { return new User('real user', '123'); }
}
```

```typescript
// mock-user.service.ts
// 테스트용 가상 사용자 생성 서비스
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class MockUserService {
  // 테스트용 가상 사용자를 생성하여 반환
  getUser(): User { return new User('mock user', 'abc'); }
}
```

```typescript
// user.service.provider.ts
import { MockUserService } from './mock-user.service';
import { UserService } from './user.service';

// 팩토리 함수
const userServiceFactory
  = (isDev: boolean) => isDev ? new MockUserService() : new UserService();

// 팩토리 프로바이더
export const UserServiceProvider = {
  // 최종적으로 생성될 인스턴스의 타입
  provide: UserService,
  // 인스턴스 생성을 담당할 팩토리 함수
  useFactory: userServiceFactory,
  // 팩토리 함수에 주입할 값 프로바이더의 토큰
  deps: ['isDev']
};

// 팩토리 함수에 주입할 값의 프로바이더
export const IsDevProvider = {
  // 팩토리 함수에 주입할 값의 토큰
  provide: 'isDev',
  // 팩토리 함수에 주입할 값
  useValue: false
};
```

프로바이더의 useFactory 프로퍼티에는 인스턴스 생성을 담당할 팩토리 함수를 등록한다. 이 팩토리 함수 userServiceFactory는 불리언 값 isDev를 인수로 받는다. 이 값은 deps 프로퍼티에 이 값을 제공할 프로바이더의 토큰을 지정하는 것으로 팩토리 함수에 자동 주입된다. 다시 말해 deps 프로퍼티에는 팩토리 함수 userServiceFactory에 주입할 의존성의 토큰을 배열로 설정한다.

팩토리 프로바이더에 의해 주입될 UserService를 사용하는 컴포넌트는 아래와 같다.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { IsDevProvider, UserServiceProvider } from './user.service.provider';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  template: '{{ "{{ userService.getUser() | json " }}}}',
  providers: [
    IsDevProvider, // 팩토리 함수에 주입할 값의 프로바이더
    UserServiceProvider // 팩토리 프로바이더
  ]
})
export class AppComponent {
  constructor(public userService: UserService) {
    console.log(userService.getUser());
    // {id: "mock user", password: "abc"}
  }
}
```

<iframe src="https://stackblitz.com/edit/service-factory-provider?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 5.4 인젝션 토큰(Injection Token)

지금까지 살펴본 예제는 값 프로바이더를 사용하여 문자열이나 숫자 등을 애플리케이션의 공통 상수로 사용하는 경우를 제외하고 토큰으로 클래스를 사용하였다. 인젝션 토큰(Injection token)은 클래스가 아닌 의존성(non-class dependency) 토큰, 예를 들어 객체, 문자열, 함수 등을 위한 토큰을 주입받기 위해 사용한다. 앞에서 살펴본 값 프로바이더의 경우, 문자열로 이루어진 토큰을 사용할 수 있었지만 토큰이 중복될 위험이 있으므로 피해야 한다.

예를 들어 객체 리터럴로 작성된 애플리케이션 설정 정보를 주입받기 위해 프로바이더를 등록하여 보자. [값 프로바이더](./angular-service#52-값-프로바이더value-provider)에서 살펴본 예제와 매우 유사하다. 다른 점은 주입 대상의 토큰을 나타내는 AppConfig가 이전 예제에서는 클래스였고 아래의 예제에서는 인터페이스이다.

```typescript
// app.config.ts
// 주입 대상의 토큰
export interface AppConfig {
  url: string;
  port: string;
}

// 주입 대상의 값
export const MY_APP_CONFIG: AppConfig = {
  url: 'http://somewhere.io',
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
    // 객체 리터럴인 MY_APP_CONFIG를 사용하여 AppConfig 타입의 인스턴스를 제공
    // AppConfig는 클래스가 아니라 인터페이스이다.
    { provide: AppConfig, useValue: MY_APP_CONFIG } // 에러 발생
  ]
})
export class AppComponent {
  constructor(public appConfig: AppConfig) {
    console.log(appConfig);
  }
}
```

<iframe src="https://stackblitz.com/edit/injection-token-1?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

위와 같이 인터페이스를 프로바이더의 provide 프로퍼티에 토큰으로 등록하면 에러가 발생한다. TypeScript는 트랜스파일링되어 자바스크립트로 변환된다. 하지만 자바스크립트는 인터페이스를 지원하지 않으므로 변환된 자바스크립트 파일에는 인터페이스가 사라지게 된다. 따라서 Angular가 런타임에 찾을 수 있는 타입 정보가 없기 때문에 인터페이스를 토큰으로 등록하면 에러가 발생한다.

이러한 경우 사용하는 것이 인젝션 토큰(Injection Token)이다. 사용 방법은 아래와 같다.

```typescript
// app.config.ts
import { InjectionToken } from '@angular/core';

// 주입 대상의 토큰
export interface AppConfig {
  url: string;
  port: string;
}

// 주입 대상의 값
export const MY_APP_CONFIG: AppConfig = {
  url: 'http://somewhere.io',
  port: '5000'
};

// AppConfig 타입의 InjectionToken APP_CONFIG 생성
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// 프로바이더
export const AppConfigProvider = {
  provide: APP_CONFIG, // InjectionToken
  useValue: MY_APP_CONFIG
};
```

InjectionToken 클래스를 사용하여 인터페이스 AppConfig 타입의 인젝션 토큰 APP\_CONFIG를 생성하였다. InjectionToken 클래스의 생성자 파라미터에는 개발자를 위한 설명(description) 문자열을 전달한다. InjectionToken 클래스는 클래스가 아닌 의존성(non-class dependency), 예를 들어 객체, 문자열, 함수 등을 위한 토큰을 생성한다. InjectionToken 클래스로 생성한 인젝션 토큰 APP\_CONFIG를 인터페이스 대신 provide 프로퍼티에 토큰으로 등록한다. 의존성을 주입받는 컴포넌트는 아래와 같다.

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
    // {url: "http://somewhere.io", port: "5000"}
  }
}
```

<iframe src="https://stackblitz.com/edit/injection-token-2?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

[값 프로바이더](./angular-service#52-값-프로바이더value-provider)에서 살펴본 바와 같이 @Inject 데코레이터의 파라미터에는 주입할 대상의 토큰을 설정한다. InjectionToken 클래스로 생성한 인젝션 토큰 APP_CONFIG를 @Inject 데코레이터에 인자로 전달하면 클래스가 아닌 의존성(non-class dependency) 토큰을 사용할 수 있다.

## 5.5 선택적 의존성 주입(Optional Dependency)

프로바이더를 등록하지 않으면 의존성 주입은 실패하고 애플리케이션은 중단된다. `@Optional` 데코레이터를 사용하면 의존성 주입이 필수가 아닌 선택 사항임을 Angular에 알린다. 즉, 주입받을 의존성이 없더라도 에러로 인해 애플리케이션이 중단되지 않는다. 사용 방법은 아래와 같다.

```typescript
// app.component.ts
import { Component, Optional } from '@angular/core';
import { GreetingService } from './greeting.service';

@Component({
  selector: 'app-root',
  template: '{{ greeting }}',
  // providers: [GreetingService]
})
export class AppComponent {
  greeting: string;

  // 선택적 의존성 주입
  constructor(@Optional() public greetingService: GreetingService) {
    this.greeting
      = this.greetingService ? this.greetingService.sayHi() : 'Hi...';
  }
}
```

<iframe src="https://stackblitz.com/edit/optional-dependency?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

모듈 또는 컴포넌트의 프로바이더에 GreetingService가 등록되어 있다면 컴포넌트 레벨에서 GreetingService 인스턴스를 주입받을 수 있으므로 GreetingService의 sayHi 메소드를 사용할 수 있을 것이다. 하지만 프로바이더에 GreetingService가 등록되어 있지 않다면 GreetingService는 주입되지 않는다. 그러나 @Optional 데코레이터를 사용하였으므로 에러는 발생하지 않는다.

# 6. 서비스 중재자 패턴(Service Mediator Pattern)

컴포넌트는 독립적인 존재이지만 다른 컴포넌트와 결합도를 낮게 유지하면서 상태 정보를 교환할 수 있어야 한다. @Input, @Output 데코레이터를 사용하여 컴포넌트 간에 상태를 공유할 수 있지만, 원거리 컴포넌트 간의 상태 공유를 위해서 상태 공유가 필요 없는 컴포넌트를 경유해야 하고, 일관된 자료 구조가 존재하지 않기 때문에 개별적인 프로퍼티만을 교환할 수밖에 없는 한계가 있다.

![complex-component](./img/complex-component.png)
{: .w-300}

원거리 컴포넌트 간의 상태 공유
{: .desc-img}

이러한 경우, 서비스 중재자 패턴(Service Mediator Pattern)을 사용하여 서비스를 컴포넌트 간 데이터 중재자로 사용하면 일정한 형식의 자료 구조를 사용하면서 컴포넌트 간의 상태 공유가 가능하다.

서비스를 사용하여 2개의 형제 컴포넌트 간 상태를 공유하는 예제를 작성하여보자. 우선 데이터 공유 서비스를 작성한다.

```typescript
// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  message: string; // 공유 데이터
}
```

DataService는 message 프로퍼티를 갖는 클래스이다. 이 DataService를 2개의 형제 컴포넌트에 모두 의존성 주입하여 상태를 공유하는 중재자의 역할을 담당하게 할 것이다.

다음은 부모 컴포넌트 역할을 담당할 루트 컴포넌트와 2개의 형제 컴포넌트를 작성한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-sibling1></app-sibling1>
    <app-sibling2></app-sibling2>
  `
})
export class AppComponent {}
```

```typescript
// sibling1.component.ts
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-sibling1',
  template: `
    <h2>Sibling-1</h2>
    <p>message: {{ "{{ message " }}}}</p>
    <input type="text"
      (input)="message = $event.target.value"
      placeholder="message">
  `,
  styles: [`
    :host {
      display: block;
      padding: 10px;
      background-color: antiquewhite;
    }
  `]
})
export class Sibling1Component {
  constructor(private dataService: DataService) {}

  get message(): string {
    return this.dataService.message;
  }

  set message(newMessage: string) {
    this.dataService.message = newMessage;
  }
}
```

```typescript
// sibling2.component.ts
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-sibling2',
  template: `
    <h2>Sibling-2</h2>
    <p>message: {{ "{{ message " }}}}</p>
    <input type="text"
      (input)="message = $event.target.value"
      placeholder="message">
  `,
  styles: [`
    :host {
      display: block;
      padding: 10px;
      background-color: aliceblue;
    }
  `]
})
export class Sibling2Component {
  constructor(private dataService: DataService) {}

  get message(): string {
    return this.dataService.message;
  }

  set message(newMessage: string) {
    this.dataService.message = newMessage;
  }
}
```

<iframe src="https://stackblitz.com/edit/data-mediator?ctl=1&embed=1&hideNavigation=1&file=src/app/data.service.ts" frameborder="0" width="100%" height="500"></iframe>

형제 컴포넌트인 Sibling1Component와 Sibling2Component는 각각 데이터 공유 서비스인 DataService의 인스턴스를 주입받는다. 그리고 getter를 통해 데이터 공유 서비스 DataService의 message 프로퍼티에 값을 참조하고 setter를 통해 데이터 공유 서비스 DataService의 message 프로퍼티에 값을 할당한다. 이때 형제 컴포넌트 Sibling2Component와 Sibling1Component는 동일한 인스턴스를 사용하여야 한다. 즉, 데이터 공유 서비스 DataService의 인스턴스는 싱글턴으로 동작하여야 한다. DataService의 @Injectable 메타데이터 객체의 providedIn 프로퍼티에 'root'를 설정하였으므로 DataService는 루트 인젝터가 싱글턴 인스턴스로 제공한다.

```typescript
// // data.service.ts
@Injectable({
  providedIn: 'root'
})
```

# Reference

* [The Dependency Injection pattern](https://angular.io/guide/dependency-injection-pattern)

* [Angular Dependency Injection](https://angular.io/guide/dependency-injection)

* [Hierarchical Dependency Injectors](https://angular.io/guide/hierarchical-dependency-injection)

* [Dependency Injection](https://angular.io/guide/dependency-injection-in-action)
