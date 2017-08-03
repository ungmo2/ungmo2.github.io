---
layout: post
title: Sass - <strong>Built-in Function</strong>
subtitle: Sass가 제공하는 기본 내장 함수
categories: Sass
section: Sass
---

* TOC
{:toc}

![sass-logo](/img/sass-logo.png)

[Sass Built-in function](http://sass-lang.com/documentation/Sass/Script/Functions.html)에는 다양한 내장 함수를 제공한다. 그 중에서 활용 빈도가 높은 함수를 소개한다.

# 1. Color Functions

## 1.1 색상(hue) 변경

```scss
$base-color: #AD141E;

p.adjust-hue {
  color: adjust-hue($base-color, 20%);
}
```

![adjust-hue](/img/adjust-hue.png)

## 1.2 채도(saturation) 변경

```scss
$base-color: #AD141E;

p {
  .saturate {
    color: saturate($base-color, 20%);
  }

  .desaturate {
    color: desaturate($base-color, 20%);
  }
}
```

![saturation](/img/saturation.png)

## 1.3 휘도(lightness) 변경

```scss
$base-color: #AD141E;

p {
  .darken {
    color: darken($base-color, 10%);
  }

  .lighten {
    color: lighten($base-color, 10%);
  }
}
```

![lightness](/img/lightness.png)

## 1.4 투명도(opacity) 변경

```scss
$base-color: #AD141E;

.rgba {
  color: rgba($base-color, .7);
}

/*
.rgba {
  color: rgba(173, 20, 30, 0.7); }
*
```

## 1.5 alpha 연산

```scss
$base-color: rgba(255, 0, 0, 0.5);

// alpha +
.opacify {
  color: opacify($base-color, 0.3);
}

// alpha -
.transparentize {
  color: transparentize($base-color, 0.25);
}

/*
.opacify {
  color: rgba(255, 0, 0, 0.8); }

.transparentize {
  color: rgba(255, 0, 0, 0.25); }
*/
```

## 1.6 Tint & Shade

색상은 흰색(tint)과 검정색(shade)의 값으로 혼합되며 darken, lighten과 유사하다.

```scss
$base-color: #AD141E;

.tint {
  color: tint($base-color, 10%);
}

.shade {
  color: shade($base-color, 10%);
}
```

![Tint&Shade](/img/Tint&Shade.png)

# 2. Number Functions

## 2.1 숫자값을 %로 변환

```
percentage(0.2)          => 20%
percentage(100px / 50px) => 200%
```

## 2.2 소숫점 이하 반올림

```
round(10.4px) => 10px
round(10.6px) => 11px
```

## 2.3 소숫점 이하 올림

```
ceil(10.4px) => 11px
ceil(10.6px) => 11px
```

## 2.4 소숫점 이하 절사

```
floor(10.4px) => 10px
floor(10.6px) => 10px
```

## 2.5 절대값 취득

```
abs(10px) => 10px
abs(-10px) => 10px
```

# 3. Introspection Functions

## 3.1 Data type 취득

```
type-of(100px)  => number
type-of(asdf)   => string
type-of("asdf") => string
type-of(true)   => bool
type-of(#fff)   => color
type-of(blue)   => color
```

## 3.2 Data unit 취득

```
unit(100)   => ""
unit(100px) => "px"
unit(3em)   => "em"
unit(10px * 5em) => "em*px"
unit(10px * 5em / 30cm / 1rem) => "em*px/cm*rem"
```

## 3.3 값에 단위가 있는지 확인

```
unitless(100)   => true
unitless(100px) => false
```

## 3.4 2개의 값을 합산, 감산, 비교 가능한지 확인

```
comparable(2px, 1px)   => true
comparable(100px, 3em) => false
comparable(10cm, 3mm)  => true
```

# 4. String Functions

## 4.1 따옴표 붙이기

```
quote("foo") => "foo"
quote(foo)   => "foo"
```

## 4.2 따옴표 제거

```
unquote("foo") => foo
unquote(foo)   => foo
```

# 5. List Functions

## 5.1 리스트 요소수 취득

```
length(10px)                        => 1
length(10px 20px 30px)              => 3
length((width: 10px, height: 20px)) => 2
```

## 5.2 리스트의 n번째 요소 취득

```
nth(10px 20px 30px, 1)                 => 10px
nth((Helvetica, Arial, sans-serif), 3) => sans-serif
nth((width: 10px, length: 20px), 2)    => length 20px

$n: nth(width: 10px, length: 20px);
nth(($n, 2), 1)                        => length
```

## 5.3 요소의 index 취득

```
index(1px solid red, solid)                       => 2
index(1px solid red, dashed)                      => null
index((width: 10px, height: 20px), (height 20px)) => 2
```

## 5.4 리스트의 마지막에 단일 요소 추가

```
append(10px 20px, 30px)      => 10px 20px 30px
append((blue, red), green)   => blue, red, green
append(10px 20px, 30px 40px) => 10px 20px (30px 40px)
append(10px, 20px, comma)    => 10px, 20px
append((blue, red), green, space) => blue red green
```

## 5.5 리스트와 리스트의 결합

```
join(10px 20px, 30px 40px)      => 10px 20px 30px 40px
join((blue, red), (#abc, #def)) => blue, red, #abc, #def
join(10px, 20px)                => 10px 20px
join(10px, 20px, comma)         => 10px, 20px
join((blue, red), (#abc, #def), space) => blue red #abc #def
```

## 5.6 복수의 리스트를 각자의 순서에 맞추어 재결합

```
zip(1px 1px 3px, solid dashed solid, red green blue)
=> 1px solid red, 1px dashed green, 3px solid blue
```

# 6. Map Functions

## 6.1 key로 value 취득

```
map-get(("foo": 1, "bar": 2), "foo") => 1
map-get(("foo": 1, "bar": 2), "bar") => 2
map-get(("foo": 1, "bar": 2), "baz") => null
```

# Reference

* [Sass](http://sass-lang.com/)

* [Sass Built-in Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)

* [Sass Color Generator](http://scg.ar-ch.org/)
