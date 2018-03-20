---
layout: post
title: Angular <strong>HttpClient</strong>
subtitle: HttpClient와 HTTP 통신
categories: angular
section: angular
description: 대부분의 웹 애플리리케이션이 그러하듯이 Angular 애플리케이션은 HTTP 프로토콜을 통해 서버와 통신한다. Angular는 @angular/http 패키지의 Http 클래스를 통해 HTTP 요청을 처리하였다. Angular V4.3부터는 @angular/common/http 패키지의 HttpClient 클래스를 통해 기존의 Http 클래스보다 발전된 HTTP 요청 API와 인터셉터(Interceptor)를 제공한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. HttpClient

대부분의 웹 애플리리케이션이 그러하듯이 Angular 애플리케이션은 HTTP 프로토콜을 통해 서버와 통신한다. Angular는 @angular/http 패키지의 [Http](https://angular.io/api/http/Http) 클래스를 통해 HTTP 요청을 처리하였다. Angular 4.3 버전부터는 @angular/common/http 패키지의 [HttpClient](https://angular.io/api/common/http/HttpClient) 클래스를 통해 기존의 Http 클래스보다 발전된 HTTP 요청 API와 인터셉터(Interceptor)를 제공한다.

HttpClient 클래스의 개요를 살펴보도록 하자. HttpClient 클래스는 @angular/common/http 패키지로 제공된다. 아래 코드는 HttpClient 클래스를 간략히 나타낸 것이다.

```typescript
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
...

import { HttpHandler } from './backend';
import { HttpHeaders } from './headers';
import { HttpParams } from './params';
import { HttpRequest } from './request';
import { HttpEvent, HttpResponse } from './response';
...

@Injectable()
export class HttpClient {
  constructor(handler: HttpHandler)

  request(first: string|HttpRequest<any>, url?: string, options: {...}): Observable<any>

  delete(url: string, options: {...}): Observable<any>

  get(url: string, options: {...}): Observable<any>

  head(url: string, options: {...}): Observable<any>

  jsonp<T>(url: string, callbackParam: string): Observable<T>

  options(url: string, options: {...}): Observable<any>

  patch(url: string, body: any|null, options: {...}): Observable<any>

  post(url: string, body: any|null, options: {...}): Observable<any>

  put(url: string, body: any|null, options: {...}): Observable<any>
}
```

HttpClient는 주입 가능한 클래스이며 HTTP 요청을 수행하는 메소드를 갖는다. 각 메소드에는 문자열의 url을 전달받기 위한 url 파라미터와 옵션을 사용하기 위한 options 파라미터, post, put, patch 메소드의 경우 서버로 [요청 페이로드(payload)](https://ko.wikipedia.org/wiki/%ED%8E%98%EC%9D%B4%EB%A1%9C%EB%93%9C)를 전송하기 위한 body 파라미터 등이 있다.

HttpClient의 메소드는 옵저버블을 반환한다. 즉 HttpClient는 RxJS의 옵저버블 객체를 기반으로 작성되어 있다.

# 2. HttpClientModule

HttpClient 클래스를 사용하려면 HttpClient를 제공하는 HttpClientModule을 모듈에 추가하여야 한다. HttpClient를 애플리케이션 전역에서 사용할 수 있도록 루트 모듈에 HttpClientModule을 임포트한다.

```typescript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// @angular/common/http 패키지의 HttpClientModule을 임포트한다.
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // HttpClientModule을 임포트한다.
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

HttpClientModule을 루트 모듈에 임포트하였다. 이제 애플리케이션 전역에서 컴포넌트 또는 서비스에 HttpClient를 주입할 수 있다.

# 3. HTTP 요청

XMLHttpRequest 객체는 HTTP를 통해서 서버와 데이터를 주고 받을 수 있는 API를 제공한다.

```javascript
// XMLHttpRequest 객체의 생성
var xhr = new XMLHttpRequest();
// 비동기 방식으로 Request를 오픈한다
xhr.open('GET', 'api/todos');
// Request를 전송한다
xhr.send();
```

Angular의 HttpClient도 XMLHttpRequest를 사용하여 HTTP 요청을 실행할 수 있는 API를 제공한다. HttpClient 클래스의 인스턴스는 의존성 주입을 통해 사용할 수 있다.

```typescript
// HttpClient를 주입받는다.
constructor(public http: HttpClient) {}
```

주입받은 HttpClient 클래스의 인스턴스는 get, post, put, patch, delete, jsonp 등의 HTTP 메소드를 가지고 있으며 이들 메소드를 통해 CRUD를 구현한다.

```typescript
// HTTP GET 요청
this.http.get('/api/todos').subscribe(...);
```

[json-server](./json-server)를 사용하여 페이크 REST API 서버를 생성하고 HTTP 요청 예제를 만들어 보자. json-server는 npm을 사용하여 설치할 수 있다.

```bash
$ npm install -g json-server
```

데이터베이스 역할을 할 db.json 파일을 프로젝트 폴더 루트에 생성한다.

```json
{
  "todos": [
    { "id": 1, "content": "HTML", "completed": false },
    { "id": 2, "content": "CSS", "completed": true },
    { "id": 3, "content": "Javascript", "completed": false }
  ]
}
```

npm script로 서버를 실행하기 위해 package.json을 아래와 같이 수정한다. 생성한 db.json 파일의 변경을 감시하도록 옵션을 지정하였다.

```json
{
  ...
  "scripts": {
    ...
    "json-server": "json-server --watch db.json"
  },
  ...
}
```

이제 json-serve를 실행한다.

```bash
$ npm run json-server

> http-exam@0.0.0 json-server /Users/leeungmo/Desktop/angular/http-exam
> json-server --watch db.json

  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/todos

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

브라우저에서 [localhost:3000/todos](localhost:3000/todos)으로 접근하면 db.json 파일의 내용이 출력된다.

![json-server](/img/json-server.png)

json-server의 실행
{: .desc-img}

GET, POST, PUT, DELETE, PATCH 등의 HTTP 메소드(verb, method)를 사용하여 요청을 보내면 그 결과가 db.json 파일에 반영될 것이다.

## 3.1 GET

간단한 GET 요청을 만들어 보자. GET 요청은 모든 또는 특정 리소스를 조회할 때 사용한다.

```typescript
// http-get.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-http-get',
  template: `
    <ul>
      <li *ngFor="let todo of todos">{{ "{{ todo.content " }}}}</li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `
})
export class HttpGetComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  // HttpClient를 컴포넌트에 주입
  constructor(public http: HttpClient) {}

  ngOnInit() {
    // HTTP 요청
    this.http.get(this.url)
      // 요청 결과를 프로퍼티에 할당
      .subscribe(todos => this.todos = todos);
  }
}
```

