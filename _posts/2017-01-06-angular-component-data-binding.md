---
layout: post
title: Angular Component - <strong>Data Binding</strong>
subtitle: 데이터 바인딩
categories: angular
section: angular
description: 구조화된 웹 애플리케이션을 구축하기 위해서는 뷰와 모델의 분리가 필수적이다. 하지만 분리된 뷰와 모델은 유기적으로 동작하여야 한다. 데이터 바인딩은 이러한 모순의 해결을 가능하게 한다. 데이터 바인딩은 뷰와 모델을 하나로 연결하는 것을 의미한다. Angular의 데이터 바인딩은 템플릿(View)과 컴포넌트 클래스의 데이터(Model)를 하나로 묶어 유기적으로 동작하게 하는 것을 말한다. 이는 템플릿의 정적 HTML에 컴포넌트의 동적 데이터를 하나로 묶어 브라우저에 표시할 완성된 뷰를 만들기 위함이다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 데이터 바인딩(Data binding)이란?

구조화된 웹 애플리케이션을 구축하기 위해서는 뷰와 모델의 분리가 필수적이다. 하지만 분리된 뷰와 모델은 유기적으로 동작하여야 한다. 데이터 바인딩은 이러한 모순을 해결해준다.

데이터 바인딩은 뷰와 모델을 하나로 연결하는 것을 의미한다. Angular의 데이터 바인딩은 템플릿(View)과 컴포넌트 클래스의 데이터(Model)를 하나로 묶어 유기적으로 동작하게 하는 것을 말한다. 이는 템플릿의 정적 HTML에 컴포넌트의 동적 데이터를 하나로 묶어 브라우저에 표시할 완성된 뷰를 만들기 위함이다.

jQuery를 사용하는 웹 애플리케이션의 경우를 살펴보자.

![procedural-programming](./img/procedural-programming.png)

jQuery에 의한 DOM 조작(Procedural programming)
{: .desc-img}

위의 예제의 경우, DOM에 접근하고 조작하는 코드를 작성해야 한다. 이를 위해 자바스크립트는 DOM의 구조를 파악하고 있어야 하며, 이 구조가 변경되면 자바스크립트 로직도 변경되어야 한다. 예를 들어 h1 요소가 p 요소로 변경되면 자바스크립트 로직도 변경이 필요하다.

이와 같이 기존의 웹 애플리케이션은 자바스크립트 DOM API를 사용하여 DOM을 직접 조작(Manipulation)하는 방식이기 때문에 뷰와 모델 간의 관계를 느슨하게 결합하기 어려운 구조를 갖는다. <strong>이와 같은 구조 상 문제로 뷰가 변경되면 로직도 변경될 가능성이 매우 높다.</strong>

하지만 Angular는 DOM에 직접 접근하지 않고 템플릿과 컴포넌트 클래스의 상호 관계를 선언하는 방식(선언형 프로그래밍: Declarative programming)으로 뷰와 모델의 관계를 관리한다. 이때 사용되는 것이 <strong>데이터 바인딩</strong>이며 이를 통해 템플릿과 컴포넌트 클래스는 연결된다. 데이터 바인딩은 <strong>템플릿 문법</strong>으로 기술된다. HTML과 템플릿 문법으로 기술된 템플릿은 JIT 또는 AOT 컴파일러에 의해 브라우저가 이해할 수 있는 자바스크립트로 컴파일된다. Angular 웹 애플리케이션의 경우를 살펴보자.

![declarative-programming](./img/declarative-programming.png)

데이터 바인딩에 의한 템플릿과 컴포넌트 클래스의 연결(Declarative programming)
{: .desc-img}

위의 예제의 경우, 템플릿에서 직접 컴포넌트 클래스의 프로퍼티를 참조하기 때문에 DOM에 접근하고 조작하는 코드를 작성할 필요가 없다. 따라서 컴포넌트 클래스는 DOM의 구조를 파악하고 있을 필요가 없으며 템플릿이 변경되어도 컴포넌트 클래스를 변경할 필요가 없다. 예를 들어 h1 요소가 p 요소로 변경되어도 컴포넌트 클래스는 변경이 필요 없다.

Angular의 데이터 바인딩은 뷰와 모델의 관계를 기존의 웹 애플리케이션 방식보다 느슨하게 결합하므로 뷰와 모델을 보다 깔끔하게 분리할 수 있을 뿐만 아니라 기존의 웹 애플리케이션 개발 방식보다 간결한 코드로 개발이 가능하다.

# 2. 변화 감지(Change detection)

변화 감지란 뷰와 모델의 동기화를 유지하기 위해 상태의 변화를 감지하고 이를 반영하는 것을 말한다. 즉, 상태의 변화를 감지하여 뷰에 반영하는 것으로 데이터 바인딩은 변화 감지 매커니즘의 토대 위에서 수행된다.

