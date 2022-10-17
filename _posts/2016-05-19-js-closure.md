---
layout: post
title: <strong>Closure</strong>
subtitle: 클로저
categories: javascript
section: javascript
seq: 5
subseq: 19
description: 클로저(closure)는 자바스크립트에서 중요한 개념 중 하나로 자바스크립트에 관심을 가지고 있다면 한번쯤은 들어보았을 내용이다. execution context에 대한 사전 지식이 있으면 이해하기 어렵지 않은 개념이다. 클로저는 자바스크립트 고유의 개념이 아니라 함수를 일급 객체로 취급하는 함수형 언어에서 사용되는 중요한 특성이다.
---

* TOC
{:toc}

# 1. 클로저(closure)의 개념

클로저(closure)는 자바스크립트에서 중요한 개념 중 하나로 자바스크립트에 관심을 가지고 있다면 한번쯤은 들어보았을 내용이다. [execution context](./js-execution-context)에 대한 사전 지식이 있으면 이해하기 어렵지 않은 개념이다. 클로저는 자바스크립트 고유의 개념이 아니라 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어(Functional Programming language: 얼랭(Erlnag), 스칼라(Scala), 하스켈(Haskell), 리스프(Lisp)...)에서 사용되는 중요한 특성이다.

클로저는 자바스크립트 고유의 개념이 아니므로 ECMAScript 명세에 클로저의 정의가 등장하지 않는다. 클로저에 대해 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)은 아래와 같이 정의하고 있다.

“A closure is the combination of a function and the lexical environment within which that function was declared.”<br>
클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.
{:.info}

무슨 의미인지 잘 와닿지 않는다. 위 정의에서 중요한 키워드는 "함수가 선언됐을 때의 렉시컬 환경(Lexical environment)"이다.

