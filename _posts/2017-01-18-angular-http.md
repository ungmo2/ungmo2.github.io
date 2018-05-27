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

대부분의 웹 애플리리케이션이 그러하듯이 Angular 애플리케이션은 HTTP 프로토콜을 통해 서버와 통신한다. Angular는 @angular/http 패키지의 [Http](https://angular.io/api/http/Http) 클래스를 통해 HTTP 요청을 처리하였다. Angular 4.3 버전부터는 @angular/common/http 패키지의 [HttpClient](https://angular.io/api/common/http/HttpClient) 클래스를 통해 이전의 Http 클래스보다 발전된 HTTP 요청 API와 인터셉터(Interceptor)를 제공한다.

HttpClient 클래스의 개요를 살펴보도록 하자. HttpClient 클래스는 @angular/common/http 패키지에서 제공한다. 아래 코드는 HttpClient 클래스를 간략히 나타낸 것이다.

```typescript
// https://github.com/angular/angular/blob/6.0.3/packages/common/http/src/client.ts#L46-L1990
class HttpClient {
  constructor(handler: HttpHandler)
  request(first: string | HttpRequest<any>, url?: string, options: {...}): Observable<any>
  delete(url: string, options: {...}): Observable<any>
  get(url: string, options: {...}): Observable<any>
  head(url: string, options: {...}): Observable<any>
  jsonp<T>(url: string, callbackParam: string): Observable<T>
  options(url: string, options: {...}): Observable<any>
  patch(url: string, body: any | null, options: {...}): Observable<any>
  post(url: string, body: any | null, options: {...}): Observable<any>
  put(url: string, body: any | null, options: {...}): Observable<any>
}
```

HttpClient는 주입 가능한 클래스이며 HTTP 요청을 수행하는 메소드를 갖는다. 각 메소드에는 url을 전달받기 위한 url 파라미터와 옵션을 사용하기 위한 options 파라미터, post, put, patch 메소드의 경우 서버로 [요청 페이로드(payload)](https://ko.wikipedia.org/wiki/페이로드)를 전송하기 위한 body 파라미터 등이 있다.

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

HttpClientModule을 루트 모듈에 임포트하였다. 이제 아래와 같이 애플리케이션 전역에서 HttpClient를 주입할 수 있다.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SomeService {
  constructor(private http: HttpClient) { }
}
```

주입받은 HttpClient 클래스의 인스턴스는 get, post, put, patch, delete, jsonp 등의 HTTP 메소드를 가지고 있으며 이들 메소드를 통해 CRUD를 구현한다.

```typescript
// HTTP GET 요청
this.http.get('/api/todos').subscribe(...);
```

# 3. HTTP 요청

## 3.1 REST API Mock 서버 구축

HTTP 요청 실습을 위해 [json-server](./json-server)를 사용하여 REST API Mock 서버를 구축해보자. json-server는 json 파일을 사용하여 간단한 시뮬레이션을 위한 REST API Mock server를 구축할 수 있는 툴이다. json-server는 npm을 사용하여 설치할 수 있다.

```bash
$ npm install -g json-server
```

json-server를 위한 프로젝트 폴더를 생성하고 프로젝트 루트에 데이터베이스 역할을 할 db.json 파일을 아래와 같이 작성한다.

```json
{
  "todos": [
    { "id": 1, "content": "HTML", "completed": false },
    { "id": 2, "content": "CSS", "completed": true },
    { "id": 3, "content": "Javascript", "completed": false }
  ]
}
```

아래의 명령어로 json-server를 실행한다. 생성한 db.json 파일의 변경을 감시하도록 옵션을 지정하였다.

```bash
$ json-server --watch db.json
```

브라우저에서 [localhost:3000/todos](localhost:3000/todos)으로 접근하면 db.json 파일의 내용이 출력된다.

![json-server](/img/json-server.png)

json-server의 실행
{: .desc-img}

GET, POST, PUT, DELETE, PATCH 등의 HTTP 메소드를 사용하여 요청을 보내면 그 결과가 db.json 파일에 반영될 것이다.

## 3.2 GET

GET 요청은 모든 리소스 또는 특정 리소스를 조회할 때 사용한다. 서버의 응답은 옵저버블로 반환된다.

```typescript
get(url: string, options: {...}): Observable<any>
```

간단한 GET 요청을 만들어 보자.

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let todo of todos">{{ "{{ todo.content " }}}}</li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `
})
export class AppComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  // HttpClient를 컴포넌트에 주입
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // HTTP GET 요청
    this.http.get(this.url)
      /* 요청 결과를 프로퍼티에 할당한다.
         get 메소드는 Observable<Object>를 반환한다.
         이때 타입이 일치하지 않기 때문에 컴파일 에러가 발생한다. */
      .subscribe(todos => this.todos = todos);
  }
}
```

<iframe src="https://stackblitz.com/edit/httpclient-get-1?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

### 3.2.1 Response 타입 체크

위 코드를 실행하면 아래와 같은 컴파일 에러가 발생한다.

```
ERROR in src/app/app.component.ts(31,27): error TS2322: Type 'Object' is not assignable to type 'Todo[]'.
  The 'Object' type is assignable to very few other types. Did you mean to use the 'any' type instead?