AngularJS는 양방향 바인딩(Two-way binding)만을 지원하였고 AngularJS에서 제공하는 ng-click과 같은 이벤트만을 사용하여야 하는 등 제약이 있었다. 하지만 Angular는 양방향 바인딩과 단방향 바인딩(One-way binding)을 모두 지원하며 [zone.js](https://github.com/angular/zone.js/) 라이브러리를 사용하여 네이티브 DOM 이벤트를 사용하여도 변화 감지가 수행되도록 개선되었다.

사실 Angular는 [양방향 바인딩](./angular-component-template-syntax#17-양방향-데이터-바인딩two-way-binding)을 지원하지 않는다. 양방향 바인딩을 위한 템플릿 문법 `[()]`(이것을 Banana in a box라고 부른다)에서 추측할 수 있듯이 양방향 바인딩은 이벤트 바인딩과 프로퍼티 바인딩의 축약 표현(Shorthand syntax)일 뿐이다. 즉, 양방향 바인딩의 실제 동작은 이벤트 바인딩과 프로퍼티 바인딩의 조합으로 이루어진다.
{: .info}

변화 감지의 작동 원리에 대해 간단히 살펴보자.

뷰의 상태 변화는 DOM 이벤트를 캐치하는 것으로 감지할 수 있다. 하지만 모델은 HTML 요소가 아니므로 이벤트가 발생하지 않는다. 따라서 모델의 변화 감지를 위해서는 별도의 조치가 필요하다. 모델이 변경된다는 것은 컴포넌트 클래스의 프로퍼티 값이 변경되는 것을 의미한다.

![change detection](./img/change-detection.png)

변화 감지
{: .desc-img}

위 예제에서 클릭 이벤트에 의해 컴포넌트 클래스의 name 프로퍼티 값이 변화하였다. 이와 같이 컴포넌트 클래스의 프로퍼티 값이 변경되는 상황, 즉 어떤 경우 모델이 변화하는지에 Angular는 주목한다.

사실 모델이 변화할 가능성이 있는 경우는 그다지 많지 않다.

- DOM 이벤트(click, key press, mouse move 등)

- Timer(setTimeout, setInterval)의 tick 이벤트

- Ajax 통신 / Promise

위와 같은 <strong>비동기 처리</strong>가 수행될 때 컴포넌트 클래스의 데이터가 변경될 수 있다. 변화 감지는 모델이 변화할 수 있는 이러한 상황들을 감시한다.

이를 위해 zone.js는 addEventListener, Timer 함수, XMLHttpRequest, Promise 등을 [몽키패치](https://en.wikipedia.org/wiki/Monkey_patch)한다.

```javascript
// node_modules/zone.js/dist/zone.js
function zoneAwareAddEventListener() {...}
function zoneAwareRemoveEventListener() {...}
function patchTimer() {...}
function zoneAwarePromise() {...}
...

window.prototype.addEventListener = zoneAwareAddEventListener;
window.prototype.removeEventListener = zoneAwareRemoveEventListener;
window.prototype.promise = zoneAwarePromise;
window.prototype.setTimeout = patchTimeout;
...
```

zone.js는 위의 같이 일부 함수를 프록시(Proxy)로 재정의하여 대체한다. 즉, 이벤트 또는 Promise가 프록시로 랩핑되는데 이러한 개념을 몽키패치라고 한다.

모델을 변화시킬 수 있는 비동기 처리가 호출되면 패치를 통해 호출을 후킹한다. 비동기 처리 호출을 후킹할 수 있다는 것은 변화를 감지할 수 있다는 의미이다. 이 후킹 로직 내에서 변화 감지를 수행하고 변화가 감지될 때마다 Digest loop를 실행하여 모델의 변화를 뷰에 반영한다.

<!--
```javascript
// addEventListener 몽키패치 예제
function addEventListener(eventName, callback) {
  // addEventListener 원본 호출
  callRealAddEventListener(eventName, function() {
    // addEventListener 원본의 콜백 호출
    callback(...);
    // 변화 감지
    var changed = angular2.runChangeDetection();
    // 변화가 있으면 리렌더링 실시
    if (changed) {
      angular2.reRenderUIPart();
    }
  });
}
```
-->

# 3. 데이터 바인딩

Angular는 단방향 데이터 바인딩(One-way data binding)과 양방향 데이터 바인딩(Two-way data binding)을 지원한다. 기존 웹 프로그래밍에서 사용하는 DOM 조작 방식보다 간편하게 데이터를 가져와서 뷰에 표현할 수 있다.

Angular는 아래와 같이 7가지 데이터 바인딩을 제공한다.

| 데이터 바인딩       | 데이터의 흐름          | 문법
|:-----------------|:-------------------|:---------------
| 인터폴레이션        | 컴포넌트 클래스 ⟹ 템플릿 | {{ "{{ expression " }}}}
| 프로퍼티 바인딩      | 컴포넌트 클래스 ⟹ 템플릿 | [property]="expression"
| 어트리뷰트 바인딩    | 컴포넌트 클래스 ⟹ 템플릿 | [attr.attribute-name]="expression"
| 클래스 바인딩       | 컴포넌트 클래스 ⟹ 템플릿 | [class.class-name]="expression"
| 스타일 바인딩       | 컴포넌트 클래스 ⟹ 템플릿 | [style.style-name]="expression"
| 이벤트 바인딩       | 컴포넌트 클래스 ⟸ 템플릿 | (event)="statement"
| 양방향 데이터 바인딩  | 컴포넌트 클래스 ⟺ 템플릿 | [(ngModel)]="property"

## 3.1 인터폴레이션(Interpolation)

표현식을 두 개의 중괄호로 열고닫은 형식을 인터폴레이션이라 한다. 인터폴레이션은 단방향 데이터 바인딩에 사용되는 템플릿 문법으로 표현식의 평가 결과를 문자열로 변환하여 템플릿에 바인딩한다.

```html
{{ "{{ expression " }}}}
```

표현식(Expression)은 값, 변수, 연산자의 조합이며 이 조합은 연산을 통해 하나의 값을 만든다. 즉 표현식은 하나의 값으로 평가될 수 있는 식이다. 템플릿에서 사용하는 표현식에는 대입 연산자(=, +=, -=), 증감 연산자(++, \-\-), 비트 연산자(\|, &), 객체 생성 연산자(new)와 같이 템플릿에서 컴포넌트 클래스의 프로퍼티를 변경할 있는 연산은 금지된다. 이는 인터폴레이션 뿐만 아니라 템플릿에서 사용하는 모든 표현식에 적용된다.
{: .info}

인터폴레이션의 사용 예는 아래와 같다.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <p>name: {{ "{{ name " }}}}</p>
    <p>age: {{ "{{ age " }}}}</p>
    <p>admin: {{ "{{ admin " }}}}</p>
    <p>address: {{ "{{ address.city " }}}} {{ "{{ address.country " }}}}</p>
    <p>gender: {{ "{{ gender " }}}}</p>
    <p>sayHi(): {{ "{{ sayHi() " }}}}</p>
    <p>age * 10: {{ "{{ age * 10 " }}}}</p>
    <p>age > 10: {{ "{{ age > 10 " }}}}</p>
    <p>'stirng': {{ "{{ 'stirng' " }}}}</p>
  `
})
export class AppComponent {
  name = 'Angular';
  age = 20;
  admin = true;
  address = {
    city: 'Seoul',
    country: 'Korea'
  };

  sayHi() {
    return `Hi! my name is ${ this.name }.`;
  }
}
```

