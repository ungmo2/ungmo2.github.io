---
layout: post
title: CSS3 <strong>Transform</strong>
subtitle: 트랜스폼
categories: css
section: css
description: 트랜스폼(Transform)은 요소에 이동(translate), 회전(rotate), 확대축소(scale), 비틀기(skew) 효과를 부여하기 위한 함수를 제공한다. 단 애니메이션 효과를 제공하지는 않기 때문에 정의된 프로퍼티가 바로 적용되어 화면에 표시된다. 트랜스폼은 애니메이션 효과를 위해 사용하여야 하는 것은 아니지만 애니메이션 효과를 부여할 필요가 있다면 트랜지션이나 애니메이션과 함께 사용한다.
---

* TOC
{:toc}

트랜지션은 CSS 스타일 변경을 부드럽게 표현하기 위해 duration(지속시간)을 부여하여 속도를 조절한다.

애니메이션은 하나의 줄거리(@keyframes)를 구성하여 줄거리 내에서 세부 움직임을 시간 흐름 단위로 제어하여 요소의 움직임을 표현한다.

트랜스폼(Transform)은 요소에 이동(translate), 회전(rotate), 확대축소(scale), 비틀기(skew) 효과를 부여하기 위한 함수를 제공한다. 단 애니메이션 효과를 제공하지는 않기 때문에 정의된 프로퍼티가 바로 적용되어 화면에 표시된다. 트랜스폼은 애니메이션 효과를 위해 사용하여야 하는 것은 아니지만 애니메이션 효과를 부여할 필요가 있다면 트랜지션이나 애니메이션과 함께 사용한다.

# 1. 2D 트랜스폼 (2D Transform)

2D 트랜스폼은 프로퍼티값으로 변환함수(transform function)를 사용한다. 변환함수는 다음과 같다.

| transform function    | 설명                          | 단위
|:----------------------|:-----------------------------|:-----------:|
| translate(x,y)        | 요소의 위치를 X축으로 x만큼, Y축으로 y만큼 이동시킨다. | px, %, em 등
| translateX(n)         | 요소의 위치를 X축으로 x만큼 이동시킨다.             | px, %, em 등
| translateY(n)         | 요소의 위치를 Y축으로 y만큼 이동시킨다.             | px, %, em 등
| scale(x,y)            | 요소의 크기를 X축으로 x배, Y축으로 y배 확대 또는 축소 시킨다. | 0과 양수
| scaleX(n)             | 요소의 크기를 X축으로 x배 확대 또는 축소 시킨다. | 0과 양수
| scaleY(n)             | 요소의 크기를 Y축으로 y배 확대 또는 축소 시킨다. | 0과 양수
| skew(x-angle,y-angle) | 요소를 X축으로 x 각도만큼, Y축으로 y 각도만큼 기울인다. | +/- 각도(deg)
| skewX(x-angle)        | 요소를 X축으로 x 각도만큼 기울인다. | +/- 각도(deg)
| skewY(y-angle)        | 요소를 Y축으로 y 각도만큼 기울인다. | +/- 각도(deg)
| rotate(angle)         | 요소를 angle만큼 회전시킨다.      | +/- 각도(deg)

## 1.1 transform

변환함수를 프로퍼티값으로 쉼표없이 나열한다. 나열순서에 따라 차례대로 효과가 적용된다.

```
transform: func1 func2 func3 ...;
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
  .box {
    width: 95px;
    height: 95px;
    line-height: 95px;
    color: white;
    text-align: center;
    border-radius: 6px;
  }
  .original {
    margin: 30px;
    border: 1px dashed #cecfd5;
    background: #eaeaed;
    float: left;
  }
  .child {
    background: #2db34a;
    cursor: pointer;
  }
  .translate {
    transform: translate(10px, 50px);
  }
  .scale {
    transform: scale(.75);
  }
  .skew {
    transform: skew(5deg, -20deg);
  }
  .rotate {
    transform: rotate(70deg);
  }
  .complex {
    transform: scale(.5) rotate(20deg);
  }

  /* Animation Effect */
  .translate:hover {
    transition: transform 1s linear;
    transform: translate(0px, 0px);
  }
  /* .translate:hover {
    animation: translate 1s linear forwards;
  }
  @keyframes translate {
    100% {
      transform: translate(0px, 0px);
    }
  } */
  .scale:hover {
    transition: transform 1s linear;
    transform: scale(1);
  }
  .skew:hover {
    transition: transform 1s linear;
    transform: skew(0, 0);
  }
  .rotate:hover {
    transition: transform 1s linear;
    transform: rotate(0);
  }
  .complex:hover {
    transition: transform 1s linear;
    transform: scale(1) rotate(0);
  }
  </style>
</head>
<body>
  <div class="original box">
    <div class="child box translate">translate</div>
  </div>
  <div class="original box">
    <div class="child box scale">scale</div>
  </div>
  <div class="original box">
    <div class="child box skew">skew</div>
  </div>
  <div class="original box">
    <div class="child box rotate">rotate</div>
  </div>
  <div class="original box">
    <div class="child box complex">complex</div>
  </div>
</body>
</html>
```

<div class="result" style="height: 230px"></div>

## 1.2 transform-origin

