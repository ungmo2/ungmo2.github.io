---
layout: post
title: Angular Forms - <strong>Basics</strong>
subtitle: HTML 표준 폼과 Angular 폼
categories: angular
section: angular
description: 폼(Form)은 애플리케이션에서 사용자의 데이터를 입력을 받는 인터페이스를 의미한다. 폼은 폼 데이터의 유효성 검증과 같은 효과적인 방식으로 사용자를 안내할 수 있어야 한다. HTML 표준 폼으로도 사용자의 데이터를 서버로 전송할 수 있으며 어느 정도의 유효성 검증도 가능하지만 여러모로 단점과 한계가 있기 때문에 애플리케이션 개발에 적용하기 어렵다. Angular는 HTML 표준 폼의 단점과 한계를 보완할 수 있는 템플릿 기반 폼과 리액티브 폼을 제공한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 폼이란?

폼(Form)은 애플리케이션에서 사용자의 데이터를 입력을 받는 인터페이스를 의미한다. 폼은 폼 데이터의 유효성 검증과 같은 효과적인 방식으로 사용자를 안내할 수 있어야 한다. HTML 표준 폼으로도 사용자의 데이터를 서버로 전송할 수 있으며 어느 정도의 유효성 검증도 가능하지만 여러모로 단점과 한계가 있기 때문에 애플리케이션 개발에 적용하기 어렵다. Angular는 HTML 표준 폼의 단점과 한계를 보완할 수 있는 [템플릿 기반 폼](./angular-form-template-driven-forms)과 [리액티브(모델 기반) 폼](./angular-form-reactive-forms)을 제공한다.

# 2. HTML 표준 폼

HTML의 폼을 사용하여도 어느 정도의 [유효성 검증](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)이 가능하며 폼 데이터를 서버로 전송할 수 있다. 단 HTML 표준 폼만으로는 세밀한 유효성 검증과 에러 정보 표시에 한계가 있다. HTML 표준 폼으로 회원 가입 폼을 구성하여 보자.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Signup</title>
</head>
<body>
  <form action="/signup" method="POST">
    <input type="email" name="email" placeholder="Email" pattern="^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$" required>
    <input type="password" id="password1" name="password1" placeholder="Password" pattern="^[a-zA-Z0-9]{4,10}$" required>
    <input type="password" id="password2" name="password2" placeholder="Confirm Password" pattern="^[a-zA-Z0-9]{4,10}$" required>
    <input type="submit" name="submit" value="Signup">
  </form>
  <script>
    const pw1 = document.getElementById('password1');
    const pw2 = document.getElementById('password2');

    function validatePassword() {
      if (pw1.value !== pw2.value) {
        pw2.setCustomValidity('패스워드가 일치하지 않습니다');
      } else {
        pw2.setCustomValidity('');
      }
    }

    pw1.addEventListener('change', validatePassword);
    pw2.addEventListener('change', validatePassword);
  </script>
