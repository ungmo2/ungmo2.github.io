---
layout: post
title: <strong>Introduction</strong>
subtitle: 자바스크립트란?
categories: javascript
section: javascript
seq: 5
subseq: 2
description: 자바스크립트는 HTML, CSS와 함께 웹을 구성하는 요소중 하나로 웹브라우저에서 동작하는 유일한 언어로 1995년 Brendan Eich(Nescape)가 Navigator 2를 위하여 개발한 웹페이지에 포함되는 스크립트 언어이다. 자바스크립트는 멀티-패러다임 언어로 명령형 (imperative), 함수형 (functional), 프로토타입 기반 (prototype-based) 객체지향형 언어다. 비록 다른 객체지향적인 언어들과의 차이점에 대한 논쟁들이 있긴 하지만, 자바스크립트는 강력한 객체지향 프로그래밍 능력들을 지니고 있다. 간혹 클래스가 없어서 객체지향이 아니라고 생각하는 사람들도 있으나 프로토타입 기반의 객체지향 언어이다.
---

* TOC
{:toc}

# 1. Introduction

* 자바스크립트는 HTML, CSS와 함께 웹을 구성하는 요소중 하나로 <strong>웹브라우저에서 동작하는 유일한 언어</strong>이다. 1995년 브렌던 아이크(Brendan Eich)가 [Netscape Navigator 2](https://en.wikipedia.org/wiki/Netscape_Navigator_2)를 위하여 개발한 웹페이지에 포함되는 [스크립트 언어](https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8_%EC%96%B8%EC%96%B4)이다.

![Netscape Navigator 2](/img/navigator-2.png)

Netscape Navigator 2
{: .desc-img}

* 초창기 자바스크립트는 웹페이지 제작에 있어서 보조적인 기능을 수행하기 위해 한정적인 용도로 주로 사용되었다. 이 시기에 대부분 로직은 주로 웹서버에서 실행되었고 브라우저(클라이언트)는 서버로 부터 전달받은 HTML과 CSS를 렌더링하는 수준이었다. 하지만 웹이 더욱 발전하면서 과거 웹서버에서 수행되던 많은 역할들이 클라이언트로 이동하였는데 이것은 자바스크립트의 발전 덕분이다. 특히 [jQuery](https://jquery.com/)의 등장으로 다소 번거롭고 논란이 있던 DOM(Document Object Model)를 보다 쉽게 제어할 수 있게 되었다. 이는 정적인 웹페이지에 역동성을 부여하기 위한 목적으로 자바스크립트의 위상을 더욱 높이는 계기가 되었다.

* 자바스크립트는 별도의 컴파일 작업을 개발자가 수행하지 않는 [인터프리터](https://ko.wikipedia.org/wiki/인터프리터) 언어(Interpreter language)이다. 대부분의 모던 자바스크립트 엔진(Chrome의 V8, FireFox의 Spidermonkey, Safari의 JavaScriptCore, Microsoft Edge의 Chakra 등)은 인터프리터와 컴파일러의 장점을 결합하여 비교적 느린 인터프리터의 단점을 해결했다. 인터프리터는 소스코드를 즉시 실행하고 컴파일러는 빠르게 동작하는 머신 코드를 생성하고 최적화한다. 이를 통해 컴파일 단계에서 추가적인 시간이 필요함에도 불구하고 보다 빠른 코드의 실행이 가능하다.

<!-- http://devtimothy.tistory.com/m/94 -->
<!-- 텍스트 기반 소스 코드를 파싱하여 중간 언어(IR, intermediate representation)인 바이트 코드로 변환한다. 그런 다음 중간 언어인 바이트 코드를 native code로 컴파일하여 동작을 수행한다. -->
<!-- https://meetup.toast.com/posts/77 -->

* 자바스크립트는 다른 언어에서 많은 영향을 받았다. C, Java와는 기본 문법이 유사하다. 그리고 Self에서는 프로토타입 기반 상속을, Scheme에서는 일급 함수의 개념을 차용했다.

* 자바스크립트는 [명령형(imperative)](https://ko.wikipedia.org/wiki/명령형_프로그래밍), [함수형(functional)](https://ko.wikipedia.org/wiki/함수형_프로그래밍), [프로토타입 기반(prototype-based) 객체지향 프로그래밍](https://ko.wikipedia.org/wiki/프로토타입_기반_프로그래밍)을 지원하는 [멀티-패러다임 프로그래밍 언어](https://ko.wikipedia.org/wiki/다중_패러다임_프로그래밍_언어)다. 비록 다른 객체지향 언어들과의 차이점에 대한 논쟁들이 있긴 하지만, 자바스크립트는 강력한 객체지향 프로그래밍 능력을 지니고 있다. 간혹 클래스(ES6에서 새롭게 도입되었다), 상속, 정보 은닉을 위한 키워드 private가 없어서 객체지향 언어가 아니라고 오해([자바스크립트는 가장 많은 오해를 받는 언어이다.](http://javascript.crockford.com/javascript.html))하는 경우도 있지만 자바스크립트는 클래스 기반 객체지향 언어보다 효율적이면서 강력한 <strong>프로토타입 기반의 객체지향 언어</strong>이다.

* 자바스크립트는 다른 언어에서 많은 영향을 받았다. C, Java와는 기본 문법이 유사하다. 그리고 Self에서는 프로토타입 기반 상속을, Scheme에서는 일급 함수의 개념을 차용했다.

* 구글의 [Chrome V8 자바스크립트 엔진](https://developers.google.com/v8/)으로 빌드된 자바스크립트 [런타임](https://ko.wikipedia.org/wiki/%EB%9F%B0%ED%83%80%EC%9E%84) 환경(Runtime Environment)인 <strong>Node.js</strong>의 등장으로 자바스크립트는 웹 브라우저를 벗어나 서버 사이드 애플리케이션 개발에서도 사용되는 범용 개발 언어가 되었다. 웹 브라우저에서만 동작하는 반쪽짜리 언어 취급을 받던 자바스크립트는 프런트엔드 영역은 물론 백엔드 영역까지 아우르는 웹 프로그래밍 언어의 표준으로 자리잡고 있다.

* 자바스크립트는 모바일 웹/앱 개발 분야에서도 [크로스 플랫폼](https://ko.wikipedia.org/wiki/크로스_플랫폼)을 위한 가장 중요한 언어로 주목받고 있다. 웹은 물론 모바일 하이브리드 앱([PhoneGap](http://phonegap.com), [Sencha Touch](https://www.sencha.com/products/touch), [Ionic](https://ionicframework.com)), 서버 사이드([NodeJS](https://nodejs.org/)), Desktop([Electron](https://electron.atom.io/), [AppJS](http://appjs.com/)), 로봇 제어([Cylon.js](https://cylonjs.com/), [NodeBots](http://nodebots.io/)) 언어로서 세계에서 가장 인기있는 언어이다.

* SPA(Single Page Application)가 대중화되면서 [Angular](https://angular.io/), [React](https://facebook.github.io/react/), [Vue.js](https://vuejs.org/) 등 다양한 SPA Framework/Library 또한 많은 사용층을 확보하고 있다.

![Most Popular Technologies](/img/most-Popular-technologies.png)

[Stackoverflow Developer Survey Results 2018](https://insights.stackoverflow.com/survey/2018#most-popular-technologies)
{: .desc-img}

<!-- ![rank_of_top_language_github](/img/rank_of_top_language_github.png)

The rank of top languages on Github.com over time
{: .desc-img}

* 월마트, 이베이, 페이팔, 우버, 야후, 그루폰 등 거대 글로벌 기업들의 자바스크립트 환경으로 전환함에 따라 이와 같은 추세는 앞으로 더욱 가속될 전망이다. 빠르고 쉽게 서비스를 구축할 수 있는 장점을 가지고 있어 많은 Start-up기업 또한 자바스크립트 환경을 사용하고 있다. -->

# 2. History

자바스크립트는 1995년 Brendan Eich(Nescape)이 Navigator 2를 위하여 웹페이지에 포함되는 스크립트 언어로서 개발되었으며 "Mocha"로 명명되었다. 그해 9월 "LiveScript"로 이름이 변경되었고, 10월 "JavaScript"로 최종 명명되었다.

이후 Microsoft는 IE 3.0에서 동작하는 "JScript"를 만들었고 Nescape는 [Ecma International](https://ko.wikipedia.org/wiki/Ecma_인터내셔널)에 자바스크립트의 표준화를 요청하였다.

1997년 7월 ECMA-262라 불리는 명세(spec)가 완성되었고 상표권의 문제로 JavaScript는 <strong>ECMAScript</strong>로 명명되었다. 이후 1999년 ECMAScript 3(ES3)이 공개되었고 10년만인 2009년 출시된 ECMAScript 5(ES5)는 HTML5와 함께 출현한 표준안이다.

2015년 ECMAScript 6(ES6)가 공개되었고 [let/const keyword](./es6-block-scope), [module system](./es6-module), [Arrow Function](./es6-arrow-function), [class](./es6-class) 등이 추가되었다. ES5에서 ES6로의 버전업은 기능 상의 큰 변화가 있었고 이후의 버전업은 작은 기능의 추가 레벨로 매년 공개할 것으로 예고되었다.

* ECMAScript Version

ECMAScript 3 : [ECMA-262 3rd edition](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf) (1999.12)
: 가장 범용적으로 지원되는 버전이다.

ECMAScript 5 : [ECMA-262 5th edition](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262%205th%20edition%20December%202009.pdf) (2009.12)
: HTML5와 함께 출현한 표준안이다. JSON(JavaScript Object Notation)과 Strict Mode가 추가되었다. [IE 9 이상(85%)](http://kangax.github.io/compat-table/es5/)이나 그 외 브라우저에서만 작동한다.

ECMAScript 6 : [ECMA-262 6th edition](http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf.) (2015.06)
: let, const 키워드, Arrow Function, class, Symbol 타입 등이 추가되었다.

![history javascript evolution es6](/img/history-javascript-evolution-es6.png)
{: .w-650}

# 3. Browsers Support

IE를 제외한 대부분의 모던 브라우저는 ES6를 지원하고 있지만 100% 지원하고 있지는 않다. 그리고 Node.js의 경우 v4부터 지원을 시작하였다.

![kangax](/img/kangax.png)
{: .w-650}

[ES6 compat table](https://kangax.github.io/compat-table/es6/)
{: .desc-img}

모던 브라우저의 ES6 지원은 97%로 거의 100%에 육박하지만 IE 지원을 고려한다면 [babel](https://babeljs.io/)과 같은 Transpiler를 사용하여야 한다.

# Reference

* [자바스크립트는 어떻게 작동하는가: V8 엔진의 내부 + 최적화된 코드를 작성을 위한 다섯 가지 팁](https://engineering.huiseoul.com/자바스크립트는-어떻게-작동하는가-v8-엔진의-내부-최적화된-코드를-작성을-위한-다섯-가지-팁-6c6f9832c1d9)

* [자바스크립트 엔진의 최적화 기법](https://meetup.toast.com/posts/77)

* [ECMAScript Version](https://developer.mozilla.org/ko/docs/Web/JavaScript/언어_리소스)

* [ECMAScript 6 New Features: Overview & Comparison](http://es6-features.org)
