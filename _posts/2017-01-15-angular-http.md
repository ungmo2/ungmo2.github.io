---
layout: post
title: Angular <strong>HttpClient</strong>
subtitle: HTTP 통신
categories: angular
section: angular
description: 대부분의 웹 애플리리케이션이 그러하듯이 Angular 애플리케이션은 HTTP 프로토콜을 통해 서버와 통신한다. Angular는 @angular/http 패키지의 Http 클래스를 통해 HTTP 요청을 처리하였다. Angular V4.3부터는 @angular/common/http 패키지의 HttpClient 클래스를 통해 기존의 Http 클래스보다 발전된 HTTP 요청 API와 인터셉터(Interceptor)를 제공한다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. HttpClient이란?

대부분의 웹 애플리리케이션이 그러하듯이 Angular 애플리케이션은 HTTP 프로토콜을 통해 서버와 통신한다. Angular는 @angular/http 패키지의 [Http](https://angular.io/api/http/Http) 클래스를 통해 HTTP 요청을 처리하였다. Angular V4.3부터는 @angular/common/http 패키지의 [HttpClient](https://angular.io/api/common/http/HttpClient) 클래스를 통해 기존의 Http 클래스보다 발전된 HTTP 요청 API와 인터셉터(Interceptor)를 제공한다.

HttpClient 클래스의 개요를 살펴보도록 하자. HttpClient 클래스는 @angular/common/http 패키지로 제공된다. 아래 코드는 Angular 4.4.4 버전의 HttpClient 클래스를 간략히 나타낸 것이다.

```typescript
// https://github.com/angular/angular/blob/4.4.4/packages/common/http/src/client.ts
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

# 2. HttpClientModule의 설치

HttpClient 클래스를 사용하려면 HttpClient를 제공하는 HttpClientModule을 모듈에 인스톨하여야 한다. HttpClient을 애플리케이션 전역에서 사용할 수 있도록 애플리케이션 모듈에 HttpClientModule을 임포트한다.

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

HttpClientModule을 애플리케이션 모듈에 임포트하였다. 이제 애플리케이션 전역에서 컴포넌트 또는 서비스에 HttpClient를 주입할 수 있다.

# 3. HTTP 요청

XMLHttpRequest 객체는 HTTP를 통해서 서버와 데이터를 주고 받을 수 있는 API를 제공한다.

```javascript
// XMLHttpRequest 객체의 생성
var xhr = new XMLHttpRequest();
// 비동기 방식으로 Request를 오픈한다
xhr.open('GET', 'data/test.json');
// Request를 전송한다
xhr.send();
```

Angular의 HttpClient도 XMLHttpRequest를 사용하기 때문에 GET, POST, PUT, DELETE, PATCH 등의 HTTP 메소드(verb, method)를 사용하여 CRUD를 구현한다.

[json-server](./json-server)를 사용하여 페이크 REST API 서버를 작성하고 HTTP 요청 예제를 만들어 보자. json-server는 npm을 사용하여 설치할 수 있다.

```bash
$ npm install -g json-server
```

프로젝트 폴더 루트에 데이터베이스 역할을 할 db.json 파일을 생성한다.

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

class Todo {
  constructor(
    public id: number,
    public content: string,
    public completed: boolean
  ) {}
}

@Component({
  selector: 'app-root',
  template: `<pre>{{ todos | json }}</pre>`
})
export class AppComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  // HttpClient를 컴포넌트에 주입
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // HTTP 요청
    this.http.get(this.url)
      // 요청 결과를 프로퍼티에 할당
      .subscribe(todos => this.todos = todos);
  }
}
```

위 코드를 실행하면 아래와 같은 컴파일 에러가 발생한다.

```
Failed to compile.

/Users/leeungmo/Desktop/angular/http-exam/src/app/app.component.ts (26,27): Type 'Object' is not assignable to type 'Todo[]'.
  The 'Object' type is assignable to very few other types. Did you mean to use the 'any' type instead?
```

이는 서버로부터의 응답이 Object 타입이기 때문이다. http.get 메소드에 [타입 파라미터](./typescript-generic)를 알려주어야 한다.

```typescript
ngOnInit() {
  // HTTP 요청: 타입 파라미터를 명기한다.
  this.http.get<Todo[]>(this.url)
    // 요청 결과를 프로퍼티에 할당
    .subscribe(todos => this.todos = todos);
}
```

### 3.1.1 HttpParams

GET 요청은 파라미터와 함께 전달할 수 있다. 예를 들어 위 예제의 url을 아래와 같이 변경하여 보자.

```typescript
url = 'http://localhost:3000/todos?id=1&completed=false';
```

위 url을 사용하여 GET 요청을 전송하여도 문제없이 동작할 것이다. 또 다른 방법으로 [HttpParams](https://angular.io/api/common/http/HttpParams) 클래스를 사용할 수 있다.

```typescript
ngOnInit() {
  // 요청 파라미터 생성
  const params = new HttpParams()
    .set('id', '1')
    .set('completed', 'false');

  // HTTP 요청
  this.http.get<Todo[]>(this.url, {params})
    // 요청 결과를 프로퍼티에 할당
    .subscribe(todos => this.todos = todos);
}
```

HttpParams 객체는 이뮤터블이기 때문에 객체의 값을 직접 변경할 수 없다. 따라서 set 메소드를 사용해서 값을 지정해야 한다. 주의해야 할 것은 set 메소드를 항상 새로운 HttpParams 객체를 반환하기 때문에 반드시 체이닝하여 사용해야 한다. 따라서 다음과 같이 사용하는 방식은 유효하지 않다.

```typescript
const params = new HttpParams();
params.set('id', '1');
params.set('completed', 'false');
```

위 코드를 실행하면 params 변수에는 빈 HttpParams 객체가 할당된다. 또한 set 메소드는 2개의 인자 모두 문자열을 설정해야 한다.

### 3.1.2 HttpResponse

지금까지의 예제는 todos 데이터(response body)만을 리턴받았을 뿐이다. 특정 헤더 정보나 상태 코드(status code)를 확인하려면 전체 응답(response)을 받아야 한다. 이런 경우, observe 옵션을 사용하면 [HttpResponse](https://angular.io/api/common/http/HttpResponse) 클래스 타입의 응답을 받을 수 있다.

```typescript
// HTTP 요청: 타입 파라미터를 명기한다.
this.http.get<Todo[]>(this.url, { observe: 'response' })
  // 요청 결과를 프로퍼티에 할당
  .subscribe(res => {
    console.log(res);
    // HttpResponse {headers: HttpHeaders, status: 200, statusText: "OK", url: "http://localhost:3000/todos", ok: true, …}
    console.log(res.headers);
    // HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
    console.log(res.status); // 200
    this.todos = res.body;   // todos
  });
```

### 3.1.3 에러 핸들링

서버 요청이 실패하였거나 네트워크 연결에 문제가 있어서 에러가 발생하였을 경우, HttpClient는 정상 응답 대신 에러를 반환한다. 이때 subscribe의 두번째 콜백함수가 호출된다.

```typescript
ngOnInit() {
  // HTTP 요청: 타입 파라미터를 명기한다.
  this.http.get<Todo[]>(this.url, { observe: 'response' })
    // 요청 결과를 프로퍼티에 할당
    .subscribe(
      // 요청 성공 처리 콜백함수
      res => {
        console.log(res);
        // HttpResponse {headers: HttpHeaders, status: 200, statusText: "OK", url: "http://localhost:3000/todos", ok: true, …}
        console.log(res.headers);
        // HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
        console.log(res.status); // 200
        this.todos = res.body;   // todos
      },
      // 요청 실패 처리 콜백함수
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // 클라이언트 또는 네트워크 에러
          console.log('An error occurred:', err.error.message);
        } else {
          // 백엔드가 실패 상태 코드 응답
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
}
```

[HttpErrorResponse](https://angular.io/api/common/http/HttpErrorResponse) 타입의 err 파라미터는 에러에 관련한 유용한 정보를 담고 있다.

발생할 수 있는 에러의 유형은 두 가지이다.

- 네트워크 오류로 인해 요청이 성공적으로 완료되지 못한 경우 또는 RxJS 오퍼레이터의 예외가 발생한 경우, err 파라미터는 Error 객체의 인스턴스이다. 이때 에러는 클라이언트 측의 원인으로 인한 것이다.

- err 파라미터가 Error 객체의 인스턴스가 아닌 경우, 백엔드가 실패한 상태 코드를 응답한 에러이다. 이때 status 프로퍼티로 응답 코드(404, 500 등)를 확인 할 수 있다.

## 3.2 POST

간단한 POST 요청을 만들어 보자. POST 요청은 리소스를 생성할 때 사용한다.

```typescript
// http-post.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

class Todo {
  constructor(
    public id: number,
    public content: string,
    public completed: boolean
  ) {}
}

@Component({
  selector: 'app-root',
  template: `
    <input #todo type="text" [(ngModel)]="content" placeholder="todo">
    <button (click)="addTodo(todo.value)">Add</button>
    <pre>{{ todos | json }}</pre>
  `
})
export class HttpPostComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';
  content: string;

  // HttpClient를 컴포넌트에 주입
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

  addTodo(content) {
    if (!this.content) { return; }

    // 서버로 전송할 요청 페이로드
    // id는 json-server에 의해 자동 생성된다
    const payload = { content, completed: false };

    this.http.post(this.url, payload)
      .subscribe(() => this.getTodos());

    this.content = null;
  }
}
```

POST 요청의 경우, 서버로 전송할 요청 페이로드가 존재한다는 점을 제외하면 GET 요청과 동일하다.

### 3.2.1 HttpHeaders

브라우저가 자동 성성하는 헤더 이외에 커스텀 헤더를 추가할 때 [HttpHeaders](https://angular.io/api/common/http/HttpHeaders) 클래스를 사용한다.

```typescript
addTodo(content) {
  if (!this.content) { return; }

  // 헤더 생성
  const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token');

  const payload = { content, completed: false };

  // 요청 페이로드와 커스텀 요청 헤더 전송
  this.http.post(this.url, payload, {headers})
    .subscribe(() => this.getTodos());

  this.content = null;
}
```

HttpHeaders 객체는 HttpParams 객체와 동일하게 이뮤터블하다. 따라서 set 메소드를 사용하여 값을 변경하여야 하고 반드시 체이닝하여 사용해야 한다.

## 3.3 PUT

간단한 PUT 요청을 만들어 보자. PUT 요청은 리소스를 갱신할 때 사용한다. 참고로 PATCH 요청은 리소스의 일부를 갱신할 때 사용한다.

```typescript
// http-put.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class Todo {
  constructor(
    public id: number,
    public content: string,
    public completed: boolean
  ) {}
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let todo of todos" (click)="editTodo(todo.id)">{{todo.content}}</li>
    </ul>
    <pre>{{ todos | json }}</pre>
  `
})
export class HttpPutComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  // HttpClient를 컴포넌트에 주입
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

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

class Todo {
  constructor(
    public id: number,
    public content: string,
    public completed: boolean
  ) {}
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let todo of todos" (click)="completeTodo(todo)">{{todo.content}}</li>
    </ul>
    <pre>{{ todos | json }}</pre>
  `
})
export class HttpPatchComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  // HttpClient를 컴포넌트에 주입
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

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

class Todo {
  constructor(
    public id: number,
    public content: string,
    public completed: boolean
  ) {}
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let todo of todos" (click)="deleteTodo(todo.id)">{{todo.content}}</li>
    </ul>
    <pre>{{ todos | json }}</pre>
  `
})
export class HttpDeleteComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  // HttpClient를 컴포넌트에 주입
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

  deleteTodo(id) {
    this.http.delete(`${this.url}/${id}`)
      .subscribe(() => this.getTodos());
  }
}
```

# Reference

* [HttpClient](https://angular.io/guide/http)

* [Angular RxJS](http://poiemaweb.com/angular-rxjs)