```

이는 서버로부터의 전달받은 데이터 todos가 Object 타입이기 때문이다. 즉 Object 타입인 todos를 Todo[] 타입인 this.todos에 할당하려 했을 때 발생한 컴파일 에러이다.

```typescript
// HTTP GET 요청
this.http.get(this.url)
  /* 요청 결과를 프로퍼티에 할당한다.
      get 메소드는 Observable<Object>를 반환한다.
      이때 타입이 일치하지 않기 때문에 컴파일 에러가 발생한다. */
  .subscribe(todos => this.todos = todos);
```

HttpClient.get 메소드는 기본적으로 응답 데이터의 타입을 Object로 해석한다. HttpClient.get 메소드에 응답 데이터의 타입을 알리려면 [제네릭](./typescript-generic)을 사용하여 타입 파라미터(형식 매개변수)를 설정해 주어야 한다. 타입 파라미터를 설정하여 응답 데이터의 타입을 명확히 하면 HttpClient.get 메소드는 설정한 타입의 데이터를 방출하는 옵저버블을 반환한다.

```typescript
// HTTP GET 요청: 타입 파라미터를 명기한다.
this.http.get<Todo[]>(this.url)
  /* 요청 결과를 프로퍼티에 할당한다.
      get 메소드는 Observable<Todo[]>을 반환한다. */
  .subscribe(todos => this.todos = todos);
```

<iframe src="https://stackblitz.com/edit/httpclient-get-2?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

### 3.2.2 responseType

JSON 데이터가 아닌 텍스트, [blob](https://ko.wikipedia.org/wiki/바이너리_라지_오브젝트) 등의 non-JSON 데이터를 요청하는 경우, responseType 옵션을 사용한다. responseType 옵션을 설정하지 않는 경우, 기본으로 JSON 데이터를 반환한다.

```typescript
// HTTP GET 요청: 텍스트를 요청
this.http.get('/textfile.txt', { responseType: 'text' })
  // get 메소드는 Observable<string>를 반환한다.
  .subscribe(data => console.log(data));
```

responseType을 설정한 경우, 타입 파라미터를 지정할 필요가 없으며 get 메소드는 responseType 프로퍼티의 값 text에 대응하는 `Observable<string>`을 반환한다.

### 3.2.3 HttpParams

GET 요청은 쿼리 파라미터와 함께 전달할 수 있다. 쿼리 파라미터는 조회 대상을 특정하기 위해 사용된다. 참고로 URI(Uniform Resource Identifier)는 아래와 같은 구성을 갖는다.

![uri](/img/uri.png)

URI(Uniform Resource Identifier)
{: .desc-img}

예를 들어 위 예제의 url을 아래와 같이 변경하여 보자.

```typescript
url = 'http://localhost:3000/todos?id=1&completed=false';
```

위 url을 사용하여 GET 요청을 전송하여도 문제없이 동작할 것이다. 하지만 쿼리 파라미터를 안전하게 이스케이프 처리하기 위해 [URL 엔코딩](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)해야 한다면 [HttpParams](https://angular.io/api/common/http/HttpParams) 클래스를 사용한다.

```typescript
// 쿼리 파라미터 생성
const params = new HttpParams()
  .set('id', '1')
  .set('completed', 'false');

// HTTP 요청
this.http.get<Todo[]>(this.url, { params })
  .subscribe(todos => this.todos = todos);
