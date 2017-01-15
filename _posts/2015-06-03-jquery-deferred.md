---
layout: post
title: jQuery <strong>Deferred Object</strong>
subtitle: Promise를 위한 jQuery Deferred Object
categories: jquery
section: jquery
description: Promise를 위한 jQuery Deferred Object
---

* TOC
{:toc}

![promise](./img/promise.jpg)

# 1. Promise

[콜백함수](./js-function#callback-function)를 사용한 비동기식 처리 모델은 JavaScript에서 빈번히 사용된다. 비동기식 처리 모델이란 처리가 종료하면 호출될 함수(콜백함수)를 미리 parameter로 전달하고 처리가 종료하면 콜백함수를 호출하는 것이다.

```javascript
asyncFunc(param, function(result) {
  /*
  처리가 종료하면 호출될 콜백함수
  result에 처리 결과가 전달된다
  */
});
```

- [동기식 처리 모델(Synchronous processing model) vs 비동기식 처리 모델(Asynchronous processing model)](./jquery-ajax-json#vs-)

비동기 처리 모델은 요청을 병렬로 처리하여 다른 요청이 blocking(작업 중단)되는 것을 막아주는 장점이 있지만 단점도 가지고 있는데 그것은 여러개의 콜백함수가 nesting되어 복잡도가 높아지는 <strong>Callback Hell</strong>이다.

![callback hell](./img/callback-hell.png)

Callback Hell
{: .desc-img}

<!-- ```javascript
step1(function(value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        step5(value4, function(value5) {
            // Do something with value5
        });
      });
    });
  });
});
``` -->

Callback Hell은 코드의 가독성이 나쁘게 하여 이해하기 어렵고 에러 처리가 어려우며 실수를 유발시킬 확률이 높다. 이러한 문제를 극복하기 위해 [Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)가 제안되었다. (ES6의 [Generator](http://wiki.ecmascript.org/doku.php?id=harmony:generators)를 사용하여 Callback Hell 문제를 없애는 방법도 있다.) Promise는 [ES6](./js-es6)에 정식 채택되어 2017년 1월 현재 IE를 제외한 대부분의 브라우저가 지원하고 있다.

Promise는 비동기 처리가 성공(fulfilled)하였는지 또는 실패(rejected)하였는지 등의 상태 정보와 처리 종료 후 실행될 콜백함수(then())담고 있는 객체이다.

```javascript
//Promise 선언
function asyncFunc(param) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() { // 비동기 함수
      param ? resolve("resolved!") : reject(new Error("Error occurred!"));
    }, 2000);
  });
};

//Promise 실행
asyncFunc(true)
  .then(function(data) {
    // resolve가 실행된 경우(성공), resolve 함수에 전달된 값이 data에 저장된다
    console.log(data);
  }).catch(function(error) {
    // reject가 실행된 경우(실패), reject 함수에 전달된 값이 error에 저장된다
    console.error(error);
  });
```

# 2. jQuery Deferred Object

jQuery Deferred는 각각의 비동기식 처리에 Promise 객체를 연계하여 그 상태를 전파하는 것으로 promise를 구현한 jQuery 객체이다. 브라우저 호환성과 편의성을 고려하여 만든 Promise 모듈이라고 생각하면 무리가 없을 듯하다.

jQuery Deferred에서 각각의 비동기식 처리를 Deferred 객체로 wrapping한다. Deferred 객체는 상태를 가지고 있는데 이는 비동기식 처리의 상태가 변경되는 시점에 특정 함수(resolve(), reject())를 호출하여 Deferred 객체에 상태를 부여하기 때문이다. [deferred.state()](https://api.jquery.com/deferred.state/)로 상태를 확인할 수 있다.

Deferred object state (Deferred.state()의 반환값)  
: 1. pending  : 처리 중
  2. resolved : 처리 성공
  3. rejected : 처리 실패

일반적인 처리 순서는 아래와 같다.

1. $.Deferred()로 Deferred 객체 생성
  <img src="./img/promise-1.png" style="width:250px;"/>
2. 비동기 처리가 종료하면 Deferred 객체의 resolve() 또는 reject()로 Deferred 객체의 state를 변경
  <img src="./img/promise-2.png" style="width:450px;"/>
3. promise()로 Deferred 객체가 가지고 있는 Promise 객체를 반환한다. 반환된 객체는 Deferred 객체의 resolve()와 reject()를 더이상 사용할 수 없게 되어 비동기 처리 상태를 보장할 수 있게 된다.
  <img src="./img/promise-3.png" style="width:450px;"/>

```javascript
//Promise 선언
var _deferred = function(param) {
  var dfd = $.Deferred();  // 1

  // 비동기 처리
  setTimeout(function() {
    // 2
    param ? dfd.resolve("resolved!") : dfd.reject(new Error("Error occurred!"));
  }, 2000);

  return dfd.promise();  // 3
};

//Promise 실행
_deferred(false)
  .done(function(data) {
    // resolve가 실행된 경우(성공), resolve 함수에 전달된 값이 data에 저장된다
    console.log(data);
  })
  .fail(function(error) {
    // reject가 실행된 경우(실패), reject 함수에 전달된 값이 error에 저장된다
    console.error(error);
  })
  .always(function() {
    console.log('always');
  });
```

Deferred 객체를 사용하여 1초 간격으로 0에서 2까지 카운트하는 함수를 작성하여 보자. 먼저 Deferred 객체를 사용하지 않았을 때의 경우이다.

```javascript
console.log(0);
setTimeout(function(){
  console.log(1);
  setTimeout(function(){
    console.log(2);
  }, 1000);
}, 1000);
```

다른 방법으로 카운트하는 기능을 작성할 수도 있겠지만 Promise의 유용성을 강조하기 위해 비동기 함수 setTimeout()을 사용하였다. 위 예제의 경우 다행히도 2까지 카운트이지만 만약 카운트 수가 늘어난다면 Pyramid of Doom은 더욱 깊어질 것이다.

이제 비동기 함수 setTimeout()를 jQuery Deferred에 대응시켜보자.

```javascript
function sleep(ms) {
  var dfd = $.Deferred();
  setTimeout(function(){
    dfd.resolve();
  }, ms);
  return dfd.promise();
}
```

sleep()를 사용하여 카운트 기능을 작성해 보자.

```javascript
console.log(0);
sleep(1000).then(function(){
  console.log(1);
  sleep(1000).then(function(){
    console.log(2);
  });
});
```

위와 같이 코드를 작성해서는 Callback Hell 문제에 도움이 되지 않는다. sleep()는 Deferred 객체 내부의 promise 객체를 반환하기 때문에 chaining이 가능하다.

```javascript
console.log(0);
sleep(1000)
  .then(function(){
    console.log(1);
    return sleep(1000);
  }).then(function(){
    console.log(2);
  });
```

Deferred 객체가 반환하는 promise 객체는 비동기 처리의 상태 정보와 성공했을 경우 실행될 콜백함수 `done()`와 실패했을 때 실행될 콜백함수 `fail()` 등을 담고 있다.

```javascript
sleep(1000)
  .done(function() {
    console.log('resolved');
  })
  .fail(function() {
    console.log('rejected');
  })
  .always(function() {
    console.log('always');
  });
```

Deferred 객체가 반환하는 promise 객체의 `then()`는 비동기 처리가 성공했을 때와 실패했을 때 실행되는 콜백함수를 한번에 기술할 수 있다. 첫번째 parameter에는 성공했을 때 실행할 콜백함수를, 두번째 parameter에는 실패했을 때 실행할 콜백함수를 등록한다. 두번째 parameter는 옵션으로 생략할 수 있다.

```javascript
sleep(1000)
  .then(function() {
      /* resolved */
      console.log('resolved');
    }, function(e){
      /* rejected */
      console.log('rejected');
    }
  );
```

`$.when()`을 사용하면 연속된 복수의 비동기 처리를 병렬로 처리할 수 있다.

```javascript
$.when($.ajax('/example1'), $.ajax('/example2') )
  .done(function( example1Result, example2Result ) {
    // Do something with example1Result, example2Result
  })
  .fail(function() {
    console.log('rejected');
  });
```

병렬 처리 대상 Promise가 모두 성공하면 $.when은 resolved Promise를 반환하고 하나라도 실패하면 rejected Promise를 반환한다.

jQuery의 ajax 관련 함수들은 native XMLHttpRequest 객체의 superset인 jQuery XMLHttpRequest(jqXHR) 객체를 반환하는데 이 객체는 Deferred 객체와 유사하게 동작한다.

```javascript
var jqxhr = $.ajax("/example")
  .done(function() {
    alert("success");
  })
  .fail(function() {
    alert("error");
  })
  .always(function() {
    alert("complete");
  });

// 다른 작업 수행

jqxhr.always(function() {
  alert("second complete");
});  
```

# Reference

* [jQuery Deferred Object](http://api.jquery.com/category/deferred-object/)