말이 무척이나 난해하니 우선 예제부터 살펴보자. "The Art of Computer Programming"의 저자 [도널드 커누스](https://ko.wikipedia.org/wiki/도널드_커누스)의 말처럼 우리 모두는 자신의 힘으로 발견한 내용을 가장 쉽게 익힌다.

```javascript
function outerFunc() {
  var x = 10;
  var innerFunc = function () { console.log(x); };
  innerFunc();
}

outerFunc(); // 10
```

함수 outerFunc 내에서 내부함수 innerFunc가 선언되고 호출되었다. 이때 내부함수 innerFunc는 자신을 포함하고 있는 외부함수 outerFunc의 변수 x에 접근할 수 있다. 이는 함수 innerFunc가 함수 outerFunc의 내부에 선언되었기 때문이다.

스코프는 함수를 호출할 때가 아니라 함수를 어디에 선언하였는지에 따라 결정된다. 이를 **[렉시컬 스코핑(Lexical scoping)](./js-scope#7-렉시컬-스코프)**라 한다. 위 예제의 함수 innerFunc는 함수 outerFunc의 내부에서 선언되었기 때문에 함수 innerFunc의 상위 스코프는 함수 outerFunc이다. 함수 innerFunc가 전역에 선언되었다면 함수 innerFunc의 상위 스코프는 전역 스코프가 된다.
{:.info}

함수 innerFunc가 함수 outerFunc의 내부에 선언된 내부함수이므로 함수 innerFunc는 자신이 속한 렉시컬 스코프(전역, 함수 outerFunc, 자신의 스코프)를 참조할 수 있다. 이것을 [실행 컨텍스트](./js-execution-context)의 관점에서 설명해보자.

내부함수 innerFunc가 호출되면 자신의 실행 컨텍스트가 실행 컨텍스트 스택에 쌓이고 변수 객체(Variable Object)와 스코프 체인(Scope chain) 그리고 this에 바인딩할 객체가 결정된다. 이때 스코프 체인은 전역 스코프를 가리키는 전역 객체와 함수 outerFunc의 스코프를 가리키는 함수 outerFunc의 활성 객체(Activation object) 그리고 함수 자신의 스코프를 가리키는 활성 객체를 순차적으로 바인딩한다. 스코프 체인이 바인딩한 객체가 바로 렉시컬 스코프의 실체이다.

내부함수 innerFunc가 자신을 포함하고 있는 외부함수 outerFunc의 변수 x에 접근할 수 있는 것, 다시 말해 상위 스코프에 접근할 수 있는 것은 렉시컬 스코프의 레퍼런스를 차례대로 저장하고 있는 실행 컨텍스트의 <strong>스코프 체인</strong>을 자바스크립트 엔진이 검색하였기에 가능한 것이다. 좀더 자세히 설명하면 아래와 같다.

1. innerFunc 함수 스코프(함수 자신의 스코프를 가리키는 활성 객체) 내에서 변수 x를 검색한다. 검색이 실패하였다.
2. innerFunc 함수를 포함하는 외부 함수 outerFunc의 스코프(함수 outerFunc의 스코프를 가리키는 함수 outerFunc의 활성 객체)에서 변수 x를 검색한다. 검색이 성공하였다.

이번에는 내부함수 innerFunc를 함수 outerFunc 내에서 호출하는 것이 아니라 반환하도록 변경해 보자.

```javascript
function outerFunc() {
  var x = 10;
  var innerFunc = function () { console.log(x); };
  return innerFunc;
}

/**
 *  함수 outerFunc를 호출하면 내부 함수 innerFunc가 반환된다.
 *  그리고 함수 outerFunc의 실행 컨텍스트는 소멸한다.
 */
var inner = outerFunc();
inner(); // 10
```

함수 outerFunc는 내부함수 innerFunc를 반환하고 생을 마감했다. 즉, 함수 outerFunc는 실행된 이후 콜스택(실행 컨텍스트 스택)에서 제거되었으므로 함수 outerFunc의 변수 x 또한 더이상 유효하지 않게 되어 변수 x에 접근할 수 있는 방법은 달리 없어 보인다. 그러나 위 코드의 실행 결과는 변수 x의 값인 10이다. 이미 life-cycle이 종료되어 실행 컨텍스트 스택에서 제거된 함수 outerFunc의 지역변수 x가 다시 부활이라도 한 듯이 동작하고 있다. 뭔가 특별한 일이 일어나고 있는 것 같다.

이처럼 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근할 수 있는데 이러한 함수를 클로저(Closure)라고 부른다.

다시 MDN의 정의로 돌아가 보자.

“A closure is the combination of a function and the lexical environment within which that function was declared.”<br>
클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.
{:.info}

위 정의에서 말하는 "함수"란 반환된 내부함수를 의미하고 "그 함수가 선언될 때의 렉시컬 환경(Lexical environment)"란 내부 함수가 선언됐을 때의 스코프를 의미한다. 즉, **클로저는 반환된 내부함수가 자신이 선언됐을 때의 환경(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수**를 말한다. 이를 조금 더 간단히 말하면 **클로저는 자신이 생성될 때의 환경(Lexical environment)을 기억하는 함수다**라고 말할 수 있겠다.

<!-- 위 예제는 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우인데 이때 내부함수가 외부함수의 지역 변수에 접근할 수 있고, 외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 못하고 상태가 유지되며 내부함수에 의해서 소멸하게 되는 기능을 클로저(Closure)라고 부른다. 다시 말해, 반환된 내부함수가 자신의 렉시컬 스코프를 기억하여 렉시컬 스코프 밖에서 호출될 때에도 스코프에 접근할 수 있게 하는 기능이 클로저이다. -->

클로저에 의해 참조되는 외부함수의 변수 즉 outerFunc 함수의 변수 x를 <strong>자유변수(Free variable)</strong>라고 부른다. 클로저라는 이름은 자유변수에 함수가 닫혀있다(closed)라는 의미로 의역하면 자유변수에 엮여있는 함수라는 뜻이다.

[실행 컨텍스트](./js-execution-context)의 관점에 설명하면, 내부함수가 유효한 상태에서 외부함수가 종료하여 외부함수의 실행 컨텍스트가 반환되어도, 외부함수 실행 컨텍스트 내의 <strong>활성 객체(Activation object)</strong>(변수, 함수 선언 등의 정보를 가지고 있다)는 **내부함수에 의해 참조되는 한 유효**하여 내부함수가 <strong>스코프 체인</strong>을 통해 참조할 수 있는 것을 의미한다.

즉 외부함수가 이미 반환되었어도 외부함수 내의 변수는 이를 필요로 하는 내부함수가 하나 이상 존재하는 경우 계속 유지된다. 이때 내부함수가 외부함수에 있는 변수의 복사본이 아니라 실제 변수에 접근한다는 것에 주의하여야 한다.

이를 그림으로 표현하면 아래와 같다.

![closure](/img/closure.png)

실행 컨텍스트의 활성 객체(Activation object)와 클로저
{: .desc-img}

# 2. 클로저의 활용

클로저는 자신이 생성될 때의 환경(Lexical environment)을 기억해야 하므로 메모리 차원에서 손해를 볼 수 있다.<!-- 무분별한 클로저의 사용은 득보다는 실이 많다. 클로저를 사용하여야 할 장면에서 사용해야 하는데 사실 이것은 경험이 필요하다. --> 하지만 클로저는 자바스크립트의 강력한 기능으로 이를 적극적으로 사용해야 한다. 클로저가 유용하게 사용되는 상황에 대해 살펴보자.

## 2.1 상태 유지

클로저가 가장 유용하게 사용되는 상황은 **현재 상태를 기억하고 변경된 최신 상태를 유지**하는 것이다. 아래 예제를 살펴보자.

```html
<!DOCTYPE html>
<html>
<body>
  <button class="toggle">toggle</button>
  <div class="box" style="width: 100px; height: 100px; background: red;"></div>

  <script>
    var box = document.querySelector('.box');
    var toggleBtn = document.querySelector('.toggle');

    var toggle = (function () {
      var isShow = false;

      // ① 클로저를 반환
      return function () {
        box.style.display = isShow ? 'block' : 'none';
        // ③ 상태 변경
        isShow = !isShow;
      };
    })();

    // ② 이벤트 프로퍼티에 클로저를 할당
    toggleBtn.onclick = toggle;
  </script>
</body>
</html>
```

<div class='result'></div>

① 즉시실행함수는 함수를 반환하고 즉시 소멸한다. 즉시실행함수가 반환한 함수는 자신이 생성됐을 때의 렉시컬 환경(Lexical environment)에 속한 변수 isShow를 기억하는 클로저다. 클로저가 기억하는 변수 isShow는 box 요소의 표시 상태를 나타낸다.

② 클로저를 이벤트 핸들러로서 이벤트 프로퍼티에 할당했다. 이벤트 프로퍼티에서 이벤트 핸들러인 클로저를 제거하지 않는 한 클로저가 기억하는 렉시컬 환경의 변수 isShow는 소멸하지 않는다. 다시 말해 현재 상태를 기억한다.

③ 버튼을 클릭하면 이벤트 프로퍼티에 할당한 이벤트 핸들러인 클로저가 호출된다. 이때 .box 요소의 표시 상태를 나타내는 변수 isShow의 값이 변경된다. 변수 isShow는 클로저에 의해 참조되고 있기 때문에 유효하며 자신의 변경된 최신 상태를 게속해서 유지한다.

이처럼 클로저는 현재 상태(위 예제의 경우 .box 요소의 표시 상태를 나타내는 isShow 변수)를 기억하고 이 상태가 변경되어도 최신 상태를 유지해야 하는 상황에 매우 유용하다. 만약 자바스크립트에 클로저라는 기능이 없다면 상태를 유지하기 위해 전역 변수를 사용할 수 밖에 없다. 전역 변수는 언제든지 누구나 접근할 수 있고 변경할 수 있기 때문에 많은 부작용을 유발해 오류의 원인이 되므로 사용을 억제해야 한다.

## 2.2 전역 변수의 사용 억제

버튼이 클릭될 때마다 클릭한 횟수가 누적되어 화면에 표시되는 카운터를 만들어보자. 이 예제의 클릭된 횟수가 바로 유지해야할 상태이다.

```html
<!DOCTYPE html>
<html>
<body>
  <p>전역 변수를 사용한 Counting</p>
  <button id="inclease">+</button>
  <p id="count">0</p>
  <script>
    var incleaseBtn = document.getElementById('inclease');
    var count = document.getElementById('count');

    // 카운트 상태를 유지하기 위한 전역 변수
    var counter = 0;

    function increase() {
      return ++counter;
    }

    incleaseBtn.onclick = function () {
      count.innerHTML = increase();
    };
  </script>
</body>
</html>
```

<div class='result'></div>

위 코드는 잘 동작하지만 오류를 발생시킬 가능성을 내포하고 있는 좋지 않은 코드다. increase 함수는 호출되기 직전에 전역변수 counter의 값이 반드시 `0`이여야 제대로 동작한다. 하지만 변수 counter는 전역 변수이기 때문에 언제든지 누구나 접근할 수 있고 변경할 수 있다. 이는 의도치 않게 값이 변경될 수 있다는 것을 의미한다. 만약 누군가에 의해 의도치 않게 전역 변수 counter의 값이 변경됐다면 이는 오류로 이어진다. 변수 counter는 카운터를 관리하는 increase 함수가 관리하는 것이 바람직하다. 전역 변수 counter를 increase 함수의 지역 변수로 바꾸어 의도치 않은 상태 변경을 방지해보자.

```html
<!DOCTYPE html>
<html>
<body>
  <p>지역 변수를 사용한 Counting</p>
  <button id="inclease">+</button>
  <p id="count">0</p>
  <script>
    var incleaseBtn = document.getElementById('inclease');
    var count = document.getElementById('count');

    function increase() {
      // 카운트 상태를 유지하기 위한 지역 변수
      var counter = 0;
      return ++counter;
    }

    incleaseBtn.onclick = function () {
      count.innerHTML = increase();
    };
  </script>
</body>
</html>
```

<div class='result'></div>

전역변수를 지역변수로 변경하여 의도치 않은 상태 변경은 방지했다. 하지만 increase 함수가 호출될 때마다 지역변수 counter를 0으로 초기화하기 때문에 언제나 1이 표시된다. 다시 말해 **변경된 이전 상태를 기억하지 못한다.** 이전 상태를 기억하도록 클로저를 사용하여 이 문제를 해결해보자.

```html
<!DOCTYPE html>
<html>
  <body>
  <p>클로저를 사용한 Counting</p>
  <button id="inclease">+</button>
  <p id="count">0</p>
  <script>
    var incleaseBtn = document.getElementById('inclease');
    var count = document.getElementById('count');

    var increase = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      var counter = 0;
      // 클로저를 반환
      return function () {
        return ++counter;
      };
    }());

    incleaseBtn.onclick = function () {
      count.innerHTML = increase();
    };
  </script>
</body>
</html>
```

<div class='result'></div>

스크립트가 실행되면 즉시실행함수(immediately-invoked function expression)가 호출되고 변수 increase에는 함수 `function () { return ++counter; }`가 할당된다. 이 함수는 자신이 생성됐을 때의 렉시컬 환경(Lexical environment)을 기억하는 클로저다. 즉시실행함수는 호출된 이후 소멸되지만 즉시실행함수가 반환한 함수는 변수 increase에 할당되어 inclease 버튼을 클릭하면 클릭 이벤트 핸들러 내부에서 호출된다. 이때 클로저인 이 함수는 자신이 선언됐을 때의 렉시컬 환경인 즉시실행함수의 스코프에 속한 지역변수 counter를 기억한다. 따라서 즉시실행함수의 변수 counter에 접근할 수 있고 변수 counter는 자신을 참조하는 함수가 소멸될 때가지 유지된다.

즉시실행함수는 한번만 실행되므로 increase가 호출될 때마다 변수 counter가 재차 초기화될 일은 없을 것이다. 변수 counter는 외부에서 직접 접근할 수 없는 `private` 변수이므로 전역 변수를 사용했을 때와 같이 **의도되지 않은 변경**을 걱정할 필요도 없기 때문이 보다 안정적인 프로그래밍이 가능하다.

변수의 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있다. 상태 변경이나 가변(mutable) 데이터를 피하고 **불변성(Immutability)을 지향**하는 함수형 프로그래밍에서 **부수 효과(Side effect)를 최대한 억제**하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.
{:.info}

아래는 함수형 프로그래밍에서 클로저를 활용하는 간단한 예제이다.

```javascript
// 함수를 인자로 전달받고 함수를 반환하는 고차 함수
// 이 함수가 반환하는 함수는 클로저로서 카운트 상태를 유지하기 위한 자유 변수 counter을 기억한다.
function makeCounter(predicate) {
  // 카운트 상태를 유지하기 위한 자유 변수
  var counter = 0;
  // 클로저를 반환
  return function () {
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인자로 전달받아 함수를 반환한다
const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

함수 makeCounter는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수이다. 함수 makeCounter가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 함수 makeCounter의 스코프에 속한 변수 counter을 기억하는 클로저다. 함수 makeCounter는 인자로 전달받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있다. 이때 주의해야 할 것은 함수 makeCounter를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다는 것이다. 이는 함수를 호출하면 그때마다 새로운 렉시컬 환경이 생성되기 때문이다. 위 예제에서 변수 increaser와 변수 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 자유 변수 counter를 공유하지 않아 카운터의 증감이 연동하지 않는다. 따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다.

<!--
싱글톤 클래스를 사용한 방법
```html
<!DOCTYPE html>
<html>
<body>
  <p>지역 변수를 사용한 Counting</p>

  <button type="button" onclick="myFunction()">Count!</button>

  <p id="demo">0</p>

  <script>

	let _instance = null;

	class Counter {
		constructor() {
			this.counter = 0;
			// Singleton
			if (!_instance) {
      	_instance = this;
      }
			return _instance;
		}

		add() {
			this.counter += 1;
			return this.counter;
		}
	}

	const counter = new Counter();

	function myFunction(){
    document.getElementById('demo').innerHTML = counter.add();
  }
  </script>
  </body>
</html>
```
-->

## 2.3 정보의 은닉

이번에는 생성자 함수 Counter를 생성하고 이를 통해 counter 객체를 만들어보자.

```javascript
function Counter() {
  // 카운트를 유지하기 위한 자유 변수
  var counter = 0;

  // 클로저
  this.increase = function () {
    return ++counter;
  };

  // 클로저
  this.decrease = function () {
    return --counter;
  };
}

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.decrease()); // 0
```

생성자 함수 Counter는 increase, decrease 메소드를 갖는 인스턴스를 생성한다. 이 메소드들은 모두 자신이 생성됐을 때의 렉시컬 환경인 생성자 함수 Counter의 스코프에 속한 변수 counter를 기억하는 클로저이며 렉시컬 환경을 공유한다. 생성자 함수가 생성한 객체의 메소드는 객체의 프로퍼티에만 접근할 수 있는 것이 아니며 자신이 기억하는 렉시컬 환경의 변수에도 접근할 수 있다.

이때 생성자 함수 Counter의 변수 counter는 this에 바인딩된 프로퍼티가 아니라 변수다. counter가 this에 바인딩된 프로퍼티라면 생성자 함수 Counter가 생성한 인스턴스를 통해 외부에서 접근이 가능한 `public` 프로퍼티가 되지만 생성자 함수 Counter 내에서 선언된 변수 counter는 생성자 함수 Counter 외부에서 접근할 수 없다. 하지만 생성자 함수 Counter가 생성한 인스턴스의 메소드인 increase, decrease는 클로저이기 때문에 자신이 생성됐을 때의 렉시컬 환경인 생성자 함수 Counter의 변수 counter에 접근할 수 있다. 이러한 클로저의 특징을 사용해 클래스 기반 언어의 `private` 키워드를 흉내낼 수 있다.

<!--
## 2.4 콜백 함수

setTimeout 함수는 첫번째 인자에 콜백 함수를 전달하고, 두번째 인자에 시간 간격(ms: 1000분의 1초)을 지정한다. 즉, 지정된 시간 간격으로 콜백 함수를 반복 호출한다. 아래 코드를 살펴보자.

```html
<!DOCTYPE html>
<html>
<body>
  <p>새로고침으로 다시 실행해 보세요</p>
  <script>
    var fade = function (node) {
      // 자유변수
      var level = 1; // ②
      var step = function () {
        var hex = level.toString(16); // ④

        // hex: '1' ~ 'f'
        node.style.backgroundColor = '#ff' + hex; // ⑤

        if (level < 15) { // ⑥
          level += 1;
          setTimeout(step, 100); // ⑦
        }
      };
      // setTimeout 호출 이후 fade 함수는 종료한다. 하지만 100ms 후 함수 step이 호출된다.
      // 즉 외부 함수 fade보다 내부 함수 step이 더 오래 유지된다.
      setTimeout(step, 100); // ③
    };

    fade(document.body); // ①
  </script>
</body>
</html>
```

<div class='result'></div>

① 함수 fade는 document.body를 인자로 전달받아 호출된다.

② 함수 fade의 지역변수 level은 1로 초기화되어 있다. 함수 step은 내부함수이며 외부함수 fade의 지역변수 level을 사용한다. level은 자유변수이다.

③ setTimeout 호출 이후 fade 함수는 종료한다. 하지만 100ms 후 함수 step이 호출된다. 즉, 외부 함수 fade보다 내부 함수 step이 더 오래 유지된다.

④ 함수 step은 지역변수 hex을 갖는다. 이것은 16진수 문자열을 값으로 갖는다.

⑤ 함수 fade의 매개변수 node(document.body)의 배경색을 변경한다.

⑥ 변수 level이 15(f)보다 작은지 다시말해 16진수 범위 내(1~f)인지 확인한다.

⑦ level을 1 증가시키고 다시 함수 step을 호출하여 같은 작업을 반복한다.

이때 fade 함수는 이미 반환되었지만 외부함수 fade 내의 변수는 이를 필요로 하는 내부함수가 하나 이상 존재하는 경우 계속 유지된다. 이때 내부함수가 외부함수에 있는 변수의 복사본이 아니라 실제 변수에 접근한다는 것에 주의하여야 한다.
-->

## 2.4 자주 발생하는 실수

아래의 예제는 클로저를 사용할 때 자주 발생할 수 있는 실수에 관련한 예제다.

```javascript
var arr = [];

for (var i = 0; i < 5; i++) {
  arr[i] = function () {
    return i;
  };
}

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}
```

배열 arr에 5개의 함수가 할당되고 각각의 함수는 순차적으로 0, 1, 2, 3, 4를 반환할 것으로 기대하겠지만 결과는 그렇지않다. for 문에서 사용한 변수 i는 전역 변수이기 때문이다. 이러한 문제를 클로저를 사용해 바르게 동작하는 코드로 만들어보자.

```javascript
var arr = [];

for (var i = 0; i < 5; i++){
  arr[i] = (function (id) { // ②
    return function () {
      return id; // ③
    };
  }(i)); // ①
}

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}
```

① 배열 arr에는 즉시실행함수에 의해 함수가 반환된다.

② 이때 즉시실행함수는 i를 인자로 전달받고 매개변수 id에 할당한 후 내부 함수를 반환하고 life-cycle이 종료된다. 매개변수 id는 자유변수가 된다.

③ 배열 arr에 할당된 함수는 id를 반환한다. 이때 id는 상위 스코프의 자유변수이므로 그 값이 유지된다.

위 예제는 자바스크립트의 함수 레벨 스코프 특성으로 인해 for 루프의 초기문에서 사용된 변수의 스코프가 전역이 되기 때문에 발생하는 현상이다. [ES6의 let 키워드](./es6-block-scope)를 사용하면 이와 같은 문제는 말끔히 해결된다.

```javascript
const arr = [];

