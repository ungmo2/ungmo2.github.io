---
layout: fs-post
title: <strong>타입 변환과 단축 평가</strong>
categories: fastcampus
section: fastcampus
seq: 9
permalink: /:categories/:title
description:
---

* TOC
{:toc}

# 1. 타입 변환이란?

자바스크립트의 모든 값은 타입이 있다. 값의 타입은 개발자의 의도에 따라 다른 타입으로 변환할 수 있다. 개발자가 의도적으로 값의 타입을 변환하는 것을 **명시적 타입 변환(explicit coercion)** 또는 **타입 캐스팅(type casting)**이라 한다.

```javascript
var x = 10;

// 명시적 타입 변환
// 숫자를 문자열로 타입 캐스팅한다.
var str = x.toString();
console.log(typeof str, str); // string 10

// x 변수의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number 10
```

개발자의 의도와는 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다. 이를 **암묵적 타입 변환(implicit coercion)** 또는 **타입 강제 변환(type coercion)**이라고 한다.

```javascript
var x = 10;

// 암묵적 타입 변환
// 문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.
var str = x + '';
console.log(typeof str, str); // string 10

// x 변수의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number 10
```

명시적 타입 변환이나 암묵적 타입 변환이 기존 원시 값(위 예제의 경우, x 변수의 값)을 직접 변경하는 것은 아니다. 원시 값은 변경 불가능한 값(immutable value)이므로 변경할 수 없다. 타입 변환이란 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이다.

```javascript
// 원시 값 1이 '1'로 직접 변경되는 것이 아니다.
// 1을 사용해 타입이 다른 '1'을 새롭게 생성하여 '1' + ''을 평가한다.
1 + '' // -> '1'
```

암묵적 타입 변환은 변수의 값을 재할당해서 변경하는 것이 아니라 자바스크립트 엔진이 표현식을 에러 없이 평가하기 위해 피연산자의 값을 바탕으로 새로운 타입의 값을 만들어 단 한 번 사용하고 버린다.

위 예제의 경우 자바스크립트 엔진은 표현식 `x + ''`을 평가하기 위해 x 변수의 숫자값을 바탕으로 새로운 문자열 값 '10'을 생성하고 이것으로 표현식 `'10' + ''`를 평가한다. 이때 암묵적으로 생성된 문자열 '10'은 x 변수에 재할당되지 않는다. 따라서 암묵적으로 생성된 문자열 '10'은 표현식의 평가가 끝나면 아무도 참조하지 않으므로 가비지 콜렉터에 의해 메모리에서 해제된다.

명시적 타입 변환은 타입을 변경하겠다는 개발자의 의지가 코드에 명백히 드러난다. 하지만 암묵적 타입 강제 변환은 자바스크립트 엔진에 의해 암묵적으로, 즉 드러나지 않게 타입이 자동 변환되기 때문에 타입을 변경하겠다는 개발자의 의지가 코드에 명백히 나타나지 않는다.

따라서 자신이 작성한 코드에서 암묵적 타입 변환이 발생하는지, 발생한다면 어떤 타입의 어떤 값으로 변환되는지, 그리고 타입 변환된 값으로 표현식이 어떻게 평가될 것인지 예측 가능해야 한다. 만약 타입 변환 결과를 예측하지 못하거나 예측이 결과와 일치하지 않는다면 오류를 생산할 가능성이 높아진다.

그렇다면 명시적 타입 변환만 사용하고 암묵적 타입 변환은 발생하지 않도록 코드를 작성하면 어떨까? 좋은 생각이긴 하지만 이러한 논리는 옳지 않다. 때로는 명시적 타입 변환보다 암묵적 타입 변환이 가독성 측면에서 더 좋을 수도 있다. 예를 들어, 자바스크립트 문법을 잘 이해하고 있는 개발자에게는 `(10).toString()`보다 `10 + ''`이 더욱 간결하고 이해하기 쉽다.

