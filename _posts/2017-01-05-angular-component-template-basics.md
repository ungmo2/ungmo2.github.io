---
layout: post
title: Angular Component - <strong>Template Basics</strong>
subtitle: 데이터 바인딩(Data binding)과 변화 감지(Change detection)
categories: angular
section: angular
description: 템플릿은 HTML과 Angular 고유의 템플릿 문법(Template Syntax)을 사용하여 UI의 최소 단위인 컴포넌트의 뷰를 정의한다. Angular는 템플릿과 컴포넌트 클래스로 뷰와 모델(데이터와 비즈니스 로직)을 분리한다. Angular는 컴포넌트 기반 개발(CBD, Component Based Development) 프레임워크이기 때문에 MVC(Model-View-Controller) 또는 MVVM(Model-View-ViewModel) 패턴과 일치하지는 않지만, 템플릿은 뷰(View)를 나타내고 컴포넌트 클래스는 Controller와 ViewModel의 일부를 담당한다고 할 수 있다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 템플릿(Template)이란?

템플릿은 HTML과 Angular 고유의 템플릿 문법(Template Syntax)을 사용하여 UI의 최소 단위인 컴포넌트의 뷰를 정의한다.

Angular는 템플릿과 컴포넌트 클래스로 뷰와 모델(데이터와 비즈니스 로직)을 분리한다. Angular는 컴포넌트 기반 개발(CBD, Component Based Development) 프레임워크이기 때문에 MVC(Model-View-Controller) 또는 MVVM(Model-View-ViewModel) 패턴과 일치하지는 않지만, 템플릿은 뷰(View)를 나타내고 컴포넌트 클래스는 Controller와 ViewModel의 일부를 담당한다고 할 수 있다.

![mvc-mvvm](./img/mvc-mvvm.png)

MVC(Model-View-Controller)과 MVVM(Model-View-ViewModel)
{: .desc-img}

DOM은 상태(state. 예를 들어 input요소에 입력 또는 checkbox요소를 체크한 상태)를 가지고 있으며 이 상태는 변화하는 살아있는 것이다. 상태는 분리된 뷰와 모델 간의 데이터 동기화를 통해 공유되어야 한다. DOM의 상태가 변화하면 템플릿은 변화를 감지하고 상태를 컴포넌트 클래스로 전달한다. 컴포넌트 클래스는 비즈니스 로직을 실행하여 템플릿에 실행 결과를 공유하고 템플릿은 DOM을 업데이트한다.

![angular-view-model](./img/angular-view-model.png)

Angular의 뷰와 모델
{: .desc-img}

이전의 웹 애플리케이션은 DOM을 직접 조작하는 방식으로 동작하지만 템플릿은 선언형 프로그래밍(Declarative programming) 방식으로 뷰와 모델의 관계를 관리한다. Angular는 변화 감지(Change detection) 메커니즘 위에서 동작하는 데이터 바인딩(Data binding)을 통해 템플릿과 컴포넌트 클래스를 긴밀히 연결하고 동기화를 유지한다.

![databinding & change detection](./img/databinding-changedetection.png)

데이터 바인딩과 변화 감지
{: .desc-img}

