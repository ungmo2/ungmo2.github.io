---
layout: post
title: HTML & CSS Introduction
categories: html
---

HTML (HyperText Markup Language) 은 웹페이지의 내용(content)과 구성(structure)을 담당한다. HTML은 tag들의 집합으로 tag는 각 정보의 종류와 내용을 갖는다.

* 제목
* 단락
* 이미지

CSS (Cascading Style Sheets) 는 HTML 요소(Element)의 style(design, layout etc)을 표현한다.

* 폰트
* 글자의 크기
* 글자의 색

HTML과 CSS는 각자의 문법을 갖는 언어로 HTML은 CSS를 포함할 수 있다. 그러나 HTML 없이 단독으로 존재하는 CSS는 의미가 없다.

HTML은 웹페이지의 내용(content)와 구성(structure)를 담당하며 CSS는 HTML 요소의 외양(style)을 정의한다.

# HTML Document Structure

HTML document는 반드시 `<!DOCTYPE html>`으로 시작하여 document의 type을 HTML로 지정한다.  
실제적인 HTML document은 2행부터 시작되는데 `<html>` 과 `</html>` 사이에 기술한다.  
`<head>` 와 `</head>` 사이에는 document title, 외부파일의 침조, metadata의 설정 등이 실시되며 이 정보들은 브라우저에 표시되지 않는다.  
브라우저에 표시되는 대부분의 요소는 `<body>` 과 `</body>` 사이 위치한다.

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

HTML document는 순수한 텍스트이고 .html 확장자 파일로 저장한다.

# HTML Terms

## 요소 (Element)

HTML document는 요소(Element)들로 만들어 진다.

요소는 시작 태그(start tag)와 종료 태그(end tag) 그리고 태그 사이에 위치한 content로 구성된다. 종료 태그는 생략할 수 없다.

태그는 대소문자를 구별하지 않으나 [W3C: World Wide Web Consortium](https://www.w3.org/)에서는 HTML4의 경우 소문자를 추천하고 있으므로 HTML5에서도 소문자를 사용하는 것이 일반적이다.

```html
<tagname>content</tagname>
```

![tag](/img/tag.png)

### 요소의 중첩 (Nested Element)

요소는 중첩될 수 있다. 즉, 요소는 다른 요소를 포함할 수 있다.

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>
</html>
```

<html> 요소는 웹페이지를 구성하는 모든 요소들을 포함한다. 위 예제를 보면 <html> 요소는 <body> 요소를 포함하며 <body> 요소는 <h1>, <p> 요소를 포함한다. 이 중첩 관계 (부자 관계)로 웹페이지의 구성(structure)를 표현한다.

이런 중첩 관계 (부자 관계)를 시각적으로 파악하기 쉽게 indent를 활용한다.

### 빈 요소 (Empty Element)

* <br>
* <embed>
* <hr>
* <img>
* <input>
* <link>
* <meta>
* <param>
* <source>

content를 가질 수 없는 요소를 빈 요소(Empty element or Self-Closing element)라 한다. 아래의 예와 같이 빈 요소는 내용이 없으며 속성(Attribute)만을 가질 수 있다.

```html
<meta charset="utf-8">
```

## 속성 (Attribute)

요소는 속성을 가질 수 있으며 속성은 요소에 추가적 정보를 제공한다.  
속성은 시작 태그에 위치해야 하며 속성명과 속성값의 쌍을 이룬다. (e.g. name="value")

![html attribute](/img/html-attribute.png)

```html
<img src="html.jpg" width="104" height="142">
```
위의 예에서 속성 src는 이미지 파일의 경로와 파일명, width는 이미지의 넓이, height는 이미지의 높이 정보를 브라우저에 알려주고 있다.

# CSS Terms

## 선택자 (Selector)

CSS는 HTML 요소의 style(design, layout etc)을 정의하는데 사용된다. 선택자는 style을 적용하고자 하는 HTML 요소를 지시하는 방법이다.

![css selector](/img/selector.gif)

## 프로퍼티 (Property)

선택자로 HTML 요소를 선택하고 {} 내에 프로퍼티를 지정하는 것으로 다양한 style을 적용시킬수 있다. 프로퍼티는 [표준 스펙](https://www.w3.org/community/webed/wiki/CSS/Properties)으로 이미 지정되어 있는 것을 사용하여야하며 사용자가 임의로 정의할 수 없다. 여러개의 프로퍼티를 연속해서 지정할 수 있으며 세미콜론(;)으로 구분한다.

```css
p {
  color: ...;
  font-size: ...;
}
```

## 값 (Value)

선택자로 지정한 HTML 요소에 style을 적용하기 위해 프로퍼티를 사용했다. 프로퍼티는 style의 종류(e.g. Color, Background, Font 등)로서 표준 스펙으로 지정되어 있는 것을 사용하는데 이 프로퍼티의 값은 사용자가 지정하여야 한다.

```css
p {
  color: orange;
  font-size: 16px;
}
```

# HTML과 CSS의 연계

HTML은 CSS를 포함할 수 있다. CSS를 가지고 있지 않은 HTML은 브라우저에서 기본으로 적용하는 CSS에 의거하여 표시된다. (user agent stylesheet)

CSS를 포함하는 HTML은 CSS가 적용되는데 이때 CSS와 HTML을 연꼐하는 방법은 다음과 같다.

## Link style

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="css/style.css">
  </head>

  <body>
    <h1>Hello World</h1>
    <p>This is a web page.</p>
  </body>
</html>
```

```css
h1 { color: red; }
p { background: blue; }
```

## Embedding style

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 { color: red; }
      p { background: blue; }
    </style>
  </head>

  <body>
    <h1>Hello World</h1>
    <p>This is a web page.</p>
  </body>
</html>
```

## Inline style

```html
<!DOCTYPE html>
<html>
  <body>
    <h1 style="color: red">Hello World</h1>
    <p style="background: blue">This is a web page.</p>
  </body>
</html>
```

# Reset CSS 사용하기

모든 웹 브라우저는 디폴트 스타일을 가지고 있어 CSS가 없어도 작동한다. 그런데 웹브라우저 별ㄹ로 디폴트 스타일이 상이하고 지원하는 tag나 style도 제각각이어 주의가 필요하다.

Reset CSS는 기본적인 HTML 요소의 CSS를 초기화하는 용도로 사용한다. 즉 브라우저 별로 제각각인 디폴트 스타일을 하나의 스타일로 통일시켜 주는 역할을 한다.

자주 사용되는 Reset CSS는 다음과 같다.

* [Eric Meyer’s reset](http://meyerweb.com/eric/tools/css/reset/)  
* [normalize.css](https://necolas.github.io/normalize.css/)  

다음은 Eric Meyer’s reset css이다. 이것을 기준으로 사용자의 CSS를 완성해 나가는 방법은 매우 유용하다.

```css
/* http://meyerweb.com/eric/tools/css/reset/
  v2.0 | 20110126
  License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

# Reference

* [w3schools.com](http://www.w3schools.com)

* [Learn to Code HTML & CSS](http://learn.shayhowe.com/)
