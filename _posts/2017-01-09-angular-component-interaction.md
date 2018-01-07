---
layout: post
title: Angular Component - <strong>Interaction</strong>
subtitle: 컴포넌트 간의 상태 공유
categories: angular
section: angular
description: Angular 애플리케이션은 컴포넌트를 중심(CBD, Component Based Development)으로 구성된다. 컴포넌트는 재사용이 용이한 구조로 분할하여 작성하며 이렇게 분할된 컴포넌트를 조립하여 가능한 중복없이 UI를 생성한다. 컴포넌트는 독립적인 존재이지만 다른 컴포넌트와 결합도를 낮게 유지하면서 다른 컴포넌트와 상태 정보를 교환할 수 있어야 한다. 분할된 컴포넌트를 조립한다는 것은 컴포넌트를 다른 컴포넌트 내부에서 사용하는 것을 말하는데 이는 컴포넌트 간에 계층(Hierarchy)적 구조가 형성될 수 있음을 의미한다. 따라서 분할된 컴포넌트를 조립하여 구성된 애플리케이션은 컴포넌트 간의 부모-자식 관계로 표현되는 계층적 트리 구조를 갖는다. 컴포넌트 간의 부모-자식 관계는 데이터와 이벤트가 왕래하는 정보 흐름의 통로가 되며 이를 통해 다른 컴포넌트와의 상태 공유가 이루어지기 때문에 컴포넌트 간의 부모-자식 관계는 Angular 애플리케이션에서 중요한 의미를 갖는다. 이 계층적 구조는 DOM 트리와 유사한 형태를 가지게 되는데 이를 컴포넌트 트리라고 한다. 컴포넌트는 계층적 트리 구조 상에서 상호 작용을 통해 동작하기 때문에 다른 컴포넌트와 상태 정보의 공유는 필수적이며 매우 중요한 의미를 갖는다. Angular는 다양한 컴포넌트 간 상태 정보 공유 방법을 제공한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 컴포넌트의 계층적 트리 구조

Angular 애플리케이션은 컴포넌트를 중심(CBD, Component Based Development)으로 구성된다. 컴포넌트는 재사용이 용이한 구조로 분할하여 작성하며 이렇게 분할된 컴포넌트를 조립하여 가능한 중복없이 UI를 생성한다. 컴포넌트는 독립적인 존재이지만 다른 컴포넌트와 결합도를 낮게 유지하면서 다른 컴포넌트와 상태 정보를 교환할 수 있어야 한다.

분할된 컴포넌트를 조립한다는 것은 컴포넌트를 다른 컴포넌트 내부에서 사용하는 것을 말하는데 이는 컴포넌트 간에 계층(Hierarchy)적 구조가 형성될 수 있음을 의미한다. 따라서 분할된 컴포넌트를 조립하여 구성된 애플리케이션은 컴포넌트 간의 부모-자식 관계로 표현되는 계층적 트리 구조를 갖는다.

컴포넌트의 계층적 트리 구조, 즉 컴포넌트 간의 부모-자식 관계는 데이터와 이벤트가 왕래하는 정보 흐름의 통로가 되며 이를 통해 다른 컴포넌트와의 상태 공유가 이루어지기 때문에 컴포넌트 간의 부모-자식 관계는 Angular 애플리케이션에서 중요한 의미를 갖는다. 이 계층적 구조는 DOM 트리와 유사한 형태를 가지게 되는데 이를 컴포넌트 트리라고 한다.

![component-interaction](./img/component-interaction.png)
{: .w-300}

컴포넌트 트리와 컴포넌트 간 상태 공유
{: .desc-img}

컴포넌트는 계층적 트리 구조 상에서 상호 작용을 통해 동작하기 때문에 다른 컴포넌트와 상태 정보의 공유는 필수적이며 매우 중요한 의미를 갖는다. Angular는 컴포넌트 간에 상태 정보를 공유할 수 있는 다양한 방법을 제공한다.