### 3.1.1 Response 타입 체크

위 코드를 실행하면 아래와 같은 컴파일 에러가 발생한다.

```
Failed to compile.

/Users/leeungmo/Desktop/angular/http-exam/src/app/app.component.ts (26,27): Type 'Object' is not assignable to type 'Todo[]'.
  The 'Object' type is assignable to very few other types. Did you mean to use the 'any' type instead?
```

이는 서버로부터의 전달받은 데이터 todos가 Object 타입이기 때문이다. 즉 Object 타입인 todos를 Todo[] 타입인 this.todos에 할당하려 하였을 때 발생한 컴파일 에러이다.

```typescript
ngOnInit() {
  this.http.get(this.url)
    // 할당시 타입이 일치하지 않기 때문에 컴파일 에러가 발생한다.
    .subscribe(todos => this.todos = todos);
}
```

HttpClient.get 메소드는 [제네릭](./typescript-generic) 함수이므로 타입 파라미터(형식 매개 변수)를 설정해 주어야 한다.

```typescript
ngOnInit() {
  // HTTP 요청: 타입 파라미터를 명기한다.
  this.http.get<Todo[]>(this.url)
    // 요청 결과를 프로퍼티에 할당
    .subscribe(todos => this.todos = todos);
}
```

### 3.1.2 responseType

