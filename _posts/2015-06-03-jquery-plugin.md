---
layout: post
title: jQuery <strong>Plugin</strong>
subtitle: jQuery의 확장
categories: jquery
section: jquery
---

jQuery plugin이란 custom jQuery 메서드로서 jQuery를 확장한 것을 말한다. jQuery plugin을 정의하기 위해서는 **$.fn** object에 custom 메서드를 추가하여 확장한다.

우선 jQuery의 동작 원리에 대해 간단히 알아보자.

$ 함수는 jQuery 객체를 반환한다. jQuery 객체는 css()와 같은 jQuery 메서드를 사용할 수 있다.

pure javascript에서 built-in object의 메서드가 prototype에 담겨있는 것과 같이 jQuery 객체의 메서드들은 jQuery 객체의 prototype인 <strong>$.fn</strong>에 담겨 있다.

다음은 jQuery source code 초기 부분의 일부 발췌이다.

```javascript
var jQuery = function( selector, context ) {
  return new jQuery.fn.init( selector, context );
}

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  /* ... */
}
```

이것을 그림으로 나타내면 아래와 같다.

![jQuery.fn](/img/jquery-fn.png)

**$.fn**를 사용하여 간단한 plugin을 정의해 보자.

```javascript
$.fn.greenify = function() {
  this.css("color", "green");
};

$("a").greenify(); // Makes all the links green.
```

위 코드내의 [this](./js-this.html#method-invocation-pattern)는 greenify 메서드를 호출한 객체 `$("a")`에 바인딩된다. greenify 메서드를 호출한 객체는 언제나 jQuery 객체이므로 `$(this)`를 사용할 필요가 없다.

주의할 것은 each(), append() 메서드 등의 callback 함수 내에서 사용된 this는 DOM 요소를 의미한다. 따라서 callback 함수 내에서 DOM 요소에 대해 jQuery 메서드를 사용하기 위해서는 this를 jQuery 객체화하여야 한다.

```javascript
(function($) {
  $.fn.showLinkLocation = function() {
    this.filter("a").each(function() {
      var link = $(this);
      link.append(" (" + link.attr("href") + ")");
    });

    return this;
  };
}(jQuery));

// Usage example:
$("a").showLinkLocation();
```

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

$ 변수는 jQuery 뿐만 아니라 javascript library에서 자주 사용된다. jQuery와 다른 라이브러리를 함께 사용하는 경우, 중복이 발생하여 문제가 될 수 있으므로 IIEF를 사용하여 plugin 전체를 wrap하고 jQuery 객체를 인자로 전달하는 것이 필요하다. 또한 이 방법은 전역 namespace의 오염를 방지할 수 있기 때문에 매우 유용하다.

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

# jQuery plugins

## Slider

### Nivo

Nivo Slider jQuery Plugin

[Demo & Download](http://docs.dev7studios.com/article/12-getting-started-with-the-nivo-slider-jquery-plugin)

### Flux-Slider

Hardware accelerated image transitions using CSS3.

[Demo](http://www.joelambert.co.uk/flux/)

[Download](http://www.joelambert.co.uk/flux/js/flux.js)

### Simple jQuery Slider

Simple jQuery CSS3 slider

[Demo](http://simpleslider.bitlabs.nl/)

[Download](https://github.com/dirkgroenen/simple-jQuery-slider)

### Unslider

image slider

[Demo & Download](http://unslider.com/)

## Parallax

## ScrollMagic

The jQuery plugin for magical scroll interactions.

[Demo & Download](http://scrollmagic.io/)

### Stellar.js

Parallax scrolling made easy.

[Demo & Download](http://markdalgleish.com/projects/stellar.js/)

### Parallax.js

Parallax.js is a dirt simple parallax scrolling effect inspired by Spotify.com and implemented as a jQuery plugin.

[Demo & Download](http://pixelcog.github.io/parallax.js/)

## Image gallery

### nanoGALLERY

[Demo](http://nanogallery.brisbois.fr/)

[Download](https://github.com/Kris-B/nanoGALLERY)

## Navigation

### Slinky

Sliding menu

[Demo](http://alizahid.github.io/slinky/)

[Download](https://github.com/alizahid/slinky)

## Input

### Typeahead.js

Autocomplete library

[Demo & Download](http://twitter.github.io/typeahead.js/)

### Chosen

Chosen is a jQuery plugin that makes long, unwieldy select boxes much more user-friendly.

[Demo & Download](https://harvesthq.github.io/chosen/)

### jQuery Knob

jQuery dial

[Demo](http://anthonyterrien.com/knob/)

[Download](https://github.com/aterrien/jQuery-Knob)


## Popup & Modal & Alert

### Magnific Popup

lightbox plugin for jQuery

[Demo](http://dimsemenov.com/plugins/magnific-popup/)

[Download](https://github.com/dimsemenov/Magnific-Popup)

### Avgrund Modal

[Demo & Download](http://labs.voronianski.com/jquery.avgrund.js/)

### ALERTIFY.js

browser dialogs

[Demo & Download](http://fabien-d.github.io/alertify.js/)

## Tooltip

### Tooltipster

Create semantic, modern tooltips

[Demo](http://iamceege.github.io/tooltipster/)

[Download](https://github.com/dimsemenov/Magnific-Popup)

## Scroll

### FSVS

simple fullscreen vertical slider using CSS3 transitions with jQuery fallback.

[Demo](http://luke.sno.wden.co.uk/full-screen-vertical-scroll)

[Download](https://github.com/lukesnowden/FSVS)

### Waypoints

Waypoints is the easiest way to trigger a function when you scroll to an element.

[Demo & Download](http://imakewebthings.com/waypoints/)

### Scroll Path

custom scroll paths

[Demo](http://joelb.me/scrollpath/)

[Download](https://github.com/JoelBesada/scrollpath)

## Animation

### TwentyTwenty

Material Design hierarchical display animation effect

[Demo](http://zavoloklom.github.io/material-design-hierarchical-display/)

[Download](https://github.com/zavoloklom/material-design-hierarchical-display)

## Typography

### Lettering.js

A jQuery plugin for radical web typography

[Demo](http://letteringjs.com/)

[Download](https://github.com/davatron5000/Lettering.js)

### FitText

A jQuery plugin for inflating web type

[Demo](http://fittextjs.com/)

[Download](https://github.com/davatron5000/FitText.js)

### Typed.js

jQuery Animated Typing

[Demo & Download](http://www.mattboldt.com/demos/typed-js/)

### Morphext

jQuery carousel plugin for text phrases.

[Demo & Download](http://morphext.fyianlai.com/)

# Reference

* [How to Create a Basic Plugin](https://learn.jquery.com/plugins/basic-plugin-creation/)
