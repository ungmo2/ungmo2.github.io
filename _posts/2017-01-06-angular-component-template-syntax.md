---
layout: post
title: Angular Component - <strong>Template Syntax</strong>
subtitle: 템플릿 문법
categories: angular
section: angular
description: 템플릿 문법은 템플릿을 작성하기 위한 Angular 고유의 확장 표기법으로 템플릿과 컴포넌트 간 데이터 공유를 위한 단방향/양방향 데이터 바인딩과 동적으로 DOM 구조, 스타일 등을 변경할 수 있는 빌트인 디렉티브 등을 지원한다. 정적인 뷰는 HTML만으로 정의할 수 있지만 컴포넌트와 연계하여 동적으로 변화하는 뷰를 정의하기 위해서 템플릿 문법을 사용한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

템플릿 문법은 템플릿을 작성하기 위한 Angular 고유의 확장 표기법으로 템플릿과 컴포넌트 간 데이터 공유를 위한 단방향/양방향 데이터 바인딩과 동적으로 DOM 구조, 스타일 등을 변경할 수 있는 빌트인 디렉티브 등을 지원한다. 정적인 뷰는 HTML만으로 정의할 수 있지만 컴포넌트와 연계하여 동적으로 변화하는 뷰를 정의하기 위해서 템플릿 문법을 사용한다.

Angular가 제공하는 템플릿 문법은 아래와 같다.

- 데이터 바인딩
  - 인터폴레이션(Interpolation)
  - 프로퍼티 바인딩(Property binding)
  - 어트리뷰트 바인딩(Attribute binding)
  - 클래스 바인딩(Class binding)
  - 스타일 바인딩(Style binding)
  - 이벤트 바인딩(Event binding)
  - 양방향 데이터 바인딩(Two-way binding)

- 빌트인 디렉티브(Built-in directive)
  - 빌트인 어트리뷰트 디렉티브(Built-in attribute directive)
    - ngClass
    - ngStyle

  - 빌트인 구조 디렉티브(Built-in structural directive)
    - ngIf
    - ngFor
    - ngSwitch

- 템플릿 참조 변수(Template reference variable)

- 템플릿 표현식 연산자(Template expression operator)

템플릿 문법의 사용에는 아래와 같은 조건이 전제된다.

| 템플릿 내 사용 금지 항목  | 비고
|---------------------|---------------------------
| script 요소          | 보안 상 문제
| 대입연산자(=, +=, -=), 증감 연산자(++, --), 비트 연산자(\|, &), 객체 생성 연산자(new) | 템플릿 표현식 내에서 데이터를 변경할 수 있는 연산은 사용을 금지한다(Unidirectional data flow 정책) 예를 들어 {{ "{{ foo=bar " }}}}는 에러를 발생시킨다.
| 전역 스코프를 갖는 빌트인 객체 | window, document, location, console 등

html, body, base 요소는 사용이 금지되지는 않지만 사용해서는 않된다. 최상위 컴포넌트인 루트 컴포넌트는 html, body 요소의 자식 요소이고 모든 컴포넌트는 루트 컴포넌트의 자식 컴포넌트이기 때문에 컴포넌트의 뷰는 언제나 html, body 요소의 자식 요소이다. 따라서 컴포넌트 템플릿에서 html, body 요소를 사용하면 html, body 요소는 중복된다. base 요소는 head 요소 내에 포함되는 요소로서 상대경로의 루트를 정의한다. Angular는 src/index.html에 base 요소를 사용하여 상대경로 루트를 정의해 두었기 때문에 컴포넌트에서 base 요소를 사용할 이유는 없다.

# 1. 데이터 바인딩

Angular는 단방향 데이터 바인딩(One-way data binding)과 양방향 데이터 바인딩(Two-way data binding)을 지원한다. 기존 웹 프로그래밍에서 사용하는 DOM 조작 방식보다 간편하게 데이터를 가져와서 뷰에 표현할 수 있다.

Angular는 아래와 같이 7가지 데이터 바인딩을 제공한다.

| 데이터 바인딩       | 데이타의 흐름          | 문법
|:-----------------|:-------------------|:--------------- 
| 인터폴레이션        | 컴포넌트 클래스 ⟹ 템플릿 | {{ "{{ expression " }}}}
| 프로퍼티 바인딩      | 컴포넌트 클래스 ⟹ 템플릿 | [property]="expression"
| 어트리뷰트 바인딩    | 컴포넌트 클래스 ⟹ 템플릿 | [attr.attribute-name]="expression"
| 클래스 바인딩       | 컴포넌트 클래스 ⟹ 템플릿 | [class.class-name]="expression"
| 스타일 바인딩       | 컴포넌트 클래스 ⟹ 템플릿 | [style.style-name]="expression"
| 이벤트 바인딩       | 컴포넌트 클래스 ⟸ 템플릿 | (event)="statement"
| 양방향 데이터 바인딩  | 컴포넌트 클래스 ⟺ 템플릿 | [(ngModel)]="variable"

## 1.1 인터폴레이션(Interpolation)

표현식을 두개의 중괄호로 열고 닫은 형식을 인터폴레이션이라 한다. 인터폴레이션은 단방향 바인딩(One-way binding)에 사용되는 템플릿 문법으로 표현식의 평가 결과를 문자열로 변환하여 템플릿에 바인딩한다.

```html
{{ "{{ expression " }}}}
```

표현식(Expression)은 값, 변수, 연산자의 조합이며 이 조합은 연산을 통해 하나의 값을 만든다. 즉 표현식은 하나의 값으로 평가될 수 있는 식이다. 템플릿에서 사용하는 표현식에는 대입연산자(=, +=, -=), 증감 연산자(++, --), 비트 연산자(\|, &), 객체 생성 연산자(new)와 같이 템플릿에서 컴포넌트 클래스의 데이터를 변경할 있는 연산은 금지된다. 이는 인터폴레이션 뿐만 아니라 템플릿에서 사용하는 모든 표현식에 적용된다.
{: .info}

