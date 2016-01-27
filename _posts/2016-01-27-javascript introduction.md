---
layout: post
title: Javascript Introduction
---

* Javascript는 HTML, CSS와 함께 웹을 구성하는 요소중  하나로 웹브라우저에서 사용할 수 있는 유일한 언어이다.

* JavaScript는 멀티-패러다임 언어로 명령형 (imperative), 함수형 (functional), 프로토타입 기반 (prototype-based) 객체지향형 언어다.

* 비록 다른 객체지향적인 언어들과의 차이점에 대한 논쟁들이 있긴 하지만, JavaScript는 강력한 객체지향 프로그래밍 능력들을 지니고 있다. ~~간혹 클래스가 없어서 객체지향이 아니라고 생각하는 사람들도 있으나 프로토타입 객체지향 방식의 객체지향 언어다.~~

* Javascript는 웹은 물론 모바일 하이브리드 앱(PhoneGap or Appcelerator), 서버 사이드([NodeJS](https://nodejs.org/) or Wakanda), Desk-top(NW.js, Electron, AppJS), 로봇 제어(nodebot or nodruino) 언어로서 세계에서 가장 인기있는 언어이다. ([가장 많은 오해를 받는 언어이기도 하다](http://javascript.crockford.com/javascript.html))

* 1995년 Brendan Eich(Nescape)이 Navigator 2를 위하여 웹페이지에 포함되는 스크립트 언어로서 개발되었다.

* Web browser 내에서만 동작하며 DOM(Document Object Model)을 제어함으로써 정적인 웹페이지에 역동성을 부여하기 위한 목적으로 만들어졌다.

* 구글의 V8 Javascript Engine을 기초로 한 Node.js 환경을 통해 이제는 웹 브라우저를 벗어난 환경에서도 개발이 가능해졌고 이로 인해 다양한 프레임워크 및 도구들까지 생겨나면서 그간 웹 브라우저에서만 동작하는 반쪽짜리 언어 취급을 받던 자바스크립트가 이제는 완벽한 Full stack 개발 언어로 생태계를 구축해나가고 있음은 물론 크로스 플랫폼을 위한 모바일 웹/앱 개발 분야에서도 주목받고 있다.

* 최근에는 SPA(Single Page Application) 웹 앱이 대중화되면서 [AngularJS](https://www.angularjs.org/), [Backbone.js](http://backbonejs.org/), [Ember.js](http://emberjs.com/) 등 다양한 SPA Framework와 안정적 성능과 뛰어난 편의성을 가진 [JQuery](https://jquery.com/)와 같은 라이브러리 또한 많은 사용층을 확보하고 있다.

* Javascript는 C-family languag로 C, Java에서 많은 문법을 차용했으며 Awk, Perl, Python으로부터도 영향을 받았다.

* Javascript는 Interpreter language이기 때문에 compile이 필요없어 HTML파일 안에 직접 기술이 가능하다.

* ECMAScript Version <sup id="a1">[`[1]`](#f1)</sup>
  * ECMAScript 3 : [ECMA-262 3rd edition](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf) (1999.12)  
  가장 범용적으로 지원되는 버전이다.
  * ECMAScript 5 : [ECMA-262 5th edition](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262%205th%20edition%20December%202009.pdf) (2009.12)  
  HTML5와 함께 출현한 표준안이다. 인터넷 익스플로러 9이상이나 그 외 브라우저에서만 작동한다.
  * ECMAScript 6 : [ECMA-262 6th edition](http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf.) (2015.06)  
  Symbol type, let keyword, module system, Arrow Function, class 등이 추가되었다. <sup id="a2">[`[2]`](#f2)</sup>

#Hello World

{% highlight html linenos %}
<!DOCTYPE html>
<html>
<body>
  <h1>My Web Page</h1>
  <p id="demo">A Paragraph</p>
  <button type="button" onclick="myFunction()">Try it</button>
  <script>
    function myFunction() {
      var myParagraph = document.getElementById("demo");
      myParagraph.innerHTML = "Hello world!";
    }
  </script>
</body>
</html>
{% endhighlight %}

Javascript는 interactive한 웹페이지 작성을 가능하게 한다. 즉, 웹 브라우저가 웹페이지를 로드한 후 그 내용을 변경할 수 있다.
예를 들면, Contents에 접근하여 수정할 수 있으며 이벤트(e.g. 버튼 클릭, 웹페이지 로딩 완료 등)에 반응하여 특정 스크립트를 실행할 수 있다.

#External JavaScript
{% highlight html linenos %}
<!DOCTYPE html>
<html>
<body>
  <h1>My Web Page</h1>
  <p id="demo">A Paragraph</p>
  <button type="button" onclick="myFunction()">Try it</button>
  <script src="extern.js"></script>
</body>
</html>
{% endhighlight %}

{% highlight javascript linenos %}
function myFunction() {
  var myParagraph = document.getElementById("demo");
  myParagraph.innerHTML = "Hello world!";
}
{% endhighlight %}

HTML에서 javascript가 실행될 때 이하와 같은 동작을 할 것이다.
1. 브라우저가 script 요소를 만나면, 문서의 렌더링을 잠시 중단하고
2. 브라우저는 src 속성에 정의된 자바스크립트 파일을 로드한다.
3. 스크립트를 실행한 뒤 다음 작업을 진행한다.

`<body>`요소의 가장 아래에 스크립트를 위치시키는 것은 좋은 아이디어이다.
HTML 요소들이 스크립트 로딩 지연으로 인해 렌더링에 지장 받는 일이 발생하지 않아 페이지 로딩 시간이 단축된다.

#JavaScript Output
Javascript에서 data를 표시하는 방법은 아래와 같다.
| Type            | Code             |
| --------------- | ---------------- |
| alert box       | window.alert()   |
| HTML output     | document.write() |
| HTML element    | innerHTML        |
| Browser console | console.log()    |

{% highlight html linenos %}
<!DOCTYPE html>
<html>
<body>
  <h1>My First Web Page</h1>
  <p id="demo"></p>

  <script>
    window.alert("alert");
    document.write("document.write");
    document.getElementById("demo").innerHTML = "innerHTML";
    console.log("console.log");
  </script>
</body>
</html>
{% endhighlight %}
***  

<b id="f1">1.</b> [ECMAScript Version](https://developer.mozilla.org/ko/docs/Web/JavaScript/%EC%96%B8%EC%96%B4_%EB%A6%AC%EC%86%8C%EC%8A%A4) [↩](#a1)  
<b id="f2">2.</b> [ECMAScript 6 New Features: Overview & Comparison](http://es6-features.org) [↩](#a2)
