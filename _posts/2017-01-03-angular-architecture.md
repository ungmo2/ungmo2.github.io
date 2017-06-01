---
layout: post
title: Angular <strong>Architecture</strong>
subtitle: Angular의 파일 구조와 처리 흐름, 구성 요소
categories: angular
section: angular
description: Angular는 프레임워크이므로 웹 애플리케이션에 필요한 기본적인 기능의 구현체를 정형화된 구조로 제공한다. 이것을 바탕으로 우리의 애플리케이션에 요구되는 기능을 추가하는 방식으로 애플리케이션을 완성해 간다. 따라서 프레임워크의 학습은 정형화된 프레임워크의 구조에 익숙해지는 것으로 시작한다. Angular가 제공하는 기본 구조와 각 파일의 기능을 살펴보도록 하자. Angular CLI를 사용하여 프로젝트를 생성하면 아래와 같은 파일 구조의 스캐폴딩이 생성된다. Angular 프로젝트는 컴포넌트, 디렉티브, 서비스, 모듈 등 Angular 구성요소와 각종 설정 파일로 구성된다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. Angular 애플리케이션의 파일 구조

Angular는 프레임워크이므로 웹 애플리케이션에 필요한 기본적인 기능의 구현체를 정형화된 구조로 제공한다. 이것을 바탕으로 우리의 애플리케이션에 요구되는 기능을 추가하는 방식으로 애플리케이션을 완성해 간다. 따라서 프레임워크의 학습은 정형화된 프레임워크의 구조에 익숙해지는 것으로 시작한다. Angular가 제공하는 기본 구조와 각 파일의 기능을 살펴보도록 하자.

Angular CLI를 사용하여 프로젝트를 생성하면 아래와 같은 파일 구조의 스캐폴딩이 생성된다.

```bash
$ ng new my-app
$ cd my-app
```

```
my-app/
├── .angular-cli.json
├── .editorconfig
├── .git/
├── .gitignore
├── e2e/
│   ├── app.e2e-spec.ts
│   ├── app.po.ts
│   └── tsconfig.e2e.json
├── karma.conf.js
├── node_modules/
├── package.json
├── protractor.conf.js
├── README.md
├── src/
│   ├── app/
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json
└── tslint.json
```

우리가 앞으로 작성할 코드는 기본적으로 src 폴더에 소속된다.

## 1.1 src

Angular 프로젝트는 컴포넌트, 디렉티브, 서비스, 모듈 등 Angular 구성요소와 각종 설정 파일로 구성된다.

`src` 폴더는 Angular의 모든 구성요소, CSS, 이미지 등 애플리케이션 필수 파일을 담고 있다.

`src/app` 폴더에는 Angular 구성요소가 위치하게 된다. 현재는 컴포넌트와 모듈만 존재하지만 구성요소가 추가되면 이 폴더에 위치하게 된다. 개발자가 작성하는 대부분의 파일은 이곳에 포함된다.

- app/app.component.{ts, html, css, spec.ts}  
: 컴포넌트를 구성하는 AppComponent, HTML 템플릿, CSS, 유닛 테스트 파일. 컴포넌트 트리에서 루트 컴포넌트로 역할을 담당하게 된다.

- app/app.module.ts  
: Angular 구성요소를 등록하는 루트 모듈 AppModule.