JSON 데이터가 아닌 텍스트, [blob](https://ko.wikipedia.org/wiki/%EB%B0%94%EC%9D%B4%EB%84%88%EB%A6%AC_%EB%9D%BC%EC%A7%80_%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8) 등의 non-JSON 데이터를 요청하는 경우, responseType 옵션을 사용한다. responseType 옵션을 설정하지 않는 경우, 기본으로 JSON 데이터를 반환한다.

```typescript
ngOnInit() {
  // HTTP 요청: 텍스트 파일을 요청
  this.http.get('/textfile.txt', {responseType: 'text'})
    // get 메소드는 Observable<string>를 반환한다.
    .subscribe(data => console.log(data));
}
```

responseType을 설정한 경우, 타입 파라미터를 지정할 필요가 없으며 get 메소드는 `Observable<string>`을 반환한다.

### 3.1.3 HttpParams

GET 요청은 쿼리 파라미터와 함께 전달할 수 있다. 참고로 URI(Uniform Resource Identifier)는 아래와 같은 구성을 갖는다.

![uri](/img/uri.png)

URI(Uniform Resource Identifier)
{: .desc-img}

예를 들어 위 예제의 url을 아래와 같이 변경하여 보자.

```typescript
url = 'http://localhost:3000/todos?id=1&completed=false';
```

위 url을 사용하여 GET 요청을 전송하여도 문제없이 동작할 것이다. 또 다른 방법으로 [HttpParams](https://angular.io/api/common/http/HttpParams) 클래스를 사용할 수 있다.

```typescript
ngOnInit() {
  // 쿼리 파라미터 생성
  const params = new HttpParams()
    .set('id', '1')
    .set('completed', 'false');

  // HTTP 요청
  this.http.get<Todo[]>(this.url, {params})
    // 요청 결과를 프로퍼티에 할당
    .subscribe(todos => this.todos = todos);
}
```

HttpParams 객체는 이뮤터블이기 때문에 객체의 프로퍼티 값을 직접 변경할 수 없다. 따라서 set 메소드를 사용해서 값을 지정해야 한다. 주의해야 할 것은 set 메소드를 항상 새로운 HttpParams 객체를 반환하기 때문에 반드시 체이닝하여 사용해야 한다. 또한 set 메소드는 2개의 인자 모두 문자열을 설정해야 한다.

따라서 다음과 같이 사용하는 방식은 유효하지 않다.

```typescript
const params = new HttpParams();
params.set('id', '1');
params.set('completed', 'false');
```

위 코드를 실행하면 params 변수에는 빈 HttpParams 객체가 할당된다.

### 3.1.4 HttpResponse

지금까지의 예제는 todos 데이터(response body)만을 리턴받았을 뿐이다. 특정 헤더 정보나 상태 코드(status code)를 확인하려면 전체 응답(response)을 받아야 한다. 이런 경우, observe 옵션을 사용하면 [HttpResponse](https://angular.io/api/common/http/HttpResponse) 클래스 타입의 응답을 받을 수 있다.

```typescript
this.http.get<Todo[]>(this.url, { observe: 'response' })
  .subscribe(res => {
    console.log(res);
    // HttpResponse {headers: HttpHeaders, status: 200, statusText: "OK", url: "http://localhost:3000/todos", ok: true, …}

    console.log(res.headers);
    // HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}

    console.log(res.status); // 200
    this.todos = res.body;   // todos
  });
```

### 3.1.5 에러 핸들링

서버 요청이 실패하였거나 네트워크 연결에 문제가 있어서 에러가 발생하였을 경우, HttpClient는 정상 응답 대신 에러를 반환한다. 이때 subscribe의 두번째 콜백함수(Observer의 error 함수)가 호출된다.

```typescript
ngOnInit() {
  this.http.get<Todo[]>(this.url)
    .subscribe(
      // 요청 성공 처리 콜백함수 (Observer의 next 함수)
      todos => this.todos = todos,
      // 요청 실패 처리 콜백함수 (Observer의 error 함수)
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // 클라이언트 또는 네트워크 에러
          console.log(`Client-side error: ${err.error.message}`);
        } else {
          // 백엔드가 실패 상태 코드 응답
          console.log(`Server-side error: ${err.status}`);
        }
      }
    );
}
```

[HttpErrorResponse](https://angular.io/api/common/http/HttpErrorResponse) 타입의 err 파라미터는 에러에 관련한 유용한 정보를 담고 있다. 이 정보로 에러의 유형을 구분할 수 있다.

발생할 수 있는 에러의 유형은 두 가지이다.

- 네트워크 오류로 인해 요청이 성공적으로 완료되지 못한 경우 또는 RxJS 오퍼레이터의 예외가 발생한 경우, err 파라미터는 Error 객체의 인스턴스이다. 이때 에러는 클라이언트 측의 문제로 발생한 것이다.

- err 파라미터가 Error 객체의 인스턴스가 아닌 경우, 백엔드가 실패한 상태 코드를 응답한 에러이다. 이때 status 프로퍼티로 응답 코드(404, 500 등)를 확인 할 수 있다.

## 3.2 POST

간단한 POST 요청을 만들어 보자. POST 요청은 리소스를 생성할 때 사용한다.

```typescript
// http-post.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-http-post',
  template: `
    <input type="text" [(ngModel)]="content" placeholder="todo">
    <button (click)="addTodo()">Add</button>
    <ul>
      <li *ngFor="let todo of todos">{{ "{{ todo.content " }}}}</li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `
})
export class HttpPostComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';
  content: string;

  // HttpClient를 컴포넌트에 주입
  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

  // 새로운 todo를 생성한다
  addTodo() {
    if (!this.content) { return; }

    // 서버로 전송할 요청 페이로드
    // id는 json-server에 의해 자동 생성된다
    const payload = { content: this.content, completed: false };

    this.http.post(this.url, payload)
      .subscribe(() => this.getTodos());

    this.content = '';
  }
}
```

POST 요청의 경우, 서버로 전송할 요청 페이로드가 존재한다는 점을 제외하면 GET 요청과 동일하다.

### 3.2.1 HttpHeaders

브라우저가 자동 성성하는 헤더 이외에 커스텀 헤더를 추가할 때 [HttpHeaders](https://angular.io/api/common/http/HttpHeaders) 클래스를 사용한다.

```typescript
addTodo() {
  if (!this.content) { return; }

  // 헤더 생성
  const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token');

  const payload = { content: this.content, completed: false };

  // 요청 페이로드와 커스텀 요청 헤더 전송
  this.http.post(this.url, payload, { headers })
    .subscribe(() => this.getTodos());

  this.content = '';
}
```

HttpHeaders 객체는 HttpParams 객체와 동일하게 이뮤터블하다. 따라서 set 메소드를 사용하여 값을 변경하여야 하고 반드시 체이닝하여 사용해야 한다.

## 3.3 PUT

간단한 PUT 요청을 만들어 보자. PUT 요청은 리소스를 갱신할 때 사용한다. 참고로 PATCH 요청은 리소스의 일부를 갱신할 때 사용한다.

```typescript
// http-put.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-http-put',
  template: `
    <ul>
      <li *ngFor="let todo of todos"
          (click)="editTodo(todo.id)">{{ "{{ todo.content " }}}}</li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `
})
export class HttpPutComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  // HttpClient를 컴포넌트에 주입
  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

  // id가 일치하는 todo의 모든 프로퍼티를 변경한다
  editTodo(id) {
    const payload = { content: 'Angular!', completed: true };

    this.http.put(`${this.url}/${id}`, payload)
      .subscribe(() => this.getTodos());
  }
}
```

## 3.4 PATCH

간단한 PATCH 요청을 만들어 보자. PATCH 요청은 리소스의 일부를 갱신할 때 사용한다. 참고로 PUT 요청은 데이터의 값 일부만을 갱신할 때 사용한다.

```typescript
// http-patch.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-http-patch',
  template: `
    <ul>
      <li *ngFor="let todo of todos"
          (click)="completeTodo(todo)">{{ "{{ todo.content " }}}}</li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `
})
export class HttpPatchComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  // HttpClient를 컴포넌트에 주입
  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

  // id가 일치하는 todo의 completed 프로퍼티를 변경한다
  completeTodo(todo) {
    const {id, completed} = todo;
    const payload = { completed: !completed };

    this.http.patch(`${this.url}/${id}`, payload)
      .subscribe(() => this.getTodos());
  }
}
```

