---
layout: post
title: Angular <strong>CLI</strong>
subtitle: Angular CLI를 사용한 프로젝트의 생성, 구성요소 추가와 빌드
categories: angular
section: angular
description: Angular CLI는 간단한 명령어를 사용하여 Angular 프로젝트 스캐폴딩(scaffolding)을 생성, 실행, 빌드할 수 있으며 다양한 구성 요소를 선별적으로 추가할 수 있는 커맨드-라인 인터페이스(command line interface)이다. 개발용 서버를 내장하고 있어서 빌드없이 프로젝트를 실행하고 확인할 수 있다.
---

* TOC
{:toc}

![angular logo](/img/angular-logo.png)

# 1. Angular CLI란?

[Angular CLI](https://cli.angular.io/)는 간단한 명령어를 사용하여 Angular 프로젝트 스캐폴딩(scaffolding)을 생성, 실행, 빌드할 수 있으며 다양한 구성 요소를 선별적으로 추가할 수 있는 커맨드-라인 인터페이스(command line interface)이다. 개발용 서버를 내장하고 있어서 간단히 프로젝트를 실행시켜서 동작을 확인할 수 있다.

프레임워크의 개발환경을 구축하는 것은 쉽지 않은 일이다. 프로젝트 구성요소를 프레임워크 구조에 맞게 하나하나 생성하여야 하며 프로젝트 의존성 관리나 다양한 프로젝트 설정 구성 또한 만만한 작업이 아니다. 또한 익숙치 않은 프레임워크의 파일 구조나 코딩 컨벤션 등의 스타일 가이드를 작성하는 일은 많은 시행착오를 거쳐야 하는 작업이다. Angular CLI는 Angular 프로젝트 스캐폴딩을 간단한 명령어로 생성해 주어 개발환경 구축에 소요되는 시간을 최소화할 뿐 아니라 표준적인 스타일 가이드를 제공한다.

Angular CLI가 지원하는 기능은 아래와 같다.

- Angular 프로젝트 생성
- Angular 프로젝트에 컴포넌트, 디렉티브, 파이프, 서비스, 클래스, 인터페이스 등의 구성 요소 추가
- LiveReload를 지원하는 내장 개발 서버를 사용한 Angular 프로젝트 실행
- Unit/E2E(end-to-end) 테스트 환경 지원
- 배포를 위한 Angular 프로젝트 패키징

Angular는 Angular CLI를 위한 별도의 웹페이지 [https://cli.angular.io/](https://cli.angular.io/)를 제공한다.

![angular-cli-website](./img/angular-cli-website.png)

각종 명령어와 옵션, Angular CLI의 설정 파일인 .angular-cli.json에 대한 상세한 문서를 제공하고 있으므로 참고하기 바란다.

Angular CLI를 사용하기 위해서는 어떠한 절차가 필요한지 그리고 무엇을 할 수 있는지 알아보자.

Angular CLI 1.5.0을 기준으로 한다. Angular CLI의 변경이력은 [angular-cli releases](https://github.com/angular/angular-cli/releases)에서 참조 가능하다.
{: .info}

# 2. Angular CLI 설치

Angular CLI는 Node.js 6.9.0, npm 3.0.0 이상이 필요하다.

- [Prerequisites](https://github.com/angular/angular-cli#prerequisites)

- [Node.js 설치와 npm 업데이트](http://poiemaweb.com/nodejs-basics#2-install)

Angular CLI는 npm으로 설치할 수 있다. 아래의 명령어를 실행하여 Angular CLI를 설치한다.

```bash
$ npm install -g @angular/cli
```

만일 Angular CLI 1.5.0 이전 버전이 설치되어 있다면 다음과 같이 업데이트를 실행한다.

Angular CLI 1.0.0 이전 버전의 경우 패키지명이 angular-cli이었으나 Angular CLI 1.0.0부터 @angular/cli으로 변경되었다.
{: .info}

```bash
# Angular CLI 1.0.0 이후 버전을 삭제하는 경우
$ npm uninstall -g @angular/cli
# Angular CLI 1.0.0 이전 버전을 삭제하는 경우
$ npm uninstall -g angular-cli
# npm 5 이상
$ npm cache verify
# npm 5 미만
$ npm cache clean
$ npm install -g @angular/cli
```

설치가 완료되면 `ng` 명령어를 사용할 수 있다. 설치가 성공적으로 완료되었는지 버전을 출력하여 확인하여 보자.

```
$ ng version

    _                      _                 ____ _     ___
   / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
  / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
 / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
/_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
               |___/

Angular CLI: 1.5.0
Node: 8.4.0
OS: darwin x64
Angular: 5.0.0
... animations, common, compiler, compiler-cli, core, forms
... http, language-service, platform-browser
... platform-browser-dynamic, router

@angular/cli: 1.5.0
@angular-devkit/build-optimizer: 0.0.32
@angular-devkit/core: 0.0.20
@angular-devkit/schematics: 0.0.35
@ngtools/json-schema: 1.1.0
@ngtools/webpack: 1.8.0
@schematics/angular: 0.1.0
typescript: 2.4.2
webpack: 3.8.1
```

Angular CLI의 사용법을 참조하기 위해서는 `ng help` 명령어를 사용한다.

```bash
$ ng help
```

# 3. 프로젝트 생성

Angular 프로젝트를 생성하기 위해서는 `ng new` 명령어를 사용한다. 

```bash
$ ng new <project-name>
```

ng new 명령어 다음에 프로젝트명을 지정하면 프로젝트명과 일치하는 새로운 프로젝트 폴더가 생성되고 스캐폴딩(프로젝트 기본 골격)이 작성된다.

프로젝트명을 my-app로 지정하여 프로젝트를 생성하여 보자.

```bash
$ ng new my-app
  create my-app/README.md (1021 bytes)
  create my-app/.angular-cli.json (1241 bytes)
  create my-app/.editorconfig (245 bytes)
  create my-app/.gitignore (516 bytes)
  create my-app/src/assets/.gitkeep (0 bytes)
  create my-app/src/environments/environment.prod.ts (51 bytes)
  create my-app/src/environments/environment.ts (387 bytes)
  create my-app/src/favicon.ico (5430 bytes)
  create my-app/src/index.html (292 bytes)
  create my-app/src/main.ts (370 bytes)
  create my-app/src/polyfills.ts (2667 bytes)
  create my-app/src/styles.css (80 bytes)
  create my-app/src/test.ts (1085 bytes)
  create my-app/src/tsconfig.app.json (211 bytes)
  create my-app/src/tsconfig.spec.json (304 bytes)
  create my-app/src/typings.d.ts (104 bytes)
  create my-app/e2e/app.e2e-spec.ts (288 bytes)
  create my-app/e2e/app.po.ts (208 bytes)
  create my-app/e2e/tsconfig.e2e.json (235 bytes)
  create my-app/karma.conf.js (923 bytes)
  create my-app/package.json (1311 bytes)
  create my-app/protractor.conf.js (722 bytes)
  create my-app/tsconfig.json (363 bytes)
  create my-app/tslint.json (2985 bytes)
  create my-app/src/app/app.module.ts (314 bytes)
  create my-app/src/app/app.component.css (0 bytes)
  create my-app/src/app/app.component.html (1120 bytes)
  create my-app/src/app/app.component.spec.ts (986 bytes)
  create my-app/src/app/app.component.ts (207 bytes)
Installing packages for tooling via npm.
Installed packages for tooling via npm.
Successfully initialized git.
Project 'my-app' successfully created.
```

프로젝트가 생성되고 Angular CLI의 기본 패키지 매니저인 npm을 사용하여 프로젝트 의존 모듈도 설치되었다. 기본 패키지 매니저를 npm 대신 [yarn](https://yarnpkg.com)을 사용하는 방법도 있다.

기본 패키지 매니저는 npm으로 설정되어 있다. 아래의 명령어로 확인할 수 있다.

```bash
$ ng get --global packageManager
npm
```

기본 패키지 매니저를 yarn으로 변경하기 위해서는 아래의 명령어를 실행한다.

```bash
$ ng set --global packageManager=yarn
$ ng get --global packageManager
yarn
```

이후 기본 패키지 매니저를 npm로 변경하고자 할 때에는 아래의 명령어를 사용한다.  

```bash
$ ng set --global packageManager=npm
$ ng get --global packageManager
npm
```

기본 패키지 매니저를 변경하지 않고 yarn을 사용하려면 프로젝트 생성 시에 의존 모듈의 설치를 스킵하고 프로젝트 생성 이후 yarn으로 의존 모듈의 설치를 실행한다.

```bash
$ ng new --skip-install my-app
$ cd my-app && yarn
yarn install v1.2.1
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Saved lockfile.
```

프로젝트가 생성되면 아래와 같은 파일 구조의 스캐폴딩이 생성된다. 이것은 [Angular 스타일 가이드](https://angular.io/styleguide)의 기본 애플리케이션 구조, 네이밍 룰, 코딩 컨벤션 등을 준수하여 생성된 것이다.

```
my-app/
├── .git/
├── e2e/
├── node_modules/
├── src/
├── .angular-cli.json
├── .editorconfig
├── .gitignore
├── karma.conf.js
├── package.json
├── protractor.conf.js
├── README.md
├── tsconfig.json
└── tslint.json
```

Angular 프로젝트의 파일 구조 및 구성요소에 대한 설명은 [Angular의 파일 구조와 구성 요소](http://poiemaweb.com/angular-architecture)을 참조하기 바란다.

# 4. 프로젝트 실행

프로젝트를 로컬 환경에서 실행(preview)하기 위해서는 `ng serve` 명령어를 사용한다.

```bash
$ cd <project-name>
$ ng serve
```

앞에서 생성한 my-app을 실행하여 보자.

```bash
$ cd my-app
$ ng serve
** NG Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
Date: 2017-11-03T03:42:09.740Z
Hash: 0c36d0c93a3e0d36f83f
Time: 7748ms
chunk {inline} inline.bundle.js (inline) 5.79 kB [entry] [rendered]
chunk {main} main.bundle.js (main) 20.7 kB [initial] [rendered]
chunk {polyfills} polyfills.bundle.js (polyfills) 554 kB [initial] [rendered]
chunk {styles} styles.bundle.js (styles) 33.9 kB [initial] [rendered]
chunk {vendor} vendor.bundle.js (vendor) 7.02 MB [initial] [rendered]

webpack: Compiled successfully.
```

ng serve 명령어를 실행하면 Webpack을 사용하여 소스코드와 의존 모듈을 번들링(Bundling)하고 Angular CLI가 내장하고 있는 개발용 서버를 실행한다.

브라우저에서 localhost:4200으로 개발용 서버에 접속한다.

- [http://localhost:4200](http://localhost:4200)

`--open`(축약형 -o) 옵션을 추가하면 자동으로 브라우저를 실행하여 준다.

```bash
$ ng serve --open
```

![app works](./img/ng-serve-1.png)

이미 포트 4200번을 사용하고 있다면 Angular CLI 내장 서버를 실행할 수 없다. 포트번호를 변경하고자는 경우에는 다음과 같이 `--port`(축약형 -p) 옵션을 추가한다.

```bash
$ ng serve --port 4201
```

Angular CLI가 내장하고 있는 개발용 서버는 코드의 변경을 감지하여 자동으로 브라우저를 리로드하는 LiveReload 기능을 제공한다. 따라서 코드 수정 후 파일을 저장하면 코드 변경을 자동 반영하여 번들링이 수행되고 브라우저가 리로드되어 코드 변경 결과를 즉시 확인할 수 있다.

브라우저와 서버를 종료시키지 않은 상태에서 코드(my-app/src/app/app.component.ts)를 수정해 보자.

```typescript
// my-app/src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app';
  // 'app'을 'Hello Angular!'로 수정한다.
  title = 'Hello Angular!';
}
```

변경된 파일을 저장하면 잠시후 브라우저가 리로드되고 변경이 반영된다.

![app works](./img/ng-serve-2.png)

# 5. 프로젝트 구성 요소 추가

프로젝트에 새로운 구성요소를 추가하기 위해서는 `ng generate` 명령어를 사용한다. ng generate 명령어는 축약형 `ng g`와 동일하게 동작한다.

| 추가 대상 구성요소 | 명령어                         | 축약형
|:-------|:-----------------------------|:----------
| 컴포넌트 | ng generate component component-name | ng g c component-name
| 디렉티브 | ng generate directive directive-name | ng g d directive-name
| 파이프   | ng generate pipe pipe-name           | ng g p pipe-name   
| 서비스   | ng generate service service-name    | ng g s service-name
| 모듈    | ng generate module module-name       | ng g m module-name
| 가드    | ng generate guard guard-name         | ng g g guard-name
| 클래스   | ng generate class class-name        | ng g cl class-name
| 인터페이스 |	ng generate interface interface-name | ng g i interface-name
| Enum	 | ng generate enum enum-name           | ng g e enum-name

추가 대상 구성요소 중에서 컴포넌트, 디렉티브, 서비스, 모듈의 추가 방법을 알아보도록 한다.

## 5.1 컴포넌트 추가

프로젝트에 새로운 컴포넌트를 추가하기 위해서는 `ng generate component` 명령어를 사용한다. home 컴포넌트를 추가해보자.

```bash
$ ng g c home
  create src/app/home/home.component.css (0 bytes)
  create src/app/home/home.component.html (23 bytes)
  create src/app/home/home.component.spec.ts (614 bytes)
  create src/app/home/home.component.ts (261 bytes)
  update src/app/app.module.ts (388 bytes)
```

`ng generate component home` 명령어를 실행하면 Angular CLI는 아래와 같이 동작한다.

- src/app/home 폴더를 생성한다.
: 컴포넌트는 URL 경로의 단위(화면 단위)가 될 수 있기 때문에 폴더로 구분된다.
- src/app/home 폴더에 4개의 파일을 추가한다.
  - home.component.css
  : 컴포넌트 HTML 템플릿의 스타일링을 위한 CSS 파일
  - home.component.html
  : 컴포넌트 HTML 템플릿을 위한 HTML 파일
  - home.component.spec.ts
  : 컴포넌트 유닛 테스트를 위한 스펙 파일
  - home.component.ts
  : 컴포넌트 클래스 파일
- 루트 모듈 src/app/app.module.ts에 새롭게 추가된 컴포넌트를 등록한다.
: 컴포넌트 클래스를 import하고 @NgModule 데코레이터의 declarations 프로퍼티에 컴포넌트 클래스를 등록한다.

### 5.1.1 파일명의 암묵적 변경

주의해야 할 것은 ng generate component 명령어 다음에 지정한 컴포넌트명이 실제 생성된 파일명과 다를 수 있다는 것이다. 예를 들어 아래와 같이 새로운 컴포넌트를 추가해 보자.

```bash
$ ng g c newComponent
  create src/app/new-component/new-component.component.css (0 bytes)
  create src/app/new-component/new-component.component.html (32 bytes)
  create src/app/new-component/new-component.component.spec.ts (671 bytes)
  create src/app/new-component/new-component.component.ts (296 bytes)
  update src/app/app.module.ts (422 bytes)
```

컴포넌트명을 newComponent로 지정하였음에도 불구하고 실제로 생성된 파일명은 new-component.component.\*이다. Angular CLI는 지정된 컴포넌트명의 대소문자를 구별하여 정해진 규칙에 따라 파일명을 암묵적으로 변경한다.

아래의 컴포넌트명은 Angular CLI에 의해 결국 같은 파일명 new-component.component.\*으로 변경된다.

```bash
$ ng g c newComponent
$ ng g c NewComponent
$ ng g c new-component
```

이와 같은 파일명의 암묵적 변경은 컴포넌트뿐만이 아니라 ng generate 명령어로 추가되는 모든 구성요소에 모두 적용된다. 혼란을 방지하는 위해 ng generate 명령어에 지정하는 구성요소 명칭은 하이픈으로 구별된 케밥 표기법(kebab-case) 명칭을 사용하는 것이 좋다.

### 5.1.2 selector 프로퍼티값의 접두사(prefix)와 컴포넌트 클래스 이름

생성된 컴포넌트 파일 src/app/home/home.component.ts을 살펴보자.

```typescript
// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

이번 장에서 주목할 것은 ng generate component 명령어에 지정한 컴포넌트명에 의해 자동 생성된 5행 selector 프로퍼티값 'app-home'과 9행 컴포넌트 클래스명 HomeComponent이다.

5행을 보면 메타데이터 객체의 selector 프로퍼티에 'app-home'이 설정되어 있다. selector 프로퍼티는 컴포넌트를 마크업으로 표현할 때 사용하는 이름이다. 예를 들어 루트 컴포넌트인 src/app/app.component.ts에서 home 컴포넌트를 사용하려면 src/app/app.component.html를 아래와 같이 수정한다.

```html
<!-- src/app/app.component.html -->
<h1>{{ "{{title" }}}}</h1>
<app-home></app-home>
```

selector 프로퍼티값 'app-home'는 `ng generate component home` 명령어에서 지정한 컴포넌트명 home 앞에 접두사(prefix) app이 자동으로 추가된 값이다. Angular는 다른 애플리케이션의 selector 또는 HTML 요소와 충돌을 방지하기 위해 접두사를 추가하여 케밥 표기법으로 명명하는 것을 권장하고 있다. 자세한 내용은 [Angular Style Guide: Custom prefix for components](https://angular.io/guide/styleguide#custom-prefix-for-components)을 참조하기 바란다.

기본 접두사는 app이며 이것은 .angular-cli.json에서 확인할 수 있다.

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "project": {
    "name": "my-app"
  },
  "apps": [
    {
      ...
      "prefix": "app",
      ...
    }
  ],
  ...
}
```

.angular-cli.json의 prefix 프로퍼티값을 수정하면 이후 생성되는 컴포넌트의 셀렉터 접두사는 수정된 값으로 변경된다. 프로젝트 생성 단계에서부터 컴포넌트의 기본 셀렉터 접두사를 변경하고 싶은 경우에는 ng new 명령어로 프로젝트 생성 시에 `--prefix` 옵션을 추가한다.

```bash
$ ng new my-app --prefix todos
```

컴포넌트 클래스(HomeComponent)의 이름은 ng generate component 명령어에 지정한 컴포넌트 이름을 파스칼 표기법(PascalCase)으로 자동 변경하여 생성된다. 컴포넌트 클래스 이름은 루트 모듈에 자동으로 import되고 @NgModule 데코레이터의 declarations 프로퍼티에 자동으로 추가된다.

### 5.1.3 templateUrl, styleUrls 프로퍼티와 template, styles 프로퍼티

templateUrl, styleUrls 프로퍼티는 외부 파일을 로드하기 위해 사용한다.

- templateUrl  
: 외부 파일로 작성된 HTML 템플릿(컴포넌트의 뷰를 정의)의 경로

- styleUrls  
: 외부 파일로 작성된 CSS 파일의 경로

```typescript
// src/app/home/home.component.ts
...
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
...
```

위 예제의 경우 컴포넌트는 같은 폴더 내의 외부 파일 home.component.html과 home.component.css를 HTML 템플릿과 CSS로 사용한다. 템플릿 또는 CSS가 간단한 경우에는 메타데이터 내부에 직접 기술할 수도 있다. 이때 templateUrl, styleUrls 프로퍼티 대신 template, styles 프로퍼티를 사용한다.

```typescript
// src/app/home/home.component.ts
...
@Component({
  selector: 'app-home',
  template: `
    <p>home works!</p>
  `,
  styles: [`
    p { color: red; }
  `]
})
...
```

ng generate component 명령어를 사용하여 컴포넌트를 추가할 때 HTML 템플릿과 CSS를 외부 파일로 생성하지 않고 인라인 HTML 템플릿과 CSS를 사용하고자 하는 경우에는 아래의 명령어를 사용한다.

```bash
# 인라인 HTML 템플릿을 사용하는 경우
$ ng g c home --inline-template
# 인라인 CSS를 사용하는 경우
$ ng g c home --inline-style
# 인라인 HTML 템플릿과 인라인 CSS를 사용하는 경우
$ ng g c home --inline-template --inline-style
```

## 5.2 디렉티브 추가

프로젝트에 새로운 디렉티브를 추가하기 위해서는 `ng generate directive` 명령어를 사용한다.

```bash
$ ng g d highlight
  create src/app/highlight.directive.spec.ts (236 bytes)
  create src/app/highlight.directive.ts (147 bytes)
  update src/app/app.module.ts (506 bytes)
```

ng generate directive highlight 명령어를 실행하면 Angular CLI는 아래와 같이 동작한다.

- 루트 폴더에 2개의 파일을 추가한다.
  - highlight.directive.spec.ts  
  : 디렉티브 유닛 테스트를 위한 스펙 파일
  - highlight.directive.ts
  : 디렉티브 클래스 파일
- 루트 모듈 src/app/app.module.ts에 새롭게 추가된 디렉티브를 등록한다.  
: 디렉티브를 import하고 @NgModule 데코레이터의 declarations 프로퍼티에 디렉티브를 등록한다.

컴포넌트를 추가할 때와는 달리 디렉티브를 위한 폴더는 생성되지 않으며 기본적으로 src/app/에 추가된다.  

생성된 highlight.directive.ts를 살펴보면 @Directive 데코레이터 함수에 전달된 메타데이터 객체의 selector 프로퍼티값으로 'appHighlight'이 설정되었다.

```typescript
// src/app/highlight.directive.ts
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class MyDirectiveDirective {

  constructor() { }

}
```

이것은 .angular-cli.json의 기본 접두사 app과 ng generate directive 명령어에 지정한 디렉티브명으로 합성된 디렉티브 셀렉터 이름으로 카멜 표기법(camelCase)으로 작성된다.

커스텀 디렉티브의 이름은 HTML 어트리뷰트처럼 사용된다. 디렉티브의 상세한 내용은 이후 자세히 다루도록 한다.

```html
<p appHighlight>Highlight Directive!</p>
```

## 5.3 모듈 추가

프로젝트에 새로운 모듈을 추가하기 위해서는 `ng generate module` 명령어를 사용한다.

```bash
$ ng g m todos
  create src/app/todos/todos.module.ts (189 bytes)
```

ng generate module todos 명령어를 실행하면 Angular CLI는 아래와 같이 동작한다.

- src/app/todos 폴더를 생성한다.  
- src/app/todos 폴더에 1개의 파일을 추가한다.
  - todos.module.ts   
  : 모듈 클래스 파일

모듈을 사용하기 위해 다른 모듈의 imports 프로퍼티에 모듈을 추가하여야 한다.

다음은 루트 모듈에 모듈를 추가하는 예제이다.

```typescript
// src/app/app.module.ts
...
import { TodosModule } from './todos/todos.module';

@NgModule({
  ...
  imports: [
    ...
    TodosModule
  ],
  bootstrap: [AppComponent]
})
```

## 5.4 서비스 추가

프로젝트에 새로운 서비스를 추가하기 위해서는 `ng generate service` 명령어를 사용한다.

```bash
$ ng g s user
  create src/app/user.service.spec.ts (362 bytes)
  create src/app/user.service.ts (110 bytes)
```

ng generate service user 명령어를 실행하면 Angular CLI는 아래와 같이 동작한다.

- 루트 폴더에 2개의 파일을 추가한다.
  - user.service.spec.ts  
  : 서비스 유닛 테스트를 위한 스펙 파일
  - user.service.ts
  : 서비스 클래스 파일

컴포넌트를 추가할 때와는 달리 서비스를 위한 폴더는 생성되지 않으며 기본적으로 src/app/에 추가된다. 그리고 서비스를 사용하기 위해 모듈 또는 컴포넌트의 providers 프로퍼티에 서비스를 등록하여야 한다.

다음은 루트 모듈에 서비스를 추가하는 예제이다.

```typescript
// src/app/app.module.ts
...
import { UserService } from './user.service';

@NgModule({
  ...
  providers: [
    ...
    UserService
  ],
  bootstrap: [AppComponent]
})
```

## 5.5 클래스 추가

프로젝트에 새로운 클래스를 추가하기 위해서는 `ng generate class` 명령어를 사용한다.

```bash
$ ng g cl user
  create src/app/user.ts (22 bytes)
```

테스트를 위한 스펙 파일을 함께 생성하기 위해서는 `--spec` 옵션을 추가한다.

```bash
$ ng g cl user --spec
  create src/app/user.spec.ts (146 bytes)
  create src/app/user.ts (22 bytes)
```

# 6. 프로젝트 빌드

프로젝트의 개발 완료 이후 배포를 위해서는 `ng build` 명령어를 사용한다.

```bash
$ ng build
Date: 2017-11-03T04:27:56.910Z
Hash: f7ca522bb5d0bd277c5b
Time: 8171ms
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry] [rendered]
chunk {main} main.bundle.js, main.bundle.js.map (main) 12.2 kB [initial] [rendered]
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 199 kB [initial] [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 11.3 kB [initial] [rendered]
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.29 MB [initial] [rendered]
```

빌드가 완료되면 프로젝트 루트에 빌드 결과물이 포함된 dist 폴더가 생성된다.

## 6.1 트랜스파일링과 의존 모듈 번들링

TypeScript 기반으로 개발이 진행되는 Angular 애플리케이션은 TypeScript를 JavaScript로 변환하여야 한다. 또한 의존 모듈의 해결이 필요한데 수작업으로 프로젝트 의존 모듈을 HTML의 script 태그에 기술하는 것은 매우 곤란한 일이다.

Angular CLI로 새로운 프로젝트를 생성할 경우, 의존 모듈의 설치는 기본 패키지 매니저인 npm으로 자동화되어 진행된다. 이때 설치되는 의존 모듈은 약 1,000여 개로 의존성 관리를 위해 수작업은 현실적이지 않다. Angular CLI의 빌드 기능은 의존성 관리를 위한 작업을 자동화하여 진행한다.

Angular CLI 빌드 기능은 내부적으로 모듈 번들러 [webpack](https://webpack.github.io/)을 사용하며 아래와 같은 작업의 자동화를 지원한다.

- TypeScript에서 JavaScript로의 트랜스파일링
- 디버깅 용도의 map 파일 생성
- 의존 모듈과 HTML, CSS, JavaScript 번들링
- [AoT 컴파일](https://angular.io/guide/aot-compiler)
- 소스코드의 문법 체크
- 코드 규약 준수 여부 체크
- 불필요한 코드의 삭제 및 압축

Angular CLI 빌드 기능은 소스코드와 의존 모듈을 번들링한다. 이때 번들링되는 코드는 JavaScript뿐만이 아니라 HTML, CSS까지 JavaScript 파일 내에 번들링된다. 또한 index.html에 번들링된 파일 4개를 로드하기 위한 태그를 추가한다.

빌드 이전과 빌드 이후의 index.html을 비교하여 보자.

```html
<!-- src/index.html -->
...
<body>
  <app-root></app-root>
</body>
</html>
```

```html
<!-- dist/index.html -->
...
<body>
  <app-root></app-root>
<script type="text/javascript" src="inline.bundle.js"></script><script type="text/javascript" src="polyfills.bundle.js"></script><script type="text/javascript" src="styles.bundle.js"></script><script type="text/javascript" src="vendor.bundle.js"></script><script type="text/javascript" src="main.bundle.js"></script></body>
</html>
```

빌드 처리는 아래 그림과 같이 진행되며 빌드가 완료되면 dist 폴더가 추가되고 그 내부에 빌드 결과물이 생성된다. 

![build-dist](./img/build-dist.png)

빌드 처리의 흐름
{: .desc-img}

## 6.2 프로덕션 빌드

ng build 명령어를 실행하면 Angular CLI는 src/environments/environments.ts 파일을 참조하여 빌드를 수행한다.

```typescript
// src/environments/environments.ts
export const environment = {
  production: false
};
```

이때 실행된 빌드는 개발환경 빌드로 프로덕션 용도로 최적화되어 있지 않다. 프로덕션 빌드를 수행하기 위해서는 아래의 명령어를 실행한다.

```bash
$ ng build --target=production
# 위 명령어의 축약형은 아래와 같다
$ ng build -prod
Date: 2017-11-03T04:38:25.977Z
Hash: 7e959f7638e405b0a901
Time: 16502ms
chunk {0} polyfills.ad37cd45a71cb38eee76.bundle.js (polyfills) 61.1 kB [initial] [rendered]
chunk {1} main.bb7621eb58c5122ee47e.bundle.js (main) 152 kB [initial] [rendered]
chunk {2} styles.d41d8cd98f00b204e980.bundle.css (styles) 0 bytes [initial] [rendered]
chunk {3} inline.199d88dc6afcf3d9b23c.bundle.js (inline) 1.45 kB [entry] [rendered]
```

프로덕션 빌드 시에는 src/environments/environment.prod.ts 파일을 참조하여 빌드를 수행한다. 프로덕션 빌드와 개발환경 빌드에 기본 적용되는 옵션의 차이는 아래와 같다.

| Flag             | -dev  | -prod    |
|:-----------------|:-----:|:--------:|
| --aot            | false | true
| --environment    | dev   | prod
| --output-hashing | media | all
| --sourcemaps     | true  | false
| --extract-css    | false | true

또한 프로덕션 빌드 시에는 UglifyJS를 통하여 데드 코드의 제거가 자동 실행된다.

## 6.3 AoT(Ahead-of Time) 컴파일

Angular CLI의 빌드 기능은 TypeScript를 JavaScript로 트랜스파일링한다. 사실은 TypeScript뿐만 아니라 컴포넌트의 템플릿 또한 컴파일이 필요하다. 템플릿은 빌드 시에 컴파일되지 않고 런타임에 JIT(Just-In-Time) 컴파일된다. 단, 프로덕션 빌드시는 AoT 컴파일이 자동 적용된다.

```bash
# AoT 컴파일
$ ng build -aot
# 프로덕션 빌드: AoT 컴파일이 자동 적용된다.
$ ng build -prod
```

AoT 컴파일이란 템플릿을 빌드 시에 미리 컴파일해 두는 것을 말한다. 빌드에 소요되는 시간이 조금 더 걸리더라도 런타임에 컴파일이 실행되지 않기 때문에 실제 애플리케이션이 동작 시간은 단축되는 효과가 있다. 또한 템플릿을 JIT 컴파일하지 않고 미리 컴파일하기 때문에 템플릿에서 발생하는 에러를 사전에 감지할 수 있는 장점과 JIT 컴파일러를 포함할 필요가 없어지기 때문에 애플리케이션 전체 용량도 줄어드는 효과가 있다.

Angular5에서는 기본 컴파일 옵션이 AoT로 변경될 예정이다.

AoT 컴파일에 대한 보다 상세한 내용은 [AoT 컴파일](https://angular.io/guide/aot-compiler)을 참조하기 바란다.

# 7. 기본 옵션 변경

기본으로 적용되는 옵션을 변경하기 위해서는 [schema.json](https://github.com/angular/angular-cli/blob/398356503ab4729cf40587804c44b55eb5c99768/packages/%40angular/cli/lib/config/schema.json)에 기술되어 있는 옵션을 참조하여 .angular-cli.json을 수정한다. 

예를 들어 컴포넌트를 생성할 때, 스팩 파일을 생성하지 않도록 기본 옵션을 변경하여 보자.

schema.json를 참조하면 --spec 옵션은 component에서 사용하는 경우, 기본값이 true이다. 즉 컴포넌트를 생성할 때, 기본으로 스팩 파일이 추가된다.

```json
  ...
  "component": {
    "description": "Options for generating a component.",
    "type": "object",
    "properties": {
      "flat": {
        "description": "Flag to indicate if a dir is created.",
        "type": "boolean",
        "default": false
      },
      "spec": {
        "description": "Specifies if a spec file is generated.",
        "type": "boolean",
        "default": true
      },
  ...
```

컴포넌트를 생성할 때, 스팩 파일을 생성하지 않도록 하기 위해서는 아래의 명령어를 사용한다.

```bash
$ ng generate component <component-name> --spec false
```

매번 옵션을 추가하지 않기 위해서 기본 옵션을 변경하려면 .angular-cli.json을 아래와 같이 수정한다. 

```json
  ...
  "defaults": {
    "styleExt": "css",
    "component": {
      "spec": false
    }
  }
}
```

또는 ng new 명령어로 프로젝트를 생성할 때, 옵션을 추가하면 .angular-cli.json에 반영된다. 예를 들어 아래와 같이 프로젝트를 생성하는 경우를 살펴보자.

```bash
$ ng new my-app -it -is -skip-tests
```

이때 생성되는 .angular-cli.json는 옵션을 반영하여 아래와 같이 생성된다.

```json
{
  ...
  "defaults": {
    "styleExt": "css",
    "class": {
      "spec": false
    },
    "component": {
      "inlineStyle": true,
      "inlineTemplate": true,
      "spec": false
    },
    "directive": {
      "spec": false
    },
    "guard": {
      "spec": false
    },
    "module": {
      "spec": false
    },
    "pipe": {
      "spec": false
    },
    "service": {
      "spec": false
    }
  }
}
```

# Reference

* [Angular CLI](https://cli.angular.io/)

* [Angular Style Guide](https://angular.io/guide/styleguide)

* [AoT 컴파일](https://angular.io/guide/aot-compiler)

* [schema.json](https://github.com/angular/angular-cli/blob/398356503ab4729cf40587804c44b55eb5c99768/packages/%40angular/cli/lib/config/schema.json)