```

<iframe src="https://stackblitz.com/edit/httpclient-httpparams?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

HttpParams 클래스는 이뮤터블(변경 불가능)한 객체를 생성한다. 따라서 HttpParams 클래스가 생성한 객체의 프로퍼티 값을 직접 변경할 수 없으며 반드시 set 메소드를 사용해서 프로퍼티 값을 지정해야 한다. 이때 set 메소드는 2개의 인자 모두 문자열을 설정해야 한다.

주의해야 할 것은 set 메소드를 항상 새로운 HttpParams 객체를 반환하기 때문에 반드시 체이닝하여 사용해야 한다. 또한 set 메소드는 2개의 인자 모두 문자열을 설정해야 한다. 따라서 다음과 같이 사용하는 방식은 유효하지 않다.

```typescript
const params = new HttpParams();
params.set('id', '1');
params.set('completed', 'false');
```

위 코드를 실행하면 params 변수에는 빈 HttpParams 객체가 할당된다.

### 3.2.4 HttpHeaders

Content-type(request body에 담아 전송할 데이터의 MIME-type 정보), Accept(서버가 센드백할 데이터의 MIME-type 정보), 인증 토큰 등을 HTTP 요청 헤더(Request Header)에 추가할 필요가 있을 때 [HttpHeaders](https://angular.io/api/common/http/HttpHeaders) 클래스를 사용한다. 사용 방법은 HttpParams 클래스와 동일하다.

```typescript
// HTTP 요청 헤더 생성
const headers = new HttpHeaders()
  .set('Content-type', 'application/json')
  .set('Authorization', 'my-auth-token');

/* HttpHeaders 클래스는 아래의 방법도 유효하다.
const headers = new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization': 'my-auth-token'
});
*/

// HTTP 요청
this.http.get<Todo[]>(this.url, { headers })
  .subscribe(todos => this.todos = todos);
```

<iframe src="https://stackblitz.com/edit/httpclient-httpheaders?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

HttpHeaders 객체는 HttpParams 객체와 동일하게 이뮤터블하다. 따라서 객체 생성 이후 프로퍼티 값을 변경할 때는 반드시 set 메소드를 사용해야 한다.

### 3.2.5 HttpResponse

지금까지의 예제는 todos 데이터(response body)만을 리턴받았을 뿐이다. 특정 헤더 정보나 상태 코드(status code)를 확인하려면 전체 응답(response)을 받아야 한다. 이런 경우, observe 옵션을 사용하면 [HttpResponse](https://angular.io/api/common/http/HttpResponse) 클래스 타입의 응답을 받을 수 있다.

```typescript
// get 메소드는 Observable<HttpResponse<Todo[]>>을 반환한다.
this.http.get<Todo[]>(this.url, { observe: 'response' })
  .pipe(
    tap(res => console.log(res)),
    tap(res => console.log(res.headers)),
    tap(res => console.log(res.status))
  )
  //
  .subscribe(todos => this.todos = todos.body);
```

<iframe src="https://stackblitz.com/edit/httpclient-httpresponse?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

### 3.2.6 에러 핸들링

서버 요청이 실패하였거나 네트워크 연결에 문제가 있어서 에러가 발생하였을 경우, HttpClient는 정상 응답 대신 에러를 반환한다. 이때 subscribe의 두 번째 콜백 함수(Observer의 error 메소드)가 호출된다.

```typescript
ngOnInit() {
  this.http.get<Todo[]>(this.url)
    .subscribe(
      // 요청 성공 처리 콜백 함수 (Observer의 next 메소드)
      todos => this.todos = todos,
      // 요청 실패 처리 콜백 함수 (Observer의 error 메소드)
      (error: HttpErrorResponse) => console.error(error)
    );
}
```

<iframe src="https://stackblitz.com/edit/httpclient-error-handling-1?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

[HttpErrorResponse](https://angular.io/api/common/http/HttpErrorResponse) 타입의 error 파라미터는 에러에 관련한 유용한 정보를 담고 있다. 위 예제에서 발생할 수 있는 에러의 유형은 두 가지이다.

- 클라이언트 측의 에러
  : RxJS 오퍼레이터에서 exception를 throw했거나 네트워크 에러로 인해 요청이 성공적으로 완료되지 못한 경우이다. 이때 error 파라미터는 ErrorEvent 객체의 인스턴스이다.

- 백엔트 측의 에러
  : 백엔드가 요청 처리에 실패하여 404, 500 등의 상태 코드를 응답한 경우이다. 이때 error 파라미터는 ErrorEvent 객체의 인스턴스가 아니다.

에러를 구분하여 사용자에게 보다 상세한 에러 정보를 제공할 수 있는 에러 처리 핸들러 함수를 작성해 보자. 이 에러 핸들러 함수는 RxJS의 catchError, throwError 오퍼레이터를 사용할 것이다.

```typescript
// app.component.ts
import { throwError } from 'rxjs';
...

