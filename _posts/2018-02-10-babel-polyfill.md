---
layout: post
title: 폐지된 @babel/polyfill 대신 @babel/plugin-transform-runtime을 사용해 폴리필 추가하기
categories: tools
section: tools
seq: 15
subseq: 10
description: 폐지된 @babel/polyfill 대신 @babel/plugin-transform-runtime을 사용해 폴리필 추가하기
---

Babel 7.4.0부터 [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)은 deprecated 되었다.

```bash
$ npm install @babel/polyfill
npm WARN deprecated @babel/polyfill@7.12.1: 🚨 This package has been deprecated in favor of separate inclusion of a polyfill and regenerator-runtime (when needed). See the @babel/polyfill docs (https://babeljs.io/docs/en/babel-polyfill) for more information.
npm WARN deprecated core-js@2.6.12: core-js@<3.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Please, upgrade your dependencies to the actual version of core-js.

added 2 packages, and audited 312 packages in 2s

27 packages are looking for funding
  run `npm fund` for details
```

core-js을 설치하고 webpack.config.js의 preset-env 설정을 다음과 같이 변경하면 간단히 폴리필을 추가할 수 있다.

```bash
$ npm install core-js@3
```

webpack.config.js

```javascript
...
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 필요한 폴리필만 추가
        corejs: 3,
      },
    ],
  ],
...
```

더 나은 방법은 [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)을 사용하는 것이다. 이 방법을 사용해 폴리필을 추가하면 global이 오염되지 않는 장점이 있다.

@babel/plugin-transform-runtime을 사용해 폴리필을 추가하는 방법은 다음과 같다.

```bash
$ npm install --save-dev @babel/plugin-transform-runtime
$ npm install @babel/runtime-corejs3
```

webpack.config.js

```javascript
...
    options: {
      presets: ['@babel/preset-env'],
      // ↓ 추가
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            // https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs
            corejs: 3,
            proposals: true,
          },
        ],
      ],
    },
...
```

사용한 Babel, Webpack, 플러그인의 버전은 다음과 같다.

Babel/plug-in
: - @babel/cli : 7.15.7
- @babel/core : 7.15.8
- @babel/preset-env : 7.15.8
- @babel/plugin-transform-runtime : 7.15.8
- @babel/runtime : 7.15.4
- @babel/runtime-corejs3 : 7.15.4

Webpack/plug-in
: - webpack : 5.60.0
- webpack-cli : 4.9.1
- babel-loader : 8.2.3

# Reference

- [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
