---
layout: post
title: Angular <strong>Router state & Guard</strong>
subtitle: 라우터 상태 전달, 자식 라우트, 가드
categories: angular
section: angular
description: 화면 전환시에 라우트 파라미터(Route Parameter)를 사용하여 컴포넌트에 데이터를 전달하는 방법에 대해 살펴보도록 하자. RouterLink 디렉티브는 자신의 값을 라우터에 전달하고 라우터는 이를 전달받아 해당 컴포넌트를 활성화하여 뷰를 출력한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 라우터 상태(Router state) 전달

## 1.1 라우트 파라미터(Route Parameter) 전달

화면 전환시에 라우트 파라미터(Route Parameter)를 사용하여 컴포넌트에 데이터를 전달하는 방법에 대해 살펴보도록 하자.

RouterLink 디렉티브는 자신의 값을 라우터에 전달하고 라우터는 이를 전달받아 해당 컴포넌트를 활성화하여 뷰를 출력한다.

```html
<a routerLink="/todo">...</a>
```

이때 라우트 파라미터를 컴포넌트에 전달할 수 있다. 예를 들어 URL 패스가 'todo/:id'인 경우, URL 패스의 두번째 세그먼트 :id는 라우터 파라미터이며 컴포넌트에게 전달되는 값을 할당한다. 예를 들어 ‘/todos/10’과 같이 값을 할당하면 컴포넌트에게 id값으로 10이 전달된다.

```typescript
// app.module.ts
const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'todo/:id', component: TodoDetailComponent }
];
```

라우터 파라미터의 값은 RouterLink 디렉티브에 URL 패스의 세그먼트로 구성된 배열을 할당한다. 배열의 첫번째 요소는 URL 패스의 첫번째 세그먼트이며 두번째 요소가 URL 패스의 두번째 세그먼트인 라우터 파라미터의 값이다. 이 값은 컴포넌트로 전달된다.

```html
<a [routerLink]="['todo', todo.id]">...</a>
```

navigate 메소드를 사용할 경우, 아래와 같이 URL 패스의 세그먼트로 구성된 배열을 인수로 전달한다.

```typescript
this.router.navigate(['todo', todo.id]);
```

