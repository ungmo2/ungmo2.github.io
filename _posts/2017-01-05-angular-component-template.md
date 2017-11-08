---
layout: post
title: Angular Component - <strong>Template</strong>
subtitle: 템플릿과 템플릿 문법
categories: angular
section: angular
description: 템플릿은 HTML과 Angular 고유의 템플릿 문법(Template Syntax)을 사용하여 UI의 최소 단위인 컴포넌트의 뷰를 정의한다. 정적인 HTML과 템플릿 문법에 의한 컴포넌트의 동적 데이터를 바인딩하여 뷰를 생성한다. Angular는 템플릿과 컴포넌트 클래스로 뷰와 모델(데이터와 비즈니스 로직)을 분리한다. Angular는 컴포넌트 기반 개발(CBD, Component Based Development) 프레임워크이기 때문에 MVC(Model-View-Controller) 또는 MVVM(Model-View-ViewModel) 패턴과 일치하지는 않지만, 템플릿은 뷰(View)를 나타내고 컴포넌트 클래스는 Controller와 ViewModel의 일부를 담당한다고 할 수 있다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 템플릿(Template)이란?

템플릿은 HTML과 Angular 고유의 템플릿 문법(Template Syntax)을 사용하여 UI의 최소 단위인 컴포넌트의 뷰를 정의한다. 템플릿은 템플릿 문법을 통해 컴포넌트의 동적 데이터를 바인딩하여 뷰를 생성한다.

![template](./img/template.png)

템플릿의 뷰 생성 과정
{: .desc-img}

Angular는 템플릿과 컴포넌트 클래스로 뷰와 모델(데이터와 비즈니스 로직)을 분리한다. 

Angular는 컴포넌트 기반 개발(CBD, Component Based Development) 프레임워크이기 때문에 MVC(Model-View-Controller) 또는 MVVM(Model-View-ViewModel) 패턴과 일치하지는 않지만, 템플릿은 뷰(View)를 나타내고 컴포넌트 클래스는 Controller와 ViewModel의 일부를 담당한다고 할 수 있다.

![mvc-mvvm](./img/mvc-mvvm.png)

MVC(Model-View-Controller)과 MVVM(Model-View-ViewModel)
{: .desc-img}

모델(Model)
: 애플리케이션에서 사용되는 데이터의 형식을 말한다. 비즈니스 로직, 유효성 검사 로직 및 그 외의 다양한 기능을 포함할 수도 있다.

뷰(View)
: 사용자에게 모델(데이터)을 표시하는 것을 말한다. 뷰는 같은 모델을 다양한 방식으로 표현할 수 있다.

컨트롤러(Controller)
: 모델과 뷰의 상호 작용을 감시하고 업데이트한다.

뷰모델(ViewModel)
: MVC 패턴에서는 컨트롤러가 모델과 뷰 간의 상호 작용을 담당하였지만 MVVM 패턴에서는 해당 뷰가 데이터 바인딩을 통해 컨트롤러의 역할을 담당한다.

DOM은 상태(state. 예를 들어 input요소에 입력 또는 checkbox요소를 체크한 상태)를 가지고 있으며 이 상태는 변화하는 살아있는 것이다. 상태는 분리된 뷰와 모델 간의 데이터 동기화를 통해 공유되어야 한다. DOM의 상태가 변화하면 템플릿은 변화를 감지하고 상태를 컴포넌트 클래스로 전달한다. 컴포넌트 클래스는 비즈니스 로직을 실행하여 템플릿에 실행 결과를 공유하고 템플릿은 DOM을 업데이트한다.

![angular-view-model](./img/angular-view-model.png)

Angular의 뷰와 모델
{: .desc-img}

이전의 웹 애플리케이션은 DOM을 직접 조작하는 방식으로 동작하지만 템플릿은 선언형 프로그래밍(Declarative programming) 방식으로 뷰와 모델의 관계를 관리한다. Angular는 변화 감지(Change detection) 메커니즘 위에서 동작하는 데이터 바인딩(Data binding)을 통해 템플릿과 컴포넌트 클래스를 긴밀히 연결하고 동기화를 유지한다.

