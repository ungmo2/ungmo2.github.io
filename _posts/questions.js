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

}

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
삼각형출력하기

printTriangle 메소드는 양의 정수 num을 매개변수로 입력받는다.
다음을 참고해 *(별)로 높이가 num인 삼각형을 문자열로 리턴하는 printTriangle 메소드를 완성하라
printTriangle이 return하는 String은 개행문자('\n')로 끝나야 한다.

높이가 3일때

*
**
***
높이가 5일때

*
**
***
****
*****

*/

function printTriangle(num) {

}

console.log( printTriangle(3) );

//답

function printTriangle(num) {
  var result = "";

  for (var i = 1; i <= num; i++) {
    for (var j = 1; j <= i; j++) {
      result += "*";
    }
    result += "\n";
  }

  return result;
}

function printTriangle(num) {
  var result = "";
  for (var i = 1; i <= num; i++) {
    result += Array(i + 1).join("*") + "\n";
  }
  return result;
}

console.log(printTriangle(3));
console.log(printTriangle(5));



/*
스트링을 숫자로 바꾸기

strToInt 메소드는 문자열 str을 매개변수로 받는다.
str을 숫자로 변환한 결과를 반환하도록 strToInt를 작성하라.
예를들어 str이 "1234"이면 1234를 반환하고, "-1234"이면 -1234를 반환한다.
str은 부호(+,-)와 숫자로만 구성되어 있고, 잘못된 값이 입력되는 경우는 없다.
*/

function strToInt(str){

}

console.log(strToInt("-1234"));

// 답

function strToInt(str){
  // return str * 1;
  // return Number(str);
  return parseInt(str);
}

function intToStr(int){
  return int.toString();
  // return int + "";
  // return String(int);
}
console.log(typeof strToInt("1234"));
console.log(strToInt("1234"));
console.log(strToInt("-1234"));

console.log(typeof intToStr(1234));
console.log(intToStr(1234));
console.log(intToStr(-1234));

/*
수박수박수박수박수박수?

waterMelon 함수는 정수 n을 매개변수로 입력받는다.
길이가 n이고, 수박수박수...와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하세요.

예를들어 n이 4이면 '수박수박'을 리턴하고 3이라면 '수박수'를 리턴하면 됩니다.
*/

function waterMelon(n){

}

console.log("n이 3인 경우: "+ waterMelon(3));
console.log("n이 4인 경우: "+ waterMelon(4));

// 답
function waterMelon(n){
  var result = "";

  for(var i = 0; i < n; i++){
    result += (i % 2 === 0) ? "수" : "박";
  }
  return result;
}

console.log("n이 3인 경우: "+ waterMelon(3));
console.log("n이 4인 경우: "+ waterMelon(4));

/*
findKim 함수는 String형 배열 seoul을 매개변수로 받는다.

seoul의 element중 "Kim"의 위치 x를 찾아, "김서방은 x에 있다"는 String을 반환하라.
seoul에 "Kim"은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없다.
*/

function findKim(seoul){
  var idx = 0;
  //함수를 완성하세요

  return "김서방은 " + idx + "에 있다";
}

console.log( findKim(["Queen", "Tod", "Kim"]));

// 답
function findKim(seoul) {
  var idx = 0;

  for (var i = 0; i < seoul.length; i++) {
    if (seoul[i] === "Kim") {
      idx = i;
      break;
    }
  }

  return "김서방은 " + idx + "에 있다";
}

function findKim(seoul) {
  var idx = 0;

  idx = seoul.indexOf("Kim");

  return "김서방은 " + idx + "에 있다";
}

console.log(findKim(["Queen", "Tod", "Kim"]));

/*
문자열 다루기 기본

alpha_string46함수는 문자열 s를 매개변수로 입력받는다.
s의 길이가 4혹은 6이고, 숫자로만 구성되있는지 확인해주는 함수를 완성하라.
예를들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴한다
*/

function alpha_string46(s){
  var result = true;
  // 함수를 완성하세요

  return result;
}

console.log( alpha_string46("a234") );

/*
문자열 내 p와 y의 개수

numPY함수는 대문자와 소문자가 섞여있는 문자열 s를 매개변수로 입력받습니다.
s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 리턴하도록 함수를 완성하세요. 'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다.
예를들어 s가 "pPoooyY"면 True를 리턴하고 "Pyy"라면 False를 리턴합니다.
*/

function numPY(s){
  var result = true;
  //함수를 완성하세요

  return result;
}

console.log( numPY("pPoooyY") )
console.log( numPY("Pyy") )
