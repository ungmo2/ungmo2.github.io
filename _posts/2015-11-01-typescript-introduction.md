---
layout: post
title: TypeScript - <strong>Intro & Install</strong>
subtitle: TypeScript의 소개와 개발 환경 구축
categories: typescript
section: typescript
description: TypeScript의 소개와 개발 환경 구축, TypeScript 설치, TypeScript 컴파일러
---

* TOC
{:toc}

![typescript Logo](/img/typescript-logo.png)

# 1. Introduction

JavaScript는 1995년 Brendan Eich(Nescape)이 Navigator 2를 위하여 웹페이지에 포함되는 스크립트 언어로서 개발되었으며 초창기 Javascript는 웹페이지에 있어서 보조적인 기능을 수행하기 위해 <strong>한정적인 용도</strong>로 주로 사용되었다. 이 시기에 대부분의 로직은 주로 웹서버에서 실행되었고 브라우저(클라이언트)는 서버로 부터 전달받은 HTML과 CSS를 렌더링하는 수준이었다.

[HTML5](./html5-syntax)이 등장하기 이전까지 웹 애플리케이션은 Flash, Silverlight, ActiveX 등 <strong>Plug-in</strong>에 의존하여 인터랙티브한 웹페이지를 구축해왔다.

HTML5의 등장은 Plug-in에 의존하는 기존의 구축 방식을 JavaScript로 대체시켰다. 이에 따라 과거 서버측이 담당하던 업무의 많은 부분이 클라이언트 측으로 이동하게 하였고 JavaScript는 웹의 Assembly 언어로 불려질만큼 중요한 언어로 그 위상이 높아지게 되었다.

JavaScript is the Assembly Language of the Web.  
- Scott Hanselman
{: .info}

모든 프로그래밍 언어는 좋은 점과 나쁜 점을 모두 가지고 있다. JavaScript도 언어가 잘 정제되기 이전에 서둘러 출시된 문제와 과거 웹페이지 제작에 있어서 보조적인 기능을 수행하기 위해 한정적인 용도로 만들어진 <strong>태생적 한계</strong>로 좋은 점도, 나쁜 점도 많은 것이 사실이다.

또한 JavaScript는 C 또는 Java 등의 C-family 언어와는 다른 특성을 가지고 있다.

- [Prototype-based Object Oriented Language](js-prototype)  
- [Scope](./js-scope)와 [this](./js-this)  
- [동적 타입(dynamic typed) 언어 혹은 느슨한 타입(loosely typed) 언어](./js-data-type-variable)

