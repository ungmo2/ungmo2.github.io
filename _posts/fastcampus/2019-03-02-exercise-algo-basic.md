---
layout: fs-post
title: <strong>자료 구조와 알고리즘</strong>
categories: fastcampus-exercise
section: fastcampus-exercise
seq: 2
permalink: /:categories/:title
description:
---

* TOC
{:toc}

# 1. 검색

## 1.1. 선형 검색

선형 검색(linear search)은 배열의 각 요소를 한 인덱스씩 순차적으로 접근하면서 동작한다.
선형 검색은 배열의 정렬 여부와 상관없이 동작하는 장점이 있지만, 배열의 모든 요소를 확인해야 하는 단점이 있다.

선형 검색을 통해 주어진 배열(array)에 주어진 값(target)이 요소로 존재하는지 확인하여
존재하는 경우 해당 인덱스를 반환하고 존재하지 않는 경우 -1을 반환하는 함수를 구현하라.
단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

```javascript
function linearSearch(array, target) {

}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(linearSearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(linearSearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(linearSearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(linearSearch([1, 2, 3, 4, 5, 6], 7)); // -2
```

<!-- ```javascript
function linearSearch(array, target) {
  const length = array.length;

  for (let i = 0; i < length; i++) {
    if (array[i] === target) return i;
  }

  return -1;
}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(linearSearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(linearSearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(linearSearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(linearSearch([1, 2, 3, 4, 5, 6], 7)); // -1
``` -->

## 1.2. 이진 검색

이진 검색(binary search)은 선형 검색과는 달리 정렬된 배열에서만 동작한다.
선형 검색은 배열의 모든 요소를 확인해야 하지만 이진 검색은 중간값을 확인해 원하는 값보다 해당 중간값이 큰지 작은지 확인한다.
검색 대상 값이 중간값보다 작은 경우 중간값보다 작은 쪽을 재귀적으로 검색하고,
검색 대상 값이 중간값보다 큰 경우 중간값보다 큰 쪽을 재귀적으로 검색한다.

이진 검색을 통해 주어진 배열(array)에 주어진 값(target)이 요소로 존재하는지 확인하여
존재하는 경우 해당 인덱스를 반환하고 존재하지 않는 경우 -1을 반환하는 함수를 구현하라.
단, 아래의 빌트인 함수 이외에는 어떤 빌트인 함수도 사용하지 않아야 하며, while 문을 사용하여 구현하여야 한다.
- [Math.floor](https://poiemaweb.com/js-math#24-mathfloorx-number-number-es1): 전달받은 인수의 소수점 이하를 내림한 정수를 반환한다.

```javascript
function binarySearch(array, target) {

}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(binarySearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(binarySearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(binarySearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(binarySearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 7)); // -1
```

<!-- ```javascript
function binarySearch(array, target) {
  // 배열의 시작 인덱스
  let start = 0;
  // 배열의 마지막 인덱스
  let end = array.length - 1;

  // 배열의 시작 인덱스가 마지막 인덱스와 같거나 크면
  while (start <= end) {
    // 배열의 중간 인덱스
    // 실수가 나올수 있기 때문에 Math.floor로 소수점 이하를 내림한 정수를 구한다.
    const mid = Math.floor((start + end) / 2);

    // target이 중간값(array[mid])과 같으면 ture를 반환하고 종료
    if (target === array[mid]) return mid;

    // target이 중간값보다 작으면 작은 쪽(start ~ mid - 1)에서 검색.
    // 중간값(array[mid])는 target과 같지 않기 때문에 포함시키지 않는다.
    if (target < array[mid]) end = mid - 1;
    // target이 중간값보다 크면 큰 쪽(mid ~ end + 1)에서 검색
    // 중간값(array[mid])는 target과 같지 않기 때문에 포함시키지 않는다.
    else start = mid + 1;
  }
  // 배열에서 target 검색 실패한 경우
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(binarySearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(binarySearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(binarySearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(binarySearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 7)); // -1
``` -->


# 2. 정렬

## 2.1. 버블 정렬

버블 정렬(buble sort)은 가장 간단하지만 가장 느린(O(n^2)) 정렬 알고리즘이다. 버블 정렬은 배열을 순회하면서 요소가 다른 요소보다 큰 경우 두 요소를 교환한다.

![](/assets/fs-images/bubble-sort.png)
{: .w-650 }
버블 정렬
{: .desc-img}

버블 정렬을 통해 주어진 배열(array)을 정렬하는 함수를 구현하라.
단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

```javascript
function bubbleSort(array) {

}

console.log(bubbleSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(bubbleSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
console.log(bubbleSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]

```

<!-- ```javascript
function bubbleSort(array) {
  function swap(array, index1, index2) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }

  const length = array.length - 1;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i; j++) {
      console.log(j, j + 1);
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }

  return array;
}

console.log(bubbleSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(bubbleSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
console.log(bubbleSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
``` -->
<!--

## 2.2. 선택 정렬
## 2.3. 삽입 정렬
## 2.4. 퀵 정렬
## 2.5. 병합 정렬
## 2.6. 계수 정렬

# 3. 해시 테이블
# 4. 스택
# 5. 큐
# 6. 링크드 리스트
# 7. 힙
# 8. 그래프 -->

