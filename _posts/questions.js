// Check Palindrom
function checkPalindrom(str) {
  return str == str.split('').reverse().join('');
}



/*
구글 입사문제
1부터 10,000까지 8이라는 숫자가 총 몇번 나오는가?
8이 포함되어 있는 숫자의 갯수를 카운팅 하는 것이 아니라 8이라는 숫자를 모두 카운팅 해야 한다.
(※ 예를들어 8808은 3, 8888은 4로 카운팅 해야 함)

hint
숫자를 문자열로 변환 : str = i.toString()
문자열 중 n번째에 있는 문자 : str.charAt(n) or str[n]
*/

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

evenOrOdd 함수는 정수 num을 매개변수로 받는다.
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

높이(num)가 3일때 다음과 같은 문자열을 리턴한다.

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
s의 길이가 4 혹은 6이고, 숫자로만 구성되어 있는지 확인하는 함수를 완성하라.
예를들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴한다
*/

function alpha_string46(s){

}

console.log( alpha_string46("a234") );

// 답
function alpha_string46(s) {
  var result = ((s.length === 4 || s.length === 6) && !isNaN(s)) ? true : false;
  return result;
}

// isNaN("a234") // true
// isNaN("1234") // false

// jQuery.isNumeric

console.log(alpha_string46("a234"));
console.log(alpha_string46("1234"));

/*
문자열 내 p와 y의 개수

numPY함수는 대문자와 소문자가 섞여있는 문자열 s를 매개변수로 입력받는다.
대소문자를 구별하지 않으며 s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True,
다르면 False를 리턴하도록 함수를 완성하라.
'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴한다.
예를들어 s가 "pPoooyY"면 True를 리턴하고 "Pyy"라면 False를 리턴한다.
*/

function numPY(s){
  var result = true;

  return result;
}

console.log( numPY("pPoooyY") );
console.log( numPY("Pyy") );

// 답

function numPY(s){
  var result = true;
  var cnt_p = 0, cnt_y = 0;

  var lowerCaseStr = s.toLowerCase();

  for (var i = 0; i < lowerCaseStr.length; i++) {
    if(lowerCaseStr[i] === 'p') {
      cnt_p++;
    } else if(lowerCaseStr[i] === 'y') {
      cnt_y++;
    }
  }

  if(cnt_p !== cnt_y) {
    result = false;
  }
  return result;
}

function numPY(s) {
  var lowerCaseStr = s.toLowerCase();
  return lowerCaseStr.match(/p/ig).length == lowerCaseStr.match(/y/ig).length;
}

function numPY(s) {
  return s.match(/(p|P)/ig).length == s.match(/(y|Y)/ig).length;
}

console.log( numPY("pPoooyY") );
console.log( numPY("Pyy") );

/*
약수의 합

어떤 수를 입력받아 그 수의 약수를 모두 더한 수를 구하는 sumDivisor 함수를 완성하라. 예를 들어 12가 입력된다면 12의 약수는 [1, 2, 3, 4, 6, 12]가 되고, 총 합은 28이 되므로 28을 반환한다.
*/
function sumDivisor(num) {
	var answer = 0;

	return answer;
}

console.log(sumDivisor(12));


// 답
// 약수(約數, divisor)는 어떤 수를 나누었을 때 나머지가 0인 수를 말하며, 배수 관계와 서로 반대되는 개념이다

