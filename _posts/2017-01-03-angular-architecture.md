---
layout: post
title: Angular <strong>Architecture</strong>
subtitle: Angular의 파일 구조와 구성 요소
categories: angular
section: angular
description: Angular CLI를 사용하여 프로젝트를 생성하면 아래와 같은 파일 구조의 스캐폴딩이 생성된다. Angular 프로젝트는 컴포넌트, 디렉티브, 서비스, 모듈 등 Angular 구성요소와 각종 설정 파일로 구성된다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 프로젝트 파일의 구조

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

# 2. Angular 애플리케이션의 흐름

Angular 프로젝트 파일들은 Angular의 독자적인 처리 흐름에 의해 처리된다. 지금까지 살펴본 프로젝트 파일들이 어떠한 흐름으로 로드되고 실행되는지 살펴보도록 하자.

![angular-process](img/angular-process.png)
{: .w-700}

Angular 애플리케이션의 흐름
{: .desc-img}

## 2.1 index.html

웹 브라우저에 의해 가장 먼저 로딩되는 프로젝트 파일은 /my-app/dist/index.html이다. 이것은 ng build 명령어로 프로젝트 빌드를 실행하였을 때 /my-app/src/index.html에 번들링된 JavaScript 파일이 추가되어 자동으로 생성되는 파일이다.

