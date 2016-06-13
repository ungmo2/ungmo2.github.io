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
x = 1, 2, 3, 4
x : 짝수
x >= 3
*/

var x = [1, 2, 3, 4];
var result = [];

for (var i = 0; i < x.length; i++) {
  if(x[i] % 2 === 0 && x[i] >= 3){
    result.push(x[i]);
  }
}

console.log(result);
