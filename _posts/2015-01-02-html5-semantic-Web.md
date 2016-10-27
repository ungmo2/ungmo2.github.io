---
layout: post
title: <strong>Semantic</strong> Web
subtitle: <strong>의미</strong>를 가지는 시맨틱 요소(Semantic element)와 검색 엔진
category: html
section: html
---

# 시맨틱 웹(Semantic Web)

2016년 현재 전세계적으로 웹사이트는 10억개, 인터넷 사용자 수는 33억명이다.

![Total number of Websites](/img/Total-number-of-Websites.png)

[인터넷 라이브 스탯](http://www.internetlivestats.com/)
{: .desc-img}

대부분의 인터넷 사용자는 원하는 정보를 취득하기 위해 Goole이나 Naver와 같은 검색사이트를 이용한다. "나는 검색된다. 고로 존재한다"는 말이 있을 정도로 웹사이트는 검색엔진에의 노출이 매우 중요하다. 당연한 것이 검색엔진에 노출되지 않는 웹사이트에는 접속하는 이도 없기 때문이다. 검색엔진은 이 시대의 가장 강력한 권력 중의 하나라고 말할 수도 있겠다.

SEO(검색엔진 최적화: Search Engine Optimization)같은 마케팅 도구를 사용하여 검색엔진이 본인의 웹사이트를 검색하기 알맞은 구조로 웹사이트를 조정하기도 하는데, 이것은 기본적으로 검색엔진이 웹사이트 정보를 어떻게 수집하는지 아는 것으로 부터 시작된다.

검색엔진은 로봇(Robot)이라는 프로그램을 이용해 매일 전세계의 웹사이트 정보를 수집한다.(이것을 <strong>크롤링</strong>이라 하며 검색엔진의 크롤러가 이를 수행한다.) 그리고 검색 사이트 이용자가 검색할 만한 키워드를 미리 예상하여 검색 키워드에 대응하는 인덱스(색인)을 만들어 둔다.(이것을 <strong>인덱싱</strong>이라 하며 검색엔진의 인덱서가 이를 수행한다.)

인덱스를 생성할 때 사용되는 정보는 검색 로봇이 수집한 정보인데 결국 웹사이트의 HTML 코드이다. 즉 HTML 코드 만으로 프로그램이 그 의미를 인지하여야 하는데 그 방법은 바로 <strong>시맨틱 요소(Semantic element)</strong>를 해석하는 것이다.

HTML으로 작성된 문서는 컴퓨터가 해석할 수 있는 메타데이터와 사람이 사용하는 자연어 문장이 뒤섞여 있다. 아래 코드를 보면 1행과 2행은 브라우저에서 동일한 외형을 갖는다. 이는 h1 태그의 디폴트 스타일이 1행과 같기 때문이다.

```html
<font size="6"><b>This is the page title</b></font>
<h1>This is a heading</h1>
```

<p class="result"></p>

그러나 1행의 tag는 의미론적으로 어떤 의미도 가지고 있지 않고 폰트 크기와 볼드체를 지정하는 메타데이터일 뿐이다. 그러나 2행은 header 중 가장 상위 레벨이라는 의미를 내포하고 있다.

검색엔진은 대체로 h1 tag 내의 컨텐츠를 웹문서의 중요한 제목으로 인식하고 인덱스에 포함시킬 확률이 높다. 또한 사람도 h1 tag 내의 컨텐츠가 제목임을 인식할 수 있다.

시맨틱 요소로 구성되어 있는 웹페이지는 검색엔진에 보다 의미론적으로 문서 정보를 전달할 수 있고 검색엔진 또한 시맨틱 요소를 이용하여 보다 효과적인 크롤링과 인덱싱이 가능하게 되었다.

즉, 시맨틱 태그란 브라우저, 검색엔진, 개발자 모두에게 태그의 의미를 명확히 설명하는 역할을 한다.

HTML 요소는 non-semantic element, semantic element로 구분할 수 있다.

non-semantic element
: div, span 등이 있으며 이들 태그는 content에 대하여 어떤 설명도 하지 않는다.

semantic element
: form, table, img 등이 있으며 이들 태그는 content의 의미를 명확히 설명한다,

다음은 HTML5에서 새롭게 추가된 시맨틱 태그이다.

| tag      | Description |
|:-------- |:------------|
| header   | 헤더를 의미한다
| nav      | 네비게이션을 의미한다
| aside    | 사이드에 위치하는 공간을 의미한다
| section  | 본문의 여러 내용(article)을 포함하는 공간을 의미한다
| article  | 분문의 주내용이 들어가는 공간을 의미한다
| footer   | 푸터를 의미한다

![HTML5 semantic elements](/img/building-structure.png)

HTML Semantic element
{: .desc-img}

# Reference

[Wikipedia: 시맨틱 웹](https://ko.wikipedia.org/wiki/%EC%8B%9C%EB%A7%A8%ED%8B%B1_%EC%9B%B9)
