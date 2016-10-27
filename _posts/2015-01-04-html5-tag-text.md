---
layout: post
title: HTML5 Tag - Text
subtitle: 텍스트 관련 태그
category: html
section: html
---

* TOC
{:toc}

최근의 웹 트랜드는 텍스트를 줄이고 이미지나 동영상 등으로 컨텐츠를 구성하는 것이지만 HTML 컨텐츠의 대부분은 텍스트로 구성된다.

제목이나 본문, 글자의 형태와 중요도를 나타내는 텍스트에 관련된 태그들을 알아보도록 하자.

# 1. 제목 (Headings) 태그

Heading 태그는 제목을 지정할 때 사용하며 h1에서 h6까지의 태그가 있다. h1이 가장 중요한 제목을 의미하며 글자의 크기도 가장 크다.

[시맨틱 웹](./html5-semantic-Web.html)의 의미를 살려서 제목 이외에는 사용하지 않는 것이 좋다. 검색엔진은 제목 태그를 중요한 의미로 받아들일 가능성이 크다.

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>This is heading 1</h1>
    <h2>This is heading 2</h2>
    <h3>This is heading 3</h3>
    <h4>This is heading 4</h4>
    <h5>This is heading 5</h5>
    <h6>This is heading 6</h6>
  </body>
</html>
```

<div class='result'></div>

# 2. 글자 형태 (Text Formatting) 태그

## 2.1 b

bold체를 지정한다. 제목 태그와 같이 의미론적(Semantic) 중요성의 의미는 없다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>This text is normal.</p>
    <p><b>This text is bold.</b></p>
  </body>
</html>
```

<div class='result'></div>

## 2.2. strong

b tag와 동일하게 bold체를 지정한다. 하지만 의미론적(Semantic) 중요성의 의미를 갖는다.

b tag와 표현되는 외양은 동일하지만 웹표준을 준수하고자 한다면 strong를 사용하는 것이 바람직하다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>This text is normal.</p>
    <p><strong>This text is strong.</strong></p>
  </body>
</html>
```

<div class='result'></div>

## 2.3 i

Italic체를 지정한다. 의미론적(Semantic) 중요성의 의미는 없다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>This text is normal.</p>
    <p><i>This text is italic.</i></p>
  </body>
</html>
```

<div class='result'></div>

## 2.4 em

emphasized(강조, 중요한) text를 지정한다. i tag와 동일하게 Italic체로 표현된다. 의미론적(Semantic) 중요성의 의미를 갖는다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>This text is normal.</p>
    <p><em>This text is emphasized.</em></p>
  </body>
</html>
```

<div class='result'></div>

## 2.5 small

small text를 지정한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <h2>HTML <small>Small</small> Formatting</h2>
  </body>
</html>
```

<div class='result'></div>

## 2.6 mark

highlighted text를 지정한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <h2>HTML <mark>Marked</mark> Formatting</h2>
  </body>
</html>
```

<div class='result'></div>

## 2.7 del

deleted (removed) text를 지정한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>The del element represents deleted (removed) text.</p>
    <p>My favorite color is <del>blue</del> red.</p>
  </body>
</html>
```

<div class='result'></div>

## 2.8 ins

inserted (added) text를 지정한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>The ins element represent inserted (added) text.</p>
    <p>My favorite <ins>color</ins> is red.</p>
  </body>
</html>
```

<div class='result'></div>

## 2.9 sub / sup

sub 태그는 subscripted(아래에 쓰인) text를 sup 태그는 superscripted(위에 쓰인) text를 지정한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>This is <sub>subscripted</sub> text.</p>
    <p>This is <sup>superscripted</sup> text.</p>
  </body>
</html>
```

<div class='result'></div>

# 3. 본문 태그

## 3.1 p

단락 (Paragraphs)을 지정한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>This is a heading.</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </body>
</html>
```

<div class='result'></div>

## 3.2 br

br tag는 (강제)개행 (line break)을 지정한다. br tag는 빈 요소(empty element)로 종료태그가 없다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>This is<br>a para<br>graph with line breaks</p>
  </body>
</html>
```

<div class='result'></div>

HTML에서는 1개 이상의 연속된 공백(space)을 삽입하여도 1개의 공백으로 표시된다. 1개 이상의 연속된 줄바꿈(enter)도 1개의 공백으로 표시된다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>In HTML, spaces and new lines are ignored:</p>
    <p>
      My Bonnie lies over the ocean.

      My Bonnie  lies over the sea.

      My Bonnie   lies over the ocean.

      Oh,           bring back my Bonnie to me.
    </p>
  </body>
</html>
```

<div class='result'></div>

연속적 공백을 삽입하는 방법은 아래와 같다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>This is&nbsp; a para&nbsp; &nbsp; graph</p>
  </body>
</html>
```

<div class='result'></div>

## 3.3 pre

형식화된(preformatted) text를 지정한다. pre 태그 내의 content는 작성된 그대로 브라우저에 표시된다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>In HTML, spaces and new lines are ignored:</p>
    <pre>
      My Bonnie lies over the ocean.

      My Bonnie  lies over the sea.

      My Bonnie   lies over the ocean.

      Oh,           bring back my Bonnie to me.
    </pre>
  </body>
</html>
```

<div class='result'></div>

## 3.4 hr

수평줄을 삽입한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>HTML</h1>
    <p>HTML is a language for describing web pages.</p>

    <hr>

    <h1>CSS</h1>
    <p>CSS defines how to display HTML elements.</p>
  </body>
</html>
```

<div class='result'></div>

## 3.5 q

짧은 인용문(quotation)을 지정한다. 브라우저는 인용부호(큰따옴표/quotation marks)로 q 요소를 감싼다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>Browsers usually insert quotation marks around the q element.</p>
    <p>WWF's goal is to: <q>Build a future where people live in harmony with nature.</q></p>
  </body>
</html>
```

<div class='result'></div>

## 3.6 blockquote

긴 인용문 블럭을 지정한다. 브라우저는 blockquote 요소를 들여쓰기한다. css를 이용하여 다양한 style을 적용할 수 있다.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>Browsers usually indent blockquote elements.</p>
    <blockquote>
      For 50 years, WWF has been protecting the future of nature.
      The world's leading conservation organization,
      WWF works in 100 countries and is supported by
      1.2 million members in the United States and
      close to 5 million globally.
    </blockquote>
  </body>
</html>
```

<div class='result'></div>

![blockquote-style](/img/blockquote-style.png)

# Reference

* [HTML 요소 레퍼런스](https://developer.mozilla.org/ko/docs/Web/HTML/Element)

* [HTML elements](https://www.w3.org/TR/html-markup/elements.html)

* [HTML attributes](https://www.w3.org/TR/html-markup/global-attributes.html#common.attrs.core)
