---
layout: post
title: <strong>Strict mode</strong>
subtitle: 보다 안정적인 자바스크립트 개발 환경
categories: javascript
section: javascript
description: Strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 'use strict';를 추가한다. 전역에 추가하면 코드 전체에 Strict mode가 적용되고 함수 몸체에 추가하면 해당 함수와 중첩된 내부 함수에 Strict mode가 적용된다.
---

* TOC
{:toc}

# 1. Strict mode란?

아래 예제의 실행 결과는 무엇일지 생각해보자.

```javascript
function foo() {
  x = 10;
}

console.log(x); // ?
```

foo 함수 내에 선언되지 않은 변수 x에 값 1을 할당하였다. 이때 변수 x의 참조를 찾아야 변수 x에 값을 할당할 수 있기 때문에 자바스크립트 엔진은 변수 x가 어디에서 선언되었는지 검색하기 시작한다.

자바스크립트 엔진은 foo 함수의 컨텍스트(스코프)에서 변수 x를 검색한다. foo 함수의 컨텍스트에는 변수 x에 대한 변수 선언이 없으므로 검색에 실패할 것이고, 자바스크립트 엔진은 변수 x를 검색하기 위해 foo 함수 컨텍스트의 상위 컨텍스트(아래 예제의 경우 전역 컨텍스트)에서 변수 x를 검색한다.

전역 컨텍스트에도 변수 x가 존재하지 않기 때문에 ReferenceError를 throw할 것 같지만 전역 컨텍스트의 this가 가리키는 전역 객체에 프로퍼티 x를 동적 생성한다. 결국 식별자 x는 전역 변수가 된다. 이렇게 전역 변수가 된 변수를 **암묵적 전역 변수(implicit global)**라 한다.

개발자의 의도와는 상관없이 동작하는 암묵적 전역 변수는 오류 발생의 원인될 가능성이 크므로 변수를 선언할 때는 반드시 var 키워드를 사용하여야 한다. 하지만, 오타나 문법 지식의 미비로 인한 오류는 언제나 발생하는 것이므로 오류를 줄여 안정적인 코드를 생산하기 위해서는 보다 근본적인 접근이 필요하다. 다시말해, 잠재적인 오류를 발생시키기 어려운 개발 환경을 만들고 그 환경에서 개발을 하는 것이 보다 근본적인 해결책이라고 할 수 있다.

이를 지원하기 위해 ES5부터 **Strict mode**가 추가되었다. Strict mode는 자바스크립트 언어 문법을 보다 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 성능상 문제를 일으킬만 한 코드에 명시적인 에러를 발생시킨다.

[ESLint](./eslint)와 같은 린트 프로그램을 사용하여도 Strict mode와 유사한 효과를 얻을 수 있다. 린트 프로그램은 실제 실행없이 코드를 분석할 수 있는 정적 분석(static analysis)을 제공하며 Strict mode가 제한하는 코드뿐만이 아니라 코딩 컨벤션을 강제할 수 있기 때문에 보다 강력한 효과를 얻을 수 있다.

# 2. Strict mode의 적용

Strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 `'use strict';` 디렉티브를 추가한다. 전역에 추가하면 코드 전체에 Strict mode가 적용되고 함수 몸체에 추가하면 해당 함수와 중첩된 내부 함수에 Strict mode가 적용된다.

```javascript
'use strict';

function foo() {
  x = 10;
}

console.log(x); // ReferenceError: x is not defined
```

여러 개의 자바스크립트 파일을 script 태크를 사용해 로드할 경우, 전역에 적용한 Strict mode는 자신의 script 태크 내에서만 적용된다.

```html
<!DOCTYPE html>
<html>
<body>
  <script>
    x = 1; // 에러가 발생하지 않는다.
  </script>
  <script>
    'use strict';

    y = 1; // ReferenceError: y is not defined
  </script>
</body>
</html>
```

따라서 전역에 Strict mode를 적용하는 것은 바람직 하지 않다. 함수 단위로 Strict mode를 적용하는 것이 좋다. 여러 개의 함수에 Strict mode를 적용하려면 즉시실행 함수로 함수들을 감싸고 즉시실행 함수의 선두에 Strict mode를 적용한다.

```javascript
(function () {
  'use strict';

}());

console.log(x); // ReferenceError: x is not defined
```

위 자바스크립트 파일을 script 태크로 로드하여도 다른 자바스크립트 파일은 Strict mode에 영향을 받지 않는다.

# 3. Strict mode의 제약 사항

다음은 Strict mode를 적용했을 때의 대표적인 제약 사항이다.

## 3.1 암묵적 전역 변수

선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.

```javascript
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
}());
```

## 3.2 함수 파라미터 이름의 중복

중복된 함수 파라미터 이름을 사용하면 SyntaxError가 발생한다.

```javascript
(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```

## 3.3 with 문의 사용

with 문을 사용하면 SyntaxError가 발생한다.

```javascript
(function () {
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with({ x: 1 }) {
    console.log(x);
  }
}());
```

## 3.4 this

일반 함수를 호출하면 this에 undefined가 바인딩된다.

```javascript
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined
  }
  foo();
}());
```
