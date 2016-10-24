---
layout: post
title: jQuery <strong>Basics</strong>
subtitle: Write less, Do more.
categories: jquery
section: jquery
---

* TOC
{:toc}

![jquery logo](/img/jquery-logo.png)

# 1. Introduction

[jQuery](http://jquery.com/)는 빠르고 다양한 기능을 제공하는 경량의 자바스크립트 라이브러리이다. HTML 문서의 탐색이나 조작, 이벤트 핸들링, 애니메이션, Ajax등을 멀티 브라우저를 지원하는 API를 통해 더욱 간편하게 사용할 수 있다.

- 어떠한 브라우저에서도 동일하게 동작한다. 이것은 브라우저 호환성을 고려하여 대체 코드를 작성할 필요가 없다는 것을 의미한다.

- CSS 스타일의 selector를 이용하여 요소를 선택할 수 있다. 이것은 [자바스크립트 DOM 쿼리](./js-dom.html#dom-query--traversing--)보다 쉽고 강력하며 유연하다.

- 자바스크립트 DOM query를 사용하여 여러개의 요소를 선택하기 위해서는 반복문을 사용하여야 한다. 이때 HTMLCollection이 실시간으로 Node의 상태 변경을 반영하기 때문에 반복문을 역방향으로 돌리는 등 번거로운 처리가 필요하다. jQuery는 반복문 없이 해당하는 모든 요소를 선택/조작할 수 있다. 이를 묵시적 반복(implicit iteration)이라 한다.

- DOM Manipulation(조작)과 Animation 효과, 이벤트 처리를 쉽게 사용할 수 있다.

다음 예제를 살펴보자. h1 요소의 텍스트를 변경하고 싶은 경우이다.

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

요소의 내용을 변경하기 위해서는 우선 대상 요소를 선택(Select)하여야 한다.

모든 브라우저는 HTML 문서를 로드할 때 [DOM](./js-dom.html)을 생성한다. DOM은 HTML과 XML 문서를 위한 API로 웹페이지의 각 요소에 접근하고 수정하는 방법을 제시한다.

DOM은 객체의 트리로 구성되는 <strong>DOM tree</strong>를 생성하고 이것을 통하여 HTML 문서 내의 각 요소에 접근 / 수정할 수 있는 메서드와 속성들을 제공한다. DOM이 수정되면 브라우저를 통해 사용자가 보게 될 Contents 또한 변경된다.

위 HTML이 로드되어 생성된 DOM tree는 다음과 같은 이미지를 갖는다. HTML 요소는 DOM tree내에서 <strong>node</strong>로 불린다.

![DOM tree.png](/img/jq_dom_tree.png)

DOM 접근 또는 조작하기 위해 브라우저는 Javascript API(Application Programming Interface)를 제공한다. 이 API는 브라우저 별로 다를 수 있는데 jQuery는 브라우저 호환성을 고려하여 설계되어 있어 사용자는 일관된 방법으로 DOM에 접근/조작할 수 있다.

# 2. jQuery의 설치

[jquery.com](http://jquery.com/download/)에서 jQuery를 다운로드한다.

jQuery 1.x과 jQuery 2.x 두가지 버전이 존재한다. 두가지 버전 모두 동일한 API을 제공하지만 jQuery 2.x는 IE 8 이하를 지원하지 않으므로 주의가 필요하다.

2016년 6월 9일 [jQuery 3.0이 릴리스](http://blog.jquery.com/2016/06/09/jquery-3-0-final-released/)되었다. jQuery 1.x는 jQuery Compat 3.0, jQuery 2.x는 jQuery 3.0으로 계승되어 두가지 버전 모두 jQuery 3.0으로 통일되었다.
{: .info}

# 3. Basic Usage

jQuery는 CSS 스타일의 selector를 이용하여 요소를 선택할 수 있다.

다음은 h1 요소를 선택하는 예이다.

```javascript
jQuery('h1');
```

jQuery() 함수를 사용하는데 인수로 (CSS-like) 태그 선택자를 지정하였다. 이때 **jQuery() 함수는 jQuery 객체를 반환한다.** jQuery() 함수를 축약형(Shorthand)으로 기술하면 다음과 같다.

```javascript
$('h1');
```

jQuery() 함수에 의해 생성된 객체를 <strong>Matched set 또는 jQuery selection</strong>이라 한다. 이 객체에는 선택한 요소에 대한 참조가 저장되어 있다. jQuery가 제공하는 프로퍼티와 메서드는 prototype 객체를 통해 접근할 수 있다.

```javascript
$('h1').text();
```

text() 메서드는 jQuery가 제공하는 메서드로 해당 요소의 텍스트를 반환한다. 해당 요소의 텍스트를 변경하는 방법은 아래와 같다.

```javascript
$('h1').text('Where to?');
```

# 4. DOM Ready

완성된 코드를 살펴보자.

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
$('h1').text('Where to?');
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

위 코드는 DOM이 완전히 로드되기 전까지 대기하다가 로드가 완료되면 매개변수로 전달된 함수가 실행된다. app.js에 이것을 반영하면 아래와 같다.

```javascript
// js/app.js
$(function() {
  $('h1').text('Where to?');
});
```

부가적으로 위 방법은 function-level scope를 지원하는 자바스크립트의 특성에 부합한다. 즉 전역 변수의 생성이 억제되어 스크립트 간의 전역 변수 이름의 충돌을 미연에 방지할 수 있다.

# 5. Selection

jQuery는 [CSS 스타일의 Selector](./css3-selector.html)를 이용하여 요소를 선택할 수 있다. 이것은 [자바스크립트 DOM 쿼리](./js-dom.html#dom-query--traversing--)보다 쉽고 강력하며 유연하다.

## 5.1 태그 / ID / Class 선택자

자바스크립트 DOM query를 사용하여 여러개의 요소를 선택하기 위해서는 반복문을 사용하여야 한다.

이때 [HTMLCollection](./js-dom.html#dom-query-1)이 실시간으로 Node의 상태 변경을 반영하기 때문에 반복문을 역방향으로 돌리는 등 번거로운 처리가 필요하다. jQuery는 반복문 없이 해당하는 모든 요소를 선택/조작할 수 있다.

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
for(i=0; targets.length; i++){
  //Set text
  one.firstChild.nodeValue = 'Orlando';
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

## 5.2 후손 선택자 (Descendant Selector)

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

## 5.3 자손 선택자 (Child Selector)

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

## 5.4 복합 선택자 (Multiple Selector)

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

## 5.5 가상 클래스 선택자 (Pseudo-Class Selector)

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

# 6. Traversing

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

# 7. Manipulation

DOM에 새로운 요소를 추가/삭제, 복사, 속성 변경 등을 실시할 수 있다. 이를 DOM 조작(DOM Manipulation)이라 한다.

## 7.1. Appending

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

## 7.2. Removing

요소의 제거는 remove() 메서드를 사용한다.

```javascript
$(function() {
  var price = $('<p>From $399.99</p>');
  $('.vacation').append(price);
  $('button').remove();
});
```

Manipulation 관련 메서드는 [jQuery Manipulation](https://api.jquery.com/category/manipulation/)을 참조하기 바란다.

# 8. Event

매치드셋에 이벤트를 바인딩하고 해당 이벤트가 발생했을 때 실행될 콜백 함수를 지정한다.

```javascript
.on( events [, selector ] [, data ], handler )
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

# Reference

* [jQuery API Document](http://api.jquery.com/)

* [try.jquery.com](http://try.jquery.com/)

* [jQuery Quick API Reference](https://oscarotero.com/jquery/)