프로퍼티 바인딩의 사용 예는 아래와 같다.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <p>name: {{ "{{ name " }}}}</p>
    <p>age: {{ "{{ age " }}}}</p>
    <p>admin: {{ "{{ admin " }}}}{{ admin }}</p>
    <p>address: {{ "{{ address.city " }}}} {{ "{{ address.country " }}}}</p>
    <p>gender: {{ "{{ gender " }}}}</p>
    <p>sayHi(): {{ "{{ sayHi() " }}}}</p>
    <p>age * 10: {{ "{{ age * 10 " }}}}</p>
    <p>age > 10: {{ "{{ age > 10 " }}}}</p>
    <p>'stirng': {{ "{{ 'stirng' " }}}}</p>
  `
})
export class AppComponent {
  name = 'Angular';
  age = 20;
  admin = true;
  address = {
    city: 'Seoul',
    country: 'Korea'
  };

  sayHi() {
    return `Hi! my name is ${ this.name }.`;
  }
}
```

컴포넌트 클래스의 프로퍼티가 문자열이 아닌 경우 문자열로 변환되며 존재하지 않는 프로퍼티에 접근하는 경우 에러 발생없이 아무것도 출력하지 않는다.

```
name: Angular

age: 20

admin: true

address: Seoul Korea

gender:

sayHi(): Hi! my name is Angular.

age * 10: 200

age * 10: true

'stirng': stirng
```

## 1.2 프로퍼티 바인딩(Property binding)

프로퍼티 바인딩은 컴포넌트 클래스의 데이터와 템플릿 간의 단방향 바인딩(One-way binding)에 사용되는 템플릿 문법으로 표현식의 평가 결과를 DOM 프로퍼티에 바인딩한다.

```html
<element [property]="expression">...</element>
```

DOM 프로퍼티는 HTML 요소의 어트리뷰트(Attribute)와는 다른 것이다. 브라우저는 HTML 문서를 파싱하여 DOM 트리로 변환하여 메모리에 적재한다. 이때 HTML 요소는 DOM 노드 객체로, HTML 어트리뷰트는 DOM 노드 객체의 프로퍼티로 변환된다.
{: .info}

프로퍼티 바인딩의 사용 예는 아래와 같다.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <!-- value 프로퍼티에 컴포넌트 클래스의 name 프로퍼티 바인딩 -->
    <input type="text" [value]="name">
    <!-- innerHTML 프로퍼티에 컴포넌트 클래스의 contents 프로퍼티 바인딩 -->
    <p [innerHTML]="contents"></p>
    <!-- src 프로퍼티에 컴포넌트 클래스의 imageUrl 프로퍼티 바인딩 -->
    <img [src]="imageUrl"><br>
    <!-- disabled 프로퍼티에 컴포넌트 클래스의 isUnchanged 프로퍼티 바인딩 -->
    <button [disabled]="isDisabled">disabled button</button>
  `
})
export class AppComponent {
  name = 'ungmo2';
  contents = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
  imageUrl = 'http://lorempixel.com/400/200/';
  isDisabled = true;
}
```

인터폴레이션은 템플릿의 어디에서도 사용할 수 있다. 인터폴레이션은 순수한 문자열이며 HTML 컨텐츠로 사용할 수도 있고 HTML 어트리뷰트의 값으로 사용할 수도 있다. 

```html
<p>{{ "{{ contents " }}}}</p>
<input type="text" value="{{ "{{ name " }}}}">
```

Angular는 인터폴레이션을 렌더링 이전에 프로퍼티 바인딩으로 변환한다. 사실 인터폴레이션은 프로퍼티 바인딩의 Syntatic sugar인 것이다. 위 코드는 아래의 코드와 동일하게 동작한다.

```html
<p [innerHTML]="contents"></p>
<input type="text" [value]="name">
```

<!--프로퍼티 바인딩에는 객체를 포함한 모든 값을 사용할 수 있다. DOM 노드 객체의 프로퍼티에는 객체를 포함한 모든 값을 할당할 수 있기 때문이다. 이 특성을 이용하여 부모 컴포넌트에서 자식 컴포넌트로 값을 전달하는 경우 프로퍼티 바인딩을 사용한다. 이에 대해서는 컴포넌트 간 데이터 교환에서 자세히 다룬다.-->

## 1.3 어트리뷰트 바인딩(Attribute binding)

어트리뷰트 바인딩은 컴포넌트 클래스의 데이터와 템플릿 간의 단방향 바인딩(One-way binding)에 사용되는 템플릿 문법으로 표현식의 평가 결과를 HTML 어트리뷰트에 바인딩한다.

```html
<element [attr.attribute-name]="expression">...</element>
```

앞에서 살펴본 프로퍼티 바인딩과 차이점을 이해하기 위해서 HTML 어트리뷰트(attribute)와 DOM 프로퍼티(property)에 대해서 알아보도록 하자. 어트리뷰트와 프로퍼티는 모두 속성으로 변역되어 같은 것으로 오해할 수 있으나 이들은 서로 다른 것이다. 바인딩이 동작하는 방식을 이해하기 위해서는 HTML의 어트리뷰트와 프로퍼티의 차이를 파악하는 것이 중요하다. 

DOM 프로퍼티는 HTML 요소의 어트리뷰트와는 다른 것이다. 브라우저는 HTML 문서를 파싱하여 DOM 트리로 변환하여 메모리에 적재한다. 이때 HTML 요소는 DOM 노드 객체로, HTML 어트리뷰트는 DOM 노드 객체의 프로퍼티로 변환된다. HTML 어트리뷰트의 값은 언제나 문자열이지만 DOM 프로퍼티는 객체를 비롯하여 모든 값을 가질 수 있다. 주의하여야 할 것은 어트리뷰트와 프로퍼티가 언제나 1:1로 매핑되는 것은 아니라는 것이다. 예를 들어 살펴보자.

