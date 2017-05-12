---
layout: post
title: Angular Component - <strong>Data biding & Change detection</strong>
subtitle: 데이터 바인딩과 변화 감지
categories: angular
section: angular
description: 
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

Angular는 뷰를 담당하는 템플릿과 로직을 담당하는 컴포넌트 클래스를 분리하여 작성한다. 템플릿과 컴포넌트 클래스는 데이터 바인딩에 의해 긴밀히 연결되고 유지된다. 뷰는 모델에 의해 동적으로 변화되는데 이전의 웹 애플리케이션은 DOM을 직접 조작하는 방식으로 모델의 변화를 뷰에 반영하였다. 이와 같은 방식으로는 뷰와 모델의 관계를 느슨하게 결합하기 어렵다. Angular는 데이터 바인딩에 뷰와 모델의 관계를 선언적 방식으로 관리하여 이와 같은 문제를 해결하였다. 또한 모델의 변화를 감지하고 이를 뷰에 자동으로 반영하는 변화 감지(Change detection) 전략을 통해 직접 DOM에 접근하여 조작하는 번거로운 코드를 매번 작성할 필요가 없어져 코드량을 획기적으로 줄여준다.

![databinding & change detection](./img/databinding-changedetection.png)

데이터 바인딩과 변화 감지
{: .desc-img}

# 1. 데이터 바인딩(Data biding)

재사용이 가능한 웹 애플리케이션을 구축하기 위해서는 뷰와 모델의 분리가 필수적이다. 하지만 분리된 뷰와 모델은 유기적으로 동작하여야 한다. 데이터 바인딩은 이를 가능하게 한다.

데이터 바인딩은 복수의 데이터를 하나로 묶는 것을 의미한다. Angular의 데이터 바인딩은 템플릿(View)과 컴포넌트 클래스의 데이터(Model)를 하나로 묶어 유기적으로 동작하게 하는 것을 말한다. 이 2개의 데이터(View-Model)를 하나로 묶는 이유는 템플릿의 정적 HTML에 컴포넌트의 동적 데이터를 하나로 묶어 브라우저에 표시할 완성된 뷰를 만들기 위함이다.

jQuery를 사용하는 웹 애플리케이션의 경우를 살펴보자.

![procedural-programming](./img/procedural-programming.png)

jQuery에 의한 DOM 조작(Procedural programming)
{: .desc-img}

위의 예제의 경우, DOM에 접근하고 조작하는 코드를 작성해야 한다. 이를 위해 JavaScript는 HTML의 구조를 파악하고 있어야 하며 DOM이 변경되면 JavaScript 로직도 변경되어야 한다. 예를 들어 h1 요소가 p 요소로 변경되면 JavaScript 로직도 변경이 필요하다.

기존의 웹 애플리케이션은 JavaScript DOM API를 사용하여 DOM을 직접 조작(Manipulation)하는 방식이기 때문에 뷰와 모델 간의 관계를 느슨하게 결합하기 어려운 구조를 갖는다. 이와 같은 구조 상 문제로 뷰가 변경되면 모델과의 연계를 위한 로직도 변경될 가능성이 매우 높다.

하지만 Angular는 DOM에 직접 접근하지 않고 템플릿과 컴포넌트 클래스의 상호 관계를 선언하는 방식(선언형 프로그래밍: Declarative programming)으로 뷰와 모델의 관계를 관리한다. 이때 사용되는 것이 <strong>데이터 바인딩</strong>이며 이를 통해 템플릿은 컴포넌트 클래스와 연결된다. 데이터 바인딩은 <strong>템플릿 문법</strong>으로 기술된다. HTML과 템플릿 문법으로 기술된 템플릿은 JIT 또는 AOT 컴파일러에 의해 브라우저가 이해할 수 있는 JavaScript로 컴파일된다. Angular 웹 애플리케이션의 경우를 살펴보자.

![declarative-programming](./img/declarative-programming.png)

데이터 바인딩에 의한 뷰와 모델의 연결(Declarative programming)
{: .desc-img}

위의 예제의 경우, DOM에 접근하고 조작하는 코드를 작성할 필요가 없다. 따라서 컴포넌트 클래스는 HTML의 구조를 파악하고 있을 필요가 없으며 템플릿의 변경되어도 컴포넌트 클래스를 변경할 필요가 없다. 예를 들어 h1 요소가 p 요소로 변경되어도 컴포넌트 클래스는 변경이 필요없다.

Angular의 데이터 바인딩은 뷰와 모델의 관계를 기존의 웹 애플리케이션 방식보다 느슨하게 결합하므로 뷰와 데이터를 보다 깔끔하게 분리할 수 있을 뿐만 아니라 기존의 웹 애플리케이션 개발 방식보다 간결한 코드로 개발이 가능하다.

# 2. 변화 감지(Change detection)

변화 감지란 모델의 변화를 감지하여 뷰에 반영하는 것을 말한다. 즉 컴포넌트 클래스 데이터의 변화를 감지하여 템플릿에 반영하는 것으로 데이터 바인딩은 변화 감지 매커니즘의 토대 위에서 수행된다. 

AngularJS는 양방향 바인딩(2-way binding)만을 지원하였고 AngularJS에서 제공하는 ng-click과 같은 이벤트만을 사용하여야 하는 등 제약이 있었다. 하지만 Angular는 양방향 바인딩과 단방향 바인딩(1-way binding)을 모두 지원하며 [zone.js](https://github.com/angular/zone.js/) 라이브러리를 사용하여 일반 DOM 이벤트를 사용하여도 변화 감지가 수행되도록 개선되었다. 성능면에서도 Digest Loop로 인한 성능저하 문제가 개선되어 AngularJS에 비교할 때 첫 페이지 로딩시간은 2.5배, 리렌더링도 4.2배 정도 빨라졌다.

변화 감지의 작동 원리에 대해 간단히 살펴보자.

뷰의 변화 감지는 DOM 이벤트를 캐치하는 것으로 감지 할 수 있다. 하지만 모델은 HTML 요소가 아니므로 이벤트가 발생하지 않는다. 따라서 모델의 변화 감지를 위해서는 별도의 조치가 필요하다. 모델이 변경된다는 것은 사실 모델 객체에 값이 할당되는 것을 의미한다.

![change detection](./img/change-detection.png)

변화 감지
{: .desc-img}

위 예제에서 클릭 이벤트 핸들러에 의해 컴포넌트 클래스의 name 프로퍼티의 값이 변화하였다. 이와 같이 컴포넌트 클래스의 데이터가 변경되는 상황 즉 어떤 경우 모델이 변화하는지에 Angular는 주목한다.

사실 모델이 변화할 가능성이 있는 경우는 그다지 많지 않다. 아래의 경우 Angular는 모델의 변화가 뷰에 반영되도록 감시하는데 이 과정을 Digest loop라고 한다.

- DOM 이벤트에 의한 이벤트 핸들러 실행

- Timer(setTimeout(), setInterval()) 함수의 tick 이벤트에 의한 핸들러 실행

- Ajax success callback 함수에 의한 데이터 fetch

zone.js는 위의 이벤트 핸들러 등록 함수(addEventListener), Timer 함수, XMLHttpRequest 등을 몽키패치한 후 이들이 호출되면 패치를 통해 호출을 후킹한다. 호출을 후킹할 수 있다는 것은 변화를 감지할 수 있다는 의미가 되므로 후킹 로직에서 변화 감지가 시작되도록 하는 것이다.

# Reference

* [zone.js](https://github.com/angular/zone.js/)

* [zone.js with Miško Hevery](https://www.youtube.com/watch?v=V9Bbp6Hh2YE)
