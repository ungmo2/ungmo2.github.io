---
layout: post
title: <strong>Select box UI</strong>
subtitle: 셀렉트 박스 UI
categories: javascript
section: javascript
seq: 5
subseq: 40
description: 셀렉트 박스 UI는 HTML의 select를 커스텀하여 리모트 데이터 또는 배열을 지원하도록 구현한 것이다. 구현할 Range silider UI의 이미지는 아래와 같다.
---

* TOC
{:toc}

# 1. 셀렉트 박스 UI

셀렉트 박스 UI는 HTML의 select를 커스텀하여 리모트 데이터 또는 배열을 지원하도록 구현한 것이다. 구현할 Range silider UI의 이미지는 아래와 같다.

![select-box-ui](/img/select-box-ui.gif)
Select box UI
{:.desc-img}

이 기능에 대한 요구 사항은 아래와 같다.

1. 배열 또는 리모트 데이터 취득을 위한 프로미스를 생성하여 전달하면 셀렉트 박스 UI를 생성하도록 한다.
2. 셀렉트 박스 UI의 입력창에 포커스가 들어오면 데이터 리스트를 표시하고 리스트에서 데이터를 클릭하면 해당 데이터를 선택해 입력창에 표시하고 데이터 리스트를 감춘다.
3. 셀렉트 박스 UI의 외부를 클릭하면 표시중인 데이터 리스트를 감춘다.
4. 하나 이상의 셀렉트 박스 UI를 지원하도록 한다.
5. 라이브러리를 사용하지 않고 Vanilla javascript로 구현한다.

# 2. 배열을 사용하여 셀렉트 박스 UI 구현하기

먼저 배열을 사용하여 셀렉트 박스 UI 구현해보자. 1910년부터 2030년까지의 년도를 배열로 생성하여 셀렉트 박스 UI 컴포넌트의 옵션으로 전달한다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Select box</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Open Sans';
      font-weight: 300;
      background-color: #d6e1e5;
    }

    .title {
      color: #db5b33;
      font-weight: 300;
      text-align: center;
    }

    .select-box {
      position: relative;
      width: 170px;
    }

    .select-box input[type=text] {
      width: 100%;
      height: 30px;
      font-size: 14px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.5;
      padding: 3px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
    }

    .select-box.show input[type=text] {
      border-radius: 4px 4px 0 0;
    }

    .select-box ul {
      position: absolute;
      top: 30px;
      width: 170px;
      max-height: 170px;
      padding: 0;
      margin: 0;
      border: 1px solid #ced4da;
      border-top: none;
      border-radius: 0 0 4px 4px;
      overflow-y: scroll;
      display: none;
    }

    .select-box.show ul {
      display: block;
    }

    .select-box ul li {
      font-size: 14px;
      list-style: none;
      background: #fff;
      padding: 3px;
      cursor: pointer;
    }

    .select-box .selected {
      background: #5897fb;
      color: #fff;
    }
  </style>
