---
layout: post
title: Angular <strong>RxJS</strong>
subtitle: Reactive Programming과 RxJS
categories: angular
section: angular
description: 리액티브(Reactive, 반응형) 프로그래밍은 비동기 데이터 스트림(Asynchronous data stream)에 기반을 둔 프로그래밍 패러다임이다. 데이터 스트림이란 연속된 데이터의 흐름을 말하며 리액티브 프로그래밍은 기본적으로 모든 것을 연속성을 갖는 데이터의 흐름인 스트림으로 본다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. 리액티브 프로그래밍이란?

리액티브(Reactive, 반응형) 프로그래밍은 비동기 데이터 스트림(Asynchronous data stream)에 기반을 둔 프로그래밍 패러다임이다. 데이터 스트림이란 연속된 데이터의 흐름을 말하며 리액티브 프로그래밍은 기본적으로 모든 것을 연속성을 갖는 데이터의 흐름인 스트림으로 본다.

기존의 프로그래밍 방식대로라면 배열과 함수 반환값과 같은 동기 데이터와 Ajax 통신 결과, 사용자 이벤트와 같은 비동기 데이터는 처리 방식이 제각각이지만, 리액티브 프로그래밍은 동기/비동기와 관계없이 데이터를 생산하는 것이라면 무엇이든 시간축을 따라 연속적으로 흐르는 데이터 스트림으로 처리한다. 리액티브 프로그래밍은 다양한 데이터를 데이터 스트림이라는 하나의 일관된 방식으로 구독(subscribe)하고 데이터 스트림의 상태 변화에 반응하는 방식으로 동작하는 애플리케이션을 작성하는 것을 말한다.

![observable-map](/img/observable-map.png)

map 오퍼레이터에 의한 데이터 스트림의 변형
{: .desc-img}

애플리케이션이 외부 환경과 커뮤니케이션을 하는 방법은 크게 Pull-scenario와 Push-scenario로 나눌 수 있다.

풀 시나리오(Pull-scenario)
: 기존의 익숙한 방식으로 애플리케이션은 외부 환경에 요청하고 응답을 획득하는 방식이다. 이때 애플리케이션은 제어 흐름을 직접 통제한다.

푸시 시나리오(Push-scenario)
: 애플리케이션이 외부 환경에 요청 후 응답이 올 때까지 대기하는 것이 아니라 외부 환경에서 응답이 오면 그때 반응한다.

리액티브 프로그래밍은 Push-scenario로 동작한다. 이때 외부 환경에서 내부로 연속적으로 흐르는 데이터, 즉 데이터 스트림을 생성하는 객체를 **옵저버블(Observable)**이라 하고, 데이터 스트림을 사용하는 객체를 **옵저버(Observer)**라 한다. 다시 말해, 데이터 소비자(Data consumer)인 옵저버는 데이터 생산자(Data producer)인 옵저버블을 **구독(subscribe)**한다. 이 구독에 의해 옵저버는 옵저버블에 연결되어 옵저버블의 상태를 관찰한다. 그리고 옵저버블의 상태가 변경되면 상태는 데이터 스트림을 통해 옵저버에 자동으로 전파된다.

예를 들어 TV 방송국은 영상 정보를 연속해서 송출한다. TV는 방송국을 관찰하고 있다가 방송국이 새로운 영상 정보를 송출하면 이를 수신하고 TV 화면에 표시한다. 이때 TV 방송국은 옵저버블이며 TV는 옵저버라고 할 수 있다.

![observable](/img/observable.png)

Observable과 Observer
{: .desc-img}

옵저버블은 Angular의 고유 기능이 아니라 ES7 스펙으로 제안이 되어 있는 비동기 데이터를 처리하기 위한 표준이다. 리액티브 프로그래밍은 옵저버(Observer) 패턴을 좀 더 심화한 패턴으로 이미 다양한 라이브러리가 지원하고 있다.

![observer-pattern](/img/observer-pattern.png)

