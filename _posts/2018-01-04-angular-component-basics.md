---
layout: post
title: Angular Component - <strong>Basics</strong>
subtitle: 컴포넌트 소개와 기본 구조
categories: angular
section: angular
seq: 13
subseq: 4
description: 컴포넌트는 Angular의 핵심 구성 요소로서 Angular 애플리케이션은 컴포넌트를 중심(CBD, Component Based Development)으로 구성된다. 컴포넌트의 역할은 애플리케이션의 화면을 구성하는 뷰(View)를 생성하고 관리하는 것이다. 컴포넌트는 동작 가능한 하나의 부품으로서 다른 컴포넌트에 간섭을 받지 않는 독립적인 뷰를 소유한다. Angular는 이러한 컴포넌트를 조합하여 하나의 완성된 애플리케이션을 작성한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 컴포넌트 소개

컴포넌트는 Angular의 핵심 구성 요소로서 Angular 애플리케이션은 컴포넌트를 중심(CBD, Component Based Development)으로 구성된다. 컴포넌트의 역할은 애플리케이션의 화면을 구성하는 <strong>뷰(View)</strong>를 생성하고 관리하는 것이다. Angular는 컴포넌트를 조립하여 하나의 완성된 애플리케이션을 작성한다.

## 1.1 웹 컴포넌트

웹 애플리케이션의 뷰는 내용(content)과 구조(structure)를 담당하는 HTML과 스타일(디자인, 레이아웃 등)을 담당하는 CSS의 조합으로 생성되며 DOM과 이벤트의 관리를 위해서 자바스크립트가 필요하다.

기존의 객체지향 개발(Object Oriented Programming)의 경우 로직을 클래스 단위로 부품화할 수 있지만 뷰를 부품화하는 것은 곤란하다. HTML은 어느 정도 템플릿화가 가능하지만 CSS는 상속(inheritance)과 캐스케이딩(cascading)이 적용되어 다른 CSS 룰셋에 영향을 받기 때문이다.

