---
layout: post
title: Sass - Built-in Function
categories: [Sass]
tags: []
---

![sass-logo](/img/sass-logo.png)

[Sass Built-in function](http://sass-lang.com/documentation/Sass/Script/Functions.html)에는 다양한 내장 함수를 제공한다. 그 중에서 활용 빈도가 높은 함수를 소개한다.

* TOC
{:toc}


# 1. Number Function

## 1.1 숫자값을 %로 변환

```scss
percentage(0.2)          => 20%
percentage(100px / 50px) => 200%
```

## 1.2 소숫점 이하 반올림

```scss
round(10.4px) => 10px
round(10.6px) => 11px
```

## 1.3 소숫점 이하 올림

```
ceil($value)
```

```scss
ceil(10.4px) => 11px
ceil(10.6px) => 11px
```

## 1.4 소숫점 이하 절사

```
floor($value)
```

```scss
floor(10.4px) => 10px
floor(10.6px) => 10px
```

숫자값の절대값を취득したい

abs($value)

1
abs(-10px)
2
↓
3
10px


Introspection Functions
값의 타입 취득

type-of($value)

1
type-of(#fff)
2
↓
3
color

값의 단위を취득

unit($number)

1
unit(100px)
2
↓
3
"px"

値に단위がついていないかどうかを취득したい

unit($number)

1
unitless(100px)
2
↓
3
false

2개의 값이 、합계したり비교したりできるかどうかを취득したい

comparable($number-1, $number-2)

1
comparable(100px, 3em)
2
↓
3
false


String Functions
クォートしたい

quote($string)

1
$val : hogehoge
2
quote($val)
3
↓
4
"hogehoge"

アンクォートしたい

unquote($string)

1
$val : "hogehoge"
2
unquote($val)
3
↓
4
hogehoge


List Functions
sassでは、이하のようにカンマ区切りやスペース区切りで指定された値をもつ変数を、リストとして操作することができます。

1
$list  : jojo dio polnareff abdul;
2
$list2 : star,world,knight,magicean;

リストの項目数を취득したい

length(list)

1
length($list)
2
↓
3
4

リストのn番目の項目を취득したい

nth(list,n)

1
length($list 3)
2
↓
3
polnareff

ある項目が、リストの中の何番目にあるか취득したい

index(list, value)

1
index($list, dio)
2
↓
3
2

リストの末尾に追加したい

append(list,val)

1
append($list,iggy)
2
↓
3
jojo dio polnareff abdul iggy;

リストを結合したい

append(list,list)

1
append($list, $list2)
2
↓
3
jojo dio polnareff abdul star world knight magicean;

リストを順番に組み合わせたい

zip(*list)

view sourceprint?
1
zip($list, $list2)
2
↓
3
jojo star,dio world,polnareff knight,abdul magicean;





# Reference

* [Sass](http://sass-lang.com/)

* [Sass Built-in Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)
