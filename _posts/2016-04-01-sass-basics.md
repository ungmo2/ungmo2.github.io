---
layout: post
title: Sass - Basics
subtitle: Sass의 소개, 설치와 간단한 명령어 사용법
categories: Sass
section: Sass
seq: 4
subseq: 1
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

브라우저는 Sass의 문법을 알지 못하기 때문에 Sass(.scss) 파일을 css 파일로 트랜스파일링(컴파일)하여야 한다. 따라서 Sass 환경의 설치가 필요하다.

```
$ npm install -g sass
$ sass --version
1.30.0 compiled with dart2js 2.10.4
```

<!-- Sass는 2006년 Ruby로 처음 개발되었고 이후 다양한 포팅 버전이 등장했다. [Libsass](https://github.com/sass/libsass)도 Ruby Sass를 C++로 포팅한 버전이다. 2014년, Ruby Sass와 LibSass 팀은 두 버전의 동기화를 합의하였기 때문에 Ruby Sass와 LibSass는 완전한 호환에 근접해 있지만 Ruby Sass의 버전이 앞설 가능성이 있다. Ruby Sass와 LibSass의 호환성 문제는 [Sass Compatibility](http://sass-compatibility.github.io/)를 참조하기 바란다.

따라서, Ruby Sass와 LibSass 두가지 버전 중 하나를 선택하여 설치하면 된다. Ruby 환경에서 개발이 진행된다면 Ruby Sass를 선택하고, Node.js 환경에서 개발이 진행된다면 LibSass를 사용하는 편이 좋을 것이다.

node-sass는 npm으로 설치할 수 있다. Ruby Sass의 경우, Ruby의 설치가 필요하다.

## 2.1 node-sass

Libsass를 Node.js 환경에서 사용하기 위해서는 [node-sass](https://github.com/sass/node-sass)를 설치하여야 한다. 따라서 Node.js와 npm이 install되어 있음을 전제로 한다.

* [Node.js의 설치와 npm 업데이트](./nodejs-basics#2-install)

```
$ npm install -g node-sass
$ node-sass -v
node-sass       5.0.0   (Wrapper)       [JavaScript]
libsass         3.5.5   (Sass Compiler) [C/C++]
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
``` -->

<!-- ## 2.3 GUI App

GUI 환경에서 트랜스파일링 기능 제공하는 App은 아래와 같다. App에 따라 Sass뿐만 아니라 LESS, Compass, Stylus, Jade, CoffeeScript, Slim, HAML, Markdown등 다양한 파일의 트랜스파일링 기능을 제공한다.

- [Hammer](http://hammerformac.com/)

- [CodeKit](https://incident57.com/codekit/)

- [Compass](http://compass.kkbox.com/)

- [Koala](http://koala-app.com/) -->

# 3. Command

## 3.1 version

```bash
$ sass --version
1.30.0 compiled with dart2js 2.10.4
```

## 3.2 트랜스파일링

트랜스파일링할 foo.scss 파일을 sass-project 디렉터리에 아래와 같이 생성하자.

```scss
$site_max_width: 960px;
$font_color: #333;
$link_color: #00c;
$font_family: Arial, sans-serif;
$font_size: 16px;
$line_height: percentage(20px / $font_size);

body {
  color: $font_color;

  // Property Nesting
  font: {
    size: $font_size;
    family: $font_family;
  }

  line-height: $line_height;
}

#main {
  width: 100%;
  max-width: $site_max_width;
}
```

트랜스파일링할 SCSS 파일의 경로와 트랜스파일링 후 생성될 css 파일의 경로를 지정한다.

```bash
$ cd sass-project

## foo.scss를 트랜스파일링해서 foo.css를 생성
$ sass foo.scss foo.css
```

foo.scss 파일이 드랜스파일링되어 다음과 같이 foo.css 파일이 생성된다.

```css
body {
  color: #333;
  font-size: 16px;
  font-family: Arial, sans-serif;
  line-height: 125%; }

#main {
  width: 100%;
  max-width: 960px; }
```

특정 디렉터리 내의 모든 scss 파일을 css 파일로 일괄 트랜스파일링해서 지정한 디렉터리에 저장하려면 다음과 인풋 디렉터리외 아웃풋 디렉터리를 지정한다.

```bash
## sass input-directory-path:output-directory-path
$ sass src/sass:dist/css
```

npm scripts를 사용하면 매번 긴 명령어를 입력하지 않고 좀 더 간단히 명령어를 사용할 수 있다.

프로젝트 디럭터리에 아직 package.json이 없다면 다음 명령으로 package.json을 생성한다.

```bash
$ cd sass-project
$ npm init -y
```

생성된 package.json을 다음과 같이 수정한다.

```json
{
  "name": "sass-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build:sass": "sass src/sass:dist/css"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

이제 다음 명령으로 좀 더 간단히 트랜스파일링할 수 있다.

```bash
$ npm run build:sass
```

## 3.3 style

scss 파일을 트랜스파일링하여 css 파일을 생성할 때 2가지 스타일 중 하나를 선택할 수 있다.

**expanded**

표준적인 스타일의 css 파일이 생성된다. 기본값이다.

```bash
$ sass --style expanded src/sass:dist/css
# 위와 같은 결과가 만들어진다.
$ sass src/sass:dist/css
```

**compressed**

가능한 빈공간이 없는 압축된 스타일의 css 파일이 생성된다.

```bash
$ sass --style compressed src/sass:dist/css
```

## 3.4 watch

watch 옵션은 scss 파일의 변경을 감지하여 변경될 때마다 scss 파일을 트랜스파일링하여 css 파일을 자동 업데이트한다.

```bash
## watch src/sass -> dist/css
$ sass --watch src/sass:dist/css
```

# 4. SASS vs. SCSS

Sass는 SASS 표기법(.sass)과 SCSS 표기법(.scss)이 있다. 이전 버전에서는 SASS 표기법이 기본 표기법이었으나 Sass 3.0부터 CSS 친화적인 SCSS（Sassy CSS） 표기법이 기본 표기법이 되었다.

|          | SCSS     | SASS   | CSS    |
|:---------|:---------|:-------|:-------|
| 중괄호 {}  | 필요      | 불필요（공백 2문자 들여쓰기가 코드 블록을 의미)| 필요
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
