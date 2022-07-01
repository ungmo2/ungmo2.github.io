---
layout: post
title: Jekyll와 GitHub Pages를 사용한 <strong>Static WebSite</strong> 구축
categories: tools
section: tools
seq: 14
subseq: 2
description: Jekyll와 GitHub Pages를 사용한 Static WebSite 구축
---

* TOC
{:toc}

![jekyll Logo](/img/jekyll.png)

# 1. Introduction

[Jelyll](http://jekyllrb.com/)은 [markdown](https://daringfireball.net/projects/markdown/)으로 작성된 문서를 HTML로 변환하여 웹사이트를 구축할 수 있도록 돕는 Static Website generator로 Ruby로 작성되어 있다.

[GitHub Pages](https://pages.github.com/)는 GitHub에서 제공하는 Static Website로 GitHub repository에 리소스를 push하는 것 만으로 간단히 웹사이트를 만들 수 있다.

Static Website이므로 Database 등은 사용할 수 없으나 무료로 유지보수가 간편한 Website를 Hosting할 수 있다는 장점이 있다.

GitHub Pages는 HTML, CSS, Javascript만으로도 웹사이트를 구축할 수 있으나 markdown을 사용하여 웹사이트를 generate하기 위해 Jelyll을 지원한다.

로컬 환경에서 Jelyll을 사용하여 웹사이트를 작성/테스트하고 GitHub repository에 웹리소스를 push하면 매우 간단히 Website를 Hosting할 수 있는 구조이다.

# 2. Setup

MacOS에서의 Setup 방법을 설명한다.

## 2.1 GitHub Pages

**1. github.com에서 repository를 생성한다**

![Repository 생성](/img/user-repo.png)

**2. local에 repository를 clone한다**

terminal을 사용하는 경우

```bash
$ git clone https://github.com/username/username.github.io
```

[GitHub Desktop](https://central.github.com/mac/latest)을 사용하는 경우

![clone repository](/img/setup-in-desktop.png)

**3. index.html 생성**

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Hello World</h1>
  <p>I'm hosted with GitHub Pages.</p>
</body>
</html>
```

**4. Commit & sync**

terminal을 사용하는 경우

```bash
$ cd username.github.io
$ git add --all
$ git commit -m "Initial commit"
$ git push -u origin master
```

[GitHub Desktop](https://central.github.com/mac/latest)을 사용하는 경우

Commit to master 버튼을 클릭하여 GitHub에 commit 후, Sync 버튼을 클릭한다. Sync 버튼의 역할은 `git push`과 `git pull --rebase`을 동시에 실행하는 것이다.

![Commit & sync](/img/sync-mac.png)

**5. 동작 확인**

http://username.github.io에 접속하여 정상적으로 동작하는지 확인한다.

## 2.2 Install Ruby

GitHub Pages가 사용하는 ruby version은 2.1.7이다. 따라서 로컬 환경에도 ruby version 2.1.7을 install하는 것이 안전하다.

- [GitHub Pages Dependency versions](https://pages.github.com/versions/)

**1. [RVM(Ruby Version Manager)](https://rvm.io/)를 사용하여 Ruby 2.1.7을 설치한다.**

```bash
$ curl -sSL https://get.rvm.io | bash -s stable --ruby
```

**2. terminal을 재기동하고 ruby version 2.1.7을 install한다**

```bash
$ rvm install 2.1.7
$ rvm use 2.1.7 --default
$ ruby -v
ruby 2.1.7p400 (2015-08-18 revision 51632) [x86_64-darwin14.0]
```

## 2.3 Install Jekyll

Jekyll을 설치한다.

```bash
$ gem install jekyll bundler
$ jekyll -v
jekyll 3.2.1
```

# 3. Default Jekyll Site 생성

```bash
$ jekyll new username.github.io
$ cd username.github.io
$ bundle install
$ bundle exec jekyll serve
```

`new` command

지정한 디렉터리 내에 Jekyll의 기본 뼈대(scaffold)를 생성한다.

`serve` command

웹사이트를 build하고 개발용 서버를 기동하며 파일 변경을 watch한다. 웹리소스가 변경되면 서버를 재기동할 필요가 없으나 `_config.yml`이 변경되면 서버를 재기동하여야 한다.

서버가 기동되면 http://localhost:4000에 접속하여 동작을 확인한다.

# 4. Jekyll themes

- [Jekyll Themes](http://jekyllthemes.org/)

- [jekyllthemes.io](https://jekyllthemes.io/)

# Reference

- [Jekyll](https://jekyllrb.com/)

- [GitHub Pages](https://pages.github.com/)