function getDivisorArray(num) {
  var divisors = [];

  for (var i = 1; i <= num; i++) {
    if (num % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}

function sumDivisor(num) {
  var result = 0;
  var arr = getDivisorArray(num);
  for (var i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}

console.log(getDivisorArray(12));
console.log(sumDivisor(12));

/*
소수 찾기

numberOfPrime 메소드는 정수 n을 매개변수로 입력받는다.

1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하도록 numberOfPrime 함수를 완성하라.

소수는
소수(素數, prime number)는 양의 약수가 1과 자기 자신 뿐인 1보다 큰 자연수로 정의된다. 즉, 1과 자기 자신으로만 나누어지는 수를 의미한다.

2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, ...

예를 들어 10을 입력받았다면, 1부터 10 사이의 소수는 [2,3,5,7] 4개가 존재하므로 4를 반환한다.
*/

function numberOfPrime(n) {

}

console.log( numberOfPrime(10) ); // 4

// 답
//소수(素數, prime number)는 양의 약수가 1과 자기 자신 뿐인 1보다 큰 자연수로 정의된다.
function isPrime(n){

  if(n <= 1) return false;

  for (var i = 1, cnt = 0; i <= n; i++) {
    if(n % i === 0) cnt++;
    // console.log(n +" : "+i, cnt);
  }

  return cnt < 3 ? true : false;
}

// console.log(isPrime(1));
// console.log(isPrime(2));
// console.log(isPrime(3));
// console.log(isPrime(4));
// console.log(isPrime(5));
// console.log(isPrime(100));
// console.log(isPrime(101));
// console.log(isPrime(199));

function numberOfPrime(n) {
  for (var i = 1, cnt = 0; i <= n; i++) {
    if(isPrime(i)) cnt++;
  }
  return cnt;
}

console.log( numberOfPrime(10) );



/*
최대공약수와 최소공배수

두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환해주는 gcdlcm 함수를 완성하라. 배열의 맨 앞에 최대공약수, 그 다음 최소공배수를 넣어 반환한다. 예를 들어 gcdlcm(3,12) 가 입력되면, [3, 12]를 반환하라.
*/

function gcdlcm(a, b) {
  var answer = [];

  return answer;
}

console.log(gcdlcm(3,12));

/*
[최대공약수(最大公約數 greatest common divisor)](https://ko.wikipedia.org/wiki/%EC%B5%9C%EB%8C%80%EA%B3%B5%EC%95%BD%EC%88%98)란, 0이 아닌 두 정수나 다항식의 공통되는 약수 중에서 가장 큰 수를 말한다.

두 수 a와 b의 최대공약수를 구하는 방법은 소인수 분해를 사용하는 방법과 [유클리드 호제법](https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95)이 있다.

일반적으로 소인수 분해를 효율적으로 빠른 시간 내에 하는 방법은 알려져 있지 않다. 더 빠른 시간 안에 구하는 방법에는 호제법이 있다.

똑같이 두 수 192와 72의 최대공약수를 이번에는 호제법으로 구하여 보자. 일단 192을 72로 나누어 나머지를 구한다.

192 = 72 * 2 + 48이다. 이는 192을 72로 나누어 나온 나머지가 48라는 것을 의미한다. 이번에는 72을 나머지인 48로 나눈다.

72 = 48 * 1 + 24이다. 이와 같은 연산을 나머지가 0이 될 때까지 반복한다. 48 = 24 * 2 + 0 나머지가 0이 되었으므로 연산을 중지한다. 이때, 나머지가 0이 되기 바로 직전의 연산에서의 나머지가 원래 두 수의 최대공약수가 된다.

1071과 1029의 최대공약수를 구하면,

1071은 1029로 나누어 떨어지지 않기 때문에, 1071을 1029로 나눈 나머지를 구한다. => 42
1029는 42로 나누어 떨어지지 않기 때문에, 1029를 42로 나눈 나머지를 구한다. => 21
42는 21로 나누어 떨어진다.
따라서, 최대공약수는 21이다.
*/

function gcd(x, y) {
  if (!y) {   // y = 0이면 (나머지가 0이면)
    return x;
  }
  return gcd(y, x % y);
}

function gcd(x, y) {
  return !y ? x : gcd(y, x % y);
}

function gcd(x, y) {
  while (y) {       // y !== 0이면 (나머지가 0이 아니면 계속 반복)
		var z = x % y;  // 나머지
		x = y;
		y = z;
	}
	return x;
}

/*
최소공배수(最小公倍數 least common multiple)는 n개의 정수 또는 다항식에 대해 모두의 배수가 되는 최소의 자연수 또는 다항식을 말한다.

두 수 a와 b의 최소공배수를 구하는 방법은 소인수 분해를 사용하는 방법이 있다.

두 수 192와 72의 최소공배수를 소인수 분해를 이용하여 구하여 보자. 일단 두 수를 소인수 분해한다.

192 = 2 * 2 * 2 * 2 * 2 * 2 * 3
72  = 2 * 2 * 2 * 3 * 3

구하고 나면, 두 소인수 분해 결과의 한 소인수 중에서 지수가 가장 큰 수를 찾아 서로 곱한다. 두 결과에서 2가 여섯 번 3이 두 번 한 소인수 중에서 가장 큰 수를 찾아서 나왔다.

즉 2 * 2 * 2 * 2 * 2 * 2 * 3 * 3 = 576
최소공배수가 576이라는 결론이 나온다.
*/

function gcd(x, y) {
  return !y ? x : gcd(y, x % y);
}

function lcm(x, y) {
  return (x * y) / gcd(x, y);
}

console.log(gcd(3, 12));
console.log(lcm(3, 12));

function gcdlcm(a, b) {
  var answer = [];
  answer.push(gcd(a, b), lcm(a, b));
  return answer;
}

console.log(gcdlcm(3,12));

/*
피보나치 수

피보나치 수는 0과 1로 시작하며, 다음 피보나치 수는 바로 앞의 두 피보나치 수의 합이 된다.
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946...

2 이상의 n이 입력되었을 때, fibonacci 함수를 제작하여 n번째 피보나치 수를 반환하라. 예를 들어 n = 3이라면 2를 반환한다.
*/

function fibonacci(n) {

}

console.log(fibonacci(2)); // 1
console.log(fibonacci(3)); // 2
console.log(fibonacci(4)); // 3
console.log(fibonacci(5)); // 5
console.log(fibonacci(6)); // 8

// 답

// Fibonacci number via looping
function fibonacci(n) {
  var a = 0, b = 1, f = 1;
  for (var i = 2; i <= n; i++) {
    f = a + b;
    a = b;
    b = f;
  }
  return f;
}

// Fibonacci number via recursive
function fibonacci(n) {
  if (n <= 2) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

// 0, 1, 1, 2, 3, 5, 8, ... <- fibonacci number
//       2  3  4  5  6      <- argument (>=2)

console.log(fibonacci(2)); // 1
console.log(fibonacci(3)); // 2
console.log(fibonacci(4)); // 3
console.log(fibonacci(5)); // 5
console.log(fibonacci(6)); // 8

/*
요일 구하기

2016년 1월 1일은 금요일이다. 2016년 A월 B일은 무슨 요일일까? 두 수 A,B를 입력받아 A월 B일이 무슨 요일인지 출력하는 getDayName 함수를 완성하세요.

요일의 이름은 일요일부터 토요일까지 각각

SUN,MON,TUE,WED,THU,FRI,SAT

를 출력한다. 예를 들어 A=5, B=24가 입력된다면 5월 24일은 화요일이므로 TUE를 반환한다.
*/

function getDayName(a,b){

}

console.log(getDayName(5,24));

// 답
function getDayName(month, date) {
  var dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  var today = new Date(2016, month - 1, date);

  return dayNames[today.getDay()];
}

console.log(getDayName(5, 24));

/*
하샤드 수

하샤드 수는 그 수의 각 자릿수 숫자의 합으로 그 수가 나누어지는 양의 정수를 말한다.

양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 한다. 예를들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수이다.

10, 12, 18, 20, 21, 24, 27, 30, 36, 40, 42, 45, 48, 50, 54, 60, 63, 70, 72, 80, 81, 84, 90, 100, 102, 108, 110, 111, 112, 114, 117, 120, 126, 132, 133, 135, 140, 144, 150, 152, 153, 156, 162, 171, 180, 190, 192, 195, 198, 200

Harshad함수는 양의 정수 n을 매개변수로 입력받는다. 이 n이 하샤드수인지 아닌지 판단하는 함수를 완성하라.

예를들어 n이 10, 12, 18이면 True를 리턴 11, 13이면 False를 리턴한다.
*/

function isHarshad(n){

}

console.log(Harshad(10)); // true
console.log(Harshad(12)); // true
console.log(Harshad(18)); // true
console.log(Harshad(11)); // false
console.log(Harshad(13)); // false

// 답
function isHarshad(n) {
  var str = n.toString();
  var sum = 0;

  for (var i = 0; i < str.length; i++) {
    sum += parseInt(str[i]);
  }

  // return n % sum ? false : true;
  return !(n % sum);
}

console.log(isHarshad(10)); // true
console.log(isHarshad(12)); // true
console.log(isHarshad(18)); // true
console.log(isHarshad(11)); // false
console.log(isHarshad(13)); // false


/*
두 정수 사이의 합

adder함수는 정수 x, y를 매개변수로 입력받는다.
두 수와 두 수 사이에 있는 모든 정수를 더해서 리턴하도록 함수를 완성하라.

x와 y가 같은 경우는 둘 중 아무 수나 리턴한다.
x, y는 음수나 0, 양수일 수 있으며 둘의 대소 관계도 정해져 있지 않다.

예를들어 x가 3, y가 5이면 12를 리턴한다.
*/

function adder(x, y){
}

console.log(adder(3, 5)); // 12

// 답
function adder(x, y) {
  var sum = 0;
  var sortedArgs = [];

  if (x > y) {
    sortedArgs.push(y, x);
  } else if (x < y) {
    sortedArgs.push(x, y);
  } else {
    return x;
  }

  for (var i = sortedArgs[0]; i <= sortedArgs[1]; i++) {
    sum += i;
  }

  return sum;
}

console.log(adder(3, 5));  // 12
console.log(adder(3, 3));  // 3
console.log(adder(-3, 5)); // 9
console.log(adder(5, -1)); // 14

/*
이상한 문자만들기

toWeirdCase함수는 문자열 s를 매개변수로 입력받는다.
문자열 s에 각 단어의 짝수번째 인덱스 문자는 대문자로, 홀수번째 인덱스 문자는 소문자로
바꾼 문자열을 리턴하도록 함수를 완성하라.
예를 들어 s가 "try hello world"라면 첫 번째 단어는 "TrY", 두 번째 단어는 "HeLlO", 세 번째 단어는 "WoRlD"로 바꿔 "TrY HeLlO WoRlD"를 리턴한다.

주의) 문자열 전체의 짝/홀수 인덱스가 아니라 단어(공백을 기준)별로 짝/홀수 인덱스를 판단한다.
*/

function toWeirdCase(s){

}

console.log(toWeirdCase("try hello world")); // "TrY HeLlO WoRlD"

// 답
function toWeirdCase(str) {
  var strArr = str.split(' ');
  for (var i = 0; i < strArr.length; i++) {
    strArr[i] = toUpperLower(strArr[i]);
  }
  return strArr.join(' ');
}
function toUpperLower(str) {
  var res = '';
  for (var i = 0; i < str.length; i++) {
    res += (i % 2 === 0) ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return res;
}

function toWeirdCase(str) {
  var strArr = str.split(' ');
  for (var i = 0; i < strArr.length; i++) {
    strArr[i] = strArr[i].toUpperLower();
  }
  return strArr.join(' ');
}
String.prototype.toUpperLower = function () {
  var res = '';
  for (var i = 0; i < this.length; i++) {
    res += (i % 2 === 0) ? this[i].toUpperCase() : this[i].toLowerCase();
  }
  return res;
};
