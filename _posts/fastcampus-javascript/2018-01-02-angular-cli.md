---
layout: post
title: Angular <strong>CLI</strong>
subtitle: Angular CLI를 사용한 프로젝트의 생성, 구성요소 추가와 빌드
categories: fastcampus-angular
section: fastcampus-angular
seq: 2
description: Angular CLI는 간단한 명령어를 사용하여 Angular 프로젝트 스캐폴딩(scaffolding)을 생성, 실행, 빌드할 수 있으며 다양한 구성 요소를 선별적으로 추가할 수 있는 커맨드-라인 인터페이스(command line interface)이다. 개발용 서버를 내장하고 있어서 빌드없이 프로젝트를 실행하고 확인할 수 있다.
---

* TOC
{:toc}

![angular logo](/img/angular-logo.png)

프레임워크는 애플리케이션 구축에 기본적으로 필요한 기능의 구현체를 정형화된 구조로 제공하며 이를 바탕으로 애플리케이션의 요구 사항을 구현해 나간다. 따라서 프레임워크의 학습은 정형화된 프레임워크의 기본 구조에 익숙해지는 것으로 시작한다. 하지만 처음 접하는 프레임워크의 기본 구조를 익히고 개발환경을 구축하는 것은 쉽지 않은 일이다.

본격적으로 Angular를 살펴보기 이전에 프레임워크의 개발환경 구축을 자동화해 주고 프레임워크의 기본 골격(스캐폴딩, scaffolding)을 생성해주는 Angular CLI에 대해 먼저 알아보도록 하자.

# 1. Angular CLI란?

