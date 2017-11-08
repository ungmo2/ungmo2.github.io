---
layout: post
title: Angular <strong>Pipe</strong>
subtitle: 파이프
categories: angular
section: angular
description: 애플리케이션이 관리하는 데이터는 사용자가 실생활에서 익숙한 형태의 데이터가 아닌 경우가 많다. 예를 들어, Date 생성자 함수가 리턴하는 인스턴스를 문자열화하면 아래와 같다. Date 생성자 함수가 리턴한 인스턴스를 문자열화하면 사용자가 읽기 쉬운 형식은 아니다. 아마도 사용자는 "Sat Sep 23 2017 00:26:55 GMT+0900 (KST)" 형식보다는 "2017년 09월 23일 12시 26분 55초"과 같이 읽기 쉬운 형식으로 표시되기를 원할 것이다. 이때 데이터 자체를 변경하는 것은 사이드 이펙트가 있으므로 화면에 표시 형식만 변경하고 싶을 때 사용하는 것이 파이프이다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 파이프(Pipe)란?

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
    <h1>{{ "{{ today " }}}}</h1>
    <h1>{{ "{{ today | date " }}}}</h1>
    <h1>{{ "{{ today | date: 'y년 MM월 dd일 hh시 mm분 ss초' " }}}}</h1>
  `
})
export class AppComponent {
  today = new Date();
}
```

파이프를 사용한 위 컴포넌트의 출력 결과는 아래와 같다.

```
Sat Sep 23 2017 00:26:55 GMT+0900 (KST)

Sep 23, 2017

2017년 09월 23일 12시 26분 55초
```

이와 같이 파이프는 템플릿 내에서 원하는 형식으로 값을 변환하여 표시하는 기능이다. 파이프의 사용 방법은 아래와 같다.

```html
{{ "{{ value | PipeName " }}}}
<!-- parameter -->
{{ "{{ value | PipeName : customOption1 :  customOption2 " }}}}
<!-- chainning -->
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

# 2. 빌트인 파이프

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

# 3. 체이닝 파이프

여러개의 파이프를 조합하여 결과를 출력하는 것을 체이닝 파이프라 한다. 예를 들어 슬라이스 파이프와 대문자 파이프를 체이닝하여 보자.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h3>SlicePipe + UpperCasePipe</h3>
    <p>{{ "{{ name | slice:4 | uppercase " }}}}</p>
  `
})
export class AppComponent {
  name = 'Lee ung-mo';
}
```

컴포넌트의 실행하면 'UNG-MO'이 출력된다.

# 4. 커스텀 파이프

사용자가 입력한 문자열을 반전하는 커스텀 파이프를 작성하여 보자.

```typescript
// reverse.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value = ''): string {
    return value.split('').reverse().join('');
  }
}
```

파이프는 @Pipe 데코레이터로 장식된 클래스이다. @Pipe 데코레이터의 메타데이터 name 프로퍼티에 파이프의 식별자를 지정한다. 파이프 클래스는 [PipeTransform](https://angular.io/api/core/PipeTransform) 인터페이스의 transform 메소드를 구현해야 한다.

```typescript
transform(value: any, ...args: any[]): any
```

transform 메소드는 파이프의 변환 대상인 값(value)와 옵션 파라미터를 인자로 받는다. 그리고 변환된 값을 반환한다.

커스텀 파이프는 모듈의 declarations에 등록되어야 하며 빌트인 파이프와 동일한 방법으로 탬플릿에서 사용한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" [(ngModel)]="value">
    <p>{{ "{{ value | reverse " }}}}</p>
  `
})
export class AppComponent {
  value: string;
}
```

# 5. 파이프와 변화 감지(Change detection)

[변화 감지(Change detection)](./angular-component-template-basics#3-변화-감지change-detection)란 뷰와 모델의 동기화를 유지하기 위해 변화를 감지하고 이를 반영하는 것을 말한다. 즉 상태의 변화를 감지하여 뷰에 반영하는 것으로 데이터 바인딩은 변화 감지 매커니즘의 토대 위에서 수행된다.

그런데 Angular는 DOM 이벤트(click, key press, mouse move 등), Timer(setTimeout, setInterval)의 tick 이벤트, 서버와의 Ajax 통신 이후 변경 감지를 통해 데이터 바인딩 대상의 변경 사항을 찾는다. 이것은 시스템에 부하를 증가시키는 작업이다. Angular는 가능한 시스템에 부하를 최소한으로 하기 위해 파이프를 사용할 때는 보다 간단하고 빠른 변경 감지 알고리즘을 사용한다.

간단한 todo list 예제를 통해 파이프와 변화 감지에 대해 살펴보도록 하자.

```typescript
// todos.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-todos',
  template: `
    <input #todo type="text">
    <button (click)="add(todo.value)">add</button>
    <ul>
      <li *ngFor="let todo of todos" (click)="complete(todo)" [class.completed]="todo.completed">{{ "{{ todo.content " }}}}</li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `,
  styles: [`
    .completed { text-decoration: line-through; }
  `]
})
export class TodosComponent {