- @Input, @Output 데코레이터
- ViewChild와 ViewChildren
- [서비스 중재자 패턴](./angular-service#7-서비스-중재자-패턴service-mediator-pattern)을 구현한 상태 공유 서비스
- 상태 관리를 위한 외부 라이브러리([NgRx](https://github.com/ngrx/store), [Redux](http://redux.js.org/) 등) 사용

계층적 트리 구조에서 컴포넌트 간 상태 공유를 실습하기 위해 새로운 Angular 애플리케이션을 작성하도록 하자. 간단한 예제이므로 인라인 템플릿, 인라인 스타일을 사용하고 스펙 파일 없이 진행한다.

```bash
$ ng new component-interaction -it -is -st
```

루트 컴포넌트의 자식 컴포넌트를 추가한다.

```bash
$ cd component-interaction
$ ng g c user-list
```

생성된 프로젝트의 파일 구조는 아래와 같다.

```
component-interaction/
├── src/
│   ├── app/
│   │   ├── user-list/
│   │   │   └── user-list.component.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
...
```

`app.component.ts`와 `user-list.component.ts`는 아직 어떠한 연결고리도 없는 상태이다.

부모 컴포넌트 역할을 담당할 루트 컴포넌트 `app.component.ts`의 템플릿에 자식 컴포넌트 `user-list.component.ts`의 디렉티브(user-list.component.ts의 select 프로퍼티에 지정한 이름 'app-user-list')를 추가한다. 이것으로 `user-list.component.ts`는 `app.component.ts`의 자식 컴포넌트가 된다.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ "{{ title " }}}}</h1>
    <!-- 자식 컴포넌트 추가 -->
    <app-user-list></app-user-list>
  `,
  styles: []
})
export class AppComponent {
  title = 'app works!';
}
```

애플리케이션을 실행하고 브라우저에서 localhost:4200으로 개발용 서버에 접속하면 아래와 같은 화면이 출력된다.

```bash
$ ng serve -o
```

![component-iteraction-screenshot](./img/component-iteraction-screenshot.png)

부모 컴포넌트와 자식 컴포넌트
{: .desc-img}

이 예제는 부트스트랩을 사용할 것이다. 우선 npm을 사용하여 부트스트랩을 설치하도록 한다.

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

개발용 서버를 재실행하면 부트스트랩이 적용된다.

![component-iteraction-screenshot](./img/component-iteraction-screenshot-1.png)

부트스트랩 임포트
{: .desc-img}

# 2. 부모 컴포넌트와 자식 컴포넌트의 상태 공유

## 2.1 부모 컴포넌트에서 자식 컴포넌트로 상태 전달

### 2.1.1 @Input 데코레이터

form 요소를 가지고 있는 부모 컴포넌트의 경우, 사용자에 의해 상태(state)가 변경되면 이를 자식 컴포넌트와 공유할 필요가 있다. 이러한 경우 부모 컴포넌트는 <strong>프로퍼티 바인딩</strong>을 통해 자식 컴포넌트에게 상태 정보를 전달한다. 자식 컴포넌트는 부모 컴포넌트가 전달한 상태 정보를 <strong>@Input 데코레이터</strong>를 통해 컴포넌트 프로퍼티(입력 프로퍼티)에 바인딩한다.

![parent to child](./img/parenttochild.png)
{: .w-300}

부모 컴포넌트에서 자식 컴포넌트로 상태 전달
{: .desc-img}

이때 자식 컴포넌트는 어떤 컴포넌트가 정보를 전달하였는지는 알 필요가 없고, 단지 전달된 정보의 타입만 알 필요가 있다. 이것은 다른 컴포넌트와 결합도를 낮게 유지하면서 다른 컴포넌트와 상태 정보를 교환할 수 있다는 것을 의미한다.

