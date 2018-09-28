---
layout: post
title: Snippet - Hover Effect
subtitle:
categories: snippet
section: snippet
seq: 8
subseq: 11
---

* TOC
{:toc}

# 1. Button Hover Effect

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Button hover effect</title>
  <style>
    @import url(http://fonts.googleapis.com/css?family=Roboto:400,100,900);
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html,
    body {
      height: 100%;
      width: 100%;
    }

    body {
      background: #E1332D;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
    }

    .container {
      margin: 50px auto 0;
      text-align: center;
    }

    h1 {
      font-size: 2rem;
      color: #fff;
      margin-bottom: 60px;
    }

    p {
      color: #fff;
      font-size: 12px;
    }

    .btn {
      display: inline-block;
      width: 100%;
      max-width: 160px;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      font-weight: 400;
      line-height: 45px;
      margin: 0 auto 2em;
      margin: 0 20px 20px 0;
      position: relative;
      text-decoration: none;
      text-transform: uppercase;
      vertical-align: middle;
    }

    .btn-1 {
      background: #e02c26;
      font-weight: 100;
    }

    .btn-1 svg {
      height: 45px;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    .btn-1 rect {
      fill: none;
      stroke: #fff;
      stroke-width: 2;
      stroke-dasharray: 422, 0;
    }

    .btn-1:hover {
      background: rgba(225, 51, 45, 0);
      font-weight: 900;
      letter-spacing: 1px;
    }

    .btn-1:hover rect {
      stroke-width: 5;
      stroke-dasharray: 15, 310;
      stroke-dashoffset: 48;
      -webkit-transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
      transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
    }

    .btn-2 {
      letter-spacing: 0;
    }

    .btn-2:hover,
    .btn-2:active {
      letter-spacing: 5px;
    }

    .btn-2:after,
    .btn-2:before {
      backface-visibility: hidden;
      border: 1px solid rgba(255, 255, 255, 0);
      bottom: 0px;
      content: " ";
      display: block;
      margin: 0 auto;
      position: relative;
      transition: all 280ms ease-in-out;
      width: 0;
    }

    .btn-2:hover:after,
    .btn-2:hover:before {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-color: #fff;
      transition: width 350ms ease-in-out;
      width: 70%;
    }

    .btn-2:hover:before {
      bottom: auto;
      top: 0;
      width: 70%;
    }

    .btn-3 {
      background: #e3403a;
      border: 1px solid #da251f;
      box-shadow: 0px 2px 0 #d6251f, 2px 4px 6px #e02a24;
      font-weight: 900;
      letter-spacing: 1px;
      transition: all 150ms linear;
    }

    .btn-3:hover {
      background: #e02c26;
      border: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.2);
      color: #ec817d;
      text-decoration: none;
      text-shadow: -1px -1px 0 #c2211c;
      transition: all 250ms linear;
    }

    .btn-4 {
      border: 1px solid;
      overflow: hidden;
      position: relative;
    }

    .btn-4 span {
      z-index: 20;
    }

    .btn-4:after {
      background: #fff;
      content: "";
      height: 155px;
      left: -75px;
      opacity: .2;
      position: absolute;
      top: -50px;
      transform: rotate(35deg);
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
      width: 50px;
      z-index: -10;
    }

    .btn-4:hover:after {
      left: 120%;
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }

    .btn-5 {
      border: 0 solid;
      box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
      outline: 1px solid;
      outline-color: rgba(255, 255, 255, 0.5);
      outline-offset: 0px;
      text-shadow: none;
      transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    }

    .btn-5:hover {
      border: 1px solid;
      box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2);
      outline-color: rgba(255, 255, 255, 0);
      outline-offset: 15px;
      text-shadow: 1px 1px 2px #427388;
    }
  </style>
</head>
<body>
  <section class="buttons">
    <div class="container">
      <h1>Button Hover Effects</h1>
      <a href="#" class="btn btn-1">
        <svg><rect x="0" y="0" fill="none" width="100%" height="100%"/></svg>Hover
      </a>
      <a href="#" class="btn btn-2">Hover</a>
      <a href="#" class="btn btn-3">Hover</a>
      <a href="#" class="btn btn-4"><span>Hover</span></a>
      <a href="#" class="btn btn-5">Hover</a>
    </div>
  </section>
</body>
</html>
```

<div class="result"></div>