컴포넌트 클래스의 프로퍼티가 문자열이 아닌 경우 문자열로 변환되며 존재하지 않는 프로퍼티에 접근하는 경우(위 예제의 gender) 에러 발생 없이 아무것도 출력하지 않는다.

<iframe src="https://stackblitz.com/edit/template-interpolation?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 3.2 프로퍼티 바인딩(Property binding)

프로퍼티 바인딩은 컴포넌트 클래스의 프로퍼티와 템플릿 간의 단방향 데이터 바인딩에 사용되는 템플릿 문법으로 표현식의 평가 결과를 HTML 요소의 DOM 프로퍼티에 바인딩한다.

```html
<element [property]="expression">...</element>
```

DOM 프로퍼티(Property)는 HTML 요소의 어트리뷰트(Attribute)와는 다른 것이다. 브라우저는 HTML 문서를 파싱하고 DOM 트리로 변환하여 메모리에 적재한다. 이때 HTML 요소는 DOM 노드 객체로, HTML 어트리뷰트는 DOM 노드 객체의 프로퍼티가 된다. DOM 프로퍼티는 DOM 노드 객체가 갖는 프로퍼티를 말하며, HTML 어트리뷰트는 HTML 요소가 갖는 어트리뷰트(속성)을 말한다. 아래의 '어트리뷰트 바인딩'에서 자세히 살펴볼 것이다.
{: .info}

프로퍼티 바인딩의 사용 예는 아래와 같다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- input 요소의 value 프로퍼티에 컴포넌트 클래스의 name 프로퍼티 값을 프로퍼티 바인딩 -->
    <input type="text" [value]="name">

    <!-- p 요소의 innerHTML 프로퍼티에 컴포넌트 클래스의 contents 프로퍼티 값을 프로퍼티 바인딩 -->
    <p [innerHTML]="contents"></p>

    <!-- img 요소의 src 프로퍼티에 컴포넌트 클래스의 imageUrl 프로퍼티 값을 프로퍼티 바인딩 -->
    <img [src]="imageUrl"><br>

    <!-- button 요소의 disabled 프로퍼티에 컴포넌트 클래스의 isUnchanged 프로퍼티 값을 프로퍼티 바인딩 -->
    <button [disabled]="isDisabled">disabled button</button>
  `
})
export class AppComponent {
  name = 'ungmo2';
  contents = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
  imageUrl = 'https://via.placeholder.com/350x150';
  isDisabled = true;
}
```

<iframe src="https://stackblitz.com/edit/template-property-binding?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

인터폴레이션은 템플릿의 어디에서도 사용할 수 있다. 인터폴레이션은 순수한 문자열을 반환하므로 HTML 콘텐츠로 사용할 수도 있고 HTML 어트리뷰트의 값으로 사용할 수도 있다.

```html
<p>{{ "{{ contents " }}}}</p>
```

