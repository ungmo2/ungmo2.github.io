---
layout: post
title: CSS3 <strong>Selector</strong>
subtitle: Styling 대상을 특정하는 선택자
category: css
section: css
---

* TOC
{:toc}

CSS (Cascading Style Sheets)는 HTML 요소(Element)의 style(design, layout etc)을 정의한다. 그리하려면 HTML이 존재하여야 하고 또한 <strong>style을 적용하고자하는 HTML 요소를 특정</strong>할 필요가 있다.

이러한 목적으로 사용되는 것이 선택자(Selector)이다. 즉, style을 적용하고자하는 HTML 요소를 선택자로 특정하고 선택된 요소에 스타일을 정의하는 것이다.

![css selector](/img/css-syntax.png)

CSS Rule Set
{: .desc-img}

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1 { color: red; }
    p  { color: blue; }
  </style>
</head>
<body>
  <h1>Hello World!</h1>
  <p>This paragraph is styled with CSS.</p>
</body>
</html>
```

<div class="result"></div>

복수개의 선택자를 연속하여 지정할 수 있으며 쉼표( , )로 구분한다.

```css
h1, p { color: red; }
```

# 1. 전체 선택자 (Universal Selector)

HTML 문서 내의 모든 요소를 선택한다. html 요소를 포함한 모든 요소가 선택된다. (head 요소도 포함된다)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { color: red; }
  </style>
</head>
<body>
  <h1>Heading</h1>
  <div>
    <p>paragraph 1</p>
    <p>paragraph 2</p>
  </div>
  <p>paragraph 3</p>
</body>
</html>
```

<div class="result"></div>

# 2. 태그 선택자 (Type Selector)

지정된 태그명을 가지는 요소를 선택한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p { color: red; }
  </style>
</head>
<body>
  <h1>Heading</h1>
  <div>
    <p>paragraph 1</p>
    <p>paragraph 2</p>
  </div>
  <p>paragraph 3</p>
</body>
</html>
```

<div class="result"></div>

# 3. ID 선택자 (ID Selector)

id 속성값을 지정하여 일치하는 요소를 선택한다. id 속성값은 중복되지 않는 유일한 값이어야 한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    #p1 { color: red; }
  </style>
</head>
<body>
  <h1>Heading</h1>
  <div class="container">
    <p id="p1">paragraph 1</p>
    <p id="p2">paragraph 2</p>
  </div>
  <p>paragraph 3</p>
</body>
</html>
```

<div class="result"></div>

# 4. 클래스 선택자 (Class Selector)

class 속성값을 지정하여 일치하는 요소를 선택한다. class 속성값은 중복될 수 있는 값이다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { color: red; }
  </style>
</head>
<body>
  <h1>Heading</h1>
  <div class="container">
    <p id="p1">paragraph 1</p>
    <p id="p2">paragraph 2</p>
  </div>
  <p>paragraph 3</p>
</body>
</html>
```

<div class="result"></div>

class 속성값은 복수개 지정할 수 있다.(공백으로 구분)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .text-center { text-align: center; }
    .text-large  { font-size: 300%; }
    .text-red    { color: red; }
    .text-blue   { color: blue; }
  </style>
</head>
<body>
  <h1 class="text-center">Heading</h1>
  <p class="text-large text-red">paragraph 1</p>
  <p class="text-center text-large text-blue">paragraph 2</p>
</body>
</html>
```

<div class="result"></div>

# 5. 속성 선택자 (Attribute Selector)

특정 속성을 지정하여 일치하는 요소를 선택한다.

| 패턴                 | Description |
|:--------------------|:------------|
| 선택자[속성]           | 지정 속성이 포함된 요소 선택
| 선택자[속성="값"]       | 지정 속성과 값이 일치하는 요소 선택
| 선택자[속성~="값"]      | 지정 속성의 값에 지정 속성값을 (공백으로 분리된 단어로) 포함하는 요소 선택
| 선택자[속성\|="값"]     | 지정 속성값과 일치하거나 지정 속성값 뒤 연이은 하이픈("값-")으로 시작하는 요소 선택
| 선택자[속성^="값"]      | 지정 속성값으로 시작하는 요소 선택
| 선택자[속성$="값"]      | 지정 속성값으로 끝나는 요소 선택
| 선택자[속성*="값"]      | 지정 속성값을 포함하는 요소 선택

