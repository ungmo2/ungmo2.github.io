---
layout: post
title: Javascript Object-Oriented Programming
---

객체지향 프로그래밍은 실제 세계에 기반한 모델을 만들기 위해 추상화를 사용하는 프로그래밍 패러다임이다.

오늘날, 많은 유명한 프로그래밍 언어(Java, C++, C#, Python, PHP, Ruby, Object-C)는 객체지향 프로그래밍을 지원한다.

객체지향 프로그래밍은 함수들의 집합 혹은 단순한 컴퓨터의 명령어들의 목록이라는 기존의 프로그래밍에 대한 전통적인 관점에 반하여, 관계성있는 객체들의 집합이라는 관점으로 접근하는 소프트웨어 디자인으로 볼 수 있다.

각 객체는 메시지를 받을 수도 있고, 데이터를 처리할 수도 있으며, 또다른 객체에게 메시지를 전달할 수도 있다. 각 객체는 별도의 역할이나 책임을 갖는 작은 독립적인 기계 또는 부품으로 볼 수 있는 것이다.

객체지향 프로그래밍은 보다 유연하고 유지보수성이 높은 프로그래밍을 하도록 의도되었고, 대규모 소프트웨어 공학에서 널리 알려져 있다.

객체지향 프로그래밍이 갖는 modularity(모듈화)에 기반한 강력한 힘에 의해, 객체지향적인 코드는 개발을 보다 단순하게 했고, 시간이 흐른 뒤에도 보다 쉽게 이해할 수 있도록 했으며, 복잡한 상황이나 절차들을 덜 모듈화된 프로그래밍 방법들보다 더 직접적으로 분석하고, 코딩하고, 이해할 수 있도록 만들었다.

#Terms

* Class  
같은 종류의 집단에 속하는 속성(attribute)과 행위(behavior)를 정의한 것으로 객체지향 프로그램의 기본적인 사용자 정의 데이터형(user define data type)이라고 할 수 있다.

* Object (객체)  
클래스의 인스턴스(실제로 메모리상에 할당된 것)이다. 객체는 자신 고유의 속성(attribute)을 가지며 클래스에서 정의한 행위(behavior)를 수행할 수 있다.

* Property  
객체의 속성(예: 색깔)

  프로퍼티란 객체의 일부로서 이름과 값의 쌍을 가지는 정보를 의미한다. 객체는 프로퍼티들을 포함하는 컨테이너라고 할 수 있다.

* Method  
객체의 행위/능력(예: 걷기)

  메서드는 객체가 가지고 있는 동작(절차,방법,기능)이다. 기본적으로 함수와 메서드가 서로 일련의 동작을 실행하는 구문들의 집합이라는 점에서 동일하지만 메서드는 객체가 가지고 있는 동작이라는 점에서 차이가 있다.

  메서드를 수행하기 위해서는 객체를 통해서 해당 메서드를 수행하여야 한다. 즉 그 동작을 수행하는 주체는 객체이며 그 동작을 수행하기 위해서는 객체에게 그 동작을 수행하라고 지시해야 한다. 함수는 그 동작을 수행하기 위해 객체에게 어떤을 동작을 수행하라고 명령하지 않아도 된다. (함수는 자체가 그 동작을 정의한 객체이다.)

  즉, 메서드는 객체를 움직이는 동작이며 그 동작을 수행하기 위해서 객체의 정보인 프로퍼티를 사용할 수 있다.

* Constructor (생성자)  
인스턴스화 되는 시점에서 호출되는 메서드

* Inheritance (상속)  
자바같은 클래스 기반 언어의 클래스는 다른 클래스로부터 속성들을 상속받을 수 있다.

  상속은 코드 재사용의 한 형태로 만약 새로 만들 클래스가 기존 클래스와 유사하다면 상속을 통해 다지 다른 점만 구현하면 된다.

  ```java
  public class Animal {
    public Animal() {
      System.out.println("A new animal has been created!");
    }

    public void sleep() {
      System.out.println("An animal sleeps...");
    }

    public void eat() {
      System.out.println("An animal eats...");
    }
  }

  public class Bird extends Animal {
    public Bird() {
      super();
      System.out.println("A new bird has been created!");
    }

    @Override
    public void sleep() {
      System.out.println("A bird sleeps...");
    }

    @Override
    public void eat() {
      System.out.println("A bird eats...");
    }
  }

  public class MainClass {
    public static void main(String[] args) {
      Animal animal = new Animal();
      Bird bird = new Bird();

      animal.sleep();
      animal.eat();

      bird.sleep();
      bird.eat();
    }
  }
  ```
  코드의 재사용은 소프트웨어 개발 비용을 현저하게 줄일 수 있는 잠재력이 있기 때문에 매우 중요하다.


* Encapsulation (캡슐화)  
클래스는 해당 객체의 특성들만을 정의할 수 있고, 메서드는 그 메서드가 어떻게 실행되는지만 정의할 수 있다. (외부 접근 불가)

* Abstraction (추상화)  
복잡한 상속, 메서드, 객체의 속성의 결합은 반드시 현실 세계를 시뮬레이션할 수 있어야 한다.

* Polymorphism (다형성)  
하나의 메서드나 클래스가 있을 때 이것들이 다양한 방법으로 동작하는 것을 의미한다. 키보드의 키를 통해서 비유를 들어보겠다. 키보드의 키를 사용하는 방법은 '누른다'이다. 하지만 똑같은 동작 방법의 키라고 하더라도 ESC는 취소를 ENTER는 실행의 목적을 가지고 있다. 다형성이란 동일한 조작방법으로 동작시키지만 동작방법은 다른 것을 의미한다.

#Javascript Object
자바스크립트는 객체(object)기반의 스크립트 언어이며 자바스크립트를 이루고 있는 대부분 “모든 것”은 객체이다.

자바스크립트는 객체를 생성하기 위해 먼저 class를 만들 필요가 없다. class문을 흔하게 볼 수 있는 C++이나 자바와는 달리 자바스크립트는 class문이 포함되지 않은 프로토타입 기반 언어이다.

이로인해 때때로 class 기반 언어에 익숙한 프로그래머들은 혼란을 일으킨다. 자바스크립트에서는 function을 class로서 사용한다. 아래 예제에서는 Person 이라는 이름의 클래스를 새로 정의하고 있다.

```javascript
function Person(name) {
  this.name = name;
}
```

obj 이름의 객체의 새로운 인스턴스를 만들때에는 new obj 라는 statement를 사용하고, 차후에 접근할 수 있도록 변수에 결과를 받는다.

아래의 예제에서 Person이라는 이름의 클래스를 정의한 후에, 두개의 인스턴스를 생성하고 있다.

```javascript
function Person(name) {
  this.name = name;
}

var person1 = new Person('Lee');
var person2 = new Person('Kim');
```