중요한 것은 코드를 예측할 수 있어야 한다는 것이다. 동료가 작성한 코드를 정확히 이해할 수 있어야 하고 자신이 작성한 코드도 타인이 쉽게 이해할 수 있어야 한다. 이를 위해 타입 변환이 어떻게 동작하는지 정확히 이해하고 사용하자.

# 2. 암묵적 타입 변환

자바스크립트 엔진은 표현식을 평가할 때 개발자의 의도와는 상관없이 코드의 문맥을 고려해 암묵적으로 데이터 타입을 강제 변환(암묵적 타입 변환)할 때가 있다. 다음 예제를 보자.

```javascript
// 피연산자가 모두 문자열 타입이어야 하는 문맥
'10' + 2 // -> '102'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * '10' // -> 50

// 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥
!0 // -> true
if (1) { }
```

이처럼 표현식을 평가할 때 코드의 문맥에 부합하지 않는 다양한 상황이 발생할 수 있다. 이때 자바스크립트는 가급적 에러를 발생시키지 않도록 암묵적 타입 변환을 통해 표현식을 평가한다.

암묵적 타입 변환이 발생하면 문자열, 숫자, 불리언과 같은 원시 타입 중 하나로 타입을 자동 변환한다. 타입별로 암묵적 타입 변환이 어떻게 발생하는지 살펴보자.

## 2.1.	문자열 타입으로 변환

다음 예제를 살펴보자.

```javascript
1 + '2' // -> "12"
```

위 예제의 + 연산자는 피연산자 중 하나 이상이 문자열이므로 문자열 연결 연산자로 동작한다. 문자열 연결 연산자의 역할은 문자열 값을 만드는 것이다. 따라서 문자열 연결 연산자의 모든 피연산자는 코드의 문맥상 모두 문자열 타입이어야 한다.

자바스크립트 엔진은 문자열 연결 연산자 표현식을 평가하기 위해 문자열 연결 연산자의 피연산자 중에서 문자열 타입이 아닌 피연산자를 문자열 타입으로 암묵적 타입 변환한다.