부모 컴포넌트에서 자식 컴포넌트로 상태를 전달하여 보자. app.component.ts을 아래와 같이 수정한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="row">
        <form class="form-inline">
          <div class="form-group" style="margin: 30px 0">
            <label for="name">Name:</label>
            <input
              #name type="text" id="name"
              class="form-control"
              placeholder="이름을 입력하세요">
            <label for="role">Role:</label>
            <select #role id="role" class="form-control">
              <option>Administrator</option>
              <option>Developer</option>
              <option>Designer</option>
            </select>
            <button
              class="btn btn-default"
              (click)="addUser(name.value, role.value)">Add user
            </button>
          </div>
          <app-user-list [users]="users"></app-user-list>
        </form>
      </div>
    </div>
  `
})
export class AppComponent {
  // 자식 컴포넌트와 공유할 상태 정보
  users: User[];

  constructor() {
    this.users = [
      new User(1, 'Lee', 'Administrator'),
      new User(2, 'Baek', 'Developer'),
      new User(3, 'Park', 'Designer')
    ];
  }

  // 사용자 추가
  addUser(name: string, role: string): void {
    if (name && role) {
      this.users = [...this.users, { id: this.getNextId(), name, role }];
    }
  }

  // 새로운 사용자의 id를 취득
  getNextId(): number {
    return this.users.length ? Math.max(...this.users.map(({ id }) => id)) + 1 : 1;
  }
}
```

부모 컴포넌트의 프로퍼티 users를 위하여 User 모델 클래스를 추가한다. 모델 클래스는 일관성을 유지하기 위한 [인터페이스](./typescript-interface)의 역할을 수행한다.

```bash
$ ng g cl models/user.model
```

models 폴더에 user.model.ts이 생성되었다. 이 파일을 아래와 같이 수정한다. typescript에서 생성자 파라미터에 접근 제한자를 사용하면 파라미터는 암묵적으로 프로퍼티로 정의되고 생성자 내부에서 별도의 프로퍼티 초기화가 없어도 암묵적으로 초기화가 수행된다.

```typescript
// models/user.model.ts
export class User {
  constructor(public id: number, public name: string, public role: string) { }
}
```

User 모델 클래스를 컴포넌트에서 사용하기 위해서는 임포트를 하여야 한다.

```typescript
// app.component.ts
import { User } from './models/user.model';
...
```

부모 컴포넌트가 완성되었다. 예제를 보면 부모 컴포넌트(app.component.ts)는 아래와 같이 프로퍼티 바인딩을 통해 자식 컴포넌트에게 상태 정보를 전달하였다.

```html
<app-user-list [users]="users"></app-user-list>
```

자식 컴포넌트(user-list.component.ts)는 부모 컴포넌트가 전달한 상태 정보를 @Input 데코레이터를 통해 컴포넌트 프로퍼티 users에 바인딩한다. @Input 데코레이터는 '@angular/core' 모듈에 정의되어 있다.

```typescript
// user-list.component.ts
import { Component, Input } from '@angular/core';
...
export class UserListComponent {
  @Input() users: User[];
}
```

부모 컴포넌트가 전달한 users는 자식 컴포넌트의 @Input 데코레이터 바로 뒤에 있는 users 프로퍼티에 바인딩된다. 이때 부모 컴포넌트와 자식 컴포넌트는 동일한 users 객체에 대한 참조를 갖는다. 따라서 참조를 공유하고 있는 users를 어느 한쪽에서 변경하면 모두에게 변경이 반영된다.

@Input 데코레이터 바로 뒤의 프로퍼티명 users와 부모 컴포넌트에서 실행한 프로퍼티 바인딩의 프로퍼티명 users는 반드시 일치하여야 한다.

![@input-property-1](./img/@input-property-1.png)
{: .w-400}

@Input 데코레이터 바로 뒤의 프로퍼티명은 부모 컴포넌트에서 실행한 프로퍼티 바인딩의 프로퍼티명과 반드시 일치하여야 한다.
{: .desc-img}

이제 자식 컴포넌트에서 부모 컴포넌트가 전달한 상태를 접수하여 보자. 자식 컴포넌트(user-list.component.ts)를 아래와 같이 수정한다.

