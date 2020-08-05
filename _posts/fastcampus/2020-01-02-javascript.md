---
layout: fs-post
title: <strong>자바스크립트란?</strong>
categories: fastcampus
section: fastcampus
seq: 2
permalink: /:categories/:title
description:
---

* TOC
{:toc}

# 1. 자바스크립트의 탄생

1995년, 약 90%의 시장 점유율로 웹 브라우저 시장을 지배하고 있던 [넷스케이프 커뮤니케이션즈(Netscape communications)](https://ko.wikipedia.org/wiki/넷스케이프)는 웹페이지의 보조적인 기능을 수행하기 위해 브라우저에서 동작하는 경량 프로그래밍 언어를 도입하기로 결정한다. 그래서 탄생한 것이 바로 브렌던 아이크(Brendan Eich)가 개발한 자바스크립트다.

자바스크립트는 1996년 3월, 넷스케이프 커뮤니케이션즈의 웹 브라우저인 [넷스케이프 내비게이터(Netscape Navigator 2](https://en.wikipedia.org/wiki/Netscape_Navigator_2)에 탑재되었고 "모카(Mocha)"로 명명되었다. 그러다 그해 9월 "라이브스크립트(LiveScript)"로 이름이 바뀌었다가 12월에 "자바스크립트(JavaScript)"라는 이름으로 최종 명명되었다.

![](/assets/fs-images/2-1.png)
{: .w-450}

넷스케이프 내비게이터 2
{: .desc-img}

이렇게 탄생한 자바스크립트는 현재 모든 브라우저의 표준 프로그래밍 언어로 자리 잡았다. 그러나 자바스크립트가 순탄하게 성장했던 것은 아니다. 자바스크립트가 탄생한 뒤 얼마 지나지 않아 자바스크립트의 파생 버전인 JScript가 출시되어 자바스크립트는 위기를 맞는다.

# 2. 자바스크립트의 표준화

1996년 8월, 마이크로소프트는 자바스크립트의 파생 버전인 "JScript"를 인터넷 익스플로러(Internet Explorer) 3.0에 탑재하였다. 그런데 문제는 JScript와 자바스크립트가 표준화되지 못하고 적당히 호환되었다는 것이다. 즉, 넷스케이프 커뮤니케이션즈와 마이크로소프트는 자사 브라우저의 시장 점유율을 높이기 위해 자사 브라우저에서만 동작하는 기능을 경쟁적으로 추가하기 시작했다는 것이다.

이로 인해 브라우저에 따라 웹페이지가 정상적으로 동작하지 않는 **크로스 브라우징 이슈**가 발생하기 시작했고, 결과적으로 모든 브라우저에서 정상적으로 동작하는 웹페이지를 개발하기가 무척 어려워졌다.

아래는 크로스 브라우징 이슈의 한 예이다.

```javascript
// IE 9 이전 버전은 표준인 addEventListener 메서드를 지원하지 않는다.
if (el.addEventListener) {
  el.addEventListener('click', modifyText, false);
} else if (el.attachEvent)  {
  el.attachEvent('onclick', modifyText);
}
```

이에 자바스크립트의 파편화를 방지하고 모든 브라우저에서 정상적으로 동작하는 표준화된 자바스크립트의 필요성이 대두되기 시작했다. 이를 위해 1996년 11월, 넷스케이프 커뮤니케이션즈는 컴퓨터 시스템의 표준을 관리하는 비영리 표준화 기구인 [ECMA 인터내셔널](https://www.ecma-international.org)에 자바스크립트의 표준화를 요청한다.

1997년 7월, ECMA-262라 불리는 표준화된 자바스크립트 초판(ECMAScript 1) 사양(specification)이 완성되었고, 상표권 문제로 자바스크립트는 **ECMAScript**로 명명되었다. 이후 1999년 ECMAScript 3(ES3)이 공개되고, 10년 만인 2009년에 출시된 ECMAScript 5(ES5)는 HTML5와 함께 출현한 표준 사양이다.

2015년에 공개된 ECMAScript 6(ECMAScript 2015, ES6)는 let/const 키워드, 화살표 함수, 클래스, 모듈 등과 같이 범용 프로그래밍 언어로서 갖춰야 할 기능들을 대거 도입하는 큰 변화가 있었다. ES6 이후의 버전업은 비교적 작은 기능을 추가하는 수준으로 매년 공개할 것으로 예고되었다. ECMAScript 버전별 특징은 다음과 같다.

| 버전	   | 출시 연도 | 특징
|:--------|:-------|:---------
| ES1     | 1997   | 초판
| ES2     | 1998	 | ISO/IEC 16262 국제 표준과 동일한 규격을 적용
| ES3     | 1999	 | 정규 표현식, try...catch
| ES5	    | 2009	 | HTML5와 함께 출현한 표준안. JSON, strict mode, 접근자 프로퍼티, 프로퍼티 어트리뷰트 제어, 향상된 배열 조작 기능(forEach, map, filter, reduce, some, every)
| ES6(ECMAScript 2015) | 2015	| let/const, 클래스, 화살표 함수, 템플릿 리터럴, 디스트럭처링 할당, 스프레드 문법, rest 파라미터, 심벌, 프로미스, Map/Set, 이터러블, for...of, 제너레이터, Proxy, 모듈 import/export
| ES7(ECMAScript 2016) | 2016 | 지수(**) 연산자, Array.prototype.includes, String.prototype.includes
| ES8(ECMAScript 2017) | 2017	| async/await, Object 정적 메서드(Object.values, Object.entries, Object.getOwnPropertyDescriptors)
| ES9(ECMAScript 2018) | 2018	| Object rest/spread 프로퍼티, Promise.prototype.finally, async generator, for await...of
| ES10(ECMAScript 2019) | 2019	| Object.fromEntries, Array.prototype.flat, Array.prototype.flatMap, optional catch binding
| ES11(ECMAScript 2020) | 2020	| String.prototype.matchAll, BigInt, globalThis, Promise.allSettled, null 병합 연산자, 옵셔널 체이닝 연산자, for...in enumation order

# 3. 자바스크립트 성장의 역사

초창기 자바스크립트는 웹페이지의 보조적인 기능을 수행하기 위해 한정적인 용도로 사용되었다. 이 시기에 대부분의 로직은 주로 웹 서버에서 실행되었고, 브라우저는 서버로부터 전달받은 HTML과 CSS를 단순히 렌더링하는 수준이었다.

렌더링(rendering)
: 렌더링이란 HTML, CSS, 자바스크립트로 작성된 문서를 해석해서 브라우저에 시각적으로 출력하는 것을 말한다. 때로는 서버에서 데이터를 HTML로 변환해서 브라우저에게 전달하는 과정(SSR; Server Side Rendering)을 가리키기도 한다. 브라우저가 HTML, CSS, 자바스크립트를 로드하고 파싱해서 렌더링하는 과정은 ["38. 브라우저의 렌더링 과정"](/fastcampus/browser-rendering)에서 자세히 살펴볼 것이다.

## 3.1.	Ajax

1999년, 자바스크립트를 이용해 서버와 브라우저가 **비동기(asynchronous)** 방식으로 데이터를 교환할 수 있는 통신 기능인 **Ajax(Asynchronous Javascript And XML)**가 XMLHttpRequest라는 이름으로 등장했다.

이전의 웹페이지는 html 태그로 시작해서 html 태그로 끝나는 완전한 HTML 코드를 서버로부터 전송받아 웹페이지 전체를 렌더링하는 방식으로 동작했다. 따라서 화면이 전환되면 서버로부터 새로운 HTML을 전송받아 웹페이지 전체를 처음부터 다시 렌더링했다.

이러한 방식은 변경할 필요가 없는 부분까지 포함된 HTML 코드를 서버로부터 다시 전송받기 때문에 불필요한 데이터 통신이 발생하고, 변경할 필요가 없는 부분까지 처음부터 다시 렌더링해야 하기 때문에 성능 면에서도 불리하다. 이로 인해 화면이 전환되면 화면이 순간적으로 깜박이는 현상이 발생하고, 이는 웹페이지의 어쩔 수 없는 한계로 받아들여졌다.

Ajax의 등장은 이전의 패러다임을 획기적으로 전환했다. 즉, 웹페이지에서 변경할 필요가 없는 부분은 다시 렌더링하지 않고, 서버로부터 필요한 데이터만 전송받아 변경해야 하는 부분만 한정적으로 렌더링하는 방식이 가능해진 것이다. 이로써 웹 브라우저에서도 데스크톱 애플리케이션과 유사한 빠른 성능과 부드러운 화면 전환이 가능해졌다.

2005년, 구글이 발표한 **[구글 맵스(Google Maps)](https://www.google.com/maps)**는 웹 애플리케이션 프로그래밍 언어로서 자바스크립트의 가능성을 확인하는 계기를 마련했다. 웹 브라우저에서 자바스크립트와 Ajax를 기반으로 동작하는 구글 맵스가 데스크톱 애플리케이션과 비교했을 때 손색이 없을 정도의 성능과 부드러운 화면 전환 효과를 보여준 것이다.

![](/assets/fs-images/2-2.png)
{: .w-450}

구글 맵스 베타 버전
{: .desc-img}

## 3.2. jQuery

2006년, **[jQuery](https://jquery.com)**의 등장으로 다소 번거롭고 논란이 있던 DOM(Document Object Model)을 더욱 쉽게 제어할 수 있게 되었고 크로스 브라우징 이슈도 어느 정도 해결되었다. jQuery는 넓은 사용자 층을 순식간에 확보했다. 이로 인해 배우기가 다소 까다로운 자바스크립트보다 배우기 쉽고 직관적인 jQuery를 더 선호하는 개발자가 양산되기도 했다.

![](/assets/fs-images/2-3.png)
{: .w-450}

jQuery
{: .desc-img}

## 3.3. V8 자바스크립트 엔진

구글 맵스를 통해 웹 애플리케이션 프로그래밍 언어로서의 가능성이 확인된 자바스크립트로 웹 애플리케이션을 구축하려는 시도가 늘면서 더욱 빠르게 동작하는 자바스크립트 엔진의 필요성이 대두되었다. 2008년 등장한 구글의 **[V8 자바스크립트 엔진](https://v8.dev)**은 이러한 요구에 부합하는 빠른 성능을 보여주었다. V8 자바스크립트 엔진의 등장으로 자바스크립트는 데스크톱 애플리케이션과 유사한 사용자 경험(UX; user experience)을 제공할 수 있는 웹 애플리케이션 프로그래밍 언어로 정착하게 되었다.

V8 자바스크립트 엔진으로 촉발된 자바스크립트의 발전으로 과거 웹 서버에서 수행되던 로직들이 대거 클라이언트(브라우저)로 이동했고, 이는 웹 애플리케이션 개발에서 프런트엔드 영역이 주목받는 계기로 작용했다.

![](/assets/fs-images/2-4.png)
{: .w-450}

V8 자바스크립트 엔진
{: .desc-img}

## 3.4. Node.js

2009년 라이언 달(Ryan Dahl)이 발표한 [Node.js](https://nodejs.org)는 구글 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임 환경(runtime environment)이다.

![](/assets/fs-images/2-5.png)
{: .w-450}

Node.js
{: .desc-img}

Node.js는 브라우저의 자바스크립트 엔진에서만 동작하던 자바스크립트를 브라우저 이외의 환경에서도 동작할 수 있도록 자바스크립트 엔진을 브라우저에서 독립시킨 자바스크립트 실행 환경이다. Node.js는 다양한 플랫폼에 적용할 수 있지만 서버 사이드 애플리케이션 개발에 주로 사용되며, 이에 필요한 모듈, 파일 시스템, HTTP 등 빌트인(built-in, 내장) API를 제공한다.

Node.js는 자바스크립트 엔진을 기반으로 하므로 Node.js 환경에서 동작하는 애플리케이션은 자바스크립트를 사용해 개발한다. 프런트엔드와 백엔드 영역에서 자바스크립트를 사용할 수 있다는 동형성(isomorphic)은 별도의 언어를 학습하기 위한 시간을 덜 수 있다는 장점이 있다.

Node.js는 **비동기 I/O**를 지원하며 **단일 스레드(single thread) 이벤트 루프** 기반으로 동작함으로써 요청(request) 처리 성능이 좋다. 따라서 Node.js는 데이터를 실시간으로 처리하기 위해 I/O가 빈번하게 발생하는 SPA(Single Page Application)에 적합하다. 하지만 CPU 사용률이 높은 애플리케이션에는 권장하지 않는다.

Node.js의 등장으로 자바스크립트는 브라우저를 벗어나 서버 사이드 애플리케이션 개발에서도 사용할 수 있는 범용 프로그래밍 언어가 되었다. 브라우저에서만 동작하는 반쪽짜리 프로그래밍 언어 취급을 받던 자바스크립트는 이제 프런트엔드 영역은 물론 백엔드 영역까지 아우르는 웹 프로그래밍 언어의 표준으로 자리 잡고 있다.

이제 자바스크립트는 **[크로스 플랫폼](https://ko.wikipedia.org/wiki/크로스_플랫폼)**을 위한 가장 중요한 언어로 주목받고 있다. 자바스크립트는 웹은 물론 모바일 하이브리드 앱([PhoneGap](http://phonegap.com), [Ionic](https://ionicframework.com)), 서버 사이드([Node.js](https://nodejs.org)), 데스크톱([Electron](https://electronjs.org)), 머신러닝([TensorFlow.js](https://js.tensorflow.org)), 로보틱스([Johnny-Five](http://johnny-five.io)) 환경을 위한 프로그래밍 언어로서 세계에서 가장 인기있는 프로그래밍 언어이다.

![](/assets/fs-images/2-6.png)
{: .w-450}

[Stack Overflow의 개발자 설문 결과](https://insights.stackoverflow.com/survey/2019#most-popular-technologies)
{: .desc-img}

## 3.5. SPA 프레임워크

모던 웹 애플리케이션은 데스크톱 애플리케이션과 비교해도 손색없는 성능과 사용자 경험을 제공하는 것이 필수가 되었고, 더불어 개발 규모와 복잡도도 상승했다.

이전의 개발 방식으로는 복잡해진 개발 과정을 수행하기 어려워졌고, 이러한 필요에 따라 많은 패턴과 라이브러리가 출현했다. 그 덕분에 개발에 많은 도움을 주었지만 변경에 유연하면서 확장하기 쉬운 애플리케이션 아키텍처의 구축을 어렵게 했고, 필연적으로 프레임워크가 등장하게 되었다.

이러한 요구에 발맞춰 [CBD(Component based development) 방법론](https://ko.wikipedia.org/wiki/컴포넌트_기반_소프트웨어_공학)을 기반으로 하는 SPA(Single Page Application)가 대중화되면서 [Angular](https://angular.io), [React](https://facebook.github.io/react), [Vue.js](https://vuejs.org), [Svelte](https://svelte.dev) 등 다양한 SPA 프레임워크/라이브러리 또한 많은 사용층을 확보하고 있다.

# 4. 자바스크립트와 ECMAScript

ECMAScript는 자바스크립트의 표준 사양인 ECMA-262를 말하며, 프로그래밍 언어의 값, 타입, 객체와 프로퍼티, 함수, 표준 빌트인 객체(standard built-in object) 등 핵심 문법을 규정한다. 각 브라우저 제조사는 ECMAScript 사양을 준수해서 브라우저에 내장되는 자바스크립트 엔진을 구현한다.

자바스크립트는 일반적으로 프로그래밍 언어로서 기본 뼈대(core)를 이루는 ECMAScript와 브라우저가 별도 지원하는 **[클라이언트 사이드 Web API](https://developer.mozilla.org/ko/docs/Web/API)**, 즉 DOM, BOM, Canvas, XMLHttpRequest, Fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web worker 등을 아우르는 개념이다.

![](/assets/fs-images/2-7.png)
{: .w-250}

자바스크립트는 일반적으로 ECMAScript를 아우르는 개념이다.
{: .desc-img}

클라이언트 사이드 Web API는 ECMAScript와는 별도로 [월드 와이드 웹 콘소시엄(World Wide Web Consortium; W3C)](https://www.w3.org)에서 별도의 사양으로 관리하고 있다. 클라이언트 사이드 Web API의 자세한 내용은 MDN web docs의 [Web API](https://developer.mozilla.org/ko/docs/Web/API) 페이지를 참고하기 바란다.

# 5. 자바스크립트의 특징

자바스크립트는 HTML, CSS와 함께 웹을 구성하는 요소 중 하나로 **웹 브라우저에서 동작하는 유일한 프로그래밍 언어**다. 다른 프로그래밍 언어와 마찬가지로 자바스크립트는 기존의 프로그래밍 언어에서 많은 영향을 받았다. 기본 문법은 C, 자바(Java)와 유사하고 셀프(Self)에서는 프로토타입 기반 상속을, 스킴(Scheme)에서는 일급 함수의 개념을 차용했다.

자바스크립트는 개발자가 별도의 컴파일 작업을 수행하지 않는 **[인터프리터 언어(interpreter language)](https://ko.wikipedia.org/wiki/인터프리터)**다. 대부분의 모던 자바스크립트 엔진(크롬의 V8, 파이어폭스의 SpiderMonkey, 사파리의 JavaScriptCore, 마이크로소프트 엣지의 Chakra 등)은 인터프리터와 컴파일러의 장점을 결합해 비교적 처리 속도가 느린 인터프리터의 단점을 해결했다. 인터프리터는 소스코드를 즉시 실행하고 컴파일러는 빠르게 동작하는 머신 코드를 생성하고 최적화한다. 이를 통해 컴파일 단계에서 추가적인 시간이 필요함에도 더욱 빠르게 코드를 실행할 수 있다.

인터프리터 언어 vs. 컴파일러 언어
: 자바스크립트는 일반적으로 [인터프리터 언어](https://ko.wikipedia.org/wiki/인터프리터)로 구분한다. 전통적인 컴파일러 언어와 인터프리터 언어를 비교하면 다음과 같다.<br>

| 컴파일러 언어                   | 인터프리터 언어
|:-----------------------------|:--------------------------------------------
| 코드가 실행되기 전 단계인 컴파일 타임에 소스코드 전체를 한번에 [머신 코드](https://ko.wikipedia.org/wiki/기계어)(CPU가 바로 실행할 수 있는 기계어)로 변환한 후 실행한다. | 코드가 실행되는 단계인 런타임에 문 단위로 한 줄씩 중간 코드(intermediate code)인 [바이트코드](https://ko.wikipedia.org/wiki/바이트코드)(특정한 하드웨어가 아니라 가상 머신에서 실행하도록 만든 바이너리 코드)로 변환한 후 실행한다.
| 실행 파일을 생성한다. | 실행 파일을 생성하지 않는다.
| 컴파일 단계와 실행 단계가 분리되어 있다. 명시적인 컴파일 단계를 거치고, 명시적으로 실행 파일을 실행한다. 	| 인터프리트 단계와 실행 단계가 분리되어 있지 않다. 인터프리터는 한 줄씩 바이트코드로 변환하고 즉시 실행한다.
| 실행에 앞서 컴파일은 단 한번 수행된다. | 코드가 실행될 때마다 인터프리트 과정이 반복 수행된다.
| 컴파일과 실행 단계가 분리되어 있으므로 코드 실행 속도가 빠르다. | 인터프리트 단계와 실행 단계가 분리되어 있지 않고 반복 수행되므로 코드 실행 속도가 비교적 느리다.

하지만 대부분의 모던 브라우저에서 사용되는 인터프리터는 전통적인 [컴파일러 언어](https://ko.wikipedia.org/wiki/컴파일러)처럼 명시적인 컴파일 단계를 거치지는 않지만 복잡한 과정을 거치며 일부 소스코드를 컴파일하고 실행한다.

이를 통해 인터프리터 언어의 장점인 동적 기능 지원을 살리면서 실행 속도가 느리다는 단점을 극복한다. 따라서 현재는 컴파일러와 인터프리터의 기술적 구분이 점차 모호해져 가는 추세다. 하지만 자바스크립트는 런타임에 컴파일되며 실행 파일이 생성되지 않고 인터프리터의 도움 없이 실행할 수 없기 때문에 컴파일러 언어라고 할 수는 없다.

자바스크립트는 [명령형(imperative)](https://ko.wikipedia.org/wiki/명령형_프로그래밍), [함수형(functional)](https://ko.wikipedia.org/wiki/함수형_프로그래밍), [프로토타입 기반(prototype-based) 객체지향 프로그래밍](https://ko.wikipedia.org/wiki/프로토타입_기반_프로그래밍)을 지원하는 **[멀티 패러다임 프로그래밍 언어](https://ko.wikipedia.org/wiki/다중_패러다임_프로그래밍_언어)**다.

비록 다른 객체지향 언어와의 차이점에 대한 논쟁들이 있긴 하지만, 자바스크립트는 강력한 객체지향 프로그래밍 능력을 지니고 있다. 간혹 클래스(ES6에서 도입됨), 상속, 정보 은닉을 위한 키워드 private가 없어서 객체지향 언어가 아니라고 오해([자바스크립트는 가장 많은 오해를 받는 언어이다.](http://javascript.crockford.com/javascript.html))하는 경우도 있지만 자바스크립트는 클래스 기반 객체지향 언어보다 효율적이면서 강력한 **프로토타입 기반의 객체지향 언어**다.

# 6.	ES6 브라우저 지원 현황

인터넷 익스플로러를 제외한 대부분의 모던 브라우저는 ES6를 지원하고 있지만 100% 지원하고 있지는 않다. Node.js는 v4부터 ES6를 지원하기 시작했다. ES6 지원 현황은 다음 웹 사이트에서 확인할 수 있다.

![](/assets/fs-images/2-8.png)
{: .w-450}

[ECMAScript 지원 현황](https://kangax.github.io/compat-table/es6)
{: .desc-img}

인터넷 익스플로러를 제외한 모던 브라우저의 ES6 지원 비율은 96~99%로 거의 100%에 육박하지만 인터넷 익스플로러나 구형 브라우저는 ES6를 대부분 지원하지 않는다.

따라서 브라우저에서 아직 지원하지 않는 최신 기능을 사용하거나 인터넷 익스플로러나 구형 브라우저를 고려해야 하는 상황이라면 [바벨(Babel)](https://babeljs.io) 과 같은 트랜스파일러를 사용해 ES6 이상의 사양으로 구현한 소스코드를 ES5 이하의 사양으로 버전으로 다운그레이드할 필요가 있다. 이에 대해서는 ["49. Babel과 Webpack을 이용한 ES6+/ES.NEXT 개발 환경 구축"](/fastcampus/es6-environment)에서 자세히 살펴볼 것이다.