연산자 표현식의 피연산자(피연산자도 표현식이다)만이 암묵적 타입 변환의 대상이 되는 것은 아니다. 앞서 언급했듯이 자바스크립트 엔진은 표현식을 평가할 때 코드 문맥에 부합하도록 암묵적 타입 변환을 실행한다. 예를 들어, ES6에서 도입된 템플릿 리터럴의 표현식 삽입(["6.3.2. 표현식 삽입"](/fastcampus/type#32-표현식-삽입) 참고)은 표현식의 평가 결과를 문자열 타입으로 암묵적 타입 변환한다.

```javascript
`1 + 1 = ${1 + 1}` // -> "1 + 1 = 2"
```

자바스크립트 엔진은 문자열 타입 아닌 값을 문자열 타입으로 암묵적 타입 변환을 수행할 때 다음과 같이 동작한다.

```javascript
// 숫자 타입
0 + ''         // -> "0"
-0 + ''        // -> "0"
1 + ''         // -> "1"
-1 + ''        // -> "-1"
NaN + ''       // -> "NaN"
Infinity + ''  // -> "Infinity"
-Infinity + '' // -> "-Infinity"

// 불리언 타입
true + ''  // -> "true"
false + '' // -> "false"

// null 타입
null + '' // -> "null"

// undefined 타입
undefined + '' // -> "undefined"

// 심벌 타입
(Symbol()) + '' // -> TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + ''           // -> "[object Object]"
Math + ''           // -> "[object Math]"
[] + ''             // -> ""
[10, 20] + ''       // -> "10,20"
(function(){}) + '' // -> "function(){}"
Array + ''          // -> "function Array() { [native code] }"
```

## 2.2. 숫자 타입으로 변환

다음 예제를 살펴보자.

```javascript
1 - '1'   // -> 0
1 * '10'  // -> 10
1 / 'one' // -> NaN
```

위 예제에서 사용한 연산자는 모두 산술 연산자이다. 산술 연산자의 역할은 숫자 값을 만드는 것이다. 따라서 산술 연산자의 모든 피연산자는 코드 문맥 상 모두 숫자 타입이어야 한다.

자바스크립트 엔진은 산술 연산자 표현식을 평가하기 위해 산술 연산자의 피연산자 중에서 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환한다. 이때 피연산자를 숫자 타입으로 변환할 수 없는 경우는 산술 연산을 수행할 수 없으므로 표현식의 평가 결과는 NaN이 된다.

피연산자를 숫자 타입으로 변환해야 할 문맥은 산술 연산자뿐만이 아니다. 다음 예제를 보자.

```javascript
'1' > 0  // -> true
```

비교 연산자의 역할은 불리언 값을 만드는 것이다. `>` 비교 연산자는 피연산자의 크기를 비교하므로 모든 피연산자는 코드의 문맥상 모두 숫자 타입이어야 한다. 자바스크립트 엔진은 비교 연산자 표현식을 평가하기 위해 비교 연산자의 피연산자 중에서 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환한다.

자바스크립트 엔진은 숫자 타입 아닌 값을 숫자 타입으로 암묵적 타입 변환을 수행할 때 다음과 같이 동작한다. `+` 단항 연산자는 피연산자가 숫자 타입의 값이 아니면 숫자 타입의 값으로 암묵적 타입 변환을 수행한다.

```javascript
// 문자열 타입
+''       // -> 0
+'0'      // -> 0
+'1'      // -> 1
+'string' // -> NaN

// 불리언 타입
+true     // -> 1
+false    // -> 0

// null 타입
+null     // -> 0

// undefined 타입
+undefined // -> NaN

// 심벌 타입
+Symbol() // -> ypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}             // -> NaN
+[]             // -> 0
+[10, 20]       // -> NaN
+(function(){}) // -> NaN
```

빈 문자열(''), 빈 배열([]), null, false는 0으로, true는 1로 변환된다. 객체와 빈 배열이 아닌 배열, undefined는 변환되지 않아 NaN이 된다는 것에 주의하자.

## 2.3.	불리언 타입으로 변환

다음 예제를 살펴보자.

```javascript
if ('') console.log(x);
```

if 문이나 for 문과 같은 제어문 또는 삼항 조건 연산자의 조건식(conditional expression)은 불리언 값, 즉 논리적 참/거짓을 반환해야 하는 표현식이다. 자바스크립트 엔진은 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환한다.

```javascript
if ('')    console.log('1');
if (true)  console.log('2');
if (0)     console.log('3');
if ('str') console.log('4');
if (null)  console.log('5');

// 2 4
```

이때 **자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy 값(참으로 평가되는 값) 또는 Falsy 값(거짓으로 평가되는 값)으로 구분한다.** 즉, 제어문의 조건식과 같이 불리언 값으로 평가되어야 할 문맥에서 Truthy 값은 true로, Falsy 값은 false로 암묵적 타입 변환된다.

아래 값들은 false로 평가되는 Falsy 값이다.

-	false
-	undefined
-	null
-	0, -0
-	NaN
-	'' (빈 문자열)

```javascript
// 아래의 조건문은 모두 코드 블록을 실행한다.
if (!false)     console.log(false + ' is falsy value');
if (!undefined) console.log(undefined + ' is falsy value');
if (!null)      console.log(null + ' is falsy value');
if (!0)         console.log(0 + ' is falsy value');
if (!NaN)       console.log(NaN + ' is falsy value');
if (!'')        console.log('' + ' is falsy value');
```

Falsy 값 외의 모든 값은 모두 true로 평가되는 Truthy 값이다.

다음 예제는 Truthy/Falsy 값을 판별하는 함수다.

함수
: 함수란 어떤 작업을 수행하기 위해 필요한 문들의 집합을 정의한 코드 블록이다. 함수는 이름과 매개변수를 가지며, 필요할 때 호출해서 코드 블록에 담긴 문들을 일괄적으로 실행할 수 있다. 함수에 대해서는 ["12. 함수"](/fastcampus/function)에서 자세히 살펴보자.

```javascript
// 전달한 인자가 Falsy 값이면 true, Truthy 값이면 false를 반환한다.
function isFalsy(v) {
  return !v;
}

// 전달한 인자가 Truthy 값이면 true, Falsy 값이면 false를 반환한다.
function isTruthy(v) {
  return !!v;
}

// 모두 true를 반환한다.
isFalsy(false);
isFalsy(undefined);
isFalsy(null);
isFalsy(0);
isFalsy(NaN);
isFalsy('');

// 모두 true를 반환한다.
isTruthy(true);
isTruthy('0'); // 빈 문자열이 아닌 문자열은 Truthy 값이다.
isTruthy({});
isTruthy([]);
```

# 3. 명시적 타입 변환

개발자의 의도에 따라 명시적으로 타입을 변경하는 방법은 다양하다. 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이 호출하는 방법과 빌트인 메서드를 사용하는 방법, 그리고 앞에서 살펴본 암묵적 타입 변환을 이용하는 방법이 있다.

표준 빌트인 생성자 함수와 빌트인 메서드
: 표준 빌트인(built-in) 생성자 함수와 표준 빌트인 메서드는 자바스크립트에서 기본 제공하는 함수이다. 표준 빌트인 생성자 함수는 객체를 생성하기 위한 함수이며 new 연산자와 함께 호출한다. 표준 빌트인 메서드는 자바스크립트에서 기본 제공하는 빌트인 객체의 메서드다. 이에 대해서는 ["21. 빌트인 객체"](/fastcampus/built-in-object)에서 자세히 살펴보도록 하자.

## 3.1.	문자열 타입으로 변환

문자열 타입이 아닌 값을 문자열 타입으로 변환하는 방법은 다음과 같다.

1. String 생성자 함수를 new 연산자 없이 호출하는 방법
2. Object.prototype.toString 메서드를 사용하는 방법
3. 문자열 연결 연산자를 이용하는 방법

```javascript
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
String(1);        // -> "1"
String(NaN);      // -> "NaN"
String(Infinity); // -> "Infinity"
// 불리언 타입 => 문자열 타입
String(true);     // -> "true"
String(false);    // -> "false"

// 2. Object.prototype.toString 메서드를 사용하는 방법
// 숫자 타입 => 문자열 타입
(1).toString();        // -> "1"
(NaN).toString();      // -> "NaN"
(Infinity).toString(); // -> "Infinity"
// 불리언 타입 => 문자열 타입
(true).toString();     // -> "true"
(false).toString();    // -> "false"

// 3. 문자열 연결 연산자를 이용하는 방법
// 숫자 타입 => 문자열 타입
1 + '';        // -> "1"
NaN + '';      // -> "NaN"
Infinity + ''; // -> "Infinity"
// 불리언 타입 => 문자열 타입
true + '';     // -> "true"
false + '';    // -> "false"
```

## 3.2.	숫자 타입으로 변환

숫자 타입이 아닌 값을 숫자 타입으로 변환하는 방법은 다음과 같다.

1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)
3. \+ 단항 산술 연산자를 이용하는 방법
4. \* 산술 연산자를 이용하는 방법

```javascript
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
Number('0');     // -> 0
Number('-1');    // -> -1
Number('10.53'); // -> 10.53
// 불리언 타입 => 숫자 타입
Number(true);    // -> 1
Number(false);   // -> 0

// 2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환 가능)
// 문자열 타입 => 숫자 타입
parseInt('0');       // -> 0
parseInt('-1');      // -> -1
parseFloat('10.53'); // -> 10.53

// 3. + 단항 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
+'0';     // -> 0
+'-1';    // -> -1
+'10.53'; // -> 10.53
// 불리언 타입 => 숫자 타입
+true;    // -> 1
+false;   // -> 0

// 4. * 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
'0' * 1;     // -> 0
'-1' * 1;    // -> -1
'10.53' * 1; // -> 10.53
// 불리언 타입 => 숫자 타입
true * 1;    // -> 1
false * 1;   // -> 0
```

## 3.3.	불리언 타입으로 변환

불리언 타입이 아닌 값을 불리언 타입으로 변환하는 방법은 다음과 같다.

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
2. ! 부정 논리 연산자를 두 번 사용하는 방법

```javascript
// 1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 불리언 타입
Boolean('x');       // -> true
Boolean('');        // -> false
Boolean('false');   // -> true
// 숫자 타입 => 불리언 타입
Boolean(0);         // -> false
Boolean(1);         // -> true
Boolean(NaN);       // -> false
Boolean(Infinity);  // -> true
// null 타입 => 불리언 타입
Boolean(null);      // -> false
// undefined 타입 => 불리언 타 입
Boolean(undefined); // -> false
// 객체 타입 => 불리언 타입
Boolean({});        // -> true
Boolean([]);        // -> true

// 2. ! 부정 논리 연산자를 두번 사용하는 방법
// 문자열 타입 => 불리언 타입
!!'x';       // -> true
!!'';        // -> false
!!'false';   // -> true
// 숫자 타입 => 불리언 타입
!!0;         // -> false
!!1;         // -> true
!!NaN;       // -> false
!!Infinity;  // -> true
// null 타입 => 불리언 타입
!!null;      // -> false
// undefined 타입 => 불리언 타입
!!undefined; // -> false
// 객체 타입 => 불리언 타입
!!{};        // -> true
!![];        // -> true
```

# 4. 단축 평가

## 4.1. 논리 연산자를 사용한 단축 평가

["7.5. 논리 연산자"](/fastcampus/operator#5-논리-연산자)에서 설명하지 않고 뒤로 나중으로 미룬 내용이 있다. 그것은 바로 "논리합(`||`) 연산자와 논리곱(`&&`) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다. 논리합(`||`), 논리곱(`&&`) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다."라는 것이다.

앞에서 암묵적 타입 변환에 대해 살펴봤으므로 뒤로 미뤘던 위 내용을 이제 설명할 수 있다. 다음 예제를 보자.

```javascript
'Cat' && 'Dog' // -> "Dog"
```

논리곱(`&&`) 연산자는 두 개의 피연산자가 모두 true로 평가될 때 true를 반환한다. 논리곱 연산자는 좌항에서 우항으로 평가가 진행된다.(["7.13. 연산자의 결합 순서"](/fastcampus/operator#13-연산자의-결합-순서) 참고) 참고)

첫 번째 피연산자 'Cat'은 Truthy 값이므로 true로 평가된다. 하지만 이 시점까지는 위 표현식을 평가할 수 없다. 두 번째 피연산자까지 평가해 보아야 위 표현식을 평가할 수 있다. 다시 말해 두 번째 피연산자가 위 논리곱 연산자 표현식의 평가 결과를 결정한다. 이때 **논리곱 연산자는 논리 연산의 결과를 결정한 두 번째 피연산자, 즉 문자열 'Dog'를 그대로 반환한다.**

논리합(`||`) 연산자도 논리곱(`&&`) 연산자와 동일하게 동작한다.

```javascript
'Cat' || 'Dog' // -> "Cat"
```

논리합(`||`) 연산자는 두 개의 피연산자 중 하나만 true로 평가되어도 true를 반환한다. 논리합 연산자도 왼쪽에서 오른쪽으로 평가가 진행된다.

첫 번째 피연산자 'Cat'은 Truthy 값이므로 true로 평가된다. 이 시점에 두 번째 피연산자까지 평가해 보지 않아도 위 표현식을 평가할 수 있다. 이때 **논리합 연산자는 논리 연산의 결과를 결정한 첫 번째 피연산자, 즉 문자열 'Cat'를 그대로 반환한다.**

논리곱(`&&`) 연산자와 논리합(`||`) 연산자는 이처럼 **논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환한다. 이를 단축 평가(short-circuit evaluation)라 한다. 단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우, 나머지 평가 과정을 생략한다.** 대부분의 프로그래밍 언어는 단축 평가를 통해 논리 연산을 수행한다.

단축 평가는 다음 규칙을 따른다.

| 단축 평가 표현식      | 평가 결과
|:------------------|:----------
| true \|\| anything  | true
| false \|\| anything | anything
| true && anything  | anything
| false && anything	| false

```javascript
// 논리합(||) 연산자
'Cat' || 'Dog'  // -> "Cat"
false || 'Dog'  // -> "Dog"
'Cat' || false  // -> "Cat"

// 논리곱(&&) 연산자
'Cat' && 'Dog'  // -> "Dog"
false && 'Dog'  // -> false
'Cat' && false  // -> false
```

단축 평가를 사용하면 if 문을 대체할 수 있다. 어떤 조건이 Truthy 값(참으로 평가되는 값)일 때 무언가를 해야 한다면 논리곱(`&&`) 연산자 표현식으로 if 문을 대체할 수 있다.

```javascript
var done = true;
var message = '';

// 주어진 조건이 true일 때
if (done) message = '완료';

// if 문은 단축 평가로 대체 가능하다.
// done이 true라면 message에 '완료'를 할당
message = done && '완료';
console.log(message); // 완료
```

주어진 조건이 Falsy 값(거짓으로 평가되는 값)일 때 무언가를 해야 한다면 논리합(`||`) 연산자 표현식으로 if 문을 대체할 수 있다.

```javascript
var done = false;
var message = '';

// 주어진 조건이 false일 때
if (!done) message = '미완료';

// if 문은 단축 평가로 대체 가능하다.
// done이 false라면 message에 '미완료'를 할당
message = done || '미완료';
console.log(message); // 미완료
```

참고로 삼항 조건 연산자는 if...else 문을 대체할 수 있다.

```javascript
var done = true;
var message = '';

// if...else 문
if (done) message = '완료';
else      message = '미완료';
console.log(message); // 완료

// if...else 문은 삼항 조건 연산자로 대체 가능하다.
message = done ? '완료' : '미완료';
console.log(message); // 완료
```

단축 평가는 다음과 같은 상황에서 유용하게 사용된다. 아직 살펴보지 않은 객체와 함수에 대한 내용이 나와서 혼란스러울 수 있겠지만 지금은 다음과 같은 단축 평가의 유용한 패턴이 있다는 정도로 이해하고 넘어가도 좋다. 객체와 함수에 대해서는 나중에 자세히 살펴볼 것이다.

-	객체를 가리키기를 기대하는 변수가 null 또는 undefined인지 확인하고 프로퍼티를 참조할 때

객체는 키(key)과 값(value)으로 구성된 프로퍼티(property)들의 집합이다. 만약 객체를 가리키기를 기대하는 변수가 null 또는 undefined인 경우 객체의 프로퍼티를 참조하면 타입 에러(TypeError)가 발생한다. 에러가 발생하면 프로그램이 강제 종료된다.

```javascript
var elem = null;
var value = elem.value; // TypeError: Cannot read property 'value' of null
```

이때 단축 평가를 사용하면 에러를 발생시키지 않는다.

```javascript
var elem = null;
// elem이 null이나 undefined와 같은 Falsy 값이면 elem으로 평가되고
// elem이 Truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value; // -> null
```

-	함수 매개변수에 기본값을 설정할 때

함수를 호출할 때 인수를 전달하지 않으면 매개변수는 undefined를 갖는다. 이때 단축 평가를 사용하여 매개변수의 기본값을 설정하면 undefined로 인해 발생할 수 있는 에러를 방지할 수 있다.

```javascript
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
  str = str || '';
  return str.length;
}

getStringLength();     // -> 0
getStringLength('hi'); // -> 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = '') {
  return str.length;
}

getStringLength();     // -> 0
getStringLength('hi'); // -> 2
```

## 4.2. 옵셔널 체이닝 연산자

ES11(ECMAScript2020)에서 도입된 옵셔널 체이닝(optional chaining) 연산자 ?.는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

```javascript
var elem = null;

// elem이 Falsy 값이면 elem으로 평가되고 elem이 Truthy 값이면 elem.value로 평가된다.
var value = elem?.value;
console.log(value); // null
```

옵셔널 체이닝 연산자 ?.는 객체를 가리키기를 기대하는 변수가 null 또는 undefined인지 확인하고 프로퍼티를 참조할 때 유용하다. 옵셔널 체이닝 연산자 ?.가 도입되기 이전에는 논리 연산자 &&를 사용한 단축 평가를 통해 변수가 null 또는 undefined인지 확인하였다.

```javascript
var elem = null;

// elem이 Falsy 값이면 elem으로 평가되고 elem이 Truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value;
console.log(value); // null
```

논리 연산자 &&는 좌항 피연산자가 false로 평가되는 Falsy 값(false, undefined, null, 0, -0, NaN, '')이면 좌항 피연산자를 그대로 반환한다. 좌항 피연산자가 Falsy 값인 0이나 ''인 경우도 마찬가지다. 하지만 0이나 ''은 객체로 평가될 때도 있다. (이에 대해서는 ["21.3. 원시 값과 래퍼 객체"](/fastcampus/built-in-object#3-원시-값과-래퍼-객체)에서 자세히 살펴보자.)

```javascript
var str = '';

// 문자열의 길이(length)를 참조한다.
var length = str && str.length;

// 문자열의 길이(length)를 참조하지 못한다.
console.log(length); // ''
```

하지만 옵셔널 체이닝 연산자 ?.는 좌항 피연산자가 false로 평가되는 Falsy 값(false, undefined, null, 0, -0, NaN, '')이라도 null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.

```javascript
var str = '';

/* 문자열의 길이(length)를 참조한다. 이때 좌항 피연산자가 false로 평가되는 Falsy 값이라도
null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다. */
var length = str?.length;
console.log(length); // 0
```

## 4.3. null 병합 연산자

ES11(ECMAScript2020)에서 도입된 null 병합(nullish coalescing) 연산자 ??는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.

```javascript
// 좌항의 피연산자가 null 또는 undefined이면 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.
var foo = null ?? 'default string';
console.log(foo); // "default string"
```

null 병합 연산자 ??는 변수에 기본값을 설정할 때 유용하다. null 병합 연산자 ??가 도입되기 이전에는 논리 연산자 `||`를 사용한 단축 평가를 통해 변수에 기본값을 설정하였다. 논리 연산자 `||`를 사용한 단축 평가의 경우 좌항의 피연산자가 false로 평가되는 Falsy 값(false, undefined, null, 0, -0, NaN, '')이면 우항의 피연산자를 반환한다. 만약 Falsy 값인 0이나 ''도 기본값으로서 유효하다면 예기치 않는 동작이 발생할 수 있다.

```javascript
// Falsy 값인 0이나 ''도 기본값으로서 유효하다면 예기치 않는 동작이 발생할 수 있다.
var foo = '' || 'default string';
console.log(foo); // "default string"
```

하지만 null 병합 연산자 ??는 좌항의 피연산자가 false로 평가되는 Falsy 값(false, undefined, null, 0, -0, NaN, '')이라도 null 또는 undefined가 아니면 좌항의 피연산자를 그대로 반환한다.

```javascript
// 좌항 피연산자가 Falsy 값이라도 null 또는 undefined이 아니면 좌항 피연산자를 반환한다.
var foo = '' ?? 'default string';
console.log(foo); // ""
```
