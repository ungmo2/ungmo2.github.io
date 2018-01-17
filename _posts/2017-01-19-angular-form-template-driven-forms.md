---
layout: post
title: Angular Forms - <strong>Template-driven Forms</strong>
subtitle: 템플릿 기반 폼과 유효성 검증
categories: angular
section: angular
description: 템플릿 기반 폼은 컴포넌트 템플릿에서 디렉티브를 사용하여 폼을 구성하는 방식으로 각 필드의 형식, 유효성 검증 규칙을 모두 템플릿에서 정의한다. 비교적 간단한 폼에 사용한다. 템플릿 기반 폼은 NgForm, NgModel, NgModelGroup 디렉티브를 중심으로 동작한다. 이들을 사용하기 위해서 @angular/forms 패키지의 FormsModule을 애플리케이션 모듈에 추가한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 템플릿 기반 폼(Template-driven Forms)이란?

템플릿 기반 폼은 컴포넌트 템플릿에서 디렉티브를 사용하여 폼을 구성하는 방식으로 각 필드의 형식, 유효성 검증 규칙을 모두 템플릿에서 정의한다. 비교적 간단한 폼에 사용한다.

템플릿 기반 폼은 NgForm, NgModel, NgModelGroup 디렉티브를 중심으로 동작한다. 이들을 사용하기 위해서 @angular/forms 패키지의 FormsModule을 애플리케이션 모듈에 추가한다.

