---
layout: post
title: HTML5 <strong>Syntax</strong>
subtitle: Web page의 내용과 구조를 담당하는 HyperText Markup Language
category: html
section: html
---

* TOC
{:toc}

# Introduction

[HTML (HyperText Markup Language)](https://ko.wikipedia.org/wiki/HTML)은 웹페이지를 기술하기 위한 [마크업 언어](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EC%97%85_%EC%96%B8%EC%96%B4)로, 웹페이지의 <strong>내용(content)</strong>과 <strong>구조(structure)</strong>을 담당한다. 즉, HTML이란 HTML 태그를 통해 정보를 구조화하는 것이다.

![html5](/img/html5.png)

- HTML5 문서는 반드시 `<!DOCTYPE html>`으로 시작하여 문서 형식(document type)을 HTML5로 지정한다.

- 실제적인 HTML document은 2행부터 시작되는데 `<html>` 과 `</html>` 사이에 기술한다.

- `<head>` 와 `</head>` 사이에는 document title, 외부파일의 참조, metadata의 설정 등이 위치하며 이 정보들은 브라우저에 표시되지 않는다.

- 웹브라우저에 출력되는 모든 요소는 `<body>` 과 `</body>` 사이 위치한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello World</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a web page.</p>
  </body>
</html>
```

<p class="result"></p>

HTML document는 .html 확장자를 갖는 순수한 텍스트 파일이다. 따라서 메모장 등으로도 편집할 수 있으나 다양한 편의 기능을 제공하는 editor 또는 IDE(Integrated Development Environment)를 사용하는 것이 일반적이다.

* [Atom](https://www.atom.io/)  
* [Sublime text](https://www.sublimetext.com/)  
* [Brackets](http://brackets.io/)  
* [WebStorm](https://www.jetbrains.com/webstorm/)

# 요소 (Element)

HTML document는 요소(Element)들의 집합이다.

HTML 요소는 시작 태그(start tag)와 종료 태그(end tag) 그리고 태그 사이에 위치한 content로 구성된다.

![tag](/img/tag.png)

HTML Element
{: .desc-img}

태그는 대소문자를 구별하지 않으나 [W3C: World Wide Web Consortium](https://www.w3.org/)에서는 HTML4의 경우 소문자를 추천하고 있으므로 HTML5에서도 소문자를 사용하는 것이 일반적이다.

## 요소의 중첩 (Nested Element)

요소는 중첩될 수 있다. 즉, 요소는 다른 요소를 포함할 수 있다. 이때 부자관계가 성립된다.

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>
</html>
```

<p class="result"></p>

html 요소는 웹페이지를 구성하는 모든 요소들을 포함한다. 위 예제를 보면 html 요소는 body 요소를 포함하며 body 요소는 h1, p 요소를 포함한다. 이 중첩 관계(부자 관계)로 웹페이지의 구조(structure)를 표현한다.

이런 중첩 관계(부자 관계)를 시각적으로 파악하기 쉽게 indent를 활용한다.

## 빈 요소 (Empty Element)

content를 가질 수 없는 요소를 빈 요소(Empty element or Self-Closing element)라 한다. 아래의 예와 같이 빈 요소는 내용이 없으며 속성(Attribute)만을 가질 수 있다.

```html
<meta charset="utf-8">
```

빈 요소 중 대표적인 요소는 아래와 같다.

* br
* hr
* img
* input
* link
* meta

# 속성 (Attribute)

요소는 속성을 가질 수 있으며 속성은 요소에 추가적 정보를 제공한다.  
속성은 시작 태그에 위치해야 하며 속성명과 속성값의 쌍을 이룬다. (e.g. name="value")

![html attribute](/img/html-attribute.png)

HTML Attribute
{: .desc-img}

```html
<img src="html.jpg" width="104" height="142">
```

위의 예에서 속성 src는 이미지 파일의 경로와 파일명, width는 이미지의 너비, height는 이미지의 높이 정보를 브라우저에 알려준다. 이 정보들을 사용하여 브라우저는 img 요소를 화면에 출력한다.

## 글로벌 속성 (HTML Global Attributes)

요소는 속성을 가질 수 있으며 속성은 요소에 추가적 정보를 제공한다.  
글로벌 속성은 모든 HTML 요소의 공통 속성이다. 몇몇 요소에는 효과가 적용되지 않을 수 있지만, 글로벌 속성은 모든 요소에 사용될 수 있다.

자주 사용되는 글로벌 속성은 아래와 같다.

| Attribute   | Description |
| :---------: |:------------|
| id          | 유일한 식별자(id)를 요소에 지정한다. 중복 지정이 불가하다.
| class       | 스타일시트에 정의된 class를 요소에 지정한다. 중복 지정이 가능하다.
| hidden      | css의 hidden과는 다르게 의미상으로도 브라우저에 노출되지 않게 된다.
| lang        | 지정된 요소의 언어를 지정한다. 검색엔진의 크롤링 시 웹페이지의 언어를 인식할 수 있게 한다.
| style       | 요소에 인라인 스타일을 지정한다.
| tabindex    | 사용자가 키보드로 페이지를 내비게이션 시 이동 순서를 지정한다.
| title       | 요소에 관한 제목을 지정한다.

* [Global attributes](https://www.w3.org/TR/html-markup/global-attributes.html)

# 주석 (Comments)

주석(comment)는 주로 코드를 설명하기 위해 사용되며 브라우저는 주석을 화면에 표시하지 않는다.

```html
<!--This is a comment. Comments are not displayed in the browser-->
<p>This is a paragraph.</p>
```

<p class="result"></p>

# HTML Versions

| Version	    | Year      |
| :---------: |:---------:|
| HTML5       | 2014
| XHTML	      | 2000
| HTML 4.01   | 1999
| HTML 3.2    | 1997
| HTML 2.0    | 1995
| HTML        | 1991

# Reference

* [Browser Wars](https://ko.wikipedia.org/wiki/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%EC%A0%84%EC%9F%81)

* [웹 호환성 문제](https://ko.wikipedia.org/wiki/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%EC%9D%98_%EC%9B%B9_%ED%98%B8%ED%99%98%EC%84%B1_%EB%AC%B8%EC%A0%9C)