- id 어트리뷰트와 id 프로퍼티와 1:1 매핑한다. 
- class 어트리뷰트는 classList 프로퍼티로 변환된다. 
- td 요소의 colspan 어트리뷰트의 경우 매핑하는 프로퍼티가 존재하지 않는다. 
- [textContent](https://developer.mozilla.org/ko/docs/Web/API/Node/textContent) 프로퍼티의 경우 어트리뷰트가 존재하지 않는다. 
- input 요소의 value 어트리뷰트는 value 프로퍼티와 1:1 매핑하지만 서로 다르게 동작한다.

아래의 input 요소는 3개의 어트리뷰트를 가지고 있다.

```html
<input id="user" type="text" value="ungmo2">
```

브라우저가 위의 코드를 파싱하면 DOM 노드 객체 HTMLInputElement가 생성되고 이 객체는 다양한 프로퍼티를 소유한다. input 요소의 모든 어트리뷰트는 HTMLInputElement 객체의 attributes 프로퍼티로 변환되고 getAttribute()로 취득 가능하다.

```javascript
document.getElementById('user').getAttribute('value') // ungmo2
```

id 어트리뷰트는 id 프로퍼티와 1:1 매핑하므로 DOM 노드 객체 HTMLInputElement에는 id 프로퍼티가 생성되고 id 어트리뷰트의 값 'user'가 할당된다. 하지만 value 어트리뷰트는 value 프로퍼티와 1:1 매핑하지만 서로 다르게 동작한다. DOM 노드 객체에 value 프로퍼티가 생성되고 value 어트리뷰트의 값 'ungmo2'이 할당된다. 여기까지는 1:1 매핑하는 id 어트리뷰트와 동일하지만 사용자에 의해 input 요소에 새로운 값이 입력되면 다르게 동작하기 시작한다. 만약 사용자에 의해 "lee"가 입력되면 DOM 노드 객체의 value 프로퍼티는 "lee"로 변경된다. 하지만 value 어트리뷰트는 초기값 "ungmo2"인 상태로 변경되지 않는다. 이는 HTML 요소가 DOM 노드 객체로 변환된 이후에 HTML 요소의 어트리뷰트는 변하지 않기 때문이다. 하지만 DOM 프로퍼티는 언제든지 바뀔 수 있다. 즉 어트리뷰트는 DOM 프로퍼티의 초기값을 의미하며 DOM 프로퍼티는 현재값을 의미한다. 

지금까지 알아본 DOM 프로퍼티와 HTML 어트리뷰트를 차이점을 바탕으로 아래의 코드를 Angular는 어떻게 HTML로 출력할 것인지 예측하여 보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <!-- 프로퍼티 바인딩 -->
    <input id="user" type="text" [value]="name">
    <!-- 어트리뷰트 바인딩 -->
    <input id="user" type="text" [attr.value]="name">
  `
})
export class AppComponent {
  name = 'ungmo2';
}
```

프로퍼티 바인딩은 DOM 노드 객체에 컴포넌트 클래스 프로퍼티를 바인딩하고 어트리뷰트 바인딩은 HTML 요소의 어트리뷰트에 컴포넌트 클래스 프로퍼티를 바인딩한다. 따라서 위 코드는 아래와 같이 변환될 것이다.

```html
<!-- 프로퍼티 바인딩의 변환 결과 -->
<input id="user" type="text">
<!-- 어트리뷰트 바인딩의 변환 결과(name = 'ungmo2'일때) -->
<input id="user" type="text" value="ungmo2">
```

또 다른 경우를 살펴보자. td 요소의 colspan 어트리뷰트의 경우 매핑하는 프로퍼티가 존재하지 않는다. 

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <table>
      <tr>
        <!-- colspan 프로퍼티는 존재하지 않는다. -->
        <td [colspan]="length">A + B</td>
      </tr>
      <tr>
        <td>C</td><td>D</td>
      </tr>
    </table>
  `,
  styles: [`
    table, td { 
      width: 200px;
      border: 1px solid black; 
      text-align: center;
    }
  `]
})
export class AppComponent {
  length = 2;
}
```

위 코드는 존재하지 않는 DOM 프로퍼티 colspan에 접근하려 때문에 아래와 같은 에러를 발생시킨다.

```
Unhandled Promise rejection: Template parse errors:
Can't bind to 'colspan' since it isn't a known property of 'td'.
```

이와 같이 경우, 프로퍼티 바인딩 대신 어트리뷰트 바인딩을 사용한다.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <table>
      <tr>
        <!-- colspan 프로퍼티는 존재하지 않기 때문에 어튜리뷰트 바인딩을 사용한다. -->
        <td [attr.colspan]="length">A + B</td>
      </tr>
      <tr>
        <td>C</td><td>D</td>
      </tr>
    </table>
  `,
  styles: [`
    table, td { 
      width: 200px;
      border: 1px solid black; 
      text-align: center;
    }
  `]
})
export class AppComponent {
  length = 2;
}
```

이와 같이 DOM의 프로퍼티는 HTML 요소의 어트리뷰트와는 다르게 동작하기 때문에 프로퍼티 바인딩과 어트리뷰트 바인딩은 구분되어 사용하여야 한다. 

<!--```html
<input type="text" [data-username]="name">
```

존재하지 않는 DOM 프로퍼티에 접근하면 아래와 같은 에러가 발생한다.

```
Unhandled Promise rejection: Template parse errors:
Can't bind to 'data-username' since it isn't a known property of 'input'. 
```

이와 같이 어트리뷰트 바인딩은 DOM 프로퍼티에는 존재하지 않는 어트리뷰트에 사용한다.

```html
<input type="text" [attr.data-username]="name">
```-->

## 1.4 클래스 바인딩(Class binding)

클래스 바인딩을 사용하면 HTML 클래스 어트리뷰트에 클래스를 추가 또는 삭제할 수 있다.

```html
<element [class.class-name]="booleanExpression">...</element>
<element [class]="class-name-list">...</element>
```

클래스 바인딩은 우변의 표현식을 평가한 후 HTML class 어트리뷰트를 변경한다. HTML class 어트리뷰트에 의해 이미 클래스가 지정되어 있을 때 한개의 클래스를 대상으로 하는 클래스 바인딩([class.class-name])은 HTML class 어트리뷰트를 병합(merge)하여 새로운 HTML class 어트리뷰트를 작성한다. 하지만 복수의 클래스를 대상으로 하는 클래스 바인딩([class])은 기존 HTML class 어트리뷰트를 삭제하고 새로운 HTML class 어트리뷰트를 작성한다. 사용 방법은 아래와 같다.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <!-- 조건의 의한 클래스 바인딩
         우변의 표현식이 true이면 클래스를 추가한다 -->
    <div [class.text-large]="isLarge">text-large</div>
    <!-- 조건의 의한 클래스 바인딩
         우변의 표현식이 false이면 클래스를 삭제한다 -->
    <div class="text-small color-red" [class.color-red]="isRed">text-small</div>
    <!-- 여러개의 클래스를 한번에 지정할 수 있다 -->
    <div [class]="myClasses">text-large color-red</div>
    <!-- 클래스 바인딩은 기존 클래스 어트리뷰트보다 우선한다. 
         따라서 기존 클래스 어트리뷰트는 클래스 바인딩에 의해 reset된다. 
         클래스 바인딩의 위치는 관계없다. -->
    <div class="text-small color-blue" [class]="myClasses">text-large color-red</div>
  `,
  styles: [`
    .text-small { font-size: 18px;}
    .text-large { font-size: 36px;}
    .color-blue { color: blue;}
    .color-red { color: red;}
  `]
})
export class AppComponent {
  isLarge = true;
  isRed = false;
  myClasses = 'text-large color-red';
}
```

<iframe src="http://embed.plnkr.co/4HXnLnQ4lDRJGMomcg9z/?show=preview" frameborder="0" width="100%" height="400"></iframe>

클래스 바인딩은 주로 하나의 클래스를 조건에 의해 추가 또는 삭제하는 용도로 사용한다. 여러개의 클래스를 지정할 경우에도 클래스 바인딩을 사용할 수 있으나 ngClass 디렉티브를 사용하면 좀더 세밀한 제어가 가능하다.

## 1.5 스타일 바인딩(Style binding)

스타일 바인딩을 사용하면 HTML 요소 스타일 어트리뷰트에 스타일을 지정할 수 있다.

```html
<element [style.style-property]="expression">...</element>
```

스타일 바인딩은 우변의 표현식을 평가한 후 HTML style 어트리뷰트를 변경한다. HTML style 어트리뷰트에 의해 이미 스타일이 지정되어 있을 때 스타일 바인딩은 중복되지 않은 스타일은 병합(merge)하여 그대로 사용하고 중복된 스타일은 스타일 바인딩의 스타일으로 덮어쓴다. 스타일 프로퍼티(border-radius 등)는 케밥표기법(kebab-case) 또는 카멜표기법(camelCase)을 사용한다. 사용 방법은 아래와 같다. 

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <button class="btn"
      [style.background-color]="isActive ? '#4CAF50' : '#f44336'" 
      [style.font-size.em]="isActive ? 1.2 : 1" 
      (click)="isActive=!isActive">Toggle</button>
  `,
  styles: [`
    .btn {
      background-color: #4CAF50;
      border: none;
      border-radius: 8px;
      color: white;
      padding: 10px;
      cursor: pointer;
      outline: none;
    }
  `]
})
export class AppComponent {
  isActive = false;
}
```

스타일 바인딩은 주로 하나의 인라인 스타일을 조건에 의해 추가하는 용도로 사용한다. 여러개의 인라인 스타일을 추가할 경우에는 ngStyle 디렉티브를 사용한다.

## 1.6 이벤트 바인딩(Event binding)

이벤트 바인딩은 뷰의 상태 변화(버튼 클릭, 체크박스 체크, input에 텍스트 입력 등)에 의해 이벤트가 발생하면 이벤트 핸들러를 호출하는 것을 말한다. 지금까지 살펴본 데이터 바인딩은 컴포넌트 클래스에서 템플릿으로 데이터가 이동하였지만 이벤트 바인딩은 템플릿에서 컴포넌트 클래스로 데이터가 이동한다. 

```html
<element (event)="statement">...</element>
```

간단한 예제를 살펴보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <!-- (1) -->
    <input type="text" [value]="name" (input)="onInput($event)">
    <!-- (2) -->
    <button (click)="onClick()">clear</button>
    <!-- (3) -->
    <p>name: {{ "{{ name " }}}}</p>
  `
})
export class AppComponent {
  name = '';

  onInput(event) {
    console.log(event);
    // event.target.value에는 사용자 입력 텍스트가 담겨있다.
    this.name = event.target.value;
  }

  onClick() {
    this.name = '';
  }
}
```

