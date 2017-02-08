---
layout: post
title: TypeScript - <strong>Visual Studio Code Setup</strong>
subtitle: Visual Studio Code에서의 TypeScript 개발 환경 구축
categories: typescript
section: typescript
description: Visual Studio Code에서의 TypeScript 개발 환경 구축
---

* TOC
{:toc}

![typescript Logo](/img/typescript-logo.png)

[Visual Studio Code(VSCode)](https://code.visualstudio.com/)는 마이크로소프트가 제공하는 오픈소스 코드 에디터이다. 마이크로소프트는 TypeScript를 개발한 회사이기도 하여서 VSCode는 TypeScript 지원이 탁월하다. IntelliSense, debugging, Git 등의 기능을 지원하며 다양한 Extension(확장 플러그인)을 제공하여 자신의 프로젝트에 맞는 개발 환경을 쉽게 구축할 수 있다.

# 1. Visual Studio Code 설치

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

# 2. tsconfig.json

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

# 3. Task runner

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

# 4. 외부 라이브러리의 사용을 위한 TypeScript Definition 설치

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

# 5. 디버깅

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

<!-- # Atom에서의 TypeScript 개발 환경

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

* [Visual Studio Code(VSCode)](https://code.visualstudio.com/)

* [Visual Studio Code: tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
* [Visual Studio Code: Task runner](https://code.visualstudio.com/docs/editor/tasks)

* [Visual Studio Code: Editing TypeScript](https://code.visualstudio.com/Docs/languages/typescript)

* [Typings](https://github.com/typings/typings)
