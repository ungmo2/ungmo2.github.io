---
layout: post
title: jQuery <strong>Basics</strong>
subtitle: Write less, Do more.
categories: jquery
section: jquery
description: jQuery의 설치 Basic Usage DOM Ready Selector Traversing Manipulation  Appending Removing Event
---

* TOC
{:toc}

![jquery logo](/img/jquery-logo.png)

# 1. Introduction

[jQuery](http://jquery.com/)는 빠르고 다양한 기능을 제공하는 경량의 자바스크립트 라이브러리이다. HTML 문서의 탐색이나 조작, 이벤트 핸들링, 애니메이션, Ajax등을 멀티 브라우저를 지원하는 API를 통해 더욱 간편하게 사용할 수 있다.

- 어떠한 브라우저에서도 동일하게 동작한다. 이것은 브라우저 호환성을 고려하여 대체 코드(Polyfill)를 작성할 필요가 없다는 것을 의미한다.

- [네이티브 DOM API](./js-dom)(DOM Query, Traversing, Manipulation 등)보다 직관적인 API를 제공한다. CSS 스타일의 selector를 사용할 수 있으며 조작 또한 간편하며 직관적이다.

<!-- - CSS 스타일의 selector를 이용하여 요소를 선택할 수 있다. 이것은 [자바스크립트 DOM 쿼리](./js-dom#dom-query--traversing--)보다 쉽고 강력하며 유연하다.

- 자바스크립트의 getElementsByClassName 메서드 등을 사용하여 복수의 요소를 선택한 후 각각의 요소에 개별적으로 접근하기 위해서는 반복문을 사용하여야 한다. 이때 getElementsByClassName 메서드가 반환하는 [HTMLCollection](./js-dom#dom-query-1)은 실시간으로 Node의 상태 변경을 반영하기 때문에 경우에 따라(예를 들어 클래스명이 변경될 때) 반복문을 역방향으로 돌리는 등 번거로운 처리가 필요하다. jQuery는 반복문 없이 해당하는 모든 요소를 선택/조작할 수 있다. 이를 묵시적 반복(implicit iteration)이라 한다. -->

- Animation 효과, 이벤트 처리를 쉽게 사용할 수 있다.

- 다양한 플러그인이 존재하며 다른 라이브러리들과 충돌을 일으키지 않는다.

# 2. jQuery의 설치

[jquery.com](http://jquery.com/download/)에서 jQuery를 다운로드한다.

jQuery 1.x과 jQuery 2.x 두가지 버전이 존재한다. 두가지 버전 모두 동일한 API을 제공하지만 jQuery 2.x는 IE 8 이하를 지원하지 않으므로 주의가 필요하다.

2016년 6월 9일 [jQuery 3.0이 릴리스](http://blog.jquery.com/2016/06/09/jquery-3-0-final-released/)되었다. jQuery 1.x는 jQuery Compat 3.0, jQuery 2.x는 jQuery 3.0으로 계승되어 두가지 버전 모두 jQuery 3.0으로 통일되었다.
{: .info}

동작 확인을 위해 간단한 예제를 만들어 보자. h1 요소의 텍스트를 변경하고 싶은 경우이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>jQuery</title>
  </head>
  <body>
    <h1>Where do you want to go?</h1>
    <p>Plan your next adventure.</p>
  </body>
</html>
```

모든 브라우저는 HTML 문서를 로드할 때 [DOM(문서 객체 모델: Document Object Model)](./js-dom)을 생성한다. DOM은 HTML과 XML 문서를 위한 API로 웹페이지의 각 요소에 접근하고 수정하는 방법을 제시한다. DOM은 객체의 트리로 구성되는데 이러한 구조를 <strong>DOM tree</strong>라 한다.

위 HTML이 로드되어 생성된 DOM tree는 다음과 같은 이미지를 갖는다. HTML 요소는 DOM tree내에서 <strong>node</strong>로 불린다.

![DOM tree.png](/img/jq_dom_tree.png)

이렇게 생성된 DOM tree를 기반으로 브라우저는 viewport에 그 내용을 렌더링하게 된다. 따라서 DOM이 변경되면 브라우저를 통해 사용자가 보게 될 Content 또한 변경된다.

DOM을 수정하기 위해서는, 좀 더 구체적으로 말해 기존 HTML 상의 요소를 동적으로 변경하기 위해서는 우선 대상 요소를 <strong>선택(Select)</strong>하여야 한다.

```javascript
var elem = document.getElementsByTagName('h1')[0];
```

대상 요소가 선택되었으면 요소의 텍스트를 변경해 보자.

```javascript
elem.textContent = 'Hello';
```

만약 h1 요소가 3개라면 어떻게 될까? 위 코드라면 첫번째 h1 요소의 텍스트만 변경된다. 모든 h1 요소의 텍스트를 일괄 변경하기 위해서는 반복문을 사용하여야 한다.

```javascript
var elem = document.getElementsByTagName('h1');
for (var i=0; i<elem.length; i++) {
  elem[i].textContent = 'Hello';
}
```

위 코드를 jQuery로 작성해 보자.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>jQuery</title>
  </head>
  <body>
    <h1>Where do you want to go?</h1>
    <p>Plan your next adventure.</p>
  <script src="http://code.jquery.com/jquery.min.js"></script>
  <script src="app.js"></script>
  </body>
</html>
```

```javascript
// app.js
$('h1').text('Hello');
```

app.js는 jQuery를 사용하므로 app.js 로드 이전에 jQuery가 로드되어야 한다. jQuery는 body 요소의 마지막 부분 또는 head 요소 내에서 로드하는 것이 일반적인데 이것은 DOM이 완전히 생성되기 이전에 자바스크립트가 로드될 가능성을 내포한다. DOM이 완전히 생성되기 이전에 자바스크립트가 실행되면 예기치 못한 현상이 발생할 수 있다.

# 3. jQuery 함수

jQuery를 사용하기 위해서는 먼저 jQuery 객체를 생성하여야 한다. 생성된 jQuery 객체는 다양한 메서드를 가지는데 jQuery를 학습한다고 하는 것은 대체로 이 메서드를 사용하는 방법을 익히는 것이다.

jQuery 객체를 생성하기 위해서는 jQuery 함수를 사용한다.

```javascript
jQuery()
```

jQuery() 함수를 축약형(Shorthand)으로 기술하면 다음과 같다.

```javascript
$()
```

jQuery() 함수는 전달되는 인수의 종류에 따라 조금 다른 움직임을 하지만 결국 **jQuery 객체를 반환한다.**

인수의 종류에 따라 jQuery() 함수가 어떻게 동작하는지 살펴보도록 하자.


## 3.1 CSS 스타일의 selector를 인수로 전달받을 때

jQuery는 CSS 스타일의 selector를 이용하여 요소를 선택할 수 있다.

다음은 h1 요소를 선택하는 예이다.

```javascript
jQuery('h1');
```

jQuery() 함수의 인수로 CSS의 태그 선택자를 지정하였다. 이때 **jQuery() 함수는 jQuery 객체를 반환한다.** jQuery() 함수를 축약형(Shorthand)으로 기술하면 다음과 같다.

```javascript
$('h1');
```

jQuery() 함수에 의해 생성된 객체를 <strong>Matched set 또는 jQuery selection</strong>이라 한다. 이 객체에는 선택한 요소에 대한 참조가 저장되어 있는데 선택된 요소는 1개일수도 있지만 여러개일 수도 있다. jQuery가 제공하는 프로퍼티와 메서드는 prototype 객체를 통해 접근할 수 있다.

```javascript
$('h1').text();
```

text() 메서드는 jQuery 객체가 제공하는 메서드로 해당 요소(Matched set)의 텍스트를 반환한다. 해당 요소의 텍스트를 변경하는 방법은 아래와 같다.

```javascript
$('h1').text('Hello!');
```

## 3.2 HTML을 인수로 전달받을 때

HTML 문자열을 인수로 받으면 새로운 요소를 생성한다.

```javascript
$('<p id="test">My <em>new</em> text</p>').appendTo('body');
```

## 3.3 JavaScript 객체를 인수로 전달받을 때

JavaScript 객체(요소, 일반 객체, 매치드셋 등)를 인수로 받으면 그 객체를 jQuery 객체로 wrap한 객체를 반환한다.

```javascript
$("div.foo").click(function() {
  $(this).slideUp();
});
```

```javascript
// Define a plain object
var foo = { foo: "bar", hello: "world" };

// Pass it to the jQuery function
var $foo = $( foo );

// Test accessing property values
var test1 = $foo.prop( "foo" ); // bar

// Test setting property values
$foo.prop( "foo", "foobar" );

var test2 = $foo.prop( "foo" ); // foobar
```

## 3.4 콜백함수를 인수로 전달받을 때

다음 코드를 살펴보자.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>jQuery</title>
  </head>
  <body>
    <h1>Where do you want to go?</h1>
    <p>Plan your next adventure.</p>
    <script src="js/jquery-1.12.4.js"></script>
    <script src="js/app.js"></script>
  </body>
</html>
```

```javascript
// js/app.js
$('h1').text('Hello');
```

app.js는 jQuery를 사용하므로 app.js 로드 이전에 jQuery가 로드되어야 한다. jQuery는 body 요소의 마지막 부분 또는 head 요소 내에서 로드하는 것이 일반적인데 이것은 DOM이 완전히 생성되기 이전에 자바스크립트가 로드될 가능성을 내포한다. DOM이 완전히 생성되기 이전에 자바스크립트가 실행되면 예기치 못한 현상이 발생될 수 있다.

따라서 안전하게 DOM을 조작하기 위해서는 DOM이 완전히 로드된 후 자바스크립트가 실행되는 것이 바람직한데 이를 위해 이벤트 처리가 필요하다.

```javascript
jQuery(document).ready(function(){
  // Do something...
});

// Shorthand for jQuery(document).ready()
$(document).ready(function() {
  // Do something...
});

// Shorthand for $(document).ready()
$(function() {
  // Do something...
});
```

위 코드는 DOM이 완전히 로드되기 전까지 대기하다가 로드가 완료되면 매개변수로 전달된 [콜백함수](./js-function#callback-function)가 실행된다. app.js에 이것을 반영하면 아래와 같다.

```javascript
// js/app.js
$(function() {
  $('h1').text('Where to?');
});
```

부가적으로 위 방법은 function-level scope를 지원하는 자바스크립트의 특성에 부합한다. 즉 전역 변수의 생성이 억제되어 스크립트 간의 전역 변수 이름의 충돌을 미연에 방지할 수 있다.

# 4. Selector

jQuery는 [CSS 스타일의 Selector](./css3-selector)를 이용하여 요소를 선택할 수 있다. 이것은 [자바스크립트 DOM 쿼리](./js-dom#dom-query--traversing--)보다 쉽고 강력하며 유연하다.

## 4.1 태그 / ID / Class 선택자

자바스크립트의 getElementsByClassName 메서드 등을 사용하여 선택한 요소들에 개별적으로 접근하기 위해서는 반복문을 사용하여야 한다.

이때 getElementsByClassName 메서드가 반환하는 [HTMLCollection](./js-dom#dom-query-1)이 실시간으로 Node의 상태 변경을 반영하기 때문에 경우에 따라(예를 들어 클래스명이 변경될 때) 반복문을 역방향으로 돌리는 등 번거로운 처리가 필요하다. jQuery는 반복문 없이 해당하는 모든 요소에 접근/조작할 수 있다.

이를 <strong>묵시적 반복(implicit iteration)</strong>이라 한다.

여러개의 요소를 선택하여 본다. 아래의 li 요소 3개를 선택한다.

```html
<h1>Where do you want to go?</h1>
<h2>Travel Destinations</h2>
<p>Plan your next adventure.</p>
<ul id='destinations'>
  <li>Rome</li>
  <li>Paris</li>
  <li class='promo'>Rio</li>
</ul>
```

```javascript
$('li');
```

CSS 스타일의 Tag Selector를 사용하여 li 요소 3개를 선택하였다. 이 요소들의 텍스트를 일괄 변경한다.

```javascript
$('li').text('Orlando');
```

Pure Javascript API를 사용하여 위의 기능을 작성하면 아래와 같다.

```javascript
var targets = document.getElementsByTagName("li");
for(var i=0; i<targets.length; i++){
  //Set text
  targets[i].firstChild.nodeValue = 'Orlando';
}
```

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Where do you want to go?</h1>
    <h2>Travel Destinations</h2>
    <p>Plan your next adventure.</p>
    <ul id="destinations">
      <li>Rome</li>
      <li>Paris</li>
      <li class="promo">Rio</li>
    </ul>
    <script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
    <script>
      $(function(){
        $('li').text('Orlando');
      });
    </script>
  </body>
</html>
```

<div class='result'></div>

Tag Selector뿐만이 아니라 ID Selector, Class Selector도 물론 사용할 수 있다.

```javascript
// CSS Tag Selector: li {...}
$('li');

// CSS ID Selector: #container {...}
$('#container');

// CSS Class Selector: .articles {...}
$('.articles');
```

## 4.2 후손 선택자 (Descendant Selector)

자신의 1 level 상위에 속하는 요소를 부모 요소, 1 level 하위에 속하는 요소를 자식 요소라고 한다. 자신보다 n level 하위에 속하는 요소는 후손 요소(하위 요소)라 한다. 후손 요소는 자손 요소를 포함하는 개념이다.

id가 destinations인 ul 요소의 후손을 모두 선택한다.

```html
<h1>Where do you want to go?</h1>
<h2>Travel Destinations</h2>
<p>Plan your next adventure.</p>
<ul id="destinations">
  <li>Rome</li>
  <li>Paris</li>
  <li class='promo'>Rio</li>
</ul>
```

```javascript
$('#destinations li');
```

## 4.3 자손 선택자 (Child Selector)

```html
<h1>Where do you want to go?</h1>
<h2>Travel Destinations</h2>
<p>Plan your next adventure.</p>
<ul id="destinations">
  <li>Rome</li>
  <li>
    <ul id="france">
      <li>Paris</li>
    </ul>
  </li>
  <li class='promo'>Rio</li>
</ul>
```

```javascript
$('#destinations li');
```

위 예제에서 후손 선택자로 li 요소를 선택하면 ul 요소의 후손 중에 모든 li 요소가 선택된다.

자손 선택자를 사용하여 ul 요소의 자손 중에 li 요소를 선택한다.

```javascript
$('#destinations > li');
```

## 4.4 복합 선택자 (Multiple Selector)

```html
<h1>Where do you want to go?</h1>
<h2>Travel Destinations</h2>
<p>Plan your next adventure.</p>
<ul id="destinations">
  <li>Rome</li>
  <li>
    <ul id="france">
      <li>Paris</li>
    </ul>
  </li>
  <li class='promo'>Rio</li>
</ul>
```

```javascript
$('.promo, #france');
```

## 4.5 가상 클래스 선택자 (Pseudo-Class Selector)

```html
<h1>Where do you want to go?</h1>
<h2>Travel Destinations</h2>
<p>Plan your next adventure.</p>
<ul id="destinations">
  <li>Rome</li>
  <li>Paris</li>
  <li class='promo'>Rio</li>
</ul>
```

```javascript
$('#destinations li:first');
$('#destinations li:last');
$('#destinations li:odd');
$('#destinations li:even');
```

![Pseudo-Class Selector](/img/jq_Pseudo_Class_Selector.png)

이외에도 다양한 요소 선택 방법이 있다. 자세한 내용은 [jQuery Selectors](http://api.jquery.com/category/selectors/)를 참조하기 바란다.


Basics
:  
- [*](https://api.jquery.com/all-selector/)
- [.class](https://api.jquery.com/class-selector/)
- [element](https://api.jquery.com/element-selector/)
- [#id](https://api.jquery.com/id-selector/)
- [selector1, selectorN, ...](https://api.jquery.com/multiple-selector/)

Hierarchy
:  
- [parent &gt; child](https://api.jquery.com/child-selector/)
- [ancestor descendant](https://api.jquery.com/descendant-selector/)
- [prev + next](https://api.jquery.com/next-adjacent-Selector/)
- [prev ~ siblings](https://api.jquery.com/next-siblings-selector/)

Basic Filters
:  
- [:animated](https://api.jquery.com/animated-selector/)
- [:eq()](https://api.jquery.com/eq-selector/)
- [:even](https://api.jquery.com/even-selector/)
- [:first](https://api.jquery.com/first-selector/)
- [:gt()](https://api.jquery.com/gt-selector/)
- [:header](https://api.jquery.com/header-selector/)
- [:lang()](https://api.jquery.com/lang-selector/)
- [:last](https://api.jquery.com/last-selector/)
- [:lt()](https://api.jquery.com/lt-selector/)
- [:not()](https://api.jquery.com/not-selector/)
- [:odd](https://api.jquery.com/odd-selector/)
- [:root](https://api.jquery.com/root-selector/)
- [:target](https://api.jquery.com/target-selector/)

Content Filters
:  
- [:contains()](https://api.jquery.com/contains-selector/)
- [:empty](https://api.jquery.com/empty-selector/)
- [:has()](https://api.jquery.com/has-selector/)
- [:parent](https://api.jquery.com/parent-selector/)

Visibility Filters
:  
- [:hidden](https://api.jquery.com/hidden-selector/)
- [:visible](https://api.jquery.com/visible-selector/)

Attribute
:  
- [[name\|="value"]](https://api.jquery.com/attribute-contains-prefix-selector/)
- [[name*="value"]](https://api.jquery.com/attribute-contains-selector/)
- [[name~="value"]](https://api.jquery.com/attribute-contains-word-selector/)
- [[name$="value"]](https://api.jquery.com/attribute-ends-with-selector/)
- [[name="value"]](https://api.jquery.com/attribute-equals-selector/)
- [[name!="value"]](https://api.jquery.com/attribute-not-equal-selector/)
- [[name^="value"]](https://api.jquery.com/attribute-starts-with-selector/)
- [[name]](https://api.jquery.com/has-attribute-selector/)
- [[name="value"][name2="value2"]](https://api.jquery.com/multiple-attribute-selector/)

Child Filters
:  
- [:first-child](https://api.jquery.com/first-child-selector/)
- [:first-of-type](https://api.jquery.com/first-of-type-selector/)
- [:last-child](https://api.jquery.com/last-child-selector/)
- [:last-of-type](https://api.jquery.com/last-of-type-selector/)
- [:nth-child()](https://api.jquery.com/nth-child-selector/)
- [:nth-last-child()](https://api.jquery.com/nth-last-child-selector/)
- [:nth-last-of-type()](https://api.jquery.com/nth-last-of-type-selector/)
- [:nth-of-type()](https://api.jquery.com/nth-of-type-selector/)
- [:only-child](https://api.jquery.com/only-child-selector/)
- [:only-of-type()](https://api.jquery.com/only-of-type-selector/)

Forms
:  
- [:button](https://api.jquery.com/button-selector/)
- [:checkbox](https://api.jquery.com/checkbox-selector/)
- [:checked](https://api.jquery.com/checked-selector/)
- [:disabled](https://api.jquery.com/disabled-selector/)
- [:enabled](https://api.jquery.com/enabled-selector/)
- [:focus](https://api.jquery.com/focus-selector/)
- [:file](https://api.jquery.com/file-selector/)
- [:image](https://api.jquery.com/image-selector/)
- [:input](https://api.jquery.com/input-selector/)
- [:password](https://api.jquery.com/password-selector/)
- [:radio](https://api.jquery.com/radio-selector/)
- [:reset](https://api.jquery.com/reset-selector/)
- [:selected](https://api.jquery.com/selected-selector/)
- [:submit](https://api.jquery.com/submit-selector/)
- [:text](https://api.jquery.com/text-selector/)


# 5. Traversing

Selector를 사용하여 matched set을 생성한 이후, matched set의 요소들과 관련있는 다른 요소에 접근할 수 있다. 이를 DOM 탐색(DOM Traversing)이라 한다.

```html
<h1>Where do you want to go?</h1>
<h2>Travel Destinations</h2>
<p>Plan your next adventure.</p>
<ul id="destinations">
  <li>Rome</li>
  <li>Paris</li>
  <li class='promo'>Rio</li>
</ul>
```

```javascript
$("#destinations li");         // Descendant Selector
$("#destinations").find("li"); // Traversing
```

위 두 코드는 결과적으로 ul 요소의 후손 중 li 요소를 선택한다. 그러나 Traversing은 선택자 방식보다 더 빠르다.

![traversing](/img/jq_traversing.png)
{: .w-400}

Traversing의 예를 들어보자.

![traversing](/img/jq_traversing2.png)

Traversing 관련 메서드는 [jQuery Traversing](http://api.jquery.com/category/traversing/)을 참조하기 바란다.

Filtering
:  
- [.eq()](https://api.jquery.com/eq/)
- [.filter()](https://api.jquery.com/filter/)
- [.first()](https://api.jquery.com/first/)
- [.has()](https://api.jquery.com/has/)
- [.is()](https://api.jquery.com/is/)
- [.last()](https://api.jquery.com/last/)
- [.map()](https://api.jquery.com/map/)
- [.not()](https://api.jquery.com/not/)
- [.slice()](https://api.jquery.com/slice/)

Miscellaneous Traversing
:  
- [.add()](https://api.jquery.com/add/)
- [.addBack()](https://api.jquery.com/addBack/)
- [.andSelf()](https://api.jquery.com/andSelf/)
- [.contents()](https://api.jquery.com/contents/)
- [.each()](https://api.jquery.com/each/)
- [.end()](https://api.jquery.com/end/)

Tree Traversal
:  
- [.children()](https://api.jquery.com/children/)
- [.closest()](https://api.jquery.com/closest/)
- [.find()](https://api.jquery.com/find/)
- [.next()](https://api.jquery.com/next/)
- [.nextAll()](https://api.jquery.com/nextAll/)
- [.nextUntil()](https://api.jquery.com/nextUntil/)
- [.parent()](https://api.jquery.com/parent/)
- [.parents()](https://api.jquery.com/parents/)
- [.parentsUntil()](https://api.jquery.com/parentsUntil/)
- [.prev()](https://api.jquery.com/prev/)
- [.prevAll()](https://api.jquery.com/prevAll/)
- [.prevUntil()](https://api.jquery.com/prevUntil/)
- [.siblings()](https://api.jquery.com/siblings/)


# 6. Manipulation

DOM에 새로운 요소를 추가/삭제, 복사, 속성 변경 등을 실시할 수 있다. 이를 DOM 조작(DOM Manipulation)이라 한다.

## 6.1. Appending

```html
<li class="vacation">
  <h2>Hawaiian Vacation</h2>
  <button>Get Price</button>
</li>
```

위의 HTML에 의해 생성된 DOM에 새로운 요소를 추가한다. 우선 jQuery 함수를 사용하여 추가할 요소를 생성한다.

```javascript
$(function() {
  var price = $('<p>From $399.99</p>');
});
```

추가할 요소를 생성하였으면 DOM에 컨텐츠를 Insert하여야 한다. 이때 사용할 수 있는 메서드는 4가지이다.

- append(<element>) : 선택 요소의 닫는 태그 앞에 컨텐츠를 삽입한다.

- prepend(<element>) : 선택 요소의 여는 태그 뒤에 컨텐츠를 삽입한다.

- after(<element>) : 선택 요소의 뒤에 컨텐츠를 삽입한다.

- before(<element>) : 선택 요소의 앞에 컨텐츠를 삽입한다.

![Appending](/img/jq_Appending.png)

```javascript
$(function() {
  var price = $('<p>From $399.99</p>');
  $('.vacation').append(price);
});
```

## 6.2. Removing

요소의 제거는 remove() 메서드를 사용한다.

```javascript
$(function() {
  var price = $('<p>From $399.99</p>');
  $('.vacation').append(price);
  $('button').remove();
});
```

Manipulation 관련 메서드는 [jQuery Manipulation](https://api.jquery.com/category/manipulation/)을 참조하기 바란다.

Copying
:  
- [.clone()](https://api.jquery.com/clone/)

DOM Insertion, Around
:  
- [.wrap()](https://api.jquery.com/wrap/)
- [.wrapAll()](https://api.jquery.com/wrapAll/)
- [.wrapInner()](https://api.jquery.com/wrapInner/)

DOM Insertion, Inside
:  
- [.append()](https://api.jquery.com/append/)
- [.appendTo()](https://api.jquery.com/appendTo/)
- [.html()](https://api.jquery.com/html/)
- [.prepend()](https://api.jquery.com/prepend/)
- [.prependTo()](https://api.jquery.com/prependTo/)
- [.text()](https://api.jquery.com/text/)

DOM Insertion, Outside
:  
- [.after()](https://api.jquery.com/after/)
- [.before()](https://api.jquery.com/before/)
- [.insertAfter()](https://api.jquery.com/insertAfter/)
- [.insertBefore()](https://api.jquery.com/insertBefore/)

DOM Removal
:  
- [.detach()](https://api.jquery.com/detach/)
- [.empty()](https://api.jquery.com/empty/)
- [.remove()](https://api.jquery.com/remove/)
- [.unwrap()](https://api.jquery.com/unwrap/)

DOM Replacement
:  
- [.replaceAll()](https://api.jquery.com/replaceAll/)
- [.replaceWith()](https://api.jquery.com/replaceWith/)

# 7. CSS / Attributes

CSS와 요소의 속성에 관련된 메서드는 다음을 참조하기 바란다.

Attributes
:  
- [.attr()](https://api.jquery.com/attr/)
- [.prop()](https://api.jquery.com/prop/)
- [.removeAttr()](https://api.jquery.com/removeAttr/)
- [.removeProp()](https://api.jquery.com/removeProp/)
- [.val()](https://api.jquery.com/val/)

CSS
:  
- [.addClass()](https://api.jquery.com/addClass/)
- [.css()](https://api.jquery.com/css/)
- [jQuery.cssHooks](https://api.jquery.com/jQuery.cssHooks/)
- [jQuery.cssNumber](https://api.jquery.com/jQuery.cssNumber/)
- [jQuery.escapeSelector()](https://api.jquery.com/jQuery.escapeSelector/)
- [.hasClass()](https://api.jquery.com/hasClass/)
- [.removeClass()](https://api.jquery.com/removeClass/)
- [.toggleClass()](https://api.jquery.com/toggleClass/)

Dimensions
:  
- [.height()](https://api.jquery.com/height/)
- [.innerHeight()](https://api.jquery.com/innerHeight/)
- [.innerWidth()](https://api.jquery.com/innerWidth/)
- [.outerHeight()](https://api.jquery.com/outerHeight/)
- [.outerWidth()](https://api.jquery.com/outerWidth/)
- [.width()](https://api.jquery.com/width/)

Offset
:  
- [.offset()](https://api.jquery.com/offset/)
- [.offsetParent()](https://api.jquery.com/offsetParent/)
- [.position()](https://api.jquery.com/position/)
- [.scrollLeft()](https://api.jquery.com/scrollLeft/)
- [.scrollTop()](https://api.jquery.com/scrollTop/)

Data
:  
- [jQuery.data()](https://api.jquery.com/jQuery.data/)
- [.data()](https://api.jquery.com/data/)
- [jQuery.hasData()](https://api.jquery.com/jQuery.hasData/)
- [jQuery.removeData()](https://api.jquery.com/jQuery.removeData/)
- [.removeData()](https://api.jquery.com/removeData/)

# 8. Event

매치드셋에 이벤트를 바인딩하고 해당 이벤트가 발생했을 때 실행될 콜백 함수를 지정한다.

```javascript
.on( events [, selector ] [, data ], handler )
```

| Parameter | Description
|:----------|:------------------------------------
| events    | 1개 또는 2개 이상의 공백으로 구분된 이벤트명
| selector  | 이벤트를 바인딩할 매치드셋의 후손 선택자
| data      | 이벤트핸들러에 전달할 데이터. 이벤트핸들러의 매개변수 event.data에 담겨 전달된다.
| handler   | 이벤트가 발생했을 때 실행될 함수. 첫번째 인자로 이벤트 객체가 암묵적으로 전달된다.

```javascript
$(function() {
  $('button').on('click', function() {
    var price = $('<p>From $399.99</p>');
    $('.vacation').append(price);
    $('button').remove();
  });
});
```

위 코드는 제대로 동작한다. 하지만 버튼 요소가 여러개 있을 경우, 모든 버튼 요소가 제거된다.

```html
<li class="vacation">
  <h2>Hawaiian Vacation</h2>
  <button>Get Price</button>
</li>
<li class="vacation">
  <h2>Orlando</h2>
  <button>Get Price</button>
</li>
```

```javascript
$(function() {
  $('button').on('click', function() {
    var price = $('<p>From $399.99</p>');
    $('.vacation').append(price);
    $('button').remove();
  });
});
```

이벤트를 발생시킨 버튼만을 제거하도록 수정한다. 이때 jQuery 함수를 사용하여 this를 jQuery 객체화하여야 한다.

$(this)는 $(event.target)과 같다.

```javascript
$(function() {
  $('button').on('click', function() {
    var price = $('<p>From $399.99</p>');
    $('.vacation').append(price);
    $(this).remove();
  });
});
```

이벤트를 발생 시킨 버튼만을 제거할 수 있도록 수정되었으나 가격은 아직도 정상적으로 동작하지 않는다. 이벤트를 발생 시킨 버튼이 제거된 이후 그곳에만 가격이 표시되도록 수정한다.

```javascript
$(function() {
  $('button').on('click', function() {
    var price = $('<p>From $399.99</p>');
    $(this).after(price);
    $(this).remove();
  });
});
```

만일 버튼 요소와 가격을 나타내는 p 요소가 동일한 부모의 자식이고 버튼이 클릭되었을 때 부모 요소가 삭제되는 경우라면 위 방법은 적절하지 않다.

가격을 나타내는 p 요소를 버튼 요소와는 별도로 li 요소의 자식으로 추가하는 것이 안전하다.

```javascript
$(function() {
  $('button').on('click', function() {
    var price = $('<p>From $399.99</p>');
    $(this).closest('.vacation').append(price);
    $(this).remove();
  });
});
```

closest() 메서드는 매치드셋과 가장 근접한 상위 요소를 반환한다.

Event 관련 메서드는 [jQuery Event](https://api.jquery.com/category/events/)을 참조하기 바란다.

Browser Events
:  
- [.error()](https://api.jquery.com/error/)
- [.resize()](https://api.jquery.com/resize/)
- [.scroll()](https://api.jquery.com/scroll/)

Document Loading
:  
- [.load()](https://api.jquery.com/load-event/)
- [.ready()](https://api.jquery.com/ready/)
- [.unload()](https://api.jquery.com/unload/)

Event Handler Attachment
:  
- [.bind()](https://api.jquery.com/bind/)
- [.delegate()](https://api.jquery.com/delegate/)
- [.die()](https://api.jquery.com/die/)
- [.live()](https://api.jquery.com/live/)
- [.off()](https://api.jquery.com/off/)
- [.on()](https://api.jquery.com/on/)
- [.one()](https://api.jquery.com/one/)
- [.trigger()](https://api.jquery.com/trigger/)
- [.triggerHandler()](https://api.jquery.com/triggerHandler/)
- [.unbind()](https://api.jquery.com/unbind/)
- [.undelegate()](https://api.jquery.com/undelegate/)

Form Events
:  
- [.blur()](https://api.jquery.com/blur/)
- [.change()](https://api.jquery.com/change/)
- [.focus()](https://api.jquery.com/focus/)
- [.focusin()](https://api.jquery.com/focusin/)
- [.focusout()](https://api.jquery.com/focusout/)
- [.select()](https://api.jquery.com/select/)
- [.submit()](https://api.jquery.com/submit/)

Keyboard Events
:  
- [.keydown()](https://api.jquery.com/keydown/)
- [.keypress()](https://api.jquery.com/keypress/)
- [.keyup()](https://api.jquery.com/keyup/)

Mouse Events
:  
- [.click()](https://api.jquery.com/click/)
- [.contextMenu()](https://api.jquery.com/contextmenu/)
- [.dblclick()](https://api.jquery.com/dblclick/)
- [.hover()](https://api.jquery.com/hover/)
- [.mousedown()](https://api.jquery.com/mousedown/)
- [.mouseenter()](https://api.jquery.com/mouseenter/)
- [.mouseleave()](https://api.jquery.com/mouseleave/)
- [.mousemove()](https://api.jquery.com/mousemove/)
- [.mouseout()](https://api.jquery.com/mouseout/)
- [.mouseover()](https://api.jquery.com/mouseover/)
- [.mouseup()](https://api.jquery.com/mouseup/)
- [.toggle()](https://api.jquery.com/toggle-event/)

Event Object
:  
- [event.currentTarget](https://api.jquery.com/event.currentTarget/)
- [event.delegateTarget](https://api.jquery.com/event.delegateTarget/)
- [event.data](https://api.jquery.com/event.data/)
- [event.isDefaultPrevented()](https://api.jquery.com/event.isDefaultPrevented/)
- [event.isImmediatePropagationStopped()](https://api.jquery.com/event.isImmediatePropagationStopped/)
- [event.isPropagationStopped()](https://api.jquery.com/event.isPropagationStopped/)
- [event.metaKey](https://api.jquery.com/event.metaKey/)
- [event.namespace](https://api.jquery.com/event.namespace/)
- [event.pageX](https://api.jquery.com/event.pageX/)
- [event.pageY](https://api.jquery.com/event.pageY/)
- [event.preventDefault()](https://api.jquery.com/event.preventDefault/)
- [event.relatedTarget](https://api.jquery.com/event.relatedTarget/)
- [event.result](https://api.jquery.com/event.result/)
- [event.stopImmediatePropagation()](https://api.jquery.com/event.stopImmediatePropagation/)
- [event.stopPropagation()](https://api.jquery.com/event.stopPropagation/)
- [event.target](https://api.jquery.com/event.target/)
- [event.timeStamp](https://api.jquery.com/event.timeStamp/)
- [event.type](https://api.jquery.com/event.type/)
- [event.which](https://api.jquery.com/event.which/)

# Reference

* [jQuery API Document](http://api.jquery.com/)

* [try.jquery.com](http://try.jquery.com/)

* [jQuery Quick API Reference](https://oscarotero.com/jquery/)
