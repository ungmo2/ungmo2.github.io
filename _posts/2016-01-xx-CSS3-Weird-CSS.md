---
layout: post
title: Weird CSS
categories: css
---

* TOC
{:toc}


# 1. Ways to handle space between inline-block elements

inline-block 요소가 연이어 있으면 정의하지 않은 space(4px)이 끼어드는 문제

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      * {
        /*margin: 0; padding: 0;*/
        box-sizing: border-box;
      }
      #wrap {
        background-color: yellow;
        width: 100%;
        height: 100%;
      }
      .blue {
        background-color: blue;
        display: inline-block;
        /*float: left;*/
      }
      .red {
        background-color: red;
        display: inline-block;
        /*float: left;*/
      }
      .black {
        background-color: black;
      }
      .box {
        color: white;
        font-weight: 700;
        text-align: center;
        line-height: 100px;
        height: 100px;
        width: 100px;
      }
      span {
        display: inline-block;
        background-color: red;
        width: 100px;
      }
    </style>
  </head>
  <body>
    <div id="wrap">
      <div class="box blue">Blue</div>
      <div class="box red">Red</div>
      <!-- <div class="box black">black</div> -->
    </div>
    <span>TEST</span>
    <span>SPACE</span>
  </body>
</html>
```

https://css-tricks.com/fighting-the-space-between-inline-block-elements/
http://reallygood.work/03/13/an-inline-block-intervention/
http://codepen.io/chriscoyier/pen/hmlqF
