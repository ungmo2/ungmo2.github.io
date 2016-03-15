---
layout: post
title: Responsive Web Design
categories: css
---

* TOC
{:toc}

[앞에서](http://ungmo2.github.io/css/CSS3-Layout/) 살펴본 예제에는 사실 몇가지 문제가 숨겨져 있다. 그 문제를 해결할 열쇠는 바로 Responsive Web Design이다.

먼저 어떤 문제가 있는지 알아본다.

화면폭을 좁히면 아래 그림과 같이 화면이 망가지는데 이것는 HTML 요소에 고정폭을 지정하여 가로 스크롤을 발생시키지 않으면 해결이 어렵다.

![](/img/break-view.png)
{: style="max-width:500px; margin: 0 auto;"}

그리고 모바일과 같이 작은 해상도의 디바이스에서 접근했을 때 화면이 너무 작아져 가시성에 문제가 발생한다.

![](/img/mobile-view.jpg)
{: style="max-width:500px; margin: 0 auto;"}

# 1. Responsive Web Design

사용자가 어떤 디바이스로 웹사이트를 방문할 지 알 수 없다. layout은 방문자의 모니터의 화면 해상도를 고려하여야 한다. 가로폭이 너무 큰 layout을 작성하면 작은 해상도 모니터로 방문하였을 때 가로 스크롤이 생겨서 사용이 불편할 수도 있다.

또한 스마트폰이나 태블릿 등 모바일 기기는 화면이 작기 때문에 가독성에 더욱 신경써야 한다. 보통 웹사이트가 축소되어 가로 스크롤 없이 컨텐츠를 볼 수 있으나 글자가 너무 작아지기 때문이다.

이러한 문제를 해결하는 방법 중의 하나가 반응형 웹디자인(Responsive Web Design)이다. 화면 해상도에 따라 가로폭이나 배치를 변경하여 가독성을 높이는 것이다.

![Responsive_Web_Design_for_Desktop_Notebook_Tablet_and_Mobile_Phone](/img/Responsive_Web_Design_for_Desktop_Notebook_Tablet_and_Mobile_Phone.png)

또한 모바일 웹페이지는 대부분 애플리케이션의 형태로 진화하고 있어 앱인지 웹인지 구분이 어려울 정도이다. HTML5/CSS3/Javascript만으로 네이티브 앱과 차이를 느낄 수 없는 앱을 만들 수 있다. 다음은 최근 관심을 끌고 있는 Web App Framework이다.

- [ionic](http://ionicframework.com/)
- [Electron](http://electron.atom.io/)
- [PhoneGap](http://phonegap.com/)
- [Sencha Touch](https://www.sencha.com/)

## 1.1 viewport meta tag

viewport란 웹페이지의 가시영역을 의미한다. viewport는 디바이스에 따라 차이가 있다. 예를 들어 모바일 브라우저는 윈도우 resize가 불가하고 화면 터치를 사용하는 등 데스크탑 브라우저와 구성이나 형태가 다르다. 또한 모바일의 화면은 데스크탑 화면보다 훨씬 작으므로 데스크탑용 웹페이지를 그대로 모바일에 출력하면 가독성이 현저히 나빠진다. 따라서 viewport를 이용하여 디바이스의 특성과 디바이스의 화면 크기 등을 고려하여 각종 디바이스 사용자에게 최적화된 웹페이지를 제공할 수 있다.

![viewport](/img/viewport.png)

[meta tag](http://ungmo2.github.io/html/HTML5-Tag/#meta)는 브라우저 혹은 검색엔진최적화(SEO)를 위해 검색엔진에게 메타데이터를 전달하기 위해 사용된다. viewport meta tag는 브라우저의 화면 설정과 관련된 정보를 제공한다.

| 속성	          | Description      | 사용예
|:---------------|:-----------------|:--------------
| width          | viewport 너비(px) | width=240
|                |                  | width=device-width
| height         | viewport 높이(px) | height=800
|                |                  | width=device-height
| initial-scale  | viewport초기 배율  | initial-scale=1.0
| user-scale     | 확대 축소 가능 여부  | user-scale=no
| maximum-scale  | viewport 최대 배율 | maximum-scale=2.0
| minimum-scale  | viewport 최소 배율 | minimum-scale=1.0

meta tag에서는 px단위를 사용하며 단위 표현은 생략한다. 복수개의 속성을 사용할 때는 쉼표(,)로 구분한다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

위 예제는 가장 일반적인 viewport 설정이다. 가로폭을 디바이스의 가로폭에 맞추고 초기 화면 배율을 100%로 설정하는 것을 의미한다.


## 2.2 @media 속성

반응형 웹디자인에 사용되는 핵심 기술은 `@media`이다.

## 2.2



# Less
# SASS


# 2. Bootstrap

부트스트랩의 장점 중 하나는 반응형 웹 디자인이 쉽게 만들어진다는 점이다


----->CSS3
## Transitions

## Animations

## Media Queries
----->CSS3

스프라이트 이미지 (sprite image)

페이지의 로딩 속도를 감소시켜주는 방법 중 하나이다. 자주 쓰는 이미지들을 쓸 때마다 각각 로딩하는 것이 아니라 하나의 이미지파일로 작성한 후 좌표값을 사용하여 필요한 이미지를 로딩하는 방식이다. 하나의 이미지로 만들기 때문에 관기가 쉽고 여러번 로딩할 필요가 없고 중복되는 이미지를 로딩하지 않기 때문에 트래픽이 감소되는 효과가 있다.





# Reference

* [w3schools.com](http://www.w3schools.com)

* [Learn to Code HTML & CSS](http://learn.shayhowe.com/)