1. 사용자의 텍스트 입력에 의해 input 이벤트가 발생하면 이벤트 바인딩에 통하여 이벤트 핸들러 onInput을 호출한다. 이때 이벤트 정보를 담고 있는 DOM 이벤트 객체 $event를 이벤트 핸들러에 전달할 수 있다. 이벤트 핸들러 onInput은 input 이벤트를 발생시킨 input 요소(event.target)의 value 프로퍼티(사용자 입력 텍스트가 담겨있다)를 $event로 부터 추출하여 name 프로퍼티에 할당한다. name 프로퍼티는 프로퍼티 바인딩에 의해 다시 input 요소에 바인딩된다.

2. 버튼이 클릭되면 click 이벤트가 발생하고 이벤트 바인딩에 의해 이벤트 핸들러 onClick을 호출한다. onClick은 name 프로퍼티를 초기화한다.

3. name 프로퍼티는 인터폴레이션에 의해 템플릿에 바인딩된다.

이벤트 바인딩에는 input이나 click 이벤트 이외에도 다양한 웹 표준 이벤트를 사용할 수 있다. 웹 표준 이벤트는 아래의 웹사이트를 참조하기 바란다.

- [MDN 이벤트 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/Events)

<!--

버튼 클릭 이벤트에 의해 폰트 사이즈를 증감하는 예제를 살펴보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <div [style.font-size.px]="fontSize">FontSize: {{fontSize}}px</div>
    <button (click)="decrease()" title="smaller">-</button>
    <button (click)="increase()" title="bigger">+</button>
  `
})
export class AppComponent {
  fontSize = 12;

  decrease() {
    console.log('decrease');
    --this.fontSize;
  }
  increase() {
    console.log('increase');
    ++this.fontSize;
  }
}
```-->

## 1.7 양방향 데이터 바인딩(Two-way binding)

양방향 데이터 바인딩는 뷰와 컴포넌트 클래스의 상태 변화를 상호 반영하는 것을 말한다. 즉 뷰의 상태가 변화하면 컴포넌트 클래스의 상태도 변화하고 그 반대로 컴포넌트 클래스의 상태가 변화하면 뷰의 상태도 변화하는 것이다. 

```html
<element [(ngModel)]="property">...</element>
```