</head>
<body>
  <h2 class="title">Select box</h2>
  <div id="select-box-birth-year"></div>

  <p>selected item: <span class="selected-item"></span></p>
  <script>
    class SelectBox {
      constructor(config) {
        this.config = config;

        this.$selectBox = document.querySelector(this.config.selector);
        this.$selectBox.classList.add('select-box');

        // select-box 생성
        // 옵션으로 전달받은 배열을 사용하여 셀렉트 박스를 생성한다.
        this.render();

        this.$input = this.$selectBox.querySelector('input[type=text]');
        this.$ul = this.$selectBox.querySelector('ul');
        this.$item = document.querySelector('.selected-item');

        this.$input.onfocus = this.show.bind(this);

        this.$ul.onmouseover = function (e) {
          if (e.target.nodeName !== 'LI') return;
          [...this.childNodes].forEach(el => (el.nodeName === 'LI' ? el.classList.remove('selected') : ''));
          e.target.classList.add('selected');
        };

        this.$ul.onclick = function (e) {
          if (e.target.nodeName !== 'LI') return;
          this.setValue(e.target.textContent);
          this.renderValue(e.target.textContent);
          this.hide();
        }.bind(this);

        document.onclick = function (e) {
          // 이벤트를 발생시킨 요소가 $selectBox 요소의 자식이 아니면 list를 닫는다
          if (!this.$selectBox.contains(e.target)) this.hide();
        }.bind(this);
      }

      // 옵션으로 전달받은 배열을 사용하여 셀렉트 박스를 렌더링한다.
      render() {
        const { data } = this.config;
        const html = `
          <input type="text" readonly placeholder="${this.config.placehoder}">
          <ul class="${this.visible ? 'show' : ''}">
            ${data.map(v => `<li>${v}</li>`).join('')}
          </ul>`;

        this.$selectBox.innerHTML = html;
      }

      show() {
        this.$selectBox.classList.add('show');
      }

      hide() {
        this.$selectBox.classList.remove('show');
      }

      setValue(val) {
        this.$input.value = val;
      }

      renderValue(val) {
        this.$item.textContent = val;
      }
    }

    // 생년 배열을 생성
    function range(from, to) {
      return new Array(to - from + 1).fill('').map((e, i) => (i + from) + '');
    }

    const selectBox = new SelectBox({
      selector: '#select-box-birth-year',
      placehoder: 'Select your Birth year',
      data: range(1910, 2030) // Array
    });
  </script>