선택자[속성]
: 지정 속성이 포함된 요소 선택한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* a 요소 중에 href 속성을 가지는 요소 */
    a[href] { color: red; }
  </style>
</head>
<body>
  <a href="http://www.poiemaweb.com">poiemaweb.com</a><br>
  <a href="http://www.google.com" target="_blank">google.com</a><br>
  <a href="http://www.naver.com" target="_top">naver.com</a>
</body>
</html>
```

<div class="result"></div>

선택자[속성="값"]
: 지정 속성과 값이 일치하는 요소를 선택한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* a 요소 중에 target 속성값이 "_blank"인 요소 */
    a[target="_blank"] { color: red; }
  </style>
</head>
<body>
  <a href="http://www.poiemaweb.com">poiemaweb.com</a><br>
  <a href="http://www.google.com" target="_blank">google.com</a><br>
  <a href="http://www.naver.com" target="_top">naver.com</a>
</body>
</html>
```

<div class="result"></div>

선택자[속성~="값"]
: 지정 속성의 값에 지정 속성값을 (공백으로 분리된 단어로) 포함하는 요소를 선택한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* h1 요소 중에 title 속성값에 "first"를 단어로 포함하는 요소 */
    h1[title~="first"] { color: red; }
  </style>
</head>
<body>
  <h1 title="heading first">Heading first</h1>
  <h1 title="heading second">Heading second</h1>
  <h1 title="heading third">Heading third</h1>
</body>
</html>
```

<div class="result"></div>

선택자[속성\|="값"]
: 지정 속성값과 일치하거나 지정 속성값 뒤 연이은 하이픈("값-")으로 시작하는 요소를 선택한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* lang 속성값이 "en"과 일치하거나 "en-"로 시작하는 요소 */
    [lang|="en"] { color: red; }
  </style>
</head>
<body>
  <p lang="en">Hello!</p>
  <p lang="en-us">Hi!</p>
  <p lang="en-gb">Ello!</p>
  <p lang="us">Hi!</p>
  <p lang="no">Hei!</p>
</body>
</html>
```

<div class="result"></div>

선택자[속성^="값"]
: 지정 속성값으로 시작하는 요소를 선택한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* a 요소 중에 href 속성값이 "https://"로 시작하는 요소 */
    a[href^="https://"] { color: red; }
  </style>
</head>
<body>
  <a href="https://www.test.com">https://www.test.com</a><br>
  <a href="http://www.test.com">http://www.test.com</a>
</body>
</html>
```

<div class="result"></div>

선택자[속성$="값"]
: 지정 속성값으로 끝나는 요소를 선택한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* a 요소 중에 href 속성값이 ".html"로 끝나는 요소 */
    a[href$=".html"] { color: red; }
  </style>
</head>
<body>
  <a href="test.html">test.html</a><br>
  <a href="test.jsp">test.jsp</a>
</body>
</html>
```

<div class="result"></div>

선택자[속성*="값"]
: 지정 속성값을 포함하는 요소를 선택한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* div 요소 중에 class 속성값에 "test"를 포함하는 요소 */
    div[class*="test"] { color: red; }
    /* div 요소 중에 title 속성값에 "test"를 단어로 포함하는 요소 */
    div[class~="test"] { background-color: yellow; }
  </style>
</head>
<body>
  <div class="first_test">The first div element.</div>
  <div class="second">The second div element.</div>
  <div class="test">The third div element.</div>
  <p class="test">This is some text in a paragraph.</p>
</body>
</html>
```

<div class="result"></div>

# 6. 복합 선택자 (Combinator)

## 6.1 후손 선택자 (Descendant Combinator)

![css descendant child combinator](/img/descendant-child.png)

자신의 1 level 상위에 속하는 요소를 부모 요소, 1 level 하위에 속하는 요소를 <strong>자손 요소(자식 요소)</strong>라한다.

자신보다 n level 하위에 속하는 요소는 <strong>후손 요소(하위 요소)</strong>라 한다.

후손 선택자는 선택자A의 모든 후손(하위) 요소 중 선택자B와 일치하는 요소를 선택한다.

```
선택자A 선택자B
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* div 요소의 후손요소 중 p 요소 */
    div p { color: red; }
  </style>