`<router-oulet>` 영역에 렌더링된 컴포넌트 다시 말해 활성화된 컴포넌트는 [ActivatedRoute](https://angular.io/api/router/ActivatedRoute) 객체를 통해 라우터 상태(Router state)에 접근할 수 있다. 즉 ActivatedRoute 객체는 다양한 라우터 상태를 가지며 이 중에서 라우트 파라미터를 추출할 수 있다. ActivatedRoute는 아래와 같은 프로퍼티를 제공한다.

```typescript
interface ActivatedRoute {
  snapshot: ActivatedRouteSnapshot
  url: Observable<UrlSegment[]>
  params: Observable<Params>
  queryParams: Observable<Params>
  fragment: Observable<string>
  data: Observable<Data>
  outlet: string
  component: Type<any>|string|null
  ...
}
```

<!-- | 프로퍼티        | 내용
|:--------------|:-------------------------------------
| url           | 라우트 패스의 각 세그먼트들로 구성된 문자열의 배열을 포함하는 옵저버블이다.
| data          | 라우트 구성에 설정한 데이터 객체를 포함하는 옵저버블이다.
| paramMap      | 라우터에 전달된 라우트 파라미터의 맵을 포함하는 옵저버블이다.
| queryParamMap | 모든 라우트가 공유하는 쿼리 파라미터의 맴을 포함하는 옵저버블이다.
| fragment      | 옵저버블이다.

An Observable of the URL fragment available to all routes.
| outlet        | The name of the RouterOutlet used to render the route. For an unnamed outlet, the outlet name is primary.
| routeConfig   | The route configuration used for the route that contains the origin path.
| parent        | The route's parent ActivatedRoute when this route is a child route.
| firstChild    | Contains the first ActivatedRoute in the list of this route's child routes.
| children      | Contains all the child routes activated under the current route. -->

ActivatedRoute 객체의 인스턴스는 의존성 주입을 통해 컴포넌트로 주입받는다.

```typescript
// todo-detail.component.ts
import { ActivatedRoute } from '@angular/router';
...
export class TodoDetailComponent {
  // ActivatedRoute 객체의 인스턴스를 의존성 주입을 통해 주입받는다.
  constructor(private route: ActivatedRoute) { }
```

라우트 파라미터의 값을 취득할 때는 ActivatedRoute의 paramMap 프로퍼티를 사용한다. paramMap 프로퍼티는 라우터에 전달된 라우트 파라미터의 맵을 포함하는 옵저버블이다.

Angular는 URL 패스가 변경되었지만 활성화 대상 컴포넌트가 변경되지 않는 경우, 만약 활성화 대상 컴포넌트가 존재하면 다시 생성하지 않고 재사용한다. 따라서 컴포넌트가 소멸되지 않은 상태에서 라우터 파라미터만 변경된 라우터 상태를 연속으로 수신할 수 있기 때문에 paramMap을 옵저버블로 제공한다. paramMap의 get 메소드에 라우트 파라미터의 키값을 인자로 전달하여 라우트 파라미터의 값을 취득한다.

```typescript
// todo-detail.component.ts
...
export class TodoDetailComponent implements OnInit {

  todoId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // 라우트 파라미터 값의 취득
    this.route.paramMap
      .subscribe(params => this.todoId = +params.get('id'));
  }
}
```

옵저버블 스트림이 아닌 특정 시점의 상태만을 조회하는 경우, ActivatedRoute의 snapshot 프로퍼티를 사용할 수 있다. snapshot 프로퍼티는 옵저버블로 래핑되지 않은 paramMap 객체를 반환한다.

```typescript
ngOnInit() {
  this.todoId = +this.route.snapshot.paramMap.get('id');
}
```

<iframe src="https://stackblitz.com/edit/route-parameter-exam?embed=1&file=app/todos/todo-detail.component.ts" frameborder="0" width="100%" height="600"></iframe>

## 1.2 라우트 정적 데이터(Route static data) 전달

Route 인터페이스의 data 프로퍼티는 컴포넌트로 전송할 라우트 정적 데이터로서 일반적으로 애플리케이션 운영에 필요한 데이터를 전달할 때 사용한다.

```typescript
const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
    data: { title: 'Todos', sidebar: true } /* 라우트 정적 데이터 */
  }
];
```

활성화된 컴포넌트는 [ActivatedRoute](https://angular.io/api/router/ActivatedRoute) 객체를 통해 라우터 상태(Router state)에 접근할 수 있다.

```typescript
// todo-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

interface config {
  title: string;
  sidebar: boolean
}

@Component({
  selector: 'app-todo-detail',
  template: `
    <p>todo detail</p>
    <p>todo id : {{ "{{ todoId " }}}}</p>
    <p>data : {{ "{{ data | json " }}}}</p>
    <p>title : {{ "{{ data.title " }}}}</p>
    <p>sidebar : {{ "{{ data.sidebar ? 'show' : 'hidden' " }}}}</p>
    <a routerLink="/">Back to Todos</a>
  `
})
export class TodoDetailComponent implements OnInit {

  todoId: number;
  data: config;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // route parameter 취득
    this.todoId = +this.route.snapshot.paramMap.get('id');

    // static data 취득
    this.data = this.route.snapshot.data as config;
    this.data.title = this.route.snapshot.data.title;
    this.data.sidebar = this.route.snapshot.data.sidebar;
  }
}
```

<iframe src="https://stackblitz.com/edit/route-static-data-exam?embed=1&file=app/todos/todo-detail.component.ts" frameborder="0" width="100%" height="600"></iframe>

# 2. 자식 라우트(Child Route)

지금까지는 루트 컴포넌트에 하나의 `<router-oultet>`을 가진 예제만을 살펴보았다. 자식 컴포넌트도 루트 컴포넌트의 `<router-oultet>`와는 별도로 자신의 자식 컴포넌트를 위한 `<router-oultet>`을 가질 수 있다. 예를 들어 아래의 그림을 살펴보자.

![Child Route](img/child-route.png)
{: .w-700}

자식 라우트
{: .desc-img}

위 그림의 경우, 루트 컴포넌트의 `<router-oultet>`에는 UserComponent 또는 CustomerComponent가 표시된다. 이때 UserComponent와 CustomerComponent는 자신의 `<router-oultet>`을 가지고 있으며 이 영역에는 자식 라우트 구성의 children 프로퍼티에 선언한 컴포넌트가 표시된다. 이와 같은 관계를 구성한 라우트는 아래와 같다.

