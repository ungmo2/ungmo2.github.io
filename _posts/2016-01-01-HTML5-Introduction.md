---
layout: post
title: HTML5 Introduction
categories: html
---

HTML (HyperText Markup Language) 은 웹페이지를 기술하기 위한 [마크업 언어](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EC%97%85_%EC%96%B8%EC%96%B4)로, 웹페이지의 내용(content)과 구조(structure)을 담당한다. 즉, HTML이란 HTML 태그를 통해 정보를 구조화하는 것이다.

![html5](/img/html5.png)
{: style="max-width:500px; margin: 10px auto;"}

HTML5 문서는 반드시 `<!DOCTYPE html>`으로 시작하여 문서 형식(document type)을 HTML5로 지정한다.

실제적인 HTML document은 2행부터 시작되는데 `<html>` 과 `</html>` 사이에 기술한다.  
`<head>` 와 `</head>` 사이에는 document title, 외부파일의 참조, metadata의 설정 등이 위치하며 이 정보들은 브라우저에 표시되지 않는다. 브라우저에 출력되는 대부분의 요소는 `<body>` 과 `</body>` 사이 위치한다.

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

HTML document는 순수한 텍스트이며 .html 확장자 파일로 저장한다. 메모장으로도 편집할 수 있으나 다양한 편의 기능을 제공하는 editor 또는 IDE(Integrated Development Environment)를 사용하는 것이 일반적이다.

* [Atom](https://www.atom.io/)  
* [Sublime text](https://www.sublimetext.com/)  
* [Brackets](http://brackets.io/)  
* [WebStorm](https://www.jetbrains.com/webstorm/)

# HTML Terms

## 요소 (Element)

HTML document는 요소(Element)들의 집합이다.

HTML 요소는 시작 태그(start tag)와 종료 태그(end tag) 그리고 태그 사이에 위치한 content로 구성된다.

![tag](/img/tag.png)
{: style="max-width:550px; margin: 10px auto;"}

태그는 대소문자를 구별하지 않으나 [W3C: World Wide Web Consortium](https://www.w3.org/)에서는 HTML4의 경우 소문자를 추천하고 있으므로 HTML5에서도 소문자를 사용하는 것이 일반적이다.

### 요소의 중첩 (Nested Element)

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

html 요소는 웹페이지를 구성하는 모든 요소들을 포함한다. 위 예제를 보면 html 요소는 body 요소를 포함하며 body 요소는 h1, p 요소를 포함한다. 이 중첩 관계(부자 관계)로 웹페이지의 구성(structure)를 표현한다.

이런 중첩 관계(부자 관계)를 시각적으로 파악하기 쉽게 indent를 활용한다.

### 빈 요소 (Empty Element)

* br
* embed
* hr
* img
* input
* link
* meta
* param
* source

content를 가질 수 없는 요소를 빈 요소(Empty element or Self-Closing element)라 한다. 아래의 예와 같이 빈 요소는 내용이 없으며 속성(Attribute)만을 가질 수 있다.

```html
<meta charset="utf-8">
```

## 속성 (Attribute)

요소는 속성을 가질 수 있으며 속성은 요소에 추가적 정보를 제공한다.  
속성은 시작 태그에 위치해야 하며 속성명과 속성값의 쌍을 이룬다. (e.g. name="value")

![html attribute](/img/html-attribute.png)
{: style="max-width:550px; margin: 10px auto;"}

```html
<img src="html.jpg" width="104" height="142">
```

위의 예에서 속성 src는 이미지 파일의 경로와 파일명, width는 이미지의 너비, height는 이미지의 높이 정보를 브라우저에 알려준다. 이 정보들을 사용하여 브라우저는 img 요소를 화면에 출력한다.

# HTML Versions

| Version	    | Year     |
| :---------: |:---------|
| HTML5       | 2014
| XHTML	      | 2000
| HTML 4.01   | 1999
| HTML 3.2    | 1997
| HTML 2.0    | 1995
| HTML        | 1991
