---
layout: post
title: HTML5 Tag - Forms
subtitle: 인터랙티브한 웹페이지를 만드는 태그
category: html
section: html
---

* TOC
{:toc}

# 1. form

form 태그는 사용자가 입력한 데이터를 수집하기 위해 사용되며 input, textarea, button, select, checkbox, radio button, submit button 등의 <strong>입력 양식 태그를 포함</strong>할 수 있다.

```html
<form>
...
form elements (input, checkbox, radio button, submit button...)
...
</form>
```

| attribute   | Value       | Description |
| :---------: |:------------|:------------|
| action      | URL         | 입력 데이터(form data)가 전송될 URL 지정
| method      | get / post  | 입력 데이터(form data) 전달 방식 지정

```html
<!DOCTYPE html>
<html>
  <body>
    <form action="demo_form.php" method="get">
      First name: <input type="text" name="FirstName" value="Mickey"><br>
      Last name: <input type="text" name="LastName" value="Mouse"><br>
      <input type="submit" value="Submit">
    </form>
  </body>
</html>
```

<div class='result'>
<form method="get">
  First name: <input type="text" name="FirstName" value="Mickey"><br>
  Last name: <input type="text" name="LastName" value="Mouse"><br>
  <input type="submit" value="Submit">
</form>
</div>

submit button이 클릭되면 input 태그에 입력된 데이터가 form 태그의 method 속성에 지정된 방식으로 action 속성에 지정된 서버측의 처리 로직에 전달된다.

# 2.1 input

input 태그는 form 태그 중에서 가장 중요한 태그로 사용자로부터 데이터를 입력받기 위해 사용된다.

input 태그는 다양한 종류가 있는데 type 속성에 의해 구분된다. form 태그 내에 존재하여야 입력 데이터를 전송할 수 있으나 [ajax](./jquery-ajax-json/)를 사용할 시에는 form 태그 내에 존재하지 않아도 된다.

| type 속성값      | Description            | HTML5 추가 | IE | FF | CR | SF | OP |
| :------------- |:-----------------------|:---------:|:--:|:--:|:--:|:--:|:--:|
| button         | 버튼 생성                 |          | ◯  | ◯  | ◯  | ◯  | ◯  |
| checkbox       | checkbox 생성            |          | ◯  | ◯  | ◯  | ◯  | ◯  |
| color          | 컬러 선택 생성             | ◯         | X  | ◯  | ◯  | X  | ◯  |
| date           | date control (년월일) 생성 | ◯         | X  | X  | ◯  | ◯  | ◯  |
| datetime       | date & time control (년월일시분초) 생성. HTML spec에서 drop되었다. | ◯ | X  | X  | X  | X  | X  |   
| datetime-local | 지역 date & time control (년월일시분초) 생성 | ◯ | X  | X  | ◯  | ◯  | ◯  |   
| email          | 이메일 입력 form 생성. subumit 시 자동 검증한다. | ◯ | ◯(10~) | ◯  | ◯  | X  | ◯  |
| file           | 파일 선택 form 생성        |          |  ◯  | ◯  | ◯  | ◯  | ◯  |
| hidden         | 감추어진 입력 form 생성     |          | ◯  | ◯  | ◯  | ◯  | ◯  |
| image          | 이미지로 된 submit button 생성 |       | ◯  | ◯  | ◯  | ◯  | ◯  |
| month          | 월 선택 form 생성        | ◯          | X  | X  | ◯  | ◯  | ◯  |
| number         | 숫자 입력 form 생성       | ◯         | ◯(10~) | ◯  | ◯  | ◯  | ◯  |
| password       | password 입력 form 생성  |           |  ◯  | ◯  | ◯  | ◯  | ◯  |
| radio          | radio button 생성       |           |  ◯  | ◯  | ◯  | ◯  | ◯  |
| range          | 범위 선택 form 생성       | ◯         | ◯(10~) | ◯  | ◯  | ◯  | ◯  |
| reset          | 초기화 button 생성       |            |  ◯  | ◯  | ◯  | ◯  | ◯  |
| search         | 검색어 입력 form 생성      | ◯         |  X  | X  | ◯  | ◯  | X  |
| submit         | 제출 button 생성         |            |  ◯  | ◯  | ◯  | ◯  | ◯  |
| tel            | 전화번호 입력 form 생성    | ◯          |  X  | X  | X  | X  | X  |
| text           | 텍스트 입력 form  생성     |            |  ◯  | ◯  | ◯  | ◯  | ◯  |
| time           | 시간 선택 form 생성       | ◯           |  X  | X  | ◯  | ◯  | ◯  |
| url            | url 입력 form 생성       | ◯          | ◯(10~) | ◯  | ◯  | X  | ◯  |
| week           | 주 선택 입력 form 생성     | ◯          |  X  | X  | ◯  | ◯  | ◯  |