컴포넌트는 동작 가능한 하나의 부품이다. 컴포넌트의 부품화를 위해서는 다른 컴포넌트에 간섭을 받지 않도록 독립된 스코프를 가져야 한다. 다시 말해 컴포넌트 내에서만 유효한 상태 정보와 로직, 스타일을 소유한 완결된 뷰를 생성하기 위한 것이 바로 컴포넌트이다. <strong>컴포넌트는 독립적이고 완결된 뷰를 생성하기 위하여 "HTML, CSS, 자바스크립트를 하나의 단위로 묶는 것"</strong>이며 W3C 표준인 [웹 컴포넌트(Web Component)](https://www.webcomponents.org/introduction)를 기반으로 한다.

![web-component](/img/web-component.png)

웹 컴포넌트(Web Component)
{: .desc-img}

웹 컴포넌트는 웹 애플리케이션에서 재사용이 가능하도록 캡슐화된 HTML 커스텀 요소(Custom element)를 생성하는 웹 플랫폼 API의 집합이다. 웹 컴포넌트가 제공하여야 하는 기능은 아래와 같다.

1. 컴포넌트의 뷰를 생성할 수 있어야 하며(HTML Template)
2. 외부로부터의 간섭을 제어하기 위해 스코프(scope)를 분리하여 DOM을 캡슐화(Encapsulation)할 수 있어야 하며(Shadow DOM)
3. 외부에서 컴포넌트를 호출할 수 있어야 하고(HTML import)
4. 컴포넌트를 명시적으로 호출하기 위한 명칭(alias)을 선언하여 마치 네이티브 HTML 요소와 같이 사용할 수 있어야 한다(Custom Element).

위에서 설명한 HTML Template, Shadow DOM, HTML import, Custom Element가 바로 웹 컴포넌트의 4대 기술 스펙이다. 웹 컴포넌트의 브라우저 지원 현황은 아래와 같다.

![web component browser support](./img/web-component-browser-support.png)

[각 브라우저의 웹컴포넌트 지원 상황](https://www.webcomponents.org/)
{: .desc-img}

## 1.2 컴포넌트 트리

어떠한 복잡한 화면이라도 컴포넌트 하나로 생성하고 관리할 수 있다. 하지만 재사용이 가능한 부분이 존재하기 마련이므로 하나의 컴포넌트로 화면 전체를 구성하는 것은 컴포넌트를 사용하는 취지에 부합하지 않는다. 컴포넌트는 재사용이 용이한 구조로 분할하여 작성하며 이렇게 분할된 컴포넌트를 조립하여 코드의 중복없이 UI를 생성한다.

대부분의 웹 애플리케이션은 아래와 같이 블록 구조(Block structure)를 갖는다. HTML5의 시멘틱 태그를 사용하면 의미론적으로 명확한 구조를 가질 수 있다.

![HTML5 semantic elements](./img/building-structure.png)

블록 구조(Block structure)
{: .desc-img}

위 블록 구조의 경우, 헤더(header), 사이드바(aside), 푸터(footer) 영역은 모든 화면에서 공통으로 사용되고 본문(section)만 변경될 가능성이 높다. 이러한 경우 컴포넌트를 분할하고 컴포넌트를 조립하여 화면을 구성하는 것은 재사용과 유지보수의 관점에서 매우 바람직하다.

위의 블록 구조를 컴포넌트로 전환하면 아래와 같은 구조를 갖는다. 흡사 DOM 트리와 유사한 형태를 가지게 되는데 이를 <strong>컴포넌트 트리</strong>라고 한다.

![component tree](./img/component-tree.png)

컴포넌트 트리
{: .desc-img}

Angular 애플리케이션은 분할된 컴포넌트로 구성되기 때문에 컴포넌트 간에는 컴포넌트 트리로 표현되는 부모-자식 관계가 형성된다. 컴포넌트 간의 부모-자식 관계는 데이터와 이벤트가 왕래하는 상태 정보 흐름의 통로가 되며 이를 통해 상태 공유가 이루어지기 때문에 컴포넌트 간의 부모-자식 관계는 Angular 애플리케이션에서 중요한 의미를 갖는다. 따라서 설계 시점부터 화면을 어떠한 컴포넌트 단위로 분할할 것인지에 대한 검토가 필요하다.

# 2. 컴포넌트 기본 구조

## 2.1 컴포넌트의 코드 구조

컴포넌트의 기본 구조를 알아보기 위해 [Angular CLI](./angular-cli)로 프로젝트를 생성하여 보자.

ng new 명령어 다음에 프로젝트명을 지정하면 프로젝트명과 일치하는 새로운 프로젝트 폴더가 생성되고 스캐폴딩(프로젝트 기본 골격)이 작성된다. 프로젝트명을 hello로 지정하여 프로젝트를 생성한다.

```bash
$ ng new hello
```

프로젝트 생성이 완료되었으면 ng serve 명령어를 사용하여 hello 프로젝트를 실행한다. ng serve 명령어를 실행하면 Angular는 Webpack을 사용하여 소스코드와 의존 모듈을 자바스크립트로 번들링(Bundling)하고 Angular CLI가 내장하고 있는 개발용 서버를 실행한다.

```bash
$ cd hello
$ ng serve --open
```

![app works](./img/ng-serve-1.png)

Visual Studio Code로 프로젝트를 오픈하여 생성된 파일을 확인하여 보자. 아래의 명령으로 Visual Studio Code를 실행한다.

```bash
$ code .
```

![hello-component-project](/img/hello-component-project.png)

ng new 명령어에 의해 생성된 프로젝트는 루트 컴포넌트와 루트 모듈을 각각 1개씩 갖는다. 루트 모듈은 프로젝트 최상위 모듈로 main.ts에 의해 부트스트랩되며 컴포넌트 트리 상 최상위 컴포넌트인 루트 컴포넌트는 루트 모듈에 의해 부트스트랩된다.([Angular 애플리케이션의 처리 흐름](./angular-architecture#2-angular-애플리케이션의-처리-흐름) 참고)

생성된 루트 컴포넌트 src/app/app.component.ts를 살펴보자.

```typescript
// 임포트 영역
import { Component } from '@angular/core';

// @Component 데코레이터 영역
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// 컴포넌트 클래스 영역
export class AppComponent {
  title = 'app';
}
```

컴포넌트는 임포트 영역과 @Component 데코레이터 영역 그리고 컴포넌트 클래스 영역으로 구분할 수 있다.

임포트 영역
: 컴포넌트에 필요한 의존 모듈을 임포트한다. Angular가 제공하는 Angular 라이브러리 모듈의 경우 @가 붙어있으며 경로를 명시하지 않는다. 또한 npm을 사용하여 설치한 의존 모듈도 경로를 명시하지 않는다. 그 이외의 경우, 상대 경로를 명시하여야 한다.

@Component 데코레이터 영역
: @Component 데코레이터에는 <strong>메타데이터</strong> 객체를 인자로 전달한다. 메타데이터 객체는 컴포넌트 생성에 필요한 정보(셀렉터, 템플릿, 스타일 정의 등)를 담고 있는 객체이다. 예를 들어 메타데이터 객체의 templateUrl 프로퍼티에는 컴포넌트의 뷰를 정의한 <strong>템플릿</strong>의 상대경로를 설정한다.

컴포넌트 클래스 영역
: 컴포넌트 뷰를 관리하기 위한 로직을 담은 클래스를 정의한다. 컴포넌트 클래스는 컴포넌트의 내부 관심사인 뷰의 관리에 집중해야 하며 애플리케이션 공통 관심사는 서비스로 분리하여야 한다.

@Component 데코레이터 바로 아래에는 반드시 컴포넌트 클래스를 위치시켜야 한다. @Component 데코레이터는 자신의 바로 아래에 위치한 클래스를 컴포넌트 클래스로 인식한다. 따라서 데코레이터와 데코레이터가 장식하는 클래스 사이에는 아무 것도 존재해서는 않된다.
{: .info}

## 2.2 컴포넌트의 기본 동작 구조

@Component 데코레이터의 templateUrl 프로퍼티에 설정된 템플릿 src/app/app.component.html을 살펴보자.

```html
...
  <h1>
    Welcome to {{ "{{ title " }}}}!
  </h1>
...
```

템플릿은 컴포넌트의 뷰를 정의하기 위해 HTML과 Angular 고유의 템플릿 문법(Template Syntax)으로 작성한다. `{{ "{{ title " }}}}`은 템플릿 문법 중 하나인 인터폴레이션(Interpolation)으로 컴포넌트 클래스의 데이터를 템플릿에 바인딩한다. 이러한 방식을 <strong>데이터 바인딩(Data Binding)</strong>이라고 한다.

![data binding](./img/data-binding.png)

데이터 바인딩(Data Binding)
{: .desc-img}

컴포넌트는 데이터 바인딩에 의해 템플릿과 컴포넌트 클래스의 데이터를 유기적으로 연계한다. 기본적인 동작 구조는 아래와 같다.

![component](./img/component.png)

컴포넌트의 기본 동작 구조
{: .desc-img}

템플릿
: 컴포넌트의 뷰를 생성하기 위해 HTML과 Angular의 고유한 템플릿 문법(Template Syntax)으로 작성된 코드이다.

메타데이터 객체
: 컴포넌트 설정 정보를 담고 있는 객체이다. @Component 데코레이터는 메타데이터 객체를 인자로 전달받아서 컴포넌트 클래스에 반영한다.

컴포넌트 클래스
: 컴포넌트의 뷰를 생성하는 템플릿의 상태(state)를 관리한다. 데이터 바인딩(Data Binding)을 통해 템플릿에 필요한 데이터를 제공하거나 템플릿에서 발생한 이벤트를 처리한다.

# 3. 컴포넌트 작성 실습

새로운 컴포넌트를 작성하면서 컴포넌트의 구조와 역할에 관하여 좀 더 자세히 알아보도록 하자.

hello 프로젝트에 새로운 컴포넌트를 추가해 보자. `ng generate component(축약형 ng g c)` 명령어로 컴포넌트를 간단히 추가할 수 있으나 과정을 알아보기 위해 직접 파일을 생성하여 추가하도록 한다.

새로운 컴포넌트를 위해 src/app 폴더 아래 hello 폴더를 생성한다. 컴포넌트는 화면 전환(라우팅)의 단위가 되기 때문에 폴더로 구분하는 것이 바람직하다. hello 폴더를 추가하고 폴더 내에 hello.component.ts 파일을 생성한다.

![hello-component](/img/hello-component.png)

hello.component.ts 파일 생성
{: .desc-img}

## 3.1 네이밍 컨벤션

네이밍 컨벤션(Naming convention)은 유지 보수와 가독성을 위해 매우 중요하다. 혼란을 방지하고 원하는 파일을 한눈에 찾기 위해서 네이밍 컨벤션은 일관성을 확보할 필요가 있다. [Angular Style Guide](https://angular.io/styleguide)에서 권장하는 네이밍 패턴은 아래와 같다.

```
기능을 명확히 설명하는 구성요소의 이름.구성요소 타입.ts
```

예를 들어 할일관리 애플리케이션의 할일 리스트를 위한 컴포넌트를 생성하는 경우, 아래와 같이 파일명을 작성한다. 구성요소 이름이 여러 단어로 구성되는 경우, 하이픈으로 구별된 케밥 표기법(kebab-case) 명칭을 사용하는 것이 좋다.

```
todo-list.component.ts
```

## 3.2 컴포넌트 클래스

src/app/hello/hello.component.ts 파일을 아래와 같이 수정하여 컴포넌트 클래스를 정의한다. 컴포넌트 클래스에는 컴포넌트 뷰를 관리하기 위한 로직을 정의한다. 컴포넌트 클래스의 이름은 파일명을 기반으로 카멜 표기법(camelCase)에 따라 명명한다.

```typescript
export class HelloComponent {}
```

선언한 클래스를 모듈화하여 외부에 공개하기 위해 export 키워드를 사용하였다. TypeScript는 [ECMAScript6 Module](./es6-module)을 지원하며 export 키워드가 선언된 파일을 모듈로 간주한다.

ES6의 모듈과 Angular의 모듈은 다른 개념이므로 혼동에 주의하도록 하자.

ES6의 모듈
: 애플리케이션을 구성하는 개별적 요소를 말한다. 일반적으로 모듈은 파일 단위로 분리되어 있으며 필요에 따라 애플리케이션은 명시적으로 모듈을 로드한다. 모듈은 애플리케이션에 분리되어 개별적으로 존재하다가 애플리케이션의 로드에 의해 비로소 애플리케이션의 일원이 된다. 모듈은 기능별로 분리되어 작성되므로 개발 효율성과 유지 보수성의 향상을 기대할 수 있다.

Angular의 모듈(NgModule)
: 관련된 Angular 구성 요소를 하나로 묶어 애플리케이션을 구성하는 하나의 단위로 만드는 역할을 한다. 컴포넌트, 디렉티브, 서비스 등의 Angular 구성요소는 모듈에 등록되어야 사용할 수 있다. Angular의 모듈은 이후에 자세히 살펴볼 것이다.

현재 HelloComponent 클래스는 컴포넌트 클래스가 아니라 아직 일반 클래스인 상태이다. 따라서 일반 클래스인 HelloComponent를 컴포넌트화할 필요가 있다.

## 3.3 @Component 데코레이터

일반 클래스를 컴포넌트화하기 위해서는 @Component 데코레이터를 해당 클래스 바로 앞에서 호출하여 Angular에게 해당 클래스가 일반 클래스가 아니라 컴포넌트 클래스임을 알려야 한다. @Component 데코레이터는 자신의 바로 아래에 있는 클래스를 컴포넌트 클래스로 인식한다.

```typescript
@Component()
export class HelloComponent {}
```

데코레이터(Decorator)는 현재 ECMAScript7 Stage-2(Draft, 초안) 단계에 있는 스펙이다. 데코레이터는 함수로서 런타임에 호출되며 데코레이팅된 클래스(데코레이터 바로 아래에 선언된 클래스)의 생성자(constructor)를 변경할 수 있다.

<!--@Component는 클래스 데코레이터로서 클래스 데코레이터는 클래스 <strong>constructor에 적용</strong>되며 클래스 정의를 관찰, 수정 또는 대체하는 데 사용할 수 있다. 클래스 데코레이터에 대한 표현식은 런타임에 함수로 호출되며 데코 레이팅 된 클래스의 생성자가 유일한 인수로 호출된다. 클래스 데코레이터가 새로운 생성자 함수를 반환하면 클래스 생성자 함수를 변경한다.-->

Angular에서 데코레이터는 중요한 개념으로 사용된다. Angular는 아래와 같이 4가지 유형의 데코레이터를 제공한다.

클래스 데코레이터
: @Component, @NgModule, @Directive, @Injectable, @Pipe

프로퍼티 데코레이터
: @Input, @Output, @ViewChild, @ViewChildren, @ContentChild, @ContentChildren, @HostBinding

메소드 데코레이터
: @HostListener

파라미터 데코레이터
: @Inject

각각의 데코레이터에 대해서는 이후에 자세히 살펴보도록 하고 우선은 @Component 데코레이터에 집중하도록 하자.

## 3.4 Angular 라이브러리 모듈 임포트

[@Component](https://angular.io/api/core/Component) 데코레이터는 Angular core 패키지에 정의되어 있다. import 키워드를 사용하여 Angular core 패키지를 임포트한다. Angular 라이브러리 모듈의 경우 @가 붙어있으며 경로를 명시하지 않는다.

```typescript
import { Component } from '@angular/core';

@Component()
export class HelloComponent {}
```

@angular/core 패키지에는 Component 이외에도 수많은 모듈로 구성되어 있다. ES6의 [객체 디스트럭처링 (Object destructuring)](./es6-destructuring#2-객체-디스트럭처링-object-destructuring)을 사용하여 필요한 모듈만을 임포트한다.

## 3.5 메타데이터

일반 클래스를 컴포넌트화하기 위해서는 @Component 데코레이터를 해당 클래스 바로 앞에서 호출하여 Angular에게 해당 클래스가 일반 클래스가 아니라 컴포넌트 클래스임을 알려야 한다. @Component 데코레이터의 또 하나의 역할은 컴포넌트 설정 정보를 담고 있는 메타데이터 객체를 인자로 전달받아서 컴포넌트 클래스에 반영하는 것이다. @Component 데코레이터에게 전달할 메타데이터 객체의 중요 프로퍼티는 아래와 같다.

### 3.5.1 seletor 프로퍼티

seletor는 컴포넌트의 뷰를 마크업으로 표현할 때 사용하는 이름으로 템플릿에서 HTML 요소의 태그 이름처럼 사용한다. Angular는 다른 애플리케이션의 selector 또는 HTML 요소와 충돌을 방지하기 위해 접두사(prefix)를 추가하여 케밥 표기법(예를 들어 app-todo)으로 seletor를 명명하도록 권장하고 있다. 기본 접두사는 app이며 이것은 angular.json에서 확인할 수 있다. 프로젝트의 성격에 맞추어 독자적인 접두사를 사용하는 것이 좋으나 우선은 기본 접두사인 app을 사용하도록 한다.

메타데이터 객체에 selector 프로퍼티를 추가해 보자.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello'
})
export class HelloComponent {}
```

hello 컴포넌트는 다른 컴포넌트의 템플릿에서 아래와 같이 HTML 요소처럼 사용하여 컴포넌트의 뷰를 호출한다. 이때 호출된 컴포넌트 HelloComponent는 호출한 컴포넌트의 자식 컴포넌트가 된다.

```html
<app-hello></app-hello>
```

### 3.5.2 template/templateUrl 프로퍼티

hello 컴포넌트에는 아직 뷰가 존재하지 않는다. 컴포넌트는 화면을 구성하는 뷰를 생성하고 관리하는 것이 역할이므로 반드시 뷰를 가져야 한다. 컴포넌트의 뷰는 template 또는 templateUrl 프로퍼티에 선언하며 이것을 템플릿이라 부른다.

메타데이터 객체에 templateUrl 프로퍼티를 추가해 보자.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html'
})
export class HelloComponent {}
```

templateUrl 프로퍼티에는 외부 파일로 작성한 템플릿의 상대 경로를 지정한다. 외부 파일로 작성한 템플릿(src/app/hello/hello.component.html)은 아래와 같다.

```html
<h2>안녕하세요 {{ "{{name" }}}}</h2>
<input type="text" placeholder="이름을 입력하세요" #inputYourName>
<button (click)="setName(inputYourName.value)">등록</button>
```

아직 살펴보지 않은 템플릿 문법이 포함되어 있지만 일단은 템플릿을 선언하는 방법에만 집중하도록 하자.

템플릿을 외부 파일로 분리하는 것은 관심사가 다른 뷰(템플릿)와 로직(컴포넌트 클래스)을 분리한다는 측면에서 바람직하다. 템플릿이 간단한 경우, 위와 같이 템플릿을 외부 파일로 작성하지 않고 메타데이터 객체의 template 프로퍼티에 문자열의 형태로 직접 기술할 수도 있다. 이것을 인라인 템플릿(Inline template)이라 한다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `
    <h2>안녕하세요 {{ "{{name" }}}}</h2>
    <input type="text" placeholder="이름을 입력하세요" #inputYourName>
    <button (click)="setName(inputYourName.value)">등록</button>
  `
})
export class HelloComponent {}
```

template 프로퍼티는 프로퍼티값으로 문자열을 취하는데 백틱(backtick) 문자 `` ` ``를 사용하였다. 이것은 ECMAScript6에서 도입된 새로운 문자열 표기법인 [템플릿 문자열(template string) 표기법](./es6-template-string)으로 일반적인 문자열과 달리 줄바꿈과 들여쓰기 등 템플릿 문자열 내의 모든 화이트스페이스(white-space)가 있는 그대로 적용된다.

### 3.5.3 styles/styleUrls 프로퍼티

styles/styleUrls 프로퍼티에는 템플릿을 위한 스타일을 선언한다. 메타데이터 객체에 styleUrls 프로퍼티를 추가하여 보자.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {}
```

templateUrl 프로퍼티와 마찬가지로 외부 파일로 정의된 스타일을 사용하는 경우 styleUrls 프로퍼티를 사용한다.

styleUrls 프로퍼티에는 외부 파일로 작성한 CSS 파일의 상대 경로를 배열로 지정한다. 배열로 상대경로를 지정하기 때문에 아래와 같이 여러 개의 CSS 파일을 한꺼번에 지정할 수 있다.

```typescript
@Component({
  styleUrls: [
    './base.component.css',
    './main.component.css',
    './page.component.css'
  ]
})
```

외부 파일로 작성한 템플릿(src/app/hello/hello.component.css)은 아래와 같다.

```css
h2 {
  color: #673ab7;
}
input[type=text] {
  width: 200px;
  height: 25px;
  padding-left: 10px;
  margin-top: 10px;
  border: solid 1px #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}
button {
  height: 25px;
  width: 40px;
  background-color: #fff;
  border: solid 1px #ccc;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  vertical-align: middle;
}
button:hover {
  background-color: #e6e6e6;
  border-color: #adadad;
}
```

위와 같이 CSS를 외부 파일로 작성하지 않고 메타데이터 객체의 styles 프로퍼티에 문자열의 형태로 직접 기술할 수도 있다. 이것을 인라인 스타일(Inline style)이라 한다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `
    <h2>안녕하세요 {{ "{{name" }}}}</h2>
    <input type="text" placeholder="이름을 입력하세요" #inputYourName>
    <button (click)="setName(inputYourName.value)">등록</button>
  `,
  styles: [`
    h2 {
      color: #673ab7;
    }
    input[type=text] {
      width: 200px;
      height: 25px;
      padding-left: 10px;
      margin-top: 10px;
      border: solid 1px #ccc;
      border-radius: 4px;
      outline: none;
      box-sizing: border-box;
    }
    button {
      height: 25px;
      width: 40px;
      background-color: #fff;
      border: solid 1px #ccc;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
      box-sizing: border-box;
      vertical-align: middle;
    }
    button:hover {
      background-color: #e6e6e6;
      border-color: #adadad;
    }
  `]
})
export class HelloComponent {}
```

지금까지 템플릿에 스타일을 적용하는 방법을 알아보았다. hello 컴포넌트의 경우 템플릿과 스타일 모두 간단하므로 한눈에 알아보기 좋게 인라인 방식으로 진행하도록 하자.

컴포넌트 스타일은 해당 컴포넌트만을 위한 것이다. 즉, 컴포넌트 스타일의 CSS 셀렉터는 해당 컴포넌트의 템플릿 내에서만 적용된다. 위의 예제에서 h2 셀렉터는 hello 컴포넌트의 템플릿 내부에 있는 h2 요소만을 선택하고 다른 컴포넌트에 속해 있는 h2 요소는 선택하지 않는다. 이와 같은 특성은 웹 컴포넌트의 Shadow DOM을 구현한 것으로 컴포넌트의 DOM을 캡슐화(Encapsulation)하여 외부로부터의 간섭을 제어한다. 이것은 마치 변수의 스코프와 유사하다. 기존 CSS는 전역 변수와 같이 동작하지만 컴포넌트의 CSS는 지역 변수와 같이 동작한다.
{: .info}

## 3.6 컴포넌트 클래스와 템플릿의 연동

이제 컴포넌트 클래스에 로직을 추가한다. 클래스는 하나의 클래스 프로퍼티와 하나의 메소드를 갖는다.

```typescript
...
export class HelloComponent {
  name: string;

  setName(name: string) {
    this.name = name;
  }
}
```

컴포넌트 클래스는 템플릿의 상태(state)를 관리한다. 데이터 바인딩(Data Binding)을 통해 템플릿에 데이터를 제공하거나 템플릿에서 발생한 이벤트를 처리한다.

위 코드를 좀 더 자세히 알아보자.

![template-class](./img/template-class.png)

컴포넌트 클래스와 템플릿의 연동
{: .desc-img}

1. #inputYourName은 템플릿 참조 변수(Template reference variable)이다. 템플릿 참조 변수는 템플릿 내의 DOM 요소에 대한 참조로서 템플릿 내에서 변수처럼 사용한다. inputYourName.value 즉 input 요소의 value를 취득하여 클릭 이벤트 핸들러 setName의 인자로 전달한다.

2. 클릭 이벤트가 발생하면 컴포넌트 클래스에 정의된 이벤트 핸들러 setName을 호출한다. 이때 인자로 전달된 input 요소의 value가 컴포넌트 클래스의 name 프로퍼티에 저장된다. (click)은 이벤트 바인딩(Event binding)이라 하며 click 이벤트 발생 시 핸들러 함수를 호출한다.

3. 컴포넌트 클래스의 name 프로퍼티에 저장된 input 요소의 value는 템플릿 문법인 인터폴레이션에 의해 h2 요소에 삽입된다.

이제 hello 컴포넌트의 작성이 완성되었다. 하지만 hello 컴포넌트를 사용하기 위해서는 몇 가지 작업이 필요하다.

## 3.7 컴포넌트의 호출

루트 컴포넌트의 경우, 루트 모듈이 부트스트랩하기 때문에 애플리케이션이 실행되면 루트 컴포넌트의 뷰가 브라우저에 표시된다. 하지만 루트 컴포넌트가 아닌 컴포넌트는 다른 컴포넌트의 호출에 의해 브라우저에 렌더링된다.

컴포넌트를 호출하는 방법은 앞서 살펴본 바와 같이 호출하고자 하는 컴포넌트의 selector를 호출하는 컴포넌트의 템플릿에 포함하는 것이다. 이때 호출된 컴포넌트는 호출한 컴포넌트의 자식 컴포넌트가 된다.

현재 hello 컴포넌트는 어떠한 컴포넌트에서도 호출하고 있지 않다. hello 컴포넌트를 루트 컴포넌트인 app 컴포넌트가 호출하도록 하자. 루트 컴포넌트의 템플릿(src/app/app.component.html)을 아래와 같이 수정한다.

```html
<app-hello></app-hello>
```

이로써 hello 컴포넌트는 루트 컴포넌트의 자식 컴포넌트가 되었다. 컴포넌트 간의 부모-자식 관계는 데이터와 이벤트가 왕래하는 정보 흐름의 통로가 되며, 이를 통해 상태 공유가 이루어지기 때문에 컴포넌트 간의 부모-자식 관계는 Angular 애플리케이션에서 중요한 의미를 갖는다. 루트 컴포넌트이면서 hello 컴포넌트의 부모 컴포넌트인 루트 컴포넌트는 아무런 뷰도 가지지 않고 단지 자식 컴포넌트 hello을 호출하고 있다.

## 3.8 모듈에 컴포넌트 등록

마지막으로 hello 컴포넌트를 모듈에 등록한다. 모듈은 관련된 Angular 구성 요소를 하나로 묶어 애플리케이션을 구성하는 하나의 단위로 만드는 역할을 한다. 컴포넌트, 디렉티브, 파이프, 서비스 등의 Angular 구성요소는 모듈에 등록되어야 사용할 수 있다. 단 ng g c 명령어로 컴포넌트를 추가했을 경우, 추가된 컴포넌트는 자동으로 모듈에 등록된다.

루트 모듈인 app 모듈(src/app/app.module.ts)을 아래와 같이 수정한다.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component'; // 1

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent // 2
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

우선 1)과 같이 hello 컴포넌트의 컴포넌트 클래스를 임포트한다. 그 후 2)와 같이 @NgModule 데코레이터에 인자로 전달되는 메타데이터의 declarations 프로퍼티에 컴포넌트 클래스 HelloComponent를 선언한다.

