---
layout: post
title: JavaScript Questions - if
subtitle: if문 연습 문제
categories: javascript
section: javascript
---

* TOC
{:toc}

# 1. 시험 점수를 입력받아 90 ~ 100점은 A, 80 ~ 89점은 B, 70 ~ 79점은 C, 60 ~ 69점은 D, 나머지 점수는 F를 출력하는 프로그램을 작성하시오.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>학점 계산기</title>
</head>
<body>
  <p>시험 점수를 입력받아 90 ~ 100점은 A, 80 ~ 89점은 B, 70 ~ 79점은 C, 60 ~ 69점은 D, 나머지 점수는 F를 출력하는 프로그램을 작성하시오.</p>

  <input type="text" id="score" placeholder="시험 점수를 입력하세요">
  <button id="calc">학점 계산</button>
  <p id="result"></p>

  <script>
    function calcGrade(score) {
      // eslint-disable-next-line
      if (isNaN(+score)) {
        return '시험 점수는 숫자로 입력하세요';
      }

      if (score > 100) {
        return '시험 점수는 100 이하의 숫자로 입력하세요';
      }

      if (score < 0) {
        return '시험 점수는 0 이상의 숫자로 입력하세요';
      }

      var result;
      if (score >= 90) {
        result = 'A';
      } else if (score >= 80 && score <= 89) {
        result = 'B';
      } else if (score >= 70 && score <= 79) {
        result = 'C';
      } else if (score >= 60 && score <= 69) {
        result = 'D';
      } else {
        result = 'F';
      }
      return result;
    }

    document.getElementById('calc').addEventListener('click', function () {
      document.getElementById('result').innerHTML = '';

      var score = document.getElementById('score').value;
      var result = calcGrade(score);

      document.getElementById('result').innerHTML = result;
    });
  </script>
</body>
</html>
```