## 3.5 DELETE

간단한 DELETE 요청을 만들어 보자. DELETE 요청은 리소스를 삭제할 때 사용한다.

```typescript
// http-delete.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-http-delete',
  template: `
    <ul>
      <li *ngFor="let todo of todos"
          (click)="deleteTodo(todo.id)">{{ "{{ todo.content " }}}}</li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `
})
export class HttpDeleteComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  // HttpClient를 컴포넌트에 주입
  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

  // id가 일치하는 todo를 삭제한다
  deleteTodo(id) {
    this.http.delete(`${this.url}/${id}`)
      .subscribe(() => this.getTodos());
  }
}
```

# 4. HTTP 요청 중복 방지

HttpClient은 옵저버블을 반환한다. 옵저버블의 subscribe 메소드가 호출되기 이전에는 아무 일도 일어나지 않다가 subscribe 메소드가 호출되면 각각 호출별로 요청을 생성한다.

```typescript
const tods$ = this.http.post(this.url, payload);
// subscribe 메소드 호출 이전: 요청이 아직 생성되지 않았다.
tods$.subscribe();
// subscribe 메소드 호출: 1개의 요청이 생성된다.
tods$.subscribe();
// subscribe 메소드 호출: 2개의 요청이 생성된다.
```

위 예제의 경우 동일한 요청 페이로드로 2번 POST 요청이 전송된다. 코드가 복잡해짐에 따라 여러 곳에서 옵저버블이 생성되고 다른 곳에서 옵저버블을 구독하다보면 중복된 요청을 생성할 가능성이 커진다.

