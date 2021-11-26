---
layout: post
title: <strong>Form validation</strong>
categories: ex-ui-component
section: ex-ui-component
seq: 13
permalink: /:categories/:title
description:
---

# Form validation

사용자가 입력한 폼 필드 데이터의 유효성 검증을 실행하는 로그인/회원가입 폼을 구현해보자.

# 1. 로그인

## 1.1. 뷰

다음 그림을 참고해서 로그인 뷰를 구현한다.

![login form](/assets/fs-images/exercise/form-validation-1.gif)
{: .w-700}

login form
{: .desc-img}

요구 사항은 다음과 같다.

1. 아이디 입력 필드(#signin-userid)에는 이메일, 패스워드 입력 필드(#signin-password)에는 영문 또는 숫자를 6~12자를 입력해야 한다.
2. 입력 필드에 적절한 형식의 값이 입력되지 않으면 해당 입력 필드에 유효성 검증 실패를 알리는 아이콘을 출력하고 해당 입력 필드 하단에 에러 메시지를 출력한다.
3. 입력 필드에 적절한 형식의 값이 입력되면 해당 입력 필드에 유효성 검증 성공을 알리는 아이콘을 출력하고 해당 입력 필드 하단에 에러 메시지를 제거한다.
4. submit 버튼은 모든 입력 필드에 적절한 형식의 값이 입력되었을 때만 활성화한다.
5. submit 버튼을 클릭하면 로그인이 성공된 것으로 간주한다. 이때 모든 입력 필드의 값을 콘솔에 출력하고 Toaster UI를 사용해 로그인 성공을 사용자에게 알린다.
6. ESM 모듈을 적극적으로 사용하여 소스 코드를 기능별로 분리한다.
7. **최대한 중복없이 가독성 좋게 구현한다.**

기본 템플릿은 다음과 같다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Form validation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;900&display=swap"
      rel="stylesheet"
    />
    <link href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/toaster.css" rel="stylesheet" />
    <script type="module" defer src="js/signin.js"></script>
  </head>
  <body>
    <form class="form signin" novalidate>
      <div class="title">SIGN IN</div>
      <div class="input-container">
        <input type="text" id="signin-userid" name="userid" required autocomplete="off" />
        <label for="signin-userid">email</label>
        <span class="bar"></span>
        <i class="icon icon-success bx bxs-check-circle hidden"></i>
        <i class="icon icon-error bx bxs-x-circle hidden"></i>
        <div class="error"></div>
      </div>
      <div class="input-container">
        <input type="password" id="signin-password" name="password" required autocomplete="off" />
        <label for="signin-password">Password</label>
        <span class="bar"></span>
        <i class="icon icon-success bx bxs-check-circle hidden"></i>
        <i class="icon icon-error bx bxs-x-circle hidden"></i>
        <div class="error"></div>
      </div>
      <button class="signin button" disabled>SIGN IN</button>
    </form>
    <!-- local SVG sprite -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
      <symbol id="success" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </symbol>
      <symbol id="error" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </symbol>
      <symbol id="warning" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        />
      </symbol>
    </svg>
  </body>
</html>
```

- style.css

```css
:root {
  --background-color: #fff;
  --main-color: #6002ee;
  --label-color: #0000008a;
  --font-color: #000000de;
  --red: #ed2553;
  --blue: #2196f3;
  --green: #60bc79;
  --gray: #757575;
  --width: 380px;
  --transition-delay: 0.2s;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  background-image: url(../img/background.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.form {
  width: 100%;
  max-width: var(--width);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: var(--background-color);
  border-radius: 5px;
  padding: 50px 30px;
}

.title {
  position: relative;
  width: 100%;
  line-height: 40px;
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 2px;
  color: var(--main-color);
}

.title:before {
  content: '';
  width: 5px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -30px;
  background: var(--main-color);
}

.input-container {
  position: relative;
  margin-top: 55px;
}

.input-container label {
  font-size: 0.9rem;
  color: var(--label-color);
}

.input-container input {
  color: var(--font-color);
  width: 100%;
  height: 50px;
  border: none;
  background: transparent;
  outline: none;
  padding: 0.4rem;
}

/*
input 요소가 포거스 상태 또는 valid 상태이면 레이블을 input 요소 위에 위치시키고 크기를 줄인다.
input 요소에 require가 적용되어 있어서 값이 입력되어 있으면 valid 상태가 된다.
input 요소가 포거스 상태가 아닐 때 텍스트가 입력되지 있지 않으면 invalid 상태가 되어 레이블이 제자리로 복귀하고
텍스트가 입력되어 있으면 valid 상태가 되어 레이블이 제자리로 복귀하지 않는다.
*/
.input-container input:focus + label,
.input-container input:valid + label {
  top: -65%;
  font-size: 0.8rem;
}

.input-container input + label {
  position: absolute;
  top: 0;
  left: 0.4rem;
  line-height: 60px;
  cursor: pointer;
  transition: var(--transition-delay) ease;
}

.input-container .bar {
  position: absolute;
  left: 0;
  bottom: 0;
  background: var(--label-color);
  width: 100%;
  height: 1px;
}

.input-container .bar:before,
.input-container .bar:after {
  content: '';
  position: absolute;
  background: var(--main-color);
  width: 0;
  height: 2px;
  transition: var(--transition-delay) ease;
}

.input-container .bar:before {
  left: 50%;
}

.input-container .bar:after {
  right: 50%;
}

.input-container input:focus ~ .bar:before,
.input-container input:focus ~ .bar:after {
  width: 50%;
}

.input-container .icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 1rem;
  right: 0.4rem;
  font-size: 1.4rem;
  pointer-events: none;
}

.input-container .icon.icon-success {
  color: var(--blue);
  /* color: var(--green); */
}

.input-container .icon.icon-error {
  color: var(--red);
}

.input-container .error {
  position: absolute;
  top: 120%;
  left: 0.4rem;
  font-size: 0.8rem;
  color: var(--red);
}

.button {
  width: 100%;
  line-height: 64px;
  font-weight: 900;
  font-size: 1.2rem;
  margin: 65px 0 20px;
  border: 3px solid transparent;
  background-color: var(--main-color);
  color: #fff;
  cursor: pointer;
  outline: none;
}

.button:disabled {
  background-color: transparent;
  border: 3px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.2);
}

.hidden {
  display: none !important;
}
```

- toaster.css: [Toaster UI](/ex-ui-component/toaster)를 참고해 작성한다.

- [background.png](https://poiemaweb.com/assets/fs-images/exercise/background.png)

# 2. 로그인 & 회원가입

다음 그림을 참고해서 로그인과 회원가입 폼을 구현한다.

![login form](/assets/fs-images/exercise/form-validation-2.gif)
{: .w-700}

로그인과 회원가입 폼
{: .desc-img}

요구 사항은 다음과 같다.

1.  회원가입 폼의 아이디 입력 필드(#signup-userid)에는 이메일, 이름 입력 필드(#signup-name)에는 1자 이상의 문자, 패스워드 입력 필드(#signup-password)에는 6~12자의 영문 또는 숫자, 패스워드 확인 입력 필드(#signup-confirm-password)에는 패스워드 입력 필드에 입력된 값과 동일한 값을 입력해야 한다.
2. 로그인과 회원가입 폼은 대부분 비슷한 처리를 한다. **최대한 중복없이 가독성 좋게 구현한다.**

기본 템플릿은 다음과 같다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Form validation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;900&display=swap"
      rel="stylesheet"
    />
    <link href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/toaster.css" rel="stylesheet" />
    <script type="module" defer src="js/auth.js"></script>
  </head>
  <body>
    <form class="form signin" novalidate>
      <div class="title">SIGN IN</div>
      <div class="input-container">
        <input type="text" id="signin-userid" name="userid" required autocomplete="off" />
        <label for="signin-userid">email</label>
        <span class="bar"></span>
        <i class="icon icon-success bx bxs-check-circle hidden"></i>
        <i class="icon icon-error bx bxs-x-circle hidden"></i>
        <div class="error"></div>
      </div>
      <div class="input-container">
        <input type="password" id="signin-password" name="password" required autocomplete="off" />
        <label for="signin-password">Password</label>
        <span class="bar"></span>
        <i class="icon icon-success bx bxs-check-circle hidden"></i>
        <i class="icon icon-error bx bxs-x-circle hidden"></i>
        <div class="error"></div>
      </div>
      <button class="signin button" disabled>SIGN IN</button>
      <div class="link">Not a member? <a href="javascript:void(0);">Sign up now</a></div>
    </form>

    <form class="form signup hidden" novalidate>
      <div class="title">SIGN UP</div>
      <div class="input-container">
        <input type="text" id="signup-userid" name="userid" required autocomplete="off" />
        <label for="signup-userid">email</label>
        <span class="bar"></span>
        <i class="icon icon-success bx bxs-check-circle hidden"></i>
        <i class="icon icon-error bx bxs-x-circle hidden"></i>
        <div class="error"></div>
      </div>
      <div class="error-message"></div>
      <div class="input-container">
        <input type="text" id="signup-name" name="username" required autocomplete="off" />
        <label for="signup-name">Name</label>
        <span class="bar"></span>
        <i class="icon icon-success bx bxs-check-circle hidden"></i>
        <i class="icon icon-error bx bxs-x-circle hidden"></i>
        <div class="error"></div>
      </div>
      <div class="input-container">
        <input type="password" id="signup-password" name="password" required autocomplete="off" />
        <label for="signup-password">Password</label>
        <span class="bar"></span>
        <i class="icon icon-success bx bxs-check-circle hidden"></i>
        <i class="icon icon-error bx bxs-x-circle hidden"></i>
        <div class="error"></div>
      </div>
      <div class="input-container">
        <input
          type="password"
          id="signup-confirm-password"
          name="confirm-password"
          required
          autocomplete="off"
        />
        <label for="signup-confirm-password">Confirm Password</label>
        <span class="bar"></span>
        <i class="icon icon-success bx bxs-check-circle hidden"></i>
        <i class="icon icon-error bx bxs-x-circle hidden"></i>
        <div class="error"></div>
      </div>
      <button class="signup button" disabled>SIGN UP</button>
      <div class="link">Already a member? <a href="javascript:void(0);">Sign in</a></div>
    </form>
    <!-- local SVG sprite -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
      <symbol id="success" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </symbol>
      <symbol id="error" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </symbol>
      <symbol id="warning" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        />
      </symbol>
    </svg>
  </body>
</html>
```

- style.css

```css
:root {
  --background-color: #fff;
  --main-color: #6002ee;
  --label-color: #0000008a;
  --font-color: #000000de;
  --red: #ed2553;
  --blue: #2196f3;
  --green: #60bc79;
  --gray: #757575;
  --width: 380px;
  --transition-delay: 0.2s;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  background-image: url(../img/background.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.form {
  width: 100%;
  max-width: var(--width);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: var(--background-color);
  border-radius: 5px;
  padding: 50px 30px;
}

.title {
  position: relative;
  width: 100%;
  line-height: 40px;
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 2px;
  color: var(--main-color);
}

.title:before {
  content: '';
  width: 5px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -30px;
  background: var(--main-color);
}

.input-container {
  position: relative;
  margin-top: 55px;
}

.input-container label {
  font-size: 0.9rem;
  color: var(--label-color);
}

.input-container input {
  color: var(--font-color);
  width: 100%;
  height: 50px;
  border: none;
  background: transparent;
  outline: none;
  padding: 0.4rem;
}

/*
input 요소가 포거스 상태 또는 valid 상태이면 레이블을 input 요소 위에 위치시키고 크기를 줄인다.
input 요소에 require가 적용되어 있어서 값이 입력되어 있으면 valid 상태가 된다.
input 요소가 포거스 상태가 아닐 때 텍스트가 입력되지 있지 않으면 invalid 상태가 되어 레이블이 제자리로 복귀하고
텍스트가 입력되어 있으면 valid 상태가 되어 레이블이 제자리로 복귀하지 않는다.
*/
.input-container input:focus + label,
.input-container input:valid + label {
  top: -65%;
  font-size: 0.8rem;
}

.input-container input + label {
  position: absolute;
  top: 0;
  left: 0.4rem;
  line-height: 60px;
  cursor: pointer;
  transition: var(--transition-delay) ease;
}

.input-container .bar {
  position: absolute;
  left: 0;
  bottom: 0;
  background: var(--label-color);
  width: 100%;
  height: 1px;
}

.input-container .bar:before,
.input-container .bar:after {
  content: '';
  position: absolute;
  background: var(--main-color);
  width: 0;
  height: 2px;
  transition: var(--transition-delay) ease;
}

.input-container .bar:before {
  left: 50%;
}

.input-container .bar:after {
  right: 50%;
}

.input-container input:focus ~ .bar:before,
.input-container input:focus ~ .bar:after {
  width: 50%;
}

.input-container .icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 1rem;
  right: 0.4rem;
  font-size: 1.4rem;
  pointer-events: none;
}

.input-container .icon.icon-success {
  color: var(--blue);
}

.input-container .icon.icon-error {
  color: var(--red);
}

.input-container .error {
  position: absolute;
  top: 120%;
  left: 0.4rem;
  font-size: 0.8rem;
  color: var(--red);
}

.button {
  width: 100%;
  line-height: 64px;
  font-weight: 900;
  font-size: 1.2rem;
  margin: 65px 0 20px;
  border: 3px solid transparent;
  background-color: var(--main-color);
  color: #fff;
  cursor: pointer;
  outline: none;
}

.button:disabled {
  background-color: transparent;
  border: 3px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.2);
}

.link {
  margin: 10px 0 20px;
  color: var(--label-color);
  text-align: center;
  transition: var(--transition-delay) ease;
}

.link > a:hover {
  color: var(--main-color);
}

.hidden {
  display: none !important;
}
```