```typescript
// user-list.component.ts
import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users; let i=index">
          <td>{{ "{{ i " }}}}</td>
          <td>{{ "{{ user.id " }}}}</td>
          <td>{{ "{{ user.name " }}}}</td>
          <td>{{ "{{ user.role " }}}}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class UserListComponent {
  // 부모 컴포넌트가 전달한 상태 정보를 입력 프로퍼티에 바인딩한다.
  @Input() users: User[];
}
```

실행 결과는 아래와 같다.

![component-iteraction-screenshot](./img/component-iteraction-screenshot-2.png)

@Input 데코레이터를 이용한 부모 컴포넌트에서 자식 컴포넌트로 상태 전달
{: .desc-img}

<iframe src="https://stackblitz.com/edit/component-interaction-1?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

만약에 부모 컴포넌트에서 실행한 프로퍼티 바인딩의 프로퍼티명과는 다른 프로퍼티명을 자식 컴포넌트에서 사용하려면 아래와 같이 @Input 데코레이터에 프로퍼티 바인딩의 프로퍼티명을 인자로 전달하고 사용하고자 하는 프로퍼티명을 선언한다.

```typescript
export class UserListComponent {
  @Input('users') myPropName: User[];
}
```

이때 @Input 데코레이터에 전달한 문자열은 부모 컴포넌트에서 실행한 프로퍼티 바인딩의 프로퍼티명과 반드시 일치하여야 한다.

![@input-property-2](./img/@input-property-2.png)
{: .w-400}

@Input 데코레이터에 전달한 문자열은 부모 컴포넌트에서 실행한 프로퍼티 바인딩의 프로퍼티명과 반드시 일치하여야 한다.
{: .desc-img}

### 2.1.2 @Input 데코레이터와 setter를 이용한 입력 프로퍼티 조작

[setter와 getter](./es6-class#6-getter-setter)를 사용하여 부모 컴포넌트가 전달한 데이터가 자식 컴포넌트의 입력 프로퍼티에 바인딩되는 시점에 필요한 로직을 동작시킬 수 있다.

![@input-property-3](./img/@input-property-3.png)
{: .w-400}

setter를 이용한 입력 프로퍼티 조작
{: .desc-img}

지금까지 살펴본 예제에 사용자 역할(role)별로 사용자를 카운트하는 기능을 추가해 보자. user-list.component.ts를 아래와 같이 수정한다.

```typescript
// user-list.component.ts
import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users; let i=index">
          <td>{{ "{{ i " }}}}</td>
          <td>{{ "{{ user.id " }}}}</td>
          <td>{{ "{{ user.name " }}}}</td>
          <td>{{ "{{ user.role " }}}}</td>
        </tr>
      </tbody>
    </table>
    <!-- 추가 -->
    <div class="panel panel-default">
      <div class="panel-body">
        <p>Admin: {{ "{{ cntAdmin " }}}}</p>
        <p>Developer: {{ "{{ cntDeveloper " }}}}</p>
        <p>Designer: {{ "{{ cntDesigner " }}}}</p>
      </div>
    </div>
  `
})
export class UserListComponent {
  // 부모 컴포넌트가 전달한 상태 정보를 입력 프로퍼티에 바인딩한다.
  // @Input() users: User[];
  // _users는 내부에서만 사용할 private 프로퍼티이다.
  private _users: User[];

  // 역할별 사용자 카운터
  cntAdmin: number;
  cntDeveloper: number;
  cntDesigner: number;

  // 부모 컴포넌트가 전달한 정보에서 필요한 정보를 추출하여 컴포넌트 프로퍼티에 바인딩한다.
  @Input()
  set users(users: User[]) {
    if (!users) { return; }

    this.cntAdmin
      = users.filter(({role}) => role === 'Administrator').length;
    this.cntDeveloper
      = users.filter(({role}) => role === 'Developer').length;
    this.cntDesigner
      = users.filter(({role}) => role === 'Designer').length;
    this._users = users;
  }