ngModel 디렉티브를 이벤트 바인딩(())과 프로퍼티 바인딩([]) 형식으로 기술한 후 우변에 뷰와 컴포넌트 클래스가 공유할 프로퍼티를 기술한다. ngModel 디렉티브를 사용하기 위해서는 FormsModule을 모듈에 등록하여야 한다. Angular CLI를 통해 프로젝트를 생성하였다면 아래와 같이 FormsModule이 이미 등록되어 있으므로 별도의 등록이 필요없다.

```typescript
// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

간단한 예제를 살펴보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <input type="text" [(ngModel)]="name">
    <p>name: {{ "{{ name " }}}}</p>
  `
})
export class AppComponent {
  name = '';
}
```

컴포넌트 클래스의 name 프로퍼티는 템플릿의 input 요소와 양방향으로 바인딩되어 있다. 즉 input 요소의 value 프로퍼티가 변화하면 컴포넌트 클래스의 name 프로퍼티도 동일한 값으로 변화하고 반대로 컴포넌트 클래스의 name 프로퍼티가 변화하면 input 요소의 value 프로퍼티도 동일한 값으로 변화한다.

사실 Angular는 양방향 바인딩을 지원하지 않는다. `[()]`(이것을 Banana in a box라고 부른다)에서 추측할 수 있듯이 양방향 바인딩은 이벤트 바인딩과 프로퍼티 바인딩을 축약 표현(Shorthand syntax)한 것일 뿐이다. 즉 양방향 바인딩은 문법적 편의를 위한 기능이며 실제 동작은 이벤트 바인딩과 프로퍼티 바인딩의 조합으로 이루어진다. 위 코드를 이벤트 바인딩과 프로퍼티 바인딩으로 표현하여 보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <input type="text" [value]="name" (input)="name=$event.target.value">
    <p>name: {{ "{{ name " }}}}</p>
  `
})
export class AppComponent {
  name = '';
}
```

`<input type="text" [(ngModel)]="name">`과 `<input type="text" [value]="name" (input)="name=$event.target.value">`은 정확히 동일하게 동작한다. ngModel은 이벤트 바인딩과 프로퍼티 바인딩으로 구현되는 양방향 바인딩을 간편하게 작성할 수 있도록 돕는 디렉티브로서 사용자 입력과 관련돤 DOM 요소(input, textarea, select 등의 form 요소)에서만 사용할 수 있다. ngModel을 이벤트 바인딩과 프로퍼티 바인딩으로 표현하여 보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <input [ngModel]="name" (ngModelChange)="name=$event">
    <p>name: {{ "{{ name " }}}}</p>
  `
})
export class AppComponent {
  name = '';
}
```

프로퍼티 바인딩 [ngModel]은 사용자 입력에 관련된 DOM 요소의 프로퍼티(위 예제의 경우 input 요소의 value 프로퍼티)를 업데이트한다. 그리고 이벤트 바인딩 (ngModelChange)은 이벤트를 수신하고 이벤트 핸들러를 통해 DOM의 변화를 외부에 알린다. 이때 ngModelChange는 $event에서 사용자 입력에 관련된 프로퍼티의 값(위 예제의 경우 target.value)를 내부적으로 추출하여 이벤트를 emit한다.

양방향 바인딩은 반드시 ngModel 디렉티브를 사용하여야 하는 것은 아니며 커스텀 양방향 데이터 바인딩도 작성할 수 있다. 이 방법에 대해서는 컴포넌트 간 데이터 통신을 학습한 이후 설명하도록 한다.

# 2. 빌트인 디렉티브(Built-in directive)

디렉티브(Directive 지시자)는 "DOM의 모든 것(모양이나 동작 등)을 관리하기 위한 지시(명령)"이다. HTML 요소 또는 어트리뷰트의 형태로 사용하여 디렉티브가 사용된 요소에게 무언가를 하라는 지시(directive)를 전달한다.

간단한 예제를 살펴보자. textBlue 디렉티브는 해당 요소의 텍스트 컬러를 파란색으로 변경한다.

```typescript
// src/app/text-blue.directive.ts
import { Directive, ElementRef, Renderer } from '@angular/core';
@Directive({ selector: '[textBlue]' })
export class TextBlueDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementStyle(el.nativeElement, 'color', 'blue');
  }
}
```

textBlue 디렉티브는 요소의 어트리뷰트로 사용한다.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <div textBlue>textBlue directive</div>
  `
})
export class AppComponent { }
```

<iframe src="http://embed.plnkr.co/ObCeP8OmDzYcvTdEtDBO/?show=preview" frameborder="0" width="100%" height="400"></iframe>

디렉티브는 애플리케이션 전역에서 사용할 수 있는 공통 관심사를 컴포넌트에서 분리하여 구현한 것으로 컴포넌트의 복잡도를 낮추고 가독성을 향상시킨다. 컴포넌트도 뷰를 생성하고 이벤트를 처리하는 등 DOM을 관리하기 때문에 큰 의미에서 디렉티브로 볼 수 있다.  

<!--이전 버전인 AngularJS에는 70개 이상의 디렉티브가 존재하였으나 Angular의 디렉티브는 아래와 같이 크게 4가지로 구분할 수 있다.-->

- 컴포넌트(Component)
- 어트리뷰트 디렉티브(Attribute directive)
- 구조 디렉티브(Structural directive)
- 커스텀 디렉티브(Custom directive)

이 장에서는 템플릿에 관련한 빌트인 디렉티브인 어트리뷰트 디렉티브와 구조 디렉티브에 집중하기호 한다. 커스텀 디렉티브는 다른 장에서 자세히 살펴보도록 하자.

## 2.1 빌트인 어트리뷰트 디렉티브(Built-in attribute directive)

HTML 요소의 어트리뷰트로 사용하여 해당 요소의 모양이나 동작을 제어한다.

### 2.1.1 ngClass

여러개의 CSS 클래스를 추가 또는 제거한다. 한개의 클래스를 추가 또는 제거할 때는 클래스 바인딩을 사용하는 것이 좋다.

```html
<element [ngClass]="expression">...</element>
```

ngClass 디렉티브는 우변의 표현식을 평가한 후 HTML class 어트리뷰트를 변경한다. HTML class 어트리뷰트에 의해 이미 클래스가 지정되어 있을 때 ngClass 디렉티브는 HTML class 어트리뷰트를 병합(merge)하여 새로운 HTML class 어트리뷰트를 작성한다. 사용 방법은 아래와 같다.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <ul>
      <!-- 문자열에 의한 클래스 지정  -->
      <li [ngClass]="stringCssClasses">bold blue</li>
      <!-- 배열에 의한 클래스 지정  -->
      <li [ngClass]="ArrayCssClasses">italic red</li>
      <!-- 객체에 의한 클래스 지정  -->
      <li [ngClass]="ObjectCssClasses">bold red</li>
      <!-- 컴포넌트 메서드에 의한 클래스 지정 -->
      <li [ngClass]="getCSSClasses('italic-blue')">italic blue</li>
    </ul>
  `,
  styles: [`
    .text-bold   { font-weight: bold; }
    .text-italic { font-style: italic; }
    .color-blue  { color: blue; }
    .color-red   { color: red; }
  `]
})
export class AppComponent {
  state = true;

