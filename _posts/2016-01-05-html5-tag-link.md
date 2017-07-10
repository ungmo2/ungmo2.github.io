---
layout: post
title: HTML5 Tag - Link
subtitle: HTML의 핵심 개념인 <strong>Hyperlink</strong>
category: html
section: html
description: HyperText의 Hyper는 컴퓨터 용어로서 텍스트 등의 정보가 동일 선상에 있는 것이 아니라 다중으로 연결되어 있는 상태를 의미한다. 이것은 HTML의 가장 중요한 특징인 link의 개념과 연결되는데 기존 문서나 텍스트의 선형성, 고정성의 제약에서 벗어나 사용자가 원하는 순서대로 원하는 정보를 취득할 수 있는 기능을 제공한다. 한 텍스트에서 다른 텍스트로 건너뛰어 읽을 수 있는 이 기능을 하이퍼링크(hyper link)라 한다.
---

* TOC
{:toc}

HyperText의 Hyper는 컴퓨터 용어로서 텍스트 등의 정보가 동일 선상에 있는 것이 아니라 다중으로 연결되어 있는 상태를 의미한다.

이것은 HTML의 가장 중요한 특징인 link의 개념과 연결되는데 기존 문서나 텍스트의 [선형성](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%98%95%EC%84%B1), 고정성의 제약에서 벗어나 사용자가 원하는 순서대로 원하는 정보를 취득할 수 있는 기능을 제공한다. 한 텍스트에서 다른 텍스트로 건너뛰어 읽을 수 있는 이 기능을 <strong>하이퍼링크(hyper link)</strong>라 한다.

HTML link는 hyperlink를 의미하며 a tag가 그 역할을 담당한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <a href="http://www.google.com">Visit google.com!</a>
  </body>
</html>
```

<div class="result">
  <a href="http://www.google.com">Visit google.com!</a>
</div>

# 1. href 어트리뷰트

href 어트리뷰트는 이동하고자 하는 파일의 위치(경로)를 값으로 받는다. 경로(path)란 파일 시스템 상에서 특정 파일의 위치를 의미한다.

## 1.1 디렉터리(Directory)

디렉터리는 파일과 다른 디렉터리를 갖는 파일 시스템 내의 존재물로서 폴더라고도 불리운다.

루트 디렉터리
: 파일 시스템 계층 구조 상의 최상위 디렉터리이다.  
- Unix: /  
- Windows: C:\

홈 디렉터리
: 시스템의 사용자에게 각각 할당된 개별 디렉터리이다.   
- Unix: /Users/{계정명}  
- Windows: C:\Users\\{계정명}

작업 디렉터리
: 작업 중인 파일의 위치한 디렉터리이다.  
- ./  

부모 디렉터리
: 작업 디렉터리의 부모 디렉토리이다.  
- ../

## 1.2 파일 경로(File path)

파일 경로는 파일 시스템에서 파일의 위치를 나타내는 방법이다. 경로에는 절대경로와 상대경로가 있다.

절대경로(Absolute path)
: 현재 작업 디렉터리와 관계없이 특정 파일의 절대적인 위치를 가리킨다. 루트 디렉터리를 기준으로 파일의 위치를 나타낸다.  
- http://www.mysite.com/index.html  
- /Users/leeungmo/Desktop/myImage.jpg  
- C:\users\leeungmo\Desktop\myImage.jpg  

상대경로(Relative path)
: 현재 작업 디렉터리를 기준으로 특정 파일의 상대적인 위치를 가리킨다.  
- /index.html  
- ./index.html   
- ../dist/index.js  
- ../../dist/index.js  
- index.html 
- html/index.html 

href 어트리뷰트에 사용 가능한 값은 아래와 같다.

| Value               | Description                                                 |
| :-----------------: |:------------------------------------------------------------|
| 절대 URL             | 웹사이트 URL (href="http://www.example.com/default.html")
| 상대 URL             | 자신의 위치를 기준으로한 대상의 URL (href="html/default.html")
| fragment identifier | 페이지 내의 특정 id를 갖는 요소에의 링크 (href="#top")
| 기타 프로토콜          | ftp://, mailto:, file:, etc..
| script              | href="javascript:alert('Hello');"

```html
<a href="http://www.google.com">URL</a>
<a href="html/my.html">Local file</a>
<a href="#top">fragment identifier</a>
<a href="mailto:someone@example.com?Subject=Hello%20again">Send Mail</a>
```

<div class='result'>
<a href="http://www.google.com">URL</a>
<a href="html/my.html">Local file</a>
<a href="#top">fragment identifier</a>
<a href="mailto:someone@example.com?Subject=Hello%20again">Send Mail</a>
</div>

fragment identifier를 이용한 페이지 내부 이동 방법은 다음과 같다.

```html
<!DOCTYPE html>
<html>
<body>

<h2 id="top">Top of page!</h2>

<p>In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.</p>
<p>"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."</p>
<p>He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought-frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth.</p>
<p>And, after boasting this way of my tolerance, I come to the admission that it has a limit. Conduct may be founded on the hard rock or the wet marshes, but after a certain point I don't care what it's founded on. When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever; I wanted no more riotous excursions with privileged glimpses into the human heart. Only Gatsby, the man who gives his name to this book, was exempt from my reaction-Gatsby, who represented everything for which I have an unaffected scorn. If personality is an unbroken series of successful gestures, then there was something gorgeous about him, some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes ten thousand miles away. This responsiveness had nothing to do with that flabby impressionability which is dignified under the name of the "creative temperament"-it was an extraordinary gift for hope, a romantic readiness such as I have never found in any other person and which it is not likely I shall ever find again. No-Gatsby turned out all right at the end; it is what preyed on Gatsby, what foul dust floated in the wake of his dreams that temporarily closed out my interest in the abortive sorrows and short-winded elations of men.</p>

<a href="#top">Go to top</a>
</body>
</html>
```

<div class='result'></div>

# 2. target 어트리뷰트

target 어트리뷰트는 링크를 클릭했을 때 윈도우를 어떻게 오픈할 지를 지정한다.

| Value       | Description                                          |
| :---------: |:-----------------------------------------------------|
| `_blank`    | 링크를 클릭했을 때 연결문서를 새로운 윈도우나 탭에서 오픈한다
| `_self`     | 링크를 클릭했을 때 연결문서를 현재 윈도우에서 오픈한다 (기본값)
| `_parent`   | 링크를 클릭했을 때 연결문서를 부모(상위레벨) 윈도우에서 오픈한다
| `_top`      | 링크를 클릭했을 때 연결문서를 최상위 윈도우에서 오픈한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <a href="http://www.google.com" target="_blank">Visit google.com!</a>
  </body>
</html>
```

<div class="result"></div>

# Reference

* [HTML elements: a – hyperlink](https://www.w3.org/TR/html-markup/a#a)
