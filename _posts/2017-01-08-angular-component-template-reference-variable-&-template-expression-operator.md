---
layout: post
title: Angular Component - <strong>Template reference variable & Template expression operator</strong>
subtitle: 템플릿 참조 변수와 템플릿 표현식 연산자
categories: angular
section: angular
description: 템플릿 참조 변수는 DOM 요소에 대한 참조를 담고 있는 변수이다. 태그 내에서 해시 기호(#)를 변수명 앞에 추가하여 템플릿 참조 변수를 선언하고 템플릿 내 자바스크립트 코드에서는 해시 기호없이 참조한다. 템플릿 참조 변수는 템플릿 내에서만 유효하며 컴포넌트 클래스에 어떠한 부수 효과(Side effect)도 주지 않는다. 하지만 템플릿 참조 변수의 값을 이벤트 바인딩을 통해 컴포넌트 클래스로 전달할 수는 있다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 템플릿 참조 변수(Template reference variable)

템플릿 참조 변수는 DOM 요소에 대한 참조를 담고 있는 변수이다. 태그 내에서 해시 기호(#)를 변수명 앞에 추가하여 템플릿 참조 변수를 선언하고 템플릿 내 자바스크립트 코드에서는 해시 기호없이 참조한다. 템플릿 참조 변수는 템플릿 내에서만 유효하며 컴포넌트 클래스에 어떠한 부수 효과(Side effect)도 주지 않는다. 하지만 템플릿 참조 변수의 값을 이벤트 바인딩을 통해 컴포넌트 클래스로 전달할 수는 있다.

```html
<element #myelement>...</element>
```

템플릿 참조 변수를 활용한 예제는 아래와 같다. 입력된 이메일의 형식을 체크하여 결과를 표시한다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <!-- 템플릿 참조 변수 email의 선언 -->
      <input #email type='email' placeholder="이메일을 입력하세요">
      <!-- 템플릿 참조 변수 email의 참조  -->
      <button (click)="checkEmail(email.value)">이메일 형식 체크</button>
    </div>
    <span *ngIf="result">{{ "{{ result " }}}}</span>
  `
})
export class AppComponent {
  result: string;

  checkEmail(email: string) {
    const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (regexr.test(email)) {
      this.result = '';
    } else {
      this.result = '이메일 주소의 형식이 유효하지 않습니다.';
    }
  };
}
```

<iframe src="https://stackblitz.com/edit/template-reference-variable?embed=1&file=app/app.component.ts&hideExplorer=1" frameborder="0" width="100%" height="600"></iframe>

# 2. 템플릿 표현식 연산자(Template expression operator)

## 2.1 세이프 내비게이션 연산자(Safe navigation operator)

세이프 내비게이션 연산자 `?`는 컴포넌트 클래스의 프로퍼티의 값이 null 또는 undefined인 경우 발생하는 에러를 회피하기 위해 사용한다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- obj가 null 또는 undefined일 때 아무것도 표시하지 않는다. -->
    {{ "{{ obj " }}}}
    <!-- ERROR TypeError: Cannot read property 'id' of undefined -->
    {{ "{{ obj.id " }}}}
    <!-- 세이프 내비게이션 연산자는 null 또는 undefined의 프로퍼티를 만나면 처리를 종료하고 에러를 발생시키지 않는다. -->
    {{ "{{ obj?.id " }}}}
  `
})
export class AppComponent { }
```

<iframe src="https://stackblitz.com/edit/safe-navigation-operator?embed=1&file=app/app.component.ts&hideExplorer=1" frameborder="0" width="100%" height="500"></iframe>

## 2.2 파이프 연산자(Pipe operator)

애플리케이션이 관리하는 데이터는 사용자가 실생활에서 익숙한 형태의 데이터가 아닌 경우가 많다. 예를 들어, Date 생성자 함수가 리턴하는 인스턴스를 문자열화하면 아래와 같다.

```javascript
const today = new Date();

console.log(today.toString()); // Sat Sep 23 2017 00:26:55 GMT+0900 (KST)
```

Date 생성자 함수가 리턴한 인스턴스를 문자열화하면 사용자가 읽기 쉬운 형식은 아니다. 아마도 사용자는 "Sat Sep 23 2017 00:26:55 GMT+0900 (KST)" 형식보다는 "2017년 09월 23일 12시 26분 55초"과 같이 읽기 쉬운 형식으로 표시되기를 원할 것이다. 이때 데이터 자체를 변경하는 것은 사이드 이펙트가 있으므로 화면에 표시 형식만 변경하고 싶을 때 사용하는 것이 파이프이다.