```html
<!DOCTYPE html>
<html>
  <body>
    <form action="" method="get">
      <h3>button</h3>
      <input type="button" value="Click me" onclick="alert('Hello world!')">
      <hr>

      <h3>checkbox</h3>
      <input type="checkbox" name="fruit1" value="apple"> 사과<br>
      <input type="checkbox" name="fruit2" value="grape"> 포도<br>
      <input type="checkbox" name="fruit3" value="peach"> 복숭아<br>
      <hr>

      <h3>color</h3>
      <input type="color" name="mycolor">
      <hr>

      <h3>date</h3>
      <input type="date" name="birthday">
      <hr>

      <h3>datetime</h3>
      <input type="datetime" name="birthdaytime">
      <hr>

      <h3>datetime-local</h3>
      <input type="datetime-local" name="birthdaytime">
      <hr>

      <h3>email</h3>
      <input type="email" name="useremail">
      <hr>

      <h3>file</h3>
      <input type="file" name="myfile">
      <hr>

      <h3>hidden</h3>
      <input type="hidden" name="country" value="Norway">
      hidden filed는 사용자에 표시되지 않는다.
      <hr>

      <h3>image</h3>
      <input type="image" src="img/img_submit.gif" alt="Submit" width="48" height="48">
      <hr>

      <h3>month</h3>
      <input type="month" name="birthdaymonth">
      <hr>

      <h3>number</h3>
      <input type="number" name="quantity" min="2" max="10" step="2" value="2">
      <hr>

      <h3>password</h3>
      <input type="password" name="pwd">
      <hr>

      <h3>radio</h3>
      <input type="radio" name="gender" value="male"> 남자<br>
      <input type="radio" name="gender" value="female"> 여자<br>
      <hr>

      <h3>range</h3>
      <input type="range" name="points" min="0" max="10" step="1" value="5">
      <hr>

      <h3>reset</h3>
      <input type="reset">
      <hr>

      <h3>search</h3>
      <input type="search" name="googlesearch">
      <hr>

      <h3>submit</h3>
      <input type="submit" value="Submit">
      <hr>

      <h3>tel</h3>
      <input type="tel" name="mytel">
      <hr>

      <h3>text</h3>
      <input type="text" name="myname">
      <hr>

      <h3>time</h3>
      <input type="time" name="mytime">
      <hr>

      <h3>url</h3>
      <input type="url" name="myurl">
      <hr>

      <h3>week</h3>
      <input type="week" name="week_year">
      <hr>
    </form>
  </body>
</html>
```

<div class='result'></div>

# 3. select

복수개의 리스트에서 복수개의 아이템을 선택할 때 사용한다. 함께 사용할 수 있는 태그는 다음과 같다.

| tag      | Description |
|:-------- |:------------|
| select   | select form 생성
| option   | option 생성
| optgroup | option을 그룹화한다

```html
<!DOCTYPE html>
<html>
  <body>
    <select name="cars1">
      <option value="volvo" selected>Volvo</option>
      <option value="saab" disabled>Saab</option>
      <option value="fiat">Fiat</option>
      <option value="audi">Audi</option>
    </select>

    <select name="cars2" multiple>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="fiat">Fiat</option>
      <option value="audi" selected>Audi</option>
    </select>

    <select name="cars3">
      <optgroup label="Swedish Cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
      </optgroup>
      <optgroup label="German Cars" disabled>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </optgroup>
    </select>
  </body>
</html>
```

<div class='result'></div>

# 4. textarea

textarea 태그는 여러 줄의 글자를 입력할 때 사용한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <form action="action_page.php">
      <textarea name="message" rows="10" cols="30">
      The cat was playing in the garden.
      </textarea>
      <br>
      <input type="submit">
    </form>
  </body>
</html>
```

<div class='result'></div>

# 5. button

button 태그는 클릭할 수 있는 버튼을 생성한다. `<input type="button">`과 유사하지만 input 태그는 빈 태그인 반면 button 태그는 그렇지 않다. 따라서 button 요소에는 텍스트나 이미지 같은 컨텐츠를 사용할 수 있다.

type 속성은 반드시 지정하는 것이 바람직하며 속성값으로 button, reset, submit를 지정할 수 있다.

form 내에서 button 요소를 사용할 경우, 브라우저에 따라 submit되는 값이 다를 수 있다. 따라서 form 내에서 버튼을 생성할 경우에는 input 태그를 사용하는 것이 바람직하다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button type="button" onclick="alert('Hello World!')">Click Me!</button>

    <input type="button" value="Click Me!" onclick="alert('Hello world!')">
  </body>
</html>
```

<div class='result'></div>

# 6. filedset / legend

fieldset 태그는 관련된 입력 양식들을 그룹화할 때 사용한다. legend 태그는 filedset 태그 내에서 사용되야 하며 그룹화된 filedset의 제목을 정의한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
      <fieldset>
        <legend>Login</legend>
        Username <input type="text" name="username">
        Password <input type="text" name="password">
      </fieldset>
  </body>
</html>
```

<div class='result'></div>

# Reference

* [HTML elements: form](https://www.w3.org/TR/html-markup/form.html)

* [HTML elements: input](https://www.w3.org/TR/html-markup/input.html)

* [HTML elements: select](https://www.w3.org/TR/html-markup/select.html)

* [HTML elements: textarea](https://www.w3.org/TR/html-markup/textarea.html)

* [HTML elements: button](https://www.w3.org/TR/html-markup/button.html)

* [HTML elements: legend](https://www.w3.org/TR/html-markup/legend.html)