  get users(): User[] {
    return this._users;
  }
}
```

위 예제에서 setter는 부모 컴포넌트가 전달한 데이터가 @Input 데코레이터에 의해 입력 프로퍼티로 바인딩될 때 동작한다. 단순히 데이터를 전달받아서 입력 프로퍼티에 바인딩하는 것에 그치지 않고, setter를 사용하여 부모 컴포넌트가 전달한 users에서 역할 별로 사용자를 카운트하여 컴포넌트 프로퍼티에 할당하였다. 이와 같이 부모 컴포넌트가 전달한 데이터에서 필요한 값을 추출하거나 검사 또는 변형할 때 setter는 매우 유용하다.

실행 결과는 아래와 같다.

![component-iteraction-screenshot](./img/component-iteraction-screenshot-3.png)

setter를 이용한 입력 프로퍼티 조작
{: .desc-img}

<iframe src="https://stackblitz.com/edit/component-interaction-2?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 2.2 자식 컴포넌트에서 부모 컴포넌트로 상태 전달

### 2.2.1 @Output 데코레이터와 EventEmitter

지금까지 @Input 데코레이터를 통해 부모 컴포넌트에서 자식 컴포넌트로 상태 정보를 전달하는 방법에 대해 알아보았다. 이와는 반대로 자식 컴포넌트에서 부모 컴포넌트로 상태 정보를 전달하는 방법에 대해 알아보도록 하자.

자식 컴포넌트는 <strong>@Output 데코레이터</strong>와 함께 선언된 컴포넌트 프로퍼티(출력 프로퍼티)를 EventEmitter 객체로 초기화한다. 그리고 부모 컴포넌트로 상태를 전달하기 위해 emit() 메소드를 사용하여 이벤트를 발생시키면서 상태를 전달한다. 부모 컴포넌트는 자식 컴포넌트가 전달한 상태를 <strong>이벤트 바인딩</strong>을 통해 접수한다.

![child to parent](./img/childtoparent.png)


자식 컴포넌트에서 부모 컴포넌트로 상태 전달
{: .desc-img}

이때 이벤트를 방출할 컴포넌트는 어떤 컴포넌트에 이벤트가 전달되는지 알 필요가 없다. 이것은 다른 컴포넌트와 결합도를 낮게 유지하면서 다른 컴포넌트와 상태 정보를 교환할 수 있다는 것을 의미한다.

자식 컴포넌트에서 부모 컴포넌트로 상태를 전달하여 보자. user-list.component.ts을 아래와 같이 수정한다.

```typescript
// user-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
          <!-- 추가 -->
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users; let i=index">
          <td>{{ "{{ i " }}}}</td>
          <td>{{ "{{ user.id " }}}}</td>
          <td>{{ "{{ user.name " }}}}</td>
          <td>{{ "{{ user.role " }}}}</td>
          <!-- 추가 -->
          <td>
           <button class="btn btn-danger btn-sm"
              (click)="remove.emit(user)">
              <span class="glyphicon glyphicon-remove"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="panel panel-default">
      <div class="panel-body">
        <p>Admin: {{ "{{ cntAdmin " }}}}</p>
        <p>Developer: {{ "{{ cntDeveloper " }}}}</p>
        <p>Designer: {{ "{{ cntDesigner " }}}}</p>
      </div>
    </div>
  `
})
export class UserListComponent {
  // _users는 내부에서만 사용할 private 프로퍼티이다.
  private _users: User[];

  // 역할별 사용자 카운터
  cntAdmin: number;
  cntDeveloper: number;
  cntDesigner: number;

  // 부모 컴포넌트가 전달한 정보에서 필요한 정보를 추출하여 컴포넌트 프로퍼티에 바인딩한다.
  @Input()
  set users(users: User[]) {
    if (!users) { return; }

    this.cntAdmin
      = users.filter(({role}) => role === 'Administrator').length;
    this.cntDeveloper
      = users.filter(({role}) => role === 'Developer').length;
    this.cntDesigner
      = users.filter(({role}) => role === 'Designer').length;
    this._users = users;
  }

  get users(): User[] {
    return this._users;
  }

  // 부모 컴포넌트에게 상태 정보를 전달하기 위해 출력 프로퍼티를 EventEmitter 객체로 초기화한다.
  @Output() remove = new EventEmitter<User>();
}
```