</body>
</html>
```

<div class="result" style="height: 400px"></div>

# 3. 리모트 데이터를 취득하여 셀렉트 박스 UI 구현하기

이번에는 리모트 데이터를 취득하여 셀렉트 박스 UI 구현해보자. GitHub API를 사용하여 Github Repo 데이터를 리모트 취득해 필요한 데이터만을 필터링한 프로미스를 생성하여 셀렉트 박스 UI 컴포넌트의 옵션으로 전달한다.

```bash
$ curl -X GET https://api.github.com/users/ungmo2/repos
```

하나 이상의 셀렉트 박스 UI를 지원해야 하는 요구 사항이 있으므로 배열을 사용하여 구현한 셀렉트 박스 UI와 함께 화면에 표시하도록 하자.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Select box</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Open Sans';
      font-weight: 300;
      background-color: #d6e1e5;
    }

    .title {
      color: #db5b33;
      font-weight: 300;
      text-align: center;
    }

    .select-box {
      position: relative;
      width: 170px;
    }

    .select-box input[type=text] {
      width: 100%;
      height: 30px;
      font-size: 14px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.5;
      padding: 3px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
    }

    .select-box.show input[type=text] {
      border-radius: 4px 4px 0 0;
    }

    .select-box ul {
      position: absolute;
      top: 30px;
      width: 170px;
      max-height: 170px;
      padding: 0;
      margin: 0;
      border: 1px solid #ced4da;
      border-top: none;
      border-radius: 0 0 4px 4px;
      overflow-y: scroll;
      display: none;
    }

    .select-box.show ul {
      display: block;
    }

    .select-box ul li {
      font-size: 14px;
      list-style: none;
      background: #fff;
      padding: 3px;
      cursor: pointer;
    }

    .select-box .selected {
      background: #5897fb;
      color: #fff;
    }

    .container {
      display: flex;
    }

    .container > * {
      margin-right: 100px;
    }
  </style>
</head>
<body>
  <h2 class="title">Select box</h2>
  <div class="container">
    <div id="select-box-birth-year"></div>
    <div id="select-box-github-repo"></div>
  </div>

  <p>selected item: <span class="selected-item"></span></p>
  <script>
    class SelectBox {
      constructor(config) {
        this.config = config;

        this.$selectBox = document.querySelector(this.config.selector);
        this.$selectBox.classList.add('select-box');

        // select-box 생성
        // 옵션으로 전달받은 프로미스 또는 배열을 사용하여 셀렉트 박스의 리스트를 생성할 때 사용할 데이터를 결정한다.
        this.getData().then(data => {
          // 옵션으로 전달받은 프로미스 또는 배열을 사용하여 셀렉트 박스를 렌더링한다.
          this.render(data);

          this.$input = this.$selectBox.querySelector('input[type=text]');
          this.$ul = this.$selectBox.querySelector('ul');
          this.$item = document.querySelector('.selected-item');

          this.$input.onfocus = this.show.bind(this);

          this.$ul.onmouseover = function (e) {
            if (e.target.nodeName !== 'LI') return;
            [...this.childNodes].forEach(el => (el.nodeName === 'LI' ? el.classList.remove('selected') : ''));
            e.target.classList.add('selected');
          };

          this.$ul.onclick = function (e) {
            if (e.target.nodeName !== 'LI') return;
            this.setValue(e.target.textContent);
            this.renderValue(e.target.textContent);
            this.hide();
          }.bind(this);

          // 이벤트 핸들러 프로퍼티에는 하나의 이벤트 핸들러만을 바인딩할 수 있다.
          // addEventListener 함수 방식은 하나의 이벤트에 대해 하나 이상의 이벤트 핸들러를 추가할 수 있다.
          document.addEventListener('click', function (e) {
            // 이벤트를 발생시킨 요소가 $selectBox 요소의 자식이 아니면 list를 닫는다
            if (!this.$selectBox.contains(e.target)) this.hide();
          }.bind(this));
        }).catch(error => console.log(error));
      }

      // 옵션으로 전달받은 프로미스 또는 배열을 사용하여 셀렉트 박스의 리스트를 생성할 때 사용할 데이터를 결정한다.
      getData() {
        return new Promise((resolve, reject) => {
          const { data, promise } = this.config;

          if (!data && !promise) reject(new Error('No data!'));

          if (promise) {
            promise.then(res => resolve(res));
          } else {
            resolve(data);
          }
        });
      }

      // 옵션으로 전달받은 프로미스 또는 배열을 사용하여 셀렉트 박스를 렌더링한다.
      render(data) {
        const html = `
          <input type="text" readonly placeholder="${this.config.placeholder}">
          <ul class="${this.visible ? 'show' : ''}">
            ${data.map(v => `<li>${v}</li>`).join('')}
          </ul>`;

        this.$selectBox.innerHTML = html;
      }

      show() {
        this.$selectBox.classList.add('show');
      }

      hide() {
        this.$selectBox.classList.remove('show');
      }

      setValue(val) {
        this.$input.value = val;
      }

      renderValue(val) {
        this.$item.textContent = val;
      }
    }

    // 생년 배열을 생성
    function range(from, to) {
      return new Array(to - from + 1).fill('').map((e, i) => (i + from) + '');
    }

    // GitHub API를 사용하여 Github Repo 데이터를 리모트 취득
    function getGithubRepo() {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/users/ungmo2/repos');
        xhr.send();

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;

          if (xhr.status === 200) { // 정상 응답
            resolve(JSON.parse(xhr.response).map(res => res.name));
          } else { // 비정상 응답
            reject(new Error(xhr.status));
          }
        };
      });
    }

    const selectBoxBirthYear = new SelectBox({
      selector: '#select-box-birth-year',
      placeholder: 'Select your Birth year',
      data: range(1910, 2030) // Array
    });

    const selectBoxGithubRepo = new SelectBox({
      selector: '#select-box-github-repo',
      placeholder: 'Select your Github Repo',
      promise: getGithubRepo() // Promise
    });

  </script>
</body>
</html>
```

<div class="result" style="height: 400px"></div>

# 4. Angular 셀렉트 박스 UI

바닐라 자바스크립트로 구현한 셀렉트 박스 UI를 이번에는 Angular로 구현해 보자.

<iframe src="https://stackblitz.com/edit/angular-select-box-ui?ctl=1&embed=1&hideNavigation=1&file=src/app/app.component.ts" frameborder="0" width="100%" height="700"></iframe>