```typescript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

템플릿 기반 폼의 중심인 NgForm, NgModel, NgModelGroup 디렉티브에 대해 살펴보도록 하자.

# 2. 템플릿 기반 폼의 중심 디렉티브

## 2.1 NgForm 디렉티브

[NgForm](https://angular.io/api/forms/NgForm) 디렉티브는 폼 전체를 가리킨다. 모듈에 FormsModule을 추가하면 NgForm 디렉티브를 선언하지 않아도 모든 form 요소에 NgForm 디렉티브가 자동으로 적용되어 템플릿 기반 폼으로 동작한다

폼 요소에 자동으로 적용되는 NgForm 디렉티브의 적용을 취소하려면 form 요소에 ngNoForm을 추가한다. ngNoForm이 적용되면 HTML 표준 폼으로 동작한다.

```html
<form ngNoForm></form>
```

HTML 표준 폼은 submit 버튼을 클릭하면 폼 데이터를 서버로 전송하고 페이지를 전환하지만 NgForm 디렉티브가 적용된 템플릿 기반 폼은 submit 이벤트를 인터셉트하여 폼 데이터를 서버로 전송하고 페이지를 전환하는 기본 동작을 막는다. 따라서 템플릿 기반 폼에서는 submit 이벤트 대신 submit 이벤트의 기본 동작 방지를 보증하는 ngSubmit 이벤트를 사용한다.

```html
<form (ngSubmit)="onNgSubmit()"></form>
```

템플릿 기반 폼에도 템플릿 참조 변수를 사용할 수 있다. 참조 변수에는 ngForm을 할당하여 참조 변수가 네이티브 DOM이 아닌 FormGroup 인스턴스(NgForm 디렉티브가 생성한 인스턴스)를 가리키도록 한다.

```html
<form #f="ngForm" (ngSubmit)="onNgSubmit(f)"></form>
```

ngSubmit 이벤트를 바인딩한 이벤트 핸들러 onNgSubmit에 폼을 가리키는 템플릿 참조 변수 f를 인자로 전달하였다. 이 참조 변수 f는 폼 요소 자신을 가리키는 FormGroup 인스턴스이며 이 인스턴스에는 NgModel 디렉티브가 적용된 자식 폼 컨트롤 요소가 추가된다.

템플릿 기반 폼을 사용하여 간단한 회원 가입 폼을 작성해 보자.

```typescript
// user-form.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'user-form',
  template: `
    <form #userForm="ngForm" (ngSubmit)="onNgSubmit(userForm)">
      <input type="text" name="userid" placeholder="userid">
      <input type="password" name="password" placeholder="password">
      <input type="submit" value="submit">
    </form>
  `
})
export class UserFormComponent {
  onNgSubmit(userForm) { console.log(userForm); }
}
```

<iframe src="https://stackblitz.com/edit/template-driven-form-1?embed=1&file=app/user-form.component.ts" frameborder="0" width="100%" height="500"></iframe>

**NgForm 디렉티브는 자신이 적용된 폼 요소에 해당하는 [FormGroup](https://angular.io/api/forms/FormGroup) 인스턴스를 생성한다.** 그리고 폼 요소의 자식 요소 중에서 NgModel 디렉티브가 적용된 요소를 탐색하여 FormGroup 인스턴스에 추가한다. 그리고 NgForm 디렉티브는 FormGroup 인스턴스를 폼 요소에 바인딩하여 값이나 유효성 검증 상태를 추적할 수 있는 기능을 제공한다.

**NgModel 디렉티브는 자신이 적용된 폼 컨트롤 요소에 해당하는 [FormControl](https://angular.io/api/forms/FormControl) 인스턴스를 생성한다.** 그리고 NgModel 디렉티브는 FormControl 인스턴스를 폼 컨트롤 요소에 바인딩하여 값이나 유효성 검증 상태를 추적할 수 있다.

즉 FormGroup 인스턴스는 자신의 자식인 FormControl 인스턴스들을 그룹화하여 관리하기 위한 최상위 컨테이너로서 FormControl 인스턴스들을 하나의 객체로 그룹화하여 모든 FormControl 인스턴스의 값과 유효성 상태를 관리한다. 만약 유효성을 검증할 때 FormControl 인스턴스 중 하나라도 유효하지 않다면 FormGroup은 유효하지 않은 상태인 invalid 상태가 된다.

따라서 폼 요소를 가리키는 템플릿 참조 변수는 NgModel 디렉티브가 적용된 자식 요소에 대한 참조가 포함된다.

위 예제를 살펴보면 폼 요소의 자식 폼 컨트롤 요소 중에 NgModel 디렉티브가 적용된 요소가 없다. 따라서 폼 요소를 가리키는 참조 변수는 자식 폼 컨트롤 요소를 포함하지 않는다.

![](/img/form-no-ngmodel.png)

NgForm 디렉티브의 프로퍼티
{: .desc-img}

폼 요소의 자식 폼 컨트롤 요소에 NgModel 디렉티브를 적용하여 FormGroup 인스턴스에 의해 관리되도록 수정해 보자.

```typescript
// user-form.component.ts
@Component({
  selector: 'user-form',
  template: `
    <form #userForm="ngForm" (ngSubmit)="onNgSubmit(userForm)">
      <input type="text" name="userid" placeholder="userid" ngModel>
      <input type="password" name="password" placeholder="password" ngModel>
      <input type="submit" value="submit">
    </form>
  `
})
export class UserFormComponent {
  onNgSubmit(userForm) {
    console.log(userForm);
    console.log(userForm.value);
  }
}
```

<iframe src="https://stackblitz.com/edit/template-driven-form-2?embed=1&file=app/user-form.component.ts" frameborder="0" width="100%" height="500"></iframe>

위 컴포넌트를 실행하여 보면 아래와 같이 NgModel 디렉티브가 적용된 자식 폼 컨트롤 요소를 나타내는 FormControl 인스턴스가 NgForm 인스턴스에 추가되어 있는 것을 확인할 수 있다.

![](/img/form-ngmodel.png)

NgModel 디렉티브가 적용된 요소가 FormGroup 인스턴스에 추가되었다
{: .desc-img}

폼을 가리키는 참조 변수 userForm의 value 프로퍼티(userForm.value)를 참조하면 아래와 같은 결과를 확인할 수 있다. 폼의 userid에 “myid”, password에 “1234”를 입력한 경우이다.

```json
{
  "userid": "myid",
  "password": "1234"
}
```

이것은 폼 요소의 자식 요소 중 NgModel 디렉티브가 적용된 모든 자식 폼 컨트롤 요소의 상태를 나타낸다. 이때 키는 폼 컨트롤 요소의 name 어트리뷰트의 값이고, 값은 사용자 입력 값을 나타낸다. 따라서 **폼 컨트롤 요소에는 반드시 name 어트리뷰트를 지정하여야 한다.**

## 2.2 NgModel 디렉티브

[NgModel](https://angular.io/api/forms/NgModel) 디렉티브는 자신이 적용된 폼 컨트롤 요소에 해당하는 [FormControl](https://angular.io/api/forms/FormControl) 인스턴스를 생성한다. 그리고 NgModel 디렉티브는 FormControl 인스턴스를 폼 컨트롤 요소에 바인딩하여 값이나 유효성 검증 상태를 추적할 수 있는 기능을 제공한다. FormControl 인스턴스는 폼을 구성하는 기본 단위로서 폼 컨트롤 요소의 값이나 유효성 검증 상태를 추적하고 뷰와 폼 모델을 동기화된 상태로 유지한다.

NgModel 디렉티브는 [양방향 데이터 바인딩](./angular-component-template-syntax#17-양방향-데이터-바인딩two-way-binding)에서 사용할 때와는 달리 괄호와 할당문없이 선언한다.

```html
<form #userForm="ngForm">
  <input type="text" name="userid" ngModel>
  ...