Angular는 뷰를 렌더링하기 이전에 인터폴레이션을 프로퍼티 바인딩으로 변환한다. 사실 인터폴레이션은 프로퍼티 바인딩의 Syntactic sugar인 것이다. 위 코드는 아래의 코드와 동일하게 동작한다.

```html
<p [innerHTML]="contents"></p>
```

프로퍼티 바인딩에는 객체를 포함한 모든 값을 사용할 수 있다. DOM 노드 객체의 프로퍼티에는 객체를 포함한 모든 값을 할당할 수 있기 때문이다. 이 특성을 이용하여 부모 컴포넌트에서 자식 컴포넌트로 값을 전달하는 경우 프로퍼티 바인딩을 사용한다. 이에 대해서는 [컴포넌트 간의 상태 공유](./angular-component-interaction)에서 자세히 다룬다.

## 3.3 어트리뷰트 바인딩(Attribute binding)

어트리뷰트 바인딩은 컴포넌트 클래스의 프로퍼티와 템플릿 간의 단방향 데이터 바인딩에 사용되는 템플릿 문법으로 표현식의 평가 결과를 HTML 어트리뷰트에 바인딩한다.

```html
<element [attr.attribute-name]="expression">...</element>
```

앞에서 살펴본 프로퍼티 바인딩과 차이점을 이해하기 위해서 HTML 어트리뷰트(attribute)와 DOM 프로퍼티(property)에 대해서 알아보도록 하자. 바인딩이 동작하는 방식을 이해하기 위해서는 HTML의 어트리뷰트와 프로퍼티의 차이를 파악하는 것이 중요하다. 어트리뷰트와 프로퍼티는 모두 속성으로 변역되어 같은 것으로 오해할 수 있으나 이들은 서로 다른 것이다. 어트리뷰트는 HTML 문서에 존재하는 것으로 어트리뷰트의 값은 변하지 않는다. 프로퍼티는 DOM 노드 객체에 있는 것으로 동적으로 변한다.

브라우저는 HTML 문서를 파싱하여 DOM 트리로 변환하고 메모리에 적재한다. 이때 HTML 요소는 DOM 노드 객체로, HTML 어트리뷰트는 DOM 노드 객체의 프로퍼티로 변환된다.

![브라우저 동작 원리](./img/client-server.png)
{: .w-700}

브라우저 동작 원리
{: .desc-img}

예를 들어 아래의 input 요소는 3개의 어트리뷰트를 가지고 있다.

```html
<input id="user" type="text" value="ungmo2">
```

브라우저가 위의 코드를 파싱하면 DOM 노드 객체 HTMLInputElement가 생성되고 이 객체는 다양한 프로퍼티를 소유한다. input 요소의 모든 어트리뷰트는 HTMLInputElement 객체의 `attributes` 프로퍼티로 변환되고 이것은 getAttribute 메소드로 취득 가능하다.

```javascript
document.getElementById('user').getAttribute('value'); // ungmo2
```

![html attributes](./img/html-attributes.png)

HTMLInputElement 객체의 attributes 프로퍼티
{: .desc-img}

DOM 노드 객체의 `attributes` 프로퍼티는 HTML 어트리뷰트의 값을 가지며 그 값은 결코 변하지 않는다. HTML 어트리뷰트는 원래 변하지 않는 초기 기본값을 나타내기 때문이다. 위 input 요소의 value 어트리뷰트는 input 요소의 초기 기본값을 설정한 것으로 사용자의 입력에 의해 상태가 변경된다 하더라도 value 어트리뷰트의 값은 변경되지 않는다. 즉, DOM 노드 객체의 `attributes` 프로퍼티 값 또한 변경되지 않는다.

하지만 DOM은 상태(예를 들어 input 요소에 값을 입력한 상태 또는 checkbox 요소를 체크한 상태)를 가지고 있으며 이 상태는 변화하는 살아있는 것이다. 따라서 DOM 노드 객체는 상태 변화를 관리하기 위한 프로퍼티를 갖는다. 예를 들어 input 요소는 입력값의 상태를 관리하기 위해 value 프로퍼티를 갖는다. 이 value 프로퍼티는 HTML 어트리뷰트의 고정된 값을 관리하는 attributes 프로퍼티와는 달리 상태 변화에 반응한다.

```javascript
// HTMLInputElement.attributes.value의 값을 취득한다. 결과는 언제나 동일하다.
document.getElementById('user').getAttribute('value'); // ungmo2

// HTMLInputElement.value의 값을 취득한다. 결과는 요소의 상태에 따라 동적으로 변경된다.
document.getElementById('user').value;
```

주의하여야 할 것은 HTML 어트리뷰트와 상태 변화를 관리하기 위한 프로퍼티가 언제나 1:1로 매핑되는 것은 아니라는 것이다. 예를 들어 살펴보자.

