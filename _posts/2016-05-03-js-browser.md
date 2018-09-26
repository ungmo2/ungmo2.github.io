---
layout: post
title: <strong>Javascript Environment</strong>
subtitle: 브라우저 동작 원리
categories: javascript
section: javascript
description: 대부분의 프로그래밍 언어는 운영체제(Operating System, OS) 위에서 실행되지만 웹 애플리케이션의 자바스크립트는 브라우저에서 HTML, CSS와 함께 실행된다. 따라서 브라우저 환경을 고려할 때 보다 효율적인 자바스크립트 프로그래밍이 가능하다.
---

구글의 Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임 환경(Runtime Environment)인 <strong>Node.js</strong>의 등장으로 자바스크립트는 웹 브라우저를 벗어나 서버 사이드 애플리케이션 개발에서도 사용되는 범용 개발 언어가 되었다. 하지만 자바스크립트가 가장 많이 사용되는 분야는 역시 웹 브라우저 환경에서 동작하는 웹 페이지/애플리케이션이다.

대부분의 프로그래밍 언어는 운영체제(Operating System, OS) 위에서 실행되지만 웹 애플리케이션의 자바스크립트는 브라우저에서 HTML, CSS와 함께 실행된다. 따라서 브라우저 환경을 고려할 때 보다 효율적인 자바스크립트 프로그래밍이 가능하다.

브라우저의 주요 기능은 사용자가 참조하고자 하는 웹페이지를 서버에 요청(Request)하고 응답(Response)을 받아 브라우저에 표시하는 것이다. 브라우저는 서버로부터 html, css, javascript 파일을 응답받는다. html, css 파일은 렌더링 엔진의 HTML 파서와 CSS 파서에 의해 파싱(Parsing)되어 DOM, CSSOM 트리로 변환되고 렌더 트리로 결합된다.

![브라우저 동작 원리](./img/client-server.png)
{: .w-700}

브라우저 동작 원리
{: .desc-img}

HTML 파서는 script 태그를 만나면 DOM 생성 프로세스를 중지하고 자바스크립트 엔진에 제어 권한을 넘긴다. 자바스크립트 엔진의 실행이 완료된 후 브라우저가 중지했던 시점부터 DOM 생성을 재개한다. 이것은 script 태그의 위치에 의해 DOM의 생성이 지연될 수 있음을 의미한다.

브라우저는 위 코드를 아래와 같이 실행할 것이다.

1. script 요소를 만나면 웹페이지의 파싱을 잠시 중단한다.
2. src 어트리뷰트에 정의된 자바스크립트 파일을 로드한 후 파싱하고 **실행한다**.
3. 중단된 웹페이지의 파싱을 계속 진행한다.

body 요소의 가장 아래에 스크립트를 위치시키는 것은 좋은 아이디어이다. 그 이유는 아래와 같다.

- HTML 요소들이 스크립트 로딩 지연으로 인해 렌더링에 지장 받는 일이 발생하지 않아 페이지 로딩 시간이 단축된다.

- DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작한다면 에러가 발생한다.

# Reference

* [브라우저는 어떻게 동작하는가?](http://d2.naver.com/helloworld/59361)

* [Render-tree Construction, Layout, and Paint](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=ko)

* [Adding interactivity with javascript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript?hl=ko)

* [오픈소스 웹킷(WebKit)의 구조와 원리](http://rtcc.hanyang.ac.kr/sitedata/2015_2_ISP/howbrowserswork_20150915.pdf)
