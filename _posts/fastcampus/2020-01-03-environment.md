---
layout: fs-post
title: <strong>자바스크립트 개발 환경과 실행 방법</strong>
categories: fastcampus
section: fastcampus
seq: 3
permalink: /:categories/:title
description:
---

* TOC
{:toc}

# 1.	자바스크립트 실행 환경

모든 브라우저는 자바스크립트를 해석하고 실행할 수 있는 자바스크립트 엔진을 내장하고 있다. 브라우저뿐만 아니라 Node.js도 자바스크립트 엔진을 내장하고 있다. 따라서 자바스크립트는 브라우저 환경 또는 Node.js 환경에서 실행할 수 있다. 기본적으로 브라우저에서 동작하는 코드는 Node.js 환경에서도 동일하게 동작한다.

그런데 한 가지 주의해야 할 점은 브라우저와 Node.js는 용도가 다르다는 것이다. 브라우저는 HTML, CSS, 자바스크립트를 실행해 웹페이지를 브라우저 화면에 렌더링하는 것이 주된 목적이지만 Node.js는 브라우저 외부에서 자바스크립트 실행 환경을 제공하는 것이 주된 목적이다. 따라서 브라우저와 Node.js 모두 자바스크립트의 코어인 ECMAScript를 실행할 수 있지만 브라우저와 Node.js에서 ECMAScript 이외에 추가로 제공하는 기능은 호환되지 않는다.

예를 들어, 브라우저는 파싱된 HTML 요소를 선택하거나 조작하는 기능의 집합인 DOM API를 기본적으로 제공한다. 하지만 브라우저 외부에서 자바스크립트 개발 환경을 제공하는 것이 주 목적인 Node.js는 DOM API를 제공하지 않는다. 브라우저 외부 환경에서는 HTML 요소를 파싱해서 객체화한 DOM(Document Object Model)을 직접 다룰 필요가 없기 때문이다.

