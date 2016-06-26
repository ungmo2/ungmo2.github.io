// 구글 입사문제
// 1부터 10,000까지 8이라는 숫자가 총 몇번 나오는가?
// 8이 포함되어 있는 숫자의 갯수를 카운팅 하는 것이 아니라 8이라는 숫자를 모두 카운팅 해야 한다.
// (※ 예를들어 8808은 3, 8888은 4로 카운팅 해야 함)

var str = '',
    sum = 0,
    i;

for(i = 0; i < 10001; i++) {
  str += i.toString();
}

// console.log(str);

for (i = 0; i < str.length; i++) {
  if(str.charAt(i) === '8') sum++;
}

console.log('Answer : ' + sum);


/*
배열 x = 1, 2, 3, 4 일때 x 중에서 짝수이고 3보다 큰 수의 배열을 구하는 함수를 작성하라
*/

var x = [1, 2, 3, 4];
var result = [];

for (var i = 0; i < x.length; i++) {
  if(x[i] % 2 === 0 && x[i] >= 3){
    result.push(x[i]);
  }
}

console.log(result);

/*
핸드폰번호 가리기

핸드폰 고지서에 표시할 전화번호는 개인정보 보호를 위해 맨 뒷자리 4자리를 제외한 나머지를 "*"으로 바꿔야 한다.
전화번호를 문자열 s로 입력받는 hide_numbers함수를 완성하라
예를들어 s가 "01033334444"면 "*******4444"를 리턴하고, "027778888"인 경우는 "*****8888"을 리턴한다.
*/

function hide_numbers(s){
  var result = "";
  //함수를 완성해주세요

  return result;
}

console.log("결과 : " + hide_numbers('01033334444'));

// 답1
function hide_numbers(s){
  var result = "";

  for (var i = 0; i < s.length; i++) {
    if(i < 7){
      result += "*";
    } else {
      result += s[i];
    }
  }
  return result;
}

console.log("결과 : " + hide_numbers('01033334444')); // *******4444

// 답2
function hide_numbers(s){
  return "*******" + s.substring(7);
}

console.log("결과 : " + hide_numbers('01033334444')); // *******4444


/*
평균구하기

함수를 완성하여 매개변수 list의 평균값을 return하도록 하라.
*/

function average(array){
  //함수를 완성하세요

  return 0;
}

var testArray = [5,3,4];
console.log("평균값 : " + average(testArray));

// 답1
function average(array){
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}

var testArray = [5,3,4];
console.log("평균값 : " + average(testArray));

// 답2
function average(array){
  var sum = array.reduce(function(total, num){
    return total + num;
  });
  return sum / array.length;
}

var testArray = [5,3,4];
console.log("평균값 : " + average(testArray));


/*
짝수와 홀수

evenOrOdd 메소드는 정수 num을 매개변수로 받는다.
num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하도록 evenOrOdd에 코드를 작성하라.
단 num은 0이상의 정수이며, num이 음수인 경우는 없다.
*/

function evenOrOdd(num) {
  var result = '';
  // 함수를 완성하세요
  return result;
}

console.log("결과 : " + evenOrOdd(2));
console.log("결과 : " + evenOrOdd(3));

// 답1
function evenOrOdd(num) {
  var result = "";

  if (num % 2) {
    result = "Odd";
  } else {
    result = "Even";
  }

  return result;
}

console.log("결과 : " + evenOrOdd(2));
console.log("결과 : " + evenOrOdd(3));

// 답2

function evenOrOdd(num) {
  return num % 2 ? "Odd" : "Even";
}

console.log("결과 : " + evenOrOdd(2));
console.log("결과 : " + evenOrOdd(3));

/*
정수제곱근 판별하기

nextSqaure함수는 정수 n을 매개변수로 받는다.
n이 임의의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 임의의 정수 x의 제곱이 아니라면 'no'을 리턴하는 함수를 작성하라.
예를들어 n이 121이라면 이는 정수 11의 제곱이므로 (11+1)의 제곱인 144를 리턴하고, 3이라면 'no'을 리턴하면 됩니다.
*/

function nextSqaure(n){
  var result = 0;
  //함수를 완성하세요

  return result;
}

console.log("결과 : " + nextSqaure(121));

// 답
function nextSqaure(n){
  // 제곱근이 정수(integer)임을 이용한다.
  // Math.sqrt는 제곱근을 반환한다
  // Math.sqrt(9); // 3
  // Math.sqrt(2); // 1.414213562373095
  // parseInt(1.414213562373095); // 1
  var root = Math.sqrt(n);
  // if((parseInt(root) - root) === 0){
  //   return (root + 1 ) * (root + 1);
  // } else{
  //   return "no";
  // }
  var result = parseInt(root) - root === 0 ? (root + 1 ) * (root + 1) : "no";
  return result;
}
console.log("결과 : " + nextSqaure(121));
console.log("결과 : " + nextSqaure(3));

// 답2
function nextSqaure(n){
  var root = Math.sqrt(n);
  // var result = Number.isInteger(root) ? (root + 1 ) * (root + 1) : "no";
  var result = Number.isInteger(root) ? Math.pow((root + 1), 2) : "no";
  return result;
}

console.log("결과 : " + nextSqaure(121));

/*
역삼각형 출력하기

printReversedTriangle 메소드는 양의 정수 num을 매개변수로 입력받습니다.
다음을 참고해 *(별)로 높이가 num인 삼각형을 문자열로 리턴하는 printReversedTriangle 메소드를 완성하세요

높이(num)가 3일때 다음과 같은 문자열을 리턴하면 됩니다.

***
**
*

*/

function printReversedTriangle(num) {
  var result = '';
  // 함수를 완성하세요

  return result;
}


// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log("결과 : " +'\n'+ printReversedTriangle(3));

// 답1
function printReversedTriangle(num) {
  var result = "";

  for (var i = num; i > 0; i--) {
    for (var j = i; j > 0; j--) {
      result += "*";
    }
    result += "\n";
  }

  return result;
}

console.log("결과 : " + '\n' + printReversedTriangle(3));

// 답2
function printReversedTriangle(num) {
  var result = "";

  while(num > 0) {
    for (var i = 0; i < num; i++){
      result += "*";
    }
    result += "\n";
    num--;
  }

  return result;
}

console.log("결과 : " + '\n' + printReversedTriangle(3));

/*
스트링을 숫자로 바꾸기

strToInt 메소드는 문자열 str을 매개변수로 받는다.
str을 숫자로 변환한 결과를 반환하도록 strToInt를 작성하라.
예를들어 str이 "1234"이면 1234를 반환하고, "-1234"이면 -1234를 반환한다.
str은 부호(+,-)와 숫자로만 구성되어 있고, 잘못된 값이 입력되는 경우는 없다.
*/

function strToInt(str){
  var result = 0;
  //함수를 완성하세요

  return result;
}

console.log(strToInt("-1234"));

/*
수박수박수박수박수박수?

water_melon함수는 정수 n을 매개변수로 입력받습니다.
길이가 n이고, 수박수박수...와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하세요.

예를들어 n이 4이면 '수박수박'을 리턴하고 3이라면 '수박수'를 리턴하면 됩니다.
*/

function waterMelon(n){
  var result = "";
  //함수를 완성하세요

  return result;
}

// 실행을 위한 테스트코드입니다.
console.log("n이 3인 경우: "+ waterMelon(3));
console.log("n이 4인 경우: "+ waterMelon(4));