- id 어트리뷰트와 id 프로퍼티는 1:1 매핑한다.
- class 어트리뷰트는 classList 프로퍼티로 변환된다.
- td 요소의 colspan 어트리뷰트의 경우, 매핑하는 프로퍼티가 존재하지 않는다.
- [textContent](https://developer.mozilla.org/ko/docs/Web/API/Node/textContent) 프로퍼티의 경우, 대응하는 어트리뷰트가 존재하지 않는다.
- input 요소의 value 어트리뷰트는 value 프로퍼티와 1:1 매핑하지만 서로 다르게 동작한다.

id 어트리뷰트는 id 프로퍼티와 1:1 매핑하므로 DOM 노드 객체 HTMLInputElement에는 id 프로퍼티가 생성되고 id 어트리뷰트의 값 'user'가 할당된다. 하지만 value 어트리뷰트는 value 프로퍼티와 1:1 매핑하지만 서로 다르게 동작한다. DOM 노드 객체에 value 프로퍼티가 생성되고 value 어트리뷰트의 값 'ungmo2'가 할당된다. 여기까지는 1:1 매핑하는 id 어트리뷰트와 동일하지만 사용자에 의해 input 요소에 새로운 값이 입력되면 다르게 동작하기 시작한다. 만약 사용자에 의해 "lee"가 입력되면 DOM 노드 객체의 value 프로퍼티는 "lee"로 변경된다. 하지만 value 어트리뷰트는 초기 기본값 "ungmo2"인 상태에서 변경되지 않는다. 이는 HTML 요소가 DOM 노드 객체로 변환된 이후에 HTML 요소의 어트리뷰트는 변하지 않기 때문이다. 하지만 DOM 프로퍼티는 언제든지 바뀔 수 있다. 즉, value의 경우, 어트리뷰트는 DOM 프로퍼티의 초기 기본값을 의미하며 DOM 프로퍼티는 현재의 상태 값을 의미한다.

지금까지 알아본 DOM 프로퍼티와 HTML 어트리뷰트를 차이점을 바탕으로 Angular가 아래의 코드를 어떻게 HTML로 출력할 것인지 예측하여 보자.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- 프로퍼티 바인딩 -->
    <input id="user" type="text" [value]="name">
    <!-- 어트리뷰트 바인딩 -->
    <input id="user" type="text" [attr.value]="name">
  `
})
export class AppComponent {
  name = 'ungmo2';
}
```

<iframe src="https://stackblitz.com/edit/attribute-binding-1?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>

프로퍼티 바인딩은 DOM 노드 객체의 프로퍼티에 컴포넌트 클래스의 프로퍼티 값을 바인딩하고 어트리뷰트 바인딩은 HTML 요소의 어트리뷰트(DOM 노드 객체의 attributes 프로퍼티)에 컴포넌트 클래스의 프로퍼티 값을 바인딩한다.

```javascript
// 프로퍼티 바인딩
document.getElementById('user').value = 'ungmo2';

// 어트리뷰트 바인딩
document.getElementById('user').setAttribute('value', 'ungmo2');
```

따라서 위 컴포넌트는 아래와 같이 변환될 것이다.

```html
<!-- 프로퍼티 바인딩의 변환 결과 -->
<input id="user" type="text">
<!-- 어트리뷰트 바인딩의 변환 결과 -->
<input id="user" type="text" value="ungmo2">
```

또 다른 경우를 살펴보자. td 요소의 colspan 어트리뷰트의 경우, 매핑하는 프로퍼티가 존재하지 않는다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <table>
      <tr>
        <!-- colspan 프로퍼티는 존재하지 않는다. -->
        <td [colspan]="length">A + B</td>
      </tr>
      <tr>
        <td>C</td><td>D</td>
      </tr>
    </table>
  `,
  styles: [`
    table, td {
      width: 200px;
      border: 1px solid black;
      text-align: center;
    }
  `]
})
export class AppComponent {
  length = 2;
}
```

위 코드는 존재하지 않는 DOM 프로퍼티 colspan에 접근하려 하기 때문에 아래와 같은 에러가 발생한다.

```
Unhandled Promise rejection: Template parse errors:
Can't bind to 'colspan' since it isn't a known property of 'td'.
```

이와 같이 경우, 프로퍼티 바인딩 대신 어트리뷰트 바인딩을 사용한다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <table>
      <tr>
        <!-- colspan 프로퍼티는 존재하지 않기 때문에 어튜리뷰트 바인딩을 사용한다. -->
        <td [attr.colspan]="length">A + B</td>
      </tr>
      <tr>
        <td>C</td><td>D</td>
      </tr>
    </table>
  `,
  styles: [`
    table, td {
      width: 200px;
      border: 1px solid black;
      text-align: center;
    }
  `]
})
export class AppComponent {
  length = 2;
}
```

<iframe src="https://stackblitz.com/edit/attribute-binding-2?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

이와 같이 DOM의 프로퍼티는 HTML 요소의 어트리뷰트와는 다르게 동작하기 때문에 프로퍼티 바인딩과 어트리뷰트 바인딩은 구분되어 사용하여야 한다.

## 3.4 클래스 바인딩(Class binding)

클래스 바인딩(Class binding)을 사용하면 HTML 요소의 class 어트리뷰트에 클래스를 추가 또는 삭제할 수 있다. 클래스 바인딩은 아래와 같이 두 가지의 방식으로 사용할 수 있다.

```html
<element [class.class-name]="booleanExpression">...</element>
<element [class]="class-name-list">...</element>
```

단항 클래스 바인딩
{: .title}

바인딩의 좌변에는 class 뒤에 HTML 요소의 class 어트리뷰트에 반영할 클래스 이름을 지정하고, 우변에는 참이나 거짓으로 평가될 수 있는 표현식을 바인딩한다.

```html
<div [class.alert]="isError">...</div>
```

위 예제의 경우, 우변의 표현식 isError의 값이 참이면 좌변의 class 뒤에 지정한 클래스 alert을 class 어트리뷰트에 추가하고, isError의 값이 거짓이면 class 어트리뷰트에서 삭제한다.

아래와 같이 다른 클래스가 적용되어 있는 경우를 살펴보자.

```html
<div class="rounded" [class.alert]="isError">...</div>
```

만약 isError의 값이 참이면 위 예제는 아래와 같이 변환된다.

```html
<div class="rounded alert">...</div>
```

만약 isError의 값이 거짓이면 위 예제는 아래와 같이 변환된다.

```html
<div class="rounded">...</div>
```

아래와 같이 이미 alert 클래스가 적용되어 있는 경우를 살펴보자.

```html
<div class="alert" [class.alert]="isError">...</div>
```

만약 isError의 값이 참이면 위 예제는 아래와 같이 변환된다.

```html
<div lass="alert">...</div>
```

만약 isError의 값이 거짓이면 위 예제는 아래와 같이 변환된다.

```html
<div>...</div>
```

다항 클래스 바인딩
{: .title}

바인딩의 좌변에는 class를 지정하고 우변에는 HTML 요소의 class 어트리뷰트에 반영할 클래스의 리스트(공백으로 구분된 클래스 리스트의 문자열)를 바인딩한다.

```html
<div [class]="my-classes">...</div>
```

마치 DOM 객체의 class 프로퍼티에 프로퍼티 바인딩을 하는 것과 유사하지만 DOM 객체에는 class 프로퍼티가 존재하지 않는다. 따라서 다항 클래스 바인딩은 프로퍼티 바인딩이 아니며 단항 클래스 바인딩와 마찬가지로 HTML 요소의 어트리뷰트를 조작한다.

다항 클래스 바인딩은 우변의 표현식 my-classes의 값을 class 어트리뷰트에 반영한다. 위 예제의 경우, my-classes의 값이 'my-class1 my-class2'이면 위 코드는 아래와 같이 변환될 것이다.

```html
<div class="my-class1 my-class2">...</div>
```

아래와 같이 이미 클래스가 적용되어 있는 경우를 살펴보자.

```html
<div class="my-class1 my-class2" [class]="my-classes">...</div>
```

만약 my-classes의 값이 'my-class3 my-class4'이면 위 예제는 아래와 같이 변환된다.

```html
<div class="my-class3 my-class4">...</div>
```

이와 같이 HTML 요소의 class 어트리뷰트에 의해 이미 클래스가 지정되어 있을 때 한 개의 클래스를 대상으로 하는 단항 클래스 바인딩([class.class-name])은 class 어트리뷰트를 병합(merge)하여 새로운 class 어트리뷰트를 작성한다. 하지만 복수의 클래스를 대상으로 하는 다항 클래스 바인딩([class])은 기존의 class 어트리뷰트를 삭제하고 바인딩된 클래스의 리스트를 기준으로 새로운 class 어트리뷰트를 작성한다. 사용 방법은 아래와 같다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- 조건의 의한 클래스 바인딩
         우변의 표현식이 true이면 클래스를 추가한다 -->
    <div [class.text-large]="isLarge">text-large</div>
    <!-- 조건의 의한 클래스 바인딩
         우변의 표현식이 false이면 클래스를 삭제한다 -->
    <div class="text-small color-red" [class.color-red]="isRed">text-small</div>
    <!-- 여러 개의 클래스를 한번에 지정할 수 있다 -->
    <div [class]="myClasses">text-large color-red</div>
    <!-- 클래스 바인딩은 기존 클래스 어트리뷰트보다 우선한다.
         따라서 기존 클래스 어트리뷰트는 클래스 바인딩에 의해 reset된다.
         클래스 바인딩의 위치는 관계없다. -->
    <div class="text-small color-blue" [class]="myClasses">text-large color-red</div>
  `,
  styles: [`
    .text-small { font-size: 18px;}
    .text-large { font-size: 36px;}
    .color-blue { color: blue;}
    .color-red { color: red;}
  `]
})
export class AppComponent {
  isLarge = true;
  isRed = false;
  myClasses = 'text-large color-red';
}
```

<iframe src="https://stackblitz.com/edit/template-class-binding?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

<!-- <iframe src="https://embed.plnkr.co/4HXnLnQ4lDRJGMomcg9z/?show=preview" frameborder="0" width="100%" height="400"></iframe> -->

클래스 바인딩은 주로 하나의 클래스를 조건에 의해 추가 또는 삭제하는 용도로 사용한다. 여러 개의 클래스를 지정할 경우에도 클래스 바인딩을 사용할 수 있으나 ngClass 디렉티브를 사용하면 좀더 세밀한 제어가 가능하다.

## 3.5 스타일 바인딩(Style binding)

스타일 바인딩을 사용하면 HTML style 어트리뷰트에 스타일을 지정할 수 있다.

```html
<element [style.style-property]="expression">...</element>
```

스타일 바인딩은 우변의 표현식을 평가한 후 HTML style 어트리뷰트를 변경한다. 좌변에는 style 뒤에 HTML style 어트리뷰트에 반영할 CSS 프로퍼티 이름을 지정하고 우변에는 CSS 프로퍼티의 값으로 평가될 수 있는 표현식을 바인딩하는 것이다. 만약 CSS 프로퍼티 값에 단위가 필요한 경우, CSS 프로퍼티에 단위를 추가한다.

```html
<div [style.background-color]="'white'"
     [style.font-size.px]="'16'">...</div>
```

주의 할 것은 HTML style 어트리뷰트에 의해 이미 스타일이 지정되어 있을 때 스타일 바인딩은 중복되지 않은 스타일은 병합(merge)하여 그대로 사용하고 중복된 스타일은 스타일 바인딩의 스타일로 덮어쓴다. 스타일 프로퍼티(border-radius 등)는 케밥표기법(kebab-case) 또는 카멜표기법(camelCase)을 사용한다. 사용 방법은 아래와 같다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button class="btn"
      [style.background-color]="isActive ? '#4CAF50' : '#f44336'"
      [style.font-size.em]="isActive ? '1.2' : '1'"
      (click)="isActive=!isActive">Toggle</button>
  `,
  styles: [`
    .btn {
      background-color: #4CAF50;
      border: none;
      border-radius: 8px;
      color: white;
      padding: 10px;
      cursor: pointer;
      outline: none;
    }
  `]
})
export class AppComponent {
  isActive = false;
}
```

<iframe src="https://stackblitz.com/edit/template-style-binding?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

스타일 바인딩은 주로 하나의 인라인 스타일을 조건에 의해 추가하는 용도로 사용한다. 여러 개의 인라인 스타일을 추가할 경우에는 ngStyle 디렉티브를 사용한다.

## 3.6 이벤트 바인딩(Event binding)

이벤트 바인딩은 뷰의 상태 변화(버튼 클릭, 체크박스 체크, input에 텍스트 입력 등)에 의해 이벤트가 발생하면 이벤트 핸들러를 호출하는 것을 말한다.

지금까지 살펴본 데이터 바인딩은 컴포넌트 클래스에서 템플릿으로 데이터가 이동했지만 이벤트 바인딩은 템플릿에서 컴포넌트 클래스로 데이터가 이동한다.

```html
<element (event)="statement">...</element>
```

간단한 예제를 통해 이벤트 바인딩을 살펴보자.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- (1) -->
    <input type="text" [value]="name" (input)="handleInput($event)">
    <!-- (2) -->
    <button (click)="handleClick()">clear</button>
    <!-- (3) -->
    <p>name: {{ "{{ name " }}}}</p>
  `
})
export class AppComponent {
  name = '';

  handleInput(event) {
    console.log(event);
    // event.target.value에는 사용자 입력 텍스트가 담겨있다.
    this.name = event.target.value;
  }

  handleClick() {
    this.name = '';
  }
}
```