![databinding & change detection](./img/databinding-changedetection.png)

데이터 바인딩과 변화 감지
{: .desc-img}

템플릿은 Angular에만 존재하는 개념이 아니다. 브라우저의 요청에 동적으로 대응하여야 하는 웹 애플리케이션의 경우 서버 측에서 템플릿을 사용하는 경우가 많다. 예를 들어 Express를 사용해 본 경험이 있다면 [Pug](https://pugjs.org), [Handlebars](http://handlebarsjs.com/), [EJS](http://ejs.co/) 등의 템플릿 엔진을 사용해 보았을 것이다. Java의 JSP(Java Server Page)도 템플릿의 일종이다. 이들은 서버에서 컴파일된 후 HTML의 형태로 클라이언트로 전송되는 서버 사이드 렌더링 방식을 취한다. 하지만 Angular의 템플릿은 클라이언트 사이드 렌더링 방식으로 뷰를 생성한다.

아래는 Handlebars의 예제이다. Angular의 템플릿과 매우 유사하다.

```html
<div class="entry">
  <h1>{{ "{{ title " }}}}</h1>
  <div class="body">
    {{ "{{ body " }}}}
  </div>
</div>
```

# 2. 템플릿 문법(Template Syntax)

템플릿 문법은 템플릿을 작성하기 위한 Angular 고유의 확장 표기법으로 템플릿과 컴포넌트 간 데이터 공유를 위한 데이터 바인딩과 동적으로 DOM 구조, 스타일 등을 변경할 수 있는 빌트인 디렉티브 등을 지원한다. 정적인 뷰는 HTML만으로 정의할 수 있지만 컴포넌트와 연계하여 동적으로 변화하는 뷰를 정의하기 위해서 템플릿 문법을 사용한다.

Angular가 제공하는 템플릿 문법은 아래와 같다.

- 데이터 바인딩
  - 인터폴레이션(Interpolation)
  - 프로퍼티 바인딩(Property binding)
  - 어트리뷰트 바인딩(Attribute binding)
  - 클래스 바인딩(Class binding)
  - 스타일 바인딩(Style binding)
  - 이벤트 바인딩(Event binding)
  - 양방향 데이터 바인딩(Two-way binding)

- 빌트인 디렉티브(Built-in directive)
  - 빌트인 어트리뷰트 디렉티브(Built-in attribute directive)
    - ngClass
    - ngStyle

  - 빌트인 구조 디렉티브(Built-in structural directive)
    - ngIf
    - ngFor
    - ngSwitch

- 템플릿 참조 변수(Template reference variable)

- 템플릿 표현식 연산자(Template expression operator)

템플릿 문법의 사용에는 아래와 같은 조건이 전제된다.

| 템플릿 내 사용 금지 항목  | 비고
|---------------------|---------------------------
| script 요소          | 보안 상 문제
| 대입연산자(=, +=, -=), 증감 연산자(++, --), 비트 연산자(\|, &), 객체 생성 연산자(new) | 템플릿 표현식 내에서 데이터를 변경할 수 있는 연산은 사용을 금지한다(Unidirectional data flow 정책) 예를 들어 {{ "{{ foo=bar " }}}}는 에러를 발생시킨다.
| 전역 스코프를 갖는 빌트인 객체 | window, document, location, console 등

html, body, base 요소는 템플릿 내 사용 금지 항목은 아니지만 사용해서는 않된다. 
: 최상위 컴포넌트인 루트 컴포넌트는 html, body 요소의 자식 요소이고 모든 컴포넌트는 루트 컴포넌트의 자식 컴포넌트이기 때문에 컴포넌트의 뷰는 언제나 html, body 요소의 자식 요소이다. 따라서 컴포넌트 템플릿에서 html, body 요소를 사용하면 html, body 요소는 중복된다. base 요소는 head 요소 내에 포함되는 요소로서 상대경로의 루트를 정의한다. Angular는 src/index.html에 base 요소를 사용하여 상대경로 루트를 정의해 두었기 때문에 컴포넌트에서 base 요소를 사용할 이유는 없다.

# Reference

* [Angular Template Syntax](https://angular.io/guide/template-syntax)