declarations 프로퍼티에는 모듈에 소속될 구성요소(컴포넌트, 디렉티브, 파이프)의 리스트를 지정한다. 모듈은 이후에 자세히 살펴보도록 하고 이번에는 @NgModule 데코레이터에 인자로 전달하는 메타데이터 객체의 중요 프로퍼티만 간단히 알아보도록 하자.

| 프로퍼티       | 내용
|:-------------|-----------------------
| providers    | 주입 가능한 객체(injectable object) 즉 서비스의 리스트를 선언한다. 루트 모듈에 선언된 서비스는 애플리케이션 전역에서 사용할 수 있다.
| declarations | 컴포넌트, 디렉티브, 파이프의 리스트를 선언한다.
| imports      | 의존 관계에 있는 Angular 라이브러리 모듈, 기능 모듈(Feature module)이라 불리는 하위 모듈, 라우팅 모듈, 서드 파티 모듈을 선언한다.
| bootstrap    | 애플리케이션의 진입점(entry point)인 루트 컴포넌트를 선언한다.

이제 프로젝트를 실행하여 보자.

```bash
$ ng serve
```

![viewing-hello-component](/img/viewing-hello-component.png)

hello 프로젝트의 실행 결과
{: .desc-img}

<iframe src="https://stackblitz.com/edit/angular-my-first-component?ctl=1&embed=1&hideNavigation=1&file=src/app/hello/hello.component.ts" frameborder="0" width="100%" height="500"></iframe>

# Reference

* [Web Component](https://www.webcomponents.org/introduction#what-are-web-components-)

* [Angular](https://angular.io/)

* [Angular Style Guide](https://angular.io/styleguide)

* [Angular Template Syntax](https://angular.io/guide/template-syntax)
