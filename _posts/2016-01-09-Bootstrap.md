---
layout: post
title: Bootstrap Basics
categories: bootstrap
---

* TOC
{:toc}

> Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.



3.3.6 기준

부트스트랩의 장점 중 하나는 반응형 웹 디자인이 쉽게 만들어진다는 점이다

```
bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   ├── bootstrap.min.css.map
│   ├── bootstrap-theme.css
│   ├── bootstrap-theme.css.map
│   ├── bootstrap-theme.min.css
│   └── bootstrap-theme.min.css.map
├── js/
│   ├── bootstrap.js
│   └── bootstrap.min.js
└── fonts/
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    ├── glyphicons-halflings-regular.woff
    └── glyphicons-halflings-regular.woff2
```


스프라이트 이미지 (sprite image)

페이지의 로딩 속도를 감소시켜주는 방법 중 하나이다. 자주 쓰는 이미지들을 쓸 때마다 각각 로딩하는 것이 아니라 하나의 이미지파일로 작성한 후 좌표값을 사용하여 필요한 이미지를 로딩하는 방식이다. 하나의 이미지로 만들기 때문에 관기가 쉽고 여러번 로딩할 필요가 없고 중복되는 이미지를 로딩하지 않기 때문에 트래픽이 감소되는 효과가 있다.