</body>
</html>
```

<div class='result'></div>

하지만 HTML 표준 폼은 아래와 같은 단점이 있다.

1. submit 버튼이 클릭되면 서버로 폼 데이터를 전송하고 페이지를 전환한다.

2. HTML 표준 폼이 제공하는 required, pattern, max, min, maxlength, minlength, step과 같은 유효성 검증 어트리뷰트를 사용하여 유효성을 검증할 수 있다. 하지만 명확한 에러 정보를 제공하지 않으며 포커스를 옮기면 에러 정보가 사라진다. 또한 에러 메시지 팝업의 스타일도 변경하기 어렵다.

3. 세밀한 유효성 검증을 위해서는 로직을 추가하여야 하며 연관된 필드의 유효성 검증이 필요한 경우, 연관 필드 모두를 검사하여야 한다.

이와 같은 단점이 있는 HTML 표준 폼으로 애플리케이션의 요구사항을 만족시키기 어렵다.

# 3. Angular 폼

이번에는 Angular의 폼을 구성하여 보자. 하나의 입력 폼을 작성하고 사용자 입력 데이터의 유효성을 검증하는 케이스이다.

<!-- Angular는 DOM 요소에 대한 참조를 담고 있는 [템플릿 참조 변수](./angular-component-template-syntax#3-템플릿-참조-변수template-reference-variable)를 제공한다. 템플릿 참조 변수는 템플릿 내에서만 유효하며 컴포넌트 클래스에 어떠한 부수 효과(Side effect)도 주지 않는다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input #myInput type="text" (keyup.enter)="0">
    <p>{{ "{{ myInput.value " }}}}</p>
  `
})
export class AppComponent {}
```

Angular는 이벤트에 반응하여 무언가를 수행하지 않는 경우, 바인딩을 업데이트하지 않는다. 따라서 가상 이벤트 keyup.enter에 의미없는 0을 이벤트 바인딩하여 뷰가 업데이트되도록 강제한다. 하지만 이 방법은 폼 데이터를 컴포넌트 클래스로 보내 유효성 검증 등의 처리를 할 수는 없다.

또 다른 방법으로 [이벤트 데이터 바인딩](./angular-component-template-syntax#16-이벤트-바인딩event-binding)을 통해 폼 데이터를 처리할 수 있다. 사용자가 폼에 데이터를 입력하거나 버튼을 클릭하면 이벤트가 발생한다. 이벤트 바인딩을 통해 가상 이벤트 keyup.enter에 핸들러를 바인딩한다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" (keyup.enter)="checkValue($event)">
    <em>{{ "{{ checkResult " }}}}</em>
  `
})
export class AppComponent {

  checkResult: string;

  checkValue(event) {
    if (event.target.value.length > 3) {
      this.checkResult = '';
    } else {
      this.checkResult = '4자 이상 입력하세요';
    }
  }
}
```

이벤트 정보를 담고 있는 DOM 이벤트 객체 $event를 이벤트 핸들러에 전달하였다. $event 객체는 발생한 이벤트에 의해 타입이 결정되는데 타입에 상관없이 모든 이벤트 객체는 target 프로퍼티를 소유한다. 이 target 프로퍼티는 value 프로퍼티에 폼 데이터를 갖고 있다. 위 예제의 경우, 폼 데이터 이외의 이벤트 정보는 필요하지 않으므로 $event 객체 전체를 컴포넌트에 보내는 것은 불필요하다. 폼 데이터만을 컴포넌트로 보내도록 수정한다. -->

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" (keyup.enter)="checkValue($event.target.value)">
    <em>{{ "{{ checkResult " }}}}</em>
  `
})
export class AppComponent {

  checkResult: string;

  checkValue(value) {
    if (value.length > 3) {
      this.checkResult = '';
    } else {
      this.checkResult = '4자 이상 입력하세요';
    }
  }
}
```

<!-- 또는 $event 객체를 사용하지 않고 템플릿 참조 변수를 사용하여 컴포넌트에 폼 데이터를 보낼 수도 있다.

```typescript
@Component({
  selector: 'app-root',
  template: `
    <input #myInput type="text" (keyup.enter)="checkValue(myInput.value)">
    <em>{{ "{{ checkResult " }}}}</em>
  `
})
``` -->

이와 같이 템플릿 문법으로 거의 대부분의 폼을 구축할 수 있다. 그런데 만약 입력 필드가 하나가 아니라 여러개 있다면 어떻게 해야 할까? 각각의 입력 필드마다 이벤트 바인딩해야 하고 유효성 검증도 입력 필드마다 처리해야 한다. 또한 입력 필드 중에 하나라도 오류가 발생한 경우, 폼 전체의 처리를 중단시켜야 하는 등 처리가 복잡해 진다. 코드에는 중복이 발생할 것이고 복잡한 코드가 만들어져서 테스트도 힘들어 질 것이다.

위 예제와 같은 방식은 비교적 간단한 폼일 때는 유용한 방법이지만 복잡한 폼의 경우, 보다 효과적인 폼 데이터 변경 추적과 유효성 검증 및 에러 처리가 필요하게 된다.

Angular는 HTML 표준 폼의 단점과 한계를 보완하고 효과적인 폼 데이터 변경 추적과 유효성 검증 및 에러 처리를 지원하는 템플릿 기반 폼과 리액티브(모델 기반) 폼을 제공한다.

# Reference

* [Form data validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)

* [Form Validation UX in HTML and CSS](https://css-tricks.com/form-validation-ux-html-css/)