Angular 애플리케이션을 기동하기 위해서는 많은 의존성 모듈(@angular/*, core-js, zone.js, RxJS 등)을 로드할 필요가 있는데 Angular는 모듈 번들러 [webpack](https://webpack.js.org/)을 사용하여 로드가 필요한 의존성 모듈을 번들링한 후, 수작업이 없이 간편하게 의존성 모듈을 로드할 수 있도록  자동화 기능을 제공한다.

2016년 08월 1.0.0-beta.11부터 Angular의 빌드 시스템은 SystemJS에서 Webpack으로 변경되었다.  
[We moved the build system from SystemJS to Webpack.](https://github.com/angular/angular-cli/blob/ed5f47dc22d5eb4a5d4b4ae2c8f7cb0ec1a999f3/CHANGELOG.md#100-beta11-webpack-2016-08-02)
{: .info}

의존성 모듈을 번들링하여 생성된 JavaScript 파일들이 로드되어 실행되면서 Angular 애플리케이션은 기동하기 시작한다. 번들링된 JavaScript 파일의 내용은 아래와 같다.

inline.bundle.js
: Webpack 유틸리티가 포함된 Webpack loader

polifills.bundle.js
: polyfill 의존성 모듈(core-js, zone.js)을 번들링한 파일

styles.bundle.js
: 스타일 정의를 번들링한 파일

vendor.bundle.js
: Angular 의존성 모듈(@angular/*, RxJS)을 번들링한 파일

main.bundle.js
: 개발자가 작성한 HTML, Javascript 등 소스코드를 번들링한 파일

## 2.2 main.ts

main.ts는 프로젝트의 메인 진입점(main entry point)으로 platformBrowserDynamic()에 의해 JIT 컴파일러가 실행되고 루트 모듈 AppModule(/src/app/app.module.ts)을 부트스트랩한다.

main.ts는 .angular-cli.json의 main 속성의 설정에 의해 로드된다.

```json
...
  "apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": [
        "assets",
        "favicon.ico"
      ],
      "index": "index.html",
      "main": "main.ts",
...
```

## 2.3 app.module.ts

app.module.ts은 @NgModule 데코레이터의 인자로 전달되는 메타 데이타에 애플리케이션 전체의 설정 정보를 기술한 루트 모듈 AppModule이다.

루트 모듈 AppModule은 루트 컴포넌트 AppComponent(/src/app/app.component.ts)를 부트스트랩한다.

## 2.4 app.component.ts

app.component.ts은 애플리케이션의 화면을 구성하는 뷰(View)를 생성하고 관리하는 컴포넌트(AppComponent)이다. 컴포넌트는 템플릿과 메타데이터, 컴포넌트 클래스로 구성되며 템플릿과 컴포넌트 클래스는 데이터 바인딩에 의해 연결된다. 메타데이터 객체의 selector 속성에 설정된 문자열(app-root)에 의해 HTML 요소와 같이 로드할 수 있다.

my-app 프로젝트의 경우 /dist/index.html의 \<app-root\>에 의해 AppComponent 컴포넌트의 뷰가 로드되어 \<app-root\>의 컨텐츠로 브라우저에 표시된다.

# 3. Angular의 구성 요소

Angular는 컴포넌트를 중심으로 Angular 구성요소를 조합하여 애플리케이션을 구축한다.

Angular의 핵심 구성요소는 아래와 같다.

- 컴포넌트 (Component)  
: 애플리케이션의 화면을 구성하는 <strong>뷰(View)</strong>를 생성하고 뷰의 상태와 이벤트를 관리한다. 컴포넌트는 템플릿과 메타데이터, 컴포넌트 클래스로 구성된다.

- 모듈 (Module)  
: 관련된 구성 요소를 하나로 묶어 애플리케이션을 구성하는 하나의 단위로 만드는 역할을 한다.

- 디렉티브 (Directive)  
: DOM을 변환하여 템플릿을 렌더링한다. 구조 디렉티브(Structural directive)와 속성 디렉티브(Attribute directive)가 있다.

- 서비스 (Service)  
: 다양한 목적의 애플리케이션 공통 로직을 담당한다. 컴포넌트에서 애플리케이션 전역 관심사를 분리하기 위해 사용하며 의존성 주입(Dependency Injection)이 가능한 클래스로 작성된다.

![angular-archtecture](./img/angular-archtecture.png)

Angular의 구성요소와 아키텍처
{: .desc-img}

## 3.1 컴포넌트

컴포넌트는 애플리케이션의 화면을 구성하는 <strong>뷰(View)</strong>를 생성하고 관리한다. 컴포넌트가 생성하는 뷰는 화면을 구성하는 한부분으로 재사용이 쉬운 구조로 분할할 수 있으며 분할된 컴포넌트를 조합하여 화면을 생성한다.

컴포넌트는 템플릿과 메타데이터, 컴포넌트 클래스로 구성된다.

![component-code](/img/component-code.png)

<!--
```typescript
// 모듈 임포트
import { Component } from '@angular/core';

// Component 데코레이터
@Component({
  selector: 'app-root',
  template: `
    <h1>안녕하세요 {{ "{{name" }}}}</h1>
    <hr>
    <input type="text" placeholder="이름을 입력하세요" #inputYourName>
    <button (click)="setName(inputYourName.value)">등록</button>  
  `
})
// 컴포넌트 클래스
export class AppComponent {
  name = 'Angular';

  setName(name) {
    this.name = name;
  }
}
```
-->

컴포넌트는 @Component 데코레이터를 가지고 있는 클래스이다. @Component 데코레이터는 바로 아래에 있는 클래스를 컴포넌트 클래스로 식별하며 컴포넌트와 뷰를 생성하는데 필요한 메타데이터 객체를 전달받아 컴포넌트를 정의한다. 

@Component 데코레이터에 전달된 메타데이터 객체의 selector 속성에는 컴포넌트를 HTML 요소처럼 사용할 수 있는 셀렉터를 설정한다. 셀렉터는 다른 컴포넌트의 템플릿 또는 HTML에서 HTML 요소와 같이 사용한다. 위 예제의 경우 /src/index.html 내에서 아래와 같이 호출된다.

```html
<app-root>Loading...</app-root>
```

템플릿과 컴포넌트 클래스는 데이터 바인딩을 통해 연결된다. 바인딩을 통해 클래스에서 템플릿으로 데이터를 전달하거나 템플릿에서 클래스로 이벤트를 전달한다.

![component-code-binding](/img/component-code-binding.png)

## 3.2 모듈

모듈은 관련된 구성 요소를 하나로 묶어 애플리케이션을 구성하는 하나의 단위로 만드는 역할을 한다.

컴포넌트는 단독으로 동작할 수 없으며 모듈에 등록되어야 한다. 컴포넌트뿐만 아니라 모든 구성요소는 모듈에 등록되어야 사용할 수 있다.

Angular 애플리케이션은 여러개의 모듈로 구성될 수 있으며 적어도 하나 이상의 모듈을 갖는다. 최상위에 위치하는 모듈을 루트 모듈이라하며 일반적으로 AppModule로 명명한다. 애플리케이션은 main.ts에서 루트 모듈을 부트스트랩핑하는 것으로 동작한다.

```typescript
// 모듈 임포트
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// 컴포넌트 임포트
import { AppComponent } from './app.component';

// NgModule 데코레이터 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
// 모듈 클래스
export class AppModule { }
```

모듈은 @NgModule 데코레이터를 가지고 있는 클래스이다. @NgModule 데코레이터 함수는 메타 데이터 객체를 전달받아 모듈을 정의한다.

## 3.3 디렉티브

Angular는 디렉티브에 의해 DOM을 변환하여 템플릿을 렌더링한다. 디렉티브는 컴포넌트의 템플릿에서 HTML 요소 또는 HTML 요소의 속성과 유사하게 사용된다.

디렉티브에는 구조 디렉티브(Structural directive)와 속성 디렉티브(Attribute directive)가 있다.

- 구조 디렉티브  
: DOM 요소를 추가, 삭제 등 DOM 트리를 동적으로 조작하여 레이아웃을 변경할 때 사용한다.
: ngIf, ngSwithch, ngFor

- 속성 디렉티브
: DOM의 모습이나 동작을 조작하기 위해 사용한다.
: ngClass, ngStyle

디렉티브는 @Directive 데코레이터를 가지고 있는 클래스이다. 사실은 컴포넌트도 디렉티브이다. 컴포넌트와 디렉티브의 차이는 템플릿을 가지고 있는가이다. 즉 컴포넌트는 템플릿이 있는 디렉티브이다.

## 3.4 서비스

애플리케이션의 다양한 목적의 비즈니스 로직을 담당하는 클래스이다. 컴포넌트에서 공통 처리 로직을 분리하기 위해 사용하며 의존성 주입(Dependency Injection)이 가능한 클래스로 작성된다. 서비스의 사용 사례는 아래와 같다.

- 로깅 서비스
- 데이터 공유 서비스
- 사용자 인증 서비스


# Reference

* [Angular](https://angular.io/)