- assets/*  
: 이미지 등과 같은 정적 파일을 위한 폴더. 프로젝트 생성 초기에는 빈 폴더이다.

- environments/*  
: 프로젝트 빌드 시에 사용될 프로덕션 또는 개발 환경 설정 파일.

- favicon.ico  
: 파비콘

- index.html  
: 웹사이트에 방문시 처음으로 로딩되는 디폴트 페이지. 루트 컴포넌트(/src/app/app.component.*)의 셀렉터인 \<app-root\>에 의해 루트 컴포넌트의 뷰가 로드되어 브라우저에 표시된다. 빌드 시에는 번들링된 JavaScript 파일이 자동 추가된 /dist/index.html이 생성된다.

![index.html](img/index.html.png)
{: .w-700}

빌드 시에 index.html에 자동 추가되는 JavaScript 파일
{: .desc-img}

- main.ts  
: 프로젝트의 메인 진입점. platformBrowserDynamic()에 의해 JIT 컴파일러가 실행되고 루트 모듈(AppModule)을 부트스트랩한다.

- polyfills.ts  
: Change Detection을 위한 zone.js와 ES6/ES7와 크로스 브라우저 웹 표준 지원을 위한 폴리필을 임포트한다. 자세한 내용은 [Browser support](https://angular.io/docs/ts/latest/guide/browser-support.html) 참조.

- styles.css  
: 애플리케이션 전역에 적용되는 글로벌 CSS.

- test.ts  
: 유닛 테스트를 위한 메인 진입점.

- tsconfig.{app|spec}.json  
: TypeScript 컴파일 옵션 설정 파일.

- typings.d.ts  
: TypeScript를 위한 타입 선언 파일.

## 1.2 그외의 파일

src 폴더 밖의 파일들은 테스트, 빌드, 배포 등을 위한 각종 설정 파일이다.

- e2e/  
: e2e(end-to-end) 테스트 관련 파일

- node_modules/  
: 의존 모듈 저장소. 패키지 매니저에 의해 package.json에 등록된 의존 모듈이 설치되는 장소이다.

- .angular-cli.json  
: Angular CLI를 위한 설정 파일. 상세한 설정 방법은 [Angular CLI Config Schema](https://github.com/angular/angular-cli/wiki/angular-cli) 참조.

- .editorconfig  
: 코드 에디터 기본 설정 파일. 상세한 설정 방법은 [http://editorconfig.org](http://editorconfig.org) 참조

- .gitignore  
: Git 소스 관리 제외 대상을 위한 설정 파일.

- karma.conf.js  
: [Karma test runner](https://karma-runner.github.io/1.0/index.html)를 위한 유닛 테스트 설정 파일. ng test 명령어 실행시 참조된다.

- package.json  
: 의존 모듈 관리를 위해 패키지 매니저가 사용하는 모듈 관리 파일.

- protractor.conf.js  
: e2e 테스트를 위해 [Protractor](http://www.protractortest.org/#/)가 사용하는 설정 파일. ng e2e 명령어 실행시 참조된다.

- README.md  
: 프로젝트의 개요를 기술한 README 파일. Angular CLI가 기본적인 내용을 자동 생성한다.

- tsconfig.json  
: TypeScript 컴파일 옵션 설정 파일

- tslint.json  
: [TSLint](https://palantir.github.io/tslint/)가 사용하는 linting(구문 체크) 설정 파일. ng lint 명령어 실행시 참조된다.

# 2. Angular 애플리케이션의 처리 흐름

Angular 프로젝트 파일들은 Angular의 독자적인 처리 흐름에 의해 처리된다. 지금까지 살펴본 프로젝트 파일들이 어떠한 흐름으로 로드되고 실행되는지 살펴보도록 하자.

![angular-process](img/angular-process.png)
{: .w-700}

Angular 애플리케이션의 흐름
{: .desc-img}

## 2.1 index.html

웹 브라우저에 의해 가장 먼저 로딩되는 프로젝트 파일은 /my-app/dist/index.html이다. 이것은 ng build 명령어로 프로젝트 빌드를 실행하였을 때 /my-app/src/index.html에 번들링된 JavaScript 파일이 추가되어 자동으로 생성되는 파일이다.

/my-app/dist/index.html는 빌드(ng build)의 결과물로 실제 배포시에는 서버로 이관된다. ng serve 명령어에 의해 내장개발 서버를 사용하여 로컬 환경에서 프로젝트를 실행(preview)하는 경우, Angular CLI 내부적으로 빌드를 자동 수행하므로 빌드(ng build)를 별도 실행하여 /my-app/dist/index.html를 생성할 필요는 없다. 자동으로 빌드되어 가상 드라이브에 저장되어 있는 index.html를 내장개발 서버가 로드한다고 이해하면 된다.
{: .info}

Angular 애플리케이션을 기동하기 위해서는 수많은 의존성 모듈(@angular/*, core-js, zone.js, RxJS 등)과 TypeScript 파일의 컴파일 결과물인 JavaScript 파일을 로드할 필요가 있다. Angular는 모듈 번들러 [webpack](https://webpack.js.org/)을 사용하여 의존성 모듈과 JavaScript 파일을 번들링한 후, 수작업없이 간편하게 로드할 수 있도록 자동화 기능을 제공한다.

2016년 08월 1.0.0-beta.11부터 Angular의 빌드 시스템은 SystemJS에서 Webpack으로 변경되었다.  
[We moved the build system from SystemJS to Webpack.](https://github.com/angular/angular-cli/blob/ed5f47dc22d5eb4a5d4b4ae2c8f7cb0ec1a999f3/CHANGELOG.md#100-beta11-webpack-2016-08-02)
{: .info}

번들링의 결과물로 생성된 JavaScript 파일들이 로드되어 실행되면서 Angular 애플리케이션은 기동하기 시작한다. 번들링된 JavaScript 파일은 아래와 같다.

inline.bundle.js
: Webpack 유틸리티가 포함된 Webpack loader

polifills.bundle.js
: polyfill 의존성 모듈(core-js, zone.js)을 번들링한 파일

styles.bundle.js
: 스타일 정의를 번들링한 파일

vendor.bundle.js
: Angular 의존성 모듈(@angular/*, RxJS)을 번들링한 파일

main.bundle.js
: 개발자가 작성한 컴포넌트, 디렉티브, 서비스 등 소스코드를 번들링한 파일

## 2.2 main.ts

main.ts는 프로젝트의 메인 진입점(main entry point)이다. platformBrowserDynamic()에 의해 JIT 컴파일러가 실행되고 루트 모듈 AppModule(/src/app/app.module.ts)을 부트스트랩한다.

main.ts는 .angular-cli.json의 main 속성의 설정에 의해 로드된다.

```json
...
  "apps": [
    {
      ...
      "index": "index.html",
      "main": "main.ts",
...
```

## 2.3 app.module.ts

app.module.ts은 @NgModule 데코레이터의 인자로 전달되는 메타데이타에 애플리케이션 전체의 설정 정보를 기술한 루트 모듈 AppModule이다.

루트 모듈 AppModule은 루트 컴포넌트 AppComponent(/src/app/app.component.ts)를 부트스트랩한다.

## 2.4 app.component.ts

app.component.ts은 애플리케이션의 화면을 구성하는 뷰(View)를 생성하고 관리하는 컴포넌트(AppComponent)이다. 컴포넌트는 템플릿과 메타데이터, 컴포넌트 클래스로 구성되며 템플릿과 컴포넌트 클래스는 데이터 바인딩에 의해 연결된다. 메타데이터 객체의 selector 속성에 설정된 문자열(app-root)에 의해 HTML 요소와 같이 로드할 수 있다.

my-app 프로젝트의 경우 /dist/index.html의 \<app-root\>에 의해 AppComponent 컴포넌트의 뷰가 로드되어 \<app-root\>의 컨텐츠로 브라우저에 표시된다.

# 3. Angular의 구성 요소

Angular의 핵심 구성요소는 아래와 같다.

컴포넌트 (Component)  
: 컴포넌트는 템플릿과 메타데이터, 컴포넌트 클래스로 구성되며 데이터 바인딩에 의해 연결된다. 컴포넌트는 화면을 구성하는 <strong>뷰(View)</strong>를 생성하고 관리하는 것이 주된 역할이며 화면은 1개 이상의 컴포넌트를 조립하여 구성한다.

디렉티브 (Directive)  
: 템플릿 내에서 HTML 요소 또는 HTML 요소의 속성과 유사하게 사용되며 DOM의 표현이나 구조를 변경할 수도 있고 로직을 가질 수도 있다. 컴포넌트와의 차이는 뷰(템플릿)를 소유하지 않는다는 것이다. 디렉티브는 구조 디렉티브(Structural directive)와 속성 디렉티브(Attribute directive), 커스텀 디렉티브(Cunstom directive)로 구분할 수 있다.

서비스 (Service)  
: 다양한 목적의 애플리케이션 공통 로직을 담당한다. 컴포넌트에서 애플리케이션 전역 관심사를 분리하기 위해 사용하며 의존성 주입(Dependency Injection)이 가능한 클래스로 작성된다.

라우터(Router)
: 컴포넌트를 교체하는 방법으로 뷰를 전환하여 화면 간 이동을 구현한다.

모듈 (Module)  
: 관련된 구성 요소를 하나로 묶어 애플리케이션을 구성하는 하나의 단위로 만드는 역할을 한다. 컴포넌트, 디렉티브, 서비스 등의 Angular의 구성요소는 모듈에 등록되어야 사용할 수 있다.

Angular는 컴포넌트를 중심으로 Angular 구성요소를 조합하여 애플리케이션을 구축한다. 뷰를 담당하는 컴포넌트를 중심으로 화면을 구성하고 디렉티브와 서비스를 사용하여 애플리케이션 전역 관심사를 분리하고 컴포넌트는 필요 시 디렉티브와 서비스를 사용한다. 라우터(Router)는 컴포넌트를 교체하는 방법으로 뷰를 전환하여 화면 간 이동을 구현하고 모듈은 관련된 구성 요소를 하나로 묶어 애플리케이션을 구성하는 하나의 단위로 만드는 역할을 한다.

![angular-archtecture](./img/angular-archtecture.png)

Angular의 구성요소와 아키텍처
{: .desc-img}

# Reference

* [Angular](https://angular.io/)