private handleError(error: HttpErrorResponse) {
  let message = '';

  // ① 에러 유형 구분
  if (error.error instanceof ErrorEvent) {
    // 클라이언트 측의 에러
    console.error(`Client-side error: ${error.error.message}`);
    message = error.error.message;
  } else {
    // 백엔트 측의 에러
    console.error(`Server-side error: ${error.status}`);
    message = error.message;
  }

  // ② 사용자에게 전달할 메세지를 담은 옵저버블 반환
  return throwError({
    title: 'Something wrong! please try again later.',
    message
  });
}
```

① 에러의 유형을 구분한다 즉, 클라이언트 측의 에러인지 백엔트 측의 에러인지 구분하여 사용자에게 전달할 엘러 메세지를 생성한다.

② throwError 오퍼레이터는 옵저버에게 데이터 방출을 중지하고 즉시 에러 노티피케이션을 방출하는 옵저버블을 생성한다. 따라서 위 핸들러 함수가 호출되면 옵저버의 error 메소드로 에러 노티피케이션이 전파된다.

이제 서버에 데이터를 요청해보자.

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

interface ErrorMessage {
  title: string;
  message: string;
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let todo of todos">{{ "{{ todo.content " }}}}</li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
    <h3 class='title'>{{ "{{ error.title " }}}}</h3>
    <p class='message'>{{ "{{ error.message " }}}}</p>
  `
})
export class AppComponent implements OnInit {
  todos: Todo[];
  error: ErrorMessage;

  // url = 'http://localhost:3000/todos';
  // 에러를 발생시키기 위해 잘못된 url을 제공
  url = 'http://localhost:3000/todosX';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Todo[]>(this.url)
      .pipe(
        // ① 에러 처리 후 에러 메세지를 생성하여 이를 방출하는 옵저버블 반환
        catchError(this.handleError)
      )
      .subscribe(
        // 요청 성공 처리 (옵저버의 next 메소드)
        todos => this.todos = todos,
        // ② 에러 처리 (옵저버의 error 메소드)
        (error: ErrorMessage) => this.error = error
      );
  }

  // 에러 핸들러 함수
  private handleError(error: HttpErrorResponse) {...}
}
```

<iframe src="https://stackblitz.com/edit/httpclient-error-handling-2?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

① 에러가 발생하면 catchError 오퍼레이터는 에러를 캐치하고 에러 핸들러 함수에 에러를 전달한다. 에러 핸들러 함수는 위에서 살펴본 바와 같이 에러의 유형을 구분하고 throwError 오퍼레이터를 사용하여 사용자에게 전달할 에러 메세지를 생성하고 이를 방출하는 옵저버블을 생성하여 반환한다. 이 옵저버블은 에러 메세지를 담은 에러 노티피케이션을 옵저버의 error 메소드로 즉시 전파한다.

② 옵저버의 error 메소드는 에러 노티피케이션을 전파받아 사용자에게 에러 메시지를 표시한다.

이와 같은 에러 처리 방법은 에러 메세지의 생성 처리(①)와 에러 메세지의 사용 처리(②)를 구분하여 구현할 수 있다는 장점이 있다.

## 3.3 POST

POST 요청은 서버에 데이터를 송신하여 리소스를 생성할 때 사용한다. 따라서 GET 요청과는 달리 요청 페이로드를 서버로 보내야한다.

```typescript
post(url: string, body: any | null, options: {...}): Observable<any>
```

간단한 POST 요청을 만들어 보자.

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  template: `
    <input type="text" [(ngModel)]="content" placeholder="todo">
    <button (click)="add()">Add</button>
    <ul>
      <li *ngFor="let todo of todos">{{ "{{ todo.content " }}}}</li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `
})
export class AppComponent implements OnInit {
  todos: Todo[];
  content: string;
  url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  // 새로운 todo를 생성한다
  add() {
    if (!this.content) { return; }

    this.addTodo()
      .subscribe(todo => this.todos = [...this.todos, todo]);

    this.content = '';
  }

  // 서버에 모든 todo를 요청한다.
  private getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  // 서버에 새로운 todo의 추가를 요청한다.
  private addTodo(): Observable<Todo> {
    /* 서버로 전송할 요청 페이로드
       id는 json-server에 의해 자동 생성된다 */
    const payload = { content: this.content, completed: false };

    return this.http.post<Todo>(this.url, payload);
  }
}
```