</head>
<body>
  <h1>Heading</h1>
  <div>
    <p>paragraph 1</p>
    <p>paragraph 2</p>
    <span><p>paragraph 3</p></span>
  </div>
  <p>paragraph 4</p>
</body>
</html>
```

<div class="result"></div>

## 6.2 자식 선택자 (Child Combinator)

자손 선택자는 선택자A의 모든 자식 요소 중 선택자B와 일치하는 요소를 선택한다.

```
선택자A > 선택자B
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* div 요소의 자식요소 중 p 요소 */
    div > p { color: red; }
  </style>
</head>
<body>
  <h1>Heading</h1>
  <div>
    <p>paragraph 1</p>
    <p>paragraph 2</p>
    <span><p>paragraph 3</p></span>
  </div>
  <p>paragraph 4</p>
</body>
</html>
```

<div class="result"></div>

## 6.3 형제(동위) 선택자 (Sibling Combinator)

형제(동위) 선택자는 형제 관계(동위 관계)에서 뒤에 위치하는 요소를 선택할 때 사용한다.

![Sibling Combinator](/img/Sibling_Combinator.png)

## 6.3.1 인접 형제 선택자(Adjacent Sibling Combinator)

선택자A의 형제 요소 중 선택자A 바로 뒤에 위치하는 선택자B 요소를 선택한다. A와 B 사이에 다른 요소가 존재하면 선택되지 않는다.

```
선택자A + 선택자B
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* p 요소의 형제 요소 중에 p 요소 바로 뒤에 위치하는 ul 요소를 선택한다. */
    p + ul { color: red; }
  </style>
</head>
<body>
  <div>A div element.</div>
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ul>

  <p>The first paragraph.</p>
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ul>

  <h2>Another list</h2>
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ul>
</body>
</html>
```

<div class="result"></div>

## 6.3.2 일반 형제 선택자(General Sibling Combinator)

선택자A의 형제 요소 중 선택자A 뒤에 위치하는 선택자B 요소를 모두 선택한다.

```
선택자A ~ 선택자B
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* p 요소의 형제 요소 중에 p 요소 뒤에 위치하는 ul 요소를 모두 선택한다.*/
    p ~ ul { color: red; }
  </style>
</head>
<body>
  <div>A div element.</div>
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ul>

  <p>The first paragraph.</p>
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ul>

  <h2>Another list</h2>
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ul>
</body>
</html>
```

<div class="result"></div>

# 7. 가상 클래스 선택자 (Pseudo-Class Selector)

가상 클래스는 요소의 특정 상태에 따라 스타일을 정의할 때 사용된다. 특정 상태란 예를 들어 다음과 같다.

- 마우스가 올라와 있을때

- 링크를 방문했을 때와 아직 방문하지 않았을 때

- 포커스가 들어와 있을 때

이러한 특정 상태에는 원래 클래스가 존재하지 않지만 가상 클래스를 임의로 지정하여 선택하는 방법이다.

가상 클래스는 마침표(.) 대신 콜론(:)을 사용한다. CSS 표준에 의해 미리 정의된 이름이 있기 때문에 임의의 이름을 사용할 수 없다.

```css
selector:pseudo-class {
  property: value;
}
```

다음은 div 요소가 hover 상태일 때(마우스가 올라와 있을 때) background-color를 blue로 지정하는 예이다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    a:hover { color: red; }
    input:focus { background-color: red; }
  </style>
</head>
<body>
  <a href="#">Hover me</a><br><br>
  <input type="text" placeholder="focus me">
</body>
</html>
```

<div class="result"></div>

## 7.1 링크 선택자(Link pseudo-classes), 동적 선택자(User action pseudo-classes)

| pseudo-class | Description   |
|:-------------|:--------------|
| :link        | 선택자가 방문하지 않은 링크일 때
| :visited     | 선택자가 방문한 링크일 때
| :hover       | 선택자에 마우스가 올라와 있을 때
| :active      | 선택자가 클릭된 상태일 때
| :focus       | 선택자에 포커스가 들어와 있을 때

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* unvisited link */
    a:link { color: orange; }

    /* visited link */
    a:visited { color: green; }

    /* mouse over link */
    a:hover { font-weight: bold; }

    /* selected link */
    a:active { color: blue; }

    /* focus in */
    input[type=text]:focus,
    input[type=password]:focus {
      color: red;
    }
    </style>
  </head>