```typescript
const routes: Routes = [
  /* ① */
  { path: '', redirectTo: '/user',  pathMatch: 'full' },
  /* ② */
  {
    path: 'user',
    component: UserComponent,
    children: [
      /* UserComponent의 <router-oultet>에 표시 */
      { path: ':id', component: UserDetailComponent }
    ]
  },
  /* ③ */
  {
    path: 'customer',
    component: CustomerComponent,
    children: [
      /* CustomerComponent의 <router-oultet>에 표시 */
      { path: ':id', component: CustomerDetailComponent }
    ]
  }
];
```

위 라우트 구성의 ①, ②, ③은 모두 루트 컴포넌트의 `<router-oultet>` 영역을 위한 것이다. 즉 루트 컴포넌트의 `<router-oultet>` 영역에는 UserComponent 또는 CustomerComponent이 표시된다.

**children 프로퍼티는 자식 라우트를 구성할 때 사용한다.** 라우트 구성의 component 프로퍼티에 선언된 컴포넌트(②의 경우, UserComponent)는 children 프로퍼티에 선언된 컴포넌트들(②의 경우, UserDetailComponent)의 부모 컴포넌트이다. 부모 컴포넌트는 루트 컴포넌트와는 별도의 `<router-oultet>`을 가지며 자식 컴포넌트는 부모 컴포넌트의 `<router-oultet>` 영역에 표시된다.

라우트 구성 ②의 의미는 아래와 같다.

- UserComponent는 부모 컴포넌트 AppComponent의 `<router-oultet>` 영역에 표시한다.
- UserDetailComponent는 부모 컴포넌트 UserComponent의 `<router-oultet>` 영역에 표시한다.

라우트 구성 ③의 의미는 아래와 같다.

- CustomerComponent는 부모 컴포넌트 AppComponent의 `<router-oultet>` 영역에 표시한다.
- CustomerDetailComponent는 부모 컴포넌트 CustomerComponent의 `<router-oultet>` 영역에 표시한다.

<!-- const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
        children: [
          { path: ':id', component: UserDetailComponent }
        ]
      },
      {
        path: 'customer',
        component: CustomerComponent,
        children: [
          { path: ':id', component: CustomerDetailComponent }
        ]
      }
    ]
  }
]; -->

<iframe src="https://stackblitz.com/edit/child-routing-1module?embed=1&file=app/app.module.ts" frameborder="0" width="100%" height="600"></iframe>

# 3. 라우트 가드(Route Guard)

라우트 가드는 라우터를 통한 접근을 제어하는 방법이다. 뷰로 들어갈 때 또는 빠져나갈 때 실행할 로직을 정의하기 위해 사용한다. 예를 들어 사용자 인증을 하지 않은 사용자의 접근을 제어하거나 다른 뷰로 이동하기 이전에 저장하지 않은 사용자 입력 정보가 있다면 사용자에게 알릴 수 있다.

Angular는 가드를 위한 5개의 인터페이스를 제공한다.

## 3.1 CanActivate

CanActivate 가드는 라우트를 활성화할 수 있는지 결정한다. 주로 뷰로의 접근 권한을 체크하고 접근을 제어할 때 사용한다.