요소의 기본기준점을 설정할 때 사용된다. 기본기준점은 요소의 정중앙이다(50%,50%). 이동은 기준점을 변경하여도 일정 거리만큼 이동하므로 의미가 없다. 설정값으로 %, px, top left, bottom right을 사용할 수 있다. 0, 0은 top left, 100% 100%는 bottom right과 같은 값이다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
  .box {
    width: 150px;
    height: 150px;
    line-height: 150px;
    color: white;
    text-align: center;
    border-radius: 6px;
  }
  .original {
    margin: 20px;
    border: 1px dashed #cecfd5;
    background: #eaeaed;
    float: left;
  }
  .child {
    background: #2db34a;
    cursor: pointer;
  }
  .scale1:hover {
    transition: transform 1s linear;
    transform-origin: 0 0;
    transform: scale(.5);
  }
  .scale2:hover {
    transition: transform 1s linear;
    transform-origin: 50% 50%;
    transform: scale(.5);
  }
  .scale3:hover {
    transition: transform 1s linear;
    transform-origin: 100% 100%;
    transform: scale(.5);
  }
  .translate:hover {
    transition: transform 1s linear;
    /*transform-origin: 100% 100%;*/
    transform: translate(10px, 10px);
  }
  </style>
</head>
<body>
  <div class="original box">
    <div class="child box scale1">scale1</div>
  </div>
  <div class="original box">
    <div class="child box scale2">scale2</div>
  </div>
  <div class="original box">
    <div class="child box scale3">scale3</div>
  </div>
  <div class="original box">
    <div class="child box translate">translate</div>
  </div>
</body>
</html>
```

<div class="result" style="height: 235px"></div>

| Property         | Chrome | Edge   | IE     | Firefox| Safari | Opera  |
|:-----------------|:------:|:------:|:------:|:------:|:------:|:------:|
| transform-*      | 36.0	  | 12.0   | 10.0   | 16.0   |        |	23.0   |
| prefix           | 4.0	  |        | 9.0    | 3.5    | 3.2    |	12.1   |

# 2. 3D 트랜스폼 (3D Transform)

3D 트랜스폼은 프로퍼티값으로 변환함수(transform function)를 사용한다. 사용할 수 있는 변환함수는 다음과 같다.

| transform function    | 설명                          | 단위
|:----------------------|:-----------------------------|:-----------:|
| translate3d(x,y,z)    | 요소의 위치를 X축으로 x만큼, Y축으로 y만큼 Z축으로 z만큼 이동시킨다. | px, %, em 등
| translateX(n)         | 요소의 위치를 X축으로 x만큼 이동시킨다.             | px, %, em 등
| translateY(n)         | 요소의 위치를 Y축으로 y만큼 이동시킨다.             | px, %, em 등
| translateZ(n)         | 요소의 위치를 Z축으로 z만큼 이동시킨다.             | px, %, em 등
| scale3d(x,y)          | 요소의 크기를 X축으로 x배, Y축으로 y배, Z축으로 z배 확대 또는 축소 시킨다. | 0과 양수
| scaleX(n)             | 요소의 크기를 X축으로 x배 확대 또는 축소 시킨다. | 0과 양수
| scaleY(n)             | 요소의 크기를 Y축으로 y배 확대 또는 축소 시킨다. | 0과 양수
| scaleZ(n)             | 요소의 크기를 Z축으로 z배 확대 또는 축소 시킨다. | 0과 양수
| rotate3d(x,y,z)       | 요소를 X축으로 x각도, Y축으로 y각도, Z축으로 z각도 회전시킨다. | +/- 각도(deg)
| rotateX(x)            | 요소를 X축으로 x각도 회전시킨다.      | +/- 각도(deg)
| rotateY(y)            | 요소를 Y축으로 y각도 회전시킨다.      | +/- 각도(deg)
| rotateZ(z)            | 요소를 Z축으로 z각도 회전시킨다.      | +/- 각도(deg)

<!-- 웹에서 3D를 CSS만으로 표현하는 것은 아직 무리가 있어 보인다. 또한 웹페이지 구축을 목표로 하는 본 블로그와는 거리가 있어 자세한 내용은 생략하기로 한다. 자바스크립트를 사용하는 [WebGL](https://developer.mozilla.org/ko/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL)은 훌륭한 대안이다. [Three.js 프레임워크](http://threejs.org/) 등을 이용하면 고품질의 3D를 웹에서도 구현할 수 있다.
 -->

| Property         | Chrome | Edge   | IE     | Firefox| Safari | Opera  |
|:-----------------|:------:|:------:|:------:|:------:|:------:|:------:|
| transform-*      | 36.0	  | 12.0   | 10.0   | 16.0   |        |	23.0   |
| transform-style  | 36.0	  | 12.0   | 11.0   | 16.0   |        |	23.0   |
| perspective-*    | 36.0	  | 12.0   | 10.0   | 16.0   |        |	23.0   |
| prefix           | 12.0	  |        |        | 10.0   | 4.0    |	15.0   |

# Reference

* [css3generator.com](http://www.css3generator.com/)

* [css3gen.com](http://css3gen.com/)

* [cssmatic.com](http://www.cssmatic.com/box-shadow)