<body>
  <a href="#" target="_blank">This is a link</a><br>
  <input type="text" value="I'll be red when focused"><br>
  <input type="password" value="I'll be red when focused">
</body>
</html>
```

<div class="result"></div>

## 7.2 UI 요소 상태 선택자(UI element states pseudo-classes)

| pseudo-class | Description   |
|:-------------|:--------------|
| :checked     | 선택자가 체크 상태일 때
| :enabled     | 선택자가 사용 가능한 상태일 때
| :disabled    | 선택자가 사용 불가능한 상태일 때


```html
<!DOCTYPE html>
<html>
<head>
  <style>
    input:enabled + span {
      color: blue;
    }
    input:disabled + span {
      color: gray;
      text-decoration: line-through;
    }
    input:checked + span {
      color: red;
    }
  </style>
</head>
<body>
  <input type="radio" checked="checked" value="male" name="gender"> <span>Male</span><br>
  <input type="radio" value="female" name="gender"> <span>Female</span><br>
  <input type="radio" value="neuter" name="gender" disabled> <span>Neuter</span><hr>

  <input type="checkbox" checked="checked" value="bicycle"> <span>I have a bicycle</span><br>
  <input type="checkbox" value="car"> <span>I have a car</span><br>
  <input type="checkbox" value="motorcycle" disabled> <span>I have a motorcycle</span>
</body>
</html>
```

<div class="result"></div>

## 7.3 구조 가상 클래스 선택자(Structural pseudo-classes)

| pseudo-class       | Description                          |
|:-------------------|:-------------------------------------|
| :first-child       | 선택자에 해당하는 모든 요소 중 첫번째 자식인 요소를 선택
| :last-child        | 선택자에 해당하는 모든 요소 중 마지막 자식인 요소를 선택

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* 첫번째 자식 요소인 p 요소를 선택 */
    p:first-child { color: red; }
    /* 마지막 자식 요소인 p 요소를 선택 */
    /* body 요소의 두번째 p 요소는 마지막 자식 요소가 아니다. body 요소의 마지막 자식 요소는 div 요소이다. */
    p:last-child { color: blue; }
  </style>
</head>
<body>
  <p>This paragraph is the first child of its parent (body).</p>

  <h1>Welcome to My Homepage</h1>
  <p>This paragraph is not the first child of its parent.</p>

  <div>
    <p>This paragraph is the first child of its parent (div).</p>
    <p>This paragraph is not the first child of its parent.</p>
  </div>
</body>
</html>
```

<div class="result"></div>

| pseudo-class       | Description                          |
|:-------------------|:-------------------------------------|
| :nth-child(n)      | 선택자에 해당하는 모든 요소 중 앞에서 n번째 자식인 요소를 선택
| :nth-last-child(n) | 선택자에 해당하는 모든 요소 중 뒤에서 n번째 자식인 요소를 선택

n은 1부터 시작하는 정수이다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* 짝수번째 요소 */
    ol > li:nth-child(2n)   { color: orange; }
    /* 홀수번째 요소 */
    ol > li:nth-child(2n+1) { color: green; }
    ol > li:first-child     { color: red; }
    ol > li:last-child      { color: blue; }
    /* 4번째 요소 */
    ol > li:nth-child(4)    { background: brown; }

    /* 뒤에서부터 시작하여 홀수번째 요소 */
    ul > :nth-last-child(2n+1) { color: red; }
    /* 뒤에서부터 시작하여 짝수번째 요소 */
    ul > :nth-last-child(2n)   { color: blue; }
  </style>
</head>
<body>
  <ol>
    <li>Espresso</li>
    <li>Americano</li>
    <li>Caffe Latte</li>
    <li>Caffe Mocha</li>
    <li>Caramel Latte</li>
    <li>Cappuccino</li>
  </ol>

  <ul>
    <li>Espresso</li>
    <li>Americano</li>
    <li>Caffe Latte</li>
    <li>Caffe Mocha</li>
    <li>Caramel Latte</li>
    <li>Cappuccino</li>
  </ul>
