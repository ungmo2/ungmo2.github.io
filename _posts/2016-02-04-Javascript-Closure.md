---
layout: post
title: Javascript Closure
categories: javascript
---

클로저(closure)는 자바스크립트에서 중요한 개념 중 하나로 자바스크립트에 관심을 가지고 있다면 한번쯤은 들어보았을 내용이다. [function]({% post_url 2016-01-20-Javascript-Function %}), [scope]({% post_url 2016-01-21-Javascript-Scope %}), [execution context]({% post_url 2016-01-23-Javascript-Execution-Context %})에 대한 사전 지식이 있으면 이해하기 어렵지 않은 개념이다. 먼저 일독을 권장한다.

클로저는 내부함수를 위한 외부함수의 지역변수가 외부함수에 의한 내부함수의 반환 이후에도 life-cycle이 유지되는 것을 의미한다.

말이 난해하니 우선 예제를 살펴보자. 우리 모두는 자신의 힘으로 발견한 내용을 가장 쉽게 익힌다.(- 도널드 커누스)

```javascript
function sayHello(name){
  var text = 'Hello ' + name;
  var logHello = function(){ console.log(text); }
  logHello();
}

sayHello('lee');  // Hello lee
```

함수 sayHello 내에 내부함수(inner function) logHello가 선언되며 실행된다.
이때 내부함수 logHello는 자신을 포함하고 있는 외부함수 sayHello의 변수 text에 접근할 수 있다.

이것은 중첩된 함수의 scope의 레퍼런스를 차례대로 저장하고 있는 `scope-chain`을 자바스크립트 엔진이 검색하였기에 가능한 것이다.

이번에는 내부함수 logHello를 sayHello내에서 실행하지 말고 반환하는 코드로 변경해 보자.

```javascript
function sayHello(name){
  var text = 'Hello ' + name; // local variable
  return function(){ console.log(text); }
}

sayHello('lee')(); // Hello lee
```

함수 sayHello는 내부함수를 반환하고 생을 마감했다. 함수 sayHello의 변수 text 또한 더이상 유효하지 않게 되어 변수 text에 접근할 수 있는 방법은 달리 없어 보인다. 그러나 위 코드의 실행 결과는 "Hello lee"이다. 이미 life-cycle이 종료된 함수 sayHello의 지역변수 text가 다시 부활이라도 한 듯이 동작하고 있다. 뭔가 특별한 일이 벌어 지고 있는 것 같다.

위의 예제는 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우인데 이때 내부함수가 외부함수의 지역변수에 접근 할 수 있고, 외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않고 상태를 유지하는 특성을 클로저라 한다.

클로저의 필요성을 이해하기 위해서, 버튼이 클릭될 때마다 클릭한 횟수가 누적되어 화면에 표시되는 코드를 만들어보자.

```html
<!DOCTYPE html>
<html>
<body>

<p>Counting with a global variable.</p>

<button type="button" onclick="myFunction()">Count!</button>

<p id="demo">0</p>

<script>
var counter = 0;

function add() {
  return counter += 1;
}

function myFunction(){
  document.getElementById("demo").innerHTML = add();
}
</script>

</body>
</html>
```

위 코드는 잘 동작한다. 하지만 add 함수만을 위한 전역 변수를 사용하고 있어서 의도하지 않게 값이 변경되었을 때 문제가 될 수 있다. 그럼 전역 변수 counter를 add 함수의 지역 변수로 바꾸어보자.  

```html
<!DOCTYPE html>
<html>
<body>

<p>Counting with a local variable.</p>

<button type="button" onclick="myFunction()">Count!</button>

<p id="demo">0</p>

<script>
function add() {
  var counter = 0;
  return counter += 1;
}

function myFunction(){
  document.getElementById("demo").innerHTML = add();
}
</script>

</body>
</html>
```

add 함수가 호출될 때마다 지역변수 counter가 초기화되기 때문에 언제나 1이 표시된다. 클로저를 사용하여 문제를 해결해보자.

```html
<!DOCTYPE html>
<html>
<body>

<p>Counting with a local variable.</p>

<button type="button" onclick="myFunction()">Count!</button>

<p id="demo">0</p>

<script>
var add = (function () {
  var counter = 0;
  return function () {return counter += 1;}
})();

function myFunction(){
  document.getElementById("demo").innerHTML = add();
}
</script>

</body>
</html>
```
변수 add에는 즉시실행함수(immediately-invoked function expression)가 호출되어 그 결과 무명함수 `function () {return counter += 1;}`가 반환된다. 따라서 `add()`를 실행하면 변수 add에 담긴 함수가 호출된다.

즉시실행함수은 한번만 실행되므로 add에 담겨있는 함수가 호출될 때마다 변수 counter가 재차 초기화될 일은 없을 것이다. 이때 중요한 것은 add에 담겨있는 함수는 변수 counter에 접근할 수 있고 변수 counter는 add에 담겨있는 함수가 소멸될 때가지 유지된다는 것이다. 이것이 바로 클로저이다.

변수 counter는 외부에서 직접 접근할 수 없는 `private` 변수이므로 전역 변수를 사용했을 때와 같이 의도되지 않은 변경을 걱정할 필요도 없다.

아래의 예제는 클로저를 사용할 때 자주 발생할 수 있는 실수에 관련한 예제다.

```javascript
var arr = []

for(var i = 0; i < 5; i++){
  arr[i] = function(){
    return i;
  }
}

for(var index in arr) {
  console.log(arr[index]());
}
```

배열 arr에 할당된 함수가 함수 외부의 컨텍스트에 접근할 수 있을 것으로 기대하겠지만 결과는 그렇지않다. 이유는 변수 i는 외부함수의 변수가 아니기 때문이다. 바르게 동작하는 코드는 아래와 같다.

```javascript
var arr = []

for(var i = 0; i < 5; i++){
  arr[i] = function(id) {
    return function(){
      return id;
    }
  }(i);
}

for(var index in arr) {
  console.log(arr[index]());
}
```

# Reference

* [http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/](http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/)  
* [http://www.w3schools.com/js/js_function_closures.asp](http://www.w3schools.com/js/js_function_closures.asp)