<iframe src="https://stackblitz.com/edit/httpclient-post-1?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

POST 요청의 경우, 서버로 전송할 **요청 페이로드**가 존재한다는 점을 제외하면 GET 요청과 동일하다.

컴포넌트는 화면을 구성하는 뷰(View)를 생성하고 관리하는 것이 주된 역할이다. HTTP 통신 기능은 반드시 필요한 기능이지만 컴포넌트의 주 관심사라고 볼 수는 없다. HTTP 통신 기능은 애플리케이션의 전역 관심사이다. 따라서 HTTP 통신 기능은 서비스로 분리하여 애플리케이션 전역에서 모든 구성요소들이 재사용이 가능하도록 작성하는 것이 일반적이다. 위 코드에서 HTTP 요청 기능을 서비스로 분리해보자.

```typescript
// todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  // 서버에 모든 todo를 요청한다.
  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  // 서버에 새로운 todo의 추가를 요청한다.
  add(content: string): Observable<Todo> {
    /* 서버로 전송할 요청 페이로드
       id는 json-server에 의해 자동 생성된다 */
    const payload = { content, completed: false };

    return this.http.post<Todo>(this.url, payload)
      .pipe(catchError(this.handleError));
  }

  // 에러 핸들러 함수
  private handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      // 클라이언트 측의 에러
      console.error(`Client-side error: ${error.error.message}`);
      message = error.error.message;
    } else {
      // 백엔트 측의 에러
      console.error(`Server-side error: ${error.status}`);
      message = error.message;
    }

    // 사용자에게 전달할 메세지를 담은 옵저버블 반환
    return throwError({
      title: 'Something wrong! please try again later.',
      message
    });
  }
}
```

서버에 모든 todo를 요청하는 getAll 메소드와 서버에 새로운 todo의 추가를 요청하는 add 메소드 모두 옵저버블을 반환한다. 컴포넌트는 이 메소드들을 호출하여 옵저버블을 반환받고 구독한다. 서비스를 사용하는 컴포넌트는 아래와 같다.

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from './todo.interface';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" [(ngModel)]="content" placeholder="todo">
    <button (click)="addTodo()">Add</button>
    <ul>
      <li *ngFor="let todo of todos">{{ "{{ todo.content " }}}}</li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `
})
export class AppComponent implements OnInit {
  todos: Todo[];
  content: string;

  constructor(private todo: TodoService) {}

  ngOnInit() {
    // 모든 todo를 획득하여 템플릿에 반영한다.
    this.todo.getAll()
      .subscribe(
        todos => this.todos = todos,
        error => console.error('[TodoService.getAll]', error)
      );
  }

  // 새로운 todo를 생성하고 생성된 todo를 todos 프로퍼티에 추가하여 템플릿에 반영한다.
  addTodo() {
    if (!this.content) { return; }

    this.todo.add(this.content)
      .subscribe(
        todo => this.todos = [...this.todos, todo],
        error => console.error('[TodoService.add]', error)
      );

    this.content = '';
  }
}
```

컴포넌트의 양방향 데이터 바인딩과 서비스에서 사용하는 HttpClient 클래스를 위해 FormsModule과 HttpClientModule을 모듈에 임포트할 필요가 있다. 루트 모듈은 아래와 같다.

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

마지막으로 todo 데이터를 위한 인터페이스가 필요하다.

```typescript
// todo.interface.ts
export interface Todo {
  id: number;
  content: string;
  completed: boolean;
}
```

<iframe src="https://stackblitz.com/edit/httpclient-post-2?ctl=1&embed=1&file=src/app/todo.service.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

## 3.4 PUT

PUT 요청은 리소스를 갱신할 때 사용하며 POST 요청과 마찬가지로 요청 페이로드를 서버로 보내야한다. 참고로 PATCH 요청은 리소스의 일부를 갱신할 때 사용한다.

```typescript
put(url: string, body: any | null, options: {...}): Observable<any>
```

POST 요청에서 작성한 서비스에 PUT 요청을 추가해보자.

