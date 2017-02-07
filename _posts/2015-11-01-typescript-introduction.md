---
layout: post
title: TypeScript - <strong>Intro & Install</strong>
subtitle: TypeScript의 소개와 개발 환경
categories: typescript
section: typescript
description: TypeScript의 소개와 개발 환경 Node.js 설치 TypeScript 설치 Command line TypeScript Compiler Atom editor에서의 TypeScript 개발 환경
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

TypeScript를 JavaScript의 [Syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)로 부르기도 하는데 이는 그만큼 JavaScript를 문법적으로 더욱 사용하기 편하게 돕는다는 비유적 표현이다.

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

컴파일 옵션에 대해서는 [TypeScript Documentation: Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)을 참조하기 바란다.

# 3. Visual Studio Code에서의 TypeScript 개발 환경

[Visual Studio Code(VSCode)](https://code.visualstudio.com/)는 마이크로소프트가 제공하는 경량의 코드 에디터이다. 마이크로소프트는 TypeScript를 개발한 회사이기도 하여서 VSCode는 TypeScript 지원이 탁월하다. IntelliSense, debugging, Git 등의 기능을 지원하며 다양한 Extension(확장 플러그인)을 제공하여 자신의 프로젝트에 맞는 개발 환경을 쉽게 구축할 수 있다.

## 3.1 Visual Studio Code 설치

VSCode 설치는 간단하다. 자신의 OS에 맞는 인스톨러를 다운로드하여 설치하도록 하자.

- [Running VS Code on Windows](https://code.visualstudio.com/docs/setup/windows)
- [Running VS Code on Mac](https://code.visualstudio.com/docs/setup/mac)

VSCode를 설치가 완료되었으면 적당한 위치에 프로젝트 폴더를 생성한다. 좌측 맨위의 파일 모양의 "탐색기" 아이콘을 선택하면 프로젝트 폴더를 선택할 수 있는 버튼이 표시된다.

![vscode-open-folder](./img/vscode-open-folder.png)

탐색기 선택
{: .desc-img}

"폴더 열기" 버튼을 클릭하고 적당한 위치에 프로젝트 폴더를 생성한다.

![vscode-create-folder](./img/vscode-create-folder.png)

프로젝트 폴더 성성
{: .desc-img}

## 3.2 tsconfig.json

컴파일할 때마다 다양한 옵션을 반복적으로 지정하는 것은 번거러운 일이다. <strong>[tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)</strong>을 사용하는 편이 좋다. tsconfig.json은 TypeScript를 위한 프로젝트 단위의 환경 파일로써 컴파일 옵션과 컴파일 대상에 대한 설정 등을 기술한 것이다.

`compilerOptions` 속성에는 [컴파일 옵션](https://www.typescriptlang.org/docs/handbook/compiler-options.html)을 설정한다. 생략한 경우에는 기본 컴파일 옵션이 사용된다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true
  }
}
```

컴파일 대상 파일을 지정하기 위해서 `files` 또는 `include` 속성을 사용한다. 만약 files 속성을 정의하였다면 include 속성은 무시된다.

`files` 속성에는 컴파일 대상 파일의 상대 경로 또는 절대 경로를 명시적으로 설정한다.

```json
{
  "files": [
    "src/file1.ts",
    "src/file2.ts"
  ]
}
```

`include` 속성에는 컴파일 대상 파일 리스트를 설정한다. `exclude` 속성에는 컴파일 대상에서 제외할 파일 리스트를 설정한다.

```json
{
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
```

`src/\*\*/\*`는 src 폴더 내에 있는 모든 서브 폴더 내의 모든 파일(.ts, .tsx)을 의미한다. 컴파일 옵션 `"allowJs": true`를 설정하면 .js와 .jsx 파일도 컴파일 대상이 된다.

이제 프로젝트 폴더에 tsconfig.json 파일을 생성해 보자. tsconfig.json에 아래와 같이 컴파일 설정을 편집한다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true
  }
}
```

이제 간단한 TypeScript 코드를 작성해보자. 파일명은 HelloWorld.ts로 지정한다.

```typescript
class Startup {
  public static main(): number {
    console.log('Hello World');
    return 0;
  }
}

Startup.main();
```

## 3.3 Task runner

위 TypeScript 코드를 자바스크립트로 트랜스파일링하기 위해서는 TypeScript 컴파일러를 실행시켜야한다. 컴파일러는 VSCode 외부에 존재하므로 VSCode와 TypeScript 컴파일러 간의 연동이 필요하다.

VSCode는 [Task runner](https://code.visualstudio.com/docs/editor/tasks)로 외부의 툴을 VSCode와 연동시킬 수 있다. CLI로 실행되는 툴들을 VSCode에서 실행시킬 수 있는 수 있도록 하는 것이다.

![tasks_tasks_hero](./img/tasks_tasks_hero.png)

task runner
{: .desc-img}

`Ctrl + Shft + P(⇧⌘P)` 단축기 또는 메뉴의 보기 > 명령 팔레트를 선택하고 "Configure Task Runner"를 입력한다.

![Configure-Task-Runner](./img/Configure-Task-Runner.png)

명령 팔레트에서 "Configure Task Runner" 입력
{: .desc-img}

"TypeScript - tsconfig.json"을 선택한다.

![typescript-tsconfig](./img/typescript-tsconfig.png)

"TypeScript - tsconfig.json" 선택
{: .desc-img}

.vscode라는 숨겨진 폴더에 아래와 같은 `tasks.json` 파일이 생성된다.

```json
{
  "version": "0.1.0",
  "command": "tsc",
  "isShellCommand": true,
  "args": ["-p", "."],
  "showOutput": "silent",
  "problemMatcher": "$tsc"
}
```

이제 ts 파일을 js 파일로 컴파일 해보자. `Ctrl + Shft + B(⇧⌘B)` 단축키를 누르면 HelloWorld.js와 HelloWorld.js.map이 생성된다.

터미널에서 트랜스파일링된 HelloWorld.js를 실행해보자.

```bash
$ node HelloWorld.js
Hello World
```

보기 > 통합 터미널 (⌃\`)을 선택하면 VSCode의 내장 터미널을 사용할 수도 있다.

개발시에는 코드가 빈번히 변경되므로 코드의 변경을 감시하도록 task runner의 설정을 변경해 보자.

아래와 같이 `tasks.json` 파일을 수정한다.

```json
{
  "version": "0.1.0",
  "command": "tsc",
  "isShellCommand": true,
  "args": ["-w", "-p", "."],
  "showOutput": "always",
  "isWatching": true,
  "problemMatcher": "$tsc-watch"
}
```

`Ctrl + Shft + B(⇧⌘B)` 단축키로 다시 빌드를 수행한다.

```bash
9:09:09 PM - Compilation complete. Watching for file changes.
```

이제 파일의 변경을 감시하기 시작하며 변경이 발생하면 자동으로 재빌드를 수행한다. ts 파일을 수정해 보자.

```typescript
class Startup {
  public static main(): number {
    console.log('Hello Angular2');
    return 0;
  }
}

Startup.main();
```

```bash
9:17:01 PM - File change detected. Starting incremental compilation...
9:17:02 PM - Compilation complete. Watching for file changes.
```

터미널에서 트랜스파일링된 HelloWorld.js를 실행하여 파일 변경이 반영된 것을 확인한다.

```bash
$ node HelloWorld.js
Hello Angular2
```

## 3.4 외부 라이브러리의 사용을 위한 TypeScript Definition 설치

TypeScript를 사용하는 이유는 여러가지 있지만 가장 큰 장점은 다양한 도구의 지원을 받을 수 있다는 것이다. TypeScript는 정적 타입을 지원하므로 높은 수준의 IntelliSense나 리팩토링 등을 지원하며 이러란 도구의 지원은 대규모 프로젝트를 위한 필수적 요소이기도 하다.

프로젝트 내에는 필수적으로 다양한 라이브러리가 포함되는데 이 라이브러리들은 JavaScript로 작성되어있다. TypeScript는 ES5의 Superset(상위확장)이므로 기존의 JavaScript를 그대로 사용할 수 있지만 그렇게 사용하는 경우, JavaScript는 정적 타입이 없으므로 VSCode에서 제공하는 IntelliSense와 같은 다양한 도구의 지원을 받을 수 없게 된다.

TypeScript Definition Manager인 [Typings](https://github.com/typings/typings)를 사용하여 해당 라이브러리의 타입 정보를 추가할 수 있다.

TypeScript 프로젝트에 jQuery를 사용하는 경우를 살펴보자.

먼저 npm으로 jQuery를 설치한다. 참고로 라이브러리의 설치와 타입 정보의 설치는 별도로 진행한다.

```bash
$ npm init -y
$ npm install jquery --save
```

jQuery를 사용하는 간단한 TypeScript 코드를 작성한다.

```typescript
$(function() {
  console.log('Hello');
})
```

jQuery의 타입정보가 없으므로 아래와 같이 에러가 발생한다.

![before-typings](./img/before-typings.png)

typings 설치 전
{: .desc-img}

이제 typings를 설치한다.

```bash
$ npm install -g typings
$ typings -v
2.1.0
```

jQuery의 타입 정보를 설치한다.

```bash
$ typings init
$ typings install dt~jquery --global --save
```

![after-typings](./img/after-typings.png)

typings 설치 후
{: .desc-img}

## 3.5 디버깅

디버깅을 위해서는 좌측 상단의 벌레 모양 아이콘을 클릭한 후 화면 상단의 디버그 버튼을 클릭하면 `launch.json` 파일이 생성된다.

![debug](./img/ts-debug.png)

configurations 속성의 program 속성값을 디버깅할 파일명으로 변경한다.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "프로그램 시작",
      "program": "${workspaceRoot}/HelloWorld.ts",
      "cwd": "${workspaceRoot}",
      "outFiles": [],
      "sourceMaps": true
    },
    {
      "type": "node",
      "request": "attach",
      "name": "프로세스에 연결",
      "port": 5858,
      "outFiles": [],
      "sourceMaps": true
    }
  ]
}
```

중단점을 설정하고 디버그 버튼을 클릭하면 디버깅이 시작된다.

![debug](./img/ts-debug-start.png)

VSCode에서의 TypeScript의 사용에 대한 보다 자세한 내용은 [Visual Studio Code: Editing TypeScript](https://code.visualstudio.com/Docs/languages/typescript)을 참조하기 바란다.

<!-- ## Atom에서의 TypeScript 개발 환경

[Atom](https://atom.io/)은 Github에서 제공하는 오픈소스 텍스트 에디터이다. 다양한 패키지(확장 플러그인)를 사용하여 자신의 프로젝트에 맞는 개발 환경 구축이 용이한다.

Atom에서 TypeScript plugin을 설치한다. 다음과 같이 터미널(윈도우의 경우 커맨드창)에서 Atom Package Manager를 사용하여 plugin을 설치한다.

```bash
$ apm install atom-typescript
```

또는 Atom > Preferences 메뉴의 Install에서 atom-typescript를 입력하여 설치할 수도 있다.

![atom-typescript](/img/atom-typescript.png)

프로젝트 루트에 tsconfig.json을 작성한다.

- [atom-typescript: tsconfig.json](https://github.com/TypeStrong/atom-typescript/blob/master/docs/tsconfig.md)

tsconfig.json을 사용하면 컴파일 옵션과 파일 경로를 전달하여 tsc 명령어를 사용하지 않아도 되며 filesGlob에 의해 추가된 ts 파일이 컴파일 대상으로 자동으로 추가되어 편리하게 컴파일을 수행할 수 있다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": false,
    "noImplicitAny": false,
    "removeComments": false,
    "noLib": false,
    "preserveConstEnums": true,
    "suppressImplicitAnyIndexErrors": true
  },
  "compileOnSave": true,
  "filesGlob": [
    "./**/*.ts",
    "!./node_modules/**/*.ts"
  ],
  "files": [
    "./greeter.ts"
  ],
  "atom": {
    "rewriteTsconfig": true
  }
}
```

Atom에서의 컴파일은 Package > TypeScript > Build 또는 tsconfig.json의 `"compileOnSave": true`로 설정하여 파일 저장시 자동으로 컴파일을 실행하도록 한다. -->

# Reference

* [TypeScript](http://www.typescriptlang.org/index.html)

* [Visual Studio Code](https://code.visualstudio.com)