for (let i = 0; i < 5; i++) {
  arr[i] = function () {
    return i;
  };
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]());
}
```

또는 함수형 프로그래밍 기법인 고차 함수를 사용하는 방법이 있다. 이 방법은 변수와 반복문의 사용을 억제할 수 있기 때문에 에플리케이션의 오류를 줄이고 가독성을 좋게 만든다.

```javascript
const arr = new Array(5).fill();

arr.forEach((v, i, array) => array[i] = () => i);

arr.forEach(f => console.log(f()));
```

<!--
```html
<!DOCTYPE html>
<html>
	<style>
		div { display: none; }
	</style>
<body>
	<a href="#">1</a>
	<a href="#">2</a>
	<a href="#">3</a>
	<div id="div-1">1</div>
	<div id="div-2">2</div>
	<div id="div-3">3</div>
	<script>
		var aList   = document.getElementsByTagName('a');
		var divList = document.getElementsByTagName('div')

		for (var i = 0; i < aList.length; i++) {
			aList[i].addEventListener('click', (function(index) {
				return function (event) {
					event.preventDefault();
					for (var j = 0; j < divList.length; j++) {
						divList[j].style.display = "none";
					}
					document.getElementById('div-' + (index + 1)).style.display = "block";
				}
			})(i));
		}
	</script>
</body>
</html>
```

<div class='result'></div>
-->
# Reference

* [http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/](http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/)