이와 같은 특성은 Class 기반 객체지향 언어(Java, C++, C#, Python, PHP, Ruby, Object-C)에 익숙한 개발자를 혼란스럽게 하며 코드가 복잡해질 수 있고 디버그와 테스트 공수가 증가하는 등의 문제를 야기시킬 수 있어 특히 대규모 개발 시에는 주의하여야 한다.

이같은 JavaScript의 태생적 문제를 극복하기 위한 노력의 일환으로 [CoffeeScript](http://coffeescript.org/), [Dart](https://www.dartlang.org/), [Haxe](https://haxe.org/)와 같은 <strong>AltJS</strong>(JavaScript의 대체언어)가 등장하였다.

TypeScript 또한 AltJS의 하나로써 <strong>JavaScript(ES5)의 Superset(상위확장)</strong>이다. C#의 창시자인 [Anders Hejlsberg(아네르스 하일스베르)](https://en.wikipedia.org/wiki/Anders_Hejlsberg)가 개발을 주도한 TypeScript는 Microsoft에서 2012년에 발표한 오픈소스로 정적 타이핑을 지원하며 ES6(ECMAScript 2015)의 클래스, 모듈 등과 ES7의 Decorators 등을 지원한다.

![typescript superset](/img/typescript-superset.png)
{: .w-300}

TypeScript는 ES5의 Superset이므로 기존의 JavaScript(ES5) 문법을 그대로 사용할 수 있으며 ES6의 새로운 기능들을 사용하기 위해 [Babel](https://babeljs.io/)과 같은 별도 Transpiler를 사용하지 않아도 ES6의 새로운 기능을 기존의 JavaScript 엔진(현재의 브라우저 또는 Node.js)에서 실행할 수 있다.

이후 [ECMAScript의 새로운 기능을 지속적으로 추가할 예정](https://github.com/Microsoft/TypeScript/wiki/Roadmap)이여서 매년 upgrade될 ECMAScript의 표준을 따라갈 수 있는 좋은 수단이 될 것이다.

더욱이 [Angular2의 TypeScript 정식 채용](https://blogs.msdn.microsoft.com/typescript/2015/03/05/angular-2-built-on-typescript/)으로 TypeScript에 관심이 커져가고 있다.

![Google Trends](/img/typescript-google-trends.png)
{: .w-650}
[Google Trends](https://www.google.com/trends/explore?date=all&q=TypeScript)
{: .desc-img}

Google은 AtScript라는 TypeScript의 superset을 Angular2에 채용하려 하였지만 TypeScript을 채용하는 것으로 방향을 전환하였다. 이후 Angular2에 필요한 기능을
TypeScript의 spec에 포함시키는 것으로 TypeScript 진영과 합의한 것으로 전해진다.

![AtScript superset](/img/atscript.png)
{: .w-650}

# 2. TypeScript를 사용하는 이유

<!-- TypeScript를 JavaScript의 [Syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)로 부르기도 하는데 이는 그만큼 JavaScript를 문법적으로 더욱 사용하기 편하게 돕는다는 비유적 표현이다. -->

TypeScript를 사용하는 이유는 여러가지 있지만 가장 큰 장점은 다양한 <strong>도구의 지원</strong>을 받을 수 있다는 것이다. TypeScript는 정적 타입을 지원하므로 높은 수준의 IntelliSense, 코드 어시스트, 타입 체크, 리팩토링 등을 지원하며 이러한 도구의 지원은 대규모 프로젝트를 위한 필수적 요소이기도 하다. 또한 명시적인 정적 타입 지정은 코드의 가독성을 향상 시키고 예측을 가능하게 하며 디버깅을 쉽게 한다. 모듈, 네임스페이스, 강력한 OOP 지원으로 크고 복잡한 프로젝트의 코드 기반을 쉽게 구성 할 수 있으며 컴파일 단계에서 오류를 포착할 수 있는 장점을 가지고 있다.

컴파일러 등의 개발환경 구축이 필요없이 브라우저만 있으면 바로 사용할 수 있는 ES5와 비교할 때 개발환경 구축의 관점에서 다소 복잡해진 측면이 있으나 현재 ES6를 완전히 지원하지 않고 있는 브라우저를 고려하여 Babel등의 트랜스파일러를 사용해야 하는 현 상황을 고려하면 TypeScript 개발환경 구축에 드는 수고는 그다지 아깝지 않을 것이다.

마지막으로 Angular2는 TypeScript 뿐만 아니라 JavaScript, Dart로도 작성할 수 있지만 Angular2 문서, 커뮤니티 활동에서 가장 많이 사용되고 있는 것이 TypeScript이다. Angular2 관련 문서의 예제 등도 TypeScript로 작성된 것이 가장 많아 관련 정보 취득에도 이점이 있으며 이러한 현상은 앞으로도 지속될 것으로 예상된다.

# 3. 개발환경 구축

TypeScript 파일(.ts)은 브라우저에서 동작하지 않으므로 TypeScript 컴파일러를 통해 자바스크립트 파일로 변환이 필요하다. 이를 컴파일 또는 트랜스파일링(transfilling)이라 한다.

TypeScript 컴파일러는 npm으로 설치할 수 있다. Visual Studio 2015 또는 Visual Studio 2013 Update 2 사용자라면 별도의 컴파일러 설치없이 Visual Studio 내장 컴파일러를 사용할 수 있다.

## 3.1 Node.js 설치

- [Installing Node.js](./nodejs-basics#install)

## 3.2 TypeScript 컴파일러 설치 및 사용법

Node.js를 설치하면 [npm](./nodejs-npm)도 같이 설치된다. 다음과 같이 터미널(윈도우의 경우 커맨드창)에서 npm을 사용하여 TypeScript를 설치한다.

```bash
$ npm install -g typescript
```

버전을 출력하여 TypeScript의 설치를 확인한다.

```bash
$ tsc -v
Version 2.1.5
```

TypeScript 컴파일러(tsc)는 TypeScript 파일(.ts)을 JavaScript 파일로 트랜스파일링한다.

트랜스파일링을 실행해보기 위해 다음과 같은 파일을 작성해 보자. TypeScript의 확장자는 .ts이다.

```typescript
// person.ts
class Person {

  name: string;

  constructor(name: string) {
    this.name = name;
  }
  sayHello() {
    return "Hello, " + this.name;
  }
}

const person = new Person('Lee');

console.log(person.sayHello());
```

컴파일을 실행한다.

```bash
$ tsc person.ts
```

컴파일 실행 결과, 같은 디렉터리에 person.js가 생성된다.

```javascript
// person.js
var Person = (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype.sayHello = function () {
    return "Hello, " + this.name;
  };
  return Person;
}());
var person = new Person('Lee');
console.log(person.sayHello());
```

이때 트랜스파일링된 person.js의 자바스크립트 버전은 ES3이다. 이는 TypeScript 컴파일 타겟 자바스크립트 기본 버전이 ES3이기 때문이다.

자바스크립트 버전을 변경하려면 `--target` 또는 `-t` 옵션을 사용한다. 현재 tsc가 지원하는 자바스크립트 버전은 ES3, ES5, ES6(ES2015), ES2016, ES2017(ESNext)이다.

```bash
$ tsc person.ts -t ES5
```

Node.js REPL로 트랜스파일링된 person.js를 실행해보자.

```bash
$ node person.js
Hello, Lee
```

복수의 파일을 한번에 트랜스파일링할 수도 있다. 두개의 TypeScript class를 작성해보자.

```typescript
// person.ts
export class Person {

  name: string;

  constructor(name: string) {
    this.name = name;
  }
  sayHello() {
    return "Hello, " + this.name;
  }
}
```

```typescript
// student.ts
import { Person } from './Person';

class Student extends Person {
  study() {
    return `${this.name} is studying.`;
  }
}

const student = new Student('Lee');

console.log(student.sayHello());
console.log(student.study());
```

두개의 TypeScript 파일을 한번에 컴파일한다.

```bash
$ tsc person.ts student.ts
$ node student
Hello, Lee
Lee is studying.
```

또는 와일드카드를 사용하여 모든 TypeScript 파일을 한꺼번에 트랜스파일링할 수도 있다.

```bash
$ tsc *.ts
$ node student
Hello, Lee
Lee is studying.
```

`--watch` 또는 `-w` 옵션을 사용하면 대상 파일이 변경되었을 때 이를 감지하여 자동으로 트랜스파일링을 수행한다.

```bash
$ tsc student.ts --watch
14:27:59 - Compilation complete. Watching for file changes.
```

student.ts를 변경해 보자.

```typescript
// student.ts

import { Person } from './Person';

class Student extends Person {
  study() {
    return `${this.name} is studying!!`;
  }
}

const student = new Student('Lee');

console.log(student.sayHello());
console.log(student.study());
```

아래와 같이 파일 변경이 감지되고 자동으로 트랜스파일링이 수행된다.

```bash
14:29:07 - File change detected. Starting incremental compilation...
14:29:08 - Compilation complete. Watching for file changes.
```

```bash
$ node student
Hello, Lee
Lee is studying!!
```

컴파일 옵션에 대해서는 [TypeScript Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)을 참조하기 바란다.

# Reference

* [TypeScript](http://www.typescriptlang.org/index.html)

* [TypeScript Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
