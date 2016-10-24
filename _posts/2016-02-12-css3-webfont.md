---
layout: post
title: CSS3 <strong>Web Font</strong>
subtitle: 웹디자인 타이포그래피(Typography)
categories: css
section: css
---

# 웹폰트 (Web Font)

웹디자인 관점에서 폰트의 선택은 중요한 의미를 갖는다. 대부분의 정보는 텍스트와 이미지로 전달되고 아직은 텍스트가 주를 이루기 때문에 더욱 그러하다. 이전에는 웹에서 사용할 수 있는 아름다운 한글 폰트가 적어 포토샵 등으로 로컬 폰트를 사용하여 텍스트를 이미지로 만들어 사용하였다. 이것은 많은 트래픽을 유발하고 웹크롤러가 정보를 수집할 수 없어 SEO관점에서도 바람직하지 않다. 아름답고 정돈된 폰트를 사용한다면 그 자체만으로도 훌륭한 웹디자인이 가능하다.

<!-- ![only-text-website](/img/only-text-website.jpg)
{: style="max-width:550px; margin: 10px auto;"} -->

![only-text-website](/img/only-text-website2.png)

typekit.com
{: .desc-img}

웹 브라우저는 로컬 소프트웨어이므로 당연한 이야기이지만 로컬 환경의 리소스만 사용 가능하다. 폰트는 로컬 환경에 존재하는 리소스의 하나로 로컬 환경에 있지 않은 폰트는 사용할 수 없다.

웹페이지는 불특정 사용자를 위해 제작되기 때문에 어떤 디바이스의 어떤 OS를 사용하는 사용자가 웹페이지에 접근할 지 알 수 없다. 웹페이지를 구성하는 html, css, javascript 파일이 사용자의 요청에 의해 서버에서 클라이언트로 다운로드되어 실행되는 것과 같이 폰트 또한 서버에서 클라이언트로 다운로드되어 실행될 수 있다면 이 문제는 해결될 수 있다.

이러한 문제를 해결할 수 있는 방법이 바로 웹폰트이다. 웹폰트는 사용자가 웹페이지를 요청한 순간 CSS에 기술된 필요 폰트가 서버에서 클라이언트로 전송된다. 좀 더 구체적으로 말하면 매번 다운로드되는 것은 아니고 클라이언트에 해당 폰트가 존재하지 않을 경우 전송된다.

## CDN(Content Delivery Network) 링크 방식

웹폰트를 사용하는 방법 중 가장 간단한 방법은 CDN 링크를 사용하는 것이다. 다음은 구글에서 제공하는 웹폰트를 사용하는 방법이다.

[Google Font](https://www.google.com/fonts) 에서 사용하고자 하는 웹폰트를 선택한다. 한글 웹페이지에 자주 사용되는 나눔고딕은 [Google Font Early Access](https://www.google.com/fonts/earlyaccess) 에서 찾을 수 있다. 아래 구문을 CSS 파일에 추가한다.

```css
@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);

* { font-family: 'Nanum Gothic', sans-serif; }
```

@import rule의 url 함수는 서버에서 혹은 지정된 url에서 파일을 찾아 다운로드한다.

## 서버 폰트 로딩 방식

Google Font를 사용하기 위해 CDN 링크를 사용하는 방법은 간편한 방법이지만 로딩 속도가 느린 단점이 있다. 여러개의 폰트를 사용한다면 로딩에 더욱 시간이 걸릴 것이다. 또한 CDN 링크를 제공하지 폰트는 사용할 방법이 없다. 이러한 단점을 보완한 방법이 서버 폰트 로딩 방식이다.

@font-face 규칙으로 폰트를 등록하고 font-family 속성으로 폰트를 선택하여 사용할 수 있다.

```css
/*IE 9~ & all browsers*/
@font-face {
  font-family: myFontName;
  src: url("myFont.woff");
}

* { font-family: myFontName, sans-serif; }
```

폰트 파일을 서버에 두고 요청이 오면 클라이언트로 전송하는 방식이다. 하지만 문제는 여전히 존재한다. 브라우저에 따라 지원하는 폰트 파일 형식이 다르다는 문제가 있다.

|        | EOT | WOFF| SVG | OTF/TTF
|:-------|:---:|:---:|:---:|:---:|
| IE 6~8 | O   | X   | X   | X
| IE 9+  | O   | O   | X   | X
| Firefox| X   | O   | X   | O
| Safari | X   | O   | O   | O
| Chrome | X   | O   | O   | O
| Opera  | X   | O   | O   | O

아래 코드는 일반적으로 사용되는 검증된 웹폰트 사용 방법이다. 브라우저에 따라 필요한 폰트만을 다운로드할 수 있다.

```css
@font-face {
  font-family:"Nanum Gothic";
  src:url("NanumGothic.eot"); /*IE 9 호환성 보기 모드 대응*/
  src:local("☺"),             /*local font 사용 방지. 생략 가능*/
      url("NanumGothic.eot?#iefix") format('embedded-opentype'), /*IE 6~8*/
      url("NanumGothic.woff") format('woff'); /*표준 브라우저*/
}

* { font-family: "Nanum Gothic", sans-serif; }
```

영문과 한글을 혼용하는 경우 먼저 영문 폰트, 그 다음 한글 폰트를 지정하여야 한다. 한글 폰트부터 지정하면 영문에도 한글 폰트가 지정된다.

```
font-family: 'Lora', 'KoPub Batang', 'Times New Roman', serif;
```

# Reference

* [Google Fonts](https://fonts.google.com/)
