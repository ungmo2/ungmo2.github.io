---
layout: post
title: Angular <strong>RxJS</strong>
subtitle: Reactive Programming과 RxJS
categories: angular
section: angular
description: Reactive Programming(반응형 프로그래밍)은 옵저버블(Observable) 이벤트 스트림(stream)을 구독(subscribe)하고 이 스트림에 반응하는 방식으로 동작하는 애플리케이션을 작성하는 것을 의미한다. 옵저버블은 Angular의 고유 기능이 아니라 ES7 스펙으로 제안이 되어 있는 비동기 데이터를 관리하기 위한 표준이다. Reactive Programming은 옵저버블 패턴을 좀 더 심화한 패턴으로 이해하면 된다. 이미 많은 라이브러리가 옵저버블 패턴을 지원하고 있고 그중 RxJS는 Angular의 필수 패키지로 채택되어 있다. Reactive Programing은 기본적으로 모든 것을 연속성을 갖는 데이터의 흐름인 스트림으로 본다. 옵저버(Observer)는 데이터 스트림을 구독(subscribe)하여 사용하는 객체이며 옵저버블(Observable)은 데이터 스트림을 생성하는 객체이다. 배열, Ajax 통신 결과, 웹소켓, 사용자 이벤트 등 데이터를 생산하는 것이라면 무엇이든 옵저버블로 만들 수 있다.
---

* TOC
{:toc}

![angular Logo](/img/angular-logo.png)

# 1. Reactive Programming(리액티브 프로그래밍)

Reactive Programming(리액티브/반응형 프로그래밍)은 비동기 데이터 처리를 위해 옵저버블(Observable) 이벤트 스트림(stream)을 구독(subscribe)하고 이 스트림에 반응하는 방식으로 동작하는 애플리케이션을 작성하는 것을 의미한다.

애플리케이션이 외부 환경과 커뮤니케이션을 하는 방법은 크게 Pull-scenario와 Push-scenario로 나눌 수 있다.

Pull-scenario
: 기존의 익숙한 방식으로 애플리케이션은 외부 환경에 요청하고 응답을 획득하는 방식이다. 이때 애플리케이션은 제어 흐름을 직접 통제한다.

Push-scenario
: 외부 환경에 요청 후 응답이 올 때까지 대기하는 것이 아니라 외부 환경에서 응답이 오면 그때 반응한다.

리액티브 프로그래밍은 Push-scenario로 동작한다. 이때 외부 환경에서 내부로 연속적으로 흐르는 데이터를 받는 인터페이스가 필요한데 이것이 바로 옵저버블(Observable)이다.