  // 문자열 클래스 목록
  stringCssClasses = 'text-bold color-blue';
  // 배열 클래스 목록
  ArrayCssClasses = ['text-italic', 'color-red'];
  // 객체 클래스 목록
  ObjectCssClasses = {
    'text-bold': this.state,
    'text-italic': !this.state,
    'color-blue': !this.state,
    'color-red': this.state
  };

  // 클래스 목록을 반환하는 컴포넌트 메서드
  getCSSClasses(flag: string) {
    let classes;
    if (flag === 'italic-blue') {
      classes = {
        'text-bold': !this.state,
        'text-italic': this.state,
        'color-red': !this.state,
        'color-blue': this.state
      };
    } else {
      classes = {
        'text-bold': this.state,
        'text-italic': !this.state,
        'color-red': this.state,
        'color-blue': !this.state
      };
    }
    return classes;
  }
}
```

### 2.1.2 ngStyle

여러개의 HTML 인라인 스타일을 추가 또는 제거한다. 한개의 인라인 스타일을 추가 또는 제거할 때는 스타일 바인딩을 사용하는 것이 좋다.

```html
<element [ngStyle]="expression">...</element>
```

ngStyle 디렉티브는 우변의 표현식을 평가한 후 HTML style 어트리뷰트를 변경한다. HTML style 어트리뷰트에 의해 이미 스타일이 지정되어 있을 때 ngStyle 디렉티브는 HTML style 어트리뷰트를 병합(merge)하여 새로운 HTML style 어트리뷰트를 작성한다. 사용 방법은 아래와 같다.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <div>
      Width: <input type="text" [(ngModel)]="width">
      <button (click)="increaseWidth()">+</button>
      <button (click)="decreaseWidth()">-</button>
    </div>
    <div>
      Height: <input type="text" [(ngModel)]="height">
      <button (click)="increaseHeight()">+</button>
      <button (click)="decreaseHeight()">-</button>
    </div>
    <button (click)="isShow=!isShow">{{ "{{ isShow ? 'Hide' : 'Show' " }}}}</button>
    <!-- 스타일 지정  -->
    <div 
      [ngStyle]="{
        'width.px': width, 
        'height.px': height, 
        'background-color': bgColor,
        'visibility': isShow ? 'visible' : 'hidden'
      }">
    </div>
  `
})
export class AppComponent {
  width = 200;
  height = 200;
  bgColor = '#4caf50';
  isShow = true;

  increaseWidth()  { this.width  += 10; }
  decreaseWidth()  { this.width  -= 10; }
  increaseHeight() { this.height += 10; }
  decreaseHeight() { this.height -= 10; }
}
```

<iframe src="http://embed.plnkr.co/SlDSZfsOteIjuSCijD2h/?show=preview" frameborder="0" width="100%" height="400"></iframe>

## 2.2 빌트인 구조 디렉티브(Built-in structural directive)

HTML 요소의 어트리뷰트로 사용하여 DOM 요소를 반복 생성(ngFor), 조건에 의한 추가 또는 제거를 수행(ngIf, ngSwitch)하여 뷰의 구조를 변경한다. 

- 구조 디렉티브에는 `*` 접두사를 추가하며 `[]`을 사용하지 않는다.  
- 하나의 호스트 요소(디렉티브가 적용된 요소)에는 하나의 구조 디렉티브만을 사용할 수 있다.

### 2.2.1 ngIf

ngIf 디렉티브는 우변 표현식의 연산 결과가 참이면 해당 요소(호스트 요소)를 DOM에 추가하고 거짓이면 해당 요소(호스트 요소)를 DOM에서 제거한다. 우변의 표현식은 true 또는 false로 평가될 수 있는 값을 사용한다.

```html
<element *ngIf="expression">...</element>
```

버튼 클릭에 의해 요소를 show/hide하는 간단한 예제를 살펴보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <!-- ngIf에 의한 show/hide -->
    <p *ngIf="isShow">Lorem ipsum dolor sit amet</p>
    <!-- 스타일 바인딩에 의한 show/hide -->
    <p [style.display]="isShow ? 'block' : 'none'">Lorem ipsum dolor sit amet</p>
    <button (click)="isShow=!isShow">{{ "{{ isShow ? 'Hide' : 'Show' " }}}}</button>    
  `,
  styles: [`
    p { background-color: #CDDC39; }
  `]
})
export class AppComponent {
  isShow = true;
}
```

ngIf 디렉티브를 사용하지 않고 스타일 바인딩 또는 클래스 바인딩을 사용하여 요소의 표시/비표시를 구현할 수 있다. 스타일 바인딩 또는 클래스 바인딩에 의해 비표시된 요소는 브라우저에 의해 렌더링이 되지 않지만 DOM에 남아있다. ngIf 디렉티브에 의해 제거된 요소는 DOM에 남아있지 않고 완전히 제거되어 불필요한 자원의 낭비를 방지한다.

![show-hide](./img/show-hide.png)

ngIf에 의해 제거된 요소는 DOM에 남아있지 않는다.
{: .desc-img}

Angular 4부터 `ngIf else`가 추가되었다. ngIf 우변의 표현식이 참이면 호스트 요소를 DOM에 추가하고 거짓이면 else 이후에 기술한 ng-template 요소의 자식을 DOM에 추가한다.

```html
<!-- if else -->
<element *ngIf="expression; else elseBlock">Truthy condition</element>
<ng-template #elseBlock>Falsy condition</ng-template> 