파이프를 사용하여 사용자가 읽기 쉬운 형식으로 변환하여 보자.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>{{ "{{ today " }}}}</h2>
    <h2>{{ "{{ today | date " }}}}</h2>
    <h2>{{ "{{ today | date: 'y년 MM월 dd일 hh시 mm분 ss초' " }}}}</h2>
  `
})
export class AppComponent {
  today = new Date();
}
```

<iframe src="https://stackblitz.com/edit/pipe-operator?embed=1&file=app/app.component.ts&hideExplorer=1" frameborder="0" width="100%" height="500"></iframe>

파이프를 사용한 위 컴포넌트의 출력 결과는 아래와 같다.

```
Sat Sep 23 2017 00:26:55 GMT+0900 (KST)

Sep 23, 2017

2017년 09월 23일 12시 26분 55초
```

이와 같이 파이프는 템플릿 내에서 원하는 형식으로 값을 변환하여 표시하는 기능이다. 파이프의 사용 방법은 아래와 같다.

```html
{{ "{{ value | PipeName " }}}}
{{ "{{ value | PipeName : customOption1 :  customOption2 " }}}}
{{ "{{ value | PipeName1 | PipeName2 " }}}}
```

위와 같이 값 뒤에 파이프 연산자 `|` 를 붙인 후 원하는 파이프를 지정한다. 예를 들어 문자열을 대문자로 변환하여 표시하는 파이프 uppercase를 사용하여 보자.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    {{ "{{ name | uppercase " }}}}
  `
})
export class AppComponent {
  name = 'lee';
}
```

Angular는 uppercase 이외에도 아래와 같은 빌트인 파이프를 지원한다.

| 파이프      | 의미
|-----------|--------------------------------------
| [date](https://angular.io/api/common/DatePipe)      | 날짜 형식 변환 출력
| [JSON](https://angular.io/api/common/JsonPipe)      | JSON 형식 변환 출력
| [uppercase](https://angular.io/api/common/UpperCasePipe) | 대문자 변환 출력
| [lowercase](https://angular.io/api/common/LowerCasePipe) | 소문자 변환 출력
| [currency](https://angular.io/api/common/CurrencyPipe)  | 통화 형식 변환 출력
| [percent](https://angular.io/api/common/PercentPipe)   | 퍼센트 형식 변환 출력
| [decimal](https://angular.io/api/common/DecimalPipe)   | 자리수 형식 변환 출력
| [slice](https://angular.io/api/common/SlicePipe)     | 문자열 추출 출력
| [async](https://angular.io/api/common/AsyncPipe)     | 비동기 객체 출력

빌트인 파이프의 사용 예제는 아래와 같다. 자세한 사용법은 [Angular Pipe API List](https://angular.io/api?type=pipe)을 참조하기 바란다.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  template: `
    <h3>DatePipe</h3>
    <p>{{ "{{ today | date: 'y년 MM월 dd일 hh시 mm분 ss초' " }}}}</p>

    <h3>CurrencyPipe</h3>
    <!-- 한국원:통화기호표시:소숫점위 최소 1자리 소숫점아래 1~2 -->
    <p>{{ "{{ price | currency: 'KRW':true:'1.1-2' " }}}}</p>

    <h3>SlicePipe : array</h3>
    <ul>
      <li *ngFor="let i of collection | slice:1:3">{{ "{{i" }}}}</li>
    </ul>

    <h3>SlicePipe : string</h3>
    <p>{{ "{{ str | slice:0:4 " }}}}</p>

    <h3>JsonPipe</h3>
    <pre>{{ "{{ object | json " }}}}</pre>

    <h3>DecimalPipe</h3>
    <p>{{ "{{ pi | number:'3.5-5' " }}}}</p>

    <h3>PercentPipe</h3>
    <p>{{ "{{ num | percent:'4.3-5' " }}}}</p>

    <h3>UpperCasePipe</h3>
    <p>{{ "{{ str | uppercase " }}}}</p>

    <h3>LowerCasePipe</h3>
    <p>{{ "{{ str | lowercase " }}}}</p>

    <h3>AsyncPipe</h3>
    <p>{{ "{{ second | async " }}}}</p>
  `
})
export class AppComponent {
  today = new Date();
  price = 0.1234;
  collection: string[] = ['a', 'b', 'c', 'd'];
  str = 'abcdefghij';
  object: Object = { foo: 'bar', baz: 'qux', nested: { xyz: 3 } };
  pi = 3.141592;
  num = 1.3495;
  second = Observable.interval(1000).map(i => i).take(11);
}
```

커스텀 파이프에 대한 상세한 내용은 [파이프](./angular-pipe)에서 알아보도록 하자.

# Reference

* [Angular Template Syntax](https://angular.io/guide/template-syntax)