옵저버블은 Angular의 고유 기능이 아니라 ES7 스펙으로 제안이 되어 있는 비동기 데이터를 처리하기 위한 표준이다. 리액티브 프로그래밍은 옵저버블 패턴을 좀 더 심화한 패턴으로 이미 많은 라이브러리가 옵저버블 패턴을 지원하고 있다. 그중 Angular의 필수 패키지로 채택된 [RxJS](https://github.com/ReactiveX/rxjs)는 비동기 데이터 스트림을 처리하는 API를 제공하는 라이브러리다.

HTTP 요청은 비동기로 처리되기 때문에 작업이 종료되지 않은 상태라도 대기하지 않고(Non-Blocking) 다음 작업을 수행할 수 있다. 이후 서버의 응답이 도착하면 데이터를 처리하거나 화면을 갱신한다. 이러한 비동기 처리는 콜백함수나 [프로미스](./es6-promise) 또는 옵저버블로 구현할 수 있다. 콜백함수를 사용하는 경우, 에러 처리가 어렵고 콜백 헬(Callback Hell) 등의 문제가 발생하므로 프로미스를 사용하는 것이 더 나은 방법이지만 프로미스는 아래와 같은 단점이 있다.

- 한번에 하나의 데이터를 처리하기 때문에 연속성을 갖는 데이터를 처리할 수 없다.
- 서버로 보낸 요청은 취소할 수 없다.

옵저버블은 프로미스의 단점을 해결할 수 있는 더 나은 대안이다. 옵저버블은 연속성을 갖는 데이터 스트림을 스트리밍(streaming)하고 옵저버는 연속적으로 보내진 데이터를 받아 처리한다.

리액티브 프로그래밍은 기본적으로 모든 것을 연속성을 갖는 데이터의 흐름인 스트림으로 본다. **옵저버(Observer)는 데이터 스트림을 구독(subscribe)하여 사용하는 객체**이며 **옵저버블(Observable)은 데이터 스트림을 생성하는 객체**이다. 배열, Ajax 통신 결과, 웹소켓, 사용자 이벤트 등 데이터를 생산하는 것이라면 무엇이든 옵저버블로 만들 수 있다.

![observable](/img/observable.png)

Observable과 Observer
{: .desc-img}

옵저버블은 옵저버블을 생성(Creating), 변환(Transforming), 필터링(Filtering), 오류 처리(Error Handling)하는 [오퍼레이터(Operator)](http://reactivex.io/documentation/operators.html)를 사용할 수 있다. 대부분의 오퍼레이터는 옵저버블 상에서 동작하고 옵저버블을 리턴한다. 아래 그림은 옵저버블이 [map](http://reactivex.io/documentation/operators/map.html) 오퍼레이터를 통해 변환(Transforming)된 옵저버블을 반환하는 마블 다이어그램(Marble diagram)이다.

![observable-map](/img/observable-map.png)

Observable의 map operator
{: .desc-img}

간단한 예제를 통해 옵저버블의 동작을 살펴보자.

```typescript
// observable.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Observable operators
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

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
    const observable$ = Observable.from(this.myArray);

    this.subscription = observable$
      // ② 옵저버블 변형
      .map(item => item * 2)
      .filter(item => item > 5)
      // ③ 옵저버블 구독
      .subscribe(
        // next
        value => {
          console.log(value); // 6, 8, 10
          this.values.push(value);
        },
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

① Observable의 [from](http://reactivex.io/documentation/operators/from.html) 오퍼레이터를 사용하여 옵저버블을 생성하였다. from 오퍼레이터를 사용하기 위해 아래와 같이 임포트한다.

```typescript
import 'rxjs/add/observable/from';
```

② map과 filter 오퍼레이터를 사용하여 옵저버블을 변형(transforming), 필터링하였다. 오퍼레이터는 옵저버블을 반환하므로 체이닝이 가능하다. map과 filter 오퍼레이터를 사용하기 위해 아래와 같이 임포트한다.

```typescript
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
```

③ Observable의 [subscribe](http://reactivex.io/documentation/operators/subscribe.html) 오퍼레이터의 인자에 옵저버를 전달하여 옵저버블을 구독하면 옵저버블은 엘리먼트와 에러 그리고 스트리밍의 종료 여부를 옵저버에 전달한다. 옵저버는 3개의 콜백함수 next, error, complete를 갖는데 이 콜백함수로 옵저버블이 전달한 엘리먼트와 에러 그리고 스트리밍의 종료 여부를 받아 처리한다.

![observable-observer](/img/observable-observer.png)
{: .w-400}

Observable과 Observer
{: .desc-img}

④ 옵저버블이 생성한 데이터 스트림을 subscribe 함수로 구독하면 **Subscription** 객체를 반환한다. 이 Subscription 객체는 구독을 취소할 때 사용할 수 있다.

<iframe src="https://stackblitz.com/edit/observable-exam?embed=1&file=app/observable.component.ts" frameborder="0" width="100%" height="400"></iframe>

# 2. 옵저버블 이벤트 스트림

뷰에서 이벤트가 발생하면 일반적인 자바스크립트 애플리케이션은 한번만 이벤트를 처리한다. 예를 들어 input 요소의 keyup 이벤트는 연속적으로 발생하고 일반적인 자바스크립트 애플리케이션은 이벤트가 발생할 때마다 이벤트 핸들러를 호출한다. 만약 keyup 이벤트가 발생될 때마다 input 요소의 입력값을 가지고 서버에 요청을 보내는 경우, 이벤트가 발생할 때마다 계속해서 서버에 요청을 보낼 것이다. 이러한 경우에 setTimeout()으로 사용자가 다음 입력을 할 때까지 서버에 요청을 멈추고 일정 시간 대기할 수도 있겠지만 이것도 완전한 대응 방법은 아니며 한번 전송된 요청은 취소할 수 없기 때문에 불필요한 요청이 발생할 수 있다.

다시 말해 이것은 비동기 처리에 있어서 콜백함수나 프로미스를 사용할 때의 단점이다.

- 한번에 하나의 데이터를 처리하기 때문에 연속성을 갖는 데이터를 처리할 수 없다.
- 서버로 보낸 요청은 취소할 수 없다.

옵저버블은 이러한 단점을 보완하기 위해 발전된 해결 방법을 제시한다. 이벤트 데이터 스트림을 발생시키는 간단한 예제를 작성해보자.

```typescript
// observable-event-http.component
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Observable operators
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

interface GithubUser {
  login: number;
  name: string;
}

@Component({
  selector: 'app-root',
  template: `
    <h2>Observable Events</h2>
    <p><input type="text" placeholder="Enter user id" [formControl]="serchInput"></p>
    <pre>{{ "{{ githubUser | json " }}}}</pre>
  `
})
export class ObservableEventHttpComponent implements OnInit {
  // ① Angular forms
  serchInput: FormControl = new FormControl('');
  githubUser: GithubUser;

  // ② HttpClient를 의존성 주입한다.
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // ① valueChanges 이벤트 옵저버블을 구독하면 컨트롤 값의 변경 내용을 옵저버블 스트림으로 수신할 수 있다.
    this.serchInput.valueChanges
    // ③ debounceTime 오퍼레이터는 다음 이벤트를 즉시 발생시키지 않고 지정 시간만큼 지연시킨다.
    .debounceTime(500)
    // ④ switchMap 오퍼레이터는 옵저버블을 받아서 새로운 옵저버블을 생성한다.
    .switchMap(userId => this.getGithubUser(userId))
    // ⑥ 옵저버블을 subscribe 오퍼레이터로 구독하면 옵저버가 데이터 스트림을 사용할 수 있다.
    .subscribe(user => this.githubUser = user);
  }

  // ⑤ 서버로 부터 데이터를 응답받아 옵저버블은 반환한다.
  getGithubUser(userId: string): Observable<GithubUser> {
    console.log(userId, typeof userId);
    return this.http
      .get<GithubUser>(`https://api.github.com/users/${userId}`)
      .map(user => ({ login: user.login, name: user.name }))
      .do(console.log)
      // ⑦ Error handling
      .catch(err => {
        if (err.status === 404) {
          console.log(`[ERROR] Not found user: ${userId}`);
          return Observable.of<GithubUser>(err);
        } else {
          throw err;
        }
      });
  }
}
```

① input 요소의 이벤트는 FormControl인 serchInput의 valueChanges 프로퍼티에 의해 옵저버블 스트림으로 변환된다. [FormControl](https://angular.io/api/forms/FormControlDirective)에 대해서는 [Forms](./angular-forms)에서 상세히 살펴보도록 하고 지금은 옵저버블에 집중하도록 하자. FormControl를 사용하기 위해서는 모듈에 ReactiveFormsModule을 임포트하여야 한다.

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

② [HttpClient](https://angular.io/api/common/http/HttpClient)는 HTTP 요청을 수행하는 주입가능한 클래스이다. HttpClient에 대해서는 [HTTP](./angular-http)에서 상세히 알아볼 것이다. HttpClient 클래스를 사용하기 위해서는 모듈에 HttpClientModule을 임포트하여야 한다.

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

④ [switchMap](https://www.learnrxjs.io/operators/transformation/switchmap.html) 오퍼레이터는 옵저버블을 받아서 새로운 옵저버블을 생성한다. 즉 switchMap 오퍼레이터는 input 요소의 이벤트 스트림 옵저버블을 받아서 getGithubUser 메소드를 실행하여 새로운 옵저버블을 생성한다. 이때 getGithubUser 메소드의 실행이 완료되지 않아 새로운 옵저버블이 완성되지 않은 상태일 때, 새로운 input 요소의 이벤트가 발생하면 getGithubUser 메소드의 실행을 취소하고 새롭게 getGithubUser 메소드를 실행한다. getGithubUser 메소드의 실행이 취소되면 HTTP 요청도 취소된다.

![switchMap](/img/switchMap.png)
{: .w-400}

switchMap 오퍼레이터
{: .desc-img}

만약 사용자가 debounceTime 오퍼레이터에 지정한 500ms보다 늦게 값을 입력하면 input 요소의 이벤트가 switchMap 오퍼레이터로 전달된다. 이때 이미 getGithubUser 메소드가 실행 중이라면 getGithubUser 메소드의 실행은 취소되고 HTTP 요청도 취소된다.

테스트를 위해 input 요소에 입력을 느리게 해보자. 그러면 500ms마다 HTTP 요청이 발생할 것이다. 이때 getGithubUser 메소드의 실행 시간이 500ms를 초과하면 HTTP 요청이 취소될 것이다.

![cancelable http request](/img/cancelable-http-request.png)

옵저버블을 사용하면 불필요한 HTTP 요청을 취소할 수 있다.
{: .desc-img}

⑤ getGithubUser 메소드는 서버로 부터 데이터를 응답받아 옵저버블은 반환한다.

⑥ serchInput의 valueChanges 프로퍼티에 의해 생성된 옵저버블을 subscribe 오퍼레이터로 구독하면 옵저버가 데이터 스트림을 사용할 수 있다. 옵저버는 getGithubUser 메소드가 서버로 부터 응답받은 user를 githubUser 프로퍼티에 할당한다.

**주의할 것은 실제 HTTP 요청은 subscribe() 함수를 실행할 때 발생한다는 것이다. 옵저버블을 구독하지 않으면 어떠한 요청도 발생하지 않는다. 또한 옵저버블을 여러번 구독하면 HTTP 요청이 여러번 발생한다.**

⑦ [catch](https://www.learnrxjs.io/operators/error_handling/catch.html) 오퍼레이터는 옵저버블의 에러를 캐치한다.

<iframe src="https://stackblitz.com/edit/observable-http-exam?embed=1&file=app/observable-event-http.component.ts" frameborder="0" width="100%" height="400"></iframe>

# Reference

* [ReactiveX](http://reactivex.io/)

* [Learn RxJS](https://www.learnrxjs.io/)

* [RxJS - Javascript library for functional reactive programming](http://xgrommx.github.io/rx-book/index.html)

* [Rx Visualizer](https://rxviz.com/)

* [RxJS Marbles](http://rxmarbles.com/)