```typescript
// todo.service.ts
// 아이디가 일치하는 todo의 내용 전체를 갱신하도록 서버에 요청한다.
change(todo: Todo) {
  /* 서버로 전송할 요청 페이로드
      PUT 요청은 해당 데이터 전체를 갱신한다. */
  const payload = {
    content: 'Angular',
    completed: !todo.completed
  };

  // 요청 url
  const url = `${this.url}/${todo.id}`;

  return this.http.put<Todo>(url, payload)
    .pipe(catchError(this.handleError));
}
```

PUT 요청은 데이터의 일부만을 수정할 때 사용하지 않고 전체를 갱신할 때 사용한다. 요청 페이로드에는 갱신 내용을 담아 서버로 전송한다. 서비스에 추가한 change 메소드를 사용하는 컴포넌트는 아래와 같다.

```typescript
// app.component.ts
...
@Component({
  selector: 'app-root',
  template: `
    <input type="text" [(ngModel)]="content" placeholder="todo">
    <button (click)="addTodo()">Add</button>
    <ul>
      <li *ngFor="let todo of todos"
        [class.completed]="!todo.completed">
        {{ "{{ todo.content " }}}}
        <button (click)="changeTodo(todo)">change</button>
      </li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `,
  styles: [`
    .completed {
      text-decoration: line-through;
    }
  `]
})
export class AppComponent implements OnInit {
  todos: Todo[];

  ...

  // todo의 내용 전체를 갱신하여 템플릿에 반영한다.
  changeTodo(todo: Todo) {
    this.todo.change(todo)
      .subscribe(
        newTodo => this.todos = this.todos.map(
          todo => todo.id === newTodo.id ? newTodo : todo
        ),
        error => console.error('[TodoService.change]', error)
      );
  }
}
```

<iframe src="https://stackblitz.com/edit/httpclient-put?ctl=1&embed=1&file=src/app/todo.service.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

템플릿의 change 버튼을 클릭하면 이벤트 핸들러 changeTodo를 호출하여 서비스의 change 메소드를 호출한다. 이때 서비스의 change 메소드는 todo를 갱신하고 갱신된 todo를 방출하는 옵저버블을 반환한다. 이벤트 핸들러 changeTodo은 반환된 옵저버블을 구독하여 갱신된 todo를 컴포넌트 프로퍼티에 반영한다.

## 3.5 PATCH

PATCH 요청은 리소스의 일부를 갱신할 때 사용하며 PUT 요청과 마찬가지로 요청 페이로드를 서버로 보내야한다. 참고로 PUT 요청은 데이터 전체를 갱신할 때 사용한다.

```typescript
patch(url: string, body: any | null, options: {...}): Observable<any>
```

PUT 요청에서 작성한 서비스에 PATCH 요청을 추가해보자.

```typescript
// todo.service.ts
// 아이디가 일치하는 todo의 completed만을 수정하도록 서버에 요청한다.
toggle(todo: Todo) {
  /* 서버로 전송할 요청 페이로드
      PATCH 요청은 해당 데이터의 일부를 수정한다. */
  const payload = {
    completed: !todo.completed
  };

  // 요청 url
  const url = `${this.url}/${todo.id}`;

  return this.http.patch<Todo>(url, payload)
    .pipe(catchError(this.handleError));
}
```

PATCH 요청은 데이터의 일부만을 수정할 때 사용한다. 요청 페이로드에는 수정 내용을 담아 서버로 전송한다. 서비스에 추가한 toggle 메소드를 사용하는 컴포넌트는 아래와 같다.

```typescript
// app.component.ts
...
@Component({
  selector: 'app-root',
  template: `
    <input type="text" [(ngModel)]="content" placeholder="todo">
    <button (click)="addTodo()">Add</button>
    <ul>
      <li *ngFor="let todo of todos"
        [class.completed]="!todo.completed">
        {{ "{{ todo.content " }}}}
        <button (click)="toggleTodo(todo)">toggle</button>
      </li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `,
  styles: [`
    .completed {
      text-decoration: line-through;
    }
  `]
})
export class AppComponent implements OnInit {
  todos: Todo[];

  ...

  // todo의 completed만을 수정하여 템플릿에 반영한다.
  toggleTodo(todo: Todo) {
    this.todo.toggle(todo)
      .subscribe(
        newTodo => this.todos = this.todos.map(
          todo => todo.id === newTodo.id ? newTodo : todo
        ),
        error => console.error('[TodoService.toggle]', error)
      );
  }
}
```

<iframe src="https://stackblitz.com/edit/httpclient-patch?ctl=1&embed=1&file=src/app/todo.service.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