  todos: any[] = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'Javascript', completed: false },
    { id: 4, content: 'ES6', completed: false }
  ];

  add(content) {
    this.todos.push({
      id: this.getLastId(),
      content,
      completed: false
    });
  }

  complete(todo) {
    this.todos = this.todos.map((item) => item.id === todo.id ?
      Object.assign(item, { completed: !item.completed }) : item
    );
  }

  private getLastId(): number {
    return !this.todos.length ? 1 : Math.max(...this.todos.map(({ id }) => id)) + 1;
  }
}
```

todo list를 추가하는 add 버튼을 클릭하면 add 이벤트 핸들러가 동작하고 내부에서 todos 프로퍼티에 새로운 todo를 push한다. 이때 DOM 이벤트 이후 변화 감지에 의해 todos 프로퍼티의 상태가 템플릿으로 업데이트된다.

이제 todo list의 출력 갯수를 제한하는 limit 파이프를 작성하여 보자.

```typescript
// limit.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {
  transform(todos: any[], limit: number): any {
    return todos.filter((el, i) => i < limit);
  }
}
```

컴포넌트에 limit 파이프를 적용한다.

```typescript
// todos.component.ts
...
  <li *ngFor="let todo of (todos | limit: 10)" (click)="complete(todo)" [class.completed]="todo.completed">{{ "{{ todo.content " }}}}</li>
...
```

컴포넌트를 동작시키면 todos 프로퍼티의 상태가 템플릿으로 업데이트되지 않는 것을 확인할 수 있다. 이것은 add 메소드 내부의 push 메소드 때문이다. push 메소드는 원본 배열(이 경우 todos 프로퍼티)을 직접 변경하지만 원본 배열의 참조는 변경되지 않기 때문이다. 따라서 파이프에 의해 변화 감지가 작동하지 않는 것이다.

변화 감지가 작동하도록 하려면 todos 프로퍼티의 참조가 변경되도록 코드를 수정해야 한다.

```typescript
// todos.component.ts

// push 메소드는 원본 배열을 직접 변경하지만 원본 배열의 참조는 변경되지 않기 때문에 파이프에 의해 변화 감지되지 않는다!!
/*
this.todos.push({
  id: this.getLastId(), content, completed: false
});
*/

// 파이프에 의해 변화 감지가 작동하도록 todos 프로퍼티의 참조가 변경되도록 수정한다
this.todos = this.todos.concat({
  id: this.getLastId(), content, completed: false
});
```

이 경우, 간단한 애플리케이션이므로 todos 프로퍼티의 변경 시점은 간단히 파악할 수 있지만 복잡한 애플리케이션이라면 어디서 todos 프로퍼티가 변경되는지 파악하기 힘들 수도 있다. 또한 파이프를 위해 코드를 수정하는 것은 바람직하지 않을 수도 있다. 파이프는 템플릿에서 동작하고 상태 정보는 클래스에 존재하기 때문에 이 둘간의 독립이 보장되어야 하기 때문이다.

이를 위해 Angular는 비순수 파이프(impure pipe)를 제공한다.

# 6. 순수 파이프(pure pipe)와 비순수 파이프(impure pipe)

파이프에는 순수 파이프(pure pipe)와 비순수 파이프(impure pipe)로 분류할 수 있다. 비순수 파이프는 @Pipe 데코레이터의 메타데이터 pure 프로퍼티에 false를 지정한 것이다. limit 파이프를 비순수 파이프로 변경해보자.

```typescript
// limit.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit',
  pure: false
})
export class LimitPipe implements PipeTransform {
  transform(todos: any[], limit: number): any {
    return todos.filter((el, i) => i < limit);
  }
}
```

이제 limit 파이프를 비순수 파이프가 되었고 컴포넌트의 add 메소드 내부에서 push 메소드를 사용하여도 변화 감지가 작동한다. 하지만 비순수 파이프를 사용하면 빈번하게 파이프가 호출되어 퍼포먼스 상 좋지 않으므로 주의하여야 한다.

순수 파이프는 기본자료형의 값 또는 객체 참조가 변경과 같은 순수한 변경(pure change)만을 감지하고 순수 파이프를 실행한다. Angular는 퍼포먼스를 위해 객체 내부의 변경은 무시하여 순수 파이프를 실행하지 않는다. 따라서 퍼포먼스를 생각한다면 비순수 파이프보다 순수 파이프를 사용하는 것이 바람직하다. 또한 **반드시 필요한 경우가 아니라면 파이프보다는 컴포넌트의 프로퍼티를 사용하는 편이 유리하다.**

# Reference

* [Angular Pipe](https://angular.io/guide/pipes)

* [Angular Built-in Pipe API List](https://angular.io/api?type=pipe)

* [PipeTransform](https://angular.io/api/core/PipeTransform)