웹 크롤링
: 서버에서 웹사이트의 콘텐츠를 수집하기 위해 웹사이트에서 HTML 문서를 가져온 다음, 이를 가공해서 필요한 데이터만 추출하는 경우가 있다. 서버 환경은 DOM API를 제공하지 않으므로 [cheerio](https://cheerio.js.org)와 같은 DOM 라이브러리를 사용해 HTML 문서를 가공하기도 한다.

반대로 Node.js에서는 파일을 create/read/update/delete할 수 있는 파일 시스템을 기본 제공하지만 브라우저는 이를 지원하지 않는다. (Web API인 [FileReader 객체](https://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api)를 사용해 사용자가 지정한 파일을 읽어 들이는 것은 가능하다.)

웹 애플리케이션의 자바스크립트는 사용자 컴퓨터의 브라우저에서 동작한다. 만약 브라우저를 통해 다운로드되어 실행되는 자바스크립트가 사용자 컴퓨터의 로컬 파일을 삭제하거나 수정하고 생성할 수 있다면 이는 사용자 컴퓨터가 악성 코드에 그대로 노출된 것과 마찬가지다. 따라서 보안 상 이유로 브라우저 환경의 자바스크립트는 파일 시스템을 제공하지 않는다.

이처럼 브라우저는 ECMAScript와 DOM, BOM, Canvas, XMLHttpRequest, Fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web worker와 같은 **[클라이언트 사이드 Web API](https://developer.mozilla.org/ko/docs/Web/API)**를 지원한다. Node.js는 클라이언트 사이드 Web API를 지원하지 않고 ECMAScript와 [Node.js 고유의 Host API](https://nodejs.org/dist/latest/docs/api/)를 지원한다.

![](/assets/fs-images/3-1.png)
{: .w-350}

브라우저와 Node.js 환경
{: .desc-img}

이를 염두에 두고 자바스크립트 개발 환경을 구축하고 자바스크립트를 실행하는 방법을 살펴보자. 자바스크립트를 브라우저 환경에서 실행하는 방법과 Node.js 환경에서 실행하는 방법, 그리고 코드 에디터인 비주얼 스튜디오 코드(Visual Studio Code)를 사용해 브라우저나 Node.js 환경에서 실행하는 방법을 살펴볼 것이다.

# 2. 웹 브라우저

다양한 웹 브라우저가 있지만 이 책에서는 구글 크롬(Chrome) 브라우저를 사용한다. 크롬은 ECMAScript 사양을 준수하는 것은 물론이고 시장 점유율도 가장 높다. 2020년 7월 현재, 구글 크롬 브라우저의 점유율은 65.47%로, 2위인 사파리(16.97%)를 크게 앞선다.

![](/assets/fs-images/3-2.png)
{: .w-650}

[웹 브라우저 시장 점유율(2009/1 ~ 2020/5)](https://gs.statcounter.com/browser-market-share#monthly-200901-202007)
{: .desc-img}

크롬 브라우저의 V8 자바스크립트 엔진은 Node.js에서도 사용하고 있다. 만약 크롬 브라우저가 설치되어 있지 않다면 다음 웹사이트를 방문하여 최신 버전을 설치하자.

-	[크롬 브라우저 다운로드](https://www.google.com/intl/ko_ALL/chrome)

## 2.1.	개발자 도구

크롬 브라우저가 제공하는 개발자 도구(DevTools)는 웹 애플리케이션 개발에 필수적인 강력한 도구다. 개발자 도구는 브라우저에 기본 내장되어 있으므로 별도로 설치할 필요가 없다. 개발자 도구는 다음의 [단축키](https://developers.google.com/web/tools/chrome-devtools/shortcuts)로 열 수 있다.

| 운영체제  | 단축키
|:--------:|:------------
| 윈도우    | F12 또는 Ctrl + Shift + I
| macOS    | command ⌘ + option ⌥ + I

![](/assets/fs-images/3-3.png)

크롬 브라우저의 개발자 도구
{: .desc-img}

개발자 도구는 웹 개발에 유용한 다양한 기능을 제공한다. 자주 사용하는 개발자 도구의 기능은 다음과 같다.

| 패널      | 설명
|:---------|:---------------
| Elements | 로딩된 웹페이지의 DOM과 CSS를 편집해서 렌더링된 뷰를 확인해 볼 수 있다. 단, 편집한 내용이 저장되지는 않는다. 웹페이지가 의도된 대로 렌더링되지 않았다면 이 패널을 확인해 유용한 힌트를 얻을 수 있다.
| Console	 | 로딩된 웹페이지의 에러를 확인하거나 자바스크립트 소스코드에 작성한 console.log 메서드의 실행 결과를 확인할 수 있다.
| Sources	 | 로딩된 웹페이지의 자바스크립트 코드를 디버깅할 수 있다.
| Network	 | 로딩된 웹페이지에 관련된 네트워크 요청(request) 정보와 성능을 확인할 수 있다.
| Application	| 웹 스토리지, 세션, 쿠키를 확인하고 관리할 수 있다.

## 2.2.	콘솔

개발자 도구의 Console 패널(이하 콘솔)은 자바스크립트 코드에서 에러가 발생해 애플리케이션이 정상적으로 동작하지 않을 때 가장 우선적으로 살펴봐야 할 곳이다. 구현 단계에서는 에러가 빈번하게 발생하므로 항상 콘솔을 열어둔 상태에서 개발하는 것이 좋다. 콘솔을 열어두지 않으면 에러가 발생했는지조차 알 수 없는 경우가 있기 때문이다.

에러가 발생한 경우가 아니더라도 콘솔은 매우 유용하다. 구현 단계에서 디버깅을 실행하는 것보다 간편하게 코드의 실행 결과를 확인하면서 개발을 진행하기 위해 console.log 메서드를 사용하는 경우가 많다. `console.log(...)`는 소괄호 안의 코드를 평가해서 그 결과를 콘솔에 출력하는 함수다.

콘솔은 자바스크립트 코드를 직접 입력해 그 결과를 확인할 수 있는 REPL(Read Eval Print Loop: 입력 수행 출력 반복) 환경으로 사용할 수도 있다. 개발자 도구의 Console 패널을 클릭하면 다음과 같이 프롬프트(>)가 표시되는 것을 확인할 수 있다.

![](/assets/fs-images/3-4.png)

개발자 도구의 Console 패널
{: .desc-img}

다음과 같이 개발자 도구 우측의 : 버튼을 클릭하면 브라우저에서 개발자 도구를 분리할 수도 있다.

![](/assets/fs-images/3-5.png)

개발자 도구 분리 버튼
{: .desc-img}

프롬프트에 자바스크립트 코드를 입력하면 다음 줄에 실행 결과가 표시된다. 엔터 키를 입력하면 다음 프롬프트로 이동한다.

![](/assets/fs-images/3-6.png)

콘솔에서 자바스크립트 코드를 실행
{: .desc-img}

여러 줄로 이뤄진 자바스크립트 코드를 실행할 때 줄바꿈이 필요한 경우에는 Shift 키를 누른 상태에서 엔터 키를 누른다.

![](/assets/fs-images/3-7.png)

Console 패널에서 자바스크립트 코드의 줄바꿈
{: .desc-img}

자바스크립트 코드를 실행하는 중에 에러가 발생하면 에러의 내용이 콘솔에 출력된다.

![](/assets/fs-images/3-8.png)

에러 출력
{: .desc-img}

## 2.3. 브라우저에서 자바스크립트 실행

브라우저는 HTML 파일을 로드하면 script 태그에 포함된 자바스크립트 코드를 실행한다. 만약 자바스크립트 코드 내에서 console.log 메서드가 호출되었다면 콘솔에 실행 결과가 출력될 것이다.

다음과 같이 자바스크립트가 포함된 HTML 파일을 생성하고 브라우저로 실행해 보자. 지금은 아래 코드를 이해할 필요가 없고, HTML에 포함된 자바스크립트를 브라우저에서 실행하는 방법에 주목하자.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Counter</title>
</head>
<body>
  <div id="counter">0</div>
  <button id="increase">+</button>
  <button id="decrease">-</button>
  <script>
    // 에러를 발생시키는 코드: 선택자는 'counter-x'가 아니라 'counter'를 지정해야 한다.
    const $counter = document.getElementById('counter-x');
    const $increase = document.getElementById('increase');
    const $decrease = document.getElementById('decrease');

    let num = 0;
    const render = function () { $counter.innerHTML = num; };

    $increase.onclick = function () {
      num++;
      console.log('increase 버튼 클릭', num);
      render();
    };

    $decrease.onclick = function () {
      num--;
      console.log('decrease 버튼 클릭', num);
      render();
    };
  </script>
</body>
</html>
```

'+' 또는 '-' 버튼을 클릭하면 에러가 발생한다. 만약 개발자도구의 콘솔을 열어둔 상태가 아니라면 에러가 발생한 것을 알아차리기 어렵다. 에러를 확인하기 위해 개발자 도구의 콘솔을 열어보자.

![](/assets/fs-images/3-9.png)

에러 발생
{: .desc-img}

에러가 발생하기는 했으나 HTML 파일에 포함된 자바스크립트가 일부 실행된 것은 확인했다. 다음은 디버깅에 대해 살펴보자.

## 2.4.	디버깅

에러 정보의 오른쪽에 에러 발생 위치를 나타내는 링크를 클릭해보자. 그럼 다음 그림과 같이 자바스크립트 코드를 디버깅할 수 있는 [Sources] 패널로 이동할 것이다.

![](/assets/fs-images/3-10.png)

[Sources] 패널
{: .desc-img}

에러가 발생한 위치에 빨간 밑줄이 표시되고, 그 위에 마우스를 올려 보면 "Uncaught TypeError: Cannot set property 'innerHTML' of null"이라는 에러 정보가 표시된다.

지금은 코드를 이해할 필요는 없다. 참고로 이 에러는 innerHTML 프로퍼티에 값을 할당하기 위해 $counter 변수를 참조했으나 $counter 변수의 값이 객체가 아니라 null이기 때문에 발생한 에러다.
{: .info}

$counter 변수의 값이 null인지 확인해보고, null이라면 그 이유를 알아내서 에러가 발생한 원인을 제거해 보자. 에러가 발생한 코드 왼쪽의 라인 번호를 클릭해 브레이크 포인트(중단점)를 걸고(①) 다시 버튼을 클릭하면(②) 다음과 같이 디버깅 모드로 들어간다.

![](/assets/fs-images/3-11.png)

디버깅 모드
{: .desc-img}

18번째 줄의 $counter에 마우스 커서를 올려보면 $counter 변수의 값을 확인할 수 있다. 현재 $counter 변수의 값은 null이다. 그 원인은 13번째 줄에서 $counter 변수에 값을 할당할 때 HTML 요소의 아이디를 'counter-x'로 잘못 지정한 탓이다. 다시 소스코드로 돌아가 13번째 줄의 'counter-x'를 'counter'로 수정하면 에러가 제거될 것이다. 이처럼 디버깅은 먼저 에러 메시지를 확인하고 에러가 발생한 원인을 제거하는 것이다.

콘솔과 디버깅에 대한 자세한 내용은 구글의 [Tools for Web Developers: 콘솔 사용](https://developers.google.com/web/tools/chrome-devtools/console/?hl=ko)과 [Tools for Web Developers: Chrome DevTools에서 자바스크립트 디버깅 시작하기](https://developers.google.com/web/tools/chrome-devtools/javascript/?hl=ko)를 참고하기 바란다.

# 3. Node.js

클라이언트 사이드, 즉 브라우저에서 동작하는 간단한 웹 애플리케이션은 브라우저만으로도 개발할 수 있다. 하지만 프로젝트의 규모가 커짐에 따라 React, Angular, Lodash 같은 프레임워크 또는 라이브러리를 도입하거나 Babel, Webpack, ESLint 등 여러 가지 도구를 사용할 필요가 있다. 이때 Node.js와 npm이 필요하다.

## 3.1.	Node.js와 npm 소개

2009년, [라이언 달(Ryan Dahl)](https://en.wikipedia.org/wiki/Ryan_Dahl)이 발표한 [Node.js](https://nodejs.org)는 크롬  V8 자바스크립트 엔진으로 빌드된 자바스크립트 [런타임 환경(runtime environment)](https://ko.wikipedia.org/wiki/런타임)이다. 간단히 말해 브라우저에서만 동작하던 자바스크립트를 브라우저 이외의 환경에서 동작시킬 수 있는 자바스크립트 실행 환경이 Node.js다.

[npm(node package manager)](https://www.npmjs.com/)은 자바스크립트 패키지 매니저다. Node.js에서 사용할 수 있는 모듈들을 패키지화해서 모아둔 저장소 역할과 패키지 설치 및 관리를 위한 CLI(Command line interface)를 제공한다. 자신이 작성한 패키지를 공개할 수도 있고 필요한 패키지를 검색해 재사용할 수도 있다. npm에 대한 자세한 내용은 다음 페이지를 참고하기 바란다.

- [모듈화와 npm](https://poiemaweb.com/nodejs-npm)

## 3.2.	Node.js 설치

Node.js를 설치하기 위해 Node.js의 웹사이트([http://nodejs.org](http://nodejs.org))에 접속해 보자.

![](/assets/fs-images/3-12.png)

Node.js 웹사이트
{: .desc-img}

Node.js 웹사이트에 접속하면 두 개의 다운로드 버튼이 보이는데 왼쪽은 LTS 버전, 오른쪽은 Current 버전을 다운로드하는 버튼이다. LTS(Long Term Supported) 버전은 장기적으로 안정된 지원이 보장된다. 반면 Current 버전은 최신 기능을 제공하지만 업데이트가 발생하는 버전으로 안정적이지 않을 수 있다. 실제 개발 환경이라면 LTS 버전을 설치하는 것이 좋지만 학습을 위해 최신 기능을 제공하는 Current 버전을 다운로드하자.

"14.3.0 Current" 버튼을 클릭하면 사용자의 운영체제에 적합한 설치 파일을 다운로드해서 설치할 수 있다. 이때 npm도 함께 설치된다. Node.js는 아래의 디렉터리에 설치되며, 버전에 따라 설치 위치는 바뀔 수 있다.

- 윈도우 : C:\Program Files\nodejs\node.exe
- Mac : /usr/local/bin/node

설치가 완료되면 터미널(윈도우에서는 명령 프롬프트)에서 Node.js와 npm의 버전을 출력해 정상적으로 설치되었는지 확인한다.

```bash
$ node -v
v14.3.0
$ npm -v
6.14.5
```

## 3.3.	Node.js REPL

Node.js가 제공하는 REPL(Read Eval Print Loop)을 사용하면 간단한 자바스크립트 코드를 실행해 결과를 확인해 볼 수 있다. 터미널(윈도우에서는 명령 프롬프트)에 다음과 같은 명령어를 실행해 보자.

```bash
$ node
```

프롬프트가 >로 변경되면 자바스크립트 코드를 실행해 볼 수 있다.

```bash
Welcome to Node.js v14.3.0.
Type ".help" for more information.
> 1 + 2
3
> Math.max(1, 2, 3)
3
> [1, 2, 3].filter(v => v % 2)
[ 1, 3 ]
```

자바스크립트 파일을 실행하려면 node 명령어 뒤에 파일 이름을 입력한다. 파일 확장자 .js는 생략해도 된다.

```bash
$ node index.js
```

Ctrl + C 키를 두 번 입력하면 Node.js REPL이 종료된다. Node.js REPL에 대한 자세한 내용은 다음 문서를 참고하기 바란다.

- [Node.js Documentation : REPL](https://nodejs.org/dist/latest/docs/api/repl.html#repl_repl)


<!-- ### 3.2. Node.js 맛보기

Node.js를 사용하여 간단한 HTTP 서버를 작성해 보자. Node.js는 http 서버 모듈을 내장하고 있어서 아파치와 같은 별도의 웹서버를 설치할 필요가 없다. 아래와 같은 내용으로 app.js 파일을 생성한다.

```javascript
// app.js
const http = require('http'); // 1

http.createServer((request, response) => { // 2
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World');
}).listen(3000); // 3

console.log('Server running at http://127.0.0.1:3000/');
```

1. http 모듈을 로딩하여 변수 http에 할당하였다. Node.js는 module 단위로 각 기능을 분할할 수 있다. module은 파일과 1대1 대응 관계를 가지며 하나의 모듈은 자신만의 독립적인 실행 영역(Scope)을 가지게 된다. 따라서 클라이언트 사이드 자바스크립트와는 달리 전역 변수의 중복 문제가 발생하지 않는다. 모듈은 module.exports 또는 exports 객체를 통해 정의하고 외부로 공개한다. 그리고 공개된 모듈은 require 함수를 사용하여 임포트한다.

2. http 모듈의 `createServer([requestListener])` 메서드를 사용하여 HTTP 서버 객체를 생성한다. HTTP 서버 객체는 EventEmitter 클래스를 상속한 것으로 request 이벤트가 발생하면 HTTP request를 처리하여 response를 반환하는 request Listener 함수를 호출한다. 이 request Listener 함수는 request와 response 객체를 전달받으며 HTTP request 이벤트가 발생할 때마다 한번씩 호출된다.

createServer 메서드가 반환한 HTTP 서버 객체의 listen 메서드에 포트번호 3000을 전달하여 서버를 실행한다.

app.js 파일을 만들었으면 터미널을 열고 해당 파일이 있는 경로에서 다음 명령으로 서버를 실행한다.

```bash
$ node app.js
```

위 명령을 실행하고 브라우저에서 "http://localhost:3000" 에 접속하면 "Hello World"가 출력되는 것을 확인할 수 있다. -->

<!-- ## 3.3. npm

[npm(node package manager)](https://www.npmjs.com/)은 자바스크립트 패키지 매니저이다. Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할과 패키지 설치 및 관리를 위한 CLI(Command line interface)를 제공한다. 자신이 작성한 패키지를 공개할 수도 있고 필요한 패키지를 검색하여 재사용할 수도 있다. -->

# 4.	비주얼 스튜디오 코드

## 4.1.	비주얼 스튜디오 코드 설치

브라우저의 콘솔 또는 Node.js의 REPL에서 자바스크립트 코드를 실행할 수 있지만 애플리케이션을 개발하는 단계에서 사용하기에는 부족함이 많다. 코드 에디터를 사용하면 코드 자동 완성, 문법 오류 감지, 디버깅, Git 연동 등 강력하고 편리한 기능을 활용할 수 있다. 최근 인기를 끌고 있는 코드 에디터는 다음과 같다.

![](/assets/fs-images/3-13.png)

[코드 에디터 인기 순위](https://2019.stateofjs.com/other-tools/#text_editors)
{: .desc-img}

마이크로소프트의 비주얼 스튜디오 코드(이하 VS Code)를 사용해 자바스크립트를 실행해보자. 먼저 VS Code를 설치하기 위해 [VS Code 웹사이트](https://code.visualstudio.com)에 접속해 사용 중인 운영체제에 해당하는 설치 프로그램을 내려받아 설치한다.

![](/assets/fs-images/3-14.png)

비주얼 스튜디오 코드 웹사이트
{: .desc-img}

## 4.2.	내장 터미널

앞에서 설치한 VS Code를 실행한 다음, 적당한 위치에 프로젝트 폴더를 성성하고 자바스크립트 파일을 생성해 보자. 예를 들어, 바탕화면에 myapp이라는 폴더를 생성하고 다음과 같이 index.js 파일을 생성한다.

```javascript
// myapp/index.js
const arr = [1, 2, 3];

arr.forEach(console.log);
```

VS Code에는 터미널(윈도우에서는 명령 프롬프트)이 내장되어 있다. 내장 터미널을 열려면 Ctrl + ` 단축키를 누른다.

![](/assets/fs-images/3-15.png)

비주얼 스튜디오 코드에 내장된 터미널
{: .desc-img}

내장 터미널이 열리고 프롬프트가 나타나면 다음과 같은 Node.js 명령어로 자바스크립트 파일을 실행할 수 있다.

```bash
> node index
1 0 [ 1, 2, 3 ]
2 1 [ 1, 2, 3 ]
3 2 [ 1, 2, 3 ]
```

![](/assets/fs-images/3-16.png)

내장 터미널에서 자바스크립트 파일을 실행
{: .desc-img}

## 4.3.	Code Runner 확장 플러그인

VS Code에서는 확장 플러그인 저장소인 "마켓플레이스"를 통해 다양한 확장 플러그인을 다운로드해서 설치할 수 있다. Code Runner 확장 플러그인을 사용하면 VS Code의 내장 터미널에서 단축키를 사용해 자바스크립트를 비롯해 다양한 프로그래밍 언어로 구현된 소스코드를 간단히 실행할 수 있다.

Code Runner 확장 플러그인을 설치해 보자. VS Code의 확장 버튼을 클릭한 다음 "Code Runner"를 입력해 검색하고 Install 버튼을 클릭한다.

![](/assets/fs-images/3-17.png)

Code Runner 확장 플러그인 설치
{: .desc-img}

Code Runner 확장 플러그인에서는 다음과 같은 단축키를 사용해 현재 표시 중인 자바스크립트 파일을 실행할 수 있다.

| 운영체제	 | 단축키
|:--------:|:----------------
| 윈도우    | Ctrl + Alt + N
| macOS    | control ⌃ + option ⌥ + N

![](/assets/fs-images/3-18.png)

Code Runner 확장 플러그인으로 자바스크립트 코드를 실행
{: .desc-img}

다음과 같이 소스코드를 수정한 후 다시 한번 실행해 보자.

```javascript
// myapp/index.js
const arr = [1, 2, 3];

arr.forEach(alert);
```

이 소스코드를 실행하면 "ReferenceError: alert is not defined"라는 에러가 발생한다. 브라우저에 알림창을 띄우는 alert 함수는 브라우저에서만 동작하는 클라이언트 사이드 Web API다. 즉, alert 함수는 브라우저 환경에서만 유효하다.

그런데 Code Runner 확장 플러그인은 Node.js 환경을 사용해 자바스크립트를 실행한다. 따라서 클라이언트 사이드 Web API인 alert 함수를 Node.js 환경에서는 알 수 없기 때문에 에러가 발생한 것이다. 따라서 클라이언트 사이드 Web API가 포함된 소스코드는 Code Runner 확장 플러그인을 통해 실행하지 말고 브라우저 환경에서 실행해야 한다.

지금은 브라우저 환경과 Node.js 환경 모두에서 실행 가능한 ECMAScript 표준 빌트인 함수와 브라우저 환경에서만 실행 가능한 클라이언트 사이드 Web API를 구분하기 어려울 것이다. 이 책에서는 앞으로 다양한 ECMAScript 표준 빌트인 함수와 클라이언트 사이드 Web API를 다룬다. 따라서 점차 ECMAScript의 표준 빌트인 함수와 클라이언트 사이드 Web API를 구분할 수 있게 될 것이다. 지금은 클라이언트 사이드 Web API는 Node.js 환경에서 실행할 수 없다는 것에 주목하자.

## 4.4.	Live Server 확장 플러그인

클라이언트 사이드 Web API가 포함된 자바스크립트 코드를 실행하려면 Node.js 환경이 아닌 브라우저에서 실행해야 한다. 위 예제를 브라우저에서 실행하려면 개발자 도구의 콘솔에서 실행하거나 자바스크립트 코드를 HTML에 삽입한 다음 HTML 파일을 브라우저에서 열어야 한다.

위 예제를 브라우저에서 실행하기 위해 앞에서 생성한 myapp 폴더에 다음과 같은 HTML 파일을 생성하자.

```html
<!DOCTYPE html>
<html>
<body>
  <script src="index.js"></script>
</body>
</html>
```

위 HTML 파일을 브라우저에서 직접 열어도 좋지만 파일 경로 문제가 발생할 수 있고, 소스코드를 수정할 때마다 매번 새로고침해야 하므로 번거롭다.

이때 Live Server라는 확장 플러그인을 이용하면 소스코드를 수정할 때마다 수정 사항을 브라우저에 자동으로 반영해주기 때문에 매우 편리하다. VS Code의 확장 버튼을 클릭한 다음 "Live Server"를 검색하고 Install 버튼을 클릭한다.

![](/assets/fs-images/3-19.png)

Live Server 확장 플러그인 설치
{: .desc-img}

Live Server 확장 플러그인이 설치되면 화면 아래에 "Go Live"라는 버튼이 생성된다.

![](/assets/fs-images/3-20.png)

Live Server 확장 플러그인으로 가상 서버를 기동
{: .desc-img}

이 버튼을 클릭하면 가상 서버가 기동되어 브라우저에 HTML 파일이 자동 로딩된다. 이후 소스코드를 수정하면 수정 사항이 가상 서버에 자동으로 반영된다.