옵저버 패턴
{: .desc-img}

<!-- ![reactive-programming](/img/reactive-programming.png)

리액티브 프로그래밍
{: .desc-img} -->

그중 Angular의 필수 패키지로 채택된 [RxJS](http://reactivex.io/rxjs/)는 비동기 데이터 스트림을 처리하는 API를 제공하는 자바스크립트 라이브러리다.

# 2. 리액티브 프로그래밍의 특징

HTTP 요청은 비동기로 처리되기 때문에 작업이 종료되지 않은 상태라도 대기하지 않고(Non-Blocking) 다음 작업을 수행할 수 있다. 이후 서버의 응답이 도착하면 데이터를 처리하거나 화면을 갱신한다. 이러한 비동기 처리는 콜백함수나 [프로미스](./es6-promise), Generator, async/await 또는 옵저버블로 구현할 수 있다. 콜백함수를 사용하는 경우, 에러 처리가 어렵고 콜백 헬(Callback Hell) 등의 문제가 발생하므로 프로미스를 사용하는 것이 더 나은 방법이지만 프로미스는 아래와 같은 단점이 있다.

- 한 번에 하나의 데이터를 처리하기 때문에 연속성을 갖는 데이터를 처리할 수 없다.
- 서버로 보낸 요청은 취소할 수 없다.

옵저버블은 기존 비동기 처리 방식의 단점을 해결할 수 있는 더 나은 대안이다.

또 다른 문제는 처리해야 할 데이터의 유형이 다양하다는 것이다. 애플리케이션이 처리해야 할 데이터는 배열과 함수 반환값과 같은 동기 데이터와 Ajax 통신 결과, 사용자 이벤트와 같은 비동기 데이터 등 여러 가지의 유형을 가지며 이러한 데이터의 유형에 따라 처리하는 방식도 제각각이다. 리액티브 프로그래밍은 동기/비동기와 관계없이 데이터를 생산하는 것이라면 무엇이든 옵저버블로 만들 수 있다. 리액티브 프로그래밍은 이처럼 다양한 형태의 데이터를 처리하기 위한 일관된 방식을 제공하며 이를 통해 안전하고 통일된 데이터 처리가 가능하다.

# 3. RxJS 임포트

Angular CLI를 사용하여 생성한 프로젝트에는 RxJS 라이브러리가 포함되어 있다. 따라서 RxJS를 사용하기 위해 별도의 설치는 필요없다. RxJS의 임포트 패스는 아래와 같다.

- rxjs: 옵저버블, 옵저버블 생성 메소드, pipe, 스케쥴러, 유틸리티 등

```typescript
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
```

- rxjs/operators: pipe 내에서 사용할 수 있는 모든 오퍼레이터

```typescript
import { map, filter, scan, tap } from 'rxjs/operators';
```

# 4. 옵저버블(Observable)과 옵저버(Observer)

위에서 살펴본 바와 같이 연속적으로 흐르는 데이터, 즉 데이터 스트림을 생성하는 객체를 **옵저버블(Observable)**이라 하고, 데이터 스트림을 구독(subscribe)하여 사용하는 객체를 **옵저버(Observer)**라 한다. 다시 말해 옵저버블은 연속성을 갖는 데이터 스트림을 스트리밍(streaming)하고 옵저버는 연속적으로 보내진 데이터를 받아 처리한다.

구현의 관점에서 말하자면 옵저버블은 subscribe 메소드를 소유하며, 이 subscribe 메소드의 인자로 옵저버를 전달한다. 이로써 옵저버는 옵저버블을 구독하고 옵저버블이 생성한 데이터 스트림을 받아 처리한다. 마우스의 좌표를 표시하는 간단한 예제를 살펴보자.

```typescript
import { Component, OnInit } from '@angular/core';

// ① RxJS 임포트
import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h3>Mouse Coordinates</h3>
    <h3>X: {{ "{{ posX " }}}} Y: {{ "{{ posY " }}}}</h3>
  `
})
export class AppComponent implements OnInit {
  mousePositon$ :Observable<Event>;
  posX: number = 0;
  posY: number = 0;