템플릿은 Angular에만 존재하는 개념이 아니다. 브라우저의 요청에 동적으로 대응하여야 하는 웹 애플리케이션의 경우 서버 측에서 템플릿을 사용하는 경우가 많다. 예를 들어 Express를 사용해 본 경험이 있다면 [Pug](https://pugjs.org), [Handlebars](http://handlebarsjs.com/), [EJS](http://ejs.co/) 등의 템플릿 엔진을 사용해 보았을 것이다. Java의 JSP(Java Server Page)도 템플릿의 일종이다.

<!--아래는 Handlebars의 예제이다. Angular의 템플릿과 매우 유사하다.

```html
<div class="entry">
  <h1>{{ "{{ title " }}}}</h1>
  <div class="body">
    {{ "{{ body " }}}}
  </div>
</div>
```-->

# 2. 데이터 바인딩(Data binding)

구조화된 웹 애플리케이션을 구축하기 위해서는 뷰와 모델의 분리가 필수적이다. 하지만 분리된 뷰와 모델은 유기적으로 동작하여야 한다. 데이터 바인딩은 이러한 모순의 해결을 가능하게 한다.

데이터 바인딩은 뷰와 모델을 하나로 연결하는 것을 의미한다. Angular의 데이터 바인딩은 템플릿(View)과 컴포넌트 클래스의 데이터(Model)를 하나로 묶어 유기적으로 동작하게 하는 것을 말한다. 이는 템플릿의 정적 HTML에 컴포넌트의 동적 데이터를 하나로 묶어 브라우저에 표시할 완성된 뷰를 만들기 위함이다.

jQuery를 사용하는 웹 애플리케이션의 경우를 살펴보자.

![procedural-programming](./img/procedural-programming.png)

jQuery에 의한 DOM 조작(Procedural programming)
{: .desc-img}

위의 예제의 경우, DOM에 접근하고 조작하는 코드를 작성해야 한다. 이를 위해 JavaScript는 HTML의 구조를 파악하고 있어야 하며 DOM이 변경되면 JavaScript 로직도 변경되어야 한다. 예를 들어 h1 요소가 p 요소로 변경되면 JavaScript 로직도 변경이 필요하다.

이와 같이 기존의 웹 애플리케이션은 JavaScript DOM API를 사용하여 DOM을 직접 조작(Manipulation)하는 방식이기 때문에 뷰와 모델 간의 관계를 느슨하게 결합하기 어려운 구조를 갖는다. 이와 같은 구조 상 문제로 뷰가 변경되면 로직도 변경될 가능성이 매우 높다.

하지만 Angular는 DOM에 직접 접근하지 않고 템플릿과 컴포넌트 클래스의 상호 관계를 선언하는 방식(선언형 프로그래밍: Declarative programming)으로 뷰와 모델의 관계를 관리한다. 이때 사용되는 것이 <strong>데이터 바인딩</strong>이며 이를 통해 템플릿은 컴포넌트 클래스와 연결된다. 데이터 바인딩은 <strong>템플릿 문법</strong>으로 기술된다. HTML과 템플릿 문법으로 기술된 템플릿은 JIT 또는 AOT 컴파일러에 의해 브라우저가 이해할 수 있는 JavaScript로 컴파일된다. Angular 웹 애플리케이션의 경우를 살펴보자.

![declarative-programming](./img/declarative-programming.png)

데이터 바인딩에 의한 템플릿과 컴포넌트 클래스의 연결(Declarative programming)
{: .desc-img}

위의 예제의 경우, 템플릿에서 직접 컴포넌트 클래스의 프로퍼티를 참조하기 때문에 DOM에 접근하고 조작하는 코드를 작성할 필요가 없다. 따라서 컴포넌트 클래스는 HTML의 구조를 파악하고 있을 필요가 없으며 템플릿의 변경되어도 컴포넌트 클래스를 변경할 필요가 없다. 예를 들어 h1 요소가 p 요소로 변경되어도 컴포넌트 클래스는 변경이 필요없다.

Angular의 데이터 바인딩은 뷰와 모델의 관계를 기존의 웹 애플리케이션 방식보다 느슨하게 결합하므로 뷰와 모델을 보다 깔끔하게 분리할 수 있을 뿐만 아니라 기존의 웹 애플리케이션 개발 방식보다 간결한 코드로 개발이 가능하다.

# 3. 변화 감지(Change detection)

변화 감지란 뷰와 모델의 동기화를 유지하기 위해 변화를 감지하고 이를 반영하는 것을 말한다. 즉 상태의 변화를 감지하여 뷰에 반영하는 것으로 데이터 바인딩은 변화 감지 매커니즘의 토대 위에서 수행된다. 

AngularJS는 양방향 바인딩(Two-way binding)만을 지원하였고 AngularJS에서 제공하는 ng-click과 같은 이벤트만을 사용하여야 하는 등 제약이 있었다. 하지만 Angular는 양방향 바인딩과 단방향 바인딩(One-way binding)을 모두 지원하며 [zone.js](https://github.com/angular/zone.js/) 라이브러리를 사용하여 일반 DOM 이벤트를 사용하여도 변화 감지가 수행되도록 개선되었다. 성능면에서도 Digest Loop로 인한 성능저하 문제가 개선되어 AngularJS에 비교할 때 첫 페이지 로딩시간은 2.5배, 리렌더링도 4.2배 정도 빨라졌다.

변화 감지의 작동 원리에 대해 간단히 살펴보자.

뷰의 변화 감지는 DOM 이벤트를 캐치하는 것으로 감지 할 수 있다. 하지만 모델은 HTML 요소가 아니므로 이벤트가 발생하지 않는다. 따라서 모델의 변화 감지를 위해서는 별도의 조치가 필요하다. 모델이 변경된다는 것은 사실 모델 객체의 프로퍼티 값이 변경되는 것을 의미한다.

![change detection](./img/change-detection.png)

변화 감지
{: .desc-img}

위 예제에서 클릭 이벤트 핸들러에 의해 컴포넌트 클래스의 name 프로퍼티 값이 변화하였다. 이와 같이 컴포넌트 클래스의 데이터가 변경되는 상황 즉 어떤 경우 모델이 변화하는지에 Angular는 주목한다. 

사실 모델이 변화할 가능성이 있는 경우는 그다지 많지 않다. 

- DOM 이벤트(click, key press, mouse move 등)

- Timer(setTimeout, setInterval)의 tick 이벤트

- Ajax / Promise

위와 같은 <strong>비동기식 처리</strong>가 수행될 때 컴포넌트 클래스의 데이터가 변경될 수 있는데 변화 감지는 모델이 변화할 수 있는 이러한 상황들을 감시한다.

이를 위해 zone.js는 addEventListener, Timer 함수, XMLHttpRequest, promise 등을 몽키패치한다.

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

zone.js는 위의 같이 일부 함수를 재정의하고 기본값을 프록시로 대체한다. 즉 이벤트 또는 promise가 프록시에서 랩핑되는데 이 개념을 몽키패치라고 한다. 

모델을 변화시킬 수 있는 비동기 작업들이 호출되면 패치를 통해 호출을 후킹한다. 비동기 작업 호출을 후킹할 수 있다는 것은 변화를 감지할 수 있다는 의미이다. 이 후킹 로직 내에서 변화 감지를 수행하고 변화가 감지될 때마다 Digest loop를 실행하여 모델의 변화를 뷰에 반영한다.

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

# Reference

* [zone.js](https://github.com/angular/zone.js/)

* [zone.js with Miško Hevery](https://www.youtube.com/watch?v=V9Bbp6Hh2YE)

* [How the hell does zone.js really work?](http://blog.kwintenp.com/how-the-hell-do-zones-really-work/)

* [Angular Template Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html)