<iframe src="https://stackblitz.com/edit/template-event-binding?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

1. 사용자의 텍스트 입력에 의해 input 이벤트가 발생하면 이벤트 바인딩을 통하여 이벤트 핸들러 handleInput을 호출한다. 이때 이벤트 정보를 담고 있는 DOM 이벤트 객체 **$event**를 이벤트 핸들러에 전달할 수 있다. $event 객체는 DOM 이벤트의 종류에 의해 타입(KeyboardEvent, InputEvent, MouseEvent 등)이 결정된다. Angular는 표준 DOM 이벤트를 사용하기 때문에 $event를 통해 브라우저의 [Event](https://developer.mozilla.org/ko/docs/Web/API/Event) 객체의 프로퍼티나 메소드에 자유롭게 접근할 수 있다. 이벤트 핸들러 handleInput은 input 이벤트를 발생시킨 input 요소(event.target)의 value 프로퍼티(사용자 입력 텍스트가 담겨있다)를 $event로 부터 추출하여 name 프로퍼티에 할당한다. 그리고 name 프로퍼티는 프로퍼티 바인딩에 의해 다시 input 요소에 바인딩된다.

2. 버튼이 클릭되면 click 이벤트가 발생하고 이벤트 바인딩을 통하여 이벤트 핸들러 handleClick을 호출한다. handleClick은 name 프로퍼티를 초기화한다.

3. name 프로퍼티는 인터폴레이션에 의해 템플릿에 바인딩된다.

이벤트 바인딩에는 input이나 click 이벤트 이외에도 다양한 표준 DOM 이벤트를 사용할 수 있다. 표준 DOM 이벤트는 아래의 웹사이트를 참조하기 바란다.

- [MDN 이벤트 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/Events)

<!--

버튼 클릭 이벤트에 의해 폰트 사이즈를 증감하는 예제를 살펴보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <div [style.font-size.px]="fontSize">FontSize: {{fontSize}}px</div>
    <button (click)="decrease()" title="smaller">-</button>
    <button (click)="increase()" title="bigger">+</button>
  `
})
export class AppComponent {
  fontSize = 12;

  decrease() {
    console.log('decrease');
    --this.fontSize;
  }
  increase() {
    console.log('increase');
    ++this.fontSize;
  }
}
```-->

## 3.7 양방향 데이터 바인딩(Two-way data binding)

양방향 데이터 바인딩은 뷰와 컴포넌트 클래스의 상태 변화를 상호 반영하는 것을 말한다. 즉, 뷰의 상태가 변화하면 컴포넌트 클래스의 상태도 변화하고 그 반대로 컴포넌트 클래스의 상태가 변화하면 뷰의 상태도 변화하는 것이다.

```html
<element [(ngModel)]="property">...</element>
```

[ngModel](https://angular.io/api/forms/NgModel) 디렉티브를 이벤트 바인딩(( ))과 프로퍼티 바인딩([ ]) 형식으로 기술한 후 우변에 뷰와 컴포넌트 클래스가 공유할 프로퍼티를 기술한다. ngModel 디렉티브를 사용하기 위해서는 [FormsModule](https://angular.io/api/forms/FormsModule)을 모듈에 등록하여야 한다. <!-- Angular CLI를 통해 프로젝트를 생성하였다면 아래와 같이 FormsModule이 이미 등록되어 있으므로 별도의 등록이 필요없다. -->

```typescript
// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

간단한 예제를 살펴보자.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" [(ngModel)]="name">
    <p>name: {{ "{{ name " }}}}</p>
  `
})
export class AppComponent {
  name = '';
}
```

<iframe src="https://stackblitz.com/edit/template-two-way-binding?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

컴포넌트 클래스의 name 프로퍼티는 템플릿의 input 요소와 양방향으로 바인딩되어 있다. 즉, input 요소의 value 프로퍼티가 변화하면 컴포넌트 클래스의 name 프로퍼티도 동일한 값으로 변화하고 반대로 컴포넌트 클래스의 name 프로퍼티가 변화하면 input 요소의 value 프로퍼티도 동일한 값으로 변화한다.

사실 Angular는 양방향 바인딩을 지원하지 않는다. `[( )]`(이것을 Banana in a box라고 부른다)에서 추측할 수 있듯이 양방향 바인딩은 이벤트 바인딩과 프로퍼티 바인딩의 축약 표현(Shorthand syntax)일 뿐이다. 즉, 양방향 바인딩의 실제 동작은 이벤트 바인딩과 프로퍼티 바인딩의 조합으로 이루어진다. 위 코드를 이벤트 바인딩과 프로퍼티 바인딩으로 표현하여 보자.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" [value]="name" (input)="name=$event.target.value">
    <p>name: {{ "{{ name " }}}}</p>
  `
})
export class AppComponent {
  name = '';
}
```

`<input type="text" [(ngModel)]="name">`과 `<input type="text" [value]="name" (input)="name=$event.target.value">`은 정확히 동일하게 동작한다. ngModel은 이벤트 바인딩과 프로퍼티 바인딩으로 구현되는 양방향 바인딩을 간편하게 작성할 수 있도록 돕는 디렉티브로서 사용자 입력과 관련한 DOM 요소(input, textarea, select 등의 폼 컨트롤 요소)에서만 사용할 수 있다. ngModel을 이벤트 바인딩과 프로퍼티 바인딩으로 표현하여 보자.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input [ngModel]="name" (ngModelChange)="name=$event">
    <p>name: {{ "{{ name " }}}}</p>
  `
})
export class AppComponent {
  name = '';
}
```

프로퍼티 바인딩 [ngModel]은 사용자 입력에 관련된 DOM 요소의 프로퍼티(위 예제의 경우 input 요소의 value 프로퍼티)를 업데이트한다. 그리고 이벤트 바인딩 (ngModelChange)은 이벤트를 수신하고 이벤트 핸들러를 통해 DOM의 변화를 외부에 알린다. 이때 ngModelChange는 $event에서 사용자 입력에 관련된 프로퍼티의 값(위 예제의 경우 target.value)을 내부적으로 추출하여 이벤트를 emit한다.

양방향 바인딩은 반드시 ngModel 디렉티브만을 사용하여야 하는 것은 아니며 커스텀 양방향 데이터 바인딩도 작성할 수 있다. 이 방법에 대해서는 [Angular Forms: NgModel과 양방향 바인딩](./angular-form-template-driven-forms#3-ngmodel과-양방향-바인딩)에서 알아보도록 하자.

# Reference

* [Angular Template Syntax](https://angular.io/guide/template-syntax)

* [zone.js](https://github.com/angular/zone.js/)

* [zone.js with Miško Hevery](https://www.youtube.com/watch?v=V9Bbp6Hh2YE)

* [How the hell does zone.js really work?](http://blog.kwintenp.com/how-the-hell-do-zones-really-work/)