  ngOnInit() {
    // ② 옵저버블의 생성(DOM 이벤트를 옵저버블로 변환)
    this.mousePositon$ = fromEvent(document, 'mousemove');

    // ③ 옵저버는 옵저버블을 구독하고 옵저버블이 생성한 데이터 스트림을 받아 처리한다.
    this.mousePositon$.subscribe(
      // MouseEvent가 발생하면 옵저버블은 옵저버에 상태를 전파한다.
      (event: MouseEvent) => {
        this.posX = event.clientX;
        this.posY = event.clientY;
      },
      error => console.log(error),
      () => console.log('complete!')
    );
  }
}
```

① Observable과 fromEvent 메소드를 임포트한다.

② fromEvent 오퍼레이터를 사용하여 document 요소의 mousemove 이벤트를 옵저버블로 변환하였다. 데이터를 생산하는 것이라면 무엇이든 옵저버블로 만들 수 있다.

③ subscribe 메소드를 사용하여 옵저버가 옵저버블을 구독하도록 하였다. 옵저버는 next, error, complete 메소드를 갖는 객체이며 subscribe 메소드의 인자로 사용하면 옵저버블을 구독한다. 옵저버블은 mousemove 이벤트를 데이터 스트림으로 생성하고 옵저버에게 전파한다. 옵저버블은 구독을 해지(unsubscribe)하거나 옵저버가 complete 메소드를 호출할 때까지 옵저버에게 새로운 데이터를 계속해서 전파한다. 이때 옵저버에게 새로운 값이 성공적으로 전달되면 next 메소드를 호출하고 에러가 발생하면 error를 호출한다.

위 예제는 subscribe 메소드의 인자로 next, error, complete 메소드를 전달하였다. subscribe 메소드의 인자로 next, error, complete 메소드를 갖는 객체 리터럴을 전달하는 것도 유효하다.

```typescript
...
  this.mousePositon$.subscribe({
    next: (event: MouseEvent) => {
      this.posX = event.clientX;
      this.posY = event.clientY;
    },
    error: error => console.log(error),
    complete: () => console.log('complete!')
  });
...
```

<iframe src="https://stackblitz.com/edit/rxjs6-observable?embed=1&file=app/app.component.ts" frameborder="0" width="100%" height="400"></iframe>

# 5. 오퍼레이터(Operator)

[오퍼레이터(Operator)](http://reactivex.io/documentation/operators.html)는 옵저버블의 생성(Creating), 변환(Transforming), 필터링(Filtering), 오류 처리(Error Handling)의 기능을 하는 함수이다.

오퍼레이터는 새로운 옵저버블을 리턴하므로 subscribe 메소드에 도달하기 전까지 체이닝을 통해 데이터를 전달할 수 있다. 체이닝으로 이어지는 이 과정을 옵저버블 시퀀스(Observable sequence)라고 부른다. 간단한 예제를 통해 오퍼레이터의 동작을 살펴보자.

```typescript
// observable.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';

// RxJS 임포트
import { Observable, Subscription, from } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: '<p>{{ "{{ values " }}}}</p>'
})
export class ObservableComponent implements OnInit, OnDestroy {
  myArray = [1, 2, 3, 4, 5];
  subscription: Subscription;
  values: number[] = [];

  ngOnInit() {
    // ① 옵저버블 생성
    const observable$ = from(this.myArray);

    this.subscription = observable$
      .pipe(
        // ② 옵저버블 변형
        map(item => item * 2), // 2, 4, 6, 8, 10
        filter(item => item > 5), // 6, 8, 10
        tap(item => console.log(item)) // 6, 8, 10
      )
      // ③ 옵저버블 구독
      .subscribe(
        // next
        value => this.values.push(value),
        // error
        error => console.log(error),
        // complete
        () => console.log('Streaming finished')
      );
  }