예제를 보면 부모 컴포넌트에게 상태 정보를 전달하기 위해 User 타입의 EventEmitter 객체를 생성하였다.

```typescript
@Output() remove = new EventEmitter<User>();
```

EventEmitter 객체는 커스텀 이벤트를 발생시키는 emit() 메소드를 가지고 있다. 사용자 삭제 버튼이 클릭되면 emit() 메소드를 통해 커스텀 이벤트를 발생시키고 emit() 메소드에 인자를 전달하여 부모 컴포넌트에게 상태 정보를 전달한다.

```html
<button
  class="btn btn-danger btn-sm"
  (click)="remove.emit(user)">
  <span class="glyphicon glyphicon-remove"></span>
</button>
```

이제 부모 컴포넌트에서 자식 컴포넌트가 전달한 상태 정보를 접수하여 보자. app.component.ts를 아래와 같이 수정한다.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="row">
        <form class="form-inline">
          <div class="form-group" style="margin: 30px 0">
            <label for="name">Name:</label>
            <input #name type="text" id="name" class="form-control" placeholder="이름을 입력하세요">
            <label for="role">Role:</label>
            <select #role id="role" class="form-control">
              <option>Administrator</option>
              <option>Developer</option>
              <option>Designer</option>
            </select>
            <button
              class="btn btn-default"
              (click)="addUser(name.value, role.value)">Add user
            </button>
          </div>
          <!-- 변경 -->
          <app-user-list
            [users]="users"
            (remove)="removeUser($event)">
          </app-user-list>
        </form>
      </div>
    </div>
  `
})
export class AppComponent {
  // 자식 컴포넌트와 공유할 상태 정보
  users: User[];

  constructor() {
    this.users = [
      new User(1, 'Lee', 'Administrator'),
      new User(2, 'Baek', 'Developer'),
      new User(3, 'Park', 'Designer')
    ];
  }

  // 사용자 추가
  addUser(name: string, role: string): void {
    if (name && role) {
      this.users = [...this.users, { id: this.getNextId(), name, role }];
    }
  }

  // 해당 사용자 제거
  removeUser(user: User) {
    this.users = this.users.filter(({ id }) => id !== user.id);
  }

  // 새로운 사용자의 id를 취득
  getNextId(): number {
    return this.users.length ? Math.max(...this.users.map(({ id }) => id)) + 1 : 1;
  }
}
```

부모 컴포넌트는 이벤트 바인딩을 통해 자식 컴포넌트가 발생시킨 이벤트를 접수한다.

```html
<app-user-list
  [users]="users"
  (remove)="removeUser($event)">
</app-user-list>
```

이때 자식 컴포넌트가 emit() 메소드의 인자로 전달한 상태는 $event에 들어 있다. 이벤트 핸들러를 통해 users에서 전달된 user를 삭제한다.

```typescript
removeUser(user: User) {
  this.users = this.users.filter(({ id }) => id !== user.id);
}
```

실행 결과는 아래와 같다.

![component-iteraction-screenshot](./img/component-iteraction-screenshot-4.png)

자식 컴포넌트에서 부모 컴포넌트로 상태 전달
{: .desc-img}

<iframe src="https://stackblitz.com/edit/component-interaction-3?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="650"></iframe>

# 3. Stateful 컴포넌트와 Stateless 컴포넌트

지금까지 부모 컴포넌트와 자식 컴포넌트 간의 상태 공유에 대해 알아보았다. 예제를 살펴보면 부모 컴포넌트에서 상태 변화(사용자 추가)가 발생한 경우, 부모 컴포넌트는 자신의 상태 프로퍼티 users 객체에 상태 변화를 반영하여 객체를 변경한 후 프로퍼티 바인딩을 통해 자식 컴포넌트에 상태 객체 users를 전송하였다. 하지만 자식 컴포넌트에서 상태 변화(사용자 제거)가 발생한 경우, 자식 컴포넌트는 자신이 직접 상태 프로퍼티 users 객체를 변경하지 않고 이벤트 바인딩을 통해 부모 컴포넌트에게 상태 객체 users의 변경을 위임하였다. 자식 컴포넌트가 직접 상태 객체를 변경하면 이벤트 바인딩을 통해 상태를 공유하지 않아도 될텐데 왜 이렇게 번거롭게 상태를 주고 받는 것일까?