<!-- if else -->
<element *ngIf="expression; then thenBlock else elseBlock"></element>
<ng-template #thenBlock>Truthy condition</ng-template> 
<ng-template #elseBlock>Falsy condition</ng-template> 

<!-- if -->
<element *ngIf="expression; then thenBlock"></element>
<ng-template #thenBlock>Truthy condition</ng-template>
```

간단한 예제를 살펴보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <div>
      <label for="one">
        <input type="radio" id="one" name="skill" [(ngModel)]="mySkill" value="HTML"> HTML
      </label>
      <label for="two">
         <input type="radio" id="two" name="skill" [(ngModel)]="mySkill" value="CSS"> CSS
      </label>
    </div>
    <div *ngIf="mySkill==='HTML'; else elseBlock">HTML</div>   
    <ng-template #elseBlock>
      <div>CSS</div> 
    </ng-template>   
  `
})
export class AppComponent {
  mySkill = 'HTML';
}
```

<iframe src="http://embed.plnkr.co/ty9JmDJ6rMFNpK7ijYUn/?show=preview" frameborder="0" width="100%" height="400"></iframe>

### 2.2.2 ngFor

ngFor 디렉티브는 컴포넌트 클래스의 컬렉션을 반복하여 호스트 요소(ngFor 디렉티브가 사용된 요소) 및 하위 요소를 DOM에 추가한다. 컬렉션은 일반적으로 배열을 사용한다.

```html
<element *ngFor="let item of items">...</element>
```

위 코드는 컴포넌트 클래스의 프로퍼티 items을 바인딩한 후 items의 갯수만큼 순회하며 개별 항목을 item에 할당한다. item(템플릿 입력 변수, template input variable)은 호스트 요소 및 하위 요소에서만 유효한 로컬 변수이다. items에 해당하는 바인딩 객체는 일반적으로 배열을 사용하지만 반드시 배열만 사용할 수 있는 것은 아니다. ES6의 [for...of](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...of)에서 사용할 수 있는 [반복 가능한(iterable) 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)라면 사용이 가능하다. 단 문자열, Map, 배열이 아닌 일반 객체는 사용할 수 없다.

인덱스를 취득할 필요가 있는 경우, 인덱스를 의미하는 index를 사용하여 변수에 인덱스를 저장할 수 있다. index 이외에도 first, last, even, odd와 같은 로컬 변수가 제공된다. 자세한 내용은 [NgFor API reference](https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html)를 참조하기 바란다.

```html
<element *ngFor="let item of items; let i=index">...</element>
```

객체의 배열을 리스트로 출력하는 예제를 살펴보자.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <ul>
      <!-- users 배열의 length만큼 반복하며 li 요소를 DOM에 추가한다 -->
      <li *ngFor="let user of users; let i=index">
        {{ "{{ i " }}}}: {{ "{{ user.name " }}}} <span *ngIf="user.admin">(admin)</span>
      </li>
    </ul>
  `
})
export class AppComponent {
  users: any[];

  constructor() {
    this.users = [
      { id: 1, name: 'Lee',  admin: true },
      { id: 2, name: 'Kim',  admin: false },
      { id: 3, name: 'Park', admin: false },
      { id: 4, name: 'Choi', admin: false },
      { id: 5, name: 'Baek', admin: true }
    ];
  }
}
```

users 배열의 length만큼 반복하며 li 요소를 DOM에 추가한다. user 변수는 users 배열의 개별요소를 일시적으로 저장하며 호스트 요소의 하위 요소인 li 요소에서만 유효한 로컬 변수이다.

ngFor 디렉티브는 컬렉션 데이터(users)가 변경되면 컬렉션과 연결된 모든 DOM 요소를 제거하고 다시 생성한다. 이는 컬렉션의 변경 사항을 추적(tracking)할 수 없기 때문이다. 때문에 크기가 매우 큰 컬렉션을 다루는 경우, 퍼포먼스 상의 문제를 발생시킬 수 있다. ngFor 디렉티브는 퍼포먼스를 향상시키기 위한 기능으로 `trackBy`를 제공한다. 

trackBy 기능을 추가하여 위 예제를 수정하여 보자. 

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <ul>
      <!-- users 배열의 length만큼 반복하며 li 요소를 DOM에 추가한다 -->
      <!-- 변경을 트랙킹을 할 수 있도록 trackBy를 추가하였다. -->
      <li *ngFor="let user of users; let i=index; trackBy: trackByUserId">
        {{ "{{ i " }}}}: {{ "{{ user.name " }}}} <span *ngIf="user.admin">(admin)</span>
        <!-- 해당 user를 제거한다 -->
        <button (click)="removeUser(user)">X</button>
      </li>
    </ul>
  `
})
export class AppComponent {
  users: any[];

  constructor() {
    this.users = [
      { id: 1, name: 'Lee',  admin: true },
      { id: 2, name: 'Kim',  admin: false },
      { id: 3, name: 'Park', admin: false },
      { id: 4, name: 'Choi', admin: false },
      { id: 5, name: 'Baek', admin: true }
    ];
  }

  // 해당 user를 제거한다. 이때 ngFor의 대상 컬렉션 users가 변경되고 ngFor는 DOM을 다시 생성한다.
  removeUser(user) {
    this.users = this.users.filter(({ id }) => id !== user.id);
  }