이런 상황을 해결하기 위해 RxJS는 5.4.0 버전부터 [shareReplay](http://reactivex.io/documentation/operators/replay.html) 오퍼레이터를 추가하였다.

```typescript
import 'rxjs/add/operator/shareReplay';

ngOnInit() {
  const tods$ = this.getTodos();
  tods$.subscribe(todos => this.todos = todos);
  tods$.subscribe(todos => this.todos = todos);
}

getTodos(): Observable<Todo[]> {
  return this.http.get<Todo[]>(this.url)
    .shareReplay();
}
```

위 예제를 실행하여 보면 옵저버블 tods$는 2번 구독되었지만 HTTP 요청은 1번만 전송되는 것을 확인할 수 있다.

<!--
# 4. HTTP 요청 중복 방지
# 5. HTTP 병렬 요청 및 결과 조합
-->

# 5. 인터셉터 (HttpInterceptor)

HttpClient는 미들웨어 로직을 파이프 라인에 삽입할 수 있는 인터셉터를 도입하였다. 인터셉터를 사용하면 HTTP 요청 처리 전후에 특정 기능을 실행할 수 있다. 인터셉터는 요청과 응답을 함께 처리할 수 있기 때문에 로그 처리 또는 요청 소요 시간 확인과 같은 작업을 수행할 수 있다.

인터셉터를 작성하기 위해서는 intercept 메소드의 구현을 강제하는 [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) 인터페이스를 implements하여야 한다.

```typescript
interface HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
```

인터셉터가 어떻게 동작하는지 살펴 보도록 하자. 모든 HTTP 요청의 헤더에 인증 토큰을 추가하는 경우이다. HttpInterceptor를 구현한 AuthInterceptor 서비스를 작성한다.

```typescript
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable() export class AuthInterceptor implements HttpInterceptor {
  // AuthService를 주입받는다.
  // 인증 토큰을 취득하는 AuthService가 별도로 구현되어 있다고 가정한다.
  constructor(private auth: AuthService) { }

  // ① intercept 메소드는 2개의 파라미터를 갖는다.
  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    // AuthService 서버스로 부터 인증 토큰를 취득한다(잠정 처리)
    const authToken = this.auth.getToken();

    // ② 헤더에 인증 토큰을 추가한 새로운 HttpRequest 객체를 생성(클론)한다
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    // ③ 클론한 HttpRequest 객체를 원본 HttpRequest 객체 대신 다음 미들웨어 체인으로 전달한다. 다음 인터셉터가 없는 경우, Observable 반환하고 종료한다.
    return next.handle(clonedRequest);
  }
}
```

① intercept 메소드는 2개의 파라미터를 갖는다. 첫번째 req는 처리할 요청이고 두번째 next는 다음 인터셉터를 가리키는 핸들러다.

이 핸들러는 [HttpHandler](https://angular.io/api/common/http/HttpHandler) 클래스 타입으로 HttpHandler는 [Express의 미들웨어](./express-basics#4-middleware)와 유사하게 인터셉터를 체이닝할 때 사용한다. 다음 인터셉터가 존재하는 경우, 요청을 다음 인터셉터에 전달하고 다음 인터셉터가 존재하지 않는 경우, 최종 HttpHandler인 [HttpBackend](https://angular.io/api/common/http/HttpBackend)가 되어 요청을 전송하고 Observable 반환한다.

**인터셉터는 HttpClient 인터페이스와 HTTP 요청을 브라우저 HTTP API를 통해 백엔드로 전달하는 최종 HttpHandler인 HttpBackend 사이에 있으며 여러개의 인터셉터가 존재할 때 각각의 인터셉터를 순차적으로 연결하는 역할을 하는 것이 HttpHandler이다.**

② 첫번째 인자로 받은 HttpRequest 객체는 이뮤터블이기 때문에 직접 객체의 내용을 변경할 수 없다. clone 메소드를 사용하여 헤더에 인증 토큰을 추가한 새로운 복사본을 생성한다.

③ 원본 HttpRequest 객체 대신 헤더에 인증 토큰을 추가한 새로운 HttpRequest 객체를 다음 미들웨어 체인으로 전달한다. 다음 인터셉터가 없는 경우, Observable 반환하고 종료한다.

작성한 인터셉터를 HTTP 요청에 적용하기 위해 애플리케이션 모듈의 프로바이더에 HTTP_INTERCEPTOR 프로바이더를 다음과 같이 추가한다.

```typescript
...
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  ...
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }]
})
export class AppModule {}
```

# Reference

* [HttpClient](https://angular.io/guide/http)

* [Angular RxJS](http://poiemaweb.com/angular-rxjs)