```

위 예제의 경우, userid 폼 컨트롤 요소를 가리키는 FormControl 인스턴스에 접근하기 위해서는 폼 요소를 가리키는 템플릿 참조 변수 userForm을 사용하여 userForm.controls.userid와 같이 접근할 수 있다.

좀 더 간편하게 직접 폼 컨트롤 요소에 접근하기 위해 폼 컨트롤 요소에 템플릿 참조 변수를 사용할 수 있다.

```html
<input type="text" name="userid" ngModel #userid>
<p>value: {{ "{{ userid.value "}}}}</p>
```

이때 참조 변수 userid는 네이티브 DOM을 가리킨다. 참조 변수 userid에 ngModel을 할당하면 참조 변수 userid는 네이티브 DOM을 가리키지 않고 userid 폼 컨트롤 요소를 가리키는 FormControl 인스턴스를 가리킨다. 따라서 **참조 변수에 ngModel을 할당하면 유효성 검증 상태 추적이 가능해진다.**

```html
<input type="text" name="userid" ngModel #userid="ngModel">
<p>userid value: {{ "{{ userid.value "}}}}</p>
<p>userid valid: {{ "{{ userid.valid "}}}}</p>
```

참조 변수를 이벤트에 바인딩된 핸들러 함수에 인자로 전달하여 필요한 로직을 실행할 수 있다. 하지만 컴포넌트 클래스의 핸들러 함수가 필요한 로직을 실행한 이후, 그 결과를 다시 템플릿으로 보내야 한다면 양방향 데이터 바인딩을 사용하는 것이 보다 간편하다.

```html
<input type="text" name="userid" [(ngModel)]="user.id" #userid="ngModel">
```

<iframe src="https://stackblitz.com/edit/template-driven-form-3?embed=1&file=app/user-form.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 2.3 NgModelGroup 디렉티브

[NgModelGroup](https://angular.io/api/forms/NgModelGroup) 디렉티브는 NgForm 디렉티브와 유사하게 FormGroup 인스턴스를 생성하고 NgModelGroup 디렉티브가 적용된 폼 그룹 요소의 자식 요소 중에서 NgModel 디렉티브가 적용된 요소를 탐색하여 FormGroup 인스턴스에 추가한다.

```typescript
// user-form.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'user-form',
  template: `
    <form #userForm="ngForm" (ngSubmit)="onNgSubmit(userForm.value)">
      <input type="text" name="userid" placeholder="id" ngModel>
      <div ngModelGroup="password">
        <input type="password" name="password1" placeholder="password" ngModel>
        <input type="password" name="password2" placeholder="confirm password" ngModel>
      </div>

      <input type="submit" value="submit">
    </form>
  `
})
export class UserFormComponent {
  onNgSubmit(user) {
    console.log(user);
    if (user.password.password1 !== user.password.password2) {
      console.log('패스워드가 일치하지 않습니다!');
    }
  }
}
```

<iframe src="https://stackblitz.com/edit/template-driven-form-4?embed=1&file=app/user-form.component.ts" frameborder="0" width="100%" height="600"></iframe>

위 예제의 경우, 폼 요소는 FormGroup 인스턴스를 생성하고 자식 폼 컨트롤 요소 중에서 ngModel 디렉티브가 적용된 요소와 ngModelGroup 디렉티브가 적용된 요소가 추가된다. 이것을 그림으로 표현하면 아래와 같다.

![ngModelGroup](/img/ngmodelgroup.png)
{: .w-650}

ngModelGroup 디렉티브
{: .desc-img}

# 3. NgModel과 양방향 바인딩

양방향 데이터 바인딩는 뷰와 컴포넌트 클래스의 상태 변화를 상호 반영하는 것을 말한다. 즉 뷰의 상태가 변화하면 컴포넌트 클래스의 상태도 변화하고 그 반대로 컴포넌트 클래스의 상태가 변화하면 뷰의 상태도 변화하는 것이다.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <input [(ngModel)]="name">
    <p>name: {{ "{{ name "}}}}</p>
  `
})
export class AppComponent {
  name = '';
}
```

사실 Angular는 양방향 바인딩을 지원하지 않는다. `[()]`(이것을 Banana in a box라고 부른다)에서 추측할 수 있듯이 양방향 바인딩은 이벤트 바인딩과 프로퍼티 바인딩의 축약 표현(Shorthand syntax)일 뿐이다. 즉 양방향 바인딩의 실제 동작은 이벤트 바인딩과 프로퍼티 바인딩의 조합으로 이루어진다. 위 코드를 이벤트 바인딩과 프로퍼티 바인딩으로 표현하여 보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <input [ngModel]="name" (ngModelChange)="name=$event">
    <p>name: {{ "{{ name "}}}}</p>
  `
})
export class AppComponent {
  name = '';
}
```

이와 같이 양방향 바인딩은 ngModel 디렉티브와 ngModelChange 디렉티브 선언의 축약 표현으로 프로퍼티 바인딩과 이벤트 바인딩이 각각 처리된다. **ngModel 프로퍼티 바인딩은 컴포넌트 프로퍼티 name의 상태 변화를 수신하여 상태를 업데이트하고 ngModelChange 이벤트 바인딩은 템플릿의 상태 변화 이벤트를 발신하여 컴포넌트 프로퍼티 name의 상태를 업데이트한다.** 이때 $event의 값은 폼 컨트롤 요소의 값이다.

양방향 바인딩은 반드시 ngModel 디렉티브를 사용하여야 하는 것은 아니며 커스텀 양방향 데이터 바인딩도 작성할 수 있다. 커스템 양방향 바인딩의 간단한 예제를 작성해 보자.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <counter [(count)]="value"></counter>
    <p>Value: {{ "{{ value "}}}}</p>
  `
})
export class AppComponent {
  value = 10;
}
```

자식 컴포넌트 CounterComponent를 작성한다. 부모 컴포넌트 AppComponent는 count 프로퍼티 바인딩을 통해 자식 컴포넌트에게 상태 정보를 전달한다. 자식 컴포넌트 CounterComponent는 @Input 데코레이터를 통해 입력 프로퍼티에 전달된 상태 정보를 바인딩한다. 또한 자식 컴포넌트 CounterComponent는 @Output 데코레이터와 함께 선언된 출력 프로퍼티를 EventEmitter 객체로 초기화한다. 그리고 부모 컴포넌트로 상태를 전달하기 위해 emit() 메소드를 사용하여 이벤트를 발생시키면서 상태를 전달한다. 부모 컴포넌트는 자식 컴포넌트가 전달한 상태를 이벤트 바인딩을 통해 상태를 접수한다.

```typescript
// counter.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <button (click)="decrement()">-</button>
    <button (click)="increment()">+</button>
  `
})
export class CounterComponent {
  @Input() count: number;
  @Output() countChange = new EventEmitter();

  decrement() {
    this.count--;
    this.countChange.emit(this.count);
  }

  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
}
```