[Angular CLI](https://cli.angular.io/)는 간단한 명령어를 사용하여 Angular 프로젝트 스캐폴딩(scaffolding)을 생성, 실행, 빌드할 수 있으며 Angular의 다양한 구성 요소를 선별적으로 추가할 수 있는 커맨드-라인 인터페이스(command line interface)이다. 개발용 서버를 내장하고 있어서 간단히 프로젝트를 실행시켜서 동작을 확인할 수 있다.

프레임워크의 개발환경을 구축하는 것은 쉽지 않은 일이다. 프레임워크 구조에 맞게 프로젝트 구성요소를 하나하나 생성하여야 하며 프로젝트 의존성 관리나 다양한 프로젝트 설정 구성 또한 만만한 작업이 아니다. 또한 익숙치 않은 프레임워크의 파일 구조나 코딩 컨벤션 등의 스타일 가이드를 작성하는 일은 많은 시행착오를 거쳐야 하는 작업이다. Angular CLI는 Angular 프로젝트 스캐폴딩을 간단한 명령어로 생성해 주어 개발환경 구축에 소요되는 시간을 최소화할 뿐 아니라 표준 스타일 가이드를 제공한다.

Angular CLI가 지원하는 기능은 아래와 같다.

- Angular 프로젝트 생성
- Angular 프로젝트에 컴포넌트, 디렉티브, 파이프, 서비스, 클래스, 인터페이스 등의 구성 요소 추가
- LiveReload를 지원하는 내장 개발 서버를 사용한 Angular 프로젝트 실행
- Unit/E2E(end-to-end) 테스트 환경 지원
- 배포를 위한 Angular 프로젝트 패키징

Angular는 Angular CLI를 위한 별도의 홈페이지 [https://cli.angular.io/](https://cli.angular.io/)를 제공한다.

![angular-cli-website](./img/angular-cli-website.png)

각종 명령어와 옵션, Angular CLI의 설정 파일인 `angular.json`에 대한 상세한 문서를 제공하고 있으므로 참고하기 바란다.

Angular CLI를 사용하기 위해서는 어떠한 절차가 필요한지 그리고 무엇을 할 수 있는지 알아보자.

Angular CLI 6.0.0을 기준으로 한다. Angular CLI의 변경이력은 [angular-cli releases](https://github.com/angular/angular-cli/releases)에서 참조 가능하다.
{: .info}

# 2. Angular CLI 설치

Angular CLI는 Node.js 6.9.0, NPM 3.0.0 이상이 필요하다.

- [Prerequisites](https://github.com/angular/angular-cli#prerequisites)

- [Node.js 설치와 npm 업데이트](http://poiemaweb.com/nodejs-basics#2-install)

Angular CLI는 npm으로 설치할 수 있다. 아래의 명령어를 실행하여 Angular CLI를 설치한다.

```bash
$ npm install -g @angular/cli
```

Angular CLI 1.0.0 이전 버전의 경우 패키지명이 `angular-cli`이었으나 Angular CLI 1.0.0부터 `@angular/cli`으로 변경되었다.
{: .info}

최신 버전의 Angular CLI로 업데이트려면 다음과 같이 구 버전을 삭제하고 최신 버전을 설치한다.

```bash
# Angular CLI 삭제
$ npm uninstall -g @angular/cli
# 캐시 정합성 확인
$ npm cache verify
# Angular CLI 설치
$ npm install -g @angular/cli@latest
```

설치가 완료되면 `ng` 명령어를 사용할 수 있다. 설치가 성공적으로 완료되었는지 `ng version` 명령어로 버전을 출력하여 확인하여 보자.

![angular-cli-website](./img/ng-version.png)

Angular CLI의 사용법을 참조하기 위해서는 `ng help` 명령어를 사용한다.

```bash
$ ng help
```

# 3. 프로젝트 생성

Angular 프로젝트를 생성하려면 `ng new` 명령어를 사용한다.

```bash
$ ng new <project-name>
```

`ng new` 명령어 다음에 프로젝트 이름을 지정하면 프로젝트 이름과 일치하는 새로운 프로젝트 폴더가 생성되고 스캐폴딩(프로젝트 기본 골격)이 작성된다.

프로젝트 이름을 `my-app`로 지정하여 프로젝트를 생성하여 보자.

```bash
$ ng new my-app
```

<!--
프로젝트가 생성되고 Angular CLI의 기본 패키지 매니저인 npm을 사용하여 프로젝트 의존 모듈도 설치되었다. 기본 패키지 매니저를 npm 대신 [yarn](https://yarnpkg.com)으로 변경할 수도 있다.

기본 패키지 매니저는 npm으로 설정되어 있다. 기본 패키지 매니저를 yarn으로 변경하기 위해서는 아래의 명령어를 실행한다.

```bash
$ ng config -g cli.packageManager yarn
$ ng config -g cli.packageManager
yarn
```

이후 기본 패키지 매니저를 npm로 변경하고자 할 때에는 아래의 명령어를 사용한다.

```bash
$ ng config -g cli.packageManager npm
$ ng config -g cli.packageManager
npm
```

기본 패키지 매니저를 변경하지 않고 yarn을 사용하려면 프로젝트 생성 시에 의존 모듈의 설치를 스킵하고 프로젝트 생성 이후 yarn으로 의존 모듈의 설치를 실행한다.

```bash
$ ng new --skip-install my-app
$ cd my-app && yarn
yarn install v1.3.2
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Saved lockfile.
✨  Done in 72.63s.
```
-->

프로젝트가 생성되면 아래와 같은 파일 구조의 스캐폴딩이 생성된다. 이것은 [Angular 스타일 가이드](https://angular.io/guide/styleguide)의 기본 애플리케이션 구조, 네이밍 룰, 코딩 컨벤션 등을 준수하여 생성된 것이다.

```
my-app/
├── .git/
├── e2e/
├── node_modules/
├── src/
├── .editorconfig
├── .gitignore
├── angular.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── tslint.json
```

Angular 프로젝트의 파일 구조 및 구성요소에 대한 설명은 [Angular의 파일 구조와 구성 요소](./angular-architecture)에서 자세히 살펴볼 것이다. 이번 장에서는 Angular CLI의 기능에 집중하도록 하자.

# 4. 프로젝트 실행

프로젝트를 로컬 환경에서 실행(preview)하기 위해서는 `ng serve` 명령어를 사용한다.

```bash
$ cd <project-name>
$ ng serve
```

앞에서 생성한 my-app 프로젝트를 실행하여 보자.

```bash
$ cd my-app
$ ng serve
** Angular Live Development Server is listening on localhost: 4200, open your browser on http://localhost:4200/ **

Date: 2018-05-10T16:20:59.213Z
Hash: 993ee08f65694a2dd3c9
Time: 8734ms
chunk {main} main.js, main.js.map (main) 10.7 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 227 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 5.4 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 15.6 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 3.37 MB [initial] [rendered]
ℹ ｢wdm｣: Compiled successfully.
```

`ng serve` 명령어를 실행하면 Webpack을 사용하여 소스코드와 의존 모듈을 번들링(Bundling)하고 Angular CLI가 내장하고 있는 개발용 서버를 실행한다.

브라우저를 열고 주소창에 [http://localhost:4200](http://localhost:4200)을 입력하여 개발용 서버에 접속한다. 참고로 프로젝트를 실행할 때 `--open`(축약형 -o) 옵션을 추가하면 자동으로 브라우저를 실행하여 준다.

```bash
$ ng serve --open
```

![app works](./img/ng-serve-1.png)

ng serve 명령어를 사용한 프로젝트 실행 결과
{: .desc-img}

이미 포트 4200번을 사용하고 있다면 Angular CLI 내장 서버를 실행할 수 없다. 포트번호를 변경해 실행하려면 다음과 같이 `--port`(축약형 -p) 옵션을 추가한다.

```bash
$ ng serve --port 4201
```

Angular CLI가 내장하고 있는 개발용 서버는 코드의 변경을 감지하여 자동으로 브라우저를 리로드하는 LiveReload 기능을 제공한다. 따라서 코드 수정 후 파일을 저장하면 코드 변경을 자동 반영하여 번들링이 수행되고 브라우저가 리로드되어 코드 변경 결과를 즉시 확인할 수 있다.

브라우저와 서버를 종료시키지 않은 상태에서 코드(`my-app/src/app/app.component.ts`)를 수정해 보자.

```typescript
// my-app/src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 'app'을 'Hello Angular!'로 수정한다.
  title = 'Hello Angular!';
}
```

변경된 파일을 저장하면 잠시 후 브라우저가 리로드되고 변경된 내용이 반영된다.

![app works](./img/ng-serve-2.png)

LiveReload 기능에 의한 소스 코드 변경 내용 자동 반영
{: .desc-img}

# 5. 프로젝트 구성 요소 생성

프로젝트에 새로운 구성요소를 생성하기 위해서는 `ng generate` 명령어를 사용한다. `ng generate` 명령어는 축약형 `ng g`와 동일하게 동작한다.

| 생성 대상 구성요소 | 명령어                         | 축약형
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

Angular 프로젝트의 구성요소(컴포넌트, 디렉티브, 파이프, 서비스 등)에 대해 아직 살펴보지 않았기 때문에 혼란스럽고 어렵게 느껴질 수 있다. Angular를 학습한다는 것은 이들 구성요소의 사용 방법을 익히는 것이다. 이후의 해당 장에서 각각의 구성요소에 대해 자세히 살펴볼 것이다. 지금은 구성요소를 어떻게 생성하는지에 주목하도록 하자.
{: .info}

생성 대상 구성요소 중에서 컴포넌트, 디렉티브, 서비스, 모듈의 생성 방법을 알아보도록 하자.

## 5.1 컴포넌트 생성

프로젝트에 새로운 컴포넌트를 생성하기 위해서는 `ng generate component`(축약형 ng g c) 명령어를 사용한다. 앞에서 생성한 my-app 프로젝트에 home 컴포넌트를 생성해보자.

```bash
$ ng generate component home
CREATE src/app/home/home.component.css (0 bytes)
CREATE src/app/home/home.component.html (23 bytes)
CREATE src/app/home/home.component.spec.ts (614 bytes)
CREATE src/app/home/home.component.ts (261 bytes)
UPDATE src/app/app.module.ts (388 bytes)
```

`ng generate component home` 명령어를 실행하면 Angular CLI는 아래와 같이 동작한다.

- `src/app` 폴더에 `home` 폴더를 생성한다.
: 컴포넌트는 URL 경로의 단위(화면 단위)가 될 수 있기 때문에 폴더로 구분된다.
- `src/app/home` 폴더에 4개의 파일을 생성한다.
  - `home.component.html`
  : 컴포넌트 템플릿을 위한 HTML 파일
  - `home.component.css`
  : 컴포넌트 템플릿의 스타일링을 위한 CSS 파일
  - `home.component.ts`
  : 컴포넌트 클래스 파일
  - `home.component.spec.ts`
  : 컴포넌트 유닛 테스트를 위한 스펙 파일
- 루트 모듈 `src/app/app.module.ts`에 새롭게 생성된 컴포넌트를 등록한다.
: 컴포넌트 클래스를 import하고 `@NgModule` 데코레이터의 `declarations` 프로퍼티에 컴포넌트 클래스를 등록한다.

### 5.1.1 파일명의 암묵적 변경

주의해야 할 것은 `ng generate component` 명령어 다음에 지정한 컴포넌트명이 실제 생성된 파일명과 다를 수 있다는 것이다. 예를 들어 아래와 같이 새로운 컴포넌트를 생성해 보자.

```bash
$ ng generate component newComponent
CREATE src/app/new-component/new-component.component.css (0 bytes)
CREATE src/app/new-component/new-component.component.html (32 bytes)
CREATE src/app/new-component/new-component.component.spec.ts (671 bytes)
CREATE src/app/new-component/new-component.component.ts (296 bytes)
UPDATE src/app/app.module.ts (496 bytes)
```

컴포넌트명을 newComponent로 지정했음에도 불구하고 실제로 생성된 파일명은 `new-component.component.*`이다. Angular CLI는 지정된 컴포넌트명의 대소문자를 구별하여 정해진 규칙에 따라 파일명을 암묵적으로 변경한다.

아래의 컴포넌트명은 Angular CLI에 의해 결국 같은 파일명 `new-component.component.*`으로 변경된다.

```bash
$ ng generate component newComponent
$ ng generate component NewComponent
$ ng generate component new-component
```

이와 같은 파일명의 암묵적 변경은 컴포넌트뿐만이 아니라 `ng generate` 명령어로 추가되는 모든 구성요소에 모두 적용된다. 혼란을 방지하기 위해 `ng generate` 명령어에 지정하는 구성요소 명칭은 하이픈으로 단어를 연결하는 케밥 표기법(kebab-case)을 사용하는 것이 좋다.

### 5.1.2 selector 프로퍼티값의 접두사(prefix)와 컴포넌트 클래스 이름

생성된 컴포넌트 클래스 파일 `src/app/home/home.component.ts`을 살펴보자.

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

  ngOnInit() { }
}
```

여기서 주목할 것은 `ng generate component` 명령어에 지정한 컴포넌트명에 의해 자동 생성된 5행 selector 프로퍼티값 'app-home'과 9행 컴포넌트 클래스명 HomeComponent이다.

5행을 보면 메타데이터 객체의 `selector` 프로퍼티에 'app-home'이 설정되어 있다. `selector` 프로퍼티는 컴포넌트를 마크업으로 표현할 때 사용하는 이름이다. 예를 들어 루트 컴포넌트인 `src/app/app.component.ts`에서 `home` 컴포넌트를 사용하려면 `src/app/app.component.html`을 아래와 같이 수정한다.

```html
<!-- src/app/app.component.html -->
<app-home></app-home>
```

selector 프로퍼티값 'app-home'은 `ng generate component home` 명령어에서 지정한 컴포넌트명 `home` 앞에 접두사(prefix) app이 자동으로 추가된 값이다. Angular는 다른 애플리케이션의 `selector` 또는 HTML 요소와 충돌을 방지하기 위해 접두사를 추가하여 케밥 표기법으로 명명하는 것을 권장하고 있다. 자세한 내용은 [Angular Style Guide: Custom prefix for components](https://angular.io/guide/styleguide#custom-prefix-for-components)을 참조하기 바란다.

기본 접두사는 app이며 이것은 `angular.json`에서 확인할 수 있다.

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "my-app": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      ...
}
```

`angular.json`의 prefix 프로퍼티값을 수정하면 이후 생성되는 컴포넌트의 셀렉터 접두사는 수정된 값으로 변경된다. 만약 프로젝트 생성 단계에서부터 컴포넌트의 기본 셀렉터 접두사를 변경하고 싶다면 `ng new` 명령어로 프로젝트를 생성할 때 `--prefix` 옵션을 추가한다.

```bash
$ ng new my-app --prefix <prefix-name>
```

컴포넌트 클래스의 이름 `HomeComponent`은 `ng generate component` 명령어에 지정한 컴포넌트 이름을 파스칼 표기법(PascalCase)으로 자동 변경하여 생성된다. 컴포넌트 클래스 이름은 루트 모듈(src/app/app.module.ts)에 자동으로 import되고 `@NgModule` 데코레이터의 `declarations` 프로퍼티에 자동으로 추가된다.

### 5.1.3 templateUrl, styleUrls 프로퍼티와 template, styles 프로퍼티

`templateUrl`, `styleUrls` 프로퍼티는 외부 파일을 로드하기 위해 사용한다.

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

위 예제의 경우 컴포넌트는 같은 폴더 내의 외부 파일 `home.component.html`과 `home.component.css`를 HTML 템플릿과 CSS로 사용한다. HTML 템플릿이나 CSS가 간단한 경우에는 메타데이터(@Component()에 인자로 전달된 객체) 내부에 직접 기술할 수도 있다. 이때 `templateUrl`, `styleUrls` 프로퍼티 대신 `template`, `styles` 프로퍼티를 사용한다.

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

`ng generate component` 명령어를 사용하여 컴포넌트를 생성할 때 HTML 템플릿과 CSS를 외부 파일로 생성하지 않고 인라인 템플릿과 CSS를 사용하고자 하는 경우에는 아래의 명령어를 사용한다.

```bash
# 인라인 템플릿을 사용하는 경우
$ ng generate component about --inline-template
# 축약형 ng g c about -t

# 인라인 CSS를 사용하는 경우
$ ng generate component about --inline-style
# 축약형 ng g c about -s

# 인라인 템플릿과 인라인 CSS를 사용하는 경우
$ ng generate component about --inline-template --inline-style
# 축약형 ng g c about -t -s
```

## 5.2 디렉티브 생성

프로젝트에 새로운 디렉티브를 생성하기 위해서는 `ng generate directive`(축약형 ng g d) 명령어를 사용한다.

```bash
$ ng generate directive highlight
CREATE src/app/highlight.directive.spec.ts (236 bytes)
CREATE src/app/highlight.directive.ts (147 bytes)
UPDATE src/app/app.module.ts (658 bytes)
```

`ng generate directive highlight` 명령어를 실행하면 Angular CLI는 아래와 같이 동작한다.

- `src/app` 폴더에 2개의 파일을 생성한다.
  - `highlight.directive.ts`
  : 디렉티브 클래스 파일
  - `highlight.directive.spec.ts`
  : 디렉티브 유닛 테스트를 위한 스펙 파일
- 루트 모듈 `src/app/app.module.ts`에 새롭게 생성된 디렉티브를 등록한다.
: 디렉티브를 import하고 @NgModule 데코레이터의 `declarations` 프로퍼티에 디렉티브를 등록한다.

컴포넌트를 생성할 때와는 달리 디렉티브를 위한 폴더는 생성되지 않으며 기본적으로 `src/app` 폴더에 생성된다.

생성된 `highlight.directive.ts`를 살펴보면 `@Directive` 데코레이터 함수에 전달된 메타데이터 객체의 `selector` 프로퍼티값으로 '[appHighlight]'가 설정되었다.

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

이것은 `angular.json`에 설정된 기본 접두사 app과 `ng generate directive` 명령어에 지정한 디렉티브 이름으로 합성된 디렉티브 셀렉터 이름으로 카멜 표기법(camelCase)으로 작성된다.

selector 프로퍼티에 지정한 디렉티브의 이름 appHighlight은 HTML 어트리뷰트처럼 사용된다. 디렉티브의 상세한 내용은 이후 자세히 다루도록 한다.

```html
<p appHighlight>Highlight Directive!</p>
```

## 5.3 모듈 생성

프로젝트에 새로운 모듈을 생성하기 위해서는 `ng generate module`(축약형 ng g m) 명령어를 사용한다.

```bash
$ ng generate module todos
CREATE src/app/todos/todos.module.spec.ts (267 bytes)
CREATE src/app/todos/todos.module.ts (189 bytes)
```

`ng generate module todos` 명령어를 실행하면 Angular CLI는 아래와 같이 동작한다.

- `src/app` 폴더에 `todos` 폴더를 생성한다.
- `src/app/todos` 폴더에 1개의 파일을 추가한다.
  - `todos.module.ts`
  : 모듈 클래스 파일
  - `todos.module.spec.ts`
  : 모듈 유닛 테스트를 위한 스펙 파일

생성된 모듈은 해당 모듈을 사용하려는 다른 모듈의 `imports` 프로퍼티에 등록되어야 한다. 다음은 루트 모듈에 생성한 모듈을 등록하는 예제이다.

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
export class AppModule { }
```

## 5.4 서비스 생성

프로젝트에 새로운 서비스를 생성하기 위해서는 `ng generate service`(축약형 ng g s) 명령어를 사용한다.

```bash
$ ng generate service data
CREATE src/app/data.service.spec.ts (362 bytes)
CREATE src/app/data.service.ts (133 bytes)
```

`ng generate service data` 명령어를 실행하면 Angular CLI는 아래와 같이 동작한다.

- 루트 폴더에 2개의 파일을 생성한다.
  - user.service.spec.ts
  : 서비스 유닛 테스트를 위한 스펙 파일
  - user.service.ts
  : 서비스 클래스 파일

컴포넌트를 생성할 때와는 달리 서비스를 위한 폴더는 생성되지 않으며 기본적으로 `src/app` 폴더에 생성된다.

생성된 `data.service.ts`를 살펴보면 `@Injectable` 데코레이터 함수에 전달된 메타데이터 객체의 `providedIn` 프로퍼티 값으로 'root'가 설정되었다.

```typescript
// src/app/data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
}
```

`providedIn` 프로퍼티는 Angular 6에서 도입된 것으로 프로퍼티 값으로 'root'를 설정하면 루트 인젝터에게 서비스를 제공하도록 지시하여 애플리케이션 전역에서 서비스를 주입할 수 있도록 한다.

## 5.5 클래스 생성

프로젝트에 새로운 클래스를 생성하기 위해서는 `ng generate class`(축약형 ng g cl) 명령어를 사용한다.

```bash
$ ng generate class user
  create src/app/user.ts (22 bytes)
```

테스트를 위한 스펙 파일을 함께 생성하기 위해서는 `--spec` 옵션을 추가한다.

```bash
$ ng generate class user --spec
CREATE src/app/user.spec.ts (146 bytes)
CREATE src/app/user.ts (22 bytes)

```

# 6. 프로젝트 빌드

프로젝트 개발을 완료한 이후 배포를 위해서는 `ng build` 명령어를 사용한다.

```bash
$ ng build
```

빌드가 완료되면 프로젝트 루트에 빌드 결과물이 포함된 dist 폴더가 생성된다.

## 6.1 트랜스파일링과 의존 모듈 번들링

TypeScript 기반으로 개발이 진행되는 Angular 애플리케이션은 TypeScript를 JavaScript로 변환하여야 한다. 또한 프로젝트가 의존하는 모듈들을 로드하는 HTML 파일의 script 태그를 작성해야 한다. 다양한 프로젝트의 의존 모듈을 순서에 맞게 수작업으로 script 태그에 기술하는 것은 매우 곤란한 일이며 실수가 발생할 수 있다.

Angular CLI로 새로운 프로젝트를 생성할 경우, 의존 모듈의 설치는 기본 패키지 매니저인 npm으로 자동화되어 진행된다. 이때 설치되는 의존 모듈은 약 1,000여 개로 의존성 관리를 위해 수작업은 현실적이지 않다. Angular CLI의 빌드 기능은 의존성 관리를 위한 작업을 자동화하여 진행한다.

Angular CLI 빌드 기능은 내부적으로 모듈 번들러인 [webpack](https://webpack.github.io/)을 사용하며 아래와 같은 작업의 자동화를 지원한다.

- TypeScript에서 JavaScript로의 트랜스파일링
- 디버깅 용도의 source map 파일 생성
- 의존 모듈과 HTML, CSS, 자바스크립트 번들링
- [AoT 컴파일](https://angular.io/guide/aot-compiler)
- 코드의 문법 체크
- 코드의 규약 준수 여부 체크
- 불필요한 코드의 삭제 및 압축

Angular CLI 빌드 기능은 소스코드와 의존 모듈을 번들링한다. 이때 번들링되는 코드는 JavaScript뿐만이 아니라 HTML, CSS까지 JavaScript 파일 내에 번들링된다. 또한 `index.html`에 번들링된 자바스크립트 파일 5개를 로드하기 위한 태그를 추가한다.

빌드 이전과 빌드 이후의 `index.html`을 비교하여 보자.

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

  <script type="text/javascript" src="runtime.js"></script>
  <script type="text/javascript" src="polyfills.js"></script>
  <script type="text/javascript" src="styles.js"></script>
  <script type="text/javascript" src="vendor.js"></script>
  <script type="text/javascript" src="main.js"></script>
</body>
</html>
```

빌드 처리는 아래 그림과 같이 진행되며 빌드가 완료되면 dist 폴더가 추가되고 그 내부에 빌드 결과물이 생성된다.

![build-dist](./img/build-dist.png)

빌드 처리의 흐름
{: .desc-img}

## 6.2 프로덕션 빌드와 배포

`ng build` 명령어를 실행하면 Angular CLI는 `src/environments/environments.ts` 파일을 참조하여 빌드를 수행한다.

```typescript
// src/environments/environments.ts
export const environment = {
  production: false
};
```

이때 실행된 빌드는 개발환경 빌드로 프로덕션 용도로 최적화되어 있지 않다. 프로덕션 빌드를 수행하기 위해서는 아래의 명령어를 실행한다.

```bash
$ ng build --prod
```

프로덕션 빌드 시에는 `src/environments/environment.prod.ts` 파일을 참조하여 빌드를 수행한다. 프로덕션 빌드와 개발환경 빌드에 기본 적용되는 옵션의 차이는 아래와 같다.

| Flag             | \-\-dev | \-\-prod   |
|:-----------------|:-----:|:--------:|
| \-\-aot            | false | true
| \-\-environment    | dev   | prod
| \-\-output-hashing | media | all
| \-\-sourcemaps     | true  | false
| \-\-extract-css    | false | true

또한 프로덕션 빌드 시에는 [UglifyJS](http://lisperator.net/uglifyjs/)를 통하여 데드 코드(코드 실행에 영향을 주지 않는 불필요한 코드)의 제거가 자동 실행된다.

프로덕션 빌드의 결과물로 dist 폴더에 생성된 파일들을 서버에 업로드하면 배포(Deploy)가 완료된다. 간단한 명령어로 호스팅 환경을 구축해주는 서비스인 [now](https://zeit.co/now)를 사용하여 프로덕션 빌드의 결과물을 서버에 업로드해보자.

우선 npm을 사용하여 now를 전역에 설치한다.

```bash
# now 설치
$ npm install -g now
```

해당 프로젝트의 dist 폴더로 이동한 후, now 명령어를 실행한다.

now를 처음 사용한다면 now 명령어 실행 중에 이메일을 입력을 요구받는다. 입력한 이메일로 확인 메일이 오면 확인 버튼을 누르면 다시 now 명령어를 실행한다. 그러면 파일이 서버로 업로드되고 서버 url이 제공된다. 브라우저를 열고 주소창에 해당 서버 url를 입력하면 프로젝트가 동작하는 것을 확인할 수 있다.

```bash
# dist/my-app 폴더로 이동
$ cd dist/my-app
# now 서비스를 사용한 배포
$ now
> Deploying ~/Desktop/my-app/dist/my-app under ungmo2@gmail.com
> Your deployment's code and logs will be publicly accessible because you are subscribed to the OSS plan.
> NOTE: You can use `now --public` or upgrade your plan (https://zeit.co/account/plan)to skip this prompt
> https://my-app-drtvppvqql.now.sh [in clipboard] [3s]
> Deployment complete!
```

배포가 성공하면 브라우저에서 로그에 출력된 url(위 예제의 경우 https://my-app-drtvppvqql.now.sh)을 입력한다.

## 6.3 AoT(Ahead-of Time) 컴파일

Angular CLI의 빌드 기능은 TypeScript를 자바스크립트로 트랜스파일링한다. 사실은 TypeScript뿐만 아니라 컴포넌트의 템플릿 또한 컴파일이 필요하다. 템플릿은 빌드 시에 컴파일되지 않고 런타임에 JIT(Just-In-Time) 컴파일된다. 단, 프로덕션 빌드시는 AoT 컴파일이 자동 적용된다.

```bash
# AoT 컴파일
$ ng build --aot
# 프로덕션 빌드: AoT 컴파일이 자동 적용된다.
$ ng build --prod
```

AoT(Ahead-of Time) 컴파일이란 프로젝트를 빌드할 때 템플릿을 미리 컴파일해 두는 것을 말한다. 빌드에 소요되는 시간이 조금 더 걸리더라도 런타임에 템플릿 컴파일이 실행되지 않기 때문에 실제 애플리케이션이 동작하는 시간은 단축되는 효과가 있다. 또한 템플릿을 JIT 컴파일하지 않고 미리 컴파일하기 때문에 템플릿에서 발생하는 에러를 사전에 감지할 수 있는 장점과 JIT 컴파일러를 포함할 필요가 없어져 애플리케이션 전체 용량도 줄어드는 효과가 있다.

AoT 컴파일에 대한 보다 상세한 내용은 [AoT 컴파일](https://angular.io/guide/aot-compiler)을 참조하기 바란다.

# 7. 기본 옵션 변경

프로젝트에 기본으로 적용되는 옵션을 변경하기 위해서는 [schema.json](https://github.com/angular/angular-cli/blob/398356503ab4729cf40587804c44b55eb5c99768/packages/%40angular/cli/lib/config/schema.json)에 기술되어 있는 옵션을 참조하여 `angular.json`을 수정한다.

예를 들어 컴포넌트를 생성할 때, 스펙 파일을 생성하지 않도록 기본 옵션을 변경하여 보자.

schema.json을 참조하면 `--spec` 옵션은 component에서 사용하는 경우, 기본값이 true이다. 즉, 컴포넌트를 생성할 때, 기본으로 스펙 파일이 추가된다.

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

매번 옵션을 추가하지 않기 위해서 기본 옵션을 변경하려면 `angular.json`의 schematics를 아래와 같이 수정한다.

```json
...
"schematics": {
  "@schematics/angular:component": {
    "spec": false
  }
},
...
```

또는 `ng new` 명령어로 프로젝트를 생성할 때, 옵션을 추가하면 `angular.json`에 반영된다. 예를 들어 아래와 같이 프로젝트를 생성하는 경우를 살펴보자.

```bash
$ ng new my-app --inline-template --inline-style --skip-tests
# 축약형 ng new my-app -t -s -S
```

이때 생성되는 `angular.json`은 위 명령어의 옵션을 반영하여 아래와 같이 생성된다.

```json
{
  ...
  "schematics": {
    "@schematics/angular:component": {
      "inlineTemplate": true,
      "inlineStyle": true,
      "spec": false
    },
    "@schematics/angular:class": {
      "spec": false
    },
    "@schematics/angular:directive": {
      "spec": false
    },
    "@schematics/angular:guard": {
      "spec": false
    },
    "@schematics/angular:module": {
      "spec": false
    },
    "@schematics/angular:pipe": {
      "spec": false
    },
    "@schematics/angular:service": {
      "spec": false
    }
  },
  ...
}
```

# Reference

* [Angular CLI](https://cli.angular.io/)

* [Angular Style Guide](https://angular.io/guide/styleguide)

* [AoT 컴파일](https://angular.io/guide/aot-compiler)

* [schema.json](https://github.com/angular/angular-cli/blob/398356503ab4729cf40587804c44b55eb5c99768/packages/%40angular/cli/lib/config/schema.json)