템플릿의 toggle 버튼을 클릭하면 이벤트 핸들러 toggleTodo를 호출하여 서비스의 toggle 메소드를 호출한다. 이때 서비스의 toggle 메소드는 todo의 completed 프로퍼티 값을 수정하고 수정된 todo를 방출하는 옵저버블을 반환한다. 이벤트 핸들러 toggleTodo은 반환된 옵저버블을 구독하여 수정된 todo를 컴포넌트 프로퍼티에 반영한다.

## 3.6 DELETE

DELETE 요청은 리소스를 삭제할 때 사용하며 GET 요청과 마찬가지로 요청 페이로드가 필요없다. 다만 삭제할 대상을 식별할 수 있는 id와 같은 데이터를 REST API에 첨부하여 서버에 알릴 필요가 있다.

```typescript
delete(url: string, options: {...}): Observable<any>
```

PATCH 요청에서 작성한 서비스에 DELETE 요청을 추가해보자.

```typescript
// todo.service.ts
// 아이디가 일치하는 todo를 삭제하도록 서버에 요청한다.
remove(id: number) {
  // 요청 url
  const url = `${this.url}/${id}`;

  return this.http.delete(url)
    .pipe(catchError(this.handleError));
}
```

서비스에 추가한 remove 메소드를 사용하는 컴포넌트는 아래와 같다.

```typescript
// app.component.ts
...
@Component({
  selector: 'app-root',
  template: `
    <input type="text" [(ngModel)]="content" placeholder="todo">
    <button (click)="addTodo()">Add</button>
    <ul>
      <li *ngFor="let todo of todos"
        [class.completed]="!todo.completed">
        {{ "{{ todo.content " }}}}
        <button (click)="toggleTodo(todo)">toggle</button>
        <button (click)="removeTodo(todo.id)">delete</button>
      </li>
    </ul>
    <pre>{{ "{{ todos | json " }}}}</pre>
  `,
  styles: [`
    .completed {
      text-decoration: line-through;
    }
  `]
})
export class AppComponent implements OnInit {
  todos: Todo[];

  ...

  // id를 전달하여 해당 todo를 삭제하고 템플릿에 반영한다.
  removeTodo(id: number) {
    this.todo.remove(id)
      .subscribe(
        () => this.todos = this.todos.filter(
          todo => todo.id !== id
        ),
        error => console.error('[TodoService.remove]', error)
      );
  }
}
```

<iframe src="https://stackblitz.com/edit/httpclient-delete?ctl=1&embed=1&file=src/app/todo.service.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

템플릿의 delete 버튼을 클릭하면 이벤트 핸들러 removeTodo를 호출하여 서비스의 remove 메소드를 호출한다. 이때 서비스의 remove 메소드는 전달받은 id와 일치하는 todo를 삭제하고 빈 옵저버블을 반환한다. 이벤트 핸들러 removeTodo은 삭제된 todo를 컴포넌트 프로퍼티에 반영한다.

# 4. HTTP 요청 중복 방지

HttpClient은 옵저버블을 반환한다. 옵저버블은 구독(subscribe)되기 전까지 동작하지 않는다. 즉, 옵저버블의 subscribe 메소드가 호출되기 이전에는 아무런 일도 실행하지 않다가 subscribe 메소드가 호출되면 HTTP 요청을 전송한다. 그렇다면 만약 하나의 옵저버블을 두번 구독하면 어떤 일이 발생할지 생각해보자.

```typescript
// 구독 이전: POST 요청이 아직 전송되지 않았다.
const tods$ = this.http.post(this.url, payload);

// 첫 번째 구독: 첫 번째 요청이 전송된다.
tods$.subscribe(...);

// 두 번째 구독: 두 번째 요청이 전송된다.
tods$.subscribe(...);
```

위 예제의 경우 동일한 POST 요청이 2번 전송된다. 코드가 복잡해짐에 따라 옵저버블을 생성하는 코드와 사용하는 코드가 달라지게 되면 하나의 옵저버블을 여러번 구독하여 중복된 요청을 생성할 가능성이 커진다.

