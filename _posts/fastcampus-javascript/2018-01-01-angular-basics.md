---
layout: post
title: Angular <strong>Basics</strong>
subtitle: Angular의 소개와 특징
categories: fastcampus-angular
section: fastcampus-angular
seq: 1
description: Angular는 SPA(Single Page Application) 개발을 위한 구글의 오픈소스 자바스크립트 프레임워크이다. 웹뿐만 아니라 모바일 웹, 네이티브 모바일과 데스크탑 애플리케이션까지 프론트엔드 개발에 필요한 대부분의 기능을 갖추고 있다. 정적 타입을 제공하는 TypeScript를 주력 언어로 채택하여 대규모 애플리케이션 개발에 보다 적합한 환경을 제공한다.
---

* TOC
{:toc}

![angular logo](/img/angular-logo.png)

# 1. Angular 소개

[Angular](https://angular.io/)는 SPA(Single Page Application) 개발을 위한 구글의 오픈소스 자바스크립트 프레임워크이다. 웹 애플리케이션은 물론 모바일 웹, 네이티브 모바일과 데스크탑 애플리케이션까지 프론트엔드 개발에 필요한 대부분의 기능을 갖추고 있다. 정적 타입을 제공하는 TypeScript를 주력 언어로 채택하여 대규모 애플리케이션 개발에 보다 적합한 환경을 제공한다.

이전 버전인 [AngularJS](https://angularjs.org/)는 2009년 구글의 미스코 헤브리(Miško Hevery)가 시작한 개인 프로젝트로 시작하여 2012년 AngularJS 1.0이 공개되었으며, 2017년 1.6.2가 공개되는 등 Angular 정식 버전이 공개된 이후에도 지속적으로 업데이트를 진행하고 있다.

Angular 1 버전을 AngularJS, Angular 2 버전 이상을 Angular라 부른다
{: .info}

Angular는 AngularJS(version 1)의 후속 버전으로 2014년 ng 컨퍼런스에서 처음으로 소개되었다. 2016년 9월 14일 Angular 2 버전이 공개되었고 Angular 3을 뛰어 넘어 2017년 3월 23일 Angular 4, 2017년 11월 1일 Angular 5(pentagonal-donut), 2018년 5월 3일 Angular 6이 출시되었다. Angular는 AngularJS의 후속 버전이지만 호환성이 없을 뿐아니라 알파, 베타, RC(Release Candidate)를 거치며 브레이킹 체인지(Breaking Change, 이전 버전과 호환성이 없는 변경)가 빈번하게 발생하여 많은 개발자를 혼란스럽게 하였다.

하지만 2016년 10월 발표된 [Angular 버저닝과 출시 계획](http://angularjs.blogspot.kr/2016/10/versioning-and-releasing-angular.html)에 따르면 개발자의 부담이 적은 방향으로 계획적인 버전업이 이루어질 듯하다. [SemVer](http://semver.org/lang/ko/)를 도입하여 버전 체계를 메이저, 마이너, 패치로 명확히 구분하고, 6개월간 1회의 메이저 릴리스(호환성이 없는 브레이킹 체인지 포함), 3회의 마이너 릴리스(브레이킹 체인지가 없는 호환성이 있는 변경) 그리고 주 단위의 패치 릴리스(버그 수정)가 실시될 예정이다.

이처럼 Angular는 버전 업이 빠르게 진행 중이지만 버전 5 이후 안정된 모습을 보이고 있어 Angular 1에서 Angular 2로의 버전 업에서 발생하였던 큰 혼란은 더 이상 없을 것으로 예상된다.

# 2. Angular와 AngulaJS의 차이점

Angular는 AngulaJS의 단순한 업그레이드 버전이 아니다. Angular는 정적 타이핑과 ECMAScript6 스펙을 충족시키기 위해 TypeScript로 재작성되었고 AngulaJS와는 호환성이 없는 브레이킹 체인지를 다수 포함하고 있다.

Angular와 AngulaJS의 차이점을 정리하면 아래와 같다.

- AngularJS의 Controller와 $scope 기반 개발에서 컴포넌트 기반 개발(CBD, Component Based Development)로 전환되었다.

- AngularJS의 angular.module과 jQlite보다 향상된 모듈 시스템과 DOM 제어 기능을 제공하며 API 또한 단순화되었다.

- 선택적 데이터 바인딩(one-way, two-way *Angular는 더 이상 양방향 데이터 바인딩을 빌트인으로 제공하지 않는다.)을 지원하고 디렉티브(directive)와 서비스, 의존성 주입(dependency injection)은 간소화 되었다.

- 주력 개발 언어로서 TypeScript를 도입하여 대규모 개발에 적합한 정적 타입과 인터페이스, 제네릭 등 타입 체크 지원 기능을 제공한다.

- ECMAScript6에서 새롭게 도입된 모듈, 클래스 등과 ECMAScript7의 데코레이터를 지원한다.

- 강력한 개발환경 지원 도구인 Angular CLI를 제공한다.

Angular은 AngularJS의 후속 버전이기는 하지만 호환성이 없는 새로운 프레임워크로 이해하는 것이 좋다. Angular는 AngularJS보다 배우기 쉬우며 성능은 향상되었고 애플리케이션 구조는 보다 단순해졌다.

# 3. Angular의 장점

Angular의 장점을 개발 생산성의 측면과 성능의 관점에서 살펴보도록 하자.

## 3.1 개선된 개발 생산성

### 3.1.1 컴포넌트 기반 개발

AngularJS는 Controller와 $scope가 개발의 중심이었지만 Angular에서는 컴포넌트가 개발의 중심이다. 컴포넌트 기반 개발(CBD: Component Based Development)은 개발 생산성을 높이며 대규모 애플리케이션에 적합한 구조이다.

### 3.1.2 TypeScript의 도입

[TypeScript](./typescript-introduction)는 2012년 Microsoft에서 발표한 오픈소스로 강력한 정적 타이핑 그리고 ECMAScript6의 클래스, 모듈 등과 ECMAScript7의 데코레이터를 지원한다.

TypeScript를 사용하는 이유는 여러가지 있지만 가장 큰 장점은 다양한 도구의 지원을 받을 수 있다는 것이다. TypeScript는 정적 타이핑을 지원하므로 높은 수준의 인텔리센스(IntelliSense), 코드 어시스트, 타입 체크, 리팩토링 등을 지원하며 이러한 도구의 지원은 대규모 프로젝트를 위한 필수적 요소이기도 하다.

TypeScript의 명시적인 정적 타입 지정은 코드의 가독성을 높이고 예측할 수 있게 하며, 컴파일 단계에서 오류를 포착할 수 있는 장점이 있다. 또한 모듈, 클래스, 인터페이스 등의 강력한 객체 지향 프로그래밍(OOP, Object Oriented Programming) 지원은 크고 복잡한 프로젝트의 코드 기반을 쉽게 구성할 수 있도록 돕는다.

Angular는 TypeScript 뿐만 아니라 JavaScript, Dart로도 작성할 수 있지만, Angular 공식 문서, 커뮤니티 활동에서 가장 많이 사용되고 있는 것은 TypeScript이다. Angular 공식 문서의 예제 등도 TypeScript로 작성된 것이 대부분이어서 관련 정보를 얻을 때도 이점이 있으며 이러한 현상은 앞으로도 계속될 것으로 예상된다.

### 3.1.3 개발 도구의 통합 및 개발 환경 구축 자동화

프레임워크를 도입할 때 개발 환경 구축은 하나의 큰 장벽이다. 폴더 구조와 기본 파일 생성, 빌드 설정, 디펜던시, 트랜스파일러, 번들러, 테스팅 환경과 디버깅, 배포 등 설정해야 할 도구는 많고 설정 방법은 익숙하지 않기 때문이다.

Angular CLI의 contributor인 Mike Brocchi‏의 보고에 따르면 개발 환경 구축이 Angular 도입의 큰 장벽 중 하나로 조사되었다.

![largest-barrier-to-getting-started-with-Angular 2](img/largest-barrier-to-getting-started-with-Angular2.png)

이러한 점을 감안해 Angular는 [Angular CLI](https://cli.angular.io/)를 통해 간편한 개발 환경 구축을 지원한다. 간단한 명령어를 사용하여 프로젝트 생성에서 빌드, 테스트, 구성요소 추가 등을 간편하게 할 수 있으며, 개발용 서버를 내장하고 있어 실행까지 할 수 있다. Angular CLI는 개발환경 구축에 소요되는 시간을 최소화할 수 있어서 개발작업에 집중할 수 있도록 돕는다.

## 3.2 성능의 향상

### 3.2.1 Digest Loop로 인한 성능저하 문제의 해결

AngularJS의 단점 중 대표적인 것이 Digest Loop(Model의 변화를 View에 반영시키는 과정)로 인한 성능저하였다. 양방향 데이터 바인딩(Two-way data binding)을 위해서는 watcher가 추가되어야 하고 watcher에 대해 Digest Loop가 실행되기 때문에 watcher가 늘어날수록 성능은 떨어진다. Angular에서는 Digest Loop로 인한 성능 저하가 개선되어 AngularJS와 비교할 때 첫 페이지 로딩시간은 2.5배, 리렌더링도 4.2배 정도 빨라졌다.(ng-conf 2016 기준)

### 3.2.2 AoT 컴파일

AoT 컴파일(Ahead of Time compilation)은 사전 컴파일 방식을 의미한다. 예를 들어 ngIf, ngFor, ngSwitch와 같은 구조 디렉티브(Structural directive)를 브라우저가 실행 가능한 코드로 변환해야 하는데 이러한 과정을 런타임에서 실시하지 않고 사전에 컴파일하여 실행 속도를 향상시키는 기법이다. AoT 컴파일의 또 다른 이점은 JIT(Just-In-Time) 컴파일러가 필요 없어서 프레임워크 크기를 기존 AngularJS보다 50% 정도 줄일 수 있다는 것이다.

### 3.2.3 Lazy Loading

Lazy Loading(지연 로딩)은 SPA의 태생적 단점을 극복하기 위한 하나의 대안으로 애플리케이션 실행 시점에 애플리케이션에서 사용되는 모든 모듈을 한꺼번에 로딩하지 않고 필요한 시점에 필요한 모듈만을 로딩하는 방식이다. 현재 페이지에서 불필요한 모듈까지 로딩하는 낭비를 방지하여 페이지 로딩 속도를 높일 수 있다.

### 3.2.4 코드 최적화

Angular 코드 자체도 지속적으로 최적화되고 있어 45KB 정도의 크기로 축소되었다고 한다.(ng-conf 2016 기준) Angular는 "Mobile First"를 지향하는 고성능 프레임워크를 표방하고 있는 만큼 코드 최적화는 앞으로도 계속 진행될 것으로 예상된다.

# 4. 브라우저 지원 범위

Angular는 대부분의 모던 브라우저를 지원한다. IE는 9 이상을 지원한다.

| Chrome | Firefox | Edge  | IE   | Safari | iOS   | Android                      |IE Mobile |
|:------:|:-------:|:-----:|:----:|:------:|:-----:|:----------------------------:|:--------:|
| latest | latest  | 14    | 11   | 10     | 10    | Nougat(7.0) Marshmallow(6.0) | 11       |
|        |         | 13    | 10   | 9      | 9     | Lollipop(5.0, 5.1)           |          |
|        |         |       | 9    | 8      | 8     | KitKat(4.4)                  |          |
|        |         |       |      | 7      | 7     | Jelly Bean(4.1, 4.2, 4.3)    |          |

# Reference

* [Angular](https://angular.io/)

* [AngularJS](https://angularjs.org/)

* [CHANGELOG](https://github.com/angular/angular/blob/master/CHANGELOG.md)

* [Angular 버저닝과 출시 계획](http://angularjs.blogspot.kr/2016/10/versioning-and-releasing-angular.html)

* [Made with Angular](https://www.madewithangular.com/#/categories/google)

* [Browser support](https://angular.io/guide/browser-support)