  ngOnDestroy() {
    // ④ 옵저버블 구독 해지
    this.subscription.unsubscribe();
  }
}
```

① [from](https://www.learnrxjs.io/operators/creation/from.html) 오퍼레이터를 사용하여 옵저버블을 생성하였다.

from 오퍼레이터는 배열과 같은 [이터러블(Iterable)](./es6-iteration-for-of)을 인자로 전달받아 옵저버블을 생성한다.
{: .info}

② map과 filter 오퍼레이터를 사용하여 옵저버블을 변형(transforming), 필터링하였다. 오퍼레이터는 옵저버블을 반환하므로 체이닝이 가능하다.

[map](https://www.learnrxjs.io/operators/transformation/map.html) 오퍼레이터는 옵저버블이 전달한 요소에 대하여 인자로 전달된 콜백 함수를 실행하고 그 결과값으로 이루어진 새로운 옵저버블을 반환한다. [Array.prototype.map](./js-array#513-arrayprototypemap)과 유사하게 동작한다.
{: .info}

[filter](https://www.learnrxjs.io/operators/filtering/filter.html) 오퍼레이터는 옵저버블이 전달한 요소에 대하여 인자로 전달된 필터 함수를 실행하여 그 결과값이 true인 값만을 추출한 새로운 옵저버블을 반환한다. [Array.prototype.filter](./js-array#514-arrayprototypefilter)와 유사하게 동작한다.
{: .info}

③ [subscribe](http://reactivex.io/documentation/operators/subscribe.html) 오퍼레이터의 인자에 옵저버를 전달하여 옵저버블을 구독하면 옵저버블은 엘리먼트와 에러 그리고 스트리밍의 종료 여부를 옵저버에 전달한다. 옵저버는 3개의 콜백 함수 next, error, complete 메소드를 갖는데 이 콜백 함수로 옵저버블이 전달한 엘리먼트와 에러 그리고 스트리밍의 종료 여부를 받아 처리한다.

![observable-observer](/img/observable-observer.png)
{: .w-400}

Observable과 Observer
{: .desc-img}

④ 옵저버블이 생성한 데이터 스트림을 subscribe 오퍼레이터로 구독하면 **Subscription** 객체를 반환한다. 이 Subscription 객체는 구독을 취소할 때 사용할 수 있다. **메모리 누수를 방지하기 위해 OnDestroy 생명주기 훅을 사용하여 구독을 취소하도록 한다.**

<iframe src="https://stackblitz.com/edit/rxjs6-operator?embed=1&file=app/observable.component.ts" frameborder="0" width="100%" height="400"></iframe>

# 6. 옵저버블 이벤트 스트림 예제

뷰에서 이벤트가 발생하면 일반적인 자바스크립트 애플리케이션은 한 번만 이벤트를 처리한다. 예를 들어 input 요소의 keyup 이벤트는 연속적으로 발생하고 일반적인 자바스크립트 애플리케이션은 이벤트가 발생할 때마다 이벤트 핸들러를 호출한다.

만약 keyup 이벤트가 발생될 때마다 input 요소의 입력값을 가지고 서버에 요청을 보내는 경우, 이벤트가 발생할 때마다 계속해서 서버에 요청을 보낼 것이다. 이러한 경우에 setTimeout()으로 사용자가 다음 입력을 할 때까지 서버에 요청을 멈추고 일정 시간 대기할 수도 있겠지만 이것도 완전한 대응 방법은 아니며 한 번 전송된 요청은 취소할 수 없기 때문에 불필요한 요청이 발생할 수 있다.

다시 말해 이것은 비동기 처리에 있어서 콜백 함수나 프로미스를 사용할 때의 단점이다.

- 한번에 하나의 데이터를 처리하기 때문에 연속성을 갖는 데이터를 처리할 수 없다.
- 서버로 보낸 요청은 취소할 수 없다.

옵저버블은 이러한 단점을 보완하기 위해 발전된 해결 방법을 제시한다. 이벤트 데이터 스트림을 발생시키는 간단한 예제를 작성해보자.

```typescript
// observable-event-http.component
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// RxJS 임포트
import { Subscription, Observable, of, throwError } from 'rxjs';
import { debounceTime, switchMap, map, tap, catchError } from 'rxjs/operators';