  // 변경 트래킹 기준을 반환한다.
  trackByUserId(index, user) {
    // user.id를 기준으로 변경을 트래킹한다.
    return user.id; // or index
  }
}
```

user 객체의 id 프로퍼티를 사용하여 변경을 트랙킹할 수 있도록 trackByUserId 메서드를 추가하였다. 이때 user 객체의 id 프로퍼티는 유니크하여야 한다. user 객체의 id 프로퍼티를 사용하지 않고 trackByUserId에 인자로 전달된 index를 사용하여도 무방하다.

X 버튼을 클릭하면 해당 user를 제거한다. 예를 들어 3번째 user인 'Park'을 제거하면 users의 변경을 DOM에 반영하여야 한다. 이때 trackBy를 사용하지 않는 경우 ngFor는 DOM을 다시 생성한다. trackBy를 사용한 경우 user.id를 기준으로 컬렉션의 변경을 트래킹하기 때문에 퍼포맨스가 향상된다. 

일반적인 경우 ngFor는 충분히 빠르기 때문에 trackBy에 의한 퍼포먼스 최적화는 기본적으로 필요하지 않다. trackBy는 퍼포먼스에 문제가 발생한 경우에만 사용한다.

<!--X 버튼을 클릭하면 해당 user를 제거한다. 예를 들어 3번째 user인 'Park'을 제거하면 users의 변경을 DOM에 반영하여야 한다. 이때 Angular는 변경을 트래킹할 수 없다.

![non-trackby](./img/non-trackby.png)
{: .w-700}

trackBy를 사용하지 않은 경우, 변경을 트래킹할 수 없다
{: .desc-img}

위의 그림과 같이 변경을 트래킹할 수 없기 때문에 Angular는 컬렉션과 연결된 모든 DOM 요소를 제거하고 다시 생성한다. 하지만 trackBy를 사용한 경우, Angular는 user 객체의 id 프로퍼티를 기준으로 아래와 같이 변경을 트랙킹한다. 

![trackby](./img/trackby.png)
{: .w-700}

trackBy를 사용한 경우, 변경 트래킹이 가능하다
{: .desc-img}

이와 같이 trackBy는 컬렉션의 변경 트래킹이 가능하기 때문에 보다 향상된 퍼포먼스를 기대할 수 있다.-->

<!--
```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let todo of todos">
        <label for="{{todo.id}}" [class.completed]="todo.completed">
          <input type="checkbox" id="{{todo.id}}" 
                 [checked]="todo.completed"
                 (change)="onChange(todo)"> {{todo.content}}
        </label>
      </li>
    </ul>
    <pre>{{todos | json}}</pre>
  `,
  styles: [`
    .completed { text-decoration: line-through; }
  `]
})
export class AppComponent {
  todos: any[];

  constructor() {
    this.todos = [
      { id: 1, content: 'HTML', completed: true },
      { id: 2, content: 'CSS', completed: false },
      { id: 3, content: 'Javascript', completed: false }
    ];
  }

  onChange(todo) {
    this.todos = this.todos.map(
      (item) => item.id === todo.id ?
      Object.assign(item, { completed: !item.completed }) : item
    );
  }
}
```
-->

### 2.2.3 ngSwitch

ngSwitch 디렉티브는 switch 조건에 따라 여러 요소 중에 하나의 요소를 선택하여 DOM에 추가한다. JavaScript의 switch문과 유사하게 동작한다.

```html
<element [ngSwitch]="expression">
  <!-- switch 조건이 'case1'인 경우 DOM애 추가 -->
  <element *ngSwitchCase="'case1'">...<element>
  <!-- switch 조건이 'case2'인 경우 DOM애 추가 -->
  <element *ngSwitchCase="'case2'">...<element>
  <!-- switch 조건과 일치하는 ngSwitchCase가 없는 경우 DOM애 추가 -->
  <element *ngSwitchDefault>...<element>
</element>
```

ngSwitch 디렉티브를 활용한 예제는 아래와 같다.

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <input type='text' [(ngModel)] ="num" placeholder="숫자를 입력하세요">
    <div [ngSwitch]="num">
      <div *ngSwitchCase="'1'">One</div>
      <div *ngSwitchCase="'2'">Two</div>
      <div *ngSwitchCase="'3'">Three</div>
      <div *ngSwitchDefault>This is Default</div>
    </div>
  `
})
export class AppComponent {
  num: string;
}
```

# 3. 템플릿 참조 변수(Template reference variable)

템플릿 참조 변수는 DOM 요소에 대한 참조를 담고 있는 변수이다. 태그 내에서 해시 기호(#)를 변수명 앞에 추가하여 템플릿 참조 변수를 선언한다. 템플릿 참조 변수는 템플릿 내에서만 유효하며 이벤트 바인딩에 의해 컴포넌트 클래스에 템플릿 참조 변수의 값을 전달될 수는 있지만 컴포넌트 클래스에는 어떠한 side effect도 없다.

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
    const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (regexr.test(email)) {
      this.result = '';
    } else {
      this.result = '이메일 주소의 형식이 유효하지 않습니다.';
    }
  };
}
```

# 4. 템플릿 표현식 연산자(Template expression operator)

## 4.1 세이프 네비게이션 연산자(Safe navigation operator)

세이프 네비게이션 연산자 `?`는 컴포넌트 클래스의 프로퍼티의 값이 null 또는 undefined인 경우 발생하는 에러를 회피하기 위해 사용한다. 

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <!-- obj가 null 또는 undefined일 때 아무것도 표시하지 않는다. -->
    {{ "{{ obj " }}}}
    <!-- ERROR TypeError: Cannot read property 'id' of undefined -->
    {{ "{{ obj.id " }}}}
    <!-- null 또는 undefined의 프로퍼티를 만나면 처리를 종료하고 에러를 발생시키지 않는다. -->
    {{ "{{ obj.id " }}}}
  `
})
export class AppComponent { }
```

## 4.2 파이프 연산자(Pipe operator)

파이프는 템플릿 내에서 값을 원하는 형식으로 변환하여 표시하는 기능이다. 

```html
{{ "{{ value | pipe " }}}}
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

Angular는 uppercase 이외에도 아래와 같은 빌트인 파이프를 지원한다. 파이프에 대한 상세한 내용은 다른 장에서 살펴볼 것이다.

| 파이프      | 의미 
|-----------|----------------
| date      | 날짜 형식 변환 출력
| uppercase | 대문자 변환 출력
| lowercase | 소문자 변환 출력
| currency  | 통화 형식 변환 출력
| percent   | 퍼센트 형식 변환 출력
| decimal   | 자리수 형식 변환 출력
| slice     | 문자열 추출 출력
| async     | 비동기 객체 출력


# Reference

* [Angular Template Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html)

* [ngFor— Not only for Arrays](https://netbasal.com/angular-2-ngfor-array-with-unique-values-6b15478d6484)

* [ES6 In Depth: 이터레이터(iterator)와 for-of 루프 구문
](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-iterators-and-the-for-of-loop/)