상태 객체에 대해 조금더 자세히 생각해보자. 부모 컴포넌트와 자식 컴포넌트 모두 상태 객체 users에 대한 동일한 참조를 갖는다. 따라서 참조를 공유하고 있는 상태 객체 users를 어느 한쪽에서 변경하면 모두에게 변경이 반영되는데 이는 <strong>상태 정보의 변화를 예측</strong>하기 어렵게 만든다. 위 예제와 같이 간단한 구조를 가지고 있다면 문제가 되지 않겠지만 복잡한 계층적 구조를 갖는 애플리케이션의 경우, 컴포넌트마다 상태 객체를 마음대로 변경할 수 있다면 상태 변경을 추적하기 어렵고 의도하지 않은 상태 객체의 변경이 발생하여 문제가 될 수 있다.

![component-state](./img/component-state.png)
{: .w-400}

컴포넌트와 상태 정보
{: .desc-img}

따라서 애플리케이션의 상태 정보를 저장하고 변경할 수 있는 <strong>Stateful 컴포넌트</strong>(Smart 컴포넌트)와 상태 정보를 참조하여 화면에 출력할 뿐 직접 변경하지 않는 <strong>Stateless 컴포넌트</strong>(Dumb 컴포넌트)로 구분할 필요가 있다. 위 예제에서 부모 컴포넌트는 Stateful 컴포넌트이고 자식 컴포넌트는 Stateless 컴포넌트로 설계되었다.

Stateful 컴포넌트는 애플리케이션의 현재 상태 정보를 관리하며 필요에 따라 서버 자원에 접근할 수 있고 Stateless 컴포넌트를 사용하여 뷰를 표현한다. Stateless 컴포넌트는 인자를 받아 결과를 반환하는 순수 함수(Pure function)와 유사하게 단순히 프로퍼티 바인딩을 통해 상태 정보를 전달받아서 뷰를 렌더링하고 필요에 따라 이벤트를 방출할 뿐 그 외의 부수 효과(Side effect)는 없다. 부수 효과는 복잡성을 증가시킨다. 비순수한 Stateful 컴포넌트를 최대한 줄이는 것은 부수 효과를 최대한 억제하는 것과 같다. 이것은 디버깅을 쉽게 만든다.

# 4. 원거리 컴포넌트 간의 상태 공유

복잡한 컴포넌트 트리 구조의 애플리케이션의 경우, 부모-자식 관계를 뛰어넘어 컴포넌트 간의 상태 공유가 필요할 수 있다. 이와 같은 상황은 빈번히 발생한다. 예를 들어 아래와 같은 원거리 컴포넌트 간의 상태 공유를 살펴보자.

![complex-component](./img/complex-component.png)
{: .w-300}

원거리 컴포넌트 간의 상태 공유
{: .desc-img}

A 컴포넌트에서 변경된 상태를 C 컴포넌트에서도 공유할 필요가 있을 때, 지금까지 살펴본 프로퍼티 바인딩과 이벤트 바인딩을 통해 상태를 공유할 수 있다. 이때 상태 공유가 필요없는 B 컴포넌트까지 상태를 전달하여야 한다. 이러한 불필요한 상태 공유를 피하기 위해 상태 공유를 위한 서비스를 사용할 수 있다. 이에 대한 자세한 사항은 [서비스 중재자 패턴(Service Mediator Pattern)](./angular-service#7-서비스-중재자-패턴service-mediator-pattern)에서 살펴보도록 하자.

# Reference

* [Angular Component Interaction](https://angular.io/guide/component-interaction)

* [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

* [함수형 프로그래밍](https://ko.wikipedia.org/wiki/%ED%95%A8%EC%88%98%ED%98%95_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)