자식 컴포넌트 CounterComponent는 부모 컴포넌트 AppComponent로부터 프로퍼티 바인딩을 통해 값을 전달받는다. 자식 컴포넌트는 이 값을 증감하여 이벤트 바인딩을 통해 부모 컴포넌트로 전송한다. 이때 부모 컴포넌트는 아래의 양방향 바인딩을 통해 이 상태를 처리할 수 있다.

```html
<counter [(count)]="value"></counter>
```

위 예제의 양방향 바인딩은 아래의 축약 표현으로 정확히 동일하게 동작한다.

```html
<counter [count]="value" (countChange)="value=$event"></counter>
```

<iframe src="https://stackblitz.com/edit/custom-2way-binding?embed=1&file=app/counter.component.ts" frameborder="0" width="100%" height="600"></iframe>

# 4. 템플릿 기반 폼 유효성 검증

NgForm, NgModel, NgModelGroup 디렉티브가 폼 컨트롤 요소에 적용되면 FormGroup 또는 FormControl 인스턴스를 생성한다.

FormGroup와 FormControl는 [AbstractControl](https://angular.io/api/forms/AbstractControl)를 상속한 클래스이다. AbstractControl 클래스는 valid, invalid, pristine, dirty, touched, untouched와 같이 요소의 유효성 검증 상태를 나타내는 프로퍼티를 소유하며 모든 자식 클래스에 상속한다. 이들 유효성 검증 상태 프로퍼티의 의미를 알아보자.

| 유효성 검증 상태 프로퍼티 | 의미
|:--------------------|:-----------------
| errors              | 유효성 검증에 실패한 경우, [ValidationErrors](https://angular.io/api/forms/ValidationErrors) 타입의 에러 객체를 반환한다. 유효성 검증에 성공한 경우, null를 반환한다.
| valid               | 유효성 검증에 성공한 상태이면 true
| invalid             | 유효성 검증에 실패한 상태이면 true
| pristine            | 값을 한번도 입력하지 않은 상태이면 true
| dirty               | 값을 한번 이상 입력한 상태이면 true
| touched             | focus in이 한번 이상 발생한 상태이면 true
| untouched           | focus in이 한번도 발생하지 않은 상태이면 true

아래의 예제를 살펴보자.

```html
<input type="text"
  name="title"
  ngModel
  #title="ngModel"
  pattern="[a-zA-Z0-9]{4,10}"
  required>

<p>errors:  {{ "{{ title.errors | json " }}}}</p>
<p>invalid: {{ "{{ title.invalid " }}}}</p>
<p>dirty:   {{ "{{ title.dirty " }}}}</p>
<p>untouched: {{ "{{ title.untouched " }}}}</p>
<p>pristine: {{ "{{ title.pristine " }}}}</p>
```

<iframe src="https://stackblitz.com/edit/template-drive-form-validation?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>

input 폼 컨트롤 요소에 대하여 required와 4자리 이상 10자리 이하의 영문 대소문자와 숫자만을 허용하는 pattern을 설정하였다. 이때 사용자가 pattern에 부합하는 값을 입력하면 valid는 true가 되고 pattern에 위배되는 값을 입력하면 invalid는 true가 된다. invalid가 true인 상태라면 errors에 에러의 내용을 담고 있는 객체가 반환된다.

required가 설정되어 있으므로 값을 한번도 입력하지 않은 상태 즉 pristine이 true인 상태에도 invalid는 true이다. 이러한 경우는 에러 메시지를 표시하지 않고 focus in이 한번 이상 발생한 상태 즉 touched가 true인 상태이고 errors?.required가 null이 아니라면 사용자가 아직 값을 입력하지 않고 focus out인 상태이다. 이때 필수 입력 항목임을 사용자에게 알려 주기 위해 에러 메시지를 표시하여야 한다.

```html
<input
  type="text"
  name="title"
  ngModel
  #title="ngModel"
  pattern="[a-zA-Z0-9]{4,10}"
  required>
<em *ngIf="title.errors?.required && title.touched">
  title을 입력하세요!
</em>
```

<iframe src="https://stackblitz.com/edit/template-drive-form-validation-err-msg-1?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>

만약 focus in이 한번 이상 발생한 상태 즉 touched가 true이고 errors?.pattern이 null이 아니라면 유효성 검증 패턴을 통과하지 못한 상태이다. 이때 유효성 검증 패턴을 통과하도록 사용자에게 에러 메시지를 표시하여야 한다.

```html
<input
  type="text"
  name="title"
  ngModel
  #title="ngModel"
  pattern="[a-zA-Z0-9]{4,10}"
  required>
<em *ngIf="title.errors?.pattern && title.touched">
  title은 영문 또는 숫자로 4자리 이상 10이하로 입력하세요!
</em>
```

<iframe src="https://stackblitz.com/edit/template-drive-form-validation-err-msg-2?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="500"></iframe>

# 5. 템플릿 기반 폼 유효성 검증 실습

템플릿 기반 폼을 사용하여 회원 가입 폼을 작성해보자. 이 예제는 부트스트랩을 사용할 것이다. 우선 npm을 사용하여 부트스트랩을 설치하도록 한다.

```bash
$ npm install bootstrap
```

설치가 완료되었으면 부트스트랩을 임포트하여야 한다. 부트스트랩은 모든 컴포넌트에 적용되어야 하므로 .angular-cli.json를 아래와 같이 수정한다.

```json
{
  ...
  "apps": [
  ...
    "styles": [
      "../node_modules/bootstrap/dist/css/bootstrap.min.css",
      "styles.css"
    ],
  ...
}
```

아래와 같이 회원 가입 폼을 작성한다. 유효성 검증이 필요한 폼 컨트롤 요소에 required, pattern과 같은 빌트인 검증기(Built-in validator)를 선언한다.

```html
<!-- user-form.html -->
<div class="container">
  <h2>Template-driven forms Exam</h2>
  <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">

    <div class="form-group">
      <label for="userid">User id</label>
      <input type="text" name="userid" class="form-control"
        [(ngModel)]="user.userid"
        #userid="ngModel"
        pattern="^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$"
        required>
      <em *ngIf="userid.errors?.pattern && userid.touched" class="alert">User id는 email 형식으로 입력하세요!</em>
      <em *ngIf="userid.errors?.required && userid.touched" class="alert">User id로 사용할 email을 입력하세요!</em>
      <em>(untouched: {{ "{{ userid.untouched " }}}} | pristine: {{ "{{ userid.pristine " }}}} | invalid: {{ "{{ userid.invalid " }}}})</em>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" class="form-control"
        [(ngModel)]="user.password"
        #password="ngModel"
        pattern="[a-zA-Z0-9]{4,10}"
        required>
      <em *ngIf="password.errors?.pattern && password.touched" class="alert">
        Password는 영문 또는 숫자로 4자리 이상 10이하로 입력하세요!
      </em>
      <em *ngIf="password.errors?.required && password.touched" class="alert">
        Password를 입력하세요!
      </em>
      <em>
        (untouched: {{ "{{ password.untouched " }}}} | pristine: {{ "{{ password.pristine " }}}} | invalid: {{ "{{ password.invalid " }}}})
      </em>
    </div>

    <div class="form-group">
      <label for="role">Role</label>
      <select class="form-control" name="role"
        [(ngModel)]="user.role"
        required>
        <option *ngFor="let role of roles; let i=index;" [value]="role">
          {{ "{{ role " }}}}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="username">User name</label>
      <input type="text" name="name" class="form-control"
        [(ngModel)]="user.name">
    </div>

    <button type="submit" class="btn btn-success"
      [disabled]="userForm.invalid">Submit</button>
  </form>

  <pre>userForm.value: {{ "{{ userForm.value | json " }}}}</pre>
  <pre>userForm.valid: {{ "{{ userForm.valid " }}}}</pre>
  <pre>user: {{ "{{ user | json " }}}}</pre>
</div>
```

폼 컨트롤 요소에 required, pattern과 같은 빌트인 검증기(Built-in validator)를 선언하였고 필수 입력 항목에 대해서는 양방향 데이터 바인딩을 사용하였다. 모든 폼 컨트롤 요소가 유효성 검증에 성공한 상태(userForm.valid가 true 또는 userForm.invalid가 false)라면 submit 버튼이 활성화된다.

또한 NgForm, NgModel. NgModelGroup 디렉티브가 적용된 폼 컨트롤 요소에는 유효성 검증 상태 프로퍼티와 연동하여 ng-untouched, ng-pristine, ng-invalid 등의 CSS 클래스가 자동 적용된다. 이들 CSS 클래스를 적절히 활용하면 유효성 검증 상태에 따른 스타일링이 가능하다.

```typescript
// user-form.component.ts
import { Component, OnInit } from '@angular/core';

class User {
  constructor(
    public userid: string,
    public password: string,
    public role: string,
    public name?: string
  ) {}
}

@Component({
  selector: 'user-form',
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserFormComponent implements OnInit {
  user: User;
  roles: string[];

  ngOnInit() {
    this.roles = ['Admin', 'Developer', 'Guest'];
    this.initUser();
  }

  onSubmit(userForm) {
    console.log('Send user to server: ', this.user);
    this.initUser();
    // userForm.reset();
  }

  initUser() {
    this.user = new User('', '', this.roles[0]);
  }
}
```

<iframe src="https://stackblitz.com/edit/template-driven-form-exam?embed=1&file=app/user-form.html" frameborder="0" width="100%" height="800"></iframe>

템플릿 기반 폼은 작성이 간편하고 템플릿 내에서 유효성 검증 결과를 쉽게 확인 할 수 있는 장점이 있다. 하지만 폼이 커지면 마크업과 pattern 등의 유효성 검증 코드가 뒤섞여 복잡해 지고 가독성이 떨어질 수 있다. 또한 유효성 검증 로직에 중복이 발생할 우려가 커지고 세밀한 유효성 검증이 곤란할 수도 있다. 비교적 간단한 폼에는 템플릿 기반 폼이 유용하지만 복잡한 폼에는 모델 기반 폼(리액티브 폼)을 사용하는 것이 효과적이다.

# Reference

* [NgForm](https://angular.io/api/forms/NgForm)

* [FormGroup](https://angular.io/api/forms/FormGroup)

* [NgModel](https://angular.io/api/forms/NgModel)

* [FormControl](https://angular.io/api/forms/FormControl)

* [NgModelGroup](https://angular.io/api/forms/NgModelGroup)

* [AbstractControl](https://angular.io/api/forms/AbstractControl)