이런 상황을 해결하기 위해 RxJS는 5.4.0 버전부터 [shareReplay](https://www.learnrxjs.io/operators/multicasting/sharereplay.html) 오퍼레이터를 추가하였다. 아래의 예제를 살펴보자.

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  template: ''
})
export class AppComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // 구독 이전: POST 요청이 아직 전송되지 않았다.
    const tods$ = this.getTodos();

    // 첫 번째 구독
    tods$.subscribe(console.log);
    // 두 번째 구독
    tods$.subscribe(console.log);
  }

  /* getTodos 메소드가 반환하는 옵저버블은 shareReplay 오퍼레이터에 의해 구독하는 모든 옵저버에 공유된다. */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url)
      .pipe(
        tap(() => console.log('POST Request')),
        shareReplay()
      );
  }
}
```

<iframe src="https://stackblitz.com/edit/rxjs-sharereplay?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1" frameborder="0" width="100%" height="600"></iframe>

위 예제를 실행하여 보면 옵저버블 tods$는 2번 구독되었지만 HTTP 요청은 1번만 전송되는 것을 확인할 수 있다. getTodos 메소드가 반환하는 옵저버블은 shareReplay 오퍼레이터에 의해 구독하는 모든 옵저버에 공유된다.

# 5. 인터셉터 (HttpInterceptor)

HttpClient는 미들웨어 로직을 파이프 라인에 삽입할 수 있는 인터셉터를 도입하였다. 인터셉터를 사용하면 HTTP 요청을 검사하거나 변환할 수 있기 때문에 HTTP 요청 처리 전후에 특정 기능을 실행해야 할 때 유용하다. 또한 인터셉터는 HTTP 요청과 응답을 함께 처리할 수 있기 때문에 로그 처리 또는 요청 소요 시간 확인과 같은 작업을 수행할 수 있다.

인터셉터를 작성하기 위해서는 intercept 메소드의 구현을 강제하는 [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) 인터페이스를 implements하여야 한다.

```typescript
interface HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
```

인터셉터가 어떻게 동작하는지 살펴 보도록 하자. 모든 HTTP 요청 헤더에 인증 토큰을 추가하는 경우이다. 먼저 HttpInterceptor를 구현한 AuthInterceptor 서비스를 작성한다.

```typescript
// auth-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /* AuthService를 주입받는다.
     인증 토큰을 취득하는 AuthService가 별도로 구현되어 있다고 가정한다. */
  constructor(private auth: AuthService) { }

  // ① intercept 메소드는 2개의 파라미터를 갖는다.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // AuthService 서버스로 부터 인증 토큰를 취득한다(잠정 처리)
    const authToken = this.auth.getToken();

    // ② 헤더에 인증 토큰을 추가한 새로운 HttpRequest 객체를 생성(클론)한다
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    /* ③ 클론한 HttpRequest 객체를 원본 HttpRequest 객체 대신 다음 미들웨어 체인으로 전달한다.
       다음 인터셉터가 없는 경우, Observable을 반환하고 종료한다. */
    return next.handle(clonedRequest);
  }
}
```

① intercept 메소드는 2개의 파라미터를 갖는다. 첫 번째 req는 처리할 요청이고 두 번째 next는 다음 인터셉터를 가리키는 핸들러다. 이 핸들러는 [HttpHandler](https://angular.io/api/common/http/HttpHandler) 클래스 타입으로 HttpHandler는 [Express의 미들웨어](./express-basics#4-middleware)와 유사하게 인터셉터를 체이닝할 때 사용한다. 다음 인터셉터가 존재하는 경우, 요청을 다음 인터셉터에 전달하고 다음 인터셉터가 존재하지 않는 경우, 최종 HttpHandler인 [HttpBackend](https://angular.io/api/common/http/HttpBackend)가 되어 요청을 전송하고 Observable을 반환한다.

**인터셉터는 HttpClient 인터페이스와 HTTP 요청을 브라우저 HTTP API를 통해 백엔드로 전달하는 최종 HttpHandler인 HttpBackend 사이에 있으며 여러 개의 인터셉터가 존재할 때 각각의 인터셉터를 순차적으로 연결하는 역할을 하는 것이 HttpHandler이다.**

② 첫 번째 인자로 받은 HttpRequest 객체는 이뮤터블이기 때문에 직접 객체의 내용을 변경할 수 없다. clone 메소드를 사용하여 헤더에 인증 토큰을 추가한 새로운 복사본을 생성한다.

③ 원본 HttpRequest 객체 대신 헤더에 인증 토큰을 추가한 새로운 HttpRequest 객체를 다음 미들웨어 체인으로 전달한다. 다음 인터셉터가 없는 경우, Observable을 반환하고 종료한다.

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