[CanActivate](https://angular.io/api/router/CanActivate) 인터페이스를 구현하여 가드 클래스를 정의한다. 이때 CanActivate.canActivate 메소드는 접근 권한 체크 로직을 수행하고 true 또는 false를 반환한다.

```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  checkAuth(): boolean {
    // 잠정 처리: 인증된 사용자인지 체크
    const isAuth = Math.random() < 0.5;
    isAuth ? alert('인증된 사용자') : alert('인증되지 않은 사용자')
    return isAuth;
  }

  canActivate() {
    // 접근 권한 체크 로직을 수행하고 true 또는 false를 반환한다.
    return this.checkAuth();
  }
}
```

위 가드는 모듈에 등록되어야 한다. 이제 라우트 구성에 canActivate 프로퍼티로 가드를 선언하여 접근을 제어한다.

```typescript
...
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard], /* 가드에 의한 접근 제한 */
    children: [
      { path: ':id', component: UserDetailComponent }
    ]
  },
...
```

## 3.2 CanActivateChild

CanActivateChild 가드는 자식 라우트를 활성화할 수 있는지 결정한다. 주로 뷰로의 접근 권한을 체크하고 접근을 제어할 때 사용한다.

[CanActivateChild](https://angular.io/api/router/CanActivateChild) 인터페이스를 구현하여 가드 클래스를 정의한다. 이때 CanActivateChild.canActivateChild 메소드는 접근 권한 체크 로직을 수행하고 true 또는 false를 반환한다.

```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';

@Injectable()
export class AuthChildGuard implements CanActivateChild {

  checkAuth(): boolean {
    // 잠정 처리: 인증된 사용자인지 체크
    const isAuth = Math.random() < 0.5;
    isAuth ? alert('인증된 사용자') : alert('인증되지 않은 사용자')
    return isAuth;
  }

  canActivateChild() {
    // 접근 권한 체크 로직을 수행하고 true 또는 false를 반환한다.
    return this.checkAuth();
  }
}
```

위 가드는 모듈에 등록되어야 한다. 이제 라우트 구성에 canActivateChild 프로퍼티로 가드를 선언하여 접근을 제어한다.

```typescript
...
  {
    path: 'customer',
    component: CustomerComponent,
    canActivateChild: [AuthChildGuard], /* 가드에 의한 접근 제한 */
    children: [
      { path: ':id', component: CustomerDetailComponent }
    ]
  },
...
```

<iframe src="https://stackblitz.com/edit/route-guard?embed=1&file=app/guard/auth.guard.ts" frameborder="0" width="100%" height="600"></iframe>

## 3.3 CanLoad

CanLoad 가드는 모듈이 로드되기 이전에 최상위 라우트를 활성화할 수 있는지 결정한다.

[CanLoad](https://angular.io/api/router/CanLoad) 인터페이스를 구현하여 가드 클래스를 정의한다. 이때 CanLoad.canLoad 메소드는 접근 권한 체크 로직을 수행하고 true 또는 false를 반환한다.

애플리케이션이 처음 실행될 때 모든 모듈을 미리 컴파일하지 않고 호출 시점에 컴파일 하는 지연 로딩(Lazy Loading)을 사용하는 경우, CanLoad 가드는 접근 권한이 없는 모듈을 컴파일 하지 않는다.

## 3.4 Resolve

Resolve 가드는 각 라우트의 뷰가 렌더링되기 이전에 뷰가 렌더링되기 위해 반드시 필요한 데이터를 로딩할 때 사용한다.

[Resolve](https://angular.io/api/router/Resolve) 인터페이스를 구현하여 가드 클래스를 정의한다. 이때 Resolve.resolve 메소드는 true 또는 false가 아닌 뷰가 렌더링되기 위해 필요한 데이터를 반환한다.

## 3.5 CanDeactivate

CanDeactivate 가드는 뷰에서 빠져나갈 때 즉 컴포넌트가 비활성화될 때 사용한다.

[CanDeactivate](https://angular.io/api/router/CanDeactivate) 인터페이스를 구현하여 가드 클래스를 정의한다. 이때 CanDeactivate.canDeactivate 메소드는 true 또는 false를 반환한다.

# 4. 모듈별 라우터

구성 요소를 모듈 단위로 구성하는 것과 동일하게 모듈 단위로 라우트를 구성할 수 있다.

루트 모듈 또는 AppRoutingModule에서는 전체 라우트 정보를 담고 있는 라우트 구성을 RouterModule의 forRoot 메서드의 인자로 전달하였다.

```typescript
const routes: Routes = [ ... ];

@NgModule({
  ...
  imports: [ RouterModule.forRoot(routes) ],
  ...
})
```

모듈 단위로 라우팅 구성을 분리하는 경우, RouterModule의 forChild 메서드의 인자로 라우트 구성을 등록합니다.

```typescript
const routes: Routes = [ ... ];

@NgModule({
  ...
  imports: [ RouterModule.forChild(routes) ],
  ...
})
```

<iframe src="https://stackblitz.com/edit/child-routing?embed=1&file=app/app.module.ts" frameborder="0" width="100%" height="600"></iframe>

# Reference

* [Angular Routing & Navigation](https://angular.io/guide/router)

* [Route](https://angular.io/api/router/Routes)

* [RouterOutlet](https://angular.io/api/router/RouterOutlet)

* [RouterLink](https://angular.io/api/router/RouterLink)

* [RouterLinkActive](https://angular.io/api/router/RouterLinkActive)

* [Router](https://angular.io/api/router/Router)

* [ActivatedRoute](https://angular.io/api/router/ActivatedRoute)

* [CanActivate](https://angular.io/api/router/CanActivate)

* [CanActivateChild](https://angular.io/api/router/CanActivateChild)

* [CanLoad](https://angular.io/api/router/CanLoad)

* [Resolve](https://angular.io/api/router/Resolve)

* [CanDeactivate](https://angular.io/api/router/CanDeactivate)