</body>
</html>
```

<div class="result"></div>

| pseudo-class          | Description                          |
|:----------------------|:-------------------------------------|
| :first-of-type        | 선택자에 해당하는 요소의 부모의 자식 중 첫번째 등장하는 요소를 선택
| :last-of-type         | 선택자에 해당하는 요소의 부모의 자식 중 마지막에 등장하는 요소를 선택
| :nth-of-type (n)      | 선택자에 해당하는 요소의 부모의 자식 중 앞에서 n번째에 등장하는 요소를 선택
| :nth-last-of-type (n) | 선택자에 해당하는 요소의 부모의 자식 중 뒤에서 n번째에 등장하는 요소를 선택

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* p 요소의 부모의 자식 중 첫번째 등장하는 p 요소 */
    p:first-of-type  { color: red; }
    /* p 요소의 부모의 자식 중 마지막 등장하는 p 요소 */
    p:last-of-type   { color: blue; }
    /* p 요소의 부모의 자식 중 앞에서 2번째 등장하는 p 요소 */
    p:nth-of-type(2) { color: green; }
    /* p 요소의 부모의 자식 중 뒤에서 2번째 등장하는 p 요소 */
    p:nth-last-of-type(2) { color: orange;}

    p:first-child { background: brown;}
  </style>
</head>
<body>
  <h1>This is a heading</h1>
  <p>The first paragraph.</p>
  <p>The second paragraph.</p>
  <p>The third paragraph.</p>
  <p>The fourth paragraph.</p>
  <div>
    <h1>This is a heading</h1>
    <p>The first paragraph.</p>
    <p>The second paragraph.</p>
    <p>The third paragraph.</p>
    <p>The fourth paragraph.</p>
  </div>
</body>
</html>
```

<div class="result"></div>

## 7.4 부정 선택자(Negation pseudo-class)

| pseudo-class          | Description                          |
|:----------------------|:-------------------------------------|
| :not(선택자)            | 선택자에 해당하지 않는 모든 요소

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    input:not([type=password]) {
      background: yellow;
    }
  </style>
</head>
<body>
  <input type="text" value="Text input">
  <input type="email" value="email input">
  <input type="password" value="Password input">
</body>
</html>
```

<div class="result"></div>

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
    }
    div {
      width: 32vw;
      height: 200px;
      background-color: red;
      margin-bottom: 2vw;
      float: left;
    }
    div:not(:nth-of-type(3n-2)) {
      margin-left: 2vw;
    }
  </style>
</head>
<body>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</body>
</html>
```

<div class="result"></div>

# 8. 가상 요소 선택자 (Pseudo-Element Selector)

가상 요소는 요소의 특정 부분에 스타일을 적용하기 위하여 사용된다. 특정 부분이란 예를 들어 다음과 같다.

- 요소의 첫글자 또는 첫줄

- 요소의 content 앞 또는 뒤

가상 요소에는 두개의 콜론(::)을 사용한다. CSS 표준에 의해 미리 정의된 이름이 있기 때문에 임의의 이름을 사용할 수 없다.

```css
selector::pseudo-element {
  property:value;
}
```

| pseudo-element        | Description                          |
|:----------------------|:-------------------------------------|
| ::first-letter        | 첫글자를 선택한다.
| ::first-line          | 첫줄을 선택한다. 블록 요소에만 적용할 수 있다.
| ::after               | 태그 뒤에 위치하는 공간을 선택한다. 일반적으로 content 속성과 함께 사용된다.
| ::before              | 태그 앞에 위치하는 공간을 선택한다. 일반적으로 content 속성과 함께 사용된다.
| ::selection           | 드래그한 글자를 선택한다. iOS의 Safari와 Chrome에서는 동작 않는다. Firefox에서는 -moz- 프리픽스를 사용하여야 한다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p::first-letter { font-size: 3em; }
    p::first-line   { color: red; }

    h1::before {
      content: " HTML!!! ";
      color: blue;
    }
    h1::after {
      content: " CSS3!!!";
      color: red;
    }

    ::-moz-selection { /* Code for Firefox */
      color: red;
      background: yellow;
    }
    ::selection {
      color: red;
      background: yellow;
    }
  </style>
</head>
<body>
  <h1>This is a heading</h1>
  <p>You can use the ::first-line pseudo-element to add a special effect to the first line of a text. Some more text. And even more, and more, and more, and more, and more, and more, and more, and more, and more, and more, and more, and more.</p>
</body>
</html>
```

<div class="result"></div>

# Reference

* [W3C CSS Document](https://www.w3.org/TR/CSS/)
