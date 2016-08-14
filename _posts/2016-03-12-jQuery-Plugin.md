---
layout: post
title: jQuery Plugin
categories: jQuery
---

* TOC
{:toc}

우선 jQuery의 동작 원리에 대해 간단히 알아보자.

$ 함수는 jQuery 객체를 반환한다. jQuery 객체는 css()와 같은 jQuery 메서드를 사용할 수 있다.

pure javascript에서 built object의 메서드가 prototype에 담겨있는 것과 같이 jQuery 객체의 메서드들은 jQuery 객체의 prototype인 **$.fn** 에 담겨 있다.

```javascript
$.fn.greenify = function() {
  this.css( "color", "green" );
};

$("a").greenify(); // Makes all the links green.
```

![jquery.fn.png](/img/jquery-fn.png)
{: style="max-width:500px; margin: 10px auto;"}


# Reference

* [jQuery API: Ajax](http://api.jquery.com/category/ajax/)
