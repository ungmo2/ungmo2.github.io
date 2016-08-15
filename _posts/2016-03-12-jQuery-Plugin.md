---
layout: post
title: jQuery Plugin
categories: jQuery
---

* TOC
{:toc}

jQuery plugin이란 custom jQuery 메서드로서 jQuery를 확장한 것을 말한다. jQuery plugin을 정의하기 위해서는 **$.fn** object에 custom 메서드를 추가하여 확장한다.

우선 jQuery의 동작 원리에 대해 간단히 알아보자.

$ 함수는 jQuery 객체를 반환한다. jQuery 객체는 css()와 같은 jQuery 메서드를 사용할 수 있다.

pure javascript에서 built object의 메서드가 prototype에 담겨있는 것과 같이 jQuery 객체의 메서드들은 jQuery 객체의 prototype인 **$.fn** 에 담겨 있다.

다음은 jQuery source code 초기 부분의 일부 발췌이다.

```
var jQuery = function( selector, context ) {
  return new jQuery.fn.init( selector, context );
}

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  // ...
}
```

이것을 그림으로 나타내면 아래와 같다.

![jQuery.fn](/img/jquery-fn.png)
{: style="max-width:500px; margin: 10px auto;"}

**$.fn** 를 사용하여 간단한 plugin을 정의해 보자.

```javascript
$.fn.greenify = function() {
  this.css("color", "green");
};

$("a").greenify(); // Makes all the links green.
```

위 코드내의 [this](http://ungmo2.github.io/javascript/Javascript-this/#method-invocation-pattern)는 greenify 메서드를 호출한 객체($("a"))에 바인딩된다. greenify 메서드를 호출한 객체는 언제나 jQuery 객체이므로 $(this)를 사용할 필요가 없다.

Query() 함수에 의해 생성된 객체를 Matched set 또는 jQuery selection이라 한다. 이 객체에는 선택한 요소에 대한 참조가 저장되어 있다. jQuery가 제공하는 프로퍼티와 메서드는 prototype 객체를 통해 접근할 수 있다.

위 코드는 잘 작동하지만 chaining(jQuery 함수에 의해 생성된 Matched set에 jQuery 메서드를 끝없이 연결하여 호출할 수 있게 하는 기법)을 지원하지 않고 있다.

chaining을 지원하기 위해 this를 return한다.

```javascript
$.fn.greenify = function() {
  this.css( "color", "green" );
  return this;
}

$("a").greenify().addClass("greenified");
```

$ 변수는 jQuery 뿐만 아니라 javascript library에서 자주 사용된다. jQuery와 다른 라이브러리를 함께 사용하는 경우, 중복이 발생하여 문제가 될 수 있으므로 IIEF를 사용하여 plugin 전체를 wrap하고 jQuery 것이 필요하다. 또한 이 방법은 전역 namespace의 오염를 방지할 수 있기 때문에 매우 유용하다.

```javascript
(function ($) {

  var shade = "#556b2f"; // Local variable

  $.fn.greenify = function() {
    this.css("color", shade);
    return this;
  };

}(jQuery));
```

이번에는 plugin option 기능을 추가한다.

$.extend(object1, object2)는 object1에 object2를 merge한다.

```javascript
(function ($) {

  $.fn.greenify = function( options ) {

    // This is the easiest way to have default options.
    var settings = $.extend({
      // These are the defaults.
      color: "#556b2f",
      backgroundColor: "white"
    }, options );

    // Greenify the collection based on the settings variable.
    return this.css({
      color: settings.color,
      backgroundColor: settings.backgroundColor
    });
  };

}(jQuery));

$( "div" ).greenify({
  color: "orange"
});
```

# Reference

* [How to Create a Basic Plugin](https://learn.jquery.com/plugins/basic-plugin-creation/)
