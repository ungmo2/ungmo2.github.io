---
layout: post
title: Sass - Basics
subtitle: Sass의 소개, 설치와 간단한 명령어 사용법
categories: Sass
section: Sass
description: Sass(Syntactically Awesome StyleSheets)는 CSS pre-processor로서 CSS의 한계와 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS의 확장(extension)이다. CSS의 간결한 문법은 배우기 쉬우며 명확하여 프로젝트 초기에는 문제가 없이 보이지만 프로젝트의 규모가 커지고 수정이 빈번히 발생함에 따라 쉽게 지저분해지고 유지보수도 어려워지는 단점도 가지고 있다. 이러한 CSS의 태생적 한계를 보완하기 위해 Sass는 다음과 같은 추가 기능과 유용한 도구들을 제공한다.
---

* TOC
{:toc}

![sass-logo](/img/sass-logo.png)

# 1. Introduction

[Sass(Syntactically Awesome StyleSheets)](http://sass-lang.com/)는 CSS pre-processor로서 CSS의 한계와 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS의 확장(extension)이다.

CSS의 간결한 문법은 배우기 쉬우며 명확하여 프로젝트 초기에는 문제가 없이 보이지만 프로젝트의 규모가 커지고 수정이 빈번히 발생함에 따라 쉽게 지저분해지고 유지보수도 어려워지는 단점도 가지고 있다.

이러한 CSS의 태생적 한계를 보완하기 위해 Sass는 다음과 같은 추가 기능과 유용한 도구들을 제공한다.

- 변수의 사용
- 조건문과 반복문
- Import
- Nesting
- Mixin
- Extend/Inheritance

CSS와 비교하여 Sass는 아래와 같은 장점이 있다.

- CSS보다 심플한 표기법으로 CSS를 구조화하여 표현할 수 있다.
- 스킬 레벨이 다른 팀원들과의 작업 시 발생할 수 있는 구문의 수준 차이를 평준화할 수 있다.
- CSS에는 존재하지 않는 Mixin 등의 강력한 기능을 활용하여 CSS 유지보수 편의성을 큰 폭으로 향상시킬 수 있다.

# 2. Install

브라우저는 Sass의 문법을 알지 못하기 때문에 Sass(.scss) 파일을 css 파일로 컴파일(트랜스파일링)하여야 한다. 따라서 Sass 환경의 설치가 필요하다.

Sass는 2006년 Ruby로 처음 개발되었고 이후 다양한 포팅 버전이 등장했다. [Libsass](https://github.com/sass/libsass)도 Ruby Sass를 C++로 포팅한 버전이다. 2014년, Ruby Sass와 LibSass 팀은 두 버전의 동기화를 합의하였기 때문에 Ruby Sass와 LibSass는 완전한 호환에 근접해 있지만 Ruby Sass의 버전이 앞설 가능성이 있다. Ruby Sass와 LibSass의 호환성 문제는 [Sass Compatibility](http://sass-compatibility.github.io/)를 참조하기 바란다.

따라서, Ruby Sass와 LibSass 두가지 버전 중 하나를 선택하여 설치하면 된다. Ruby 환경에서 개발이 진행된다면 Ruby Sass를 선택하고, Node.js 환경에서 개발이 진행된다면 LibSass를 사용하는 편이 좋을 것이다.

node-sass는 npm으로 설치할 수 있다. Ruby Sass의 경우, Ruby의 설치가 필요하다.

## 2.1 node-sass

Libsass를 Node.js 환경에서 사용하기 위해서는 [node-sass](https://github.com/sass/node-sass)를 설치하여야 한다. 따라서 Node.js와 npm이 install되어 있음을 전제로 한다.

* [Node.js의 설치와 npm 업데이트](./nodejs-basics#2-install)

```
$ npm install -g node-sass
$ node-sass -v
node-sass	4.5.3	(Wrapper)	[JavaScript]
libsass  	3.5.0.beta.2	(Sass Compiler)	[C/C++]
```

## 2.2 Ruby Sass

### 2.2.1 Windows

**1. Ruby Installer의 설치**

[Ruby Installer](http://rubyinstaller.org/downloads/)로 이동하여 Installer를 설치한다. rubyinstaller.org에서는 2.2.x 버전을 권장하고 있다.

![ruby-installer-set-path.jpg](/img/ruby-installer.png)
{: .w-400}

설치 도중 Path 추가를 체크한다.

![ruby-installer-set-path.jpg](/img/ruby-installer-set-path.jpg)

**2. Sass 설치**

명령 프롬프트를 실행하고 아래 명령어를 실행한다.

```bash
> gem install sass
```

### 2.2.2 Mac

Mac의 경우 Ruby가 기본적으로 설치되어 있으므로 바로 sass를 설치한다.

```bash
$ gem install sass
$ sass -v
Sass 3.5.1 (Bleeding Edge)
```

## 2.3 GUI App

GUI 환경에서 컴파일 기능 제공하는 App은 아래와 같다. App에 따라 Sass뿐만 아니라 LESS, Compass, Stylus, Jade, CoffeeScript, Slim, HAML, Markdown등 다양한 파일의 컴파일 기능을 제공한다.

- [Hammer](http://hammerformac.com/)

- [CodeKit](https://incident57.com/codekit/)

- [Compass](http://compass.kkbox.com/)

- [Koala](http://koala-app.com/)

# 3. Command

<strong>node-sass</strong>를 기준으로 설명한다.

## 3.1 version

```bash
$ node-sass -v
node-sass       4.5.3   (Wrapper)       [JavaScript]
libsass         3.5.0.beta.2    (Sass Compiler) [C/C++]
```

## 3.2 compile

컴파일할 SCSS 파일의 경로와 컴파일 후 생성될 css 파일의 경로를 지정한다.

```bash
$ cd my-project

## 특정 파일을 특정 파일 이름으로 컴파일
## Compile foo.scss to bar.css
$ node-sass foo.scss > bar.css

## 폴더 내의 모든 파일을 컴파일
## node-sass input-folder-path -o output-folder-path
$ node-sass src/sass --output dist/css
```

## 3.3 style

scss 파일을 컴파일하여 css 파일을 생성할 때 4가지 스타일 중 하나를 선택할 수 있다.

**nested**

sass 형식과 유사하게 nested된 css 파일이 생성된다. 기본값으로 옵션을 추가하지 않아도 기본 적용된다.

```bash
$ node-sass --output-style nested src/sass --output dist/css
```

**expanded**

표준적인 스타일의 css 파일이 생성된다.

```bash
$ node-sass --output-style expanded src/sass --output dist/css
```

**compact**

여러 룰셋을 한줄로 나타내는 스타일의 css 파일이 생성된다.

```bash
$ node-sass --output-style compact src/sass --output dist/css
```

**compressed**

가능한 빈공간이 없는 압축된 스타일의 css 파일이 생성된다.

```bash
$ node-sass --output-style compressed src/sass --output dist/css
```

## 3.4 watch

watch command는 scss 파일의 변경을 감지하여 변경될 때마다 scss 파일을 컴파일하여 css 파일을 자동 업데이트한다.

디렉터리 단위 또는 파일 단위의 모니터링이 가능하다.

**파일 단위의 watch**

```bash
$ cd my-project

## watch src/sass/foo.scss -> dist/css
$ node-sass --watch src/sass/foo.scss --output dist/css
```

**디렉터리 단위의 watch**

```bash
$ cd my-project

## watch src/sass -> dist/css
$ node-sass --watch src/sass --output dist/css
```

# 4. SASS vs. SCSS

Sass는 SASS 표기법(.sass)과 SCSS 표기법(.scss)이 있다. 이전 버전에서는 SASS 표기법이 기본 표기법이었으나 Sass 3.0부터 CSS 친화적인 SCSS（Sassy CSS） 표기법이 기본 표기법이 되었다.

|          | SCSS     | SASS   | CSS    |
|:---------|:---------|:-------|:-------|
| 중괄호 {}  | 필요      | 불필요（공백 2문자 들여쓰기가 코드블록을 의미)| 필요
| 세미콜론 ;  | 필요     | 불필요   | 필요
| : 뒤의 공백 | 불필요    | 필요    | 불필요
| Mixin     |  @mixin  | =      | 없음
| Include  | @include | +      | 없음
| 확장자     | .scss    | .sass  | .css

SASS 표기법은 보다 코딩을 간략화할 수 있는 장점이 있지만 CSS 친화적인 SCSS 표기법를 사용하는 경우가 더 많으므로 본 Post에서는 SCSS 표기법을 기준으로 한다.

Sass의 문법에 대한 설명은 아래 포스트를 참조하기 바란다.

- [SassScript](./sass-script)

- [Sass CSS Extensions](./sass-css-extention)

- [Sass Built-in Function](./sass-built-in-function)

# Reference

* [Sass](http://sass-lang.com/)

* [Sassmeister: sass to css converter](http://www.sassmeister.com/)

* [node-sass](https://github.com/sass/node-sass)

* [Libsass](https://github.com/sass/libsass)