interface GithubUser {
  login: number;
  name: string;
}

@Component({
  selector: 'app-root',
  template: `
    <h2>Observable Events</h2>
    <input type="text"
      placeholder="Enter github userid"
      [formControl]="searchInput">
    <pre>{{ "{{ githubUser | json " }}}}</pre>
  `
})
export class ObservableEventHttpComponent implements OnInit, OnDestroy {
  // ① Angular forms
  searchInput: FormControl = new FormControl('');
  githubUser: GithubUser;
  subscription: Subscription;

  // ② HttpClient를 의존성 주입한다.
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // ① valueChanges 이벤트 옵저버블을 구독하면 컨트롤 값의 변경 내용을 옵저버블 스트림으로 수신할 수 있다.
    this.subscription = this.searchInput.valueChanges
      .pipe(
        // ③ debounceTime 오퍼레이터는 다음 이벤트를 즉시 발생시키지 않고 지정 시간만큼 지연시킨다.
        debounceTime(500),
        // ④ switchMap 오퍼레이터는 옵저버블을 받아서 새로운 옵저버블을 생성한다.
        switchMap(userId => this.getGithubUser(userId))
      )
      // ⑥ 옵저버블을 subscribe 오퍼레이터로 구독하면 옵저버가 데이터 스트림을 사용할 수 있다.
      .subscribe(
        user => this.githubUser = user,
        error => console.log(error)
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // ⑤ 서버로 부터 데이터를 응답받아 옵저버블은 반환한다.
  getGithubUser(userId: string): Observable<GithubUser> {
    return this.http
      .get<GithubUser>(`https://api.github.com/users/${userId}`)
      .pipe(
        map(user => ({ login: user.login, name: user.name })),
        tap(console.log),
        // ⑦ Error handling
        catchError(err => {
          if (err.status === 404) {
            return of(`[ERROR] Not found user: ${userId}`);
          } else {
            return throwError(err);
          }
        })
      );
  }
}
```

① input 요소의 이벤트는 FormControl인 searchInput의 valueChanges 프로퍼티에 의해 옵저버블 스트림으로 변환된다. [FormControl](https://angular.io/api/forms/FormControlDirective)에 대해서는 [Angular Forms](./angular-form-reactive-forms#22-formcontrol-클래스와-formcontrolname-디렉티브)에서 상세히 살펴보도록 하고 지금은 옵저버블에 집중하도록 하자. FormControl를 사용하기 위해서는 모듈에 ReactiveFormsModule을 임포트하여야 한다.

```typescript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// FormControl를 사용하기 위해서는 모듈에 ReactiveFormsModule을 임포트
import { ReactiveFormsModule } from '@angular/forms';
...

@NgModule({
  ...
  imports: [
    BrowserModule,
    // FormControl를 사용하기 위해서는 모듈에 ReactiveFormsModule을 임포트
    ReactiveFormsModule
  ],
  ...
})
export class AppModule { }
```

② [HttpClient](https://angular.io/api/common/http/HttpClient)는 HTTP 요청을 수행하는 주입가능한 서비스이다. HttpClient에 대해서는 [HTTP](./angular-http)에서 상세히 알아볼 것이다. HttpClient 클래스를 사용하기 위해서는 모듈에 HttpClientModule을 임포트하여야 한다.

```typescript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// FormControl를 사용하기 위해서는 모듈에 ReactiveFormsModule을 임포트
import { ReactiveFormsModule } from '@angular/forms';
// HttpClient 클래스를 사용하기 위해서는 모듈에 HttpClientModule을 임포트
import { HttpClientModule } from '@angular/common/http';
...

@NgModule({
  ...
  imports: [
    BrowserModule,
    // FormControl를 사용하기 위해서는 모듈에 ReactiveFormsModule을 임포트
    ReactiveFormsModule,
    // HttpClient 클래스를 사용하기 위해서는 모듈에 HttpClientModule을 임포트
    HttpClientModule
  ],
  ...
})
export class AppModule { }
```

③ [debounceTime](https://www.learnrxjs.io/operators/filtering/debouncetime.html) 오퍼레이터는 다음 이벤트를 즉시 발생시키지 않고 지정 시간만큼 지연시킨다.

④ [switchMap](https://www.learnrxjs.io/operators/transformation/switchmap.html) 오퍼레이터는 옵저버블을 받아서 새로운 옵저버블을 생성한다. 위 예제에서 switchMap 오퍼레이터는 input 요소의 이벤트 스트림 옵저버블을 받아서 getGithubUser 메소드를 실행하여 새로운 옵저버블을 생성한다. 이때 getGithubUser 메소드의 실행이 완료되지 않아 새로운 옵저버블이 완성되지 않은 상태일 때, 새로운 input 요소의 이벤트가 발생하면 getGithubUser 메소드의 실행을 취소하고 새롭게 getGithubUser 메소드를 실행한다. getGithubUser 메소드의 실행이 취소되면 HTTP 요청도 취소된다.

![switchMap](/img/switchMap.png)
{: .w-400}

switchMap 오퍼레이터
{: .desc-img}

만약 사용자가 debounceTime 오퍼레이터에 지정한 500ms보다 늦게 값을 입력하면 input 요소의 이벤트가 switchMap 오퍼레이터로 전달된다. 이때 이미 getGithubUser 메소드가 실행 중이라면 getGithubUser 메소드의 실행은 취소되고 HTTP 요청도 취소된다.

테스트를 위해 input 요소에 입력을 느리게 해보자. 그러면 500ms마다 HTTP 요청이 발생할 것이다. 이때 getGithubUser 메소드의 실행 시간이 500ms를 초과하면 HTTP 요청이 취소될 것이다.

![cancelable http request](/img/cancelable-http-request.png)
{: .w-650}

옵저버블을 사용하면 불필요한 HTTP 요청을 취소할 수 있다.
{: .desc-img}

⑤ getGithubUser 메소드는 서버로 부터 데이터를 응답받아 옵저버블은 반환한다.

⑥ searchInput의 valueChanges 프로퍼티에 의해 생성된 옵저버블을 subscribe 오퍼레이터로 구독하면 옵저버가 데이터 스트림을 사용할 수 있다. 옵저버는 getGithubUser 메소드가 서버로 부터 응답받은 user를 githubUser 프로퍼티에 할당한다.

**주의할 것은 실제 HTTP 요청은 subscribe 오퍼레이터를 실행할 때 발생한다는 것이다. 옵저버블을 구독하지 않으면 어떠한 요청도 발생하지 않는다. 또한 옵저버블을 여러 번 구독하면 HTTP 요청이 여러 번 발생한다.**

⑦ [catchError](http://reactivex.io/rxjs/function/index.html#static-function-catchError) 오퍼레이터는 옵저버블 시퀀스에서 발생한 에러를 캐치한다.

<iframe src="https://stackblitz.com/edit/rxjs6-observable-http?embed=1&file=app/observable-event-http.component.ts" frameborder="0" width="100%" height="400"></iframe>

# Reference

* [ReactiveX](http://reactivex.io/)

* [Learn RxJS](https://www.learnrxjs.io/)

* [RxJS - Javascript library for functional reactive programming](http://xgrommx.github.io/rx-book/index.html)

* [Rx Visualizer](https://rxviz.com/)

* [RxJS Marbles](http://rxmarbles.com/)
