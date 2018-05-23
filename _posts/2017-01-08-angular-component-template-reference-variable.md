---
layout: post
title: Angular Component - <strong>Template reference variable & Safe navigation operator</strong>
subtitle: 템플릿 참조 변수와 세이프 내비게이션 연산자
categories: angular
section: angular
description: 템플릿 참조 변수는 DOM 요소에 대한 참조를 담고 있는 변수이다. 템플릿의 요소 내에서 해시 기호(#)를 변수명 앞에 추가하여 템플릿 참조 변수를 선언하면 템플릿 참조 변수에 해당 요소에 대한 참조가 할당되고 템플릿 내의 자바스크립트 코드에서는 해시 기호 없이 참조한다. 템플릿 참조 변수는 템플릿 내에서만 유효하며 컴포넌트 클래스에 어떠한 부수 효과(side effect)도 주지 않는다. 하지만 템플릿 참조 변수의 값을 이벤트 바인딩을 통해 컴포넌트 클래스로 전달할 수는 있다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 템플릿 참조 변수(Template reference variable)

템플릿 참조 변수는 DOM 요소에 대한 참조를 담고 있는 변수이다. 템플릿의 요소 내에서 해시 기호(#)를 변수명 앞에 추가하여 템플릿 참조 변수를 선언하면 템플릿 참조 변수에 해당 요소에 대한 참조가 할당되고 템플릿 내의 자바스크립트 코드에서는 해시 기호 없이 참조한다. 템플릿 참조 변수는 템플릿 내에서만 유효하며 컴포넌트 클래스에 어떠한 부수 효과(side effect)도 주지 않는다. 하지만 템플릿 참조 변수의 값을 이벤트 바인딩을 통해 컴포넌트 클래스로 전달할 수는 있다.

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

<iframe src="https://stackblitz.com/edit/template-reference-variable?ctl=1&embed=1&hideNavigation=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

# 2. 세이프 내비게이션 연산자(Safe navigation operator)

세이프 내비게이션 연산자 `?`는 컴포넌트 클래스의 프로퍼티 값이 null 또는 undefined일 때 발생하는 에러를 회피하기 위해 사용한다. 프로퍼티 값이 null이거나 undefined인 경우, 또는 선언되어 있지 않은 프로퍼티를 인터폴레이션할 때, 에러 없이 아무 것도 표시하지 않는다. 하지만 선언되어 있지 않은 객체 프로퍼티의 프로퍼티를 참조할 때는 TypeError가 발생한다. 세이프 내비게이션 연산자는 null 또는 undefined인 프로퍼티를 만나면 처리를 종료하고 에러를 발생시키지 않는다.

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

<iframe src="https://stackblitz.com/edit/safe-navigation-operator?ctl=1&embed=1&hideNavigation=1&file=app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>

# Reference

* [Angular Template Syntax](https://angular.io/guide/template-syntax)
